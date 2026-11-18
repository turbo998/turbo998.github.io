import"./modulepreload-polyfill-B5Qt9EMX.js";const L={agentic_vlm_critic_localized_inpaint_lock:{id:"agentic_vlm_critic_localized_inpaint_lock",label:"Agentic VLM BBox Critic + SAM-2 ROI Mask + Localized Inpainting Heal (c_heal = c_0/(1+u), Yield Lock = 1.0000×)",labelZh:"多模态 VLM 审片 Agent 缺陷定位 + SAM-2 局部掩码自愈重绘（单次成本 c_0/(1+u)，良率与预算比恒锁 1.0000×）",subtitle:"Detects localized anatomical/prop defects via a structured VLM Critic Agent, isolates the <6% defective bounding box with SAM-2, and heals only the ROI via Pose/Depth Inpainting while freezing 94% of approved pixels across all 17 QA tiers.",subtitleZh:"通过多模态 VLM 审片 Agent（GPT-5.4 Vision / Qwen-VL + GroundingDINO）自动定位“六指、多余杯柄、文字乱码、悬浮穿模”的精确包围盒 `[x1,y1,x2,y2]`，结合 SAM-2 局部掩码与骨骼引导 Inpainting 仅修复 <6% 瑕疵区域而冻结 94% 合格画面，在全 17 个无人值守质检档位恒锁 1.0000×。",useAgenticLocalizedSelfHealing:!0,defaultStationIndex:16,badge:"AGENTIC SELF-HEALING LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"VLM 局部自愈锁死 · 1.0000×（0/17 站整片重抽浪费）",description:"Unmanned enterprise AIGC factories achieve >99.5% first-time-right delivery without full-clip reroll roulette by closing the loop between VLM spatial defect grounding and localized ControlNet inpainting.",descriptionZh:"企业夜间无人值守大批量 AIGC 生产线通过“VLM 审片判别器输出缺陷坐标 + 局部掩码定向修复闭环”，告别牵一发而动全身的整片推倒重抽。"},naive_full_clip_reroll_qa_overrun:{id:"naive_full_clip_reroll_qa_overrun",label:"Naive Full-Clip Seed Reroll Roulette / Unchecked Delivery (GPU Waste Overrun = 1 + u up to 2.0000×)",labelZh:"朴素整片推倒重抽轮盘赌模式（因局部手指/小道具瑕疵报废整条视频重跑，算力浪费超支达 2.0000×）",subtitle:"Discards the entire generated image or video clip and re-runs full diffusion with a new random seed whenever a small hand or prop defect occurs, destroying approved composition and inflating GPU spend by 2.0000× at Tier 16.",subtitleZh:"只要画面局部出现一处手指粘连或背景杂物瑕疵，就将整张大图或整条 5 秒视频全部作废、更换随机种子从头重跑全图扩散，不仅破坏已满意的光影构图，更使第 16 档批量生产算力成本翻倍超支至 2.0000×。",useAgenticLocalizedSelfHealing:!1,defaultStationIndex:16,badge:"FULL-REROLL GPU WASTE · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"整片重抽算力浪费 · 最高 2.0000×（16/17 站违背）",description:"Re-rolling the global random seed to fix a 5% localized anatomical defect triggers non-convergent stochastic roulette and doubles GPU budget across 16/17 batch complexity tiers.",descriptionZh:"用全局换种子重抽去修补仅占画面 5% 的局部手部或道具瑕疵，会导致“修好左手却崩了右手”的随机轮盘赌死循环。"}},A=17,H=["Gate 0: Structured JSON Rubric Ingest (Anatomy/OCR/Physics)","Gate 1: Hand & Finger Count Verifier (5-Digit Skeleton Lock)","Gate 2: Grip & Object Contact Plausibility (Cup/Phone/Pen)","Gate 3: Bilateral Symmetry & Eye Gaze Convergence Check","Gate 4: GroundingDINO + SAM-2 Defect Bounding-Box Isolation","Gate 5: MediaPipe Hand Mesh 3D Depth Guided Inpaint Heal","Gate 6: Background Sign & Gibberish Text Erasure / Replace","Gate 7: Extra Limb / Duplicate Prop Ghost Removal Pass","Gate 8: Garment Button & Collar Continuity Micro-Heal","Gate 9: Temporal Flicker Patch Repair in Video Latent Tube","Gate 10: Product Reflection & Shadow Grounding Correction","Gate 11: Brand Logo Levenshtein Distance == 0 Vector Patch","Gate 12: Multi-Turn VLM Re-Verification Loop (Max 2 Hops)","Gate 13: Aesthetic Score & VMAF/CLIP Threshold Gate (≥ 0.91)","Gate 14: 94% Frozen Pixel SSIM == 1.0000 Preservation Lock","Gate 15: Human-in-the-Loop Escalation Queue (< 0.5% Edge)","Gate 16: Unmanned 10,000-Asset Self-Healing Factory (0.50 c_0)"];function w(t){const e=1+Math.max(0,t),o=1/e;return{fullRerollWasteAmplification:e,localizedHealUnitCost:o}}function B(t,i=64){const o=1/(1+Math.max(0,t)),l=Math.max(2,i%2===0?i:i+1),s=1/l;let a=2*o;for(let n=1;n<l;n++){const d=n*s,f=n%2===1?4:2;a+=f*(2*o*d)}return s/3*a}function D(t,i){const e=Math.max(0,Math.min(A-1,t)),o=e/(A-1),l=w(o),s=B(o,64),a=1+o,n=i?1:a;return{index:e,defectComplexityU:o,fullRerollWasteAmplification:l.fullRerollWasteAmplification,localizedHealUnitCost:l.localizedHealUnitCost,quadratureRubricMaskCost:s,qaYieldBudgetRatio:n,naiveFullRerollOverrunRatio:a,vlmQaStageLabel:H[e]??H[0],isQaWasteViolation:n>1.0001}}function _(t,i){const e=L[t],o=[];let l=0,s=0;for(let n=0;n<A;n++){const d=D(n,e.useAgenticLocalizedSelfHealing);o.push(d),d.isQaWasteViolation&&l++;const f=Math.abs(d.localizedHealUnitCost-d.quadratureRubricMaskCost);f>s&&(s=f)}const a=i!==void 0?Math.max(0,Math.min(A-1,i)):e.defaultStationIndex;return{presetId:t,useAgenticLocalizedSelfHealing:e.useAgenticLocalizedSelfHealing,stationCount:A,selectedStation:o[a],stations:o,station4Ratio:o[4].qaYieldBudgetRatio,station8Ratio:o[8].qaYieldBudgetRatio,station12Ratio:o[12].qaYieldBudgetRatio,station16Ratio:o[16].qaYieldBudgetRatio,violatedCount:l,maxQuadratureError:s,verdict:l===0?"AGENTIC_VLM_SELF_HEALING_LOCKED":"NAIVE_FULL_REROLL_QA_OVERRUN"}}function W(t){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Autonomous Agentic VLM Visual QA & Localized Self-Healing Inpainting Plinth"}),i.push({id:"critic-rail-front",kind:"vlm_critic_rubric_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"SAM-2 <6% ROI Defect Mask + 94% Frozen Pixel Self-Healing Bus (1.0000×)"}),i.push({id:"critic-rail-back",kind:"vlm_critic_rubric_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Multimodal VLM Critic Agent (GPT-5.4 / Qwen-VL + GroundingDINO) Bus"});for(const e of t.stations){const o=(e.index-8)*30,l=22*e.fullRerollWasteAmplification,s=44*e.localizedHealUnitCost,a=36*e.qaYieldBudgetRatio;i.push({id:`reroll-waste-demand-column-${e.index}`,kind:"reroll_waste_demand_column",stationIndex:e.index,x:o,y:l*.5-8,z:-56,w:14,h:l,d:14,tone:"amber",label:`Gate ${e.index} Amplification Q(u) = ${e.fullRerollWasteAmplification.toFixed(4)}× (${e.vlmQaStageLabel})`}),i.push({id:`localized-inpaint-heal-node-${e.index}`,kind:"localized_inpaint_heal_node",stationIndex:e.index,x:o,y:s*.5-8,z:0,w:14,h:s,d:14,tone:t.useAgenticLocalizedSelfHealing?"teal":"slate",label:`Gate ${e.index} Amortized Heal Cost c_heal = ${e.localizedHealUnitCost.toFixed(4)}×`}),i.push({id:`qa-yield-budget-gauge-${e.index}`,kind:"qa_yield_budget_gauge",stationIndex:e.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*e.qaYieldBudgetRatio),h:a,d:12,tone:e.isQaWasteViolation?"crimson":"teal",label:`Gate ${e.index} QA Yield & Budget Ratio = ${e.qaYieldBudgetRatio.toFixed(4)}×`})}return i.push({id:"bbox-gate-left",kind:"sam2_defect_bbox_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"VLM Rubric Critic & GroundingDINO/SAM-2 Defect BBox Locator Gate"}),i.push({id:"bbox-gate-right",kind:"sam2_defect_bbox_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:t.useAgenticLocalizedSelfHealing?"teal":"crimson",label:"Localized Pose/Depth Inpainting Heal & Re-Verification Egress Gate"}),i.push({id:"egress-bar-top",kind:"zero_defect_egress_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Self-Healing Law: c_heal(u) = c_0 / (1 + u) via <6% ROI Mask Inpaint vs Full Reroll"}),i.push({id:"egress-bar-front",kind:"zero_defect_egress_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:t.useAgenticLocalizedSelfHealing?"teal":"crimson",label:"99.5% Unmanned First-Time-Right Delivery & 94% Pixel Freeze Lock Line (1.0000×)"}),i}const z=new URLSearchParams(window.location.search),R=z.get("preset"),Y=z.get("theme")==="light"?"light":"dark";let c=R&&R in L?R:"agentic_vlm_critic_localized_inpaint_lock",r=L[c].defaultStationIndex,h=Y;document.documentElement.setAttribute("data-theme",h);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · AGENTIC VLM VISUAL QA GATE & LOCALIZED SELF-HEALING INPAINTING PIPELINE</span>
        <h1>Agentic VLM Visual QA Gate & Localized Self-Healing Inpainting Pipeline</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${h.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Agentic QA Pipeline Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="agentic_vlm_critic_localized_inpaint_lock"
      >
        Agentic VLM BBox Critic + SAM-2 ROI Self-Healing Inpaint (Yield Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_full_clip_reroll_qa_overrun"
      >
        Naive Full-Clip Seed Reroll Roulette (GPU Waste Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Autonomous VLM QA Readouts">
      <article class="kpi-card">
        <span class="kpi-label">REROLL FACTOR Q(u) / LOCALIZED HEAL COST c_heal</span>
        <strong id="kpi-heal" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">QA YIELD & COMPUTE BUDGET RATIO (C_active / C_heal)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">QA GATES 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">Q(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FULL-REROLL WASTE & DEFECT LEAK VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-GATE AGENTIC VLM CRITIC & LOCALIZED ROI SELF-HEALING STAGE</span>
          <span id="solid-count-readout">58 solids · 17 QA gates</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Agentic VLM Visual QA Gate and Localized Self-Healing Inpainting Pipeline"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Autonomous VLM Critic & Self-Healing Gate (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Gate 16 (u = 1.000, c_heal = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-GATE VLM ROI SELF-HEALING VS FULL-SEED REROLL LEDGER</span>
          <span>c_heal = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Gate</th>
                <th>u</th>
                <th>Q(u) = 1+u</th>
                <th>c_heal</th>
                <th>Rubric Quad</th>
                <th>C / C_heal</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const j=document.querySelector("#preset-subtitle"),T=document.querySelector("#preset-badge"),K=document.querySelector("#kpi-heal"),J=document.querySelector("#kpi-quad"),V=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),ee=document.querySelector("#kpi-stations-4816"),P=document.querySelector("#kpi-violated"),te=document.querySelector("#kpi-verdict"),ie=document.querySelector("#solid-count-readout"),ae=document.querySelector("#rig-svg"),$=document.querySelector("#station-slider"),oe=document.querySelector("#station-slider-label"),O=document.querySelector("#station-tbody"),y=document.querySelector("#theme-toggle");function b(t,i,e){const o=(t-e*.55)*.88,l=-i+(t*.18+e*.42)*.55;return[o,l]}function ne(t,i){return t==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:t==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:t==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:t==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function le(t,i,e,o,l,s,a,n,d,f,q){const u=o*.5,p=l*.5,g=s*.5,G=b(t+u,i-p,e-g),S=b(t+u,i-p,e+g),F=b(t-u,i-p,e+g),M=b(t-u,i+p,e-g),E=b(t+u,i+p,e-g),x=b(t+u,i+p,e+g),m=b(t-u,i+p,e+g),v=ne(a,d),C=n?1.8:.7,I=n?"#ffffff":v.stroke,N=`${M[0].toFixed(1)},${M[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,U=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`,Q=`${S[0].toFixed(1)},${S[1].toFixed(1)} ${G[0].toFixed(1)},${G[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${f}" data-solid-kind="${q}">
      <polygon points="${U}" fill="${v.left}" stroke="${I}" stroke-width="${C}" />
      <polygon points="${Q}" fill="${v.right}" stroke="${I}" stroke-width="${C}" />
      <polygon points="${N}" fill="${v.top}" stroke="${I}" stroke-width="${C}" />
    </g>
  `}function k(t){const i=L[t.presetId],e=t.selectedStation,o=h==="dark";j.textContent=i.subtitle,T.textContent=i.badge,T.className=`status-badge ${t.violatedCount===0?"badge-pass":"badge-fail"}`,K.textContent=`Q(u) = ${e.fullRerollWasteAmplification.toFixed(4)}× (c_heal = ${e.localizedHealUnitCost.toFixed(4)}×)`,J.textContent=`Rubric Quad = ${e.quadratureRubricMaskCost.toFixed(4)}× (Quad err ${t.maxQuadratureError.toExponential(2)})`,V.textContent=`${e.qaYieldBudgetRatio.toFixed(4)}×`,V.className=`kpi-value ${e.isQaWasteViolation?"text-danger":"text-ok"}`,X.textContent=`u = ${e.defectComplexityU.toFixed(4)} | ${e.vlmQaStageLabel}`,ee.textContent=`${t.station4Ratio.toFixed(4)}× / ${t.station8Ratio.toFixed(4)}× / ${t.station16Ratio.toFixed(4)}×`,P.textContent=`${t.violatedCount} / ${t.stationCount}`,P.className=`kpi-value ${t.violatedCount>0?"text-danger":"text-ok"}`,te.textContent=t.verdict,$.value=String(e.index),oe.textContent=`Gate ${e.index} (u = ${e.defectComplexityU.toFixed(3)}, c_heal = ${e.localizedHealUnitCost.toFixed(3)}, Ratio = ${e.qaYieldBudgetRatio.toFixed(4)}×)`;const l=W(t);ie.textContent=`${l.length} solids · ${t.stationCount} QA gates`;const s=[...l].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);ae.innerHTML=s.map(a=>le(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===e.index,o,a.id,a.kind)).join(""),O.innerHTML=t.stations.map(a=>{const n=a.index===e.index?"row-selected":"",d=a.isQaWasteViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.defectComplexityU.toFixed(4)}</td>
          <td>${a.fullRerollWasteAmplification.toFixed(4)}×</td>
          <td>${a.localizedHealUnitCost.toFixed(4)}×</td>
          <td>${a.quadratureRubricMaskCost.toFixed(4)}×</td>
          <td class="${d}">${a.qaYieldBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===t.presetId)}),window.__AGENTIC_VLM_SELF_HEALING_SUMMARY__=t}document.querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-preset");i&&i in L&&(c=i,r=L[c].defaultStationIndex,k(_(c,r)))})});$.addEventListener("input",()=>{r=Number($.value),k(_(c,r))});O.addEventListener("click",t=>{const i=t.target.closest("tr[data-station-row]");i&&(r=Number(i.getAttribute("data-station-row")),k(_(c,r)))});y.addEventListener("click",()=>{h=h==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",h),y.textContent=`Theme: ${h.toUpperCase()}`,k(_(c,r))});k(_(c,r));
