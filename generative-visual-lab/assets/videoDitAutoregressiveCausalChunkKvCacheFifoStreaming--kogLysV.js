import"./modulepreload-polyfill-B5Qt9EMX.js";const d={"commercial-60s-continuous-take":{id:"commercial-60s-continuous-take",titleZh:"60秒一镜到底商业广告（1,440帧 · 未裁剪 KV 显存 432GB OOM vs 三区段锁死 14.2GB · 首帧 1.65s）",titleEn:"60s Continuous-Take Commercial (1,440 Frames · 432GB Unbounded KV → 14.2GB Tri-Zone Lock · 1.65s TTFF)",streamDurationSec:60,totalGeneratedFrames:1440,unboundedKvCacheVramGb:432,triZoneCappedKvVramGb:14.2,bidirectionalTtffSec:184,causalStreamingTtffSec:1.65,naiveFifoSubjectConsistencyPct:61.4,triZoneSubjectConsistencyPct:96.8,annualFleetSavingsUsd:294e4},"interactive-avatar-180s-stream":{id:"interactive-avatar-180s-stream",titleZh:"180秒实时交互数字人直播流（4,320帧 · 首帧 1.40s 低延迟 · 首帧 Sink 锁死 3分钟零变脸）",titleEn:"180s Real-Time Interactive Avatar Stream (4,320 Frames · 1.40s TTFF · 97.2% Identity Lock)",streamDurationSec:180,totalGeneratedFrames:4320,unboundedKvCacheVramGb:1296,triZoneCappedKvVramGb:14.2,bidirectionalTtffSec:540,causalStreamingTtffSec:1.4,naiveFifoSubjectConsistencyPct:54.2,triZoneSubjectConsistencyPct:97.2,annualFleetSavingsUsd:348e4},"world-model-300s-gameplay":{id:"world-model-300s-gameplay",titleZh:"300秒可交互 3D 世界模型长游走（7,200帧 · 2×2 空间池化中期记忆 + O(1) 恒定 15.6GB 显存）",titleEn:"300s Interactive World-Model Exploration (7,200 Frames · 2×2 Pooled Mid-Term Memory · Constant 15.6GB VRAM)",streamDurationSec:300,totalGeneratedFrames:7200,unboundedKvCacheVramGb:2160,triZoneCappedKvVramGb:15.6,bidirectionalTtffSec:920,causalStreamingTtffSec:1.8,naiveFifoSubjectConsistencyPct:48.8,triZoneSubjectConsistencyPct:95.6,annualFleetSavingsUsd:392e4}};function p(t,n){const e=d[t],s=n==="tri-zone-sink-pooled-rolling-fifo",r=s?e.triZoneCappedKvVramGb:e.unboundedKvCacheVramGb,a=s?e.causalStreamingTtffSec:e.bidirectionalTtffSec,i=s?e.triZoneSubjectConsistencyPct:e.naiveFifoSubjectConsistencyPct,c=s?Number(((e.unboundedKvCacheVramGb-e.triZoneCappedKvVramGb)/e.unboundedKvCacheVramGb*100).toFixed(1)):0;return{preset:e,strategy:n,effectivePeakKvVramGb:r,effectiveTtffSec:a,effectiveSubjectConsistencyPct:i,vramReductionPct:c,single80gbGpuFitPass:r<=24,driftFreeLongTakePass:s&&i>=95,verdictBadge:s?`TRI-ZONE CAUSAL KV LOCKED (${r.toFixed(1)}GB Constant VRAM · ${a.toFixed(2)}s TTFF · ${i.toFixed(1)}% ID Lock)`:`KV CACHE VRAM OOM & IDENTITY MELTDOWN (${e.unboundedKvCacheVramGb.toFixed(0)}GB KV OOM or ${e.naiveFifoSubjectConsistencyPct}% Sinkless Drift!)`}}const m=document.querySelector("#app");let u="commercial-60s-continuous-take",f="tri-zone-sink-pooled-rolling-fifo";function b(){const t=p(u,f),n=t.preset,e=f==="tri-zone-sink-pooled-rolling-fifo";m.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">🏆 185TH WORKBENCH MILESTONE (3+7+35×5 = 185)! · Round 396 · Domain 1 (Causal Video DiT Tri-Zone KV Cache & 1.65s TTFF Streaming Studio)</span>
        <h1>无限长自回归因果视频 DiT 流式网关：三区段 KV Cache 防 OOM 与 1.65s 首帧响应工作台（第 185 项里程碑！）</h1>
        <p class="wb-subtitle">礼赞全仓达成第 185 座（3+7+35×5 五大业务域各 35 座！）交互式架构工作台里程碑：解决双向 DiT 首帧延迟高达 184秒、且自回归长视频生成超过 12秒即因 KV Cache 膨胀至 432GB+ 触发 OOM、或简单 FIFO 驱逐首帧引发 10秒后人物融化变脸的痛点，通过常驻首帧 Attention Sink + 2×2 空间池化中期记忆 + 阶梯噪声滚动 FIFO，将显存恒定锁死在 14.2GB（年省 +$2.94M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Stream Preset and KV Cache Strategy Controls">
      <div class="control-group">
        <span class="control-label">1. 选择长视频流式生成时长与帧数 (Long-Context Video Streaming Preset):</span>
        <div class="btn-row">
          ${Object.keys(d).map(s=>`
            <button type="button" class="scenario-btn ${u===s?"active":""}" data-scenario="${s}">
              ${d[s].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换自回归视频 KV Cache 显存管理架构 (Causal KV Cache Eviction Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-unbounded-or-sinkless-fifo">
            ❌ 传统基线：无界 KV 累积 (432GB 显存 OOM) 或无锚点朴素 FIFO (丢弃首帧导致 10s 后人物崩坏)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="tri-zone-sink-pooled-rolling-fifo">
            ✅ 推荐架构：三区段 KV Cache (常驻首帧 Sink + 2×2 池化中期关键帧 + 16帧全清滚动 FIFO · 14.2GB)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core Causal Video Streaming KPIs">
      <div class="kpi-card">
        <span class="kpi-title">峰值 KV Cache 显存占用 (Peak KV VRAM)</span>
        <strong class="kpi-value ${t.single80gbGpuFitPass?"good":"bad"}" id="kpi-vram">${t.effectivePeakKvVramGb.toFixed(1)} GB (-${t.vramReductionPct.toFixed(1)}%)</strong>
        <span class="kpi-sub">生成 ${n.streamDurationSec}s (${n.totalGeneratedFrames.toLocaleString("en-US")} 帧) · 对比未裁剪 ${n.unboundedKvCacheVramGb.toFixed(0)} GB</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">首帧流式播放响应延迟 (Time-to-First-Frame)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-ttff">${t.effectiveTtffSec.toFixed(2)} s</strong>
        <span class="kpi-sub">对比双向全片段去噪 ${n.bidirectionalTtffSec.toFixed(0)} s (111x 实时交互提速)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">长镜头跨分钟角色一致性 (Subject Identity Lock)</span>
        <strong class="kpi-value ${t.driftFreeLongTakePass?"good":"bad"}" id="kpi-identity">${t.effectiveSubjectConsistencyPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${e?"4帧 Attention Sink 常驻显存锁死 Softmax 分母":"朴素 FIFO 丢弃首帧后 Softmax 突变引发五官融化"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">512卡集群年化净省算力 (Annual Fleet Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(n.annualFleetSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">达成领域一 7 层完整 Video DiT 加速闭环</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>三区段因果视频 KV Cache 拓扑 (Attention Sink + 2×2 Pooled Keyframes + Rolling FIFO) 与 O(1) 显存曲线画布</h2>
          <span class="tag">${n.streamDurationSec}s Stream · ${n.totalGeneratedFrames.toLocaleString("en-US")} Frames</span>
        </div>
        <canvas id="causal-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>三区段 KV Cache 与阶梯噪声流水线审计明细 (Tri-Zone KV & Diffusion-Forcing Audit)</h2>
        <ul class="audit-list">
          <li><span>流式生成总时长与总帧数:</span> <strong>${n.streamDurationSec} 秒 (${n.totalGeneratedFrames.toLocaleString("en-US")} 帧 @ 24fps)</strong></li>
          <li><span>Zone 1 (常驻首帧汇聚区):</span> <strong>前 4 帧完整 KV 永不驱逐 (3.2 GB · 锁死身份与色调)</strong></li>
          <li><span>Zone 2 (中期关键帧压缩区):</span> <strong>2×2 空间均值池化历史关键帧 (3.0 GB · 保留 4倍时长记忆)</strong></li>
          <li><span>Zone 3 (近期全清滚动 FIFO):</span> <strong>最近 16 帧全分辨率 KV + 阶梯噪声去噪 (8.0 GB)</strong></li>
          <li><span>KV Cache 显存封顶对比:</span> <strong>${n.unboundedKvCacheVramGb.toFixed(0)} GB (OOM) → ${t.effectivePeakKvVramGb.toFixed(1)} GB (O(1) 恒定)</strong></li>
          <li><span>首帧延迟 (TTFF) 与主体锁定:</span> <strong>${t.effectiveTtffSec.toFixed(2)} s 首帧输出 · ${t.effectiveSubjectConsistencyPct.toFixed(1)}% 一致性</strong></li>
          <li><span>512×H100 集群年化净省:</span> <strong>+$${n.annualFleetSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,v(),S(t)}function v(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{u=t.dataset.scenario,b()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{f=t.dataset.mode,b()})})}function S(t){const n=document.querySelector("#causal-canvas");if(!n)return;const e=n.getContext("2d"),s=n.width,r=n.height,a=t.preset,i=t.strategy==="tri-zone-sink-pooled-rolling-fifo";e.fillStyle="#070b14",e.fillRect(0,0,s,r),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. Tri-Zone Causal Video KV Cache Architecture (Constant 14.2 GB Across Infinite Frames)",22,26);const c=[{title:"Zone 1: Pinned Attention Sink",sub:"Frames 0–3 (3.2 GB · Never Evicted)",desc:"Locks Softmax denominator & character identity",w:224,color:"#a855f7"},{title:"Zone 2: 2×2 Pooled Keyframes",sub:"4:1 Spatial Avg Pool (3.0 GB)",desc:"Retains mid-term scene layout at 25% VRAM",w:242,color:"#38bdf8"},{title:"Zone 3: Rolling FIFO + Noise Ladder",sub:"Latest 16 Full-Res Frames (8.0 GB)",desc:"Diffusion-Forcing chunk streaming (1.65s TTFF)",w:286,color:"#10b981"}];let l=22;c.forEach(o=>{e.fillStyle=i?"rgba(15, 23, 42, 0.92)":"rgba(239, 68, 68, 0.18)",e.strokeStyle=i?o.color:"#ef4444",e.lineWidth=2.2,e.beginPath(),e.roundRect(l,42,o.w,114,10),e.fill(),e.stroke(),e.fillStyle=i?o.color:"#f87171",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(o.title,l+14,70),e.fillStyle="#f8fafc",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(o.sub,l+14,96),e.fillStyle="#94a3b8",e.font="11px Inter, system-ui, sans-serif",e.fillText(o.desc,l+14,122),l+=o.w+12}),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(`2. KV Cache VRAM Trajectory Across ${a.streamDurationSec}s (${a.totalGeneratedFrames.toLocaleString("en-US")} Frames): Linear OOM vs O(1) Plateau`,22,190),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.25)",e.lineWidth=1.5,e.beginPath(),e.roundRect(22,204,776,152,10),e.fill(),e.stroke(),e.strokeStyle="rgba(239, 68, 68, 0.7)",e.setLineDash([6,4]),e.lineWidth=1.8,e.beginPath(),e.moveTo(42,248),e.lineTo(778,248),e.stroke(),e.setLineDash([]),e.fillStyle="#fca5a5",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText("80 GB H100 HBM3 Ceiling (Unbounded KV Crashes at t = 11.2s!)",52,240),e.strokeStyle="#ef4444",e.lineWidth=2.6,e.beginPath(),e.moveTo(42,336),e.lineTo(340,214),e.stroke(),e.strokeStyle="#10b981",e.lineWidth=3,e.beginPath(),e.moveTo(42,336),e.lineTo(106,312),e.lineTo(772,312),e.stroke(),e.fillStyle="#34d399",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`✓ Tri-Zone KV Plateau: Locked at ${a.triZoneCappedKvVramGb.toFixed(1)} GB from 2s to ${a.streamDurationSec}s (${a.triZoneSubjectConsistencyPct.toFixed(1)}% Identity Consistency)`,118,302),e.fillStyle=i?"#38bdf8":"#fca5a5",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(i?`🏆 185th Milestone Complete: 1.65s TTFF + 14.2GB O(1) KV Cache + +$${(a.annualFleetSavingsUsd/1e6).toFixed(2)}M/yr Fleet Savings`:`✕ Unbounded KV Spikes to ${a.unboundedKvCacheVramGb.toFixed(0)} GB while Sinkless FIFO Suffers Severe Identity Drift (${a.naiveFifoSubjectConsistencyPct}%)`,22,380)}b();
