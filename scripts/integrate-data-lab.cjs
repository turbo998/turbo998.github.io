'use strict';

const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');

const root = path.resolve(__dirname, '..');
const baseline = '04ec523a4f7ba4843de2983b91052e23e7c1ffa6';
const directory = 'workshops/data-lab';
const files = ['index.html', 'live-demo.html', 'live-demo.en.html', 'benchmark-cards.html', 'benchmark-cards.en.html'];
const marker = /<!-- kee-data-lab:(style|navigation|runtime):start -->[\s\S]*?<!-- kee-data-lab:\1:end -->/g;
const git = args => execFileSync('git', args, { cwd: root, maxBuffer: 20 * 1024 * 1024 });
const source = name => {
  if (!files.includes(name)) throw new Error(`Unowned DataLab surface: ${name}`);
  return git(['show', `${baseline}:${directory}/${name}`]).toString('utf8');
};
const block = (kind, content) => `<!-- kee-data-lab:${kind}:start -->\n${content}\n<!-- kee-data-lab:${kind}:end -->`;
const originalFabconLink = '<a class="btn" href="../fabcon-sqlcon-2026/index.html">🎬 FabCon 2026 展厅</a>';
const sourceLinkChange = {
  from: '../fabcon-sqlcon-2026/index.html',
  to: { zh: '../../studio/zh-infra.html', en: '../../studio/infra.html' },
  reason: 'Upstream FabCon gallery target is absent; use the existing localized Infra data-architecture topic without implying a replacement gallery.'
};
// Restore the exact upstream anchor as well as removing additive perimeter blocks.
const strip = html => html.replace(marker, '').replace(/<!-- kee-data-lab:source-link:start -->[\s\S]*?<!-- kee-data-lab:source-link:end -->/g, originalFabconLink);

const sharedStyle = `
body:has(>.kee-data-lab-nav){background:#07111f;color-scheme:dark}
.kee-data-lab-nav{box-sizing:border-box;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;width:100%;max-width:1380px;margin:0 auto;padding:18px 24px;background:linear-gradient(120deg,#101f38,#07111f 75%);border:1px solid #29425f;border-radius:14px;color:#e6edf7;font:14px/1.55 system-ui,-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;text-align:left;overflow-wrap:anywhere}
.kee-data-lab-nav *{box-sizing:border-box;min-width:0}
.kee-data-lab-nav a{display:inline-block;color:#bedbff;text-decoration:none;padding:6px 8px;border-radius:7px;min-height:36px}
.kee-data-lab-nav a:hover{background:#183353;color:#fff;text-decoration:underline}
.kee-data-lab-nav a:focus-visible{outline:3px solid #8ddcff;outline-offset:3px}
.kee-data-lab-nav .kee-data-lab-identity{font-weight:750;color:#fff;letter-spacing:.02em}
.kee-data-lab-context,.kee-data-lab-language,.kee-data-lab-resources{display:flex;align-items:center;flex-wrap:wrap;gap:4px 10px}
.kee-data-lab-language{margin-left:auto;justify-content:flex-end}
.kee-data-lab-language a[aria-current="true"]{background:#203b61;color:#fff;text-decoration:underline;text-underline-offset:4px}
.kee-data-lab-note,.kee-data-lab-nav noscript{flex-basis:100%;color:#b5c7df;font-size:12px;line-height:1.65;margin:0}
.kee-data-lab-nav noscript{border-left:2px solid #76b6fc;padding-left:12px}
@media(max-width:600px){.kee-data-lab-nav{padding:14px 12px;gap:8px}.kee-data-lab-context{flex-basis:100%;order:3}.kee-data-lab-resources{order:4}.kee-data-lab-note,.kee-data-lab-nav noscript{order:5}.kee-data-lab-language{gap:2px}}
@media print{.kee-data-lab-nav{display:none!important}}
`;

const workbenchStyle = `
body:has(>.kee-data-lab-nav)>.topbar{position:relative}
body:has(>.kee-data-lab-nav)>.container{overflow-wrap:anywhere}
body:has(>.kee-data-lab-nav) .grid-2>*,body:has(>.kee-data-lab-nav) .grid-3>*{min-width:0}
body:has(>.kee-data-lab-nav) .brand,body:has(>.kee-data-lab-nav) .dim-head,body:has(>.kee-data-lab-nav) .step-head,body:has(>.kee-data-lab-nav) .card h3,body:has(>.kee-data-lab-nav) .card h3>div,body:has(>.kee-data-lab-nav) .teams-card h4{flex-wrap:wrap;gap:8px}
body:has(>.kee-data-lab-nav) .card h3>*,body:has(>.kee-data-lab-nav) .step-head>*{min-width:0;overflow-wrap:anywhere}
body:has(>.kee-data-lab-nav) .log-console{overflow-wrap:anywhere}
@media(max-width:768px){body:has(>.kee-data-lab-nav) .tco-table{table-layout:fixed}body:has(>.kee-data-lab-nav) .tco-table th,body:has(>.kee-data-lab-nav) .tco-table td{padding:7px 3px;overflow-wrap:anywhere}}
`;

