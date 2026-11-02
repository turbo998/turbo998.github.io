'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {spawn,spawnSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const output=process.env.SITE_ARTIFACT_DIR||path.join(root,'site-test-artifacts','remediation');
const requested=process.argv.slice(2);
const suites=requested.length?requested:['production-site','production-routes','design-preview','reading-migration','dedicated-smoke','professional-navigation','aurora-theme','data-lab-integration','webiq-integration','radar-integration','commerce-trends-integration','phase179-integration','report-localization','demo-localization','pelican-arena','knowledge-atlas','global-search','site-localization','full-site-audit'];
const serverScript=`
const http=require('node:http'),fs=require('node:fs'),path=require('node:path');
const root=${JSON.stringify(root)};
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'application/javascript; charset=utf-8','.json':'application/json; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.webp':'image/webp','.glb':'model/gltf-binary','.bin':'application/octet-stream'};
const s=http.createServer((req,res)=>{
 const url=new URL(req.url||'/',\`http://\${req.headers.host||'127.0.0.1'}\`);
 let rel=decodeURIComponent(url.pathname).replace(/^\\/+/, '');
 if(!rel||rel.endsWith('/'))rel+='index.html';
 const file=path.resolve(root,rel);
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return;}
 try{
  const stat=fs.statSync(file);
  const target=stat.isDirectory()?path.join(file,'index.html'):file;
  const content=fs.readFileSync(target);
  res.writeHead(200,{'Content-Type':mime[path.extname(target).toLowerCase()]||'application/octet-stream'});
  res.end(content);
 }catch{res.writeHead(404).end('Not found');}
});
s.listen(0,'127.0.0.1',()=>process.stdout.write(String(s.address().port)+'\\n'));
`;
async function main(){
 fs.mkdirSync(output,{recursive:true});const results=[];
 const srv=spawn(process.execPath,['-e',serverScript],{cwd:root,stdio:['ignore','pipe','inherit']});
 const port=await new Promise((resolve,reject)=>{
  let buf='';
  srv.stdout.on('data',d=>{buf+=d;const m=buf.match(/(\d+)\r?\n/);if(m)resolve(Number(m[1]));});
  srv.on('error',reject);
 });
 const baseUrl=`http://127.0.0.1:${port}`;
 try{
  for(const name of suites){
   const directory=path.join(output,name);fs.mkdirSync(directory,{recursive:true});
   const args=[path.join(root,'tests',name+'.cjs')];if(name==='knowledge-atlas')args.push('--browser','--screenshots');
   const startedAt=new Date().toISOString();console.log(`Verifying ${name}`);
   const run=spawnSync(process.execPath,args,{cwd:root,encoding:'utf8',maxBuffer:64*1024*1024,env:{...process.env,SITE_TEST_URL:baseUrl,READING_BASE_URL:baseUrl+'/',DEDICATED_BASE_URL:baseUrl+'/',SITE_ARTIFACT_DIR:directory,READING_ARTIFACTS:directory,FULL_BROWSER_AUDIT:name==='full-site-audit'?'1':process.env.FULL_BROWSER_AUDIT||''}});
   fs.writeFileSync(path.join(directory,'validation.log'),(run.stdout||'')+(run.stderr||'')+(run.error?String(run.error):''));
   results.push({suite:name,passed:run.status===0,status:run.status,startedAt,completedAt:new Date().toISOString(),evidence:path.relative(output,directory).replaceAll('\\','/')+'/validation.log'});
   fs.writeFileSync(path.join(output,'validation-summary.json'),JSON.stringify({results},null,2));
   console.log(`${run.status===0?'PASS':'FAIL'} ${name}`);
  }
 }finally{
  srv.kill();
 }
 if(results.some(row=>!row.passed))process.exitCode=1;
}
main().catch(err=>{console.error(err);process.exitCode=1;});
