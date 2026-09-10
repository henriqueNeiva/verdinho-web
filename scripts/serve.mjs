import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../dist');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.png':'image/png','.svg':'image/svg+xml','.txt':'text/plain; charset=utf-8','.xml':'application/xml'};
http.createServer((req,res)=>{
 try{
  const url=new URL(req.url,'http://localhost'); let requested=decodeURIComponent(url.pathname);
  let file=path.resolve(root,'.'+requested);
  if(file!==root&&!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory()){if(!requested.endsWith('/')){res.writeHead(301,{Location:requested+'/'+url.search}).end();return;}file=path.join(file,'index.html');}
  if(!fs.existsSync(file)){res.writeHead(404,{'Content-Type':'text/html; charset=utf-8'}).end(fs.readFileSync(path.join(root,'404.html')));return;}
  res.writeHead(200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}).end(fs.readFileSync(file));
 }catch{res.writeHead(400).end('Endereço inválido');}
}).listen(4173,'127.0.0.1',()=>console.log('Verdinho Web: http://localhost:4173/'));
