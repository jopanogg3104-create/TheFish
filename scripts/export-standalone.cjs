// Rebuild downloadable HTML from the running production site.
// Usage: node scripts/export-standalone.cjs http://127.0.0.1:3020
const fs=require('fs'),path=require('path');
const {chromium}=require('playwright');
const root=path.resolve(__dirname,'..'),origin=process.argv[2];
if(!origin)throw Error('Provide the local production server URL.');
function dataURL(file){const ext=path.extname(file);const mime={'.png':'image/png','.jpeg':'image/jpeg','.jpg':'image/jpeg','.woff2':'font/woff2','.woff':'font/woff'}[ext]||'application/octet-stream';return 'data:'+mime+';base64,'+fs.readFileSync(file).toString('base64');}
(async()=>{const browser=await chromium.launch({executablePath:'/usr/bin/chromium',headless:true,args:['--no-sandbox']});const page=await browser.newPage();await page.emulateMedia({reducedMotion:'reduce'});let styles='';let home='';let menu='';
for(const [route,file] of [['/','index.html'],['/cardapio','cardapio.html'],['/privacidade','privacidade.html']]){
 await page.goto(origin+route);if(route==='/cardapio')await page.locator('#category-select').waitFor();
 if(!styles){const sheets=await page.locator('link[rel=stylesheet]').evaluateAll(ns=>ns.map(n=>n.href));for(const href of sheets){let css=await (await fetch(href)).text();css=css.replace(/url\(["']?([^)'"\s]+)["']?\)/g,(match,u)=>{if(u.startsWith('data:'))return match;const resolved=new URL(u,href).pathname;if(!resolved.startsWith('/_next/'))return match;return 'url("'+dataURL(path.join(root,'.next',resolved.replace('/_next/','')))+'")';});styles+=css;}styles+=' .hero-copy>* , .hero-photo{animation:none!important}.tf-accordion-trigger{list-style:none}.tf-accordion-trigger::-webkit-details-marker{display:none}details[open]>.tf-accordion-trigger svg{transform:rotate(45deg)}';}
 if(route==='/'){
  const items=await page.locator('.tf-accordion-item').count();for(let i=0;i<items;i++){const item=page.locator('.tf-accordion-item').nth(i);await item.locator('button').click();await item.locator('.tf-accordion-content').waitFor();const answer=await item.locator('.tf-accordion-content').textContent();await item.evaluate((node,a)=>{const button=node.querySelector('button');node.dataset.question=button.textContent;node.dataset.answer=a;},answer);}
  await page.locator('.tf-accordion-item').evaluateAll(ns=>{for(const node of ns){const d=document.createElement('details');d.className='tf-accordion-item';const summary=document.createElement('summary');summary.className='tf-accordion-trigger';summary.textContent=node.dataset.question;const answer=document.createElement('div');answer.className='tf-accordion-content';const inner=document.createElement('div');inner.textContent=node.dataset.answer;answer.append(inner);d.append(summary,answer);node.replaceWith(d);}});
 }
 const sources=await page.locator('img').evaluateAll(ns=>ns.map(n=>n.getAttribute('src')));const images={};for(const src of sources){let url=new URL(src,origin);let original=url.pathname==='/_next/image'?url.searchParams.get('url'):url.pathname;if(original?.startsWith('/assets/'))images[src]=dataURL(path.join(root,'public',original));}
 await page.locator('img').evaluateAll((ns,images)=>{for(const img of ns){const src=images[img.getAttribute('src')];if(src){img.src=src;img.removeAttribute('srcset');}}},images);
 await page.locator('a').evaluateAll(ns=>{for(const a of ns){const href=a.getAttribute('href');if(href==='/')a.href='index.html';else if(href==='/cardapio')a.href='cardapio.html';else if(href==='/privacidade')a.href='privacidade.html';else if(href?.startsWith('/#'))a.href='index.html'+href.slice(1);}});
 let html=await page.locator(route==='/cardapio'?'.new-menu':'.new-home').evaluate(n=>n.outerHTML);
 let script='';if(route==='/cardapio'){script=fs.readFileSync(path.join(root,'app.js'),'utf8');const photos=JSON.parse(script.match(/const menuPhotos=(.*?);\n/)[1]);for(const p of Object.values(photos))p.src=dataURL(path.join(root,'public',p.src));script=script.replace(/const menuPhotos=(.*?);\n/,'const menuPhotos='+JSON.stringify(photos)+';\n');script='<script>'+script+'</script>';}
 const document='<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="theme-color" content="#121310"><title>The Fish — Restaurante e Petiscaria</title><style>'+styles+'</style></head><body>'+html+script+'</body></html>';
 fs.writeFileSync(path.join(root,file),document);if(route==='/')home=html;if(route==='/cardapio')menu=html;
 if(route==='/cardapio'){
 const menuContent='<div class="new-menu">'+await page.locator('.new-menu > div').first().evaluate(n=>n.outerHTML)+'</div>';
 let combined=home.replace('<footer',()=>menuContent+'<footer').replaceAll('href="cardapio.html"','href="#cardapio"');
 fs.writeFileSync(path.join(root,'site-completo.html'),'<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>The Fish</title><style>'+styles+'</style></head><body>'+combined+script+'</body></html>');
 }
}
await browser.close();console.log('HTMLs independentes atualizados com novo visual, fontes, fotos, FAQ e cardápio.');})();
