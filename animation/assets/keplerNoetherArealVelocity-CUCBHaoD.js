import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as H,c as C,P as I,W as K,A as G,D as B,G as z,b as d,B as y,M as p,T as U,C as j,a as W}from"./three.module-7AmyneiW.js";const S=17,k=58;function J(e){const a=1+Math.min(1,Math.max(0,e)),i=1/a,o=64,n=1/o;let l=0;for(let h=0;h<o;h++){const v=i*n;l+=a*v}return l}function b(e){const t=[];let a=0,i=0;for(let o=0;o<S;o++){const n=o/(S-1),l=1+n,h=1/l,v=l*h,M=l,D=J(n),f=e==="kepler_noether_inverse_square_angular_speed"?v:M,A=Math.abs(f-1),N=A*100;N>a&&(a=N),A>1e-5&&(i+=1),t.push({stationIndex:o,inertiaExpansionParam:Number(n.toFixed(4)),radiusSquaredRatio:Number(l.toFixed(4)),keplerAngularSpeedRatio:Number(h.toFixed(4)),keplerArealVelocityRatio:Number(v.toFixed(4)),naiveConstantOmegaArealRatio:Number(M.toFixed(4)),sectorFan64ArealRatio:Number(D.toFixed(4)),activeArealVelocityRatio:Number(f.toFixed(4)),noetherMomentumError:Number(A.toFixed(4))})}return{mode:e,stationCount:S,solidCount:k,station0ArealRatio:t[0].activeArealVelocityRatio,station4ArealRatio:t[4].activeArealVelocityRatio,station8ArealRatio:t[8].activeArealVelocityRatio,station12ArealRatio:t[12].activeArealVelocityRatio,station16ArealRatio:t[16].activeArealVelocityRatio,maxArealExcessPct:Number(a.toFixed(2)),violatedStationCount:i,stations:t}}const s=document.querySelector("#app");s.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 190 · 200TH DEMO HISTORIC MILESTONE · KEPLER-NOETHER AREAL VELOCITY BENCH</p>
        <h1>Kepler-Noether Equal-Area Angular Momentum (<code>r²θ̇ = L/m, Ȧ/Ȧ₀ = 1.0000×</code>) vs Constant-ω Orbit</h1>
        <p class="subtitle">
          58-solid 17-station celestial &amp; vortex mechanics bench across moment-of-inertia expansion <code>u ∈ [0.0000, 1.0000]</code> (<code>r²/r₀² = 1 + u</code>).
          Johannes Kepler's (1609) Second Law &amp; Emmy Noether's (1918) rotational symmetry conservation scale angular velocity as <code>θ̇(r) = L/(mr²) = ω₀/(1+u)</code>—locking swept-area rate at <code>Ȧ/Ȧ₀ = 1.0000×</code> across all 17 stations and eliminating the <code>1 + u</code> up to <code>2.0000×</code> apoapsis angular-momentum violation of naive constant-angular-speed orbits (<code>θ = ω₀t</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-kepler" class="mode-btn active" type="button">Kepler-Noether Equal-Area (θ̇ = ω₀r₀²/r²)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Constant-ω (θ̇ = ω₀ Violation)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Areal Rate (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">r²/r₀² = 1.2500 · θ̇ = 0.80 ω₀</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Mid-Orbit Areal Rate (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">r²/r₀² = 1.5000 · θ̇ = 0.67 ω₀</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Apoapsis Areal Rate (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">r²/r₀² = 2.0000 · θ̇ = 0.50 ω₀</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Violated Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Drift)</strong>
        <span class="kpi-sub">58 3D Solids · 200th Demo Milestone</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Kepler-Noether areal velocity conservation bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Swept-Area Rate Audit (<code>Ȧ(u) / Ȧ₀ = L / L₀</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>r²/r₀²</th>
                <th>Kepler (1.0×)</th>
                <th>Naive (1+u)</th>
                <th>Active Ȧ/Ȧ₀</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const L=s.querySelector(".rig-shell"),q=s.querySelector("#rig-canvas"),Y=s.querySelector("#station-tbody"),Q=s.querySelector("#kpi-s04"),X=s.querySelector("#kpi-s08"),Z=s.querySelector("#kpi-s16"),ee=s.querySelector("#kpi-violated"),F=s.querySelector("#btn-kepler"),T=s.querySelector("#btn-naive"),te=s.querySelector("#btn-theme"),u=new H;u.background=new C(725536);const m=new I(42,16/10,.1,100);m.position.set(0,6.2,14.8);m.lookAt(0,1.3,0);const R=new K({canvas:q,antialias:!0,preserveDrawingBuffer:!0});R.setPixelRatio(Math.min(window.devicePixelRatio,2));const ae=new G(16777215,.78);u.add(ae);const V=new B(16777215,1.15);V.position.set(8,14,10);u.add(V);const r=new z;u.add(r);const w=new d(new y(16.4,.45,5.2),new p({color:1976635,roughness:.4,metalness:.3}));w.position.set(0,-.25,0);r.add(w);for(let e=0;e<3;e++){const t=new d(new y(15.8,.08,.12),new p({color:3718648,roughness:.3,metalness:.5}));t.position.set(0,1+e*1,-1.55),r.add(t)}for(let e=0;e<5;e++){const t=new d(new U(2.15,.06,12,36,Math.PI),new p({color:6514417,roughness:.35,metalness:.45}));t.position.set(-6+e*3,0,-.35),r.add(t)}for(let e=0;e<17;e++){const t=-7.2+e*.9,a=new d(new j(.16,.16,1,20),new p({color:959977,roughness:.3,metalness:.4}));a.position.set(t,.5,-.95),r.add(a)}const O=[];for(let e=0;e<17;e++){const t=-7.2+e*.9,a=new d(new W(.24,24,24),new p({color:1096065,roughness:.25,metalness:.35}));a.position.set(t,1,.75),r.add(a),O.push(a)}const x=[];for(let e=2;e<17;e++){const t=-7.2+e*.9,a=new d(new y(.12,1,.12),new p({color:15680580,roughness:.3,metalness:.3}));a.position.set(t,1,.75),r.add(a),x.push(a)}if(r.children.length!==k)throw new Error(`Expected ${k} solids, got ${r.children.length}`);let c="kepler_noether_inverse_square_angular_speed",_=b(c);function g(e){_=e,F.classList.toggle("active",e.mode==="kepler_noether_inverse_square_angular_speed"),T.classList.toggle("active",e.mode==="naive_constant_angular_velocity_violation"),Q.textContent=`${e.station4ArealRatio.toFixed(4)}×`,X.textContent=`${e.station8ArealRatio.toFixed(4)}×`,Z.textContent=`${e.station16ArealRatio.toFixed(4)}×`,ee.textContent=`${e.violatedStationCount} / 17 (+${e.maxArealExcessPct.toFixed(2)}% Drift)`,Y.innerHTML=e.stations.map(t=>`
      <tr class="${t.noetherMomentumError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(t.stationIndex).padStart(2,"0")}</td>
        <td>${t.inertiaExpansionParam.toFixed(4)}</td>
        <td>${t.radiusSquaredRatio.toFixed(4)}×</td>
        <td>${t.keplerArealVelocityRatio.toFixed(4)}×</td>
        <td>${t.naiveConstantOmegaArealRatio.toFixed(4)}×</td>
        <td><strong>${t.activeArealVelocityRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let t=0;t<17;t++){const a=e.stations[t],i=O[t],o=i.material;i.position.y=a.activeArealVelocityRatio;const n=.85+.3*Math.min(2,a.activeArealVelocityRatio);i.scale.setScalar(n),o.color.setHex(a.noetherMomentumError>1e-4?16347926:1096065)}for(let t=0;t<x.length;t++){const a=t+2,i=e.stations[a],o=x[t],n=Math.abs(i.activeArealVelocityRatio-1);n<1e-4?(o.scale.set(1,.02,1),o.position.y=1,o.material.color.setHex(1096065)):(o.scale.set(1,n,1),o.position.y=1+n*.5,o.material.color.setHex(15680580))}E()}function P(){const e=q.parentElement.getBoundingClientRect(),t=Math.max(320,Math.floor(e.width)),a=Math.max(300,Math.floor(e.height));R.setSize(t,a,!1),m.aspect=t/a,m.updateProjectionMatrix(),E()}function E(){R.render(u,m)}function $(e){L.dataset.theme=e,u.background=new C(e==="light"?16317180:725536),w.material.color.setHex(e==="light"?13358561:1976635),E()}F.addEventListener("click",()=>{c="kepler_noether_inverse_square_angular_speed",g(b(c))});T.addEventListener("click",()=>{c="naive_constant_angular_velocity_violation",g(b(c))});te.addEventListener("click",()=>{const e=L.dataset.theme==="light"?"dark":"light";$(e)});window.addEventListener("resize",P);P();g(_);window.__keplerNoetherRig={getSnapshot:()=>_,setMode:e=>{c=e;const t=b(e);return g(t),t},setTheme:$};
