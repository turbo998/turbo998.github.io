import"./modulepreload-polyfill-B5Qt9EMX.js";const h={brand_vi_ast_compiler_c2pa_gateway_lock:{id:"brand_vi_ast_compiler_c2pa_gateway_lock",label:"Prompt AST Compiler + Brand VI LUT Lock + CLIP/C2PA Compliance Gateway (g_unit = g_0/(1+u), Lock = 1.0000×)",labelZh:"提示词 AST 编译器 + 品牌 VI 色板锁死 + CLIP/C2PA 版权合规网关（单次成本 g_0/(1+u)，合规与安全比恒锁 1.0000×）",subtitle:"Compiles freeform briefs into structured Brand Prompt ASTs, strips copyrighted IP/competitor tokens, enforces corporate CI/VI color palettes (ΔE₀₀ ≤ 1.5), and embeds C2PA v2.1 indemnity manifests across all 17 enterprise governance stations.",subtitleZh:"将自由文本需求编译为结构化品牌提示词 AST，前置拦截侵权艺术家/竞品商标词条，强制注入企业 VI 标准色板（ΔE₀₀ ≤ 1.5）与镜头 LUT，并在出片端执行 CLIP 侵权相似度扫描与 C2PA 版权签名，在全 17 个治理层级恒锁合规比 1.0000×。",useBrandGuardrailGateway:!0,defaultStationIndex:16,badge:"BRAND VI & C2PA LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"品牌 VI 与版权合规锁死 · 1.0000×（0/17 站违背）",description:"Enterprise AIGC governance gateways prevent copyright lawsuits and off-brand visuals by wrapping all foundation models behind a deterministic Prompt AST Compiler, CIE ΔE₀₀ palette verifier, and C2PA provenance signer.",descriptionZh:"企业级 AIGC 生产网关通过“前置提示词 AST 编译与侵权词库过滤 + 中置品牌 VI 色域/光影风格锁定 + 后置 CLIP 版权比对与 C2PA 溯源签名”，让数百家代理商与内部团队安全合规地使用视觉大模型。"},naive_raw_prompt_passthrough_compliance_overrun:{id:"naive_raw_prompt_passthrough_compliance_overrun",label:"Naive Raw Prompt Pass-Through (Brand Drift, IP Infringement & Rejection Overrun = 1 + u up to 2.0000×)",labelZh:"朴素裸 Prompt 直通车模式（无品牌色板约束与侵权词拦截，法务驳回与废片重跑超支达 2.0000×）",subtitle:"Allows raw unvalidated user prompts directly into image/video foundation models without VI palette locking or IP blocklists, causing off-brand colors, copyright takedowns, and 2.0000× remediation overrun at Station 16.",subtitleZh:"允许运营人员与外部代理商将未经校验的自由文本 Prompt 直接透传给图像/视频大模型，导致品牌主色调偏离、误触第三方迪士尼/漫威等版权 IP 红线及缺少 C2PA 水印，使第 16 站法务驳回与返工成本翻倍至 2.0000×。",useBrandGuardrailGateway:!1,defaultStationIndex:16,badge:"VI DRIFT & IP RISK · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"品牌偏色与侵权返工 · 最高 2.0000×（16/17 站违背）",description:"Exposing raw foundation model prompts to enterprise marketing teams without a Brand VI & Copyright Guardrail Gateway fails legal compliance across 16/17 governance tiers.",descriptionZh:"在企业环境中裸奔调用视觉大模型而不设品牌 VI 与版权合规网关，会在多部门协同时引发严重的品牌形象割裂与知识产权诉讼风险。"}},f=17,T=["Gate 0: Prompt AST Schema Parser (Subject/Lens/Lighting)","Gate 1: Copyrighted IP & Living-Artist Token Stripper","Gate 2: Competitor Brand & Trademark Regex/Trie Firewall","Gate 3: Corporate Pantone/Hex Palette Injector (ΔE₀₀ ≤ 1.5)","Gate 4: Approved Studio Camera LUT & Focal Length Lock","Gate 5: Safety & NSFW Multi-Modal Classifier Pre-Filter","Gate 6: Cultural & Regional Taboo Visual Rule Engine","Gate 7: Financial/Medical Regulatory Disclaimer Enforcer","Gate 8: Style-Adapter / Brand LoRA Weight Clamp (0.85)","Gate 9: Post-Gen CLIP Trademark Cosine Similarity Gate","Gate 10: Automated CIE LAB Color Histogram Audit Gate","Gate 11: OCR Hallucinated Text & Gibberish Detector","Gate 12: C2PA v2.1 Cryptographic Manifest Signer","Gate 13: Imperceptible Frequency Watermark (SynthID)","Gate 14: Enterprise Indemnity Audit Log (Immutable WORM)","Gate 15: Multi-Agency RBAC & Brand Book Version Lock","Gate 16: Global 500-Seat Brand Governance Lock (0.50 g_0)"];function z(e){const t=1+Math.max(0,e),o=1/t;return{rawPromptRejectionAmplification:t,gatewayAmortizedUnitCost:o}}function j(e,a=64){const o=1/(1+Math.max(0,e)),r=Math.max(2,a%2===0?a:a+1),s=1/r;let i=2*o;for(let n=1;n<r;n++){const d=n*s,C=n%2===1?4:2;i+=C*(2*o*d)}return s/3*i}function W(e,a){const t=Math.max(0,Math.min(f-1,e)),o=t/(f-1),r=z(o),s=j(o,64),i=1+o,n=a?1:i;return{index:t,governanceScaleU:o,rawPromptRejectionAmplification:r.rawPromptRejectionAmplification,gatewayAmortizedUnitCost:r.gatewayAmortizedUnitCost,quadraturePolicyAstCost:s,brandComplianceSafetyRatio:n,naiveRawPromptOverrunRatio:i,guardrailPolicyStageLabel:T[t]??T[0],isBrandComplianceViolation:n>1.0001}}function x(e,a){const t=h[e],o=[];let r=0,s=0;for(let n=0;n<f;n++){const d=W(n,t.useBrandGuardrailGateway);o.push(d),d.isBrandComplianceViolation&&r++;const C=Math.abs(d.gatewayAmortizedUnitCost-d.quadraturePolicyAstCost);C>s&&(s=C)}const i=a!==void 0?Math.max(0,Math.min(f-1,a)):t.defaultStationIndex;return{presetId:e,useBrandGuardrailGateway:t.useBrandGuardrailGateway,stationCount:f,selectedStation:o[i],stations:o,station4Ratio:o[4].brandComplianceSafetyRatio,station8Ratio:o[8].brandComplianceSafetyRatio,station12Ratio:o[12].brandComplianceSafetyRatio,station16Ratio:o[16].brandComplianceSafetyRatio,violatedCount:r,maxQuadratureError:s,verdict:r===0?"BRAND_VI_C2PA_GATEWAY_LOCKED":"NAIVE_RAW_PROMPT_COMPLIANCE_OVERRUN"}}function H(e){const a=[];a.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Enterprise Brand VI Guardrail, Prompt AST Compiler & C2PA Gateway Plinth"}),a.push({id:"compiler-rail-front",kind:"prompt_ast_compiler_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"CLIP IP-Similarity Gate + CIE ΔE₀₀ Palette Verifier + C2PA Signer Bus (1.0000×)"}),a.push({id:"compiler-rail-back",kind:"prompt_ast_compiler_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Structured Prompt AST Compiler + Brand VI Hex/LUT Injection Bus"});for(const t of e.stations){const o=(t.index-8)*30,r=22*t.rawPromptRejectionAmplification,s=44*t.gatewayAmortizedUnitCost,i=36*t.brandComplianceSafetyRatio;a.push({id:`agency-governance-column-${t.index}`,kind:"agency_governance_column",stationIndex:t.index,x:o,y:r*.5-8,z:-56,w:14,h:r,d:14,tone:"amber",label:`Gate ${t.index} Amplification G(u) = ${t.rawPromptRejectionAmplification.toFixed(4)}× (${t.guardrailPolicyStageLabel})`}),a.push({id:`brand-lut-c2pa-node-${t.index}`,kind:"brand_lut_c2pa_node",stationIndex:t.index,x:o,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useBrandGuardrailGateway?"teal":"slate",label:`Gate ${t.index} Amortized Governance Cost g_unit = ${t.gatewayAmortizedUnitCost.toFixed(4)}×`}),a.push({id:`compliance-safety-gauge-${t.index}`,kind:"compliance_safety_gauge",stationIndex:t.index,x:o,y:i*.5-8,z:56,w:Math.min(24,12*t.brandComplianceSafetyRatio),h:i,d:12,tone:t.isBrandComplianceViolation?"crimson":"teal",label:`Gate ${t.index} Brand & Legal Safety Ratio = ${t.brandComplianceSafetyRatio.toFixed(4)}×`})}return a.push({id:"firewall-gate-left",kind:"ip_blocklist_firewall_gate",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Pre-Flight: IP/Competitor Token Firewall & Brand VI AST Compiler Gate"}),a.push({id:"firewall-gate-right",kind:"ip_blocklist_firewall_gate",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useBrandGuardrailGateway?"teal":"crimson",label:"Post-Flight: CLIP Trademark Scanner, ΔE₀₀ Audit & C2PA v2.1 Signer Gate"}),a.push({id:"palette-bar-top",kind:"delta_e_palette_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Brand Governance Law: g_unit(u) = g_0 / (1 + u), CIE ΔE₀₀ ≤ 1.50 Brand Lock"}),a.push({id:"palette-bar-front",kind:"delta_e_palette_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useBrandGuardrailGateway?"teal":"crimson",label:"Zero Copyright Infringement & 100% C2PA Indemnity Lock Line (1.0000×)"}),a}const O=new URLSearchParams(window.location.search),v=O.get("preset"),Y=O.get("theme")==="light"?"light":"dark";let l=v&&v in h?v:"brand_vi_ast_compiler_c2pa_gateway_lock",c=h[l].defaultStationIndex,b=Y;document.documentElement.setAttribute("data-theme",b);const Z=document.querySelector("#app");Z.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ENTERPRISE AI SOLUTION ARCHITECTURE · ENTERPRISE BRAND VI GUARDRAIL, PROMPT AST COMPILER & C2PA GATEWAY</span>
        <h1>Enterprise Brand VI Guardrail, Prompt AST Compiler & C2PA Gateway</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${b.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Brand Governance Gateway Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="brand_vi_ast_compiler_c2pa_gateway_lock"
      >
        Prompt AST Compiler + Brand VI LUT + CLIP/C2PA Gateway (Safety Lock = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_raw_prompt_passthrough_compliance_overrun"
      >
        Naive Raw Prompt Pass-Through (VI Drift & Legal Rejection Overrun = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Brand Governance & C2PA Readouts">
      <article class="kpi-card">
        <span class="kpi-label">GOVERNANCE FACTOR G(u) / UNIT COST g_unit</span>
        <strong id="kpi-gateway" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BRAND VI & LEGAL SAFETY RATIO (C_active / C_gateway)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">POLICY GATES 4 / 8 / 16 COMPLIANCE RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">G(u) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">BRAND DRIFT & COPYRIGHT RISK VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-GATE ENTERPRISE BRAND VI AST COMPILER & C2PA FIREWALL</span>
          <span id="solid-count-readout">58 solids · 17 policy gates</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Enterprise Brand VI Guardrail, Prompt AST Compiler and C2PA Gateway"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Enterprise Brand & Copyright Policy Gate (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Gate 16 (u = 1.000, g_unit = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-GATE PROMPT AST + C2PA GATEWAY VS RAW PROMPT LEDGER</span>
          <span>g_unit = g_0 / (1 + u)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>Gate</th>
                <th>u</th>
                <th>G(u) = 1+u</th>
                <th>g_unit</th>
                <th>Policy Quad</th>
                <th>C / C_gateway</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const Q=document.querySelector("#preset-subtitle"),L=document.querySelector("#preset-badge"),K=document.querySelector("#kpi-gateway"),X=document.querySelector("#kpi-quad"),F=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),tt=document.querySelector("#kpi-stations-4816"),B=document.querySelector("#kpi-violated"),et=document.querySelector("#kpi-verdict"),at=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),R=document.querySelector("#station-slider"),ot=document.querySelector("#station-slider-label"),U=document.querySelector("#station-tbody"),V=document.querySelector("#theme-toggle");function m(e,a,t){const o=(e-t*.55)*.88,r=-a+(e*.18+t*.42)*.55;return[o,r]}function nt(e,a){return e==="teal"?a?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?a?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?a?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?a?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:a?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function rt(e,a,t,o,r,s,i,n,d,C,N){const p=o*.5,u=r*.5,g=s*.5,w=m(e+p,a-u,t-g),P=m(e+p,a-u,t+g),E=m(e-p,a-u,t+g),$=m(e-p,a+u,t-g),y=m(e+p,a+u,t-g),A=m(e+p,a+u,t+g),_=m(e-p,a+u,t+g),k=nt(i,d),S=n?1.8:.7,G=n?"#ffffff":k.stroke,M=`${$[0].toFixed(1)},${$[1].toFixed(1)} ${y[0].toFixed(1)},${y[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,q=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${P[0].toFixed(1)},${P[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,D=`${P[0].toFixed(1)},${P[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)} ${y[0].toFixed(1)},${y[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${C}" data-solid-kind="${N}">
      <polygon points="${q}" fill="${k.left}" stroke="${G}" stroke-width="${S}" />
      <polygon points="${D}" fill="${k.right}" stroke="${G}" stroke-width="${S}" />
      <polygon points="${M}" fill="${k.top}" stroke="${G}" stroke-width="${S}" />
    </g>
  `}function I(e){const a=h[e.presetId],t=e.selectedStation,o=b==="dark";Q.textContent=a.subtitle,L.textContent=a.badge,L.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,K.textContent=`G(u) = ${t.rawPromptRejectionAmplification.toFixed(4)}× (g_unit = ${t.gatewayAmortizedUnitCost.toFixed(4)}×)`,X.textContent=`Policy Quad = ${t.quadraturePolicyAstCost.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,F.textContent=`${t.brandComplianceSafetyRatio.toFixed(4)}×`,F.className=`kpi-value ${t.isBrandComplianceViolation?"text-danger":"text-ok"}`,J.textContent=`u = ${t.governanceScaleU.toFixed(4)} | ${t.guardrailPolicyStageLabel}`,tt.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,B.textContent=`${e.violatedCount} / ${e.stationCount}`,B.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,et.textContent=e.verdict,R.value=String(t.index),ot.textContent=`Gate ${t.index} (u = ${t.governanceScaleU.toFixed(3)}, g_unit = ${t.gatewayAmortizedUnitCost.toFixed(3)}, Ratio = ${t.brandComplianceSafetyRatio.toFixed(4)}×)`;const r=H(e);at.textContent=`${r.length} solids · ${e.stationCount} policy gates`;const s=[...r].sort((i,n)=>i.z-n.z||i.y-n.y||i.x-n.x);it.innerHTML=s.map(i=>rt(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,o,i.id,i.kind)).join(""),U.innerHTML=e.stations.map(i=>{const n=i.index===t.index?"row-selected":"",d=i.isBrandComplianceViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.governanceScaleU.toFixed(4)}</td>
          <td>${i.rawPromptRejectionAmplification.toFixed(4)}×</td>
          <td>${i.gatewayAmortizedUnitCost.toFixed(4)}×</td>
          <td>${i.quadraturePolicyAstCost.toFixed(4)}×</td>
          <td class="${d}">${i.brandComplianceSafetyRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const n=i.getAttribute("data-preset");i.classList.toggle("active",n===e.presetId)}),window.__BRAND_GUARDRAIL_GATEWAY_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const a=e.getAttribute("data-preset");a&&a in h&&(l=a,c=h[l].defaultStationIndex,I(x(l,c)))})});R.addEventListener("input",()=>{c=Number(R.value),I(x(l,c))});U.addEventListener("click",e=>{const a=e.target.closest("tr[data-station-row]");a&&(c=Number(a.getAttribute("data-station-row")),I(x(l,c)))});V.addEventListener("click",()=>{b=b==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",b),V.textContent=`Theme: ${b.toUpperCase()}`,I(x(l,c))});I(x(l,c));
