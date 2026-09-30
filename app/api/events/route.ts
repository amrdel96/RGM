import {z} from 'zod';
import {getDB} from '../../../lib/db';
import {originCheck,jsonBody,ok,failure} from '../../../lib/http';
import {rateLimit} from '../../../lib/repository';
export async function POST(request:Request){try{originCheck(request);const data=z.object({event:z.enum(['machine_view','machine_search','filter_apply','machine_inquiry_start','machine_inquiry_submit','whatsapp_click','phone_click','email_click','machine_wanted_submit','sell_machine_submit','inspection_request_submit','service_inquiry_submit','video_click','pdf_download']),machine_id:z.uuid().optional()}).parse(await jsonBody(request));const db=await getDB();await rateLimit(db,`events:${request.headers.get('x-forwarded-for')||'local'}`,200);await db.query('INSERT INTO analytics(event,machine_id) VALUES($1,$2)',[data.event,data.machine_id||null]);return ok({ok:true});}catch(e){return failure(e);}}
