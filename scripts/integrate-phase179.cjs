/* Additive presentation only: pinned research, runtime, CSP and SVG stay unchanged.
 * Preparation: node tests/phase179-integration.cjs --source-only
 * After the parent completes its merge: node scripts/integrate-phase179.cjs --write
 * Default / --check is read-only. No shared generator is modified here.
 * The owned SVG is restored only to its exact pinned bytes after CRLF checkout.
 */
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const crypto = require('node:crypto');
const {execFileSync, spawnSync} = require('node:child_process');
const root = path.resolve(__dirname, '..');
const baseline = '175fa79b494fc21d40f876aa48a94c447b4a4db2';
const files = [
  'workshops/benchmarks/ai-infra-architect-workbench.html',
  'workshops/benchmarks/ai-infra-phase179-benchmark-cards.html',
];
const asset = 'assets/ai-infra-phase179-visual-summary.svg';
const git = args => execFileSync('git', args, {cwd: root, maxBuffer: 4 * 1024 * 1024});
const sourceBytes = file => git(['show', `${baseline}:${file}`]);
const sourceFor = file => sourceBytes(file).toString('utf8');
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const block = (name, value) => `<!-- phase179-${name}:start -->${value}<!-- phase179-${name}:end -->`;
const strip = html => html.replace(/<!-- phase179-([\w-]+):start -->[\s\S]*?<!-- phase179-\1:end -->/g, '');
const csp = html => html.match(/<meta\b[^>]*http-equiv="Content-Security-Policy"[^>]*>/gi) || [];
const scripts = html => html.match(/<script\b[^>]*>[\s\S]*?<\/script>/gi) || [];
const languageLimitations = {
  workbench: 'The pinned workbench has no language bridge or translation dictionary. Controls, runtime output and most prose are English, with some Chinese source labels; the bilingual title does not provide a language switch.',
  report: 'The sealed report is English-only and its CSP disallows scripts. EN / 中文 links select the parent Infra topic language, not a translated copy of the report.',
};
const perimeterCSS = `
body{background:#080D1B}
.phase179-nav,.phase179-note{box-sizing:border-box;width:100%;max-width:1320px;margin:0 auto 20px;border:1px solid #314361;border-radius:12px;background:#101A30;color:#EEF3FF;font:14px/1.6 "Segoe UI",sans-serif}
.phase179-nav{display:grid;grid-template-columns:minmax(0,1fr) auto;align-items:center;gap:12px 20px;padding:16px 20px}
.phase179-nav a{color:#9AABFF;text-decoration:none;overflow-wrap:anywhere}
.phase179-nav a:hover{text-decoration:underline}
.phase179-nav a:focus-visible{outline:2px solid #56DDCD;outline-offset:4px}
.phase179-nav .phase179-identity{font-weight:700;color:#EEF3FF}
.phase179-languages{display:flex;align-items:center;justify-content:flex-end;flex-wrap:wrap;gap:12px;grid-column:2;grid-row:1}
.phase179-language-label{color:#EEF3FF;font-size:12px}
.phase179-trail{display:flex;flex-wrap:wrap;gap:12px 20px;grid-column:1/-1}
.phase179-note{padding:14px 20px;overflow-wrap:anywhere}
.phase179-note p+p{margin-top:8px}
@media(max-width:600px){body{padding:16px 16px 40px}.phase179-nav{padding:14px;gap:12px}.phase179-languages{gap:10px}.phase179-language-label{flex-basis:100%;text-align:right}.phase179-note{padding:14px}}
@media print{.phase179-nav,.phase179-note{display:none}}
`;
// Scope layout repairs to the original workbench; do not recolor source cards or charts.
const workbenchCSS = `
.container,.container .panel,.container .ctrl,.container .kpi{min-width:0}
.container{overflow-wrap:anywhere}
.container .grid-2{grid-template-columns:minmax(0,1.15fr) minmax(0,1fr)}
.container .control-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.container .kpi-grid{grid-template-columns:repeat(3,minmax(0,1fr))}
.container select{max-width:100%;min-width:0}
.container code{overflow-wrap:anywhere;white-space:normal}
#expTable{table-layout:fixed}
#expTable th,#expTable td{vertical-align:top;overflow-wrap:anywhere}
#expTable th:nth-child(1){width:8%}#expTable th:nth-child(2){width:14%}#expTable th:nth-child(3){width:20%}#expTable th:nth-child(4){width:20%}#expTable th:nth-child(5){width:38%}
@media(max-width:1024px){.container .grid-2{grid-template-columns:minmax(0,1fr)}}
@media(max-width:767px){
.container .hero,.container .panel{padding:18px}
.container .control-grid,.container .kpi-grid{grid-template-columns:minmax(0,1fr)}
.container .hero h1{font-size:24px}
#expTable,#expTable tbody{display:block;width:100%}
#expTable thead{position:absolute;width:1px;height:1px;clip-path:inset(50%)}
#expTable tbody tr{display:grid;grid-template-columns:minmax(0,1fr);border:1px solid #334155;border-radius:10px;background:#0B1120;margin-bottom:16px}
#expTable td{display:block;padding:10px 12px;min-width:0}
#expTable td:last-child{border-bottom:0}
#expTable td::before{display:block;color:#94A3B8;font-size:11px;font-weight:700;margin-bottom:4px}
#expTable td:nth-child(1)::before{content:"Phase"}#expTable td:nth-child(2)::before{content:"Domain"}#expTable td:nth-child(3)::before{content:"Experiment Directory"}#expTable td:nth-child(4)::before{content:"Component / Question ID"}#expTable td:nth-child(5)::before{content:"Key Quantitative Finding"}
}
`;
// Scale only a new outer wrapper: all sealed 900x1125 card geometry stays intact.
const reportCSS = `
.phase179-nav,.phase179-note{max-width:900px;margin-bottom:0}
.phase179-report-source{display:flex;flex-direction:column;align-items:center;gap:32px;width:900px;flex-shrink:0}
.phase179-report-source>.card{flex-shrink:0}
@media(max-width:947px){.phase179-report-source{zoom:calc((100vw - 48px) / 900px)}}
@media(max-width:600px){.phase179-report-source{zoom:calc((100vw - 32px) / 900px)}}
@media print{.phase179-report-source{zoom:1}}
`;
function navigation(report) {
  const companion = report ? 'ai-infra-architect-workbench.html' : 'ai-infra-phase179-benchmark-cards.html';
  return `<nav class="phase179-nav" aria-label="Site and research navigation"><a class="phase179-identity" href="../../index.html">Qi Chen · @turbo998</a><span class="phase179-languages" aria-label="Parent topic language, not source translation"><span class="phase179-language-label">Site language</span><a href="../../studio/infra.html" lang="en" hreflang="en" aria-label="English Infra topic; source content is not translated">EN</a><a href="../../studio/zh-infra.html" lang="zh-CN" hreflang="zh-CN" aria-label="中文基础设施主题；原始研究内容不翻译">中文</a></span><span class="phase179-trail"><a href="../../studio/index.html">Studio</a><a class="phase179-parent" href="../../studio/infra.html">← Infra</a><a href="${companion}">${report ? 'Interactive workbench' : 'Phase 179 report'}</a></span></nav>`;
}
function notes(report) {
  const limitation = report
    ? 'Source language: English. The sealed report is preserved verbatim; EN / 中文 above open the corresponding Infra topic, not a translated report.'
    : 'Source language: primarily English with some Chinese labels. No source language-switching runtime is present; EN / 中文 above open the corresponding Infra topic, not a translated workbench. Original labels, including legacy phase/catalog counts, remain unchanged.';
  return `<aside class="phase179-note" aria-label="Source preservation and language scope"><p>${limitation}</p><p lang="zh-CN">顶部 EN / 中文切换网站主题语言，不翻译本页原始研究内容、数据或控件。</p>${report ? '' : '<noscript><p>JavaScript is required for calculators and filters. The original static values and full experiment catalog remain readable; navigation works without JavaScript.</p></noscript>'}</aside>`;
}
function generate(file, source = sourceFor(file)) {
  assert.ok(files.includes(file), `Not an owned HTML file: ${file}`);
  assert.ok(!source.includes('<!-- phase179-'), 'Only integrate the clean pinned source');
  assert.equal((source.match(/<\/head>/g) || []).length, 1);
  assert.equal((source.match(/<body>/g) || []).length, 1);
  assert.equal((source.match(/<\/body>/g) || []).length, 1);
  const report = file === files[1];
  let html = source.replace('</head>', block('style', `<style>${perimeterCSS}${report ? reportCSS : workbenchCSS}</style>`) + '</head>')
    .replace('<body>', '<body>' + block('nav', navigation(report)) + block('note', notes(report)) + (report ? block('source-open', '<div class="phase179-report-source">') : ''));
  if (report) html = html.replace('</body>', block('source-close', '</div>') + '</body>');
  assert.equal(strip(html), source, `${file}: exact source reversibility`);
  assert.deepEqual(csp(html), csp(source), `${file}: unchanged CSP`);
  assert.deepEqual(scripts(html), scripts(source), `${file}: unchanged runtime, no new script`);
  assert.ok(!/<iframe\b/i.test(html), `${file}: no HTML frame`);
  return html;
}
function validate() {
  const results = files.map(file => {
    const original = sourceBytes(file);
    const actual = fs.readFileSync(path.join(root, file));
    assert.deepEqual(actual, Buffer.from(generate(file, original.toString('utf8'))), `${file}: deterministic bytes`);
    assert.deepEqual(Buffer.from(strip(actual.toString('utf8'))), original, `${file}: pinned source bytes`);
    return {file, sourceSha256: hash(original), outputSha256: hash(actual), preservation: 'Byte-exact after removing marked perimeter additions; CSP and runtime unchanged'};
  });
  const originalAsset = sourceBytes(asset);
  assert.deepEqual(fs.readFileSync(path.join(root, asset)), originalAsset, 'The associated SVG must remain byte-exact');
  return {baseline, files: results, asset: {file: asset, sha256: hash(originalAsset)}, languageLimitations};
}
function write() {
  // Accept the parent's explicitly authorized pending merge as well as a landed merge.
  const merged = ['HEAD', 'MERGE_HEAD'].some(ref => spawnSync('git', ['merge-base', '--is-ancestor', baseline, ref], {cwd: root, stdio: 'ignore'}).status === 0);
  assert.ok(merged, 'The pinned source must be in HEAD or the pending MERGE_HEAD');
  for (const file of [...files, asset]) git(['ls-files', '--error-unmatch', '--', file]);
  const pending = [...files, asset].map(file => {
    const current = fs.readFileSync(path.join(root, file));
    const original = sourceBytes(file);
    const output = file === asset ? original : Buffer.from(generate(file, original.toString('utf8')));
    const checkoutBytes = Buffer.from(current.toString('utf8').replace(/\r\n/g, '\n'));
    assert.ok(checkoutBytes.equals(original) || checkoutBytes.equals(output), `${file}: refuse to overwrite a concurrent edit`);
    return {file, current, output};
  });
  for (const {file, current, output} of pending) {
    const dest = path.join(root, file);
    assert.deepEqual(fs.readFileSync(dest), current, `${file}: changed during preflight`);
    if (!current.equals(output)) fs.writeFileSync(dest, output);
  }
  return validate();
}
if (require.main === module) {
  const args = process.argv.slice(2);
  assert.ok(args.length <= 1 && args.every(arg => ['--write', '--check'].includes(arg)), 'Use --check (read-only) or --write (after the parent merge)');
  console.log(JSON.stringify(args.includes('--write') ? write() : validate(), null, 2));
}
module.exports = {root, baseline, files, asset, sourceBytes, sourceFor, hash, strip, csp, scripts, generate, validate, languageLimitations};
