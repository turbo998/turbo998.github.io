import"./modulepreload-polyfill-B5Qt9EMX.js";const _={huygens_steiner_parallel_axis_lock:{id:"huygens_steiner_parallel_axis_lock",label:"Huygens-Steiner Parallel-Axis Law (I = I_cm + m d², Ratio = 1.0000×)",labelZh:"Huygens-Steiner 惠更斯-施泰纳平行轴惯量定律（I = I_cm + m d²，惯量比恒锁 1.0000×）",subtitle:"Adds orbital transfer inertia m d² = I_cm(d/k_g)² when shifting the hinge pivot by d, locking I_exact/I_model = 1.0000× across all 17 pivot-offset stations.",subtitleZh:"当旋转支点偏离质心距离 d 时自动计入平行轴迁移惯量 m d² = I_cm(d/k_g)²，在全 17 站恒定锁死转动惯量比与角加速度比 1.0000×。",useHuygensSteinerLaw:!0,defaultStationIndex:16,badge:"HUYGENS-STEINER LOCKED · 1.0000× (0/17 VIOLATIONS)",badgeZh:"平行轴惯量锁死 · 1.0000×（0/17 超冲站）",description:"Christiaan Huygens (1673) and Jakob Steiner (1834) proved that shifting a rotation axis by distance d from the center of mass increases moment of inertia to I_pivot = I_cm + m d².",descriptionZh:"Christiaan Huygens（1673）与 Jakob Steiner（1834）严格证明：旋转轴偏离质心距离 d 时，绕新轴的转动惯量必须加上质心平动项 I_pivot = I_cm + m d²。"},naive_com_only_unshifted_inertia:{id:"naive_com_only_unshifted_inertia",label:"Naive Unshifted CoM Inertia (I = I_cm, Overshoot = 1 + u up to 2.0000×)",labelZh:"朴素未迁移质心惯量（I = I_cm，角加速度按 1+u 虚快超冲至 2.0000×）",subtitle:"Reuses centroidal inertia I_cm when pivoting around an off-center hinge u = (d/k_g)², overshooting angular acceleration α = τ/I by 1.2500× at St 4, 1.5000× at St 8, and 2.0000× at St 16.",subtitleZh:"在偏心铰链旋转时直接复用质心转动惯量 I_cm 而漏掉 m d²，使角加速度 α = τ/I 在第 4 站虚快至 1.2500×、第 8 站 1.5000×、第 16 站（d = k_g）翻倍超冲至 2.0000×。",useHuygensSteinerLaw:!1,defaultStationIndex:16,badge:"INERTIA DEFICIT · UP TO 2.0000× (16/17 VIOLATED)",badgeZh:"惯量缺失 · 最高 2.0000×（16/17 站违背）",description:"Naive ragdoll limb, warhammer swing, and hinged-door rigs evaluate τ / I_cm without adding m d² for the grip/hinge offset, making heavy off-center weapons swing twice as fast as physics allows.",descriptionZh:"朴素布娃娃肢体、战锤挥砍与门扇合页动画在切换握持支点时仍用 τ / I_cm 求解角加速度，导致沉重的偏心巨锤挥起来像塑料玩具一样轻飘虚快 2 倍。"}},b=17;function V(e){const i=Math.max(0,e),t=1+i;return{pivotToGyrationRatio:Math.sqrt(i),steinerInertiaRatio:t,angularAccelerationFactor:1/t}}function Y(e,i=64){const n=1+Math.max(0,e),s=Math.max(2,i%2===0?i:i+1),r=1/s;let a=0+3*n;for(let o=1;o<s;o++){const d=o*r,h=o%2===1?4:2;a+=h*(3*n*d*d)}return r/3*a}function Z(e,i){const t=Math.max(0,Math.min(b-1,e)),n=t/(b-1),s=V(n),r=Y(n,64),a=1+n,o=i?1:a;return{index:t,pivotOffsetSqU:n,pivotToGyrationRatio:s.pivotToGyrationRatio,steinerInertiaRatio:s.steinerInertiaRatio,angularAccelerationFactor:s.angularAccelerationFactor,quadratureInertiaRatio:r,inertiaDeficitRatio:o,naiveDeficitRatio:a,isInertiaDeficitViolation:o>1.0001}}function k(e,i){const t=_[e],n=[];let s=0,r=0;for(let o=0;o<b;o++){const d=Z(o,t.useHuygensSteinerLaw);n.push(d),d.isInertiaDeficitViolation&&s++;const h=Math.abs(d.steinerInertiaRatio-d.quadratureInertiaRatio);h>r&&(r=h)}const a=i!==void 0?Math.max(0,Math.min(b-1,i)):t.defaultStationIndex;return{presetId:e,useHuygensSteinerLaw:t.useHuygensSteinerLaw,stationCount:b,selectedStation:n[a],stations:n,station4Ratio:n[4].inertiaDeficitRatio,station8Ratio:n[8].inertiaDeficitRatio,station12Ratio:n[12].inertiaDeficitRatio,station16Ratio:n[16].inertiaDeficitRatio,violatedCount:s,maxQuadratureError:r,verdict:s===0?"HUYGENS_STEINER_INERTIA_LOCKED":"NAIVE_COM_INERTIA_DEFICIT_OVERSHOOT"}}function z(e){const i=[];i.push({id:"base-frame-plinth",kind:"base_frame",stationIndex:-1,x:0,y:-26,z:0,w:560,h:16,d:220,tone:"slate",label:"Huygens-Steiner Compound Pendulum Plinth"}),i.push({id:"parallel-rail-front",kind:"parallel_axis_rail",stationIndex:-1,x:0,y:-10,z:84,w:540,h:6,d:8,tone:"teal",label:"Huygens-Steiner Inertia Lock Rail (I_exact / I_model = 1.0000×)"}),i.push({id:"parallel-rail-back",kind:"parallel_axis_rail",stationIndex:-1,x:0,y:-10,z:-84,w:540,h:6,d:8,tone:"amber",label:"Squared Pivot Offset Rail (u = (d/k_g)² ∈ [0, 1])"});for(const t of e.stations){const n=(t.index-8)*30,s=20+28*t.pivotOffsetSqU,r=26*t.steinerInertiaRatio,a=36*t.inertiaDeficitRatio;i.push({id:`pivot-offset-arm-${t.index}`,kind:"pivot_offset_arm",stationIndex:t.index,x:n,y:s*.5-8,z:-56,w:14,h:s,d:14,tone:"amber",label:`Station ${t.index} Pivot Offset (d/k_g)² = ${t.pivotOffsetSqU.toFixed(4)}`}),i.push({id:`steiner-inertia-flywheel-${t.index}`,kind:"steiner_inertia_flywheel",stationIndex:t.index,x:n,y:r*.5-8,z:0,w:14,h:r,d:14,tone:e.useHuygensSteinerLaw?"teal":"slate",label:`Station ${t.index} Total Inertia I_pivot/I_cm = ${t.steinerInertiaRatio.toFixed(4)}×`}),i.push({id:`acceleration-overshoot-gauge-${t.index}`,kind:"acceleration_overshoot_gauge",stationIndex:t.index,x:n,y:a*.5-8,z:56,w:Math.min(24,12*t.inertiaDeficitRatio),h:a,d:12,tone:t.isInertiaDeficitViolation?"crimson":"teal",label:`Station ${t.index} Ratio I_exact/I = ${t.inertiaDeficitRatio.toFixed(4)}×`})}return i.push({id:"trunnion-collar-left",kind:"pendulum_trunnion_collar",stationIndex:-1,x:-258,y:18,z:0,w:12,h:52,d:180,tone:"violet",label:"Centroidal Pivot Gate (d = 0, I_pivot = 1.000 I_cm)"}),i.push({id:"trunnion-collar-right",kind:"pendulum_trunnion_collar",stationIndex:-1,x:258,y:28,z:0,w:12,h:72,d:180,tone:e.useHuygensSteinerLaw?"teal":"crimson",label:"Gyration-Radius Offset Gate (d = k_g, I_pivot = 2.000 I_cm)"}),i.push({id:"gyration-bar-top",kind:"gyration_guide_bar",stationIndex:-1,x:0,y:66,z:-56,w:520,h:4,d:6,tone:"amber",label:"Parallel-Axis Theorem Envelope I_pivot = I_cm + m d²"}),i.push({id:"gyration-bar-front",kind:"gyration_guide_bar",stationIndex:-1,x:0,y:28,z:56,w:520,h:4,d:6,tone:e.useHuygensSteinerLaw?"teal":"crimson",label:"Huygens-Steiner Inertia Lock Line (I_exact / I_model = 1.0000×)"}),i}const q=new URLSearchParams(window.location.search),F=q.get("preset"),Q=q.get("theme")==="light"?"light":"dark";let l=F&&F in _?F:"huygens_steiner_parallel_axis_lock",c=_[l].defaultStationIndex,f=Q;document.documentElement.setAttribute("data-theme",f);const j=document.querySelector("#app");j.innerHTML=`
  <main class="rig-shell">
    <header class="rig-header">
      <div class="rig-title-block">
        <span class="rig-eyebrow">ROUND 204 · 214TH DEMO · PARALLEL-AXIS MOMENT OF INERTIA &amp; COMPOUND PENDULUM METROLOGY</span>
        <h1>Huygens-Steiner Parallel-Axis Moment of Inertia Rig</h1>
        <p id="preset-subtitle" class="rig-subtitle"></p>
      </div>
      <div class="rig-header-Readouts">
        <span id="preset-badge" class="status-badge"></span>
        <button id="theme-toggle" class="btn-secondary" type="button">Theme: ${f.toUpperCase()}</button>
      </div>
    </header>

    <section class="preset-bar" role="toolbar" aria-label="Parallel-Axis Inertia Presets">
      <button
        type="button"
        class="preset-btn"
        data-preset="huygens_steiner_parallel_axis_lock"
      >
        Huygens-Steiner I = I_cm + m·d² Law (I_ex/I = 1.0000×)
      </button>
      <button
        type="button"
        class="preset-btn"
        data-preset="naive_com_only_unshifted_inertia"
      >
        Naive Unshifted CoM Inertia (Overshoot = 1+u up to 2.0000×)
      </button>
    </section>

    <section class="kpi-strip" aria-label="Key Metrology Readouts">
      <article class="kpi-card">
        <span class="kpi-label">SELECTED OFFSET (d/k_g)² / INERTIA I/I_cm</span>
        <strong id="kpi-offset" class="kpi-value">--</strong>
        <span id="kpi-accel" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">INERTIA DEFICIT RATIO (I_exact / I_model)</span>
        <strong id="kpi-ratio" class="kpi-value">--</strong>
        <span id="kpi-excess" class="kpi-sub">--</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">STATIONS 4 / 8 / 16 INERTIA RATIO</span>
        <strong id="kpi-stations-4816" class="kpi-value">--</strong>
        <span class="kpi-sub">(d/k_g)² = 0.250 / 0.500 / 1.000</span>
      </article>
      <article class="kpi-card">
        <span class="kpi-label">PARALLEL-AXIS VIOLATIONS</span>
        <strong id="kpi-violated" class="kpi-value">--</strong>
        <span id="kpi-verdict" class="kpi-sub">--</span>
      </article>
    </section>

    <section class="workbench-grid">
      <div class="canvas-panel">
        <div class="panel-bar">
          <span>58-SOLID 17-STATION ISOMETRIC HUYGENS-STEINER INERTIA RIG</span>
          <span id="solid-count-readout">58 solids · 17 stations</span>
        </div>
        <svg
          id="rig-svg"
          viewBox="-340 -175 680 330"
          role="img"
          aria-label="58-solid isometric Huygens-Steiner parallel-axis moment of inertia rig"
        ></svg>
        <div class="station-slider-row">
          <label for="station-slider">Inspect Pivot Offset Station (0..16):</label>
          <input
            id="station-slider"
            type="range"
            min="0"
            max="16"
            step="1"
            value="16"
          />
          <span id="station-slider-label">Station 16 (u = 1.000, d = 1.000 k_g)</span>
        </div>
      </div>

      <aside class="ledger-panel">
        <div class="panel-bar">
          <span>17-STATION HUYGENS-STEINER I_cm+md² VS UNSHIFTED LEDGER</span>
          <span>I_pivot = I_cm(1 + d²/k_g²)</span>
        </div>
        <div class="table-scroll">
          <table class="station-table">
            <thead>
              <tr>
                <th>St</th>
                <th>u=(d/k_g)²</th>
                <th>d / k_g</th>
                <th>I_piv/I_cm</th>
                <th>α_S / α_cm</th>
                <th>I_ex / I</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </section>
  </main>
`;const B=document.querySelector("#preset-subtitle"),O=document.querySelector("#preset-badge"),K=document.querySelector("#kpi-offset"),X=document.querySelector("#kpi-accel"),C=document.querySelector("#kpi-ratio"),J=document.querySelector("#kpi-excess"),W=document.querySelector("#kpi-stations-4816"),L=document.querySelector("#kpi-violated"),tt=document.querySelector("#kpi-verdict"),et=document.querySelector("#solid-count-readout"),it=document.querySelector("#rig-svg"),T=document.querySelector("#station-slider"),at=document.querySelector("#station-slider-label"),D=document.querySelector("#station-tbody"),H=document.querySelector("#theme-toggle");function I(e,i,t){const n=(e-t*.55)*.88,s=-i+(e*.18+t*.42)*.55;return[n,s]}function nt(e,i){return e==="teal"?i?{top:"#5eead4",left:"#14b8a6",right:"#0f766e",stroke:"#99f6e4"}:{top:"#2dd4bf",left:"#0d9488",right:"#115e59",stroke:"#0f766e"}:e==="amber"?i?{top:"#fcd34d",left:"#f59e0b",right:"#b45309",stroke:"#fde68a"}:{top:"#fbbf24",left:"#d97706",right:"#92400e",stroke:"#b45309"}:e==="crimson"?i?{top:"#fda4af",left:"#f43f5e",right:"#9f1239",stroke:"#fecdd3"}:{top:"#fb7185",left:"#e11d48",right:"#881337",stroke:"#be123c"}:e==="violet"?i?{top:"#c4b5fd",left:"#8b5cf6",right:"#5b21b6",stroke:"#ddd6fe"}:{top:"#a78bfa",left:"#7c3aed",right:"#4c1d95",stroke:"#6d28d9"}:i?{top:"#64748b",left:"#475569",right:"#1e293b",stroke:"#94a3b8"}:{top:"#cbd5e1",left:"#94a3b8",right:"#64748b",stroke:"#475569"}}function ot(e,i,t,n,s,r,a,o,d,h,M){const u=n*.5,p=s*.5,g=r*.5,w=I(e+u,i-p,t-g),m=I(e+u,i-p,t+g),A=I(e-u,i-p,t+g),N=I(e-u,i+p,t-g),v=I(e+u,i+p,t-g),x=I(e+u,i+p,t+g),E=I(e-u,i+p,t+g),R=nt(a,d),$=o?1.8:.7,y=o?"#ffffff":R.stroke,U=`${N[0].toFixed(1)},${N[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,P=`${A[0].toFixed(1)},${A[1].toFixed(1)} ${m[0].toFixed(1)},${m[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)} ${E[0].toFixed(1)},${E[1].toFixed(1)}`,G=`${m[0].toFixed(1)},${m[1].toFixed(1)} ${w[0].toFixed(1)},${w[1].toFixed(1)} ${v[0].toFixed(1)},${v[1].toFixed(1)} ${x[0].toFixed(1)},${x[1].toFixed(1)}`;return`
    <g class="iso-solid" data-solid-id="${h}" data-solid-kind="${M}">
      <polygon points="${P}" fill="${R.left}" stroke="${y}" stroke-width="${$}" />
      <polygon points="${G}" fill="${R.right}" stroke="${y}" stroke-width="${$}" />
      <polygon points="${U}" fill="${R.top}" stroke="${y}" stroke-width="${$}" />
    </g>
  `}function S(e){const i=_[e.presetId],t=e.selectedStation,n=f==="dark";B.textContent=i.subtitle,O.textContent=i.badge,O.className=`status-badge ${e.violatedCount===0?"badge-pass":"badge-fail"}`,K.textContent=`u = ${t.pivotOffsetSqU.toFixed(4)} (I_piv/I_cm = ${t.steinerInertiaRatio.toFixed(4)}×)`,X.textContent=`α_S/α_cm = ${t.angularAccelerationFactor.toFixed(4)}× (Quad err ${e.maxQuadratureError.toExponential(2)})`,C.textContent=`${t.inertiaDeficitRatio.toFixed(4)}×`,C.className=`kpi-value ${t.isInertiaDeficitViolation?"text-danger":"text-ok"}`,J.textContent=`d / k_g = ${t.pivotToGyrationRatio.toFixed(4)} | I = I_cm + m d²`,W.textContent=`${e.station4Ratio.toFixed(4)}× / ${e.station8Ratio.toFixed(4)}× / ${e.station16Ratio.toFixed(4)}×`,L.textContent=`${e.violatedCount} / ${e.stationCount}`,L.className=`kpi-value ${e.violatedCount>0?"text-danger":"text-ok"}`,tt.textContent=e.verdict,T.value=String(t.index),at.textContent=`Station ${t.index} (u = ${t.pivotOffsetSqU.toFixed(3)}, d/k_g = ${t.pivotToGyrationRatio.toFixed(3)}, I_exact/I = ${t.inertiaDeficitRatio.toFixed(4)}×)`;const s=z(e);et.textContent=`${s.length} solids · ${e.stationCount} stations`;const r=[...s].sort((a,o)=>a.z-o.z||a.y-o.y||a.x-o.x);it.innerHTML=r.map(a=>ot(a.x,a.y,a.z,a.w,a.h,a.d,a.tone,a.stationIndex===t.index,n,a.id,a.kind)).join(""),D.innerHTML=e.stations.map(a=>{const o=a.index===t.index?"row-selected":"",d=a.isInertiaDeficitViolation?"cell-fail":"cell-pass";return`
        <tr class="${o}" data-station-row="${a.index}">
          <td>#${a.index}</td>
          <td>${a.pivotOffsetSqU.toFixed(4)}</td>
          <td>${a.pivotToGyrationRatio.toFixed(4)}</td>
          <td>${a.steinerInertiaRatio.toFixed(4)}×</td>
          <td>${a.angularAccelerationFactor.toFixed(4)}×</td>
          <td class="${d}">${a.inertiaDeficitRatio.toFixed(4)}×</td>
        </tr>
      `}).join(""),document.querySelectorAll(".preset-btn").forEach(a=>{const o=a.getAttribute("data-preset");a.classList.toggle("active",o===e.presetId)}),window.__HUYGENS_STEINER_SUMMARY__=e}document.querySelectorAll(".preset-btn").forEach(e=>{e.addEventListener("click",()=>{const i=e.getAttribute("data-preset");i&&i in _&&(l=i,c=_[l].defaultStationIndex,S(k(l,c)))})});T.addEventListener("input",()=>{c=Number(T.value),S(k(l,c))});D.addEventListener("click",e=>{const i=e.target.closest("tr[data-station-row]");i&&(c=Number(i.getAttribute("data-station-row")),S(k(l,c)))});H.addEventListener("click",()=>{f=f==="dark"?"light":"dark",document.documentElement.setAttribute("data-theme",f),H.textContent=`Theme: ${f.toUpperCase()}`,S(k(l,c))});S(k(l,c));
