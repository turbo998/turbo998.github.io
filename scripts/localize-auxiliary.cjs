'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const professional=require('./professional-navigation.cjs');
const root=path.resolve(__dirname,'..');
const source='workshops/azure-vm-modernization/index.html';
const gitShow=(rev,file)=>execFileSync('git',['show',`${rev}:${file}`],{cwd:root,encoding:'utf8'});

const foleyDemoReplacements=[
  ['Native Audio-Visual Joint DiT &amp; FramePack Foley Studio · 原生音画联合扩散与物理拟音导演台','Native Audio-Visual Joint DiT &amp; FramePack Foley Studio · Joint Diffusion &amp; Physical Foley Director'],
  ['原生音画联合扩散与物理拟音导演台','Joint Audio-Visual Diffusion &amp; Physical Foley Director'],
  ['Wet Asphalt (积水沥青)','Wet Asphalt (Damped Splash)'],
  ['Steel Grate (空腔钢格栅)','Steel Grate (Hollow Metallic)'],
  ['Titanium Anvil (钛合金砧面)','Titanium Anvil (High-Q Ring)'],
  ['Studio Vocal (近场人声电容麦)','Studio Vocal (Near-Field Condenser)'],
  ['⏸ 暂停 (Pause)','⏸ Pause'],
  ['▶ 播放 (Play)','▶ Play'],
  ['🔊 WebAudio 拟音已开启','🔊 WebAudio Foley Active'],
  ['🔇 开启 WebAudio 实时物理拟音','🔇 Enable WebAudio Physical Foley'],
  ['🔊 开启 WebAudio 实时物理拟音','🔊 Enable WebAudio Physical Foley'],
  ['✅ 已复制 AUDIOVISUAL_FOLEY_SPEC.json','✅ Copied AUDIOVISUAL_FOLEY_SPEC.json'],
  ['← 实验室门户','← Lab Portal'],
  ['⚡ 注入物理碰撞冲量 J_c','⚡ Inject Contact Impulse J_c'],
  ['📋 导出 AUDIOVISUAL_FOLEY_SPEC.json','📋 Export AUDIOVISUAL_FOLEY_SPEC.json'],
  ['📊 7-Card 4:5 评测报告','📊 7-Card 4:5 Benchmark Report'],
  ['📖 架构研究专著','📖 Architecture Study'],
  ['1. 音画同步测试场景 (AV Scenes)','1. Audio-Visual Sync Test Scenes (AV Scenes)'],
  ['霓虹雨夜机甲巡逻 · 脚步材质拟音','Neon Rain Mech Patrol · Footstep Material Foley'],
  ['双足机甲跨越积水沥青与钢格栅，实时解算足端触地冲量 J_c、水花粒子与双耳立体声声像。','Bipedal mech crossing wet asphalt and steel grates, solving foot-contact impulse J_c, splash particles, and binaural stereo panning in real time.'],
  ['数字人多语种对白 · 12-Viseme 口型','Multilingual Avatar Dialogue · 12-Viseme Lip Sync'],
  ['亚帧级音素-视位（AA/EE/OO/MM/FV）共振峰包络与 Cross-Modality AdaLN 下颌相位锁定。','Sub-frame phoneme-viseme (AA/EE/OO/MM/FV) formant envelope with Cross-Modality AdaLN jaw phase lock.'],
  ['高能等离子锻造 · 刚体冲击声场','High-Energy Plasma Forge · Rigid-Body Impact Acoustic Field'],
  ['重锤撞击炽热钛合金剑坯，激发火花粒子簇、声压激波环与多频段金属模态共振衰减。','Heavy hammer striking white-hot titanium blade stock, exciting spark clusters, acoustic shock rings, and multi-band metallic modal decay.'],
  ['2. 音画扩散与长时序架构 (AV Architecture)','2. Audio-Visual Diffusion &amp; Long-Horizon Architecture (AV Architecture)'],
  ['LTX-2 19B 非对称双流联合扩散','LTX-2 19B Asymmetric Dual-Stream Joint Diffusion'],
  ['14B 视频流 + 5B 音频流 + 双向跨模态注意力 A_(v↔a) + 连续 RoPE。','14B video stream + 5B audio stream + bidirectional cross-modal attention A_(v↔a) + continuous RoPE.'],
  ['FramePack O(1) 恒定上下文 + 反漂移','FramePack O(1) Constant Context + Anti-Drift'],
  ['几何级数 1x/2x/4x/8x 历史帧压缩 + 倒序首尾锚点采样，60秒仅需 5.8GB 显存。','Geometric 1x/2x/4x/8x historical frame packing + inverted anchor sampling, requiring only 5.8GB VRAM for 60s.'],
  ['Hunyuan-Foley / MMAudio 冲量控制','Hunyuan-Foley / MMAudio Impulse Control'],
  ['显式提取光流/刚体速度跳变冲量 J_c 与表面声学传递函数合成拟音。','Explicit optical-flow and rigid-body velocity impulse J_c extraction with surface acoustic transfer synthesis.'],
  ['Baseline 串行 T2V + 事后拼接配音','Baseline Cascaded T2V + Post-Hoc Dubbing'],
  ['传统两阶段流水线：暴露明显的口型/动作错位（68.5ms）与 60s 自回归崩溃。','Legacy two-stage pipeline exposing visible lip/action desync (68.5ms) and 60s autoregressive drift collapse.'],
  ['3. 物理声学材质传递函数 (Material H_m)','3. Physical Acoustic Material Transfer Function (Material H_m)'],
  ['积水沥青','Wet Asphalt'],
  ['420Hz 阻尼 + 水花','420Hz Damping + Splash'],
  ['空腔钢格栅','Hollow Steel Grate'],
  ['1.8kHz 金属泛音','1.8kHz Metallic Harmonics'],
  ['钛合金砧面','Titanium Anvil'],
  ['3.1kHz 高 Q 鸣响','3.1kHz High-Q Ringing'],
  ['人声共振峰','Vocal Formants'],
  ['F1/F2 Viseme 锁定','F1/F2 Viseme Lock'],
  ['💡 点击主画布任意位置可注入自定义物理碰撞发声点','💡 Click anywhere on the main canvas to inject a custom physical contact impulse'],
  ['4. 跨模态与 FramePack 实时参数','4. Cross-Modal &amp; FramePack Live Parameters'],
  ['FramePack 压缩比 (λ)','FramePack Compression Ratio (λ)'],
  ['双耳立体声方位宽度 (ITD/ILD)','Binaural Stereo Width (ITD/ILD)'],
  ['人工同步偏置测试 (Δt_sync)','Manual Sync Offset Test (Δt_sync)'],
  ['5. 实时定量基准遥测 (Live Telemetry)','5. Live Quantitative Benchmark Telemetry'],
  ['AV DeSync (音画同步误差)','AV DeSync (Audio-Visual Offset)'],
  ['60s Peak VRAM (显存开销)','60s Peak VRAM (Memory Footprint)'],
  ['6. 标准化音画控制契约 (AUDIOVISUAL_FOLEY_SPEC.json)','6. Standardized Audio-Visual Contract (AUDIOVISUAL_FOLEY_SPEC.json)'],
  ['音画场景与双流架构控制','Audio-Visual Scene &amp; Dual-Stream Architecture Controls'],
  ['实时音画同步渲染视口与多轨频谱','Real-Time Audio-Visual Viewport &amp; Multi-Track Spectrum'],
  ['60秒长时序时间轴','60-Second Long-Horizon Timeline'],
  ['跨模态控制参数与遥测','Cross-Modal Control Parameters &amp; Telemetry']
];

