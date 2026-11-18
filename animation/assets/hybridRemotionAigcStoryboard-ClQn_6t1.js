import"./modulepreload-polyfill-B5Qt9EMX.js";const x={hybrid_ai_broll_remotion_compositor_lock:{id:"hybrid_ai_broll_remotion_compositor_lock",label:"Hybrid AI B-Roll Cache + Remotion Code Compositor (c_unit = c_0/(1+u), Budget/SKU Lock = 1.0000×)",labelZh:"AI 缓存镜头 (Wan/Kling/Veo) + Remotion 代码合成混合管线（单条成本 c_0/(1+u)，合规与预算比恒锁 1.0000×）",subtitle:"Decouples cached AI generative B-roll backgrounds (Wan 2.2 / Kling 2.1 / Veo 3 with alpha product mask) from deterministic Remotion code overlays (SKU price, multi-language subtitles, C2PA manifest), locking unit budget & compliance ratio at 1.0000× across all 17 campaign scale stations.",subtitleZh:"将“AI 视频大模型生成写实环境镜头缓存（Wan 2.2 / Kling 2.1 / Veo 3 + 商品主体掩码锁定）”与“Remotion 代码级确定性参数化合成（价格标签、多语种字幕、音频卡点、C2PA 水印）”解耦，在全 17 个营销批次站点恒定锁死成本与合规比 1.0000×。",useHybridRemotionPipeline:!0,defaultStationIndex:16,badge:"HYBRID PIPELINE LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"混合管线锁死 · 1.0000×（0/17 站超支或幻觉违背）",description:"Enterprise e-commerce and brand video pipelines generate photorealistic B-roll once via AI video APIs and amortize it across 1+u localized SKU variants using Remotion deterministic React/Canvas rendering.",descriptionZh:"企业电商与品牌营销管线仅调用一次 AI 视频模型生成高质感环境底片并写入资产缓存，随后通过 Remotion 参数化模板以接近零边际 GPU 成本批量合成多语种价格、SKU 包装与 C2PA 溯源元数据。"},naive_pure_ai_full_latent_regeneration_overrun:{id:"naive_pure_ai_full_latent_regeneration_overrun",label:"Naive Pure End-to-End AI Video Regeneration (Full Latent Re-Sampling, Overrun = 1 + u up to 2.0000×)",labelZh:"朴素纯 AI 端到端全量重生成管线（每次改价/改字幕均重跑视频扩散模型，成本与幻觉超支达 2.0000×）",subtitle:"Re-runs full text-to-video latent diffusion for every localized price tag, subtitle, or SKU badge update, inflating unit GPU spend and glyph-hallucination risk by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"每次修改促销价格、多语种字幕或品牌角标都重新调用端到端视频扩散大模型，不仅导致包装文字畸变与 Logo 幻觉，更使单条成片算力成本在第 4 站超支 1.2500×、第 8 站超支 1.5000×、第 16 站翻倍超支至 2.0000×。",useHybridRemotionPipeline:!1,defaultStationIndex:16,badge:"BUDGET & GLYPH OVERRUN · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"算力超支与文字幻觉 · 最高 2.0000×（16/17 站违背）",description:"Prompting diffusion video models to directly render dynamic prices, small SKU typography, and localized subtitles wastes GPU tokens and fails enterprise brand compliance across 16/17 campaign tiers.",descriptionZh:"直接用 Prompt 让视频生成大模型在像素潜空间里“画出促销价格与小字号包装文案”，既无法保证帧级音画对齐，又在批量多语种投放中造成最高 2.0000× 的算力浪费。"}},v=17,P=["Wan 2.2 Turbo B-Roll + Remotion SVG Overlay","Wan 2.2 + IC-Light Relight + Remotion 60fps","Kling 2.1 Subject-Lock + Remotion Price HUD","Kling 2.1 + Depth ControlNet + Remotion Subtitles","Runway Gen-4 Turbo + Remotion Multi-Locale","Runway Gen-4 + Alpha Matte + Remotion AudioSync","Veo 3 Studio B-Roll + Remotion Data-Driven","Veo 3 + C2PA Signer + Remotion Batch Worker","Sora 2 Hero Plate + Remotion SKU Compositor","Sora 2 + LoRA Product Lock + Remotion Timeline","Flux.1 Dev Keyframe + Wan I2V + Remotion","ComfyUI ControlNet Tile + Remotion WebGL","Veo 3 + Kling Hybrid Router + Remotion Lambda","Wan 2.2 14B + Rive State + Remotion Render","Kling 2.1 Master + Remotion 12-Locale Matrix","Veo 3 + Sora 2 Failover + Remotion C2PA Lock","Enterprise Global 1000-SKU Hybrid AI+Remotion"];function q(e){const t=1+Math.max(0,e),n=1/t;return{variantMultiplier:t,hybridAmortizedUnitFactor:n}}function K(e,i=64){const n=1/(1+Math.max(0,e)),r=Math.max(2,i%2===0?i:i+1),s=1/r;let o=2*n;for(let a=1;a<r;a++){const d=a*s,R=a%2===1?4:2;o+=R*(2*n*d)}return s/3*o}function z(e,i){const t=Math.max(0,Math.min(v-1,e)),n=t/(v-1),r=q(n),s=K(n,64),o=1+n,a=i?1:o;return{index:t,campaignVariantReuseU:n,variantMultiplier:r.variantMultiplier,hybridAmortizedUnitFactor:r.hybridAmortizedUnitFactor,quadratureTimelineFactor:s,budgetOverrunRatio:a,naivePureAiOverrunRatio:o,pipelineTierLabel:P[t]??P[0],isBudgetComplianceViolation:a>1.0001}}function k(e,i){const t=x[e],n=[];let r=0,s=0;for(let a=0;a<v;a++){const d=z(a,t.useHybridRemotionPipeline);n.push(d),d.isBudgetComplianceViolation&&r++;const R=Math.abs(d.hybridAmortizedUnitFactor-d.quadratureTimelineFactor);R>s&&(s=R)}const o=i!==void 0?Math.max(0,Math.min(v-1,i)):t.defaultStationIndex;return{presetId:e,useHybridRemotionPipeline:t.useHybridRemotionPipeline,stationCount:v,selectedStation:n[o],stations:n,station4Ratio:n[4].budgetOverrunRatio,station8Ratio:n[8].budgetOverrunRatio,station12Ratio:n[12].budgetOverrunRatio,station16Ratio:n[16].budgetOverrunRatio,violatedCount:r,maxQuadratureError:s,verdict:r===0?"HYBRID_AI_REMOTION_PIPELINE_LOCKED":"NAIVE_PURE_AI_REGEN_BUDGET_OVERRUN"}}function Y(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise AIGC Video + Remotion Deterministic Compositor Bus Plinth"}),i.push({id:"timeline-rail-front",kind:"timeline_track_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Remotion Parameterized Overlay Track (SKU Price / Multi-Locale Subtitles / C2PA Lock = 1.0000×)"}),i.push({id:"timeline-rail-back",kind:"timeline_track_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"AI Generative B-Roll Cache Bus (Wan 2.2 / Kling 2.1 / Veo 3 / Sora 2 Hero Plates)"});for(const t of e.stations){const n=(t.index-8)*30,r=22*t.variantMultiplier,s=44*t.hybridAmortizedUnitFactor,o=36*t.budgetOverrunRatio;i.push({id:`sku-variant-demand-column-${t.index}`,kind:"sku_variant_demand_column",stationIndex:t.index,x:n,y:r*.5-8,z:-56,w:14,h:r,d:14,tone:"amber",label:`Station ${t.index} SKU Variant Factor M(u) = ${t.variantMultiplier.toFixed(4)}× (${t.pipelineTierLabel})`}),i.push({id:`hybrid-remotion-compositor-node-${t.index}`,kind:"hybrid_remotion_compositor_node",stationIndex:t.index,x:n,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useHybridRemotionPipeline?"teal":"slate",label:`Station ${t.index} Amortized B-Roll Unit Cost c_hybrid = ${t.hybridAmortizedUnitFactor.toFixed(4)}×`}),i.push({id:`budget-compliance-gauge-${t.index}`,kind:"budget_compliance_gauge",stationIndex:t.index,x:n,y:o*.5-8,z:56,w:Math.min(24,12*t.budgetOverrunRatio),h:o,d:12,tone:t.isBudgetComplianceViolation?"crimson":"teal",label:`Station ${t.index} Cost & Compliance Ratio = ${t.budgetOverrunRatio.toFixed(4)}×`})}return i.push({id:"pipeline-gate-ingest",kind:"pipeline_stage_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Stage 1: Brand Prompt Guardrail & SKU Alpha-Matte Geometry Lock Gate"}),i.push({id:"pipeline-gate-delivery",kind:"pipeline_stage_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useHybridRemotionPipeline?"teal":"crimson",label:"Stage 2: Remotion Lambda Compositor & C2PA Cryptographic CDN Delivery Gate"}),i.push({id:"governance-bar-top",kind:"c2pa_governance_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Hybrid Unit Economics Law: c_unit(u) = c_AI_Broll / (1 + u) + c_Remotion_Overlay"}),i.push({id:"governance-bar-front",kind:"c2pa_governance_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useHybridRemotionPipeline?"teal":"crimson",label:"SKU Typography, Price Accuracy & C2PA Provenance Lock Line (1.0000×)"}),i}const N=new URLSearchParams(window.location.search),A=N.get("preset"),W=N.get("theme")==="light"?"light":"dark";let l=A&&A in x?A:"hybrid_ai_broll_remotion_compositor_lock",c=x[l].defaultStationIndex,g=W;document.documentElement.setAttribute("data-theme",g);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · 233RD DEMO · ENTERPRISE E-COMMERCE AIGC VIDEO + REMOTION STORYBOARD COMPOSITOR ARCHITECTURE</span>
        <h1>Hybrid AI Video B-Roll + Remotion Storyboard Compositor Studio</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Enterprise Video Pipeline Architecture Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="hybrid_ai_broll_remotion_compositor_lock"
      >
        Hybrid AI B-Roll Cache + Remotion Code Compositor (Cost & SKU Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_pure_ai_full_latent_regeneration_overrun"
      >
        Naive Pure AI End-to-End Regeneration (Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Enterprise AIGC Pipeline Readouts">
      <article class="kpi-card">
        <span class="kpi-label">VARIANT MULTIPLIER M(u) / AMORTIZED B-ROLL COST</span>
        <strong id="kpi-hybrid" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BUDGET & SKU COMPLIANCE RATIO (C_active / C_hybrid)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CAMPAIGN TIERS 4 / 8 / 16 COST RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">M(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BUDGET & GLYPH HALLUCINATION VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ENTERPRISE AIGC B-ROLL + REMOTION COMPOSITOR SANDBOX</span>
          <span id="solid-count-readout">58 solids · 17 campaign stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Hybrid AI B-Roll + Remotion Storyboard Compositor architecture sandbox"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Campaign Scale & Localization Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, c_hybrid = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-TIER HYBRID AI+REMOTION VS PURE AI REGENERATION LEDGER</span>
          <span>c_unit = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>u</th>
                <th>M(u) = 1+u</th>
                <th>c_hybrid</th>
                <th>Timeline Quad</th>
                <th>C / C_hybrid</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Q=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),j=document.querySelector("#kpi-hybrid"),X=document.querySelector("#kpi-quad"),U=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),M=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),it=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),$=document.querySelector("#station-slider"),nt=document.querySelector("#station-slider-label"),H=document.querySelector("#station-tbody"),B=document.querySelector("#theme-toggle");function m(e,i,t){const n=(e-t*.55)*.88,r=-i+(e*.18+t*.42)*.55;return[n,r]}function at(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function rt(e,i,t,n,r,s,o,a,d,R,V){const u=n*.5,p=r*.5,b=s*.5,O=m(e+u,i-p,t-b),I=m(e+u,i-p,t+b),T=m(e-u,i-p,t+b),F=m(e-u,i+p,t-b),S=m(e+u,i+p,t-b),h=m(e+u,i+p,t+b),E=m(e-u,i+p,t+b),f=at(o,d),y=a?1.8:.7,C=a?"#ffffff":f.stroke,D=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,G=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${I[0].toFixed(1)},${I[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,w=`${I[0].toFixed(1)},${I[1].toFixed(1)} ${O[0].toFixed(1)},${O[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${h[0].toFixed(1)},${h[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${R}" data-solid-kind="${V}">
      <polygon points="${G}" fill="${f.left}" stroke="${C}" stroke-width="${y}" />
      <polygon points="${w}" fill="${f.right}" stroke="${C}" stroke-width="${y}" />
      <polygon points="${D}" fill="${f.top}" stroke="${C}" stroke-width="${y}" />
    </g>
  `}function _(e){const i=x[e.presetId],t=e.selectedStation,n=g==="dark";Q.textContent=i.subtitle,L.textContent=i.badge,L.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,j.textContent=`M(u) = ${t.variantMultiplier.toFixed(4)}× (c_hybrid = ${t.hybridAmortizedUnitFactor.toFixed(4)}×)`,X.textContent=`Timeline Quad = ${t.quadratureTimelineFactor.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,U.textContent=`${t.budgetOverrunRatio.toFixed(4)}×`,U.className=`kpi-value ${t.isBudgetComplianceViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.campaignVariantReuseU.toFixed(4)} | ${t.pipelineTierLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,M.textContent=`${e.violatedCount} / ${e.stationCount}`,M.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,$.value=String(t.index),nt.textContent=`Tier ${t.index} (u = ${t.campaignVariantReuseU.toFixed(3)}, c_hybrid = ${t.hybridAmortizedUnitFactor.toFixed(3)}, Ratio = ${t.budgetOverrunRatio.toFixed(4)}×)`;const r=Y(e);it.textContent=`${r.length} solids · ${e.stationCount} campaign stations`;const s=[...r].sort((o,a)=>o.z-a.z||o.y-a.y||o.x-a.x);ot.innerHTML=s.map(o=>rt(o.x,o.y,o.z,o.w,o.h,o.d,o.tone,o.stationIndex===t.index,n,o.id,o.kind)).join(""),H.innerHTML=e.stations.map(o=>{const a=o.index===t.index?"row-selected":"",d=o.isBudgetComplianceViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${o.index}">
          <td>#${o.index}</td>
          <td>${o.campaignVariantReuseU.toFixed(4)}</td>
          <td>${o.variantMultiplier.toFixed(4)}×</td>
          <td>${o.hybridAmortizedUnitFactor.toFixed(4)}×</td>
          <td>${o.quadratureTimelineFactor.toFixed(4)}×</td>
          <td class="${d}">${o.budgetOverrunRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(o=>{const a=o.getAttribute("data-preset");o.classList.toggle("active",a===e.presetId)}),window.__HYBRID_REMOTION_STORYBOARD_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in x&&(l=i,c=x[l].defaultStationIndex,_(k(l,c)))})});$.addEventListener("input",()=>{c=Number($.value),_(k(l,c))});H.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),_(k(l,c)))});B.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),B.textContent=`Theme: ${g.toUpperCase()}`,_(k(l,c))});_(k(l,c));
