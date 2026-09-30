import {redirect} from 'next/navigation';
import {currentStaff} from '../../../lib/auth';
import {isLocal} from '../../../lib/db';
import AdminApp from '../../components/admin-app';
export const dynamic='force-dynamic';
export default async function AdminPage({params}:{params:Promise<{path?:string[]}>}){const path=(await params).path||[];const staff=await currentStaff();if(!staff&&!['login','reset'].includes(path[0]))redirect('/admin/login');if(staff&&path[0]==='login')redirect('/admin');return <AdminApp user={staff} route={path} local={isLocal()}/>;}
