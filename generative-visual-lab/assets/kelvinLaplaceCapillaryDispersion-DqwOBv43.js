import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as $,c as C,P as I,W as O,A as H,D as K,G as W,b as d,B as k,M as c,T as Y,C as z,a as U}from"./three.module-7AmyneiW.js";const y=17,m=58;function V(e){const t=Math.min(1,Math.max(0,e)),i=64;let a=0;const o=1/i;for(let v=0;v<i;v++)a+=o;return(1+t)/(1+t)/a}function h(e){const t=[];let i=0,a=0;for(let o=0;o<y;o++){const s=o/(y-1),v=1+s,f=1,_=1+s,D=V(s),q=e==="kelvin_laplace_capillary_gravity_dispersion"?f:_,S=Math.abs(q-1),L=S*100;L>i&&(i=L),S>1e-5&&(a+=1),t.push({stationIndex:o,inverseBondParam:Number(s.toFixed(4)),capillaryStiffnessBoost:Number(v.toFixed(4)),kelvinPeriodSquaredRatio:Number(f.toFixed(4)),naiveGravityPeriodSquaredRatio:Number(_.toFixed(4)),airyPotential64Ratio:Number(D.toFixed(4)),activePeriodSquaredRatio:Number(q.toFixed(4)),dispersionSluggishError:Number(S.toFixed(4))})}return{mode:e,stationCount:y,solidCount:m,station0PeriodRatio:t[0].activePeriodSquaredRatio,station4PeriodRatio:t[4].activePeriodSquaredRatio,station8PeriodRatio:t[8].activePeriodSquaredRatio,station12PeriodRatio:t[12].activePeriodSquaredRatio,station16PeriodRatio:t[16].activePeriodSquaredRatio,maxSluggishDelayPct:Number(i.toFixed(2)),sluggishStationCount:a,stations:t}}const n=document.querySelector("#app");n.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 177 · 187TH DEMO · KELVIN-LAPLACE CAPILLARY-GRAVITY DISPERSION BENCH</p>
        <h1>Kelvin-Laplace Capillary-Gravity Wave Dispersion (<code>ω² = gk + (γ/ρ)k³, T²/T₀² = 1.0000×</code>) vs Gravity-Only Ripple Lag</h1>
        <p class="subtitle">
          58-solid 17-station hydrodynamic wave-tank bench across inverse Bond number <code>u = γk²/(ρg) ∈ [0.0000, 1.0000]</code>.
          Lord Kelvin (1871) &amp; Young-Laplace (1805/1806) surface-tension dispersion <code>ω² = gk + (γ/ρ)k³</code> includes capillary curvature stiffness—locking normalized period-squared ratio at <code>T²/T_exact² = 1.0000×</code> across all 17 stations and eliminating the <code>1 + u</code> up to <code>2.0000×</code> sluggish ripple period bloat of naive gravity-only wave solvers (<code>ω² = gk</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-kelvin" class="mode-btn active" type="button">Kelvin-Laplace Capillary (ω²=gk+γk³/ρ)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Gravity-Only (ω²=gk Sluggish)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Period² Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">γk²/(ρg) = 0.2500</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Midpoint Period² (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">γk²/(ρg) = 0.5000</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Crossover Period² (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">λ_c = 1.73 cm (Bo⁻¹ = 1.0)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Sluggish Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Lag)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Wavenumber Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Kelvin-Laplace capillary-gravity wave dispersion bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Wave Period-Squared Audit (<code>T²(u) / T_exact²</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u (Bo⁻¹)</th>
                <th>1+u Boost</th>
                <th>Kelvin (1.0×)</th>
                <th>Naive (1+u)</th>
                <th>Active T²/T₀²</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const M=n.querySelector(".rig-shell"),T=n.querySelector("#rig-canvas"),j=n.querySelector("#station-tbody"),J=n.querySelector("#kpi-s04"),Q=n.querySelector("#kpi-s08"),X=n.querySelector("#kpi-s16"),Z=n.querySelector("#kpi-violated"),N=n.querySelector("#btn-kelvin"),F=n.querySelector("#btn-naive"),ee=n.querySelector("#btn-theme"),p=new $;p.background=new C(725536);const u=new I(42,16/10,.1,100);u.position.set(0,6.2,14.8);u.lookAt(0,1.3,0);const P=new O({canvas:T,antialias:!0,preserveDrawingBuffer:!0});P.setPixelRatio(Math.min(window.devicePixelRatio,2));const te=new H(16777215,.78);p.add(te);const A=new K(16777215,1.15);A.position.set(8,14,10);p.add(A);const r=new W;p.add(r);const x=new d(new k(16.4,.45,5.2),new c({color:1976635,roughness:.4,metalness:.3}));x.position.set(0,-.25,0);r.add(x);for(let e=0;e<3;e++){const t=new d(new k(15.8,.08,.12),new c({color:3718648,roughness:.3,metalness:.5}));t.position.set(0,1+e*1,-1.55),r.add(t)}for(let e=0;e<5;e++){const t=new d(new Y(2.15,.06,12,36,Math.PI),new c({color:6514417,roughness:.35,metalness:.45}));t.position.set(-6+e*3,0,-.35),r.add(t)}for(let e=0;e<17;e++){const t=-7.2+e*.9,i=new d(new z(.16,.16,1,20),new c({color:959977,roughness:.3,metalness:.4}));i.position.set(t,.5,-.95),r.add(i)}const E=[];for(let e=0;e<17;e++){const t=-7.2+e*.9,i=new d(new U(.24,24,24),new c({color:1096065,roughness:.25,metalness:.35}));i.position.set(t,1,.75),r.add(i),E.push(i)}const b=[];for(let e=2;e<17;e++){const t=-7.2+e*.9,i=new d(new k(.12,1,.12),new c({color:15680580,roughness:.3,metalness:.3}));i.position.set(t,1,.75),r.add(i),b.push(i)}if(r.children.length!==m)throw new Error(`Expected ${m} solids, got ${r.children.length}`);let l="kelvin_laplace_capillary_gravity_dispersion",w=h(l);function g(e){w=e,N.classList.toggle("active",e.mode==="kelvin_laplace_capillary_gravity_dispersion"),F.classList.toggle("active",e.mode==="naive_gravity_only_sluggish_ripple"),J.textContent=`${e.station4PeriodRatio.toFixed(4)}×`,Q.textContent=`${e.station8PeriodRatio.toFixed(4)}×`,X.textContent=`${e.station16PeriodRatio.toFixed(4)}×`,Z.textContent=`${e.sluggishStationCount} / 17 (+${e.maxSluggishDelayPct.toFixed(2)}% Lag)`,j.innerHTML=e.stations.map(t=>`
      <tr class="${t.dispersionSluggishError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(t.stationIndex).padStart(2,"0")}</td>
        <td>${t.inverseBondParam.toFixed(4)}</td>
        <td>${t.capillaryStiffnessBoost.toFixed(4)}×</td>
        <td>${t.kelvinPeriodSquaredRatio.toFixed(4)}×</td>
        <td>${t.naiveGravityPeriodSquaredRatio.toFixed(4)}×</td>
        <td><strong>${t.activePeriodSquaredRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let t=0;t<17;t++){const i=e.stations[t],a=E[t],o=a.material;a.position.y=i.activePeriodSquaredRatio;const s=.85+.3*Math.min(2,i.activePeriodSquaredRatio);a.scale.setScalar(s),o.color.setHex(i.dispersionSluggishError>1e-4?16347926:1096065)}for(let t=0;t<b.length;t++){const i=t+2,a=e.stations[i],o=b[t],s=Math.abs(a.activePeriodSquaredRatio-1);s<1e-4?(o.scale.set(1,.02,1),o.position.y=1,o.material.color.setHex(1096065)):(o.scale.set(1,s,1),o.position.y=1+s*.5,o.material.color.setHex(15680580))}R()}function G(){const e=T.parentElement.getBoundingClientRect(),t=Math.max(320,Math.floor(e.width)),i=Math.max(300,Math.floor(e.height));P.setSize(t,i,!1),u.aspect=t/i,u.updateProjectionMatrix(),R()}function R(){P.render(p,u)}function B(e){M.dataset.theme=e,p.background=new C(e==="light"?16317180:725536),x.material.color.setHex(e==="light"?13358561:1976635),R()}N.addEventListener("click",()=>{l="kelvin_laplace_capillary_gravity_dispersion",g(h(l))});F.addEventListener("click",()=>{l="naive_gravity_only_sluggish_ripple",g(h(l))});ee.addEventListener("click",()=>{const e=M.dataset.theme==="light"?"dark":"light";B(e)});window.addEventListener("resize",G);G();g(w);window.__kelvinCapillaryRig={getSnapshot:()=>w,setMode:e=>{l=e;const t=h(e);return g(t),t},setTheme:B};
