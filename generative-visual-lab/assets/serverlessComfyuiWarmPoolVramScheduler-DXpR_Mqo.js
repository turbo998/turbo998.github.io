import"./modulepreload-polyfill-B5Qt9EMX.js";const A={warm_pool_mmap_dag_affinity_lock:{id:"warm_pool_mmap_dag_affinity_lock",label:"DAG Base-Model Affinity Router + Zero-Copy mmap Safetensors + <180ms LoRA Hot-Swap (c_gpu = c_0/(1+u), SLA Lock = 1.0000×)",labelZh:"DAG 底模亲和路由 + NVMe/shm 零拷贝 mmap 权重池 + <180ms LoRA 热插拔（单次成本 c_0/(1+u)，集群效率恒锁 1.0000×）",subtitle:"Pins 24GB/28GB base DiT/UNet checkpoints in warm GPU pools via consistent DAG hashing, loads weights via zero-copy mmap/GDS in <1.8s, and hot-swaps 150MB tenant LoRAs in <180ms across all 17 tiers.",subtitleZh:"通过工作流 DAG 底模哈希亲和路由将 24GB Flux / 28GB Wan 2.2 主干常驻锁定于专属 GPU 温池，结合 `/dev/shm` 与 NVMe GDS 零拷贝 `mmap`（<1.8s 极速挂载）及 <180ms 租户 LoRA 指针级热插拔，在全 17 个高并发档位恒锁 1.0000×。",useWarmPoolDagAffinity:!0,defaultStationIndex:16,badge:"250TH DEMO MILESTONE · WARM-POOL LOCKED · 1.0000× (0/17 THRASHING)",badgeZh:"第 250 个里程碑 Demo · 温池亲和锁死 · 1.0000×（0/17 站冷启抖动）",description:"Enterprise self-hosted ComfyUI/Diffusers clusters eliminate 120s cold starts and VRAM eviction ping-pong by separating pinned 24GB base models from 150MB hot-swappable LoRAs.",descriptionZh:"企业自建 ComfyUI 算力集群通过“24GB 底模亲和常驻 + 150MB 业务 LoRA 毫秒级热插拔”彻底消灭 120 秒容器冷启动与显存反复卸载抖动。"},naive_cold_start_vram_swap_thrashing:{id:"naive_cold_start_vram_swap_thrashing",label:"Naive Round-Robin Dispatch & Container Cold-Start Model Swapping (VRAM Thrashing Overrun = 1 + u up to 2.0000×)",labelZh:"朴素无状态轮询分发与容器冷启动拉取 28GB 模型（显存卸载乒乓抖动 + 120s 空转，算力超支达 2.0000×）",subtitle:"Dispatches heterogeneous Flux/Wan/SDXL workflows in blind round-robin order and cold-starts containers from network storage, causing constant 24GB VRAM eviction ping-pong and 2.0000× GPU waste at Tier 16.",subtitleZh:"将包含不同底模（Flux 生图、Wan 视频、SDXL 重绘）的请求按无状态轮询随机分发给任意 GPU 节点，且扩容时从远端对象存储冷拉取 28GB 权重，引发显存“卸载 A 加载 B、下一秒卸载 B 加载 A”的乒乓死锁，第 16 档算力成本翻倍至 2.0000×。",useWarmPoolDagAffinity:!1,defaultStationIndex:16,badge:"COLD-START & VRAM THRASHING · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"冷启动与显存抖动超支 · 最高 2.0000×（16/17 站违背）",description:"Treating stateful 28GB GPU diffusion workers like stateless web microservices burns 50% of GPU-hours on PCIe/network weight loading across 16/17 concurrency tiers.",descriptionZh:"把携带 28GB 显存权重的 AIGC 节点当成无状态 Web 容器做随机轮询，会导致一半以上的昂贵 GPU 时长浪费在 PCIe 与磁盘权重搬运上。"}},C=17,G=["Tier 0: Single Homogeneous Workflow on 1 Warm GPU (Baseline)","Tier 1: Safetensors Zero-Copy OS Page-Cache mmap Preload","Tier 2: DAG Subgraph SHA-256 Prefix Cache Reuse (ComfyUI)","Tier 3: Base Checkpoint Consistent-Hash Affinity Routing","Tier 4: 24GB Base DiT Pinned in HBM + 150MB LoRA Hot-Swap","Tier 5: Dual-Buffer PCIe DMA Async Prefetch Next Tenant LoRA","Tier 6: ControlNet & IP-Adapter Shared Encoder Tensor Pool","Tier 7: CRIU / CUDA Checkpoint-Restore <1.8s Pod Warm-Up","Tier 8: NVMe RAID-0 + GPUDirect Storage (GDS) Weight Bus","Tier 9: FP8 E4M3 / INT8 Weight Quantization 2× VRAM Density","Tier 10: Split Text-Encoder (T5-XXL CPU/L4) vs DiT (H100) Pool","Tier 11:VAE Decode Micro-Batch Offload to Prevent OOM Spike","Tier 12: Queue-Depth Predictive Warm-Standby Auto-Scaler","Tier 13: Spot-Instance Preemption Graceful DAG Checkpoint","Tier 14: Multi-Tenant Quota & Priority Preemption Fair-Share","Tier 15: Zero VRAM Eviction Ping-Pong Telemetry Invariant","Tier 16: 64-GPU 500-Designer Enterprise AIGC Cloud (0.50 c_0)"];function N(e){const t=1+Math.max(0,e),a=1/t;return{coldStartThrashingAmplification:t,warmPoolAmortizedGpuCost:a}}function q(e,o=64){const a=1/(1+Math.max(0,e)),s=Math.max(2,o%2===0?o:o+1),r=1/s;let i=2*a;for(let n=1;n<s;n++){const l=n*r,g=n%2===1?4:2;i+=g*(2*a*l)}return r/3*i}function z(e,o){const t=Math.max(0,Math.min(C-1,e)),a=t/(C-1),s=N(a),r=q(a,64),i=1+a,n=o?1:i;return{index:t,clusterBurstLoadU:a,coldStartThrashingAmplification:s.coldStartThrashingAmplification,warmPoolAmortizedGpuCost:s.warmPoolAmortizedGpuCost,quadratureVramCacheCost:r,gpuClusterEfficiencyRatio:n,naiveColdStartOverrunRatio:i,schedulerTierLabel:G[t]??G[0],isColdStartViolation:n>1.0001}}function S(e,o){const t=A[e],a=[];let s=0,r=0;for(let n=0;n<C;n++){const l=z(n,t.useWarmPoolDagAffinity);a.push(l),l.isColdStartViolation&&s++;const g=Math.abs(l.warmPoolAmortizedGpuCost-l.quadratureVramCacheCost);g>r&&(r=g)}const i=o!==void 0?Math.max(0,Math.min(C-1,o)):t.defaultStationIndex;return{presetId:e,useWarmPoolDagAffinity:t.useWarmPoolDagAffinity,stationCount:C,selectedStation:a[i],stations:a,station4Ratio:a[4].gpuClusterEfficiencyRatio,station8Ratio:a[8].gpuClusterEfficiencyRatio,station12Ratio:a[12].gpuClusterEfficiencyRatio,station16Ratio:a[16].gpuClusterEfficiencyRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"WARM_POOL_DAG_AFFINITY_LOCKED":"NAIVE_COLD_START_VRAM_THRASHING_OVERRUN"}}function Z(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Serverless ComfyUI Warm-Pool, Zero-Copy mmap & DAG Affinity Plinth"}),o.push({id:"mmap-rail-front",kind:"nvme_mmap_safetensors_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Pinned 24GB Base Model HBM Pool + <180ms LoRA Hot-Swap Bus (1.0000×)"}),o.push({id:"mmap-rail-back",kind:"nvme_mmap_safetensors_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"NVMe RAID-0 /dev/shm Zero-Copy Safetensors mmap + GDS Bus"});for(const t of e.stations){const a=(t.index-8)*30,s=22*t.coldStartThrashingAmplification,r=44*t.warmPoolAmortizedGpuCost,i=36*t.gpuClusterEfficiencyRatio;o.push({id:`burst-concurrency-demand-column-${t.index}`,kind:"burst_concurrency_demand_column",stationIndex:t.index,x:a,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Tier ${t.index} Amplification W(u) = ${t.coldStartThrashingAmplification.toFixed(4)}× (${t.schedulerTierLabel})`}),o.push({id:`vram-pinned-unet-worker-node-${t.index}`,kind:"vram_pinned_unet_worker_node",stationIndex:t.index,x:a,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useWarmPoolDagAffinity?"teal":"slate",label:`Tier ${t.index} Amortized GPU Cost c_gpu = ${t.warmPoolAmortizedGpuCost.toFixed(4)}×`}),o.push({id:`cluster-sla-efficiency-gauge-${t.index}`,kind:"cluster_sla_efficiency_gauge",stationIndex:t.index,x:a,y:i*.5-8,z:56,w:Math.min(24,12*t.gpuClusterEfficiencyRatio),h:i,d:12,tone:t.isColdStartViolation?"crimson":"teal",label:`Tier ${t.index} GPU Utilization & SLA Budget Ratio = ${t.gpuClusterEfficiencyRatio.toFixed(4)}×`})}return o.push({id:"affinity-gate-left",kind:"dag_hash_affinity_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"ComfyUI DAG Base-Checkpoint Consistent-Hash Affinity Router Gate"}),o.push({id:"affinity-gate-right",kind:"dag_hash_affinity_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useWarmPoolDagAffinity?"teal":"crimson",label:"<180ms LoRA Hot-Swap & Zero VRAM Eviction SLA Egress Gate"}),o.push({id:"sla-bar-top",kind:"zero_eviction_sla_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Warm-Pool Law: c_gpu(u) = c_0 / (1 + u) via DAG Affinity + mmap vs Cold-Start Swap"}),o.push({id:"sla-bar-front",kind:"zero_eviction_sla_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useWarmPoolDagAffinity?"teal":"crimson",label:"0 VRAM Eviction Ping-Pong & P99 Latency SLA Lock Line (1.0000×)"}),o}const O=new URLSearchParams(window.location.search),P=O.get("preset"),Y=O.get("theme")==="light"?"light":"dark";let d=P&&P in A?P:"warm_pool_mmap_dag_affinity_lock",c=A[d].defaultStationIndex,m=Y;document.documentElement.setAttribute("data-theme",m);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 240 · 250TH DEMO HISTORIC MILESTONE · ENTERPRISE SERVERLESS COMFYUI WARM-POOL & VRAM SCHEDULER</span>
        <h1>Enterprise Serverless ComfyUI Warm-Pool, Zero-Copy mmap & DAG Affinity Scheduler Workbench</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${m.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Serverless GPU Scheduler Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="warm_pool_mmap_dag_affinity_lock"
      >
        DAG Base-Model Affinity + Zero-Copy mmap + &lt;180ms LoRA Hot-Swap (SLA Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_cold_start_vram_swap_thrashing"
      >
        Naive Round-Robin Dispatch &amp; Cold-Start 28GB Model Swap (Thrashing Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="GPU Cluster Scheduler Readouts">
      <article class="kpi-card">
        <span class="kpi-label">THRASH FACTOR W(u) / WARM-POOL GPU COST c_gpu</span>
        <strong id="kpi-gpu" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">GPU UTILIZATION &amp; SLA BUDGET RATIO (C_active / C_warm)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">TIERS 4 / 8 / 16 EFFICIENCY RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">W(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">VRAM EVICTION &amp; COLD-START SLA VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-TIER SERVERLESS COMFYUI WARM-POOL &amp; DAG AFFINITY STAGE (250TH DEMO MILESTONE)</span>
          <span id="solid-count-readout">58 solids · 17 cluster tiers</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Serverless ComfyUI Warm-Pool and VRAM Affinity Scheduler Workbench"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect GPU Cluster &amp; ComfyUI DAG Scheduling Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Tier 16 (u = 1.000, c_gpu = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-TIER WARM-POOL DAG AFFINITY VS COLD-START THRASHING LEDGER</span>
          <span>c_gpu = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>u</th>
                <th>W(u) = 1+u</th>
                <th>c_gpu</th>
                <th>VRAM Quad</th>
                <th>C / C_warm</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const X=document.querySelector("#preset-subtitle"),M=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-gpu"),K=document.querySelector("#kpi-quad"),F=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),D=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),ot=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),y=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),U=document.querySelector("#station-tbody"),w=document.querySelector("#theme-toggle");function h(e,o,t){const a=(e-t*.55)*.88,s=-o+(e*.18+t*.42)*.55;return[a,s]}function nt(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,o,t,a,s,r,i,n,l,g,W){const u=a*.5,p=s*.5,f=r*.5,$=h(e+u,o-p,t-f),_=h(e+u,o-p,t+f),I=h(e-u,o-p,t+f),L=h(e-u,o+p,t-f),R=h(e+u,o+p,t-f),b=h(e+u,o+p,t+f),k=h(e-u,o+p,t+f),T=nt(i,l),E=n?1.8:.7,v=n?"#ffffff":T.stroke,B=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)}`,V=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)}`,H=`${_[0].toFixed(1)},${_[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${b[0].toFixed(1)},${b[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${g}" data-solid-kind="${W}">
      <polygon points="${V}" fill="${T.left}" stroke="${v}" stroke-width="${E}" />
      <polygon points="${H}" fill="${T.right}" stroke="${v}" stroke-width="${E}" />
      <polygon points="${B}" fill="${T.top}" stroke="${v}" stroke-width="${E}" />
    </g>
  `}function x(e){const o=A[e.presetId],t=e.selectedStation,a=m==="dark";X.textContent=o.subtitle,M.textContent=o.badge,M.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`W(u) = ${t.coldStartThrashingAmplification.toFixed(4)}× (c_gpu = ${t.warmPoolAmortizedGpuCost.toFixed(4)}×)`,K.textContent=`VRAM Quad = ${t.quadratureVramCacheCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,F.textContent=`${t.gpuClusterEfficiencyRatio.toFixed(4)}×`,F.className=`kpi-value ${t.isColdStartViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.clusterBurstLoadU.toFixed(4)} | ${t.schedulerTierLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,D.textContent=`${e.violatedCount} / ${e.stationCount}`,D.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,y.value=String(t.index),at.textContent=`Tier ${t.index} (u = ${t.clusterBurstLoadU.toFixed(3)}, c_gpu = ${t.warmPoolAmortizedGpuCost.toFixed(3)}, Ratio = ${t.gpuClusterEfficiencyRatio.toFixed(4)}×)`;const s=Z(e);ot.textContent=`${s.length} solids · ${e.stationCount} cluster tiers`;const r=[...s].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);it.innerHTML=r.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),U.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",l=i.isColdStartViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.clusterBurstLoadU.toFixed(4)}</td>
          <td>${i.coldStartThrashingAmplification.toFixed(4)}×</td>
          <td>${i.warmPoolAmortizedGpuCost.toFixed(4)}×</td>
          <td>${i.quadratureVramCacheCost.toFixed(4)}×</td>
          <td class="${l}">${i.gpuClusterEfficiencyRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__COMFY_WARM_POOL_SCHEDULER_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in A&&(d=o,c=A[d].defaultStationIndex,x(S(d,c)))})});y.addEventListener("input",()=>{c=Number(y.value),x(S(d,c))});U.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(c=Number(o.getAttribute("data-station-row")),x(S(d,c)))});w.addEventListener("click",()=>{m=m==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",m),w.textContent=`Theme: ${m.toUpperCase()}`,x(S(d,c))});x(S(d,c));
