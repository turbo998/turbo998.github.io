import"./modulepreload-polyfill-B5Qt9EMX.js";const x={character_lora_3d_previs_consistency_lock:{id:"character_lora_3d_previs_consistency_lock",label:"3D Pre-Viz Blocking (Depth/OpenPose) + Character LoRA / Elements Lock (c_shot = c_0/(1+u), Consistency = 1.0000×)",labelZh:"3D 白模相机预演 (Depth/Pose) + 角色 LoRA / 多参考图一致性锁死（单镜成本 c_0/(1+u)，一致性与预算比恒锁 1.0000×）",subtitle:"Conditions every storyboard shot on 3D mannequin Depth/OpenPose passes plus a locked Character Turnaround LoRA & IP-Adapter/Elements embedding, locking identity consistency and retake budget ratio at 1.0000× across all 17 multi-angle storyboard shots.",subtitleZh:"将“3D 轻量白模相机运镜预演（导出精确 Depth 深度图 + OpenPose 骨骼图）”与“三视图角色 LoRA 权重 + IP-Adapter/Kling Elements 多主体参考锁死”结合，在跨越 17 个连续分镜的大角度机位切换中恒定锁死角色一致性与单镜预算比 1.0000×。",useCharacterLoraPrevisPipeline:!0,defaultStationIndex:16,badge:"IDENTITY & PRE-VIZ LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"角色一致性与预演锁死 · 1.0000×（0/17 站穿帮重绘）",description:"Game and film art pipelines eliminate multi-shot character face/costume drift by training a lightweight Character LoRA from a 4-view turnaround sheet and driving shot composition with 3D Depth + OpenPose blocking.",descriptionZh:"游戏过场动画与影视分镜预演（Pre-viz）管线通过“四视图角色设定集训练专属 LoRA + 3D 白模导出 Depth/Pose 控制网 + 首尾关键帧锁定 I2V”，彻底根除跨镜头角色换脸与服装穿帮。"},naive_unconditioned_per_shot_prompt_drift:{id:"naive_unconditioned_per_shot_prompt_drift",label:"Naive Unconditioned Per-Shot Text Prompting (Identity Drift & Retake Overrun = 1 + u up to 2.0000×)",labelZh:"朴素纯文本 Prompt 逐镜头独立抽卡（无 3D 骨骼深度控制与角色权重绑定，穿帮返工与算力超支达 2.0000×）",subtitle:"Prompts each storyboard shot independently using natural language text alone without 3D pose/depth blocking or character LoRA locks, causing severe face/costume drift and inflating retake GPU cost by 1.2500× at Shot 4, 1.5000× at Shot 8, and 2.0000× at Shot 16.",subtitleZh:"仅靠自然语言文本描述在每个分镜独立抽卡，缺乏 3D 骨骼/深度空间约束与角色特征向量锁定，导致机位旋转时角色五官、盔甲纹章与光源方向频繁穿帮，使第 16 镜返工算力成本翻倍超支至 2.0000×。",useCharacterLoraPrevisPipeline:!1,defaultStationIndex:16,badge:"IDENTITY DRIFT & RETAKES · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"角色穿帮与返工超支 · 最高 2.0000×（16/17 镜违背）",description:"Relying on text prompts alone across a 17-shot storyboard fails multi-angle character consistency and doubles GPU retake waste across 16/17 camera angles.",descriptionZh:"在连续多镜头叙事中单纯依赖文本提示词抽卡，无法维持角色面部与服装拓扑恒定，导致 16/17 个大角度分镜发生穿帮返工。"}},R=17,T=["Shot 0 (0° Front Master): 4-View Turnaround + LoRA Anchor","Shot 1 (15° Medium): Flux.1 Dev LoRA + OpenPose Lock","Shot 2 (25° Over-Shoulder): Depth ControlNet + FaceID Lock","Shot 3 (35° Low-Angle Hero): 3D Camera Frustum + Wan 2.2 I2V","Shot 4 (45° Three-Quarter): Kling 2.1 Elements Multi-Ref Lock","Shot 5 (55° Dutch Action): Canny Armor Edge + Pose Skeleton","Shot 6 (65° Dolly-In Close): IP-Adapter Plus Face + IC-Light","Shot 7 (75° Profile Dialogue): First/Last Keyframe Bridge","Shot 8 (90° Side Tracking): 3D Mannequin Depth + Runway Gen-4","Shot 9 (105° Crane High): Multi-Subject Prop + Costume Lock","Shot 10 (120° Reverse Cut): Lighting HDRI Dome + LoRA Weight","Shot 11 (135° Whip-Pan): CameraCtrl Extrinsics + Motion Lock","Shot 12 (150° Back-Three-Quarter): Cape/Hair Secondary Lock","Shot 13 (160° Extreme Close-Up): Iris/Scar Detail Tile Upscale","Shot 14 (170° Wide Group Stage): Multi-ID Regional Attention","Shot 15 (175° Orbit Finale): 3D Gaussian Splatting Pre-Viz","Shot 16 (180° Full Sequence Lock): c_shot = 0.5000 c_0"];function z(e){const t=1+Math.max(0,e),n=1/t;return{promptRetakeAmplification:t,loraPrevisUnitShotCost:n}}function Z(e,o=64){const n=1/(1+Math.max(0,e)),s=Math.max(2,o%2===0?o:o+1),r=1/s;let i=2*n;for(let a=1;a<s;a++){const d=a*r,C=a%2===1?4:2;i+=C*(2*n*d)}return r/3*i}function B(e,o){const t=Math.max(0,Math.min(R-1,e)),n=t/(R-1),s=z(n),r=Z(n,64),i=1+n,a=o?1:i;return{index:t,shotAngleVariationU:n,promptRetakeAmplification:s.promptRetakeAmplification,loraPrevisUnitShotCost:s.loraPrevisUnitShotCost,quadraturePoseDepthCost:r,identityConsistencyRatio:a,naivePromptRetakeRatio:i,shotConditioningStageLabel:T[t]??T[0],isIdentityDriftViolation:a>1.0001}}function m(e,o){const t=x[e],n=[];let s=0,r=0;for(let a=0;a<R;a++){const d=B(a,t.useCharacterLoraPrevisPipeline);n.push(d),d.isIdentityDriftViolation&&s++;const C=Math.abs(d.loraPrevisUnitShotCost-d.quadraturePoseDepthCost);C>r&&(r=C)}const i=o!==void 0?Math.max(0,Math.min(R-1,o)):t.defaultStationIndex;return{presetId:e,useCharacterLoraPrevisPipeline:t.useCharacterLoraPrevisPipeline,stationCount:R,selectedStation:n[i],stations:n,station4Ratio:n[4].identityConsistencyRatio,station8Ratio:n[8].identityConsistencyRatio,station12Ratio:n[12].identityConsistencyRatio,station16Ratio:n[16].identityConsistencyRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"CHARACTER_LORA_3D_PREVIS_LOCKED":"NAIVE_PROMPT_IDENTITY_DRIFT_OVERRUN"}}function K(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Game & Film Multi-Shot Character Consistency & 3D Pre-Viz Stage Plinth"}),o.push({id:"previs-rail-front",kind:"previs_camera_track_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Character LoRA + IP-Adapter + Kling Elements Identity Lock Bus (1.0000×)"}),o.push({id:"previs-rail-back",kind:"previs_camera_track_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"3D Mannequin Pre-Viz Camera Track (OpenPose Skeleton + Z-Depth + CameraCtrl)"});for(const t of e.stations){const n=(t.index-8)*30,s=22*t.promptRetakeAmplification,r=44*t.loraPrevisUnitShotCost,i=36*t.identityConsistencyRatio;o.push({id:`shot-retake-demand-column-${t.index}`,kind:"shot_retake_demand_column",stationIndex:t.index,x:n,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Shot ${t.index} Angle Factor R(u) = ${t.promptRetakeAmplification.toFixed(4)}× (${t.shotConditioningStageLabel})`}),o.push({id:`character-lora-lock-node-${t.index}`,kind:"character_lora_lock_node",stationIndex:t.index,x:n,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useCharacterLoraPrevisPipeline?"teal":"slate",label:`Shot ${t.index} Amortized Pre-Viz Unit Cost c_shot = ${t.loraPrevisUnitShotCost.toFixed(4)}×`}),o.push({id:`identity-consistency-gauge-${t.index}`,kind:"identity_consistency_gauge",stationIndex:t.index,x:n,y:i*.5-8,z:56,w:Math.min(24,12*t.identityConsistencyRatio),h:i,d:12,tone:t.isIdentityDriftViolation?"crimson":"teal",label:`Shot ${t.index} Identity & Retake Ratio = ${t.identityConsistencyRatio.toFixed(4)}×`})}return o.push({id:"turnaround-gate-left",kind:"turnaround_sheet_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"4-View Character Turnaround Sheet & LoRA / FaceID Embedding Anchor Gate"}),o.push({id:"turnaround-gate-right",kind:"turnaround_sheet_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useCharacterLoraPrevisPipeline?"teal":"crimson",label:"Multi-Shot Keyframe I2V Bridge (Wan 2.2 / Kling 2.1 / Runway Gen-4) Gate"}),o.push({id:"pose-depth-bar-top",kind:"controlnet_pose_depth_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Pre-Viz Amortization Law: c_shot(u) = c_0 / (1 + u) via 3D Pose/Depth + LoRA Lock"}),o.push({id:"pose-depth-bar-front",kind:"controlnet_pose_depth_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useCharacterLoraPrevisPipeline?"teal":"crimson",label:"Zero Face/Costume Drift Across 180° Camera Arcs Lock Line (1.0000×)"}),o}const w=new URLSearchParams(window.location.search),y=w.get("preset"),W=w.get("theme")==="light"?"light":"dark";let l=y&&y in x?y:"character_lora_3d_previs_consistency_lock",c=x[l].defaultStationIndex,g=W;document.documentElement.setAttribute("data-theme",g);const Q=document.querySelector("#app");Q.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 227 · 237TH DEMO · GAME & FILM ART ASSET PIPELINE: CHARACTER LORA + 3D CAMERA PRE-VIZ WORKBENCH</span>
        <h1>Game & Film Character Consistency LoRA + 3D Pre-Viz Workbench</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Character Pre-Viz Pipeline Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="character_lora_3d_previs_consistency_lock"
      >
        3D Pre-Viz (Depth/OpenPose) + Character LoRA / Elements Lock (Ratio = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_unconditioned_per_shot_prompt_drift"
      >
        Naive Unconditioned Per-Shot Text Prompting (Retake Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Character Consistency & Pre-Viz Readouts">
      <article class="kpi-card">
        <span class="kpi-label">CAMERA ARC FACTOR R(u) / PRE-VIZ UNIT COST c_shot</span>
        <strong id="kpi-previs" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">IDENTITY CONSISTENCY & BUDGET RATIO (C_active / C_previs)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STORYBOARD SHOTS 4 / 8 / 16 RETAKE RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">R(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CHARACTER DRIFT & RETAKE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-SHOT 3D CAMERA PRE-VIZ + CHARACTER LORA CONSISTENCY STAGE</span>
          <span id="solid-count-readout">58 solids · 17 storyboard shots</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Game and Film Character Consistency LoRA and 3D Pre-Viz Workbench"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Storyboard Camera Shot & Angle Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Shot 16 (u = 1.000, c_shot = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-SHOT LORA + 3D POSE/DEPTH VS RAW TEXT PROMPTING LEDGER</span>
          <span>c_shot = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Shot</th>
                <th>u</th>
                <th>R(u) = 1+u</th>
                <th>c_shot</th>
                <th>Pose Quad</th>
                <th>C / C_previs</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Y=document.querySelector("#preset-subtitle"),D=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-previs"),X=document.querySelector("#kpi-quad"),O=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),V=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),ot=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),I=document.querySelector("#station-slider"),nt=document.querySelector("#station-slider-label"),N=document.querySelector("#station-tbody"),M=document.querySelector("#theme-toggle");function b(e,o,t){const n=(e-t*.55)*.88,s=-o+(e*.18+t*.42)*.55;return[n,s]}function at(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function st(e,o,t,n,s,r,i,a,d,C,U){const p=n*.5,h=s*.5,u=r*.5,$=b(e+p,o-h,t-u),f=b(e+p,o-h,t+u),L=b(e-p,o-h,t+u),F=b(e-p,o+h,t-u),P=b(e+p,o+h,t-u),k=b(e+p,o+h,t+u),_=b(e-p,o+h,t+u),v=at(i,d),A=a?1.8:.7,E=a?"#ffffff":v.stroke,q=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,G=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,H=`${f[0].toFixed(1)},${f[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${C}" data-solid-kind="${U}">
      <polygon points="${G}" fill="${v.left}" stroke="${E}" stroke-width="${A}" />
      <polygon points="${H}" fill="${v.right}" stroke="${E}" stroke-width="${A}" />
      <polygon points="${q}" fill="${v.top}" stroke="${E}" stroke-width="${A}" />
    </g>
  `}function S(e){const o=x[e.presetId],t=e.selectedStation,n=g==="dark";Y.textContent=o.subtitle,D.textContent=o.badge,D.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`R(u) = ${t.promptRetakeAmplification.toFixed(4)}× (c_shot = ${t.loraPrevisUnitShotCost.toFixed(4)}×)`,X.textContent=`Pose Quad = ${t.quadraturePoseDepthCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,O.textContent=`${t.identityConsistencyRatio.toFixed(4)}×`,O.className=`kpi-value ${t.isIdentityDriftViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.shotAngleVariationU.toFixed(4)} | ${t.shotConditioningStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,V.textContent=`${e.violatedCount} / ${e.stationCount}`,V.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,I.value=String(t.index),nt.textContent=`Shot ${t.index} (u = ${t.shotAngleVariationU.toFixed(3)}, c_shot = ${t.loraPrevisUnitShotCost.toFixed(3)}, Ratio = ${t.identityConsistencyRatio.toFixed(4)}×)`;const s=K(e);ot.textContent=`${s.length} solids · ${e.stationCount} storyboard shots`;const r=[...s].sort((i,a)=>i.z-a.z||i.y-a.y||i.x-a.x);it.innerHTML=r.map(i=>st(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,n,i.id,i.kind)).join(""),N.innerHTML=e.stations.map(i=>{const a=i.index===t.index?"row-selected":"",d=i.isIdentityDriftViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.shotAngleVariationU.toFixed(4)}</td>
          <td>${i.promptRetakeAmplification.toFixed(4)}×</td>
          <td>${i.loraPrevisUnitShotCost.toFixed(4)}×</td>
          <td>${i.quadraturePoseDepthCost.toFixed(4)}×</td>
          <td class="${d}">${i.identityConsistencyRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const a=i.getAttribute("data-preset");i.classList.toggle("active",a===e.presetId)}),window.__GAME_FILM_CHARACTER_PREVIS_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in x&&(l=o,c=x[l].defaultStationIndex,S(m(l,c)))})});I.addEventListener("input",()=>{c=Number(I.value),S(m(l,c))});N.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(c=Number(o.getAttribute("data-station-row")),S(m(l,c)))});M.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),M.textContent=`Theme: ${g.toUpperCase()}`,S(m(l,c))});S(m(l,c));
