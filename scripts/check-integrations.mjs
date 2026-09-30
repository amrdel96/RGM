// Presence checks only: no network, database writes or customer messages.
const env = process.env, failures = [];
function need(name) {
  const value = env[name]?.trim();
  if (!value || /^(replace|your[-_]|<|\[)/i.test(value)) failures.push(name);
}
function httpsURL(name) {
  need(name);
  if (!env[name]) return;
  try { if (new URL(env[name]).protocol !== 'https:') failures.push(name + ': HTTPS required'); }
  catch { failures.push(name + ': invalid URL'); }
}
if (!['production','staging'].includes(env.APP_ENV)) failures.push('APP_ENV: expected staging or production');
if (env.DB_MODE !== 'postgres') failures.push('DB_MODE: expected postgres');
need('DATABASE_URL');
if (env.DATABASE_URL) {
  try { if (!['postgres:', 'postgresql:'].includes(new URL(env.DATABASE_URL).protocol)) failures.push('DATABASE_URL: invalid protocol'); }
  catch { failures.push('DATABASE_URL: invalid URL'); }
}
if (env.DATABASE_SSL === 'false') failures.push('DATABASE_SSL: TLS must remain enabled');
httpsURL('NEXT_PUBLIC_SITE_URL'); httpsURL('NEXT_PUBLIC_SUPABASE_URL');
for (const name of ['NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY','CLOUDINARY_CLOUD_NAME','CLOUDINARY_API_KEY','CLOUDINARY_API_SECRET']) need(name);
for (const name of ['CRON_SECRET','UPLOAD_TOKEN_SECRET']) {
  need(name);
  if (env[name] && env[name].length < 32) failures.push(name + ': use at least 32 random characters');
}
const email = env.EMAIL_PROVIDER || 'mock', whatsapp = env.WHATSAPP_PROVIDER || 'mock';
if (!['mock','smtp','resend','postmark'].includes(email)) failures.push('EMAIL_PROVIDER: unsupported');
if (email !== 'mock') {
  need('EMAIL_FROM'); need('EMAIL_REPLY_TO');
  for (const name of email === 'smtp' ? ['EMAIL_HOST','EMAIL_PORT','EMAIL_USER','EMAIL_PASSWORD'] : ['EMAIL_API_KEY']) need(name);
}
if (!['mock','meta','wati'].includes(whatsapp)) failures.push('WHATSAPP_PROVIDER: unsupported');
if (whatsapp !== 'mock') need('WHATSAPP_API_KEY');
if (whatsapp === 'meta') {
  for (const name of ['WHATSAPP_PHONE_ID','META_GRAPH_VERSION','WHATSAPP_WEBHOOK_SECRET','WHATSAPP_VERIFY_TOKEN']) need(name);
  if (env.META_GRAPH_VERSION && !/^v\d+\.\d+$/.test(env.META_GRAPH_VERSION)) failures.push('META_GRAPH_VERSION: expected vNN.N');
}
if (whatsapp === 'wati') httpsURL('WATI_API_URL');
if (env.APP_ENV !== 'production' && (email !== 'mock' || whatsapp !== 'mock')) need('TEST_RECIPIENT_ALLOWLIST');
for (const item of [...new Set(failures)]) console.log('MISSING / INVALID: ' + item);
console.log('Email: ' + email + '; WhatsApp: ' + whatsapp + '. Mock means no external delivery.');
console.log('Manual setup remains: DB migrations, staff, contacts, domain verification, templates and scheduler. No live connectivity was checked.');
if (whatsapp === 'wati') console.log('WATI delivery-status webhook is not implemented.');
console.log(failures.length ? 'Hosted configuration is incomplete.' : 'Environment presence checks passed; this is not launch approval.');
process.exitCode = failures.length ? 1 : 0;
