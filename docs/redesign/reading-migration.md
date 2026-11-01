# R6 reading migration

## Scope and outputs

The authoritative per-file disposition, language evidence, source-media limitations, removed shell elements, iframe replacements, imported-reference resolutions and output SHA-256 are in [reading-migration.json](reading-migration.json).

- 80 baseline `portal`, `topic` and `article` records, excluding the three parent-owned entry pages.
- 12 new actual English counterparts; 92 generated HTML files in total.
- Eight English infrastructure SVG derivatives with 398 translated labels; original assets remain byte-for-byte unchanged. Exact output paths and source/output hashes are in `translatedAssets`.
- 84 native reading documents and eight dedicated-design exceptions. The final reading shell follows the user-approved Dark Aurora direction; preserved demo/report bodies and diagram artwork geometry are not redesigned.
- No changes to the baseline route inventory, shared legacy JavaScript/CSS, design-preview or parent-owned home/Studio output.
- Supporting files: `scripts/migrate-reading.cjs`, `assets/reading-shell.css`, `assets/reading-shell.js`, `tests/reading-migration.cjs`, and these two migration documents.

The generator reads the sealed Git baseline `b31286a79f4ff5443b480566934ce2e2e58c59ef`, not previously generated HTML or SVGs. Repeated builds are checked for identical hashes across all 92 documents and eight derivative assets.

## Dark Aurora reading shell

Default dark applies in static HTML and without JavaScript: background `#080D1B`, sections `#101A30`, raised controls `#172440`, text `#EEF3FF`, muted text `#ADBBD1`, periwinkle `#9AABFF`, teal `#56DDCD`, sparse amber labels `#F2BB72`. Reading/code/diagram backgrounds are solid. Only the header uses translucent material where supported, with an opaque fallback and `prefers-reduced-transparency` override. Light-accent header controls use dark ink for contrast.

`?theme=light|dark` overrides the versioned `kee-aurora-theme-v1` preference. The old `kee-editorial-theme` preference is ignored; a new explicit light preference persists. Existing native language/theme/hash navigation is retained. With JavaScript disabled, the static document remains dark and theme preference persistence is unavailable. Protected report CSP behavior remains an explicit exception.

## Rebuild and validate

Requires the already-available `puppeteer` and `marked` packages. The browser uses `headless: 'shell', pipe: true`. No dependency changes are needed.

```powershell
node scripts\migrate-reading.cjs
node --check scripts\migrate-reading.cjs
node --check assets\reading-shell.js
node --check tests\reading-migration.cjs
$env:READING_BASE_URL = 'http://127.0.0.1:8797/'
# Optional: existing directory for screenshot/JSON evidence.
# $env:READING_ARTIFACTS = '<approved artifact directory>'
node tests\reading-migration.cjs
```

The preview server must serve this worktree. External network requests are blocked during validation; tests do not claim to validate third-party service availability.

Verified results: 92 pages / 184 initial layouts at 390px dark and 1440px light; zero document overflow, iframe elements, page JavaScript errors, script syntax errors, missing local file targets or extraction-based source-content losses. Headers satisfy 64px mobile / 72px desktop limits. Five authored translations retain source numeric tokens, including numerical source URLs. Root-relative resource/link scanning found no project-subpath-breaking URLs.

Additional checks cover all 12 new English bodies; six Bilibili episode states; four infrastructure layers, eight successfully loaded English diagram assets/captions and all 128 assessment combinations; DeepInfer peak/max-slider/reset states; static no-JavaScript English voice and infrastructure bodies; Dark Aurora default, ignored legacy light storage, explicit/persisted light preference and no-JS dark background. SVG checks validate XML, all label translations, numerical claims (including Chinese ten-thousand/hundred-million units), original-file immutability, exact non-text bytes/geometry/style/data, EN/ZH references and no new translated-label clipping at the artboard edge. These checks find no untranslated visible controlled prose in the tested states. Proper nouns in existing English research archives are not treated as untranslated paragraphs. These are targeted engineering checks, not a claim of formal accessibility certification.

## Actual reading translations

Five complete English research-article translations were authored from preserved Chinese sources:

- `animation/research/hve-animation-landscape.en.html`
- `game/research/hve-animation-and-game-engineering.en.html`
- `game/research/partner-demo-playbook.en.html`
- `game/research/scrap-swarm-technical-assets.en.html`
- `game/research/wanan-midnight-technical-assets.en.html`

Seven English editions use genuine existing runtime dictionaries where available, plus authored translations of previously Chinese-only sections and dynamic states:

- `animation/index.en.html`
- `generative-visual-lab/index.en.html`
- `bilibili-explainers/index.en.html`
- `voice/index.en.html`
- `voice/case-study.en.html`
- `workshops/azure-agent-infra/index.en.html`
- `workshops/deepinfer-v41-economics/index.en.html`

