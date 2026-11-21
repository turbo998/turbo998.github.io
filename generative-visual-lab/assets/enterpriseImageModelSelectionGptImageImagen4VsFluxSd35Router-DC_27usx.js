import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"complex-multi-subject-instruction-ad":{id:"complex-multi-subject-instruction-ad",titleZh:"复杂多主体空间关系与嵌入式英文排版海报（路由至 GPT-Image-1 / Imagen 4 · 96.4% 指令遵循 + 局部掩码编辑）",titleEn:"Complex Multi-Subject Spatial Prompt & Embedded Typography (Route to GPT-Image-1 / Imagen 4 · 96.4%)",monthlyImagesCount:8e4,bestModelRouteDesc:"30% GPT-Image-1 / Imagen 4 (Complex Spatial) + 70% Flux.1-dev (Style/Variants)",unconditionalFlagshipUnitCostUsd:.12,routedBlendedUnitCostUsd:.038,selfHostedFluxUnitCostUsd:.004,promptInstructionAdherencePct:96.4,p95GenerationLatencySec:3.2,annualEnterpriseSavingsUsd:787200},"high-volume-ecommerce-catalog-300k":{id:"high-volume-ecommerce-catalog-300k",titleZh:"月产 30万张电商商品与品牌 LoRA 素材（90% 路由至 AKS 自托管 Flux.1-dev + ControlNet · $0.004/张 vs $0.12 API）",titleEn:"300,000-Image/Mo E-Commerce SKU & Brand LoRA Catalog (90% Self-Hosted Flux.1-dev · $0.004/Img)",monthlyImagesCount:3e5,bestModelRouteDesc:"90% AKS Self-Hosted Flux.1-dev FP8 ($0.004) + 10% Imagen 4 / GPT-Image-1",unconditionalFlagshipUnitCostUsd:.12,routedBlendedUnitCostUsd:.015,selfHostedFluxUnitCostUsd:.004,promptInstructionAdherencePct:98.2,p95GenerationLatencySec:1.9,annualEnterpriseSavingsUsd:378e4},"realtime-interactive-design-copilot":{id:"realtime-interactive-design-copilot",titleZh:"设计师画布实时草图预览与终稿二级精修（草图走 Flux.1-schnell / SD3.5-Turbo 0.35s → 定稿走 GPT-Image-1 / Flux-pro）",titleEn:"Interactive Design Canvas Copilot (0.35s Flux-schnell / SD3.5-Turbo Drafts → Flagship Final Render)",monthlyImagesCount:5e5,bestModelRouteDesc:"85% 4-Step Flux.1-schnell Draft ($0.0012 · 0.35s) + 15% Flagship Final Master",unconditionalFlagshipUnitCostUsd:.12,routedBlendedUnitCostUsd:.019,selfHostedFluxUnitCostUsd:.0012,promptInstructionAdherencePct:97.1,p95GenerationLatencySec:.45,annualEnterpriseSavingsUsd:606e4}};function m(t,s){const e=c[t],o=s==="intent-aware-gpt-imagen-flux-sd35-router",d=o?e.routedBlendedUnitCostUsd:e.unconditionalFlagshipUnitCostUsd,n=o?e.promptInstructionAdherencePct:78.5,i=o?e.p95GenerationLatencySec:11.4,a=o?Number(((e.unconditionalFlagshipUnitCostUsd-e.routedBlendedUnitCostUsd)/e.unconditionalFlagshipUnitCostUsd*100).toFixed(1)):0;return{workload:e,mode:s,effectiveUnitCostUsd:d,effectiveAdherencePct:n,effectiveLatencySec:i,costReductionPct:a,highAdherencePass:n>=95,finopsTargetPass:a>=68,verdictBadge:o?`195TH MILESTONE · 4-MODEL IMAGE ROUTER LOCKED ($${d.toFixed(3)}/Img · -${a}% TCO · ${n.toFixed(1)}% Adherence)`:`SINGLE-MODEL OVERPAY ($${e.unconditionalFlagshipUnitCostUsd.toFixed(2)}/Img · 11.4s Latency · No Private LoRA/ControlNet!)`}}const f=document.querySelector("#app");let u="high-volume-ecommerce-catalog-300k",p="intent-aware-gpt-imagen-flux-sd35-router";function g(){const t=m(u,p),s=t.workload,e=p==="intent-aware-gpt-imagen-flux-sd35-router";f.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">🏆 195TH WORKBENCH MILESTONE (3+7+37×5 = 195)! · Round 406 · Domain 1 (GPT-Image-1 vs Imagen 4 vs Flux.1 vs SD3.5 Enterprise Selection & Router Studio)</span>
        <h1>企业图像生成大模型选型与路由工作台：GPT-Image-1 / Imagen 4 商用 API vs Flux.1 / SD3.5 自托管集群（🏆 第 195 项里程碑！）</h1>
        <p class="wb-subtitle">礼赞全仓达成第 195 座（3+7+37×5 五大业务域各 37 座均衡对齐！）交互式架构工作台里程碑：为架构师横向评测四大主流图像大模型——<strong>OpenAI GPT-Image-1（多主体空间指令与对话修图王牌）</strong>、<strong>Google Imagen 4（高写实商业摄影与超低价格 API）</strong>、<strong>Black Forest Labs Flux.1-dev/pro（企业私有 LoRA 与 ControlNet 生态绝对主力）</strong> 与 <strong>Flux.1-schnell / SD3.5-Turbo（4步 0.35s 实时草图预览）</strong>，通过意图感知四级路由网关将单张均摊成本从 $${s.unconditionalFlagshipUnitCostUsd.toFixed(2)} 压至 $${s.routedBlendedUnitCostUsd.toFixed(3)}（-${t.costReductionPct}% TCO，年省 +$${(s.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Image Workload and Multi-Model Router Controls">
      <div class="control-group">
        <span class="control-label">1. 选择企业图像生成业务负载 (Enterprise Image Generation Workload):</span>
        <div class="btn-row">
          ${Object.keys(c).map(o=>`
            <button type="button" class="scenario-btn ${u===o?"active":""}" data-scenario="${o}">
              ${c[o].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换单模型全量直调与四模型智能分级路由架构 (Image Model Routing Strategy):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="single-flagship-api-unconditional">
            ❌ 传统基线：全量无差别调用单一最贵旗舰 API ($${s.unconditionalFlagshipUnitCostUsd.toFixed(2)}/张 · P95 11.4s · 不支持挂载私有 LoRA 与 ControlNet)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="intent-aware-gpt-imagen-flux-sd35-router">
            ✅ 推荐架构：意图感知四模型路由器 (${s.bestModelRouteDesc} · 均摊 $${s.routedBlendedUnitCostUsd.toFixed(3)}/张)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Image Model Router KPIs">
      <div class="kpi-card">
        <span class="kpi-title">单张商业级图像均摊成本 (Blended Unit Cost)</span>
        <strong class="kpi-value ${t.finopsTargetPass?"good":"bad"}" id="kpi-cost">$${t.effectiveUnitCostUsd.toFixed(3)} (-${t.costReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">AKS 自托管 Flux.1 仅 $${s.selfHostedFluxUnitCostUsd}/张 · 对比单一旗舰 API $${s.unconditionalFlagshipUnitCostUsd.toFixed(2)}/张</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">复杂指令遵循与商品可控度 (Instruction & Control Score)</span>
        <strong class="kpi-value ${t.highAdherencePass?"good":"bad"}" id="kpi-adherence">${t.effectiveAdherencePct.toFixed(1)}%</strong>
        <span class="kpi-sub">${e?"多主体空间交由 GPT-Image-1，商品几何交由 Flux ControlNet":"单一模型无法同时兼顾复杂自然语言排版与像素级 ControlNet"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">端到端 P95 生成响应延迟 (P95 Generation Latency)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-latency">${t.effectiveLatencySec.toFixed(2)} s</strong>
        <span class="kpi-sub">草图预览 0.35s (4-step Flux-schnell) + 终稿异步精修</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">企业视觉网关年化净省算力 (Annual FinOps Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(s.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">达成第 195 项工作台里程碑 (3+7+37×5)！</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>四大主流图像生成大模型横向对比 (GPT-Image-1 vs Imagen 4 vs Flux.1-dev vs Flux-schnell/SD3.5) 与分级路由画布</h2>
          <span class="tag">🏆 195th Milestone · ${s.monthlyImagesCount.toLocaleString("en-US")} Imgs/Mo</span>
        </div>
        <canvas id="img-router-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>四大图像生成大模型能力象限与路由规则明细 (Image Model Audit)</h2>
        <ul class="audit-list">
          <li><span>1. OpenAI GPT-Image-1 ($0.04–$0.17/张):</span> <strong>原生自回归多模态，擅长 >5个主体的复杂空间关系、多轮对话改图与英文海报排版</strong></li>
          <li><span>2. Google Imagen 4 ($0.03–$0.04/张):</span> <strong>高写实商业摄影质感、自然光影与极高性价比公有云 API (Vertex AI 企业免责)</strong></li>
          <li><span>3. Flux.1-dev / pro (AKS 自托管 $0.004/张):</span> <strong>开源控制生态之王，100% 兼容企业私有 LoRA、ControlNet、IP-Adapter 与 VTON</strong></li>
          <li><span>4. Flux.1-schnell / SD3.5-Turbo ($0.0012/张):</span> <strong>Apache-2.0 商用免授权 4步蒸馏模型，0.35秒实时交互草图与布局探索</strong></li>
          <li><span>当前负载最优分流策略:</span> <strong>${s.bestModelRouteDesc}</strong></li>
          <li><span>月产 ${s.monthlyImagesCount.toLocaleString("en-US")} 张总成本对比:</span> <strong>$${(s.monthlyImagesCount*s.unconditionalFlagshipUnitCostUsd).toLocaleString("en-US")}/月 → $${(s.monthlyImagesCount*t.effectiveUnitCostUsd).toLocaleString("en-US")}/月 (-${t.costReductionPct}%)</strong></li>
          <li><span>企业年化净省图像算力与 API 预算:</span> <strong>+$${s.annualEnterpriseSavingsUsd.toLocaleString("en-US")} / Yr (195th Milestone!)</strong></li>
        </ul>
      </div>
    </main>
  `,h(),v(t)}function h(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{u=t.dataset.scenario,g()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{p=t.dataset.mode,g()})})}function v(t){const s=document.querySelector("#img-router-canvas");if(!s)return;const e=s.getContext("2d"),o=s.width,d=s.height,n=t.workload,i=t.mode==="intent-aware-gpt-imagen-flux-sd35-router";e.fillStyle="#070b14",e.fillRect(0,0,o,d),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. 4-Model Enterprise Image Matrix: Match Prompt Complexity & Control Needs to the Right Model",22,26);const a=[{title:"GPT-Image-1 (OpenAI API)",sub:"$0.04–$0.17/img · 8–12s",desc:"Best for multi-object spatial prompts & conversational edits",w:184,color:"#a855f7"},{title:"Imagen 4 (Vertex AI API)",sub:"$0.03–$0.04/img · 3.5s",desc:"Best for photoreal stock photography & IP indemnity",w:188,color:"#38bdf8"},{title:"Flux.1-dev (Self-Hosted AKS)",sub:"$0.004/img · 1.8s (FP8)",desc:"Best for private SKU LoRA, ControlNet & 300k batch",w:192,color:"#10b981"},{title:"Flux-schnell / SD3.5-Turbo",sub:"$0.0012/img · 0.35s (4-Step)",desc:"Best for real-time canvas previews & wireframes",w:184,color:"#f59e0b"}];let r=22;a.forEach(l=>{e.fillStyle=i?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=i?l.color:"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(r,42,l.w,112,10),e.fill(),e.stroke(),e.fillStyle=i?l.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(l.title,r+10,68),e.fillStyle="#f8fafc",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText(l.sub,r+10,92),e.fillStyle="#94a3b8",e.font="10px Inter, system-ui, sans-serif",e.fillText(l.desc,r+10,116),r+=l.w+9}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(`2. Active Workload FinOps Breakdown: ${n.titleEn}`,22,188),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.25)",e.lineWidth=1.5,e.beginPath(),e.roundRect(22,202,776,152,10),e.fill(),e.stroke(),e.fillStyle="#ef4444",e.fillRect(42,228,440,36),e.fillStyle="#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`✕ Single Flagship API Only: $${n.unconditionalFlagshipUnitCostUsd.toFixed(2)}/img · 11.4s P95 · No Custom LoRA/ControlNet`,494,251),e.fillStyle="#10b981",e.fillRect(42,288,92,36),e.fillStyle="#34d399",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`✓ 4-Model Intent Router: $${n.routedBlendedUnitCostUsd.toFixed(3)}/img (-${t.costReductionPct}%) · ${n.p95GenerationLatencySec}s P95 · ${n.promptInstructionAdherencePct}% Adherence`,146,311),e.fillStyle=i?"#38bdf8":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(i?`🏆 195th Workbench Milestone (3+7+37×5): ${n.bestModelRouteDesc} → Saves +$${(n.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M/yr`:`✕ Routing 100% of Drafts & Catalog SKUs to $0.12 Flagship APIs Wastes $${(n.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M/yr!`,22,380)}g();
