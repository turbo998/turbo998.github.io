'use strict';

function stripTags(raw = '') {
  return String(raw)
    .replace(/<[^>]+>/g, ' ')
    .replace(/&rarr;|→/gi, '->')
    .replace(/&times;/gi, 'x')
    .replace(/&le;/gi, '<=')
    .replace(/&ge;/gi, '>=')
    .replace(/&amp;/gi, '&')
    .replace(/&lt;/gi, '<')
    .replace(/&gt;/gi, '>')
    .replace(/&quot;/gi, '"')
    .replace(/&#39;/gi, "'")
    .replace(/[🔥💎🚀🎯🏆🔐🔓🎛️📊🔭🧠💰⚡🛡️🌐📖🃏🎓📚💡❌✅🟥🟨☁️]/gu, '')
    .replace(/\s+/g, ' ')
    .trim();
}

function trunc(s = '', max = 88) {
  const clean = stripTags(s);
  return clean.length <= max ? clean : `${clean.slice(0, max - 1).trim()}…`;
}

function extractH5LabSpec(file, zh, html = '') {
  const f = String(file || '').replaceAll('\\', '/');
  if (!/^docs\/h5\/[^/]+\.html$/i.test(f) || !html) return null;

  if (f === 'docs/h5/index.html') {
    return zh ? {
      topic: 'infra',
      title: 'AI Infra 交互式定容与架构选型中心（120 套沙盘 · #001–#507）',
      concepts: [
        {role: '算力与网络层', title: 'GPU 容量 · PD 分离 · RDMA', detail: 'Little 定律三道水位线、NVLink/IB/RoCEv2 busbw 与 NVL72 液冷边界', relation: '硬件吞吐基线'},
        {role: '推理与显存层', title: 'vLLM/SGLang · 分层 KV · 并行', detail: 'TP/PP/EP 切分、128K–1M MLA/Hybrid KV 卸载与 <think> 预算门控', relation: 'TTFT/TPOT 约束'},
        {role: '网关与平台层', title: 'APIM/Envoy · 语义缓存 · FinOps', detail: 'PAYGO/PTU/K8s 拐点、60/25/15 算力组合与 OpenCost Token 分账', relation: '多租户配额治理'},
        {role: '数据与行业层', title: 'RAG · 双时态记忆 · 行业 Agent', detail: 'DiskANN/Milvus 定容、MCP OBO 网关与金融/医疗/制造 TCO 测算', relation: '端到端 ROI 闭环'}
      ],
      takeaways: [
        {head: '容量先行', body: '所有选型从 RPS、上下文长度与 P99 TTFT/TPOT 反推显存、带宽与卡数'},
        {head: '托管与自建拐点', body: '结合硬件租金、利用率与 SRE 人力全口径对比 PAYGO、PTU 与自建 K8s'},
        {head: '离线可复核', body: '120 套交互沙盘均支持零外链环境下实时拖动滑块复核公式与成本曲线'}
      ]
    } : null;
  }

  const rawTitle = stripTags((html.match(/<title>([\s\S]*?)<\/title>/i) || [, ''])[1])
    .replace(/\s*[·|]\s*(?:AI Infra H5|turbo998\/ai-infra-research).*$/i, '')
    .trim();
  const subText = stripTags(
    (html.match(/<p class="sub">([\s\S]*?)<\/p>/i) ||
     html.match(/<div data-lang="zh">[\s\S]*?<p>([\s\S]*?)<\/p>/i) ||
     html.match(/<section class="hero">[\s\S]*?<p>([\s\S]*?)<\/p>/i) || [, ''])[1]
  );
  const formula = stripTags((html.match(/<div class="formula">([\s\S]*?)<\/div>/i) || [, ''])[1]);

  const kpis = [...html.matchAll(/<div class="kpi">\s*<div class="(?:val|v)"[^>]*>([\s\S]*?)<\/div>\s*<div class="(?:lbl|l)"[^>]*>([\s\S]*?)<\/div>/gi)]
    .map(m => `${stripTags(m[2])}: ${stripTags(m[1])}`)
    .filter(Boolean);

  const options = [...html.matchAll(/<option\b[^>]*>([\s\S]*?)<\/option>/gi)]
    .map(m => stripTags(m[1]))
    .filter(t => t.length >= 6);

  const tableRows = [];
  const tbodyMatch = html.match(/<tbody[^>]*>([\s\S]*?)<\/tbody>/i);
  if (tbodyMatch) {
    for (const rm of tbodyMatch[1].matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
      const cells = [...rm[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map(c => stripTags(c[1])).filter(Boolean);
      if (cells.length >= 2) tableRows.push(cells);
    }
  }

  const labels = [...html.matchAll(/<label\b[^>]*>([\s\S]*?)<\/label>/gi)]
    .map(m => stripTags(m[1]).replace(/^\d+\.\s*/, ''))
    .filter(Boolean);

  const stages = [];
  stages.push({
    role: '负载与输入边界',
    title: trunc(labels[0] || '业务并发与规模参数', 34),
    detail: trunc(labels.slice(0, 3).join(' · ') || subText || rawTitle, 84),
    relation: '容量与成本推演'
  });
  stages.push({
    role: '定容与核算模型',
    title: trunc(formula ? formula.split(/\s{2,}|;/)[0] : '交互式容量与 TCO 核算公式', 34),
    detail: trunc(formula || kpis.slice(0, 2).join(' · ') || subText, 84),
    relation: '四档架构对比'
  });

  const baselineCandidate = tableRows[0]
    ? `${tableRows[0][0]} (${tableRows[0].slice(1, 3).join(' / ')})`
    : (options[options.length - 1] || options[0] || '传统基线架构');
  const targetCandidate = tableRows.length >= 2
    ? `${tableRows[tableRows.length - 1][0]} (${tableRows[tableRows.length - 1].slice(1, 3).join(' / ')})`
    : (options[0] || '推荐目标生产架构');

  stages.push({
    role: '候选架构对标',
    title: trunc(baselineCandidate.split(/[:：(（]/)[0] || '基线方案瓶颈', 34),
    detail: trunc(tableRows.slice(0, 2).map(r => `${r[0]}: ${r.slice(1).join('/')}`).join(' vs ') || options.slice(1, 4).join(' vs ') || baselineCandidate, 84),
    relation: '性价比拐点筛选'
  });
  stages.push({
    role: '推荐生产落地',
    title: trunc(targetCandidate.split(/[:：(（]/)[0] || '目标优化架构', 34),
    detail: trunc(kpis.slice(0, 3).join(' · ') || targetCandidate, 84),
    relation: 'SLA 与 TCO 达标'
  });

  const takeaways = [
    {head: '核心量化指标', body: kpis.length >= 2 ? trunc(kpis.slice(0, 2).join('；'), 92) : trunc(subText || rawTitle, 92)},
    {head: '成本与效率收益', body: kpis.length >= 4 ? trunc(kpis.slice(2, 4).join('；'), 92) : trunc(formula || labels.join(' · ') || rawTitle, 92)},
    {head: '交互定容验证', body: trunc(subText || `调节规模滑块实时复核 ${rawTitle} 的容量水位与 TCO 拐点`, 92)}
  ];

  return {
    topic: 'infra',
    title: trunc(rawTitle || 'AI Infra 交互式定容沙盘', 68),
    concepts: stages,
    takeaways
  };
}

module.exports = {extractH5LabSpec};
