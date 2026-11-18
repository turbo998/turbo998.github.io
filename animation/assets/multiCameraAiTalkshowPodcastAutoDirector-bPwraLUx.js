import"./modulepreload-polyfill-B5Qt9EMX.js";const x={av_lip_vad_hysteresis_director_lock:{id:"av_lip_vad_hysteresis_director_lock",label:"TalkNet Audio-Visual Lip-VAD + 1.8s Hysteresis Hold + Reaction Cutaways + XML/EDL (c_dir = c_0/(1+u), Lock = 1.0000×)",labelZh:"音视双模态唇动激活（TalkNet Lip-VAD）+ 1.8s 防抖迟滞保持 + 点头反应镜头穿插（单期成本 c_0/(1+u)，恒锁 1.0000×）",subtitle:"Verifies active speakers via joint microphone VAD and 3D lip-motion correlation, suppresses <1.2s cough/backchannel interjections via a 1.8s minimum shot-hold hysteresis gate, and exports editable Premiere/DaVinci XML.",subtitleZh:"结合多轨麦克风 VAD 与 TalkNet 3D 唇部开合相关性联合判定真正发言人，通过 1.8 秒最小镜头保持迟滞门（Hysteresis Hold）过滤咳嗽与“嗯/对”附和声，自动穿插倾听者点头反应镜头并导出 Premiere/DaVinci XML 时间线，全 17 阶段恒锁 1.0000×。",useAvLipHysteresisDirector:!0,defaultStationIndex:16,badge:"AV LIP-VAD + 1.8S HYSTERESIS LOCKED · 1.0000× (0/17 WHIP-SAW)",badgeZh:"音视双门禁导播锁死 · 1.0000×（0/17 站抽搐乱切）",description:"Enterprise executive roundtables, customer interviews, and video podcasts achieve human-director pacing without 0.2s audio-spike whip-saw cuts.",descriptionZh:"企业高管圆桌对谈、客户证言访谈与视频播客通过“音视唇动双重确认 + 1.8s 防抖迟滞 + 双人分屏抢话模式”实现广播级自动导播。"},naive_rms_audio_threshold_jitter_switch:{id:"naive_rms_audio_threshold_jitter_switch",label:"Naive Raw RMS dB Audio-Threshold Instant Switcher (0.2s Cough/Laugh Whip-Saw Cuts & Rework Overrun = 1 + u up to 2.0000×)",labelZh:"朴素纯音量阈值触发瞬时切镜（听众咳嗽/笑声/附和“嗯”触发 0.2 秒抽搐乱切，人工重剪超支达 2.0000×）",subtitle:"Switches camera angles the millisecond any microphone exceeds a raw dB threshold without lip-motion verification or minimum hold duration, causing dizzying 0.2s whip-saw cuts and 2.0000× manual NLE re-editing at Stage 16.",subtitleZh:"只要某只麦克风音量超过分贝阈值就立刻切机位，既不校验嘴唇是否在说话也不设最短镜头停留时间，导致嘉宾咳嗽、碰杯或附和一声“对”就引发 0.2 秒神经质闪切，剪辑师被迫推倒重剪，第 16 阶段成本翻倍至 2.0000×。",useAvLipHysteresisDirector:!1,defaultStationIndex:16,badge:"0.2S WHIP-SAW JITTER CUTS · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"0.2秒抽搐闪切与重剪 · 最高 2.0000×（16/17 站违背）",description:"Raw audio threshold switching fails on mic bleed, laughter, and brief backchannels, doubling post-production editing time across 16/17 stages.",descriptionZh:"纯音频分贝阈值切镜在串音、笑声与短促附和下必然失控，在 16/17 个多机位对谈阶段造成严重视觉眩晕与返工。"}},C=17,y=["Stage 0: Single-Speaker Solo Keynote Monologue (Baseline)","Stage 1: Multi-Track Mic Acoustic Echo & Bleed Cancellation","Stage 2: TalkNet Audio-Visual Lip-Motion Correlation Gate","Stage 3: 400ms Lookahead Pre-Roll Cut Before First Syllable","Stage 4: 1.8-Second Minimum Shot-Hold Hysteresis Debounce",'Stage 5: <1.2s Backchannel ("Uh-huh" / Cough / Laugh) Suppression',"Stage 6: Simultaneous Cross-Talk -> 2-Up / 3-Up Split-Screen Layout","Stage 7: 24s Monologue -> 2.5s Listener Nodding Reaction Cutaway","Stage 8: 4K Single-Cam Virtual Dolly-In Crop (100% -> 112% Ease)","Stage 9: Eye-Line 180-Degree Screen-Direction Continuity Rule","Stage 10: Slide / Screen-Share B-Roll Picture-in-Picture (PiP) Trigger","Stage 11: Speaker Lower-Third Name/Title Chyrons Auto-Entrance","Stage 12: Multi-Cam Color Match (Rec.709 Skin-Tone Vectorscope Lock)","Stage 13: Room-Tone Cross-Fade & -16 LUFS Dialogue Leveller","Stage 14: Viral 60s Vertical 9:16 Face-Tracked Highlight Reel Crop","Stage 15: Non-Destructive Premiere / DaVinci FCPXML & Remotion Export","Stage 16: 60-Minute 4-Guest Executive Roundtable Auto-Master (0.50 c_0)"];function z(e){const t=1+Math.max(0,e),a=1/t;return{jitterCutReworkAmplification:t,autoDirectorAmortizedUnitCost:a}}function W(e,i=64){const a=1/(1+Math.max(0,e)),n=Math.max(2,i%2===0?i:i+1),r=1/n;let o=2*a;for(let s=1;s<n;s++){const d=s*r,b=s%2===1?4:2;o+=b*(2*a*d)}return r/3*o}function j(e,i){const t=Math.max(0,Math.min(C-1,e)),a=t/(C-1),n=z(a),r=W(a,64),o=1+a,s=i?1:o;return{index:t,dialogueCrossTalkU:a,jitterCutReworkAmplification:n.jitterCutReworkAmplification,autoDirectorAmortizedUnitCost:n.autoDirectorAmortizedUnitCost,quadratureDirectorStateCost:r,broadcastPacingBudgetRatio:s,naiveJitterSwitchOverrunRatio:o,directorStageLabel:y[t]??y[0],isWhipSawViolation:s>1.0001}}function A(e,i){const t=x[e],a=[];let n=0,r=0;for(let s=0;s<C;s++){const d=j(s,t.useAvLipHysteresisDirector);a.push(d),d.isWhipSawViolation&&n++;const b=Math.abs(d.autoDirectorAmortizedUnitCost-d.quadratureDirectorStateCost);b>r&&(r=b)}const o=i!==void 0?Math.max(0,Math.min(C-1,i)):t.defaultStationIndex;return{presetId:e,useAvLipHysteresisDirector:t.useAvLipHysteresisDirector,stationCount:C,selectedStation:a[o],stations:a,station4Ratio:a[4].broadcastPacingBudgetRatio,station8Ratio:a[8].broadcastPacingBudgetRatio,station12Ratio:a[12].broadcastPacingBudgetRatio,station16Ratio:a[16].broadcastPacingBudgetRatio,violatedCount:n,maxQuadratureError:r,verdict:n===0?"AV_LIP_HYSTERESIS_DIRECTOR_LOCKED":"NAIVE_AUDIO_THRESHOLD_WHIPSAW_OVERRUN"}}function G(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Multi-Camera Podcast & Talk-Show Auto-Director Plinth"}),i.push({id:"hysteresis-rail-front",kind:"hysteresis_shot_hold_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"1.8s Minimum Shot-Hold Hysteresis + Reaction Cutaway Bus (1.0000×)"}),i.push({id:"hysteresis-rail-back",kind:"hysteresis_shot_hold_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"TalkNet Audio-Visual Lip-VAD + FCPXML/Remotion EDL Bus"});for(const t of e.stations){const a=(t.index-8)*30,n=22*t.jitterCutReworkAmplification,r=44*t.autoDirectorAmortizedUnitCost,o=36*t.broadcastPacingBudgetRatio;i.push({id:`crosstalk-demand-column-${t.index}`,kind:"crosstalk_demand_column",stationIndex:t.index,x:a,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Stage ${t.index} Amplification A(u) = ${t.jitterCutReworkAmplification.toFixed(4)}× (${t.directorStageLabel})`}),i.push({id:`talknet-lip-vad-node-${t.index}`,kind:"talknet_lip_vad_node",stationIndex:t.index,x:a,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useAvLipHysteresisDirector?"teal":"slate",label:`Stage ${t.index} Amortized Director Cost c_dir = ${t.autoDirectorAmortizedUnitCost.toFixed(4)}×`}),i.push({id:`pacing-stability-gauge-${t.index}`,kind:"pacing_stability_gauge",stationIndex:t.index,x:a,y:o*.5-8,z:56,w:Math.min(24,12*t.broadcastPacingBudgetRatio),h:o,d:12,tone:t.isWhipSawViolation?"crimson":"teal",label:`Stage ${t.index} Broadcast Pacing & Budget Ratio = ${t.broadcastPacingBudgetRatio.toFixed(4)}×`})}return i.push({id:"backchannel-gate-left",kind:"backchannel_suppression_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"TalkNet Audio-Visual Lip-VAD & Backchannel Filter Ingress Gate"}),i.push({id:"backchannel-gate-right",kind:"backchannel_suppression_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useAvLipHysteresisDirector?"teal":"crimson",label:"1.8s Hysteresis Hold & FCPXML/Remotion Master Egress Gate"}),i.push({id:"edl-bar-top",kind:"zero_whipsaw_edl_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Auto-Director Law: c_dir(u) = c_0 / (1 + u) via Lip-VAD + 1.8s Hysteresis"}),i.push({id:"edl-bar-front",kind:"zero_whipsaw_edl_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useAvLipHysteresisDirector?"teal":"crimson",label:"0 Cough/Laugh Whip-Saw Cuts & Broadcast Pacing Lock Line (1.0000×)"}),i}const H=new URLSearchParams(window.location.search),$=H.get("preset"),Z=H.get("theme")==="light"?"light":"dark";let c=$&&$ in x?$:"av_lip_vad_hysteresis_director_lock",l=x[c].defaultStationIndex,S=Z;document.documentElement.setAttribute("data-theme",S);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · 261ST DEMO · ENTERPRISE MULTI-CAMERA PODCAST &amp; TALK-SHOW AUTO-DIRECTOR SWITCHER</span>
        <h1>Enterprise Multi-Camera Podcast &amp; Talk-Show Auto-Director Switcher</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${S.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Auto-Director Switcher Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="av_lip_vad_hysteresis_director_lock"
      >
        TalkNet Audio-Visual Lip-VAD + 1.8s Hysteresis Hold + Reaction Cutaways (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_rms_audio_threshold_jitter_switch"
      >
        Naive Raw RMS Audio-Threshold Switcher (0.2s Cough/Laugh Whip-Saw = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Auto-Director Switcher Readouts">
      <article class="kpi-card">
        <span class="kpi-label">JITTER FACTOR A(u) / DIRECTOR COST c_dir</span>
        <strong id="kpi-dir" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BROADCAST PACING &amp; BUDGET RATIO (C_active / C_dir)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STAGES 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">A(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">WHIP-SAW JITTER CUT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STAGE AUDIO-VISUAL LIP-VAD, 1.8S HYSTERESIS &amp; REACTION CUTAWAY STAGE</span>
          <span id="solid-count-readout">58 solids · 17 director stages</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Multi-Camera Podcast and Talk-Show Auto-Director Switcher"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Multi-Cam Auto-Director &amp; Hysteresis Stage (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Stage 16 (u = 1.000, c_dir = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STAGE AV LIP-VAD HYSTERESIS VS NAIVE AUDIO JITTER LEDGER</span>
          <span>c_dir = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Stage</th>
                <th>u</th>
                <th>A(u) = 1+u</th>
                <th>c_dir</th>
                <th>State Quad</th>
                <th>C / C_dir</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const X=document.querySelector("#preset-subtitle"),F=document.querySelector("#preset-badge"),Y=document.querySelector("#kpi-dir"),J=document.querySelector("#kpi-quad"),M=document.querySelector("#kpi-ratio"),K=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),P=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),D=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),V=document.querySelector("#station-tbody"),U=document.querySelector("#theme-toggle");function g(e,i,t){const a=(e-t*.55)*.88,n=-i+(e*.18+t*.42)*.55;return[a,n]}function st(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,i,t,a,n,r,o,s,d,b,O){const u=a*.5,p=n*.5,h=r*.5,w=g(e+u,i-p,t-h),_=g(e+u,i-p,t+h),L=g(e-u,i-p,t+h),I=g(e-u,i+p,t-h),R=g(e+u,i+p,t-h),k=g(e+u,i+p,t+h),v=g(e-u,i+p,t+h),T=st(o,d),f=s?1.8:.7,E=s?"#ffffff":T.stroke,B=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,N=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,q=`${_[0].toFixed(1)},${_[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${b}" data-solid-kind="${O}">
      <polygon points="${N}" fill="${T.left}" stroke="${E}" stroke-width="${f}" />
      <polygon points="${q}" fill="${T.right}" stroke="${E}" stroke-width="${f}" />
      <polygon points="${B}" fill="${T.top}" stroke="${E}" stroke-width="${f}" />
    </g>
  `}function m(e){const i=x[e.presetId],t=e.selectedStation,a=S==="dark";X.textContent=i.subtitle,F.textContent=i.badge,F.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Y.textContent=`A(u) = ${t.jitterCutReworkAmplification.toFixed(4)}× (c_dir = ${t.autoDirectorAmortizedUnitCost.toFixed(4)}×)`,J.textContent=`State Quad = ${t.quadratureDirectorStateCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,M.textContent=`${t.broadcastPacingBudgetRatio.toFixed(4)}×`,M.className=`kpi-value ${t.isWhipSawViolation?"text-danger":"text-ok"}`,K.textContent=`u = ${t.dialogueCrossTalkU.toFixed(4)} | ${t.directorStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,P.textContent=`${e.violatedCount} / ${e.stationCount}`,P.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,D.value=String(t.index),at.textContent=`Stage ${t.index} (u = ${t.dialogueCrossTalkU.toFixed(3)}, c_dir = ${t.autoDirectorAmortizedUnitCost.toFixed(3)}, Ratio = ${t.broadcastPacingBudgetRatio.toFixed(4)}×)`;const n=G(e);it.textContent=`${n.length} solids · ${e.stationCount} director stages`;const r=[...n].sort((o,s)=>o.z-s.z||o.y-s.y||o.x-s.x);ot.innerHTML=r.map(o=>nt(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,a,o.id,o.kind)).join(""),V.innerHTML=e.stations.map(o=>{const s=o.index===t.index?"row-selected":"",d=o.isWhipSawViolation?"cell-fail":"cell-pass";return`
        <tr class="${s}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.dialogueCrossTalkU.toFixed(4)}</td>
          <td>${o.jitterCutReworkAmplification.toFixed(4)}×</td>
          <td>${o.autoDirectorAmortizedUnitCost.toFixed(4)}×</td>
          <td>${o.quadratureDirectorStateCost.toFixed(4)}×</td>
          <td class="${d}">${o.broadcastPacingBudgetRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const s=o.getAttribute("data-preset");o.classList.toggle("active",s===e.presetId)}),window.__MULTICAM_AUTO_DIRECTOR_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in x&&(c=i,l=x[c].defaultStationIndex,m(A(c,l)))})});D.addEventListener("input",()=>{l=Number(D.value),m(A(c,l))});V.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(l=Number(i.getAttribute("data-station-row")),m(A(c,l)))});U.addEventListener("click",()=>{S=S==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",S),U.textContent=`Theme: ${S.toUpperCase()}`,m(A(c,l))});m(A(c,l));
