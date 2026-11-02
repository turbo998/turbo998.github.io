'use strict';
// Translation is a checked-in, offline-authored lookup, never a runtime service.
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
const professional = require('./professional-navigation.cjs');
const { classifyPath } = require('./engineering-tracks.cjs');
const { knowledgeFigure } = require('./knowledge-atlas.cjs');
const root = path.resolve(__dirname, '..');
const { baseline, sources: sourcePaths } = require('./localization/reports-sources.json');
const dataPath = path.join(__dirname, 'localization', 'reports-translations.json');
const bases = [...new Set(sourcePaths.map(p => p.replace(/\.en\.html$/, '.html')))];
const manifest = bases.map(source => ({ source, en: source.replace(/\.html$/, '.en.html'), zh: source.replace(/\.html$/, '.zh-CN.html'), kind: 'report' }));
const sourceCache = new Map();
function readSource(file) {
  if (!sourceCache.has(file)) sourceCache.set(file, execFileSync('git', ['show', `${baseline}:${file}`], { cwd: root, maxBuffer: 20 * 1024 * 1024 }).toString('utf8'));
  return sourceCache.get(file);
}
function cleanPerimeter(html) {
  return html.replace(/<!-- kee-(?:dedicated|professional|report-localization)-navigation:start -->[\s\S]*?<!-- kee-(?:dedicated|professional|report-localization)-navigation:end -->/g, '')
    .replace(/<!-- kee-report-localization:metadata:start -->[\s\S]*?<!-- kee-report-localization:metadata:end -->/g, '')
    .replace(/<!-- site-remediation-knowledge:start -->[\s\S]*?<!-- site-remediation-knowledge:end -->/g, '')
    .replace(/<!-- kee-data-lab:(?:style|navigation|runtime):start -->[\s\S]*?<!-- kee-data-lab:(?:style|navigation|runtime):end -->/g, '')
    .replace(/<!-- radar-(?:report-style|report-nav|report-open|report-close):start -->[\s\S]*?<!-- radar-(?:report-style|report-nav|report-open|report-close):end -->/g, '');
}
// Keep source tags, whitespace, code/data, scripts and all chart geometry byte-for-byte.
const tokenPattern = /<!--[\s\S]*?-->|<(script|style)\b[^>]*>[\s\S]*?<\/\1\s*>|<[^>]*>|[^<]+/gi;
function mapText(html, visit) {
  const stack = [];
  return html.replace(tokenPattern, token => {
    if (/^<(script|style)\b|^<!--/i.test(token)) return token;
    const close = token.match(/^<\/([\w:-]+)/);
    if (close) {
      const index = stack.findLastIndex(entry => entry.tag === close[1].toLowerCase());
      if (index >= 0) stack.length = index;
      return token;
    }
    const skip = stack.some(entry => entry.skip);
    if (/^</.test(token)) {
      const tag = token.match(/^<([\w:-]+)/)?.[1].toLowerCase();
      const classes = token.match(/\bclass=["']([^"']*)["']/)?.[1].split(/\s+/) || [];
      const isCode = /^(?:code|pre)$/.test(tag) || classes.some(value => /^(?:dark-code|code-block|code|code-panel|code-dark)$/.test(value));
      if (tag && !/^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/.test(tag) && !/\/\s*>$/.test(token)) stack.push({ tag, skip: isCode });
      return skip || isCode ? token : token.replace(/\b(alt|title|aria-label|placeholder)=("[^"]*"|'[^']*')/gi, (all, key, quoted) => `${key}=${quoted[0]}${visit(quoted.slice(1, -1), true)}${quoted[0]}`);
    }
    return skip ? token : visit(token, false);
  });
}
function normalized(text) { return text.replace(/\s+/g, ' ').trim(); }
const segmentCache = new Map();
function textSegments(html) {
  if (!segmentCache.has(html)) {
    const segments = new Set();
    mapText(cleanPerimeter(html), text => { const s = normalized(text); if (/[A-Za-z\u3400-\u9fff]/.test(s)) segments.add(s); return text; });
    segmentCache.set(html, [...segments]);
  }
  return segmentCache.get(html);
}
function escapeAttribute(text) { return text.replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
function translate(html, locale, dictionaries) {
  return mapText(html, (text, attribute) => {
    const key = normalized(text), value = dictionaries[locale]?.[key];
    if (value === undefined || value === key) return text;
    const translated = attribute ? escapeAttribute(value) : value;
    return text.replace(/\S[\s\S]*\S|\S/, () => translated);
  });
}
function relative(from, to) { return path.posix.relative(path.posix.dirname(from), to) || path.posix.basename(to); }
function perimeter(html, record, file, locale, translated) {
  const en = locale === 'en';
  const isRadar = file.startsWith('workshops/github-trending-radar/');
  const isDataLab = file.startsWith('workshops/data-lab/');
  const alternate = `<link rel="alternate" hreflang="en" href="${relative(file,record.en)}"><link rel="alternate" hreflang="zh-CN" href="${relative(file,record.zh)}">`;
  const extraCss = isRadar
    ? `.radar-report-nav{width:100%;max-width:900px;display:flex;flex-wrap:wrap;align-items:center;gap:12px 20px;padding:16px 20px;background:#101a30;color:#eef3ff;border:1px solid #314361;border-radius:12px;font:14px/1.5 "Segoe UI",sans-serif}.radar-report-nav a{color:#9aabff;text-decoration:none}.radar-report-nav a:hover{text-decoration:underline}.radar-report-nav a:focus-visible{outline:2px solid #56ddcd;outline-offset:4px}.radar-report-nav .identity{font-weight:700;color:#eef3ff;margin-right:auto}.radar-report-nav .languages{display:flex;gap:14px;margin-left:auto}.radar-report-nav [aria-current]{color:#56ddcd}.radar-report-source{display:flex;flex-direction:column;align-items:center;gap:28px;width:900px;flex-shrink:0}@media(max-width:932px){.radar-report-source{zoom:calc((100vw - 32px) / 900px)}}@media print{.radar-report-nav{display:none}.radar-report-source{zoom:1}}`
    : isDataLab
    ? `body:has(>.kee-data-lab-nav){background:#07111f;color-scheme:normal}body:has(>.kee-data-lab-nav)>.top-nav{width:min(900px,100%);flex-wrap:wrap;gap:12px;overflow-wrap:anywhere}body:has(>.kee-data-lab-nav)>.top-nav>div{min-width:0}@media screen and (max-width:931px){body:has(>.kee-data-lab-nav)>.card{zoom:min(1,tan(atan2(calc(100vw - 32px),900px)))}}@media print{body:has(>.kee-data-lab-nav)>.card{zoom:1}}`
    : '';
  const metadata = `<!-- kee-report-localization:metadata:start -->${alternate}<meta name="report-translation-source" content="${record.source}@${baseline}"><meta name="report-translation-provenance" content="translation; independently_reproduced=false"><style>${extraCss}${professional.css()}</style><!-- kee-report-localization:metadata:end -->`;
  const topic = classifyPath(file) || 'benchmarks';
  const topicTarget = topic === 'sa-skills' ? `studio/${en?'':'zh-'}index.html#sa-skills` : topic === 'general' ? `studio/${en?'':'zh-'}index.html` : `studio/${en?'':'zh-'}${topic}.html`;
  const context = isDataLab
    ? `<a href="${relative(file,`studio/${en?'':'zh-'}infra.html`)}">← Infra · ${en?'Data architecture':'数据架构'}</a> · <a href="${relative(file,topicTarget)}">${en?'Parent topic':'返回主题'}</a>`
    : `<a href="${relative(file,`studio/${en?'':'zh-'}index.html`)}">← ${en?'Engineering Hub':'工程枢纽'}</a> · <a href="${relative(file,topicTarget)}">${en?'Parent topic':'返回主题'}</a>`;
  const languages = isDataLab
    ? `<a href="${relative(file,record.en)}" data-resource-language="en" lang="en" hreflang="en"${en ? ' aria-current="page"' : ''}>EN</a><a href="${relative(file,record.zh)}" data-resource-language="zh" lang="zh-CN" hreflang="zh-CN"${!en ? ' aria-current="page"' : ''}>中文</a>`
    : `<a href="${relative(file,record.en)}" lang="en" hreflang="en"${en ? ' aria-current="page"' : ''}>EN</a><a href="${relative(file,record.zh)}" lang="zh-CN" hreflang="zh-CN"${!en ? ' aria-current="page"' : ''}>中文</a>`;
  const className = isRadar ? 'kee-dedicated-nav radar-report-nav' : isDataLab ? 'kee-dedicated-nav kee-data-lab-nav' : 'kee-dedicated-nav';
  const active = isRadar ? 'radar' : 'benchmarks';
  const header = professional.navigation({file, en, className, active, languages, context});
  const titleText = normalized((/<title[^>]*>([\s\S]*?)<\/title>/i.exec(html)?.[1] || file).replace(/<[^>]+>/g, ''));
  const figure = knowledgeFigure(file, !en, {topic, title: titleText}).replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');
  const navigation = `<!-- kee-report-localization-navigation:start -->${header}<nav aria-label="${en ? 'Report language' : '报告语言'}" style="font:14px/1.5 system-ui,sans-serif;display:flex;flex-wrap:wrap;gap:12px;padding:12px 18px;background:#101a30;color:#eef3ff;width:100%;box-sizing:border-box"><a style="color:#9aabff" href="${relative(file,record.en)}" lang="en" hreflang="en"${en ? ' aria-current="page"' : ''}>EN</a><a style="color:#9aabff" href="${relative(file,record.zh)}" lang="zh-CN" hreflang="zh-CN"${!en ? ' aria-current="page"' : ''}>中文</a><span>${translated ? (en ? 'Translated source report; not an independent reproduction. Metrics and evidence are unchanged.' : '源报告译本；非独立复测。指标与证据保持原样。') : (en ? 'Archived source report; complete language editions above.' : '存档源报告；完整语言版本见上方。')}</span></nav>${figure}${isRadar ? '<div class="radar-report-source">' : ''}<!-- kee-report-localization-navigation:end -->`;
  const out = html.replace(/<\/head>/i, metadata + '</head>').replace(/<body\b[^>]*>/i, '$&' + navigation);
  return isRadar ? out.replace(/<\/body>/i, '<!-- kee-report-localization-navigation:start --></div><!-- kee-report-localization-navigation:end --></body>') : out;
}
function render(record, locale, dictionaries) {
  const file = record[locale === 'en' ? 'en' : 'zh'];
  const originalFile = locale === 'en' && sourcePaths.includes(record.en) ? record.en : record.source;
  let html = cleanPerimeter(readSource(originalFile));
  html = translate(html, locale, dictionaries).replace(/(<html\b[^>]*\blang=)["'][^"']*["']/i, `$1"${locale}"`);
  // Legacy locale buttons only translated a subset of the page. Native links select a complete static edition.
  html = html.replace(/<button\b([^>]*\bdata-lang=["'](en|zh-CN|zh-TW)["'][^>]*)>[\s\S]*?<\/button>/gi, (_, attrs, lang) => `<a ${attrs.replace(/\b(?:data-lang|type|id)=["'][^"']*["']/g, '')} href="${relative(file,lang === 'en' ? record.en : record.zh)}">${lang === 'en' ? 'EN' : '中文'}</a>`);
  return perimeter(html, record, file, locale, true);
}
function loadDictionaries() {
  const authored = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
  const reviewed = require('./localization/reports-reviewed.cjs');
  return Object.fromEntries(['en', 'zh-CN'].map(locale => [locale, { ...authored[locale], ...reviewed[locale] }]));
}
function auditTranslations(dictionaries = loadDictionaries()) {
  const missing = [];
  const invalid = [];
  const numeric = value => value.match(/\d+(?:[.,]\d+)*/g) || [];
  for (const [locale, dictionary] of Object.entries(dictionaries)) for (const [source, target] of Object.entries(dictionary)) {
    if (typeof target !== 'string' || JSON.stringify(numeric(source)) !== JSON.stringify(numeric(target))) invalid.push({ locale, source, reason: 'numeric text differs' });
    else if (/<\/?(?:script|style|iframe|img)\b/i.test(target)) invalid.push({ locale, source, reason: 'markup injection' });
    else for (const literal of source.match(/`[^`]*`|\$(?:\\.|[^$\n])+\$/g) || []) if (!target.includes(literal)) invalid.push({ locale, source, reason: 'formula or code literal changed' });
  }
  for (const record of manifest) for (const locale of ['en', 'zh-CN']) {
    const original = locale === 'en' && sourcePaths.includes(record.en) ? record.en : record.source;
    for (const source of textSegments(readSource(original))) {
      const needs = locale === 'en' ? /[\u3400-\u9fff]/.test(source) : /[A-Za-z]/.test(source) && !/[\u3400-\u9fff]/.test(source);
      if (needs && dictionaries[locale]?.[source] === undefined) missing.push({ file: original, locale, source });
    }
  }
  return { baseline, families: manifest.length, missing, invalid };
}
function buildReports({ write = true } = {}) {
  const dictionaries = loadDictionaries();
  const audit = auditTranslations(dictionaries);
  if (audit.missing.length || audit.invalid.length) throw new Error(`Report localization is incomplete: ${audit.missing.length} missing mappings; ${audit.invalid.length} invalid mappings. Call auditTranslations() for details.`);
  const outputs = new Map();
  for (const record of manifest) {
    for (const locale of ['en', 'zh-CN']) outputs.set(record[locale === 'en' ? 'en' : 'zh'], render(record, locale, dictionaries));
    // Preserve the source artifact itself; only replace the language-navigation perimeter.
    const original = readSource(record.source).replace(/(<html\b[^>]*\blang=)["']zh["']/i, '$1"zh-CN"');
    outputs.set(record.source, perimeter(cleanPerimeter(original), record, record.source, /<html[^>]+lang="en"/.test(original) ? 'en' : 'zh-CN', false));
  }
  if (write) {
    for (const [file, html] of outputs) fs.writeFileSync(path.join(root, file), html);
    fs.writeFileSync(path.join(root, 'docs', 'redesign', 'report-localization.json'), JSON.stringify(manifest, null, 2) + '\n');
  }
  return { baseline, manifest, outputs };
}
module.exports = { root, baseline, sourcePaths, manifest, readSource, cleanPerimeter, mapText, normalized, textSegments, translate, render, loadDictionaries, auditTranslations, buildReports };
if (require.main === module) console.log(`Localized ${buildReports().manifest.length} report families (EN + zh-CN).`);
