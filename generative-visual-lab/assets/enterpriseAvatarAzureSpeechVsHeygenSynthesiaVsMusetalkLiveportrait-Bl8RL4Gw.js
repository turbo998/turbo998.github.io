import"./modulepreload-polyfill-B5Qt9EMX.js";const c={"multilingual-lms-training-50k-min":{id:"multilingual-lms-training-50k-min",titleZh:"企业 40语种合规培训与产品学院（月产 50,000 分钟 · Azure Speech Avatar + Remotion 矢量课件合批）",titleEn:"40-Language LMS Training & Onboarding (50,000 Min/Mo · Azure Speech Avatar + Vector Slide Track)",monthlyMinutes:5e4,pureSaasCostPerMinUsd:2.4,hybridBlendedCostPerMinUsd:.18,selfHostedMuseTalkCostPerMinUsd:.04,saasRealtimeWebrtcLatencyMs:1450,hybridRealtimeWebrtcLatencyMs:360,lipSyncLseConfidenceScore:9.1,annualEnterpriseSavingsUsd:1332e3},"realtime-webrtc-customer-support-avatar":{id:"realtime-webrtc-customer-support-avatar",titleZh:"7×24 银行/政务 WebRTC 实时对话客服数字人（月均 120,000 分钟 · 340ms 首包口型驱动 + 倾听态视频环复用）",titleEn:"24×7 Real-Time WebRTC Banking/Gov Support Avatar (120,000 Min/Mo · 340ms Lip-Sync + Idle Loop)",monthlyMinutes:12e4,pureSaasCostPerMinUsd:1.8,hybridBlendedCostPerMinUsd:.09,selfHostedMuseTalkCostPerMinUsd:.03,saasRealtimeWebrtcLatencyMs:1680,hybridRealtimeWebrtcLatencyMs:340,lipSyncLseConfidenceScore:9.2,annualEnterpriseSavingsUsd:2462400},"personalized-sales-outreach-100k-videos":{id:"personalized-sales-outreach-100k-videos",titleZh:"10万封千人千面 B2B 销售/财富顾问视频信（月产 150,000 分钟 · 自建 LivePortrait/MuseTalk $0.03/min 嘴部局部重绘）",titleEn:"100k Personalized B2B Sales & Wealth Advisor Videos (150,000 Min/Mo · Self-Hosted MuseTalk ROI Patch)",monthlyMinutes:15e4,pureSaasCostPerMinUsd:2.2,hybridBlendedCostPerMinUsd:.06,selfHostedMuseTalkCostPerMinUsd:.03,saasRealtimeWebrtcLatencyMs:1520,hybridRealtimeWebrtcLatencyMs:320,lipSyncLseConfidenceScore:9,annualEnterpriseSavingsUsd:3852e3}};function f(t,s){const e=c[t],i=s==="tiered-azure-avatar-plus-self-hosted-musetalk-liveportrait",o=i?e.hybridBlendedCostPerMinUsd:e.pureSaasCostPerMinUsd,a=i?e.hybridRealtimeWebrtcLatencyMs:e.saasRealtimeWebrtcLatencyMs,n=i?Number(((e.pureSaasCostPerMinUsd-e.hybridBlendedCostPerMinUsd)/e.pureSaasCostPerMinUsd*100).toFixed(1)):0;return{workload:e,choice:s,effectiveCostPerMinUsd:o,effectiveLatencyMs:a,costReductionPct:n,sub500msInteractivePass:a<=450,privateVnetCompliancePass:i,verdictBadge:i?`AZURE AVATAR + MUSETALK/LIVEPORTRAIT LOCKED ($${o.toFixed(2)}/Min · ${a}ms WebRTC · -${n}% TCO)`:`HIGH SAAS MINUTE TAX ($${e.pureSaasCostPerMinUsd.toFixed(2)}/Min) & ${e.saasRealtimeWebrtcLatencyMs}MS CONVERSATION LAG!`}}const b=document.querySelector("#app");let d="multilingual-lms-training-50k-min",p="tiered-azure-avatar-plus-self-hosted-musetalk-liveportrait";function u(){const t=f(d,p),s=t.workload,e=p==="tiered-azure-avatar-plus-self-hosted-musetalk-liveportrait";b.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 403 · 192nd Interactive Workbench · Domain 3 (Azure AI Speech Avatar vs HeyGen / Synthesia vs Open-Source MuseTalk / LivePortrait Studio)</span>
        <h1>企业数字人播报与实时交互 Avatar 选型工作台：Azure AI Speech Avatar vs HeyGen / Synthesia vs 自建 MuseTalk / LivePortrait</h1>
        <p class="wb-subtitle">为企业培训、智能客服与全球化营销团队提供数字人技术栈选型指南：解决全量采购外部公有 SaaS 数字人 API（$1.80–$2.40/分钟）在大规模课程与千人千面视频中带来的百万美元账单、实时对话首包延迟高达 ${s.saasRealtimeWebrtcLatencyMs}ms、以及高管人脸生物特征无法私有化闭环的痛点，通过“Azure AI Speech Avatar（企业级 SLA、水印合规与 40+ 语种神经语音）+ 自建 TensorRT MuseTalk / LivePortrait 256×256 嘴部局部重绘（$${s.selfHostedMuseTalkCostPerMinUsd.toFixed(2)}/min，${s.hybridRealtimeWebrtcLatencyMs}ms 实时 WebRTC）”，将单分钟均摊成本降至 $${s.hybridBlendedCostPerMinUsd.toFixed(2)}（-${t.costReductionPct}% TCO，年省 +$${(s.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Avatar Workload and Stack Selection Controls">
      <div class="control-group">
        <span class="control-label">1. 选择企业数字人业务场景与月度分钟规模 (Enterprise Avatar Production Scenario):</span>
        <div class="btn-row">
          ${Object.keys(c).map(i=>`
            <button type="button" class="scenario-btn ${d===i?"active":""}" data-scenario="${i}">
              ${c[i].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换数字人部署与架构选型方案 (Avatar Hosting & Rendering Architecture):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="unconditional-saas-avatar-api-only">
            ❌ 方案 A：100% 外部高单价 SaaS API 直出全帧 ($${s.pureSaasCostPerMinUsd.toFixed(2)}/分钟 · 实时对话延迟 ${s.saasRealtimeWebrtcLatencyMs}ms · 倾听态全额计费)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="tiered-azure-avatar-plus-self-hosted-musetalk-liveportrait">
            ✅ 方案 B：Azure Speech Avatar (企业合规底座) + 自建 MuseTalk/LivePortrait 嘴部 ROI 重绘 ($${s.hybridBlendedCostPerMinUsd}/分钟 · ${s.hybridRealtimeWebrtcLatencyMs}ms)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Enterprise Avatar Selection KPIs">
      <div class="kpi-card">
        <span class="kpi-title">单分钟数字人视频综合成本 (Effective Cost / Minute)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-cost">$${t.effectiveCostPerMinUsd.toFixed(2)} / min (-${t.costReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">月产 ${s.monthlyMinutes.toLocaleString("en-US")} 分钟 · 自建 MuseTalk 低至 $${s.selfHostedMuseTalkCostPerMinUsd.toFixed(2)}/min</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">WebRTC 实时对话首包口型延迟 (Interactive Lip-Sync Latency)</span>
        <strong class="kpi-value ${t.sub500msInteractivePass?"good":"bad"}" id="kpi-latency">${t.effectiveLatencyMs} ms</strong>
        <span class="kpi-sub">${e?"流式 TTS Viseme 音素驱动 + 256×256 嘴部 ROI TensorRT 推理":"等待整句音频合成与云端全帧渲染导致明显抢话卡顿"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">唇形同步与生物特征合规 (LSE-C Lip Sync & Governance)</span>
        <strong class="kpi-value ${t.privateVnetCompliancePass?"good":"bad"}" id="kpi-compliance">LSE-C ${s.lipSyncLseConfidenceScore} · VNet Locked</strong>
        <span class="kpi-sub">Azure Responsible AI 活体授权验证 + C2PA 内容溯源签名</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">企业数字人中台年化净省预算 (Annual Enterprise Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(s.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">卸载 65% 静默倾听态 GPU 计费与重复背景重渲染</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>三大数字人技术栈横向选型 (Azure AI Speech Avatar vs HeyGen / Synthesia vs 自建 MuseTalk / LivePortrait) 与局部口型合成画布</h2>
          <span class="tag">${s.monthlyMinutes.toLocaleString("en-US")} Min/Mo · ${t.effectiveLatencyMs}ms WebRTC</span>
        </div>
        <canvas id="avatar-select-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>三大数字人路线能力边界与架构审计明细 (Avatar Stack Audit)</h2>
        <ul class="audit-list">
          <li><span>1. Azure AI Speech Avatar (企业云原生首选):</span> <strong>Azure 订阅内 VNet 合规、70+ 语种 400+ 神经语音、支持 WebRTC 实时流與批量合成</strong></li>
          <li><span>2. HeyGen / Synthesia (开箱即用营销 SaaS):</span> <strong>适合 &lt;500 分钟/月市场部自助剪辑；单价高 ($1.80–$2.40/min) 且数据出域</strong></li>
          <li><span>3. 自建 MuseTalk / LivePortrait (大规模降本引擎):</span> <strong>仅重绘 256×256 嘴部/面部 ROI，单张 L40S 实时跑 45fps ($0.03–$0.04/min)</strong></li>
          <li><span>实时对话“倾听态”零算力卸载机制:</span> <strong>用户说话时播放 CDN 预烘焙微表情点头循环流，节省 65% 实时 GPU 计费</strong></li>
          <li><span>培训课件分轨合成 (Slide + PiP Avatar):</span> <strong>PPT/架构图走 4K 矢量 SVG 轨，数字人仅占右下角画中画，杜绝课件文字模糊</strong></li>
          <li><span>端到端语音打断与首帧口型响应:</span> <strong>${t.effectiveLatencyMs} ms (Silero VAD 打断 + 流式音素对齐)</strong></li>
          <li><span>企业年化净省数字人订阅与算力费:</span> <strong>+$${s.annualEnterpriseSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,y(),S(t)}function y(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{d=t.dataset.scenario,u()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{p=t.dataset.mode,u()})})}function S(t){const s=document.querySelector("#avatar-select-canvas");if(!s)return;const e=s.getContext("2d"),i=s.width,o=s.height,a=t.workload,n=t.choice==="tiered-azure-avatar-plus-self-hosted-musetalk-liveportrait";e.fillStyle="#070b14",e.fillRect(0,0,i,o),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Enterprise Avatar Technology Comparison: Azure AI Speech Avatar vs HeyGen/Synthesia vs Self-Hosted MuseTalk",22,26);const v=[{title:"Azure AI Speech Avatar (Managed Cloud)",sub:"Enterprise SLA · VNet Privacy · 70+ Locales",desc:"Best for regulated banking/gov & official exec avatars",w:256,color:"#38bdf8"},{title:"HeyGen / Synthesia (Turnkey SaaS)",sub:"No-Code Web Editor · $1.80–$2.40 / min",desc:"Best for <500 min/mo self-serve marketing clips",w:242,color:"#f59e0b"},{title:"Self-Hosted MuseTalk / LivePortrait",sub:"256×256 Viseme ROI · $0.03–$0.04 / min",desc:"Best for 50k–150k min/mo batch & 340ms WebRTC",w:254,color:"#10b981"}];let l=22;v.forEach(r=>{e.fillStyle=n?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=n?r.color:"#ef4444",e.lineWidth=2.2,e.beginPath(),e.roundRect(l,42,r.w,112,10),e.fill(),e.stroke(),e.fillStyle=n?r.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(r.title,l+12,68),e.fillStyle="#f8fafc",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(r.sub,l+12,94),e.fillStyle="#94a3b8",e.font="10.5px Inter, system-ui, sans-serif",e.fillText(r.desc,l+12,118),l+=r.w+12}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Production Cost & Latency Optimization: 256×256 Viseme ROI Inpainting + Idle Listening Loop Offload",22,188),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.25)",e.lineWidth=1.5,e.beginPath(),e.roundRect(22,202,776,152,10),e.fill(),e.stroke(),e.strokeStyle="#38bdf8",e.lineWidth=1.8,e.strokeRect(42,218,220,120),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText("4K Static / Vector Course Slide (0 GPU Cost)",50,240),e.strokeStyle="#10b981",e.strokeRect(184,266,68,64),e.fillStyle="rgba(16, 185, 129, 0.28)",e.fillRect(202,298,32,18),e.fillStyle="#34d399",e.font="bold 10px Inter, system-ui, sans-serif",e.fillText("256px ROI",192,260),e.fillStyle="#f8fafc",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText("• Why Full-Frame Diffusion Avatar Fails at Scale:",286,238),e.fillStyle="#fca5a5",e.font="11.5px Inter, system-ui, sans-serif",e.fillText(`  Re-renders 2,073,600 pixels/frame even when only the lips move ($${a.pureSaasCostPerMinUsd.toFixed(2)}/min, ${a.saasRealtimeWebrtcLatencyMs}ms lag)`,286,260),e.fillStyle="#f8fafc",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText("• Why Hybrid Azure Avatar + MuseTalk 256×256 ROI Wins:",286,294),e.fillStyle="#34d399",e.font="11.5px Inter, system-ui, sans-serif",e.fillText(`  Inpaint only 65,536 mouth pixels (31× fewer pixels) + CDN Idle Loop → $${a.hybridBlendedCostPerMinUsd.toFixed(2)}/min & ${a.hybridRealtimeWebrtcLatencyMs}ms WebRTC`,286,316),e.fillStyle=n?"#38bdf8":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(n?`✓ Hybrid Avatar Architecture Locked: $${a.hybridBlendedCostPerMinUsd.toFixed(2)}/min (-${t.costReductionPct}%) · ${a.hybridRealtimeWebrtcLatencyMs}ms WebRTC · +$${(a.annualEnterpriseSavingsUsd/1e6).toFixed(2)}M/yr Saved`:`✕ Unconditional SaaS Full-Frame Billing Costs $${(a.monthlyMinutes*a.pureSaasCostPerMinUsd/1e3).toFixed(0)}k/mo and Suffers ${a.saasRealtimeWebrtcLatencyMs}ms Lag`,22,380)}u();
