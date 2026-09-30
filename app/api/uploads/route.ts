import {jwtVerify} from 'jose';
import {requireStaff} from '../../../lib/auth';
import {getDB} from '../../../lib/db';
import {saveMedia} from '../../../lib/media';
import {AppError,rateLimit} from '../../../lib/repository';
import {previewImport} from '../../../lib/imports';
import {originCheck,ok,failure,limitedForm} from '../../../lib/http';
export async function POST(request:Request){try{originCheck(request);if(Number(request.headers.get('content-length')||0)>11_000_000)throw new AppError('Upload too large',413);const form=await limitedForm(request);const file=form.get('file');if(!(file instanceof File))throw new AppError('File required');const db=await getDB();const type=String(form.get('type'));if(type==='import'){const staff=await requireStaff(['ADMIN']);return ok(await previewImport(db,Buffer.from(await file.arrayBuffer()),file.name,staff.id));}const machine_id=String(form.get('machine_id')||'');if(machine_id){await requireStaff(['ADMIN']);if(!(await db.query('SELECT id FROM machines WHERE id=$1',[machine_id])).rows.length)throw new AppError('Machine not found',404);return ok(await saveMedia(db,file,{machine_id},String(form.get('alt')||'')));}
 const secret=process.env.UPLOAD_TOKEN_SECRET;if(!secret)throw new AppError('Upload configuration required',503);const {payload}=await jwtVerify(String(form.get('token')),new TextEncoder().encode(secret),{issuer:'rgm-uploads',audience:'rgm-upload'});if(typeof payload.lead!=='string')throw new AppError('Invalid upload authorization',403);const lead=(await db.query('SELECT type FROM leads WHERE id=$1',[payload.lead])).rows[0];if(!lead||!['SELL_MACHINE','INSPECTION_REQUEST'].includes(lead.type))throw new AppError('Uploads not allowed',403);await rateLimit(db,`upload:${payload.lead}`,30);return ok(await saveMedia(db,file,{lead_id:payload.lead},file.name));}catch(e){return failure(e);}}

