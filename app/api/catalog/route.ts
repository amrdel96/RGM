import {getDB} from '../../../lib/db';
import {catalog} from '../../../lib/repository';
import {ok,failure} from '../../../lib/http';
export async function GET(request:Request){try{return ok(await catalog(await getDB(),Object.fromEntries(new URL(request.url).searchParams)));}catch(e){return failure(e);}}
