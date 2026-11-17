import"./modulepreload-polyfill-B5Qt9EMX.js";const R={shot_level_multimodal_dam_reuse_lock:{id:"shot_level_multimodal_dam_reuse_lock",label:"Shot-Level Scene Slicing + SigLIP-2/Marengo Spatiotemporal Vector + Search-Before-Generate Gate (c_dam = c_0/(1+u), Lock = 1.0000×)",labelZh:"分镜级自动切片 + SigLIP-2/Marengo 时空多模态向量 + “先搜后生”拦截网关（单镜成本 c_0/(1+u)，复用与预算比恒锁 1.0000×）",subtitle:"Slices 500k master videos into atomic 3s shots, indexes visual/motion/color/C2PA embeddings in HNSW (<25ms recall), and intercepts duplicate AIGC prompts with $0.00 approved shot reuse across all 17 tiers.",subtitleZh:"将百万级历史成片自动切分为 3 秒原子分镜（[t_start, t_end]），构建视觉语义、运镜轨迹、主色板与 C2PA 版权四维 HNSW 向量索引（<25ms 召回），在调用昂贵视频生成 API 前先拦截命中历史高分镜头（$0 边际成本复用），全 17 档恒锁 1.0000×。",useShotLevelMultimodalReuse:!0,defaultStationIndex:16,badge:"SEARCH-BEFORE-GENERATE LOCKED · 1.0000× (0/17 DUPLICATE REGEN)",badgeZh:"分镜级检索复用锁死 · 1.0000×（0/17 站重复生成浪费）",description:"Enterprise marketing DAM platforms eliminate 50% redundant AIGC API spend by indexing sub-clip shots and enforcing a <25ms Search-Before-Generate gate.",descriptionZh:"企业营销数字资产中台通过“原子分镜切片 + 四维多模态向量索引 + 先搜后生拦截门禁”砍掉 50% 重复造轮子的 AIGC 算力账单。"},naive_filename_tag_blind_regeneration:{id:"naive_filename_tag_blind_regeneration",label:"Naive Filename/Folder Search & Blind AIGC Regeneration (Zero Shot Recall & Duplicate Spend Overrun = 1 + u up to 2.0000×)",labelZh:"朴素靠文件名/文件夹人工检索与盲目重新生成（历史视频内好镜头搜不出、各部门重复调 API 生成相同空镜，算力超支达 2.0000×）",subtitle:"Stores 60s videos as opaque files (`final_v3.mp4`) without sub-clip timestamp embeddings, causing 0% shot-level discovery and forcing editors to re-generate existing B-roll at 2.0000× FinOps overrun at Tier 16.",subtitleZh:"把历史视频按 `final_v3_0812.mp4` 扔在网盘里靠人工打标签，剪辑师根本搜不出某条成片第 34 秒里的黄金航拍镜头，只能每次重新调用 Sora/Veo/Kling 烧钱生成同类画面，导致第 16 档企业 AIGC 账单翻倍超支至 2.0000×。",useShotLevelMultimodalReuse:!1,defaultStationIndex:16,badge:"BLIND DUPLICATE REGENERATION · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"搜不出与重复烧钱生成 · 最高 2.0000×（16/17 站违背）",description:"Without sub-clip scene slicing and multimodal embeddings, 90% of historical AIGC and live-shoot assets become dark data, doubling generation spend across 16/17 tiers.",descriptionZh:"缺乏亚秒级分镜切分与多模态向量检索会使 90% 的历史实拍与 AI 素材沦为搜不到的“暗数据”，在 16/17 个规模档位引发双倍重复生成浪费。"}},x=17,D=["Tier 0: Small 50-Asset Single-Project Folder (Baseline)","Tier 1: PySceneDetect / TransNetV2 Sub-Second Shot Boundary Slice","Tier 2: SigLIP-2 / Marengo 1024-D Spatiotemporal Frame Embeddings","Tier 3: Optical-Flow Camera Motion Tagging (Dolly / Pan / Orbit)","Tier 4: VLM Structured Dense Caption (Subject / Lighting / Mood)","Tier 5: 5-Cluster CIE Lab Dominant Color Palette Histogram Index","Tier 6: Whisper ASR + PaddleOCR In-Scene Text Hybrid Inverted Index","Tier 7: C2PA Provenance, Talent Release & Expiration License Filter","Tier 8: HNSW Graph + Scalar Quantization (SQ8) <25ms Vector Search","Tier 9: Cross-Modal Reciprocal Rank Fusion (RRF: Text + Image + Color)","Tier 10: Search-Before-Generate FinOps Interceptor (Sim >= 0.88)","Tier 11: Exact Sub-Clip Byte-Range Preview & NLE Timeline Drag-Drop","Tier 12: Perceptual pHash + SSIM Near-Duplicate Ingestion Dedup","Tier 13: Product SKU 3D-Pose & Packaging Version Lineage Graph","Tier 14: Regional Compliance & Brand Safety Negative-Vector Filter","Tier 15: Automated Cold-Storage Tiering for Zero-Hit Legacy Clips","Tier 16: 1,000,000-Shot Global Enterprise DAM Reuse Hub (0.50 c_0)"];function w(t){const e=1+Math.max(0,t),o=1/e;return{redundantRegenAmplification:e,multimodalDamAmortizedUnitCost:o}}function z(t,i=64){const o=1/(1+Math.max(0,t)),s=Math.max(2,i%2===0?i:i+1),l=1/s;let a=2*o;for(let n=1;n<s;n++){const d=n*l,b=n%2===1?4:2;a+=b*(2*o*d)}return l/3*a}function W(t,i){const e=Math.max(0,Math.min(x-1,t)),o=e/(x-1),s=w(o),l=z(o,64),a=1+o,n=i?1:a;return{index:e,damArchiveScaleU:o,redundantRegenAmplification:s.redundantRegenAmplification,multimodalDamAmortizedUnitCost:s.multimodalDamAmortizedUnitCost,quadratureVectorRecallCost:l,damReuseFinopsRatio:n,naiveDuplicateRegenOverrunRatio:a,damRetrievalTierLabel:D[e]??D[0],isDuplicateRegenViolation:n>1.0001}}function E(t,i){const e=R[t],o=[];let s=0,l=0;for(let n=0;n<x;n++){const d=W(n,e.useShotLevelMultimodalReuse);o.push(d),d.isDuplicateRegenViolation&&s++;const b=Math.abs(d.multimodalDamAmortizedUnitCost-d.quadratureVectorRecallCost);b>l&&(l=b)}const a=i!==void 0?Math.max(0,Math.min(x-1,i)):e.defaultStationIndex;return{presetId:t,useShotLevelMultimodalReuse:e.useShotLevelMultimodalReuse,stationCount:x,selectedStation:o[a],stations:o,station4Ratio:o[4].damReuseFinopsRatio,station8Ratio:o[8].damReuseFinopsRatio,station12Ratio:o[12].damReuseFinopsRatio,station16Ratio:o[16].damReuseFinopsRatio,violatedCount:s,maxQuadratureError:l,verdict:s===0?"SHOT_LEVEL_MULTIMODAL_DAM_REUSE_LOCKED":"NAIVE_FILENAME_MISS_REDUNDANT_REGEN_OVERRUN"}}function Z(t){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise 1M-Shot Multimodal DAM Search & Search-Before-Generate Plinth"}),i.push({id:"vector-rail-front",kind:"hnsw_spatiotemporal_vector_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"<25ms HNSW RRF (SigLIP-2 + Motion + CIE Palette + C2PA) Reuse Bus (1.0000×)"}),i.push({id:"vector-rail-back",kind:"hnsw_spatiotemporal_vector_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"PySceneDetect Sub-Clip Timestamp Slicer [t_start, t_end] Bus"});for(const e of t.stations){const o=(e.index-8)*30,s=22*e.redundantRegenAmplification,l=44*e.multimodalDamAmortizedUnitCost,a=36*e.damReuseFinopsRatio;i.push({id:`archive-query-demand-column-${e.index}`,kind:"archive_query_demand_column",stationIndex:e.index,x:o,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Tier ${e.index} Amplification R(u) = ${e.redundantRegenAmplification.toFixed(4)}× (${e.damRetrievalTierLabel})`}),i.push({id:`shot-slice-siglip-node-${e.index}`,kind:"shot_slice_siglip_node",stationIndex:e.index,x:o,y:l*.5-8,z:0,w:14,h:l,d:14,tone:t.useShotLevelMultimodalReuse?"teal":"slate",label:`Tier ${e.index} Amortized DAM Cost c_dam = ${e.multimodalDamAmortizedUnitCost.toFixed(4)}×`}),i.push({id:`dam-finops-reuse-gauge-${e.index}`,kind:"dam_finops_reuse_gauge",stationIndex:e.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*e.damReuseFinopsRatio),h:a,d:12,tone:e.isDuplicateRegenViolation?"crimson":"teal",label:`Tier ${e.index} Reuse & FinOps Budget Ratio = ${e.damReuseFinopsRatio.toFixed(4)}×`})}return i.push({id:"sbg-gate-left",kind:"search_before_generate_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"PySceneDetect Shot Slicer & 4-Track Multimodal Embedding Gate"}),i.push({id:"sbg-gate-right",kind:"search_before_generate_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:t.useShotLevelMultimodalReuse?"teal":"crimson",label:"Search-Before-Generate (Sim >= 0.88) FinOps Interceptor Gate"}),i.push({id:"regen-bar-top",kind:"zero_duplicate_regen_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"DAM Reuse Law: c_dam(u) = c_0 / (1 + u) via Shot-Level Multimodal RAG"}),i.push({id:"regen-bar-front",kind:"zero_duplicate_regen_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:t.useShotLevelMultimodalReuse?"teal":"crimson",label:"0 Redundant AIGC Regeneration & <25ms Shot Recall Lock Line (1.0000×)"}),i}const G=new URLSearchParams(window.location.search),I=G.get("preset"),Q=G.get("theme")==="light"?"light":"dark";let r=I&&I in R?I:"shot_level_multimodal_dam_reuse_lock",c=R[r].defaultStationIndex,g=Q;document.documentElement.setAttribute("data-theme",g);const j=document.querySelector("#app");j.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 248 · 258TH DEMO · ENTERPRISE MULTIMODAL DAM VISUAL ASSET SEARCH &amp; SEARCH-BEFORE-GENERATE WORKBENCH</span>
        <h1>Enterprise Multimodal DAM Visual Asset Search &amp; Search-Before-Generate Workbench</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${g.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Multimodal DAM Search Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="shot_level_multimodal_dam_reuse_lock"
      >
        Shot-Level Scene Slicing + SigLIP-2/Marengo Vector + Search-Before-Generate (Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_filename_tag_blind_regeneration"
      >
        Naive Filename/Folder Search &amp; Blind AIGC Regeneration (Duplicate Spend = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Multimodal DAM FinOps Readouts">
      <article class="kpi-card">
        <span class="kpi-label">REGEN FACTOR R(u) / DAM REUSE COST c_dam</span>
        <strong id="kpi-dam" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">ASSET REUSE &amp; FINOPS BUDGET RATIO (C_active / C_dam)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">TIERS 4 / 8 / 16 BUDGET RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">R(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BLIND DUPLICATE REGEN VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-TIER SHOT-LEVEL MULTIMODAL VECTOR INDEX &amp; SEARCH-BEFORE-GENERATE STAGE</span>
          <span id="solid-count-readout">58 solids · 17 DAM tiers</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Multimodal DAM Visual Asset Search and Search-Before-Generate Workbench"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Enterprise DAM Shot-Level Indexing &amp; FinOps Tier (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Tier 16 (u = 1.000, c_dam = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-TIER SHOT-LEVEL MULTIMODAL DAM VS NAIVE FILENAME REGEN LEDGER</span>
          <span>c_dam = c_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Tier</th>
                <th>u</th>
                <th>R(u) = 1+u</th>
                <th>c_dam</th>
                <th>HNSW Quad</th>
                <th>C / C_dam</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),N=document.querySelector("#preset-badge"),X=document.querySelector("#kpi-dam"),Y=document.querySelector("#kpi-quad"),O=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),ee=document.querySelector("#kpi-stations-4816"),P=document.querySelector("#kpi-violated"),te=document.querySelector("#kpi-verdict"),ie=document.querySelector("#solid-count-readout"),ae=document.querySelector("#rig-svg"),F=document.querySelector("#station-slider"),oe=document.querySelector("#station-slider-label"),y=document.querySelector("#station-tbody"),U=document.querySelector("#theme-toggle");function h(t,i,e){const o=(t-e*.55)*.88,s=-i+(t*.18+e*.42)*.55;return[o,s]}function ne(t,i){return t==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:t==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:t==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:t==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function se(t,i,e,o,s,l,a,n,d,b,V){const u=o*.5,p=s*.5,m=l*.5,M=h(t+u,i-p,e-m),f=h(t+u,i-p,e+m),$=h(t-u,i-p,e+m),L=h(t-u,i+p,e-m),A=h(t+u,i+p,e-m),S=h(t+u,i+p,e+m),v=h(t-u,i+p,e+m),k=ne(a,d),C=n?1.8:.7,T=n?"#ffffff":k.stroke,B=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,H=`${$[0].toFixed(1)},${$[1].toFixed(1)} ${f[0].toFixed(1)},${f[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`,q=`${f[0].toFixed(1)},${f[1].toFixed(1)} ${M[0].toFixed(1)},${M[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${S[0].toFixed(1)},${S[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${b}" data-solid-kind="${V}">
      <polygon points="${H}" fill="${k.left}" stroke="${T}" stroke-width="${C}" />
      <polygon points="${q}" fill="${k.right}" stroke="${T}" stroke-width="${C}" />
      <polygon points="${B}" fill="${k.top}" stroke="${T}" stroke-width="${C}" />
    </g>
  `}function _(t){const i=R[t.presetId],e=t.selectedStation,o=g==="dark";K.textContent=i.subtitle,N.textContent=i.badge,N.className=`status-badge ${t.violatedCount===0?"badge-pass":"badge-fail"}`,X.textContent=`R(u) = ${e.redundantRegenAmplification.toFixed(4)}× (c_dam = ${e.multimodalDamAmortizedUnitCost.toFixed(4)}×)`,Y.textContent=`HNSW Quad = ${e.quadratureVectorRecallCost.toFixed(4)}× (Quad err ${t.maxQuadratureError.toExponential(2)})`,O.textContent=`${e.damReuseFinopsRatio.toFixed(4)}×`,O.className=`kpi-value ${e.isDuplicateRegenViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${e.damArchiveScaleU.toFixed(4)} | ${e.damRetrievalTierLabel}`,ee.textContent=`${t.station4Ratio.toFixed(4)}× / ${t.station8Ratio.toFixed(4)}× / ${t.station16Ratio.toFixed(4)}×`,P.textContent=`${t.violatedCount} / ${t.stationCount}`,P.className=`kpi-value ${t.violatedCount>0?"text-danger":"text-ok"}`,te.textContent=t.verdict,F.value=String(e.index),oe.textContent=`Tier ${e.index} (u = ${e.damArchiveScaleU.toFixed(3)}, c_dam = ${e.multimodalDamAmortizedUnitCost.toFixed(3)}, Ratio = ${e.damReuseFinopsRatio.toFixed(4)}×)`;const s=Z(t);ie.textContent=`${s.length} solids · ${t.stationCount} DAM tiers`;const l=[...s].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);ae.innerHTML=l.map(a=>se(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===e.index,o,a.id,a.kind)).join(""),y.innerHTML=t.stations.map(a=>{const n=a.index===e.index?"row-selected":"",d=a.isDuplicateRegenViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.damArchiveScaleU.toFixed(4)}</td>
          <td>${a.redundantRegenAmplification.toFixed(4)}×</td>
          <td>${a.multimodalDamAmortizedUnitCost.toFixed(4)}×</td>
          <td>${a.quadratureVectorRecallCost.toFixed(4)}×</td>
          <td class="${d}">${a.damReuseFinopsRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===t.presetId)}),window.__MULTIMODAL_DAM_SEARCH_SUMMARY__=t}document.querySelectorAll(".preset-btn").forEach(t=>{t.addEventListener("click",()=>{const i=t.getAttribute("data-preset");i&&i in R&&(r=i,c=R[r].defaultStationIndex,_(E(r,c)))})});F.addEventListener("input",()=>{c=Number(F.value),_(E(r,c))});y.addEventListener("click",t=>{const i=t.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),_(E(r,c)))});U.addEventListener("click",()=>{g=g==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",g),U.textContent=`Theme: ${g.toUpperCase()}`,_(E(r,c))});_(E(r,c));
