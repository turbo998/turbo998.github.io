# R6 dedicated-surface integration

## Scope and reproduction

Frozen source: `b31286a79f4ff5443b480566934ce2e2e58c59ef` from `route-inventory.json`. Exactly **63 owned surfaces: 28 demos, 31 reports, 4 auxiliary pages**. The complete file-by-file ownership, track, language evidence, changes, hashes, constraints and scroll exceptions are in `dedicated-integration.json`.

Only those 63 HTML files and these integration files are changed by this work:

- `assets/dedicated-navigation.css`
- `scripts/integrate-dedicated.cjs`
- `tests/dedicated-smoke.cjs`
- `docs/redesign/dedicated-integration.json`
- This document

No shared assets, route inventory, preview prototypes, other-role pages, report data files or bundled application assets are changed. No commits, pushes or deployments are performed by this assignment.

```powershell
node scripts\integrate-dedicated.cjs
node scripts\integrate-dedicated.cjs --check
$env:DEDICATED_ARTIFACTS="$HOME\.copilot\session-state\d4e2b4e8-91dc-4f4c-b368-6f587f5db788\files\dedicated-integration"
node tests\dedicated-smoke.cjs --static
node tests\dedicated-smoke.cjs --layout
node tests\dedicated-smoke.cjs
```

The tests use the existing `http://127.0.0.1:8797` server and installed Puppeteer. They neither intercept network requests nor suppress frames. The generator reads original source with `git show` and reproduces the transformation; it refuses unrecognized initial edits. Re-run `--check` after any further changes to these owned pages.

## What changed

- A normal-flow Dark Aurora Studio perimeter uses solid navy `#101A30`, text `#EEF3FF`, muted `#ADBBD1`, links `#9AABFF`, keyboard focus `#56DDCD`, and border `#314361`. It provides native relative Home, Studio, actual inventory-track and resource-language links. Identity is Qi Chen / @turbo998. Keyboard links work without JavaScript. No theme storage key is read or written; dedicated application themes and report interiors remain their own.
- The palette-only revision can be checked against committed integration `4134adc` by setting `DEDICATED_PERIMETER_BASELINE=4134adc` before running the static/smoke tests. Restoring the previous embedded perimeter stylesheet must reproduce every committed page byte; original report-source and CSP checks remain separate. Browser smoke verifies computed colors at 1440px and 390px, including native no-JavaScript keyboard focus.
- Genuine translated file pairs and existing in-page language buttons are used. Unverified/unavailable translations are labeled honestly. Benchmark prose is not synthesized or translated by this integration.
- The two obsolete three-style previews become native production compatibility pages. Pelican comparison pages now link directly to their three native simulators, instead of embedding entire HTML applications; obsolete synchronized iframe controls are retired. The actual simulator canvases and runtime are retained.
- Game and Astra viewports are contained below the normal-flow navigation. Their original controls/canvas geometry remain local to the viewport, while the document itself scrolls. Voice slide navigation remains native; its active slide now uses document scrolling.
- Mobile layout minima, control wrapping and long simulation labels are repaired in Knowledge Explainer, Infra and the MAF workbench. Tables and original fixed-size report documents have narrowly scoped horizontal scrolling, not hidden/clipped overflow. There is no global card/demo styling override.
- Both Commerce demos had two unescaped `""` pairs in the original bilingual response-label strings, causing `Unexpected string`. Escaping those quotes restores the native runtime without changing label values or evaluation data.
- Infra selector had five duplicate selector IDs and a duplicate subsea output ID. The second control/function pairs now use `sel_observatory_mode` / `observatoryOut`, `sel_smr_reforming_mode`, `sel_lng_membrane_mode`, `sel_sic_gan_mode`, and `sel_lh2_zbo_mode`. Existing counterpart controls remain unchanged.

## Protected reports and CSP

All **31 report originals are recovered byte-for-byte** by stripping only marked perimeter additions, marked document-viewport wrappers, added body namespace classes and an injected genuine language-control ID. Original data, scores, coordinates, conclusions, provenance, card CSS and script contents remain unchanged.

Fixed 900px card decks retain their original layout inside `.kee-dedicated-report-viewport`; DeepInfer retains its original 460px grid minimum. The viewport has native horizontal scrolling and keyboard focus, no height cap and no nested vertical scroll. The inner wrapper reproduces the original body layout; wrappers use `display:contents` for print. Narrow-screen MAF English prose can wrap long tokens without changing the text.

Sealed CSP is not loosened. Navigation CSS is embedded inline, and navigation uses static HTML rather than blocked external CSS or JavaScript. Decision-1, AI Security and MAF representative report smoke checks compare CSP to the frozen original, require `default-src 'none'; style-src 'unsafe-inline'`, and verify no additional runtime network dependency or CSP/console/runtime error. MAF's **pre-existing** `img-src data:` allowance is retained, not added. Voice's pre-existing inline-script policy and original language controls are likewise retained.

## Validation and artifacts

`static.json`, `owned-layouts.json` and `smoke.json`, plus desktop/mobile screenshots, are under the `DEDICATED_ARTIFACTS` directory above.

