'use strict';
const fs = require('node:fs');
const path = require('node:path');
const cp = require('node:child_process');
const root = path.resolve(__dirname, '..');
const BASELINE = '941ee62';
const ARENA_BASELINE = 'b31286a79f4ff5443b480566934ce2e2e58c59ef';
const dirs = ['animation/demos', 'generative-visual-lab/demos'];
const files = dirs.flatMap(dir => [
  ...['astra-planet','feitian','rocket-launch','knowledge-explainer-studio','camera-4d-director'].map(d => `${dir}/${d}/index.html`),
  ...['index','pelican-arena','demo-faf-pelican','demo-agent-forge-pelican','demo-hve-pelican'].map(n => `${dir}/pelican-bicycle-arena/${n}.html`)
]).concat(['game/index.html','game/demos/scrap-swarm/index.html','game/demos/wanan-midnight/index.html','voice/deck.html',
  'workshops/azure-agent-infra/demo.html','workshops/azure-agent-infra/selector.html','workshops/azure-agent-infra/workbench-cycle-377.html',
  ...['index','pelican-arena','demo-faf-pelican','demo-agent-forge-pelican','demo-hve-pelican'].map(n => `workshops/faf-vs-agent-forge/${n}.html`),
  'workshops/maf-multi-agent-benchmark/index.html','workshops/data-lab/index.html','game/demos/scrap-swarm/design/index.html']);
const records = files.map(source => ({source, en: source.replace(/\.html$/, '.en.html'), zh: source, kind: 'demo'}));
const deferred = [];
const sourceCache = new Map();
const readSource = (file, commit = BASELINE) => {
  const key = `${commit}:${file}`;
  if (!sourceCache.has(key)) sourceCache.set(key, cp.execFileSync('git', ['show', key], {cwd: root, encoding: 'utf8', maxBuffer: 30 * 1024 * 1024}));
  return sourceCache.get(key);
};
const isArena = file => /(?:pelican-bicycle-arena|faf-vs-agent-forge)\/(?:index|pelican-arena)\.html$/.test(file);
const isEngine = file => /demo-(?:faf|agent-forge|hve)-pelican\.html$/.test(file);
const svgSources = ['01-data-lab-executive-summary-2026-11-01','02-microsoft-iq-fabric-iq-architecture','03-five-cloud-coexistence-topology'].map(name => `workshops/data-lab/assets/svg/${name}.svg`);
function original(file) {
  let html = readSource(file);
  if (isArena(file)) {
    const old = readSource(file, ARENA_BASELINE);
    const controls = old.match(/<!-- Master Synchronized Broadcast Controller -->[\s\S]*?(?=<!-- 3-Way Live Pelican Bicycle Demos -->)/)[0];
    html = html.replace(/<!-- Native simulator access replaces embedded preview controls\. -->[\s\S]*?(?=<!-- 3-Way Live Pelican Bicycle Demos -->)/, controls);
    const frames = [...old.matchAll(/<iframe\b[^>]*class="demo-frame"[^>]*>[\s\S]*?<\/iframe>/g)].map(m => m[0]);
    let frame = 0;
    html = html.replace(/<p class="kee-dedicated-native-link">[\s\S]*?<\/p>/g, block => /Native canvas and controls/.test(block) ? frames[frame++] : block);
    if (frame !== 3) throw new Error(`Expected exactly three restored engines: ${file} (${frame})`);
    // The original FAF/Forge receivers use lower-case arena-sync; HVE uses ARENA_SYNC.
    html = html.replace("fr.contentWindow.postMessage(msg, '*')", "fr.contentWindow.postMessage(Object.assign({}, msg, {type: id === 'frameHve' ? 'ARENA_SYNC' : 'arena-sync'}), location.origin)");
  }
  return html;
}

