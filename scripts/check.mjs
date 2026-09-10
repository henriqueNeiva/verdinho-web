import fs from 'node:fs';import path from 'node:path';import assert from 'node:assert/strict';import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const pages=JSON.parse(fs.readFileSync(new URL('../src/pages.json',import.meta.url),'utf8'));
let links=0;
for(const page of pages){
 const file=path.join(root,page.route,'index.html'), html=fs.readFileSync(file,'utf8');
 assert.ok(html.includes('lang="pt-BR"'),file+' language');
 assert.equal((html.match(/<h1[ >]/g)||[]).length,1,file+' needs one H1');
 assert.ok(!/\{\{\w+\}\}/.test(html),file+' unresolved template');
 assert.ok(!/<script\b/i.test(html),file+' unexpected browser script');
 assert.ok(html.includes('henriquesneiva@gmail.com')||!page.legal,file+' missing legal contact');
 const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]); assert.equal(new Set(ids).size,ids.length,file+' duplicate IDs');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const ref=match[1];if(/^(https?:|mailto:|data:)/.test(ref)) continue;
  assert.ok(!ref.startsWith('/'),file+' absolute path would break project Pages');
  const [relative,hash]=ref.split('#');let dest=relative?path.resolve(path.dirname(file),relative):file;
  assert.ok(dest===root||dest.startsWith(root+path.sep),'link outside public root');
  if(fs.existsSync(dest)&&fs.statSync(dest).isDirectory())dest=path.join(dest,'index.html');
  assert.ok(fs.existsSync(dest),file+' missing '+ref);
  if(hash){const target=fs.readFileSync(dest,'utf8');assert.ok(target.includes('id="'+hash+'"'),file+' missing anchor '+ref);}
  links++;
 }
}
assert.ok(fs.statSync(path.join(root,'assets/google-logo.png')).size<1000000,'Google logo must be below 1 MB');
console.log('OK: '+pages.length+' páginas, '+links+' referências locais, âncoras, metadados e limite do logo Google.');
