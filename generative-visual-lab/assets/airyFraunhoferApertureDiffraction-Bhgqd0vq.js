import"./modulepreload-polyfill-B5Qt9EMX.js";const g={airy_fraunhofer_bessel_diffraction_lock:{id:"airy_fraunhofer_bessel_diffraction_lock",label:"Airy-Fraunhofer Diffraction Law (θ₁ = 1.2197 λ / D ∝ N, Ratio = 1.0000×)",labelZh:"Airy-Fraunhofer 夫琅禾费衍射艾里斑定律（θ₁ = 1.2197 λ / D ∝ N，半径比恒锁 1.0000×）",subtitle:"Expands Airy disk radius inversely with entrance pupil diameter D(u) = D₀/(1+u) as θ_Airy = 1.2197 λ N / f = θ₀(1+u), locking θ_exact/θ_model = 1.0000× across all 17 f-number stations.",subtitleZh:"随入瞳直径收缩 D(u) = D₀/(1+u) 令艾里斑第一暗环半径按 θ_Airy = 1.2197 λ / D = θ₀(1+u) 反比扩张，在全 17 站恒定锁死衍射半径比 θ_exact/θ_model = 1.0000×。",useAiryDiffractionScaling:!0,defaultStationIndex:16,badge:"AIRY 1.22λ/D LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"艾里衍射锁死 · 1.0000×（0/17 亏损站）",description:"Sir George Biddell Airy (1835) proved via the circular Bessel integral J₁(x₁)=0 (x₁/π ≈ 1.2197) that stopping down a lens aperture expands the diffraction Airy disk and starburst glare linearly with f-number N.",descriptionZh:"Sir George Biddell Airy（1835）通过圆孔夫琅禾费贝塞尔积分第一零点 J₁(x₁)=0（x₁/π ≈ 1.2197）证明：收缩光圈（增大 F 值 N）会使衍射艾里斑半径与星芒光晕按 1.2197 λ N 线性扩张。"},naive_geometric_pinhole_fixed_psf:{id:"naive_geometric_pinhole_fixed_psf",label:"Naive Aperture-Independent Fixed PSF (θ = θ₀, Deficit = 1 + u up to 2.0000×)",labelZh:"朴素几何针孔定常点扩散核（θ = θ₀，艾里斑半径按 1+u 亏损至 2.0000×）",subtitle:"Assumes geometric optics where stopping down never widens diffraction blur, underestimating true Airy radius by D₀/D = 1 + u to 1.2500× at St 4, 1.5000× at St 8, and 2.0000× (4× area) at St 16.",subtitleZh:"误认为收缩光圈只会让画面无限变锐而固定点光源光晕尺寸 θ = θ₀，导致艾里斑半径在第 4 站亏损 1.2500×、第 8 站 1.5000×、第 16 站（收缩两档光圈 D=0.5D₀）翻倍亏损至 2.0000×（面积亏损 4 倍）。",useAiryDiffractionScaling:!1,defaultStationIndex:16,badge:"AIRY DEFICIT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"衍射缺失 · 最高 2.0000×（16/17 站违背）",description:"Naive camera bloom and depth-of-field shaders only compute geometric circle of confusion without the 1.22 λ N Airy diffraction floor, missing the starburst and diffraction softening at f/16–f/22.",descriptionZh:"朴素物理相机景深与辉光着色器只计算几何弥散圆而漏掉 1.22 λ N 艾里衍射下限，导致小光圈（f/16–f/22）下缺失真实的星芒衍射展宽与瑞利分辨极限。"}},D=17;function B(e){const t=1+Math.max(0,e);return{fNumberRatio:t,pupilDiameterRatio:1/t,airyRadiusRatio:t,airyDiskAreaRatio:t*t}}function H(e,i=64){const o=1+Math.max(0,e),r=Math.max(2,i%2===0?i:i+1),s=1/r;let a=0+3*o;for(let n=1;n<r;n++){const d=n*s,h=n%2===1?4:2;a+=h*(3*o*d*d)}return s/3*a}function Z(e,i){const t=Math.max(0,Math.min(D-1,e)),o=t/(D-1),r=B(o),s=H(o,64),a=1+o,n=i?1:a;return{index:t,fNumberExcessU:o,fNumberRatio:r.fNumberRatio,pupilDiameterRatio:r.pupilDiameterRatio,airyRadiusRatio:r.airyRadiusRatio,airyDiskAreaRatio:r.airyDiskAreaRatio,quadratureRadiusRatio:s,airyRadiusDeficitRatio:n,naiveDeficitRatio:a,isDiffractionDeficitViolation:n>1.0001}}function k(e,i){const t=g[e],o=[];let r=0,s=0;for(let n=0;n<D;n++){const d=Z(n,t.useAiryDiffractionScaling);o.push(d),d.isDiffractionDeficitViolation&&r++;const h=Math.abs(d.airyRadiusRatio-d.quadratureRadiusRatio);h>s&&(s=h)}const a=i!==void 0?Math.max(0,Math.min(D-1,i)):t.defaultStationIndex;return{presetId:e,useAiryDiffractionScaling:t.useAiryDiffractionScaling,stationCount:D,selectedStation:o[a],stations:o,station4Ratio:o[4].airyRadiusDeficitRatio,station8Ratio:o[8].airyRadiusDeficitRatio,station12Ratio:o[12].airyRadiusDeficitRatio,station16Ratio:o[16].airyRadiusDeficitRatio,violatedCount:r,maxQuadratureError:s,verdict:r===0?"AIRY_FRAUNHOFER_DIFFRACTION_LOCKED":"NAIVE_FIXED_PSF_DIFFRACTION_DEFICIT"}}function G(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Airy-Fraunhofer Optical Bench Plinth"}),i.push({id:"fraunhofer-rail-front",kind:"fraunhofer_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Airy First-Zero Diffraction Rail (θ_exact / θ_model = 1.0000×)"}),i.push({id:"fraunhofer-rail-back",kind:"fraunhofer_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Entrance Pupil Contraction Rail (D/D₀ = 1/(1+u), N/N₀ = 1+u)"});for(const t of e.stations){const o=(t.index-8)*30,r=44*t.pupilDiameterRatio,s=26*t.airyRadiusRatio,a=36*t.airyRadiusDeficitRatio;i.push({id:`pupil-iris-blade-${t.index}`,kind:"pupil_iris_blade",stationIndex:t.index,x:o,y:r*.5-8,z:-56,w:14,h:r,d:14,tone:"amber",label:`Station ${t.index} Pupil D/D₀ = ${t.pupilDiameterRatio.toFixed(4)}× (N/N₀ = ${t.fNumberRatio.toFixed(4)}×)`}),i.push({id:`airy-bessel-lobe-${t.index}`,kind:"airy_bessel_lobe",stationIndex:t.index,x:o,y:s*.5-8,z:0,w:14,h:s,d:14,tone:e.useAiryDiffractionScaling?"teal":"slate",label:`Station ${t.index} Airy Radius θ/θ₀ = ${t.airyRadiusRatio.toFixed(4)}×`}),i.push({id:`diffraction-radius-gauge-${t.index}`,kind:"diffraction_radius_gauge",stationIndex:t.index,x:o,y:a*.5-8,z:56,w:Math.min(24,12*t.airyRadiusDeficitRatio),h:a,d:12,tone:t.isDiffractionDeficitViolation?"crimson":"teal",label:`Station ${t.index} Ratio θ_exact/θ = ${t.airyRadiusDeficitRatio.toFixed(4)}×`})}return i.push({id:"aperture-collar-left",kind:"aperture_stop_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Wide Aperture Gate (D = 1.000 D₀, N = 1.000 N₀)"}),i.push({id:"aperture-collar-right",kind:"aperture_stop_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useAiryDiffractionScaling?"teal":"crimson",label:"Stopped-Down f/2N₀ Gate (D = 0.500 D₀, θ_Airy = 2.000 θ₀)"}),i.push({id:"rayleigh-bar-top",kind:"rayleigh_criterion_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Bessel J₁(3.8317) = 0 Rayleigh Resolution Envelope θ₁ = 1.2197 λ/D"}),i.push({id:"rayleigh-bar-front",kind:"rayleigh_criterion_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useAiryDiffractionScaling?"teal":"crimson",label:"Airy-Fraunhofer Radius Lock Line (θ_exact / θ_model = 1.0000×)"}),i}const P=new URLSearchParams(window.location.search),S=P.get("preset"),z=P.get("theme")==="light"?"light":"dark";let l=S&&S in g?S:"airy_fraunhofer_bessel_diffraction_lock",c=g[l].defaultStationIndex,x=z;document.documentElement.setAttribute("data-theme",x);const J=document.querySelector("#app");J.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 196 · 206TH DEMO · FRAUNHOFER APERTURE DIFFRACTION &amp; AIRY DISK METROLOGY</span>
        <h1>Airy-Fraunhofer Circular Aperture Diffraction Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${x.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Aperture Diffraction Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="airy_fraunhofer_bessel_diffraction_lock"
      >
        Airy-Fraunhofer θ = 1.2197λ/D Law (θ_exact/θ = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_geometric_pinhole_fixed_psf"
      >
        Naive Fixed-PSF Pinhole (Deficit = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED F-NUMBER N/N₀ / PUPIL D/D₀</span>
        <strong id="kpi-fnumber" class="kpi-value">--</strong>
        <span id="kpi-area" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">AIRY RADIUS RATIO (θ_exact / θ_model)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-bessel" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 RADIUS RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">N/N₀ = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">DIFFRACTION DEFICIT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC AIRY-FRAUNHOFER DIFFRACTION RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Airy-Fraunhofer circular aperture diffraction rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Aperture Stop-Down Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, N = 2.000 N₀)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION AIRY 1.2197λ/D VS FIXED-PSF LEDGER</span>
          <span>J₁(3.8317) = 0</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>N / N₀</th>
                <th>D / D₀</th>
                <th>A_Airy/A₀</th>
                <th>θ_ex / θ</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const K=document.querySelector("#preset-subtitle"),T=document.querySelector("#preset-badge"),Q=document.querySelector("#kpi-fnumber"),j=document.querySelector("#kpi-area"),O=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-bessel"),W=document.querySelector("#kpi-stations-4816"),w=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),N=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),L=document.querySelector("#theme-toggle");function b(e,i,t){const o=(e-t*.55)*.88,r=-i+(e*.18+t*.42)*.55;return[o,r]}function ot(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function nt(e,i,t,o,r,s,a,n,d,h,M){const u=o*.5,p=r*.5,f=s*.5,v=b(e+u,i-p,t-f),F=b(e+u,i-p,t+f),E=b(e-u,i-p,t+f),C=b(e-u,i+p,t-f),A=b(e+u,i+p,t-f),R=b(e+u,i+p,t+f),_=b(e-u,i+p,t+f),m=ot(a,d),$=n?1.8:.7,I=n?"#ffffff":m.stroke,U=`${C[0].toFixed(1)},${C[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,Y=`${E[0].toFixed(1)},${E[1].toFixed(1)} ${F[0].toFixed(1)},${F[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)}`,V=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${A[0].toFixed(1)},${A[1].toFixed(1)} ${R[0].toFixed(1)},${R[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${h}" data-solid-kind="${M}">
      <polygon points="${Y}" fill="${m.left}" stroke="${I}" stroke-width="${$}" />
      <polygon points="${V}" fill="${m.right}" stroke="${I}" stroke-width="${$}" />
      <polygon points="${U}" fill="${m.top}" stroke="${I}" stroke-width="${$}" />
    </g>
  `}function y(e){const i=g[e.presetId],t=e.selectedStation,o=x==="dark";K.textContent=i.subtitle,T.textContent=i.badge,T.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,Q.textContent=`N/N₀ = ${t.fNumberRatio.toFixed(4)}× (D/D₀ = ${t.pupilDiameterRatio.toFixed(4)}×)`,j.textContent=`A_Airy/A₀ = ${t.airyDiskAreaRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,O.textContent=`${t.airyRadiusDeficitRatio.toFixed(4)}×`,O.className=`kpi-value ${t.isDiffractionDeficitViolation?"text-danger":"text-ok"}`,X.textContent=`u = N/N₀ − 1 = ${t.fNumberExcessU.toFixed(4)} | x₁/π = 1.2197`,W.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,w.textContent=`${e.violatedCount} / ${e.stationCount}`,w.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,N.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.fNumberExcessU.toFixed(3)}, N/N₀ = ${t.fNumberRatio.toFixed(3)}×, θ_exact/θ = ${t.airyRadiusDeficitRatio.toFixed(4)}×)`;const r=G(e);et.textContent=`${r.length} solids · ${e.stationCount} stations`;const s=[...r].sort((a,n)=>a.z-n.z||a.y-n.y||a.x-n.x);it.innerHTML=s.map(a=>nt(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,o,a.id,a.kind)).join(""),q.innerHTML=e.stations.map(a=>{const n=a.index===t.index?"row-selected":"",d=a.isDiffractionDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${n}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.fNumberExcessU.toFixed(4)}</td>
          <td>${a.fNumberRatio.toFixed(4)}×</td>
          <td>${a.pupilDiameterRatio.toFixed(4)}×</td>
          <td>${a.airyDiskAreaRatio.toFixed(4)}×</td>
          <td class="${d}">${a.airyRadiusDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const n=a.getAttribute("data-preset");a.classList.toggle("active",n===e.presetId)}),window.__AIRY_DIFFRACTION_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in g&&(l=i,c=g[l].defaultStationIndex,y(k(l,c)))})});N.addEventListener("input",()=>{c=Number(N.value),y(k(l,c))});q.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),y(k(l,c)))});L.addEventListener("click",()=>{x=x==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",x),L.textContent=`Theme: ${x.toUpperCase()}`,y(k(l,c))});y(k(l,c));
