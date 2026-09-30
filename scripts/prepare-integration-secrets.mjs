import { mkdir, writeFile } from 'node:fs/promises';
import { randomBytes } from 'node:crypto';
await mkdir('.local', { recursive: true });
const target = '.local/integration-secrets.env';
try {
  await writeFile(target, ['CRON_SECRET', 'UPLOAD_TOKEN_SECRET', 'WHATSAPP_VERIFY_TOKEN']
    .map(name => name + '=' + randomBytes(32).toString('hex')).join('\n') + '\n', { flag: 'wx', mode: 0o600 });
  console.log('Created ' + target + '. Copy into the intended environment; secrets were not printed.');
} catch (error) {
  if (error.code !== 'EEXIST') throw error;
  console.log(target + ' already exists; preserved without changes.');
}