function localizeFoleyStudies(){
  for(const dir of ['animation','generative-visual-lab']){
    for(const suffix of ['.html','.en.html']){
      const file=`${dir}/research/audiovisual-foley-framepack-study${suffix}`;
      let html=gitShow('8b9f876',file);
      html=html.replace(/<!doctype html><html lang="zh-CN">[\s\S]*?<link rel="stylesheet" href="\.\.\/assets\/theme\.css">\s*/i,'');
      if(suffix==='.en.html'){
        html=html.replace('← 实验室','← Lab');
      }
      fs.writeFileSync(path.join(root,file),html);
    }
  }
}

function localizeFoleyReports(){
  for(const dir of ['animation','generative-visual-lab']){
    const file=`${dir}/demos/audiovisual-foley-studio/test-report-cards.html`;
    const base=gitShow('8b9f876',file);
    const enHtml=base
      .replace(/<html lang="[^"]+"/,'<html lang="en"')
      .replace('← 返回音画拟音工作台','← Back to AV Foley Studio')
      .replace('📖 阅读中英研究专著','📖 Read Architecture Study');
    const zhHtml=base
      .replace(/<html lang="[^"]+"/,'<html lang="zh-CN"')
      .replace('<title>7-Card 4:5 Benchmark Report · Native Audio-Visual Joint DiT &amp; FramePack Foley Studio</title>','<title>7-Card 4:5 基准评测报告 · 原生音画联合 DiT 与 FramePack 物理拟音导演台</title>');
    fs.writeFileSync(path.join(root,file),zhHtml);
    fs.writeFileSync(path.join(root,file.replace('.html','.en.html')),enHtml);
  }
}

function localizeFoleyDemos(){
  for(const dir of ['animation','generative-visual-lab']){
    const file=`${dir}/demos/audiovisual-foley-studio/index.html`;
    const zhHtml=gitShow('8b9f876',file);
    let enHtml=zhHtml.replace(/<html lang="[^"]+"/,'<html lang="en">'.slice(0,-1));
    for(const [zh,en] of foleyDemoReplacements){
      enHtml=enHtml.split(zh).join(en);
    }
    fs.writeFileSync(path.join(root,file),zhHtml);
    fs.writeFileSync(path.join(root,file.replace('.html','.en.html')),enHtml);
  }
}

