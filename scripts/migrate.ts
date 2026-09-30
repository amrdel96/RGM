import {getDB,migrate} from '../lib/db';
import {seed} from '../lib/seed';
const db=await getDB();await migrate(db);await seed(db);console.log('Migrations and source content applied.');process.exit(0);
