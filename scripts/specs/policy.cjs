'use strict';

const NATIVE_INLINE = new Set([
  'index.html', 'zh.html',
  'frontier-ai-studio.html', 'frontier-ai-studio.en.html',
  'diamond.html', 'zh-diamond.html',
  'about.html', 'zh-about.html',
  'career.html', 'zh-career.html',
  'skills.html', 'zh-skills.html',
  'fte.html', 'zh-fte.html',
  'workshops/benchmarks/ai-infra-architect-workbench.html',
  'workshops/benchmarks/ai-infra-architect-workbench.en.html',
  'workshops/webiq-azure/index.html',
  'workshops/webiq-azure/index.en.html',
  'voice/voxcpm2-vs-azure-speech.html',
  'voice/voxcpm2-vs-azure-speech.en.html'
]);

const OMIT_CANVAS_EXACT = new Set([
  'style-preview.html', 'zh-style-preview.html',
  'voice/deck.html', 'voice/deck.en.html',
  'game/demos/scrap-swarm/index.html', 'game/demos/scrap-swarm/index.en.html',
  'game/demos/wanan-midnight/index.html', 'game/demos/wanan-midnight/index.en.html',
  'animation/demos/pelican-arena.html', 'animation/demos/pelican-arena.en.html',
  'generative-visual-lab/demos/pelican-arena.html', 'generative-visual-lab/demos/pelican-arena.en.html',
  'workshops/faf-vs-agent-forge/pelican-arena.html', 'workshops/faf-vs-agent-forge/pelican-arena.en.html'
]);

const path = require('node:path');
const ROOT = path.resolve(__dirname, '../..');

function normalizePath(file) {
  let raw = String(file || '');
  if (raw && path.isAbsolute(raw)) raw = path.relative(ROOT, raw);
  return raw.replaceAll('\\', '/').replace(/^\.\//, '').replace(/^\/+/, '');
}

function classifyDiagramPolicy(file, html = '') {
  const rel = normalizePath(file);
  if (NATIVE_INLINE.has(rel)) return 'native-inline';
  if (/^studio\/[^/]+\.html$/.test(rel) && !/^studio\/(?:zh-)?archive\.html$/.test(rel)) return 'native-inline';
  if (/^ignite-2026\/[^/]+\.html$/.test(rel)) return 'ignite-native';
  if (rel === 'workshops/agentic-commerce/index.en.html') return 'omit-deck';
  if (/(?:^|\/)(?:[\w-]*cards?(?:-\d{4}-\d{2}-\d{2})?|prioritization-report)(?:\.(?:en|zh(?:-CN)?))?\.html$/i.test(rel)) {
    return 'omit-deck';
  }
  if (OMIT_CANVAS_EXACT.has(rel)) return 'omit-canvas';
  if (
    /^(?:animation|generative-visual-lab)\/demos\/(?:astra-planet|rocket-launch|feitian-mural|feitian|pelican-bicycle-arena)\//.test(rel) ||
    /^workshops\/faf-vs-agent-forge\/demo-[^/]+\.html$/.test(rel) ||
    /^workshops\/azure-vm-modernization\/[^/]+\.html$/.test(rel) ||
    /^workshops\/github-trending-radar\/evidence\/[^/]+\.html$/.test(rel) ||
    /^design-preview\/[^/]+\.html$/.test(rel)
  ) {
    return 'omit-canvas';
  }
  if (html && /<meta\s+http-equiv=["']refresh["']/i.test(html) && html.length < 2400) {
    return 'omit-canvas';
  }
  return 'inject-specific';
}

function stage(roleEn, roleZh, titleEn, titleZh, detailEn, detailZh, relEn = null, relZh = null) {
  return {
    role: [roleEn, roleZh],
    title: [titleEn, titleZh],
    detail: [detailEn, detailZh],
    relation: relEn ? [relEn, relZh || relEn] : null
  };
}

function entry(topic, titleEn, titleZh, concepts, takeaways) {
  return {
    topic,
    title: [titleEn, titleZh],
    concepts,
    takeaways: takeaways.map(([headEn, headZh, bodyEn, bodyZh]) => ({
      head: [headEn, headZh],
      body: [bodyEn, bodyZh]
    }))
  };
}

module.exports = { normalizePath, classifyDiagramPolicy, stage, entry };
