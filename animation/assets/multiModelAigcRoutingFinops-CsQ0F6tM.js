import"./modulepreload-polyfill-B5Qt9EMX.js";const k={tiered_multi_model_finops_router_lock:{id:"tiered_multi_model_finops_router_lock",label:"Tiered Multi-Model Router + Async Queue (w_router = w_0/(1+u), FinOps/SLA Lock = 1.0000×)",labelZh:"多模型分级智能路由 (Sora/Veo/Kling/Wan/Flux) + 异步队列削峰（单次成本 w_0/(1+u)，FinOps 预算比恒锁 1.0000×）",subtitle:"Routes draft storyboards to Flux/Wan Turbo, commercial SKU clips to Kling 2.1/Runway Gen-4, and hero shots to Veo 3/Sora 2 behind a token-bucket async queue, locking FinOps unit budget & RPM SLA ratio at 1.0000× across all 17 concurrency stations.",subtitleZh:"通过语义复杂度分级网关将分镜草稿路由至自托管 Flux/Wan 2.2 Turbo、电商标准镜头路由至可灵 Kling 2.1/Runway Gen-4、TVC 旗舰镜头路由至 Veo 3/Sora 2，并配合令牌桶异步队列与死信重试，在全 17 个并发负载站点恒定锁死 FinOps 成本与 SLA 比 1.0000×。",useTieredMultiModelRouter:!0,defaultStationIndex:16,badge:"FINOPS ROUTER LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"多模型 FinOps 锁死 · 1.0000×（0/17 站超支或 429 限流）",description:"Enterprise AIGC platforms avoid vendor lock-in and HTTP 429 storms by combining tiered model routing (Flux/Wan/Kling/Veo/Sora) with asynchronous queue backpressure and ComfyUI K8s spot spillover.",descriptionZh:"企业级 AIGC 视觉中台通过“多模型分级路由 + 异步队列削峰 + 自托管 ComfyUI 算力溢出兜底”，彻底消除单点 API 429 限流雪崩并将综合生成成本压降 50%。"},naive_unconditional_flagship_api_overrun:{id:"naive_unconditional_flagship_api_overrun",label:"Naive Unconditional Flagship API Routing (100% Sync Flagship Calls, Overrun = 1 + u up to 2.0000×)",labelZh:"朴素单旗舰模型无差别同步调用（草稿预演与批量换背景全部直连最贵 API，成本与限流超支达 2.0000×）",subtitle:"Sends every storyboard preview, A/B layout test, and batch background swap unconditionally to the most expensive flagship video API without async queueing, inflating FinOps spend by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"不论是低分辨率分镜草稿、A/B 测试还是大批量商品换背景，全部以同步阻塞方式无差别调用最昂贵的旗舰视频生成 API，导致第 4 站预算超支 1.2500×、第 8 站超支 1.5000×、第 16 站翻倍超支至 2.0000× 并触发高频 429 限流。",useTieredMultiModelRouter:!1,defaultStationIndex:16,badge:"FINOPS & 429 OVERRUN · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"FinOps 预算超支与限流 · 最高 2.0000×（16/17 站违背）",description:"Hardcoding a single flagship text-to-video API for all enterprise visual tasks wastes up to 2.0000× GPU budget and causes head-of-line blocking under bursty campaign traffic.",descriptionZh:"在企业架构中硬编码单一闭源旗舰视频 API 处理所有视觉任务，会在大促峰值流量下引发严重的队头阻塞、RPM 配额耗尽与 2.0000× 成本失控。"}},T=17,y=["Tier-0 Baseline: Direct Hero Shot (Veo 3 / Sora 2)","Tier-1 10% Draft Offload -> Flux.1 Schnell Preview","Tier-2 15% Storyboard -> Wan 2.2 1.3B Turbo Queue","Tier-3 20% Animatic -> LTX-Video + ComfyUI Worker","Tier-4 25% SKU Cutout -> Flux Dev + ControlNet Depth","Tier-5 30% Relighting -> IC-Light + Wan 2.2 I2V","Tier-6 35% Keyframe Lock -> Kling 2.1 Standard Pool","Tier-7 40% Motion Brush -> Runway Gen-4 Turbo Pool","Tier-8 50% Balanced Router (Wan/Kling/Veo 3-Tier)","Tier-9 55% Spot GPU Spillover -> K8s ComfyUI Fleet","Tier-10 60% Multi-Subject -> Kling 2.1 Elements Lock","Tier-11 65% Audio-Visual -> Veo 3 + Wan Foil Fallback","Tier-12 75% Regional Burst -> Multi-Cloud Quota Sharding","Tier-13 80% Auto-Downgrade Guardrail on 85% Budget","Tier-14 88% DLQ Exponential Retry + Warm Cache Hit","Tier-15 94% Hybrid Private Wan 2.2 + Cloud Veo/Sora","Tier-16 Enterprise FinOps Lock (w_router = 0.5000 w_0)"];function D(e){const t=1+Math.max(0,e),n=1/t;return{flagshipCostAmplification:t,tieredNormalizedUnitCost:n}}function W(e,o=64){const n=1/(1+Math.max(0,e)),s=Math.max(2,o%2===0?o:o+1),r=1/s;let i=2*n;for(let a=1;a<s;a++){const l=a*r,f=a%2===1?4:2;i+=f*(2*n*l)}return r/3*i}function H(e,o){const t=Math.max(0,Math.min(T-1,e)),n=t/(T-1),s=D(n),r=W(n,64),i=1+n,a=o?1:i;return{index:t,batchTierOffloadU:n,flagshipCostAmplification:s.flagshipCostAmplification,tieredNormalizedUnitCost:s.tieredNormalizedUnitCost,quadratureQueueUnitCost:r,finopsBudgetOverrunRatio:a,naiveFlagshipOverrunRatio:i,routingTopologyLabel:y[t]??y[0],isFinopsSlaViolation:a>1.0001}}function S(e,o){const t=k[e],n=[];let s=0,r=0;for(let a=0;a<T;a++){const l=H(a,t.useTieredMultiModelRouter);n.push(l),l.isFinopsSlaViolation&&s++;const f=Math.abs(l.tieredNormalizedUnitCost-l.quadratureQueueUnitCost);f>r&&(r=f)}const i=o!==void 0?Math.max(0,Math.min(T-1,o)):t.defaultStationIndex;return{presetId:e,useTieredMultiModelRouter:t.useTieredMultiModelRouter,stationCount:T,selectedStation:n[i],stations:n,station4Ratio:n[4].finopsBudgetOverrunRatio,station8Ratio:n[8].finopsBudgetOverrunRatio,station12Ratio:n[12].finopsBudgetOverrunRatio,station16Ratio:n[16].finopsBudgetOverrunRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"TIERED_MULTI_MODEL_FINOPS_LOCKED":"NAIVE_FLAGSHIP_API_FINOPS_OVERRUN"}}function K(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Multi-Model AIGC Routing & Async Queue Backplane Plinth"}),o.push({id:"queue-rail-front",kind:"async_queue_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Token-Bucket Async Queue & FinOps Guardrail Bus (B_active / B_router = 1.0000×)"}),o.push({id:"queue-rail-back",kind:"async_queue_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Multi-Provider Model Pool (Sora 2 / Veo 3 / Kling 2.1 / Wan 2.2 / Flux ComfyUI)"});for(const t of e.stations){const n=(t.index-8)*30,s=22*t.flagshipCostAmplification,r=44*t.tieredNormalizedUnitCost,i=36*t.finopsBudgetOverrunRatio;o.push({id:`concurrency-demand-column-${t.index}`,kind:"concurrency_demand_column",stationIndex:t.index,x:n,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Amplification A(u) = ${t.flagshipCostAmplification.toFixed(4)}× (${t.routingTopologyLabel})`}),o.push({id:`tiered-router-node-${t.index}`,kind:"tiered_router_node",stationIndex:t.index,x:n,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useTieredMultiModelRouter?"teal":"slate",label:`Station ${t.index} Tiered Unit Cost w_router = ${t.tieredNormalizedUnitCost.toFixed(4)}×`}),o.push({id:`finops-budget-gauge-${t.index}`,kind:"finops_budget_gauge",stationIndex:t.index,x:n,y:i*.5-8,z:56,w:Math.min(24,12*t.finopsBudgetOverrunRatio),h:i,d:12,tone:t.isFinopsSlaViolation?"crimson":"teal",label:`Station ${t.index} FinOps Budget Ratio = ${t.finopsBudgetOverrunRatio.toFixed(4)}×`})}return o.push({id:"gateway-collar-left",kind:"rate_limit_gateway_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Ingest Complexity Classifier & Prompt Safety Guardrail Gateway"}),o.push({id:"gateway-collar-right",kind:"rate_limit_gateway_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useTieredMultiModelRouter?"teal":"crimson",label:"Multi-Cloud Failover & ComfyUI Spot GPU Spillover Egress Gate"}),o.push({id:"circuit-bar-top",kind:"sla_circuit_breaker_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Tiered FinOps Law: w_router(u) = w_flagship / (1 + u) via Draft/Standard/Hero Sharding"}),o.push({id:"circuit-bar-front",kind:"sla_circuit_breaker_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useTieredMultiModelRouter?"teal":"crimson",label:"Zero-429 Token-Bucket Rate-Limit & FinOps Budget Lock Line (1.0000×)"}),o}const P=new URLSearchParams(window.location.search),O=P.get("preset"),z=P.get("theme")==="light"?"light":"dark";let d=O&&O in k?O:"tiered_multi_model_finops_router_lock",u=k[d].defaultStationIndex,h=z;document.documentElement.setAttribute("data-theme",h);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · ENTERPRISE MULTI-MODEL AIGC ROUTER, ASYNC QUEUE & FINOPS GUARDRAIL ARCHITECTURE</span>
        <h1>Multi-Model AIGC Video/Image Router & FinOps Queue Workbench</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${h.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Multi-Model Routing Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="tiered_multi_model_finops_router_lock"
      >
        Tiered Multi-Model Router + Async Token Queue (FinOps & SLA Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_unconditional_flagship_api_overrun"
      >
        Naive Unconditional Flagship API Routing (Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="FinOps & Queue Telemetry Readouts">
      <article class="kpi-card">
        <span class="kpi-label">AMPLIFICATION A(u) / TIERED UNIT COST w_router</span>
        <strong id="kpi-router" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FINOPS BUDGET & SLA RATIO (B_active / B_router)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CONCURRENCY TIERS 4 / 8 / 16 COST RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">A(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FINOPS OVERRUN & HTTP 429 SLA VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION MULTI-MODEL AIGC ROUTER & ASYNC QUEUE TOPOLOGY</span>
          <span id="solid-count-readout">58 solids · 17 concurrency stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Multi-Model AIGC Router and FinOps Queue Workbench"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Workload Tier & Draft Offload Ratio (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, w_router = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION SORA / VEO / KLING / WAN / FLUX FINOPS LEDGER</span>
          <span>w_router = w_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>A(u) = 1+u</th>
                <th>w_router</th>
                <th>Queue Quad</th>
                <th>B / B_router</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Y=document.querySelector("#preset-subtitle"),U=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-router"),X=document.querySelector("#kpi-quad"),L=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),w=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),ot=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),A=document.querySelector("#station-slider"),nt=document.querySelector("#station-slider-label"),B=document.querySelector("#station-tbody"),N=document.querySelector("#theme-toggle");function b(e,o,t){const n=(e-t*.55)*.88,s=-o+(e*.18+t*.42)*.55;return[n,s]}function at(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,o,t,n,s,r,i,a,l,f,G){const c=n*.5,p=s*.5,g=r*.5,$=b(e+c,o-p,t-g),I=b(e+c,o-p,t+g),E=b(e-c,o-p,t+g),M=b(e-c,o+p,t-g),v=b(e+c,o+p,t-g),x=b(e+c,o+p,t+g),F=b(e-c,o+p,t+g),R=at(i,l),m=a?1.8:.7,C=a?"#ffffff":R.stroke,q=`${M[0].toFixed(1)},${M[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)}`,V=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)}`,Q=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${f}" data-solid-kind="${G}">
      <polygon points="${V}" fill="${R.left}" stroke="${C}" stroke-width="${m}" />
      <polygon points="${Q}" fill="${R.right}" stroke="${C}" stroke-width="${m}" />
      <polygon points="${q}" fill="${R.top}" stroke="${C}" stroke-width="${m}" />
    </g>
  `}function _(e){const o=k[e.presetId],t=e.selectedStation,n=h==="dark";Y.textContent=o.subtitle,U.textContent=o.badge,U.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`A(u) = ${t.flagshipCostAmplification.toFixed(4)}× (w_router = ${t.tieredNormalizedUnitCost.toFixed(4)}×)`,X.textContent=`Queue Quad = ${t.quadratureQueueUnitCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,L.textContent=`${t.finopsBudgetOverrunRatio.toFixed(4)}×`,L.className=`kpi-value ${t.isFinopsSlaViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.batchTierOffloadU.toFixed(4)} | ${t.routingTopologyLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,w.textContent=`${e.violatedCount} / ${e.stationCount}`,w.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,A.value=String(t.index),nt.textContent=`Station ${t.index} (u = ${t.batchTierOffloadU.toFixed(3)}, w_router = ${t.tieredNormalizedUnitCost.toFixed(3)}, Ratio = ${t.finopsBudgetOverrunRatio.toFixed(4)}×)`;const s=K(e);ot.textContent=`${s.length} solids · ${e.stationCount} concurrency stations`;const r=[...s].sort((i,a)=>i.z-a.z||i.y-a.y||i.x-a.x);it.innerHTML=r.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,n,i.id,i.kind)).join(""),B.innerHTML=e.stations.map(i=>{const a=i.index===t.index?"row-selected":"",l=i.isFinopsSlaViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.batchTierOffloadU.toFixed(4)}</td>
          <td>${i.flagshipCostAmplification.toFixed(4)}×</td>
          <td>${i.tieredNormalizedUnitCost.toFixed(4)}×</td>
          <td>${i.quadratureQueueUnitCost.toFixed(4)}×</td>
          <td class="${l}">${i.finopsBudgetOverrunRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const a=i.getAttribute("data-preset");i.classList.toggle("active",a===e.presetId)}),window.__MULTI_MODEL_AIGC_ROUTING_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in k&&(d=o,u=k[d].defaultStationIndex,_(S(d,u)))})});A.addEventListener("input",()=>{u=Number(A.value),_(S(d,u))});B.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(u=Number(o.getAttribute("data-station-row")),_(S(d,u)))});N.addEventListener("click",()=>{h=h==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",h),N.textContent=`Theme: ${h.toUpperCase()}`,_(S(d,u))});_(S(d,u));
