import {createHash,randomUUID} from 'node:crypto';
import type {DB,Row} from './db';
import {machineSchema,leadSchema,settingsSchema,type MachineInput} from './validation';
export class AppError extends Error{constructor(message:string,public status=400){super(message);}}
export const normalize=(s:string)=>s.normalize('NFKC').toLowerCase().replace(/colours?/g,'color').replace(/colors/g,'color').replace(/[^\p{L}\p{N}]/gu,'');
export async function settings(db:DB){const {rows}=await db.query('SELECT data FROM settings WHERE id=1');return settingsSchema.parse(rows[0]?.data||{});}
export function publicSettings(s:ReturnType<typeof settingsSchema.parse>){return {company_name:s.company_name,primary_whatsapp:s.primary_whatsapp,phone:s.phone,general_email:s.general_email,countries:s.countries,social_links:s.social_links,ga_id:s.ga_id,gtm_id:s.gtm_id,meta_pixel_id:s.meta_pixel_id,footer_en:s.footer_en,footer_ar:s.footer_ar};}
export async function audit(db:DB,actor:string,action:string,id:string){await db.query('INSERT INTO audit(actor,action,entity_id) VALUES($1,$2,$3)',[actor,action,id]);}
export async function saveMachine(db:DB,raw:unknown,actor:string,id?:string){
 const m=machineSchema.parse(raw);
 return db.transaction(async tx=>{
 const cats=await tx.query("SELECT slug FROM taxonomy WHERE slug=$1 AND kind='category' AND active=true",[m.category]);if(!cats.rows.length)throw new AppError('Select an active category.');
 const brands=await tx.query("SELECT name_en FROM taxonomy WHERE name_en=$1 AND kind='manufacturer' AND active=true",[m.manufacturer]);if(!brands.rows.length)throw new AppError('Select an active manufacturer.');
 const machineId=id||randomUUID(); const slugBase=m.title_en.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'').slice(0,100)||'machine';
 const keys=['status','manufacturer','model','category','subcategory','year','title_en','title_ar','description_en','description_ar','location','condition','configuration_en','configuration_ar','seo_en','seo_ar','specs'] as const;
 const values=keys.map(k=>k==='specs'?JSON.stringify(m[k]):m[k]); const search=normalize([m.manufacturer,m.model,m.title_en,m.title_ar,m.category,m.description_en,m.description_ar,JSON.stringify(m.specs),m.specs.colors?`${m.specs.colors} color`:''].join(' '));
 if(id){const result=await tx.query(`UPDATE machines SET ${keys.map((k,i)=>`${k}=$${i+1}`).join(',')},search_text=$18,version=version+1,updated_at=now() WHERE id=$19 AND version=$20 RETURNING id`,[...values,search,id,m.version]);if(!result.rows.length)throw new AppError('This machine changed. Reload before saving.',409);}
 else await tx.query(`INSERT INTO machines(id,${keys.join(',')},slug,search_text) VALUES($1,${keys.map((_,i)=>`$${i+2}`).join(',')},$19,$20)`,[machineId,...values,`${slugBase}-${machineId.slice(0,8)}`,search]);
 await tx.query('INSERT INTO machine_commercial(machine_id,selling_price,currency,show_public_price,send_email_price) VALUES($1,$2,$3,$4,$5) ON CONFLICT(machine_id) DO UPDATE SET selling_price=$2,currency=$3,show_public_price=$4,send_email_price=$5',[machineId,m.selling_price||null,m.currency,m.show_public_price,m.send_email_price]);
 await tx.query('INSERT INTO machine_internal(machine_id,supplier,supplier_contact,purchase_price,cost,commission,notes,serial,source_url) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9) ON CONFLICT(machine_id) DO UPDATE SET supplier=$2,supplier_contact=$3,purchase_price=$4,cost=$5,commission=$6,notes=$7,serial=$8,source_url=$9',[machineId,m.supplier,m.supplier_contact,m.purchase_price||null,m.cost||null,m.commission||null,m.notes,m.serial,m.source_url]);
 await audit(tx,actor,id?'machine.updated':'machine.created',machineId);return (await tx.query('SELECT id,code,slug FROM machines WHERE id=$1',[machineId])).rows[0];
 });
}
const publicColumns=`m.id,m.code,m.slug,m.status,m.manufacturer,m.model,m.category,m.subcategory,m.year,m.title_en,m.title_ar,m.description_en,m.description_ar,m.configuration_en,m.configuration_ar,m.seo_en,m.seo_ar,m.location,m.condition,m.specs,m.created_at,CASE WHEN c.show_public_price THEN c.selling_price::text ELSE NULL END AS price,CASE WHEN c.show_public_price THEN c.currency ELSE NULL END AS currency`;
export async function catalog(db:DB,filters:Record<string,string>={},one?:string){
 const config=await settings(db);const vals:unknown[]=[config.include_reserved?['AVAILABLE','RESERVED']:['AVAILABLE']];const clauses=['m.status=ANY($1::text[])'];
 const add=(expr:string,v:unknown)=>{vals.push(v);clauses.push(expr.replace('?',`$${vals.length}`));};
 if(one)add('(m.slug=? OR m.id::text=? OR m.code=?)'.replaceAll('?',`$${vals.length+1}`),one);
 if(filters.q){const tokens=filters.q.trim().split(/\s+/).map(normalize).filter(Boolean); for(const token of tokens)add("(m.search_text || regexp_replace(lower(m.code),'[^a-z0-9]','','g')) LIKE ?",`%${token}%`);}
 for(const k of ['category','manufacturer','model','location','status'])if(filters[k])add(`m.${k}=?`,filters[k]);
 if(filters.year_from&&Number.isFinite(+filters.year_from))add('m.year>=?',+filters.year_from);
 if(filters.year_to&&Number.isFinite(+filters.year_to))add('m.year<=?',+filters.year_to);
 for(const k of ['colors','perfecting','coating'])if(filters[k])add(`m.specs->>'${k}'=?`,filters[k]);
 const where=clauses.join(' AND ');const count=await db.query(`SELECT count(*)::int AS total FROM machines m WHERE ${where}`,vals);
 const order=filters.sort==='year_asc'?'m.year ASC NULLS LAST':filters.sort==='year_desc'?'m.year DESC NULLS LAST':'m.created_at DESC';
 const page=Math.max(1,Math.min(10000,parseInt(filters.page||'1')||1));const result=await db.query(`SELECT ${publicColumns} FROM machines m JOIN machine_commercial c ON c.machine_id=m.id WHERE ${where} ORDER BY ${order},m.id LIMIT 24 OFFSET $${vals.length+1}`,[...vals,(page-1)*24]);
 for(const m of result.rows)m.media=(await db.query('SELECT id,kind,alt_en,alt_ar,sort_order FROM media WHERE machine_id=$1 ORDER BY sort_order,created_at',[m.id])).rows;
 return {items:result.rows,total:count.rows[0].total,page};
}
export async function adminMachine(db:DB,id:string,role:string){const {rows}=await db.query('SELECT m.*,c.selling_price::text,c.currency,c.show_public_price,c.send_email_price FROM machines m JOIN machine_commercial c ON c.machine_id=m.id WHERE m.id=$1',[id]);if(!rows[0])throw new AppError('Machine not found',404);const m=rows[0];if(role==='ADMIN')Object.assign(m,(await db.query('SELECT supplier,supplier_contact,purchase_price::text,cost::text,commission::text,notes,serial,source_url FROM machine_internal WHERE machine_id=$1',[id])).rows[0]);m.media=(await db.query('SELECT id,kind,alt_en,alt_ar,sort_order FROM media WHERE machine_id=$1 ORDER BY sort_order',[id])).rows;return m;}
export async function createLead(db:DB,raw:unknown){const l=leadSchema.parse(raw);const hash=createHash('sha256').update(JSON.stringify(l)).digest('hex');return db.transaction(async tx=>{
 await tx.query('SELECT pg_advisory_xact_lock(hashtext($1))',[l.idempotency_key]);
 const existing=(await tx.query('SELECT id,request_hash FROM leads WHERE idempotency_key=$1',[l.idempotency_key])).rows[0];if(existing){if(existing.request_hash!==hash)throw new AppError('Submission key already used for another request.',409);return {id:existing.id,replayed:true};}
 let snapshot={};if(l.machine_id){await tx.query('SELECT id FROM machines WHERE id=$1 FOR SHARE',[l.machine_id]);const m=(await catalog(tx,{},l.machine_id)).items[0];if(!m)throw new AppError('This machine is no longer available.',409);snapshot={code:m.code,title_en:m.title_en,title_ar:m.title_ar,slug:m.slug,year:m.year};}
 if(l.type==='SERVICE_INQUIRY'&&!(await tx.query("SELECT id FROM content WHERE slug=$1 AND kind='service' AND published=true",[l.detail.service])).rows.length)throw new AppError('Service not found.');
 const id=randomUUID();await tx.query('INSERT INTO leads(id,type,name,company,country,email,phone,language,message,machine_id,snapshot,detail,attribution,privacy_consent,whatsapp_consent,idempotency_key,request_hash) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17)',[id,l.type,l.name,l.company,l.country,l.email,l.phone,l.language,l.message,l.machine_id||null,JSON.stringify(snapshot),JSON.stringify(l.detail),JSON.stringify(l.attribution),true,l.whatsapp_consent,l.idempotency_key,hash]);
 for(const kind of ['CUSTOMER_EMAIL','INTERNAL_EMAIL','WHATSAPP'])await tx.query('INSERT INTO outbox(lead_id,kind) VALUES($1,$2)',[id,kind]);
 await tx.query("INSERT INTO lead_events(lead_id,text) VALUES($1,'Inquiry received; communication queued')",[id]);return {id,replayed:false};
});}
export async function rateLimit(db:DB,key:string,limit=10){const {rows}=await db.query("INSERT INTO rate_limits(key,count,expires_at) VALUES($1,1,now()+interval '15 minutes') ON CONFLICT(key) DO UPDATE SET count=CASE WHEN rate_limits.expires_at<now() THEN 1 ELSE rate_limits.count+1 END,expires_at=CASE WHEN rate_limits.expires_at<now() THEN now()+interval '15 minutes' ELSE rate_limits.expires_at END RETURNING count",[createHash('sha256').update(key).digest('hex')]);if(rows[0].count>limit)throw new AppError('Too many requests. Please try again later.',429);}
