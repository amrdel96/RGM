import {createHash,randomBytes} from 'node:crypto';
import {z} from 'zod';
import {getDB} from '../../../lib/db';
import {supabase} from '../../../lib/auth';
import {emailProvider} from '../../../lib/communications';
import {originCheck,jsonBody,ok,failure} from '../../../lib/http';
import {AppError,rateLimit} from '../../../lib/repository';

const email=z.email().max(254).transform(v=>v.toLowerCase().trim());
const tokenHash=(token:string)=>createHash('sha256').update(token).digest('hex');
async function user(){const sb=await supabase();const {data,error}=await sb.auth.getUser();if(error||!data.user)throw new AppError('Sign in required',401);return {sb,auth:data.user};}

export async function GET(request:Request){try{const url=new URL(request.url);const token=url.searchParams.get('newsletter_confirm');if(token){const address=email.parse(url.searchParams.get('email')||'');const db=await getDB();const r=await db.query("UPDATE newsletter_subscribers SET status='ACTIVE',confirmed_at=now(),confirm_token_hash=NULL,confirm_expires_at=NULL,updated_at=now() WHERE email=$1 AND status='PENDING' AND confirm_token_hash=$2 AND confirm_expires_at>now() RETURNING id",[address,tokenHash(token)]);if(!r.rows.length)throw new AppError('This confirmation link is invalid or expired.',400);return new Response('<!doctype html><title>Subscription confirmed</title><main style="font:18px Arial;max-width:640px;margin:80px auto;color:#182765"><h1>Subscription confirmed</h1><p>Your RGM newsletter subscription is active. You may close this page.</p></main>',{headers:{'Content-Type':'text/html; charset=utf-8'}});}const {auth}=await user();const db=await getDB();const p=(await db.query('SELECT email,full_name,newsletter_opt_in,created_at FROM customer_profiles WHERE id=$1',[auth.id])).rows[0];return ok({user:{email:auth.email,email_confirmed:!!auth.email_confirmed_at,...p}});}catch(e){return failure(e);}}

export async function POST(request:Request){try{originCheck(request);const input=await jsonBody(request);const action=String(input.action||'');const db=await getDB();await rateLimit(db,`customer:${request.headers.get('x-forwarded-for')||'local'}`,10);
 if(action==='register'){
  const data=z.object({email,password:z.string().min(12).max(128),full_name:z.string().trim().max(160).default(''),newsletter_opt_in:z.boolean().default(false)}).parse(input);
  const sb=await supabase();const redirectTo=`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/account`;
  const {data:created,error}=await sb.auth.signUp({email:data.email,password:data.password,options:{emailRedirectTo:redirectTo,data:{full_name:data.full_name}}});
  if(error)throw new AppError('Unable to create account',400);
  if(created.user)await db.query('INSERT INTO customer_profiles(id,email,full_name,newsletter_opt_in) VALUES($1,$2,$3,$4) ON CONFLICT(id) DO UPDATE SET email=$2,full_name=$3,newsletter_opt_in=$4,updated_at=now()',[created.user.id,data.email,data.full_name,data.newsletter_opt_in]);
  return ok({ok:true,message:'Check your inbox to confirm your email address.'},201);
 }
 if(action==='login'){
  const data=z.object({email,password:z.string().min(1).max(128)}).parse(input);const sb=await supabase();const {error}=await sb.auth.signInWithPassword(data);if(error)throw new AppError('Invalid email or password',401);return ok({ok:true});
 }
 if(action==='logout'){const {sb}=await user();await sb.auth.signOut();return ok({ok:true});}
 if(action==='profile'){
  const data=z.object({full_name:z.string().trim().max(160),newsletter_opt_in:z.boolean()}).parse(input);const {auth}=await user();await db.query('INSERT INTO customer_profiles(id,email,full_name,newsletter_opt_in) VALUES($1,$2,$3,$4) ON CONFLICT(id) DO UPDATE SET full_name=$3,newsletter_opt_in=$4,updated_at=now()',[auth.id,auth.email||'',data.full_name,data.newsletter_opt_in]);return ok({ok:true});
 }
 if(action==='subscribe'){
  const data=z.object({email,full_name:z.string().trim().max(160).default(''),language:z.enum(['en','ar']).default('en')}).parse(input);const token=randomBytes(32).toString('base64url');const base=process.env.NEXT_PUBLIC_SITE_URL;if(!base)throw new AppError('Newsletter configuration required',503);
  await db.query("INSERT INTO newsletter_subscribers(email,full_name,language,status,confirm_token_hash,confirm_expires_at,consent_at,updated_at) VALUES($1,$2,$3,'PENDING',$4,now()+interval '24 hours',now(),now()) ON CONFLICT(email) DO UPDATE SET full_name=$2,language=$3,status='PENDING',confirm_token_hash=$4,confirm_expires_at=now()+interval '24 hours',updated_at=now()",[data.email,data.full_name,data.language,tokenHash(token)]);
  const confirm=`${base}/api/customer?newsletter_confirm=${encodeURIComponent(token)}&email=${encodeURIComponent(data.email)}`;const ar=data.language==='ar';
  await emailProvider.send(data.email,ar?'تأكيد اشتراكك في نشرة RGM':'Confirm your RGM newsletter subscription',`<p>${ar?'اضغط لتأكيد اشتراكك في نشرة RGM:':'Click to confirm your RGM newsletter subscription:'}</p><p><a href="${confirm}">${ar?'تأكيد الاشتراك':'Confirm subscription'}</a></p>`,confirm,`newsletter-${tokenHash(token)}`);
  return ok({ok:true,message:'Check your inbox to confirm your subscription.'});
 }
 throw new AppError('Not found',404);
}catch(e){return failure(e);}}

export async function PATCH(request:Request){try{originCheck(request);const data=z.object({password:z.string().min(12).max(128)}).parse(await jsonBody(request));const {sb}=await user();const {error}=await sb.auth.updateUser({password:data.password});if(error)throw new AppError('Password update failed',400);return ok({ok:true});}catch(e){return failure(e);}}

export async function DELETE(request:Request){try{originCheck(request);const data=z.object({action:z.literal('unsubscribe'),email}).parse(await jsonBody(request));const db=await getDB();await db.query("UPDATE newsletter_subscribers SET status='UNSUBSCRIBED',unsubscribed_at=now(),updated_at=now() WHERE email=$1",[data.email]);return ok({ok:true});}catch(e){return failure(e);}}

