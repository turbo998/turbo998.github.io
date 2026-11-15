import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as B,c as q,P as I,W as G,A as j,D as O,G as U,b as u,B as C,M as p,T as Z,C as W,a as Q}from"./three.module-7AmyneiW.js";const w=17,R=58;function V(t){const i=1/(1+Math.min(1,Math.max(0,t))),o=Math.sqrt(Math.max(0,1-i*i)),a=64,s=1e-4,c=Math.max(-.999,o-.5*s),g=Math.min(.999,c+s),b=(g-c)/a;let x=0;for(let l=0;l<a;l++){const d=c+(l+.5)*b,y=Math.sqrt(Math.max(1e-12,1-d*d)),z=b/y;x+=y*z}return x/(g-c)}function S(t){const e=[];let i=0,o=0;for(let a=0;a<w;a++){const s=a/(w-1),c=1/(1+s),g=1,b=1/c,x=V(s),l=t==="archimedes_hatbox_axial_equal_area"?g:b,d=Math.abs(l-1),y=d*100;y>i&&(i=y),d>1e-5&&(o+=1),e.push({stationIndex:a,latitudeCompressionParam:Number(s.toFixed(4)),sinThetaParallelRadius:Number(c.toFixed(4)),archimedesDensityRatio:Number(g.toFixed(4)),naiveEquirectangularDensityRatio:Number(b.toFixed(4)),sphericalZone64DensityRatio:Number(x.toFixed(4)),activeDensityRatio:Number(l.toFixed(4)),jacobianPinchError:Number(d.toFixed(4))})}return{mode:t,stationCount:w,solidCount:R,station0DensityRatio:e[0].activeDensityRatio,station4DensityRatio:e[4].activeDensityRatio,station8DensityRatio:e[8].activeDensityRatio,station12DensityRatio:e[12].activeDensityRatio,station16DensityRatio:e[16].activeDensityRatio,maxPolarCrowdingPct:Number(i.toFixed(2)),pinchedStationCount:o,stations:e}}const n=document.querySelector("#app");n.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 176 · 186TH DEMO · ARCHIMEDES HAT-BOX CYLINDRICAL EQUAL-AREA BENCH</p>
        <h1>Archimedes Hat-Box Cylindrical Equal-Area Sampling (<code>z = 1−2ξ₁, D = 1.0000×</code>) vs Naive Equirectangular Polar Pinching</h1>
        <p class="subtitle">
          58-solid 17-station spherical-to-cylindrical projection bench across latitudinal parallel compression <code>u ∈ [0.0000, 1.0000]</code> (<code>sin θ = 1/(1+u)</code>).
          Archimedes of Syracuse's (c. 225 BCE) Hat-Box Theorem proves that horizontal radial projection from a sphere to its circumscribing cylinder cancels parallel-circle shrinkage <code>sin θ</code> against slant-height stretching <code>1/sin θ</code>—locking solid-angle sample density at <code>D = 1.0000×</code> across all 17 stations and eliminating the <code>1 + u</code> up to <code>2.0000×</code> polar sample crowding of naive equirectangular <code>(θ, φ)</code> grids.
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-archimedes" class="mode-btn active" type="button">Archimedes Hat-Box (z=cos θ, D=1.0000×)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Equirectangular (θ=πξ₁ Pinching)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Sample Density (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">sin θ = 0.8000</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Mid-Latitude Density (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">sin θ = 0.6667</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 High-Latitude Density (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">sin θ = 0.5000 (θ = 30°)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Pinched Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Crowding)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Latitude Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Archimedes Hat-Box cylindrical equal-area bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Solid-Angle Density Audit (<code>D(u) = dN / dΩ</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>sin θ</th>
                <th>Archimedes</th>
                <th>Naive (1+u)</th>
                <th>Active D(u)</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const P=n.querySelector(".rig-shell"),A=n.querySelector("#rig-canvas"),X=n.querySelector("#station-tbody"),Y=n.querySelector("#kpi-s04"),J=n.querySelector("#kpi-s08"),K=n.querySelector("#kpi-s16"),tt=n.querySelector("#kpi-violated"),T=n.querySelector("#btn-archimedes"),L=n.querySelector("#btn-naive"),et=n.querySelector("#btn-theme"),m=new B;m.background=new q(725536);const v=new I(42,16/10,.1,100);v.position.set(0,6.2,14.8);v.lookAt(0,1.3,0);const M=new G({canvas:A,antialias:!0,preserveDrawingBuffer:!0});M.setPixelRatio(Math.min(window.devicePixelRatio,2));const it=new j(16777215,.78);m.add(it);const N=new O(16777215,1.15);N.position.set(8,14,10);m.add(N);const r=new U;m.add(r);const _=new u(new C(16.4,.45,5.2),new p({color:1976635,roughness:.4,metalness:.3}));_.position.set(0,-.25,0);r.add(_);for(let t=0;t<3;t++){const e=new u(new C(15.8,.08,.12),new p({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),r.add(e)}for(let t=0;t<5;t++){const e=new u(new Z(2.15,.06,12,36,Math.PI),new p({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),r.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,i=new u(new W(.16,.16,1,20),new p({color:959977,roughness:.3,metalness:.4}));i.position.set(e,.5,-.95),r.add(i)}const F=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,i=new u(new Q(.24,24,24),new p({color:1096065,roughness:.25,metalness:.35}));i.position.set(e,1,.75),r.add(i),F.push(i)}const k=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,i=new u(new C(.12,1,.12),new p({color:15680580,roughness:.3,metalness:.3}));i.position.set(e,1,.75),r.add(i),k.push(i)}if(r.children.length!==R)throw new Error(`Expected ${R} solids, got ${r.children.length}`);let h="archimedes_hatbox_axial_equal_area",f=S(h);function D(t){f=t,T.classList.toggle("active",t.mode==="archimedes_hatbox_axial_equal_area"),L.classList.toggle("active",t.mode==="naive_equirectangular_latlon_pinching"),Y.textContent=`${t.station4DensityRatio.toFixed(4)}×`,J.textContent=`${t.station8DensityRatio.toFixed(4)}×`,K.textContent=`${t.station16DensityRatio.toFixed(4)}×`,tt.textContent=`${t.pinchedStationCount} / 17 (+${t.maxPolarCrowdingPct.toFixed(2)}% Crowding)`,X.innerHTML=t.stations.map(e=>`
      <tr class="${e.jacobianPinchError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.latitudeCompressionParam.toFixed(4)}</td>
        <td>${e.sinThetaParallelRadius.toFixed(4)}</td>
        <td>${e.archimedesDensityRatio.toFixed(4)}×</td>
        <td>${e.naiveEquirectangularDensityRatio.toFixed(4)}×</td>
        <td><strong>${e.activeDensityRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const i=t.stations[e],o=F[e],a=o.material;o.position.y=i.activeDensityRatio;const s=.85+.3*Math.min(2,i.activeDensityRatio);o.scale.setScalar(s),a.color.setHex(i.jacobianPinchError>1e-4?16347926:1096065)}for(let e=0;e<k.length;e++){const i=e+2,o=t.stations[i],a=k[e],s=Math.abs(o.activeDensityRatio-1);s<1e-4?(a.scale.set(1,.02,1),a.position.y=1,a.material.color.setHex(1096065)):(a.scale.set(1,s,1),a.position.y=1+s*.5,a.material.color.setHex(15680580))}E()}function H(){const t=A.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),i=Math.max(300,Math.floor(t.height));M.setSize(e,i,!1),v.aspect=e/i,v.updateProjectionMatrix(),E()}function E(){M.render(m,v)}function $(t){P.dataset.theme=t,m.background=new q(t==="light"?16317180:725536),_.material.color.setHex(t==="light"?13358561:1976635),E()}T.addEventListener("click",()=>{h="archimedes_hatbox_axial_equal_area",D(S(h))});L.addEventListener("click",()=>{h="naive_equirectangular_latlon_pinching",D(S(h))});et.addEventListener("click",()=>{const t=P.dataset.theme==="light"?"dark":"light";$(t)});window.addEventListener("resize",H);H();D(f);window.__archimedesCylindricalRig={getSnapshot:()=>f,setMode:t=>{h=t;const e=S(t);return D(e),e},setTheme:$};