const brandLoraEnHtml = `<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Enterprise Brand IP &amp; Hero SKU LoRA Dataset Hygiene Workbench · DINOv2 Dedup + Trigger Disentanglement + Masked Loss</title>
    <script type="module" crossorigin src="../../assets/brandLoraTrainingDatasetDedupCaptionHygiene-BPqU12Sl.js"></script>
    <link rel="modulepreload" crossorigin href="../../assets/modulepreload-polyfill-B5Qt9EMX.js">
    <link rel="stylesheet" crossorigin href="../../assets/brandLoraTrainingDatasetDedupCaptionHygiene-Dspbq0cw.css">
  </head>
  <body>
    <main class="rig-shell">
      <header class="rig-header">
        <div>
          <p class="eyebrow">ENTERPRISE BRAND IP &amp; SKU LORA TRAINING HYGIENE · DINOV2 DEDUP + CAPTION TRIGGER DISENTANGLEMENT + MASKED LOSS · C_ACTIVE/C_LORA = 1.0000×</p>
          <h1>Enterprise Mascot &amp; Brand Style LoRA (Flux / Wan 2.2) Dataset Hygiene Pipeline: DINOv2 Near-Duplicate Pruning + Trigger Attribute Disentanglement + Alpha Masked Loss</h1>
          <p class="subtitle">Designed for Cloud &amp; AI Solution Architects building enterprise AIGC brand studios: feeding uncurated mascot or product shoots directly into naive LoRA scripts causes pose rigidity from near-duplicate bursts and severe concept bleeding from studio backdrops or props, doubling retraining cost to <code>2.0000×</code> across 16/17 stages. Combining DINOv2 cosine deduplication (&gt;0.92 pruned), explicit variable-attribute captioning, foreground alpha-masked loss, and Pareto checkpoint selection locks 0% background bleed and <code>C_active / C_lora = 1.0000×</code> across all 17 stages.</p>
        </div>
        <div class="header-links">
          <a class="chip-link" href="../../index.en.html">← Back to Visual Lab Portal</a>
          <a class="chip-link" href="../../research/brand-lora-training-dataset-dedup-caption-hygiene-faq.en.html">Selection FAQ (EN)</a>
          <a class="chip-link" href="./test-report-cards.html">7-Card Benchmark</a>
        </div>
      </header>
      <section class="control-bar" aria-label="Enterprise LoRA dataset hygiene and hyperparameter controls">
        <div class="control-group">
          <label for="preset-select">1. LoRA Data Engineering Architecture Preset</label>
          <select id="preset-select">
            <option value="dinov2_dedup_disentangled_masked_lora_lock">DINOv2 Dedup + Trigger Disentanglement + Masked Loss (C/C_lora = 1.0000×, 0/17 Bleed)</option>
            <option value="naive_uncurated_dataset_concept_bleed">Naive Uncurated Dataset Concept Bleed &amp; Pose Lock (2.0000× Retrain Cost, 16/17 Violated)</option>
          </select>
        </div>
        <div class="control-group">
          <label for="station-slider">2. Brand Asset Diversity &amp; Generalization Stage <code>k</code> (<span id="station-label">Stage 8 · u = 0.5000</span>)</label>
          <input id="station-slider" type="range" min="0" max="16" step="1" value="8" />
        </div>
        <div class="control-group">
          <label for="target-select">3. Target Brand Asset &amp; Foundation Model</label>
          <select id="target-select">
            <option value="flux_3d_brand_mascot">3D Brand Mascot Multi-Pose Generalization (Flux.1-dev Rank-16 + Masked Loss)</option>
            <option value="wan22_hero_product_sku">Hero Consumer Electronics / Cosmetics 360° Turntable (Wan 2.2 14B Video LoRA)</option>
            <option value="enterprise_ui_illustration_style">Enterprise UI Illustration Style LoRA (Zero Object Leakage)</option>
          </select>
        </div>
        <div class="control-group">
          <label for="theme-toggle">4. Viewport Theme</label>
          <button id="theme-toggle" type="button" class="toggle-btn">Toggle Light / Dark Theme</button>
        </div>
      </section>
      <section class="kpi-strip" aria-label="Core LoRA generalization and training budget metrics">
        <article class="kpi-card">
          <span class="kpi-title">Current LoRA Data Engineering Stage</span>
          <strong class="kpi-value" id="kpi-station-name">Stage 8 · Caption Attribute Disentanglement</strong>
          <span class="kpi-sub" id="kpi-u-readout">u = 0.5000 · L(u) = 1.5000×</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Amortized R&amp;D Cost Ratio c_lora(u)</span>
          <strong class="kpi-value" id="kpi-clora">0.6667×</strong>
          <span class="kpi-sub" id="kpi-quad-err">64-cluster feature manifold error &lt; 1e-12</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Generalization &amp; Budget Ratio (C_active / C_lora)</span>
          <strong class="kpi-value" id="kpi-active-ratio">1.0000×</strong>
          <span class="kpi-sub" id="kpi-status-badge">0% Background Bleed + Free Pose Editing (0/17 Overfit)</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Stage 4 / 8 / 16 vs Naive Training</span>
          <strong class="kpi-value" id="kpi-benchmark-summary">1.0000× vs 1.25 / 1.50 / 2.00×</strong>
          <span class="kpi-sub" id="kpi-target-readout">DINOv2 Sim &lt;= 0.92 + Masked Loss + Trigger Disentangle</span>
        </article>
      </section>
      <section class="workbench-grid">
        <div class="canvas-panel">
          <div class="panel-header">
            <h2>Isometric Enterprise Brand LoRA Dataset Hygiene &amp; Anti-Overfit Workbench (58 Modules · 17 Stages)</h2>
            <span class="badge" id="canvas-mode-badge">Layer 1 DINOv2 Dedup &amp; View Balance → Layer 2 Trigger Disentangle &amp; Alpha Masked Loss → Layer 3 Pareto Checkpoint</span>
          </div>
          <svg id="lora-stage-svg" viewBox="0 0 920 500" role="img" aria-label="Enterprise Brand LoRA Dataset Hygiene Workbench"></svg>
        </div>
        <aside class="telemetry-panel">
          <h2>Stage Feature Disentanglement &amp; Generalization Audit</h2>
          <dl class="metric-list">
            <div><dt>Stage Code &amp; Hygiene Task</dt><dd id="tel-stage-code">STAGE-08 · Caption Disentangle</dd></div>
            <div><dt>Background &amp; Prop Concept Bleed Rate</dt><dd id="tel-bleed-rate">0.00% (Foreground alpha mask isolates subject loss)</dd></div>
            <div><dt>Dedup &amp; Captioning Policy</dt><dd id="tel-hygiene-policy">DINOv2 Sim &gt; 0.92 pruned + variable outfits/scenes tagged</dd></div>
            <div><dt>Identity (DINO) vs Editability (CLIP)</dt><dd id="tel-pareto-score">Identity DINO 0.942 + Editability CLIP 0.348 (Pareto Optimal)</dd></div>
            <div><dt>Compute &amp; Curation Savings vs Naive</dt><dd id="tel-savings">-33.3% GPU &amp; curation cost (-50.0% at Stage 16)</dd></div>
          </dl>
          <h3>17-Stage Enterprise LoRA Training Cost Envelope</h3>
          <div class="table-scroll">
            <table class="audit-table">
              <thead><tr><th>Stage</th><th>u</th><th>c_lora(u)</th><th>Curated LoRA</th><th>Naive Run</th></tr></thead>
              <tbody id="audit-table-body"></tbody>
            </table>
          </div>
        </aside>
      </section>
    </main>
  </body>
</html>
`;

