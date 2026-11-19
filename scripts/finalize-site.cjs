'use strict';
const fs = require('node:fs');
const path = require('node:path');
const professional = require('./professional-navigation.cjs');
const search = require('./site-search.cjs');
const {htmlFiles,plain} = require('./build-search-index.cjs');
const {motionDemoRoutes} = require('./motion-studies.cjs');
const root=path.resolve(__dirname,'..');
const readJSON=file=>fs.existsSync(path.join(root,file))?JSON.parse(fs.readFileSync(path.join(root,file),'utf8')):null;
function localeRegistry() {
  const pairs=new Map();
  function add(en,zh) {if(en&&zh&&en!==zh){pairs.set(en,{en,zh});pairs.set(zh,{en,zh});}}
  for(const row of readJSON('docs/redesign/reading-migration.json')?.records||[]) {
    const counterpart=row.language?.counterpart;
    if(counterpart)add(...(row.language.resolved.startsWith('zh')?[counterpart,row.path]:[row.path,counterpart]));
  }
  add('index.html','zh.html');add('diamond.html','zh-diamond.html');add('style-preview.html','zh-style-preview.html');add('frontier-ai-studio.en.html','frontier-ai-studio.html');
  add('articles/agent-harness-coevolution.en.html','articles/agent-harness-coevolution.html');
  add('workshops/agent-harness-coevolution/index.en.html','workshops/agent-harness-coevolution/index.html');
  add('workshops/agent-harness-coevolution/cards.html','workshops/agent-harness-coevolution/cards.zh.html');
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
  for (const base of [
    'workshops/benchmarks/aipc-kev-sft-q8-gguf-cards',
    'workshops/benchmarks/clio-industry-harness-cards',
    'workshops/benchmarks/gpt-6-2-sol-cards',
    'workshops/benchmarks/mai-image-2-7-cards',
    'workshops/benchmarks/terminal-bench-4-1-cards',
    'workshops/benchmarks/mi300x-large-moe-bf16-mxfp4-cards',
    'workshops/scientific-and-industry-harness-engineering/cards',
    'workshops/scientific-and-industry-harness-engineering/test-report-cards'
  ]) {
    const hasZh = fs.existsSync(path.join(root, `${base}.zh.html`));
    const hasZhCN = fs.existsSync(path.join(root, `${base}.zh-CN.html`));
    const primaryZh = hasZh ? `${base}.zh.html` : `${base}.zh-CN.html`;
    if (fs.existsSync(path.join(root, `${base}.html`)) && primaryZh) pairs.set(`${base}.html`, { en: `${base}.html`, zh: primaryZh });
    if (hasZh) pairs.set(`${base}.zh.html`, { en: `${base}.html`, zh: `${base}.zh.html` });
    if (fs.existsSync(path.join(root, `${base}.en.html`)) && hasZhCN) {
      pairs.set(`${base}.en.html`, { en: `${base}.en.html`, zh: `${base}.zh-CN.html` });
      pairs.set(`${base}.zh-CN.html`, { en: `${base}.en.html`, zh: `${base}.zh-CN.html` });
    }
  }
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
  const singleEditionSealed=new Set([
    'workshops/benchmarks/ai-cluster-optical-interconnect-selection-cards.html',
    'workshops/benchmarks/rlhf-post-training-infra-selection-cards.html',
    'workshops/benchmarks/ai-datacenter-cooling-power-selection-cards.html',
    'workshops/benchmarks/gpu-sharing-isolation-selection-cards.html',
    'workshops/benchmarks/speculative-decoding-selection-cards.html',
    'workshops/benchmarks/long-context-attention-parallelism-selection-cards.html',
    'workshops/benchmarks/gpu-cluster-fault-recovery-selection-cards.html',
    'workshops/benchmarks/rocev2-load-balancing-congestion-selection-cards.html'
  ]);
  for(const file of htmlFiles()) {
    if(singleEditionSealed.has(file))continue;
    const absolute=path.join(root,file);let html=fs.readFileSync(absolute,'utf8');
    const motionExhibit=Object.values(motionDemoRoutes).includes(file);
    if(file==='articles/harness-engineering.html'&&!html.includes('agent-harness-coevolution.html')) {
      html=html.replace(/(<p class="meta">[\s\S]*?<\/p>)/,'$1\n\n  <div class="callout">\n    🔬 <b>2026-11 最新实战续篇（含可视化图表与交互式工作台）</b>：<a href="agent-harness-coevolution.html">《随模型升级持续演进 Agent Harness：120 个 Skills 审计、上下文悬崖修复与模型协同实战报告》</a>（面向 Gemini 4 Carbon · GPT-6.2 Sol · Grok 4.7，附 <a href="../workshops/agent-harness-coevolution/index.html">5-Tab 演示工作台</a> 与 <a href="../workshops/agent-harness-coevolution/cards.zh.html">7 卡汇报集</a>）。\n  </div>');
    }
    if(file==='articles/harness-engineering.en.html'&&!html.includes('agent-harness-coevolution.en.html')) {
      html=html.replace(/(<p class="meta">[\s\S]*?<\/p>)/,'$1\n\n  <div class="callout">\n    🔬 <b>Hands-On Empirical Companion (Nov 2026)</b>: Read <a href="agent-harness-coevolution.en.html"><i>Agent Harness × Frontier Model Co-Evolution: 120-Skill Audit, 12 KB Cliff Fix &amp; Multi-Model Playbook</i></a> (covering Gemini 4 Carbon · GPT-6.2 Sol · Grok 4.7, with the <a href="../workshops/agent-harness-coevolution/index.en.html">5-Tab Presenter Workbench</a> and <a href="../workshops/agent-harness-coevolution/cards.html">7-Card Visual Deck</a>).\n  </div>');
    }
    if(file.endsWith('.en.html'))html=html.replace(/(<html\b[^>]*\blang=)["'][^"']*["']/i,'$1"en"');
    if(!/<\/head>/i.test(html)&&/<main\b/i.test(html)){
      html=html.replace(/(<html\b[^>]*>)/i,'$1<head>').replace(/<main\b/i,'</head><body>$&');
      if(!/<\/body>/i.test(html))html=html.replace(/<\/main>\s*$/i,'</main></body></html>');
    }
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
      if(!sealed&&!/src="[^"]*editorial\/search\.js"/.test(html))html=html.replace('</head>',`${search.runtime(file,{lazyIndex:motionExhibit})}</head>`);
    }
    if(motionExhibit) {
      const track=professional.relative(file,`studio/${en?'':'zh-'}animation.html`);
      html=html.replace(/(<a class="back" href=")https:\/\/turbo998\.github\.io\/studio\/(?:zh-)?animation\.html#demos"/, `$1${track}#demos"`);
      if(!html.includes('/motion-studies-navigation.js"'))html=html.replace('</head>',`<script src="${professional.relative(file,'assets/editorial/motion-studies-navigation.js')}" defer></script></head>`);
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
      if(motionExhibit)html=html.replace('</main>',match=>marker+match);
      else {
        const contextEnd=/<div class="professional-context-bar">[\s\S]*?<\/div>/;
        if(contextEnd.test(html))html=html.replace(contextEnd,match=>match+marker);
        else html=html.replace(/(<(header|nav)\b[^>]*data-professional-header[^>]*>[\s\S]*?<\/\2>)/,match=>match+marker);
      }
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

    if(/^workshops\/data-lab\/index(?:\.en)?\.html$/.test(file)) {
      html=html.replace(/<!-- kee-diamond-datalab:start -->[\s\S]*?<!-- kee-diamond-datalab:end -->\s*/g,'');
      const diamondBanner = en
        ? `<!-- kee-diamond-datalab:start --><section id="diamond-datalab-showcase" class="kee-diamond-datalab-banner" style="box-sizing:border-box;max-width:1340px;margin:28px auto 40px;padding:24px;border:1px solid #2b4c7e;border-radius:16px;background:linear-gradient(135deg,#0b192e 0%,#102644 100%);color:#e6edf7;font-family:system-ui,-apple-system,Segoe UI,sans-serif"><p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7dd3fc;font-weight:700">DIAMOND ENTERPRISE LIVE DEMO SUITE · TCL ENVIRONMENT · FABRIC · DATABRICKS</p><h2 style="margin:0 0 10px;font-size:clamp(20px,3vw,28px);color:#ffffff">Enterprise Lakehouse &amp; Agentic Operations Live Demos</h2><p style="margin:0 0 18px;color:#cbd5e1;line-height:1.65">Move from platform comparison to runnable Solution Architect customer PoCs in the unified Diamond Enterprise Demo Environment (single-tenant Entra ID OBO + M365 + Microsoft Fabric + Azure Databricks + Copilot Studio).</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:16px"><article style="padding:18px;border-radius:12px;border:1px solid #31568a;background:rgba(15,31,56,.78)"><strong style="display:block;color:#93c5fd;font-size:12px;margin-bottom:6px">DEMO 01 · MICROSOFT FABRIC NATIVE</strong><h3 style="margin:0 0 8px;font-size:18px;color:#fff">TCL Global Channel IQ × Microsoft Fabric</h3><p style="margin:0 0 12px;font-size:14px;color:#cbd5e1;line-height:1.6">$135.33M Sell-In &amp; $108.95M OMO Sell-Out across 36 global partners, OneLake zero-copy shortcuts, Eventhouse 48h Black Friday stockout rescue, Fabric IQ 10-entity Ontology ($582K margin saved), and Data + Operations Agent write-back.</p><a href="../diamond-demos/tcl-fabric/index.en.html" style="display:inline-block;padding:8px 14px;border-radius:8px;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;font-size:14px">Launch TCL × Fabric Cockpit →</a></article><article style="padding:18px;border-radius:12px;border:1px solid #31568a;background:rgba(15,31,56,.78)"><strong style="display:block;color:#67e8f9;font-size:12px;margin-bottom:6px">DEMO 02 · DATABRICKS × FABRIC ZERO-COPY</strong><h3 style="margin:0 0 8px;font-size:18px;color:#fff">Zava Omnichannel Cold-Chain × Azure Databricks &amp; Fabric</h3><p style="margin:0 0 12px;font-size:14px;color:#cbd5e1;line-height:1.6">Unity Catalog 24,024→24,000 Medallion quality gate, AI/BI Genie root-cause drilldown (Kunshan #2 17.3h cold-chain delay), Mirrored Azure Databricks Catalog in OneLake + 0-DBU Power BI Direct Lake, and 10-dimension SA selection matrix.</p><a href="../diamond-demos/databricks-fabric/index.en.html" style="display:inline-block;padding:8px 14px;border-radius:8px;background:#0284c7;color:#fff;text-decoration:none;font-weight:600;font-size:14px">Launch Databricks × Fabric Console →</a></article></div><p style="margin:16px 0 0;font-size:14px"><a href="../../diamond.html" style="color:#93c5fd;text-decoration:underline;font-weight:600">Open Full Diamond Enterprise Demo Center &amp; Workload Selection Matrix →</a></p></section><!-- kee-diamond-datalab:end -->`
        : `<!-- kee-diamond-datalab:start --><section id="diamond-datalab-showcase" class="kee-diamond-datalab-banner" style="box-sizing:border-box;max-width:1340px;margin:28px auto 40px;padding:24px;border:1px solid #2b4c7e;border-radius:16px;background:linear-gradient(135deg,#0b192e 0%,#102644 100%);color:#e6edf7;font-family:system-ui,-apple-system,Segoe UI,sans-serif"><p style="margin:0 0 6px;font-size:12px;letter-spacing:.08em;text-transform:uppercase;color:#7dd3fc;font-weight:700">DIAMOND 企业级实战演示专区 · TCL 演示环境 · FABRIC · DATABRICKS</p><h2 style="margin:0 0 10px;font-size:clamp(20px,3vw,28px);color:#ffffff">从平台对比走向可现场演示的企业级湖仓与智能体闭环</h2><p style="margin:0 0 18px;color:#cbd5e1;line-height:1.65">基于预集成的 Diamond 企业级演示环境（单租户 Entra ID OBO + M365 + Microsoft Fabric + Azure Databricks + Copilot Studio），面向架构师提供两套开箱即演的端到端行业实战沙盘。</p><div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:16px"><article style="padding:18px;border-radius:12px;border:1px solid #31568a;background:rgba(15,31,56,.78)"><strong style="display:block;color:#93c5fd;font-size:12px;margin-bottom:6px">实战沙盘 01 · MICROSOFT FABRIC 原生全栈</strong><h3 style="margin:0 0 8px;font-size:18px;color:#fff">TCL 全球渠道智能 × Microsoft Fabric</h3><p style="margin:0 0 12px;font-size:14px;color:#cbd5e1;line-height:1.6">覆盖全球 36 家渠道伙伴（$135.33M Sell-In / $108.95M OMO Sell-Out）、OneLake 零拷贝快捷方式、黑五 48 小时断货预警调拨、Fabric IQ 十实体本体推演（挽回 $582K 毛利）与双智能体回写闭环。</p><a href="../diamond-demos/tcl-fabric/index.html" style="display:inline-block;padding:8px 14px;border-radius:8px;background:#2563eb;color:#fff;text-decoration:none;font-weight:600;font-size:14px">打开 TCL × Fabric 6 幕驾驶舱 →</a></article><article style="padding:18px;border-radius:12px;border:1px solid #31568a;background:rgba(15,31,56,.78)"><strong style="display:block;color:#67e8f9;font-size:12px;margin-bottom:6px">实战沙盘 02 · DATABRICKS × FABRIC 零拷贝共存</strong><h3 style="margin:0 0 8px;font-size:18px;color:#fff">Zava 全渠道生鲜冷链 × Azure Databricks &amp; Fabric</h3><p style="margin:0 0 12px;font-size:14px;color:#cbd5e1;line-height:1.6">Unity Catalog 24,024→24,000 质量门禁与动态脱敏、AI/BI Genie 华东生鲜毛利下滑根因追问（昆山 2 号仓 17.3h 延误）、OneLake 零拷贝目录镜像 + 0 DBU Direct Lake 秒级看板与 10 维选型矩阵。</p><a href="../diamond-demos/databricks-fabric/index.html" style="display:inline-block;padding:8px 14px;border-radius:8px;background:#0284c7;color:#fff;text-decoration:none;font-weight:600;font-size:14px">打开 Databricks × Fabric 实战沙盘 →</a></article></div><p style="margin:16px 0 0;font-size:14px"><a href="../../zh-diamond.html" style="color:#93c5fd;text-decoration:underline;font-weight:600">进入 Diamond 企业级实战演示中心与双平台选型总览 →</a></p></section><!-- kee-diamond-datalab:end -->`;
      html=html.replace('</body>',diamondBanner+'</body>');
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
