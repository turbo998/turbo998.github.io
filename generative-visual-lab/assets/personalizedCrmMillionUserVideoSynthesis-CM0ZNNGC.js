import"./modulepreload-polyfill-B5Qt9EMX.js";const C={gop_byte_mux_dynamic_slot_lock:{id:"gop_byte_mux_dynamic_slot_lock",label:"95% Pre-Baked Closed-GOP AI Segments + 5% Dynamic Slot NVENC + <12ms fMP4 Byte-Mux (c_crm = c_0/(1+u), Lock = 1.0000×)",labelZh:"95% 预烘焙 Closed-GOP AI 母片分块 + 5% 动态变量槽 NVENC 微渲染 + <12ms fMP4 字节流零重编拼接（单人成本 c_0/(1+u)，恒锁 1.0000×）",subtitle:"Pre-bakes 95% of cinematic AI B-roll with strict Closed-GOP SPS/PPS alignment, renders only the 5% personalized user-data slot in <180ms, and concatenates fMP4 moof/mdat boxes in <12ms with zero full-video transcoding.",subtitleZh:"将占时长 95% 的共性或分群 AI 电影镜头预先按严格 Closed-GOP 与统一 SPS/PPS 参数烘焙入库，每位会员仅对 5%（3 秒）含姓名与消费账单的变量片段执行 180ms 微渲染，再以 <12ms 完成 fMP4/HLS 字节流零重编码拼接，全 17 档恒锁 1.0000×。",useClosedGopByteMux:!0,defaultStationIndex:16,badge:"CLOSED-GOP BYTE-MUX LOCKED · 1.0000× (0/17 FULL RE-ENCODES)",badgeZh:"字节流零重编锁死 · 1.0000×（0/17 站全片重编浪费）",description:"Enterprise 10M-member annual review & VIP marketing campaigns cut video synthesis cost by 95% via Closed-GOP segment muxing and hybrid client/edge dynamic slots.",descriptionZh:"航司、银行与电商千万级会员年度账单视频通过“95% 预烘焙分块字节流复用 + 5% 变量槽局部编码”将百万美元级转码账单压缩 95% 以上。"},naive_per_user_full_video_reencode:{id:"naive_per_user_full_video_reencode",label:"Naive Per-User Full 1,800-Frame Video Re-Encoding (Redundant Transcode Overrun = 1 + u up to 2.0000×)",labelZh:"朴素按每个会员从头全量重编 60 秒 1,800 帧视频（95% 相同画面被重复编码千万次，算力超支达 2.0000×）",subtitle:"Renders and H.264/HEVC-encodes all 1,800 frames of a 60-second video from scratch for every single CRM user, burning 95% of CPU/GPU cycles on identical intro/outro frames and inflating FinOps budget by 2.0000× at Tier 16.",subtitleZh:"为了在 60 秒视频的第 15 秒改一个用户名字和消费数字，对 1,000 万名用户每人从第 0 帧到第 1,800 帧全量重跑一次 Remotion + FFmpeg 编码，导致 95% 完全相同的片头片尾被重复编码千万次，第 16 档算力成本翻倍超支至 2.0000×。",useClosedGopByteMux:!1,defaultStationIndex:16,badge:"FULL RE-ENCODE FINOPS OVERRUN · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"全片重编算力崩盘 · 最高 2.0000×（16/17 站违背）",description:"Re-encoding 1,710 unchanged frames just to personalize 90 frames of user data wastes 95% of cluster compute and causes multi-hour queue backlogs across 16/17 campaign tiers.",descriptionZh:"只为修改 90 帧个性化数据就重编其余 1,710 帧共性画面，会在千万级会员大促推送时引发数小时排队积压与双倍云账单。"}},f=17,O=["Tier 0: Single Static Template Broadcast Video (Baseline)","Tier 1: 20-Persona Combinatorial AI B-Roll Library Pre-Bake","Tier 2: Strict Closed-GOP IDR Keyframe Boundary Alignment","Tier 3: Identical SPS/PPS Header & 90kHz Timescale Lock","Tier 4: 5% Dynamic Variable Slot (90-Frame User KPI Card)","Tier 5: GPU Skia/Canvas + Hardware NVENC Micro-Chunk Encode","Tier 6: Zero-Transcode fMP4 moof+mdat Byte-Stream Splice (<12ms)","Tier 7: Edge Worker Dynamic HLS .m3u8 Playlist Stitching","Tier 8: Pre-Synthesized First-Name Audio Stem Concatenation","Tier 9: EBU R128 Loudness Normalization Across Spliced Stems","Tier 10: Hybrid WebGL/DOM Client-Side Real-Time Text Overlay","Tier 11: On-Demand Lazy Generation on Push-Notification Open","Tier 12: Content-Addressable Hash Cache for Duplicate Tiers","Tier 13: WeChat / WhatsApp MP4 FastStart moov-Atom Front-Load","Tier 14: 100,000-User VIP Tier-1 Pre-Warm Batch Pipeline","Tier 15: P99 < 800ms Click-to-Play Edge Streaming SLA Gate","Tier 16: 10,000,000-Member Annual Wrapped Video Engine (0.50 c_0)"];function q(t){const e=1+Math.max(0,t),n=1/e;return{fullReencodeCostAmplification:e,byteMuxAmortizedUnitCost:n}}function H(t,o=64){const n=1/(1+Math.max(0,t)),a=Math.max(2,o%2===0?o:o+1),d=1/a;let i=2*n;for(let s=1;s<a;s++){const r=s*d,g=s%2===1?4:2;i+=g*(2*n*r)}return d/3*i}function Z(t,o){const e=Math.max(0,Math.min(f-1,t)),n=e/(f-1),a=q(n),d=H(n,64),i=1+n,s=o?1:i;return{index:e,campaignScaleU:n,fullReencodeCostAmplification:a.fullReencodeCostAmplification,byteMuxAmortizedUnitCost:a.byteMuxAmortizedUnitCost,quadratureGopSegmentCost:d,crmFinopsBudgetRatio:s,naiveFullReencodeOverrunRatio:i,crmSynthesisTierLabel:O[e]??O[0],isReencodeWasteViolation:s>1.0001}}function S(t,o){const e=C[t],n=[];let a=0,d=0;for(let s=0;s<f;s++){const r=Z(s,e.useClosedGopByteMux);n.push(r),r.isReencodeWasteViolation&&a++;const g=Math.abs(r.byteMuxAmortizedUnitCost-r.quadratureGopSegmentCost);g>d&&(d=g)}const i=o!==void 0?Math.max(0,Math.min(f-1,o)):e.defaultStationIndex;return{presetId:t,useClosedGopByteMux:e.useClosedGopByteMux,stationCount:f,selectedStation:n[i],stations:n,station4Ratio:n[4].crmFinopsBudgetRatio,station8Ratio:n[8].crmFinopsBudgetRatio,station12Ratio:n[12].crmFinopsBudgetRatio,station16Ratio:n[16].crmFinopsBudgetRatio,violatedCount:a,maxQuadratureError:d,verdict:a===0?"GOP_BYTE_MUX_DYNAMIC_SLOT_LOCKED":"NAIVE_FULL_VIDEO_REENCODE_OVERRUN"}}function W(t){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise 10M-User Personalized CRM Video Synthesis & Closed-GOP Mux Plinth"}),o.push({id:"mux-rail-front",kind:"closed_gop_fmp4_mux_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"<12ms Zero-Transcode fMP4/HLS Closed-GOP Byte-Stream Concatenation Bus (1.0000×)"}),o.push({id:"mux-rail-back",kind:"closed_gop_fmp4_mux_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"95% Pre-Baked AI Persona Segments + 5% Dynamic Slot NVENC Bus"});for(const e of t.stations){const n=(e.index-8)*30,a=22*e.fullReencodeCostAmplification,d=44*e.byteMuxAmortizedUnitCost,i=36*e.crmFinopsBudgetRatio;o.push({id:`campaign-scale-demand-column-${e.index}`,kind:"campaign_scale_demand_column",stationIndex:e.index,x:n,y:a*.5-8,z:-56,w:14,h:a,d:14,tone:"amber",label:`Tier ${e.index} Amplification P(u) = ${e.fullReencodeCostAmplification.toFixed(4)}× (${e.crmSynthesisTierLabel})`}),o.push({id:`dynamic-slot-nvenc-node-${e.index}`,kind:"dynamic_slot_nvenc_node",stationIndex:e.index,x:n,y:d*.5-8,z:0,w:14,h:d,d:14,tone:t.useClosedGopByteMux?"teal":"slate",label:`Tier ${e.index} Amortized CRM Video Cost c_crm = ${e.byteMuxAmortizedUnitCost.toFixed(4)}×`}),o.push({id:`crm-finops-budget-gauge-${e.index}`,kind:"crm_finops_budget_gauge",stationIndex:e.index,x:n,y:i*.5-8,z:56,w:Math.min(24,12*e.crmFinopsBudgetRatio),h:i,d:12,tone:e.isReencodeWasteViolation?"crimson":"teal",label:`Tier ${e.index} FinOps & Throughput Budget Ratio = ${e.crmFinopsBudgetRatio.toFixed(4)}×`})}return o.push({id:"sps-gate-left",kind:"sps_pps_alignment_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Closed-GOP IDR & Identical SPS/PPS/90kHz Timescale Alignment Gate"}),o.push({id:"sps-gate-right",kind:"sps_pps_alignment_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:t.useClosedGopByteMux?"teal":"crimson",label:"<12ms Edge fMP4/HLS Byte-Mux & On-Demand CDN Egress Gate"}),o.push({id:"sla-bar-top",kind:"ten_million_user_sla_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"CRM Synthesis Law: c_crm(u) = c_0 / (1 + u) via 95% Pre-Baked GOP Mux + 5% Slot"}),o.push({id:"sla-bar-front",kind:"ten_million_user_sla_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:t.useClosedGopByteMux?"teal":"crimson",label:"10,000,000-User Zero Full-Transcode & P99 <800ms Play Lock Line (1.0000×)"}),o}const N=new URLSearchParams(window.location.search),F=N.get("preset"),Y=N.get("theme")==="light"?"light":"dark";let l=F&&F in C?F:"gop_byte_mux_dynamic_slot_lock",c=C[l].defaultStationIndex,b=Y;document.documentElement.setAttribute("data-theme",b);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · 253RD DEMO · ENTERPRISE 10M-USER PERSONALIZED CRM VIDEO SYNTHESIS ENGINE</span>
        <h1>Enterprise 10M-User Personalized CRM Video Synthesis Engine</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="CRM Personalized Video Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="gop_byte_mux_dynamic_slot_lock"
      >
        95% Pre-Baked Closed-GOP AI + 5% Dynamic Slot NVENC + &lt;12ms fMP4 Byte-Mux (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_per_user_full_video_reencode"
      >
        Naive Per-User Full 1,800-Frame Video Re-Encode (FinOps Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="CRM Video Synthesis Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SCALE FACTOR P(u) / BYTE-MUX COST c_crm</span>
        <strong id="kpi-crm" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FINOPS &amp; THROUGHPUT BUDGET RATIO (C_active / C_crm)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">TIERS 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">P(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">FULL RE-ENCODE FINOPS VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-TIER CLOSED-GOP BYTE-MUX &amp; 5% DYNAMIC SLOT SYNTHESIS STAGE</span>
          <span id="solid-count-readout">58 solids · 17 CRM tiers</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise 10M-User Personalized CRM Video Synthesis Engine"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect 10M-User CRM Personalization &amp; Byte-Mux Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Tier 16 (u = 1.000, c_crm = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-TIER CLOSED-GOP BYTE-MUX VS NAIVE FULL RE-ENCODE LEDGER</span>
          <span>c_crm = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>u</th>
                <th>P(u) = 1+u</th>
                <th>c_crm</th>
                <th>GOP Quad</th>
                <th>C / C_crm</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const X=document.querySelector("#preset-subtitle"),A=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-crm"),K=document.querySelector("#kpi-quad"),L=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),ee=document.querySelector("#kpi-stations-4816"),B=document.querySelector("#kpi-violated"),te=document.querySelector("#kpi-verdict"),oe=document.querySelector("#solid-count-readout"),ie=document.querySelector("#rig-svg"),M=document.querySelector("#station-slider"),ne=document.querySelector("#station-slider-label"),G=document.querySelector("#station-tbody"),U=document.querySelector("#theme-toggle");function x(t,o,e){const n=(t-e*.55)*.88,a=-o+(t*.18+e*.42)*.55;return[n,a]}function se(t,o){return t==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:t==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:t==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:t==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function ae(t,o,e,n,a,d,i,s,r,g,V){const u=n*.5,p=a*.5,m=d*.5,$=x(t+u,o-p,e-m),_=x(t+u,o-p,e+m),v=x(t-u,o-p,e+m),I=x(t-u,o+p,e-m),k=x(t+u,o+p,e-m),h=x(t+u,o+p,e+m),P=x(t-u,o+p,e+m),R=se(i,r),y=s?1.8:.7,T=s?"#ffffff":R.stroke,D=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)}`,z=`${v[0].toFixed(1)},${v[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)}`,w=`${_[0].toFixed(1)},${_[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${g}" data-solid-kind="${V}">
      <polygon points="${z}" fill="${R.left}" stroke="${T}" stroke-width="${y}" />
      <polygon points="${w}" fill="${R.right}" stroke="${T}" stroke-width="${y}" />
      <polygon points="${D}" fill="${R.top}" stroke="${T}" stroke-width="${y}" />
    </g>
  `}function E(t){const o=C[t.presetId],e=t.selectedStation,n=b==="dark";X.textContent=o.subtitle,A.textContent=o.badge,A.className=`status-badge ${t.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`P(u) = ${e.fullReencodeCostAmplification.toFixed(4)}× (c_crm = ${e.byteMuxAmortizedUnitCost.toFixed(4)}×)`,K.textContent=`GOP Quad = ${e.quadratureGopSegmentCost.toFixed(4)}× (Quad err ${t.maxQuadratureError.toExponential(2)})`,L.textContent=`${e.crmFinopsBudgetRatio.toFixed(4)}×`,L.className=`kpi-value ${e.isReencodeWasteViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${e.campaignScaleU.toFixed(4)} | ${e.crmSynthesisTierLabel}`,ee.textContent=`${t.station4Ratio.toFixed(4)}× / ${t.station8Ratio.toFixed(4)}× / ${t.station16Ratio.toFixed(4)}×`,B.textContent=`${t.violatedCount} / ${t.stationCount}`,B.className=`kpi-value ${t.violatedCount>0?"text-danger":"text-ok"}`,te.textContent=t.verdict,M.value=String(e.index),ne.textContent=`Tier ${e.index} (u = ${e.campaignScaleU.toFixed(3)}, c_crm = ${e.byteMuxAmortizedUnitCost.toFixed(3)}, Ratio = ${e.crmFinopsBudgetRatio.toFixed(4)}×)`;const a=W(t);oe.textContent=`${a.length} solids · ${t.stationCount} CRM tiers`;const d=[...a].sort((i,s)=>i.z-s.z||i.y-s.y||i.x-s.x);ie.innerHTML=d.map(i=>ae(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===e.index,n,i.id,i.kind)).join(""),G.innerHTML=t.stations.map(i=>{const s=i.index===e.index?"row-selected":"",r=i.isReencodeWasteViolation?"cell-fail":"cell-pass";return`
        <tr class="${s}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.campaignScaleU.toFixed(4)}</td>
          <td>${i.fullReencodeCostAmplification.toFixed(4)}×</td>
          <td>${i.byteMuxAmortizedUnitCost.toFixed(4)}×</td>
          <td>${i.quadratureGopSegmentCost.toFixed(4)}×</td>
          <td class="${r}">${i.crmFinopsBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const s=i.getAttribute("data-preset");i.classList.toggle("active",s===t.presetId)}),window.__PERSONALIZED_CRM_VIDEO_SUMMARY__=t}document.querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",()=>{const o=t.getAttribute("data-preset");o&&o in C&&(l=o,c=C[l].defaultStationIndex,E(S(l,c)))})});M.addEventListener("input",()=>{c=Number(M.value),E(S(l,c))});G.addEventListener("click",t=>{const o=t.target.closest("tr[data-station-row]");o&&(c=Number(o.getAttribute("data-station-row")),E(S(l,c)))});U.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),U.textContent=`Theme: ${b.toUpperCase()}`,E(S(l,c))});E(S(l,c));
