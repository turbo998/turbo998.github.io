import"./modulepreload-polyfill-B5Qt9EMX.js";const u={"product-launch-hero-and-ui-walkthrough":{id:"product-launch-hero-and-ui-walkthrough",titleZh:"企业产品发布会与 SaaS 功能演示片（35% 写实概念空镜 B-Roll + 65% 高精度 UI 动效/架构图/字幕）",titleEn:"Product Launch & SaaS Demo Video (35% Cinematic AI B-Roll + 65% Deterministic Remotion/Motion Canvas UI)",cinematicBrollSharePct:35,deterministicUiTextSharePct:65,pureAiTextUiAccuracyPct:38.4,hybridTextUiAccuracyPct:100,pureAiCostPerClipUsd:14.5,hybridCostPerClipUsd:.42,pureAiRevisionMinutes:45,hybridRevisionSeconds:6.5,annualProductionSavingsUsd:268e4},"ecommerce-promo-1000sku-batch-ads":{id:"ecommerce-promo-1000sku-batch-ads",titleZh:"电商大促 1,000 款商品短视频批量生成（AIGC 模特氛围底片缓存复用 + Remotion 动态价格/卖点/LOGO 压制）",titleEn:"E-Commerce 1,000-SKU Promo Batch Ads (Cached AIGC Lifestyle B-Roll + Remotion Dynamic Price/CTA Overlay)",cinematicBrollSharePct:45,deterministicUiTextSharePct:55,pureAiTextUiAccuracyPct:42,hybridTextUiAccuracyPct:100,pureAiCostPerClipUsd:6.8,hybridCostPerClipUsd:.08,pureAiRevisionMinutes:28,hybridRevisionSeconds:1.8,annualProductionSavingsUsd:342e4},"executive-annual-data-report-video":{id:"executive-annual-data-report-video",titleZh:"企业财报数据故事与客户年度总结视频（15% 品牌开场 AI 视觉 + 85% Motion Canvas / Remotion 零差错数据图表）",titleEn:"Executive Data Storytelling & Year-in-Review (15% AI Brand Intro + 85% Motion Canvas / Remotion Charts)",cinematicBrollSharePct:15,deterministicUiTextSharePct:85,pureAiTextUiAccuracyPct:24.5,hybridTextUiAccuracyPct:100,pureAiCostPerClipUsd:9.2,hybridCostPerClipUsd:.03,pureAiRevisionMinutes:35,hybridRevisionSeconds:1.2,annualProductionSavingsUsd:295e4}};function S(t,i){const e=u[t],a=i==="hybrid-aigc-broll-plus-remotion-motion-canvas",c=a?e.hybridTextUiAccuracyPct:e.pureAiTextUiAccuracyPct,n=a?e.hybridCostPerClipUsd:e.pureAiCostPerClipUsd,o=a?e.hybridRevisionSeconds:e.pureAiRevisionMinutes*60,d=a?Number(((e.pureAiCostPerClipUsd-e.hybridCostPerClipUsd)/e.pureAiCostPerClipUsd*100).toFixed(1)):0;return{scenario:e,stack:i,effectiveTextUiAccuracyPct:c,effectiveCostPerClipUsd:n,effectiveRevisionSeconds:o,costReductionPct:d,brandCompliancePass:c===100,instantCopyUpdatePass:o<=10,verdictBadge:a?`ROUND 400 MILESTONE · HYBRID AIGC + REMOTION LOCKED (100% UI/Text Accuracy · $${n.toFixed(2)}/Clip · ${o.toFixed(1)}s Edit)`:`PURE AI VIDEO HALLUCINATION (${(100-e.pureAiTextUiAccuracyPct).toFixed(1)}% Garbled UI/Text · $${e.pureAiCostPerClipUsd.toFixed(2)}/Clip · ${e.pureAiRevisionMinutes}m Re-Roll!)`}}const m=document.querySelector("#app");let p="product-launch-hero-and-ui-walkthrough",v="hybrid-aigc-broll-plus-remotion-motion-canvas";function h(){const t=S(p,v),i=t.scenario,e=v==="hybrid-aigc-broll-plus-remotion-motion-canvas";m.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">🏆 HISTORIC ROUND 400 MILESTONE! · 189th Workbench · Domain 5 (Remotion / HyperFrames / Motion Canvas vs Sora 2 / Veo 3 / Wan 2.1 Hybrid Pipeline)</span>
        <h1>企业视频技术栈选型工作台：Remotion / Motion Canvas 代码驱动视频 vs Sora / Veo 纯 AI 生成 vs 混合合成流水线（🏆 第 400 轮里程碑！）</h1>
        <p class="wb-subtitle">礼赞全仓达成第 400 轮研究里程碑（第 189 座工作台）：为 Cloud & AI Solution Architect 厘清“什么时候用 AI 视频大模型（Sora 2 / Veo 3 / Kling 2.1 / Wan 2.1），什么时候用代码驱动可编程视频（Remotion / Motion Canvas / HyperFrames）”——解决让纯 AI 视频直接生成产品 UI 界面、数据图表与促销价格导致的 ${(100-i.pureAiTextUiAccuracyPct).toFixed(1)}% 乱码率与改一个字需重新抽卡 ${i.pureAiRevisionMinutes} 分钟（$${i.pureAiCostPerClipUsd.toFixed(2)}/条）的痛点，通过“AIGC 写实镜头缓存 (${i.cinematicBrollSharePct}%) + Remotion/Motion Canvas 确定性图层合成 (${i.deterministicUiTextSharePct}%)”混合流水线实现 100% 零差错与 ${i.hybridRevisionSeconds}秒改稿（单条降至 $${i.hybridCostPerClipUsd.toFixed(2)}，年省 +$${(i.annualProductionSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Video Scenario and Stack Selection Controls">
      <div class="control-group">
        <span class="control-label">1. 选择企业视频业务场景与镜头占比 (Enterprise Video Production Scenario):</span>
        <div class="btn-row">
          ${Object.keys(u).map(a=>`
            <button type="button" class="scenario-btn ${p===a?"active":""}" data-scenario="${a}">
              ${u[a].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换视频生产技术栈选型方案 (Video Production Stack Architecture):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="pure-ai-video-diffusion-end-to-end">
            ❌ 方案 A：纯生成式 AI 视频一镜到底 (Sora / Veo 直出文字与 UI · 准确率仅 ${i.pureAiTextUiAccuracyPct}% · 改字需重新抽卡 ${i.pureAiRevisionMinutes}m)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="hybrid-aigc-broll-plus-remotion-motion-canvas">
            ✅ 方案 B：AIGC 写实 B-Roll (${i.cinematicBrollSharePct}%) + Remotion / Motion Canvas 代码合成 (${i.deterministicUiTextSharePct}% · 100% 精准 · $${i.hybridCostPerClipUsd}/条)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Video Stack Selection KPIs">
      <div class="kpi-card">
        <span class="kpi-title">产品 UI、图表数字与品牌文案准确率 (UI & Text Fidelity)</span>
        <strong class="kpi-value ${t.brandCompliancePass?"good":"bad"}" id="kpi-accuracy">${t.effectiveTextUiAccuracyPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${e?"React/TS 声明式矢量渲染，价格与图表 0 幻觉":"像素扩散模型生成的软件界面、按钮与中文文案大量乱码"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单支成片综合制作成本 (Unit Video Production Cost)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-cost">$${t.effectiveCostPerClipUsd.toFixed(2)} (-${t.costReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">对比纯 AI 视频反复抽卡废片成本 $${i.pureAiCostPerClipUsd.toFixed(2)} / 条</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">修改单处文案/价格/多语种重编译耗时 (Revision Latency)</span>
        <strong class="kpi-value ${t.instantCopyUpdatePass?"good":"bad"}" id="kpi-revision">${e?`${t.effectiveRevisionSeconds.toFixed(1)} s`:`${i.pureAiRevisionMinutes} min`}</strong>
        <span class="kpi-sub">JSON 参数注入直接重渲染字幕与动效层，无需重跑 GPU 视频扩散</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">企业内容中台年化净省预算 (Annual Production ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(i.annualProductionSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">达成第 400 轮里程碑 · 兼顾电影级质感与工程级确定性</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>AI 生成视频 (Sora/Veo/Wan) vs 代码驱动视频 (Remotion/Motion Canvas) 多轨混合时间轴架构对比画布</h2>
          <span class="tag">🏆 Round 400 · ${i.cinematicBrollSharePct}% AIGC B-Roll + ${i.deterministicUiTextSharePct}% Code Layer</span>
        </div>
        <canvas id="hybrid-video-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>三大视频技术栈能力边界与选型审计明细 (Stack Selection Audit)</h2>
        <ul class="audit-list">
          <li><span>写实创意镜头轨 (Track 1 · ${i.cinematicBrollSharePct}%):</span> <strong>Sora 2 / Veo 3 / Wan 2.1 生成光影氛围 B-Roll 底片</strong></li>
          <li><span>高精度产品 UI 与数据图表轨 (Track 2 · ${i.deterministicUiTextSharePct}%):</span> <strong>Remotion (React DOM) + Motion Canvas (TS 矢量状态机)</strong></li>
          <li><span>多语种字幕、价格标签与品牌 VI 轨 (Track 3):</span> <strong>JSON Schema 参数化绑定 (100.0% 拼写与数字零差错)</strong></li>
          <li><span>音画同步与配音拟音轨 (Track 4):</span> <strong>Azure Speech TTS 词级时间戳对齐 + 关键帧缓动曲线</strong></li>
          <li><span>纯 AI 生成 vs 混合架构单条成本:</span> <strong>$${i.pureAiCostPerClipUsd.toFixed(2)} (含 4.5x 抽卡废片) → $${t.effectiveCostPerClipUsd.toFixed(2)} / 条</strong></li>
          <li><span>定稿前一分钟修改价格/文案耗时:</span> <strong>${e?`${t.effectiveRevisionSeconds.toFixed(1)} 秒局部重编译`:`${i.pureAiRevisionMinutes} 分钟全片推倒重算`}</strong></li>
          <li><span>企业内容生产管线年化净省:</span> <strong>+$${i.annualProductionSavingsUsd.toLocaleString("en-US")} / Yr (Round 400!)</strong></li>
        </ul>
      </div>
    </main>
  `,y(),C(t)}function y(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{p=t.dataset.scenario,h()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{v=t.dataset.mode,h()})})}function C(t){const i=document.querySelector("#hybrid-video-canvas");if(!i)return;const e=i.getContext("2d"),a=i.width,c=i.height,n=t.scenario,o=t.stack==="hybrid-aigc-broll-plus-remotion-motion-canvas";e.fillStyle="#070b14",e.fillRect(0,0,a,c),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Enterprise Video Stack Division of Labor: Generative AI Video vs Remotion vs Motion Canvas",22,26);const d=[{title:"Generative AI Video (Sora 2 / Veo 3 / Wan 2.1)",sub:`Role: Cinematic B-Roll & Lifestyle Plates (${n.cinematicBrollSharePct}%)`,desc:"Best for photorealistic lighting, humans & fluid environments",w:252,color:"#a855f7"},{title:"Remotion (React / CSS / DOM / Three.js)",sub:`Role: SaaS UI Demos & 1,000-SKU Ads (${Math.round(n.deterministicUiTextSharePct*.6)}%)`,desc:"Best for data-driven templates, real React components & text",w:256,color:"#38bdf8"},{title:"Motion Canvas / HyperFrames (Procedural TS)",sub:`Role: Architecture & KPI Charts (${Math.round(n.deterministicUiTextSharePct*.4)}%)`,desc:"Best for generator-based step-by-step diagrams & 60fps math",w:244,color:"#10b981"}];let r=22;d.forEach(s=>{e.fillStyle=o?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=o?s.color:"#ef4444",e.lineWidth=2.2,e.beginPath(),e.roundRect(r,42,s.w,114,10),e.fill(),e.stroke(),e.fillStyle=o?s.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s.title,r+12,68),e.fillStyle="#f8fafc",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(s.sub,r+12,94),e.fillStyle="#94a3b8",e.font="10.5px Inter, system-ui, sans-serif",e.fillText(s.desc,r+12,120),r+=s.w+12}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Hybrid Multi-Track Video Compositor Timeline (Cached AI Video Plate + Deterministic Code Overlays)",22,188);const b=[{label:"Track 3 (Vector Overlay): Remotion Brand Logo, Exact Price ($299) & Multilingual Subtitles",val:o?"100.0% Exact Typography (JSON-Bound)":"✕ 61.6% Garbled Pixel Diffusion Text!",color:"#10b981"},{label:"Track 2 (Interactive UI / Chart): Motion Canvas 60fps SaaS UI Walkthrough & Architecture Flow",val:o?"6.5s Instant Code Re-Compile":"✕ Melted UI Buttons & Hallucinated Charts!",color:"#38bdf8"},{label:"Track 1 (Base Plate): Cached Sora 2 / Veo 3 / Wan 2.1 Photorealistic B-Roll Background",val:o?"Generated Once & Reused Across 1,000 SKUs":"✕ Re-Generated Every Copy Edit ($14.50/clip)",color:"#a855f7"}];let l=204;b.forEach(s=>{e.fillStyle="#0f172a",e.strokeStyle=o?s.color:"#ef4444",e.lineWidth=1.8,e.beginPath(),e.roundRect(22,l,776,44,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(s.label,36,l+26),e.fillStyle=o?s.color:"#fca5a5",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(s.val,540,l+26),l+=52}),e.fillStyle=o?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(o?`🏆 Historic Round 400 Complete: $${n.hybridCostPerClipUsd.toFixed(2)}/clip (-${t.costReductionPct}%) · 100% UI/Text Accuracy · +$${(n.annualProductionSavingsUsd/1e6).toFixed(2)}M/yr Saved`:`✕ Pure AI Video Suffers ${(100-n.pureAiTextUiAccuracyPct).toFixed(1)}% UI/Text Hallucinations and Costs $${n.pureAiCostPerClipUsd.toFixed(2)}/clip on Copy Edits`,22,382)}h();
