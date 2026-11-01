# Dark Aurora Studio production migration

## Surface contract / 页面约定

Qi Chen (@turbo998) remains the site identity. The revised Dark Aurora Studio direction defaults to deep navy, with localized blue-violet/cyan light fields and solid reading surfaces. An explicit light option remains available. The home page is curated; the complete archive is a separate destination.

- English / 中文 home: `index.html` / `zh.html`.
- Studio directory: `studio/index.html` / `studio/zh-index.html`.
- Seven topic pairs: `studio/<track>.html` / `studio/zh-<track>.html`, where track is `infra`, `commerce`, `voice`, `benchmarks`, `animation`, `game`, or `security`.
- Archive: `studio/archive.html` / `studio/zh-archive.html`.
- Topic order: Architecture → Evaluation → Demos → Resources.
- Native HTML contains primary navigation and reading content; JavaScript is enhancement, not a prerequisite for the directory.
- Portal pages use document scrolling, not fixed-height main panes or embedded full HTML applications. Genuine application canvases and local logs are assessed separately from page-within-page scrolling.

首页保留清晰个人身份和精选内容，完整资料在独立档案页。主题页以原生链接打开文章与独立演示，不把整页应用塞进 iframe。旧样稿仍保留在 `design-preview/`，它不是正式网站的入口。

## Sources and regeneration / 来源与重建

`route-inventory.json`, `link-inventory.json`, and `inventory-summary.md` are a **frozen historical inventory** of baseline `b31286a`. Their language/iframe counts describe the old site, not the new implementation. Do not rewrite that evidence to imply a cleaner baseline.

`node scripts\build-site.cjs` rebuilds production portal files and `production-routes.json` from that inventory and the approved static prototypes. Edit the generator for production layout/routing changes; do not hand-edit generated portal HTML and lose the changes at the next build. Existing reports, measurements and demo engines are not inputs for recomputing any result.

## Language and navigation / 语言与导航

The portal has separate static English and Chinese URLs. Its language switch retains topic, hash and theme. `?lang=en` / `?lang=zh-CN` selects the corresponding page when JavaScript is available; native counterpart links work without JavaScript. `?theme=light|dark` overrides the shared versioned `kee-aurora-theme-v1` preference. First visit and no-JavaScript pages default to dark, regardless of OS theme. The old automatically populated `kee-editorial-theme` value is ignored; explicit choices made in the new design persist. Header transparency has an opaque fallback and a reduced-transparency override; reading content is not glass.

The historical inventory found 59 pages without verified file counterparts and 16 filename/language conflicts. These are remediation inputs, not proof of translations. Reading content requires substantive translated counterparts; translating only navigation does not qualify. Dedicated demos and sealed reports retain their original interface/data when translation would alter the protected artifact. Their source-language limitations must be explicitly identified. External services control their own translations and availability.

完整中英门户和阅读正文必须以真实译文核验，不能以 `.en.html` 文件名或双语顶栏冒充完成。专用演示和密封报告保留原始内容，并明确说明适用的语言限制；不改动研究结论、坐标或来源数据。

The reading manifest covers 80 original surfaces plus 12 new English editions: 84 native reading pages with counterpart links and eight explicitly protected application/report exceptions. All 16 filename/language conflicts are resolved from source content. The Infra English edition uses eight translated SVG derivatives; only text labels change, with source geometry, styling and numerical claims preserved. Its top-right language link switches actual static editions, retains the section/theme, and returns directly to the matching Infra topic.

Remaining source-language media are explicitly listed in `reading-migration.json`: the Bilibili explainer's six recorded videos, six posters and six contact sheets retain their original Chinese audio/image content; surrounding episode prose, storyboards and controls are translated. The DeepInfer archive retains an existing Chinese/English GPU-count discrepancy (2,432 versus approximately 2,371), with a disclosure rather than an invented reconciliation. Protected demo/report interfaces are not represented as translated reading prose.

## Legacy routing / 旧链接兼容

`frontier-ai-studio.html` is a static directory plus a small redirect adapter, never an iframe host.

- `#<track>` → independent topic.
- `#<track>/stage-N` and `#<track>/stage/N` → its `architecture`, `evaluation`, `demos`, or `resources` section.
- `#<track>/module/<id>` → the real original resource for each of the 37 scenes, using a verified counterpart where available.
- `?track=<track>` is supported. Language/theme query values are carried forward.
- Unknown tracks leave a usable static directory; unknown modules fall back to their topic.
- Without JavaScript, the compatibility page exposes native topic and complete scene links.
- Home anchors `top`, `architecture`, `studio-directory`, `workbenches`, `pillars`, `writing`, `stage-2`, `matrix`, and `explore` remain aliases into the curated home.

