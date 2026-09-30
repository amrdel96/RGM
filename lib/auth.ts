import {cookies} from 'next/headers';
import {createServerClient} from '@supabase/ssr';
import {jwtVerify,SignJWT} from 'jose';
import {readFile} from 'node:fs/promises';
import {timingSafeEqual} from 'node:crypto';
import {getDB,isLocal} from './db';
import {AppError} from './repository';
export type Role='ADMIN'|'SALES'|'MARKETING';
export type Staff={id:string;email:string;role:Role};
export async function supabase(){const store=await cookies();if(!process.env.NEXT_PUBLIC_SUPABASE_URL||!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY)throw new AppError('CONFIGURATION REQUIRED: Supabase authentication',503);return createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL,process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY,{cookies:{getAll:()=>store.getAll(),setAll:items=>{for(const i of items)store.set(i.name,i.value,i.options);}}});}
async function localConfig(){if(!isLocal())throw new AppError('Local access unavailable',403);return JSON.parse(await readFile('.local/access.json','utf8'));}
export async function currentStaff():Promise<Staff|null>{
 let id:string|undefined;
 if(isLocal()){try{const token=(await cookies()).get('rgm_local_session')?.value;if(!token)return null;const cfg=await localConfig();id=(await jwtVerify(token,new TextEncoder().encode(cfg.secret),{issuer:'rgm-local',audience:'rgm-staff'})).payload.sub;}catch{return null;}}
 else{if(!process.env.NEXT_PUBLIC_SUPABASE_URL)return null;const sb=await supabase();const {data,error}=await sb.auth.getUser();if(error||!data.user)return null;id=data.user.id;}
 if(!id)return null;const {rows}=await (await getDB()).query('SELECT id,email,role FROM staff WHERE id=$1 AND active=true',[id]);return (rows[0] as Staff)||null;
}
export async function requireStaff(roles:Role[]=['ADMIN','SALES','MARKETING']){const staff=await currentStaff();if(!staff)throw new AppError('Sign in required',401);if(!roles.includes(staff.role))throw new AppError('You do not have permission for this action.',403);return staff;}
export async function localLogin(key:string){const cfg=await localConfig();const entry=cfg.accounts.find((a:{key:string})=>{const a1=Buffer.from(a.key),b1=Buffer.from(key);return a1.length===b1.length&&timingSafeEqual(a1,b1);});if(!entry)throw new AppError('Invalid access key',401);const token=await new SignJWT({}).setProtectedHeader({alg:'HS256'}).setSubject(entry.id).setIssuer('rgm-local').setAudience('rgm-staff').setIssuedAt().setExpirationTime('4h').sign(new TextEncoder().encode(cfg.secret));(await cookies()).set('rgm_local_session',token,{httpOnly:true,sameSite:'strict',secure:false,path:'/',maxAge:14400});}
