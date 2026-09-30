import {SignJWT} from 'jose';
import {after} from 'next/server';
import {processOutbox} from '../../../lib/communications';
import {createLead,rateLimit} from '../../../lib/repository';
import {getDB} from '../../../lib/db';
import {originCheck,jsonBody,ok,failure} from '../../../lib/http';
export async function POST(request:Request){try{originCheck(request);const db=await getDB();await rateLimit(db,`lead:${request.headers.get('x-forwarded-for')||'local'}`);const lead=await createLead(db,await jsonBody(request));after(async()=>{try{await processOutbox(db,3);}catch{console.error("Outbox processing deferred to scheduled worker");}});const secret=process.env.UPLOAD_TOKEN_SECRET;if(!secret)return ok(lead,201);const upload_token=await new SignJWT({lead:lead.id}).setProtectedHeader({alg:'HS256'}).setIssuer('rgm-uploads').setAudience('rgm-upload').setExpirationTime('30m').sign(new TextEncoder().encode(secret));return ok({...lead,upload_token},201);}catch(e){return failure(e);}}

