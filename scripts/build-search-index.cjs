'use strict';
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const ignored = new Set(['.git','node_modules','.venv','design-preview','docs','tests','scripts','.github']);
function htmlFiles(directory=root) {
  return fs.readdirSync(directory,{withFileTypes:true}).flatMap(entry => ignored.has(entry.name) ? [] : entry.isDirectory() ? htmlFiles(path.join(directory,entry.name)) : entry.name.endsWith('.html') ? [path.relative(root,path.join(directory,entry.name)).replaceAll('\\','/')] : []);
}
function plain(html) {
  return html.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&#x([a-f\d]+);/gi,(_,n)=>String.fromCodePoint(parseInt(n,16))).replace(/&#(\d+);/g,(_,n)=>String.fromCodePoint(Number(n))).replace(/&(?:amp|lt|gt|quot|apos|nbsp);/g,v=>({'&amp;':'&','&lt;':'<','&gt;':'>','&quot;':'"','&apos;':"'",'&nbsp;':' '})[v]).replace(/\s+/g,' ').trim();
}
function buildSearchIndex() {
  const entries = [], repositories = new Map();
  for (const file of htmlFiles()) {
    const html=fs.readFileSync(path.join(root,file),'utf8');
    const language=/<html\b[^>]*lang=["']([^"']+)/i.exec(html)?.[1]?.startsWith('zh')?'zh-CN':'en';
    const title=plain(/<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] || file);
    const body=plain(html.replace(/<(header|nav)\b[^>]*(?:data-professional-header|class="site-header")[^>]*>[\s\S]*?<\/\1>/gi,''));
    const category=/^studio\/(?:zh-)?(?:index|data-infra|infra|commerce|voice|benchmarks|animation|game|security)\.html$/.test(file)?'Track':/cards?(?:\.en|\.zh)?\.html$/.test(file)?'7-Card Benchmark':/(?:demos\/|workbench|selector|\/demo|\/deck|\/game\/)/.test(file)?'Interactive Demo':'Architecture & Study';
    const concepts=[...new Set(body.split(/\s+/))].join(' ');
    entries.push({url:file,language,title,category,text:concepts});
    for(const match of html.matchAll(/href=["'](https:\/\/github\.com\/turbo998\/([A-Za-z0-9_.-]+))(?:[\/#?"'])/g)) repositories.set(match[1],match[2]);
  }
  for(const [url,title] of repositories) entries.push({url,language:'both',title,category:'Repository',text:title.replaceAll('-',' ')});
  entries.sort((a,b)=>a.url.localeCompare(b.url));
  fs.writeFileSync(path.join(root,'assets/editorial/search-index.js'),'window.ENGINEERING_SEARCH_INDEX = '+JSON.stringify(entries).replaceAll('<','\\u003c')+';\n');
  fs.writeFileSync(path.join(root,'docs/redesign/search-index.json'),JSON.stringify({pages:entries.filter(x=>x.category!=='Repository').length,repositories:repositories.size,categories:Object.fromEntries([...new Set(entries.map(x=>x.category))].map(category=>[category,entries.filter(x=>x.category===category).length])),languages:Object.fromEntries(['en','zh-CN','both'].map(language=>[language,entries.filter(x=>x.language===language).length]))},null,2)+'\n');
  console.log(`Search index: ${entries.length} records`);return entries;
}
if(require.main===module)buildSearchIndex();
module.exports={buildSearchIndex,htmlFiles,plain};
