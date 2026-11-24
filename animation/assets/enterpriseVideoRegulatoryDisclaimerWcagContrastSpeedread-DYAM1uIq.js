import"./modulepreload-polyfill-B5Qt9EMX.js";const m={"automotive-lease-apr-ftc-super-hold":{id:"automotive-lease-apr-ftc-super-hold",title:"Automotive Lease APR & Balloon-Payment Super: ≥4.0% Picture Height & 7.2:1 Contrast",titleZh:"汽车金融低息租赁视频免责小字：≥4.0% 画面字高、T=3s+0.2s/词驻留时长与 7.2:1 动态遮罩",statutoryRule:"FTC Regulation M / Clear & Conspicuous (≥4% Height)",minFontHeightPct:4.2,variantCount:48},"finserv-etf-risk-disclosure-wsola-speedread":{id:"finserv-etf-risk-disclosure-wsola-speedread",title:"Wealth & ETF Video Risk Disclosure: 1.45× WSOLA Formant-Locked Speed-Read & Ticker",titleZh:"基金理财与财富管理风险提示：1.45倍 WSOLA 变速不变调清晰快读（消除花栗鼠变调）",statutoryRule:"SEC Rule 206(4)-1 / FINRA 2210 Audio-Visual Parity",minFontHeightPct:4.5,variantCount:64},"pharma-contraindication-dual-modality-sync":{id:"pharma-contraindication-dual-modality-sync",title:"Healthcare & OTC Major Statement: Distraction-Free Background Calm & WCAG AAA Lock",titleZh:"医疗健康禁忌症双模态同步声明：背景高光动态压暗（WCAG AAA ≥7.0:1）与音画逐句对齐",statutoryRule:"FDA CCN Dual-Modality Non-Distracting Super Rule",minFontHeightPct:4.8,variantCount:36}};function g(a,t,i){const e=Number(((i-1.2)*.8).toFixed(1));return t==="wcag-7to1-scrim-ftc-hold-wsola-formant-lock"?{scenarioId:a,pipelineMode:t,statutoryContrastHoldCompliancePct:100,speedReadIntelligibilityPct:Math.max(98.5,Number((99.6-e).toFixed(1))),minContrastRatio:7.4,costPerVariantUsd:.006,annualSavingsUsdM:2.14,verdict:"Act automatically"}:t==="manual-legal-review-nle-compliance-edit"?{scenarioId:a,pipelineMode:t,statutoryContrastHoldCompliancePct:97.5,speedReadIntelligibilityPct:96.8,minContrastRatio:5.8,costPerVariantUsd:120,annualSavingsUsdM:.12,verdict:"Confirm"}:{scenarioId:a,pipelineMode:t,statutoryContrastHoldCompliancePct:55.2,speedReadIntelligibilityPct:61.8,minContrastRatio:1.9,costPerVariantUsd:.28,annualSavingsUsdM:.02,verdict:"Send to a human"}}const h=document.querySelector("#app");if(!h)throw new Error("Missing #app root");let d="automotive-lease-apr-ftc-super-hold",r="wcag-7to1-scrim-ftc-hold-wsola-formant-lock",l=1.4;function v(a){const t=a.getContext("2d");if(!t)return;const i=a.width,e=a.height;t.clearRect(0,0,i,e);const c=m[d],s=g(d,r,l),n=r==="naive-translucent-white-text-chipmunk-speedup",u=t.createLinearGradient(0,0,i,e);u.addColorStop(0,"#070b14"),u.addColorStop(1,"#1e1b4b"),t.fillStyle=u,t.fillRect(0,0,i,e),t.fillStyle="rgba(15, 23, 42, 0.92)",t.fillRect(16,14,i-32,46),t.strokeStyle=r==="wcag-7to1-scrim-ftc-hold-wsola-formant-lock"?"#10b981":"#ef4444",t.strokeRect(16,14,i-32,46),t.fillStyle="#38bdf8",t.font="bold 13px Inter, sans-serif",t.fillText(`277th Workbench (54th in Domain 3) · ${c.statutoryRule} · Speed-Read ${l.toFixed(2)}×`,28,34),t.fillStyle="#94a3b8",t.font="11px Inter, sans-serif",t.fillText(`Statutory Compliance: ${s.statutoryContrastHoldCompliancePct}% | Min Contrast: ${s.minContrastRatio.toFixed(1)}:1 | Speech STI: ${s.speedReadIntelligibilityPct}%`,28,51);const f=[{title:"1. Per-Frame WCAG 2.2 AAA Luma Scrim (≥7.0:1)",detail:n?`⛔ White Text on Bright Road Drops to ${s.minContrastRatio}:1 (Violation!)`:`✓ Dynamic Bottom Scrim Locks ${s.minContrastRatio.toFixed(1)}:1 Contrast`,color:n?"#ef4444":"#10b981",x:36,y:84},{title:`2. Statutory Font Height (≥${c.minFontHeightPct}% V-Height) & Hold`,detail:n?"⛔ Micro-Font (<2% Height) Flashed for Only 1.2s!":`✓ ≥${c.minFontHeightPct}% Height + T_min = 3.0s + 0.2s×Words`,color:n?"#ef4444":"#38bdf8",x:396,y:84},{title:`3. WSOLA Formant-Locked Speed-Read (${l.toFixed(2)}×)`,detail:n?"⛔ Naive Resampling Causes +7 Semitone Chipmunk Voice":`✓ Zero Pitch Shift + Vowel-Only Compression (${s.speedReadIntelligibilityPct}% STI)`,color:n?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Multi-Ratio Legal Mastering FinOps",detail:n?"⛔ Regulatory Takedown & Ad-Network Rejection":`✓ ${c.variantCount} Variants @ $${s.costPerVariantUsd} (+$${s.annualSavingsUsdM}M/yr Saved)`,color:n?"#ef4444":"#f59e0b",x:396,y:178}];for(const o of f)t.save(),t.fillStyle="rgba(15, 23, 42, 0.9)",t.strokeStyle=o.color,t.lineWidth=2.2,t.beginPath(),t.roundRect(o.x,o.y,328,76,10),t.fill(),t.stroke(),t.fillStyle="#f8fafc",t.font="bold 12px Inter, sans-serif",t.fillText(o.title,o.x+14,o.y+28),t.fillStyle=o.color,t.font="bold 11px JetBrains Mono, monospace",t.fillText(o.detail,o.x+14,o.y+54),t.restore();t.save(),t.fillStyle="#090d16",t.strokeStyle="#334155",t.beginPath(),t.roundRect(36,278,688,92,12),t.fill(),t.stroke(),t.fillStyle="#fbbf24",t.font="bold 12px Inter, sans-serif",t.fillText(`Active Regulatory Disclaimer Compiler: ${c.title}`,54,308),t.fillStyle="#6ee7b7",t.font="11px JetBrains Mono, monospace",t.fillText(n?"⛔ Unbacked White Super + Linear Audio Speedup: 1.9:1 Contrast Breach & Chipmunk Distortion!":`✓ WCAG 7.4:1 Dynamic Scrim + ≥${c.minFontHeightPct}% Font Height + WSOLA Consonant-Protected ${l.toFixed(2)}× TTS ($${s.costPerVariantUsd})`,54,336),t.restore()}function p(){const a=m[d],t=g(d,r,l);h.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">277th Workbench (54th in Domain 3) · Regulatory Disclaimer Contrast, Hold-Time &amp; WSOLA Speed-Read</span>
        <h1>企业金融理财、汽车租赁与医药广告视频法规免责声明母带：WCAG 7:1 动态对比度、FTC 停留时长与 WSOLA 变速播报工作台</h1>
        <p class="subtitle">逐帧背景亮度感知底衬（锁定 WCAG AAA ≥7.0:1 对比度）+ 法定最小字高（≥4% 画面高度）与驻留时长门禁 + WSOLA 保护辅音变速不变调风险快读 vs 亮底白字违规</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${t.verdict}</span>
        <span class="metric-pill">${t.minContrastRatio.toFixed(1)}:1 Contrast</span>
        <span class="metric-pill">${t.speedReadIntelligibilityPct}% STI</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 强监管行业视频免责声明场景 (Regulated Industry Scenario)</label>
        <select id="scenario-select">
          ${Object.values(m).map(e=>`<option value="${e.id}" ${e.id===d?"selected":""}>${e.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 免责小字与快速语音合成管线 (Disclaimer Mastering Pipeline)</label>
        <select id="mode-select">
          <option value="wcag-7to1-scrim-ftc-hold-wsola-formant-lock" ${r==="wcag-7to1-scrim-ftc-hold-wsola-formant-lock"?"selected":""}>✅ 7.4:1 动态压暗底衬 + 法定字高/驻留时长锁 + WSOLA 变速不变调 (推荐)</option>
          <option value="naive-translucent-white-text-chipmunk-speedup" ${r==="naive-translucent-white-text-chipmunk-speedup"?"selected":""}>⛔ 直接叠加白色小字 + 简单音频倍速 (44.8% 亮背景对比度跌至 1.9:1，人声变成花栗鼠尖叫)</option>
          <option value="manual-legal-review-nle-compliance-edit" ${r==="manual-legal-review-nle-compliance-edit"?"selected":""}>⚠️ 法务与剪辑师逐画幅手动垫黑条数秒表 ($120/变体，48 个尺寸渠道耗时 2 天)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="speed-slider">3. WSOLA 风险提示语速倍率 (Risk-Disclosure Speech Rate: <strong>${l.toFixed(2)}×</strong>)</label>
        <input id="speed-slider" type="range" min="1.20" max="1.60" step="0.05" value="${l}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>WCAG 7.4:1 动态底衬、法定字高驻留与 WSOLA 变速不变调舞台 (Disclaimer Stage)</h2>
          <span class="tag">${a.variantCount} Variants · ≥${a.minFontHeightPct}% V-Height</span>
        </div>
        <canvas id="disclaimer-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>广告法务过审与双模态可懂度遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">FTC / SEC / FDA 显著性法规达标率</span>
            <strong class="kpi-value">${t.statutoryContrastHoldCompliancePct}%</strong>
            <span class="kpi-note">字高 ≥${a.minFontHeightPct}% 且停留时长 ≥3s+0.2s/词</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">全片最亮背景帧最低文字对比度</span>
            <strong class="kpi-value">${t.minContrastRatio.toFixed(1)} : 1</strong>
            <span class="kpi-note">满足 WCAG 2.2 AAA 级 (≥7.0:1) 严苛标准</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">${l.toFixed(2)}× 快速免责播报清晰度 (STI)</span>
            <strong class="kpi-value">${t.speedReadIntelligibilityPct}%</strong>
            <span class="kpi-note">仅压缩元音稳态段与静音间隙，100% 保护辅音</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单变体合规母带成本 / 年化净省</span>
            <strong class="kpi-value">$${t.costPerVariantUsd} · +$${t.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比人工逐渠道校对重剪 $120/条降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const i=document.querySelector("#disclaimer-canvas");i&&v(i),document.querySelector("#scenario-select")?.addEventListener("change",e=>{d=e.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",e=>{r=e.target.value,p()}),document.querySelector("#speed-slider")?.addEventListener("input",e=>{l=Number(e.target.value),p()})}p();
