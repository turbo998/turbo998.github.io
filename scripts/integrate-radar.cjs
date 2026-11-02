const professional = require('./professional-navigation.cjs');
/* Deterministic perimeter integration; the pinned research is not re-evaluated. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const {execFileSync} = require('node:child_process');
const vm = require('node:vm');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const baseline = '3bdac3d4db9a0cec264ee42b59bbef8a7f87364b';
const files = ['github-radar.html', 'zh-github-radar.html', 'workshops/github-trending-radar/cards.en.html', 'workshops/github-trending-radar/cards.html'];
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const block = (name, text) => `<!-- radar-${name}:start -->${text}<!-- radar-${name}:end -->`;
const strip = html => html.replace(/<!-- radar-([\w-]+):start -->[\s\S]*?<!-- radar-\1:end -->/g, '');
const sourceFor = file => {
  const disk = fs.readFileSync(path.join(root, file), 'utf8');
  return files.includes(file) ? strip(disk) : disk;
};
const runtime = html => [...html.matchAll(/<script>([\s\S]*?)<\/script>/g)].at(-1)[1];
const bodyMain = html => html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
const readingCSS = `
.reading-document{--surface-2:var(--reading-raised);--text-2:var(--reading-muted);--text-3:var(--reading-muted);--border-strong:var(--reading-line);--good:var(--reading-secondary);--radius:10px;--radius-lg:14px;--mono:ui-monospace,SFMono-Regular,Consolas,monospace;--card-shadow:0 12px 32px #0002;overflow-wrap:anywhere}
.reading-document .builder-hero{padding:28px 0}.reading-document .builder-hero-grid{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:32px;align-items:center}.reading-document .bh-kicker,.reading-document .stage-number{color:var(--reading-secondary);font:11px/1.7 var(--mono);letter-spacing:.08em}.reading-document .grad{color:var(--reading-accent)}.reading-document .bh-sub,.reading-document .stage-section-header>p{color:var(--reading-muted)}
.reading-document .bh-tags{display:flex;flex-wrap:wrap;gap:8px}.reading-document .bh-tag{font-size:12px;padding:6px 10px;border:1px solid var(--reading-line);border-radius:20px;text-decoration:none}.reading-document .bh-actions-grid{display:grid;gap:12px}.reading-document .bh-btn{display:inline-block;padding:12px 16px;border:1px solid var(--reading-line);border-radius:10px;background:var(--reading-surface);text-decoration:none;font-size:13px}.reading-document .bh-btn.primary,.reading-document .radar-pill.active,.reading-document .chip-btn.active{background:var(--reading-accent);color:var(--reading-on-accent)}
.reading-document .telemetry-strip{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:12px;margin-top:28px}.reading-document .tm-item{padding:16px;background:var(--reading-surface);border:1px solid var(--reading-line);border-radius:10px}.reading-document .tm-val{display:block;color:var(--reading-secondary);font:700 18px/1.4 var(--mono)}.reading-document .tm-lbl{display:block;color:var(--reading-muted);font-size:11px;margin-top:8px}.reading-document .pipeline-rail{grid-template-columns:repeat(4,minmax(0,1fr));overflow:visible}.reading-document .pipe-title{color:var(--reading-text)}.reading-document .panel-box{margin:0;padding:18px 20px}.reading-document .repo-card{border-radius:14px;margin:0}.reading-document .panel-box>div{flex-wrap:wrap;gap:10px}.reading-document .panel-box h3{margin-top:0}.reading-document .repo-name-link{font-size:20px}.reading-document .reading-context{margin:0 16px 12px 0}.reading-document .hfs-slider-row input{padding:0;min-width:60px}.reading-document .search-input{min-width:0;flex-basis:240px}.reading-document .verdict-P1{color:var(--reading-accent)}.reading-document .verdict-P0{color:#ff909a}
.reading-document .drawer-backdrop{z-index:1100}.reading-document .drawer-panel{background:var(--reading-surface);color:var(--reading-text);height:100dvh;max-width:100%;overscroll-behavior:contain}.reading-document .drawer-panel>div:first-child{flex-wrap:wrap}.reading-document .weekly-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
@media(max-width:960px){.reading-document .weekly-grid{grid-template-columns:1fr}.reading-document .builder-hero-grid{grid-template-columns:1fr}.reading-document .telemetry-strip{grid-template-columns:repeat(2,minmax(0,1fr))}.reading-document .pipeline-rail{grid-template-columns:repeat(2,minmax(0,1fr))}.reading-document .bh-actions-grid{grid-template-columns:1fr}.reading-document .panel-box{padding:16px}.reading-document .radar-subcol-bar{padding:14px}.reading-document .hfs-slider-row{flex-wrap:wrap}.reading-document .hfs-slider-row input{flex-basis:100%}}
@media(max-width:600px){.reading-header{height:auto;min-height:72px;flex-wrap:wrap;padding:12px 16px}.reading-controls{margin-left:auto}.reading-document .panel-box>div>div{flex-wrap:wrap}.reading-document .repo-card{padding:16px}.reading-document h1{font-size:34px}.reading-document .radar-pill{font-size:11px}}
`;
function header(en, file) {
  const home = en ? 'index.html' : 'zh.html';
  return `<a class="reading-skip" href="#reading-main">${en?'Skip to content':'跳转到正文'}</a>` + professional.navigation({file,en,active:'radar',languages:`<a href="github-radar.html" data-reading-language hreflang="en" lang="en">EN</a><a href="zh-github-radar.html" data-reading-language hreflang="zh-CN" lang="zh-CN">中文</a>`,context:`<a class="reading-context" href="studio/${en?'':'zh-'}index.html">← ${en?'Resource hub':'资源中心'}</a>`});
}
function generate(file, source = sourceFor(file)) {
  const report = file.startsWith('workshops/');
  const en = report ? file.includes('.en.') : !file.startsWith('zh-');
  let html;
  if (report) {
    const css = block('report-style', `<style>${professional.css()}.radar-report-nav{width:100%;max-width:900px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;padding:16px 20px;background:#101a30;color:#eef3ff;border:1px solid #314361;border-radius:12px;font:14px/1.5 "Segoe UI",sans-serif}.radar-report-nav a{color:#9aabff;text-decoration:none}.radar-report-nav a:hover{text-decoration:underline}.radar-report-nav a:focus-visible{outline:2px solid #56ddcd;outline-offset:4px}.radar-report-nav .identity{font-weight:700;color:#eef3ff;margin-right:auto}.radar-report-nav .languages{display:flex;gap:14px;margin-left:auto}.radar-report-nav [aria-current]{color:#56ddcd}.radar-report-source{display:flex;flex-direction:column;align-items:center;gap:28px;width:900px;flex-shrink:0}@media(max-width:932px){.radar-report-source{zoom:calc((100vw - 32px) / 900px)}}@media print{.radar-report-nav{display:none}.radar-report-source{zoom:1}}</style>`);
    const nav = block('report-nav', professional.navigation({file,en,className:'radar-report-nav',active:'radar',languages:`<a href="cards.en.html" hreflang="en" lang="en">EN</a><a href="cards.html" hreflang="zh-CN" lang="zh-CN">中文</a>`,context:`<a href="../../${en?'':'zh-'}github-radar.html">← ${en?'Interactive Radar':'交互雷达'}</a>`}));
    html = source.replace('</head>', css+'</head>').replace('<body>', '<body>'+nav+block('report-open','<div class="radar-report-source">')).replace('</body>', block('report-close','</div>')+'</body>');
    assert.equal(strip(html),source,'Report source byte preservation');
  } else {
    const elements = new Map();
    const document = {addEventListener(){},getElementById(id) {if(!elements.has(id)) elements.set(id,{innerHTML:'',querySelectorAll:()=>[],addEventListener(){}});return elements.get(id);}};
    vm.runInNewContext(runtime(source), {document}, {timeout:1000});
    if (source.includes('data-reading-shell="document"')) {
      html = strip(source)
        .replace('<link rel="stylesheet" href="assets/reading-shell.css?v=aurora-radar-v1" /></head>', '<link rel="stylesheet" href="assets/reading-shell.css?v=aurora-radar-v1" />'+block('reading-style','<style>'+readingCSS+'</style>')+'</head>')
        .replace(/<a class="reading-skip"[\s\S]*?<main class="reading-document" id="reading-main">/, header(en,file)+`<main class="reading-document" id="reading-main">`+block('reading-context',`<a class="reading-context" href="studio/${en?'':'zh-'}index.html">← Studio</a><a class="reading-context" href="studio/${en?'':'zh-'}benchmarks.html">${en?'Benchmarks':'基准评测'}</a><noscript><p>${en?'Canonical research is shown below. Enable JavaScript to adjust filters and weights; language and report links work without it.':'以下展示原始研究内容。启用 JavaScript 可调整筛选与权重；语言切换与报告链接无需脚本。'}</p></noscript>`));
    } else {
      html = source.replace('data-builder-style="precision"','data-reading-shell="document" data-theme="dark"')
        .replace(/<script>[\s\S]*?<\/script>/,'<script src="assets/reading-shell.js?v=aurora-radar-v1"></script>')
        .replace(/<link rel="stylesheet" href="(?:style\.css|site-structure\.css[^\"]*)" \/>\n/g,'')
        .replace(/<script src="(?:theme-switcher\.js|site-structure\.js[^\"]*)" defer><\/script>\n/g,'')
        .replace('</head>', '<link rel="stylesheet" href="assets/reading-shell.css?v=aurora-radar-v1" />'+block('reading-style','<style>'+readingCSS+'</style>')+'</head>')
        .replace(/<nav class="nav">[\s\S]*?<main class="wrap">/,header(en,file)+`<main class="reading-document" id="reading-main">`+block('reading-context',`<a class="reading-context" href="studio/${en?'':'zh-'}index.html">← Studio</a><a class="reading-context" href="studio/${en?'':'zh-'}benchmarks.html">${en?'Benchmarks':'基准评测'}</a><noscript><p>${en?'Canonical research is shown below. Enable JavaScript to adjust filters and weights; language and report links work without it.':'以下展示原始研究内容。启用 JavaScript 可调整筛选与权重；语言切换与报告链接无需脚本。'}</p></noscript>`));
    }
    for(const id of ['pipeline-rail','pipe-inspector','topic-tuner-list','repo-cards-container']) {
      assert.ok(elements.get(id).innerHTML,id);
      html = html.replace(new RegExp(`(<div[^>]* id="${id}">)</div>`),(_,open)=>`${open}${block('prerender-'+id,elements.get(id).innerHTML.replace(/[\t ]+$/gm,''))}</div>`);
    }
    assert.equal(bodyMain(strip(html)),bodyMain(source),'All substantive main markup preserved');
    assert.equal(runtime(html),runtime(source),'All research data and interactions preserved verbatim');
    assert.ok(html.includes(source.match(/<style>[\s\S]*?<\/style>/)[0]),'Original dashboard-specific styling retained');
  }
  return html;
}
function validate() {
  return files.map(file=>{
    const source=sourceFor(file), expected=generate(file,source), actual=fs.readFileSync(path.join(root,file),'utf8');
    assert.equal(actual.replace(/\r\n/g,'\n'),expected.replace(/\r\n/g,'\n'),file+': deterministic output');
    assert.deepEqual(actual.match(/<meta[^>]+Content-Security-Policy[^>]*>/g),source.match(/<meta[^>]+Content-Security-Policy[^>]*>/g),file+': CSP');
    return {file,sourceSha256:hash(source),outputSha256:hash(actual),preservation:file.startsWith('workshops/')?'exact source after stripping perimeter additions':'exact main markup and runtime; deterministic canonical prerender'};
  });
}
if(require.main===module) {
  if(!process.argv.includes('--check')) for(const file of files) fs.writeFileSync(path.join(root,file),generate(file));
  console.log(JSON.stringify({baseline,files:validate()},null,2));
}
module.exports={baseline,files,generate,validate,sourceFor,runtime,hash};
