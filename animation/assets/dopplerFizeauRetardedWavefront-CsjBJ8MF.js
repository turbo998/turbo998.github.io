import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as q,c as D,P as H,W as O,A,D as G,G as I,b as l,B as x,M as d,T as U,C as V,a as j}from"./three.module-7AmyneiW.js";const g=17,b=58;function Z(e){const t=Math.min(1,Math.max(0,e)),n=1-t/(1+t);let a=1;for(let s=0;s<64;s++)a=n+.25*(a-n);return a/n}function u(e){const t=[];let o=0,n=0;for(let a=0;a<g;a++){const s=a/(g-1),$=s/(1+s),k=1,_=1+s,z=Z(s),f=e==="doppler_fizeau_retarded_bow_compression"?k:_,m=Math.abs(f-1),W=m*100;W>o&&(o=W),m>1e-5&&(n+=1),t.push({stationIndex:a,compressionBoostParam:Number(s.toFixed(4)),machVelocityRatio:Number($.toFixed(4)),dopplerWavelengthRatio:Number(k.toFixed(4)),naiveBullseyeWavelengthRatio:Number(_.toFixed(4)),retardedNewton64Ratio:Number(z.toFixed(4)),activeWavelengthRatio:Number(f.toFixed(4)),bowDecompressionError:Number(m.toFixed(4))})}return{mode:e,stationCount:g,solidCount:b,station0WavelengthRatio:t[0].activeWavelengthRatio,station4WavelengthRatio:t[4].activeWavelengthRatio,station8WavelengthRatio:t[8].activeWavelengthRatio,station12WavelengthRatio:t[12].activeWavelengthRatio,station16WavelengthRatio:t[16].activeWavelengthRatio,maxDecompressionPct:Number(o.toFixed(2)),uncompressedStationCount:n,stations:t}}const i=document.querySelector("#app");i.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 186 · 196TH DEMO · DOPPLER-FIZEAU RETARDED WAVEFRONT BENCH</p>
        <h1>Doppler-Fizeau Moving-Source Bow Compression (<code>λ_front = λ₀(1−M), λ/λ_ex = 1.0000×</code>) vs Rigid Bullseye Wave</h1>
        <p class="subtitle">
          58-solid 17-station moving-emitter wavefront bench across Doppler compression boost <code>u ∈ [0.0000, 1.0000]</code> (Mach ratio <code>M = v_s/c = u/(1+u) ∈ [0.00, 0.50]</code>).
          Christian Doppler (1842) &amp; Hippolyte Fizeau (1848) retarded-time wavefront compression <code>λ_front = λ₀(1 − M)</code> compresses forward bow-wave spacing—locking predicted-to-exact wavelength at <code>λ/λ_exact = 1.0000×</code> across all 17 stations and eliminating the <code>1/(1 − M) = 1 + u</code> up to <code>2.0000×</code> bow-wave decompression error of naive rigidly translated bullseye shaders (<code>sin(k₀‖x − x_s(t)‖ − ω₀t)</code>).
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-doppler" class="mode-btn active" type="button">Doppler-Fizeau Retarded (λ_front=λ₀(1−M))</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Rigid Bullseye (λ=λ₀ Uncompressed)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Bow Wavelength (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">Mach M = 0.2000 · 1−M = 0.80</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Midpoint Wavelength (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">Mach M = 0.3333 · 1−M = 0.67</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Half-Speed Bow (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">Mach M = 0.5000 · 1−M = 0.50</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Uncompressed Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Error)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Mach Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Doppler-Fizeau retarded wavefront compression bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Forward Bow-Wave Audit (<code>λ_model / λ_exact</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>Mach M</th>
                <th>Doppler</th>
                <th>Naive (1+u)</th>
                <th>Active λ/λ_ex</th>
              </tr>
            </thead>
            <tbody id="station-tbody"></tbody>
          </table>
        </div>
      </aside>
    </main>
  </div>
`;const F=i.querySelector(".rig-shell"),E=i.querySelector("#rig-canvas"),J=i.querySelector("#station-tbody"),K=i.querySelector("#kpi-s04"),Q=i.querySelector("#kpi-s08"),X=i.querySelector("#kpi-s16"),Y=i.querySelector("#kpi-violated"),N=i.querySelector("#btn-doppler"),C=i.querySelector("#btn-naive"),ee=i.querySelector("#btn-theme"),p=new q;p.background=new D(725536);const h=new H(42,16/10,.1,100);h.position.set(0,6.2,14.8);h.lookAt(0,1.3,0);const R=new O({canvas:E,antialias:!0,preserveDrawingBuffer:!0});R.setPixelRatio(Math.min(window.devicePixelRatio,2));const te=new A(16777215,.78);p.add(te);const P=new G(16777215,1.15);P.position.set(8,14,10);p.add(P);const r=new I;p.add(r);const S=new l(new x(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));S.position.set(0,-.25,0);r.add(S);for(let e=0;e<3;e++){const t=new l(new x(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));t.position.set(0,1+e*1,-1.55),r.add(t)}for(let e=0;e<5;e++){const t=new l(new U(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));t.position.set(-6+e*3,0,-.35),r.add(t)}for(let e=0;e<17;e++){const t=-7.2+e*.9,o=new l(new V(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));o.position.set(t,.5,-.95),r.add(o)}const B=[];for(let e=0;e<17;e++){const t=-7.2+e*.9,o=new l(new j(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));o.position.set(t,1,.75),r.add(o),B.push(o)}const w=[];for(let e=2;e<17;e++){const t=-7.2+e*.9,o=new l(new x(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));o.position.set(t,1,.75),r.add(o),w.push(o)}if(r.children.length!==b)throw new Error(`Expected ${b} solids, got ${r.children.length}`);let c="doppler_fizeau_retarded_bow_compression",y=u(c);function v(e){y=e,N.classList.toggle("active",e.mode==="doppler_fizeau_retarded_bow_compression"),C.classList.toggle("active",e.mode==="naive_rigid_bullseye_uncompressed_wave"),K.textContent=`${e.station4WavelengthRatio.toFixed(4)}×`,Q.textContent=`${e.station8WavelengthRatio.toFixed(4)}×`,X.textContent=`${e.station16WavelengthRatio.toFixed(4)}×`,Y.textContent=`${e.uncompressedStationCount} / 17 (+${e.maxDecompressionPct.toFixed(2)}% Error)`,J.innerHTML=e.stations.map(t=>`
      <tr class="${t.bowDecompressionError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(t.stationIndex).padStart(2,"0")}</td>
        <td>${t.compressionBoostParam.toFixed(4)}</td>
        <td>${t.machVelocityRatio.toFixed(4)}</td>
        <td>${t.dopplerWavelengthRatio.toFixed(4)}×</td>
        <td>${t.naiveBullseyeWavelengthRatio.toFixed(4)}×</td>
        <td><strong>${t.activeWavelengthRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let t=0;t<17;t++){const o=e.stations[t],n=B[t],a=n.material;n.position.y=o.activeWavelengthRatio;const s=.85+.3*Math.min(2,o.activeWavelengthRatio);n.scale.setScalar(s),a.color.setHex(o.bowDecompressionError>1e-4?16347926:1096065)}for(let t=0;t<w.length;t++){const o=t+2,n=e.stations[o],a=w[t],s=Math.abs(n.activeWavelengthRatio-1);s<1e-4?(a.scale.set(1,.02,1),a.position.y=1,a.material.color.setHex(1096065)):(a.scale.set(1,s,1),a.position.y=1+s*.5,a.material.color.setHex(15680580))}M()}function L(){const e=E.parentElement.getBoundingClientRect(),t=Math.max(320,Math.floor(e.width)),o=Math.max(300,Math.floor(e.height));R.setSize(t,o,!1),h.aspect=t/o,h.updateProjectionMatrix(),M()}function M(){R.render(p,h)}function T(e){F.dataset.theme=e,p.background=new D(e==="light"?16317180:725536),S.material.color.setHex(e==="light"?13358561:1976635),M()}N.addEventListener("click",()=>{c="doppler_fizeau_retarded_bow_compression",v(u(c))});C.addEventListener("click",()=>{c="naive_rigid_bullseye_uncompressed_wave",v(u(c))});ee.addEventListener("click",()=>{const e=F.dataset.theme==="light"?"dark":"light";T(e)});window.addEventListener("resize",L);L();v(y);window.__dopplerFizeauRig={getSnapshot:()=>y,setMode:e=>{c=e;const t=u(e);return v(t),t},setTheme:T};
