const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const {tracks, contextTracks, classifyPath} = require('./engineering-tracks.cjs');
const esc = value => String(value ?? '').replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;').replaceAll('"', '&quot;');
const local = (value, zh) => Array.isArray(value) ? value[zh ? 1 : 0] : typeof value === 'object' && value ? value[zh ? 'zh' : 'en'] : value;
const node = (title, detail, relation) => ({title, detail, relation});
// Topology and box dimensions are conceptual layout, never performance coordinates.
const blueprints = {
  'data-infra': [
    node(['Data sources & change capture','数据源与变更捕获'], ['Operational data · Mirroring · digital twins','业务数据 · Mirroring · 数字孪生'], ['grounds','构成数据基础']),
    node(['OneLake & Fabric IQ','OneLake 与 Fabric IQ'], ['Shared data, semantic context and governance','共享数据、语义上下文与治理'], ['compare boundaries','比较能力边界']),
    node(['Cross-cloud decision','跨云平台决策'], ['Databricks · Snowflake · BigQuery · Redshift','Databricks · Snowflake · BigQuery · Redshift'], ['validate deployment needs','验证部署需求']),
    node(['Isolated agent capacity','隔离式智能体容量'], ['AKSClaw · E2B 100K fixture · D96as_v7','AKSClaw · E2B 100K 夹具 · D96as_v7'], ['inspect recovery and cost','检查恢复与成本']),
    node(['Cycle #377 & VM FinOps','Cycle #377 与 VM 成本治理'], ['Demo → selector → workbench → source report','演示 → 选型 → 工作台 → 来源报告'], null)
  ],
  infra: [
    node(['Workload & six-layer decisions','工作负载与六层决策'], ['Phase 179: requirements, boundaries and trade-offs','Phase 179：需求、边界与取舍'], ['maps to runtime choices','映射运行时选择']),
    node(['Azure runtime spectrum','Azure 运行时光谱'], ['Hosted agents · Functions · ACA · AKS · E2B','托管智能体 · Functions · ACA · AKS · E2B'], ['depends on compute fabric','依赖计算基础设施']),
    node(['Compute, memory & interconnect','计算、内存与互连'], ['Tong–Yun–Ge supernodes · GPU / network / state','通–云–哥超节点 · GPU / 网络 / 状态'], ['constrains inference design','约束推理设计']),
    node(['Inference & cost boundaries','推理与成本边界'], ['DeepInfer: prefill / decode / cache; revenue is not profit','DeepInfer：预填充 / 解码 / 缓存；收入不等于利润'], ['requires resilience evidence','需要韧性证据']),
    node(['Heartbeat & recovery evidence','心跳与恢复证据'], ['E2B / Nomad: failure detection, retries and source caveats','E2B / Nomad：故障检测、重试与来源限制'], null)
  ],
  commerce: [
    node(['Buyer intent & grounded discovery','购买意图与可信发现'], ['WebIQ source freshness · product identity','WebIQ 来源时效 · 商品身份'], ['grounds the offer','为报价提供依据']),
    node(['Offer & merchant constraints','报价与商户约束'], ['Price · inventory · shipping · provenance','价格 · 库存 · 配送 · 来源'], ['requires consent','需要明确授权']),
    node(['Agent authorization boundary','智能体授权边界'], ['Human confirmation · scoped tools · audit trail','人工确认 · 工具权限 · 审计链'], ['hands off to payment','交接至支付']),
    node(['Trusted checkout & payment','可信结账与支付'], ['Payment token · merchant contract · idempotency','支付令牌 · 商户契约 · 幂等性'], ['records outcomes','记录结果']),
    node(['Receipt, dispute & evaluation','回执、争议与评测'], ['Offline fixtures are not live transactions','离线夹具不等于真实交易'], null)
  ],
  voice: [
    node(['Audio input & speaker context','音频输入与说话人上下文'], ['Microphone · turn detection · diarization','麦克风 · 轮次检测 · 说话人分离'], ['streams to understanding','流式传递至理解层']),
    node(['Realtime speech understanding','实时语音理解'], ['ASR or audio-native model · conversation state','ASR 或音频原生模型 · 对话状态'], ['grounds the response','为响应提供依据']),
    node(['Agent, tools & enterprise data','智能体、工具与企业数据'], ['Intent · retrieval · permissioned actions','意图 · 检索 · 授权操作'], ['synthesizes a response','合成响应']),
    node(['Speech output & duplex control','语音输出与双工控制'], ['TTS / audio output · interruption · cancellation','TTS / 音频输出 · 打断 · 取消'], ['feeds the next turn','反馈至下一轮']),
    node(['Conversation quality & evidence','对话质量与证据'], ['Trace latency, speakers and failures in source tests','在来源测试中追踪延迟、说话人与故障'], null)
  ],
  benchmarks: [
    node(['Question & sealed workload','研究问题与封存负载'], ['Dataset · cohort · denominator · provenance','数据集 · 模型批次 · 分母 · 来源'], ['defines the contract','定义测试契约']),
    node(['Harness & execution contract','Harness 与执行契约'], ['Prompt · tool permissions · environment · repeats','提示词 · 工具权限 · 环境 · 重复次数'], ['produces trace artifacts','生成追踪产物']),
    node(['Raw outputs & deterministic checks','原始输出与确定性校验'], ['Task traces · verifier results · missing-value ledger','任务轨迹 · 校验结果 · 缺失值记录'], ['aggregates with conditions','带条件汇总']),
    node(['Scores, robustness & latency','得分、稳健性与延迟'], ['Keep units, conditions and uncertainty attached','保留单位、条件与不确定性'], ['supports bounded conclusions','支持有边界的结论']),
    node(['Report & reproducibility','报告与可复现性'], ['7-card source deck · limitations · independently reproduced?','7 卡来源报告 · 局限 · 是否独立复现？'], null)
  ],
  animation: [
    node(['Explanation & scene intent','讲解目标与场景意图'], ['Narrative · storyboard · camera constraints','叙事 · 分镜 · 相机约束'], ['defines the scene model','定义场景模型']),
    node(['Geometry & physical model','几何与物理模型'], ['4D Gaussian · Plücker rays · procedural geometry','4D 高斯 · Plücker 射线 · 程序化几何'], ['drives time and motion','驱动时间与运动']),
    node(['Motion, camera & interaction','运动、相机与交互'], ['Timeline · springs · motion brush · 6DoF camera','时间线 · 弹簧 · 运动画笔 · 6DoF 相机'], ['renders explanatory frames','渲染讲解画面']),
    node(['Rendering & accessible playback','渲染与无障碍播放'], ['SVG / Canvas / WebGL · reduced-motion fallback','SVG / Canvas / WebGL · 减弱动画降级'], ['checks visual evidence','检查视觉证据']),
    node(['Workbench & source evaluation','工作台与来源评测'], ['Compare frames and mechanisms, not unrelated scores','比较画面与机制，不拼接无关评分'], null)
  ],
  game: [
    node(['Player intent & input','玩家意图与输入'], ['Keyboard / pointer · control mapping · input state','键盘 / 指针 · 控制映射 · 输入状态'], ['updates simulation','更新仿真']),
    node(['World state & simulation','世界状态与仿真'], ['Fixed-step loop · movement · collision · physics','固定步长循环 · 移动 · 碰撞 · 物理'], ['resolves interactions','解析交互']),
    node(['Rules, opponents & encounters','规则、对手与遭遇'], ['Racing · swarm behavior · mech / boss systems','竞速 · 群体行为 · 机甲 / Boss 系统'], ['produces feedback','生成反馈']),
    node(['Rendering, audio & feedback','渲染、音频与反馈'], ['Camera · scene · HUD · sound · reduced motion','相机 · 场景 · HUD · 声音 · 减弱动画'], ['informs the next input','影响下一次输入']),
    node(['Playable prototype & inspection','可玩原型与检查'], ['Observe the loop; source demos retain their own controls','观察完整循环；来源演示保留独立控制'], null)
  ],
  security: [
    node(['Assets & trust boundaries','资产与信任边界'], ['Identity · sensitive data · tools · external inputs','身份 · 敏感数据 · 工具 · 外部输入'], ['defines the threat model','定义威胁模型']),
    node(['Untrusted input & attack paths','不可信输入与攻击路径'], ['Prompt injection · supply chain · tool misuse','提示注入 · 供应链 · 工具滥用'], ['meets enforcement controls','进入控制边界']),
    node(['Least privilege & explicit approval','最小权限与明确批准'], ['Isolation · validation · policy gates · human review','隔离 · 校验 · 策略关卡 · 人工审核'], ['emits auditable events','产生可审计事件']),
    node(['Detection, containment & recovery','检测、遏制与恢复'], ['Telemetry · incident response · rollback','遥测 · 事件响应 · 回滚'], ['tests defensive assumptions','检验防御假设']),
    node(['Offline exercise & source evidence','离线演练与来源证据'], ['Reported incidents are not newly verified loss estimates','来源事件不代表本次核验的损失估算'], null)
  ],
  general: [
    node(['Question & scope','问题与范围'], ['Define the system and the assumptions being studied','界定所研究的系统与假设'], ['frames the concepts','界定概念']),
    node(['Mechanism & boundaries','机制与边界'], ['Components, responsibilities and their relationships','组成部分、职责及其关系'], ['links to source evidence','关联来源证据']),
    node(['Evidence & application','证据与应用'], ['Inspect original artifacts and limits before reuse','复用前检查原始产物及适用限制'], null)
  ]
};
const topicLabel = (topic, zh) => local(tracks.find(([id]) => id === topic)?.slice(1) || ['Engineering knowledge map','工程知识图谱'], zh);
function wrap(value, budget = 34) {
  const lines = []; let line = ''; let units = 0;
  for (const token of String(value || '').match(/[\u2e80-\uffff]|[^\s\u2e80-\uffff]+|\s+/g) || []) {
    const width = [...token].reduce((sum, char) => sum + (/[^\x00-\xff]/.test(char) ? 2 : 1), 0);
    if (units + width > budget && line.trim()) { lines.push(line.trim()); line = ''; units = 0; }
    if (width > budget) {
      for (const char of token) { if (units >= budget) { lines.push(line.trim()); line = ''; units = 0; } line += char; units++; }
    } else { line += token; units += width; }
  }
  if (line.trim()) lines.push(line.trim());
  return lines;
}
function textLines(lines, x, y, size, color, weight = 400) {
  return `<text x="${x}" y="${y}" fill="${color}" font-size="${size}" font-weight="${weight}">${lines.map((line, i) => `<tspan x="${x}" dy="${i ? size * 1.4 : 0}">${esc(line)}</tspan>`).join('')}</text>`;
}
function graphSvg(file, zh, options = {}) {
  const topic = options.topic || classifyPath(file);
  const title = local(options.title, zh) || topicLabel(topic, zh);
  const concepts = options.concepts?.length ? options.concepts.map(item => typeof item === 'object' && !Array.isArray(item) ? item : node(item, '', [ 'context for', '关联至' ])) : blueprints[topic] || blueprints.general;
  const compact = Boolean(options.compact);
  const baseHash = crypto.createHash('sha256').update(`${file}|${zh}|${topic}|${title}|${JSON.stringify(concepts)}`).digest('hex').slice(0, 12);
  const id = `knowledge-${baseHash}${compact ? '-compact' : ''}`;
  const accents = ['#38bdf8', '#34d399', '#a78bfa', '#f59e0b', '#56ddcd'];
  const rolesEn = ['INGRESS', 'GROUNDING', 'POLICY GATE', 'EXECUTION', 'AUDIT & EVAL'];
  const rolesZh = ['输入与意图', '上下文锚定', '策略与门禁', '执行与运行', '审计与评测'];
  const description = [];
  if (compact) {
    const heading = wrap(title, 29);
    let y = 34 + heading.length * 24;
    let body = `<rect x="16" y="14" width="224" height="22" rx="11" fill="#112844" stroke="#2d5a88"/>` + textLines([zh ? '数据流向与架构要点 · 竖屏视图' : 'DATA FLOW & ARCHITECTURE'], 28, 29, 11.5, '#56ddcd', 700);
    body += textLines(heading, 20, 58, 18, '#eef5ff', 700);
    y = 62 + heading.length * 24;
    body += textLines([zh ? '概念拓扑 · 箭头表示数据/控制流向，非实测指标' : 'Conceptual data flow · arrows show stage handoffs'], 20, y, 12.5, '#a9b8ce');
    y += 22;
    concepts.forEach((item, i) => {
      const label = local(item.title, zh) || '';
      const detail = local(item.detail, zh) || '';
      const accent = accents[i % accents.length];
      const role = (zh ? rolesZh : rolesEn)[Math.min(i, 4)];
      const labels = wrap(label, 29);
      const details = wrap(detail, 36);
      const height = 52 + labels.length * 23 + details.length * 19;
      body += `<g data-concept="${i + 1}"><rect x="16" y="${y}" width="328" height="${height}" rx="12" fill="${i % 2 ? '#122842' : '#0e2036'}" stroke="#38597d"/><rect x="16" y="${y}" width="328" height="4" rx="2" fill="${accent}"/>${textLines([`0${i + 1} · ${role}`], 30, y + 23, 11.5, accent, 700)}${textLines(labels, 30, y + 46, 16.5, '#f0f6ff', 700)}${textLines(details, 30, y + 50 + labels.length * 23, 13, '#c4d5e8')}</g>`;
      description.push(label + (detail ? ': ' + detail : ''));
      y += height;
      if (i < concepts.length - 1) {
        const relation = local(item.relation, zh) || (zh ? '流转至' : 'context for');
        const edgeLines = wrap(`0${i + 1}→0${i + 2} ${relation}`, 34);
        const gap = Math.max(46, edgeLines.length * 18 + 20);
        body += `<g data-relationship="${esc(relation)}"><path d="M34 ${y + 2} V${y + gap - 6}" fill="none" stroke="#56ddcd" stroke-width="2.2"/><path d="M29 ${y + gap - 12} L34 ${y + gap - 5} L39 ${y + gap - 12}" fill="none" stroke="#56ddcd" stroke-width="2.2"/>${textLines(edgeLines, 50, y + 24, 12.5, '#8eeadf', 600)}</g>`;
        description.push(relation);
        y += gap;
      }
    });
    return `<svg xmlns="http://www.w3.org/2000/svg" lang="${zh ? 'zh-CN' : 'en'}" class="knowledge-graph-compact" role="img" aria-labelledby="${id}-title ${id}-desc" viewBox="0 0 360 ${y + 18}" width="360" style="width:100%;height:auto;max-width:560px;margin:0 auto;font-family:system-ui,sans-serif"><title id="${id}-title">${esc(title)}</title><desc id="${id}-desc">${esc(description.join(' → '))}</desc><rect width="360" height="${y + 18}" rx="16" fill="#081525" stroke="#284566"/>${body}</svg>`;
  }
  const heading = wrap(title, 68);
  let body = `<rect x="24" y="16" width="292" height="24" rx="12" fill="#102742" stroke="#2d5a88"/>` + textLines([zh ? '数据流向与核心要点架构图 · 横向全景' : 'DATA FLOW & KEY TAKEAWAYS ARCHITECTURE'], 38, 32, 11.5, '#56ddcd', 700);
  body += `<rect x="646" y="16" width="196" height="24" rx="12" fill="#0d2238" stroke="#254b6e"/>` + textLines([zh ? '──▶ 阶段数据与上下文流' : '──▶ Stage Data & Context Flow'], 660, 32, 11.5, '#7ce8d8', 600);
  body += `<rect x="852" y="16" width="204" height="24" rx="12" fill="#15203c" stroke="#3b4278"/>` + textLines([zh ? '◆ 策略门禁与要点说明' : '◆ Policy Gate & Key Notes'], 866, 32, 11.5, '#c4b5fd', 600);
  body += textLines(heading, 24, 62, 18, '#f2f7ff', 700);
  const stageTop = 56 + heading.length * 25;
  const count = concepts.length;
  const gap = 24;
  const totalW = 1032;
  const cardW = Math.floor((totalW - (count - 1) * gap) / count);
  const titleBudget = Math.max(20, Math.floor((cardW - 24) / 7.5));
  const detailBudget = Math.max(23, Math.floor((cardW - 22) / 6.5));
  const staged = concepts.map((item, i) => {
    const label = local(item.title, zh) || '';
    const detail = local(item.detail, zh) || '';
    const relation = i < count - 1 ? (local(item.relation, zh) || (zh ? '流转至' : 'context for')) : '';
    const labels = wrap(label, titleBudget);
    const details = wrap(detail, detailBudget);
    const relLines = i < count - 1 ? wrap(`0${i + 1}→0${i + 2} ${relation}`, detailBudget) : wrap(zh ? `0${count} 闭环 · 审计与证据核验` : `0${count} Sink · Verified Evidence`, detailBudget);
    return {label, detail, relation, labels, details, relLines};
  });
  const cardH = Math.max(186, ...staged.map(s => 64 + s.labels.length * 19 + s.details.length * 17));
  const relY = stageTop + cardH + 8;
  const relH = Math.max(30, ...staged.map(s => 12 + s.relLines.length * 16));
  staged.forEach((s, i) => {
    const x = 24 + i * (cardW + gap);
    const accent = accents[i % accents.length];
    const role = (zh ? rolesZh : rolesEn)[Math.min(i, 4)];
    const sepY = stageTop + 50 + s.labels.length * 19;
    body += `<g data-concept="${i + 1}"><rect x="${x}" y="${stageTop}" width="${cardW}" height="${cardH}" rx="12" fill="${i % 2 ? '#112640' : '#0d1e34'}" stroke="#335277" stroke-width="1.2"/><rect x="${x}" y="${stageTop}" width="${cardW}" height="5" rx="2.5" fill="${accent}"/><rect x="${x + 10}" y="${stageTop + 13}" width="${cardW - 20}" height="22" rx="6" fill="#081424" stroke="#223b59"/>${textLines([`0${i + 1} · ${role}`], x + 16, stageTop + 28, 11.5, accent, 700)}${textLines(s.labels, x + 12, stageTop + 54, 13.5, '#f4f8ff', 700)}<path d="M${x + 12} ${sepY} H${x + cardW - 12}" stroke="#233b57" stroke-width="1"/>${textLines(s.details, x + 12, sepY + 18, 12, '#c5d6e8')}</g>`;
    description.push(s.label + (s.detail ? ': ' + s.detail : ''));
    if (i < count - 1) {
      const arrowY = stageTop + Math.floor(cardH / 2);
      body += `<g data-relationship="${esc(s.relation)}"><path d="M${x + cardW + 2} ${arrowY} H${x + cardW + gap - 4}" fill="none" stroke="#56ddcd" stroke-width="2.4"/><path d="M${x + cardW + gap - 10} ${arrowY - 5} L${x + cardW + gap - 3} ${arrowY} L${x + cardW + gap - 10} ${arrowY + 5}" fill="none" stroke="#56ddcd" stroke-width="2.4"/><rect x="${x}" y="${relY}" width="${cardW}" height="${relH}" rx="8" fill="#0b2239" stroke="#2b5b6c"/>${textLines(s.relLines, x + 10, relY + 19, 11.5, '#7ce8d8', 600)}</g>`;
      description.push(s.relation);
    } else {
      body += `<rect x="${x}" y="${relY}" width="${cardW}" height="${relH}" rx="8" fill="#0e2538" stroke="#2e5470"/>` + textLines(s.relLines, x + 10, relY + 19, 11.5, '#93c5fd', 600);
    }
  });
  const takeawayTop = relY + relH + 14;
  const first = concepts[0] || node(['Input','输入'], '', null);
  const mid = concepts[Math.floor((concepts.length - 1) / 2)] || first;
  const last = concepts[concepts.length - 1] || first;
  const takeaways = [
    {
      accent: '#38bdf8',
      head: zh ? '要点 01 · 全链路数据流向' : 'TAKEAWAY 01 · END-TO-END DATA FLOW',
      lines: wrap(zh ? `自左向右从「${local(first.title, true)}」递进至「${local(last.title, true)}」，明确各阶段输入与输出契约。` : `Left-to-right pipeline from ${local(first.title, false)} to ${local(last.title, false)} with explicit handoffs.`, 44)
    },
    {
      accent: '#a78bfa',
      head: zh ? '要点 02 · 核心控制与策略门禁' : 'TAKEAWAY 02 · CONTROL & POLICY GATE',
      lines: wrap(zh ? `核心门禁「${local(mid.title, true)}」：${local(mid.detail, true) || '在进入下游执行前完成边界与权限校验。'}` : `Core boundary at ${local(mid.title, false)}: ${local(mid.detail, false) || 'validates policy boundaries before execution.'}`, 44)
    },
    {
      accent: '#34d399',
      head: zh ? '要点 03 · 证据核验与适用边界' : 'TAKEAWAY 03 · EVIDENCE & BOUNDARY',
      lines: wrap(zh ? `${local(last.detail, true) || '核验来源产物与适用前提'} · 概念拓扑示意，非实测延迟。` : `${local(last.detail, false) || 'Inspect source artifacts and limits'} · Conceptual flow, not measured latency.`, 44)
    }
  ];
  const takeawayH = Math.max(88, ...takeaways.map(t => 36 + t.lines.length * 17));
  takeaways.forEach((card, idx) => {
    const cx = 24 + idx * 349;
    body += `<g data-takeaway="${idx + 1}"><rect x="${cx}" y="${takeawayTop}" width="334" height="${takeawayH}" rx="10" fill="#0b1a2e" stroke="#284466"/><rect x="${cx}" y="${takeawayTop + 12}" width="4" height="${takeawayH - 24}" rx="2" fill="${card.accent}"/>${textLines([card.head], cx + 14, takeawayTop + 25, 11.5, card.accent, 700)}${textLines(card.lines, cx + 14, takeawayTop + 46, 12, '#d5e4f5')}</g>`;
  });
  const totalH = takeawayTop + takeawayH + 16;
  return `<svg xmlns="http://www.w3.org/2000/svg" lang="${zh ? 'zh-CN' : 'en'}" class="knowledge-graph-wide" role="img" aria-labelledby="${id}-title ${id}-desc" viewBox="0 0 1080 ${totalH}" width="1080" style="width:100%;height:auto;max-width:1080px;margin:0 auto;font-family:system-ui,sans-serif"><title id="${id}-title">${esc(title)}</title><desc id="${id}-desc">${esc(description.join(' → '))}</desc><rect width="1080" height="${totalH}" rx="16" fill="#081525" stroke="#284566"/>${body}</svg>`;
}
function knowledgeFigure(file, zh, options = {}) {
  const topic = options.topic || classifyPath(file);
  return `<figure class="knowledge-figure" data-knowledge-atlas="${esc(topic)}" style="margin:20px auto;max-width:1120px;padding:0 20px;box-sizing:border-box"><style>.knowledge-graph-wide{display:block}.knowledge-graph-compact{display:none}@media(max-width:600px){.knowledge-graph-wide{display:none}.knowledge-graph-compact{display:block}}</style>${graphSvg(file, zh, {...options, compact: true})}${graphSvg(file, zh, {...options, compact: false})}<figcaption style="font:13px/1.6 system-ui,sans-serif;margin:10px auto 0;max-width:1080px;color:#9fb2ca;overflow-wrap:anywhere">${zh ? '整体架构与数据流向图示：自左向右阅读阶段数据流转、策略门禁与底部三项核心要点说明（概念拓扑，不代表实测吞吐或生产排名）。' : 'Architecture & data-flow blueprint: follow the left-to-right stage handoffs, policy gates, and three key takeaway callouts below (conceptual topology, not measured latency or rankings).'}</figcaption></figure>`;
}
const mapSummaries = {
  'data-infra': [['OneLake · Fabric IQ · Mirroring','AKSClaw · E2B · VM FinOps'],['OneLake · Fabric IQ · 数据镜像','AKSClaw · E2B · VM 成本治理']],
  infra: [['Runtime · GPU · interconnect','Phase 179 · inference · resilience'],['运行时 · GPU · 互连','Phase 179 · 推理 · 韧性']],
  commerce: [['Grounding → offer → consent','Checkout · receipt · audit'],['可信发现 → 报价 → 授权','结账 · 回执 · 审计']],
  voice: [['Audio → agent → speech','Duplex · speakers · interruption'],['音频 → 智能体 → 语音','双工 · 说话人 · 打断']],
  benchmarks: [['Contract → verifier → evidence','Robustness · latency · provenance'],['契约 → 校验器 → 证据','稳健性 · 延迟 · 来源']],
  animation: [['Geometry → motion → frame','4D camera · explanatory scenes'],['几何 → 运动 → 画面','4D 相机 · 知识讲解']],
  game: [['Input → simulation → feedback','World state · rules · interaction'],['输入 → 仿真 → 反馈','世界状态 · 规则 · 交互']],
  security: [['Threat → control → recovery','Identity · policy · audit'],['威胁 → 控制 → 恢复','身份 · 策略 · 审计']],
  'sa-skills': [['Reusable contracts & runbooks','HVE · skills · human approval'],['可复用契约与操作手册','HVE · 技能 · 人工批准']]
};
function systemSvg(file, zh, compact = false) {
  const id = `system-${crypto.createHash('sha256').update(`${file}|${zh}|${compact}`).digest('hex').slice(0, 10)}`;
  const width = compact ? 360 : 1080; const step = compact ? 154 : 162;
  const rows = compact ? contextTracks.length : 3; const height = 148 + rows * step;
  let body = textLines([zh ? '八大工程赛道 + SA 技能扩展' : '8 engineering tracks + SA extension'], 24, 34, compact ? 17 : 25, '#eef5ff', 700);
  body += textLines(zh ? ['架构理解 → 证据检查 → 演示运行 → 来源复用','共享：数据基础 · 运行时 · 测评契约 · 信任边界'] : ['Architecture → evaluation → demos → resources', 'Shared: data · runtime · test contracts · trust'], 24, 66, compact ? 13 : 18, '#bed0e4');
  const railY = 112;
  body += `<path d="M24 ${railY} H${width - 24}" stroke="#63dbca" stroke-width="2"/>`;
  contextTracks.forEach(([track,en,cn], index) => {
    const col = compact ? 0 : index % 3; const row = compact ? index : Math.floor(index / 3);
    const x = compact ? 16 : 24 + col * 350; const y = 136 + row * step; const w = compact ? 328 : 332;
    const target = track === 'sa-skills' ? `studio/${zh ? 'zh-' : ''}index.html#sa-skills` : `studio/${zh ? 'zh-' : ''}${track}.html`;
    const href = path.posix.relative(path.posix.dirname(file.replaceAll('\\','/')), target) || path.posix.basename(target);
    const title = zh ? cn : en; const lines = wrap(title, 31);
    body += `<path d="M${x + w / 2} ${row ? y - step + 130 : railY} V${y}" fill="none" stroke="#527793" stroke-width="2"/><a href="${esc(href)}" aria-label="${esc(title)}"><g data-track="${track}"><rect x="${x}" y="${y}" width="${w}" height="130" rx="12" fill="${track === 'sa-skills' ? '#203044' : '#10253a'}" stroke="#527793"/>${textLines([`${String(index + 1).padStart(2,'0')} / ${zh ? (track === 'sa-skills' ? '共享扩展' : '核心赛道') : (track === 'sa-skills' ? 'SHARED EXTENSION' : 'CORE TRACK')}`], x + 16, y + 23, 12, '#89dfd0', 650)}${textLines(lines, x + 16, y + 48, 18, '#eef5ff', 650)}${textLines(mapSummaries[track][zh ? 1 : 0], x + 16, y + 57 + lines.length * 23, 13, '#c5d4e7')}</g></a>`;
  });
  return `<svg xmlns="http://www.w3.org/2000/svg" lang="${zh ? 'zh-CN' : 'en'}" class="knowledge-system-${compact ? 'compact' : 'wide'}" role="img" aria-labelledby="${id}-title ${id}-desc" viewBox="0 0 ${width} ${height}" width="${width}" style="width:100%;height:auto;font-family:system-ui,sans-serif"><title id="${id}-title">${zh ? '工程枢纽整体知识图谱' : 'Engineering Hub overall knowledge map'}</title><desc id="${id}-desc">${zh ? '八大赛道共享架构、测评、演示与资料四阶段。SA 技能与 HVE 为所有赛道提供可复用契约；连线表示共享工程路径，不表示运行时数据流。' : 'Eight tracks share architecture, evaluation, demos and resources. SA skills and HVE supply reusable contracts across tracks; connecting lines show a shared engineering path, not runtime data flow.'}</desc><rect width="${width}" height="${height}" rx="16" fill="#091827"/>${body}</svg>`;
}
function systemFigure(file, zh) {
  return `<figure class="knowledge-figure knowledge-system" data-knowledge-atlas="system" style="margin:24px 0;max-width:100%"><style>.knowledge-system-wide{display:block}.knowledge-system-compact{display:none}@media(max-width:600px){.knowledge-system-wide{display:none}.knowledge-system-compact{display:block}}</style>${systemSvg(file,zh)}${systemSvg(file,zh,true)}<figcaption style="font:14px/1.6 system-ui,sans-serif;margin:12px 0">${zh ? '知识图谱：连线表示共享工程路径；八大核心赛道与 SA 技能扩展各有真实入口。非性能或成熟度排名。' : 'Knowledge map: connectors represent a shared engineering path. Eight core tracks and the SA extension each link to their real entry point; this is not a performance or maturity ranking.'}</figcaption></figure>`;
}
function buildKnowledgeAtlas({root = path.join(__dirname, '..'), write} = {}) {
  const emit = write || ((file, text) => {const absolute = path.join(root, file); fs.mkdirSync(path.dirname(absolute), {recursive:true}); fs.writeFileSync(absolute,text);});
  const files = [];
  for (const zh of [false,true]) {
    for (const [topic] of tracks) {
      const file = `assets/knowledge/${topic}.${zh ? 'zh' : 'en'}.svg`;
      emit(file, graphSvg(file,zh,{topic}) + '\n'); files.push(file);
    }
    for (const compact of [false,true]) {
      const file = `assets/knowledge/system-${compact ? 'compact' : 'wide'}.${zh ? 'zh' : 'en'}.svg`;
      emit(file,systemSvg(file,zh,compact) + '\n'); files.push(file);
    }
  }
  return files;
}
module.exports = {knowledgeFigure, systemFigure, graphSvg, buildKnowledgeAtlas, blueprints};
if (require.main === module) console.log(`Built ${buildKnowledgeAtlas().length} localized knowledge SVG assets.`);
