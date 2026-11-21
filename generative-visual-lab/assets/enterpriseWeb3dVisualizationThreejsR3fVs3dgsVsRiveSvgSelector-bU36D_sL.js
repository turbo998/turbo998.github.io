import"./modulepreload-polyfill-B5Qt9EMX.js";const r={"product-3d-configurator-part-swap":{id:"product-3d-configurator-part-swap",titleZh:"电商/汽车 3D 产品配置器（换色/开门/拆解交互 → 选 Three.js / R3F Draco+KTX2 GLB · 3.2MB · 移动端 60fps）",titleEn:"3D Product Configurator & Part Swap (Select Three.js / R3F Draco+KTX2 GLB · 3.2MB · 60fps Mobile)",recommendedStackName:"Three.js / React Three Fiber + Draco Mesh + KTX2 BasisU PBR",mismatchedPayloadMb:145,optimizedPayloadMb:3.2,mismatchedMobileFps:14,optimizedMobileFps:60,mismatchedAssetCostUsd:4800,optimizedAssetCostUsd:380,annualEnterpriseSavingsUsd:142e4},"real-world-showroom-virtual-tour":{id:"real-world-showroom-virtual-tour",titleZh:"线下旗舰展厅/文旅实景漫游（复杂非刚体光影 → 选 WebGPU 3DGS + SOGS 纹理量化 · 240MB PLY 压至 11.4MB）",titleEn:"Photoreal Flagship Showroom Tour (Select WebGPU 3DGS + SOGS Compression · 240MB PLY → 11.4MB)",recommendedStackName:"WebGPU 3D Gaussian Splatting (SOGS Compressed) + Three.js Collider Proxy",mismatchedPayloadMb:240,optimizedPayloadMb:11.4,mismatchedMobileFps:11,optimizedMobileFps:60,mismatchedAssetCostUsd:18500,optimizedAssetCostUsd:450,annualEnterpriseSavingsUsd:218e4},"cto-cloud-ai-architecture-dashboard":{id:"cto-cloud-ai-architecture-dashboard",titleZh:"CTO 云与 AI 架构流向大屏与微动效（5,000粒子流 + 矢量节点 → 选顶层 SVG + 底层 Canvas 2D + 28KB Rive 状态机）",titleEn:"CTO Architecture Topology & Agent UI (Select Top SVG + Bottom Canvas 2D + 28KB Rive State Machine)",recommendedStackName:"Top SVG Vector Text + Bottom Canvas 2D Particles + 28KB Rive State Machine",mismatchedPayloadMb:42,optimizedPayloadMb:.18,mismatchedMobileFps:16,optimizedMobileFps:60,mismatchedAssetCostUsd:3200,optimizedAssetCostUsd:120,annualEnterpriseSavingsUsd:168e4}};function S(t,s){const e=r[t],i=s==="workload-matched-hybrid-visual-stack",n=i?e.optimizedPayloadMb:e.mismatchedPayloadMb,a=i?e.optimizedMobileFps:e.mismatchedMobileFps,o=i?e.optimizedAssetCostUsd:e.mismatchedAssetCostUsd,c=i?Number(((e.mismatchedPayloadMb-e.optimizedPayloadMb)/e.mismatchedPayloadMb*100).toFixed(1)):0;return{scenario:e,choice:s,effectivePayloadMb:n,effectiveMobileFps:a,effectiveAssetCostUsd:o,payloadReductionPct:c,mobile60fpsPass:a>=58,fastFirstScreenPass:n<=15,verdictBadge:i?`OPTIMAL WEB VISUAL STACK LOCKED (${n.toFixed(2)}MB · ${a}fps Mobile · -${c}% Payload)`:`MISMATCHED STACK BLOAT (${e.mismatchedPayloadMb.toFixed(0)}MB Payload · ${e.mismatchedMobileFps}fps Mobile Lag · High Bounce Rate!)`}}const f=document.querySelector("#app");let p="product-3d-configurator-part-swap",m="workload-matched-hybrid-visual-stack";function b(){const t=S(p,m),s=t.scenario,e=m==="workload-matched-hybrid-visual-stack";f.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 404 · 193rd Interactive Workbench · Domain 4 (Three.js / R3F vs WebGPU 3DGS vs Rive / Lottie vs SVG + Canvas 2D Selection Studio)</span>
        <h1>企业 Web 3D 与交互可视化技术栈选型工作台：Three.js / R3F vs WebGPU 3DGS vs Rive 状态机 vs SVG+Canvas 双层架构</h1>
        <p class="wb-subtitle">直接解答解决方案架构师与前端负责人在构建产品 3D 配置器、实景展厅与 CTO 动态架构沙盘时的核心选型困惑：什么时候选 <strong>Three.js / React Three Fiber (PBR 网格)</strong>？什么时候选 <strong>3D Gaussian Splatting (3DGS)</strong>？什么时候选 <strong>Rive / Lottie 状态机</strong> 或 <strong>SVG + Canvas 2D 双层架构</strong>？告别盲目加载 ${s.mismatchedPayloadMb.toFixed(0)}MB 原始资产导致的移动端 ${s.mismatchedMobileFps}fps 卡顿，将首屏体积削减 -${t.payloadReductionPct.toFixed(1)}% 至 ${t.effectivePayloadMb.toFixed(2)}MB，满帧锁死 ${t.effectiveMobileFps}fps（年省 +$${(s.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Web Visual Scenario and Stack Selection Controls">
      <div class="control-group">
        <span class="control-label">1. 选择企业交互式视觉展示场景 (Enterprise Web Visualization Scenario):</span>
        <div class="btn-row">
          ${Object.keys(r).map(i=>`
            <button type="button" class="scenario-btn ${p===i?"active":""}" data-scenario="${i}">
              ${r[i].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换前端渲染技术栈与资产压缩方案 (Frontend Rendering & Compression Stack):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="mismatched-heavy-uncompressed-stack">
            ❌ 错误选型：未压缩裸资产 / 技术栈错配 (${s.mismatchedPayloadMb.toFixed(0)}MB 首屏包体 · 移动端掉帧至 ${s.mismatchedMobileFps}fps · 制作成本 $${s.mismatchedAssetCostUsd})
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="workload-matched-hybrid-visual-stack">
            ✅ 推荐选型：${s.recommendedStackName} (${s.optimizedPayloadMb}MB · 移动端满帧 ${s.optimizedMobileFps}fps)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Web Visual Stack Selection KPIs">
      <div class="kpi-card">
        <span class="kpi-title">首屏网络传输包体大小 (First-Screen Payload)</span>
        <strong class="kpi-value ${t.fastFirstScreenPass?"good":"bad"}" id="kpi-payload">${t.effectivePayloadMb.toFixed(2)} MB (-${t.payloadReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">对比未压缩错配方案 ${s.mismatchedPayloadMb.toFixed(0)} MB (首屏秒开零白屏)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">移动端 iOS/Android 稳定帧率 (Mobile Viewport FPS)</span>
        <strong class="kpi-value ${t.mobile60fpsPass?"good":"bad"}" id="kpi-fps">${t.effectiveMobileFps} fps</strong>
        <span class="kpi-sub">${e?s.recommendedStackName:`DOM 节点爆炸或未量化高斯球导致掉帧至 ${s.mismatchedMobileFps} fps`}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单场景建模/采集与开发成本 (Per-Scene Asset Cost)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-asset-cost">$${t.effectiveAssetCostUsd.toLocaleString("en-US")}</strong>
        <span class="kpi-sub">对比传统全手工拓扑烘焙或重型渲染方案 $${s.mismatchedAssetCostUsd.toLocaleString("en-US")}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">企业数字营销与研发年化净省 (Annual Enterprise ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(s.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">降低首屏跳出率 -64% 并大幅缩短资产交付周期</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>四大 Web 交互可视化技术栈能力象限 (Three.js/R3F vs WebGPU 3DGS vs Rive/Lottie vs SVG+Canvas 2D) 画布</h2>
          <span class="tag">${s.recommendedStackName}</span>
        </div>
        <canvas id="web3d-selector-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>四大 Web 可视化技术栈适用边界与避坑指南 (Stack Selection Audit)</h2>
        <ul class="audit-list">
          <li><span>1. Three.js / R3F (Draco + KTX2 GLB):</span> <strong>适合需要换材质、开关车门、零部件拆解的硬表面产品配置器 (3.2MB · 60fps)</strong></li>
          <li><span>2. WebGPU 3DGS (SOGS 压缩实景高斯):</span> <strong>适合旗舰店、博物馆、地产样板间实景漫游；不可拆解单零件 (240MB→11.4MB)</strong></li>
          <li><span>3. Rive / Lottie 矢量骨骼状态机:</span> <strong>适合 AI Copilot 语音唤醒、按钮状态过渡微动效 (28KB 替代 15MB 透明视频)</strong></li>
          <li><span>4. 顶层 SVG + 底层 Canvas 2D 三明治:</span> <strong>适合 CTO 云架构流向图 (避免 >1,200 个纯 SVG DOM 节点引发主线程卡死)</strong></li>
          <li><span>多 3D 视口长网页防崩溃红线:</span> <strong>严禁新建 >8 个 WebGL Canvas！全页共享单 Canvas + gl.scissor 视口裁剪</strong></li>
          <li><span>当前场景推荐最优技术栈:</span> <strong>${s.recommendedStackName}</strong></li>
          <li><span>企业年化净省带宽、建模与转化收益:</span> <strong>+$${s.annualEnterpriseSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,h(),u(t)}function h(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{p=t.dataset.scenario,b()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{m=t.dataset.mode,b()})})}function u(t){const s=document.querySelector("#web3d-selector-canvas");if(!s)return;const e=s.getContext("2d"),i=s.width,n=s.height,a=t.scenario,o=t.choice==="workload-matched-hybrid-visual-stack";e.fillStyle="#070b14",e.fillRect(0,0,i,n),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. The 4 Web Visualization Pillars: Match Rendering Engine to Geometry & Interaction Needs",22,26);const c=[{title:"1. Three.js / R3F (GLB Mesh)",sub:"Draco + KTX2 · 2–5 MB",desc:"Part-level articulation, PBR relight & CAD",w:184,color:"#38bdf8"},{title:"2. WebGPU 3DGS (SOGS)",sub:"Compressed Splats · 8–14 MB",desc:"Photoreal real-world scenes & complex foliage",w:188,color:"#a855f7"},{title:"3. Top SVG + Bottom Canvas",sub:"Hybrid 2D · < 200 KB",desc:"Crisp vector text + 10,000 60fps flow particles",w:192,color:"#10b981"},{title:"4. Rive State Machine",sub:"Vector Bones · 15–40 KB",desc:"Interactive UI micro-animations & agent avatars",w:184,color:"#f59e0b"}];let d=22;c.forEach(l=>{e.fillStyle=o?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=o?l.color:"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(d,42,l.w,112,10),e.fill(),e.stroke(),e.fillStyle=o?l.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(l.title,d+10,68),e.fillStyle="#f8fafc",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText(l.sub,d+10,92),e.fillStyle="#94a3b8",e.font="10px Inter, system-ui, sans-serif",e.fillText(l.desc,d+10,116),d+=l.w+9}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(`2. Active Scenario Benchmark: ${a.titleEn}`,22,188),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.25)",e.lineWidth=1.5,e.beginPath(),e.roundRect(22,202,776,152,10),e.fill(),e.stroke(),e.fillStyle="#ef4444",e.fillRect(42,228,460,36),e.fillStyle="#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`✕ Mismatched / Raw Stack: ${a.mismatchedPayloadMb.toFixed(1)} MB Payload · ${a.mismatchedMobileFps} fps Mobile · $${a.mismatchedAssetCostUsd} Asset Cost`,514,251),e.fillStyle="#10b981",e.fillRect(42,288,68,36),e.fillStyle="#34d399",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`✓ Matched Stack (${a.recommendedStackName}): ${a.optimizedPayloadMb.toFixed(2)} MB (-${t.payloadReductionPct}%) · ${a.optimizedMobileFps} fps Mobile`,124,311),e.fillStyle=o?"#38bdf8":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(o?`✓ Optimal Stack Selected: ${a.optimizedPayloadMb.toFixed(2)} MB First-Screen Load · 60fps Mobile · +$${(a.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M/yr Saved`:`✕ Wrong Rendering Engine Wastes ${a.mismatchedPayloadMb.toFixed(0)} MB Bandwidth and Drops Mobile Frame Rate to ${a.mismatchedMobileFps} fps!`,22,380)}b();
