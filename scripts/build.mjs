import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const config=JSON.parse(fs.readFileSync(path.join(root,'site.config.json'),'utf8'));
const release=process.argv.includes('--release');
const ready=!!(config.ownerName && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.supportEmail) && config.legalReviewed && config.siteUrl);
if(release && !ready) throw new Error('Preencha ownerName, supportEmail, siteUrl e revise os documentos (legalReviewed) antes da publicação.');
if(config.siteUrl && !/^https:\/\//.test(config.siteUrl)) throw new Error('siteUrl precisa usar HTTPS.');
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const base=fs.readFileSync(path.join(root,'src/layout.html'),'utf8');
const pages=JSON.parse(fs.readFileSync(path.join(root,'src/pages.json'),'utf8'));
const out=path.join(root,'dist'); fs.mkdirSync(out,{recursive:true});
fs.cpSync(path.join(root,'assets'),path.join(out,'assets'),{recursive:true});
fs.copyFileSync(path.join(root,'src/styles.css'),path.join(out,'assets/styles.css'));
for(const page of pages){
 const prefix=page.route ? '../' : './';
 const route=page.route ? page.route+'/' : '';
 const canonical=config.siteUrl ? new URL(route,config.siteUrl.replace(/\/?$/,'/')).href : '';
 const contact=config.supportEmail ? '<a href="mailto:'+esc(config.supportEmail)+'">'+esc(config.supportEmail)+'</a>' : 'Canal de atendimento em preparação.';
 const values={prefix,title:esc(page.title),description:esc(page.description),body:fs.readFileSync(path.join(root,'src/pages',page.file),'utf8'),
   contact,owner:esc(config.ownerName||'Responsável a identificar antes da publicação'),date:esc(config.updatedAt),
   company:config.companyId?' · CNPJ '+esc(config.companyId):'',
   robots:release?'index,follow':'noindex,nofollow',
   canonical:canonical?'<link rel="canonical" href="'+esc(canonical)+'">':'',
   draft:page.legal&&!ready?'<aside class="draft-note" role="note"><strong>Versão preliminar.</strong> As condições operacionais e o conteúdo deste documento ainda precisam de revisão antes da publicação.</aside>':'',
   currentHome:page.route===''?' aria-current="page"':'',currentSupport:page.route==='suporte'?' aria-current="page"':''
 };
 let html=base.replace(/\{\{(\w+)\}\}/g,(_,k)=>values[k]??'');
 html=html.replace(/\{\{(\w+)\}\}/g,(_,k)=>values[k]??'');
 const folder=path.join(out,page.route); fs.mkdirSync(folder,{recursive:true}); fs.writeFileSync(path.join(folder,'index.html'),html);
}
fs.writeFileSync(path.join(out,'.nojekyll'),'');
fs.writeFileSync(path.join(out,'robots.txt'),release?'User-agent: *\nAllow: /\n'+(config.siteUrl?'Sitemap: '+config.siteUrl.replace(/\/$/,'')+'/sitemap.xml\n':''):'User-agent: *\nDisallow: /\n');
if(config.siteUrl){ const urls=pages.map(p=>'<url><loc>'+esc(new URL(p.route?p.route+'/':'',config.siteUrl.replace(/\/?$/,'/')).href)+'</loc></url>').join(''); fs.writeFileSync(path.join(out,'sitemap.xml'),'<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'+urls+'</urlset>'); }
fs.writeFileSync(path.join(out,'404.html'),'<!doctype html><html lang="pt-BR"><meta charset="utf-8"><meta name="viewport" content="width=device-width"><title>Página não encontrada · Verdinho</title><body style="background:#191d21;color:#f3f5ef;font:20px system-ui;padding:10vw"><h1>Essa página não está aqui.</h1><p>Confira o endereço ou volte à página anterior pelo navegador.</p></body></html>');
console.log('Site gerado em '+out+' ('+(release?'publicação':'prévia local')+').');
