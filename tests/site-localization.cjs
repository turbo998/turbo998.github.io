'use strict';
const fs=require('node:fs');
const path=require('node:path');
const assert=require('node:assert/strict');
const puppeteer=require('puppeteer');
const root=path.resolve(__dirname,'..');
const manifest=require('../docs/redesign/site-localization.json');
const index=JSON.parse(fs.readFileSync(path.join(root,'assets/editorial/search-index.js'),'utf8').replace(/^window\.ENGINEERING_SEARCH_INDEX\s*=\s*/,'').replace(/;\s*$/,''));
const output=process.env.SITE_ARTIFACT_DIR||path.join(root,'site-test-artifacts');
(async()=>{
 fs.mkdirSync(output,{recursive:true});
 assert.deepEqual(manifest.unresolved,[],'Every local production page has a real localized counterpart');
 const browser=await puppeteer.launch({headless:'shell',pipe:true});const records=[];
 try{
  const parser=await browser.newPage();
  for(const row of manifest.records){
   const html=fs.readFileSync(path.join(root,row.path),'utf8');
   const state=await parser.evaluate(html=>{
    const doc=new DOMParser().parseFromString(html,'text/html');const header=doc.querySelector('.site-header,[data-professional-header]');
    return {lang:doc.documentElement.lang,header:!!header,search:!!header?.querySelector('input[type=search]'),diagram:!!doc.querySelector('[data-knowledge-atlas],.phase179-knowledge,.knowledge-atlas'),switches:[...doc.querySelectorAll('.professional-controls a[hreflang],.language-link')].map(a=>({language:a.hreflang,href:a.getAttribute('href')})),externalResources:[...doc.querySelectorAll('script[src],link[rel=stylesheet]')].map(e=>e.getAttribute('src')||e.getAttribute('href')),csp:doc.querySelector('meta[http-equiv="Content-Security-Policy"]')?.content};
   },html);
   assert(state.header&&state.search,row.path+' shared header and search');
   assert(state.diagram,row.path+' overall architecture diagram');
   assert.equal(state.lang,row.language,row.path+' declaration');
   assert(fs.existsSync(path.join(root,row.counterpart)),row.path+' existing counterpart');
   const opposite=row.language==='en'?'zh-CN':'en';
   const languageLink=state.switches.find(link=>link.language===opposite);
   assert(languageLink,row.path+' exact-page language control');
   const target=new URL(languageLink.href,'https://site.invalid/'+row.path);
   assert.equal(target.pathname.slice(1),row.counterpart,row.path+' must not redirect language switch to a parent');
   if(row.sealed){assert(state.csp.includes("default-src 'none'")&&state.csp.includes("style-src 'unsafe-inline'"),row.path+' sealed CSP');assert.deepEqual(state.externalResources,[],row.path+' no external report runtime/style');}
   const entries=Array.isArray(index)?index:index.records;
   assert(entries.some(entry=>entry.url===row.path),row.path+' searchable');
   records.push({path:row.path,...state,counterpart:row.counterpart});
  }
 }finally{await browser.close();fs.writeFileSync(path.join(output,'site-localization.json'),JSON.stringify({records},null,2));}
 console.log(`PASS: ${records.length} exact-page bilingual routes, shared search headers, knowledge diagrams and indexed pages`);
})().catch(error=>{console.error(error);process.exitCode=1;});
