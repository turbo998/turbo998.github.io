import"./modulepreload-polyfill-B5Qt9EMX.js";const m={optical_flow_v2a_foley_ducking_lock:{id:"optical_flow_v2a_foley_ducking_lock",label:"Optical-Flow V2A Contact Foley + Sidechain Auto-Ducking + EBU R128 Master (c_av = c_0/(1+u), Lock = 1.0000×)",labelZh:"光流接触点 V2A 拟音 + 对白侧链自动闪避 (Sidechain Ducking) + EBU R128 响度锁死（成本与同步比恒锁 1.0000×）",subtitle:"Extracts visual optical-flow impact peaks for zero-drift V2A contact foley (MMAudio / FoleyCrafter), ducks BGM by −12 dB under TTS dialogue via sidechain compression, and locks −14.0 LUFS broadcast loudness across all 17 post-production tiers.",subtitleZh:"从 AI 视频帧提取光流运动冲击峰值驱动毫秒级 V2A 接触拟音（脚步/关瓶盖/刀剑碰撞 Δt=0ms），在对白激活时通过侧链压缩将背景音乐自动闪避 −12 dB，并强制校准 EBU R128（−14.0 LUFS / −1.0 dBTP 真峰值），在全 17 个短剧与广告混音档位恒锁 1.0000×。",useOpticalFlowV2aDucking:!0,defaultStationIndex:16,badge:"V2A FOLEY & −14 LUFS LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"帧级拟音与响度锁死 · 1.0000×（0/17 站音画脱节）",description:"Enterprise AIGC short-drama and commercial post-production pipelines automate three-stem audio mastering: visual-onset V2A foley, sidechain-ducked BGM, and EBU R128 loudness normalization.",descriptionZh:"企业级 AIGC 短剧出海与商业短视频后期管线通过“光流碰撞点自动触发 V2A 拟音 + 对白优先侧链闪避 + 广播级 EBU R128 响度归一化”，彻底告别静音废片与背景音乐盖过人声。"},naive_unaligned_flat_audio_mix_overrun:{id:"naive_unaligned_flat_audio_mix_overrun",label:"Naive Unaligned Post-Dubbing & Flat BGM Overlay (Desync, Dialogue Masking & Overrun = 1 + u up to 2.0000×)",labelZh:"朴素无对齐盲贴音效与平铺 BGM（音画错位、背景乐淹没对白、响度爆音导致人工返工达 2.0000×）",subtitle:"Overlays un-ducked BGM and unaligned stock SFX onto silent AI video clips without optical-flow onset locking or LUFS mastering, drowning out dialogue and inflating manual DAW re-edit cost by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"在无声 AI 视频上盲目平铺固定音量 BGM 与未对齐的通用音效素材，既无光流碰撞帧同步也无侧链闪避，导致动作音效慢半拍、人声台词被背景音乐淹没，使第 16 档百集短剧后期返工成本翻倍至 2.0000×。",useOpticalFlowV2aDucking:!1,defaultStationIndex:16,badge:"AV DESYNC & LUFS CLIP · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"音画脱节与爆音返工 · 最高 2.0000×（16/17 站违背）",description:"Concatenating raw TTS, stock SFX, and BGM at fixed 0 dB gain without visual onset alignment or sidechain ducking fails commercial ad and short-drama QA across 16/17 tiers.",descriptionZh:"不经光流瞬态检测与侧链动态压缩就把 TTS 配音、音效和 BGM 按固定增益硬叠，会在多镜头短剧与商品广告中造成严重的听觉混乱与平台审核拒稿。"}},x=17,R=["Stage 0: Optical-Flow Velocity Peak Detector (Δt = 0.0 ms)","Stage 1: MMAudio / FoleyCrafter Contact Impact Synthesis","Stage 2: Material-Aware Surface Impulse (Glass/Wood/Metal)","Stage 3: Spatial Stereo Panning Bound to Bounding-Box X","Stage 4: Dialogue Envelope Follower & −12 dB BGM Ducking","Stage 5: Plosive De-Esser & Neural Voice Presence EQ Boost","Stage 6: Cut-Point Beat-Grid Warping for Commercial BGM","Stage 7: Room Reverb Convolution Matched to Scene Depth","Stage 8: Multi-Character Stem Separation & Priority Bus","Stage 9: EBU R128 Integrated Loudness Lock (−14.0 LUFS)","Stage 10: True-Peak Brickwall Limiter (−1.0 dBTP Guard)","Stage 11: Lip-Sync LSE-C Confidence Gate (≥ 0.92 Pass)","Stage 12: Cross-Episode BGM Leitmotif Stem Caching","Stage 13: Multilingual Dubbing Stem Hot-Swap Bus","Stage 14: TikTok / Reels / YouTube Loudness Target Profile","Stage 15: Automated Silence-Gap & Click/Pop Artifact Gate","Stage 16: Full 100-Episode Short-Drama Auto-Mix (0.50 c_0)"];function z(e){const t=1+Math.max(0,e),a=1/t;return{manualAudioRecutAmplification:t,v2aDuckingAmortizedUnitCost:a}}function H(e,o=64){const a=1/(1+Math.max(0,e)),s=Math.max(2,o%2===0?o:o+1),l=1/s;let i=2*a;for(let n=1;n<s;n++){const d=n*l,b=n%2===1?4:2;i+=b*(2*a*d)}return l/3*i}function Y(e,o){const t=Math.max(0,Math.min(x-1,e)),a=t/(x-1),s=z(a),l=H(a,64),i=1+a,n=o?1:i;return{index:t,audioEventDensityU:a,manualAudioRecutAmplification:s.manualAudioRecutAmplification,v2aDuckingAmortizedUnitCost:s.v2aDuckingAmortizedUnitCost,quadratureLoudnessOnsetCost:l,avSyncComplianceRatio:n,naiveFlatMixOverrunRatio:i,avPostStageLabel:R[t]??R[0],isAvSyncComplianceViolation:n>1.0001}}function A(e,o){const t=m[e],a=[];let s=0,l=0;for(let n=0;n<x;n++){const d=Y(n,t.useOpticalFlowV2aDucking);a.push(d),d.isAvSyncComplianceViolation&&s++;const b=Math.abs(d.v2aDuckingAmortizedUnitCost-d.quadratureLoudnessOnsetCost);b>l&&(l=b)}const i=o!==void 0?Math.max(0,Math.min(x-1,o)):t.defaultStationIndex;return{presetId:e,useOpticalFlowV2aDucking:t.useOpticalFlowV2aDucking,stationCount:x,selectedStation:a[i],stations:a,station4Ratio:a[4].avSyncComplianceRatio,station8Ratio:a[8].avSyncComplianceRatio,station12Ratio:a[12].avSyncComplianceRatio,station16Ratio:a[16].avSyncComplianceRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"OPTICAL_FLOW_V2A_DUCKING_LOCKED":"NAIVE_UNALIGNED_AUDIO_MIX_OVERRUN"}}function W(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise AIGC Short-Drama V2A Foley, Sidechain Ducking & EBU R128 Plinth"}),o.push({id:"master-rail-front",kind:"ebu_r128_master_bus_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Sidechain Auto-Ducking (−12 dB) + EBU R128 (−14.0 LUFS) Master Bus (1.0000×)"}),o.push({id:"master-rail-back",kind:"ebu_r128_master_bus_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Optical-Flow Contact Onset Detector + MMAudio/FoleyCrafter V2A Synthesis Bus"});for(const t of e.stations){const a=(t.index-8)*30,s=22*t.manualAudioRecutAmplification,l=44*t.v2aDuckingAmortizedUnitCost,i=36*t.avSyncComplianceRatio;o.push({id:`onset-event-demand-column-${t.index}`,kind:"onset_event_demand_column",stationIndex:t.index,x:a,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Stage ${t.index} Amplification F(u) = ${t.manualAudioRecutAmplification.toFixed(4)}× (${t.avPostStageLabel})`}),o.push({id:`v2a-sidechain-ducker-node-${t.index}`,kind:"v2a_sidechain_ducker_node",stationIndex:t.index,x:a,y:l*.5-8,z:0,w:14,h:l,d:14,tone:e.useOpticalFlowV2aDucking?"teal":"slate",label:`Stage ${t.index} Amortized Mix Cost c_av = ${t.v2aDuckingAmortizedUnitCost.toFixed(4)}×`}),o.push({id:`av-sync-compliance-gauge-${t.index}`,kind:"av_sync_compliance_gauge",stationIndex:t.index,x:a,y:i*.5-8,z:56,w:Math.min(24,12*t.avSyncComplianceRatio),h:i,d:12,tone:t.isAvSyncComplianceViolation?"crimson":"teal",label:`Stage ${t.index} AV Sync & LUFS Ratio = ${t.avSyncComplianceRatio.toFixed(4)}×`})}return o.push({id:"onset-gate-left",kind:"optical_flow_onset_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Visual Optical-Flow Contact Onset Extractor & Spatial Bounding-Box Panner Gate"}),o.push({id:"onset-gate-right",kind:"optical_flow_onset_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useOpticalFlowV2aDucking?"teal":"crimson",label:"EBU R128 (−14.0 LUFS / −1.0 dBTP) Broadcast Mastering & Stem Export Gate"}),o.push({id:"lufs-bar-top",kind:"lufs_true_peak_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"AV Post-Production Law: c_av(u) = c_0 / (1 + u) via Optical-Flow V2A + Auto-Ducking"}),o.push({id:"lufs-bar-front",kind:"lufs_true_peak_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useOpticalFlowV2aDucking?"teal":"crimson",label:"Zero Foley Drift (Δt = 0 ms) & Unmasked Dialogue Intelligibility Lock Line (1.0000×)"}),o}const V=new URLSearchParams(window.location.search),$=V.get("preset"),Z=V.get("theme")==="light"?"light":"dark";let c=$&&$ in m?$:"optical_flow_v2a_foley_ducking_lock",r=m[c].defaultStationIndex,k=Z;document.documentElement.setAttribute("data-theme",k);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 232 · 242ND DEMO · AIGC SHORT-DRAMA & COMMERCIAL V2A FOLEY, AUTO-DUCKING & EBU R128 WORKBENCH</span>
        <h1>AIGC Short-Drama & Commercial V2A Foley, Auto-Ducking & Beat-Sync Workbench</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${k.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="AV Post-Production Pipeline Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="optical_flow_v2a_foley_ducking_lock"
      >
        Optical-Flow V2A Foley + Sidechain Auto-Ducking + EBU R128 Lock (Ratio = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_unaligned_flat_audio_mix_overrun"
      >
        Naive Unaligned Post-Dubbing & Flat BGM Mix (Desync Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Audiovisual Mastering Readouts">
      <article class="kpi-card">
        <span class="kpi-label">EVENT FACTOR F(u) / AMORTIZED MIX COST c_av</span>
        <strong id="kpi-foley" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">AV SYNC & −14 LUFS COMPLIANCE RATIO (C_active / C_foley)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">MIX STAGES 4 / 8 / 16 COMPLIANCE RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">F(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">AV DESYNC & DIALOGUE MASKING VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE OPTICAL-FLOW V2A FOLEY & SIDECHAIN AUTO-DUCKING STAGE</span>
          <span id="solid-count-readout">58 solids · 17 mastering stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric AIGC Short-Drama V2A Foley and Auto-Ducking Workbench"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Audiovisual Mastering & Stem Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, c_av = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE V2A FOLEY + SIDECHAIN DUCKING VS FLAT MIX LEDGER</span>
          <span>c_av = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stg</th>
                <th>u</th>
                <th>F(u) = 1+u</th>
                <th>c_av</th>
                <th>LUFS Quad</th>
                <th>C / C_foley</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),M=document.querySelector("#preset-badge"),X=document.querySelector("#kpi-foley"),j=document.querySelector("#kpi-quad"),U=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),w=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),ot=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),D=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),B=document.querySelector("#station-tbody"),T=document.querySelector("#theme-toggle");function S(e,o,t){const a=(e-t*.55)*.88,s=-o+(e*.18+t*.42)*.55;return[a,s]}function nt(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,o,t,a,s,l,i,n,d,b,P){const u=a*.5,p=s*.5,g=l*.5,O=S(e+u,o-p,t-g),f=S(e+u,o-p,t+g),I=S(e-u,o-p,t+g),L=S(e-u,o+p,t-g),C=S(e+u,o+p,t-g),h=S(e+u,o+p,t+g),F=S(e-u,o+p,t+g),_=nt(i,d),E=n?1.8:.7,y=n?"#ffffff":_.stroke,G=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)}`,N=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)}`,q=`${f[0].toFixed(1)},${f[1].toFixed(1)} ${O[0].toFixed(1)},${O[1].toFixed(1)} ${C[0].toFixed(1)},${C[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${b}" data-solid-kind="${P}">
      <polygon points="${N}" fill="${_.left}" stroke="${y}" stroke-width="${E}" />
      <polygon points="${q}" fill="${_.right}" stroke="${y}" stroke-width="${E}" />
      <polygon points="${G}" fill="${_.top}" stroke="${y}" stroke-width="${E}" />
    </g>
  `}function v(e){const o=m[e.presetId],t=e.selectedStation,a=k==="dark";K.textContent=o.subtitle,M.textContent=o.badge,M.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,X.textContent=`F(u) = ${t.manualAudioRecutAmplification.toFixed(4)}× (c_av = ${t.v2aDuckingAmortizedUnitCost.toFixed(4)}×)`,j.textContent=`LUFS Quad = ${t.quadratureLoudnessOnsetCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,U.textContent=`${t.avSyncComplianceRatio.toFixed(4)}×`,U.className=`kpi-value ${t.isAvSyncComplianceViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.audioEventDensityU.toFixed(4)} | ${t.avPostStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,w.textContent=`${e.violatedCount} / ${e.stationCount}`,w.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,D.value=String(t.index),at.textContent=`Stage ${t.index} (u = ${t.audioEventDensityU.toFixed(3)}, c_av = ${t.v2aDuckingAmortizedUnitCost.toFixed(3)}, Ratio = ${t.avSyncComplianceRatio.toFixed(4)}×)`;const s=W(e);ot.textContent=`${s.length} solids · ${e.stationCount} mastering stages`;const l=[...s].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);it.innerHTML=l.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,a,i.id,i.kind)).join(""),B.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",d=i.isAvSyncComplianceViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.audioEventDensityU.toFixed(4)}</td>
          <td>${i.manualAudioRecutAmplification.toFixed(4)}×</td>
          <td>${i.v2aDuckingAmortizedUnitCost.toFixed(4)}×</td>
          <td>${i.quadratureLoudnessOnsetCost.toFixed(4)}×</td>
          <td class="${d}">${i.avSyncComplianceRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__SHORT_DRAMA_AUDIO_FOLEY_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in m&&(c=o,r=m[c].defaultStationIndex,v(A(c,r)))})});D.addEventListener("input",()=>{r=Number(D.value),v(A(c,r))});B.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(r=Number(o.getAttribute("data-station-row")),v(A(c,r)))});T.addEventListener("click",()=>{k=k==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",k),T.textContent=`Theme: ${k.toUpperCase()}`,v(A(c,r))});v(A(c,r));
