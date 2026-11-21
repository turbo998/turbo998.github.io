import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"global-omni-retail-and-ecommerce-group":{id:"global-omni-retail-and-ecommerce-group",titleZh:"跨国零售与全渠道电商集团（20万 SKU 主图 + 6万条营销短视频 + 16语种海报 → 年省 +$6.84M）",titleEn:"Global Omnichannel Retail & E-Commerce Group (200k SKU Imgs + 60k Promo Videos + 16-Locale Ads)",recommendedImageStack:"80% K8s Warm ComfyUI (Flux.1 + CatVTON + IC-Light) + 20% GPT-Image-1 / Imagen 4",recommendedVideoStack:"85% AKS Wan 2.1-14B ($0.24/clip) + 15% Sora 2 / Veo 3 Hero B-Roll + Remotion Overlay",recommendedAvatarAndWebStack:"Satori/HarfBuzz 16-Locale Vector Posters + Three.js Draco/KTX2 3D Configurator",siloAnnualSpendUsd:842e4,unifiedHubAnnualSpendUsd:158e4,brandAndC2paCompliancePct:99.8,netAnnualSavingsUsd:684e4},"regulated-finserv-and-pharma-enterprise":{id:"regulated-finserv-and-pharma-enterprise",titleZh:"强监管金融与跨国医药集团（VNet 隐私闭环 + 40语种合规培训数字人 + 零幻觉数据视频 → 年省 +$5.42M）",titleEn:"Regulated Financial Services & Pharma Enterprise (VNet Privacy + 40-Locale Avatar + Data Videos)",recommendedImageStack:"Private AKS Flux.1 + Brand VI LoRA + Azure AI Content Safety + HSM Dual C2PA v2.1",recommendedVideoStack:"Motion Canvas / Remotion 100% Deterministic Charts + 94% Closed-GOP Byte-Stream Mux",recommendedAvatarAndWebStack:"Azure AI Speech Avatar (VNet Private Endpoint) + Self-Hosted MuseTalk 256px ROI",siloAnnualSpendUsd:69e5,unifiedHubAnnualSpendUsd:148e4,brandAndC2paCompliancePct:99.95,netAnnualSavingsUsd:542e4},"digital-native-media-and-gaming-studio":{id:"digital-native-media-and-gaming-studio",titleZh:"数字原生内容、游戏与广告集团（60镜分镜预演 Previs + 20语种短剧译制 + 3DGS 展厅 → 年省 +$7.95M）",titleEn:"Digital-Native Media, Ad Agency & Gaming Studio (60-Shot Previs + 20-Lang Dubbing + 3DGS)",recommendedImageStack:"3D Dummy Blockout Depth/Pose + Turnaround Character LoRA + Regional Mask Attention",recommendedVideoStack:"ConsisID / Wan2.1-VACE Keyframe-to-Video + Causal Tri-Zone KV Streaming + Sora 2/Veo 3",recommendedAvatarAndWebStack:"UVR5 41.2dB Stem Split + Isochronous LLM + MuseTalk Lip-Sync + SOGS WebGPU 3DGS",siloAnnualSpendUsd:985e4,unifiedHubAnnualSpendUsd:19e5,brandAndC2paCompliancePct:99.7,netAnnualSavingsUsd:795e4}};function b(n,t){const e=c[n],a=t==="unified-200th-milestone-reference-hub",r=a?e.unifiedHubAnnualSpendUsd:e.siloAnnualSpendUsd,i=a?e.brandAndC2paCompliancePct:58.4,s=a?Number(((e.siloAnnualSpendUsd-e.unifiedHubAnnualSpendUsd)/e.siloAnnualSpendUsd*100).toFixed(1)):0;return{profile:e,mode:t,effectiveAnnualSpendUsd:r,effectiveCompliancePct:i,tcoReductionPct:s,fiveDomainCoveragePass:a,c2paGovernancePass:a&&i>=99.5,verdictBadge:a?`🏆 HISTORIC 200TH WORKBENCH MILESTONE LOCKED (-${s}% TCO · ${i}% Compliance · +$${(e.netAnnualSavingsUsd/1e6).toFixed(2)}M/yr Saved)`:`FRAGMENTED SAAS SILOS ($${(e.siloAnnualSpendUsd/1e6).toFixed(2)}M/yr Spend · 41.6% Brand/Text Drift · No Unified Governance!)`}}const v=document.querySelector("#app");let u="global-omni-retail-and-ecommerce-group",p="unified-200th-milestone-reference-hub";function S(){const n=b(u,p),t=n.profile,e=p==="unified-200th-milestone-reference-hub";v.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">🏆 HISTORIC 200TH WORKBENCH MILESTONE (3+7+38×5 = 200)! · Round 411 · Domain 1 (Enterprise AIGC Visual & Video Reference Architecture & TCO Decision Hub)</span>
        <h1>🏆 历史性第 200 项工作台大满贯：2026 企业级 AIGC 视觉与视频生产中台全景选型与 TCO 决策总台</h1>
        <p class="wb-subtitle">礼赞 <strong>Generative Visual Lab</strong> 达成历史性 <strong>第 200 座（第一层 3 座 + 第二层 7 座 + 第三层五大企业域 38×5 = 190 座，总计 200 座！）</strong> 可交互架构工作台与 <strong>400 篇中英双语技术选型文档</strong> 大满贯里程碑！本总台面向 Cloud & AI Solution Architect 提供一站式企业视觉中台顶层设计：告别各部门各自采购高价黑盒 SaaS 导致的年耗资 $${(t.siloAnnualSpendUsd/1e6).toFixed(2)}M 与 41.6% 品牌/文字失真，通过统一多模型路由网关、受控生成与确定性代码合成，将全集团视觉中台 TCO 削减 -${n.tcoReductionPct}%（年化净省 +$${(t.netAnnualSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${n.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Enterprise Profile and Platform Architecture Controls">
      <div class="control-group">
        <span class="control-label">1. 选择行业企业画像与视觉中台负载组合 (Enterprise Industry Blueprint Profile):</span>
        <div class="btn-row">
          ${Object.keys(c).map(a=>`
            <button type="button" class="scenario-btn ${u===a?"active":""}" data-scenario="${a}">
              ${c[a].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换部门级烟囱式采购与第 200 项里程碑统一参考架构 (Platform Governance & Stack Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="fragmented-silo-pure-saas-apis">
            ❌ 传统烟囱模式：各部门分散裸调高价闭源 API ($${(t.siloAnnualSpendUsd/1e6).toFixed(2)}M/年 · 无温池复用 · 像素直出文字乱码 · 零 C2PA 溯源)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="unified-200th-milestone-reference-hub">
            ✅ 第 200 项里程碑统一架构：5大域智能路由 + 受控 ComfyUI/Wan2.1 + Remotion/SVG 确定性合成 (-${n.tcoReductionPct}% TCO)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core 200th Milestone Platform KPIs">
      <div class="kpi-card">
        <span class="kpi-title">全集团年度 AIGC 视觉中台总成本 (Annual Platform TCO)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-tco">$${(n.effectiveAnnualSpendUsd/1e6).toFixed(2)}M / yr (-${n.tcoReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">对比分散采购公有 SaaS 账单 $${(t.siloAnnualSpendUsd/1e6).toFixed(2)}M / yr</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">品牌 VI、商品几何与 C2PA 合规率 (Governance & Fidelity)</span>
        <strong class="kpi-value ${n.c2paGovernancePass?"good":"bad"}" id="kpi-compliance">${n.effectiveCompliancePct.toFixed(2)}%</strong>
        <span class="kpi-sub">${e?"LoRA/ControlNet 锁几何 + 矢量层锁文字 + HSM C2PA v2.1":"缺乏统一提示词护栏与分层矢量排版，废片返工率高达 41.6%"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">全仓架构资产里程碑完备度 (Lab Asset Completeness)</span>
        <strong class="kpi-value good" id="kpi-milestone">200 Studios · 400 Guides</strong>
        <span class="kpi-sub">第一层 3 + 第二层 7 + 第三层 38×5 = 200 座工作台完美对齐</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">企业年化净省算力与制作总预算 (Net Annual Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(t.netAnnualSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">献礼第 200 座交互式架构工作台历史性大满贯！</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>🏆 第 200 项里程碑：企业级 AIGC 视觉与视频五域协同参考架构全景图 (5-Domain Reference Blueprint)</h2>
          <span class="tag">🏆 200th Workbench (3+7+38×5) · 400 Bilingual Docs</span>
        </div>
        <canvas id="hub-200-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>五大业务域黄金选型标尺与 TCO 拐点总表 (SA Master Cheat Sheet)</h2>
        <ul class="audit-list">
          <li><span>域 1 · 图像与视频大模型网关拐点:</span> <strong>图像 ≥4.5万张/月、视频 ≥4,200条/月切 AKS 自建 (Flux.1/Wan2.1) + 15% 旗舰 API</strong></li>
          <li><span>域 2 · 电商主图、试衣与多语种海报:</span> <strong>商品/试衣走 BiRefNet + CatVTON + IC-Light；16国海报走 Clean-Plate + Satori 矢量层</strong></li>
          <li><span>域 3 · 数字人、视频译制与千人千面:</span> <strong>合规选 Azure Speech Avatar；走量选 MuseTalk 256px ROI + 94% Closed-GOP 拼接</strong></li>
          <li><span>域 4 · 影视分镜 Previs 与 Web 3D:</span> <strong>分镜选 3D 粗模 + 三视图 LoRA + ConsisID；Web 3D 按交互分流 Three.js GLB 与 SOGS 3DGS</strong></li>
          <li><span>域 5 · 可编程视频与品牌 C2PA 治理:</span> <strong>AIGC 写实 B-Roll + Remotion/Motion Canvas 零差错 UI/图表 + C2PA 双重水印</strong></li>
          <li><span>当前行业推荐图像/视频底座:</span> <strong>${t.recommendedVideoStack}</strong></li>
          <li><span>企业年化净省总预算 (Net TCO ROI):</span> <strong>+$${t.netAnnualSavingsUsd.toLocaleString("en-US")} / Yr (200th Milestone!)</strong></li>
        </ul>
      </div>
    </main>
  `,A(),g(n)}function A(){document.querySelectorAll(".scenario-btn").forEach(n=>{n.addEventListener("click",()=>{u=n.dataset.scenario,S()})}),document.querySelectorAll(".mode-btn").forEach(n=>{n.addEventListener("click",()=>{p=n.dataset.mode,S()})})}function g(n){const t=document.querySelector("#hub-200-canvas");if(!t)return;const e=t.getContext("2d"),a=t.width,r=t.height,i=n.profile,s=n.mode==="unified-200th-milestone-reference-hub";e.fillStyle="#070b14",e.fillRect(0,0,a,r),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. The 200-Workbench Enterprise AIGC Reference Architecture (3 Core + 7 Frontier + 38×5 Enterprise)",22,26);const m=[{title:"D1: AI Gateway (38)",sub:"4.2k Video / 45k Img",desc:"AKS Wan2.1/Flux + Sora/Veo/GPT Burst",w:146,color:"#38bdf8"},{title:"D2: E-Commerce (38)",sub:"99.2% SKU Lock",desc:"CatVTON + IC-Light + Satori SVG Ads",w:146,color:"#10b981"},{title:"D3: Avatar/Video (38)",sub:"$0.03–$0.14/min",desc:"Azure Avatar + MuseTalk + 94% GOP",w:146,color:"#f59e0b"},{title:"D4: 3D & Previs (38)",sub:"98.4% Continuity",desc:"3D Blockout LoRA + Three.js & 3DGS",w:146,color:"#a855f7"},{title:"D5: Code & C2PA (38)",sub:"100% Exact UI/Text",desc:"Remotion + Motion Canvas + C2PA v2.1",w:156,color:"#ec4899"}];let l=22;m.forEach(o=>{e.fillStyle=s?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=s?o.color:"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(l,42,o.w,112,10),e.fill(),e.stroke(),e.fillStyle=s?o.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(o.title,l+10,68),e.fillStyle="#f8fafc",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText(o.sub,l+10,92),e.fillStyle="#94a3b8",e.font="9.8px Inter, system-ui, sans-serif",e.fillText(o.desc,l+10,116),l+=o.w+9}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(`2. Active Enterprise Blueprint: ${i.titleEn}`,22,188);const f=[{label:`Image & Merchandising Stack: ${i.recommendedImageStack}`,color:"#10b981"},{label:`Video & Programmatic Stack: ${i.recommendedVideoStack}`,color:"#38bdf8"},{label:`Avatar, Web 3D & Governance Stack: ${i.recommendedAvatarAndWebStack}`,color:"#a855f7"}];let d=204;f.forEach(o=>{e.fillStyle="#0f172a",e.strokeStyle=s?o.color:"#ef4444",e.lineWidth=1.8,e.beginPath(),e.roundRect(22,d,776,42,8),e.fill(),e.stroke(),e.fillStyle=s?"#f8fafc":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(o.label,36,d+26),d+=50}),e.fillStyle=s?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(s?`🏆 Historic 200th Workbench Complete: Annual Spend Cut from $${(i.siloAnnualSpendUsd/1e6).toFixed(2)}M to $${(i.unifiedHubAnnualSpendUsd/1e6).toFixed(2)}M (-${n.tcoReductionPct}% · Net Save +$${(i.netAnnualSavingsUsd/1e6).toFixed(2)}M/yr)`:`✕ Uncoordinated Departmental SaaS Silos Burn $${(i.siloAnnualSpendUsd/1e6).toFixed(2)}M/yr with 41.6% Brand/Typography Rework!`,22,380)}S();
