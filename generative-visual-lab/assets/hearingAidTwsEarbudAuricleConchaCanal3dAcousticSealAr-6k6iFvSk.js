import"./modulepreload-polyfill-B5Qt9EMX.js";const b={"petite-steep-concha":{id:"petite-steep-concha",titleZh:"小耳甲腔高曲率外耳道（耳甲腔 15.2mm · 耳道口 7.4mm · 第一弯折 38° · 旗舰降噪耳返）",titleEn:"Petite Steep-Bend Concha (15.2mm Concha · 7.4mm Canal · 38° Bend · Flagship ANC IEM)",deviceModel:"AcousticPro Custom-Shell IEM + Dual-Flange Silicone Tip",deviceHousingWidthMm:16.4,conchaCavumDiameterMm:15.2,canalApertureDiameterMm:7.4,canalFirstBendDeg:38,naiveCartilagePeakKpa:44.8,arCartilagePeakKpa:18.6,comfortablePressureLimitKpa:22,recommendedEartipSize:"XS-Oval (9.6mm · 16.5% Radial Compression + Slim-Concha Wing)",naiveAcousticLeakDb:-16.4,arAcousticSealAttenuationDb:-34.2,hearingAidFeedbackMarginDb:18.4,naiveReturnRatePct:29.4,arReturnRatePct:3.4,annualNetSavingsPer100kOrdersUsd:196e4},"standard-adult-ear":{id:"standard-adult-ear",titleZh:"标准成人外耳廓与耳屏间距（耳甲腔 19.4mm · 耳道口 9.2mm · 弯折 24° · 旗舰 TWS Pro）",titleEn:"Standard Adult Auricle & Tragus (19.4mm Concha · 9.2mm Canal · 24° Bend · Flagship TWS Pro)",deviceModel:"AirSonic Pro 3 Spatial ANC TWS (5.4g)",deviceHousingWidthMm:18.2,conchaCavumDiameterMm:19.4,canalApertureDiameterMm:9.2,canalFirstBendDeg:24,naiveCartilagePeakKpa:34.2,arCartilagePeakKpa:15.4,comfortablePressureLimitKpa:22,recommendedEartipSize:"M-Acoustic (12.0mm · 18.2% Radial Compression)",naiveAcousticLeakDb:-14.8,arAcousticSealAttenuationDb:-36.8,hearingAidFeedbackMarginDb:21.2,naiveReturnRatePct:23.6,arReturnRatePct:2.8,annualNetSavingsPer100kOrdersUsd:162e4},"wide-canal-ric-aid":{id:"wide-canal-ric-aid",titleZh:"老年宽耳道口 OTC 助听器防啸叫拟合（耳甲腔 22.6mm · 耳道口 11.4mm · 45dB 高频补偿 RIC 助听器）",titleEn:"Senior Wide-Canal OTC RIC Hearing Aid Anti-Whistling Fit (22.6mm Concha · 11.4mm Canal · 45dB Gain)",deviceModel:"ClearHear Medical OTC RIC-312 + Vented Power Dome + Receiver Wire #3",deviceHousingWidthMm:14.8,conchaCavumDiameterMm:22.6,canalApertureDiameterMm:11.4,canalFirstBendDeg:21,naiveCartilagePeakKpa:38.6,arCartilagePeakKpa:16.8,comfortablePressureLimitKpa:22,recommendedEartipSize:"L-Power Double-Dome (13.8mm + 0.8mm Relief Vent · Wire Length #3)",naiveAcousticLeakDb:-8.2,arAcousticSealAttenuationDb:-32.6,hearingAidFeedbackMarginDb:16.8,naiveReturnRatePct:26.8,arReturnRatePct:3.2,annualNetSavingsPer100kOrdersUsd:184e4}};function A(a,i){const e=b[a],l=i==="pinna-3d-acoustic-seal-ar",c=l?e.arCartilagePeakKpa:e.naiveCartilagePeakKpa,d=l?e.recommendedEartipSize:"Blind Default Medium (12.0mm · Unverified Canal Fit)",s=l?e.arAcousticSealAttenuationDb:e.naiveAcousticLeakDb,u=l?e.hearingAidFeedbackMarginDb:-9.4,g=l?e.arReturnRatePct:e.naiveReturnRatePct,m=c<=e.comfortablePressureLimitKpa,p=s<=-30&&u>=12;return{scenario:e,mode:i,effectiveCartilagePeakKpa:c,effectiveEartipSize:d,effectiveSealAttenuationDb:s,effectiveFeedbackMarginDb:u,effectiveReturnRatePct:g,cartilagePainFreePass:m,acousticSealPass:p,verdictBadge:l?`3D PINNA + ACOUSTIC SEAL LOCKED (${c.toFixed(1)} kPa ≤ 22 kPa · ${s.toFixed(1)} dB ANC)`:`CARTILAGE PAIN & ACOUSTIC LEAK (${c.toFixed(1)} kPa · Whistling Risk)`}}const D=document.querySelector("#app");let k="wide-canal-ric-aid",v="pinna-3d-acoustic-seal-ar";function h(){const a=A(k,v),i=a.scenario,e=v==="pinna-3d-acoustic-seal-ar";D.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">Round 377 · 166th Curated Workbench · Domain 2 (OTC Hearing Aid, IEM & Flagship ANC TWS 3D Pinna & Acoustic Seal AR Studio)</span>
        <h1>OTC 助听器与旗舰降噪耳返 3D 耳廓/耳甲腔解剖拟合与声学气密性 AR 试戴工作台</h1>
        <p class="wb-subtitle">结合单目多角度侧头视频 ±0.35mm 外耳廓参数化 3D 重建、耳甲腔软骨超弹性接触压强场（≤ 22.0 kPa 防痛锁死）与外耳道第一弯折声学阻抗气密性求解器（防 3.2kHz 助听器啸叫与低频 ANC 泄漏），将退货率从 26.8% 压至 3.2%（每 10万单净省 +$1.84M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${a.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Scenario and Pipeline Controls">
      <div class="control-group">
        <span class="control-label">1. 选择外耳廓与外耳道解剖档位 (Pinna & Ear Canal Anatomy Preset):</span>
        <div class="btn-row">
          ${Object.keys(b).map(l=>`
            <button type="button" class="scenario-btn ${k===l?"active":""}" data-scenario="${l}">
              ${b[l].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换试戴与声学气密性管线 (Virtual Fit & Acoustic Seal Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-2d-photo-overlay">
            ❌ 传统基线：2D 侧脸贴图 + 默认 M 号耳塞盲发 (软骨胀痛 + 声学漏气啸叫)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="pinna-3d-acoustic-seal-ar">
            ✅ 推荐架构：3D 耳甲腔软骨压强有限元 + 外耳道气密性与防啸叫 AR 引擎
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Acoustic and Anatomical KPIs">
      <div class="kpi-card">
        <span class="kpi-title">耳屏/对耳屏软骨峰值压强 (Cartilage Pressure)</span>
        <strong class="kpi-value ${a.cartilagePainFreePass?"good":"bad"}" id="kpi-pressure">${a.effectiveCartilagePeakKpa.toFixed(1)} kPa</strong>
        <span class="kpi-sub">无痛佩戴阈值 ≤ ${i.comfortablePressureLimitKpa.toFixed(1)} kPa · 耳甲腔 ${i.conchaCavumDiameterMm.toFixed(1)}mm</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">低频声学隔音与 ANC 气密衰减 (Acoustic Seal)</span>
        <strong class="kpi-value ${a.acousticSealPass?"good":"bad"}" id="kpi-seal">${a.effectiveSealAttenuationDb.toFixed(1)} dB</strong>
        <span class="kpi-sub">推荐塞套：${a.effectiveEartipSize.split(" (")[0]} · 耳道口 ${i.canalApertureDiameterMm.toFixed(1)}mm</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">助听器 3.2kHz 啸叫安全裕度 (Feedback Margin)</span>
        <strong class="kpi-value ${a.effectiveFeedbackMarginDb>=12?"good":"bad"}" id="kpi-feedback">${a.effectiveFeedbackMarginDb>=0?"+":""}${a.effectiveFeedbackMarginDb.toFixed(1)} dB</strong>
        <span class="kpi-sub">${a.effectiveFeedbackMarginDb>=12?"零啸叫安全闭环 (Zero Whistling)":"声泄漏触发正反馈刺耳啸叫"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">全渠道退货率与每 10万单净收益 (ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">${a.effectiveReturnRatePct.toFixed(1)}% · +$${(i.annualNetSavingsPer100kOrdersUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">对比传统盲发 ${i.naiveReturnRatePct.toFixed(1)}% 医疗级消毒报废率</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>外耳廓 3D 解剖网格 (Tragus / Concha / Canal) 软骨压强热力图与声学气密性仿真画布</h2>
          <span class="tag">${i.deviceModel}</span>
        </div>
        <canvas id="ear-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>生物力学与声学阻抗审计明细 (Biomechanical & Acoustic Audit)</h2>
        <ul class="audit-list">
          <li><span>外耳廓解剖实测参数:</span> <strong>耳甲腔 ${i.conchaCavumDiameterMm.toFixed(1)}mm / 耳道口 ${i.canalApertureDiameterMm.toFixed(1)}mm / 弯折 ${i.canalFirstBendDeg}°</strong></li>
          <li><span>机身外壳几何宽度:</span> <strong>${i.deviceHousingWidthMm.toFixed(1)} mm (${i.deviceModel.split(" ")[0]})</strong></li>
          <li><span>对耳屏/耳轮脚软骨压强:</span> <strong>${a.effectiveCartilagePeakKpa.toFixed(1)} kPa (红线 ≤ ${i.comfortablePressureLimitKpa.toFixed(1)} kPa)</strong></li>
          <li><span>智能匹配耳塞套与导声管:</span> <strong>${a.effectiveEartipSize}</strong></li>
          <li><span>250Hz 声学气密隔音深度:</span> <strong>${a.effectiveSealAttenuationDb.toFixed(1)} dB</strong></li>
          <li><span>3.2kHz 助听器防啸叫裕度:</span> <strong>${a.effectiveFeedbackMarginDb>=0?"+":""}${a.effectiveFeedbackMarginDb.toFixed(1)} dB</strong></li>
          <li><span>每 10万单节省消毒报废成本:</span> <strong>+$${i.annualNetSavingsPer100kOrdersUsd.toLocaleString("en-US")} / 100k Orders</strong></li>
        </ul>
      </div>
    </main>
  `,F(),M(a)}function F(){document.querySelectorAll(".scenario-btn").forEach(a=>{a.addEventListener("click",()=>{k=a.dataset.scenario,h()})}),document.querySelectorAll(".mode-btn").forEach(a=>{a.addEventListener("click",()=>{v=a.dataset.mode,h()})})}function M(a){const i=document.querySelector("#ear-canvas");if(!i)return;const e=i.getContext("2d"),l=i.width,c=i.height,d=a.scenario,s=a.mode==="pinna-3d-acoustic-seal-ar";e.fillStyle="#090d16",e.fillRect(0,0,l,c),e.strokeStyle="rgba(148, 163, 184, 0.1)",e.lineWidth=1;for(let n=24;n<l;n+=28)e.beginPath(),e.moveTo(n,0),e.lineTo(n,c),e.stroke();for(let n=24;n<c;n+=28)e.beginPath(),e.moveTo(0,n),e.lineTo(l,n),e.stroke();e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. 3D Auricle / Concha Mesh & Cartilage Contact Pressure (kPa)",24,28);const u=195,g=205;if(e.save(),e.translate(u,g),e.fillStyle="rgba(241, 194, 165, 0.14)",e.strokeStyle=s?"#38bdf8":"#94a3b8",e.lineWidth=2.2,e.beginPath(),e.ellipse(0,0,88,132,-.12,0,Math.PI*2),e.fill(),e.stroke(),s){e.strokeStyle="rgba(56, 189, 248, 0.25)",e.lineWidth=1;for(let n=32;n<=82;n+=16)e.beginPath(),e.ellipse(0,-6,n,n*1.42,-.12,0,Math.PI*2),e.stroke()}const m=d.conchaCavumDiameterMm*2.2;e.fillStyle=s?"rgba(16, 185, 129, 0.18)":"rgba(239, 68, 68, 0.24)",e.strokeStyle=s?"#10b981":"#ef4444",e.lineWidth=2,e.beginPath(),e.ellipse(6,10,m,m*1.18,.08,0,Math.PI*2),e.fill(),e.stroke();const p=e.createRadialGradient(22,26,4,22,26,36);s?(p.addColorStop(0,"rgba(16, 185, 129, 0.75)"),p.addColorStop(1,"rgba(16, 185, 129, 0.0)")):(p.addColorStop(0,"rgba(239, 68, 68, 0.92)"),p.addColorStop(1,"rgba(239, 68, 68, 0.0)")),e.fillStyle=p,e.beginPath(),e.arc(22,26,36,0,Math.PI*2),e.fill(),e.fillStyle="#1e293b",e.strokeStyle=s?"#a855f7":"#f59e0b",e.lineWidth=2.2,e.beginPath(),e.roundRect(-18,-14,46,42,16),e.fill(),e.stroke(),e.restore(),e.fillStyle=s?"#34d399":"#f87171",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(s?`✓ Antitragus Peak: ${a.effectiveCartilagePeakKpa.toFixed(1)} kPa (≤ 22.0 kPa Comfort Lock)`:`✕ Cartilage Hotspot: ${a.effectiveCartilagePeakKpa.toFixed(1)} kPa (> 35 kPa Pain after 30m!)`,24,368);const t=420;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. Ear Canal First-Bend Cross-Section & Acoustic Seal / Feedback Solver",t,28),e.fillStyle="rgba(15, 23, 42, 0.92)",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(t,44,376,186,10),e.fill(),e.stroke();const r=d.canalApertureDiameterMm*3.1,o=136;e.strokeStyle="#fda4af",e.lineWidth=4,e.beginPath(),e.moveTo(t+28,o-r),e.quadraticCurveTo(t+170,o-r-10,t+330,o-r-d.canalFirstBendDeg*.55),e.stroke(),e.beginPath(),e.moveTo(t+28,o+r),e.quadraticCurveTo(t+170,o+r-6,t+330,o+r-d.canalFirstBendDeg*.55),e.stroke();const C=s?r+4:r-9;e.fillStyle=s?"rgba(56, 189, 248, 0.48)":"rgba(245, 158, 11, 0.42)",e.strokeStyle=s?"#38bdf8":"#f59e0b",e.lineWidth=2.2,e.beginPath(),e.ellipse(t+125,o-2,34,C,0,0,Math.PI*2),e.fill(),e.stroke(),e.strokeStyle="#a855f7",e.lineWidth=3,e.beginPath(),e.moveTo(t+334,o-r-d.canalFirstBendDeg*.55-4),e.lineTo(t+322,o+r-d.canalFirstBendDeg*.55+4),e.stroke(),e.fillStyle="#d8b4fe",e.font="11px Inter, system-ui, sans-serif",e.fillText("Tympanic Membrane",t+266,o+r+18),s?(e.fillStyle="#6ee7b7",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(`✓ 18% Radial Silicone Seal: ${a.effectiveSealAttenuationDb.toFixed(1)} dB Isolation · +${a.effectiveFeedbackMarginDb.toFixed(1)} dB Margin`,t+16,218)):(e.strokeStyle="#ef4444",e.lineWidth=2.2,e.beginPath(),e.moveTo(t+160,o-r+4),e.lineTo(t+42,o-r-14),e.stroke(),e.fillStyle="#fca5a5",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText("✕ Acoustic Leak: Low-Freq ANC -18dB Drop & 3.2kHz Whistling Loop!",t+16,218)),e.fillStyle="rgba(15, 23, 42, 0.92)",e.strokeStyle="rgba(148, 163, 184, 0.28)",e.lineWidth=1.5,e.beginPath(),e.roundRect(t,246,376,132,10),e.fill(),e.stroke(),e.fillStyle="#e2e8f0",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText("3. Acoustic Seal Frequency Response (50Hz–8kHz ANC & Feedback)",t+14,268),e.strokeStyle=s?"#10b981":"#ef4444",e.lineWidth=2.5,e.beginPath();for(let n=0;n<=340;n+=10){const S=t+18+n,P=n/340;let f=330;s?f=342-Math.sin(P*Math.PI)*18:f=304-Math.exp(-Math.pow((P-.72)/.06,2))*54,n===0?e.moveTo(S,f):e.lineTo(S,f)}e.stroke(),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText("100Hz (Bass/ANC)",t+18,366),e.fillText("1kHz (Speech)",t+154,366),e.fillText("3.2kHz (Feedback Gate)",t+256,366)}h();
