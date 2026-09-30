'use client';
export default function ErrorPage({reset}:{reset:()=>void}){return <main style={{maxWidth:700,margin:'80px auto',padding:24}}><h1>Unable to load this page</h1><p>Please try again. Your previously submitted inquiries remain saved.</p><p lang="ar" dir="rtl">تعذر تحميل الصفحة. يرجى المحاولة مرة أخرى.</p><button onClick={reset}>Try again / إعادة المحاولة</button></main>;}
