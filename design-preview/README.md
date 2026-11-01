# Engineering Editorial — R3 visual approval preview

**Not a release.** These six isolated static pages preview the approved direction; they do not replace the existing homepage, Studio, articles, demos, or reports. Do not expand the migration or push until the user has reviewed the actual visuals and approved them.

## Browse

From the repository root, run `python -m http.server 8797 --bind 127.0.0.1`.

| Template | English | 中文 |
|---|---|---|
| Home | `/design-preview/index.html` | `/design-preview/zh-index.html` |
| Studio overview | `/design-preview/studio.html` | `/design-preview/zh-studio.html` |
| AI Infra topic | `/design-preview/infra.html` | `/design-preview/zh-infra.html` |

Append `?theme=dark` or `?theme=light` for reproducible visual review. A first visit defaults to light even on a dark OS. The theme button persists a namespaced preference; URL theme overrides it. Language switching preserves the topic, anchor, and displayed theme. `?lang=en` / `?lang=zh-CN` selects the equivalent preview with JavaScript; both static language URLs work without JavaScript. Obsolete `style` parameters do not restore the old toolbar.

All primary links and content are native HTML. On phones the menu uses native `details`; Enter opens it, Tab reaches links, and Escape closes it and restores summary focus when JavaScript is enabled. There is no fixed-height content pane, iframe, hidden scrollbar, or runtime content reconstruction.

## Build and validate

- `node scripts\build-design-preview.cjs` regenerates the six committed HTML files from build-time bilingual templates. No framework, package installation, or build step is required to browse them on GitHub Pages.
- Set `SITE_TEST_URL` if using a different local server origin.
- Set `PREVIEW_ARTIFACT_DIR` to a session artifact directory, then run `node tests\design-preview.cjs` with Puppeteer available. By default screenshots go to `design-preview-artifacts/`; do not commit this generated folder.
- The test captures 36 full-page states: three templates × two languages × light/dark × 390/768/1440 CSS px. It additionally captures six no-JS mobile states, verifies native local targets, anchors, duplicate IDs, header height, horizontal overflow, nested scrolling, actual wheel/touch document scrolling, theme persistence, language/history, keyboard menu/skip/focus, no-JS navigation, first-visit light default, and 320px reflow.
- Tests do not intercept requests, load legacy demos as hidden frames, or claim legacy demos have passed end-to-end acceptance. Local href validation is existence checking, not downstream functionality or external availability.

## Design decisions

| Token | Light | Dark |
|---|---|---|
| Page | `#FAFAFA` | `#101113` |
| Surface | `#FFFFFF` | `#181A1D` |
| Text | `#171717` | `#F3F4F6` |
| Secondary text | `#525252` | `#A1A1AA` |
| Hairline | `#E5E5E5` | `#303238` |
| Interaction | `#2563EB` | `#7AA2F7` |

The approved task-specific neutral/cool-blue palette supersedes generic artifact theme presets. The personal identity remains **Qi Chen · @turbo998**, visible in every page header and footer; Kee-Tech-Assets is only the source repository name. System typography (Segoe UI, platform/CJK fallbacks; Cascadia Code/Consolas for metadata) avoids external font requests and third-party font licensing. Layout uses an 1184px content maximum, editorial type hierarchy, restrained dividers, a single featured project, and compact source lists rather than card grids everywhere. Header is at most 72px desktop / 64px phone. Topic sections remain in normal document flow.

## Content and evidence boundaries

- AI Infra is the only new topic-page prototype. The other six Studio entries explicitly open existing independent collections. No new six-topic migration is implied.
- Legacy sources retain their own design, language controls, and return navigation. Browser Back returns to the preview; consistent downstream navigation and translations are later R4–R6 work.
- `assets/infra-simulator.png` is a genuine 1440×1000 browser capture of this repository's existing `workshops/azure-agent-infra/demo.html` at published baseline `b31286a79f4ff5443b480566934ce2e2e58c59ef`. It is displayed in grayscale and labeled as a capture, not live or performance evidence. No third-party reference screenshot is included.
- This preview links original 7-card reports without altering, regenerating, rescoring, or endorsing their measurements. The architecture prose is a reading map to existing content, not a new deployment specification.
- Full legacy route/content inventory and proposed compatibility mappings live in `docs/redesign/`. Proposed future routes are not deployed aliases. Legacy deep-link migration is intentionally gated on visual approval.

## Approval gate

Review all three templates, both languages, desktop/tablet/mobile, and light/dark. Automated test success is not visual approval. Keep this branch local until explicit approval for subsequent migration and publication.