// Scale the original cards themselves, not a nested document or a vertically scrolling wrapper.
// atan2 produces a dimensionless ratio for zoom without requiring newer CSS typed division.
const reportStyle = `
body:has(>.kee-data-lab-nav){color-scheme:normal}
body:has(>.kee-data-lab-nav)>.top-nav{width:min(900px,100%);flex-wrap:wrap;gap:12px;overflow-wrap:anywhere}
body:has(>.kee-data-lab-nav)>.top-nav>div{min-width:0}
@media screen and (max-width:931px){body:has(>.kee-data-lab-nav)>.card{zoom:min(1,tan(atan2(calc(100vw - 32px),900px)))}}
@media print{body:has(>.kee-data-lab-nav)>.card{zoom:1}}
`;

const runtime = `<script>
(() => {
  const nav = document.querySelector('.kee-data-lab-nav');
  const original = document.getElementById('lang-btn');
  if (!nav || !original || typeof toggleLang !== 'function' || typeof currentLang === 'undefined') return;
  const sync = () => {
    const en = currentLang === 'en';
    document.documentElement.lang = en ? 'en' : 'zh-CN';
    nav.dataset.runtimeLanguage = en ? 'en' : 'zh';
    for (const a of nav.querySelectorAll('[data-resource-language]')) {
      const active = a.dataset.resourceLanguage === (en ? 'en' : 'zh');
      if (active) a.setAttribute('aria-current', 'true');
      else a.removeAttribute('aria-current');
      const target = new URL(location.href);
      target.searchParams.set('lang', a.dataset.resourceLanguage);
      a.href = target.pathname + target.search + target.hash;
    }
    const infraLink = document.getElementById('kee-data-lab-source-infra');
    if (infraLink) {
      infraLink.href = en ? '../../studio/infra.html' : '../../studio/zh-infra.html';
      infraLink.textContent = en ? 'Infra · Data architecture' : 'Infra · 数据架构';
    }
    original.hidden = true;
  };
  // Native query links invoke the source's own startup translation; do not reimplement its data/renderers.
  sync();
  original.addEventListener('click', sync);
})();
</script>`;

function navigation(name) {
  const report = name.startsWith('benchmark-cards');
  const en = name.includes('.en.');
  const zhTarget = report ? 'benchmark-cards.html' : 'index.html?lang=zh';
  const enTarget = report ? 'benchmark-cards.en.html' : 'index.html?lang=en';
  const note = report
    ? '原始中英文 7-card 报告；内容、数值与 CSP 保留，未重新评测。 / Original Chinese and English report pair; content, values and CSP preserved, not re-evaluated.'
    : '工作台仅部分双语：竞对正文、TCO 表与仿真输出使用原有翻译；KPI 注释、输入标签及图集说明仍保留中文。 / Partial workbench translation: battlecards, TCO table and simulator output use existing translations; KPI captions, input labels and gallery prose remain Chinese. Not a fully translated interface.';
  return `<nav class="kee-data-lab-nav" aria-label="Qi Chen · Site and DataLab navigation">
<a class="kee-data-lab-identity" href="../../index.html">Qi Chen / @turbo998</a>
<div class="kee-data-lab-context" aria-label="Site context">
<a href="../../index.html">Home EN</a><a href="../../zh.html" lang="zh-CN">首页 中文</a>
<a href="../../studio/index.html">Studio EN</a><a href="../../studio/zh-index.html" lang="zh-CN">工作室 中文</a>
<a href="../../studio/infra.html">Infra · Data architecture</a><a href="../../studio/zh-infra.html" lang="zh-CN">Infra · 数据架构</a>
</div>
<div class="kee-data-lab-language" role="group" aria-label="Resource language / 资源语言">
<a href="${zhTarget}" data-resource-language="zh" lang="zh-CN"${report && !en ? ' aria-current="true"' : ''}>中文</a>
<a href="${enTarget}" data-resource-language="en" lang="en"${report && en ? ' aria-current="true"' : ''}>English</a>
</div>
<div class="kee-data-lab-resources">
<a href="index.html?lang=zh">工作台 中文</a><a href="index.html?lang=en">Workbench EN (partial)</a>
<a href="benchmark-cards.html">7-card 中文</a><a href="benchmark-cards.en.html">7-card EN</a>
</div>
<p class="kee-data-lab-note">${note}</p>
${report ? '' : '<noscript>JavaScript 已关闭：工作台仅显示原始中文静态内容，交互及英文正文需要 JavaScript。导航和双语报告仍可直接打开。 / JavaScript is disabled: the workbench retains its Chinese static source; interactions and translated body output require JavaScript. Native navigation and both report languages remain available.</noscript>'}
</nav>`;
}

