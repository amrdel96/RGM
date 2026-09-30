import {cookies} from 'next/headers';
import {getDB,isLocal} from '../../../lib/db';
import {localLogin,supabase,currentStaff} from '../../../lib/auth';
import {rateLimit} from '../../../lib/repository';
import {originCheck,jsonBody,ok,failure} from '../../../lib/http';
export async function GET(){return ok({staff:await currentStaff(),local:isLocal()});}
export async function POST(request:Request){try{originCheck(request);const data=await jsonBody(request);await rateLimit(await getDB(),`auth:${request.headers.get('x-forwarded-for')||'local'}`,15);if(isLocal()){await localLogin(String(data.key||''));return ok({ok:true});}const sb=await supabase();if(data.action==='reset'){await sb.auth.resetPasswordForEmail(String(data.email),{redirectTo:`${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback?next=/admin/reset`});return ok({ok:true});}if(data.action==='password'){const {error}=await sb.auth.updateUser({password:String(data.password)});if(error)return ok({error:'Password update failed'},400);return ok({ok:true});}const {error}=await sb.auth.signInWithPassword({email:String(data.email),password:String(data.password)});if(error)return ok({error:'Invalid login'},401);if(!await currentStaff()){await sb.auth.signOut();return ok({error:'Staff access has not been enabled'},403);}return ok({ok:true});}catch(e){return failure(e);}}
export async function DELETE(request:Request){try{originCheck(request);if(isLocal())(await cookies()).delete('rgm_local_session');else await(await supabase()).auth.signOut();return ok({ok:true});}catch(e){return failure(e);}}
