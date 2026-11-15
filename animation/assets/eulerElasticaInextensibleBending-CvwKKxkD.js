import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as G,c as C,P as D,W as H,A as O,D as U,G as z,b as l,B as w,M as d,T as j,C as W,a as K}from"./three.module-7AmyneiW.js";const A=17,E=58;function V(t){const a=1/(1+Math.min(1,Math.max(0,t))),i=Math.sqrt(Math.max(0,1-a*a)),o=64,s=1/o;let u=0;for(let p=0;p<o;p++){const g=s*a,S=s*i;u+=Math.hypot(g,S)}return u}function v(t){const e=[];let a=0,i=0;for(let o=0;o<A;o++){const s=o/(A-1),u=1/(1+s),p=1,g=1/u,S=V(s),_=t==="euler_elastica_inextensible_arc_retraction"?p:g,x=Math.abs(_-1),M=x*100;M>a&&(a=M),x>1e-5&&(i+=1),e.push({stationIndex:o,bendingSecantParam:Number(s.toFixed(4)),axialRetractionCos:Number(u.toFixed(4)),eulerElasticaArcRatio:Number(p.toFixed(4)),naiveLinearShearArcRatio:Number(g.toFixed(4)),kirchhoffRod64ArcRatio:Number(S.toFixed(4)),activeArcRatio:Number(_.toFixed(4)),arcElongationError:Number(x.toFixed(4))})}return{mode:t,stationCount:A,solidCount:E,station0ArcRatio:e[0].activeArcRatio,station4ArcRatio:e[4].activeArcRatio,station8ArcRatio:e[8].activeArcRatio,station12ArcRatio:e[12].activeArcRatio,station16ArcRatio:e[16].activeArcRatio,maxArcElongationPct:Number(a.toFixed(2)),stretchedStationCount:i,stations:e}}const n=document.querySelector("#app");n.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 180 · 190TH DEMO MILESTONE · EULER ELASTICA INEXTENSIBLE BENDING BENCH</p>
        <h1>Euler Elastica Inextensible Bending (<code>x'² + y'² = 1, L/L₀ = 1.0000×</code>) vs Naive Transverse Shear Stretching</h1>
        <p class="subtitle">
          58-solid 17-station cantilever rod &amp; foliage bench across bending secant parameter <code>u ∈ [0.0000, 1.0000]</code> (<code>cos θ = 1/(1+u)</code>).
          Leonhard Euler's (1744) inextensible Elastica law <code>(dx/ds, dy/ds) = (cos θ, sin θ)</code> retracts the axial coordinate as the tip deflects—locking total strand arc length at <code>L/L₀ = 1.0000×</code> across all 17 stations and eliminating the <code>sec θ = 1 + u</code> up to <code>2.0000×</code> rubbery length stretching of naive transverse-only vertex offsets (<code>pos.x += windOffset</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-euler" class="mode-btn active" type="button">Euler Inextensible Elastica (L/L₀=1.0000×)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Transverse Shear (sec θ=1+u Stretch)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Arc-Length Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">cos θ = 0.8000 (θ ≈ 36.9°)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Midpoint Arc Ratio (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">cos θ = 0.6667 (θ ≈ 48.2°)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 60°-Bend Arc Ratio (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">cos θ = 0.5000 (θ = 60.0°)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Stretched Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Stretch)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Bending Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Euler Elastica inextensible bending bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Strand Arc-Length Audit (<code>L(u) / L₀</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>cos θ</th>
                <th>Euler (1.0×)</th>
                <th>Naive (1+u)</th>
                <th>Active L/L₀</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const N=n.querySelector(".rig-shell"),T=n.querySelector("#rig-canvas"),X=n.querySelector("#station-tbody"),J=n.querySelector("#kpi-s04"),Q=n.querySelector("#kpi-s08"),Y=n.querySelector("#kpi-s16"),Z=n.querySelector("#kpi-violated"),F=n.querySelector("#btn-euler"),I=n.querySelector("#btn-naive"),tt=n.querySelector("#btn-theme"),h=new G;h.background=new C(725536);const b=new D(42,16/10,.1,100);b.position.set(0,6.2,14.8);b.lookAt(0,1.3,0);const k=new H({canvas:T,antialias:!0,preserveDrawingBuffer:!0});k.setPixelRatio(Math.min(window.devicePixelRatio,2));const et=new O(16777215,.78);h.add(et);const $=new U(16777215,1.15);$.position.set(8,14,10);h.add($);const r=new z;h.add(r);const f=new l(new w(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));f.position.set(0,-.25,0);r.add(f);for(let t=0;t<3;t++){const e=new l(new w(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),r.add(e)}for(let t=0;t<5;t++){const e=new l(new j(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),r.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,a=new l(new W(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));a.position.set(e,.5,-.95),r.add(a)}const q=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,a=new l(new K(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));a.position.set(e,1,.75),r.add(a),q.push(a)}const R=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,a=new l(new w(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));a.position.set(e,1,.75),r.add(a),R.push(a)}if(r.children.length!==E)throw new Error(`Expected ${E} solids, got ${r.children.length}`);let c="euler_elastica_inextensible_arc_retraction",y=v(c);function m(t){y=t,F.classList.toggle("active",t.mode==="euler_elastica_inextensible_arc_retraction"),I.classList.toggle("active",t.mode==="naive_linear_transverse_shear_stretch"),J.textContent=`${t.station4ArcRatio.toFixed(4)}×`,Q.textContent=`${t.station8ArcRatio.toFixed(4)}×`,Y.textContent=`${t.station16ArcRatio.toFixed(4)}×`,Z.textContent=`${t.stretchedStationCount} / 17 (+${t.maxArcElongationPct.toFixed(2)}% Stretch)`,X.innerHTML=t.stations.map(e=>`
      <tr class="${e.arcElongationError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.bendingSecantParam.toFixed(4)}</td>
        <td>${e.axialRetractionCos.toFixed(4)}</td>
        <td>${e.eulerElasticaArcRatio.toFixed(4)}×</td>
        <td>${e.naiveLinearShearArcRatio.toFixed(4)}×</td>
        <td><strong>${e.activeArcRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const a=t.stations[e],i=q[e],o=i.material;i.position.y=a.activeArcRatio;const s=.85+.3*Math.min(2,a.activeArcRatio);i.scale.setScalar(s),o.color.setHex(a.arcElongationError>1e-4?16347926:1096065)}for(let e=0;e<R.length;e++){const a=e+2,i=t.stations[a],o=R[e],s=Math.abs(i.activeArcRatio-1);s<1e-4?(o.scale.set(1,.02,1),o.position.y=1,o.material.color.setHex(1096065)):(o.scale.set(1,s,1),o.position.y=1+s*.5,o.material.color.setHex(15680580))}L()}function B(){const t=T.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),a=Math.max(300,Math.floor(t.height));k.setSize(e,a,!1),b.aspect=e/a,b.updateProjectionMatrix(),L()}function L(){k.render(h,b)}function P(t){N.dataset.theme=t,h.background=new C(t==="light"?16317180:725536),f.material.color.setHex(t==="light"?13358561:1976635),L()}F.addEventListener("click",()=>{c="euler_elastica_inextensible_arc_retraction",m(v(c))});I.addEventListener("click",()=>{c="naive_linear_transverse_shear_stretch",m(v(c))});tt.addEventListener("click",()=>{const t=N.dataset.theme==="light"?"dark":"light";P(t)});window.addEventListener("resize",B);B();m(y);window.__eulerElasticaRig={getSnapshot:()=>y,setMode:t=>{c=t;const e=v(t);return m(e),e},setTheme:P};
