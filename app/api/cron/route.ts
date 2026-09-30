import {timingSafeEqual} from 'node:crypto';
import {getDB} from '../../../lib/db';
import {processOutbox} from '../../../lib/communications';
import {ok} from '../../../lib/http';
export async function GET(request:Request){const token=request.headers.get('authorization')||'';const expected=`Bearer ${process.env.CRON_SECRET||''}`;if(!process.env.CRON_SECRET||token.length!==expected.length||!timingSafeEqual(Buffer.from(token),Buffer.from(expected)))return ok({error:'Unauthorized'},401);return ok(await processOutbox(await getDB()));}
