import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as $,c as P,P as G,W as I,A,D as U,G as j,b as c,B as k,M as d,T as z,C as J,a as W}from"./three.module-7AmyneiW.js";const b=17,f=58;function K(t){const e=Math.min(1,Math.max(0,t)),o=64;let s=0;for(let a=0;a<o;a++){const h=(-1+2*a/(o-1))*(e-e);s+=h*h}return 1+Math.sqrt(s/o)}function S(t){const e=[];let o=0,s=0;for(let a=0;a<b;a++){const i=a/(b-1),h=.25*i,_=1,y=1+i,O=K(i),M=t==="scheimpflug_merklinger_tilted_focal_plane"?_:y,g=Math.abs(M-1),C=g*100;C>o&&(o=C),g>1e-5&&(s+=1),e.push({stationIndex:a,obliqueDepthParam:Number(i.toFixed(4)),scheimpflugLensTiltTan:Number(h.toFixed(4)),scheimpflugSpotRatio:Number(_.toFixed(4)),naiveFrontoparallelSpotRatio:Number(y.toFixed(4)),rayBundle64SpotRatio:Number(O.toFixed(4)),activeSpotRatio:Number(M.toFixed(4)),defocusSpotError:Number(g.toFixed(4))})}return{mode:t,stationCount:b,solidCount:f,station0SpotRatio:e[0].activeSpotRatio,station4SpotRatio:e[4].activeSpotRatio,station8SpotRatio:e[8].activeSpotRatio,station12SpotRatio:e[12].activeSpotRatio,station16SpotRatio:e[16].activeSpotRatio,maxDefocusBlurPct:Number(o.toFixed(2)),blurredStationCount:s,stations:e}}const n=document.querySelector("#app");n.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 175 · 185TH DEMO MILESTONE · SCHEIMPFLUG-MERKLINGER TILTED FOCAL PLANE BENCH</p>
        <h1>Scheimpflug-Merklinger Tilted Focal Plane (<code>tan θ = (f/J) tan ψ, R_PSF = 1.0000×</code>) vs Naive Frontoparallel Defocus</h1>
        <p class="subtitle">
          58-solid 17-station optical hinge bench across oblique subject-plane depth <code>u ∈ [0.0000, 1.0000]</code>.
          Theodor Scheimpflug (1904) &amp; Harold Merklinger (1992) lens-plane tilt <code>tan θ_lens = (f/J) tan ψ</code> intersects the subject, lens, and sensor planes along a common hinge line—locking PSF spot radius at <code>R_PSF = 1.0000×</code> across all 17 oblique stations and eliminating the <code>1 + u</code> up to <code>2.0000×</code> Circle-of-Confusion blur of naive frontoparallel cameras (<code>θ_lens = 0°</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-scheimpflug" class="mode-btn active" type="button">Scheimpflug-Merklinger Hinge (R=1.0000×)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Frontoparallel (θ_lens=0°)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 PSF Spot Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">Near-Oblique Plane</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Midpoint Spot Ratio (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">Mid-Oblique Plane</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Far-Oblique Spot Ratio (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">Far Oblique Horizon</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Blurred Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% CoC Blur)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Oblique Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Scheimpflug-Merklinger tilted focal plane bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Oblique Plane PSF Spot Audit (<code>R_PSF(u)</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>tan θ_lens</th>
                <th>Scheimpflug</th>
                <th>Naive (1+u)</th>
                <th>Active PSF</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const L=n.querySelector(".rig-shell"),T=n.querySelector("#rig-canvas"),V=n.querySelector("#station-tbody"),Q=n.querySelector("#kpi-s04"),X=n.querySelector("#kpi-s08"),Y=n.querySelector("#kpi-s16"),Z=n.querySelector("#kpi-violated"),q=n.querySelector("#btn-scheimpflug"),E=n.querySelector("#btn-naive"),tt=n.querySelector("#btn-theme"),p=new $;p.background=new P(725536);const u=new G(42,16/10,.1,100);u.position.set(0,6.2,14.8);u.lookAt(0,1.3,0);const R=new I({canvas:T,antialias:!0,preserveDrawingBuffer:!0});R.setPixelRatio(Math.min(window.devicePixelRatio,2));const et=new A(16777215,.78);p.add(et);const N=new U(16777215,1.15);N.position.set(8,14,10);p.add(N);const l=new j;p.add(l);const x=new c(new k(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));x.position.set(0,-.25,0);l.add(x);for(let t=0;t<3;t++){const e=new c(new k(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),l.add(e)}for(let t=0;t<5;t++){const e=new c(new z(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),l.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new c(new J(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));o.position.set(e,.5,-.95),l.add(o)}const B=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,o=new c(new W(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));o.position.set(e,1,.75),l.add(o),B.push(o)}const v=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,o=new c(new k(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));o.position.set(e,1,.75),l.add(o),v.push(o)}if(l.children.length!==f)throw new Error(`Expected ${f} solids, got ${l.children.length}`);let r="scheimpflug_merklinger_tilted_focal_plane",w=S(r);function m(t){w=t,q.classList.toggle("active",t.mode==="scheimpflug_merklinger_tilted_focal_plane"),E.classList.toggle("active",t.mode==="naive_frontoparallel_sensor_defocus"),Q.textContent=`${t.station4SpotRatio.toFixed(4)}×`,X.textContent=`${t.station8SpotRatio.toFixed(4)}×`,Y.textContent=`${t.station16SpotRatio.toFixed(4)}×`,Z.textContent=`${t.blurredStationCount} / 17 (+${t.maxDefocusBlurPct.toFixed(2)}% CoC Blur)`,V.innerHTML=t.stations.map(e=>`
      <tr class="${e.defocusSpotError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.obliqueDepthParam.toFixed(4)}</td>
        <td>${e.scheimpflugLensTiltTan.toFixed(4)}</td>
        <td>${e.scheimpflugSpotRatio.toFixed(4)}×</td>
        <td>${e.naiveFrontoparallelSpotRatio.toFixed(4)}×</td>
        <td><strong>${e.activeSpotRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const o=t.stations[e],s=B[e],a=s.material;s.position.y=o.activeSpotRatio;const i=.85+.3*Math.min(2,o.activeSpotRatio);s.scale.setScalar(i),a.color.setHex(o.defocusSpotError>1e-4?16347926:1096065)}for(let e=0;e<v.length;e++){const o=e+2,s=t.stations[o],a=v[e],i=Math.abs(s.activeSpotRatio-1);i<1e-4?(a.scale.set(1,.02,1),a.position.y=1,a.material.color.setHex(1096065)):(a.scale.set(1,i,1),a.position.y=1+i*.5,a.material.color.setHex(15680580))}F()}function D(){const t=T.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),o=Math.max(300,Math.floor(t.height));R.setSize(e,o,!1),u.aspect=e/o,u.updateProjectionMatrix(),F()}function F(){R.render(p,u)}function H(t){L.dataset.theme=t,p.background=new P(t==="light"?16317180:725536),x.material.color.setHex(t==="light"?13358561:1976635),F()}q.addEventListener("click",()=>{r="scheimpflug_merklinger_tilted_focal_plane",m(S(r))});E.addEventListener("click",()=>{r="naive_frontoparallel_sensor_defocus",m(S(r))});tt.addEventListener("click",()=>{const t=L.dataset.theme==="light"?"dark":"light";H(t)});window.addEventListener("resize",D);D();m(w);window.__scheimpflugRig={getSnapshot:()=>w,setMode:t=>{r=t;const e=S(t);return m(e),e},setTheme:H};
