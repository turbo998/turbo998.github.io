const path = require('node:path');
const BRAND = 'Frontier Transformation Engineering Hub';
const esc = value => String(value ?? '').replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const text = (value, zh) => typeof value === 'object' ? (Array.isArray(value) ? value[zh ? 1 : 0] : value[zh ? 'zh' : 'en']) : value;
const href = (file, target) => {
  if (/^(?:https?:|mailto:|#)/.test(target)) return target;
  const url = new URL(target.replace(/^\//,''), 'https://site.invalid/');
  return (path.posix.relative(path.posix.dirname(file), url.pathname.slice(1)) || path.posix.basename(url.pathname)) + url.search + url.hash;
};
const sections = [['architecture','Architecture','整体架构解读'],['evaluation','Evaluation','技术对比测评'],['demos','Demos','Demo 展示'],['resources','Resources','详细分支资料']];
const tracks = [['infra','AI InfraLab','AI InfraLab'],['commerce','Agentic Commerce','智能体商务'],['voice','Voice','语音'],['benchmarks','Benchmarks & Harness','测评与 Harness'],['animation','Animation','动画'],['game','Gaming','游戏'],['security','AI Security','AI 安全']];
const primary = [
  [BRAND,BRAND,'studio/index.html','studio/zh-index.html'],
  ['Benchmark & Eval Foundry','基准评测中心','benchmarks.html','zh-benchmarks.html'],
  ['GitHub AI Signal Radar','GitHub AI 信号雷达','github-radar.html','zh-github-radar.html'],
  ['Model Routing & Telemetry','OpenRouter 模型遥测','openrouter.html','zh-openrouter.html'],
  ['Principal Architect Profile','首席架构师履历','about.html','zh-about.html']
];
function context(file, zh, active) {
  const items = [...tracks, ['sa-skills','SA Skill & HVE Library','SA Skill 与 HVE 技能库']];
  return `<div class="context-bar"><p class="context-label">${zh?'工程赛道 / 快速导航':'ENGINEERING TRACKS / QUICK ACCESS'}</p><nav class="context-nav" aria-label="${zh?'Hub 工程赛道':'Hub engineering tracks'}">${items.map(([id,en,cn],i)=>`<a href="${href(file,id==='sa-skills'?`studio/${zh?'zh-':''}index.html#sa-skills`:`studio/${zh?'zh-':''}${id}.html`)}"${active===id?' aria-current="page"':''}><span>${String(i+1).padStart(2,'0')}</span>${esc(zh?cn:en)}</a>`).join('')}</nav></div>`;
}
function crumb(file, zh, label) {
  return `<nav class="breadcrumb" aria-label="${zh?'层级导航':'Breadcrumb'}"><a href="${href(file,zh?'zh.html':'index.html')}">${zh?'首页':'Home'}</a><span aria-hidden="true">/</span><a href="${href(file,`studio/${zh?'zh-':''}index.html`)}">Engineering Hub</a>${label?`<span aria-hidden="true">/</span><span aria-current="page">${esc(label)}</span>`:''}</nav>`;
}
function card(file, zh, data) {
  const links = data.links || [];
  const title = esc(text(data.title,zh));
  return `<article class="wb-card${data.featured?' wb-featured':''}"${data.id?` id="${esc(data.id)}"`:''}${data.scene?` data-scene="${esc(data.scene)}"`:''}><div class="wb-top"><span class="wb-badge">${esc(text(data.badge || ['ENGINEERING ASSET','工程资产'],zh))}</span><span class="wb-id">${esc(data.number || '')}</span></div><h3>${data.url?`<a href="${esc(href(file,data.url))}">${title}<span aria-hidden="true"> ↗</span></a>`:title}</h3><p class="wb-finding">${esc(text(data.finding || ['Architecture → evidence → execution','架构 → 证据 → 实践'],zh))}</p><p class="wb-desc">${esc(text(data.description || '',zh))}</p>${data.note?`<p class="wb-note">${esc(text(data.note,zh))}</p>`:''}<div class="wb-links">${links.map((link,i)=>`<a${i===0?' class="wb-action"':''} href="${esc(href(file,link.url))}">${esc(text(link.label,zh))}<span aria-hidden="true"> ↗</span></a>`).join('')}</div></article>`;
}
const grid = (cards, className='') => `<div class="card-grid ${className}">${cards.join('')}</div>`;
const section = (id, number, title, description, content) => `<section id="${id}" class="section"><div class="section-heading"><div><p class="eyebrow">${number}</p><h2>${esc(title)}</h2>${description?`<p class="section-intro">${esc(description)}</p>`:''}</div></div>${content}</section>`;
function shell(file, zh, title, content, options={}) {
  const counterpart = options.counterpart || (file==='index.html'?'zh.html':file==='zh.html'?'index.html':file.replace(/([^/]+)$/,(_,name)=>name.startsWith('zh-')?name.slice(3):'zh-'+name));
  const active = options.active ?? 0;
  const navigation = primary.map(([en,cn,english,chinese],i)=>`<a href="${href(file,zh?chinese:english)}"${active===i?' aria-current="page"':''}>${esc(zh?cn:en)}</a>`).join('');
  const label = zh?'主导航':'Primary navigation';
  return `<!doctype html>
<html lang="${zh?'zh-CN':'en'}" data-theme="dark" data-counterpart="${href(file,counterpart)}">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="description" content="${esc(zh?'Qi Chen 的工程枢纽：架构、测评、交互实验与可复用技术资产。':'Qi Chen’s engineering hub: architecture, evaluations, interactive labs and reusable technical assets.')}"><title>${esc(title)} — Qi Chen</title>${options.legacy?`<script src="${href(file,'assets/editorial/legacy-routes.js')}"></script>`:''}<script src="${href(file,'assets/editorial/theme-init.js')}"></script><link rel="icon" href="data:,"><link rel="stylesheet" href="${href(file,'assets/editorial/site.css')}"><script src="${href(file,'assets/editorial/site.js')}" defer></script></head>
<body><a class="skip-link" href="#main">${zh?'跳至正文':'Skip to content'}</a>
<header class="site-header"><div class="header-inner"><a class="brand" href="${href(file,zh?'zh.html':'index.html')}"><span class="brand-mark" aria-hidden="true">q<span>.</span></span><span>Qi Chen<span class="brand-sub">@turbo998 · ${zh?'架构与工程':'Architecture & Engineering'}</span></span></a><nav class="desktop-nav" aria-label="${label}">${navigation}</nav><div class="controls"><a class="language-link" href="${href(file,counterpart)}" hreflang="${zh?'en':'zh-CN'}" lang="${zh?'en':'zh-CN'}" aria-label="${zh?'Switch to English':'切换中文'}">${zh?'EN':'中文'}</a><button class="theme-toggle" type="button" aria-label="${zh?'切换主题':'Switch theme'}"><span aria-hidden="true">◐</span></button><details class="mobile-menu"><summary aria-label="${zh?'打开主导航':'Open navigation'}"><span aria-hidden="true">☰</span></summary><nav aria-label="${zh?'移动主导航':'Mobile navigation'}">${navigation}</nav></details></div></div></header>
<main id="main" tabindex="-1" class="container">${options.context===false?'':context(file,zh,options.track)}${content}<div class="back-row"><a class="text-link" href="${href(file,`studio/${zh?'zh-':''}index.html`)}">← ${zh?'返回工程枢纽':'Back to Engineering Hub'}</a><a class="text-link" href="#main">${zh?'回到顶部':'Back to top'} ↑</a></div></main>
<footer class="container"><div class="footer-main"><a class="brand" href="${href(file,zh?'zh.html':'index.html')}">Qi Chen · @turbo998</a><a href="${href(file,`studio/${zh?'zh-':''}archive.html`)}">${zh?'完整资源档案':'Complete asset archive'} ↗</a><a href="https://github.com/turbo998">${zh?'GitHub 开源作品':'Open-source work on GitHub'} ↗</a></div><p class="source-note">${zh?'来源数据与专用演示保持原貌；目录不是新的性能评测，外部服务需要各自的权限与配置。':'Source evidence and dedicated demos retain their original design. This directory is not a new performance evaluation; external services require their own access and setup.'}</p></footer></body></html>\n`;
}
module.exports = { BRAND, esc, text, href, sections, tracks, primary, context, crumb, card, grid, section, shell };
