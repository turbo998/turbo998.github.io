'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const crypto = require('node:crypto');
const root = path.resolve(__dirname, '..');
const inventory = JSON.parse(fs.readFileSync(path.join(root, 'docs/redesign/route-inventory.json'), 'utf8'));
const originalOwned = inventory.content.filter(r => ['demo', 'report', 'auxiliary'].includes(r.role));
const cycle377Commit = '8c84971c7e952a5fb6f254ee8fcfef5678d9941d';
const infraPath = name => `workshops/azure-agent-infra/${name}`;
const sourceOverrides = Object.fromEntries(['benchmark-cards.html', 'demo.html', 'selector.html', 'benchmark-cards.en.html', 'workbench-cycle-377.html'].map(name => [infraPath(name), {
  commit: cycle377Commit,
  reason: 'Published Cycle #377 source; preserve its original content, evidence and native workbench links rather than regenerate the prior inventory snapshot.'
}]));
const supplementalOwned = [
  { contentId: 'cycle377-infra-report-en', path: infraPath('benchmark-cards.en.html'), role: 'report', tracks: ['infra'], language: { declared: 'en' }, bilingualAssociations: [] },
  { contentId: 'cycle377-infra-workbench', path: infraPath('workbench-cycle-377.html'), role: 'demo', tracks: ['infra'], language: { declared: 'en' }, bilingualAssociations: [] }
];
const owned = [...originalOwned, ...supplementalOwned].map(r => ({ ...r, ...(sourceOverrides[r.path] ? { sourceOverride: sourceOverrides[r.path] } : {}), ...(r.path === infraPath('benchmark-cards.html') ? { language: { ...r.language, declared: 'zh-CN' } } : {}) }));
const css = fs.readFileSync(path.join(root, 'assets/dedicated-navigation.css'), 'utf8').replace(/\r\n/g, '\n');
const sha = s => crypto.createHash('sha256').update(s).digest('hex');
const baseline = r => execFileSync('git', ['show', `${r.sourceOverride?.commit || inventory.baseline}:${r.path}`], { cwd: root, maxBuffer: 20 * 1024 * 1024 }).toString('utf8');
const relative = (from, to) => path.posix.relative(path.posix.dirname(from), to) || path.posix.basename(to);
const escape = s => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const isStyle = r => /(^|\/)zh-style-preview.html$|^style-preview.html$/.test(r.path);
const isGame = r => /^game\/demos\/[^/]+\/index.html$/.test(r.path);
function language(r, source) {
  if (r.sourceOverride && /benchmark-cards(?:\.en)?\.html$/.test(r.path)) return { mode: 'existing-file-pair', source: r.language.declared, links: [{ path: infraPath('benchmark-cards.html'), label: '中文报告 / Chinese report' }, { path: infraPath('benchmark-cards.en.html'), label: 'English report' }], note: 'Published Cycle #377 Chinese / English report pair; original mixed-language technical excerpts and all findings preserved, not independently reproduced.' };
  if (r.path === infraPath('workbench-cycle-377.html')) return { mode: 'source-language-only', source: 'en', note: 'Source interface: English · 中文界面未提供。Published Cycle #377 local cost simulation; source labels retained, not independently reproduced. Tables and cost controls require JavaScript; evidence and native links do not.' };
  if (isStyle(r)) return { mode: 'verified-file-pair', source: r.language.declared, links: [{ path: 'style-preview.html', label: 'English' }, { path: 'zh-style-preview.html', label: '中文' }], note: 'English / 中文 compatibility page.' };
  if (r.bilingualAssociations.length) return { mode: 'existing-file-pair', source: r.language.declared, links: r.bilingualAssociations.map(p => ({ path: p.path, label: p.evidence.counterpartDeclaredLanguage.startsWith('zh') ? '中文版本' : 'English version' })), note: 'Existing resource language pair; original prose is preserved.' };
  const control = source.match(/<button\b[^>]*(?:data-lang="(?:zh-CN|en)"|onclick="(?:toggleLang\(\)|setLang\('(?:zh|en)'\))")[^>]*>/);
  if (control) return { mode: 'existing-in-page-controls', source: r.language.declared, control: control[0], note: '中文 / English: use the original language controls below (JavaScript required; some explanatory text remains in its source language).' };
  return { mode: 'source-language-only', source: r.language.declared, note: r.language.declared.startsWith('zh') ? 'Source: 中文 · English translation unavailable / 未验证英文译文。' : 'Source: English · 中文译文未提供 / no verified Chinese translation.' };
}
function navigation(r, lang) {
  const a = (target, label, extra = '') => `<a href="${escape(relative(r.path, target))}"${extra}>${label}</a>`;
  const links = [a('index.html', 'Qi Chen / @turbo998', ' class="kee-dedicated-identity"'), a('index.html', 'Home EN'), a('zh.html', '首页 中文'), a('studio/index.html', 'Studio EN'), a('studio/zh-index.html', '工作室 中文')];
  for (const track of r.tracks) links.push(a(`studio/${track}.html`, `${track} EN`), a(`studio/zh-${track}.html`, `${track} 中文`));
  if (r.sourceOverride && !/\/(demo|selector)\.html$/.test(r.path)) {
    links.push(a('workshops/azure-agent-infra/index.en.html', 'Infra guide EN'), a('workshops/azure-agent-infra/index.html', 'Infra 指南 中文'));
    if (r.role === 'report') links.push(a(infraPath('workbench-cycle-377.html'), 'Cycle #377 workbench (English)'));
    else links.push(a(infraPath('benchmark-cards.html'), '中文报告'), a(infraPath('benchmark-cards.en.html'), 'English report'), a(infraPath('evidence/cycle-377-benchmark.json'), 'Cycle #377 source evidence'));
  }
  for (const link of lang.links || []) links.push(a(link.path, link.label));
  if (lang.control) links.push('<a href="#kee-resource-language">Resource language / 资源语言</a>');
  return `<!-- kee-dedicated-navigation:start -->\n<nav class="kee-dedicated-nav" aria-label="Site and resource navigation" lang="en">${links.join('\n')}\n<span class="kee-dedicated-language">${lang.note}</span></nav>\n<!-- kee-dedicated-navigation:end -->`;
}
function transform(r, source) {
  const lang = language(r, source), changes = [], exceptions = [];
  let html = source, extra = '';
  if (isStyle(r)) {
    const zh = r.language.declared.startsWith('zh');
    html = `<!doctype html>\n<html lang="${zh ? 'zh-CN' : 'en'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${zh ? 'Engineering Editorial Studio · 已发布' : 'Engineering Editorial Studio · Published'}</title><style>body{margin:0;background:#f6f8fb;color:#172338;font:16px/1.7 system-ui,sans-serif}main{max-width:760px;margin:64px auto;padding:24px}h1{font-size:clamp(32px,6vw,56px);line-height:1.1}a{color:#1858a8}</style></head><body><main><p>QI CHEN / @TURBO998</p><h1>Engineering Editorial Studio</h1><p>${zh ? '已批准的编辑工作室设计现已上线。旧的三套风格预览已退役，请直接访问正式页面。' : 'The approved editorial design is now live. The former three-style preview is retired; visit the native production pages below.'}</p><p><a href="${zh ? 'zh.html' : 'index.html'}">${zh ? '打开首页' : 'Open homepage'}</a> · <a href="studio/${zh ? 'zh-index' : 'index'}.html">${zh ? '探索工作室' : 'Explore Studio'}</a></p></main></body></html>\n`;
    changes.push('Replaced obsolete three-style iframe showcase with native bilingual compatibility links; no archived report copied.');
  } else {
    if (lang.control) {
      const original = lang.control;
      const id = original.match(/\bid="([^"]+)"/);
      if (id) lang.controlId = id[1];
      else { html = html.replace(original, original.replace('<button', '<button id="kee-resource-language"')); lang.controlId = 'kee-resource-language'; }
      changes.push('Linked to genuine existing language control; no fabricated translated prose or query-language assumption.');
    }
    if (/<iframe\b/.test(html)) {
      let count = 0;
      html = html.replace(/<iframe\b[^>]*src="([^"]+)"[^>]*title="([^"]+)"[^>]*>[\s\S]*?<\/iframe>/g, (_, target, title) => {
        count++;
        let destination = target;
        if (r.path.startsWith('workshops/faf-vs-agent-forge/')) destination = relative(r.path, 'animation/demos/pelican-bicycle-arena/' + path.posix.basename(target));
        return `<p class="kee-dedicated-native-link"><a href="${escape(destination)}">Open ${escape(title)} · 打开独立交互演示 →</a><br>Native canvas and controls · 原生画布与完整控件</p>`;
      });
      html = html.replace(/<!-- Master Synchronized Broadcast Controller -->[\s\S]*?<!-- 3-Way Live Pelican Bicycle Demos -->/, '<!-- Native simulator access replaces embedded preview controls. -->\n<p class="kee-dedicated-native-link">演示已改为独立原生页面；在各自页面调整踏频、风阻与暂停。同步广播仅适用于旧版嵌入预览。 / Open each native simulator for its controls; embedded-preview synchronization is retired.</p>\n<!-- 3-Way Live Pelican Bicycle Demos -->');
      if (r.path.startsWith('workshops/faf-vs-agent-forge/')) html = html.replace(/href="\.\/(demo-(?:faf|agent-forge|hve)-pelican\.html)"/g, (_, f) => `href="${relative(r.path, 'animation/demos/pelican-bicycle-arena/' + f)}"`);
      changes.push(`Replaced ${count} full-document demo previews with native links; removed now-inapplicable broadcast controls. Chart SVGs, evaluation data and simulator runtime documents unchanged.`);
    }
    if (isGame(r) || /astra-planet\/index.html$/.test(r.path)) {
      html = html.replace('<body>', '<body class="kee-dedicated-app-root"><div class="kee-dedicated-app-stage">').replace('</body>', '</div></body>');
      extra += 'html:has(.kee-dedicated-app-root){height:auto;overflow:auto}.kee-dedicated-app-root{height:auto;overflow:auto;margin:0}.kee-dedicated-app-root>.kee-dedicated-app-stage{position:relative;transform:translateZ(0);height:100svh;width:100%}.kee-dedicated-app-root>.kee-dedicated-nav{margin-bottom:0}';
      exceptions.push(isGame(r) ? 'Game stage remains one viewport high. A transformed stage contains original fixed HUD/dialog coordinates without covering perimeter links. Document scroll is enabled; original game canvas and modal/archive local scrolling retained. No scrollbar hiding added.' : 'Astra viewport remains one viewport high with its original locally scrolling #controls inspector. Document scroll is enabled outside the stage; canvas sizing and runtime remain unchanged.');
    }
    if (r.path === 'voice/deck.html') {
      html = html.replace('<body>', '<body class="kee-dedicated-deck-root"><div class="kee-dedicated-deck-stage">').replace('</body>', '</div></body>');
      extra += '.kee-dedicated-deck-root{height:auto;width:auto;overflow:auto}.kee-dedicated-deck-stage{position:relative;transform:translateZ(0);min-height:100vh}.kee-dedicated-deck-root .slide{display:none;position:relative;width:100%;min-height:100vh;max-height:none;overflow:visible}.kee-dedicated-deck-root .slide.active{display:block}.kee-dedicated-deck-root>.kee-dedicated-nav{margin-bottom:0}@media print{.kee-dedicated-deck-root .slide{display:block}}';
      changes.push('Presentation retains slide buttons and original slide design; active slide uses document scrolling instead of viewport-locked shell.');
    }
    if (r.path === 'workshops/azure-vm-modernization/index.html') {
      html = html.replace(/#b11f4b/g, '#1858a8').replace(/#9a1a41/g, '#174985').replace(/#fd8ea1/g, '#93c5fd').replace(/#fb7b91/g, '#bfdbfe').replace(/177, 31, 75/g, '37, 99, 235').replace(/253, 142, 161/g, '147, 197, 253').replace(/#f7f4ef/g, '#f6f8fb').replace(/#fcfbf8/g, '#ffffff');
      changes.push('External redirect contract preserved, including native fallback and query/hash forwarding; obsolete perimeter pink changed to cool blue.');
    }
  }
  if (/agentic-commerce\/live-demo(?:\.en)?\.html$/.test(r.path)) {
    html = html.replaceAll('null / "" / []', String.raw`null / \"\" / []`).replaceAll('null/""/[]', String.raw`null/\"\"/[]`);
    changes.push('Repaired two unescaped quote pairs in the original bilingual response-label dictionary so native scenario JavaScript parses; labels and data unchanged.');
  }
  if (r.path === 'workshops/azure-agent-infra/selector.html') {
    const duplicates = [
      ['runSubseaObservatoryLab', 'sel_sub_mode', 'sel_observatory_mode'],
      ['runSmrSteamMethaneReformingCcsLab', 'sel_smr_mode', 'sel_smr_reforming_mode'],
      ['runLngMembraneContainmentLab', 'sel_lng_mode', 'sel_lng_membrane_mode'],
      ['runSicGanPvtCvdLab', 'sel_sic_mode', 'sel_sic_gan_mode'],
      ['runLh2CryoZboLab', 'sel_lh2_mode', 'sel_lh2_zbo_mode']
    ];
    for (const [fn, oldId, newId] of duplicates) {
      html = html.replace(`id="${oldId}" onchange="${fn}()"`, `id="${newId}" onchange="${fn}()"`);
      html = html.replace(new RegExp(`function ${fn}\\(\\)[\\s\\S]*?(?=\\nfunction |\\n</script>)`), block => block.replaceAll(`'${oldId}'`, `'${newId}'`).replaceAll("'subOut'", "'observatoryOut'"));
    }
    let outputCount = 0;
    html = html.replace(/id="subOut"/g, match => ++outputCount === 2 ? 'id="observatoryOut"' : match);
    changes.push('Disambiguated five duplicate selector IDs and the second subsea output ID, updating each corresponding existing simulation function only.');
  }
  if (/azure-agent-infra\/(demo|selector).html$/.test(r.path)) {
    html = html.replace('<body>', '<body class="kee-dedicated-infra">');
    extra += '.kee-dedicated-infra .grid-2{grid-template-columns:repeat(auto-fit,minmax(min(380px,100%),1fr))}.kee-dedicated-infra .grid-3{grid-template-columns:repeat(auto-fit,minmax(min(290px,100%),1fr))}.kee-dedicated-infra .grid-2>*,.kee-dedicated-infra .grid-3>*{min-width:0}.kee-dedicated-infra .card{min-width:0;overflow-wrap:anywhere}.kee-dedicated-infra select{min-width:0;max-width:100%}.kee-dedicated-infra #tourLog{grid-template-columns:repeat(auto-fit,minmax(min(340px,100%),1fr))!important}.kee-dedicated-infra pre{max-width:100%}';
    changes.push('Constrained responsive layout-column minima and native selects; long simulation labels wrap while code panes retain visible local scrolling.');
  }
  if (r.path === infraPath('workbench-cycle-377.html')) {
    html = html.replace('<body>', '<body class="kee-dedicated-cycle377">');
    extra += '.kee-dedicated-cycle377 .grid{grid-template-columns:repeat(2,minmax(0,1fr))}.kee-dedicated-cycle377 .grid>.card{min-width:0;overflow-wrap:anywhere}.kee-dedicated-cycle377 .pill{min-width:0;overflow-wrap:anywhere}@media(max-width:600px){.kee-dedicated-cycle377 .grid{grid-template-columns:minmax(0,1fr)}}';
    changes.push('Contained measured 390px grid overflow with shrinkable tracks and a single-column mobile layout; original tables, source labels, inline evidence and deterministic cost interaction remain byte-for-byte intact beneath the reversible perimeter.');
    exceptions.push('English-only source interface; no fabricated Chinese translation. Native evidence/report/guide links work without JavaScript; original data tables and cost calculation require JavaScript.');
  }
  if (/knowledge-explainer-studio\/index.html$/.test(r.path)) {
    html = html.replace('<body>', '<body class="kee-dedicated-explainer">');
    extra += '.kee-dedicated-explainer .workspace>*,.kee-dedicated-explainer .template-tabs>*{min-width:0}.kee-dedicated-explainer .ledger-v{overflow-wrap:anywhere;min-width:0}@media(max-width:1180px){.kee-dedicated-explainer .workspace{grid-template-columns:minmax(0,1fr)}}@media(max-width:720px){.kee-dedicated-explainer .scrubber-row{flex-wrap:wrap}.kee-dedicated-explainer #timeline-slider{min-width:0;flex-basis:120px}.kee-dedicated-explainer .scene-pills{grid-template-columns:repeat(3,minmax(0,1fr))}.kee-dedicated-explainer .scene-pill{min-width:0}.kee-dedicated-explainer .sp-name{white-space:normal;overflow:visible;overflow-wrap:anywhere}.kee-dedicated-explainer .safe-overlay::after{max-width:calc(100% - 20px);overflow-wrap:anywhere}}';
    changes.push('Allowed responsive workspace tracks to shrink without changing canvas drawing coordinates or template hashes.');
  }
  if (/pelican|faf-vs-agent-forge/.test(r.path) && html.includes('<table class="comp-table">')) {
    html = html.replace(/<table class="comp-table">[\s\S]*?<\/table>/g, table => `<div class="kee-dedicated-table-scroll" tabindex="0" role="region" aria-label="Comparison table; scroll horizontally for all columns">${table}</div>`);
    extra += '.kee-dedicated-table-scroll{max-width:100%;overflow-x:auto}.kee-dedicated-table-scroll:focus-visible{outline:2px solid #3b82f6;outline-offset:3px}';
    exceptions.push('Only the original comparison table scrolls horizontally on narrow screens, in a keyboard-focusable region; table data and chart coordinates unchanged.');
  }
  if (r.path === 'workshops/maf-multi-agent-benchmark/index.html') {
    html = html.replace('<body>', '<body class="kee-dedicated-maf">');
    extra += '.kee-dedicated-maf .grid-2>*,.kee-dedicated-maf .svg-gallery>*{min-width:0}.kee-dedicated-maf .brand{flex-wrap:wrap}.kee-dedicated-maf .code-block{max-width:100%}.kee-dedicated-maf .container{overflow-wrap:anywhere}';
    changes.push('Allowed workbench grid tracks and labels to wrap; retained local code/table scrolling and original SVGs.');
  }
  const fixedDeck = r.role === 'report' && /\.card\s*\{[^}]*\bwidth:\s*900px/.test(source);
  const gridDeck = r.path === 'workshops/deepinfer-v41-economics/cards.html';
  if (fixedDeck || gridDeck) {
    const bodyStyle = source.match(/\bbody\s*\{([^}]+)\}/)[1];
    const minimum = fixedDeck ? 900 : 460;
    html = html.replace('<body>', '<body class="kee-dedicated-report-root"><!-- kee-dedicated-report-open:start --><div class="kee-dedicated-report-viewport" tabindex="0" role="region" aria-label="Original report; scroll horizontally to read all columns"><div class="kee-dedicated-report-layout"><!-- kee-dedicated-report-open:end -->').replace('</body>', '<!-- kee-dedicated-report-close:start --></div></div><!-- kee-dedicated-report-close:end --></body>');
    extra += `.kee-dedicated-report-viewport,.kee-dedicated-report-layout{display:contents}@media screen{body.kee-dedicated-report-root{display:block}.kee-dedicated-report-viewport{display:block;width:100%;max-width:100%;overflow-x:auto}.kee-dedicated-report-layout{${bodyStyle}margin:0;padding:0;min-width:${minimum}px}.kee-dedicated-report-viewport:focus-visible{outline:2px solid #3b82f6;outline-offset:3px}}`;
    exceptions.push(`Protected report document has a keyboard-focusable native horizontal viewport; original ${minimum}px minimum, card layout, all coordinates and print layout are retained. No constrained height or vertical nested scroll.`);
    changes.push('Moved only the original document layout into a marked horizontal viewport; no report content, card styles, data, scores or CSP changed.');
  }
  if (r.path === 'workshops/maf-multi-agent-benchmark/test-report.en.html') {
    html = html.replace('<body>', '<body class="kee-dedicated-report-text">');
    extra += '@media(max-width:600px){.kee-dedicated-report-text{overflow-wrap:anywhere}.kee-dedicated-report-text .brand{flex-wrap:wrap}}';
    changes.push('Enabled narrow-screen wrapping for long report tokens without changing report text or desktop styles.');
  }
  let nav = navigation(r, lang);
  if (lang.controlId) nav = nav.replace('href="#kee-resource-language"', `href="#${lang.controlId}"`);
  html = html.replace('</head>', `<!-- kee-dedicated-style:start -->\n<style>${css}${extra}</style>\n<!-- kee-dedicated-style:end -->\n</head>`);
  html = html.replace(/<body\b[^>]*>/i, m => `${m}\n${nav}\n`);
  if (/knowledge-explainer-studio\/index.html$/.test(r.path)) exceptions.push('JSON editor/output and modal card may scroll locally; normal page and canvas remain in document flow.');
  if (/azure-agent-infra\/(demo|selector).html$/.test(r.path)) exceptions.push('Simulation console, code snippets and wide configuration tables may scroll locally; document scroll unchanged.');
  if (/pelican|prioritization/.test(r.path)) exceptions.push('Telemetry/code panes may scroll locally. Native simulation stage dimensions and SVG plot coordinates are preserved.');
  if (r.role === 'report') exceptions.push('Original report card dimensions, overflow clipping, scaling and print rules preserved exactly; large fixed-layout reports may require native horizontal scrolling on narrow screens.');
  const verticalScrollRegions = [];
  if (/astra-planet\/index.html$/.test(r.path)) verticalScrollRegions.push({ selector: '#controls', reason: 'Native planetary inspector beside a fixed-height WebGL viewport; lighting, terrain and material controls remain independently reachable.', state: 'initial' });
  if (/pelican-bicycle-arena\/demo-(?:faf|agent-forge)-pelican.html$/.test(r.path)) verticalScrollRegions.push({ selector: '#doc-box', reason: 'Native document/code artifact inspector beside the live simulator, not a whole-page shell.', state: 'initial' });
  if (/pelican-bicycle-arena\/demo-hve-pelican.html$/.test(r.path)) verticalScrollRegions.push({ selector: '#artifactContent', reason: 'Native artifact inspector for generated implementation notes beside the simulator.', state: 'initial' });
  if (/knowledge-explainer-studio\/index.html$/.test(r.path)) verticalScrollRegions.push({ selector: '#export-modal .modal-body', reason: 'Export dialog content and editable artifact output; only while the user opens the export dialog.', state: 'export-dialog-open' });
  const constraints = r.path.startsWith('voice/') ? ['This owned Voice surface is a report/deck, not the microphone sandbox. No microphone, API key, backend, audio transcription or provider E2E claim.'] : r.path.includes('azure-vm-modernization') ? ['Redirect leaves this repository for separately deployed Azure-Infra-Lab. External deployment and cloud provisioning not exercised.'] : ['Original external links/runtime dependencies remain; local simulation is not a cloud/backend execution claim.'];
  return { html, record: { contentId: r.contentId, path: r.path, role: r.role, tracks: r.tracks, ...(r.sourceOverride ? { sourceOverride: r.sourceOverride, supplemental: supplementalOwned.some(s => s.path === r.path) } : {}), language: { ...lang, control: undefined, controlId: undefined }, disposition: isStyle(r) ? 'retired-preview-native-compatibility' : 'protected-native-with-perimeter-navigation', changes, scrollExceptions: exceptions, verticalScrollRegions, constraints, baselineSha256: sha(source), integratedSha256: sha(html) } };
}
function main() {
  const check = process.argv.includes('--check'), records = [];
  for (const r of owned) {
    const source = baseline(r), { html, record } = transform(r, source), dest = path.join(root, r.path), live = fs.existsSync(dest) ? fs.readFileSync(dest, 'utf8') : null;
    if (check) { if (live !== html) throw new Error(`Dedicated integration drift: ${r.path}`); }
    else {
      if (live !== null && live.replace(/\r/g, '') !== source.replace(/\r/g, '') && !live.includes('kee-dedicated-navigation:start')) throw new Error(`Refusing unrecognized edits: ${r.path}`);
      if (live !== html) fs.writeFileSync(dest, html);
    }
    records.push(record);
  }
  const manifest = { schemaVersion: 2, baseline: inventory.baseline, scope: 'Immutable original demo/report/auxiliary inventory plus two explicit Cycle #377 supplemental surfaces; five pinned source overrides only', originalCoverage: originalOwned.length, supplementalCoverage: supplementalOwned.length, sourceOverrides, coverage: records.length, themePolicy: 'New navigation uses the solid Dark Aurora Studio palette (#101A30 navy, #EEF3FF text, #ADBBD1 muted, #9AABFF links, #56DDCD focus, #314361 border). Dedicated app themes remain untouched; no legacy or editorial storage key is read or written.', preservation: 'Removing marked perimeter CSS/navigation, marked document viewport wrappers, added body namespace classes and a real language-control ID reproduces every report source byte. No report regeneration, measurements, scores, coordinates, provenance or conclusions changed.', records };
  const manifestPath = path.join(root, 'docs/redesign/dedicated-integration.json'), manifestText = JSON.stringify(manifest, null, 2) + '\n';
  if (check) { if (fs.readFileSync(manifestPath, 'utf8') !== manifestText) throw new Error('Dedicated integration manifest drift'); }
  else fs.writeFileSync(manifestPath, manifestText);
  console.log(`${check ? 'Verified' : 'Integrated'} ${records.length} dedicated surfaces: ${JSON.stringify(records.reduce((a,r)=>(a[r.role]=(a[r.role]||0)+1,a),{}))}`);
}
module.exports = { root, owned, originalOwned, supplementalOwned, sourceOverrides, baseline, transform, sha };
if (require.main === module) main();
