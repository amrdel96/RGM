import { readFile } from 'node:fs/promises';
import { getDB } from '../lib/db';
const bundle = JSON.parse(await readFile('migration/arabic-articles.draft.json', 'utf8'));
if (bundle.status !== 'EDITORIAL_DRAFT_NOT_PUBLISHED' || bundle.articles.length !== 12) throw new Error('Unexpected translation bundle');
const seen = new Set<string>();
for (const item of bundle.articles) {
  if (!item.slug || !item.title_ar || !item.body_ar || seen.has(item.slug)) throw new Error('Invalid translation entry');
  seen.add(item.slug);
}
if (!process.argv.includes('--apply')) {
  console.log('12 Arabic editorial drafts validated. Add --apply to fill empty Arabic article fields; no publishing or existing translations will be changed.');
  process.exit(0);
}
try {
  const db = await getDB();
  const count = await db.transaction(async tx => {
    let updated = 0;
    for (const item of bundle.articles) {
      const result = await tx.query(
        "UPDATE content SET title_ar=$2,body_ar=$3,arabic_ready=false,updated_at=now() WHERE slug=$1 AND kind='article' AND trim(body_ar)='' AND arabic_ready=false RETURNING id",
        [item.slug, item.title_ar, item.body_ar]);
      updated += result.rows.length;
    }
    return updated;
  });
  console.log('Arabic drafts added: ' + count + '. Existing translations and English content preserved. Arabic publication remains disabled.');
  process.exit(0);
} catch {
  console.error('Draft import failed and the transaction was rolled back. Check database configuration and run migrations first.');
  process.exit(1);
}
