import"./modulepreload-polyfill-B5Qt9EMX.js";const d={"brand-ip-mascot-and-spokesperson-lock":{id:"brand-ip-mascot-and-spokesperson-lock",titleZh:"品牌 IP 吉祥物与虚拟代言人跨镜头一致性（选 Fine-Tuned LoRA 权重 + FaceID/PulID · 98.8% 身份锁死 vs 提示词 54.2%）",titleEn:"Brand Mascot & Virtual Spokesperson Identity Lock (Select Fine-Tuned LoRA + PulID · 98.8% vs 54.2%)",recommendedControlMethod:"Fine-Tuned Rank-32 LoRA + PulID/FaceID + ControlNet Pose",promptOnlyConsistencyPct:54.2,governedConsistencyPct:98.8,promptOnlyBrandViolationRatePct:24.6,governedBrandViolationRatePct:.08,c2paSurvivalAfterSocialCompressPct:99.6,annualAvoidedBrandLegalRiskUsd:284e4},"global-campaign-vi-palette-and-style-lock":{id:"global-campaign-vi-palette-and-style-lock",titleZh:"全球营销活动零样本风格与品牌色板对齐（选 IP-Adapter Style + 调色盘 LUT 锁 · 免训练即插即用 · 97.6% 一致性）",titleEn:"Zero-Shot Campaign Mood & Brand VI Palette Lock (Select IP-Adapter Style + CIE Lab Palette LUT · 97.6%)",recommendedControlMethod:"Zero-Shot IP-Adapter Style Reference + CIE Lab VI Palette Clamp",promptOnlyConsistencyPct:61.5,governedConsistencyPct:97.6,promptOnlyBrandViolationRatePct:19.8,governedBrandViolationRatePct:.05,c2paSurvivalAfterSocialCompressPct:99.5,annualAvoidedBrandLegalRiskUsd:236e4},"eu-ai-act-c2pa-provenance-and-safety-gate":{id:"eu-ai-act-c2pa-provenance-and-safety-gate",titleZh:"欧盟 AI 法案 (Article 50) 合规与竞品侵权拦截（Azure AI Content Safety + VLM 商标红线扫描 + C2PA 双重水印）",titleEn:"EU AI Act Art. 50 Compliance & IP Safety Firewall (Azure AI Content Safety + VLM Audit + C2PA v2.1)",recommendedControlMethod:"Pre-Prompt Shield + Post-Gen VLM Brand/IP Critic + C2PA v2.1 Dual Watermark",promptOnlyConsistencyPct:58,governedConsistencyPct:99.4,promptOnlyBrandViolationRatePct:28.4,governedBrandViolationRatePct:.02,c2paSurvivalAfterSocialCompressPct:99.8,annualAvoidedBrandLegalRiskUsd:412e4}};function u(n,t){const e=d[n],s=t==="lora-ipadapter-content-safety-c2pa-gateway",r=s?e.governedConsistencyPct:e.promptOnlyConsistencyPct,i=s?e.governedBrandViolationRatePct:e.promptOnlyBrandViolationRatePct,o=s?e.c2paSurvivalAfterSocialCompressPct:0;return{scenario:e,stack:t,effectiveConsistencyPct:r,effectiveViolationRatePct:i,effectiveC2paSurvivalPct:o,brandConsistencyPass:r>=97,complianceZeroLeakPass:i<=.1&&o>=99,verdictBadge:s?`LORA/IP-ADAPTER + CONTENT SAFETY + C2PA LOCKED (${r.toFixed(1)}% Consistency · ${i.toFixed(2)}% Violation · C2PA ${o.toFixed(1)}%)`:`BRAND DRIFT (${e.promptOnlyConsistencyPct}% Consistency) & ${e.promptOnlyBrandViolationRatePct}% IP/SAFETY VIOLATIONS (0% C2PA!)`}}const C=document.querySelector("#app");let p="brand-ip-mascot-and-spokesperson-lock",v="lora-ipadapter-content-safety-c2pa-gateway";function y(){const n=u(p,v),t=n.scenario,e=v==="lora-ipadapter-content-safety-c2pa-gateway";C.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 405 · 194th Interactive Workbench · Domain 5 (LoRA vs IP-Adapter vs ControlNet + Azure AI Content Safety + C2PA v2.1 Governance Studio)</span>
        <h1>企业级 AIGC 品牌一致性管控与合规网关选型工作台：LoRA vs IP-Adapter + Azure AI Content Safety + C2PA 溯源</h1>
        <p class="wb-subtitle">为企业 AIGC 中台架构师厘清三大治理命题：① <strong>什么时候用微调 LoRA vs 零样本 IP-Adapter vs ControlNet？</strong> ② <strong>如何通过前置提示词防火墙（Prompt Shields）+ 后置多模态 VLM 审片拦截竞品商标与违禁画面？</strong> ③ <strong>如何通过 C2PA v2.1 显式清单 + 频域盲水印确保社媒压缩截屏后仍保留 ${t.c2paSurvivalAfterSocialCompressPct}% 可验证溯源？</strong> 告别纯提示词抽卡导致的 ${t.promptOnlyBrandViolationRatePct}% 品牌违规率，实现 ${t.governedConsistencyPct}% 品牌一致性（年化规避合规与公关风险 +$${(t.annualAvoidedBrandLegalRiskUsd/1e6).toFixed(2)}M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${n.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Brand Governance Scenario and Stack Controls">
      <div class="control-group">
        <span class="control-label">1. 选择企业品牌一致性与安全合规场景 (Enterprise Brand & Compliance Scenario):</span>
        <div class="btn-row">
          ${Object.keys(d).map(s=>`
            <button type="button" class="scenario-btn ${p===s?"active":""}" data-scenario="${s}">
              ${d[s].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换品牌控制与安全溯源网关架构 (Brand Consistency & Safety Gateway Stack):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-prompt-only-without-safety-c2pa">
            ❌ 传统基线：纯提示词描述无权重锁 (一致性仅 ${t.promptOnlyConsistencyPct}% · 品牌/竞品违规率 ${t.promptOnlyBrandViolationRatePct}% · 无 C2PA 凭证)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="lora-ipadapter-content-safety-c2pa-gateway">
            ✅ 推荐架构：${t.recommendedControlMethod} + Content Safety + C2PA 双水印 (${t.governedConsistencyPct}% 一致性)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Brand Governance & C2PA KPIs">
      <div class="kpi-card">
        <span class="kpi-title">跨批次角色/风格/VI 一致性得分 (Brand Consistency Score)</span>
        <strong class="kpi-value ${n.brandConsistencyPass?"good":"bad"}" id="kpi-consistency">${n.effectiveConsistencyPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${e?t.recommendedControlMethod:`仅靠自然语言提示词无法锁死吉祥物五官与品牌标准色 (${t.promptOnlyConsistencyPct}%)`}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">品牌 VI 偏色与竞品侵权漏检率 (Brand/IP Violation Rate)</span>
        <strong class="kpi-value ${n.complianceZeroLeakPass?"good":"bad"}" id="kpi-violation">${n.effectiveViolationRatePct.toFixed(2)}%</strong>
        <span class="kpi-sub">Azure AI Content Safety + VLM 品牌规范自动审片拦截</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">微信/抖音转码压缩后 C2PA 溯源存活率 (C2PA Survival)</span>
        <strong class="kpi-value ${n.complianceZeroLeakPass?"good":"bad"}" id="kpi-c2pa">${n.effectiveC2paSurvivalPct.toFixed(1)}%</strong>
        <span class="kpi-sub">JUMBF 元数据签名 + DWT/SSL 频域隐形水印软绑定</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">年化规避版权纠纷与返工损失 (Annual Governance ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(t.annualAvoidedBrandLegalRiskUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">满足欧盟 AI 法案第 50 条与国内深度合成标识强制规范</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>LoRA vs IP-Adapter vs ControlNet 选型边界与企业级五关合规流水线 (Pre-Prompt → Model Lock → VLM QA → C2PA) 画布</h2>
          <span class="tag">${t.recommendedControlMethod}</span>
        </div>
        <canvas id="brand-gov-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>品牌一致性控制与安全溯源选型明细 (Governance Stack Audit)</h2>
        <ul class="audit-list">
          <li><span>1. 什么时候选微调 LoRA (Rank 16–64):</span> <strong>固定品牌 IP 吉祥物、专属虚拟代言人或特定工业产品结构 (需 20–50 张干净图训练)</strong></li>
          <li><span>2. 什么时候选零样本 IP-Adapter / PulID:</span> <strong>临时参考某张情绪板风格、光影色调或单张人像免训练秒级换装 (0 训练成本)</strong></li>
          <li><span>3. 什么时候选 ControlNet (Depth/Canny/Pose):</span> <strong>严格锁定画面构图、人物动作骨架、包装盒折线或建筑透视直线</strong></li>
          <li><span>4. 前置与后置双层安全护栏:</span> <strong>前置 Azure Prompt Shields 防越狱 + 后置 VLM 检查竞品商标/手指畸形/VI 色差</strong></li>
          <li><span>5. C2PA v2.1 双重数字内容凭证:</span> <strong>显式 JUMBF ハッシュ清单 + 抗平台剥离的频域盲水印 (Soft Binding 存活率 ${t.c2paSurvivalAfterSocialCompressPct}%)</strong></li>
          <li><span>当前场景推荐控制栈:</span> <strong>${t.recommendedControlMethod}</strong></li>
          <li><span>企业年化规避合规罚单与废片返工:</span> <strong>+$${t.annualAvoidedBrandLegalRiskUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,A(),m(n)}function A(){document.querySelectorAll(".scenario-btn").forEach(n=>{n.addEventListener("click",()=>{p=n.dataset.scenario,y()})}),document.querySelectorAll(".mode-btn").forEach(n=>{n.addEventListener("click",()=>{v=n.dataset.mode,y()})})}function m(n){const t=document.querySelector("#brand-gov-canvas");if(!t)return;const e=t.getContext("2d"),s=t.width,r=t.height,i=n.scenario,o=n.stack==="lora-ipadapter-content-safety-c2pa-gateway";e.fillStyle="#070b14",e.fillRect(0,0,s,r),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Brand Consistency Control Selection: Fine-Tuned LoRA vs Zero-Shot IP-Adapter vs ControlNet",22,26);const f=[{title:"Fine-Tuned LoRA (Rank 16–64)",sub:"Identity Fidelity: 98.8% (25–50 Imgs)",desc:"Best for permanent brand mascots & hero SKUs",w:252,color:"#a855f7"},{title:"IP-Adapter / Style Reference",sub:"Zero-Shot Mood/Palette: 97.6% (1–3 Imgs)",desc:"Best for instant campaign style & lighting transfer",w:254,color:"#38bdf8"},{title:"ControlNet (Depth / Canny / Pose)",sub:"Spatial Geometry Lock: 99.5%",desc:"Best for exact layout, skeleton pose & CAD lines",w:246,color:"#10b981"}];let l=22;f.forEach(a=>{e.fillStyle=o?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.16)",e.strokeStyle=o?a.color:"#ef4444",e.lineWidth=2.2,e.beginPath(),e.roundRect(l,42,a.w,112,10),e.fill(),e.stroke(),e.fillStyle=o?a.color:"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(a.title,l+12,68),e.fillStyle="#f8fafc",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(a.sub,l+12,94),e.fillStyle="#94a3b8",e.font="10.5px Inter, system-ui, sans-serif",e.fillText(a.desc,l+12,118),l+=a.w+12}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. End-to-End Enterprise AIGC Safety, Brand VI Guardrail & C2PA v2.1 Provenance Pipeline",22,188);const P=[{step:"Gate 1: Pre-Gen Prompt Firewall (Azure AI Content Safety + Brand Blocklist)",detail:"Blocks competitor trademarks, celebrity names, NSFW & jailbreak injections in 18ms",color:"#38bdf8"},{step:"Gate 2: Controlled Generation (LoRA + IP-Adapter + ControlNet + CIE Lab Palette Clamp)",detail:`Locks ${i.governedConsistencyPct}% brand consistency & ΔE00 ≤ 1.5 corporate color accuracy`,color:"#a855f7"},{step:"Gate 3: Post-Gen Multimodal VLM Critic + Dual C2PA v2.1 Signing (JUMBF + Blind Watermark)",detail:`0.02% brand leak rate · ${i.c2paSurvivalAfterSocialCompressPct}% provenance survival after WeChat/TikTok compression`,color:"#10b981"}];let c=204;P.forEach(a=>{e.fillStyle="#0f172a",e.strokeStyle=o?a.color:"#ef4444",e.lineWidth=1.8,e.beginPath(),e.roundRect(22,c,776,44,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(a.step,34,c+18),e.fillStyle=o?a.color:"#fca5a5",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(a.detail,34,c+36),c+=52}),e.fillStyle=o?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(o?`✓ Enterprise AIGC Governance Locked: ${i.governedConsistencyPct}% Consistency · ${i.governedBrandViolationRatePct}% Violations · +$${(i.annualAvoidedBrandLegalRiskUsd/1e6).toFixed(2)}M/yr Risk Avoided`:`✕ Un-Governed Prompting Suffers ${i.promptOnlyBrandViolationRatePct}% Brand/Copyright Violations and Zero C2PA Provenance!`,22,382)}y();
