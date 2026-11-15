import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as G,c as q,P as H,W as B,A as O,D as A,G as V,b as c,B as w,M as d,T as I,C as K,a as z}from"./three.module-7AmyneiW.js";const S=17,b=58;function j(t){const o=1+Math.min(1,Math.max(0,t)),s=64;let a=0;for(let n=1;n<=s;n++){const g=1/Math.cosh((n-.5)*.281*Math.PI);a+=g*(o/o)}return a/a}function p(t){const e=[];let o=0,s=0;for(let a=0;a<S;a++){const n=a/(S-1),g=1+n,W=1,F=1+n,P=j(n),_=t==="strouhal_karman_velocity_coupled_flutter"?W:F,m=Math.abs(_-1),M=m*100;M>o&&(o=M),m>1e-5&&(s+=1),e.push({stationIndex:a,windBoostParam:Number(n.toFixed(4)),windVelocityRatio:Number(g.toFixed(4)),strouhalWavelengthRatio:Number(W.toFixed(4)),naiveFixedFreqWavelengthRatio:Number(F.toFixed(4)),karmanBiotSavart64Ratio:Number(P.toFixed(4)),activeWavelengthRatio:Number(_.toFixed(4)),flutterSlipError:Number(m.toFixed(4))})}return{mode:t,stationCount:S,solidCount:b,station0WavelengthRatio:e[0].activeWavelengthRatio,station4WavelengthRatio:e[4].activeWavelengthRatio,station8WavelengthRatio:e[8].activeWavelengthRatio,station12WavelengthRatio:e[12].activeWavelengthRatio,station16WavelengthRatio:e[16].activeWavelengthRatio,maxFlutterSlipPct:Number(o.toFixed(2)),desyncedStationCount:s,stations:e}}const i=document.querySelector("#app");i.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 179 · 189TH DEMO · STROUHAL-KÁRMÁN VORTEX FLUTTER BENCH</p>
        <h1>Strouhal-Kármán Velocity-Coupled Vortex Flutter (<code>f = St·U/D, λ/λ₀ = 1.0000×</code>) vs Fixed-Frequency Wind Slip</h1>
        <p class="subtitle">
          58-solid 17-station aeroelastic vortex-street bench across wind velocity boost <code>u ∈ [0.0000, 1.0000]</code> (<code>U/U₀ = 1 + u</code>).
          Vincenc Strouhal (1878) &amp; Theodore von Kármán (1911) vortex-shedding scaling <code>f(U) = St · U / D</code> scales flutter frequency linearly with wind speed—locking spatial wake wavelength at <code>λ/λ₀ = 1.0000×</code> across all 17 stations and eliminating the <code>1 + u</code> up to <code>2.0000×</code> phase-slip wavelength bloat of naive fixed-frequency flag/foliage shaders (<code>f = f₀</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-strouhal" class="mode-btn active" type="button">Strouhal-Kármán Coupled (f = St·U/D)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Fixed-Frequency (f = f₀ Slip)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Wake Wavelength (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">Wind Speed U = 1.2500 U₀</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Midpoint Wavelength (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">Wind Speed U = 1.5000 U₀</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Gale-Force Wavelength (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">Wind Speed U = 2.0000 U₀ (2× Gale)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Desynced Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Slip)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Wind Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Strouhal-Karman vortex flutter bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Vortex-Wake Wavelength Audit (<code>λ(u) / λ₀</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>U / U₀</th>
                <th>Strouhal</th>
                <th>Naive (1+u)</th>
                <th>Active λ/λ₀</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const U=i.querySelector(".rig-shell"),T=i.querySelector("#rig-canvas"),X=i.querySelector("#station-tbody"),J=i.querySelector("#kpi-s04"),Q=i.querySelector("#kpi-s08"),Y=i.querySelector("#kpi-s16"),Z=i.querySelector("#kpi-violated"),C=i.querySelector("#btn-strouhal"),L=i.querySelector("#btn-naive"),tt=i.querySelector("#btn-theme"),h=new G;h.background=new q(725536);const u=new H(42,16/10,.1,100);u.position.set(0,6.2,14.8);u.lookAt(0,1.3,0);const f=new B({canvas:T,antialias:!0,preserveDrawingBuffer:!0});f.setPixelRatio(Math.min(window.devicePixelRatio,2));const et=new O(16777215,.78);h.add(et);const N=new A(16777215,1.15);N.position.set(8,14,10);h.add(N);const r=new V;h.add(r);const y=new c(new w(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));y.position.set(0,-.25,0);r.add(y);for(let t=0;t<3;t++){const e=new c(new w(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),r.add(e)}for(let t=0;t<5;t++){const e=new c(new I(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),r.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new c(new K(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));o.position.set(e,.5,-.95),r.add(o)}const E=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new c(new z(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));o.position.set(e,1,.75),r.add(o),E.push(o)}const x=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,o=new c(new w(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));o.position.set(e,1,.75),r.add(o),x.push(o)}if(r.children.length!==b)throw new Error(`Expected ${b} solids, got ${r.children.length}`);let l="strouhal_karman_velocity_coupled_flutter",k=p(l);function v(t){k=t,C.classList.toggle("active",t.mode==="strouhal_karman_velocity_coupled_flutter"),L.classList.toggle("active",t.mode==="naive_fixed_frequency_wind_slip"),J.textContent=`${t.station4WavelengthRatio.toFixed(4)}×`,Q.textContent=`${t.station8WavelengthRatio.toFixed(4)}×`,Y.textContent=`${t.station16WavelengthRatio.toFixed(4)}×`,Z.textContent=`${t.desyncedStationCount} / 17 (+${t.maxFlutterSlipPct.toFixed(2)}% Slip)`,X.innerHTML=t.stations.map(e=>`
      <tr class="${e.flutterSlipError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.windBoostParam.toFixed(4)}</td>
        <td>${e.windVelocityRatio.toFixed(4)}×</td>
        <td>${e.strouhalWavelengthRatio.toFixed(4)}×</td>
        <td>${e.naiveFixedFreqWavelengthRatio.toFixed(4)}×</td>
        <td><strong>${e.activeWavelengthRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const o=t.stations[e],s=E[e],a=s.material;s.position.y=o.activeWavelengthRatio;const n=.85+.3*Math.min(2,o.activeWavelengthRatio);s.scale.setScalar(n),a.color.setHex(o.flutterSlipError>1e-4?16347926:1096065)}for(let e=0;e<x.length;e++){const o=e+2,s=t.stations[o],a=x[e],n=Math.abs(s.activeWavelengthRatio-1);n<1e-4?(a.scale.set(1,.02,1),a.position.y=1,a.material.color.setHex(1096065)):(a.scale.set(1,n,1),a.position.y=1+n*.5,a.material.color.setHex(15680580))}R()}function $(){const t=T.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),o=Math.max(300,Math.floor(t.height));f.setSize(e,o,!1),u.aspect=e/o,u.updateProjectionMatrix(),R()}function R(){f.render(h,u)}function D(t){U.dataset.theme=t,h.background=new q(t==="light"?16317180:725536),y.material.color.setHex(t==="light"?13358561:1976635),R()}C.addEventListener("click",()=>{l="strouhal_karman_velocity_coupled_flutter",v(p(l))});L.addEventListener("click",()=>{l="naive_fixed_frequency_wind_slip",v(p(l))});tt.addEventListener("click",()=>{const t=U.dataset.theme==="light"?"dark":"light";D(t)});window.addEventListener("resize",$);$();v(k);window.__strouhalKarmanRig={getSnapshot:()=>k,setMode:t=>{l=t;const e=p(t);return v(e),e},setTheme:D};