The route test runs against both domain-root and project-subpath bases. External resource links remain external.

## Validation / 验证

Use an existing Node/Puppeteer environment and a local static server. Test outputs should be outside the checkout, not committed alongside the site.

```powershell
python -m http.server 8797 --bind 127.0.0.1
# In a second terminal:
$env:SITE_TEST_URL = 'http://127.0.0.1:8797'
$env:SITE_ARTIFACT_DIR = '<absolute session artifact directory>'
$env:READING_ARTIFACTS = "$env:SITE_ARTIFACT_DIR\reading"
node scripts\inventory-routes.cjs --check
node tests\aurora-theme.cjs
node tests\site-structure.cjs
node tests\production-routes.cjs
node scripts\integrate-dedicated.cjs --check
node scripts\integrate-webiq.cjs --check
node tests\webiq-integration.cjs
node scripts\integrate-radar.cjs --check
node tests\radar-integration.cjs
node tests\reading-migration.cjs
$env:FULL_BROWSER_AUDIT = '1'
node tests\full-site-audit.cjs
```

- `site-structure.cjs` now invokes the production test, replacing the obsolete active-iframe assertion. It covers 36 home/Studio/Infra screenshot states, touch/wheel document scrolling, keyboard menu/focus, language/theme/history, native links, no-JS content, and 320px reflow.
- `production-routes.cjs` checks all 37 scene mappings, both stage syntaxes, all portal layouts and no-JS navigation. Its route VM checks are **not** demo runtime acceptance.
- `full-site-audit.cjs` preserves every baseline HTML destination and checks local references/fragments. `FULL_BROWSER_AUDIT=1` checks desktop/mobile runtime overflow, frames, scroll containers and script errors on every page. Document overflow, local full-HTML iframes, errors and unreviewed inner vertical scrollers fail the gate. Narrow named application inspectors and code/log editors are recorded separately, not silently treated as document panes.
- Reading and dedicated tests provide content preservation/translation checks and genuine representative demo interaction. They must not block child frames or all external traffic and then claim those features passed.
- Browser microphone permission, credentials, live APIs, CDN availability and hardware-dependent rendering are separate constraints; report them rather than fabricating successful live sessions.

## Concurrent publication / 并发发布保留

The migration also incorporates upstream commit `9b894e2` (four Web IQ HTML surfaces plus Bicep) and its `cf5bb77` account-created/unmeasured status correction without replacing that work. `scripts/integrate-webiq.cjs` adds only marked native navigation and escapes two malformed JavaScript string labels that otherwise prevent the offline demo from starting. Removing the perimeter and reversing those quote escapes recovers its source byte-for-byte. Its CSP and Bicep are unchanged; no Azure backend was provisioned or claimed connected. The Commerce track and complete archive expose the bilingual guide and sandbox.

专用资源继续保留自己的内容与内部设计，统一的是深蓝外围、上下文返回和语言入口。报告数据不因配色变更而重新生成。完整档案同时保留 146 个基线页面、12 个新增英文阅读版本和 8 个后续 Web IQ / GitHub Radar 页面；新增门户由主导航访问。

Upstream `2bd0bd8` adds two bilingual GitHub Radar dashboard pages and two protected report decks. Their source findings, README pair and summary SVG are retained, with native Aurora perimeter navigation. The curated home, Benchmark topic, archive and affected reading-page menus preserve discoverability without restoring the former iframe layout. `scripts/integrate-radar.cjs` and `tests/radar-integration.cjs` verify this separately from the frozen reading inventory. Radar data is preserved reported material, not a benchmark newly measured during the redesign.

## Release and rollback / 发布与回退

The source remote is `turbo998/Kee-Tech-Assets` (`origin`); actual public Pages is `turbo998/turbo998.github.io` (`pages`). Fetch and integrate both current main refs before publishing, preserve other work, and use only fast-forward pushes. Verify the integrated tree before pushing it to both `main` refs.

Check the new commit's **Pages build and deployment Actions run** and actual rendered public content/assets/routes. The legacy Pages build API can report an old error, and the unrelated Azure Static Web Apps workflow is not the Pages deployment verdict. HTTP 200 alone is insufficient.

Keep the local preview available through production verification. Never write into a checkout outside the session's allowed worktree. If the user's main checkout cannot be synchronized under that restriction, report its limitation explicitly rather than changing its files or branch behind their back.

Rollback is a new, reviewed revert commit applied to both remote main branches; never force-push published history. The pre-migration baseline is `b31286a`, while commits `5ed4988` and `70f7e5c` preserve the approved prototype and inventory independently.
