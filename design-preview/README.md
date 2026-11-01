# Dark Aurora — shared visual templates

These six templates originated in the R3 visual preview (`5ed4988`) and now share the user-directed Dark Aurora design with the production portals. The original visual gate was explicitly lifted; the later request for dark default supersedes the original light-default palette. Production routes, functional acceptance and publication requirements are documented in [the migration guide](../docs/redesign/production-migration.md). A working preview is not proof of a successful public deployment.

## Browse

From the repository root, run `python -m http.server 8797 --bind 127.0.0.1`.

| Template | English | 中文 |
|---|---|---|
| Home | `/design-preview/index.html` | `/design-preview/zh-index.html` |
| Studio overview | `/design-preview/studio.html` | `/design-preview/zh-studio.html` |
| AI Infra topic | `/design-preview/infra.html` | `/design-preview/zh-infra.html` |

Append `?theme=dark` or `?theme=light` for reproducible visual review. A first visit, including without JavaScript, defaults to dark regardless of OS. The theme button persists `kee-aurora-theme-v1`; URL theme overrides it. The old automatically populated light preference is deliberately ignored. Language switching preserves the topic, anchor, and displayed theme. `?lang=en` / `?lang=zh-CN` selects the equivalent preview with JavaScript; both static language URLs work without JavaScript. Obsolete `style` parameters do not restore the old toolbar.

All primary links and content are native HTML. On phones the menu uses native `details`; Enter opens it, Tab reaches links, and Escape closes it and restores summary focus when JavaScript is enabled. There is no fixed-height content pane, iframe, hidden scrollbar, or runtime content reconstruction.

## Build and validate

- `node scripts\build-design-preview.cjs` regenerates the six committed HTML files from build-time bilingual templates. No framework, package installation, or build step is required to browse them on GitHub Pages.
- Set `SITE_TEST_URL` if using a different local server origin.
- Set `PREVIEW_ARTIFACT_DIR` to a session artifact directory, then run `node tests\design-preview.cjs` with Puppeteer available. By default screenshots go to `design-preview-artifacts/`; do not commit this generated folder.
- The test captures 36 full-page states: three templates × two languages × light/dark × 390/768/1440 CSS px. It additionally captures six no-JS mobile states, verifies native local targets, anchors, duplicate IDs, header height, horizontal overflow, nested scrolling, actual wheel/touch document scrolling, theme persistence, language/history, keyboard menu/skip/focus, no-JS navigation, first-visit dark default, and 320px reflow.
- Tests do not intercept requests, load legacy demos as hidden frames, or claim legacy demos have passed end-to-end acceptance. Local href validation is existence checking, not downstream functionality or external availability.

## Design decisions

| Token | Light | Dark |
|---|---|---|
| Page | `#F4F7FF` | `#080D1B` |
| Surface | `#FFFFFF` | `#101A30` |
| Text | `#17233E` | `#EEF3FF` |
| Secondary text | `#4C5E7C` | `#ADBBD1` |
| Hairline | `#D5DDEC` | `#293956` |
| Interaction | `#354EC8` | `#9AABFF` |
| Secondary accent | `#087467` | `#56DDCD` |

`tests/aurora-theme.cjs` checks 34 foreground/surface token pairs at WCAG AA's 4.5:1 minimum, default-dark and preference migration, no-JS rendering, and 12 representative layouts. This targeted evidence is not a blanket accessibility-conformance claim.

The user-directed Dark Aurora palette supersedes both the original grayscale/cool-blue direction and generic artifact presets. Localized blue-violet/cyan light fields appear in introductory areas; reading sections retain stable solid backgrounds. Only the header uses translucent material, with opaque and reduced-transparency fallbacks. The personal identity remains **Qi Chen · @turbo998**, visible in every page header and footer; Kee-Tech-Assets is only the source repository name. System typography (Segoe UI, platform/CJK fallbacks; Cascadia Code/Consolas for metadata) avoids external font requests and third-party font licensing. Layout uses an 1184px content maximum, editorial type hierarchy, restrained dividers, a single featured project, and compact source lists rather than card grids everywhere. Header is at most 72px desktop / 64px phone. Topic sections remain in normal document flow.

## Content and evidence boundaries

- AI Infra is the only new topic-page prototype. The other six Studio entries explicitly open existing independent collections. No new six-topic migration is implied.
- Production reading pages and dedicated surfaces now have scoped navigation and language integration; see their migration manifests for verified coverage and exact source-media limitations.
- `assets/infra-simulator.png` is a genuine 1440×1000 browser capture of this repository's existing `workshops/azure-agent-infra/demo.html` at published baseline `b31286a79f4ff5443b480566934ce2e2e58c59ef`. It retains its source colors and is labeled as a capture, not live or performance evidence. No third-party reference screenshot is included.
- This preview links original 7-card reports without altering, regenerating, rescoring, or endorsing their measurements. The architecture prose is a reading map to existing content, not a new deployment specification.
- Full legacy route/content inventory and proposed compatibility mappings live in `docs/redesign/`. Historical proposed mappings remain frozen; `production-routes.json` records the implemented compatibility adapter.

## Release verification

The user authorized publication and the revised visual direction. Verify both languages, desktop/tablet/mobile, light/dark, reading content, native navigation and protected demo/report behavior before release. Publishing only this preview directory does not satisfy the migration. Public Pages must be checked against the actual released SHA.