English initial reading content is serialized as native HTML. A page-local translation dictionary maintains supplemental English text when original scripts rerender interactive regions; it is not the only copy of primary content. Original recorded media is not machine-translated. These translations were prepared with AI assistance and preserve archived claims; no new research, benchmark measurements or scientific reconciliation was performed.

### Sixteen misleading language declarations

The 16 inventory conflicts are English research files in `animation/research` and `generative-visual-lab/research`: `asset-taxonomy`, `blender-mcp-pipeline`, `feitian-reference-study`, `opus-animation-landscape`, `publication-and-provenance`, `rocket-method`, `technique-comparison` and `validation`, each with `.en.html`.

Source-heading/body inspection established that these are distinct English editions with incorrect Chinese HTML declarations, not identical Chinese copies. The large Opus and validation archives contain English descriptions with Chinese proper-name/terminology glosses. Their declarations are corrected; those glosses remain. The manifest retains original declarations and records resolution evidence rather than relying on filenames.

### Infrastructure acceptance behavior

The unified header navigates between real Chinese and English documents. Tests assert that body prose changes, `theme=dark` and the current hash survive, browser back/forward restores the correct edition, and the original body language button is not visible. Contextual returns target `studio/infra.html` or `studio/zh-infra.html`, preserving the theme. The same relative-language-link mechanism is used throughout the reading set.

## Dedicated exceptions

The original internal designs remain for `game/index.html`, both commerce entry pages, both security playground entry pages, and the three `workshops/faf-vs-agent-forge/demo-*-pelican.html` demos. They receive a compact shell. The commerce English entry is a seven-card report, **not** the translation of the Chinese interactive workbench; the two are deliberately not advertised as a bilingual pair.

The commerce report retains its original no-script CSP and fixed report coordinates. Shell styling is inlined and mobile scaling preserves those coordinates; JavaScript theme persistence is unavailable under that CSP. Whole-document preview iframes are replaced with descriptive native links. Genuine video elements remain video elements. The archived commerce workbench's two unescaped empty-string labels are repaired so its JavaScript parses.

## English infrastructure diagrams

`workshops/azure-agent-infra/index.en.html` uses these eight derivatives under `workshops/azure-agent-infra/assets/` for both its initial image and every runtime selector state:

- `01-azure-agent-infra-4layer-panorama.en.svg`
- `02-runtime-spectrum-6tier-matrix.en.svg`
- `03-scenario-decision-tree-and-routing.en.svg`
- `04-aksclaw-multi-tenant-k8s-architecture.en.svg`
- `05-e2b-on-azure-vmss-reference-architecture.en.svg`
- `06-e2b-microvm-internals-and-vm-benchmark.en.svg`
- `07-multi-agent-workflow-and-state-checkpoint.en.svg`
- `08-field-playbook-5step-execution-flow.en.svg`

All 398 Chinese labels are translated; existing English labels, geometry, font sizes, shapes, bar coordinates, colors and numeric claims are retained. Concise wording/standard abbreviations fit the existing drawing dimensions. Chinese large-number notation is rendered at its exact English value (for example, `10万` → `100,000`), not remeasured. The Chinese page continues using the unchanged originals. The older `assets/svg/` copies are outside scope and untouched. Infrastructure `fullTranslationVerified` is now true; its untranslated-media limitation is removed.

One unchanged source label in diagram 6 (`116 ms ($4.838/hr · $3,532/mo)`) already extends beyond the original artboard; the asset checks record this exact inherited layout limitation rather than silently changing geometry or source prices. No translated label adds artboard clipping. Source SVG text remains native/extractable.

## Exact remaining all-content translation limits

**Controlled reading prose and the eight infrastructure diagrams are translated; recorded media is not fully bilingual.** `language.controlledProseTranslationVerified` and `language.fullTranslationVerified` remain separate fields. The latter is false for `bilibili-explainers/index.en.html`, with a visible notice and exact resource list in `language.mediaLanguageLimitations`:

`ep00` through `ep05`, each with `-cartoon-16x9.mp4`, `-poster.jpg` and `-sheet.jpg` (18 resources), retain original narration/image text. All six written storyboards, titles, milestone labels and controls are English. The explicitly allowed recorded-media limitation does not claim dubbing/repainting as completed.

The original DeepInfer Chinese and English editions also disagree on approximate GPU count: approximately `19×128 = 2,432` versus approximately `2,371`. Both archived statements are preserved and the discrepancy is recorded rather than silently changing conclusions.

## Parent integration

Include the manifest's 12 new counterpart paths and eight `translatedAssets` paths in the production route/archive audit, and rerun full-site checks after all agents finish. Preserve the documented dedicated-report/demo exceptions and the parent's exact Pelican native-inspector scroll exceptions. Home/Studio visual integration, old-home anchor aliases and global navigation compatibility remain parent-owned. The reading generator does not touch those files. Only the 18 explicitly allowed Bilibili recorded/image resources remain untranslated media; there are no outstanding controlled-prose/SVG translation resources. No commits or pushes were made by this migration task.
