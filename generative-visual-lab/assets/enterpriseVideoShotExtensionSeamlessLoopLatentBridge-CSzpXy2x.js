import"./modulepreload-polyfill-B5Qt9EMX.js";const v={"german-dub-narration-hold-extension":{id:"german-dub-narration-hold-extension",title:"Multilingual Dubbing Hold-Shot Extension (5.0s EN Clip -> 7.2s DE/ES Isochronous Hold)",titleZh:"出海德语/西语配音扩镜延展（5.0秒原片无损顺延至 7.2秒自然呼吸收尾）",baseDurationSec:5,targetDurationSec:7.2,chunkCount:2,isCyclicLoop:!1},"retail-signage-infinite-hero-loop":{id:"retail-signage-infinite-hero-loop",title:"Flagship Store LED Totem & Web Hero Infinite Loop (10.0s Zero-Jump-Cut Cyclic Loop)",titleZh:"线下门店 LED 竖屏与官网首焦无限循环视频（10.0秒首尾零跳切闭环）",baseDurationSec:5,targetDurationSec:10,chunkCount:2,isCyclicLoop:!0},"continuous-20s-brand-dolly-shot":{id:"continuous-20s-brand-dolly-shot",title:"20-Second Continuous Brand TVC Dolly Shot (4× 5s Chunks with AdaIN Color Lock)",titleZh:"20秒品牌 TVC 一镜到底推轨长镜头（4段×5秒潜空间拼接 + AdaIN 防偏色锁）",baseDurationSec:5,targetDurationSec:20,chunkCount:4,isCyclicLoop:!1}};function D(o,t,a){const e=v[o],l=Math.min(.6,(a-8)*.05);return t==="latent-16f-fifo-cyclic-adain-bridge"?{scenarioId:o,pipelineMode:t,overlapLatentFrames:a,boundaryVelocityContinuityPct:Number(Math.min(99.6,98.8+l).toFixed(1)),loopSeamInvisibilityPct:e.isCyclicLoop?99.6:99.4,cumulativeColorDriftDeltaE:Number((.28+e.chunkCount*.02).toFixed(2)),costPerExtendedClipUsd:Number((.017*e.chunkCount).toFixed(3)),annualSavingsUsdM:2.18,verdict:"Act automatically"}:t==="optical-flow-pingpong-time-stretch"?{scenarioId:o,pipelineMode:t,overlapLatentFrames:a,boundaryVelocityContinuityPct:71.4,loopSeamInvisibilityPct:68.5,cumulativeColorDriftDeltaE:.45,costPerExtendedClipUsd:.008,annualSavingsUsdM:.54,verdict:"Confirm"}:{scenarioId:o,pipelineMode:t,overlapLatentFrames:1,boundaryVelocityContinuityPct:57.2,loopSeamInvisibilityPct:e.isCyclicLoop?24.5:52,cumulativeColorDriftDeltaE:Number((2.15*e.chunkCount).toFixed(2)),costPerExtendedClipUsd:Number((.18*e.chunkCount).toFixed(3)),annualSavingsUsdM:.14,verdict:"Send to a human"}}const L=document.querySelector("#app");if(!L)throw new Error("Missing #app root");let p="continuous-20s-brand-dolly-shot",c="latent-16f-fifo-cyclic-adain-bridge",d=16;function P(o){const t=o.getContext("2d");if(!t)return;const a=o.width,e=o.height;t.clearRect(0,0,a,e);const l=v[p],b=D(p,c,d),s=c==="naive-single-last-frame-i2v-chain",C=c==="optical-flow-pingpong-time-stretch",y=t.createLinearGradient(0,0,0,e);y.addColorStop(0,"#070b14"),y.addColorStop(1,"#111827"),t.fillStyle=y,t.fillRect(0,0,a,e),t.fillStyle="rgba(15, 23, 42, 0.9)",t.fillRect(16,14,a-32,46),t.strokeStyle=c==="latent-16f-fifo-cyclic-adain-bridge"?"#10b981":"#ef4444",t.strokeRect(16,14,a-32,46),t.fillStyle="#f8fafc",t.font="bold 13px Inter, sans-serif",t.fillText(`237th Workbench · ${d}-Frame 3D Latent Overlap Bridge · ${l.baseDurationSec}s -> ${l.targetDurationSec}s (${l.chunkCount} Chunks)`,28,34),t.fillStyle="#94a3b8",t.font="11px Inter, sans-serif",t.fillText(`Velocity Continuity: ${b.boundaryVelocityContinuityPct}% | Color Drift ΔE: ${b.cumulativeColorDriftDeltaE} | Loop Seam Lock: ${b.loopSeamInvisibilityPct}%`,28,51);const r=92,f=88,u=42,h=a-84,x=h/l.chunkCount;for(let i=0;i<l.chunkCount;i++){const n=u+i*x,S=s?`rgba(${30+i*55}, ${41-i*6}, ${59-i*10}, 0.88)`:"rgba(30, 41, 59, 0.88)";t.fillStyle=S,t.strokeStyle=s?"#ef4444":"#38bdf8",t.lineWidth=2,t.beginPath(),t.roundRect(n+4,r,x-8,f,10),t.fill(),t.stroke(),t.fillStyle="#f8fafc",t.font="bold 12px Inter, sans-serif",t.fillText(`Chunk #${i+1} (81 Frames · 5.0s)`,n+16,r+26),t.fillStyle=s?"#fca5a5":"#6ee7b7",t.font="11px JetBrains Mono, monospace",t.fillText(s?`ΔE +${((i+1)*2.15).toFixed(2)} BURN`:`AdaIN Locked (ΔE 0.3${i})`,n+16,r+48),t.fillStyle="#94a3b8",t.font="10px Inter, sans-serif",t.fillText(s?"1-Frame Static RGB I2V":`${d}f Cosine Latent Overlap`,n+16,r+68),i>0&&(t.fillStyle=s?"rgba(239, 68, 68, 0.45)":"rgba(16, 185, 129, 0.35)",t.fillRect(n-14,r-6,28,f+12),t.fillStyle="#ffffff",t.font="bold 9px Inter, sans-serif",t.fillText(s?"JERK!":"FIFO",n-11,r+f/2+3))}const m=212,I=156;t.fillStyle="rgba(15, 23, 42, 0.78)",t.strokeStyle="#1e293b",t.beginPath(),t.roundRect(u,m,h,I,10),t.fill(),t.stroke(),t.fillStyle="#cbd5e1",t.font="bold 11px Inter, sans-serif",t.fillText("Optical-Flow Velocity Trajectory dx/dt (Green = Smooth 16f Latent Bridge vs. Red = Single-Frame I2V Freeze-Jerk)",u+14,m+22),t.save(),t.beginPath(),t.strokeStyle=s?"#ef4444":C?"#f59e0b":"#10b981",t.lineWidth=2.8;for(let i=0;i<=h-28;i+=4){const n=i/(h-28),S=Math.abs(n*l.chunkCount-Math.round(n*l.chunkCount));let k=Math.sin(n*Math.PI*4)*22;s&&S<.08&&n>.1&&n<.9?k=46:C&&n>.5&&(k=-Math.sin(n*Math.PI*6)*34);const E=u+14+i,$=m+96+k;i===0?t.moveTo(E,$):t.lineTo(E,$)}t.stroke(),t.restore(),l.isCyclicLoop&&(t.strokeStyle="#38bdf8",t.setLineDash([5,4]),t.beginPath(),t.moveTo(u+h-18,r+f/2),t.lineTo(u+18,r+f/2),t.stroke(),t.setLineDash([]))}function g(){const o=v[p],t=D(p,c,d);L.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">237th Interactive Architecture Workbench · Domain 3 (Video Localization & Long-Take Synthesis)</span>
        <h1>企业 AI 视频跨镜头无缝续写（Shot Extension）、多语种扩镜与无限循环闭环工作台</h1>
        <p class="subtitle">16帧 3D 潜空间余弦混叠 (FIFO Latent Bridge) + 首尾双锚点无缝循环 + 首帧 AdaIN 防偏色锁 (ΔE ≤ 0.36) vs 单末帧 I2V 硬接 (边界急停顿挫 & 4段连生严重发黄)</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${t.verdict}</span>
        <span class="metric-pill">${t.boundaryVelocityContinuityPct}% Velocity Lock</span>
        <span class="metric-pill">ΔE ${t.cumulativeColorDriftDeltaE}</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 业务长镜/循环场景 (Extension Scenario)</label>
        <select id="scenario-select">
          ${Object.values(v).map(e=>`<option value="${e.id}" ${e.id===p?"selected":""}>${e.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="pipeline-select">2. 跨镜头续写架构 (Extension Architecture)</label>
        <select id="pipeline-select">
          <option value="latent-16f-fifo-cyclic-adain-bridge" ${c==="latent-16f-fifo-cyclic-adain-bridge"?"selected":""}>✅ 16帧 3D 潜空间余弦混叠 + 首帧 AdaIN 锁色 + 首尾循环桥 (推荐)</option>
          <option value="naive-single-last-frame-i2v-chain" ${c==="naive-single-last-frame-i2v-chain"?"selected":""}>⛔ 仅截最后 1 帧解码 RGB 接 I2V (每5秒急停顿挫 & ΔE 8.6 严重偏色)</option>
          <option value="optical-flow-pingpong-time-stretch" ${c==="optical-flow-pingpong-time-stretch"?"selected":""}>⚠️ 正放+倒放 Ping-Pong / 光流硬慢放 (液体倒流穿帮)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="overlap-slider">3. 潜空间混叠窗口帧数 (Latent Overlap: <strong>${d} Frames</strong>)</label>
        <input id="overlap-slider" type="range" min="8" max="24" step="4" value="${d}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>多段 3D VAE 潜空间混叠时间轴与速度一阶导数连续性监控 (Latent Bridge & Velocity Continuity)</h2>
          <span class="tag">${o.baseDurationSec}s → ${o.targetDurationSec}s (${o.chunkCount} Chunks)</span>
        </div>
        <canvas id="extension-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>长镜续写与循环闭环质量遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">跨段边界运动速度连续性 (dx/dt Lock)</span>
            <strong class="kpi-value">${t.boundaryVelocityContinuityPct}%</strong>
            <span class="kpi-note">${d}帧潜向量保留相机与流体一阶动量</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">多段级联累积色偏 (Cumulative ΔE)</span>
            <strong class="kpi-value">ΔE ${t.cumulativeColorDriftDeltaE}</strong>
            <span class="kpi-note">锚定首段第1帧 LAB 均值方差 vs ΔE 8.6 发黄</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">门店大屏首尾循环无痕率 (Loop Seam)</span>
            <strong class="kpi-value">${t.loopSeamInvisibilityPct}%</strong>
            <span class="kpi-note">尾部8帧→头部8帧 FLF2V 环形潜空间内绘</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单条扩镜成本 / 年化节省</span>
            <strong class="kpi-value">$${t.costPerExtendedClipUsd.toFixed(3)} · +$${t.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">免除因配音超时或接缝跳切导致的整条重跑</span>
          </div>
        </div>
      </aside>
    </main>
  `;const a=document.querySelector("#extension-canvas");a&&P(a),document.querySelector("#scenario-select")?.addEventListener("change",e=>{p=e.target.value,g()}),document.querySelector("#pipeline-select")?.addEventListener("change",e=>{c=e.target.value,g()}),document.querySelector("#overlap-slider")?.addEventListener("input",e=>{d=Number(e.target.value),g()})}g();
