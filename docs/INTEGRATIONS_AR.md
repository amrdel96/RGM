# ربط منصات RGM — 28 سبتمبر 2026

هذا دليل الربط للأجزاء الجديدة فقط. الربط الخارجي والنشر والإرسال الحقيقي لم ينفذوا بعد، لأن الحسابات غير متاحة. الفحوص العامة 1–3 مؤجلة بطلب المستخدم؛ تجهيز هذه الملفات لا يعني اعتماد الموقع للإطلاق.

## أين تضع القيم؟
- محلياً: ملف `.env.local` في جذر المشروع بجوار `package.json`. لا تستبدل الملف المحلي الحالي؛ أضف القيم المناسبة لبيئة منفصلة.
- على Vercel: Project Settings → Environment Variables. استخدم بيئات منفصلة للإنتاج والمعاينة. أعد النشر بعد تغيير القيم اللازمة.
- القالب الكامل: `.env.example`. لا تضع الأسرار داخل كود React أو `next.config.ts` أو GitHub.
- إعدادات الشركة والمستلمين والقوالب: `/admin/settings` في قاعدة البيانات، وليست متغيرات بيئة.
- أسماء مثل `RGM_INQUIRY_EMAIL` و`WHATSAPP_ENABLED` و`WHATSAPP_TEMPLATE_NAME` لا يقرأها التطبيق الحالي من البيئة، لذلك أزيلت من القالب. مفتاح Supabase السري ليس مطلوباً للمسارات الحالية.

## 1. GitHub وVercel والدومين
أنشئ مستودع GitHub خاصاً وارفع مجلد المشروع، مع استبعاد الملفات التي يغطيها `.gitignore`، خصوصاً `.env.local` و`.local` وتقارير الاختبارات. اربط المستودع بمشروع Vercel. لا يلزم GitHub token داخل التطبيق.
حدد جذر المشروع الذي يحتوي `package.json`، وإطار Next.js، ثم أضف متغيرات البيئة. لا تنقل `APP_ENV=local` أو `DB_MODE=pglite` للاستضافة.
استخدم `APP_ENV=staging` للمعاينة و`APP_ENV=production` للموقع النهائي، و`DB_MODE=postgres` لكليهما. اجعل `NEXT_PUBLIC_SITE_URL` رابط HTTPS الفعلي المطابق لعنوان الزيارة دون شرطة نهائية.
ربط الدومين يتطلب الوصول إلى حساب DNS الحالي. انسخ سجلات Vercel الخاصة بالمشروع، ولا تغيّر سجلات بريد الشركة أثناء ربط الموقع.

## 2. Supabase: قاعدة البيانات وتسجيل الدخول
المطلوب:
- `DATABASE_URL`: اتصال PostgreSQL الخاص بالبيئة.
- `NEXT_PUBLIC_SUPABASE_URL`: رابط مشروع Supabase.
- `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`: المفتاح العام المخصص للتطبيق.
- `DATABASE_SSL=true`: إبقاء التحقق من TLS مفعلاً.

اتصال Transaction pooler مناسب لطلبات Vercel المؤقتة. للتأسيس والمهاجرات استخدم اتصال Direct أو Session pooler المتاح من مشروعك. لا تنسخ عنواناً افتراضياً؛ خذه من لوحة Connect.
طبّق `database/001_initial.sql` عبر أمر المهاجرات الموجود، ببيئة مستهدفة معلومة:
```powershell
node --env-file=.env.hosted.local --import tsx scripts/migrate.ts
```
الملف `.env.hosted.local` ملف سري محلي تنشئه للبيئة المستضافة؛ يغطيه استثناء Git الحالي. يشمل متغيرات البيئة أعلاه، ولا يوضع في المستودع. المهاجرات تنشئ الجداول وتستورد المحتوى الإنجليزي ولا تضيف مخزوناً وهمياً.
في Supabase Auth اضبط عنوان الموقع وإعادة التوجيه إلى:
`https://YOUR-DOMAIN/auth/callback`
يسمح مسار الاستعادة بالانتقال داخلياً إلى `/admin/reset`. اضبط بريد Auth أيضاً إذا أردت إرسال دعوات واستعادة كلمات المرور؛ إعداد EMAIL_PROVIDER في التطبيق مستقل عن بريد Supabase Auth.
أنشئ حساب المدير في Supabase Auth وأكمل تأكيد بريده، ثم اربطه لأول مرة:
```powershell
node --env-file=.env.hosted.local --import tsx scripts/bootstrap-admin.ts USER_UUID admin@your-domain
```
السكربت يتحقق من تطابق المعرف والبريد في Auth، ويرفض العمل إذا كان هناك مدير نشط. بقية الموظفين: أنشئ هويتهم في Auth ثم اربط ID والدور عبر `/admin/users`.

## 3. Cloudinary
أدخل `CLOUDINARY_CLOUD_NAME` و`CLOUDINARY_API_KEY` و`CLOUDINARY_API_SECRET`.
التطبيق يرفع الصور وPDF كملفات authenticated عبر الخادم؛ لا يحتاج unsigned upload preset. إتاحة الملفات تتم من مسار التطبيق وفق حالة الماكينة والصلاحيات.

