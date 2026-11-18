import"./modulepreload-polyfill-B5Qt9EMX.js";const h={stream_diffusion_tensorrt_latent_cache_lock:{id:"stream_diffusion_tensorrt_latent_cache_lock",label:"StreamDiffusion Batch Pipe + TensorRT FP16/FP8 + Similarity Filter (l_frame = l_0/(1+u), 30fps Lock = 1.0000×)",labelZh:"StreamDiffusion 流水线批处理 + TensorRT 引擎 + 相似帧潜空间过滤（单帧耗时 l_0/(1+u)，30fps 恒锁 1.0000×）",subtitle:"Combines 4-step LCM/ADD consistency distillation, Stream-Batch diagonal step pipelining, Residual CFG (R-CFG), and Stochastic Similarity Filtering on TensorRT to lock sub-33ms 30fps live-commerce streaming at 1.0000× across all 17 stages.",subtitleZh:"通过 4 步一致性蒸馏（LCM/ADD）、Stream-Batch 跨帧对角线流水线并行、残差无分类器引导（R-CFG，省去 50% 负向条件 UNet 计算）与随机相似帧潜空间缓存过滤（Stochastic Similarity Filter），在全 17 个智能直播间实时交互档位恒定锁死 30fps（<33.3ms）帧延迟比 1.0000×。",useStreamDiffusionPipeline:!0,defaultStationIndex:16,badge:"SUB-33MS 30FPS STREAM LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"30fps 实时流锁死 · 1.0000×（0/17 站卡顿或闪烁）",description:"Enterprise 24x7 live-commerce studios and interactive retail installations achieve <25ms latency and zero background boiling by replacing sequential 50-step CFG diffusion with StreamDiffusion + TensorRT + TinyAutoEncoder (TAESD).",descriptionZh:"企业 24×7 品牌自播间与线下旗舰店互动大屏通过 StreamDiffusion + TensorRT 算子融合 + TAESD 轻量编解码，将单帧生成延迟从 1,500ms 压降至 20ms 以内，彻底消除画面闪烁与音画不同步。"},naive_per_frame_50step_diffusion_stall:{id:"naive_per_frame_50step_diffusion_stall",label:"Naive Per-Frame 50-Step Dual-CFG Diffusion (Slideshow Stall & Boiling Overrun = 1 + u up to 2.0000×)",labelZh:"朴素逐帧独立 50 步双倍 CFG 扩散推理（幻灯片式卡顿、背景高频沸腾闪烁，延迟超支达 2.0000×）",subtitle:"Runs unbatched 30–50 step dual-CFG diffusion with full VAE encode/decode independently on every webcam frame, causing <1fps lag, violent temporal flicker, and 2.0000× frame-budget overrun at Station 16.",subtitleZh:"对摄像头采集的每一帧画面独立执行 30–50 步标准双倍 CFG 扩散与完整 VAE 编解码，既无跨帧噪声锁定也无相似帧跳过，导致画面卡成 <1fps 幻灯片且背景剧烈沸腾闪烁，使第 16 档实时流延迟超支翻倍至 2.0000×。",useStreamDiffusionPipeline:!1,defaultStationIndex:16,badge:"SLIDESHOW STALL & FLICKER · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"逐帧卡顿与闪烁超支 · 最高 2.0000×（16/17 站违背）",description:"Applying offline image-generation diffusion loops directly to a 30fps live video stream fails real-time interactive latency and temporal coherence across 16/17 live-commerce stages.",descriptionZh:"直接把离线文生图的 50 步串行去噪循环套用在 30fps 直播视频流上，必然导致秒级延迟积压与不可接受的帧间闪烁。"}},x=17,D=["Stage 0: Camera Capture Ring-Buffer (Zero-Copy CUDA IPC)","Stage 1: TAESD TinyAutoEncoder Latent Encode (1.2ms)","Stage 2: Stochastic Similarity Filter (Skip Static Delta)","Stage 3: Fixed-Seed Temporal Gaussian Noise Anchor","Stage 4: 4-Step LCM / ADD Consistency Distillation Schedule","Stage 5: Stream-Batch Diagonal Step Pipelining (4 Frames)","Stage 6: Residual CFG (R-CFG Single-Pass Conditioning)","Stage 7: TensorRT FP16/FP8 UNet Kernel Graph Fusion","Stage 8: ControlNet Depth/Pose Lightweight TensorRT Branch","Stage 9: Latent Exponential Moving Average (EMA) Smoother","Stage 10: Host Foreground Matting & Zero-Latency Pass-Through","Stage 11: Real-Time Product SKU Pop-Up HUD Overlay","Stage 12: Live Danmaku / Comment Keyword Scene Trigger","Stage 13: TAESD Parallel Latent-to-RGB Decode (1.4ms)","Stage 14: NVENC Hardware H.264/HEVC RTMP/WebRTC Push","Stage 15: Multi-Room GPU Time-Slicing Scheduler","Stage 16: Full 24x7 30fps Live-Commerce Studio (0.50 l_0)"];function z(e){const t=1+Math.max(0,e),n=1/t;return{perFrameStallAmplification:t,streamNormalizedFrameLatency:n}}function H(e,a=64){const n=1/(1+Math.max(0,e)),s=Math.max(2,a%2===0?a:a+1),r=1/s;let i=2*n;for(let o=1;o<s;o++){const l=o*r,g=o%2===1?4:2;i+=g*(2*n*l)}return r/3*i}function Z(e,a){const t=Math.max(0,Math.min(x-1,e)),n=t/(x-1),s=z(n),r=H(n,64),i=1+n,o=a?1:i;return{index:t,streamSimilarityReuseU:n,perFrameStallAmplification:s.perFrameStallAmplification,streamNormalizedFrameLatency:s.streamNormalizedFrameLatency,quadratureTemporalLatentLatency:r,realtimeLatencyStabilityRatio:o,naivePerFrameStallRatio:i,streamPipelineStageLabel:D[t]??D[0],isRealtimeLatencyViolation:o>1.0001}}function F(e,a){const t=h[e],n=[];let s=0,r=0;for(let o=0;o<x;o++){const l=Z(o,t.useStreamDiffusionPipeline);n.push(l),l.isRealtimeLatencyViolation&&s++;const g=Math.abs(l.streamNormalizedFrameLatency-l.quadratureTemporalLatentLatency);g>r&&(r=g)}const i=a!==void 0?Math.max(0,Math.min(x-1,a)):t.defaultStationIndex;return{presetId:e,useStreamDiffusionPipeline:t.useStreamDiffusionPipeline,stationCount:x,selectedStation:n[i],stations:n,station4Ratio:n[4].realtimeLatencyStabilityRatio,station8Ratio:n[8].realtimeLatencyStabilityRatio,station12Ratio:n[12].realtimeLatencyStabilityRatio,station16Ratio:n[16].realtimeLatencyStabilityRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"STREAM_DIFFUSION_30FPS_LOCKED":"NAIVE_PER_FRAME_DIFFUSION_STALL"}}function K(e){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise 24x7 Live-Commerce StreamDiffusion & TensorRT Plinth"}),a.push({id:"stream-rail-front",kind:"tensorrt_stream_batch_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Residual CFG (R-CFG) + Stochastic Similarity Latent Cache Bus (1.0000×)"}),a.push({id:"stream-rail-back",kind:"tensorrt_stream_batch_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"4-Step LCM/ADD Stream-Batch Diagonal Pipeline & TAESD Codec Bus"});for(const t of e.stations){const n=(t.index-8)*30,s=22*t.perFrameStallAmplification,r=44*t.streamNormalizedFrameLatency,i=36*t.realtimeLatencyStabilityRatio;a.push({id:`frame-stall-demand-column-${t.index}`,kind:"frame_stall_demand_column",stationIndex:t.index,x:n,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Stage ${t.index} Amplification L(u) = ${t.perFrameStallAmplification.toFixed(4)}× (${t.streamPipelineStageLabel})`}),a.push({id:`stream-diffusion-cache-node-${t.index}`,kind:"stream_diffusion_cache_node",stationIndex:t.index,x:n,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useStreamDiffusionPipeline?"teal":"slate",label:`Stage ${t.index} Normalized Frame Latency l_stream = ${t.streamNormalizedFrameLatency.toFixed(4)}×`}),a.push({id:`latency-stability-gauge-${t.index}`,kind:"latency_stability_gauge",stationIndex:t.index,x:n,y:i*.5-8,z:56,w:Math.min(24,12*t.realtimeLatencyStabilityRatio),h:i,d:12,tone:t.isRealtimeLatencyViolation?"crimson":"teal",label:`Stage ${t.index} Latency & Stability Ratio = ${t.realtimeLatencyStabilityRatio.toFixed(4)}×`})}return a.push({id:"filter-gate-left",kind:"similarity_filter_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"TAESD Fast Encode & Stochastic Similarity Frame-Skip Gate"}),a.push({id:"filter-gate-right",kind:"similarity_filter_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useStreamDiffusionPipeline?"teal":"crimson",label:"TensorRT CUDA Graph Engine & NVENC 30fps WebRTC/RTMP Egress Gate"}),a.push({id:"rcfg-bar-top",kind:"rcfg_consistency_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"StreamDiffusion Law: l_frame(u) = l_0 / (1 + u) via Stream-Batch + R-CFG"}),a.push({id:"rcfg-bar-front",kind:"rcfg_consistency_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useStreamDiffusionPipeline?"teal":"crimson",label:"Sub-33ms 30fps Live-Commerce & Zero Background Boiling Lock Line (1.0000×)"}),a}const U=new URLSearchParams(window.location.search),C=U.get("preset"),W=U.get("theme")==="light"?"light":"dark";let d=C&&C in h?C:"stream_diffusion_tensorrt_latent_cache_lock",c=h[d].defaultStationIndex,f=W;document.documentElement.setAttribute("data-theme",f);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · ENTERPRISE LIVE-COMMERCE STREAMDIFFUSION & TENSORRT LATENT CACHE WORKBENCH</span>
        <h1>Enterprise Live-Commerce StreamDiffusion & TensorRT Latent Cache Workbench</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${f.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Real-Time StreamDiffusion Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="stream_diffusion_tensorrt_latent_cache_lock"
      >
        StreamDiffusion Batch Pipe + TensorRT + Similarity Cache (30fps Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_per_frame_50step_diffusion_stall"
      >
        Naive Per-Frame 50-Step Dual-CFG Diffusion (Stall Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Real-Time Streaming Readouts">
      <article class="kpi-card">
        <span class="kpi-label">STALL FACTOR L(u) / NORMALIZED FRAME LATENCY l_stream</span>
        <strong id="kpi-stream" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">30FPS LATENCY & STABILITY RATIO (T_active / T_stream)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STREAM STAGES 4 / 8 / 16 LATENCY RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">L(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SLIDESHOW STALL & TEMPORAL FLICKER VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE STREAMDIFFUSION + TENSORRT LIVE-COMMERCE PIPELINE</span>
          <span id="solid-count-readout">58 solids · 17 stream stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Live-Commerce StreamDiffusion and TensorRT Workbench"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Real-Time StreamDiffusion Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, l_stream = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE STREAMDIFFUSION TENSORRT VS 50-STEP CFG LEDGER</span>
          <span>l_stream = l_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stg</th>
                <th>u</th>
                <th>L(u) = 1+u</th>
                <th>l_stream</th>
                <th>EMA Quad</th>
                <th>T / T_stream</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Y=document.querySelector("#preset-subtitle"),P=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-stream"),X=document.querySelector("#kpi-quad"),N=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),M=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),at=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),v=document.querySelector("#station-slider"),nt=document.querySelector("#station-slider-label"),w=document.querySelector("#station-tbody"),O=document.querySelector("#theme-toggle");function S(e,a,t){const n=(e-t*.55)*.88,s=-a+(e*.18+t*.42)*.55;return[n,s]}function ot(e,a){return e==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,a,t,n,s,r,i,o,l,g,G){const u=n*.5,p=s*.5,m=r*.5,$=S(e+u,a-p,t-m),L=S(e+u,a-p,t+m),A=S(e-u,a-p,t+m),I=S(e-u,a+p,t-m),T=S(e+u,a+p,t-m),b=S(e+u,a+p,t+m),R=S(e-u,a+p,t+m),_=ot(i,l),y=o?1.8:.7,k=o?"#ffffff":_.stroke,q=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)}`,B=`${A[0].toFixed(1)},${A[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)}`,V=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${T[0].toFixed(1)},${T[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${g}" data-solid-kind="${G}">
      <polygon points="${B}" fill="${_.left}" stroke="${k}" stroke-width="${y}" />
      <polygon points="${V}" fill="${_.right}" stroke="${k}" stroke-width="${y}" />
      <polygon points="${q}" fill="${_.top}" stroke="${k}" stroke-width="${y}" />
    </g>
  `}function E(e){const a=h[e.presetId],t=e.selectedStation,n=f==="dark";Y.textContent=a.subtitle,P.textContent=a.badge,P.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`L(u) = ${t.perFrameStallAmplification.toFixed(4)}× (l_stream = ${t.streamNormalizedFrameLatency.toFixed(4)}×)`,X.textContent=`EMA Quad = ${t.quadratureTemporalLatentLatency.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,N.textContent=`${t.realtimeLatencyStabilityRatio.toFixed(4)}×`,N.className=`kpi-value ${t.isRealtimeLatencyViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.streamSimilarityReuseU.toFixed(4)} | ${t.streamPipelineStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,M.textContent=`${e.violatedCount} / ${e.stationCount}`,M.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,v.value=String(t.index),nt.textContent=`Stage ${t.index} (u = ${t.streamSimilarityReuseU.toFixed(3)}, l_stream = ${t.streamNormalizedFrameLatency.toFixed(3)}, Ratio = ${t.realtimeLatencyStabilityRatio.toFixed(4)}×)`;const s=K(e);at.textContent=`${s.length} solids · ${e.stationCount} stream stages`;const r=[...s].sort((i,o)=>i.z-o.z||i.y-o.y||i.x-o.x);it.innerHTML=r.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,n,i.id,i.kind)).join(""),w.innerHTML=e.stations.map(i=>{const o=i.index===t.index?"row-selected":"",l=i.isRealtimeLatencyViolation?"cell-fail":"cell-pass";return`
        <tr class="${o}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.streamSimilarityReuseU.toFixed(4)}</td>
          <td>${i.perFrameStallAmplification.toFixed(4)}×</td>
          <td>${i.streamNormalizedFrameLatency.toFixed(4)}×</td>
          <td>${i.quadratureTemporalLatentLatency.toFixed(4)}×</td>
          <td class="${l}">${i.realtimeLatencyStabilityRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const o=i.getAttribute("data-preset");i.classList.toggle("active",o===e.presetId)}),window.__LIVE_COMMERCE_STREAM_DIFFUSION_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-preset");a&&a in h&&(d=a,c=h[d].defaultStationIndex,E(F(d,c)))})});v.addEventListener("input",()=>{c=Number(v.value),E(F(d,c))});w.addEventListener("click",e=>{const a=e.target.closest("tr[data-station-row]");a&&(c=Number(a.getAttribute("data-station-row")),E(F(d,c)))});O.addEventListener("click",()=>{f=f==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",f),O.textContent=`Theme: ${f.toUpperCase()}`,E(F(d,c))});E(F(d,c));
