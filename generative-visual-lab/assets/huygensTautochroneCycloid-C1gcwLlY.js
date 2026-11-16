import"./modulepreload-polyfill-B5Qt9EMX.js";const b={huygens_cycloid_evolute_tautochrone_lock:{id:"huygens_cycloid_evolute_tautochrone_lock",label:"Huygens Cycloid Evolute Law (L_free = 4R cos(ψ/2) = L₀/(1+u), L/L_H = 1.0000×)",labelZh:"Huygens 惠更斯摆线渐屈线等时摆定律（L_free = 4R cos(ψ/2)，曲率半径比恒锁 1.0000×）",subtitle:"Wraps the suspension cord onto cycloidal cheek jaws so the unwrapped radius of curvature shortens as L_free = L₀ cos(ψ/2) = L₀/(1+u), locking L_active/L_Huygens = 1.0000× across all 17 stations.",subtitleZh:"通过惠更斯（1673，《摆钟论》）摆线渐屈线颊板（Cycloidal Cheeks）令悬线随摆角自动贴合收短为 L_free = 4R cos(ψ/2) = L₀/(1+u)，严格保持 d²s/dt² = −(g/4R)s 振幅无关等时性并在全 17 站恒定锁死曲率半径比 1.0000×。",useHuygensCycloidLaw:!0,defaultStationIndex:16,badge:"HUYGENS TAUTOCHRONE LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"惠更斯等时摆锁死 · 1.0000×（0/17 失谐站）",description:"Christiaan Huygens (1659/1673, Horologium Oscillatorium) proved that the evolute of a cycloid is an identical cycloid, shortening the free cord to L_free = 4R cos(ψ/2) so T = 2π√(4R/g) is strictly amplitude-independent.",descriptionZh:"Christiaan Huygens（1659/1673，《摆钟论》）证明摆线的渐屈线仍是全等摆线，悬线绕在摆线颊板上使自由曲率半径按 4R cos(ψ/2) 缩短，从而令周期 T = 2π√(4R/g) 对任意振幅严格恒定。"},naive_circular_pendulum_anharmonic_drift:{id:"naive_circular_pendulum_anharmonic_drift",label:"Naive Fixed-Pin Circular Pendulum (L = L₀, Overshoot = sec(ψ/2) = 1 + u up to 2.0000×)",labelZh:"朴素固定钉圆弧单摆（L = L₀，未贴合曲率半径按 sec(ψ/2) = 1+u 超冲至 2.0000×）",subtitle:"Swings from a fixed point pivot without cycloidal evolute cheeks so radius stays L₀ = 4R, overshooting the tautochrone radius of curvature by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"使用单一固定挂钉而无摆线渐屈线颊板收短悬线，使大摆角曲率半径维持 L₀ 不变，在第 4 站超冲 1.2500×、第 8 站超冲 1.5000×、第 16 站（ψ/2=60°）翻倍超冲至 2.0000× 并引发大振幅周期变慢失谐。",useHuygensCycloidLaw:!1,defaultStationIndex:16,badge:"RADIUS OVERSHOOT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"圆弧失谐 · 最高 2.0000×（16/17 站违背）",description:"Naive circular pendulums keep constant radius L₀, losing the cos(ψ/2) evolute shortening and causing multi-pendulum wave sculptures and clocks to dephase at large amplitudes.",descriptionZh:"朴素圆弧单摆在大摆角下保持恒定摆长 L₀，丢失 cos(ψ/2) 渐屈线加速效应，导致大摆角钟摆与波浪摆（Pendulum Wave）雕塑随振幅大小不同而迅速失步乱相。"}},f=17;function Y(e){const t=1+Math.max(0,e),s=1/t;return{secantHalfAngleRatio:t,huygensFreeRadiusRatio:s}}function G(e,o=64){const s=1/(1+Math.max(0,e)),n=Math.max(2,o%2===0?o:o+1),d=1/n;let i=2*s;for(let a=1;a<n;a++){const l=a*d,x=a%2===1?4:2;i+=x*(2*s*l)}return d/3*i}function Z(e,o){const t=Math.max(0,Math.min(f-1,e)),s=t/(f-1),n=Y(s),d=G(s,64),i=1+s,a=o?1:i;return{index:t,secantHalfAngleExcessU:s,secantHalfAngleRatio:n.secantHalfAngleRatio,huygensFreeRadiusRatio:n.huygensFreeRadiusRatio,quadratureFreeRadiusRatio:d,curvatureRadiusOvershootRatio:a,naiveOvershootRatio:i,isRadiusOvershootViolation:a>1.0001}}function k(e,o){const t=b[e],s=[];let n=0,d=0;for(let a=0;a<f;a++){const l=Z(a,t.useHuygensCycloidLaw);s.push(l),l.isRadiusOvershootViolation&&n++;const x=Math.abs(l.huygensFreeRadiusRatio-l.quadratureFreeRadiusRatio);x>d&&(d=x)}const i=o!==void 0?Math.max(0,Math.min(f-1,o)):t.defaultStationIndex;return{presetId:e,useHuygensCycloidLaw:t.useHuygensCycloidLaw,stationCount:f,selectedStation:s[i],stations:s,station4Ratio:s[4].curvatureRadiusOvershootRatio,station8Ratio:s[8].curvatureRadiusOvershootRatio,station12Ratio:s[12].curvatureRadiusOvershootRatio,station16Ratio:s[16].curvatureRadiusOvershootRatio,violatedCount:n,maxQuadratureError:d,verdict:n===0?"HUYGENS_TAUTOCHRONE_CYCLOID_LOCKED":"NAIVE_CIRCULAR_PENDULUM_RADIUS_OVERSHOOT"}}function Q(e){const o=[];o.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Huygens Horologium Oscillatorium Cycloid Plinth"}),o.push({id:"horologium-rail-front",kind:"horologium_reference_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Huygens Cycloid Evolute Lock Rail (L_active / L_Huygens = 1.0000×)"}),o.push({id:"horologium-rail-back",kind:"horologium_reference_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Secant Half-Angle Rail (sec(ψ/2) = 1 + u)"});for(const t of e.stations){const s=(t.index-8)*30,n=22*t.secantHalfAngleRatio,d=44*t.huygensFreeRadiusRatio,i=36*t.curvatureRadiusOvershootRatio;o.push({id:`secant-angle-column-${t.index}`,kind:"secant_angle_column",stationIndex:t.index,x:s,y:n*.5-8,z:-56,w:14,h:n,d:14,tone:"amber",label:`Station ${t.index} Secant sec(ψ/2) = ${t.secantHalfAngleRatio.toFixed(4)}×`}),o.push({id:`huygens-evolute-cheek-${t.index}`,kind:"huygens_evolute_cheek",stationIndex:t.index,x:s,y:d*.5-8,z:0,w:14,h:d,d:14,tone:e.useHuygensCycloidLaw?"teal":"slate",label:`Station ${t.index} Unwrapped Cord L_free/L₀ = ${t.huygensFreeRadiusRatio.toFixed(4)}×`}),o.push({id:`radius-overshoot-gauge-${t.index}`,kind:"radius_overshoot_gauge",stationIndex:t.index,x:s,y:i*.5-8,z:56,w:Math.min(24,12*t.curvatureRadiusOvershootRatio),h:i,d:12,tone:t.isRadiusOvershootViolation?"crimson":"teal",label:`Station ${t.index} Radius Ratio L/L_Huygens = ${t.curvatureRadiusOvershootRatio.toFixed(4)}×`})}return o.push({id:"pivot-collar-left",kind:"escapement_pivot_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Bottom Vertex Gate (ψ/2 = 0°, L_free = 1.000 L₀)"}),o.push({id:"pivot-collar-right",kind:"escapement_pivot_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useHuygensCycloidLaw?"teal":"crimson",label:"High-Amplitude Cheek Gate (ψ/2 = 60°, L_free = 0.500 L₀)"}),o.push({id:"isochronous-bar-top",kind:"isochronous_arc_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Huygens Tautochrone ODE: d²s/dt² + (g/4R) s = 0,  s = 4R sin(ψ/2)"}),o.push({id:"isochronous-bar-front",kind:"isochronous_arc_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useHuygensCycloidLaw?"teal":"crimson",label:"Evolute Curvature Lock Line (L_active / L_Huygens = 1.0000×)"}),o}const N=new URLSearchParams(window.location.search),H=N.get("preset"),z=N.get("theme")==="light"?"light":"dark";let r=H&&H in b?H:"huygens_cycloid_evolute_tautochrone_lock",c=b[r].defaultStationIndex,R=z;document.documentElement.setAttribute("data-theme",R);const j=document.querySelector("#app");j.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 217 · 227TH DEMO · ISOCHRONOUS PENDULUM HUYGENS CYCLOID EVOLUTE-INVOLUTE METROLOGY</span>
        <h1>Huygens-Tautochrone Cycloid Evolute Pendulum Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${R.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Tautochrone Pendulum Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="huygens_cycloid_evolute_tautochrone_lock"
      >
        Huygens L_free = 4R cos(ψ/2) Cycloid Cheek Law (L / L_H = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_circular_pendulum_anharmonic_drift"
      >
        Naive Fixed-Pin Circular Pendulum (Overshoot = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED SECANT sec(ψ/2) / FREE CORD L_free/L₀</span>
        <strong id="kpi-cord" class="kpi-value">--</strong>
        <span id="kpi-quad" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">CURVATURE RADIUS RATIO (L_active / L_Huygens)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 RADIUS RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">sec(ψ/2) = 1.250 / 1.500 / 2.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">EVOLUTE OVERSHOOT VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC HUYGENS-TAUTOCHRONE CYCLOID RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Huygens-Tautochrone cycloid evolute pendulum rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Swing Half-Angle Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, cos(ψ/2) = 0.500)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION HUYGENS L_free = 4R cos(ψ/2) VS CIRCULAR LEDGER</span>
          <span>s = 4R sin(ψ/2)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u</th>
                <th>sec(ψ/2)</th>
                <th>L_Huygens / L₀</th>
                <th>Evolute Quad</th>
                <th>L / L_Huygens</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const B=document.querySelector("#preset-subtitle"),I=document.querySelector("#preset-badge"),W=document.querySelector("#kpi-cord"),K=document.querySelector("#kpi-quad"),A=document.querySelector("#kpi-ratio"),X=document.querySelector("#kpi-excess"),J=document.querySelector("#kpi-stations-4816"),U=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),ot=document.querySelector("#rig-svg"),O=document.querySelector("#station-slider"),it=document.querySelector("#station-slider-label"),q=document.querySelector("#station-tbody"),w=document.querySelector("#theme-toggle");function g(e,o,t){const s=(e-t*.55)*.88,n=-o+(e*.18+t*.42)*.55;return[s,n]}function st(e,o){return e==="teal"?o?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?o?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?o?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?o?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:o?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function at(e,o,t,s,n,d,i,a,l,x,P){const u=s*.5,p=n*.5,h=d*.5,m=g(e+u,o-p,t-h),L=g(e+u,o-p,t+h),F=g(e-u,o-p,t+h),T=g(e-u,o+p,t-h),_=g(e+u,o+p,t-h),v=g(e+u,o+p,t+h),E=g(e-u,o+p,t+h),$=st(i,l),S=a?1.8:.7,C=a?"#ffffff":$.stroke,M=`${T[0].toFixed(1)},${T[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,V=`${F[0].toFixed(1)},${F[1].toFixed(1)} ${L[0].toFixed(1)},${L[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,D=`${L[0].toFixed(1)},${L[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${_[0].toFixed(1)},${_[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${x}" data-solid-kind="${P}">
      <polygon points="${V}" fill="${$.left}" stroke="${C}" stroke-width="${S}" />
      <polygon points="${D}" fill="${$.right}" stroke="${C}" stroke-width="${S}" />
      <polygon points="${M}" fill="${$.top}" stroke="${C}" stroke-width="${S}" />
    </g>
  `}function y(e){const o=b[e.presetId],t=e.selectedStation,s=R==="dark";B.textContent=o.subtitle,I.textContent=o.badge,I.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,W.textContent=`sec(ψ/2) = ${t.secantHalfAngleRatio.toFixed(4)}× (L_free/L₀ = ${t.huygensFreeRadiusRatio.toFixed(4)}×)`,K.textContent=`Evolute Quad = ${t.quadratureFreeRadiusRatio.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,A.textContent=`${t.curvatureRadiusOvershootRatio.toFixed(4)}×`,A.className=`kpi-value ${t.isRadiusOvershootViolation?"text-danger":"text-ok"}`,X.textContent=`u = sec(ψ/2) − 1 = ${t.secantHalfAngleExcessU.toFixed(4)} | L_free = 4R cos(ψ/2)`,J.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,U.textContent=`${e.violatedCount} / ${e.stationCount}`,U.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,O.value=String(t.index),it.textContent=`Station ${t.index} (u = ${t.secantHalfAngleExcessU.toFixed(3)}, cos(ψ/2) = ${t.huygensFreeRadiusRatio.toFixed(3)}, L/L_Huygens = ${t.curvatureRadiusOvershootRatio.toFixed(4)}×)`;const n=Q(e);et.textContent=`${n.length} solids · ${e.stationCount} stations`;const d=[...n].sort((i,a)=>i.z-a.z||i.y-a.y||i.x-a.x);ot.innerHTML=d.map(i=>at(i.x,i.y,i.z,i.w,i.h,i.d,i.tone,i.stationIndex===t.index,s,i.id,i.kind)).join(""),q.innerHTML=e.stations.map(i=>{const a=i.index===t.index?"row-selected":"",l=i.isRadiusOvershootViolation?"cell-fail":"cell-pass";return`
        <tr class="${a}" data-station-row="${i.index}">
          <td>#${i.index}</td>
          <td>${i.secantHalfAngleExcessU.toFixed(4)}</td>
          <td>${i.secantHalfAngleRatio.toFixed(4)}×</td>
          <td>${i.huygensFreeRadiusRatio.toFixed(4)}×</td>
          <td>${i.quadratureFreeRadiusRatio.toFixed(4)}×</td>
          <td class="${l}">${i.curvatureRadiusOvershootRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(i=>{const a=i.getAttribute("data-preset");i.classList.toggle("active",a===e.presetId)}),window.__HUYGENS_TAUTOCHRONE_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const o=e.getAttribute("data-preset");o&&o in b&&(r=o,c=b[r].defaultStationIndex,y(k(r,c)))})});O.addEventListener("input",()=>{c=Number(O.value),y(k(r,c))});q.addEventListener("click",e=>{const o=e.target.closest("tr[data-station-row]");o&&(c=Number(o.getAttribute("data-station-row")),y(k(r,c)))});w.addEventListener("click",()=>{R=R==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",R),w.textContent=`Theme: ${R.toUpperCase()}`,y(k(r,c))});y(k(r,c));
