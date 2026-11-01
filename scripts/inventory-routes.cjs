'use strict';

// Inventory a sealed Git tree, not the parallel R3 preview or a main checkout.
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const { execFileSync } = require('node:child_process');
const BASELINE = 'b31286a79f4ff5443b480566934ce2e2e58c59ef';
const ROOT = path.resolve(__dirname, '..');
const OUT = path.join(ROOT, 'docs', 'redesign');
const ORIGIN = 'https://turbo998.github.io';
const TRACKS = ['infra', 'commerce', 'voice', 'benchmarks', 'animation', 'game', 'security'];
const EXPECTED_SCENES = { infra: 6, commerce: 3, voice: 4, benchmarks: 9, animation: 9, game: 4, security: 2 };
const git = (...args) => execFileSync('git', args, { cwd: ROOT, maxBuffer: 80 * 1024 * 1024 });
const hash = value => crypto.createHash('sha256').update(value).digest('hex');
const contentId = file => 'content-' + hash(file).slice(0, 16);
const decode = value => value.replace(/&(#x[\da-f]+|#\d+|amp|quot|apos|lt|gt|nbsp);/gi, (whole, entity) => {
  if (entity[0] === '#') {
    const code = entity[1].toLowerCase() === 'x' ? parseInt(entity.slice(2), 16) : Number(entity.slice(1));
    return code <= 0x10ffff ? String.fromCodePoint(code) : whole;
  }
  return ({ amp: '&', quot: '"', apos: "'", lt: '<', gt: '>', nbsp: ' ' })[entity.toLowerCase()];
});
const plain = value => decode(value.replace(/<[^>]*>/g, ' ')).replace(/\s+/g, ' ').trim();
const linesAt = (text, index) => text.slice(0, index).split('\n').length;
const attrs = tag => {
  const result = {};
  const re = /([^\s=<>/]+)\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/g;
  for (const m of tag.matchAll(re)) result[m[1].toLowerCase()] = decode(m[2] ?? m[3] ?? m[4]);
  return result;
};
function readSnapshot() {
  const files = git('ls-tree', '-r', '--name-only', BASELINE).toString('utf8').trim().split('\n');
  const sources = files.filter(file => /\.(?:html|js|mjs|cjs)$/.test(file));
  const requests = sources.map(file => `${BASELINE}:${file}`).join('\n') + '\n';
  const batch = execFileSync('git', ['cat-file', '--batch'], { cwd: ROOT, input: requests, maxBuffer: 80 * 1024 * 1024 });
  const texts = new Map();
  const blobs = new Map();
  let cursor = 0;
  for (const file of sources) {
    const end = batch.indexOf(10, cursor);
    const [oid, type, length] = batch.subarray(cursor, end).toString().split(' ');
    assert.equal(type, 'blob', file);
    cursor = end + 1;
    const bytes = batch.subarray(cursor, cursor + Number(length));
    texts.set(file, bytes.toString('utf8'));
    blobs.set(file, { gitBlob: oid, sha256: hash(bytes), bytes: bytes.length });
    cursor += Number(length) + 1;
  }
  return { files, texts, blobs };
}
// Quoted attributes can contain >. Script/style bodies are not static HTML tags.
function htmlTokens(text) {
  const tokens = [];
  const re = /<!--[\s\S]*?-->|<(script|style)\b(?:"[^"]*"|'[^']*'|[^'">])*\>[\s\S]*?<\/\1\s*>|<[a-z][a-z\d:-]*\b(?:"[^"]*"|'[^']*'|[^'">])*\>/gi;
  for (const m of text.matchAll(re)) {
    if (m[0].startsWith('<!--')) continue;
    const tag = /^<([\w:-]+)/.exec(m[0])[1].toLowerCase();
    const open = /^<(?:"[^"]*"|'[^']*'|[^'">])*>/.exec(m[0])[0];
    tokens.push({ tag, attributes: attrs(open), index: m.index, line: linesAt(text, m.index), raw: open });
  }
  return tokens;
}
function scriptsIn(text) {
  const result = [];
  const re = /<script\b(?:"[^"]*"|'[^']*'|[^'">])*\>([\s\S]*?)<\/script\s*>/gi;
  for (const m of text.matchAll(re)) result.push({ text: m[1], index: m.index + m[0].indexOf('>') + 1 });
  return result;
}
function routePolicy(file) {
  if (/^(index|zh|frontier-ai-studio)\.html$/.test(file)) return 'portal';
  if (/style-preview\.html$|azure-vm-modernization\/index\.html$|\/design\/index\.html$/.test(file)) return 'auxiliary';
  if (/cards(?:\.en)?\.html$|(?:test|prioritization)-report(?:\.en)?\.html$/.test(file)) return 'report';
  if (/\/research\/|^articles\/|monograph|case-study/.test(file)) return 'article';
  if (/\/demos\/|\/live-demo|\/demo\.html$|\/selector\.html$|pelican-arena|faf-vs-agent-forge\/index|maf-multi-agent-benchmark\/index|\/deck\.html$/.test(file)) return 'demo';
  if (/^(?:zh-)?(?:about|career|skills|projects|opensource|writing|openrouter)\.html$/.test(file)) return 'portal';
  return 'topic';
}
function memberships(file) {
  const set = new Set();
  if (/^(index|zh|frontier-ai-studio)\.html$/.test(file)) TRACKS.forEach(t => set.add(t));
  if (/azure-agent-infra|azure-vm-modernization|deepinfer-v41-economics/.test(file)) set.add('infra');
  if (/agentic-commerce/.test(file)) set.add('commerce');
  if (/^voice\//.test(file)) set.add('voice');
  if (/benchmarks|faf-vs-agent-forge|maf-multi-agent-benchmark|harness-engineering|pelican-bicycle-arena/.test(file)) set.add('benchmarks');
  if (/^(animation|generative-visual-lab)\//.test(file) || /hve-animation-and-game/.test(file)) set.add('animation');
  if (/^game\//.test(file)) set.add('game');
  if (/ai-security|security-ai-landing-zone/.test(file)) set.add('security');
  return set;
}
function main() {
  const { files, texts, blobs } = readSnapshot();
  const tracked = new Set(files);
  const htmlFiles = files.filter(file => file.endsWith('.html'));
  assert.equal(htmlFiles.length, 146, 'Sealed baseline must contain exactly 146 HTML files');
  const htmlSet = new Set(htmlFiles);
  const topDirectories = new Set(files.filter(f => f.includes('/')).map(f => f.split('/')[0]));
  const parsed = new Map(htmlFiles.map(file => [file, htmlTokens(texts.get(file))]));
  const ids = new Map(htmlFiles.map(file => [file, new Set(parsed.get(file).flatMap(t => [t.attributes.id, t.attributes.name].filter(Boolean)))]));
  const references = [];
  const onclickHandlers = [];
  const dynamicEvidence = [];
  const iframes = [];
  const scriptSources = [];
  const sourceEntries = [];
  function resolve(raw, source, base) {
    if (/\$\{|[<>]|\{\{|['"]\s*\+|\+\s*['"]/.test(raw)) return { kind: 'dynamic-expression', status: 'unresolved', validation: 'Needs runtime/data-flow review' };
    let url;
    try { url = new URL(raw, base || `${ORIGIN}/${source}`); } catch { return { kind: 'invalid-url', status: 'invalid', validation: 'WHATWG URL parse failed' }; }
    if (!['http:', 'https:'].includes(url.protocol)) return { kind: 'non-http', status: 'not-path-checked', scheme: url.protocol, validation: 'Not a repository path' };
    const result = { absoluteUrl: url.href, query: url.search, fragment: url.hash };
    if (url.hostname !== 'turbo998.github.io') {
      const example = /(?:\.example|\.svc\.cluster\.local)$|^localhost$|^127\.|^10\.|^192\.168\./.test(url.hostname);
      return { ...result, kind: 'external', status: 'not-network-checked', usage: example ? 'Example/private-address literal, not evidence of a deployed public service' : url.hostname.endsWith('.azurewebsites.net') ? 'Linked Azure App Service deployment; independent of this repository' : 'Remote reference or service', ownership: url.hostname === 'github.com' ? 'Remote repository; linked owner does not grant write authority' : example ? 'Illustrative/internal endpoint; do not probe or publish as a runnable deployment' : 'External reference/service; owner and availability unverified' };
    }
    let target;
    try { target = decodeURIComponent(url.pathname).replace(/^\//, ''); } catch { return { ...result, kind: 'invalid-url', status: 'invalid', validation: 'Invalid percent encoding' }; }
    const first = target.split('/')[0];
    if (target.includes('/') && first && !topDirectories.has(first) && /^(?:https?:)?\/\//.test(raw)) {
      return { ...result, kind: 'external-project-deployment', status: 'not-network-checked', ownership: `Same-host project ${first}; not owned by this repository/worktree`, targetPath: target };
    }
    if (!target || target.endsWith('/')) target += 'index.html';
    if (!tracked.has(target) && tracked.has(target + '/index.html')) target += '/index.html';
    const exists = tracked.has(target);
    let fragmentStatus = 'none';
    if (url.hash && exists && htmlSet.has(target)) {
      let anchor;
      try { anchor = decodeURIComponent(url.hash.slice(1)); } catch { anchor = url.hash.slice(1); }
      fragmentStatus = ids.get(target).has(anchor) ? 'static-id-exists' : 'unresolved-runtime-or-missing';
      if (/^(animation|generative-visual-lab)\/demos\/knowledge-explainer-studio\/index\.html$/.test(target)
        && ['tpl-mcp', 'tpl-rag', 'tpl-finops'].includes(anchor) && texts.get(target).includes(`'${anchor}':`)) fragmentStatus = 'runtime-template-alias-evidenced-in-source';
      if (['index.html', 'zh.html'].includes(target) && ['writing', 'pillars'].includes(anchor) && !ids.get(target).has(anchor)) fragmentStatus = 'missing-legacy-home-anchor';
      if (target === 'frontier-ai-studio.html' && TRACKS.includes(anchor.split('/')[0])) {
        fragmentStatus = /\/stage\//.test(anchor) ? 'legacy-stage-slash-not-recognized-as-stage' : 'studio-route-needs-contract-validation';
      }
    }
    return { ...result, kind: 'internal', status: exists ? 'tracked-path-exists' : 'missing-tracked-path', targetPath: target,
      contentId: htmlSet.has(target) ? contentId(target) : null, fragmentStatus, validation: 'Exact-case Git baseline path; fragments checked against static IDs only' };
  }
  function ref(source, line, kind, raw, extra = {}) {
    const item = { id: 'ref-' + String(references.length + 1).padStart(5, '0'), source, line, kind, raw, ...extra, resolution: resolve(raw, source, extra.baseUrl) };
    if (kind === 'script-url-candidate' && /^tests\//.test(source) && !/^(?:https?:)?\/\//.test(raw)) {
      item.candidateResolution = item.resolution;
      item.resolution = { kind: 'test-fixture', status: 'unresolved-test-document-context', validation: 'Browser-test URL fragments are composed against the test server, not the tests directory' };
    } else if (kind === 'script-url-candidate' && source === 'server.mjs' && !/^(?:https?:|\/)/.test(raw)) {
      item.candidateResolution = item.resolution;
      item.resolution = { kind: 'path-component', status: 'unresolved-composed-path', validation: 'A path.join component is not an independently navigable URL' };
    } else if (kind === 'script-url-candidate' && source === 'workshops/azure-vm-modernization/index.html' && /^(?:workshop|calculator|demo)\.html$/.test(raw)) {
      item.resolution = resolve('https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/' + raw, source);
      item.resolutionContext = 'Existing new URL(page, external deployment base) in this redirect stub';
    } else if (kind === 'dynamic-href-template' && !source.endsWith('.html') && !/^(?:https?:|\/\/)/.test(raw)) {
      const contexts = [...new Set(scriptSources.filter(s => s.resolution.targetPath === source).map(s => s.source))];
      item.browserDocumentContexts = contexts;
      if (contexts.length) {
        const resolutions = contexts.map(document => ({ document, resolution: resolve(raw, document) }));
        item.contextResolutions = resolutions;
        const unique = new Set(resolutions.map(r => JSON.stringify(r.resolution)));
        if (unique.size === 1) item.resolution = resolutions[0].resolution;
        else item.resolution = { kind: 'dynamic-expression', status: 'unresolved-multiple-document-contexts', validation: 'Script-generated links resolve against their document, not the script asset directory; see contextResolutions' };
      } else item.resolution = { kind: 'dynamic-expression', status: 'unresolved-document-context', validation: 'Importer/module context needed before resolving generated markup' };
    }
    references.push(item);
    return item;
  }
  for (const file of htmlFiles) {
    const text = texts.get(file);
    const tokens = parsed.get(file);
    const baseTag = tokens.find(t => t.tag === 'base' && t.attributes.href);
    const baseUrl = baseTag ? new URL(baseTag.attributes.href, `${ORIGIN}/${file}`).href : undefined;
    for (const token of tokens) {
      const a = token.attributes;
      if (a.href !== undefined) ref(file, token.line, 'static-href', a.href, { tag: token.tag, hreflang: a.hreflang || null, ...(baseUrl ? { baseUrl } : {}) });
      if (token.tag === 'script' && a.src) scriptSources.push({ source: file, line: token.line, raw: a.src, resolution: resolve(a.src, file, baseUrl) });
      if (token.tag === 'iframe') {
        const record = { source: file, line: token.line, id: a.id || null, src: a.src ?? null, defaultSrc: a['data-default-src'] || null,
          title: a.title || null, allow: a.allow || null, sandbox: a.sandbox ?? null, srcdoc: a.srcdoc || null, referenceIds: [] };
        for (const [attribute, raw] of [['src', a.src], ['data-default-src', a['data-default-src']]]) {
          if (raw !== undefined) record.referenceIds.push(ref(file, token.line, 'iframe-' + attribute, raw, { iframeId: record.id }).id);
        }
        iframes.push(record);
      }
      if (a.onclick !== undefined) {
        const handler = { source: file, line: token.line, elementId: a.id || null, expression: a.onclick, destinationReferenceIds: [], status: 'No literal destination; interaction or runtime-dependent' };
        for (const m of a.onclick.matchAll(/(['"`])([^'"`]+)\1/g)) {
          if (/^(?:https?:|\/|\.\.?\/|#)|\.html(?:[?#]|$)/i.test(m[2])) handler.destinationReferenceIds.push(ref(file, token.line, 'onclick-literal', m[2], { elementId: a.id || null }).id);
        }
        if (handler.destinationReferenceIds.length) handler.status = 'Literal destinations extracted; handler retained for verification';
        onclickHandlers.push(handler);
      }
      if (token.tag === 'meta' && /refresh/i.test(a['http-equiv'] || '') && a.content) {
        const m = /url\s*=\s*(.*)$/i.exec(a.content);
        if (m) ref(file, token.line, 'meta-refresh', m[1].replace(/^['"]|['"]$/g, ''));
      }
    }
    for (const script of scriptsIn(text)) sourceEntries.push({ source: file, ...script });
  }
  for (const file of files.filter(f => /\.(?:js|mjs|cjs)$/.test(f))) sourceEntries.push({ source: file, text: texts.get(file), index: 0 });
  for (const entry of sourceEntries) {
    const full = texts.get(entry.source);
    // A conservative superset: literal URL candidates are NOT asserted to execute.
    const literal = /(['"`])((?:\\.|(?!\1)[^\\\r\n])*?)\1/g;
    for (const m of entry.text.matchAll(literal)) {
      const value = decode(m[2].replace(/\\\//g, '/'));
      if (value.length > 3000) continue;
      if (/^(?:https?:\/\/|\/\/)[^\s]+$/.test(value) || /^(?:\.{0,2}\/)?[\w@%+./:-]+\.html(?:[?#][^\s]*)?$/.test(value)) {
        ref(entry.source, linesAt(full, entry.index + m.index), 'script-url-candidate', value, { certainty: 'Literal candidate; may be data, test fixture, or composed URL, not proven navigation' });
      }
    }
    const dynamic = /(?:[\w$.]+(?:\([^;\n]{0,180}?\))?\.(?:href|src)\s*=(?!=)\s*[^;]{1,350}|(?:window\.)?location\.(?:assign|replace)\([^;\n]{0,350}|window\.open\([^;\n]{0,350}|setAttribute\(\s*['"](?:href|src)['"][^;\n]{0,350}|createElement\(\s*['"]iframe['"][^;\n]{0,350})/g;
    for (const m of entry.text.matchAll(dynamic)) dynamicEvidence.push({ source: entry.source, line: linesAt(full, entry.index + m.index), expression: m[0], status: 'Static evidence only; assignment may concern an image, script, link, or frame', resolvedBy: entry.source === 'site-structure.js' ? 'studioContract and scene mappings' : 'Related static links/onclick literals; arbitrary expressions remain unresolved' });
    for (const m of entry.text.matchAll(/<[a-z][a-z\d:-]*\b(?:"[^"]*"|'[^']*'|[^'">])*\>/gi)) {
      const a = attrs(m[0]);
      if (a.href !== undefined) ref(entry.source, linesAt(full, entry.index + m.index), 'dynamic-href-template', a.href, { certainty: 'Markup inside script string/template; literal/composed destination not executed' });
      if (a.onclick !== undefined) onclickHandlers.push({ source: entry.source, line: linesAt(full, entry.index + m.index), elementId: a.id || null, expression: a.onclick, destinationReferenceIds: [], status: 'Handler inside script-generated markup; runtime expression unverified' });
    }
    for (const m of entry.text.matchAll(/\b(?:querySelector(?:All)?\([^;\n]{0,160}iframe[^;\n]{0,160}|getElementById\([^;\n]{0,120}(?:iframe|frameFaf|frameForge|frameHve)[^;\n]{0,160}|[\w.]+\.contentWindow\b[^;\n]{0,250})/g)) {
      dynamicEvidence.push({ source: entry.source, line: linesAt(full, entry.index + m.index), expression: m[0], status: 'Iframe lookup/contentWindow use; source evidence, not browser execution' });
    }
    for (const m of entry.text.matchAll(/<iframe\b(?:"[^"]*"|'[^']*'|[^'">])*\>/gi)) {
      const a = attrs(m[0]);
      dynamicEvidence.push({ source: entry.source, line: linesAt(full, entry.index + m.index), expression: m[0].slice(0, 500), status: 'iframe markup inside script/template; runtime instantiation unverified' });
      if (a.src) ref(entry.source, linesAt(full, entry.index + m.index), 'dynamic-iframe-template-src', a.src);
    }
  }
  const frontier = texts.get('frontier-ai-studio.html');
  const structure = texts.get('site-structure.js');
  const sceneButtons = parsed.get('frontier-ai-studio.html').filter(t => /\bscene-pill\b/.test(t.attributes.class || '') && /loadTrackScene/.test(t.attributes.onclick || ''));
  const sceneData = sceneButtons.map(t => {
    const match = /loadTrackScene\('([^']+)',\s*'([^']+)'/.exec(t.attributes.onclick);
    assert.ok(match, t.raw);
    return { track: match[1], id: t.attributes.id, raw: match[2], line: t.line, label: plain(frontier.slice(t.index + t.raw.length).split('</button>')[0]) };
  });
  assert.equal(sceneData.length, 37);
  const membershipMap = new Map(htmlFiles.map(file => [file, memberships(file)]));
  for (const scene of sceneData) {
    const destination = resolve(scene.raw, 'frontier-ai-studio.html');
    if (membershipMap.has(destination.targetPath)) membershipMap.get(destination.targetPath).add(scene.track);
  }
  const records = htmlFiles.map(file => {
    const text = texts.get(file);
    const tokens = parsed.get(file);
    const declared = tokens.find(t => t.tag === 'html')?.attributes.lang || null;
    const visible = plain(text.replace(/<(script|style)\b[\s\S]*?<\/\1\s*>/gi, '').replace(/<!--[\s\S]*?-->/g, ''));
    const hanCount = (visible.match(/[\u3400-\u9fff]/g) || []).length;
    const latinCount = (visible.match(/[A-Za-z]/g) || []).length;
    const controls = tokens.filter(t => t.attributes['data-lang'] || t.attributes.hreflang || /(?:setLang|switchLang|toggleLang|setLanguage)\(/.test(t.attributes.onclick || ''));
    const role = routePolicy(file);
    const filenameLanguageHint = /\.en\.html$/.test(file) ? 'en' : /^(?:zh-|zh\.html$)/.test(file) ? 'zh-CN' : null;
    const filenameDeclarationConflict = filenameLanguageHint === 'en' && declared !== 'en';
    const associations = [];
    let counterpart = file === 'index.html' ? 'zh.html' : file === 'zh.html' ? 'index.html' : null;
    if (!counterpart && !file.includes('/')) counterpart = file.startsWith('zh-') ? file.slice(3) : 'zh-' + file;
    if (!counterpart && file.includes('/')) counterpart = file.endsWith('.en.html') ? file.replace(/\.en\.html$/, '.html') : file.replace(/\.html$/, '.en.html');
    if (counterpart && htmlSet.has(counterpart)) {
      const otherLang = parsed.get(counterpart).find(t => t.tag === 'html')?.attributes.lang || null;
      const outbound = references.some(r => r.source === file && r.kind === 'static-href' && r.resolution.targetPath === counterpart);
      const inbound = references.some(r => r.source === counterpart && r.kind === 'static-href' && r.resolution.targetPath === file);
      const evidence = { namingConvention: true, declaredLanguage: declared, counterpartDeclaredLanguage: otherLang, directLink: outbound, reverseLink: inbound };
      associations.push({ contentId: contentId(counterpart), path: counterpart, status: declared && otherLang && declared !== otherLang && (outbound || inbound) ? 'file-pair-evidenced-not-translation-audited' : 'candidate-needs-language-review', evidence });
    }
    const importedScripts = new Set(scriptSources.filter(s => s.source === file).map(s => s.resolution.targetPath));
    const dictionarySources = sourceEntries.filter(e => e.source === file || importedScripts.has(e.source)).flatMap(e => {
      const dictionary = /\b(?:[\w$]*i18n[\w$]*|translations|UI_TEXT)\b/i.exec(e.text);
      const locales = [...new Set([...e.text.matchAll(/(?:['"](en|zh-CN|zh-TW|zh)['"]|\b(en|zh))\s*:/g)].map(m => m[1] || m[2]))];
      return dictionary && locales.includes('en') && locales.some(l => l.startsWith('zh'))
        ? [{ source: e.source, line: linesAt(texts.get(e.source), e.index + dictionary.index), identifier: dictionary[0], localesObserved: locales, evidence: 'Inline or directly imported dictionary source; translation completeness and execution unverified' }]
        : [];
    });
    const runtimeDictionary = dictionarySources.length > 0;
    const translationStatus = associations.length ? associations[0].status : runtimeDictionary && controls.length ? 'in-page-switch-evidence-not-full-translation-verified' : 'no-verified-translation-counterpart';
    const exceptions = [];
    if (role === 'report') exceptions.push('Preserve original report layout, data, provenance, methodology and CSP; do not re-score or re-theme');
    if (role === 'demo') exceptions.push('Preserve native demo rendering, controls, assets, animation/WebGL and media permissions');
    if (/style-preview/.test(file)) exceptions.push('Historical style comparison; do not mistake baseline previews for R3 redesign samples');
    if (file === 'workshops/azure-vm-modernization/index.html') exceptions.push('Existing redirect stub targets external Azure-Infra-Lab deployment; preserve boundary');
    const trackList = TRACKS.filter(t => membershipMap.get(file).has(t));
    return { contentId: contentId(file), path: file, ...blobs.get(file), title: plain(/<title[^>]*>([\s\S]*?)<\/title>/i.exec(text)?.[1] || ''),
      language: { declared, evidence: { htmlLangLine: tokens.find(t => t.tag === 'html')?.line || null, filenameLanguageHint, filenameDeclarationConflict, visibleHanCharacters: hanCount, visibleLatinCharacters: latinCount,
        observedMixedScript: hanCount > 0 && latinCount > 0, languageControls: controls.map(t => ({ line: t.line, lang: t.attributes['data-lang'] || t.attributes.hreflang || null, onclick: t.attributes.onclick || null })), runtimeDictionary, dictionarySources }, translationStatus,
        caveat: 'HTML lang and mixed scripts are evidence, not proof of complete translation. Query lang alone never establishes a translated resource.' },
      bilingualAssociations: associations, role, roleMethod: 'Path/title-family classification; editorial taxonomy proposal, not runtime behavior', tracks: trackList,
      trackEvidence: trackList.length ? 'Directory/topic family and explicit legacy scene membership' : 'Cross-cutting portal/auxiliary; no forced engineering track assignment',
      oldUrl: '/' + file, oldDirectoryAlias: file.endsWith('/index.html') ? '/' + file.slice(0, -10) : file === 'index.html' ? '/' : null,
      proposedFutureUrl: file === 'frontier-ai-studio.html' ? '/studio/index.html' : '/' + file,
      proposedStudioEntrypoints: trackList.map(t => ({ en: `/studio/${t}.html`, zhCN: `/studio/zh-${t}.html`, status: 'Planned static topic navigation only; not implemented' })),
      futureUrlStatus: 'Proposal only; native content URL retained unless explicitly listed; no redirects or migration installed', preserveDesignExceptions: exceptions,
      validationMethod: ['Git baseline blob/path coverage', 'Static HTML title/lang/link/iframe extraction', 'Exact-case baseline destination path check', 'Language association evidence, no semantic translation claim', 'Runtime, network availability and visual approval deferred'],
      referenceIds: references.filter(r => r.source === file).map(r => r.id), iframeCount: iframes.filter(f => f.source === file).length };
  });
  const byPath = new Map(records.map(r => [r.path, r]));
  function localizedLegacy(raw, lang) {
    const url = new URL(raw, ORIGIN + '/frontier-ai-studio.html');
    if (url.origin !== ORIGIN && url.hostname !== 'turbo998.github.io') return url.href;
    if (url.pathname.includes('/workshops/ai-security/')) url.pathname = url.pathname.replace(/\/(index|benchmark-cards)(\.en)?\.html$/, (_, file) => '/' + file + (lang === 'en' ? '.en' : '') + '.html');
    const file = url.pathname.split('/').pop().replace(/^zh-/, '').replace(/\.html$/, '');
    if (['benchmarks', 'ai-security', 'security-ai-landing-zone'].includes(file)) url.pathname = url.pathname.replace(/[^/]+$/, (lang === 'en' ? '' : 'zh-') + file + '.html');
    url.searchParams.set('lang', lang);
    return url.href;
  }
  function nativeResource(raw, lang) {
    const resolved = resolve(raw, 'frontier-ai-studio.html');
    const record = byPath.get(resolved.targetPath);
    if (!record) return { url: raw, status: 'External resource; language and availability unverified', contentId: null };
    const target = record.bilingualAssociations.map(a => byPath.get(a.path)).find(r => r.language.declared === lang || lang === 'zh-CN' && r.language.declared === 'zh');
    const currentMatches = record.language.declared === lang || lang === 'zh-CN' && record.language.declared === 'zh';
    const selected = currentMatches ? record : target || record;
    return { url: '/' + selected.path, contentId: selected.contentId, status: currentMatches || target ? 'Existing file with matching declared language; translation completeness unaudited' : 'Fallback to existing native file; requested language not verified', requestedLanguage: lang, actualDeclaredLanguage: selected.language.declared };
  }
  const scenes = sceneData.map(scene => ({ ...scene, sceneId: 'scene-' + scene.track + '-' + scene.id, oldHash: `#${scene.track}/module/${scene.id}`,
    oldUrls: ['en', 'zh-CN'].map(lang => `/frontier-ai-studio.html?lang=${lang}#${scene.track}/module/${scene.id}`),
    destination: resolve(scene.raw, 'frontier-ai-studio.html'), legacyRenderedDestinations: { en: localizedLegacy(scene.raw, 'en'), zhCN: localizedLegacy(scene.raw, 'zh-CN') },
    plannedStaticTopicUrls: { en: `/studio/${scene.track}.html#module-${scene.id}`, zhCN: `/studio/zh-${scene.track}.html#module-${scene.id}` },
    plannedNativeResources: { en: nativeResource(scene.raw, 'en'), zhCN: nativeResource(scene.raw, 'zh-CN') },
    legacyReportHeuristic: /cards\.html|benchmark-cards/.test(scene.raw), implementationStatus: 'Mapping proposal only; no compatibility runtime or iframe replacement implemented' }));
  const tracks = TRACKS.map(track => {
    const list = scenes.filter(s => s.track === track);
    assert.equal(list.length, EXPECTED_SCENES[track], track);
    const defaultScene = list.find(s => !s.legacyReportHeuristic) || list[0];
    return { id: track, sceneCount: list.length, sceneIds: list.map(s => s.sceneId), defaultScene: defaultScene.sceneId,
      contentIds: records.filter(r => r.tracks.includes(track)).map(r => r.contentId), proposedStaticUrls: { en: `/studio/${track}.html`, zhCN: `/studio/zh-${track}.html` } };
  });
  const routeMappings = [];
  for (const track of TRACKS) for (const lang of ['en', 'zh-CN']) {
    const base = `/studio/${lang === 'en' ? '' : 'zh-'}${track}.html`;
    const add = (fragment, future, behavior) => routeMappings.push({ oldUrl: `/frontier-ai-studio.html?lang=${lang}#${fragment}`, proposedFutureUrl: future, baselineBehavior: behavior, implemented: false });
    add(track, base, 'Select track, retain last selected module in current document, scroll stage 1');
    for (let n = 1; n <= 4; n++) {
      add(`${track}/stage-${n}`, `${base}#stage-${n}`, 'Recognized stage-number syntax; select track and scroll requested stage');
      add(`${track}/stage/${n}`, `${base}#stage-${n}`, 'NOT recognized as stage syntax: selects track but falls back to stage 1; migration normalization requires explicit future implementation');
    }
    for (const scene of scenes.filter(s => s.track === track)) add(`${track}/module/${scene.id}`, `${base}#module-${scene.id}`, 'Select known module, scroll stage 3 (including report modules), replace active iframe');
  }
  const resourceBlock = /const resources = \{([\s\S]*?)\n  \};/.exec(structure)?.[1];
  assert.ok(resourceBlock, 'Resource manifest source must still be recognizable');
  const trackResources = [];
  for (const line of resourceBlock.split('\n')) {
    const t = /^\s*(\w+):/.exec(line)?.[1];
    if (!t) continue;
    for (const m of line.matchAll(/\["([^"]+)",\s*"([^"]+)"\]/g)) trackResources.push({ track: t, label: m[1], oldUrl: m[2], source: 'site-structure.js', line: linesAt(structure, structure.indexOf(line)), destination: resolve(m[2], 'frontier-ai-studio.html'), proposedNativeResources: { en: nativeResource(m[2], 'en'), zhCN: nativeResource(m[2], 'zh-CN') } });
  }
  const frontierTokens = parsed.get('frontier-ai-studio.html');
  const panels = frontierTokens.filter(t => /^panel-/.test(t.attributes.id || ''));
  for (let i = 0; i < panels.length; i++) {
    const panel = panels[i];
    const track = panel.attributes.id.slice(6);
    const end = panels[i + 1]?.index || frontier.length;
    const shell = frontierTokens.find(t => t.index > panel.index && t.index < end && /\bstage-shell\b/.test(t.attributes.class || ''));
    for (const token of frontierTokens.filter(t => t.tag === 'a' && t.attributes.href && t.index > panel.index && t.index < (shell?.index || end))) {
      trackResources.push({ track, label: plain(frontier.slice(token.index + token.raw.length).split('</a>')[0]), oldUrl: token.attributes.href,
        source: 'frontier-ai-studio.html', line: token.line, sourceKind: 'Overview anchor cloned into runtime stage-4 resource list',
        destination: resolve(token.attributes.href, 'frontier-ai-studio.html'), proposedNativeResources: { en: nativeResource(token.attributes.href, 'en'), zhCN: nativeResource(token.attributes.href, 'zh-CN') } });
    }
  }
  const duplicateGroups = Object.values(Object.groupBy(records, r => r.sha256)).filter(group => group.length > 1).map(group => ({ sha256: group[0].sha256, contentIds: group.map(r => r.contentId), paths: group.map(r => r.path), policy: 'Byte-identical baseline copies; not translations, no canonicalization/deletion authorized' }));
  const missing = references.filter(r => r.resolution.status === 'missing-tracked-path');
  const missingGroups = Object.entries(Object.groupBy(missing, r => r.resolution.targetPath)).map(([targetPath, refs]) => ({ targetPath, occurrences: refs.length, referenceIds: refs.map(r => r.id), sources: [...new Set(refs.map(r => r.source))], evidenceKinds: [...new Set(refs.map(r => r.kind))], caveat: refs.every(r => r.kind === 'script-url-candidate') ? 'Literal-only candidate; may be composed/test data rather than actual broken navigation' : 'Pre-existing baseline link/default/handler path absent; not fixed in R2' }));
  const external = references.filter(r => ['external', 'external-project-deployment'].includes(r.resolution.kind));
  const externalDestinations = Object.entries(Object.groupBy(external, r => r.resolution.absoluteUrl)).map(([url, refs]) => ({ url, kind: refs[0].resolution.kind, ownership: refs[0].resolution.ownership, referenceIds: refs.map(r => r.id), availability: 'Not probed; no external content copied or modified' }));
  const iframeSourceFiles = [...new Set(iframes.map(f => f.source))];
  const brokenHomeAnchors = references.filter(r => r.kind === 'static-href' && r.resolution.fragmentStatus === 'missing-legacy-home-anchor').map(r => ({ referenceId: r.id, source: r.source, line: r.line, oldUrl: r.raw, targetPath: r.resolution.targetPath, fragment: r.resolution.fragment, finding: 'Legacy home anchor absent from sealed target HTML and root runtime scripts; not repaired in R2', proposedRepair: r.resolution.fragment === '#writing' ? (r.resolution.targetPath === 'zh.html' ? '/zh-writing.html' : '/writing.html') : (r.resolution.targetPath === 'zh.html' ? '/zh.html#matrix' : '/index.html#matrix') }));
  const languageConflicts = records.filter(r => r.language.evidence.filenameDeclarationConflict).map(r => ({ path: r.path, contentId: r.contentId, filenameHint: 'en', declared: r.language.declared, evidence: 'Existing .en.html path declares a non-English html lang; no silent relabeling or translation claim' }));
  const summary = { htmlFiles: records.length, scannedScriptFiles: files.filter(f => /\.(js|mjs|cjs)$/.test(f)).length, tracks: tracks.length, scenes: scenes.length,
    scenesByTrack: Object.fromEntries(tracks.map(t => [t.id, t.sceneCount])), plannedRouteMappings: routeMappings.length, staticIframes: iframes.length, iframeSourceFiles: iframeSourceFiles.length,
    references: references.length, staticHrefOccurrences: references.filter(r => r.kind === 'static-href').length, onclickHandlers: onclickHandlers.length, dynamicEvidence: dynamicEvidence.length,
    missingPathOccurrences: missing.length, missingUniquePaths: missingGroups.length, missingStaticDestinationOccurrences: missing.filter(r => ['static-href', 'iframe-src', 'iframe-data-default-src', 'onclick-literal'].includes(r.kind)).length,
    brokenLegacyHomeAnchors: brokenHomeAnchors.length, filenameLanguageConflicts: languageConflicts.length, trackResourceLinks: trackResources.length, externalUniqueDestinations: externalDestinations.length,
    bilingualFilePairs: records.reduce((n, r) => n + r.bilingualAssociations.length, 0) / 2,
    noVerifiedTranslationCounterpart: records.filter(r => r.language.translationStatus === 'no-verified-translation-counterpart').length,
    byteIdenticalGroups: duplicateGroups.length, roleCounts: Object.fromEntries(['portal', 'topic', 'article', 'demo', 'report', 'auxiliary'].map(role => [role, records.filter(r => r.role === role).length])) };
  const caveats = [
    'Inventory and future URL proposals only. No migration, redirect, iframe removal, runtime compatibility, visual approval, full-site rollout, commit, main checkout access or push.',
    'Source is the sealed baseline Git object tree. Newly created R3 previews/tests and untracked files are deliberately excluded.',
    'All 146 baseline HTML files are inventoried. Every parsed static href and iframe attribute and every onclick handler is retained; JavaScript extraction is a conservative candidate scan, not arbitrary-code execution or complete data-flow resolution.',
    'All baseline JS/MJS/CJS files (including bundles and tests) are scanned. Literal-only candidates may be assets, composed suffixes or test fixtures, and are labeled separately from actual HTML links.',
    'Static anchor absence is uncertain because runtime-generated IDs and fragment routers exist. External services, repository project Pages and HTTP availability are not verified by local path checks.',
    'Preserve benchmark/card and native demo designs. Inventory counts are repository metadata, not newly measured model benchmark results.',
    'No assumed translations: paired files need declared-language/link evidence, in-page dictionaries need review, and lang=en on a Chinese resource does not translate it.',
    'Stable content IDs derive from baseline paths, independent of sort order or file edits. Carry these IDs forward if paths are migrated; do not regenerate identities from new paths.'
  ];
  const inventory = { schemaVersion: 1, baseline: BASELINE, scope: 'R2 only; R3 real visual approval gate remains with parent', repository: 'turbo998/turbo998.github.io', summary, caveats,
    studioContract: { sourceFiles: ['site-structure.js', 'frontier-ai-studio.html'],
      evidence: [ { file: 'site-structure.js', line: linesAt(structure, structure.indexOf('function localizedUrl')), subject: 'Resource localization special cases' }, { file: 'site-structure.js', line: linesAt(structure, structure.indexOf('function renderRoute')), subject: 'Track/hash/module selection and stage scrolling' }, { file: 'site-structure.js', line: linesAt(structure, structure.indexOf('window.setLang =')), subject: 'Language query, history replacement and frame rerender' } ],
      initialLanguage: 'lang=en selects English; every other/missing initial value becomes zh-CN',
      trackSelection: 'Recognized first hash segment wins; otherwise recognized query track wins; otherwise infra',
      stageSyntax: '#track/stage-N with N=1..4 is supported; #track/stage/N is NOT stage syntax and falls back to stage 1',
      moduleSelection: 'Known ID within active track replaces selected module; unknown ID retains default/previous selection and falls back to stage 1 for known hash track',
      selectionPersistence: 'Per-track Map initialized to first non-report (cards.html|benchmark-cards heuristic), not HTML active button; retained until reload',
      defaultBenchmarkModule: tracks.find(t => t.id === 'benchmarks').defaultScene,
      directory: '#studio-directory scrolls directory but still selects fallback/query track and loads its default scene',
      languageLocalization: 'Adds lang query to same-origin resources; only workshops/ai-security index/benchmark-cards and three root pages (benchmarks, ai-security, security-ai-landing-zone) change filenames. Commerce .en files exist but are not selected by this resolver.',
      frames: 'mountStudio resets seven frames to about:blank. renderRoute replaces active frame with localized selected URL and blanks inactive frames; openCurrentStage opens native localized URL in new tab.',
      history: 'navigate updates hash; hashchange rerenders; setLang uses history.replaceState; popstate reloads language from query. No static studio pages are implemented by this inventory.',
      proposedStaticDirectory: { en: '/studio/index.html', zhCN: '/studio/zh-index.html', status: 'Unimplemented proposal' },
      redirectStub: { source: 'workshops/azure-vm-modernization/index.html', ownership: 'Separate Azure-Infra-Lab deployment', target: 'https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/workshop.html', preservedQueryKeys: ['lang', 'demo', 'theme', 'scoutTheme'], caveat: 'Existing stub; inventory does not extend it or claim missing sibling stubs exist' } },
    tracks, scenes, trackResources, routeMappings, content: records, duplicateGroups,
    validation: { coverage: 'PASS: 146 unique baseline paths/content IDs', sceneCoverage: 'PASS: 7 tracks / 37 scenes with exact per-track counts', sourceBytes: 'Git blob OIDs and SHA-256 recorded for every HTML file', existingSiteModified: false, networkChecksRun: false, runtimeCompatibilityImplemented: false, brokenLinksFixed: false },
    findings: { missingPaths: missingGroups, brokenLegacyHomeAnchors: brokenHomeAnchors, filenameLanguageConflicts: languageConflicts, uncertainFragmentReferenceIds: references.filter(r => r.resolution.fragmentStatus === 'unresolved-runtime-or-missing').map(r => r.id),
      knownBaselineIssues: [
        { source: 'site-structure.js', issue: 'Requested #track/stage/N variant is not recognized as a stage; R2 maps intent but does not implement compatibility' },
        { source: 'site-structure.js', issue: 'English commerce shell still receives Chinese resource filename plus lang=en despite available .en.html files; planned native associations are separate from baseline behavior' }
      ] } };
  const links = { schemaVersion: 1, baseline: BASELINE, caveats, scannedSources: [...texts.keys()].map(file => ({ path: file, ...blobs.get(file), kind: file.endsWith('.html') ? 'HTML' : /^(tests\/|server\.mjs$)/.test(file) ? 'Test or local-server source; not browser document context' : 'JavaScript source/bundle' })), references, iframes, onclickHandlers, dynamicEvidence, scriptSources, externalDestinations };
  selfCheck(inventory, links, htmlFiles, structure);
  const markdown = renderSummary(inventory, links);
  const outputs = { 'route-inventory.json': JSON.stringify(inventory, null, 2) + '\n', 'link-inventory.json': JSON.stringify(links, null, 2) + '\n', 'inventory-summary.md': markdown };
  if (process.argv.includes('--check')) {
    for (const [name, value] of Object.entries(outputs)) assert.equal(fs.readFileSync(path.join(OUT, name), 'utf8'), value, `${name} is stale; rerun generator`);
  } else {
    fs.mkdirSync(OUT, { recursive: true });
    for (const [name, value] of Object.entries(outputs)) fs.writeFileSync(path.join(OUT, name), value);
  }
  console.log(JSON.stringify({ mode: process.argv.includes('--check') ? 'check' : 'generate', selfChecks: 'PASS', ...summary }, null, 2));
}
function selfCheck(inventory, links, htmlFiles, structure) {
  assert.equal(new Set(inventory.content.map(r => r.contentId)).size, 146);
  assert.deepEqual(inventory.content.map(r => r.path), htmlFiles);
  assert.equal(new Set(inventory.scenes.map(s => s.sceneId)).size, 37);
  assert.equal(new Set(inventory.routeMappings.map(r => r.oldUrl)).size, 200);
  assert.equal(inventory.routeMappings.length, 200);
  for (const scene of inventory.scenes) assert.notEqual(scene.destination.status, 'missing-tracked-path', scene.id);
  for (const record of inventory.content) {
    assert.ok(record.title, record.path + ': title missing');
    for (const other of record.bilingualAssociations) assert.ok(inventory.content.some(r => r.contentId === other.contentId && r.bilingualAssociations.some(a => a.contentId === record.contentId)), 'Reciprocal association: ' + record.path);
  }
  const refIds = new Set(links.references.map(r => r.id));
  for (const record of inventory.content) for (const id of record.referenceIds) assert.ok(refIds.has(id));
  assert.equal(links.iframes.length, 35);
  assert.equal(links.references.filter(r => r.kind === 'static-href').length, 2216);
  assert.equal(inventory.findings.brokenLegacyHomeAnchors.length, 4);
  assert.equal(inventory.findings.filenameLanguageConflicts.length, 16);
  for (const file of ['voice/index.html', 'voice/case-study.html']) {
    const record = inventory.content.find(r => r.path === file);
    assert.equal(record.language.translationStatus, 'in-page-switch-evidence-not-full-translation-verified');
    assert.ok(record.language.evidence.dictionarySources.some(s => s.source === 'voice/app.js'));
  }
  assert.equal(links.iframes.filter(f => f.source === 'frontier-ai-studio.html').length, 7);
  assert.ok(structure.includes('/^stage-[1-4]$/'), 'Stage matcher contract changed');
  assert.ok(structure.includes('url.searchParams.set("lang", language)'), 'Language query contract changed');
  assert.ok(links.references.some(r => r.kind === 'iframe-data-default-src' && r.raw.includes('gemini-4-carbon-cards.html') && r.resolution.status === 'tracked-path-exists'));
  assert.ok(inventory.duplicateGroups.every(g => g.paths.length > 1));
  assert.equal(htmlTokens('<a href="x.html?a=1&amp;b=2" onclick="go(1 > 0)">X</a><script>const s = `<iframe src="fake.html">`;</script><!-- <a href="no.html"> -->').filter(t => t.tag === 'a').length, 1);
  assert.equal(attrs('<a href="a.html?x=1&amp;y=2">').href, 'a.html?x=1&y=2');
}
function renderSummary(inventory, links) {
  const s = inventory.summary;
  const rows = inventory.tracks.map(t => `| ${t.id} | ${t.sceneCount} | ${t.defaultScene} | \`${t.proposedStaticUrls.en}\` / \`${t.proposedStaticUrls.zhCN}\` |`).join('\n');
  const missing = inventory.findings.missingPaths.map(p => `| \`${p.targetPath.replace(/\|/g, '&#124;')}\` | ${p.occurrences} | ${p.evidenceKinds.join(', ')} | ${p.sources.map(f => '\`' + f + '\`').join(', ')} |`).join('\n');
  const anchors = inventory.findings.brokenLegacyHomeAnchors.map(r => `| \`${r.source}:${r.line}\` | \`${r.oldUrl}\` | \`${r.proposedRepair}\` |`).join('\n');
  const frameRows = [...new Set(links.iframes.map(f => f.source))].map(file => `| \`${file}\` | ${links.iframes.filter(f => f.source === file).length} |`).join('\n');
  return `# R2 — sealed route/content inventory

Baseline: \`${BASELINE}\`. **Inventory only: no old-site changes, main checkout, commit, push, migration or compatibility runtime.** R3 remains at the parent's real visual approval gate; nothing here authorizes rollout.

## Reproduce and artifacts

- \`node scripts\\inventory-routes.cjs\` writes the three artifacts; Node.js 22+ built-ins only, no installation.
- \`node scripts\\inventory-routes.cjs --check\` regenerates in memory, checks byte equality and runs all self-checks without writing.
- [route-inventory.json](route-inventory.json): all 146 stable IDs, Git blob/SHA-256, titles, language evidence, pairs, roles, tracks, old/future URLs, preserve-design rules, scenes, resources, route mappings and findings.
- [link-inventory.json](link-inventory.json): occurrence-level source/line/resolution, every static href/iframe/onclick, script URL candidates, template links, dynamic assignments, script imports, source hashes and external boundaries.
- The sealed Git tree excludes **all new design-preview/ files**, this generator and the parent's preview generator/tests. Existing style-preview.html / zh-style-preview.html remain part of the 146 baseline.

## Coverage

| Measure | Result |
| --- | ---: |
| Baseline HTML / scanned JS-MJS-CJS | **${s.htmlFiles}/146** / ${s.scannedScriptFiles} |
| Tracks / scenes / native resource links | **${s.tracks} / ${s.scenes}** / ${s.trackResourceLinks} |
| Static hrefs / total references and candidates | ${s.staticHrefOccurrences} / ${s.references} |
| Static iframes / containing pages | ${s.staticIframes} / ${s.iframeSourceFiles} |
| Onclick handlers including templates / dynamic evidence | ${s.onclickHandlers} / ${s.dynamicEvidence} |
| Unimplemented old-hash/language → static URL proposals | ${s.plannedRouteMappings} |
| File-pair associations / filename-language conflicts | ${s.bilingualFilePairs} / **${s.filenameLanguageConflicts}** |
| Byte-identical groups / external destination candidates | ${s.byteIdenticalGroups} / ${s.externalUniqueDestinations} |
| Missing static href/iframe/onclick paths | **${s.missingStaticDestinationOccurrences}** |
| Broken legacy home anchors / missing server-route paths | **${s.brokenLegacyHomeAnchors}** / ${s.missingUniquePaths} |

Roles: ${Object.entries(s.roleCounts).map(([k, v]) => k + ' ' + v).join(', ')}. ${s.noVerifiedTranslationCounterpart} pages have no paired-file or in-page-switch evidence; candidate file pairs remain explicitly uncertain. All labels are evidence-based, not semantic translation certification.

## Seven-track route contract

| Track | Scenes | Actual fresh-load default | Proposed EN / ZH topic pages |
| --- | ---: | --- | --- |
${rows}

The deferred \`site-structure.js\` is authoritative: the default track is **infra**, not the older inline voice variable. A recognized hash track wins over \`?track=\`; otherwise a recognized query track wins. Only initial \`lang=en\` selects English; missing/other values become zh-CN.

- \`#track\` scrolls stage 1. \`#track/stage-N\` recognizes N=1–4.
- **\`#track/stage/N\` does not select stage N in the baseline**: it selects the track, then falls back to stage 1. Proposed normalization is not implemented.
- \`#track/module/id\` selects a known module and scrolls stage 3 (even reports). Unknown IDs retain prior/default selection; recognized track hashes fall back to stage 1.
- Per-track selection persists until reload. Fresh defaults use the first non-report, not the HTML active button; benchmarks defaults to **b-pill-maf**, not b-pill-0.
- The seven manifest resource lists and overview links cloned into stage 4 are both mapped. All 37 scenes have proposed EN/ZH static topic links and existing native-resource targets, with explicit language fallbacks.
- Native report/demo URLs remain unchanged. Planned \`/studio/*.html\` and \`/studio/zh-*.html\` names are navigation proposals, not new runtime compatibility or shipped pages.

## Bilingual evidence, not assumed translations

**Commerce standalone architecture:** \`workshops/agentic-commerce/index.html\` (declares zh) and \`index.en.html\` (en). Interactive native demos are \`live-demo.html\` / \`live-demo.en.html\`; report files are \`benchmark-cards.html\` / \`benchmark-cards.en.html\`. All six exist. Report pairs lack direct crosslinks, so their association remains a naming/declaration candidate.

The legacy resolver only changes filenames for AI Security index/report pairs and the three root pages benchmarks, ai-security and security-ai-landing-zone; same-origin URLs otherwise only gain \`lang\`. **English commerce mode therefore keeps the Chinese filename**, despite existing .en alternatives. Proposed native links use existing paired files, not query-based translation claims.

Voice index and case-study expose zh-CN / zh-TW / en controls and dictionary evidence in directly imported \`voice/app.js\`; case-study also has an inline dictionary. These are recorded as in-page switching evidence, not certified complete translations.

**16 .en.html research pages declare zh-CN**, across animation/ and generative-visual-lab/ (asset taxonomy, Blender pipeline, Feitian, Opus landscape, publication/provenance, rocket, techniques and validation). Machine records retain filename hint, actual lang, character evidence and uncertain pairing; no automatic relabeling. Byte-identical copies are not translations and no deduplication is authorized.

## Iframes and external boundaries

| Source | Static frames |
| --- | ---: |
${frameRows}

Studio mount resets seven frames, loads one and blanks inactive frames. Security deck switchers assign frame URLs from retained onclick literals; complete variable-assignment evidence is recorded. Historical style previews embed homes. Pelican arenas embed three demos each. Native report/demo embeds are **preserve-design exceptions**, not an instruction to remove every iframe.

Azure-Infra-Lab, other same-host project Pages, remote repositories and the linked Azure App Service are separate ownership/deployment surfaces. Same hostname does not mean this worktree owns their content. The existing VM redirect composes its external URL, forwards only lang/demo/theme/scoutTheme, and preserves the hash. Examples/private-address literals are not asserted to be public deployments. No external service was probed, copied, modified or published.

## Pre-existing failures and uncertainty

Four actual legacy home fragments are absent from both baseline HTML and the inspected root runtime sources. **Suggested repairs below are unimplemented.**

| Source | Existing broken fragment destination | Proposed repair |
| --- | --- | --- |
${anchors}

The local server's historical exact routes point to two absent Git paths; these are not links from the deployed HTML:

| Missing baseline path | Literal occurrences | Evidence | Source |
| --- | ---: | --- | --- |
${missing}

All static href/iframe/onclick destination **paths** resolve in the baseline. Six knowledge-explainer \`#tpl-*\` fragments are source-evidenced runtime aliases, not broken IDs. Test-fixture strings, path.join components and composed external redirect filenames are not misreported as missing local routes. Generated markup is resolved against its importing document where known, not its JS asset directory. Unresolved templates remain marked uncertain. No failures were fixed in R2.

## Validation and approval boundary

Self-checks enforce 146 unique baseline paths/IDs, exact 7/37 distribution, 200 unique route proposals, existing internal scene resources, reciprocal associations, seven studio frames, route-source guards and parser fixtures. Every HTML entry records exact baseline hashes. Stable IDs derive from baseline paths; carry them forward across any future move rather than recomputing from new paths.

This is **static inventory**, not browser execution, complete arbitrary-JS data-flow analysis, external HTTP testing, translation QA or visual acceptance. Regex-based JS extraction is conservative and labeled; all onclick source remains available for review. Report layout/data/provenance/CSP and demo controls/assets/WebGL/media permissions stay frozen pending approval. Stop here: no full-site rollout or push.
`;
}
main();