function transform(record, language, dictionary, runtime) {
  const file = record[language === 'en' ? 'en' : 'zh'];
  let html = original(record.source);
  html = html.replace(/<span class="kee-dedicated-language">[\s\S]*?<\/span>/g, '');
  html = html.replace(/<html\b[^>]*\blang="[^"]*"/, `<html lang="${language}"`);
  const config = {language, source: record.source, en: path.posix.basename(record.en), zh: path.posix.basename(record.zh), engine: isEngine(record.source), arena: isArena(record.source)};
  if (config.arena) html = html.replace(/(<iframe\b[^>]*src=")([^"]+)(")/g, (_, before, src, after) => {
    const engine = path.posix.basename(src).replace(/\.html$/, language === 'en' ? '.en.html' : '.html');
    if (!/^demo-(?:faf|agent-forge|hve)-pelican(?:\.en)?\.html$/.test(engine)) throw new Error(`Unexpected arena engine ${src}`);
    return `${before}./${engine}?lang=${language}&arena=1${after}`;
  });
  if (record.source === 'workshops/data-lab/index.html' && language === 'en') {
    for (const source of svgSources) html = html.replaceAll(path.posix.basename(source), path.posix.basename(source).replace(/\.svg$/, '.en.svg'));
  }
  if (language === 'en' || record.source !== 'game/index.html') html = require('./localization/demos-runtime.cjs').translateMarkup(html, language, dictionary);
  const payload = JSON.stringify({...config, terms: dictionary}).replace(/</g, '\\u003c');
  html = html.replace('</head>', () => `<!-- demo-localization:start -->\n<style>html.in-arena-frame [data-professional-header],html.in-arena-frame .kee-dedicated-nav,html.in-arena-frame .reading-header,html.in-arena-frame .demo-language-navigation{display:none!important}</style>\n<script>(${runtime})(${payload});</script>\n<!-- demo-localization:end -->\n</head>`);
  const languages = `<nav class="demo-language-navigation" aria-label="${language === 'en' ? 'Demo language' : '演示语言'}"><a href="${path.posix.basename(record.en)}?lang=en" hreflang="en">EN</a> · <a href="${path.posix.basename(record.zh)}?lang=zh-CN" hreflang="zh-CN">中文</a></nav>`;
  html = html.replace(/<body\b[^>]*>/, match => `${match}\n<!-- demo-language-navigation:start -->${languages}<!-- demo-language-navigation:end -->`);
  return html;
}
async function buildDemos({write = true} = {}) {
  const {runtime, dictionaryFor} = require('./localization/demos-runtime.cjs');
  const output = [];
  for (const record of records) {
    const dictionary = dictionaryFor(original(record.source), record.source);
    for (const language of ['zh-CN', 'en']) {
      const file = language === 'en' ? record.en : record.zh;
      const html = transform(record, language, dictionary, runtime.toString());
      if (write) fs.writeFileSync(path.join(root, file), html);
      output.push({file, html});
    }
  }
  for (const source of svgSources) {
    const svg = readSource(source);
    const file = source.replace(/\.svg$/, '.en.svg');
    const html = require('./localization/demos-runtime.cjs').translateMarkup(svg, 'en', dictionaryFor(svg, source));
    if (write) fs.writeFileSync(path.join(root, file), html);
    output.push({file, html});
  }
  if (write) {
    fs.writeFileSync(path.join(root, 'docs/redesign/demo-localization.json'), JSON.stringify(records, null, 2) + '\n');
    fs.writeFileSync(path.join(root, 'docs/redesign/demo-localization-coverage.json'), JSON.stringify({baseline: BASELINE, arenaBaseline: ARENA_BASELINE, pairs: records.length, deferred, translation: {preparation: 'local Argos Translate 1.9 zh-en draft dictionary; no source content uploaded', review: 'Native i18n and manually reviewed scientific, control, Chinese interface and prioritization-report overrides take precedence. Offline English narrative drafts still require editorial review; coverage tests are not linguistic certification.'}}, null, 2) + '\n');
  }
  return {records, output, deferred};
}
module.exports = {root, BASELINE, ARENA_BASELINE, files, records, deferred, svgSources, readSource, original, isArena, isEngine, transform, buildDemos};
if (require.main === module) buildDemos().then(r => console.log(`Localized ${r.records.length} demo pairs; restored 12 three-engine arena editions.`)).catch(error => { console.error(error); process.exitCode = 1; });