- Static: all 63 routes match the deterministic transform; all 31 reports pass byte-preservation; new navigation targets exist and are relative; no owned iframe remains; all classic inline scripts parse.
- Layout: **124 browser states**, 62 local pages at widths 390 and 1440, plus a separately classified local HTTP check for the external redirect. No document overflow, duplicate IDs or page runtime errors. Non-code vertical scroll regions are checked against exact per-file selectors below, not a blanket application exception.
- Thirteen representative smoke scenarios: Infra Code-Interpreter simulation; five repaired selector controls; Commerce Next Step in both languages; Rocket Launch then Pause; Scrap Swarm start, move right and pause; Decision-1, AI Security and MAF original reports; Astra viewport/inspector layout; Voice report English control; Voice deck Next; Pelican native links.
- Six additional template-fragment entry tests verify both runtime template state and active tab. A no-JavaScript keyboard-focus/native-home-link test passes.

These are **integration tests, not benchmark reruns**. All displayed benchmark numbers are original retained content, not new measurements from this validation.

## Exact vertical-scroll exceptions for the coordinator

These are original dedicated inspector/artifact regions. They are not document shells, their scrollbars are not hidden, and no generic page/class wildcard should be exempted.

| Exact file | Selector | Functional reason / state |
| --- | --- | --- |
| `animation/demos/astra-planet/index.html` | `#controls` | Planetary settings inspector beside the WebGL viewport; lighting, terrain and material controls. Initial state. |
| `generative-visual-lab/demos/astra-planet/index.html` | `#controls` | Same native inspector in the preserved alternate route. Initial state. |
| `animation/demos/pelican-bicycle-arena/demo-faf-pelican.html` | `#doc-box` | Native document/code artifact inspector beside the running simulator. Initial state. |
| `animation/demos/pelican-bicycle-arena/demo-agent-forge-pelican.html` | `#doc-box` | Native document/code artifact inspector beside the running simulator. Initial state. |
| `generative-visual-lab/demos/pelican-bicycle-arena/demo-faf-pelican.html` | `#doc-box` | Same native artifact inspector in the alternate route. Initial state. |
| `generative-visual-lab/demos/pelican-bicycle-arena/demo-agent-forge-pelican.html` | `#doc-box` | Same native artifact inspector in the alternate route. Initial state. |
| `animation/demos/pelican-bicycle-arena/demo-hve-pelican.html` | `#artifactContent` | Generated implementation-notes artifact inspector beside the simulator. Initial state. |
| `generative-visual-lab/demos/pelican-bicycle-arena/demo-hve-pelican.html` | `#artifactContent` | Same native artifact inspector in the alternate route. Initial state. |
| `animation/demos/knowledge-explainer-studio/index.html` | `#export-modal .modal-body` | Existing export dialog content/output, only while the user opens that dialog; not an initial-page exception. |
| `generative-visual-lab/demos/knowledge-explainer-studio/index.html` | `#export-modal .modal-body` | Same conditional export dialog in the alternate route. |

The manifest's `verticalScrollRegions` field contains these exact file-associated selectors and reasons. Existing PRE/CODE/TEXTAREA regions remain native code/editor scrollers. `.kee-dedicated-table-scroll` and `.kee-dedicated-report-viewport` are **horizontal-only in practice** (unconstrained height), not vertical-shell exceptions.

## Six genuine runtime fragments

Whitelist only these combinations in a static fragment checker, not arbitrary missing anchors:

- `animation/demos/knowledge-explainer-studio/index.html` with `#tpl-mcp`, `#tpl-rag`, `#tpl-finops`.
- `generative-visual-lab/demos/knowledge-explainer-studio/index.html` with the same three fragments.

The original inline script reads `window.location.hash`, maps `hashAlias`, computes `qTpl`, and calls `window.explainerStudio.selectTemplate(qTpl)` on initial page load. It deliberately does not create static IDs. Smoke opens each of the six complete URLs in a fresh document and checks `window.explainerStudio.snapshot().templateId` **and** `.tpl-tab.active[data-template]`:

| Fragment | Verified runtime template and active tab |
| --- | --- |
| `tpl-mcp` | `xiaozhe-mcp-node-graph` |
| `tpl-rag` | `xiaozhe-rag-pipeline-flow` |
| `tpl-finops` | `chimp-deepseek-unit-economics` |

All six pass without runtime errors; evidence is `smoke.json.templateHashes`. These are initial-load deep links from the landing pages, not a promise that changing only a hash on an already-loaded document triggers a `hashchange` handler. No links were deleted.

## Limits and integration requirements

- Preserve the parent-owned relative Home/Studio/track URL contracts; all referenced destinations currently exist. The parent owns final whole-site navigation/audit/deployment. No cross-owner content edit is required by this completed scope.
- Voice checks cover owned reports and deck controls only, not the topic-owned microphone sandbox, microphone permission, provider APIs, audio transcription, credentials or backend E2E.
- Infra and Commerce interactions are local UI simulations, not real Azure provisioning, policy enforcement, shopping transactions or cloud performance tests. The very long original Infra selector document is retained rather than paginated or truncated.
- Astra checks establish a noncollapsed native canvas viewport and accessible inspector/document scrolling. No claim is made about externally fetched terrain completion, graphics performance or every application control.
- `workshops/azure-vm-modernization/index.html` retains the existing external Azure-Infra-Lab redirect, query/hash forwarding and visible native fallback link. Its local response is checked separately; remote redirect timeouts are not local render/syntax failures or evidence of a deployed backend. No remote deployment was exercised.
- Existing external runtime dependencies of dedicated applications are retained. Sealed report pages remain self-contained. No API keys, microphone authorization or new packages were required.