const cadBimEnHtml = `<!doctype html>
<html lang="en" data-theme="dark">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Architectural &amp; Retail CAD/BIM to Photoreal Visualization Studio · M-LSD + Normal + Depth ControlNet + Material Swatch Lock</title>
    <script type="module" crossorigin src="../../assets/cadBimSketchToPhotorealArchitecturalControlnet-BiSY-eQn.js"></script>
    <link rel="modulepreload" crossorigin href="../../assets/modulepreload-polyfill-B5Qt9EMX.js">
    <link rel="stylesheet" crossorigin href="../../assets/cadBimSketchToPhotorealArchitecturalControlnet-yBOrbo2F.css">
  </head>
  <body>
    <main class="rig-shell">
      <header class="rig-header">
        <div>
          <p class="eyebrow">ENTERPRISE ARCHITECTURAL &amp; RETAIL CAD/BIM VISUALIZATION · M-LSD STRAIGHT-EDGE + NORMAL + DEPTH LOCK + MATERIAL SWATCH BIND · C_ACTIVE/C_BIM = 1.0000×</p>
          <h1>Architectural &amp; Retail Store CAD/BIM to Photoreal Pipeline: M-LSD Vanishing-Point Lock + Triple-Channel ControlNet + PBR Material Swatch Binding</h1>
          <p class="subtitle">Designed for Cloud &amp; AI Solution Architects serving commercial real estate, 500+ retail store rollouts, and AEC design institutes: unconstrained Img2Img (denoise ≥ 0.65) warps load-bearing curtain-wall mullions (&gt;2.8° tilt), erases fire exits, and alters client-specified terrazzo or anodized aluminum swatches, doubling rework cost to <code>2.0000×</code> by Stage 16. Combining M-LSD straight-edge locking (&lt;0.08° error), camera-space Normal + 16-bit Depth ControlNet Union, IP-Adapter PBR swatch binding, and solar sky relighting locks zero structural drift across all 17 stages.</p>
        </div>
        <div class="header-links">
          <a class="chip-link" href="../../index.en.html">← Back to Visual Lab Portal</a>
          <a class="chip-link" href="../../research/cad-bim-sketch-to-photoreal-architectural-controlnet-faq.en.html">Selection FAQ (EN)</a>
          <a class="chip-link" href="./test-report-cards.html">7-Card Benchmark</a>
        </div>
      </header>
      <section class="control-bar" aria-label="Architectural CAD/BIM geometry and material rendering controls">
        <div class="control-group">
          <label for="preset-select">1. Structural Lock &amp; Material Architecture Preset</label>
          <select id="preset-select">
            <option value="mlsd_normal_depth_swatch_bim_lock">M-LSD + Normal/Depth Triple Lock + PBR Swatch Bind (C/C_bim = 1.0000×, 0/17 Drift)</option>
            <option value="naive_unconstrained_img2img_wall_warp">Naive High-Denoise Img2Img Mullion Warp &amp; Perspective Collapse (2.0000× Rework, 16/17 Violated)</option>
          </select>
        </div>
        <div class="control-group">
          <label for="station-slider">2. Facade Structural Complexity &amp; Solar Lighting Stage <code>k</code> (<span id="station-label">Stage 8 · u = 0.5000</span>)</label>
          <input id="station-slider" type="range" min="0" max="16" step="1" value="8" />
        </div>
        <div class="control-group">
          <label for="solar-select">3. Solar Azimuth &amp; Commercial Lighting Rig</label>
          <select id="solar-select">
            <option value="golden_hour_35deg">Golden Hour Warm Sun (Azimuth 245° / Elev 14° + Interior Warm Glow)</option>
            <option value="overcast_museum_soft">Overcast Museum Soft Sky (Omnidirectional HDRI · True Swatch Inspection)</option>
            <option value="rainy_night_neon_flagship">Rainy Night Urban Flagship Storefront (Wet Specular Ground + Display Spotlights)</option>
          </select>
        </div>
        <div class="control-group">
          <label for="theme-toggle">4. Viewport Theme</label>
          <button id="theme-toggle" type="button" class="toggle-btn">Toggle Light / Dark Theme</button>
        </div>
      </section>
      <section class="kpi-strip" aria-label="Core structural fidelity and visualization budget metrics">
        <article class="kpi-card">
          <span class="kpi-title">Current Architectural Stage</span>
          <strong class="kpi-value" id="kpi-station-name">Stage 8 · IP-Adapter PBR Material Swatch Binding</strong>
          <span class="kpi-sub" id="kpi-u-readout">u = 0.5000 · B(u) = 1.5000×</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Amortized Render Cost Ratio c_bim(u)</span>
          <strong class="kpi-value" id="kpi-cbim">0.6667×</strong>
          <span class="kpi-sub" id="kpi-quad-err">64-patch perspective geometry error &lt; 1e-12</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Mullion Plumb Error &amp; Budget Ratio (C_active / C_bim)</span>
          <strong class="kpi-value" id="kpi-active-ratio">1.0000×</strong>
          <span class="kpi-sub" id="kpi-status-badge">Plumb Error &lt;0.08° + Swatch Locked (0/17 Warp)</span>
        </article>
        <article class="kpi-card">
          <span class="kpi-title">Stage 4 / 8 / 16 vs Naive Img2Img</span>
          <strong class="kpi-value" id="kpi-benchmark-summary">1.0000× vs 1.25 / 1.50 / 2.00×</strong>
          <span class="kpi-sub" id="kpi-solar-readout">M-LSD w=0.90 + Depth w=0.85 + Normal w=0.80</span>
        </article>
      </section>
      <section class="workbench-grid">
        <div class="canvas-panel">
          <div class="panel-header">
            <h2>Isometric Architectural &amp; Retail CAD/BIM Triple-Lock Visualization Studio (58 Modules · 17 Stages)</h2>
            <span class="badge" id="canvas-mode-badge">Layer 1 Revit/SketchUp Pass Extraction → Layer 2 M-LSD/Normal/Depth + Swatch Lock → Layer 3 Solar Relighting</span>
          </div>
          <svg id="bim-stage-svg" viewBox="0 0 920 500" role="img" aria-label="Architectural CAD/BIM Multi-ControlNet Visualization Studio"></svg>
        </div>
        <aside class="telemetry-panel">
          <h2>Structural Plumb &amp; Material Swatch Audit</h2>
          <dl class="metric-list">
            <div><dt>Stage Code &amp; AEC Task</dt><dd id="tel-stage-code">STAGE-08 · Swatch Bind</dd></div>
            <div><dt>M-LSD Vertical &amp; Vanishing-Point Error</dt><dd id="tel-line-error">0.05° (Meets &lt;0.08° architectural tolerance)</dd></div>
            <div><dt>Triple-Channel ControlNet Weights</dt><dd id="tel-control-weights">M-LSD 0.90 / Depth 0.85 / Normal 0.80 (Stop@0.85)</dd></div>
            <div><dt>PBR Swatch &amp; Fenestration Preservation</dt><dd id="tel-swatch-policy">100% door/window openings preserved + IP-Adapter stone/wood swatch</dd></div>
            <div><dt>Rework Savings vs Naive Img2Img</dt><dd id="tel-savings">-33.3% rework cost (-50.0% at Stage 16)</dd></div>
          </dl>
          <h3>17-Stage CAD/BIM Structural Lock &amp; Visualization Cost Envelope</h3>
          <div class="table-scroll">
            <table class="audit-table">
              <thead><tr><th>Stage</th><th>u</th><th>c_bim(u)</th><th>Triple-Lock BIM</th><th>Naive Img2Img</th></tr></thead>
              <tbody id="audit-table-body"></tbody>
            </table>
          </div>
        </aside>
      </section>
    </main>
  </body>
</html>
`;