## 4. الإيميل
اختر مزوداً واحداً:
- SMTP: `EMAIL_PROVIDER=smtp` ثم HOST / PORT / USER / PASSWORD بالأسماء الكاملة الموجودة في القالب.
- Resend: `EMAIL_PROVIDER=resend` و`EMAIL_API_KEY`.
- Postmark: `EMAIL_PROVIDER=postmark` و`EMAIL_API_KEY`.
حدد `EMAIL_FROM` بهوية إرسال موثقة و`EMAIL_REPLY_TO` بصندوق تتابعه الشركة. نفّذ توثيق نطاق الإرسال وفق سجلات المزود الفعلية.
من `/admin/settings` أدخل `inquiry_email` و`service_email` و`general_email`. هذه مختلفة عن عنوان المرسل.
أبقِ `EMAIL_PROVIDER=mock` أثناء التجهيز. في staging أي إرسال حقيقي مقيد بقائمة `TEST_RECIPIENT_ALLOWLIST`، التي تحتوي عناوين وأرقام الاختبار الدقيقة مفصولة بفواصل.

## 5. واتساب
لـMeta:
`WHATSAPP_PROVIDER=meta`، `WHATSAPP_API_KEY` رمز وصول بصلاحية الإرسال، `WHATSAPP_PHONE_ID` معرف رقم الأعمال وليس الرقم نفسه، `META_GRAPH_VERSION` إصدار مدعوم تختاره من إعداد التطبيق.
`WHATSAPP_WEBHOOK_SECRET` هو App Secret المستخدم للتحقق من توقيع webhook. `WHATSAPP_VERIFY_TOKEN` قيمة تطابق Verify Token في إعداد webhook.
الرابط: `https://YOUR-DOMAIN/api/webhooks/whatsapp`. اشترك في تحديثات الرسائل المناسبة من تطبيق Meta.
قدّم قالبين عربي وإنجليزي وفق `docs/WHATSAPP_TEMPLATES_AR.md`، ثم أدخل أسماء القوالب المقبولة في `whatsapp_template_ar` و`whatsapp_template_en` من لوحة الموقع. الكود الحالي يرسل رمزي اللغة ar وen؛ يجب أن تتطابق لغات القالب معهما.
رقم زر التواصل هو `primary_whatsapp` في لوحة الموقع. تفعيل الأتمتة هو `whatsapp_enabled`؛ ويشترط أيضاً موافقة العميل الخاصة بواتساب.
لـWATI: `WHATSAPP_PROVIDER=wati`، `WATI_API_URL`، `WHATSAPP_API_KEY`. إرسال القالب مجهز؛ استقبال حالات التسليم من WATI يحتاج تنفيذ ربط إضافي. لا تعتبر webhook الخاص بـMeta صالحاً لـWATI.
لا توجد موافقة مضمونة على القوالب؛ القرار للمزود.

## 6. الأسرار وجدولة الإرسال
```powershell
node scripts/prepare-integration-secrets.mjs
```
ينشئ ملفاً محلياً مستبعداً من Git: `.local/integration-secrets.env` دون طباعة القيم أو استبدال ملف سابق. يحتوي CRON_SECRET وUPLOAD_TOKEN_SECRET وWHATSAPP_VERIFY_TOKEN. انسخ القيم إلى البيئة المعنية فقط؛ لا تستبدل أسرار بيئة عاملة بلا داعٍ.
الجدول الموجود في `vercel.json` كل خمس دقائق. خطة Vercel Hobby لا تدعم هذا التكرار؛ يلزم حساب يسمح به أو جدولة خارجية تتصل بـ`/api/cron` باستخدام `Authorization: Bearer CRON_SECRET`. لم تُشترَ أي خطة ولم تُنشأ جدولة خارجية.
لا تعتمد على الاستدعاء التالي للعميل وحده لمعالجة الرسائل المعلقة.

## أمر يوضح المتغيرات الناقصة دون كشف قيمها
```powershell
node --env-file=.env.hosted.local scripts/check-integrations.mjs
```
هذا يفحص وجود القيم وصيغاً أساسية فقط، ولا يختبر الحسابات أو يرسل رسائل أو يمثل اختبار إطلاق.

## ما أحتاجه منك
1. روابط مشاريع GitHub وVercel وSupabase، والدومين المطلوب ومن يدير DNS.
2. اختيار مزود البريد وعنوان المرسل وصندوق استقبال الاستفسارات.
3. اختيار Meta أو WATI ورقم الأعمال ولغات القوالب المقبولة.
4. حساب Cloudinary، وبريد المدير الأول.
5. إدخال الأسرار مباشرة في البيئة؛ لا ترسلها في المحادثة.

مراجع إعدادات الاستضافة: [اتصالات Supabase](https://supabase.com/docs/guides/database/connecting-to-postgres)، [قيود جدولة Vercel](https://vercel.com/docs/cron-jobs/usage-and-pricing).
