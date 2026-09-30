import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { Pool } from 'pg';
import { PGlite } from '@electric-sql/pglite';
export type Row = Record<string, any>;
export interface DB { query<T extends Row = Row>(sql:string, params?:unknown[]):Promise<{rows:T[]}>; exec(sql:string):Promise<unknown>; transaction<T>(fn:(db:DB)=>Promise<T>):Promise<T>; close?():Promise<void>; }
const globals = globalThis as typeof globalThis & { rgmDB?:Promise<DB> };
export const isLocal=()=>process.env.APP_ENV==='local' && process.env.DB_MODE==='pglite' && !process.env.VERCEL;
export async function createLocalDB(directory?:string):Promise<DB>{
 const pg=new PGlite(directory); await pg.waitReady;
 const wrap=(p:any):DB=>({query:(s,v=[])=>p.query(s,v),exec:s=>p.exec(s),transaction:(fn)=>p.transaction((t:any)=>fn(wrap(t)))});
 return {...wrap(pg),close:()=>pg.close()};
}
export async function migrate(db:DB){
 await db.query('CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY)');
 const {rows}=await db.query('SELECT name FROM schema_migrations WHERE name=$1',['001_initial']);
 if(!rows.length){const sql=await readFile(path.join(process.cwd(),'database/001_initial.sql'),'utf8'); await db.transaction(async tx=>{await tx.exec(sql);await tx.query('INSERT INTO schema_migrations VALUES ($1)',['001_initial']);});}
}
export async function getDB():Promise<DB>{
 if(!globals.rgmDB) globals.rgmDB=(async()=>{
  if(isLocal()){const db=await createLocalDB(process.env.LOCAL_DB_PATH||path.join(process.cwd(),'.local/pgdata')); await migrate(db); return db;}
  if(!process.env.DATABASE_URL) throw new Error('CONFIGURATION REQUIRED: DATABASE_URL');
  const pool=new Pool({connectionString:process.env.DATABASE_URL,max:5,ssl:process.env.DATABASE_SSL==='false'?false:{rejectUnauthorized:true}});
  const wrap=(client:any):DB=>({query:(s,v=[])=>client.query(s,v),exec:s=>client.query(s),transaction:async fn=>{const c=await pool.connect();try{await c.query('BEGIN');const result=await fn(wrap(c));await c.query('COMMIT');return result;}catch(e){await c.query('ROLLBACK');throw e;}finally{c.release();}}});
  return wrap(pool);
 })();
 return globals.rgmDB;
}
