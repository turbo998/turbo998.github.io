import"./modulepreload-polyfill-B5Qt9EMX.js";const g={decoupled_avatar_viseme_c2pa_pipeline_lock:{id:"decoupled_avatar_viseme_c2pa_pipeline_lock",label:"Decoupled Viseme ROI Avatar + Vector Slide Track + C2PA Signer (c_locale = c_0/(1+u), Lock = 1.0000×)",labelZh:"唇形 ROI 局部合成 + 矢量课件分轨 + C2PA 溯源签名管线（单语种成本 c_0/(1+u)，合规与预算比恒锁 1.0000×）",subtitle:"Isolates neural phoneme-viseme lip-sync to the speaker ROI while rendering localized slides via crisp vector tracks and embedding cryptographic C2PA + Consent Vault manifests, locking cost & compliance ratio at 1.0000× across all 17 global language tiers.",subtitleZh:"将“多语种 TTS 音素-视素（Phoneme-Viseme）面部局部重绘”与“100% 矢量清晰度的多语种 PPT/代码课件图层”分轨解耦，并强制挂载高管肖像授权密钥与 C2PA 水印，在全 17 个全球化语种站点恒定锁死成本与合规比 1.0000×。",useDecoupledAvatarC2paPipeline:!0,defaultStationIndex:16,badge:"AVATAR + C2PA LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"数字人分轨与 C2PA 锁死 · 1.0000×（0/17 站违背）",description:"Enterprise training and global executive communications pipelines cache the full-body gesture base plate once, synthesize only localized viseme mouth/jaw deltas, composite translated vector slides, and sign C2PA manifests.",descriptionZh:"企业全球化培训、产品发布与合规播报管线仅缓存一次数字人全身肢体底板，按语种增量合成唇形与颌骨运动，配合参数化翻译课件与 C2PA 硬件级签名，兼得零课件糊字、50% 算力节省与 100% 肖像防伪。"},naive_full_frame_video_redub_overrun:{id:"naive_full_frame_video_redub_overrun",label:"Naive Full-Frame Video-to-Video Diffusion Redubbing (Overrun = 1 + u up to 2.0000×)",labelZh:"朴素全画幅视频端到端重渲染翻译（连同背景 PPT 课件一起进扩散模型重跑，算力超支与糊字达 2.0000×）",subtitle:"Passes the entire 1080p composite frame (speaker + presentation slides) through full-frame video diffusion for every target language, blurring slide text and inflating GPU spend by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"每翻译一个新语种都将包含讲师与背景 PPT 图表的整幅 1080p 画面送入全画幅视频扩散模型重跑，不仅导致背景课件文字糊成乱码、丢失 C2PA 原始签名，更使第 16 语种批次算力成本翻倍超支至 2.0000×。",useDecoupledAvatarC2paPipeline:!1,defaultStationIndex:16,badge:"SLIDE BLUR & GPU OVERRUN · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"课件糊字与算力超支 · 最高 2.0000×（16/17 站违背）",description:"Running full-frame video diffusion on presentation videos wastes GPU compute on static slide pixels, distorts code/chart callouts, and breaks enterprise C2PA chain-of-custody across 16/17 localization tiers.",descriptionZh:"对培训与汇报视频执行全画幅扩散重生成会把大量 GPU 算力浪费在静态背景像素上，破坏图表精度并截断 C2PA 数字溯源链。"}},A=17,V=["Locale 0 (en-US Master): Base Gesture Plate + C2PA Root","Locale 1 (zh-CN): Mandarin Neural TTS + Viseme ROI Lock","Locale 2 (ja-JP): Japanese Pitch-Accent + Vector Slide Sync","Locale 3 (de-DE): German Compound-Length Pacing + Remotion","Locale 4 (es-ES): Spanish Viseme Delta + C2PA Chain Sign","Locale 5 (fr-FR): French Lip-Sync ROI + SynthID Watermark","Locale 6 (ko-KR): Korean Honorific TTS + Crisp Chart Overlay","Locale 7 (pt-BR): Portuguese Audio Beat + Consent Vault Verify","Locale 8 (ar-SA): RTL Slide Layout Mirror + Viseme ROI Lock","Locale 9 (hi-IN): Hindi Phoneme Lattice + Zero-Blur Code","Locale 10 (it-IT): Italian Prosody Transfer + C2PA Assertion","Locale 11 (nl-NL): Dutch Technical Glossary Lock + Remotion","Locale 12 (pl-PL): Polish Viseme Blendshape + Audio Ducking","Locale 13 (tr-TR): Turkish Agglutinative Timing + ROI Cache","Locale 14 (vi-VN): Vietnamese Tonal Lip-Sync + Vector HUD","Locale 15 (th-TH): Thai Script Line-Break + C2PA Manifest","Locale 16 (Global 17-Locale Matrix): c_locale = 0.5000 c_0"];function G(t){const e=1+Math.max(0,t),o=1/e;return{fullFrameRedubAmplification:e,decoupledAvatarUnitCost:o}}function H(t,a=64){const o=1/(1+Math.max(0,t)),l=Math.max(2,a%2===0?a:a+1),s=1/l;let i=2*o;for(let n=1;n<l;n++){const c=n*s,h=n%2===1?4:2;i+=h*(2*o*c)}return s/3*i}function Z(t,a){const e=Math.max(0,Math.min(A-1,t)),o=e/(A-1),l=G(o),s=H(o,64),i=1+o,n=a?1:i;return{index:e,localizationScaleU:o,fullFrameRedubAmplification:l.fullFrameRedubAmplification,decoupledAvatarUnitCost:l.decoupledAvatarUnitCost,quadratureVisemeCost:s,localizationComplianceRatio:n,naiveFullFrameOverrunRatio:i,localePipelineStageLabel:V[e]??V[0],isLocalizationComplianceViolation:n>1.0001}}function f(t,a){const e=g[t],o=[];let l=0,s=0;for(let n=0;n<A;n++){const c=Z(n,e.useDecoupledAvatarC2paPipeline);o.push(c),c.isLocalizationComplianceViolation&&l++;const h=Math.abs(c.decoupledAvatarUnitCost-c.quadratureVisemeCost);h>s&&(s=h)}const i=a!==void 0?Math.max(0,Math.min(A-1,a)):e.defaultStationIndex;return{presetId:t,useDecoupledAvatarC2paPipeline:e.useDecoupledAvatarC2paPipeline,stationCount:A,selectedStation:o[i],stations:o,station4Ratio:o[4].localizationComplianceRatio,station8Ratio:o[8].localizationComplianceRatio,station12Ratio:o[12].localizationComplianceRatio,station16Ratio:o[16].localizationComplianceRatio,violatedCount:l,maxQuadratureError:s,verdict:l===0?"DECOUPLED_AVATAR_C2PA_PIPELINE_LOCKED":"NAIVE_FULL_FRAME_REDUB_OVERRUN"}}function Q(t){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Multilingual Digital Avatar & C2PA Provenance Bus Plinth"}),a.push({id:"viseme-rail-front",kind:"viseme_audio_sync_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Vector Slide Track + C2PA Cryptographic Provenance Bus (C_active / C_avatar = 1.0000×)"}),a.push({id:"viseme-rail-back",kind:"viseme_audio_sync_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Cached Full-Body Gesture Base Plate + Neural Viseme Mouth ROI Synthesis Rail"});for(const e of t.stations){const o=(e.index-8)*30,l=22*e.fullFrameRedubAmplification,s=44*e.decoupledAvatarUnitCost,i=36*e.localizationComplianceRatio;a.push({id:`locale-demand-column-${e.index}`,kind:"locale_demand_column",stationIndex:e.index,x:o,y:l*.5-8,z:-56,w:14,h:l,d:14,tone:"amber",label:`Locale ${e.index} Amplification L(u) = ${e.fullFrameRedubAmplification.toFixed(4)}× (${e.localePipelineStageLabel})`}),a.push({id:`decoupled-avatar-roi-node-${e.index}`,kind:"decoupled_avatar_roi_node",stationIndex:e.index,x:o,y:s*.5-8,z:0,w:14,h:s,d:14,tone:t.useDecoupledAvatarC2paPipeline?"teal":"slate",label:`Locale ${e.index} Viseme ROI Unit Cost c_avatar = ${e.decoupledAvatarUnitCost.toFixed(4)}×`}),a.push({id:`c2pa-compliance-gauge-${e.index}`,kind:"c2pa_compliance_gauge",stationIndex:e.index,x:o,y:i*.5-8,z:56,w:Math.min(24,12*e.localizationComplianceRatio),h:i,d:12,tone:e.isLocalizationComplianceViolation?"crimson":"teal",label:`Locale ${e.index} Compliance & Budget Ratio = ${e.localizationComplianceRatio.toFixed(4)}×`})}return a.push({id:"consent-gate-left",kind:"consent_vault_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Biometric Speaker Consent Vault & Voice Clone Authorization Gate"}),a.push({id:"consent-gate-right",kind:"consent_vault_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:t.useDecoupledAvatarC2paPipeline?"teal":"crimson",label:"C2PA v2.1 Manifest Signer & SynthID Dual Watermark Verification Gate"}),a.push({id:"provenance-bar-top",kind:"provenance_manifest_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Avatar ROI Amortization Law: c_locale(u) = c_base / (1 + u) + c_viseme_ROI"}),a.push({id:"provenance-bar-front",kind:"provenance_manifest_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:t.useDecoupledAvatarC2paPipeline?"teal":"crimson",label:"Zero Slide-Blur & Cryptographic C2PA Chain-of-Custody Lock Line (1.0000×)"}),a}const D=new URLSearchParams(window.location.search),E=D.get("preset"),j=D.get("theme")==="light"?"light":"dark";let r=E&&E in g?E:"decoupled_avatar_viseme_c2pa_pipeline_lock",d=g[r].defaultStationIndex,C=j;document.documentElement.setAttribute("data-theme",C);const K=document.querySelector("#app");K.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 226 · 236TH DEMO · ENTERPRISE MULTILINGUAL DIGITAL AVATAR LIP-SYNC, SLIDE COMPOSITOR & C2PA PROVENANCE</span>
        <h1>Enterprise Multilingual Avatar Lip-Sync & C2PA Pipeline Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${C.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Avatar Localization Pipeline Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="decoupled_avatar_viseme_c2pa_pipeline_lock"
      >
        Decoupled Viseme ROI Avatar + Vector Slides + C2PA Lock (Ratio = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_full_frame_video_redub_overrun"
      >
        Naive Full-Frame Video Diffusion Redubbing (Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Avatar & C2PA Telemetry Readouts">
      <article class="kpi-card">
        <span class="kpi-label">AMPLIFICATION L(u) / VISEME ROI UNIT COST c_avatar</span>
        <strong id="kpi-avatar" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BUDGET & C2PA COMPLIANCE RATIO (C_active / C_avatar)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">LOCALES 4 / 8 / 16 COMPLIANCE RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">L(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">SLIDE-BLUR & C2PA PROVENANCE VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-LOCALE DIGITAL AVATAR VISEME ROI + C2PA PROVENANCE STUDIO</span>
          <span id="solid-count-readout">58 solids · 17 language tiers</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Multilingual Avatar Lip-Sync and C2PA Pipeline Studio"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Global Localization Language Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Locale 16 (u = 1.000, c_avatar = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-LOCALE VISEME ROI + VECTOR SLIDES VS FULL-FRAME REDUB LEDGER</span>
          <span>c_avatar = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Loc</th>
                <th>u</th>
                <th>L(u) = 1+u</th>
                <th>c_avatar</th>
                <th>Viseme Quad</th>
                <th>C / C_avatar</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Y=document.querySelector("#preset-subtitle"),O=document.querySelector("#preset-badge"),J=document.querySelector("#kpi-avatar"),W=document.querySelector("#kpi-quad"),y=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),ee=document.querySelector("#kpi-stations-4816"),U=document.querySelector("#kpi-violated"),te=document.querySelector("#kpi-verdict"),ae=document.querySelector("#solid-count-readout"),ie=document.querySelector("#rig-svg"),I=document.querySelector("#station-slider"),oe=document.querySelector("#station-slider-label"),z=document.querySelector("#station-tbody"),N=document.querySelector("#theme-toggle");function b(t,a,e){const o=(t-e*.55)*.88,l=-a+(t*.18+e*.42)*.55;return[o,l]}function ne(t,a){return t==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:t==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:t==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:t==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function le(t,a,e,o,l,s,i,n,c,h,M){const u=o*.5,p=l*.5,v=s*.5,$=b(t+u,a-p,e-v),L=b(t+u,a-p,e+v),F=b(t-u,a-p,e+v),T=b(t-u,a+p,e-v),k=b(t+u,a+p,e-v),m=b(t+u,a+p,e+v),_=b(t-u,a+p,e+v),P=ne(i,c),R=n?1.8:.7,S=n?"#ffffff":P.stroke,q=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,w=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,B=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${$[0].toFixed(1)},${$[1].toFixed(1)} ${k[0].toFixed(1)},${k[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${h}" data-solid-kind="${M}">
      <polygon points="${w}" fill="${P.left}" stroke="${S}" stroke-width="${R}" />
      <polygon points="${B}" fill="${P.right}" stroke="${S}" stroke-width="${R}" />
      <polygon points="${q}" fill="${P.top}" stroke="${S}" stroke-width="${R}" />
    </g>
  `}function x(t){const a=g[t.presetId],e=t.selectedStation,o=C==="dark";Y.textContent=a.subtitle,O.textContent=a.badge,O.className=`status-badge ${t.violatedCount===0?"badge-pass":"badge-fail"}`,J.textContent=`L(u) = ${e.fullFrameRedubAmplification.toFixed(4)}× (c_avatar = ${e.decoupledAvatarUnitCost.toFixed(4)}×)`,W.textContent=`Viseme Quad = ${e.quadratureVisemeCost.toFixed(4)}× (Quad err ${t.maxQuadratureError.toExponential(2)})`,y.textContent=`${e.localizationComplianceRatio.toFixed(4)}×`,y.className=`kpi-value ${e.isLocalizationComplianceViolation?"text-danger":"text-ok"}`,X.textContent=`u = ${e.localizationScaleU.toFixed(4)} | ${e.localePipelineStageLabel}`,ee.textContent=`${t.station4Ratio.toFixed(4)}× / ${t.station8Ratio.toFixed(4)}× / ${t.station16Ratio.toFixed(4)}×`,U.textContent=`${t.violatedCount} / ${t.stationCount}`,U.className=`kpi-value ${t.violatedCount>0?"text-danger":"text-ok"}`,te.textContent=t.verdict,I.value=String(e.index),oe.textContent=`Locale ${e.index} (u = ${e.localizationScaleU.toFixed(3)}, c_avatar = ${e.decoupledAvatarUnitCost.toFixed(3)}, Ratio = ${e.localizationComplianceRatio.toFixed(4)}×)`;const l=Q(t);ae.textContent=`${l.length} solids · ${t.stationCount} language tiers`;const s=[...l].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);ie.innerHTML=s.map(i=>le(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===e.index,o,i.id,i.kind)).join(""),z.innerHTML=t.stations.map(i=>{const n=i.index===e.index?"row-selected":"",c=i.isLocalizationComplianceViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.localizationScaleU.toFixed(4)}</td>
          <td>${i.fullFrameRedubAmplification.toFixed(4)}×</td>
          <td>${i.decoupledAvatarUnitCost.toFixed(4)}×</td>
          <td>${i.quadratureVisemeCost.toFixed(4)}×</td>
          <td class="${c}">${i.localizationComplianceRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===t.presetId)}),window.__ENTERPRISE_AVATAR_C2PA_SUMMARY__=t}document.querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",()=>{const a=t.getAttribute("data-preset");a&&a in g&&(r=a,d=g[r].defaultStationIndex,x(f(r,d)))})});I.addEventListener("input",()=>{d=Number(I.value),x(f(r,d))});z.addEventListener("click",t=>{const a=t.target.closest("tr[data-station-row]");a&&(d=Number(a.getAttribute("data-station-row")),x(f(r,d)))});N.addEventListener("click",()=>{C=C==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",C),N.textContent=`Theme: ${C.toUpperCase()}`,x(f(r,d))});x(f(r,d));