const r500WorkbenchEnHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src 'unsafe-inline'; script-src 'unsafe-inline'" />
  <title>R500 Milestone · Enterprise AI Architecture &amp; FinOps Decision Workbench (2026-11-18)</title>
  <style>
    :root {
      --bg: #0b1120;
      --panel: #1e293b;
      --panel-dark: #0f172a;
      --border: #334155;
      --text: #f8fafc;
      --muted: #94a3b8;
      --accent: #38bdf8;
      --emerald: #10b981;
      --amber: #f59e0b;
      --red: #ef4444;
    }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      padding: 24px;
      font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
      background: var(--bg);
      color: var(--text);
      line-height: 1.5;
    }
    .container { max-width: 1180px; margin: 0 auto; }
    .header {
      background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
      border: 1px solid var(--border);
      border-top: 5px solid var(--amber);
      border-radius: 14px;
      padding: 22px 26px;
      margin-bottom: 20px;
    }
    .badge {
      display: inline-block;
      background: rgba(245, 158, 11, 0.16);
      color: #fbbf24;
      border: 1px solid rgba(245, 158, 11, 0.4);
      padding: 4px 10px;
      border-radius: 999px;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.5px;
    }
    h1 { margin: 10px 0 6px; font-size: 24px; }
    .sub { color: var(--muted); font-size: 14px; margin: 0; }
    .grid {
      display: grid;
      grid-template-columns: 360px 1fr;
      gap: 20px;
    }
    @media (max-width: 900px) { .grid { grid-template-columns: 1fr; } }
    .card {
      background: var(--panel);
      border: 1px solid var(--border);
      border-radius: 12px;
      padding: 20px;
    }
    .card h2 { margin: 0 0 14px; font-size: 17px; color: var(--accent); }
    label { display: block; font-size: 13px; color: var(--muted); margin-bottom: 6px; font-weight: 600; }
    select, input[type="range"] {
      width: 100%;
      margin-bottom: 16px;
      background: var(--panel-dark);
      color: var(--text);
      border: 1px solid var(--border);
      border-radius: 8px;
      padding: 8px 10px;
      font-size: 13.5px;
    }
    .kpi-row {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 12px;
      margin-bottom: 18px;
    }
    .kpi {
      background: var(--panel-dark);
      border: 1px solid var(--border);
      border-radius: 10px;
      padding: 14px;
    }
    .kpi .lbl { font-size: 12px; color: var(--muted); }
    .kpi .val { font-size: 22px; font-weight: 800; margin-top: 4px; }
    .bar-group { margin-bottom: 14px; }
    .bar-head { display: flex; justify-content: space-between; font-size: 13px; margin-bottom: 5px; }
    .bar-track { background: var(--panel-dark); height: 18px; border-radius: 6px; overflow: hidden; }
    .bar-fill { height: 100%; border-radius: 6px; transition: width 0.25s ease; }
    table { width: 100%; border-collapse: collapse; margin-top: 14px; font-size: 13px; }
    th, td { text-align: left; padding: 10px; border-bottom: 1px solid var(--border); }
    th { color: var(--muted); font-weight: 700; background: var(--panel-dark); }
    .pill {
      display: inline-block;
      padding: 2px 8px;
      border-radius: 6px;
      font-size: 11.5px;
      font-weight: 700;
      background: rgba(16, 185, 129, 0.15);
      color: #34d399;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <span class="badge">CUMULATIVE ROUND 500 MILESTONE (2026-11-18 NIGHT SHIFT · R481–R500)</span>
      <h1>Enterprise AI Architecture &amp; FinOps Decision Workbench</h1>
      <p class="sub">Covering the R481–R500 enterprise stack (SkillEvaluator / Signet / MyDB / Agent-LeakCheck / Flecten / Skywake / agy-hq / PaperMate / Blueprint / Fable-5.2-Prompting) · Base Hardware CapEx: <code>not_measured</code></p>
    </div>

    <div class="grid">
      <div class="card">
        <h2>1. Workload &amp; Engineering Team Controls</h2>
        <label for="presetSelect">Architecture Stack Preset (Round Preset)</label>
        <select id="presetSelect">
          <option value="r500">R500 (Night R20): PaperMate 298 Rules + Blueprint + OpenFactura + Fable Prompting</option>
          <option value="r499">R499 (Night R19): clauds 90% Auto-Switch + ClaudeLink Rollback + aBridge + Remote MCP</option>
          <option value="r498">R498 (Night R18): agy-hq Zero-Token Gate + dsh-workboard + Skill-Siphon + Claude Wiki</option>
          <option value="r496">R496 (Night R16): Skywake 95ms S3 Fork + ReproCase AuthZ Proof + Microbrains</option>
          <option value="r490">R490 (Night R10): MyDB SQL Gate + pgvectorfast + Agentic-RAG-KB</option>
          <option value="r481">R481 (Night R1): NVIDIA SkillEvaluator + Signet + OpenAgentsControl</option>
        </select>

        <label for="seatRange">Engineering &amp; Architecture Seats: <span id="seatVal">45</span></label>
        <input type="range" id="seatRange" min="15" max="180" step="15" value="45" />

        <label for="rateRange">Blended Engineer Hourly Rate: $<span id="rateVal">100</span> / hr</label>
        <input type="range" id="rateRange" min="50" max="200" step="10" value="100" />

        <label for="promptTaxSelect">Prompt Patch FinOps Policy (Fable 5.2 Mode)</label>
        <select id="promptTaxSelect">
          <option value="targeted">Symptom-Scoped Patch Only (0% Redundant Token Tax)</option>
          <option value="finishing">Always-On Finishing Work Patch (+30% Output Token Tax)</option>
          <option value="ownership">Unscoped Full Ownership Stack (+75% Output Token Tax)</option>
        </select>
      </div>

      <div class="card">
        <h2>2. Closed-Form Monthly &amp; Annual FinOps Output</h2>
        <div class="kpi-row">
          <div class="kpi">
            <div class="lbl">Path A (Manual / Unscoped Baseline) Monthly</div>
            <div class="val" id="pathAVal" style="color: #fca5a5;">$6,520.00</div>
          </div>
          <div class="kpi">
            <div class="lbl">Path C (Recommended Open-Source Stack) Monthly</div>
            <div class="val" id="pathCVal" style="color: #34d399;">$375.00</div>
          </div>
          <div class="kpi">
            <div class="lbl">Net Monthly &amp; Annual Savings</div>
            <div class="val" id="savingsVal" style="color: #38bdf8;">-94.25% ($73,740/yr)</div>
          </div>
        </div>

        <div class="bar-group">
          <div class="bar-head"><span>Path A (Baseline Unoptimized / Manual)</span><span id="barALbl">$6,520.00 / mo</span></div>
          <div class="bar-track"><div class="bar-fill" id="barA" style="width: 100%; background: var(--red);"></div></div>
        </div>
        <div class="bar-group">
          <div class="bar-head"><span>Path B (Commercial SaaS / Heavy Middleware)</span><span id="barBLbl">$2,700.00 / mo</span></div>
          <div class="bar-track"><div class="bar-fill" id="barB" style="width: 41.4%; background: #64748b;"></div></div>
        </div>
        <div class="bar-group">
          <div class="bar-head"><span>Path C (Recommended R481–R500 Architecture Stack)</span><span id="barCLbl">$375.00 / mo</span></div>
          <div class="bar-track"><div class="bar-fill" id="barC" style="width: 5.75%; background: var(--emerald);"></div></div>
        </div>

        <table>
          <thead>
            <tr>
              <th>Primary Repositories</th>
              <th>Mechanical Architecture Guarantee</th>
              <th>Audit Claim ID</th>
            </tr>
          </thead>
          <tbody id="detailBody"></tbody>
        </table>
      </div>
    </div>
  </div>

  <script>
    const PRESETS = {
      r500: {
        claim: "CLAIM-20261118-R20-R500-PAPERMATE-BLUEPRINT-OPENFACTURA-FABLEPROMPT",
        aComp: 2420, aHrs: 41.0, bComp: 1050, bHrs: 16.5, cComp: 85, cHrs: 2.9,
        rows: [
          ["peacefulj/SSCI-SCI-skills (PaperMate v1.3.0)", "298-rule deterministic backend evaluation + UAC-free split program/data directories"],
          ["intincrab/blueprint (/blueprint)", "Animated <blueprint-scene> technical explainers + Playwright frame verification"],
          ["xaviigna/openfactura", "Cloudflare Workers DTE Normativa 2.0 signing, contingency, and voiding native MCP"],
          ["sktjgudals/fable-5-2-prompting", "Read-only CLAUDE.md audit + symptom-scoped patches quantifying +30% / +70%-80% token tax"]
        ]
      },
      r499: {
        claim: "CLAIM-20261118-R19-CLAUDS-CLAUDELINK-ABRIDGE-REMOTEMCP",
        aComp: 2080, aHrs: 36.5, bComp: 910, bHrs: 15.0, cComp: 65, cHrs: 2.5,
        rows: [
          ["codeFi/clauds", "Isolated account directories with zero-relogin switching + zero-copy session sharing at 90% quota"],
          ["slobys/ClaudeLink (v1.5.1)", "Dual-hop chained proxy + scoped IPv6/timezone guard + deterministic exit state restore"],
          ["xerrors/aBridge (v0.4.18)", "Streamable HTTP MCP + Chrome 116+/macOS/Linux/Android TTL-scoped authorization"],
          ["dqIndieGames/remote-pc-mcp-gateway", "OAuth 2.1 PKCE + 198.18.0.0/15 Fake-IP QUIC bypass + isolated per-tab pageId routing"]
        ]
      },
      r498: {
        claim: "CLAIM-20261118-R18-AGYHQ-DSHWORKBOARD-SKILLSIPHON-CLAUDEWIKI",
        aComp: 2140, aHrs: 37.0, bComp: 880, bHrs: 15.0, cComp: 70, cHrs: 2.6,
        rows: [
          ["zjshen14/agy-hq", "PreToolUse foreground 3-query cap + pure Go SHA-256 zero-token gatekeeper + 24h approval"],
          ["lukeinx/dsh-workboard", "52 built-in widgets + cookie-isolated custom card sandbox + explicit host proxy"],
          ["JL-GUO/skill-siphon", "Read-only skill distillation into 01 Study Guide / 02 Hands-On / 03 Provenance & Boundaries"],
          ["yibie/claude-best-practices-zh", "173 triple-reviewed engineering notes + 100 atomic Karpathy LLM Wiki nodes + 202 edges"]
        ]
      },
      r496: {
        claim: "CLAIM-20261118-R16-SKYWAKE-REPROCASE-MICROBRAINS-MODERNJAVA",
        aComp: 2320, aHrs: 39.0, bComp: 980, bHrs: 16.0, cComp: 85, cHrs: 2.8,
        rows: [
          ["skywakehq/skywake", "95ms S3 pointer fork on 1GB workspace trees (vs 28.7s) + 10.1ms 10M-vector retrieval"],
          ["theasbug/reprocase", "Dual-account (attacker/victim) cross-tenant write AuthZ verifier + HTTP trace replay"],
          ["drtikov/microbrainsforagents", "1.3ms pure NumPy patch preflight gate + 39% tool schema token reduction"],
          ["wkd09/modern-java-guidance", "Millisecond PostToolUse hook blocking legacy javax.* and RestTemplate regressions"]
        ]
      },
      r490: {
        claim: "CLAIM-20261118-R10-MYDB-PGVECTORFAST-AGENTICRAG",
        aComp: 2680, aHrs: 43.0, bComp: 1120, bHrs: 17.5, cComp: 125, cHrs: 3.2,
        rows: [
          ["yzsind/mydb (v1.0.0)", "5-tier SQL permission gate + EXPLAIN dry-run + pre/post row-level snapshot rollback"],
          ["mitdbg/pgvectorfast", "Disk-aware PostgreSQL vector index acceleration and memory footprint reduction"],
          ["Golden-66/agentic-rag-kb", "Hybrid retrieval + RRF reranking + self-reflective citation verification"],
          ["Replyze/ai-customer-support-agent", "Confidence-gated ticket routing with lossless human-agent escalation"]
        ]
      },
      r481: {
        claim: "CLAIM-20261118-R1-SKILLEVAL-SIGNET",
        aComp: 2260, aHrs: 42.0, bComp: 960, bHrs: 16.0, cComp: 95, cHrs: 3.2,
        rows: [
          ["NVIDIA/SkillEvaluator", "3-tier hybrid grading (deterministic script + LLM Judge + CI regression gate)"],
          ["therandomsecurityguy/signet", "macOS Secure Enclave hardware key isolation + Touch ID biometric signing"],
          ["darrenhinde/OpenAgentsControl", "Plan-First approval workflow + <80-line Minimum Viable Context (MVI) injection"]
        ]
      }
    };

    function render() {
      const key = document.getElementById("presetSelect").value;
      const seats = parseInt(document.getElementById("seatRange").value, 10);
      const rate = parseInt(document.getElementById("rateRange").value, 10);
      const taxMode = document.getElementById("promptTaxSelect").value;
      document.getElementById("seatVal").textContent = seats;
      document.getElementById("rateVal").textContent = rate;

      const p = PRESETS[key];
      const scale = seats / 45.0;
      const taxMultiplier = taxMode === "ownership" ? 1.75 : (taxMode === "finishing" ? 1.30 : 1.0);

      const aTotal = (p.aComp * scale) + (p.aHrs * scale * rate);
      const bTotal = (p.bComp * scale) + (p.bHrs * scale * rate);
      const cTotal = (p.cComp * scale * taxMultiplier) + (p.cHrs * scale * rate);
      const saved = aTotal - cTotal;
      const pct = (saved / aTotal) * 100;

      document.getElementById("pathAVal").textContent = "$" + aTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      document.getElementById("pathCVal").textContent = "$" + cTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
      document.getElementById("savingsVal").textContent = "-" + pct.toFixed(2) + "% ($" + (saved * 12).toLocaleString("en-US", { minimumFractionDigits: 0, maximumFractionDigits: 0 }) + "/yr)";

      document.getElementById("barALbl").textContent = "$" + aTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " / mo";
      document.getElementById("barBLbl").textContent = "$" + bTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " / mo";
      document.getElementById("barCLbl").textContent = "$" + cTotal.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) + " / mo";

      document.getElementById("barB").style.width = Math.min(100, (bTotal / aTotal) * 100).toFixed(1) + "%";
      document.getElementById("barC").style.width = Math.min(100, (cTotal / aTotal) * 100).toFixed(2) + "%";

      const tbody = document.getElementById("detailBody");
      tbody.innerHTML = p.rows.map(r => \`<tr><td><strong>\${r[0]}</strong></td><td>\${r[1]}</td><td><span class="pill">\${p.claim}</span></td></tr>\`).join("");
    }

    ["presetSelect", "seatRange", "rateRange", "promptTaxSelect"].forEach(id => {
      document.getElementById(id).addEventListener("input", render);
    });
    render();
  </script>
</body>
</html>
`;

function stripFinalizedChrome(html) {
  return html
    .replace(/\s*<link rel="stylesheet" href="[^"]*assets\/editorial\/professional-header\.css">\s*/g, '\n')
    .replace(/\s*<style id="(?:professional-header-style|knowledge-atlas-style|site-remediation-style)">[\s\S]*?<\/style>\s*/g, '\n')
    .replace(/\s*<(header|nav)\b[^>]*data-professional-header[^>]*>[\s\S]*?<\/\1>\s*/g, '\n')
    .replace(/\s*<!-- site-remediation-knowledge:start -->[\s\S]*?<!-- site-remediation-knowledge:end -->\s*/g, '\n')
    .replace(/\s*<figure class="knowledge-(?:atlas|figure)" data-knowledge-atlas="[^"]*">[\s\S]*?<\/figure>\s*/g, '\n')
    .replace(/\s*<script src="[^"]*assets\/editorial\/search-index\.js" defer><\/script>\s*<script src="[^"]*assets\/editorial\/search\.js" defer><\/script>\s*/g, '\n');
}

function escapeHtml(text) {
  return String(text ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function localizeRetainedVisualDemos() {
  const manifestFiles = fs.readdirSync(path.join(root, 'generative-visual-lab'))
    .filter(f => /^nightly-visual-\d{4}-\d{2}-\d{2}\.json$/.test(f))
    .sort();
  for (const manifestFile of manifestFiles) {
    const manifest = JSON.parse(fs.readFileSync(path.join(root, 'generative-visual-lab', manifestFile), 'utf8'));
    for (const round of manifest.rounds) {
      for (const lab of ['animation', 'generative-visual-lab']) {
        const demoDir = path.join(root, lab, 'demos', round.slug);
        const indexFile = path.join(demoDir, 'index.html');
        if (!fs.existsSync(indexFile)) continue;
        const rawHtml = stripFinalizedChrome(fs.readFileSync(indexFile, 'utf8'))
          .replace(/<meta\s+http-equiv="Content-Security-Policy"[\s\S]*?\/>\s*/i, '');
        const declaredLang = (rawHtml.match(/<html[^>]*\blang="([^"]+)"/i) || [])[1] || 'en';

        if (round.slug === 'brand-lora-training-dataset-dedup-caption-hygiene-workbench' || round.slug === 'cad-bim-sketch-to-photoreal-architectural-controlnet-studio') {
          const zhHtml = rawHtml.replace(/← 返回 \d+ 演示门户/g, '← 返回视觉实验室门户');
          fs.writeFileSync(indexFile, zhHtml);
          const enHtml = round.slug.startsWith('brand-lora') ? brandLoraEnHtml : cadBimEnHtml;
          fs.writeFileSync(path.join(demoDir, 'index.en.html'), enHtml);
        } else if (declaredLang.toLowerCase().startsWith('zh')) {
          const zhHtml = rawHtml
            .replace(/← 返回 \d+ 演示门户/g, '← 返回视觉实验室门户')
            .replace(/Round \d+\s*[·•-]\s*/g, '');
          fs.writeFileSync(indexFile, zhHtml);
          const faqZh = round.faq ? `../../research/${round.faq}` : '../../index.html';
          const faqEn = round.faq ? `../../research/${round.faq.replace(/\.html$/, '.en.html')}` : '../../index.html';
          const enHtml = zhHtml
            .replace(/<html lang="[^"]*"/i, '<html lang="en"')
            .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(round.title_en)}</title>`)
            .replace(/<h1>[\s\S]*?<\/h1>/i, `<h1>${escapeHtml(round.title_en)}</h1>`)
            .replace(/<p class="subtitle">[\s\S]*?<\/p>/i, `<p class="subtitle">${escapeHtml(round.summary_en)}</p>`)
            .replace(/<div class="header-links">[\s\S]*?<\/div>/i, `<div class="header-links">
          <a class="chip-link" href="../../index.html">← Back to Visual Lab</a>
          <a class="chip-link" href="${faqEn}">Selection FAQ (English)</a>
          <a class="chip-link" href="${faqZh}">选型 FAQ (中文)</a>
          <a class="chip-link" href="./test-report-cards.html">7-Card Report</a>
        </div>`);
          fs.writeFileSync(path.join(demoDir, 'index.en.html'), enHtml);
        } else {
          const enHtml = rawHtml.replace(/Round \d+\s*[·•-]\s*/g, '');
          fs.writeFileSync(indexFile, enHtml);
          const zhHtml = enHtml
            .replace(/<html lang="[^"]*"/i, '<html lang="zh-CN"')
            .replace(/<title>[\s\S]*?<\/title>/i, `<title>${escapeHtml(round.title_zh)}</title>`);
          fs.writeFileSync(path.join(demoDir, 'index.zh.html'), zhHtml);
        }

        for (const rep of ['test-report-cards.html', 'test-report-cards.zh.html']) {
          const repPath = path.join(demoDir, rep);
          if (fs.existsSync(repPath)) {
            const cleaned = fs.readFileSync(repPath, 'utf8').replace(/Round \d+\s*[·•:—-]\s*/g, '');
            fs.writeFileSync(repPath, cleaned);
          }
        }
      }
    }
  }
}

function localizeR500Workbench() {
  const zhPath = path.join(root, 'workshops/github-trending-radar/r500-enterprise-agent-finops-workbench.html');
  const enPath = path.join(root, 'workshops/github-trending-radar/r500-enterprise-agent-finops-workbench.en.html');
  if (!fs.existsSync(zhPath)) return;
  const zhClean = stripFinalizedChrome(fs.readFileSync(zhPath, 'utf8'));
  fs.writeFileSync(zhPath, zhClean);
  fs.writeFileSync(enPath, r500WorkbenchEnHtml);
}

function main(){
 const baseline=gitShow('941ee62d1f55dfe8bd8dfbf82e4d2a7bd34ed0a1',source);
 for(const en of [true,false]){
  let html=baseline.replace(/<html lang="[^"]+"/,`<html lang="${en?'en':'zh-CN'}"`).replace(/<title>[\s\S]*?<\/title>/,`<title>${en?'Azure VM modernization workshop — moved':'Azure VM 现代化工作坊 — 迁移入口'}</title>`);
  html=html.replace(/<main>[\s\S]*?<\/main>/,`<main><h1>${en?'Azure VM modernization workshop':'Azure VM 现代化工作坊'}</h1><p>${en?'The workshop is maintained in the public Azure Infra Lab. This compatibility entry forwards to the original workshop and preserves your query parameters and section.':'工作坊现由公开的 Azure Infra Lab 维护。此兼容入口将跳转到原工作坊，并保留查询参数和章节位置。'}</p><p><a id="moved-to" href="https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/workshop.html?lang=${en?'en':'zh-CN'}">${en?'Open the workshop':'打开工作坊'}</a></p><p><a href="https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/calculator.html?lang=${en?'en':'zh-CN'}">${en?'FinOps calculator':'FinOps 计算器'}</a> · <a href="https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/demo.html?lang=${en?'en':'zh-CN'}">${en?'Interactive demo':'交互演示'}</a> · <a href="https://github.com/turbo998/Azure-Infra-Lab/tree/main/workshops/azure-vm-modernization">${en?'Source repository':'源码仓库'}</a></p><noscript><p>${en?'JavaScript is disabled. Use the native links above to continue.':'JavaScript 已关闭，请使用上方链接继续。'}</p></noscript></main>`);
  html=html.replace('target.hash = window.location.hash;',`if (!target.searchParams.has("lang")) target.searchParams.set("lang", "${en?'en':'zh-CN'}");\n    target.hash = window.location.hash;`);
  fs.writeFileSync(path.join(root,en?source:source.replace('.html','.zh.html')),html);
 }
 localizeFoleyStudies();
 localizeFoleyReports();
 localizeFoleyDemos();
 localizeRetainedVisualDemos();
 localizeR500Workbench();
 require('./localization/harness-workbenches.cjs').localizeHarnessWorkshops();
 console.log('Localized VM compatibility entry, retained visual studios, and harness workbenches in English and Chinese');
}
if(require.main===module)main();
module.exports={main};
