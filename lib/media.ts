import {fileTypeFromBuffer} from 'file-type';
import sharp from 'sharp';
import {randomUUID} from 'node:crypto';
import {mkdir,writeFile,readFile} from 'node:fs/promises';
import {v2 as cloudinary} from 'cloudinary';
import {isLocal,type DB} from './db';
import {AppError} from './repository';
export async function saveMedia(db:DB,file:File,owner:{machine_id?:string;lead_id?:string},alt:string){if(file.size>10_000_000||file.size===0)throw new AppError('Files must be between 1 byte and 10 MB.');const input=Buffer.from(await file.arrayBuffer());const detected=await fileTypeFromBuffer(input);if(!detected||!['image/jpeg','image/png','image/webp','application/pdf'].includes(detected.mime))throw new AppError('Only JPEG, PNG, WebP and PDF files are allowed.');
 const count=(await db.query(`SELECT count(*)::int AS n FROM media WHERE ${owner.machine_id?'machine_id':'lead_id'}=$1`,[owner.machine_id||owner.lead_id])).rows[0].n;if(count>=30)throw new AppError('Maximum 30 files per record.');
 const image=detected.mime.startsWith('image');if(!image&&/\/JavaScript|\/JS\b|\/Launch|\/EmbeddedFile|\/OpenAction/i.test(input.toString('latin1')))throw new AppError('PDF contains active content; upload a flattened PDF.');
 const output=image?await sharp(input,{limitInputPixels:40_000_000}).rotate().resize(2400,2400,{fit:'inside',withoutEnlargement:true}).webp({quality:85}).toBuffer():input;
 const id=randomUUID();let storageKey:string;
 if(isLocal()){await mkdir('.local/media',{recursive:true});storageKey=`${id}.${image?'webp':'pdf'}`;await writeFile(`.local/media/${storageKey}`,output);}else{if(!process.env.CLOUDINARY_CLOUD_NAME)throw new AppError('CONFIGURATION REQUIRED: media storage',503);cloudinary.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET,secure:true});storageKey=await new Promise<string>((resolve,reject)=>{const stream=cloudinary.uploader.upload_stream({public_id:`rgm/${id}`,type:'authenticated',resource_type:'raw'},(error,result)=>error||!result?reject(error):resolve(result.public_id));stream.end(output);});}
 await db.query('INSERT INTO media(id,machine_id,lead_id,kind,storage_key,mime,bytes,alt_en,alt_ar,sort_order) VALUES($1,$2,$3,$4,$5,$6,$7,$8,$8,$9)',[id,owner.machine_id||null,owner.lead_id||null,image?'image':'pdf',storageKey,image?'image/webp':'application/pdf',output.length,alt.slice(0,300),count]);return {id,kind:image?'image':'pdf'};
}
export async function readMedia(key:string){if(isLocal()){if(!/^[a-f0-9-]+\.(webp|pdf)$/.test(key))throw new AppError('Invalid storage key');return readFile(`.local/media/${key}`);}cloudinary.config({cloud_name:process.env.CLOUDINARY_CLOUD_NAME,api_key:process.env.CLOUDINARY_API_KEY,api_secret:process.env.CLOUDINARY_API_SECRET,secure:true});const url=cloudinary.utils.private_download_url(key,'',{resource_type:'raw',type:'authenticated',expires_at:Math.floor(Date.now()/1000)+60});const r=await fetch(url,{cache:'no-store'});if(!r.ok)throw new Error('Media retrieval failed');return Buffer.from(await r.arrayBuffer());}
