import type {MetadataRoute} from 'next';
export default function robots():MetadataRoute.Robots{return process.env.APP_ENV==='production'?{rules:{userAgent:'*',allow:'/',disallow:['/admin','/api','/auth']},sitemap:(process.env.NEXT_PUBLIC_SITE_URL||'')+'/sitemap.xml'}:{rules:{userAgent:'*',disallow:'/'}};}
