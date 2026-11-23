'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { normalizePath, classifyDiagramPolicy } = require('./specs/policy.cjs');
const { resolveVisualSpec } = require('./specs/spec-visual-extractor.cjs');
const { extractH5LabSpec } = require('./specs/spec-h5-labs.cjs');

const MODULES = [
  require('./specs/spec-columns-portals.cjs'),
  require('./specs/spec-studio-tracks.cjs'),
  require('./specs/spec-portals-media.cjs'),
  require('./specs/spec-workshops-infra.cjs'),
  require('./specs/spec-workshops-infra-more.cjs'),
  require('./specs/spec-workshops-data.cjs'),
  require('./specs/spec-workshops-apps.cjs'),
  require('./specs/spec-workshops-benchmarks.cjs'),
  require('./specs/spec-game-visual-studios.cjs'),
  require('./specs/spec-visual-studios-more.cjs'),
  require('./specs/spec-visual-studies.cjs'),
  require('./specs/spec-visual-studies-more.cjs'),
];

const SPEC_MAP = Object.assign({}, ...MODULES.map(m => Object.values(m)[0]));
for (const slug of ['audiovisual-foley-studio', 'camera-4d-director']) {
  if (SPEC_MAP[`animation/demos/${slug}/index`]) {
    SPEC_MAP[`generative-visual-lab/demos/${slug}/index`] = SPEC_MAP[`animation/demos/${slug}/index`];
  }
}
if (SPEC_MAP['gpt-6-2-motion-studies/index']) {
  SPEC_MAP['animation/demos/gpt-62-motion/index'] = SPEC_MAP['gpt-6-2-motion-studies/index'];
  SPEC_MAP['generative-visual-lab/demos/gpt-62-motion/index'] = SPEC_MAP['gpt-6-2-motion-studies/index'];
}
if (SPEC_MAP['animation/index']) SPEC_MAP['generative-visual-lab/index'] = SPEC_MAP['animation/index'];

