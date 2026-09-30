import {mkdir,readFile,writeFile} from 'node:fs/promises';
import {randomUUID,randomBytes} from 'node:crypto';
import {createLocalDB,migrate} from '../lib/db';
import {seed} from '../lib/seed';
await mkdir('.local',{recursive:true});
let access;try{access=JSON.parse(await readFile('.local/access.json','utf8'));}catch{access={secret:randomBytes(32).toString('hex'),accounts:['ADMIN','SALES','MARKETING'].map(role=>({id:randomUUID(),email:`${role.toLowerCase()}@local.invalid`,role,key:randomBytes(24).toString('base64url')}))};await writeFile('.local/access.json',JSON.stringify(access,null,2));}
const db=await createLocalDB('.local/pgdata');await migrate(db);await seed(db);for(const a of access.accounts)await db.query('INSERT INTO staff(id,email,role) VALUES($1,$2,$3) ON CONFLICT(id) DO NOTHING',[a.id,a.email,a.role]);
try{await readFile('.env.local');}catch{await writeFile('.env.local',`APP_ENV=local\nDB_MODE=pglite\nNEXT_PUBLIC_SITE_URL=http://localhost:3000\nEMAIL_PROVIDER=mock\nWHATSAPP_PROVIDER=mock\nUPLOAD_TOKEN_SECRET=${randomBytes(32).toString('hex')}\nCRON_SECRET=${randomBytes(32).toString('hex')}\n`);}
console.log('Local PostgreSQL initialized. No machinery seeded. Staff access keys are in .local/access.json; never publish this file.');process.exit(0);
