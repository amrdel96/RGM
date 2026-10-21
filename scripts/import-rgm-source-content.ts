import {readFile} from 'node:fs/promises';
import sanitize from 'sanitize-html';
import {getDB,migrate} from '../lib/db';

type SourcePage={slug:string;link:string;title:{rendered:string};content:{rendered:string}};
const pages=JSON.parse(await readFile('migration/source/pages.json','utf8')) as SourcePage[];
const source=(slug:string)=>{const p=pages.find(x=>x.slug===slug);if(!p)throw new Error(`Missing WordPress source page: ${slug}`);return p;};
const clean=(html:string)=>sanitize(html,{allowedTags:['h2','h3','h4','p','br','strong','em','ul','ol','li','blockquote','a','img'],allowedAttributes:{a:['href'],img:['src','alt']},allowedSchemes:['https','http'],transformTags:{a:(_tag,attrs)=>({tagName:'a',attribs:{...attrs,rel:'noopener noreferrer'}})}}).replace(/Join Our Newsletter[\s\S]*$/i,'').trim();
const content=[
 ['home','page','Welcome to Roza Graphic Machinery','مرحبًا بكم في روزا جرافيك ماشينري',clean(source('roza-graphic-machinery').content.rendered),source('roza-graphic-machinery').link],
 ['about','page','About RGM','عن RGM',clean(source('about-used-offset-priniting-machine').content.rendered),source('about-used-offset-priniting-machine').link],
 ['services','page','RGM Services','خدمات RGM',clean(source('service').content.rendered),source('service').link]
] as const;
const services=[
 ['cylinder-repair','Cylinder repair','إصلاح السلندرات','We repair printing-machine cylinders using specialist technicians and materials. Send the machine model, cylinder condition and photographs for assessment.'],
 ['installation-maintenance','Installation and maintenance','التركيب والصيانة','Experienced RGM engineers and technicians support installation and maintenance for printing machinery worldwide.'],
 ['packing-shipping','Packing and shipment','التعبئة والشحن','RGM provides packing and shipment support for machinery, spare parts, repair and maintenance requirements to destinations worldwide.'],
 ['dismantling-relocation','Dismantling and relocation','الفك والنقل','RGM coordinates dismantling and relocation logistics for printing machinery.'],
 ['after-sales','After-sales support','خدمات ما بعد البيع','RGM supports installation, operation training and maintenance after the sale.']
] as const;
if(!process.argv.includes('--apply')){console.log('Source content mapping validated. Add --apply to write homepage, about and service content to the configured database.');process.exit(0);}
const db=await getDB();await migrate(db);
for(const [slug,kind,titleEn,titleAr,bodyEn,url] of content)await db.query('INSERT INTO content(slug,kind,title_en,title_ar,body_en,body_ar,published,arabic_ready,source_url,updated_at) VALUES($1,$2,$3,$4,$5,$6,true,false,$7,now()) ON CONFLICT(slug) DO UPDATE SET title_en=$3,title_ar=$4,body_en=$5,source_url=$7,updated_at=now()',[slug,kind,titleEn,titleAr,bodyEn,'',url]);
for(const [slug,titleEn,titleAr,bodyEn] of services)await db.query("INSERT INTO content(slug,kind,title_en,title_ar,body_en,body_ar,published,arabic_ready,source_url,updated_at) VALUES($1,'service',$2,$3,$4,'',true,false,$5,now()) ON CONFLICT(slug) DO UPDATE SET title_en=$2,title_ar=$3,body_en=$4,updated_at=now()",[slug,titleEn,titleAr,bodyEn,'https://rgmachinery.com/service/']);
console.log('RGM source content imported. Arabic source copy still requires editorial approval before publication.');
