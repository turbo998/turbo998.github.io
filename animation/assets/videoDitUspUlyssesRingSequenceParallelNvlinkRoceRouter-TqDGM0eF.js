import"./modulepreload-polyfill-B5Qt9EMX.js";const y={"wan-115k-16gpu-2node":{id:"wan-115k-16gpu-2node",titleZh:"115.2K Tokens 1080p 长镜（16×H100 跨 2 节点 · NVLink 900GB/s + RoCEv2 400Gbps）",titleEn:"115.2K Tokens 1080p Long-Take (16×H100 Across 2 Nodes · NVLink 900GB/s + RoCEv2 400Gbps)",sequenceTokens:115200,totalGpus:16,nodesCount:2,numQueryHeads:40,numKvHeads:40,ulyssesIntraDegree:8,ringInterDegree:2,naiveStepLatencyMs:2180,uspStepLatencyMs:740,naiveCommOverheadPct:54.2,uspCommOverheadPct:4.8,uspScalingEfficiencyPct:94.2,annualClusterSavingsUsd:196e4},"hunyuan-184k-16gpu-gqa8":{id:"hunyuan-184k-16gpu-gqa8",titleZh:"184.3K Tokens GQA-8 头数受限模型（16×H100 · GQA KV头=8 无法整除 P=16 纯 Ulysses）",titleEn:"184.3K Tokens GQA-8 Head-Limited DiT (16×H100 · KV Heads=8 Breaks Pure P=16 Ulysses)",sequenceTokens:184320,totalGpus:16,nodesCount:2,numQueryHeads:32,numKvHeads:8,ulyssesIntraDegree:8,ringInterDegree:2,naiveStepLatencyMs:3420,uspStepLatencyMs:1060,naiveCommOverheadPct:58.6,uspCommOverheadPct:5.2,uspScalingEfficiencyPct:93.8,annualClusterSavingsUsd:242e4},"cinema-240k-32gpu-4node":{id:"cinema-240k-32gpu-4node",titleZh:"240K Tokens 4K 电影级序列（32×H100 跨 4 节点 · Ulysses U=8 机内 × Ring R=4 跨机流水）",titleEn:"240K Tokens 4K Cinema Sequence (32×H100 Across 4 Nodes · 2D Mesh Ulysses U=8 × Ring R=4)",sequenceTokens:24e4,totalGpus:32,nodesCount:4,numQueryHeads:40,numKvHeads:8,ulyssesIntraDegree:8,ringInterDegree:4,naiveStepLatencyMs:4820,uspStepLatencyMs:1410,naiveCommOverheadPct:62.4,uspCommOverheadPct:6.4,uspScalingEfficiencyPct:93.6,annualClusterSavingsUsd:284e4}};function C(t,s){const e=y[t],l=s==="usp-hybrid-intra-ulysses-inter-ring",f=l?e.uspStepLatencyMs:e.naiveStepLatencyMs,r=l?Number((e.naiveStepLatencyMs/e.uspStepLatencyMs).toFixed(2)):1,o=l?e.uspCommOverheadPct:e.naiveCommOverheadPct,c=l?e.uspScalingEfficiencyPct:38.4,d=l?e.numKvHeads%e.ulyssesIntraDegree===0:e.numKvHeads%e.totalGpus===0;return{preset:e,strategy:s,effectiveStepLatencyMs:f,effectiveSpeedupMultiple:r,effectiveCommOverheadPct:o,effectiveScalingEfficiencyPct:c,gqaHeadDivisibilityPass:d,verdictBadge:l?`USP 2D MESH LOCKED (U=${e.ulyssesIntraDegree}×R=${e.ringInterDegree} · ${r.toFixed(2)}x Speedup · ${c.toFixed(1)}% Scale Eff)`:`CROSS-NODE ALL-TO-ALL INCAST & GQA HEAD WALL (${e.naiveCommOverheadPct.toFixed(1)}% Comm Stall · ${e.naiveStepLatencyMs}ms/step)`}}const P=document.querySelector("#app");let v="cinema-240k-32gpu-4node",S="usp-hybrid-intra-ulysses-inter-ring";function m(){const t=C(v,S),s=t.preset,e=S==="usp-hybrid-intra-ulysses-inter-ring";P.innerHTML=`
    <header class="wb-header">
      <div>
        <span class="wb-eyebrow">🏆 HISTORIC 170TH WORKBENCH MILESTONE (3+7+32×5 = 170)! · Round 381 · Domain 1 (Video DiT USP 2D Sequence Parallel Router)</span>
        <h1>长视频 DiT 统一序列并行 (USP)：机内 Ulysses NVLink × 跨机 Ring RoCEv2 混合拓扑路由器（第 170 项里程碑！）</h1>
        <p class="wb-subtitle">礼赞全仓达成第 170 座（3+7+32×5 五大业务域各 32 座！）交互式架构工作台里程碑：通过 USP 2D 进程网格（节点内 900GB/s NVLink 执行 Ulysses U=8 All-to-All，跨节点 400Gbps RoCEv2 执行异步重叠 Ring-Attention R=2/4 P2P），突破 GQA KV 头数整除瓶颈并达成 3.42× 提速与 93.6% 线性扩展效率（年省 +$2.84M）。</p>
      </div>
      <div class="wb-badge ${e?"pass":"fail"}" id="verdict-pill">${t.verdictBadge}</div>
    </header>

    <section class="wb-controls" aria-label="Cluster Preset and Sequence Parallel Strategy Controls">
      <div class="control-group">
        <span class="control-label">1. 选择长视频序列规模与多机 GPU 拓扑 (Sequence Length & Multi-Node GPU Topology):</span>
        <div class="btn-row">
          ${Object.keys(y).map(l=>`
            <button type="button" class="scenario-btn ${v===l?"active":""}" data-scenario="${l}">
              ${y[l].titleZh.split("（")[0]}
            </button>`).join("")}
        </div>
      </div>
      <div class="control-group">
        <span class="control-label">2. 切换分布式序列并行路由架构 (Sequence Parallelism Topology Strategy):</span>
        <div class="btn-row">
          <button type="button" class="mode-btn ${e?"":"active danger"}" data-mode="naive-cross-node-ulysses-or-tp">
            ❌ 传统基线：跨机柜全员 All-to-All Ulysses 或 TP (RoCEv2 拥塞 62.4% + GQA 头数超限报错)
          </button>
          <button type="button" class="mode-btn ${e?"active success":""}" data-mode="usp-hybrid-intra-ulysses-inter-ring">
            ✅ 推荐架构：USP 2D 混合网格 (机内 NVLink Ulysses U=8 × 跨机 RoCEv2 Ring P2P 异步隐藏)
          </button>
        </div>
      </div>
    </section>

    <section class="kpi-strip" aria-label="Core USP Sequence Parallelism KPIs">
      <div class="kpi-card">
        <span class="kpi-title">单步 DiT 推理延迟与加速比 (Step Latency)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-latency">${t.effectiveStepLatencyMs.toLocaleString("en-US")} ms (${t.effectiveSpeedupMultiple.toFixed(2)}x)</strong>
        <span class="kpi-sub">序列长度 ${(s.sequenceTokens/1e3).toFixed(1)}K Tokens · ${s.totalGpus}×H100 (${s.nodesCount} 节点)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">跨机网络暴露通信阻塞占比 (Exposed Comm Stall)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-comm">${t.effectiveCommOverheadPct.toFixed(1)}%</strong>
        <span class="kpi-sub">${e?"Ring P2P 与本地 FlashAttention 97.8% 异步重叠":"跨节点 All-to-All 引发 RoCEv2 Incast 队头阻塞"}</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">多机集群弱/强扩展效率 (Scaling Efficiency)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-scale">${t.effectiveScalingEfficiencyPct.toFixed(1)}%</strong>
        <span class="kpi-sub">2D 网格 U=${s.ulyssesIntraDegree} (NVLink) × R=${s.ringInterDegree} (RoCEv2 Ring)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-title">GQA 头数兼容性与年省算力 (GQA Lock & ROI)</span>
        <strong class="kpi-value ${e?"good":"bad"}" id="kpi-roi">${s.numKvHeads} KV Heads · +$${(s.annualClusterSavingsUsd/1e6).toFixed(2)}M</strong>
        <span class="kpi-sub">${t.gqaHeadDivisibilityPass?`U=${s.ulyssesIntraDegree} 完美整除 KV头=${s.numKvHeads} (无需冗余复制)`:`P=${s.totalGpus} > KV头=${s.numKvHeads} 触发无效 KV 广播膨胀`}</span>
      </div>
    </section>

    <main class="wb-stage">
      <div class="canvas-panel">
        <div class="panel-header">
          <h2>USP 2D 进程网格（机内 900GB/s NVLink Ulysses All-to-All × 跨机 400Gbps Ring P2P 双缓冲流水线）</h2>
          <span class="tag">${(s.sequenceTokens/1e3).toFixed(1)}K Tokens · ${s.totalGpus} GPUs (U=${s.ulyssesIntraDegree}×R=${s.ringInterDegree})</span>
        </div>
        <canvas id="usp-canvas" width="820" height="400"></canvas>
      </div>
      <div class="telemetry-panel">
        <h2>硬件互联亲和性与通信—计算重叠审计 (NVLink × RoCEv2 Audit)</h2>
        <ul class="audit-list">
          <li><span>视频 3D Token 序列总长:</span> <strong>${s.sequenceTokens.toLocaleString("en-US")} Tokens</strong></li>
          <li><span>集群规模与注意力头配置:</span> <strong>${s.totalGpus}×H100 (${s.nodesCount} Nodes) · Q=${s.numQueryHeads} / KV=${s.numKvHeads}</strong></li>
          <li><span>节点内 (Intra-Node) 900GB/s 域:</span> <strong>DeepSpeed-Ulysses (U=${s.ulyssesIntraDegree} · Head-Sharded All-to-All)</strong></li>
          <li><span>跨节点 (Inter-Node) 400Gbps 域:</span> <strong>${e?`Ring-Attention (R=${s.ringInterDegree} · P2P Double-Buffered)`:"Cross-Rack All-to-All Incast Storm"}</strong></li>
          <li><span>单步 DiT 端到端耗时:</span> <strong>${s.naiveStepLatencyMs} ms → ${t.effectiveStepLatencyMs} ms (${t.effectiveSpeedupMultiple.toFixed(2)}x)</strong></li>
          <li><span>暴露通信开销占比:</span> <strong>${s.naiveCommOverheadPct.toFixed(1)}% → ${t.effectiveCommOverheadPct.toFixed(1)}%</strong></li>
          <li><span>集群年化节省 GPU 租金:</span> <strong>+$${s.annualClusterSavingsUsd.toLocaleString("en-US")} / Yr</strong></li>
        </ul>
      </div>
    </main>
  `,$(),x(t)}function $(){document.querySelectorAll(".scenario-btn").forEach(t=>{t.addEventListener("click",()=>{v=t.dataset.scenario,m()})}),document.querySelectorAll(".mode-btn").forEach(t=>{t.addEventListener("click",()=>{S=t.dataset.mode,m()})})}function x(t){const s=document.querySelector("#usp-canvas");if(!s)return;const e=s.getContext("2d"),l=s.width,f=s.height,r=t.preset,o=t.strategy==="usp-hybrid-intra-ulysses-inter-ring";e.fillStyle="#070b14",e.fillRect(0,0,l,f),e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("1. 2D Process Mesh Topology: Intra-Node NVSwitch (900 GB/s) vs Inter-Node RoCEv2 (50 GB/s)",22,26);const c=r.nodesCount,d=c===4?176:360,b=c===4?20:44;for(let a=0;a<c;a++){const n=24+a*(d+b),i=46;e.fillStyle="#0f172a",e.strokeStyle=o?"#38bdf8":"#ef4444",e.lineWidth=2,e.beginPath(),e.roundRect(n,i,d,152,10),e.fill(),e.stroke(),e.fillStyle="#38bdf8",e.font="bold 11.5px Inter, system-ui, sans-serif",e.fillText(`Node ${a+1} (8×H100 NVSwitch)`,n+12,i+22);const g=4,k=(d-32)/g;for(let p=0;p<8;p++){const u=n+12+p%g*(k+2),h=i+34+Math.floor(p/g)*44;e.fillStyle=o?"rgba(16, 185, 129, 0.24)":"rgba(239, 68, 68, 0.22)",e.strokeStyle=o?"#10b981":"#f87171",e.lineWidth=1.4,e.beginPath(),e.roundRect(u,h,k-4,34,5),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 10px Inter, system-ui, sans-serif",e.fillText(`G${p}`,u+6,h+21)}if(e.fillStyle=o?"#34d399":"#fca5a5",e.font="10.5px Inter, system-ui, sans-serif",e.fillText(o?"Intra: Ulysses U=8 (900GB/s)":"Cross-Rack All-to-All Incast!",n+12,i+138),a<c-1){const p=n+d,u=n+d+b;e.strokeStyle=o?"#a855f7":"#ef4444",e.lineWidth=3,e.beginPath(),e.moveTo(p,i+76),e.lineTo(u,i+76),e.stroke()}}if(e.fillStyle="#e2e8f0",e.font="bold 13px Inter, system-ui, sans-serif",e.fillText("2. CUDA Execution Timeline: Compute Stream vs Inter-Node RoCEv2 RDMA Communication Stream",22,228),e.fillStyle="#0f172a",e.strokeStyle="rgba(148, 163, 184, 0.25)",e.lineWidth=1.5,e.beginPath(),e.roundRect(22,240,774,142,10),e.fill(),e.stroke(),o){e.fillStyle="#94a3b8",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText("CUDA Compute:",36,276),e.fillText("RoCEv2 RDMA:",36,326);for(let a=0;a<4;a++){const n=142+a*154;e.fillStyle="rgba(16, 185, 129, 0.32)",e.strokeStyle="#10b981",e.lineWidth=2,e.beginPath(),e.roundRect(n,254,144,34,6),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(`Attn Chunk ${a+1} (U=8)`,n+12,275),e.fillStyle="rgba(168, 85, 247, 0.32)",e.strokeStyle="#a855f7",e.beginPath(),e.roundRect(n+6,304,132,34,6),e.fill(),e.stroke(),e.fillStyle="#e9d5ff",e.fillText("Async Ring KV Next",n+14,325)}e.fillStyle="#34d399",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(`✓ 97.8% Comm-Compute Overlap: Step Latency Slashed ${r.naiveStepLatencyMs}ms → ${r.uspStepLatencyMs}ms (${t.effectiveSpeedupMultiple.toFixed(2)}x Speedup · +$${(r.annualClusterSavingsUsd/1e6).toFixed(2)}M/yr)`,36,366)}else{e.fillStyle="#94a3b8",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText("Blocking Pipe:",36,298);const a=[{label:"Cross-Node All-to-All Stall (RoCEv2 Incast)",w:230,stall:!0},{label:"Attn Compute",w:120,stall:!1},{label:"Cross-Node All-to-All Post-Attn Stall",w:230,stall:!0}];let n=142;a.forEach(i=>{e.fillStyle=i.stall?"rgba(239, 68, 68, 0.35)":"rgba(56, 189, 248, 0.28)",e.strokeStyle=i.stall?"#ef4444":"#38bdf8",e.lineWidth=2,e.beginPath(),e.roundRect(n,272,i.w,46,6),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 11px Inter, system-ui, sans-serif",e.fillText(i.label,n+10,299),n+=i.w+10}),e.fillStyle="#f87171",e.font="bold 12px Inter, system-ui, sans-serif",e.fillText(`✕ ${r.naiveCommOverheadPct.toFixed(1)}% Exposed Network Stall: Synchronous All-to-All across 400Gbps RoCEv2 halts Tensor Cores!`,36,366)}}m();
