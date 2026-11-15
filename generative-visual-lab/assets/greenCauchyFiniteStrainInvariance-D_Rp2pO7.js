import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as H,c as T,P as D,W as z,A as O,D as j,G as U,b as u,B as F,M as p,T as V,C as W,a as Y}from"./three.module-7AmyneiW.js";const k=17,y=58;function J(t){const o=1/(1+Math.min(1,Math.max(0,t))),s=Math.sqrt(Math.max(0,1-o*o)),a=Math.atan2(s,o),n=64,b=a/n;let c=1,l=0;const g=Math.cos(b),m=Math.sin(b);for(let d=0;d<n;d++){const x=c*g-l*m,A=l*g+c*m;c=x,l=A}return Math.sqrt(c*c+l*l)}function R(t){const e=[];let o=0,s=0;for(let a=0;a<k;a++){const n=a/(k-1),b=1/(1+n),c=1,l=1/b,g=J(n),m=t==="green_cauchy_rotation_invariant_strain"?c:l,d=Math.abs(m-1),x=d*100;x>o&&(o=x),d>1e-5&&(s+=1),e.push({stationIndex:a,rotationSecantParam:Number(n.toFixed(4)),cosThetaProjection:Number(b.toFixed(4)),greenStretchRatio:Number(c.toFixed(4)),naiveLinearStretchRatio:Number(l.toFixed(4)),corotational64StretchRatio:Number(g.toFixed(4)),activeStretchRatio:Number(m.toFixed(4)),ghostBloatError:Number(d.toFixed(4))})}return{mode:t,stationCount:k,solidCount:y,station0StretchRatio:e[0].activeStretchRatio,station4StretchRatio:e[4].activeStretchRatio,station8StretchRatio:e[8].activeStretchRatio,station12StretchRatio:e[12].activeStretchRatio,station16StretchRatio:e[16].activeStretchRatio,maxGhostBloatPct:Number(o.toFixed(2)),bloatedStationCount:s,stations:e}}const i=document.querySelector("#app");i.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 178 · 188TH DEMO · GREEN-CAUCHY FINITE STRAIN INVARIANCE BENCH</p>
        <h1>Green-Cauchy Rotation-Invariant Finite Strain (<code>E = ½(FᵀF−I), λ = 1.0000×</code>) vs Linearized Strain Ghost Bloat</h1>
        <p class="subtitle">
          58-solid 17-station continuum mechanics bench across rigid-rotation secant parameter <code>u ∈ [0.0000, 1.0000]</code> (<code>cos θ = 1/(1+u)</code>).
          George Green (1841) &amp; Barré de Saint-Venant (1845) quadratic finite strain <code>E_Green = ½(FᵀF − I)</code> cancels rigid rotation <code>RᵀR = I</code>—locking rest-state equilibrium stretch at <code>λ = 1.0000×</code> across all 17 stations and eliminating the <code>1/cos θ = 1 + u</code> up to <code>2.0000×</code> ghost size bloat of naive linearized Cauchy strain <code>ε = ½(F + Fᵀ) − I</code>.
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-green" class="mode-btn active" type="button">Green-Cauchy Finite Strain (½(FᵀF−I))</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Linearized Strain (½(F+Fᵀ)−I Bloat)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Stretch Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">cos θ = 0.8000 (θ ≈ 36.9°)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Midpoint Stretch (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">cos θ = 0.6667 (θ ≈ 48.2°)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 60°-Rotation Stretch (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">cos θ = 0.5000 (θ = 60.0°)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Bloated Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Bloat)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Rotation Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Green-Cauchy finite strain invariance bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Equilibrium Stretch Audit (<code>λ(u) = L / L₀</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>cos θ</th>
                <th>Green (1.0×)</th>
                <th>Naive (1+u)</th>
                <th>Active λ</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const I=i.querySelector(".rig-shell"),E=i.querySelector("#rig-canvas"),K=i.querySelector("#station-tbody"),Q=i.querySelector("#kpi-s04"),X=i.querySelector("#kpi-s08"),Z=i.querySelector("#kpi-s16"),tt=i.querySelector("#kpi-violated"),G=i.querySelector("#btn-green"),L=i.querySelector("#btn-naive"),et=i.querySelector("#btn-theme"),S=new H;S.background=new T(725536);const v=new D(42,16/10,.1,100);v.position.set(0,6.2,14.8);v.lookAt(0,1.3,0);const f=new z({canvas:E,antialias:!0,preserveDrawingBuffer:!0});f.setPixelRatio(Math.min(window.devicePixelRatio,2));const ot=new O(16777215,.78);S.add(ot);const B=new j(16777215,1.15);B.position.set(8,14,10);S.add(B);const r=new U;S.add(r);const M=new u(new F(16.4,.45,5.2),new p({color:1976635,roughness:.4,metalness:.3}));M.position.set(0,-.25,0);r.add(M);for(let t=0;t<3;t++){const e=new u(new F(15.8,.08,.12),new p({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),r.add(e)}for(let t=0;t<5;t++){const e=new u(new V(2.15,.06,12,36,Math.PI),new p({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),r.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new u(new W(.16,.16,1,20),new p({color:959977,roughness:.3,metalness:.4}));o.position.set(e,.5,-.95),r.add(o)}const q=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new u(new Y(.24,24,24),new p({color:1096065,roughness:.25,metalness:.35}));o.position.set(e,1,.75),r.add(o),q.push(o)}const _=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,o=new u(new F(.12,1,.12),new p({color:15680580,roughness:.3,metalness:.3}));o.position.set(e,1,.75),r.add(o),_.push(o)}if(r.children.length!==y)throw new Error(`Expected ${y} solids, got ${r.children.length}`);let h="green_cauchy_rotation_invariant_strain",C=R(h);function w(t){C=t,G.classList.toggle("active",t.mode==="green_cauchy_rotation_invariant_strain"),L.classList.toggle("active",t.mode==="naive_infinitesimal_linear_strain_bloat"),Q.textContent=`${t.station4StretchRatio.toFixed(4)}×`,X.textContent=`${t.station8StretchRatio.toFixed(4)}×`,Z.textContent=`${t.station16StretchRatio.toFixed(4)}×`,tt.textContent=`${t.bloatedStationCount} / 17 (+${t.maxGhostBloatPct.toFixed(2)}% Bloat)`,K.innerHTML=t.stations.map(e=>`
      <tr class="${e.ghostBloatError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.rotationSecantParam.toFixed(4)}</td>
        <td>${e.cosThetaProjection.toFixed(4)}</td>
        <td>${e.greenStretchRatio.toFixed(4)}×</td>
        <td>${e.naiveLinearStretchRatio.toFixed(4)}×</td>
        <td><strong>${e.activeStretchRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const o=t.stations[e],s=q[e],a=s.material;s.position.y=o.activeStretchRatio;const n=.85+.3*Math.min(2,o.activeStretchRatio);s.scale.setScalar(n),a.color.setHex(o.ghostBloatError>1e-4?16347926:1096065)}for(let e=0;e<_.length;e++){const o=e+2,s=t.stations[o],a=_[e],n=Math.abs(s.activeStretchRatio-1);n<1e-4?(a.scale.set(1,.02,1),a.position.y=1,a.material.color.setHex(1096065)):(a.scale.set(1,n,1),a.position.y=1+n*.5,a.material.color.setHex(15680580))}N()}function P(){const t=E.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),o=Math.max(300,Math.floor(t.height));f.setSize(e,o,!1),v.aspect=e/o,v.updateProjectionMatrix(),N()}function N(){f.render(S,v)}function $(t){I.dataset.theme=t,S.background=new T(t==="light"?16317180:725536),M.material.color.setHex(t==="light"?13358561:1976635),N()}G.addEventListener("click",()=>{h="green_cauchy_rotation_invariant_strain",w(R(h))});L.addEventListener("click",()=>{h="naive_infinitesimal_linear_strain_bloat",w(R(h))});et.addEventListener("click",()=>{const t=I.dataset.theme==="light"?"dark":"light";$(t)});window.addEventListener("resize",P);P();w(C);window.__greenCauchyStrainRig={getSnapshot:()=>C,setMode:t=>{h=t;const e=R(t);return w(e),e},setTheme:$};
