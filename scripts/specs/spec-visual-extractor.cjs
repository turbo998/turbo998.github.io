'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { normalizePath, stage: s } = require('./policy.cjs');

const ROOT = path.resolve(__dirname, '../..');
let slugToTopicCache = null;
const parsedFaqCache = new Map();

function stripHtml(raw) {
  return String(raw || '')
    .replace(/\$\$[\s\S]*?\$\$/g, ' ')
    .replace(/\$[^$\n]+\$/g, ' ')
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;|&apos;/g, "'").replace(/&nbsp;/g, ' ')
    .replace(/&#x([0-9a-f]+);/gi, (_, h) => String.fromCodePoint(parseInt(h, 16)))
    .replace(/&#(\d+);/g, (_, d) => String.fromCodePoint(Number(d)))
    .replace(/[✅❌⚠️🎯📌🧭📊🛠️🚀🔥💎🏆💡🔬]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function cleanText(raw, zh, maxLen) {
  let text = stripHtml(raw)
    .replace(/^(?:Option\s+[A-Z]|方案\s*[A-Z0-9一二三四])\s*(?:\([^)]*\)|（[^）]*）)?\s*[:：\-–—]?\s*/i, '')
    .replace(/\(\s*\d+(?:st|nd|rd|th)\s+(?:Workbench|Milestone)[^)]*\)/gi, '')
    .replace(/（第\s*\d+\s*项[^）]*）/g, '')
    .replace(/^\d+\.\s*/, '')
    .trim();
  if (!zh) text = text.replace(/[\u3400-\u9fff\uf900-\ufaff\u3000-\u303f\uff00-\uffef]+/g, ' ').replace(/\s+/g, ' ').trim();
  if (maxLen && text.length > maxLen) {
    const cut = text.slice(0, maxLen);
    const space = !zh ? cut.lastIndexOf(' ') : -1;
    text = (space > maxLen * 0.62 ? cut.slice(0, space) : cut).replace(/[,:;·\-–—/\s]+$/, '') + '…';
  }
  return text;
}

function getTopicMap() {
  if (slugToTopicCache) return slugToTopicCache;
  const map = new Map();
  const researchDir = path.join(ROOT, 'animation/research');
  const topics = fs.existsSync(researchDir)
    ? fs.readdirSync(researchDir).filter(f => f.endsWith('-faq.en.html')).map(f => f.replace(/-faq\.en\.html$/, ''))
    : [];
  const topicSet = new Set(topics);
  const gvlDir = path.join(ROOT, 'generative-visual-lab');
  if (fs.existsSync(gvlDir)) {
    for (const file of fs.readdirSync(gvlDir).filter(f => /^nightly-visual-.*\.json$/.test(f))) {
      const data = JSON.parse(fs.readFileSync(path.join(gvlDir, file), 'utf8'));
      for (const r of data.rounds || []) if (r.slug && r.topic && topicSet.has(r.topic)) map.set(r.slug, r.topic);
    }
  }
  const demosDir = path.join(ROOT, 'animation/demos');
  if (fs.existsSync(demosDir)) {
    for (const slug of fs.readdirSync(demosDir)) {
      if (map.has(slug)) continue;
      const stripped = slug.replace(/-(?:studio|director|compositor|planner|router|visualizer|debugger|arena|hub|twin|selector|compiler|workbench)$/, '');
      if (topicSet.has(slug)) { map.set(slug, slug); continue; }
      if (topicSet.has(stripped)) { map.set(slug, stripped); continue; }
      let best = null, bestScore = 0;
      const slugParts = new Set(stripped.split('-'));
      for (const t of topics) {
        let commonPrefix = 0;
        while (commonPrefix < slug.length && commonPrefix < t.length && slug[commonPrefix] === t[commonPrefix]) commonPrefix++;
        const overlap = t.split('-').filter(w => slugParts.has(w)).length;
        const score = commonPrefix * 2 + overlap * 5;
        if ((commonPrefix >= 18 || overlap >= 4) && score > bestScore) { bestScore = score; best = t; }
      }
      if (best) map.set(slug, best);
    }
  }
  slugToTopicCache = map;
  return map;
}

function extractFaqSpec(topic, zh, isDemo) {
  const cacheKey = `${topic}:${zh ? 'zh' : 'en'}:${isDemo ? 'demo' : 'faq'}`;
  if (parsedFaqCache.has(cacheKey)) return parsedFaqCache.get(cacheKey);
  const faqFile = path.join(ROOT, 'animation/research', `${topic}-faq${zh ? '' : '.en'}.html`);
  if (!fs.existsSync(faqFile)) return null;
  const raw = fs.readFileSync(faqFile, 'utf8');
  const mainMatch = /<main\b[^>]*>([\s\S]*?)<\/main>/i.exec(raw);
  const body = mainMatch ? mainMatch[1] : raw;

  const h1Raw = /<h1\b[^>]*>([\s\S]*?)<\/h1>/i.exec(body)?.[1] || /<title\b[^>]*>([\s\S]*?)<\/title>/i.exec(raw)?.[1] || topic;
  let heading = cleanText(h1Raw, zh, zh ? 58 : 98)
    .replace(/\s*(?:Architecture\s+)?(?:Selection\s+)?FAQ\b[:：]?\s*/gi, ' · ')
    .replace(/\s*架构选型与工程实践\s*FAQ\s*/g, ' · ')
    .replace(/\s*选型\s*FAQ\s*/g, '')
    .replace(/\s*·\s*$/, '');
  if (isDemo) heading = zh ? `${heading} · 交互验证工作台` : `${heading} · Interactive Workbench`;

  const stages = [];
  const stageRegex = /<li>\s*<strong>\s*(?:Stage|Phase|Step|Layer|阶段|步骤|层级|模块)\s*(\d+)\s*(?:[(:：\-–—（]\s*([^)<：:）]+)[)）]?)?\s*[:：\-–—]?\s*<\/strong>\s*[:：]?\s*([\s\S]*?)<\/li>/gi;
  for (const m of body.matchAll(stageRegex)) {
    const label = cleanText(m[2] || m[3].split(/[,.;，。；]/)[0], zh, zh ? 22 : 36);
    const desc = cleanText(m[3], zh, zh ? 48 : 82);
    if (label && desc) stages.push({ label, desc });
    if (stages.length === 4) break;
  }

  const tables = [...body.matchAll(/<table\b[^>]*>([\s\S]*?)<\/table>/gi)].map(m => m[1]);
  let recHeader = '', baseHeader = '', tableRows = [];
  for (const tbl of tables) {
    const ths = [...tbl.matchAll(/<th\b[^>]*>([\s\S]*?)<\/th>/gi)].map(x => cleanText(x[1], zh, 120));
    const trs = [...tbl.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)]
      .map(tr => [...tr[1].matchAll(/<td\b[^>]*>([\s\S]*?)<\/td>/gi)].map(td => cleanText(td[1], zh, 110)))
      .filter(cols => cols.length >= 3);
    if (ths.length >= 3 && trs.length >= 3) {
      baseHeader = ths[1] || '';
      recHeader = ths[ths.length - 1] || '';
      tableRows = trs;
      break;
    }
  }

  const stackParts = recHeader ? recHeader.split(/\s*\+\s*/).map(p => cleanText(p, zh, zh ? 22 : 36)).filter(Boolean) : [];
  if (stages.length < 3 && tableRows.length >= 3) {
    stages.length = 0;
    const count = Math.min(4, Math.max(3, tableRows.length));
    for (let i = 0; i < count; i++) {
      const row = tableRows[i];
      const dim = cleanText(row[0], zh, zh ? 16 : 26);
      const comp = stackParts[i] || dim;
      const metric = cleanText(row[row.length - 1], zh, zh ? 48 : 82);
      stages.push({ role: dim, label: comp, desc: metric });
    }
  }

  if (stages.length < 3) {
    const strongItems = [...body.matchAll(/<li>\s*<strong>([^<]{4,80})<\/strong>\s*[:：\-–—]\s*([\s\S]*?)<\/li>/gi)];
    for (const m of strongItems) {
      const label = cleanText(m[1], zh, zh ? 22 : 36);
      const desc = cleanText(m[2], zh, zh ? 48 : 82);
      if (label && desc && !/one-sentence|一句话|verdict|结论/i.test(label)) stages.push({ label, desc });
      if (stages.length === 4) break;
    }
  }

  const defaultRolesEn = ['PIPELINE STAGE 01', 'PIPELINE STAGE 02', 'VERIFICATION & CACHE', 'DELIVERY & FINOPS'];
  const defaultRolesZh = ['核心环节 01', '核心环节 02', '校验与缓存门禁', '交付与成本指标'];
  const relsEn = ['feeds stage 02', 'passes to gate', 'delivers verified SLA', ''];
  const relsZh = ['输入下一环节', '进入校验门禁', '达成生产验收指标', ''];

  const concepts = stages.slice(0, 4).map((item, idx) => s(
    cleanText(item.role || defaultRolesEn[idx], false, 24) || defaultRolesEn[idx],
    item.role && zh ? cleanText(item.role, true, 14) : defaultRolesZh[idx],
    zh ? 'Stage' : item.label,
    zh ? item.label : '环节',
    zh ? 'Detail' : item.desc,
    zh ? item.desc : '说明',
    relsEn[idx] || 'next',
    relsZh[idx] || '递进'
  ));
  if (!zh) {
    concepts.forEach((c, idx) => {
      c.role = [cleanText(stages[idx].role || defaultRolesEn[idx], false, 24) || defaultRolesEn[idx], defaultRolesZh[idx]];
      c.title = [stages[idx].label, stages[idx].label];
      c.detail = [stages[idx].desc, stages[idx].desc];
    });
  } else {
    concepts.forEach((c, idx) => {
      c.role = [defaultRolesEn[idx], cleanText(stages[idx].role || defaultRolesZh[idx], true, 14) || defaultRolesZh[idx]];
      c.title = [stages[idx].label, stages[idx].label];
      c.detail = [stages[idx].desc, stages[idx].desc];
    });
  }

  const row0 = tableRows[0] || [];
  const rowLast = tableRows[tableRows.length - 1] || [];
  const t1Body = cleanText(row0[1] || baseHeader || stages[0]?.desc || '', zh, zh ? 52 : 88);
  const t2Body = cleanText(recHeader || stages.map(x => x.label).join(' → '), zh, zh ? 52 : 88);
  const t3Body = cleanText(rowLast[rowLast.length - 1] || stages[stages.length - 1]?.desc || '', zh, zh ? 52 : 88);

  const takeaways = [
    { head: zh ? '朴素基线失效瓶颈' : 'Baseline Failure Mode', body: t1Body || (zh ? '避免全图盲目重抽与非结构化拼接导致返工激增。' : 'Avoid unmasked full-frame retries and unstructured coupling.') },
    { head: zh ? '推荐分层参考架构' : 'Recommended Reference Stack', body: t2Body },
    { head: zh ? '实测质量与成本收益' : 'Verified Quality & Unit TCO', body: t3Body }
  ];

  const result = { topic: 'animation', title: heading, concepts, takeaways };
  parsedFaqCache.set(cacheKey, result);
  return result;
}

function resolveVisualSpec(file, zh) {
  const p = normalizePath(file);
  const faqMatch = /^(?:animation|generative-visual-lab)\/research\/(.+)-faq(?:\.en)?\.html$/.exec(p);
  if (faqMatch) return extractFaqSpec(faqMatch[1], zh, false);
  const demoMatch = /^(?:animation|generative-visual-lab)\/demos\/([^/]+)\/index(?:\.(?:en|zh))?\.html$/.exec(p);
  if (demoMatch) {
    const topic = getTopicMap().get(demoMatch[1]);
    if (topic) return extractFaqSpec(topic, zh, true);
  }
  return null;
}

module.exports = { resolveVisualSpec, getTopicMap, cleanText };
