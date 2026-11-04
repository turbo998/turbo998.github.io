'use strict';
const fs = require('node:fs');
const path = require('node:path');
const professional = require('./professional-navigation.cjs');
const search = require('./site-search.cjs');
const {htmlFiles,plain} = require('./build-search-index.cjs');
const root=path.resolve(__dirname,'..');
const readJSON=file=>fs.existsSync(path.join(root,file))?JSON.parse(fs.readFileSync(path.join(root,file),'utf8')):null;
function localeRegistry() {
  const pairs=new Map();
  function add(en,zh) {if(en&&zh&&en!==zh){pairs.set(en,{en,zh});pairs.set(zh,{en,zh});}}
  for(const row of readJSON('docs/redesign/reading-migration.json')?.records||[]) {
    const counterpart=row.language?.counterpart;
    if(counterpart)add(...(row.language.resolved.startsWith('zh')?[counterpart,row.path]:[row.path,counterpart]));
  }
  add('index.html','zh.html');add('style-preview.html','zh-style-preview.html');add('frontier-ai-studio.en.html','frontier-ai-studio.html');
  for(const file of htmlFiles().filter(file=>file.startsWith('studio/')&&!path.posix.basename(file).startsWith('zh-'))) {
    const zh=file.replace(/([^/]+)$/,'zh-$1');if(fs.existsSync(path.join(root,zh)))add(file,zh);
  }
  for(const file of htmlFiles()) {
    if(file.endsWith('.en.html')) {
      const zh=file.replace(/\.en\.html$/,'.html');
      if(fs.existsSync(path.join(root,zh)))add(file,zh);
    } else if(file.endsWith('.zh.html')) {
      const en=file.replace(/\.zh\.html$/,'.html');
      if(fs.existsSync(path.join(root,en)))add(en,file);
    } else if(path.posix.basename(file).startsWith('zh-')) {
      const en=file.replace(/zh-([^/]+)$/,'$1');
      if(fs.existsSync(path.join(root,en)))add(en,file);
    }
  }
  function visit(value) {
    if(!value||typeof value!=='object')return;
    if(typeof value.en==='string'&&typeof value.zh==='string')add(value.en,value.zh);
    for(const item of Object.values(value))if(typeof item==='object')visit(item);
  }
  for(const file of ['report-localization','demo-localization','phase179-localization'])visit(readJSON(`docs/redesign/${file}.json`));
  const {manifest: reportManifest}=require('./localize-reports.cjs');
  for(const record of reportManifest) {
    pairs.set(record.en,{en:record.en,zh:record.zh});
    pairs.set(record.zh,{en:record.en,zh:record.zh});
    pairs.set(record.source,{en:record.en,zh:record.zh});
  }
  add('workshops/data-lab/index.en.html','workshops/data-lab/index.html');
  pairs.set('workshops/data-lab/live-demo.en.html',{en:'workshops/data-lab/index.en.html',zh:'workshops/data-lab/index.html'});
  pairs.set('workshops/data-lab/live-demo.html',{en:'workshops/data-lab/index.en.html',zh:'workshops/data-lab/index.html'});
  return pairs;
}
function finalizeSite() {
  const pairs=localeRegistry(), records=[], unresolved=[];
  const {classifyPath}=require('./engineering-tracks.cjs');
  const {knowledgeFigure}=require('./knowledge-atlas.cjs');
  const {manifest: reportManifest}=require('./localize-reports.cjs');
  const {files: phase179Files}=require('./phase179-render.cjs');
  const reportOwned=new Set(reportManifest.flatMap(r=>[r.source,r.en,r.zh]));
  const phase179Owned=new Set(phase179Files);
  for(const file of htmlFiles()) {
    const absolute=path.join(root,file);let html=fs.readFileSync(absolute,'utf8');
    const en=!/<html\b[^>]*lang=["']zh/i.test(html), pair=pairs.get(file);
    if(!pair)unresolved.push(file);
    const isReportOrPhase179=(reportOwned.has(file)&&html.includes('<!-- kee-report-localization-navigation:start -->'))||phase179Owned.has(file);
    if(reportOwned.has(file)&&html.includes('<!-- kee-report-localization-navigation:start -->')) {
      const title=plain(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]||file);
      const fig=knowledgeFigure(file,!en,{topic:classifyPath(file)||'benchmarks',title}).replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'');
      html=html.replace(/<figure class="knowledge-figure" data-knowledge-atlas="[^"]*"[\s\S]*?<\/figure>/,()=>fig);
      if(!html.includes('.knowledge-graph-wide'))html=html.replace('</style><!-- kee-report-localization:metadata:end -->','.knowledge-graph-wide{display:block}.knowledge-graph-compact{display:none}@media(max-width:600px){.knowledge-graph-wide{display:none}.knowledge-graph-compact{display:block}}</style><!-- kee-report-localization:metadata:end -->');
    }
    if(!isReportOrPhase179)html=html.replace(/(<html\b[^>]*\blang=)["']zh["']/i,'$1"zh-CN"').replace(/<style id="site-remediation-style">[\s\S]*?<\/style>\s*/g,'').replace(/<!-- site-remediation-knowledge:start -->[\s\S]*?<!-- site-remediation-knowledge:end -->\s*/g,'');
    if(!/<(header|nav)\b[^>]*data-professional-header[^>]*>/.test(html)&&!/class="site-header"/.test(html)&&!isReportOrPhase179) {
      const topic=classifyPath(file);
      const topicTarget=topic==='sa-skills'?`studio/${en?'':'zh-'}index.html#sa-skills`:topic==='general'?`studio/${en?'':'zh-'}index.html`:`studio/${en?'':'zh-'}${topic}.html`;
      const context=`<a href="${professional.relative(file,`studio/${en?'':'zh-'}index.html`)}">← ${en?'Engineering Hub':'工程枢纽'}</a> · <a class="reading-context" href="${professional.relative(file,topicTarget)}">${en?'Parent topic':'返回主题'}</a>`;
      const languages=pair?`<a href="${professional.relative(file,pair.en)}"${!en?' data-reading-language':''} hreflang="en" lang="en"${en?' aria-current="page"':''}>EN</a><a href="${professional.relative(file,pair.zh)}"${en?' data-reading-language':''} hreflang="zh-CN" lang="zh-CN"${!en?' aria-current="page"':''}>中文</a>`:'';
      html=html.replace(/<body\b[^>]*>/i,match=>match+professional.navigation({file,en,className:'kee-dedicated-nav',languages,context}));
    }
    const header=/<(header|nav)\b[^>]*data-professional-header[^>]*>[\s\S]*?<\/\1>/.exec(html);
    if(header&&!isReportOrPhase179) {
      const className=/class="([^"]+)"/.exec(header[0])?.[1]||'kee-dedicated-nav';
      const topic=classifyPath(file);
      const topicTarget=topic==='sa-skills'?`studio/${en?'':'zh-'}index.html#sa-skills`:topic==='general'?`studio/${en?'':'zh-'}index.html`:`studio/${en?'':'zh-'}${topic}.html`;
      const context=`<a href="${professional.relative(file,`studio/${en?'':'zh-'}index.html`)}">← ${en?'Engineering Hub':'工程枢纽'}</a> · <a class="reading-context" href="${professional.relative(file,topicTarget)}">${en?'Parent topic':'返回主题'}</a>`;
      const languages=pair?`<a href="${professional.relative(file,pair.en)}"${!en?' data-reading-language':''} hreflang="en" lang="en"${en?' aria-current="page"':''}>EN</a><a href="${professional.relative(file,pair.zh)}"${en?' data-reading-language':''} hreflang="zh-CN" lang="zh-CN"${!en?' aria-current="page"':''}>中文</a>`:'';
      html=html.replace(/<div class="professional-context-bar">[\s\S]*?<\/div>/g,'');
      html=html.replace(header[0],professional.navigation({file,en,className,languages,context}));
    }
    const sealed=/<meta\b[^>]*Content-Security-Policy[^>]*default-src\s+'none'/i.test(html);
    if(sealed)html=html.replace(/<script\b[^>]*\bsrc=["'][^"']*(?:dedicated-navigation|editorial\/search(?:-index)?)\.js["'][^>]*><\/script>/gi,'');
    if(header&&!isReportOrPhase179) {
      const styleText=html.includes('dedicated-navigation.css')?search.css():professional.css();
      html=html.replace('</head>',`<style id="site-remediation-style">${styleText}</style></head>`);
      if(!sealed&&!/src="[^"]*editorial\/search\.js"/.test(html))html=html.replace('</head>',`${search.runtime(file)}</head>`);
    }
    // Localized navigation follows actual edition pairs; scripts and source data remain untouched.
    if(pair&&!isReportOrPhase179)html=html.split(/(<script\b[^>]*>[\s\S]*?<\/script>)/gi).map(part=>/^<script\b/i.test(part)?part:part.replace(/<a\b[^>]*>/gi,tag=>{
      if(/hreflang=|data-nav-en-href=|\bclass="demo-frame"/i.test(tag))return tag;
      return tag.replace(/href="([^"]+)"/, (attribute,target)=>{
        if(/^(?:[a-z]+:|#|\/\/)/i.test(target))return attribute;
        const url=new URL(target,'https://site.invalid/'+file), destination=url.pathname.slice(1), linked=pairs.get(destination);
        if(!linked)return attribute;
        if(url.searchParams.has('lang'))url.searchParams.set('lang',en?'en':'zh-CN');
        return `href="${professional.relative(file,en?linked.en:linked.zh)}${url.search}${url.hash}"`;
      });
    })).join('');
    if(header&&!isReportOrPhase179&&!/class="(?:[^"]*\s)?(?:knowledge-atlas|phase179-knowledge)\b|data-knowledge-atlas=/.test(html)) {
      const title=plain(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]||file);
      const figure=knowledgeFigure(file,!en,{topic:classifyPath(file)||'infra',title});
      const marker=`<!-- site-remediation-knowledge:start -->${figure}<!-- site-remediation-knowledge:end -->`;
      const contextEnd=/<div class="professional-context-bar">[\s\S]*?<\/div>/;
      html=html.replace(contextEnd,match=>match+marker);
    } else if(!isReportOrPhase179&&/<figure class="knowledge-figure" data-knowledge-atlas="[^"]*"[\s\S]*?<\/figure>/.test(html)) {
      const title=plain(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1]||file);
      const figure=knowledgeFigure(file,!en,{topic:classifyPath(file)||'infra',title});
      html=html.replace(/<figure class="knowledge-figure" data-knowledge-atlas="[^"]*"[\s\S]*?<\/figure>/,()=>figure);
    }
    if(/^studio\/(?:zh-)?archive\.html$/.test(file)) {
      html=html.replace(/<!-- localized-archive:start -->[\s\S]*?<!-- localized-archive:end -->/g,'');
      const escape=value=>value.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
      const entries=[...new Set([...pairs.values()].map(pair=>en?pair.en:pair.zh))].sort();
      const links=entries.map(target=>{
        const source=fs.readFileSync(path.join(root,target),'utf8');
        const title=plain(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(source)?.[1]||target);
        return `<li class="wb-card"><h3><a href="${professional.relative(file,target)}">${escape(title)}</a></h3><p class="wb-desc">${escape(target)}</p></li>`;
      }).join('');
      html=html.replace('</main>',`<!-- localized-archive:start --><section id="locale-archive" class="section"><h2>${en?'Complete localized page directory':'完整本地化页面目录'}</h2><ul class="card-grid">${links}</ul></section><!-- localized-archive:end --></main>`);
    }
    fs.writeFileSync(absolute,html);
    records.push({path:file,language:en?'en':'zh-CN',counterpart:pair?(en?pair.zh:pair.en):null,sealed,header:!!header||/class="site-header"/.test(html)});
  }
  fs.writeFileSync(path.join(root,'docs/redesign/site-localization.json'),JSON.stringify({records,unresolved},null,2)+'\n');
  console.log(`Finalized ${records.length} pages; ${unresolved.length} unresolved locales`);
  return {records,unresolved};
}
if(require.main===module)finalizeSite();
module.exports={localeRegistry,finalizeSite};