function transform(name, original) {
  if (!files.includes(name)) throw new Error(`Unowned DataLab surface: ${name}`);
  if (original.includes('<!-- kee-data-lab:')) throw new Error('Transform expects the explicit upstream baseline, not generated HTML');
  if ((original.match(/<body>/g) || []).length !== 1 || (original.match(/<\/head>/g) || []).length !== 1) {
    throw new Error(`Unexpected source structure: ${name}`);
  }
  const report = name.startsWith('benchmark-cards');
  const isWorkbench = name === 'index.html';
  const aliasViewport = name.startsWith('live-demo') ? '<meta name="viewport" content="width=device-width, initial-scale=1">\n' : '';
  let html = original.replace('</head>', block('style', `${aliasViewport}<style>${sharedStyle}${report ? reportStyle : isWorkbench ? workbenchStyle : ''}</style>`) + '</head>');
  html = html.replace('<body>', '<body>' + block('navigation', navigation(name)));
  if (isWorkbench) {
    if (original.split(originalFabconLink).length !== 2) throw new Error('Expected exactly one upstream FabCon navigation anchor');
    html = html.replace(originalFabconLink, block('source-link', '<a class="btn" id="kee-data-lab-source-infra" href="../../studio/zh-infra.html">Infra · 数据架构</a>'));
    html = html.replace('</body>', block('runtime', runtime) + '</body>');
  }
  if (strip(html) !== original) throw new Error(`Non-reversible integration: ${name}`);
  return html;
}

function generate() {
  // Preflight the whole set before any writes: never create files that could obstruct the parent's merge.
  const mergedOrPending = ['HEAD', 'MERGE_HEAD'].some(ref => {
    try { git(['merge-base', '--is-ancestor', baseline, ref]); return true; }
    catch { return false; }
  });
  if (!mergedOrPending) throw new Error('Awaiting parent merge: fixed baseline must be an ancestor of HEAD or MERGE_HEAD');
  git(['ls-files', '--error-unmatch', '--', ...files.map(name => `${directory}/${name}`)]);
  const pending = files.map(name => {
    const target = path.join(root, 'workshops', 'data-lab', name);
    if (!fs.existsSync(target)) throw new Error(`Awaiting parent merge: ${name}`);
    const original = source(name);
    const html = transform(name, original);
    const current = fs.readFileSync(target, 'utf8');
    const canonicalCurrent = current.replace(/\r\n/g, '\n');
    // Generator revisions may replace owned marked blocks, but never changed source content.
    if (strip(canonicalCurrent) !== original) {
      throw new Error(`Refusing to overwrite changed DataLab source: ${name}`);
    }
    return { target, current, html };
  });
  for (const { target, current, html } of pending) if (current !== html) fs.writeFileSync(target, html);
  console.log(`Integrated ${files.length} DataLab surfaces from ${baseline}; source runtime, reports and CSP preserved.`);
}

function check() {
  git(['ls-files', '--error-unmatch', '--', ...files.map(name => `${directory}/${name}`)]);
  const mismatches = [];
  for (const name of files) {
    const target = path.join(root, 'workshops', 'data-lab', name);
    if (!fs.existsSync(target)) { mismatches.push(`${name} (missing)`); continue; }
    const current = fs.readFileSync(target, 'utf8').replace(/\r\n/g, '\n');
    if (current !== transform(name, source(name))) mismatches.push(name);
  }
  if (mismatches.length) throw new Error(`DataLab deterministic check failed: ${mismatches.join(', ')}. No files written.`);
  console.log(`PASS: ${files.length} DataLab surfaces match deterministic output from ${baseline} (read-only; Git line endings normalized).`);
}

module.exports = { root, baseline, directory, files, source, strip, transform, generate, check, sourceLinkChange };
if (require.main === module) {
  if (process.argv.length !== 3 || !['--write', '--check'].includes(process.argv[2])) {
    console.error('Usage: node scripts\\integrate-data-lab.cjs --check (read-only) | --write (after parent merge readiness)');
    process.exitCode = 2;
  } else {
    try { process.argv[2] === '--check' ? check() : generate(); }
    catch (error) { console.error(error.message); process.exitCode = 1; }
  }
}
