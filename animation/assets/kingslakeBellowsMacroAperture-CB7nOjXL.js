import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as G,c as D,P as O,W as I,A as K,D as H,G as W,b as l,B as k,M as d,T as U,C as z,a as j}from"./three.module-7AmyneiW.js";const g=17,b=58;function V(e){const o=1+Math.min(1,Math.max(0,e)),a=64;let s=0;const i=1/a;for(let m=0;m<a;m++)s+=i/o;return s*o}function h(e){const t=[];let o=0,a=0;for(let s=0;s<g;s++){const i=s/(g-1),m=Math.sqrt(1+i)-1,y=1,M=1+i,B=V(i),N=e==="kingslake_bellows_effective_aperture"?y:M,f=Math.abs(N-1),_=f*100;_>o&&(o=_),f>1e-5&&(a+=1),t.push({stationIndex:s,bellowsFactorExcessParam:Number(i.toFixed(4)),macroMagnification:Number(m.toFixed(4)),kingslakeExposureRatio:Number(y.toFixed(4)),naiveNominalDeficitRatio:Number(M.toFixed(4)),pupilRing64ExposureRatio:Number(B.toFixed(4)),activeExposureRatio:Number(N.toFixed(4)),exposureDeficitError:Number(f.toFixed(4))})}return{mode:e,stationCount:g,solidCount:b,station0ExposureRatio:t[0].activeExposureRatio,station4ExposureRatio:t[4].activeExposureRatio,station8ExposureRatio:t[8].activeExposureRatio,station12ExposureRatio:t[12].activeExposureRatio,station16ExposureRatio:t[16].activeExposureRatio,maxExposureDeficitPct:Number(o.toFixed(2)),underexposedStationCount:a,stations:t}}const n=document.querySelector("#app");n.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 183 · 193RD DEMO · KINGSLAKE BELLOWS MACRO APERTURE BENCH</p>
        <h1>Kingslake Macro Bellows Effective Aperture (<code>N_eff = N(1+m), E/E₀ = 1.0000×</code>) vs Naive Infinity f-Number</h1>
        <p class="subtitle">
          58-solid 17-station macro optical bellows bench across bellows extension excess <code>u = (1+m)² − 1 ∈ [0.0000, 1.0000]</code>.
          Rudolf Kingslake's (1951) effective f-number law <code>N_eff = N(1 + m)</code> compensates for the <code>v = f(1 + m)</code> image-plane inverse-square falloff—locking sensor exposure ratio at <code>E/E_target = 1.0000×</code> across all 17 stations and eliminating the <code>(1 + m)² = 1 + u</code> up to <code>2.0000×</code> (1 full stop) exposure deficit of naive infinity-focus nominal f-numbers (<code>N = f/D</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-kingslake" class="mode-btn active" type="button">Kingslake Effective N_eff = N(1+m)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Nominal N = f/D (1+u Deficit)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Exposure Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">m = 0.1180× · (1+m)² = 1.25×</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Mid-Macro Exposure (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">m = 0.2247× · (1+m)² = 1.50×</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Close-Macro Exposure (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">m = 0.4142× · (1+m)² = 2.00× (1 EV)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Deficit Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Loss)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Magnification Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Kingslake macro bellows effective aperture bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Macro Bellows Exposure Audit (<code>(1 + m)² = 1 + u</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>Mag m</th>
                <th>Kingslake</th>
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
`;const L=n.querySelector(".rig-shell"),C=n.querySelector("#rig-canvas"),J=n.querySelector("#station-tbody"),Q=n.querySelector("#kpi-s04"),X=n.querySelector("#kpi-s08"),Y=n.querySelector("#kpi-s16"),Z=n.querySelector("#kpi-violated"),F=n.querySelector("#btn-kingslake"),q=n.querySelector("#btn-naive"),ee=n.querySelector("#btn-theme"),u=new G;u.background=new D(725536);const p=new O(42,16/10,.1,100);p.position.set(0,6.2,14.8);p.lookAt(0,1.3,0);const E=new I({canvas:C,antialias:!0,preserveDrawingBuffer:!0});E.setPixelRatio(Math.min(window.devicePixelRatio,2));const te=new K(16777215,.78);u.add(te);const $=new H(16777215,1.15);$.position.set(8,14,10);u.add($);const r=new W;u.add(r);const w=new l(new k(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));w.position.set(0,-.25,0);r.add(w);for(let e=0;e<3;e++){const t=new l(new k(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));t.position.set(0,1+e*1,-1.55),r.add(t)}for(let e=0;e<5;e++){const t=new l(new U(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));t.position.set(-6+e*3,0,-.35),r.add(t)}for(let e=0;e<17;e++){const t=-7.2+e*.9,o=new l(new z(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));o.position.set(t,.5,-.95),r.add(o)}const A=[];for(let e=0;e<17;e++){const t=-7.2+e*.9,o=new l(new j(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));o.position.set(t,1,.75),r.add(o),A.push(o)}const v=[];for(let e=2;e<17;e++){const t=-7.2+e*.9,o=new l(new k(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));o.position.set(t,1,.75),r.add(o),v.push(o)}if(r.children.length!==b)throw new Error(`Expected ${b} solids, got ${r.children.length}`);let c="kingslake_bellows_effective_aperture",S=h(c);function x(e){S=e,F.classList.toggle("active",e.mode==="kingslake_bellows_effective_aperture"),q.classList.toggle("active",e.mode==="naive_infinity_nominal_fnumber_drop"),Q.textContent=`${e.station4ExposureRatio.toFixed(4)}×`,X.textContent=`${e.station8ExposureRatio.toFixed(4)}×`,Y.textContent=`${e.station16ExposureRatio.toFixed(4)}×`,Z.textContent=`${e.underexposedStationCount} / 17 (+${e.maxExposureDeficitPct.toFixed(2)}% Loss)`,J.innerHTML=e.stations.map(t=>`
      <tr class="${t.exposureDeficitError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(t.stationIndex).padStart(2,"0")}</td>
        <td>${t.bellowsFactorExcessParam.toFixed(4)}</td>
        <td>${t.macroMagnification.toFixed(4)}×</td>
        <td>${t.kingslakeExposureRatio.toFixed(4)}×</td>
        <td>${t.naiveNominalDeficitRatio.toFixed(4)}×</td>
        <td><strong>${t.activeExposureRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let t=0;t<17;t++){const o=e.stations[t],a=A[t],s=a.material;a.position.y=o.activeExposureRatio;const i=.85+.3*Math.min(2,o.activeExposureRatio);a.scale.setScalar(i),s.color.setHex(o.exposureDeficitError>1e-4?16347926:1096065)}for(let t=0;t<v.length;t++){const o=t+2,a=e.stations[o],s=v[t],i=Math.abs(a.activeExposureRatio-1);i<1e-4?(s.scale.set(1,.02,1),s.position.y=1,s.material.color.setHex(1096065)):(s.scale.set(1,i,1),s.position.y=1+i*.5,s.material.color.setHex(15680580))}R()}function P(){const e=C.parentElement.getBoundingClientRect(),t=Math.max(320,Math.floor(e.width)),o=Math.max(300,Math.floor(e.height));E.setSize(t,o,!1),p.aspect=t/o,p.updateProjectionMatrix(),R()}function R(){E.render(u,p)}function T(e){L.dataset.theme=e,u.background=new D(e==="light"?16317180:725536),w.material.color.setHex(e==="light"?13358561:1976635),R()}F.addEventListener("click",()=>{c="kingslake_bellows_effective_aperture",x(h(c))});q.addEventListener("click",()=>{c="naive_infinity_nominal_fnumber_drop",x(h(c))});ee.addEventListener("click",()=>{const e=L.dataset.theme==="light"?"dark":"light";T(e)});window.addEventListener("resize",P);P();x(S);window.__kingslakeBellowsRig={getSnapshot:()=>S,setMode:e=>{c=e;const t=h(e);return x(t),t},setTheme:T};
