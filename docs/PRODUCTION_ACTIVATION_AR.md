# تفعيل نسخة RGM الحقيقية

الكود جاهز للنشر على Vercel أو أي خادم Node.js 24+ مع PostgreSQL. لا يمكن تشغيل الحسابات الحقيقية أو البريد أو DNS من دون دخول المالك إلى الحسابات المرتبطة بالدومين.

## 1. قاعدة البيانات والحسابات

1. أنشئ مشروع Supabase جديدًا في منطقة قريبة من العملاء.
2. في Supabase Auth فعّل **Email + Password** وفعّل **Confirm email**.
3. أضف إلى قائمة Redirect URLs:
   - `https://rgmachinery.com/auth/callback`
   - `https://www.rgmachinery.com/auth/callback`
   - عنوان Preview في Vercel عند الحاجة.
4. نفّذ جميع ملفات `database/*.sql` بالترتيب على PostgreSQL الخاص بالمشروع.
5. أضف أول مستخدم إداري من Supabase Auth، ثم أضف UUID الخاص به في جدول `staff` بدور `ADMIN`.

## 2. متغيرات البيئة في الاستضافة

انسخ `.env.example` إلى إعدادات Vercel أو الخادم، وأدخل القيم الحقيقية فقط هناك:

- `APP_ENV=production`
- `DB_MODE=postgres`
- `DATABASE_URL` و `DATABASE_SSL=true`
- `NEXT_PUBLIC_SITE_URL=https://rgmachinery.com`
- `NEXT_PUBLIC_SUPABASE_URL` و `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`
- حساب الإرسال: اختر `EMAIL_PROVIDER=resend` أو `smtp` وأدخل `EMAIL_FROM` وبياناته.
- Cloudinary: `CLOUDINARY_CLOUD_NAME`, `CLOUDINARY_API_KEY`, `CLOUDINARY_API_SECRET` لرفع صور وPDF الماكينات.
- شغّل `node scripts/prepare-integration-secrets.mjs` محليًا ثم أضف `CRON_SECRET` و`UPLOAD_TOKEN_SECRET` الناتجين كأسرار.

لا تضع مفاتيح أو كلمات مرور في GitHub أو في ملفات الواجهة.

## 3. البريد والنشرة

النظام يرسل تلقائيًا تأكيد الحساب من Supabase. اشتراك النشرة يرسل رابط تأكيد مستقل، ولا يصبح المشترك `ACTIVE` إلا بعد فتحه. يلزم توثيق النطاق المرسل (SPF/DKIM) لدى مزود البريد قبل الإرسال للعملاء.

## 4. النطاق وDNS

في Vercel أضف `rgmachinery.com` و`www.rgmachinery.com` للمشروع. استخدم سجلات DNS التي يعرضها Vercel في شركة تسجيل الدومين. بعد نجاح التحقق، اجعل النطاق الأساسي `rgmachinery.com` وفعّل تحويل `www` إليه. لا تغيّر سجلات البريد الحالية إلا بعد مراجعة مزود البريد، لأنها قد تؤثر على بريد `@rgmachinery.com`.

## 5. المخزون

الموقع الرسمي الحالي لا ينشر قائمة ماكينات أو صورًا حقيقية؛ صفحة Stock List تقول إن المتجر تحت التجهيز. لهذا لم تُضف بيانات أو صورًا مختلقة. بعد الدخول إلى `/admin` أضف الماكينات يدويًا أو استورد CSV/XLSX وارفع صورها إلى التخزين الحقيقي.

## حقائق الاتصال المستوردة

تمت إضافة البيانات القابلة للتعديل من صفحة الاتصال الرسمية: `info@rgmachinery.com`، فروع مصر والسعودية والإمارات، وعناوينها وأرقامها العامة. راجعها في Admin → Site settings قبل النشر، خصوصًا اختيار رقم WhatsApp الأساسي.

المصدر: https://rgmachinery.com/contact-us/
