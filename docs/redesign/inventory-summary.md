# R2 — sealed route/content inventory

Baseline: `b31286a79f4ff5443b480566934ce2e2e58c59ef`. **Inventory only: no old-site changes, main checkout, commit, push, migration or compatibility runtime.** R3 remains at the parent's real visual approval gate; nothing here authorizes rollout.

## Reproduce and artifacts

- `node scripts\inventory-routes.cjs` writes the three artifacts; Node.js 22+ built-ins only, no installation.
- `node scripts\inventory-routes.cjs --check` regenerates in memory, checks byte equality and runs all self-checks without writing.
- [route-inventory.json](route-inventory.json): all 146 stable IDs, Git blob/SHA-256, titles, language evidence, pairs, roles, tracks, old/future URLs, preserve-design rules, scenes, resources, route mappings and findings.
- [link-inventory.json](link-inventory.json): occurrence-level source/line/resolution, every static href/iframe/onclick, script URL candidates, template links, dynamic assignments, script imports, source hashes and external boundaries.
- The sealed Git tree excludes **all new design-preview/ files**, this generator and the parent's preview generator/tests. Existing style-preview.html / zh-style-preview.html remain part of the 146 baseline.

## Coverage

| Measure | Result |
| --- | ---: |
| Baseline HTML / scanned JS-MJS-CJS | **146/146** / 28 |
| Tracks / scenes / native resource links | **7 / 37** / 52 |
| Static hrefs / total references and candidates | 2216 / 2539 |
| Static iframes / containing pages | 35 / 13 |
| Onclick handlers including templates / dynamic evidence | 650 / 79 |
| Unimplemented old-hash/language → static URL proposals | 200 |
| File-pair associations / filename-language conflicts | 38 / **16** |
| Byte-identical groups / external destination candidates | 34 / 136 |
| Missing static href/iframe/onclick paths | **0** |
| Broken legacy home anchors / missing server-route paths | **4** / 2 |

Roles: portal 17, topic 20, article 46, demo 28, report 31, auxiliary 4. 59 pages have no paired-file or in-page-switch evidence; candidate file pairs remain explicitly uncertain. All labels are evidence-based, not semantic translation certification.

## Seven-track route contract

| Track | Scenes | Actual fresh-load default | Proposed EN / ZH topic pages |
| --- | ---: | --- | --- |
| infra | 6 | scene-infra-i-pill-1 | `/studio/infra.html` / `/studio/zh-infra.html` |
| commerce | 3 | scene-commerce-c-pill-1 | `/studio/commerce.html` / `/studio/zh-commerce.html` |
| voice | 4 | scene-voice-v-pill-1 | `/studio/voice.html` / `/studio/zh-voice.html` |
| benchmarks | 9 | scene-benchmarks-b-pill-maf | `/studio/benchmarks.html` / `/studio/zh-benchmarks.html` |
| animation | 9 | scene-animation-a-pill-1 | `/studio/animation.html` / `/studio/zh-animation.html` |
| game | 4 | scene-game-g-pill-1 | `/studio/game.html` / `/studio/zh-game.html` |
| security | 2 | scene-security-s-pill-1 | `/studio/security.html` / `/studio/zh-security.html` |

The deferred `site-structure.js` is authoritative: the default track is **infra**, not the older inline voice variable. A recognized hash track wins over `?track=`; otherwise a recognized query track wins. Only initial `lang=en` selects English; missing/other values become zh-CN.

- `#track` scrolls stage 1. `#track/stage-N` recognizes N=1–4.
- **`#track/stage/N` does not select stage N in the baseline**: it selects the track, then falls back to stage 1. Proposed normalization is not implemented.
- `#track/module/id` selects a known module and scrolls stage 3 (even reports). Unknown IDs retain prior/default selection; recognized track hashes fall back to stage 1.
- Per-track selection persists until reload. Fresh defaults use the first non-report, not the HTML active button; benchmarks defaults to **b-pill-maf**, not b-pill-0.
- The seven manifest resource lists and overview links cloned into stage 4 are both mapped. All 37 scenes have proposed EN/ZH static topic links and existing native-resource targets, with explicit language fallbacks.
- Native report/demo URLs remain unchanged. Planned `/studio/*.html` and `/studio/zh-*.html` names are navigation proposals, not new runtime compatibility or shipped pages.

## Bilingual evidence, not assumed translations

**Commerce standalone architecture:** `workshops/agentic-commerce/index.html` (declares zh) and `index.en.html` (en). Interactive native demos are `live-demo.html` / `live-demo.en.html`; report files are `benchmark-cards.html` / `benchmark-cards.en.html`. All six exist. Report pairs lack direct crosslinks, so their association remains a naming/declaration candidate.

