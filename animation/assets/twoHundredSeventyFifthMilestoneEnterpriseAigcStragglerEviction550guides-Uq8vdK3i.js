import"./modulepreload-polyfill-B5Qt9EMX.js";const g={"global-53x5-ulysses-8gpu-thermal-straggler":{id:"global-53x5-ulysses-8gpu-thermal-straggler",title:"53×5 Enterprise Matrix: 8-GPU Ulysses Video-DiT Thermal Clock Throttle (1980→1120MHz)",titleZh:"53×5 全域矩阵（275工作台/550双语文档）：8卡 Ulysses 视频生成单卡过热降频拖慢全组 3.4 倍秒级驱逐",faultSignature:"GPU #5 SW Thermal Slowdown (1120MHz · +42% Barrier Wait)",remediationAction:"DCGM + NCCL Step-Skew >18% → 240ms Warm Standby Swap",clusterGpus:275},"rocev2-pfc-pause-storm-optical-flapping":{id:"rocev2-pfc-pause-storm-optical-flapping",title:"RoCEv2 / InfiniBand 400G Optical Transceiver Symbol Error & PFC Pause Storm Isolation",titleZh:"400G RoCEv2 / IB 光模块误码与 PFC 死锁风暴：All-to-All 通信尾延迟突刺自动摘除故障网卡",faultSignature:"Port Symbol Error > 1e-6 & PFC Pause Frame Storm",remediationAction:"Isolate Degraded Rail + Re-Form NCCL Ring in 220ms",clusterGpus:192},"hbm3-ecc-retry-barrier-skew-eviction":{id:"hbm3-ecc-retry-barrier-skew-eviction",title:"HBM3e Correctable ECC Flood & Page-Retirement Straggler Cordon Before Double-Bit Xid 48",titleZh:"HBM3e 显存可纠错 ECC 洪泛预警：在触发 Xid 48 双比特崩溃前无损热迁步级潜向量",faultSignature:"DCGM_FI_DEV_ECC_SBE_VOL > 500/min + 26% Step Skew",remediationAction:"Pre-Xid48 Step-Capsule Handoff + K8s Node Cordon",clusterGpus:256}};function h(l,e,s){const t=Number(((25-s)*.15).toFixed(1));return e==="dcgm-nccl-skew-probe-240ms-hotspare-eviction"?{scenarioId:l,routerMode:e,stragglerIsolationAccuracyPct:100,clusterThroughputRecoveryPct:Number((67.2+Math.max(0,t)).toFixed(1)),hotSpareSwapLatencyMs:240,annualSavingsUsdM:4.28,verdict:"Act automatically"}:e==="manual-sre-ssh-nvidia-smi-hunting"?{scenarioId:l,routerMode:e,stragglerIsolationAccuracyPct:86,clusterThroughputRecoveryPct:22.4,hotSpareSwapLatencyMs:12e5,annualSavingsUsdM:.25,verdict:"Confirm"}:{scenarioId:l,routerMode:e,stragglerIsolationAccuracyPct:0,clusterThroughputRecoveryPct:0,hotSpareSwapLatencyMs:36e5,annualSavingsUsdM:.03,verdict:"Send to a human"}}const S=document.querySelector("#app");if(!S)throw new Error("Missing #app root");let c="global-53x5-ulysses-8gpu-thermal-straggler",i="dcgm-nccl-skew-probe-240ms-hotspare-eviction",n=18;function f(l){const e=l.getContext("2d");if(!e)return;const s=l.width,t=l.height;e.clearRect(0,0,s,t);const p=g[c],o=h(c,i,n),r=i==="default-k8s-node-ready-blind-to-throttling",u=e.createLinearGradient(0,0,s,t);u.addColorStop(0,"#060911"),u.addColorStop(1,"#311042"),e.fillStyle=u,e.fillRect(0,0,s,t),e.fillStyle="rgba(15, 23, 42, 0.92)",e.fillRect(16,14,s-32,46),e.strokeStyle=i==="dcgm-nccl-skew-probe-240ms-hotspare-eviction"?"#fbbf24":"#ef4444",e.strokeRect(16,14,s-32,46),e.fillStyle="#fbbf24",e.font="bold 13px Inter, sans-serif",e.fillText(`🏆 275th Workbench & 550th Bilingual Guide Milestone (3+7+53×5 = 275!) · Skew Gate >${n}%`,28,34),e.fillStyle="#94a3b8",e.font="11px Inter, sans-serif",e.fillText(`Straggler Isolation: ${o.stragglerIsolationAccuracyPct}% | Throughput Recovery: +${o.clusterThroughputRecoveryPct}% | Swap Latency: ${o.hotSpareSwapLatencyMs}ms`,28,51);const v=[{title:`1. Per-Step NCCL Barrier Skew Probe (>${n}%)`,detail:r?'⛔ K8s kubelet Reports "Ready" on 1120MHz Throttled GPU!':`✓ ${p.faultSignature} Caught Instantly`,color:r?"#ef4444":"#10b981",x:36,y:84},{title:"2. DCGM Thermal / ECC & RoCEv2 PFC Correlator",detail:r?"⛔ 7 Healthy GPUs Idle Waiting at 1,400 All-to-All Barriers":`✓ ${p.remediationAction}`,color:r?"#ef4444":"#38bdf8",x:396,y:84},{title:"3. 240ms Standby Node Swap & Step-Capsule Handoff",detail:r?"⛔ 46.5% Cluster Throughput Lost All Night":`✓ ${o.hotSpareSwapLatencyMs}ms Ring Reconfig (+${o.clusterThroughputRecoveryPct}% Throughput)`,color:r?"#ef4444":"#a855f7",x:36,y:178},{title:"4. 275-Studio & 550-Guide (53×5) Milestone Hub",detail:r?"⛔ Silent $28/hr 8-GPU Node Burn at 29% Effective MFU":`✓ 53 Studios in Every Domain (+$${o.annualSavingsUsdM}M/yr Saved)`,color:r?"#ef4444":"#fbbf24",x:396,y:178}];for(const a of v)e.save(),e.fillStyle="rgba(15, 23, 42, 0.9)",e.strokeStyle=a.color,e.lineWidth=2.2,e.beginPath(),e.roundRect(a.x,a.y,328,76,10),e.fill(),e.stroke(),e.fillStyle="#f8fafc",e.font="bold 12px Inter, sans-serif",e.fillText(a.title,a.x+14,a.y+28),e.fillStyle=a.color,e.font="bold 11px JetBrains Mono, monospace",e.fillText(a.detail,a.x+14,a.y+54),e.restore();e.save(),e.fillStyle="#090d16",e.strokeStyle="#fbbf24",e.lineWidth=1.8,e.beginPath(),e.roundRect(36,278,688,92,12),e.fill(),e.stroke(),e.fillStyle="#fbbf24",e.font="bold 12px Inter, sans-serif",e.fillText(`🏆 Historic 275th Workbench & 550th Bilingual Guide Milestone (3+7+53×5 = 275 Studios!): ${p.title}`,54,308),e.fillStyle="#6ee7b7",e.font="11px JetBrains Mono, monospace",e.fillText(r?"⛔ Default K8s Health Check: Blind to GPU Clock Throttling & RoCE Pause Storms (-46.5% Throughput)!":`✓ DCGM + NCCL Step-Skew Probe + 240ms Hot-Spare Eviction (+${o.clusterThroughputRecoveryPct}% Throughput · +$${o.annualSavingsUsdM}M/yr)`,54,336),e.restore()}function d(){const l=g[c],e=h(c,i,n);S.innerHTML=`
    <header class="studio-header">
      <div>
        <span class="eyebrow">🏆 Historic 275th Workbench &amp; 550th Bilingual Guide Milestone (53×5 Balanced Matrix!)</span>
        <h1>🏆 第 275 个工作台暨 550 篇双语文档里程碑（53×5 大满贯）：企业级多卡视频 DiT 慢节点（Straggler）检测与 240ms 热备驱逐总控台</h1>
        <p class="subtitle">全仓达成 275 个交互式工作台（3+7+53×5 五大业务域各满 53 个！）与 550 篇中英双语指南：步级 NCCL All-to-All 同步偏斜探针 + DCGM 降频/ECC/光模块误码关联 + 240ms 热备节点无损接替</p>
      </div>
      <div class="badge-group">
        <span class="status-pill">${e.verdict}</span>
        <span class="metric-pill">+${e.clusterThroughputRecoveryPct}% Throughput</span>
        <span class="metric-pill">${e.hotSpareSwapLatencyMs}ms Hot Swap</span>
      </div>
    </header>

    <section class="control-bar" aria-label="Workbench Controls">
      <div class="control-group">
        <label for="scenario-select">1. 多卡视频生成集群木桶慢节点场景 (Multi-GPU Straggler Scenario)</label>
        <select id="scenario-select">
          ${Object.values(g).map(t=>`<option value="${t.id}" ${t.id===c?"selected":""}>${t.titleZh}</option>`).join("")}
        </select>
      </div>

      <div class="control-group">
        <label for="mode-select">2. 慢节点检测与热备替换治理架构 (Straggler Eviction Mode)</label>
        <select id="mode-select">
          <option value="dcgm-nccl-skew-probe-240ms-hotspare-eviction" ${i==="dcgm-nccl-skew-probe-240ms-hotspare-eviction"?"selected":""}>✅ 步级 NCCL 偏斜探针 + DCGM 降频/光模块诊断 + 240ms 热备秒切 (推荐)</option>
          <option value="default-k8s-node-ready-blind-to-throttling" ${i==="default-k8s-node-ready-blind-to-throttling"?"selected":""}>⛔ 仅依赖默认 K8s NodeReady 探针 (0% 感知单卡过热降频，7张好卡陪等1张慢卡)</option>
          <option value="manual-sre-ssh-nvidia-smi-hunting" ${i==="manual-sre-ssh-nvidia-smi-hunting"?"selected":""}>⚠️ 人工发现队列变慢后逐台 SSH 跑 nvidia-smi 排查 (平均耗费 20 分钟算力空转)</option>
        </select>
      </div>

      <div class="control-group">
        <label for="skew-slider">3. 步级 NCCL 同步等待偏斜驱逐阈值 (Barrier Step-Skew Threshold: <strong>&gt;${n}%</strong>)</label>
        <input id="skew-slider" type="range" min="12" max="26" step="2" value="${n}" />
      </div>
    </section>

    <main class="workbench-grid">
      <section class="stage-panel">
        <div class="panel-header">
          <h2>53×5 步级 NCCL 偏斜探针、DCGM 硬件关联与 240ms 热备替换舞台 (275th Milestone Stage)</h2>
          <span class="tag">275 Studios · 550 Guides · ${l.clusterGpus} GPUs</span>
        </div>
        <canvas id="straggler-canvas" width="760" height="390"></canvas>
      </section>

      <aside class="telemetry-panel">
        <h2>第 275 项里程碑暨 550 篇双语文档（53×5）遥测</h2>
        <div class="kpi-grid">
          <div class="kpi-card">
            <span class="kpi-label">亚健康降频/ECC/光模块慢卡定位率</span>
            <strong class="kpi-value">${e.stragglerIsolationAccuracyPct}%</strong>
            <span class="kpi-note">精准识别“未宕机但拖慢 8 卡环网”的木桶节点</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">8 卡序列并行集群有效吞吐恢复率</span>
            <strong class="kpi-value">+${e.clusterThroughputRecoveryPct}%</strong>
            <span class="kpi-note">消除 1,400 次 All-to-All 同步屏障空等</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">热备节点接力与 K8s Cordon 隔离耗时</span>
            <strong class="kpi-value">${e.hotSpareSwapLatencyMs}ms</strong>
            <span class="kpi-note">结合 180KB 步级潜向量胶囊零中断续跑</span>
          </div>
          <div class="kpi-card">
            <span class="kpi-label">全仓规模 / 年化避免算力陪等净省</span>
            <strong class="kpi-value">275 项 / 550 篇 · +$${e.annualSavingsUsdM.toFixed(2)}M/yr</strong>
            <span class="kpi-note">3 核心 + 7 前沿 + 53×5 五大业务域完美均衡大满贯</span>
          </div>
        </div>
      </aside>
    </main>
  `;const s=document.querySelector("#straggler-canvas");s&&f(s),document.querySelector("#scenario-select")?.addEventListener("change",t=>{c=t.target.value,d()}),document.querySelector("#mode-select")?.addEventListener("change",t=>{i=t.target.value,d()}),document.querySelector("#skew-slider")?.addEventListener("input",t=>{n=Number(t.target.value),d()})}d();
