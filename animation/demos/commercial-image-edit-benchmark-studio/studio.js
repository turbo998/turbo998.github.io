(() => {
  const LANG = document.documentElement.lang.startsWith('zh') ? 'zh' : 'en';
  const T = (zh, en) => (LANG === 'zh' ? zh : en);

  const SCENE_CODES = {
    'portrait-retouch': 'S01',
    'id-photo': 'S02',
    'profile-color': 'S03',
    'product-background': 'S04',
    'packaging-label': 'S05',
    'product-seasonal': 'S06',
    'web-banner': 'S07',
    'app-screen': 'S08',
    'character-style': 'S09',
    'logo-cleanup': 'S10',
    'native-transparent-cutout': 'S11',
    'multi-turn-brand-consistency': 'S12',
  };

  const SCENE_NAMES_ZH = {
    'portrait-retouch': '人像自然祛痘精修',
    'id-photo': '商务证件照换纯白底',
    'profile-color': '职场头像暖调追色',
    'product-background': '护肤瓶换极简大理石台',
    'packaging-label': '咖啡包装局部换翡翠绿',
    'product-seasonal': '运动水壶换秋冬落叶景',
    'web-banner': 'SaaS 官网横幅换青绿渐变',
    'app-screen': '金融 App 界面换紫罗兰主题',
    'character-style': '品牌吉祥物换柔和青绿底',
    'logo-cleanup': '几何商标 JPG 伪影去噪',
    'native-transparent-cutout': '原生 4 通道 RGBA 耳机抠图',
    'multi-turn-brand-consistency': '双轮咖啡罐布景与品牌锁字',
  };

  const CAT_LABELS = {
    all: T('全部 12 场景', 'All 12 Briefs'),
    Portrait: T('人像精修 (3)', 'Portrait (3)'),
    Product: T('电商商品 (3)', 'Product (3)'),
    Digital: T('数字与 UI 资产 (4)', 'Digital & UI (4)'),
    'MAI Differentiator': T('高阶透明/多轮 (2)', 'RGBA & 2-Turn (2)'),
  };

  const state = {
    tab: 'arena',
    category: 'all',
    sceneId: 'packaging-label',
    modelId: 'mai-image-2-7-flash',
    baselineMode: 'original', // 'original' or modelId
    splitPct: 50,
    magnifierOn: true,
    magX: 50,
    magY: 50,
    rgbaSurface: 'surface-emerald',
    turn2WorkflowId: 'mai-flash-to-2-7-hybrid',
    perturbSceneId: 'portrait-retouch',
    perturbModelId: 'mai-image-2-7-flash',
  };

  function initTheme() {
    const btn = document.getElementById('theme-toggle');
    const updateLabel = () => {
      const cur = document.documentElement.getAttribute('data-theme') || 'light';
      if (btn) {
        btn.textContent = cur === 'dark'
          ? T('☀ 切换暖纸编辑态 (#f6f4ef)', '☀ Warm Paper (#f6f4ef)')
          : T('☾ 切换暗色控制台 (#0d1117)', '☾ Dark Console (#0d1117)');
      }
    };
    updateLabel();
    if (btn) {
      btn.addEventListener('click', () => {
        const cur = document.documentElement.getAttribute('data-theme') || 'light';
        const next = cur === 'dark' ? 'light' : 'dark';
        document.documentElement.setAttribute('data-theme', next);
        try { localStorage.setItem('gvl-mai-studio-theme', next); } catch (_) {}
        updateLabel();
        renderCharts();
      });
    }
  }

  async function loadStudioData() {
    if (window.BENCHMARK_STUDIO_DATA) {
      return window.BENCHMARK_STUDIO_DATA;
    }
    const [summary, catalog, freezeManifest, runs] = await Promise.all([
      fetch('./data/summary.json').then((r) => r.json()),
      fetch('./data/catalog.json').then((r) => r.json()),
      fetch('./data/freeze_manifest.json').then((r) => r.json()),
      fetch('./data/results_enriched.json').then((r) => r.json()),
    ]);
    return { summary, catalog, freezeManifest, runs };
  }

  let DATA = null;
  let RUN_MAP = {};
  let MODEL_MAP = {};
  let SCENE_MAP = {};
  let REF_SHA_MAP = {};

  function indexData(d) {
    DATA = d;
    RUN_MAP = {};
    for (const r of d.runs) {
      RUN_MAP[r.runKey] = r;
    }
    MODEL_MAP = {};
    for (const m of d.summary.models) {
      MODEL_MAP[m.modelId] = m;
    }
    SCENE_MAP = {};
    for (const s of d.catalog.scenarios) {
      SCENE_MAP[s.id] = s;
    }
    REF_SHA_MAP = {};
    for (const rf of (d.freezeManifest.references || [])) {
      REF_SHA_MAP[rf.scene_id] = rf;
    }
  }

  function fmtUsd(v) {
    if (v == null) return '—';
    return '$' + Number(v).toFixed(4).replace(/0+$/, '').replace(/\.$/, '');
  }

  function fmtSec(ms) {
    if (ms == null) return '—';
    return (ms / 1000).toFixed(1) + 's';
  }

  function sceneTitle(id) {
    const s = SCENE_MAP[id];
    const code = SCENE_CODES[id] || '';
    return code + ' · ' + (LANG === 'zh' ? (SCENE_NAMES_ZH[id] || s?.title_zh || s?.title_en || id) : (s?.title_en || id));
  }

  /* Tabs */
  function initTabs() {
    const btns = document.querySelectorAll('.tab-btn[data-tab]');
    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        state.tab = btn.dataset.tab;
        btns.forEach((b) => b.classList.toggle('active', b.dataset.tab === state.tab));
        document.querySelectorAll('.tab-panel').forEach((p) => {
          p.classList.toggle('active', p.id === 'tab-' + state.tab);
        });
      });
    });
  }

  /* Tab 1: Arena */
  function renderCategoryPills() {
    const wrap = document.getElementById('cat-pills');
    if (!wrap) return;
    wrap.innerHTML = '';
    Object.entries(CAT_LABELS).forEach(([cat, label]) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (state.category === cat ? ' active' : '');
      b.dataset.cat = cat;
      b.textContent = label;
      b.addEventListener('click', () => {
        state.category = cat;
        const visible = DATA.catalog.scenarios.filter((s) => cat === 'all' || s.vertical === cat);
        if (visible.length && !visible.some((s) => s.id === state.sceneId)) {
          state.sceneId = visible[0].id;
        }
        renderArena();
      });
      wrap.appendChild(b);
    });
  }

  function renderSceneGrid() {
    const wrap = document.getElementById('scene-grid');
    if (!wrap) return;
    wrap.innerHTML = '';
    const list = DATA.catalog.scenarios.filter((s) => state.category === 'all' || s.vertical === state.category);
    list.forEach((s) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'scene-btn' + (state.sceneId === s.id ? ' active' : '');
      btn.dataset.scene = s.id;
      const nameTxt = LANG === 'zh' ? (SCENE_NAMES_ZH[s.id] || s.title_zh || s.title_en) : s.title_en;
      const catBadge = LANG === 'zh' ? (s.category_zh || s.vertical) : (s.category_en || s.vertical);
      btn.innerHTML = `
        <div class="scene-code">${SCENE_CODES[s.id] || ''} · ${catBadge}</div>
        <div class="scene-name">${nameTxt}</div>
      `;
      btn.addEventListener('click', () => {
        state.sceneId = s.id;
        renderArena();
      });
      wrap.appendChild(btn);
    });
  }

  function renderModelPills() {
    const wrap = document.getElementById('model-pills');
    const baseSel = document.getElementById('baseline-select');
    if (!wrap) return;
    wrap.innerHTML = '';
    DATA.summary.models.forEach((m) => {
      const b = document.createElement('button');
      b.type = 'button';
      b.className = 'chip' + (state.modelId === m.modelId ? ' active' : '');
      b.dataset.model = m.modelId;
      b.textContent = `${m.label} (${fmtUsd(m.meanCostUsd)})`;
      b.addEventListener('click', () => {
        state.modelId = m.modelId;
        renderArenaStageAndTelemetry();
        highlightSelectedStripCard();
      });
      wrap.appendChild(b);
    });

    if (baseSel && !baseSel.dataset.bound) {
      baseSel.innerHTML = `<option value="original">${T('1024×1024 原始输入图 (Before)', '1024×1024 Original Input (Before)')}</option>` +
        DATA.summary.models.map((m) => `<option value="${m.modelId}">${T('对比模型：', 'Compare vs: ')}${m.label}</option>`).join('');
      baseSel.value = state.baselineMode;
      baseSel.dataset.bound = '1';
      baseSel.addEventListener('change', () => {
        state.baselineMode = baseSel.value;
        renderArenaStageAndTelemetry();
      });
    }
  }

  function updateSplitGeometry(pct) {
    state.splitPct = Math.max(2, Math.min(98, Number(pct)));
    const beforeLayer = document.getElementById('split-before-layer');
    const divider = document.getElementById('split-divider');
    const range = document.getElementById('split-range');
    const readout = document.getElementById('split-readout');
    if (beforeLayer) beforeLayer.style.clipPath = `inset(0 ${100 - state.splitPct}% 0 0)`;
    if (divider) divider.style.left = `${state.splitPct}%`;
    if (range && Number(range.value) !== Math.round(state.splitPct)) {
      range.value = String(Math.round(state.splitPct));
    }
    if (readout) readout.textContent = `${Math.round(state.splitPct)}%`;
  }

  function updateMagnifierCoords(xPct, yPct) {
    state.magX = Math.max(0, Math.min(100, xPct));
    state.magY = Math.max(0, Math.min(100, yPct));
    const paneBefore = document.getElementById('mag-before');
    const paneAfter = document.getElementById('mag-after');
    const coordTxt = document.getElementById('mag-coords');
    const pos = `${state.magX.toFixed(1)}% ${state.magY.toFixed(1)}%`;
    if (paneBefore) paneBefore.style.backgroundPosition = pos;
    if (paneAfter) paneAfter.style.backgroundPosition = pos;
    if (coordTxt) {
      const px = Math.round((state.magX / 100) * 1024);
      const py = Math.round((state.magY / 100) * 1024);
      coordTxt.textContent = `2.5× @ (${px}px, ${py}px)`;
    }
  }

  function bindStageInteractions() {
    const viewport = document.getElementById('split-viewport');
    const range = document.getElementById('split-range');
    const magBtn = document.getElementById('mag-toggle');
    if (!viewport || viewport.dataset.bound) return;
    viewport.dataset.bound = '1';

    let dragging = false;
    const handlePointer = (clientX, clientY, updateSplit) => {
      const rect = viewport.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const xPct = ((clientX - rect.left) / rect.width) * 100;
      const yPct = ((clientY - rect.top) / rect.height) * 100;
      if (updateSplit) updateSplitGeometry(xPct);
      updateMagnifierCoords(xPct, yPct);
    };

    viewport.addEventListener('pointerdown', (e) => {
      dragging = true;
      viewport.setPointerCapture(e.pointerId);
      handlePointer(e.clientX, e.clientY, true);
    });
    viewport.addEventListener('pointermove', (e) => {
      handlePointer(e.clientX, e.clientY, dragging);
    });
    viewport.addEventListener('pointerup', () => { dragging = false; });
    viewport.addEventListener('pointercancel', () => { dragging = false; });

    if (range) {
      range.addEventListener('input', () => updateSplitGeometry(Number(range.value)));
    }
    if (magBtn) {
      magBtn.addEventListener('click', () => {
        state.magnifierOn = !state.magnifierOn;
        const box = document.getElementById('magnifier-box');
        if (box) box.classList.toggle('hidden', !state.magnifierOn);
        magBtn.classList.toggle('active', state.magnifierOn);
      });
    }
  }

  function renderArenaStageAndTelemetry() {
    const scene = SCENE_MAP[state.sceneId];
    const run = RUN_MAP[`primary__${state.sceneId}__${state.modelId}`];
    if (!scene || !run) return;

    const beforeSrc = state.baselineMode === 'original'
      ? `./references/${state.sceneId}.webp`
      : `./${RUN_MAP[`primary__${state.sceneId}__${state.baselineMode}`]?.webpPath || `references/${state.sceneId}.webp`}`;
    const beforeLabel = state.baselineMode === 'original'
      ? T('原图 Input (1024×1024)', 'Original Input (1024×1024)')
      : MODEL_MAP[state.baselineMode]?.label || state.baselineMode;

    const afterSrc = `./${run.webpPath}`;
    const afterLabel = `${run.modelLabel} (${fmtUsd(run.costUsd)})`;

    const imgBefore = document.getElementById('img-before');
    const imgAfter = document.getElementById('img-after');
    const badgeLeft = document.getElementById('badge-before');
    const badgeRight = document.getElementById('badge-after');
    const viewport = document.getElementById('split-viewport');
    const magBefore = document.getElementById('mag-before');
    const magAfter = document.getElementById('mag-after');
    const magBeforeLbl = document.getElementById('mag-before-label');
    const magAfterLbl = document.getElementById('mag-after-label');

    if (imgBefore) imgBefore.src = beforeSrc;
    if (imgAfter) imgAfter.src = afterSrc;
    if (badgeLeft) badgeLeft.textContent = beforeLabel;
    if (badgeRight) badgeRight.textContent = afterLabel;

    if (viewport) {
      viewport.classList.toggle('surface-emerald', state.sceneId === 'native-transparent-cutout');
    }
    if (magBefore) magBefore.style.backgroundImage = `url("${beforeSrc}")`;
    if (magAfter) magAfter.style.backgroundImage = `url("${afterSrc}")`;
    if (magBeforeLbl) magBeforeLbl.textContent = beforeLabel;
    if (magAfterLbl) magAfterLbl.textContent = afterLabel;

    updateSplitGeometry(state.splitPct);
    updateMagnifierCoords(state.magX, state.magY);

    // Brief & Telemetry
    const refMeta = REF_SHA_MAP[state.sceneId];
    const briefEl = document.getElementById('arena-brief');
    if (briefEl) {
      const promptText = LANG === 'zh' && scene.prompt_zh ? `${scene.prompt_en}\n（中文等价 Brief：${scene.prompt_zh}）` : scene.prompt_en;
      const catLine = LANG === 'zh' ? (scene.category_zh || scene.vertical) : (scene.category_en || scene.vertical);
      briefEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap">
          <strong style="color:var(--accent)">${sceneTitle(state.sceneId)}</strong>
          <span style="font-size:11.5px;color:var(--text-muted);font-family:ui-monospace,monospace">Ref SHA-256: ${(refMeta?.sha256 || '').slice(0, 16)}…</span>
        </div>
        <div class="brief-prompt">"${promptText}"</div>
        <div class="brief-meta">
          <span><strong>${T('场景分类与商用准入线：', 'Vertical & Acceptance Gate:')}</strong> ${catLine} · BRF ≥ 4 &amp; VEQ ≥ 4 &amp; CNS ≥ 4</span>
        </div>
      `;
    }

    const telEl = document.getElementById('arena-telemetry');
    if (telEl) {
      const sc = run.scores;
      const det = run.deterministic || {};
      const acceptHtml = sc.accept
        ? `<span class="verdict-pill verdict-pass">✓ ${T('零返工商用通过 (Accepted)', 'Commercial Pass (Zero-Retouch)')}</span>`
        : `<span class="verdict-pill verdict-warn">△ ${T('需设计师复核 / 蒙版辅助', 'Confirm / Mask Guard Needed')}</span>`;
      const extraMetric = state.sceneId === 'native-transparent-cutout'
        ? `<div class="stat-mini"><div class="k">${T('RGBA 背景纯净度', 'RGBA Bg Alpha=0')}</div><div class="v">${det.alphaBgZeroRatio != null ? (det.alphaBgZeroRatio * 100).toFixed(1) + '%' : '0.0%'}</div></div>`
        : det.cleanGtPsnrDb != null
          ? `<div class="stat-mini"><div class="k">Clean GT PSNR</div><div class="v">${det.cleanGtPsnrDb.toFixed(2)} dB</div></div>`
          : `<div class="stat-mini"><div class="k">${T('非编辑区 L1 保真', 'Non-Edit L1')}</div><div class="v">${det.nonEditL1Preservation != null ? (det.nonEditL1Preservation * 100).toFixed(1) + '%' : '—'}</div></div>`;

      telEl.innerHTML = `
        <div style="display:flex;justify-content:space-between;align-items:center;gap:10px;flex-wrap:wrap">
          <div>
            <strong style="font-size:16px">${run.modelLabel}</strong>
            <span style="font-size:12px;color:var(--text-muted)"> · ${run.provider} (${run.pricingModel})</span>
          </div>
          ${acceptHtml}
        </div>
        <div class="score-bars">
          <div class="score-row">
            <span>BRF ${T('指令完成度', 'Brief Execution')}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${(sc.brf / 5) * 100}%"></div></div>
            <strong>${sc.brf} / 5</strong>
          </div>
          <div class="score-row">
            <span>VEQ ${T('视觉品质', 'Visual Quality')}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${(sc.veq / 5) * 100}%"></div></div>
            <strong>${sc.veq} / 5</strong>
          </div>
          <div class="score-row">
            <span>CNS ${T('商业一致性', 'Consistency')}</span>
            <div class="bar-track"><div class="bar-fill" style="width:${(sc.cns / 5) * 100}%"></div></div>
            <strong>${sc.cns} / 5</strong>
          </div>
        </div>
        <div class="stat-mini-grid">
          <div class="stat-mini"><div class="k">${T('单张实测成本', 'Measured Cost')}</div><div class="v">${fmtUsd(run.costUsd)}</div></div>
          <div class="stat-mini"><div class="k">${T('端到端延迟', 'Round-Trip Latency')}</div><div class="v">${fmtSec(run.latencyMs)}</div></div>
          <div class="stat-mini"><div class="k">${T('非编辑区 SSIM', 'Non-Edit SSIM')}</div><div class="v">${det.nonEditSsim != null ? det.nonEditSsim.toFixed(4) : '—'}</div></div>
          ${extraMetric}
        </div>
        <div class="judge-note">
          <strong>${T('盲测 VLM 评审记录：', 'Blinded VLM Judge Note:')}</strong>
          ${LANG === 'zh' ? run.note_zh : run.note_en}
        </div>
      `;
    }
  }

  function renderModelStrip() {
    const strip = document.getElementById('eight-model-strip');
    if (!strip) return;
    strip.innerHTML = '';
    DATA.summary.models.forEach((m) => {
      const r = RUN_MAP[`primary__${state.sceneId}__${m.modelId}`];
      if (!r) return;
      const card = document.createElement('div');
      card.className = 'strip-card' + (state.modelId === m.modelId ? ' selected' : '');
      card.dataset.modelCard = m.modelId;
      const sc = r.scores;
      const det = r.deterministic || {};
      const badge = sc.accept
        ? `<span style="color:var(--ok);font-weight:800">✓ ${sc.brf}/${sc.veq}/${sc.cns}</span>`
        : `<span style="color:var(--amber);font-weight:700">△ ${sc.brf}/${sc.veq}/${sc.cns}</span>`;
      const thumbBg = state.sceneId === 'native-transparent-cutout' ? 'surface-emerald' : 'surface-checker';
      card.innerHTML = `
        <div class="strip-thumb ${thumbBg}">
          <img src="./${r.webpPath}" alt="${r.modelLabel} - ${state.sceneId}" loading="lazy">
        </div>
        <div class="strip-body">
          <div class="strip-head">
            <span>${r.modelLabel}</span>
            ${badge}
          </div>
          <div class="strip-metrics">
            <span>${fmtUsd(r.costUsd)} · ${fmtSec(r.latencyMs)}</span>
            <span>SSIM ${det.nonEditSsim != null ? det.nonEditSsim.toFixed(3) : '—'}</span>
          </div>
        </div>
      `;
      card.addEventListener('click', () => {
        state.modelId = m.modelId;
        renderModelPills();
        renderArenaStageAndTelemetry();
        highlightSelectedStripCard();
      });
      strip.appendChild(card);
    });
  }

  function highlightSelectedStripCard() {
    document.querySelectorAll('.strip-card[data-model-card]').forEach((el) => {
      el.classList.toggle('selected', el.dataset.modelCard === state.modelId);
    });
  }

  function renderArena() {
    renderCategoryPills();
    renderSceneGrid();
    renderModelPills();
    renderArenaStageAndTelemetry();
    renderModelStrip();
  }

  /* Tab 2: S11 Native RGBA Cutout Inspector */
  function renderRgbaInspector() {
    const pills = document.getElementById('backdrop-pills');
    const grid = document.getElementById('rgba-grid');
    if (!grid) return;

    const surfaces = [
      ['surface-emerald', T('深翡翠绿底板 (检验白边/假网格)', 'Dark Emerald (Tests Alpha & Fake Grid)')],
      ['surface-terracotta', T('赤陶暖棕底板', 'Warm Terracotta')],
      ['surface-checker', T('标准透明棋盘格', 'Alpha Checkerboard')],
      ['surface-slate', T('午夜深灰底板', 'Midnight Slate')],
      ['surface-white', T('电商纯白底板', 'Pure White')],
    ];

    if (pills) {
      pills.innerHTML = '';
      surfaces.forEach(([cls, label]) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip' + (state.rgbaSurface === cls ? ' active' : '');
        b.dataset.surface = cls;
        b.textContent = label;
        b.addEventListener('click', () => {
          state.rgbaSurface = cls;
          renderRgbaInspector();
        });
        pills.appendChild(b);
      });
    }

    grid.innerHTML = '';
    DATA.summary.models.forEach((m) => {
      const r = RUN_MAP[`primary__native-transparent-cutout__${m.modelId}`];
      if (!r) return;
      const det = r.deterministic || {};
      const alphaPct = det.alphaBgZeroRatio != null ? (det.alphaBgZeroRatio * 100).toFixed(1) + '%' : '0.0%';
      const isTrueRgba = Boolean(r.hasAlpha && (det.alphaBgZeroRatio || 0) > 0.85);
      let statusBadge = '';
      if (isTrueRgba) {
        statusBadge = `<span class="verdict-pill verdict-pass">✓ RGBA (${alphaPct} Alpha=0)</span>`;
      } else if (m.modelId === 'mai-image-2-6') {
        statusBadge = `<span class="verdict-pill verdict-fail">✕ HTTP 400 → RGB Fallback</span>`;
      } else {
        statusBadge = `<span class="verdict-pill verdict-fail">✕ ${T('假棋盘格画死在 RGB', 'Fake Baked RGB Grid (0% Alpha)')}</span>`;
      }

      const card = document.createElement('div');
      card.className = 'rgba-card';
      card.innerHTML = `
        <div class="rgba-stage">
          <div class="rgba-box ${state.rgbaSurface}">
            <img src="./${r.webpPath}" alt="${r.modelLabel} live RGBA composite" loading="lazy">
            <span class="rgba-tag">${T('实时底板合成', 'Live CSS Backdrop')}</span>
          </div>
          <div class="rgba-box surface-slate">
            <img src="./outputs/s11_composited_preview/${m.modelId}.webp" alt="${r.modelLabel} split proof" loading="lazy">
            <span class="rgba-tag">${T('双底板密封存证', 'Sealed Split Proof')}</span>
          </div>
        </div>
        <div class="rgba-info">
          <div style="display:flex;justify-content:space-between;align-items:center;gap:6px;flex-wrap:wrap;margin-bottom:6px">
            <strong>${r.modelLabel} (${fmtUsd(r.costUsd)})</strong>
            ${statusBadge}
          </div>
          <div style="color:var(--text-muted);font-size:12px">
            BRF/VEQ/CNS: <strong>${r.scores.brf}/${r.scores.veq}/${r.scores.cns}</strong> ·
            SSIM: <strong>${det.nonEditSsim?.toFixed(3)}</strong> ·
            ${fmtSec(r.latencyMs)}
          </div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  /* Tab 3: S12 Two-Tier Workflow Viewer */
  function renderTurn2Viewer() {
    const pills = document.getElementById('turn2-pills');
    const stage = document.getElementById('turn2-stage');
    const tbody = document.getElementById('turn2-tbody');
    if (!stage || !tbody) return;

    const workflows = DATA.summary.turn2Consistency;
    if (pills) {
      pills.innerHTML = '';
      workflows.forEach((wf) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip' + (state.turn2WorkflowId === wf.workflowId ? ' active' : '');
        b.dataset.wf = wf.workflowId;
        b.textContent = `${wf.label} (${fmtUsd(wf.twoTurnTotalCostUsd)})`;
        b.addEventListener('click', () => {
          state.turn2WorkflowId = wf.workflowId;
          renderTurn2Viewer();
        });
        pills.appendChild(b);
      });
    }

    const active = workflows.find((w) => w.workflowId === state.turn2WorkflowId) || workflows[0];
    const isHybrid = active.workflowId === 'mai-flash-to-2-7-hybrid';
    const turn1ModelId = isHybrid ? 'mai-image-2-7-flash' : active.workflowId;
    const turn1Run = RUN_MAP[`primary__multi-turn-brand-consistency__${turn1ModelId}`];
    const turn2Run = RUN_MAP[`turn2__multi-turn-brand-consistency__${active.workflowId}`];

    stage.innerHTML = `
      <div class="step-card">
        <img src="./references/multi-turn-brand-consistency.webp" alt="Turn 0 Studio Reference">
        <div class="step-body">
          <div style="font-weight:800;color:var(--accent)">Turn 0 · ${T('商业摄影棚原图 (1024×1024)', 'Studio Product Input (1024×1024)')}</div>
          <p style="margin:6px 0 0;color:var(--text-muted)">KUROGANE ROAST · SINGLE ESTATE KYOTO · 250G</p>
        </div>
      </div>
      <div class="step-card">
        <img src="./outputs/primary/multi-turn-brand-consistency/${turn1ModelId}.webp" alt="Turn 1 Cafe Placement">
        <div class="step-body">
          <div style="font-weight:800;color:var(--accent)">Turn 1 · ${turn1Run?.modelLabel || turn1ModelId} (${fmtUsd(turn1Run?.costUsd)})</div>
          <p style="margin:6px 0 0;color:var(--text-muted)">
            ${T('木质吧台场景生成', 'Wooden Espresso Counter')} · ${fmtSec(turn1Run?.latencyMs)} ·
            BRF/VEQ/CNS <strong>${turn1Run?.scores.brf}/${turn1Run?.scores.veq}/${turn1Run?.scores.cns}</strong>
          </p>
        </div>
      </div>
      <div class="step-card">
        <img src="./outputs/turn2/multi-turn-brand-consistency/${active.workflowId}.webp" alt="Turn 2 Evening Warm Relight">
        <div class="step-body">
          <div style="font-weight:800;color:var(--blue)">Turn 2 · ${active.label} (${T('总计', '2-Turn Total')} ${fmtUsd(active.twoTurnTotalCostUsd)})</div>
          <p style="margin:6px 0 0;color:var(--text-muted)">
            ${T('黄昏暖光重打光', 'Evening Warm Tungsten Relight')} · ${fmtSec(active.twoTurnTotalLatencyMs)} ·
            Scene SSIM <strong>${active.turn1ToTurn2SceneSsim.toFixed(3)}</strong> ·
            BRF/VEQ/CNS <strong>${active.turn2Brf}/${active.turn2Veq}/${active.turn2Cns}</strong>
          </p>
          <div style="margin-top:6px;font-size:11.5px;color:var(--amber)">
            ${LANG === 'zh' ? (turn2Run?.note_zh || '') : (turn2Run?.note_en || '')}
          </div>
        </div>
      </div>
    `;

    const sunburstCost = workflows.find((w) => w.workflowId === 'gpt-image-2-5-sunburst')?.twoTurnTotalCostUsd || 0.1226;
    tbody.innerHTML = workflows.map((w) => {
      const savings = ((1 - w.twoTurnTotalCostUsd / sunburstCost) * 100);
      const savTxt = savings >= 0 ? `-${savings.toFixed(1)}%` : `+${Math.abs(savings).toFixed(1)}%`;
      const hl = w.workflowId === 'mai-flash-to-2-7-hybrid' ? ' class="highlight-row"' : '';
      return `
        <tr${hl}>
          <td><strong>${w.label}</strong></td>
          <td><strong>${fmtUsd(w.twoTurnTotalCostUsd)}</strong></td>
          <td>${savTxt}</td>
          <td>${fmtSec(w.twoTurnTotalLatencyMs)}</td>
          <td>${w.turn2Brf} / ${w.turn2Veq} / ${w.turn2Cns}</td>
          <td>${w.turn1ToTurn2SceneSsim.toFixed(4)}</td>
          <td>${w.turn0ToTurn2CanisterSsim.toFixed(4)}</td>
        </tr>
      `;
    }).join('');
  }

  /* Tab 4: ZH-CN Perturbation */
  function renderPerturbationTab() {
    const scenePills = document.getElementById('perturb-scene-pills');
    const modelPills = document.getElementById('perturb-model-pills');
    const trio = document.getElementById('perturb-trio');
    const tbody = document.getElementById('perturb-tbody');
    if (!trio || !tbody) return;

    const pScenes = ['portrait-retouch', 'packaging-label', 'web-banner', 'app-screen'];
    const pModels = ['mai-image-2-7-flash', 'mai-image-2-7', 'flux-2-pro', 'gpt-image-2-5-sunburst'];

    if (scenePills) {
      scenePills.innerHTML = '';
      pScenes.forEach((sid) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip' + (state.perturbSceneId === sid ? ' active' : '');
        b.dataset.ps = sid;
        b.textContent = sceneTitle(sid);
        b.addEventListener('click', () => {
          state.perturbSceneId = sid;
          renderPerturbationTab();
        });
        scenePills.appendChild(b);
      });
    }

    if (modelPills) {
      modelPills.innerHTML = '';
      pModels.forEach((mid) => {
        const b = document.createElement('button');
        b.type = 'button';
        b.className = 'chip' + (state.perturbModelId === mid ? ' active' : '');
        b.dataset.pm = mid;
        b.textContent = MODEL_MAP[mid]?.label || mid;
        b.addEventListener('click', () => {
          state.perturbModelId = mid;
          renderPerturbationTab();
        });
        modelPills.appendChild(b);
      });
    }

    const scObj = SCENE_MAP[state.perturbSceneId];
    const enRun = RUN_MAP[`primary__${state.perturbSceneId}__${state.perturbModelId}`];
    const zhRun = RUN_MAP[`perturb_zh__${state.perturbSceneId}__${state.perturbModelId}`];
    const row = DATA.summary.perturbationZhVsEn.find(
      (p) => p.sceneId === state.perturbSceneId && p.modelId === state.perturbModelId
    );

    if (enRun && zhRun && row) {
      const deltaColor = row.scoreDeltaPts < -10 ? 'var(--danger)' : 'var(--ok)';
      trio.innerHTML = `
        <div class="step-card">
          <img src="./references/${state.perturbSceneId}.webp" alt="Original Input">
          <div class="step-body">
            <strong>1. ${T('原始商业输入图 (1024×1024)', 'Original Commercial Input (1024×1024)')}</strong>
            <p style="margin:6px 0 0;font-size:12px;color:var(--text-muted)">${sceneTitle(state.perturbSceneId)}</p>
          </div>
        </div>
        <div class="step-card">
          <img src="./${enRun.webpPath}" alt="English Brief Output">
          <div class="step-body">
            <strong>2. ${enRun.modelLabel} · EN Brief (${row.enScore100.toFixed(1)} pts)</strong>
            <p style="margin:5px 0;font-size:11.5px;color:var(--text-muted)">"${scObj.prompt_en}"</p>
            <div style="font-size:12px">BRF/VEQ/CNS: <strong>${enRun.scores.brf}/${enRun.scores.veq}/${enRun.scores.cns}</strong> · SSIM ${row.enNonEditSsimPct.toFixed(1)}%</div>
          </div>
        </div>
        <div class="step-card">
          <img src="./${zhRun.webpPath}" alt="Chinese Brief Output">
          <div class="step-body">
            <div style="display:flex;justify-content:space-between;gap:6px;align-items:center">
              <strong>3. ${zhRun.modelLabel} · ZH Brief (${row.zhScore100.toFixed(1)} pts)</strong>
              <span style="font-weight:800;color:${deltaColor}">${row.scoreDeltaPts >= 0 ? '+' : ''}${row.scoreDeltaPts.toFixed(1)} pts</span>
            </div>
            <p style="margin:5px 0;font-size:11.5px;color:var(--text-muted)">"${scObj.prompt_zh}"</p>
            <div style="font-size:12px">BRF/VEQ/CNS: <strong>${zhRun.scores.brf}/${zhRun.scores.veq}/${zhRun.scores.cns}</strong> · SSIM ${row.zhNonEditSsimPct.toFixed(1)}%</div>
            <div style="margin-top:5px;font-size:11.5px;color:var(--text-muted)">${LANG === 'zh' ? zhRun.note_zh : zhRun.note_en}</div>
          </div>
        </div>
      `;
    }

    tbody.innerHTML = DATA.summary.perturbationZhVsEn.map((p) => {
      const isMai = p.modelId.startsWith('mai-image-2-7');
      const bad = p.scoreDeltaPts < -15;
      return `
        <tr${isMai ? ' class="highlight-row"' : ''}>
          <td>${sceneTitle(p.sceneId)}</td>
          <td><strong>${p.modelLabel}</strong></td>
          <td>${p.enScore100.toFixed(1)}</td>
          <td>${p.zhScore100.toFixed(1)}</td>
          <td style="font-weight:800;color:${bad ? 'var(--danger)' : 'var(--ok)'}">${p.scoreDeltaPts >= 0 ? '+' : ''}${p.scoreDeltaPts.toFixed(1)} pts</td>
          <td>${p.enNonEditSsimPct.toFixed(2)}% → ${p.zhNonEditSsimPct.toFixed(2)}%</td>
          <td>${p.zhAccept ? '<span class="verdict-pill verdict-pass">✓ Pass</span>' : '<span class="verdict-pill verdict-fail">✕ Reject</span>'}</td>
        </tr>
      `;
    }).join('');
  }

  /* Tab 5: Embedded Pure-SVG Pareto & Accepted/$1 Bar Charts + Full Table */
  function renderCharts() {
    if (!DATA) return;
    const scatterHost = document.getElementById('svg-pareto-scatter');
    const barHost = document.getElementById('svg-edits-per-dollar');
    const leaderBody = document.getElementById('leaderboard-tbody');
    if (!scatterHost || !barHost) return;

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const gridCol = isDark ? '#30363d' : '#e2ddd2';
    const axisCol = isDark ? '#9da7b3' : '#555e6d';
    const textCol = isDark ? '#e6edf3' : '#16181d';
    const maiCol = isDark ? '#2dd4bf' : '#0f766e';
    const oaiCol = isDark ? '#60a5fa' : '#2563eb';
    const bflCol = isDark ? '#f59e0b' : '#d97706';

    // 1. Pareto Cost-vs-Quality Scatter (X: $0.00 -> $0.115, Y: 3.70 -> 4.20 Mean Profile Score)
    const W = 680, H = 400;
    const padL = 62, padR = 32, padT = 28, padB = 50;
    const plotW = W - padL - padR;
    const plotH = H - padT - padB;
    const xMin = 0, xMax = 0.115;
    const yMin = 3.72, yMax = 4.20;
    const xPos = (c) => padL + ((c - xMin) / (xMax - xMin)) * plotW;
    const yPos = (s) => padT + plotH - ((s - yMin) / (yMax - yMin)) * plotH;

    let gridSvg = '';
    for (const xv of [0.01, 0.035, 0.06, 0.085, 0.105]) {
      const x = xPos(xv).toFixed(1);
      gridSvg += `<line x1="${x}" y1="${padT}" x2="${x}" y2="${padT + plotH}" stroke="${gridCol}" stroke-dasharray="4 4"/>`;
      gridSvg += `<text x="${x}" y="${H - 20}" text-anchor="middle" fill="${axisCol}" font-size="11.5">$${xv.toFixed(3).replace(/0+$/, '')}</text>`;
    }
    for (const yv of [3.75, 3.85, 3.95, 4.05, 4.15]) {
      const y = yPos(yv).toFixed(1);
      gridSvg += `<line x1="${padL}" y1="${y}" x2="${padL + plotW}" y2="${y}" stroke="${gridCol}" stroke-dasharray="4 4"/>`;
      gridSvg += `<text x="${padL - 10}" y="${Number(y) + 4}" text-anchor="end" fill="${axisCol}" font-size="11.5">${yv.toFixed(2)}</text>`;
    }

    // Pareto frontier connecting MAI-2.7-Flash -> MAI-2.7 -> MAI-2.6
    const mFlash = MODEL_MAP['mai-image-2-7-flash'];
    const m27 = MODEL_MAP['mai-image-2-7'];
    const m26 = MODEL_MAP['mai-image-2-6'];
    const paretoPath = `M ${xPos(mFlash.meanCostUsd).toFixed(1)} ${yPos(mFlash.meanProfileScore).toFixed(1)} L ${xPos(m27.meanCostUsd).toFixed(1)} ${yPos(m27.meanProfileScore).toFixed(1)} L ${xPos(m26.meanCostUsd).toFixed(1)} ${yPos(m26.meanProfileScore).toFixed(1)}`;

    const labelOffsets = {
      'mai-image-2-7-flash': [12, -10],
      'mai-image-2-7': [12, 16],
      'mai-image-2-6': [12, -10],
      'gpt-image-2-5-sunburst': [12, -10],
      'gpt-image-2': [12, 4],
      'gpt-image-2-5-flare': [12, 15],
      'flux-2-pro': [12, 5],
      'flux-2-flex': [-12, -12],
    };

    let ptsSvg = '';
    DATA.summary.models.forEach((m) => {
      const cx = xPos(m.meanCostUsd);
      const cy = yPos(m.meanProfileScore);
      const col = m.provider.includes('MAI') ? maiCol : m.provider.includes('OpenAI') ? oaiCol : bflCol;
      const [dx, dy] = labelOffsets[m.modelId] || [10, -8];
      const anchor = dx < 0 ? 'end' : 'start';
      const ring = m.supportsNativeTransparentAlpha
        ? `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="11" fill="none" stroke="${col}" stroke-width="2" stroke-dasharray="3 2"/>`
        : '';
      ptsSvg += `
        <g>
          ${ring}
          <circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="6.5" fill="${col}"/>
          <text x="${(cx + dx).toFixed(1)}" y="${(cy + dy).toFixed(1)}" text-anchor="${anchor}" fill="${textCol}" font-size="12" font-weight="700">${m.label} (${m.meanProfileScore.toFixed(2)})</text>
        </g>
      `;
    });

    scatterHost.innerHTML = `
      <svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Pareto Cost vs Quality Scatter">
        ${gridSvg}
        <path d="${paretoPath}" fill="none" stroke="${maiCol}" stroke-width="2.5"/>
        ${ptsSvg}
        <text x="${padL + plotW / 2}" y="${H - 3}" text-anchor="middle" fill="${axisCol}" font-size="12" font-weight="600">${T('单张 1024×1024 平均实测成本 (USD，越左越省) · 虚线外环 = 支持原生 RGBA', 'Mean Unit Cost per 1024×1024 Edit (USD, lower is cheaper) · Dashed Ring = Native RGBA')}</text>
        <text x="16" y="${padT + plotH / 2}" text-anchor="middle" fill="${axisCol}" font-size="12" font-weight="600" transform="rotate(-90 16 ${padT + plotH / 2})">${T('ServImage 三维均分 (0–5)', 'Mean ServImage Profile (0–5)')}</text>
      </svg>
    `;

    // 2. Accepted Edits per $1 Horizontal Bar Chart
    const sorted = [...DATA.summary.models].sort((a, b) => b.acceptedDeliverablesPerDollar - a.acceptedDeliverablesPerDollar);
    const BW = 620, BH = 400;
    const bL = 178, bR = 86, bT = 22;
    const rowH = 44;
    const maxVal = 44.0;
    let barsSvg = '';
    sorted.forEach((m, i) => {
      const y = bT + i * rowH;
      const w = Math.max(6, (m.acceptedDeliverablesPerDollar / maxVal) * (BW - bL - bR));
      const isMai27 = m.modelId === 'mai-image-2-7' || m.modelId === 'mai-image-2-7-flash';
      const fill = isMai27 ? maiCol : m.provider.includes('OpenAI') ? oaiCol : (isDark ? '#64748b' : '#94a3b8');
      barsSvg += `
        <g>
          <text x="${bL - 10}" y="${y + 18}" text-anchor="end" fill="${textCol}" font-size="12.5" font-weight="${isMai27 ? '800' : '600'}">${m.label}</text>
          <rect x="${bL}" y="${y + 4}" width="${w.toFixed(1)}" height="22" rx="6" fill="${fill}"/>
          <text x="${(bL + w + 8).toFixed(1)}" y="${y + 19}" fill="${textCol}" font-size="12.5" font-weight="800">${m.acceptedDeliverablesPerDollar.toFixed(2)} / $1</text>
        </g>
      `;
    });

    barHost.innerHTML = `
      <svg viewBox="0 0 ${BW} ${BH}" role="img" aria-label="Accepted Commercial Edits per Dollar">
        ${barsSvg}
        <text x="${bL}" y="${BH - 8}" fill="${axisCol}" font-size="11.5" font-weight="600">${T('每 $1 API 预算产出的零返工合格商业图张数（基于 12 场景实测通过率 ÷ 实测均价）', 'Zero-Retouch Accepted Commercial Deliverables per $1 Spend (Measured)')}</text>
      </svg>
    `;

    if (leaderBody) {
      leaderBody.innerHTML = sorted.map((m) => {
        const isMai27 = m.modelId === 'mai-image-2-7' || m.modelId === 'mai-image-2-7-flash';
        return `
          <tr${isMai27 ? ' class="highlight-row"' : ''}>
            <td><strong>${m.label}</strong></td>
            <td>${m.provider}</td>
            <td><strong>${m.meanBrf.toFixed(2)}</strong> / ${m.meanVeq.toFixed(2)} / ${m.meanCns.toFixed(2)}</td>
            <td>${m.meanProfileScore.toFixed(2)}</td>
            <td>${m.acceptedCount}/12 (${(m.acceptRate * 100).toFixed(1)}%)</td>
            <td>${m.meanNonEditSsim.toFixed(4)}</td>
            <td>${fmtSec(m.medianLatencyMs)}</td>
            <td>${fmtUsd(m.meanCostUsd)}</td>
            <td><strong>${m.acceptedDeliverablesPerDollar.toFixed(2)} / $1</strong></td>
            <td>${m.supportsNativeTransparentAlpha ? '✓ RGBA' : '✕ Opaque'}</td>
          </tr>
        `;
      }).join('');
    }
  }

  async function boot() {
    initTheme();
    initTabs();
    const d = await loadStudioData();
    indexData(d);
    bindStageInteractions();
    renderArena();
    renderRgbaInspector();
    renderTurn2Viewer();
    renderPerturbationTab();
    renderCharts();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
