'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {spawn}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const output=process.env.SITE_ARTIFACT_DIR||path.join(root,'site-test-artifacts','remediation');
const rawArgs=process.argv.slice(2);
const serial=rawArgs.includes('--serial')||process.env.VERIFY_SERIAL==='1';
const requested=rawArgs.filter(arg=>!arg.startsWith('--'));
const suites=requested.length?requested:['production-site','production-routes','design-preview','reading-migration','dedicated-smoke','professional-navigation','aurora-theme','data-lab-integration','webiq-integration','radar-integration','commerce-trends-integration','phase179-integration','report-localization','demo-localization','pelican-arena','knowledge-atlas','global-search','site-localization','full-site-audit'];
const serverScript=`
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=${JSON.stringify(root)};
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.mp4':'video/mp4','.glb':'model/gltf-binary','.bin':'application/octet-stream'};
const cache=new Map();
function readCached(file){
 const hit=cache.get(file);
 if(hit)return hit;
 const stat=fs.statSync(file);
 const target=stat.isDirectory()?path.join(file,'index.html'):file;
 const tStat=target===file?stat:fs.statSync(target);
 const content=fs.readFileSync(target);
 const ct=mime[path.extname(target).toLowerCase()]||'application/octet-stream';
 const entry={content,ct};
 if(tStat.size<=32*1024*1024&&cache.size<4096)cache.set(file,entry);
 return entry;
}
const s=http.createServer((req,res)=>{
 const url=new URL(req.url||'/',\`http://\${req.headers.host||'127.0.0.1'}\`);
 let rel=decodeURIComponent(url.pathname).replace(/^\\/+/, '');
 if(!rel||rel.endsWith('/'))rel+='index.html';
 const file=path.resolve(root,rel);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
 try{
  const {content,ct}=readCached(file);
  const rg=req.headers.range&&req.headers.range.match(/bytes=(\\d+)-(\\d*)/);
  if(rg){
   const start=Number(rg[1]),end=rg[2]?Number(rg[2]):content.length-1;
   res.writeHead(206,{'Content-Type':ct,'Accept-Ranges':'bytes','Cache-Control':'public, max-age=3600','Content-Range':\`bytes \${start}-\${end}/\${content.length}\`,'Content-Length':end-start+1});
   res.end(content.subarray(start,end+1));
   return;
  }
  res.writeHead(200,{'Content-Type':ct,'Accept-Ranges':'bytes','Cache-Control':'public, max-age=3600'});
  res.end(content);
 }catch{res.writeHead(404).end('Not found');}
});
s.listen(0,'127.0.0.1',()=>process.stdout.write(String(s.address().port)+'\\n'));
`;
function runSuite(name,baseUrl){
 return new Promise(resolve=>{
  const directory=path.join(output,name);fs.mkdirSync(directory,{recursive:true});
  const args=[path.join(root,'tests',name+'.cjs')];
  if(name==='knowledge-atlas'){args.push('--browser');if(process.env.VERIFY_SCREENSHOTS==='1')args.push('--screenshots');}
  const startedAt=new Date().toISOString();console.log(`Verifying ${name}`);
  const child=spawn(process.execPath,args,{cwd:root,env:{...process.env,SITE_TEST_URL:baseUrl,READING_BASE_URL:baseUrl+'/',DEDICATED_BASE_URL:baseUrl+'/',SITE_ARTIFACT_DIR:directory,READING_ARTIFACTS:directory,FULL_BROWSER_AUDIT:name==='full-site-audit'?'1':process.env.FULL_BROWSER_AUDIT||''}});
  const chunks=[];
  child.stdout.on('data',d=>chunks.push(d));
  child.stderr.on('data',d=>chunks.push(d));
  let spawnErr=null;
  child.on('error',err=>{spawnErr=err;});
  child.on('close',code=>{
   const status=typeof code==='number'?code:1;
   const logText=Buffer.concat(chunks).toString('utf8')+(spawnErr?String(spawnErr):'');
   fs.writeFileSync(path.join(directory,'validation.log'),logText);
   console.log(`${status===0?'PASS':'FAIL'} ${name}`);
   resolve({suite:name,passed:status===0,status,startedAt,completedAt:new Date().toISOString(),evidence:path.relative(output,directory).replaceAll('\\','/')+'/validation.log'});
  });
 });
}
async function runPool(list,baseUrl,concurrency,results){
 let cursor=0;
 await Promise.all(Array.from({length:Math.min(concurrency,list.length)},async()=>{
  while(cursor<list.length){
   const name=list[cursor++];
   const row=await runSuite(name,baseUrl);
   results.push(row);
   fs.writeFileSync(path.join(output,'validation-summary.json'),JSON.stringify({results},null,2));
  }
 }));
}
async function main(){
 fs.mkdirSync(output,{recursive:true});const results=[];
 const srv=spawn(process.execPath,['-e',serverScript],{cwd:root,stdio:['ignore','pipe','inherit']});
 const port=await new Promise((resolve,reject)=>{
  let buf='';
  srv.stdout.on('data',d=>{buf+=d;const m=buf.match(/(\d+)\r?\n/);if(m)resolve(Number(m[1]));});
  srv.on('error',reject);
 });
 const baseUrl=`http://127.0.0.1:${port}`;
 const concurrency=serial?1:Math.max(1,Number(process.env.VERIFY_CONCURRENCY||3));
 const fastSuites=suites.filter(s=>s!=='full-site-audit'&&s!=='demo-localization');
 const heavySuites=suites.filter(s=>s==='demo-localization'||s==='full-site-audit');
 try{
  if(fastSuites.length)await runPool(fastSuites,baseUrl,concurrency,results);
  if(heavySuites.length)await runPool(heavySuites,baseUrl,1,results);
 }finally{
  srv.kill();
 }
 if(results.some(row=>!row.passed))process.exitCode=1;
}
main().catch(err=>{console.error(err);process.exitCode=1;});
