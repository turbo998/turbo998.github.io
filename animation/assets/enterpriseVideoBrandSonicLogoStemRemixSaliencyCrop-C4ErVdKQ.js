import"./modulepreload-polyfill-B5Qt9EMX.js";const m={"global-tvc-60s-to-15s-9x16-cutdown":{id:"global-tvc-60s-to-15s-9x16-cutdown",title:"60s Master TVC to 15s 9:16 TikTok/Reels Cutdown with Bar-Aligned Stem Remix",titleZh:"60秒品牌母片自动缩编 15秒 9:16 竖屏广告（四轨小节无缝跳接 + 声学 Logo 尾奏锁调）",targetDurationSec:15,harmonicKey:"C Major → G7 → C Sonic Resolve",aspectRatios:"16:9 → 9:16 / 4:5 / 1:1",variantCount:48},"automotive-launch-30s-sonic-mnemonic-lock":{id:"automotive-launch-30s-sonic-mnemonic-lock",title:"30s Automotive Reveal with Two-Target L1-Spline Pan & Engine-Note Sonic Logo",titleZh:"30秒新车发布多画幅派生（双主体 L1 电影摇镜 + 品牌声学 Logo 零撞音对齐）",targetDurationSec:30,harmonicKey:"D Minor Pentatonic Tonic Lock",aspectRatios:"21:9 Cinema → 9:16 / 16:9",variantCount:36},"luxury-fashion-6s-bumper-saliency-tripod":{id:"luxury-fashion-6s-bumper-saliency-tripod",title:"6s Non-Skippable Bumper Ad with Downbeat Climax & Tripod-Locked Saliency Crop",titleZh:"6秒贴片闪促广告（重拍卡点缩编 + L1 三脚架防抖零晃动裁切）",targetDurationSec:6,harmonicKey:"A Minor → E7 Cadence Snap",aspectRatios:"16:9 → 9:16 / 1:1",variantCount:64}};function g(a,e,o){const t=Number(((o-.7)*1.4).toFixed(2));return e==="stem-beat-graph-sonic-logo-l1-tripod-reframe"?{scenarioId:a,pipelineMode:e,sonicLogoCadenceLockPct:100,l1TripodPanStabilityPct:Math.min(99.9,Number((99.3+t).toFixed(1))),subjectFramingRetentionPct:99.6,costPerVariantUsd:.014,annualSavingsUsdM:2.54,verdict:"Act automatically"}:e==="manual-nle-audio-editor-recut"?{scenarioId:a,pipelineMode:e,sonicLogoCadenceLockPct:99,l1TripodPanStabilityPct:98.4,subjectFramingRetentionPct:98.8,costPerVariantUsd:145,annualSavingsUsdM:.15,verdict:"Confirm"}:{scenarioId:a,pipelineMode:e,sonicLogoCadenceLockPct:56.5,l1TripodPanStabilityPct:62.2,subjectFramingRetentionPct:71.4,costPerVariantUsd:.38,annualSavingsUsdM:.06,verdict:"Send to a human"}}const b=document.querySelector("#app");if(!b)throw new Error("Missing #app root");let c="global-tvc-60s-to-15s-9x16-cutdown",l="stem-beat-graph-sonic-logo-l1-tripod-reframe",d=.85;function v(a){const e=a.getContext("2d");if(!e)return;const o=a.width,t=a.height;e.clearRect(0,0,o,t);const s=m[c],r=g(c,l,d),n=l==="naive-hard-fadeout-per-frame-bbox-jitter",u=e.createLinearGradient(0,0,o,t);u.addColorStop(0,"#070b14"),u.addColorStop(1,"#1e1b4b"),e.fillStyle=u,e.fillRect(0,0,o,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,o-32,46),e.strokeStyle=l==="stem-beat-graph-sonic-logo-l1-tripod-reframe"?"#10b981":"#ef4444",e.strokeRect(16,14,o-32,46),e.fillStyle="#38bdf8",e.font="bold 13px Inter, sans-serif",e.fillText(`262nd Workbench (51st in Domain 3) · ${s.targetDurationSec}s Cutdown · ${s.harmonicKey} · ${s.aspectRatios}`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Sonic Logo & Bar Cadence Lock: ${r.sonicLogoCadenceLockPct}% | L1 Tripod Pan Stability: ${r.l1TripodPanStabilityPct}% | Subject Framing: ${r.subjectFramingRetentionPct}%`,28,51);const S=[{title:"1. 4-Stem Beat-Grid Music Retimer (60s → "+s.targetDurationSec+"s)",detail:n?"⛔ Hard Mid-Bar Chop & Abrupt Fade-Out (43.5% Fail)":`✓ Bar-Aligned Cosine Seam Graph (${s.targetDurationSec}.00s Exact)`,color:n?"#ef4444":"#10b981",x:36,y:84},{title:"2. Brand Sonic-Logo Harmonic Outro Resolver",detail:n?"⛔ Clashing Semitone Overlay (+45 Cents Dissonance)":`✓ 100.0% Tonic Resolve (${s.harmonicKey})`,color:n?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. L1-Trend Piecewise Tripod Saliency Reframing",detail:n?"⛔ Per-Frame BBox Micro-Jitter (37.8% Motion Sickness)":`✓ Static Hold + Constant-Velocity Pan (${r.l1TripodPanStabilityPct}% Lock)`,color:n?"#ef4444":"#a855f7",x:36,y:178},{title:"4. Multi-Ratio Batch Output (9:16 / 4:5 / 1:1)",detail:n?"⛔ Severed Faces & Off-Beat Product Reveal":`✓ ${s.variantCount} Variants Synced ($${r.costPerVariantUsd}/Variant · +$${r.annualSavingsUsdM}M/yr)`,color:n?"#ef4444":"#f59e0b",x:396,y:178}];for(const i of S)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=i.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(i.x,i.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(i.title,i.x+14,i.y+28),e.fillStyle=i.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(i.detail,i.x+14,i.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#334155",e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`Active Cutdown & Sonic Branding Pipeline: ${s.title} (L1 Smoothness λ = ${d.toFixed(2)})`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(n?"⛔ Naive FFmpeg Trim + Frame-by-Frame Crop: Mid-Sentence Music Cut, Sonic Logo Clash & Wobble!":`✓ Demucs 4-Stem Beat Graph + Tonic-Locked Sonic Mnemonic + L1 Tripod Path (${r.l1TripodPanStabilityPct}% Stability · $${r.costPerVariantUsd}/Clip)`,54,336),e.restore()}function p(){const a=m[c],e=g(c,l,d);b.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">262nd Workbench (51st in Domain 3) · Multi-Duration Stem Remix, Sonic Logo &amp; L1 Saliency Crop</span>
        <h1>企业视频多时长 BGM 分轨弹性重编曲、品牌声学 Logo 尾帧调性对齐与 L1 样条智能横转竖工作台</h1>
        <p class="subtitle">四轨小节动态规划无缝缩编 (60s→15s/30s/6s) + 品牌声学 Logo 100% 和弦归位 + L1 稀疏趋势滤波电影三脚架横转竖 vs 硬切淡出与逐帧抖动追框</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">${e.sonicLogoCadenceLockPct}% Sonic Lock</span>
        <span class="metric-pill">$${e.costPerVariantUsd}/Variant</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 多时长缩编与多画幅派生场景 (Cutdown &amp; Reframe Scenario)</label>
        <select id="scenario-select">
          ${Object.values(m).map(t=>`<option value="${t.id}" ${t.id===c?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 音画缩编与智能构图架构 (Audio-Visual Cutdown Pipeline)</label>
        <select id="mode-select">
          <option value="stem-beat-graph-sonic-logo-l1-tripod-reframe" ${l==="stem-beat-graph-sonic-logo-l1-tripod-reframe"?"selected":""}>✅ 四轨小节图缩编 + 声学 Logo 锁调归位 + L1 三脚架防抖横转竖 (推荐)</option>
          <option value="naive-hard-fadeout-per-frame-bbox-jitter" ${l==="naive-hard-fadeout-per-frame-bbox-jitter"?"selected":""}>⛔ 秒表硬截断淡出 + 逐帧检测框跟随 (43.5% 半拍腰斩撞音，37.8% 画面眩晕抖动)</option>
          <option value="manual-nle-audio-editor-recut" ${l==="manual-nle-audio-editor-recut"?"selected":""}>⚠️ 人工后期剪辑师逐尺寸重剪混音 ($145/条，48 个多语种多画幅变体耗时 3 天)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="lambda-slider">3. L1 虚拟三脚架防抖惩罚权重 (L1 Tripod Smoothness λ: <strong>${d.toFixed(2)}</strong>)</label>
        <input id="lambda-slider" type="range" min="0.70" max="1.00" step="0.05" value="${d}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>四轨音乐无缝缩编、声学 Logo 锁调与 L1 三脚架运镜舞台 (Sonic &amp; L1 Reframe Stage)</h2>
          <span class="tag">${a.variantCount} Variants · ${a.targetDurationSec}s Target</span>
        </div>
        <canvas id="sonic-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>多时长多画幅自动派生产线遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">音乐小节收尾与声学 Logo 调性锁定率</span>
            <strong class="kpi-value">${e.sonicLogoCadenceLockPct}%</strong>
            <span class="kpi-note">${a.harmonicKey} 零半音冲突</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">L1 虚拟三脚架横转竖运镜稳定度</span>
            <strong class="kpi-value">${e.l1TripodPanStabilityPct}%</strong>
            <span class="kpi-note">消除逐帧手势跟随引发的镜头高频微晃</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">9:16 / 4:5 核心主体构图完整率</span>
            <strong class="kpi-value">${e.subjectFramingRetentionPct}%</strong>
            <span class="kpi-note">切点重置 + 匀速横摇 + 静止定格三态规划</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">单变体合成成本 / 年化净省</span>
            <strong class="kpi-value">$${e.costPerVariantUsd} · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">对比人工缩编混音 $145/条降本 99.99%</span>
          </div>
        </div>
      </aside>
    </main>
  `;const o=document.querySelector("#sonic-canvas");o&&v(o),document.querySelector("#scenario-select")?.addEventListener("change",t=>{c=t.target.value,p()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{l=t.target.value,p()}),document.querySelector("#lambda-slider")?.addEventListener("input",t=>{d=Number(t.target.value),p()})}p();
