import"./modulepreload-polyfill-B5Qt9EMX.js";const m={"virtual-tryon-garment-swap-50k":{id:"virtual-tryon-garment-swap-50k",titleZh:"服装虚拟试穿与模特换装（月产 50,000 张 · CatVTON/IDM-VTON + DensePose 锁死服装纹理 vs 通用生图 API 变形）",titleEn:"Apparel Virtual Try-On & Model Swap (50,000 Imgs/Mo · CatVTON + DensePose vs Generic Image API)",monthlyImagesCount:5e4,pureApiLogoGarmentFidelityPct:62.4,comfyControlNetFidelityPct:99.2,naiveColdStartLatencySec:74,warmPoolLatencySec:2.4,commercialApiCostPerImgUsd:.08,hybridComfyCostPerImgUsd:.009,annualProductionSavingsUsd:164e4},"hero-sku-background-relight-200k":{id:"hero-sku-background-relight-200k",titleZh:"20万张电商商品主图换背景与重打光（BiRefNet 0.00px 抠图锁 + Flux.1 ControlNet + IC-Light vs 商用 API）",titleEn:"200,000-SKU Product Background Swap & Relighting (BiRefNet 0.00px Lock + Flux.1 + IC-Light)",monthlyImagesCount:2e5,pureApiLogoGarmentFidelityPct:68.5,comfyControlNetFidelityPct:99.8,naiveColdStartLatencySec:68,warmPoolLatencySec:1.8,commercialApiCostPerImgUsd:.06,hybridComfyCostPerImgUsd:.006,annualProductionSavingsUsd:248e4},"seasonal-brand-lora-lookbook-100k":{id:"seasonal-brand-lora-lookbook-100k",titleZh:"10万张品牌专属模特与多机位 Lookbook（Flux.1-dev 私有 LoRA + IP-Adapter + K8s/Serverless ComfyUI 混部）",titleEn:"100,000-Image Brand Model & Multi-Angle Lookbook (Flux.1 Private LoRA + IP-Adapter + Hybrid ComfyUI)",monthlyImagesCount:1e5,pureApiLogoGarmentFidelityPct:58,comfyControlNetFidelityPct:98.9,naiveColdStartLatencySec:82,warmPoolLatencySec:2.6,commercialApiCostPerImgUsd:.08,hybridComfyCostPerImgUsd:.008,annualProductionSavingsUsd:196e4}};function f(o,t){const e=m[o],a=t==="flux-controlnet-catvton-warm-comfyui-hybrid",n=a?e.comfyControlNetFidelityPct:e.pureApiLogoGarmentFidelityPct,s=a?e.warmPoolLatencySec:e.naiveColdStartLatencySec,l=a?e.hybridComfyCostPerImgUsd:e.commercialApiCostPerImgUsd,d=a?Number(((e.commercialApiCostPerImgUsd-e.hybridComfyCostPerImgUsd)/e.commercialApiCostPerImgUsd*100).toFixed(1)):0;return{workload:e,arch:t,effectiveFidelityPct:n,effectiveLatencySec:s,effectiveUnitCostUsd:l,costReductionPct:d,zeroLogoWarpPass:n>=98.5,subThreeSecSlaPass:s<=3,verdictBadge:a?`FLUX + CONTROLNET + WARM COMFYUI LOCKED (${n.toFixed(1)}% SKU Fidelity · ${s.toFixed(1)}s P95 · $${l.toFixed(3)}/Img)`:`SKU LOGO WARP (${e.pureApiLogoGarmentFidelityPct}% Fidelity) & ${e.naiveColdStartLatencySec}s SERVERLESS COLD START!`}}const P=document.querySelector("#app");let y="virtual-tryon-garment-swap-50k",u="flux-controlnet-catvton-warm-comfyui-hybrid";function p(){const o=f(y,u),t=o.workload,e=u==="flux-controlnet-catvton-warm-comfyui-hybrid";P.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 402 · 191st Interactive Workbench · Domain 2 (Flux.1 / SD3.5 ControlNet + ComfyUI Serverless vs K8s GPU vs Commercial API Studio)</span>
        <h1>电商商品主图与虚拟试穿 (VTON) 架构选型工作台：Flux.1 / SD3.5 ControlNet + ComfyUI Serverless vs 云原生 GPU 自建 vs 商用 API</h1>
        <p class="wb-subtitle">为零售与电商架构师提供端到端生产管线选型标尺：解决通用商用生图 API（GPT-Image-1 / Imagen 4）因缺乏多节点掩码与骨骼/深度控制导致服装印花与商品 Logo 变形（保真度仅 ${t.pureApiLogoGarmentFidelityPct}%）、而朴素 Serverless ComfyUI 容器遭遇 ${t.naiveColdStartLatencySec}秒冷启动的痛点，通过“K8s 常驻 GPU 温池 + Serverless 弹性溢出（Modal / Fal.ai）运行 Flux.1 + ControlNet + CatVTON/IC-Light DAG”，实现 ${t.comfyControlNetFidelityPct}% 商品保真度、${t.warmPoolLatencySec}秒极速出图与 $${t.hybridComfyCostPerImgUsd.toFixed(3)}/张超低成本（年省 +$${(t.annualProductionSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${o.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="E-Commerce Visual Workload and Stack Controls">
      <div class="control-group">
        <span class="control-label">1. 选择电商视觉业务场景与月度出图规模 (E-Commerce Visual Production Workload):</span>
        <div class="btn-row">
          ${Object.keys(m).map(a=>`
            <button type="button" class="scenario-btn ${y===a?"active":""}" data-scenario="${a}">
              ${m[a].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换图像生产架构方案 (Commercial API vs Serverless ComfyUI vs K8s GPU Hybrid):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="generic-commercial-image-api-or-cold-comfyui">
            ❌ 传统基线：通用黑盒生图 API (商品 Logo/版型变形 · $${t.commercialApiCostPerImgUsd}/张) 或无温池冷启动 ComfyUI (${t.naiveColdStartLatencySec}s 延迟)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="flux-controlnet-catvton-warm-comfyui-hybrid">
            ✅ 推荐架构：Flux.1 ControlNet + CatVTON/IC-Light + K8s 温池/Serverless 混合 ComfyUI (${t.warmPoolLatencySec}s · $${t.hybridComfyCostPerImgUsd}/张)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core E-Commerce Visual Pipeline KPIs">
      <div class="kpi-card">
        <span class="kpi-title">商品 Logo、版型与面料印花保真度 (SKU & Garment Fidelity)</span>
        <strong class="kpi-value ${o.zeroLogoWarpPass?"good":"bad"}" id="kpi-fidelity">${o.effectiveFidelityPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${e?"BiRefNet 0.00px 抠图锁 + DensePose/CatVTON 经纬对齐":"黑盒 API 重绘篡改领口剪裁、纽扣数量与品牌商标"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">端到端 P95 推理与冷启动延迟 (P95 Generation Latency)</span>
        <strong class="kpi-value ${o.subThreeSecSlaPass?"good":"bad"}" id="kpi-latency">${o.effectiveLatencySec.toFixed(1)} s</strong>
        <span class="kpi-sub">${e?"mmap 零拷贝底模预热 + 节点亲和调度 (消除 24GB 权重重复加载)":`Serverless 容器从零拉取 24GB Flux/VTON 权重耗时 ${t.naiveColdStartLatencySec}s`}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单张商业级主图生成成本 (Unit Image Cost)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-cost">$${o.effectiveUnitCostUsd.toFixed(3)} (-${o.costReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">月产 ${t.monthlyImagesCount.toLocaleString("en-US")} 张 · 对比商用 API $${t.commercialApiCostPerImgUsd.toFixed(2)}/张</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">电商视觉中台年化净省预算 (Annual Production Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(t.annualProductionSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">替代棚拍外模与高废片率黑盒 API 抽卡</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>ComfyUI 企业级受控 DAG 工作流 (BiRefNet + DensePose/CatVTON + Flux.1 ControlNet + IC-Light) 与三种托管架构对比画布</h2>
          <span class="tag">${t.monthlyImagesCount.toLocaleString("en-US")} Imgs/Mo · ${t.comfyControlNetFidelityPct}% SKU Lock</span>
        </div>
        <canvas id="vton-comfy-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>商用 API vs Serverless ComfyUI vs K8s GPU 自建选型明细 (Architecture Audit)</h2>
        <ul class="audit-list">
          <li><span>1. 商用生图 API (GPT-Image-1 / Imagen 4 / Photoroom):</span> <strong>适合 &lt;1万张/月轻量修图；缺多节点自定义 DAG ($0.04–$0.08/张)</strong></li>
          <li><span>2. Serverless ComfyUI (Modal / Fal.ai / Replicate):</span> <strong>适合 1万–5万张/月波峰业务；按秒计费，需配底模快照防冷启</strong></li>
          <li><span>3. K8s GPU 自建 + Serverless 溢出混合架构:</span> <strong>适合 ≥5万张/月主力电商；单张降至 $${t.hybridComfyCostPerImgUsd.toFixed(3)} (-${o.costReductionPct}%)</strong></li>
          <li><span>虚拟试穿核心算子栈 (VTON Stack):</span> <strong>DensePose 24分区人体 UV + CatVTON / IDM-VTON 服装经纬保真</strong></li>
          <li><span>商品主图换背景核心算子栈 (SKU Relight):</span> <strong>BiRefNet 腐蚀掩码像素锁 + Flux.1 Depth ControlNet + IC-Light</strong></li>
          <li><span>P95 出图延迟与底模预热机制:</span> <strong>${o.effectiveLatencySec.toFixed(1)} 秒 (NVMe → Host RAM mmap 共享内存池)</strong></li>
          <li><span>企业年化净省摄影与算力总预算:</span> <strong>+$${t.annualProductionSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,C(),v(o)}function C(){document.querySelectorAll(".scenario-btn").forEach(o=>{o.addEventListener("click",()=>{y=o.dataset.scenario,p()})}),document.querySelectorAll(".mode-btn").forEach(o=>{o.addEventListener("click",()=>{u=o.dataset.mode,p()})})}function v(o){const t=document.querySelector("#vton-comfy-canvas");if(!t)return;const e=t.getContext("2d"),a=t.width,n=t.height,s=o.workload,l=o.arch==="flux-controlnet-catvton-warm-comfyui-hybrid";e.fillStyle="#070b14",e.fillRect(0,0,a,n),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Production Headless ComfyUI DAG: Why Multi-Node Control Beats Single-Prompt Image APIs",22,26);const d=[{title:"Node 1: BiRefNet + DensePose",sub:"0.00px Alpha Lock & 24-Part Body UV",desc:"Freezes exact SKU logo & garment silhouette",w:184,color:"#38bdf8"},{title:"Node 2: CatVTON / IDM-VTON",sub:"Attention-Based Garment Warp",desc:"99.2% weave, stripe & button preservation",w:188,color:"#a855f7"},{title:"Node 3: Flux.1 + ControlNet",sub:"Depth/Canny + Brand Style LoRA",desc:"Synthesizes studio/street scene with exact geometry",w:192,color:"#f59e0b"},{title:"Node 4: IC-Light PBR Relight",sub:"Foreground-Background Harmonizer",desc:`Matches shadows & color temp in ${s.warmPoolLatencySec}s`,w:184,color:"#10b981"}];let r=22;d.forEach(i=>{e.fillStyle=l?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=l?i.color:"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(r,42,i.w,112,10),e.fill(),e.stroke(),e.fillStyle=l?i.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(i.title,r+10,68),e.fillStyle="#f8fafc",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText(i.sub,r+10,92),e.fillStyle="#94a3b8",e.font="10px Inter, system-ui, sans-serif",e.fillText(i.desc,r+10,116),r+=i.w+9}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Hosting Architecture Selection: Commercial API vs Serverless ComfyUI (Modal/Fal) vs K8s Warm GPU Pool",22,188);const g=[{label:"Option A: Generic Black-Box Image API (GPT-Image-1 / Imagen 4) — <10k imgs/mo",metrics:`Fidelity: ${s.pureApiLogoGarmentFidelityPct}% (Logo Warp) · Cost: $${s.commercialApiCostPerImgUsd.toFixed(2)}/img · Custom DAG: No`,color:"#ef4444"},{label:"Option B: Pure Serverless ComfyUI (Modal / Fal.ai / Replicate) — 10k to 45k imgs/mo",metrics:"Fidelity: 99.2% · Cost: $0.018/img · Requires Memory Snapshot to Beat 74s Cold Start",color:"#38bdf8"},{label:"Option C: K8s L40S/H100 Warm Pool (80%) + Serverless Burst (20%) — ≥45k imgs/mo",metrics:`Fidelity: ${s.comfyControlNetFidelityPct}% · Cost: $${s.hybridComfyCostPerImgUsd.toFixed(3)}/img (-${o.costReductionPct}%) · Latency: ${s.warmPoolLatencySec}s P95`,color:"#10b981"}];let c=204;g.forEach(i=>{e.fillStyle="#0f172a",e.strokeStyle=l?i.color:"#ef4444",e.lineWidth=1.8,e.beginPath(),e.roundRect(22,c,776,44,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(i.label,34,c+18),e.fillStyle=l?i.color:"#fca5a5",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(i.metrics,34,c+36),c+=52}),e.fillStyle=l?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(l?`✓ Recommended Hybrid ComfyUI Pipeline: ${s.comfyControlNetFidelityPct}% Garment/Logo Lock · ${s.warmPoolLatencySec}s Latency · +$${(s.annualProductionSavingsUsd/1e6).toFixed(2)}M/yr Saved`:`✕ Generic Image API Warps ${(100-s.pureApiLogoGarmentFidelityPct).toFixed(1)}% of Garment Logos While Unwarmed Containers Suffer ${s.naiveColdStartLatencySec}s Cold Starts`,22,382)}p();
