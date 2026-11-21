import"./modulepreload-polyfill-B5Qt9EMX.js";const d={"oncology-phase3-double-blind":{id:"oncology-phase3-double-blind",titleZh:"肿瘤三期随机双盲试验（2:1 随机分组 · 150mg SC q2w 皮下给药 · 85国 IRB 哈希锁死）",titleEn:"Phase III Oncology 2:1 Double-Blind Trial (150mg SC q2w Regimen · 85-Country IRB SHA-256 Lock)",protocolIdAndTitle:"ONC-309 Phase III Immunotherapy (85 Countries · 18,400 Patients)",approvedDosageRegimen:"150 mg Subcutaneous Injection Every 14 Days (q2w ± 2d Window)",irbApprovalSha256:"sha256:8f94c2e1...b73a (FDA 21 CFR Part 11 & ICH E6(R3) Sealed)",languagesCount:85,closedGopReusePct:94.1,naiveComprehensionScorePct:52.4,hybridComprehensionScorePct:96.8,naivePatientDropoutPct:28.4,hybridPatientDropoutPct:9.6,unitCostPerPatientUsd:.0045,annualTrialSavingsUsd:186e5},"pediatric-rare-disease-caregiver":{id:"pediatric-rare-disease-caregiver",titleZh:"儿童罕见病双语知情同意与父母看护指南（按体重 mg/kg 精确剂量表 + 分龄儿童动画赞同书 Assent）",titleEn:"Pediatric Rare-Disease Caregiver eConsent & Child Assent (Weight-Based mg/kg Vector Dosage Lock)",protocolIdAndTitle:"RARE-204 Pediatric Enzyme Replacement (42 Countries · Age 6–12 Assent)",approvedDosageRegimen:"2.5 mg/kg IV Infusion Over 120 Mins (Weight-Band Vector Table)",irbApprovalSha256:"sha256:4a19d0f8...e91c (Pediatric IRB & EMA PDCO Sealed)",languagesCount:42,closedGopReusePct:93.4,naiveComprehensionScorePct:48.6,hybridComprehensionScorePct:97.2,naivePatientDropoutPct:31.2,hybridPatientDropoutPct:8.8,unitCostPerPatientUsd:.0048,annualTrialSavingsUsd:164e5},"cardio-decentralized-ecoa-diary":{id:"cardio-decentralized-ecoa-diary",titleZh:"心血管远程去中心化试验 (DCT) 与每日 eCOA 电子量表辅导（40万受试者 · 漏填率从 34% 降至 4.2%）",titleEn:"Cardiovascular Decentralized Trial (DCT) & Daily eCOA Diary Coaching (400k Patients · 95.8% Compliance)",protocolIdAndTitle:"CV-412 Global Outcomes DCT (64 Countries · 400,000 Patients)",approvedDosageRegimen:"75 mg Oral Daily + Morning eCOA Symptom Diary & ECG Patch Sync",irbApprovalSha256:"sha256:c72b51a4...309d (FDA DCT Guidance & GDPR Sealed)",languagesCount:64,closedGopReusePct:95.2,naiveComprehensionScorePct:56,hybridComprehensionScorePct:96.4,naivePatientDropoutPct:26.8,hybridPatientDropoutPct:8.4,unitCostPerPatientUsd:.0032,annualTrialSavingsUsd:214e5}};function h(i,t){const e=d[i],o=t==="irb-locked-closed-gop-teachback-econsent";return{cohort:e,mode:t,effectiveComprehensionPct:o?e.hybridComprehensionScorePct:e.naiveComprehensionScorePct,effectiveDropoutPct:o?e.hybridPatientDropoutPct:e.naivePatientDropoutPct,effectiveDosageFidelityPct:o?100:58.4,cfrPart11AuditPass:o,verdictBadge:o?`21 CFR PART 11 & ICH E6(R3) LOCKED (${e.hybridComprehensionScorePct.toFixed(1)}% Comprehension · ${e.hybridPatientDropoutPct.toFixed(1)}% Dropout)`:"IRB SCRIPT TAMPERING & 28.4% DROPOUT RISK (38-Page PDF / Unverified AI Video Invalidates Consent!)"}}const v=document.querySelector("#app");let p="oncology-phase3-double-blind",u="irb-locked-closed-gop-teachback-econsent";function g(){const i=h(p,u),t=i.cohort,e=u==="irb-locked-closed-gop-teachback-econsent";v.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 388 · 177th Curated Workbench · Domain 3 (Global Phase III Clinical Trial eConsent & eCOA Multilingual Video Studio)</span>
        <h1>全球多中心三期临床试验电子知情同意 (eConsent) 与 eCOA 多语种合规视频工作台</h1>
        <p class="wb-subtitle">终结 38页晦涩 PDF 知情同意书导致受试者误解双盲随机/安慰剂而中途脱落（脱落率 28.4%，每例损失 $42k）、以及纯 AI 视频扩散篡改 IRB 审批给药剂量违反 FDA 21 CFR Part 11 的痛点：结合 SHA-256 伦理审批锁、94.1% 85语种 Closed-GOP 母版与交互式 Teach-Back 理解力回测，将脱落率压至 9.6%（单项目省 +$18.6M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${i.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Clinical Cohort and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择全球多中心临床试验队列 (Phase III Clinical Trial Cohort):</span>
        <div class="btn-row">
          ${Object.keys(d).map(o=>`
            <button type="button" class="scenario-btn ${p===o?"active":""}" data-scenario="${o}">
              ${d[o].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换受试者知情同意与 eCOA 宣教管线 (eConsent & eCOA Video Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="38page-pdf-or-unverified-diffusion">
            ❌ 传统基线：38页纸质 PDF 或未受控 AI 视频扩散 (理解率仅 52.4% + 篡改 IRB 审批剂量文本)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="irb-locked-closed-gop-teachback-econsent">
            ✅ 推荐架构：IRB SHA-256 矢量剂量锁 + 94.1% 85语种 Closed-GOP + Teach-Back 回测门禁
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Clinical Trial eConsent KPIs">
      <div class="kpi-card">
        <span class="kpi-title">受试者知情理解回测通过率 (Teach-Back Pass)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-comp">${i.effectiveComprehensionPct.toFixed(1)}%</strong>
        <span class="kpi-sub">6级通俗医学图解 · 对比 38页 PDF ${t.naiveComprehensionScorePct.toFixed(1)}%</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">三期试验受试者中途脱落率 (Trial Dropout Rate)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-dropout">${i.effectiveDropoutPct.toFixed(1)}%</strong>
        <span class="kpi-sub">对比传统基线 ${t.naivePatientDropoutPct.toFixed(1)}% 脱落率 ($42k/例替补成本)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">IRB 给药方案与 21 CFR Part 11 合规 (Regulatory Lock)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-fidelity">${i.effectiveDosageFidelityPct.toFixed(1)}% · ${t.languagesCount} 语种</strong>
        <span class="kpi-sub">${t.irbApprovalSha256.slice(0,32)}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">单受试者成本与单试验净省 (Trial Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">$${t.unitCostPerPatientUsd.toFixed(4)} · +$${(t.annualTrialSavingsUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">缩短三期入组与随访周期 3.8 个月</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>ICH E6(R3) 6级通俗随机双盲图解 + 患者专属随访日历矢量层 + Teach-Back 必答门禁画布</h2>
          <span class="tag">${t.protocolIdAndTitle}</span>
        </div>
        <canvas id="clinical-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>FDA 21 CFR Part 11 电子签名与伦理审计明细 (GCP & IRB Audit Trail)</h2>
        <ul class="audit-list">
          <li><span>临床试验方案编号:</span> <strong>${t.protocolIdAndTitle}</strong></li>
          <li><span>IRB/IEC 锁死给药方案:</span> <strong>${t.approvedDosageRegimen}</strong></li>
          <li><span>伦理委员会审批哈希签名:</span> <strong><code>${t.irbApprovalSha256}</code></strong></li>
          <li><span>85国多语种 Closed-GOP 复用:</span> <strong>${e?`${t.closedGopReusePct.toFixed(1)}% 认证片段复用 ($${t.unitCostPerPatientUsd.toFixed(4)}/人)`:"0.0% (自由生成违反伦理一致性)"}</strong></li>
          <li><span>双盲/安慰剂 Teach-Back 理解率:</span> <strong>${t.naiveComprehensionScorePct.toFixed(1)}% → ${i.effectiveComprehensionPct.toFixed(1)}%</strong></li>
          <li><span>受试者随访中途脱落率:</span> <strong>${t.naivePatientDropoutPct.toFixed(1)}% → ${i.effectiveDropoutPct.toFixed(1)}% (-66.2%)</strong></li>
          <li><span>单项目节省招募替补与延期成本:</span> <strong>+$${t.annualTrialSavingsUsd.toLocaleString("en-US")} / Trial</strong></li>
        </ul>
      </div>
    </main>
  `,C(),y(i)}function C(){document.querySelectorAll(".scenario-btn").forEach(i=>{i.addEventListener("click",()=>{p=i.dataset.scenario,g()})}),document.querySelectorAll(".mode-btn").forEach(i=>{i.addEventListener("click",()=>{u=i.dataset.mode,g()})})}function y(i){const t=document.querySelector("#clinical-canvas");if(!t)return;const e=t.getContext("2d"),o=t.width,f=t.height,l=i.cohort,a=i.mode==="irb-locked-closed-gop-teachback-econsent";e.fillStyle="#070b14",e.fillRect(0,0,o,f),e.fillStyle="#0f172a",e.strokeStyle=a?"rgba(56, 189, 248, 0.45)":"rgba(239, 68, 68, 0.5)",e.lineWidth=2,e.beginPath(),e.roundRect(22,18,776,232,12),e.fill(),e.stroke(),e.fillStyle="#1e293b",e.strokeStyle=a?"#10b981":"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(38,34,206,200,10),e.fill(),e.stroke(),e.fillStyle=a?"#38bdf8":"#f87171",e.beginPath(),e.arc(141,98,28,0,Math.PI*2),e.fill(),e.beginPath(),e.roundRect(93,136,96,56,20),e.fill(),e.fillStyle="#e2e8f0",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(a?`IRB-Sealed Narrator (${l.languagesCount} Langs)`:"Unverified Diffusion Avatar",48,216);const s=264;e.fillStyle="#f8fafc",e.font="bold 14px Inter, system-ui, sans-serif",e.fillText(a?`✓ IRB-Locked Protocol: ${l.protocolIdAndTitle}`:"✕ Unverified AI Video / 38-Page Dense Legal PDF (52.4% Comprehension)",s,46),e.fillStyle="#162033",e.strokeStyle=a?"#38bdf8":"#ef4444",e.lineWidth=1.5,e.beginPath(),e.roundRect(s,58,514,58,8),e.fill(),e.stroke(),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText(`Approved Regimen & SHA-256 Lock (${l.irbApprovalSha256}):`,s+12,78),e.fillStyle=a?"#34d399":"#fca5a5",e.font="bold 12.5px Inter, system-ui, sans-serif",e.fillText(a?l.approvedDosageRegimen:'Hallucinated Dosage: "1500mg?? q2d" [FDA 21 CFR Part 11 Violation!]',s+12,102),[{day:"Visit 1 (Day 1)",task:"2:1 Randomization + First Dose"},{day:"Visit 2 (Day 15 ±2d)",task:"q2w Injection + Blood Panel"},{day:"Daily eCOA Home",task:"60s Symptom Diary on Phone"}].forEach((n,P)=>{const c=s+P*174;e.fillStyle="#162033",e.strokeStyle=a?"#10b981":"#475569",e.beginPath(),e.roundRect(c,128,164,62,8),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(n.day,c+10,150),e.fillStyle="#cbd5e1",e.font="10.5px Inter, system-ui, sans-serif",e.fillText(n.task,c+10,174)}),e.fillStyle=a?"rgba(16, 185, 129, 0.2)":"rgba(239, 68, 68, 0.2)",e.beginPath(),e.roundRect(s,200,514,36,6),e.fill(),e.fillStyle=a?"#6ee7b7":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(a?"✓ Interactive Teach-Back Gate Passed (96.8%): Patient verified placebo & AE contact rules":"✕ No Interactive Teach-Back: 47.6% of patients sign PDF without understanding placebo arm!",s+12,223),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(`2. FDA 21 CFR Part 11 & ICH E6(R3) Compliant Closed-GOP Architecture (${l.closedGopReusePct.toFixed(1)}% Reuse)`,22,280);const b=[{name:"GOP 1–4: IRB-Approved Mechanism & Randomization (94.1% Shared Closed-GOP)",w:486,shared:!0},{name:"GOP 5: Patient Site Calendar & Weight Dose (5.9% Vector)",w:282,shared:!1}];let r=22;b.forEach(n=>{e.fillStyle=a?n.shared?"rgba(16, 185, 129, 0.24)":"rgba(56, 189, 248, 0.28)":"rgba(239, 68, 68, 0.24)",e.strokeStyle=a?n.shared?"#10b981":"#38bdf8":"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(r,294,n.w,52,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(n.name,r+12,325),r+=n.w+10}),e.fillStyle=a?"#34d399":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(a?`✓ SHA-256 IRB Audit Trail + 85-Language Closed-GOPs: Dropout cut 28.4% → ${i.effectiveDropoutPct.toFixed(1)}% (+$${(l.annualTrialSavingsUsd/1e6).toFixed(2)}M/trial saved)`:"✕ Uncontrolled AI video generation violates ICH E6(R3) GCP by altering approved medical risk disclosures",22,376)}g();
