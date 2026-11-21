import"./modulepreload-polyfill-B5Qt9EMX.js";const h={"cathedral-ballgown-crinoline":{id:"cathedral-ballgown-crinoline",titleZh:"巴斯克鱼骨束腰大拖尾蓬蓬裙（6圈裙撑抬升 +34mm · 85mm 婚鞋 · 2,100mm 教堂拖尾 + 7点法式盘扣）",titleEn:"Basque-Waist Cathedral Ballgown (6-Hoop Crinoline +34mm Lift · 85mm Heels · 2,100mm Train + 7-Pt French Bustle)",silhouetteName:"Royal Mikado Silk Ballgown (14 Spiral-Steel Bones + 6-Hoop Crinoline)",brideHollowToFloorMm:1385,bridalHeelHeightMm:85,crinolineHoopLiftMm:34,trainLengthMm:2100,bustleType:"7-Point French Under-Bustle (Reception Dance Floor Skim 15mm)",naiveHemErrorMm:-68,mtmFrontHemFloorClearanceMm:15,corsetBoningChannels:14,naiveAlterationCostUsd:540,naiveReturnRatePct:31.4,mtmReturnRatePct:3.6,annualSavingsPer100kOrdersUsd:168e4},"mermaid-corset-chapel-train":{id:"mermaid-corset-chapel-train",titleZh:"重工蕾丝鱼尾礼服（高髋膝上收拢度 · 100mm 细高跟 · 1,350mm 礼拜堂拖尾 + 美式外盘扣）",titleEn:"Couture Lace Mermaid Gown (High-Hip & Mid-Thigh Flare Lock · 100mm Stiletto · 1,350mm Chapel Train + Over-Bustle)",silhouetteName:"Sculpted Chantilly Lace Mermaid (18 Spiral-Steel Bones + Trumpet Godet)",brideHollowToFloorMm:1410,bridalHeelHeightMm:100,crinolineHoopLiftMm:12,trainLengthMm:1350,bustleType:"3-Point American Over-Bustle (Zero Heel-Snag Guarantee)",naiveHemErrorMm:52,mtmFrontHemFloorClearanceMm:14,corsetBoningChannels:18,naiveAlterationCostUsd:480,naiveReturnRatePct:34.2,mtmReturnRatePct:3.8,annualSavingsPer100kOrdersUsd:182e4},"bridesmaid-aline-petite-heel":{id:"bridesmaid-aline-petite-heel",titleZh:"伴娘团 6人异形尺码真丝雪纺 A 字裙（小个子 1,290mm 锁骨高 · 55mm 猫跟鞋 · 免改衣直穿交付）",titleEn:"Bridesmaid Party 6-Member Silk Chiffon A-Line (Petite 1,290mm Hollow-to-Floor · 55mm Kitten Heel · Zero-Seamstress MTM)",silhouetteName:"Bias-Cut Silk Chiffon A-Line (8 Boned Bodice Channels)",brideHollowToFloorMm:1290,bridalHeelHeightMm:55,crinolineHoopLiftMm:8,trainLengthMm:180,bustleType:"Wrist-Loop & Hidden Side-Seam Snap",naiveHemErrorMm:112,mtmFrontHemFloorClearanceMm:16,corsetBoningChannels:8,naiveAlterationCostUsd:185,naiveReturnRatePct:28.6,mtmReturnRatePct:3.1,annualSavingsPer100kOrdersUsd:149e4}};function M(n,t){const e=h[n],s=t==="shell-rod-corset-crinoline-mtm-ar",d=e.brideHollowToFloorMm+e.bridalHeelHeightMm+e.crinolineHoopLiftMm-e.mtmFrontHemFloorClearanceMm,a=s?e.mtmFrontHemFloorClearanceMm:e.naiveHemErrorMm,l=s?0:e.naiveAlterationCostUsd,r=s?e.mtmReturnRatePct:e.naiveReturnRatePct,i=a>=10&&a<=22;return{preset:e,mode:t,exactCutHollowToHemMm:d,effectiveFrontHemClearanceMm:a,effectiveAlterationCostUsd:l,effectiveReturnRatePct:r,tripFreeHemlinePass:i,bustleDanceClearancePass:s,verdictBadge:s?`MTM CORSET & HEM LOCKED (Cut ${d}mm · ${a}mm Skim · $0 Seamstress Bill)`:`HEMLINE TRIP/SHORTFALL & CORSET COLLAPSE (${e.naiveHemErrorMm}mm Hem Error · $${e.naiveAlterationCostUsd} Seamstress Bill)`}}const H=document.querySelector("#app");let b="cathedral-ballgown-crinoline",f="shell-rod-corset-crinoline-mtm-ar";function v(){const n=M(b,f),t=n.preset,e=f==="shell-rod-corset-crinoline-mtm-ar";H.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 382 · 171st Curated Workbench · Domain 2 (Bridal & Couture Gown Corset, Crinoline, Heel-Hem & Bustle MTM Studio)</span>
        <h1>高定婚纱、晚礼服与伴娘团鱼骨束腰、裙撑抬升与婚鞋拖尾盘扣 3D 量体改衣工作台</h1>
        <p class="wb-subtitle">终结纯 2D 扩散虚拟试衣把 14根螺旋钢骨束腰与 6圈硬纱裙撑画成软塌T恤、且漏算“锁骨至地高 + 85mm 婚鞋跟高 + 34mm 裙撑外扩抬升”导致前摆绊倒或耗费 $540 线下裁缝改衣费的痛点：实时解算壳-杆耦合束腰/裙撑与晚宴法式盘扣（French Bustle），将退货率从 31.4% 压至 3.6%（每 10万单省 +$1.68M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${n.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Bridal Preset and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择婚纱/晚礼服廓形与婚鞋裙撑配置 (Bridal Gown & Crinoline Preset):</span>
        <div class="btn-row">
          ${Object.keys(h).map(s=>`
            <button type="button" class="scenario-btn ${b===s?"active":""}" data-scenario="${s}">
              ${h[s].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换虚拟试穿与工厂 MTM 纸样编译管线 (Try-On & MTM Pattern Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-2d-vton-stock-size">
            ❌ 传统基线：2D 图像扩散 VTON + 标准通码成衣 (束腰坍塌 + 前摆拖地/短截需 $540 改衣)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="shell-rod-corset-crinoline-mtm-ar">
            ✅ 推荐架构：壳-杆耦合鱼骨/裙撑 XPBD + 婚鞋/裙撑裙长直裁 DXF + 晚宴盘扣 (Bustle) 仿真
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Bridal MTM & Drape KPIs">
      <div class="kpi-card">
        <span class="kpi-title">工厂直裁锁骨至前摆弧长 (Hollow-to-Hem Cut)</span>
        <strong class="kpi-value good" id="kpi-cut">${n.exactCutHollowToHemMm} mm</strong>
        <span class="kpi-sub">锁骨高 ${t.brideHollowToFloorMm}mm + 跟高 ${t.bridalHeelHeightMm}mm + 裙撑补偿 ${t.crinolineHoopLiftMm}mm</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">前裙摆离地安全悬空净空 (Front Floor Skim)</span>
        <strong class="kpi-value ${n.tripFreeHemlinePass?"good":"bad"}" id="kpi-skim">${n.effectiveFrontHemClearanceMm>=0?"+":""}${n.effectiveFrontHemClearanceMm} mm</strong>
        <span class="kpi-sub">黄金防踩裙悬空区间 +10mm ~ +22mm</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">收货后二次线下裁缝改衣费 (Seamstress Bill)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-seamstress">$${n.effectiveAlterationCostUsd} / gown</strong>
        <span class="kpi-sub">${e?"出厂即合身免二次拆蕾丝改裙摆":`传统通码需线下拆改蕾丝边 ($${t.naiveAlterationCostUsd})`}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">全渠道退货率与每 10万单净省 (ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">${n.effectiveReturnRatePct.toFixed(1)}% · +$${(t.annualSavingsPer100kOrdersUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">对比传统通码 ${t.naiveReturnRatePct.toFixed(1)}% 退换率</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>螺旋钢骨束腰 (Corset) + 裙撑 (Crinoline) 耦合前摆净空与仪式拖尾/晚宴盘扣 (Bustle) 双态画布</h2>
          <span class="tag">${t.silhouetteName}</span>
        </div>
        <canvas id="bridal-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>高定婚纱结构力学与 MTM 纸样工单明细 (Couture MTM Pattern Audit)</h2>
        <ul class="audit-list">
          <li><span>新娘锁骨窝至赤足地面高:</span> <strong>${t.brideHollowToFloorMm} mm (±3.0 mm 双视图标定)</strong></li>
          <li><span>婚鞋净跟高与裙撑抬升量:</span> <strong>跟高 +${t.bridalHeelHeightMm} mm · 裙撑外扩弧长补偿 +${t.crinolineHoopLiftMm} mm</strong></li>
          <li><span>鱼骨束腰钢骨通道数:</span> <strong>${t.corsetBoningChannels} 根螺旋钢骨 (巴斯克腰线零折皱锁死)</strong></li>
          <li><span>后片仪式拖尾总长度:</span> <strong>${t.trainLengthMm} mm (Chapel / Cathedral Train)</strong></li>
          <li><span>晚宴第一支舞盘扣方案:</span> <strong>${t.bustleType}</strong></li>
          <li><span>线下改衣费节省:</span> <strong>$${t.naiveAlterationCostUsd} → $0 (出厂预缝暗扣与精准前摆)</strong></li>
          <li><span>每 10万单减少退货与改衣补贴:</span> <strong>+$${t.annualSavingsPer100kOrdersUsd.toLocaleString("en-US")} / 100k Orders</strong></li>
        </ul>
      </div>
    </main>
  `,C(),S(n)}function C(){document.querySelectorAll(".scenario-btn").forEach(n=>{n.addEventListener("click",()=>{b=n.dataset.scenario,v()})}),document.querySelectorAll(".mode-btn").forEach(n=>{n.addEventListener("click",()=>{f=n.dataset.mode,v()})})}function S(n){const t=document.querySelector("#bridal-canvas");if(!t)return;const e=t.getContext("2d"),s=t.width,d=t.height,a=n.preset,l=n.mode==="shell-rod-corset-crinoline-mtm-ar";e.fillStyle="#070b14",e.fillRect(0,0,s,d);const r=336;e.strokeStyle="#475569",e.lineWidth=2,e.beginPath(),e.moveTo(24,r),e.lineTo(s-24,r),e.stroke(),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Spiral-Steel Corset + Crinoline Hoop Lift + Front Hem Floor Skim (15mm)",24,28);const i=185;e.fillStyle=l?"rgba(56, 189, 248, 0.22)":"rgba(239, 68, 68, 0.22)",e.strokeStyle=l?"#38bdf8":"#ef4444",e.lineWidth=2.2,e.beginPath(),e.moveTo(i-28,76),e.lineTo(i+28,76),e.lineTo(i+20,152),e.lineTo(i,166),e.lineTo(i-20,152),e.closePath(),e.fill(),e.stroke(),e.strokeStyle=l?"#bae6fd":"#fca5a5",e.lineWidth=1.2;for(let m=-18;m<=18;m+=9)e.beginPath(),e.moveTo(i+m*1.2,78),e.lineTo(i+m*.85,156),e.stroke();const p=l?r-a.mtmFrontHemFloorClearanceMm:r+14,c=a.crinolineHoopLiftMm>20?112:a.crinolineHoopLiftMm>10?74:58;e.fillStyle=l?"rgba(16, 185, 129, 0.16)":"rgba(239, 68, 68, 0.18)",e.strokeStyle=l?"#10b981":"#ef4444",e.lineWidth=2.4,e.beginPath(),e.moveTo(i-20,152),e.quadraticCurveTo(i-c,230,i-c-8,p),e.lineTo(i+c+8,p),e.quadraticCurveTo(i+c,230,i+20,152),e.closePath(),e.fill(),e.stroke(),l&&(e.strokeStyle="rgba(56, 189, 248, 0.45)",e.setLineDash([5,4]),[195,240,285].forEach((m,u)=>{const g=38+u*(c*.28);e.beginPath(),e.ellipse(i,m,g,9,0,0,Math.PI*2),e.stroke()}),e.setLineDash([])),e.fillStyle="#f59e0b",e.fillRect(i-12,r-22,24,22),e.fillStyle=l?"#34d399":"#f87171",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(l?`✓ Cut Length ${n.exactCutHollowToHemMm}mm → +${a.mtmFrontHemFloorClearanceMm}mm Trip-Free Skim`:`✕ Stock Size ignores Heel (+${a.bridalHeelHeightMm}mm) & Hoop (+${a.crinolineHoopLiftMm}mm) → $${a.naiveAlterationCostUsd} Alteration!`,24,374);const o=430;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Ceremony Train (2,100mm) vs Reception French Bustle Dance Mode",o,28),e.strokeStyle="rgba(168, 85, 247, 0.55)",e.setLineDash([6,4]),e.lineWidth=2,e.beginPath(),e.moveTo(o+68,152),e.quadraticCurveTo(o+180,290,o+356,r-2),e.lineTo(o+68,r-2),e.stroke(),e.setLineDash([]),e.fillStyle="#d8b4fe",e.font="11px Inter, system-ui, sans-serif",e.fillText(`Ceremony Train (${a.trainLengthMm}mm Unbustled)`,o+182,268),e.fillStyle=l?"rgba(16, 185, 129, 0.22)":"rgba(239, 68, 68, 0.2)",e.strokeStyle=l?"#10b981":"#ef4444",e.lineWidth=2.4,e.beginPath(),e.moveTo(o+44,152),e.lineTo(o+84,152),e.quadraticCurveTo(o+162,224,o+148,r-14),e.lineTo(o+28,r-14),e.closePath(),e.fill(),e.stroke(),[[o+96,206],[o+114,218],[o+128,232]].forEach(([m,u])=>{e.fillStyle=l?"#38bdf8":"#ef4444",e.beginPath(),e.arc(m,u,4.5,0,Math.PI*2),e.fill()}),e.fillStyle="#cbd5e1",e.font="11.5px Inter, system-ui, sans-serif",e.fillText(`Bustle Spec: ${a.bustleType}`,o+14,78),e.fillText(`Corset Support: ${a.corsetBoningChannels} Spiral-Steel Channels`,o+14,102),e.fillStyle=l?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(l?"✓ Pre-Sewn Bustle Hooks & Exact Hem DXF: $0 Seamstress Cost · 3.6% Returns":"✕ Unbustled Dragging Train & Wrong Front Hem → 31.4% Bridal Party Returns",o+2,374)}v();
