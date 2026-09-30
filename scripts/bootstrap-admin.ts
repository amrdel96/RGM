import { getDB, isLocal } from '../lib/db';
const [id, email] = process.argv.slice(2);
if (isLocal() || !['staging', 'production'].includes(process.env.APP_ENV || '')) throw new Error('Use a configured hosted environment.');
if (!id || !/^[a-f0-9-]{36}$/i.test(id) || !email?.includes('@')) throw new Error('Usage: bootstrap-admin.ts SUPABASE_USER_UUID EMAIL');
try {
  const db = await getDB();
  await db.transaction(async tx => {
    await tx.query("SELECT pg_advisory_xact_lock(hashtext('rgm-bootstrap-admin'))");
    if ((await tx.query("SELECT id FROM staff WHERE role='ADMIN' AND active=true")).rows.length) throw new Error('An administrator already exists.');
    const identity = (await tx.query('SELECT id FROM auth.users WHERE id=$1 AND lower(email)=lower($2) AND email_confirmed_at IS NOT NULL', [id, email])).rows;
    if (!identity.length) throw new Error('A matching confirmed Supabase Auth identity is required.');
    await tx.query("INSERT INTO staff(id,email,role,active) VALUES($1,$2,'ADMIN',true)", [id, email]);
  });
  console.log('First administrator linked. Sign in through /admin/login.');
  process.exit(0);
} catch {
  console.error('Bootstrap failed. Check migrations, confirmed Auth identity, DB permissions, and whether an administrator already exists.');
  process.exit(1);
}
