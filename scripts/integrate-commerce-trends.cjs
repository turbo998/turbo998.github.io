const professional = require('./professional-navigation.cjs');
/* Presentation-only integration of the pinned bilingual publication; no research claims are re-evaluated. */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {execFileSync,spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const baseline = '209aea9a1db92c816927df71a9242526b44925c1';
const directory = 'workshops/agentic-commerce/';
const files = [directory+'stripe-collison-7-trends.html', directory+'stripe-collison-7-trends.en.html'];
const svg = directory+'04-stripe-collison-7-trends-2026-11-01.svg';
const originalPolicy = "default-src 'none'; style-src 'unsafe-inline'; img-src 'self' data:;";
const hash = text => crypto.createHash('sha256').update(text).digest('hex');
const sourceFor = file => execFileSync('git',['show',`${baseline}:${file}`],{cwd:root,encoding:'utf8',maxBuffer:4*1024*1024});
const shared = file => fs.readFileSync(path.join(root,'assets',file),'utf8').replace(/\r\n/g,'\n');
const block = (name,text) => `<!-- commerce-trends-${name}:start -->${text}<!-- commerce-trends-${name}:end -->`;
const mainMarkup = html => html.match(/<main[^>]*>([\s\S]*?)<\/main>/)[1];
const oldHeader = html => html.match(/<header class="topbar">[\s\S]*?<\/header>/)[0];
const localCSS = `
html[data-reading-shell=document] body{background:var(--reading-bg)}
.commerce-source-context{box-sizing:border-box;max-width:1200px;margin:24px auto 0;padding:0 28px;color:var(--reading-muted);font-size:13px;overflow-wrap:anywhere}
.commerce-source-context summary{cursor:pointer;color:var(--reading-accent);padding:10px 0}.commerce-source-context .brand{align-items:flex-start;flex-wrap:wrap;margin:12px 0}.commerce-source-context .badge{background:var(--reading-raised);color:var(--reading-secondary)}.commerce-source-context .nav-btns{margin:14px 0}.commerce-source-context .btn{background:var(--reading-surface);color:var(--reading-text);border-color:var(--reading-line)}
.reading-document{--surface-2:var(--reading-raised);--purple:var(--reading-accent);padding-top:28px}
.reading-document .hero{background:linear-gradient(135deg,var(--reading-raised),var(--reading-surface));padding:28px;border-color:var(--reading-line)}
.reading-document .hero-sub,.reading-document .trend-card ul{color:var(--reading-muted)}.reading-document .trend-card h2{color:var(--reading-text);margin-top:0;font-size:22px}.reading-document .kpi-box{background:var(--reading-surface)}.reading-document .kpi-val{color:var(--reading-secondary)}
.reading-document .quote{background:var(--reading-bg);color:var(--reading-text)}.reading-document .sa-box{color:var(--reading-secondary)}.reading-document .t-tag{background:var(--reading-raised);color:var(--reading-accent)}.reading-document .stack-item strong{color:var(--reading-secondary)}
.reading-document .svg-frame{padding:18px;background:var(--reading-surface)}.reading-document .svg-frame>div{flex-wrap:wrap;gap:12px}.reading-document .svg-frame img{display:block;width:100%;height:auto}.reading-document .trends-grid{border:0;padding:0}.reading-document .trend-card{padding:24px}.reading-document code{color:var(--reading-amber)}.reading-document table{overflow:visible}.reading-document th{color:var(--reading-accent)}
:root[data-theme=light] .reading-document [style*="color:#CBD5E1"]{color:var(--reading-muted)!important}:root[data-theme=light] .reading-document [style*="color:#93C5FD"],:root[data-theme=light] .reading-document [style*="color:#38BDF8"]{color:var(--reading-accent)!important}
@media(max-width:600px){.reading-header{height:auto;min-height:72px;flex-wrap:wrap;padding:12px 16px}.reading-controls{margin-left:auto}.commerce-source-context{padding:0 20px}.reading-document .hero,.reading-document .trend-card{padding:20px}.reading-document .svg-frame{padding:12px}.reading-document h1{font-size:32px}.reading-document .trend-card h2{font-size:22px}}
`;
function header(file,source) {
  const en=file.includes('.en.'), name=path.posix.basename(file);
  const original=oldHeader(source).replace('<header class="topbar">','').replace('</header>','');
  return `<a class="reading-skip" href="#reading-main">${en?'Skip to content':'跳转到正文'}</a>${professional.navigation({file,en,languages:`<a href="stripe-collison-7-trends.en.html" data-reading-language hreflang="en" lang="en">EN</a><a href="stripe-collison-7-trends.html" data-reading-language hreflang="zh-CN" lang="zh-CN">中文</a>`})}<div class="commerce-source-context"><a class="reading-context" href="../../studio/${en?'':'zh-'}commerce.html">← ${en?'Commerce':'商业'}</a><details><summary>${en?'Article context, sources &amp; related resources':'文章背景、来源与相关资源'}</summary>${original}</details></div>`;
}
function generate(file,source=sourceFor(file)) {
  assert.ok(files.includes(file),'Only the two assigned article pages may be transformed');
  assert.equal((source.match(/<main\b/g)||[]).length,1);
  assert.ok(source.includes(originalPolicy),'Pinned source CSP must match');
  const script=shared('reading-shell.js');
  // Inline the actual shared assets because the source forbids external styles/scripts.
  // Only this exact shared runtime is permitted; all original CSP directives stay intact.
  const scriptHash=crypto.createHash('sha256').update(script).digest('base64');
  const policy=originalPolicy+` script-src 'sha256-${scriptHash}';`;
  const shell=block('shell',`<style data-commerce-shared="reading-shell.css">${shared('reading-shell.css')}</style><style>${localCSS}</style><script data-commerce-shared="reading-shell.js">${script}</script>`);
  const originalMain='<main class="container">', adaptedMain='<main class="reading-document" id="reading-main">';
  const output=source.replace(/<html lang="([^"]+)">/,'<html lang="$1" data-reading-shell="document" data-theme="dark">')
    .replace(originalPolicy,policy).replace('</head>',shell+'</head>')
    .replace(oldHeader(source),block('header',header(file,source))).replace(originalMain,adaptedMain);
  assert.equal(mainMarkup(output),mainMarkup(source),'Substantive article main is byte-identical');
  const restored=output.replace(/<!-- commerce-trends-header:start -->[\s\S]*?<!-- commerce-trends-header:end -->/,()=>oldHeader(source))
    .replace(/<!-- commerce-trends-shell:start -->[\s\S]*?<!-- commerce-trends-shell:end -->/,'')
    .replace(' data-reading-shell="document" data-theme="dark"','').replace(policy,originalPolicy).replace(adaptedMain,originalMain);
  assert.equal(restored,source,'Every transformation is explicitly reversible');
  return output;
}
function prepare() {
  return files.map(file=>{
    const source=sourceFor(file),output=generate(file,source);
    return {file,sourceSha256:hash(source),outputSha256:hash(output),mainSha256:hash(mainMarkup(source)),preservation:'Exact original main markup; explicitly reversible perimeter; unchanged source CSP directives plus hash-only shared runtime allowance'};
  });
}
function validate() {
  const result=prepare();
  for(const file of files)assert.equal(fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n'),generate(file),file+': deterministic integration');
  assert.equal(fs.readFileSync(path.join(root,svg),'utf8').replace(/\r\n/g,'\n'),sourceFor(svg),svg+': original SVG unchanged');
  return result;
}
if(require.main===module) {
  if(process.argv.includes('--prepare'))console.log(JSON.stringify({baseline,mode:'prepare: no HTML or asset writes',files:prepare()},null,2));
  else if(process.argv.includes('--check'))console.log(JSON.stringify({baseline,files:validate()},null,2));
  else if(process.argv.includes('--write')) {
    // Refuse to overwrite concurrent article edits or generate before the publication is merged.
    const mergeHead=(spawnSync('git',['rev-parse','--verify','--quiet','MERGE_HEAD'],{cwd:root,encoding:'utf8'}).stdout||'').trim();
    if(mergeHead!==baseline)execFileSync('git',['merge-base','--is-ancestor',baseline,'HEAD'],{cwd:root});
    const outputs=files.map(file=>{
      const source=sourceFor(file),output=generate(file,source),current=fs.readFileSync(path.join(root,file),'utf8').replace(/\r\n/g,'\n');
      const restoredCurrent=current.replace(/<!-- commerce-trends-header:start -->[\s\S]*?<!-- commerce-trends-header:end -->/,()=>oldHeader(source)).replace(/<!-- commerce-trends-shell:start -->[\s\S]*?<!-- commerce-trends-shell:end -->/,'').replace(' data-reading-shell="document" data-theme="dark"','').replace(/ script-src 'sha256-[^']+';/,'').replace('<main class="reading-document" id="reading-main">','<main class="container">');
      assert.ok(current===source||current===output||restoredCurrent===source,file+': refusing to overwrite an unrecognized concurrent edit');
      return {file,output};
    });
    assert.equal(fs.readFileSync(path.join(root,svg),'utf8').replace(/\r\n/g,'\n'),sourceFor(svg),'Merged SVG must match before writing');
    for(const {file,output} of outputs)fs.writeFileSync(path.join(root,file),output);
    console.log(JSON.stringify({baseline,files:validate()},null,2));
  } else throw new Error('Use --prepare (no writes), --check, or --write only after the parent authorizes generation.');
}
module.exports={baseline,files,svg,sourceFor,hash,mainMarkup,generate,prepare,validate,originalPolicy};
