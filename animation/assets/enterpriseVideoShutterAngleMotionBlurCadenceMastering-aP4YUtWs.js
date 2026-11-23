import"./modulepreload-polyfill-B5Qt9EMX.js";const g={"automotive-tvc-mixed-16fps-ai-24fps-alexa":{id:"automotive-tvc-mixed-16fps-ai-24fps-alexa",title:"Automotive TVC Master: Mixing 16fps Wan2.1 AI Shots + 30fps Drone + 24fps ARRI Alexa Plates",titleZh:"汽车品牌 TVC 混剪母带：16fps 开源 AI 镜头 + 30fps 航拍 + 24fps 阿莱实拍统一 180° 快门角",sourceRatesLabel:"16fps AI DiT + 30fps Drone + 24fps ARRI",targetMasterFps:24,recommendedShutterDeg:180},"remotion-3d-product-reveal-0deg-strobe":{id:"remotion-3d-product-reveal-0deg-strobe",title:"Three.js / Remotion 3D Product Fly-In: Eliminating 0°-Shutter CG Staccato Strobe",titleZh:"Three.js / Remotion 代码渲染 3D 产品飞入：消除 0° 快门角 CG 频闪感与假塑料感",sourceRatesLabel:"0°-Shutter Instant CG Render -> 24fps 180° Blur",targetMasterFps:24,recommendedShutterDeg:180},"multichannel-24fps-cinema-60fps-social":{id:"multichannel-24fps-cinema-60fps-social",title:"Dual-Master Delivery: 24fps Cinema (180° Shutter) + 60fps TikTok/Reels (90° Anti-Soap-Opera)",titleZh:"双端母带同源分发：24fps 影院版（180°快门）+ 60fps 抖音竖屏版（90°快门消除肥皂剧感）",sourceRatesLabel:"Single Timeline -> 24fps (180°) & 60fps (90°)",targetMasterFps:60,recommendedShutterDeg:90}};function x(a,e,s){const t=g[a],c=Math.abs(s-t.recommendedShutterDeg)*.03;return e==="subframe-8x-raft-180deg-shutter-integrator"?{scenarioId:a,pipelineMode:e,shutterAngleDeg:s,cinematicCadenceScorePct:Number(Math.max(92,99.4-c).toFixed(1)),crossCutGhostingRatePct:0,staccatoJudderIndexPct:.8,costPerClipUsd:.012,annualSavingsUsdM:1.96,verdict:"Act automatically"}:e==="unbounded-frame-blending-ghost"?{scenarioId:a,pipelineMode:e,shutterAngleDeg:s,cinematicCadenceScorePct:68.4,crossCutGhostingRatePct:24.6,staccatoJudderIndexPct:9.2,costPerClipUsd:.004,annualSavingsUsdM:.35,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,shutterAngleDeg:0,cinematicCadenceScorePct:58.5,crossCutGhostingRatePct:0,staccatoJudderIndexPct:41.5,costPerClipUsd:.002,annualSavingsUsdM:.08,verdict:"Send to a human"}}const y=document.querySelector("#app");if(!y)throw new Error("Missing #app root");let l="automotive-tvc-mixed-16fps-ai-24fps-alexa",o="subframe-8x-raft-180deg-shutter-integrator",n=180;function R(a){const e=a.getContext("2d");if(!e)return;const s=a.width,t=a.height;e.clearRect(0,0,s,t);const c=g[l],d=x(l,o,n),i=o==="naive-nearest-frame-drop-duplication",P=o==="unbounded-frame-blending-ghost",b=e.createLinearGradient(0,0,s,t);b.addColorStop(0,"#070b14"),b.addColorStop(1,"#111827"),e.fillStyle=b,e.fillRect(0,0,s,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,s-32,46),e.strokeStyle=o==="subframe-8x-raft-180deg-shutter-integrator"?"#10b981":"#ef4444",e.strokeRect(16,14,s-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`242nd Workbench · ${n}° Rotary Shutter Motion-Blur Integrator (${c.sourceRatesLabel} -> ${c.targetMasterFps}fps)`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Cinematic Cadence Parity: ${d.cinematicCadenceScorePct}% | Staccato Judder: ${d.staccatoJudderIndexPct}% | Cross-Cut Ghosting: ${d.crossCutGhostingRatePct}%`,28,51);const p=148,u=220,h=92;e.save(),e.fillStyle="#1e293b",e.strokeStyle="#475569",e.lineWidth=2,e.beginPath(),e.arc(p,u,h,0,Math.PI*2),e.fill(),e.stroke();const v=i?5:n,C=v/360*Math.PI*2;e.fillStyle=i?"rgba(239, 68, 68, 0.45)":"rgba(16, 185, 129, 0.38)",e.strokeStyle=i?"#ef4444":"#10b981",e.beginPath(),e.moveTo(p,u),e.arc(p,u,h,-Math.PI/2,-Math.PI/2+C),e.closePath(),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.textAlign="center",e.fillText(i?"0° Instant Strobe":`${n}° Shutter Arc`,p,u+h+24),e.fillStyle="#94a3b8",e.font="11px JetBrains Mono, monospace",e.fillText(`Exposure: 1/${Math.round(c.targetMasterFps*360/Math.max(10,v))}s`,p,u+h+42),e.restore();const r=285,S=445;e.save(),e.fillStyle="rgba(15, 23, 42, 0.86)",e.strokeStyle="#334155",e.beginPath(),e.roundRect(r,82,S,286,12),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText("8× Sub-Frame Velocity Integration vs. Staccato Frame Duplication",r+18,108);for(let f=0;f<8;f++){const k=(f-3.5)*(v/180)*14;e.fillStyle=i?f===4?"#ef4444":"transparent":P?"rgba(245, 158, 11, 0.25)":`rgba(56, 189, 248, ${.18+(4-Math.abs(f-3.5))*.08})`,e.beginPath(),e.roundRect(r+165+k,148,96,54,10),e.fill()}e.strokeStyle=i?"#ef4444":"#34d399",e.lineWidth=2,e.strokeRect(r+165,148,96,54),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.fillText(i?"0° Harsh Strobe":`${n}° Directional Blur`,r+174,179),e.fillStyle="#090d16",e.fillRect(r+18,228,S-36,120),e.strokeStyle="#1e293b",e.strokeRect(r+18,228,S-36,120),e.fillStyle=i?"#fca5a5":"#6ee7b7",e.font="bold 11px JetBrains Mono, monospace",e.fillText(i?"⛔ 16fps -> 24fps Nearest-Frame Pulldown: Every 2nd frame duplicated (41.5% Judder)!":"✅ Phase-Aligned 8x RAFT Optical-Flow Integration: 99.4% ARRI Alexa 180° Parity",r+30,256),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText("• Cut-Boundary Guard: 0.0% cross-cut ghosting (auto-resets integration window at scene cuts)",r+30,284),e.fillText("• Foreground UI / Subtitle Bypass: Keeps vector typography at crisp 45° readability lock",r+30,308),e.fillText(`• Unit Mastering Cost: $${d.costPerClipUsd.toFixed(3)} / clip (Saves +$${d.annualSavingsUsdM.toFixed(2)}M/yr vs manual Nuke Kronos)`,r+30,332),e.restore()}function m(){const a=g[l],e=x(l,o,n);y.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">242nd Interactive Architecture Workbench · Domain 3 (Video Post-Production & Cadence Mastering)</span>
        <h1>企业混剪视频快门角（180° Shutter Angle）运动模糊合成与跨帧率防顿挫母带工作台</h1>
        <p class="subtitle">8× 子帧双向光流 180° 旋转快门积分 (99.4% 阿莱电影感对齐) + 切点零鬼影门禁 + 16fps/30fps/60fps 无顿挫统一 24fps 母带 vs 丢帧硬抽与 0° 快门 CG 频闪感</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.cinematicCadenceScorePct}% Cinema Parity</span>
        <span class="metric-pill">${e.staccatoJudderIndexPct}% Judder</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 混剪与跨帧率交付场景 (Mastering Scenario)</label>
        <select id="scenario-select">
          ${Object.values(g).map(t=>`<option value="${t.id}" ${t.id===l?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="pipeline-select">2. 快门角与帧率转换管线 (Shutter & Cadence Pipeline)</label>
        <select id="pipeline-select">
          <option value="subframe-8x-raft-180deg-shutter-integrator" ${o==="subframe-8x-raft-180deg-shutter-integrator"?"selected":""}>✅ 8× 子帧光流 180° 快门积分 + 切点隔离 + 字幕锐度保护 (推荐)</option>
          <option value="naive-nearest-frame-drop-duplication" ${o==="naive-nearest-frame-drop-duplication"?"selected":""}>⛔ 直接按最近邻抽帧/重复帧 (16fps->24fps 产生 41.5% 周期性卡顿与 0° 频闪)</option>
          <option value="unbounded-frame-blending-ghost" ${o==="unbounded-frame-blending-ghost"?"selected":""}>⚠️ 传统前后帧透明度叠化 (Frame Blending：产生双影重影与 24.6% 跨镜头鬼影)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="shutter-slider">3. 虚拟旋转快门角 (Rotary Shutter Angle: <strong>${n}°</strong>)</label>
        <input id="shutter-slider" type="range" min="45" max="270" step="45" value="${n}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>180° 旋转快门曝光弧与 8× 子帧运动模糊方向核监控 (Rotary Shutter & Motion-Blur Kernel)</h2>
          <span class="tag">${a.sourceRatesLabel} → ${a.targetMasterFps}fps</span>
        </div>
        <canvas id="shutter-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>电影级动态模糊与母带平滑度遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">ARRI 180° 电影快门质感还原度</span>
            <strong class="kpi-value">${e.cinematicCadenceScorePct}%</strong>
            <span class="kpi-note">消除 Three.js/Remotion 与 AI 帧的 0° 频闪塑料感</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">跨帧率抽帧顿挫指数 (Judder Index)</span>
            <strong class="kpi-value">${e.staccatoJudderIndexPct}%</strong>
            <span class="kpi-note">16fps/30fps 相位对齐重采样 vs 41.5% 重复帧卡顿</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">镜头切换边界残影率 (Cross-Cut Ghost)</span>
            <strong class="kpi-value">${e.crossCutGhostingRatePct}%</strong>
            <span class="kpi-note">切点两侧强制截断光流积分窗口 (0.0% 串镜)</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单条母带处理成本 / 年化节省</span>
            <strong class="kpi-value">$${e.costPerClipUsd.toFixed(3)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">替代昂贵的人工 Nuke Kronos / RSMB 逐镜调参</span>
          </div>
        </div>
      </aside>
    </main>
  `;const s=document.querySelector("#shutter-canvas");s&&R(s),document.querySelector("#scenario-select")?.addEventListener("change",t=>{l=t.target.value,n=g[l].recommendedShutterDeg,m()}),document.querySelector("#pipeline-select")?.addEventListener("change",t=>{o=t.target.value,m()}),document.querySelector("#shutter-slider")?.addEventListener("input",t=>{n=Number(t.target.value),m()})}m();
