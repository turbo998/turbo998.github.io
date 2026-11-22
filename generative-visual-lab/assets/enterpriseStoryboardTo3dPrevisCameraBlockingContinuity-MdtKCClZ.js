import"./modulepreload-polyfill-B5Qt9EMX.js";const S={"executive-boardroom-8shot-tvc":{id:"executive-boardroom-8shot-tvc",title:"8-Shot Enterprise SaaS TVC: Boardroom Establishing (24mm) -> Two-Shot (50mm) -> OTS Reverse Cuts (85mm)",titleZh:"8镜头企业品牌 TVC 分镜预演：会议室 24mm 全景建立 -> 50mm 双人中景 -> 85mm 正反打过肩特写",shotCount:8,shots:[{shotNum:1,label:"Wide Establishing",focalLengthMm:24,cameraAzimuthDeg:-55},{shotNum:2,label:"Medium Two-Shot",focalLengthMm:50,cameraAzimuthDeg:-15},{shotNum:3,label:"OTS Speaker A",focalLengthMm:85,cameraAzimuthDeg:-38},{shotNum:4,label:"OTS Speaker B (Reverse)",focalLengthMm:85,cameraAzimuthDeg:38}]},"automotive-showroom-6shot-reveal":{id:"automotive-showroom-6shot-reveal",title:"6-Shot EV Launch Commercial: 18mm Low-Angle Hero -> 35mm Tracking -> 100mm Headlight Macro",titleZh:"6镜头新能源车发布 TVC 预演：18mm 低角度广角 -> 35mm 侧跟拍 -> 100mm 矩阵大灯微距",shotCount:6,shots:[{shotNum:1,label:"Low-Angle Hero Wide",focalLengthMm:18,cameraAzimuthDeg:-45},{shotNum:2,label:"Side Profile Track",focalLengthMm:35,cameraAzimuthDeg:0},{shotNum:3,label:"Interior Cockpit",focalLengthMm:24,cameraAzimuthDeg:25},{shotNum:4,label:"Headlight Macro",focalLengthMm:100,cameraAzimuthDeg:-30}]},"game-cutscene-corridor-chase":{id:"game-cutscene-corridor-chase",title:"10-Shot Sci-Fi Game Cutscene: Corridor Blocking + Dutch-Tilt Action Continuity",titleZh:"10镜头科幻游戏过场动画预演：走廊空间走位锁定 + 连续切镜光影对齐",shotCount:10,shots:[{shotNum:1,label:"Corridor Long Shot",focalLengthMm:28,cameraAzimuthDeg:-60},{shotNum:2,label:"Over-Shoulder Sprint",focalLengthMm:35,cameraAzimuthDeg:-20},{shotNum:3,label:"Close-Up Reaction",focalLengthMm:85,cameraAzimuthDeg:30},{shotNum:4,label:"Door Breach Wide",focalLengthMm:24,cameraAzimuthDeg:55}]}};function M(a,e,s){const t=S[a],h=s>=50?.2:.1;return e==="shared-3d-blockout-180axis-kv-lock"?{scenarioId:a,pipelineMode:e,spatialSetContinuityPct:Number(Math.min(99.8,99.4+h).toFixed(1)),axis180CompliancePct:100,focalLengthErrorMm:.2,costPerAnimaticUsd:Number((.042*t.shotCount).toFixed(2)),annualSavingsUsdM:2.72,verdict:"Act automatically"}:e==="2d-image-storyboard-i2v-without-3d"?{scenarioId:a,pipelineMode:e,spatialSetContinuityPct:71.4,axis180CompliancePct:78.5,focalLengthErrorMm:11.4,costPerAnimaticUsd:Number((.18*t.shotCount).toFixed(2)),annualSavingsUsdM:.68,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,spatialSetContinuityPct:35.8,axis180CompliancePct:61.4,focalLengthErrorMm:22.8,costPerAnimaticUsd:Number((.45*t.shotCount).toFixed(2)),annualSavingsUsdM:.12,verdict:"Send to a human"}}const D=document.querySelector("#app");if(!D)throw new Error("Missing #app root");let m="executive-boardroom-8shot-tvc",l="shared-3d-blockout-180axis-kv-lock",d=85;function T(a){const e=a.getContext("2d");if(!e)return;const s=a.width,t=a.height;e.clearRect(0,0,s,t);const h=S[m],b=M(m,l,d),i=l==="independent-t2v-per-shot-prompting",k=e.createLinearGradient(0,0,s,t);k.addColorStop(0,"#070b14"),k.addColorStop(1,"#111827"),e.fillStyle=k,e.fillRect(0,0,s,t),e.fillStyle="rgba(15, 23, 42, 0.9)",e.fillRect(16,14,s-32,46),e.strokeStyle=l==="shared-3d-blockout-180axis-kv-lock"?"#10b981":"#ef4444",e.strokeRect(16,14,s-32,46),e.fillStyle="#f8fafc",e.font="bold 13px Inter, sans-serif",e.fillText(`243rd Workbench · Shared 3D USD/GLB Set Blockout + 180° Axis Camera Hemisphere (${h.shotCount}-Shot Animatic)`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Cross-Shot Set Continuity: ${b.spatialSetContinuityPct}% | 180° Axis Compliance: ${b.axis180CompliancePct}% | Focal Error: ±${b.focalLengthErrorMm}mm`,28,51);const n=28,C=82,y=310,P=286;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle="#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(n,C,y,P,12),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 12px Inter, sans-serif",e.fillText("Top-Down 3D Set Proxy & 180° Camera Hemisphere",n+14,C+24);const x=n+y/2,r=C+135;e.strokeStyle="#fbbf24",e.setLineDash([6,4]),e.beginPath(),e.moveTo(n+24,r),e.lineTo(n+y-24,r),e.stroke(),e.setLineDash([]),e.fillStyle="#fbbf24",e.font="10px JetBrains Mono, monospace",e.fillText("180° LINE OF ACTION (NO CROSSING)",n+54,r-8),e.fillStyle="#34d399",e.beginPath(),e.arc(x-46,r,12,0,Math.PI*2),e.arc(x+46,r,12,0,Math.PI*2),e.fill(),h.shots.forEach((c,o)=>{const f=n+48+o*68,g=i&&o===3?r-58:r+86;e.fillStyle=i&&o===3?"#ef4444":"#38bdf8",e.beginPath(),e.arc(f,g,7,0,Math.PI*2),e.fill(),e.fillStyle="#e2e8f0",e.font="10px JetBrains Mono, monospace",e.fillText(`Cam${c.shotNum}(${c.focalLengthMm}mm)`,f-24,g+20)}),e.restore();const L=358,A=376;e.save(),e.fillStyle="rgba(15, 23, 42, 0.88)",e.strokeStyle=i?"#ef4444":"#10b981",e.lineWidth=2,e.beginPath(),e.roundRect(L,82,A,286,12),e.fill(),e.stroke(),e.fillStyle=i?"#f87171":"#34d399",e.font="bold 12px Inter, sans-serif",e.fillText(i?"⛔ Independent T2V Shots: 64.2% Room & Furniture Amnesia!":`✅ Shared 3D Depth + Set KV Lock (Active Lens: ${d}mm)`,L+16,106),h.shots.forEach((c,o)=>{const f=o%2,g=Math.floor(o/2),p=L+16+f*176,u=122+g*116;e.fillStyle=i&&o>=2?"#2b1219":"#090d16",e.strokeStyle=i&&o>=2?"#ef4444":"#334155",e.beginPath(),e.roundRect(p,u,164,102,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, sans-serif",e.fillText(`Shot #${c.shotNum} · ${c.focalLengthMm}mm`,p+10,u+22),e.fillStyle="#94a3b8",e.font="10px Inter, sans-serif",e.fillText(c.label,p+10,u+42),e.fillStyle=i&&o>=2?"#fca5a5":"#6ee7b7",e.font="bold 10px JetBrains Mono, monospace",e.fillText(i&&o>=2?"✕ Window Turned to Wall!":"✓ 100% Set & Axis Locked",p+10,u+68),e.fillText(i&&o===3?"✕ 180° Eyeline Flipped!":"✓ USD Cam + Wan-VACE KV",p+10,u+86)}),e.restore()}function v(){const a=S[m],e=M(m,l,d);D.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">243rd Interactive Architecture Workbench · Domain 4 (Multi-Shot Previs & Camera Continuity)</span>
        <h1>影视与广告分镜脚本转 3D 动态预演（Storyboard-to-3D Previs）与跨镜头空间连续性工作台</h1>
        <p class="subtitle">共享 3D 场景白模 (USD/GLB) + 180° 正反打安全半球锁 + 24/50/85mm 真实物理焦段矩阵 + 跨镜头背景 KV 缓存 vs 逐镜独立文生视频 (切个镜头窗户变书架)</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.spatialSetContinuityPct}% Set Continuity</span>
        <span class="metric-pill">±${e.focalLengthErrorMm}mm Lens Lock</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 多镜头分镜预演场景 (Storyboard Scenario)</label>
        <select id="scenario-select">
          ${Object.values(S).map(t=>`<option value="${t.id}" ${t.id===m?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="pipeline-select">2. 跨镜头连续性架构 (Multi-Shot Continuity Pipeline)</label>
        <select id="pipeline-select">
          <option value="shared-3d-blockout-180axis-kv-lock" ${l==="shared-3d-blockout-180axis-kv-lock"?"selected":""}>✅ 共享 3D 白模机位 + 180° 轴线锁 + Wan-VACE 共享场景 KV (推荐)</option>
          <option value="independent-t2v-per-shot-prompting" ${l==="independent-t2v-per-shot-prompting"?"selected":""}>⛔ 各分镜独立跑文生视频 T2V (64.2% 房间家具大变样 & 38.6% 越轴穿帮)</option>
          <option value="2d-image-storyboard-i2v-without-3d" ${l==="2d-image-storyboard-i2v-without-3d"?"selected":""}>⚠️ 纯 2D 分镜图转 I2V 无 3D 代理 (正反打背景透视对不上)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="focal-slider">3. 主特写物理镜头焦距 (Virtual Prime Lens: <strong>${d} mm</strong>)</label>
        <input id="focal-slider" type="range" min="24" max="100" step="11" value="${d}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>俯视 3D 机位走位图（180° 轴线锁）与跨镜头布景一致性预览 (3D Camera Blocking & Set Lock)</h2>
          <span class="tag">${a.shotCount} Shots · OTIO + USD Export</span>
        </div>
        <canvas id="previs-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>跨镜头空间连续性与导演预演遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">跨镜头房间/家具空间保持率</span>
            <strong class="kpi-value">${e.spatialSetContinuityPct}%</strong>
            <span class="kpi-note">共享单套 3D 场景白模 vs 独立生成 35.8% 失忆</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">180° 导演轴线与视线合规率</span>
            <strong class="kpi-value">${e.axis180CompliancePct}%</strong>
            <span class="kpi-note">机位限制在安全半球内，杜绝正反打同向穿帮</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">物理定焦镜头透视误差 (Focal Error)</span>
            <strong class="kpi-value">±${e.focalLengthErrorMm} mm</strong>
            <span class="kpi-note">精确相机内参矩阵 K(f) vs 提示词 ±22.8mm 盲猜</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">整支动态分镜成本 / 年化节省</span>
            <strong class="kpi-value">$${e.costPerAnimaticUsd.toFixed(2)} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">一键导出 OpenTimelineIO (.otio) 与 USD 摄影机轨</span>
          </div>
        </div>
      </aside>
    </main>
  `;const s=document.querySelector("#previs-canvas");s&&T(s),document.querySelector("#scenario-select")?.addEventListener("change",t=>{m=t.target.value,v()}),document.querySelector("#pipeline-select")?.addEventListener("change",t=>{l=t.target.value,v()}),document.querySelector("#focal-slider")?.addEventListener("input",t=>{d=Number(t.target.value),v()})}v();
