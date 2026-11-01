const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {execFileSync} = require('node:child_process');
const root = path.join(__dirname, '..');
const inventory = require('../docs/redesign/route-inventory.json');
const production = require('../docs/redesign/production-routes.json');
const base = process.env.DEPLOYED_SITE_URL || 'https://turbo998.github.io/';
const output = process.env.SITE_ARTIFACT_DIR || path.join(root,'site-test-artifacts');
const sha = execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim();
const hash = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const report = {sha,base,checkedAt:new Date().toISOString(),result:'RUNNING',files:[],errors:[]};
function collect(dir) {
  if(!fs.existsSync(path.join(root,dir))) return [];
  return fs.readdirSync(path.join(root,dir),{withFileTypes:true}).flatMap(e=>e.isDirectory()?collect(dir+'/'+e.name):[dir+'/'+e.name]);
}
async function main() {
  fs.mkdirSync(output,{recursive:true});
  assert.equal(execFileSync('git',['status','--porcelain'],{cwd:root,encoding:'utf8'}).trim(), '', 'Commit the verified tree before comparing deployed bytes to its SHA');
  // Git-tracked HTML includes newly added translation counterparts, not just the baseline inventory.
  const tracked=execFileSync('git',['ls-files','*.html'],{cwd:root,encoding:'utf8'}).trim().split(/\r?\n/).filter(f=>f&&!f.startsWith('design-preview/'));
  const files=[...new Set([...inventory.content.map(p=>p.path),...production.portalPages,...tracked,...collect('assets/editorial'),'workshops/github-trending-radar/summary-2026-11-01.svg',...collect('workshops/azure-agent-infra/assets').filter(f=>f.endsWith('.en.svg')),...['assets/reading-shell.css','assets/reading-shell.js','assets/dedicated-navigation.css','assets/dedicated-navigation.js'].filter(f=>fs.existsSync(path.join(root,f)))])];
  try {
    for(let i=0;i<files.length;i+=6) {
      await Promise.all(files.slice(i,i+6).map(async file=>{
        try {
          const url=new URL(file,base); url.searchParams.set('v',sha);
          const response=await fetch(url,{signal:AbortSignal.timeout(30000),cache:'no-store'});
          const actual=Buffer.from(await response.arrayBuffer());
          const expected=hash(execFileSync('git',['show',`${sha}:${file}`],{cwd:root,maxBuffer:32*1024*1024}));
          const record={file,status:response.status,expectedSha256:expected,actualSha256:hash(actual)};
          report.files.push(record);
          if(response.status!==200||record.actualSha256!==expected)report.errors.push(record);
        } catch(error) {
          const record={file,error:error.message};
          report.files.push(record);
          report.errors.push(record);
        }
      }));
    }
    assert.deepEqual(report.errors,[],'Published bytes differ from verified checkout');
    report.result='PASS';
    console.log(`PASS: ${report.files.length} deployed HTML/assets match commit ${sha} byte-for-byte.`);
  }catch(error){report.result='FAIL';report.errors.push(error.message);throw error;}
  finally{fs.writeFileSync(path.join(output,'deployment-validation.json'),JSON.stringify(report,null,2));}
}
main().catch(error=>{console.error(error);process.exitCode=1;});