function canonicalKey(file) {
  let p = normalizePath(file).replace(/\.html$/i, '');
  p = p.replace(/\.(?:en|zh(?:-CN)?)$/i, '');
  p = p.replace(/^docs\/h5\//i, 'ai-infra-h5/');
  p = p.replace(/^docs\/h5-academy\//i, 'h5-academy/');
  p = p.replace(/^workshops\/azure-agent-infra\/h5\//i, 'workshops/azure-agent-infra/');
  p = p.replace(/^zh-(about|career|skills|fte|diamond|benchmarks|github-radar|openrouter|opensource|projects|writing|ai-security|security-ai-landing-zone)$/i, '$1');
  p = p.replace(/^studio\/zh-([a-z0-9-]+)$/i, 'studio/$1');
  p = p.replace(/^(workshops\/azure-agent-infra\/)zh-(index|demo|selector)$/i, '$1$2');
  return p;
}

function materializeSpec(raw, zh) {
  const idx = zh ? 1 : 0;
  return {
    topic: raw.topic,
    title: Array.isArray(raw.title) ? raw.title[idx] : raw.title,
    concepts: raw.concepts.map(c => ({
      role: Array.isArray(c.role) ? c.role[idx] : c.role,
      title: Array.isArray(c.title) ? c.title[idx] : c.title,
      detail: Array.isArray(c.detail) ? c.detail[idx] : c.detail,
      relation: Array.isArray(c.relation) ? c.relation[idx] : c.relation,
    })),
    takeaways: (raw.takeaways || []).map(t => ({
      head: Array.isArray(t.head) ? t.head[idx] : t.head,
      body: Array.isArray(t.body) ? t.body[idx] : t.body,
    })),
  };
}

function resolvePageArchitectureSpec(file, zh, htmlOrOpts = '') {
  const html = typeof htmlOrOpts === 'string'
    ? htmlOrOpts
    : (htmlOrOpts && typeof htmlOrOpts.html === 'string' ? htmlOrOpts.html : '');
  const policy = classifyDiagramPolicy(file, html);
  if (policy === 'omit-deck' || policy === 'omit-canvas' || policy === 'ignite-native') return null;
  const key = canonicalKey(file);
  if (SPEC_MAP[key]) return materializeSpec(SPEC_MAP[key], zh);
  if (policy !== 'inject-specific') return null;
  if (/^docs\/h5\/[^/]+\.html$/i.test(normalizePath(file))) {
    const h5Html = html || (() => {
      const p = path.resolve(__dirname, '..', normalizePath(file));
      return fs.existsSync(p) ? fs.readFileSync(p, 'utf8') : '';
    })();
    const h5Spec = extractH5LabSpec(file, zh, h5Html);
    if (h5Spec) return h5Spec;
  }
  const visual = resolveVisualSpec(file, zh);
  if (visual) {
    return {
      topic: visual.topic,
      title: visual.title,
      concepts: visual.concepts.map(c => ({
        role: Array.isArray(c.role) ? c.role[zh ? 1 : 0] : c.role,
        title: Array.isArray(c.title) ? c.title[zh ? 1 : 0] : c.title,
        detail: Array.isArray(c.detail) ? c.detail[zh ? 1 : 0] : c.detail,
        relation: Array.isArray(c.relation) ? c.relation[zh ? 1 : 0] : c.relation,
      })),
      takeaways: visual.takeaways,
    };
  }
  return null;
}

function cleanSaPageTitle(rawTitle, zh) {
  let t = String(rawTitle || '')
    .replace(/[🔥💎🚀🎯📌🧭📊🛠️🏆💡🔬🔐🔓⚡✨🌟🎨]/gu, '')
    .replace(/\(\s*\d+(?:st|nd|rd|th)\s+(?:Workbench|Milestone)[^)]*\)/gi, '')
    .replace(/（第\s*\d+\s*项[^）]*）/g, '')
    .replace(/重磅[：:·\s]*/g, '')
    .replace(/大满贯里程碑/g, '里程碑')
    .replace(/大满贯总控圣经|总控圣经/g, '总控参考架构')
    .replace(/硬核/g, '工程级')
    .replace(/神仙打架/g, '多模型对比')
    .replace(/一图流战果/g, '架构评测摘要')
    .replace(/夺冠/g, '基准领先')
    .replace(/全真实战/g, '架构实证')
    .replace(/六幕企业级实战驾驶舱/g, '企业级架构验证工作台')
    .replace(/实战驾驶舱/g, '架构验证工作台')
    .replace(/全景可视化精学馆|全景精学馆|精学馆/g, '架构与定容实验台')
    .replace(/全景蓝图/g, '参考架构')
    .replace(/深度解析与架构师洞察工作台/g, '技术解析与架构评估')
    .replace(/闭环赋能/g, '闭环回写')
    .replace(/赋能/g, '支持')
    .replace(/对战卡/g, '选型矩阵')
    .replace(/\bBattlecard\b/gi, 'Selection Matrix')
    .replace(/\bHardcore\b/gi, 'Production')
    .replace(/\bBenchmark\s*&\s*Eval\s*Foundry\b/gi, 'Benchmarks & Evaluation')
    .replace(/\bGitHub\s+AI\s+Signal\s+Radar\b/gi, 'GitHub AI Radar')
    .replace(/GitHub\s*AI\s*信号雷达/g, 'GitHub AI 开源评估')
    .replace(/Diamond\s*实战演示/g, 'Diamond 架构演示')
    .replace(/灵魂拷问/g, '核心选型问题')
    .replace(/\s{2,}/g, ' ')
    .replace(/^\s*[·|:：\-–—]\s*/, '')
    .trim();
  if (!zh) t = t.replace(/[\u3400-\u9fff]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
  return t;
}

module.exports = {
  normalizePath,
  classifyDiagramPolicy,
  canonicalKey,
  resolvePageArchitectureSpec,
  cleanSaPageTitle,
  SPEC_MAP,
};
