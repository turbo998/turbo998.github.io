import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as G,c as C,P as I,W as U,A as H,D as A,G as B,b as l,B as x,M as d,T as Z,C as Y,a as j}from"./three.module-7AmyneiW.js";const S=17,f=58;function W(t){const e=Math.min(1,Math.max(0,t)),i=e/(1+e),s=64;let o=0,n=1;for(let u=0;u<s;u++)o+=n,n*=i;const v=1/(1-i);return o/v}function y(t){const e=[];let i=0,s=0;for(let o=0;o<S;o++){const n=o/(S-1),v=n/(1+n),u=1,z=1+n,q=W(n),L=t==="lorentz_lorenz_local_field_cavity_coupling"?u:z,m=Math.abs(L-1),D=m*100;D>i&&(i=D),m>1e-5&&(s+=1),e.push({stationIndex:o,cavityBoostParam:Number(n.toFixed(4)),polarizabilityFractionY:Number(v.toFixed(4)),lorentzSusceptibilityRatio:Number(u.toFixed(4)),naiveUncoupledDeficitRatio:Number(z.toFixed(4)),neumannSeries64Ratio:Number(q.toFixed(4)),activeSusceptibilityRatio:Number(L.toFixed(4)),cavityDeficitError:Number(m.toFixed(4))})}return{mode:t,stationCount:S,solidCount:f,station0Ratio:e[0].activeSusceptibilityRatio,station4Ratio:e[4].activeSusceptibilityRatio,station8Ratio:e[8].activeSusceptibilityRatio,station12Ratio:e[12].activeSusceptibilityRatio,station16Ratio:e[16].activeSusceptibilityRatio,maxCavityDeficitPct:Number(i.toFixed(2)),deficientStationCount:s,stations:e}}const a=document.querySelector("#app");a.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 187 · 197TH DEMO · LORENTZ-LORENZ &amp; CLAUSIUS-MOSSOTTI DIELECTRIC BENCH</p>
        <h1>Lorentz-Lorenz Local-Field Polarizability (<code>(n²−1)/(n²+2) = y, χ/χ₀ = 1.0000×</code>) vs Uncoupled Dipole</h1>
        <p class="subtitle">
          58-solid 17-station dielectric refraction bench across Lorentz cavity boost <code>u ∈ [0.0000, 1.0000]</code> (molar polarizability fraction <code>y = u/(1+u) ∈ [0.00, 0.50]</code>).
          Hendrik Lorentz (1880), Ludvig Lorenz (1880), Rudolf Clausius (1879) &amp; Ottaviano Mossotti (1850) local-field cavity law <code>χ = n² − 1 = 3y/(1 − y)</code> captures dipole-dipole feedback—locking susceptibility ratio at <code>χ/χ_exact = 1.0000×</code> across all 17 stations and eliminating the <code>1/(1 − y) = 1 + u</code> up to <code>2.0000×</code> susceptibility deficit of naive uncoupled dipole laws (<code>χ = 3y</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-lorentz" class="mode-btn active" type="button">Lorentz-Lorenz Cavity (χ = 3y/(1−y))</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Uncoupled Dipole (χ = 3y Deficit)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Susceptibility Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">y = 0.2000 · n ≈ 1.323</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Crown-Glass Ratio (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">y = 0.3333 · n ≈ 1.581</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Dense-Crystal Ratio (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">y = 0.5000 · n = 2.000 (n² = 4)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Deficient Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Deficit)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Density Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Lorentz-Lorenz Clausius-Mossotti dielectric bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Dielectric Susceptibility Audit (<code>χ_exact / χ_model</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>Polariz. y</th>
                <th>Lorentz</th>
                <th>Naive (1+u)</th>
                <th>Active Ratio</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const M=a.querySelector(".rig-shell"),F=a.querySelector("#rig-canvas"),V=a.querySelector("#station-tbody"),J=a.querySelector("#kpi-s04"),K=a.querySelector("#kpi-s08"),Q=a.querySelector("#kpi-s16"),X=a.querySelector("#kpi-violated"),N=a.querySelector("#btn-lorentz"),E=a.querySelector("#btn-naive"),tt=a.querySelector("#btn-theme"),p=new G;p.background=new C(725536);const b=new I(42,16/10,.1,100);b.position.set(0,6.2,14.8);b.lookAt(0,1.3,0);const w=new U({canvas:F,antialias:!0,preserveDrawingBuffer:!0});w.setPixelRatio(Math.min(window.devicePixelRatio,2));const et=new H(16777215,.78);p.add(et);const T=new A(16777215,1.15);T.position.set(8,14,10);p.add(T);const c=new B;p.add(c);const R=new l(new x(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));R.position.set(0,-.25,0);c.add(R);for(let t=0;t<3;t++){const e=new l(new x(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),c.add(e)}for(let t=0;t<5;t++){const e=new l(new Z(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),c.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,i=new l(new Y(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));i.position.set(e,.5,-.95),c.add(i)}const P=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,i=new l(new j(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));i.position.set(e,1,.75),c.add(i),P.push(i)}const g=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,i=new l(new x(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));i.position.set(e,1,.75),c.add(i),g.push(i)}if(c.children.length!==f)throw new Error(`Expected ${f} solids, got ${c.children.length}`);let r="lorentz_lorenz_local_field_cavity_coupling",k=y(r);function h(t){k=t,N.classList.toggle("active",t.mode==="lorentz_lorenz_local_field_cavity_coupling"),E.classList.toggle("active",t.mode==="naive_uncoupled_dipole_susceptibility_deficit"),J.textContent=`${t.station4Ratio.toFixed(4)}×`,K.textContent=`${t.station8Ratio.toFixed(4)}×`,Q.textContent=`${t.station16Ratio.toFixed(4)}×`,X.textContent=`${t.deficientStationCount} / 17 (+${t.maxCavityDeficitPct.toFixed(2)}% Deficit)`,V.innerHTML=t.stations.map(e=>`
      <tr class="${e.cavityDeficitError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.cavityBoostParam.toFixed(4)}</td>
        <td>${e.polarizabilityFractionY.toFixed(4)}</td>
        <td>${e.lorentzSusceptibilityRatio.toFixed(4)}×</td>
        <td>${e.naiveUncoupledDeficitRatio.toFixed(4)}×</td>
        <td><strong>${e.activeSusceptibilityRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const i=t.stations[e],s=P[e],o=s.material;s.position.y=i.activeSusceptibilityRatio;const n=.85+.3*Math.min(2,i.activeSusceptibilityRatio);s.scale.setScalar(n),o.color.setHex(i.cavityDeficitError>1e-4?16347926:1096065)}for(let e=0;e<g.length;e++){const i=e+2,s=t.stations[i],o=g[e],n=Math.abs(s.activeSusceptibilityRatio-1);n<1e-4?(o.scale.set(1,.02,1),o.position.y=1,o.material.color.setHex(1096065)):(o.scale.set(1,n,1),o.position.y=1+n*.5,o.material.color.setHex(15680580))}_()}function $(){const t=F.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),i=Math.max(300,Math.floor(t.height));w.setSize(e,i,!1),b.aspect=e/i,b.updateProjectionMatrix(),_()}function _(){w.render(p,b)}function O(t){M.dataset.theme=t,p.background=new C(t==="light"?16317180:725536),R.material.color.setHex(t==="light"?13358561:1976635),_()}N.addEventListener("click",()=>{r="lorentz_lorenz_local_field_cavity_coupling",h(y(r))});E.addEventListener("click",()=>{r="naive_uncoupled_dipole_susceptibility_deficit",h(y(r))});tt.addEventListener("click",()=>{const t=M.dataset.theme==="light"?"dark":"light";O(t)});window.addEventListener("resize",$);$();h(k);window.__lorentzLorenzRig={getSnapshot:()=>k,setMode:t=>{r=t;const e=y(t);return h(e),e},setTheme:O};
