import"./modulepreload-polyfill-B5Qt9EMX.js";import{S as G,c as T,P as I,W as O,A as B,D as V,G as z,b as l,B as y,M as d,T as j,C as W,a as J}from"./three.module-7AmyneiW.js";const b=17,g=58;function K(t){const i=1+0*Math.min(1,Math.max(0,t)),n=64;let o=0;for(let a=0;a<n;a++)o+=i/n;return o/i}function v(t){const e=[];let i=0,n=0;for(let o=0;o<b;o++){const a=o/(b-1),w=(1-a)/(1+a),C=.5*(1+w),_=1,M=1/C,U=K(a),D=t==="euler_meusnier_directional_principal_curvature"?_:M,h=Math.abs(D-1),E=h*100;E>i&&(i=E),h>1e-5&&(n+=1),e.push({stationIndex:o,anisotropyDilutionParam:Number(a.toFixed(4)),secondaryToPrimaryRatio:Number(w.toFixed(4)),meanToPrimaryRatio:Number(C.toFixed(4)),eulerPrincipalRatio:Number(_.toFixed(4)),naiveMeanDeficitRatio:Number(M.toFixed(4)),osculating64Ratio:Number(U.toFixed(4)),activeCurvatureRatio:Number(D.toFixed(4)),curvatureDeficitError:Number(h.toFixed(4))})}return{mode:t,stationCount:b,solidCount:g,station0Ratio:e[0].activeCurvatureRatio,station4Ratio:e[4].activeCurvatureRatio,station8Ratio:e[8].activeCurvatureRatio,station12Ratio:e[12].activeCurvatureRatio,station16Ratio:e[16].activeCurvatureRatio,maxCurvatureDeficitPct:Number(i.toFixed(2)),dilutedStationCount:n,stations:e}}const r=document.querySelector("#app");r.innerHTML=`
  <div class="rig-shell" data-theme="dark">
    <header class="rig-header">
      <div>
        <p class="eyebrow">ROUND 188 · 198TH DEMO · EULER-MEUSNIER DIRECTIONAL NORMAL CURVATURE BENCH</p>
        <h1>Euler-Meusnier Directional Normal Curvature (<code>κ_n(φ) = κ₁cos²φ + κ₂sin²φ, κ₁/κ_model = 1.0000×</code>) vs Mean Curvature Dilution</h1>
        <p class="subtitle">
          58-solid 17-station differential-geometry bench across principal-curvature anisotropy <code>u ∈ [0.0000, 1.0000]</code> (<code>H/κ₁ = 1/(1+u)</code>, from sphere <code>κ₂=κ₁</code> to cylinder <code>κ₂=0</code>).
          Leonhard Euler (1760) &amp; Jean-Baptiste Meusnier (1776) directional normal curvature tensor preserves full principal curvature <code>κ₁</code> along the bend axis—locking <code>κ₁/κ_model = 1.0000×</code> across all 17 stations and eliminating the <code>κ₁/H = 1 + u</code> up to <code>2.0000×</code> cylindrical curvature dilution of naive scalar mean curvature <code>H = ½(κ₁ + κ₂)</code>.
        </p>
      </div>
      <div class="rig-controls">
        <button id="btn-euler" class="mode-btn active" type="button">Euler-Meusnier Tensor (κ_n = κ₁cos²φ+κ₂sin²φ)</button>
        <button id="btn-naive" class="mode-btn" type="button">Naive Scalar Mean H = ½(κ₁+κ₂) (1+u Deficit)</button>
        <button id="btn-theme" class="mode-btn theme-btn" type="button">Switch Theme</button>
      </div>
    </header>

    <section class="kpi-strip" aria-label="Telemetry readouts">
      <div class="kpi-card">
        <span class="kpi-label">S04 Curvature Ratio (u = 0.25)</span>
        <strong id="kpi-s04">1.0000×</strong>
        <span class="kpi-sub">κ₂/κ₁ = 0.6000 · H/κ₁ = 0.80</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S08 Mid-Anisotropy Ratio (u = 0.50)</span>
        <strong id="kpi-s08">1.0000×</strong>
        <span class="kpi-sub">κ₂/κ₁ = 0.3333 · H/κ₁ = 0.67</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">S16 Cylinder Hoop Ratio (u = 1.00)</span>
        <strong id="kpi-s16">1.0000×</strong>
        <span class="kpi-sub">κ₂ = 0.0000 · H = ½ κ₁ (Cylinder)</span>
      </div>
      <div class="kpi-card">
        <span class="kpi-label">Diluted Stations / 58 Solids</span>
        <strong id="kpi-violated">0 / 17 (+0.00% Deficit)</strong>
        <span class="kpi-sub">58 3D Solids · 17 Anisotropy Stations</span>
      </div>
    </section>

    <main class="rig-main">
      <div class="canvas-panel">
        <canvas id="rig-canvas" aria-label="58-solid 3D Euler-Meusnier normal curvature bench"></canvas>
      </div>
      <aside class="table-panel">
        <h2>17-Station Principal Curvature Audit (<code>κ₁ / κ_model</code>)</h2>
        <div class="table-scroll">
          <table>
            <thead>
              <tr>
                <th>Station</th>
                <th>u</th>
                <th>κ₂ / κ₁</th>
                <th>Euler (1.0×)</th>
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
`;const N=r.querySelector(".rig-shell"),P=r.querySelector("#rig-canvas"),Q=r.querySelector("#station-tbody"),X=r.querySelector("#kpi-s04"),Y=r.querySelector("#kpi-s08"),Z=r.querySelector("#kpi-s16"),tt=r.querySelector("#kpi-violated"),F=r.querySelector("#btn-euler"),L=r.querySelector("#btn-naive"),et=r.querySelector("#btn-theme"),u=new G;u.background=new T(725536);const p=new I(42,16/10,.1,100);p.position.set(0,6.2,14.8);p.lookAt(0,1.3,0);const S=new O({canvas:P,antialias:!0,preserveDrawingBuffer:!0});S.setPixelRatio(Math.min(window.devicePixelRatio,2));const it=new B(16777215,.78);u.add(it);const H=new V(16777215,1.15);H.position.set(8,14,10);u.add(H);const s=new z;u.add(s);const x=new l(new y(16.4,.45,5.2),new d({color:1976635,roughness:.4,metalness:.3}));x.position.set(0,-.25,0);s.add(x);for(let t=0;t<3;t++){const e=new l(new y(15.8,.08,.12),new d({color:3718648,roughness:.3,metalness:.5}));e.position.set(0,1+t*1,-1.55),s.add(e)}for(let t=0;t<5;t++){const e=new l(new j(2.15,.06,12,36,Math.PI),new d({color:6514417,roughness:.35,metalness:.45}));e.position.set(-6+t*3,0,-.35),s.add(e)}for(let t=0;t<17;t++){const e=-7.2+t*.9,i=new l(new W(.16,.16,1,20),new d({color:959977,roughness:.3,metalness:.4}));i.position.set(e,.5,-.95),s.add(i)}const $=[];for(let t=0;t<17;t++){const e=-7.2+t*.9,i=new l(new J(.24,24,24),new d({color:1096065,roughness:.25,metalness:.35}));i.position.set(e,1,.75),s.add(i),$.push(i)}const R=[];for(let t=2;t<17;t++){const e=-7.2+t*.9,i=new l(new y(.12,1,.12),new d({color:15680580,roughness:.3,metalness:.3}));i.position.set(e,1,.75),s.add(i),R.push(i)}if(s.children.length!==g)throw new Error(`Expected ${g} solids, got ${s.children.length}`);let c="euler_meusnier_directional_principal_curvature",f=v(c);function m(t){f=t,F.classList.toggle("active",t.mode==="euler_meusnier_directional_principal_curvature"),L.classList.toggle("active",t.mode==="naive_isotropic_mean_curvature_dilution"),X.textContent=`${t.station4Ratio.toFixed(4)}×`,Y.textContent=`${t.station8Ratio.toFixed(4)}×`,Z.textContent=`${t.station16Ratio.toFixed(4)}×`,tt.textContent=`${t.dilutedStationCount} / 17 (+${t.maxCurvatureDeficitPct.toFixed(2)}% Deficit)`,Q.innerHTML=t.stations.map(e=>`
      <tr class="${e.curvatureDeficitError>1e-4?"row-violated":"row-conserved"}">
        <td>S${String(e.stationIndex).padStart(2,"0")}</td>
        <td>${e.anisotropyDilutionParam.toFixed(4)}</td>
        <td>${e.secondaryToPrimaryRatio.toFixed(4)}</td>
        <td>${e.eulerPrincipalRatio.toFixed(4)}×</td>
        <td>${e.naiveMeanDeficitRatio.toFixed(4)}×</td>
        <td><strong>${e.activeCurvatureRatio.toFixed(4)}×</strong></td>
      </tr>
    `).join("");for(let e=0;e<17;e++){const i=t.stations[e],n=$[e],o=n.material;n.position.y=i.activeCurvatureRatio;const a=.85+.3*Math.min(2,i.activeCurvatureRatio);n.scale.setScalar(a),o.color.setHex(i.curvatureDeficitError>1e-4?16347926:1096065)}for(let e=0;e<R.length;e++){const i=e+2,n=t.stations[i],o=R[e],a=Math.abs(n.activeCurvatureRatio-1);a<1e-4?(o.scale.set(1,.02,1),o.position.y=1,o.material.color.setHex(1096065)):(o.scale.set(1,a,1),o.position.y=1+a*.5,o.material.color.setHex(15680580))}k()}function A(){const t=P.parentElement.getBoundingClientRect(),e=Math.max(320,Math.floor(t.width)),i=Math.max(300,Math.floor(t.height));S.setSize(e,i,!1),p.aspect=e/i,p.updateProjectionMatrix(),k()}function k(){S.render(u,p)}function q(t){N.dataset.theme=t,u.background=new T(t==="light"?16317180:725536),x.material.color.setHex(t==="light"?13358561:1976635),k()}F.addEventListener("click",()=>{c="euler_meusnier_directional_principal_curvature",m(v(c))});L.addEventListener("click",()=>{c="naive_isotropic_mean_curvature_dilution",m(v(c))});et.addEventListener("click",()=>{const t=N.dataset.theme==="light"?"dark":"light";q(t)});window.addEventListener("resize",A);A();m(f);window.__eulerMeusnierRig={getSnapshot:()=>f,setMode:t=>{c=t;const e=v(t);return m(e),e},setTheme:q};
