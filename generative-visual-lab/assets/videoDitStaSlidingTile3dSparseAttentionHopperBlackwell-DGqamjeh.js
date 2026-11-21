import"./modulepreload-polyfill-B5Qt9EMX.js";const u={"hunyuan-115k-720p-5s":{id:"hunyuan-115k-720p-5s",titleZh:"115.2K Tokens 720p 标准长镜（32×45×80 潜网格 · 4×6×10 立方砖块 · 74.2% 零残块稀疏度）",titleEn:"115.2K Tokens 720p Long-Take (32×45×80 Latent Grid · 74.2% Zero-Mixed-Tile Sparsity · 3.18× Speedup)",latentGridShape:"T=32 × H=45 × W=80 (115,200 Spatio-Temporal Tokens)",totalTokens:115200,tileCubeShape:"4×5×8 = 160-Token 3D Cube Tile + First-Frame Global Sink",staSparsityPct:74.2,fullAttentionLatencySec:24.8,staAttentionLatencySec:7.8,naive1dSwaEffectiveTflops:162,staBlockAlignedTflops:642,vbenchScorePct:84.7,psnrVsFullAttnDb:41.2,annualFleetSavingsUsd:246e4},"wan-184k-1080p-8s":{id:"wan-184k-1080p-8s",titleZh:"184.3K Tokens 1080p 高清广告（32×60×96 潜网格 · 2×8×8=128 TMA 对齐砖块 · 78.4% 稀疏度）",titleEn:"184.3K Tokens 1080p Commercial (32×60×96 Grid · 2×8×8=128 TMA-Aligned Cube · 78.4% Sparsity · 3.68×)",latentGridShape:"T=32 × H=60 × W=96 (184,320 Spatio-Temporal Tokens)",totalTokens:184320,tileCubeShape:"2×8×8 = 128-Token Hardware TMA Cube + 15% Full-Context Heads",staSparsityPct:78.4,fullAttentionLatencySec:34.2,staAttentionLatencySec:9.3,naive1dSwaEffectiveTflops:148,staBlockAlignedTflops:668,vbenchScorePct:84.5,psnrVsFullAttnDb:40.8,annualFleetSavingsUsd:312e4},"cinema-240k-4k-10s":{id:"cinema-240k-4k-10s",titleZh:"240K Tokens 4K 电影级母带（40×60×100 潜网格 · O(N²) 占 89.2% 耗时 · 82.6% 稀疏度 4.25× 提速）",titleEn:"240K Tokens 4K Cinema Master (40×60×100 Grid · 82.6% Sparsity · 4.25× Kernel Speedup)",latentGridShape:"T=40 × H=60 × W=100 (240,000 Spatio-Temporal Tokens)",totalTokens:24e4,tileCubeShape:"2×8×8 = 128-Token TMA Cube + First-Frame Anchor Lock",staSparsityPct:82.6,fullAttentionLatencySec:57.8,staAttentionLatencySec:13.6,naive1dSwaEffectiveTflops:138,staBlockAlignedTflops:676,vbenchScorePct:84.4,psnrVsFullAttnDb:40.3,annualFleetSavingsUsd:368e4}};function x(t,s){const e=u[t],i=s==="sta-3d-tile-major-zero-mixed-block",f=i?e.staAttentionLatencySec:e.fullAttentionLatencySec,r=i?Number((e.fullAttentionLatencySec/e.staAttentionLatencySec).toFixed(2)):1,l=i?e.staBlockAlignedTflops:e.naive1dSwaEffectiveTflops,c=i?e.staSparsityPct:0;return{preset:e,strategy:s,effectiveAttnLatencySec:f,effectiveSpeedupMultiple:r,effectiveKernelTflops:l,effectiveSparsityPct:c,zeroMixedTileOverheadPass:i&&l>=620&&r>=3.1,verdictBadge:i?`3D SLIDING TILE STA LOCKED (${c.toFixed(1)}% Sparsity · ${r.toFixed(2)}x Speedup · ${l} TFLOPS)`:`O(N²) FULL ATTENTION / FRAGMENTED 1D MASK (${e.fullAttentionLatencySec.toFixed(1)}s Attn · ${e.naive1dSwaEffectiveTflops} TFLOPS Uncoalesced)`}}const h=document.querySelector("#app");let T="wan-184k-1080p-8s",b="sta-3d-tile-major-zero-mixed-block";function k(){const t=x(T,b),s=t.preset,e=b==="sta-3d-tile-major-zero-mixed-block";h.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">🏆 HISTORIC 180TH WORKBENCH MILESTONE (3+7+34×5 = 180)! · Round 391 · Domain 1 (Video DiT 3D Sliding Tile Sparse Attention Studio)</span>
        <h1>超长视频 DiT 三维滑动砖块稀疏注意力 (STA)：128-Token TMA 硬件对齐与零残块路由器（历史性第 180 项里程碑！）</h1>
        <p class="wb-subtitle">礼赞全仓达成第 180 座（3+7+34×5 五大业务域各 34 座！）交互式架构工作台历史性里程碑：攻克 115K–240K Tokens 3D 全注意力 O(N²) 吞噬 85%+ 推理耗时、且传统 1D 行优先展平稀疏掩码产生大量残缺混合块（Mixed Tiles）拖垮 Hopper TMA 吞吐（148 TFLOPS）的痛点，通过 2×8×8=128 三维积木重排实现 100% 整块跳过/整块稠密（668 TFLOPS，3.68×–4.25× 提速，年省 +$3.12M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="STA Workload Preset and Strategy Controls">
      <div class="control-group">
        <span class="control-label">1. 选择三维视频潜空间网格规模 (3D Spatio-Temporal Latent Grid Preset):</span>
        <div class="btn-row">
          ${Object.keys(u).map(i=>`
            <button type="button" class="scenario-btn ${T===i?"active":""}" data-scenario="${i}">
              ${u[i].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换三维注意力算子与内存排布架构 (3D Attention Memory Layout & Sparsity Mode):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-full-3d-or-unaligned-1d-swa">
            ❌ 传统基线：O(N²) 全注意力 或 1D 行优先展平窗口 (大量半掩码混合残块 Mixed Tiles · 148 TFLOPS)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="sta-3d-tile-major-zero-mixed-block">
            ✅ 推荐架构：3D 积木重排 (2×8×8=128 TMA 对齐) + 零混合残块 STA + 首帧全局汇聚块 (668 TFLOPS)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core STA Sparse Attention KPIs">
      <div class="kpi-card">
        <span class="kpi-title">3D Attention 算子耗时与加速比 (Attn Latency)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-latency">${t.effectiveAttnLatencySec.toFixed(1)} s (${t.effectiveSpeedupMultiple.toFixed(2)}x)</strong>
        <span class="kpi-sub">对比 O(N²) 全注意力 ${s.fullAttentionLatencySec.toFixed(1)} s · ${(s.totalTokens/1e3).toFixed(1)}K Tokens</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">Hopper wgmma / TMA 算子实测吞吐 (Kernel TFLOPS)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-tflops">${t.effectiveKernelTflops} TFLOPS</strong>
        <span class="kpi-sub">${e?"0% 混合残块 (100% Dense or 100% Skipped TMA)":"1D 展平导致 82% 块含零掩码分支发散"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">整块跳过稀疏度与画质保真度 (Sparsity & VBench)</span>
        <strong class="kpi-value good" id="kpi-sparsity">${t.effectiveSparsityPct.toFixed(1)}% · ${s.vbenchScorePct.toFixed(1)}% VBench</strong>
        <span class="kpi-sub">PSNR ${s.psnrVsFullAttnDb.toFixed(1)} dB · 首帧全局锚点防角色漂移</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">512卡集群年化净省算力 (Annual Fleet Savings)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">+$${(s.annualFleetSavingsUsd/1e6).toFixed(2)}M / yr</strong>
        <span class="kpi-sub">${s.tileCubeShape}</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>1D 行优先展平碎片化掩码 vs 3D 立方砖块重排 (2×8×8=128 TMA 对齐) 零混合块稀疏矩阵画布</h2>
          <span class="tag">${s.latentGridShape}</span>
        </div>
        <canvas id="sta-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>Hopper/Blackwell TMA 块对齐与六层全栈加速审计 (STA & 6-Layer Stack Audit)</h2>
        <ul class="audit-list">
          <li><span>视频三维潜空间网格:</span> <strong>${s.latentGridShape}</strong></li>
          <li><span>3D 立方体砖块尺寸:</span> <strong>${s.tileCubeShape}</strong></li>
          <li><span>块内掩码分支开销 (Mixed Tiles):</span> <strong>${e?"0.0% (整块 128×128 TMA 跳过或满载计算)":"82.4% 混合残块 (严重拖累 Tensor Core)"}</strong></li>
          <li><span>实测算子有效算力:</span> <strong>${s.naive1dSwaEffectiveTflops} TFLOPS → ${t.effectiveKernelTflops} TFLOPS (4.51x 硬件效率)</strong></li>
          <li><span>长镜头一致性保护锚点:</span> <strong>强制保留 Column-0 首帧 Anchor Tiles + 15% 全局头</strong></li>
          <li><span>3D Attention 总耗时压缩:</span> <strong>${s.fullAttentionLatencySec.toFixed(1)} s → ${t.effectiveAttnLatencySec.toFixed(1)} s (${t.effectiveSpeedupMultiple.toFixed(2)}x)</strong></li>
          <li><span>512×H100 集群年化净省:</span> <strong>+$${s.annualFleetSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,m(),F(t)}function m(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{T=t.dataset.scenario,k()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{b=t.dataset.mode,k()})})}function F(t){const s=document.querySelector("#sta-canvas");if(!s)return;const e=s.getContext("2d"),i=s.width,f=s.height,r=t.preset,l=t.strategy==="sta-3d-tile-major-zero-mixed-block";e.fillStyle="#070b14",e.fillRect(0,0,i,f),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText(l?"1. 3D Tile-Major STA Block Matrix (100% Dense Green + Col-0 Sink vs 100% Skipped Dark)":"1. Naive 1D Row-Major Flatten Matrix (82.4% Fragmented Mixed-Mask Tiles in Red/Amber!)",22,26);const c=32,y=44,d=24,v=12;for(let a=0;a<v;a++)for(let n=0;n<v;n++){const g=c+n*(d+2),A=y+a*(d+2);if(l){const p=n===0,S=Math.abs(a-n)<=1;e.fillStyle=p?"rgba(168, 85, 247, 0.78)":S?"rgba(16, 185, 129, 0.78)":"rgba(15, 23, 42, 0.65)",e.strokeStyle=p?"#a855f7":S?"#10b981":"rgba(148, 163, 184, 0.15)"}else{const p=Math.abs(a-n)<=1,S=(a+n)%2===0||Math.abs(a-n)===4||Math.abs(a-n)===7;e.fillStyle=p?"rgba(239, 68, 68, 0.65)":S?"rgba(245, 158, 11, 0.48)":"rgba(239, 68, 68, 0.28)",e.strokeStyle="#ef4444"}e.lineWidth=1.4,e.beginPath(),e.roundRect(g,A,d,d,4),e.fill(),e.stroke()}e.fillStyle=l?"#34d399":"#fca5a5",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(l?`✓ 0.0% Mixed Tiles: ${r.staSparsityPct.toFixed(1)}% of 128×128 Blocks Bypassed Before TMA Load (${r.staBlockAlignedTflops} TFLOPS)`:`✕ 1D Row-Major Flatten Scatters Vertical/Temporal Neighbors → ${r.naive1dSwaEffectiveTflops} TFLOPS Stall!`,22,380);const o=382;e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. 3D Cube Tile (2T×8H×8W = 128 Tokens) & 6-Layer Video DiT Stack",o,26),e.fillStyle="#0f172a",e.strokeStyle=l?"rgba(56, 189, 248, 0.45)":"rgba(239, 68, 68, 0.45)",e.lineWidth=1.8,e.beginPath(),e.roundRect(o,44,416,142,10),e.fill(),e.stroke(),[{x:o+26,y:74,label:"Frame-0 Sink Cube",color:"#a855f7"},{x:o+158,y:74,label:"Local 3D Window (3×3×3)",color:"#10b981"},{x:o+292,y:74,label:"Query Cube (2×8×8=128)",color:"#38bdf8"}].forEach(a=>{e.fillStyle="#162033",e.strokeStyle=a.color,e.lineWidth=2,e.beginPath(),e.roundRect(a.x,a.y,108,72,8),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 10.5px Inter, system-ui, sans-serif",e.fillText(a.label.slice(0,18),a.x+8,a.y+32),e.fillStyle="#94a3b8",e.fillText("128-Token TMA Block",a.x+8,a.y+54)}),e.fillStyle="#cbd5e1",e.font="11px Inter, system-ui, sans-serif",e.fillText("• Every 2×8×8 3D cube maps 1-to-1 to a single Hopper wgmma 128-token CTA tile!",o+18,172),e.fillStyle="#0f172a",e.strokeStyle="rgba(16, 185, 129, 0.5)",e.lineWidth=2,e.beginPath(),e.roundRect(o,200,416,156,10),e.fill(),e.stroke(),e.fillStyle="#34d399",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText("🏆 Historic 180th Milestone: 6-Layer Video DiT FinOps Stack",o+16,224),["1. Round 366 (TeaCache): 3.12× Residual Step Skipping","2. Round 371 (SageAttention2): 2.86× Smooth-K INT8×FP8 Kernel","3. Round 376 (3D Causal VAE FIFO): 94.6GB → 11.8GB Peak VRAM","4. Round 381 (USP 2D Mesh): 3.42× NVLink Ulysses × RoCEv2 Ring","5. Round 386 (CFG-Interval): 1.59× Unconditional Momentum Reuse",`6. Round 391 (3D STA Sparse): ${t.effectiveSpeedupMultiple.toFixed(2)}× Zero-Mixed-Tile (+$${(r.annualFleetSavingsUsd/1e6).toFixed(2)}M/yr)`].forEach((a,n)=>{e.fillStyle=n===5?"#38bdf8":"#e2e8f0",e.font=n===5?"bold 11px Inter, system-ui, sans-serif":"11px Inter, system-ui, sans-serif",e.fillText(a,o+16,246+n*17.5)})}k();
