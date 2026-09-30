import {NextResponse} from 'next/server';
import {supabase} from '../../../lib/auth';
export async function GET(request:Request){const u=new URL(request.url);const code=u.searchParams.get('code');if(code){const {error}=await(await supabase()).auth.exchangeCodeForSession(code);if(!error)return NextResponse.redirect(new URL(u.searchParams.get('next')==='/admin/reset'?'/admin/reset':'/admin',request.url));}return NextResponse.redirect(new URL('/admin/login?error=authentication',request.url));}