The legacy resolver only changes filenames for AI Security index/report pairs and the three root pages benchmarks, ai-security and security-ai-landing-zone; same-origin URLs otherwise only gain `lang`. **English commerce mode therefore keeps the Chinese filename**, despite existing .en alternatives. Proposed native links use existing paired files, not query-based translation claims.

Voice index and case-study expose zh-CN / zh-TW / en controls and dictionary evidence in directly imported `voice/app.js`; case-study also has an inline dictionary. These are recorded as in-page switching evidence, not certified complete translations.

**16 .en.html research pages declare zh-CN**, across animation/ and generative-visual-lab/ (asset taxonomy, Blender pipeline, Feitian, Opus landscape, publication/provenance, rocket, techniques and validation). Machine records retain filename hint, actual lang, character evidence and uncertain pairing; no automatic relabeling. Byte-identical copies are not translations and no deduplication is authorized.

## Iframes and external boundaries

| Source | Static frames |
| --- | ---: |
| `ai-security.html` | 1 |
| `animation/demos/pelican-bicycle-arena/index.html` | 3 |
| `animation/demos/pelican-bicycle-arena/pelican-arena.html` | 3 |
| `frontier-ai-studio.html` | 7 |
| `generative-visual-lab/demos/pelican-bicycle-arena/index.html` | 3 |
| `generative-visual-lab/demos/pelican-bicycle-arena/pelican-arena.html` | 3 |
| `security-ai-landing-zone.html` | 1 |
| `style-preview.html` | 3 |
| `workshops/faf-vs-agent-forge/index.html` | 3 |
| `workshops/faf-vs-agent-forge/pelican-arena.html` | 3 |
| `zh-ai-security.html` | 1 |
| `zh-security-ai-landing-zone.html` | 1 |
| `zh-style-preview.html` | 3 |

Studio mount resets seven frames, loads one and blanks inactive frames. Security deck switchers assign frame URLs from retained onclick literals; complete variable-assignment evidence is recorded. Historical style previews embed homes. Pelican arenas embed three demos each. Native report/demo embeds are **preserve-design exceptions**, not an instruction to remove every iframe.

Azure-Infra-Lab, other same-host project Pages, remote repositories and the linked Azure App Service are separate ownership/deployment surfaces. Same hostname does not mean this worktree owns their content. The existing VM redirect composes its external URL, forwards only lang/demo/theme/scoutTheme, and preserves the hash. Examples/private-address literals are not asserted to be public deployments. No external service was probed, copied, modified or published.

## Pre-existing failures and uncertainty

Four actual legacy home fragments are absent from both baseline HTML and the inspected root runtime sources. **Suggested repairs below are unimplemented.**

| Source | Existing broken fragment destination | Proposed repair |
| --- | --- | --- |
| `articles/harness-engineering.en.html:105` | `../index.html#writing` | `/writing.html` |
| `articles/harness-engineering.html:95` | `../zh.html#writing` | `/zh-writing.html` |
| `security-ai-landing-zone.html:162` | `index.html#pillars` | `/index.html#matrix` |
| `zh-security-ai-landing-zone.html:162` | `zh.html#pillars` | `/zh.html#matrix` |

The local server's historical exact routes point to two absent Git paths; these are not links from the deployed HTML:

| Missing baseline path | Literal occurrences | Evidence | Source |
| --- | ---: | --- | --- |
| `decision/strands-cards.html` | 2 | script-url-candidate | `server.mjs` |
| `decision/decision1-cards.html` | 2 | script-url-candidate | `server.mjs` |

All static href/iframe/onclick destination **paths** resolve in the baseline. Six knowledge-explainer `#tpl-*` fragments are source-evidenced runtime aliases, not broken IDs. Test-fixture strings, path.join components and composed external redirect filenames are not misreported as missing local routes. Generated markup is resolved against its importing document where known, not its JS asset directory. Unresolved templates remain marked uncertain. No failures were fixed in R2.

## Validation and approval boundary

Self-checks enforce 146 unique baseline paths/IDs, exact 7/37 distribution, 200 unique route proposals, existing internal scene resources, reciprocal associations, seven studio frames, route-source guards and parser fixtures. Every HTML entry records exact baseline hashes. Stable IDs derive from baseline paths; carry them forward across any future move rather than recomputing from new paths.

This is **static inventory**, not browser execution, complete arbitrary-JS data-flow analysis, external HTTP testing, translation QA or visual acceptance. Regex-based JS extraction is conservative and labeled; all onclick source remains available for review. Report layout/data/provenance/CSP and demo controls/assets/WebGL/media permissions stay frozen pending approval. Stop here: no full-site rollout or push.
