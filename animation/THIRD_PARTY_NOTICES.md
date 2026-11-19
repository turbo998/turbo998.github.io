# Provenance and third-party notices

Original code and original rendered artwork in this repository are MIT licensed.
That license does not relicense the third-party material below.

- **NASA/PDS MOLA data:** the Mars packages are resampled scientific measurements,
  not original artistic terrain. Product, URLs, checksums and processing are in
  [Astra data and method](demos/astra-planet/docs/data-and-method.md).
  NASA scientific data are generally available for public use with acknowledgment;
  see [NASA media guidelines](https://www.nasa.gov/nasa-brand-center/images-and-media/)
  and [PDS citation guidance](https://pds.nasa.gov/datastandards/citing/).
  Credit NASA, Mars Global Surveyor MOLA and the PDS Geosciences Node.
  No NASA logo, endorsement or newly measured detail is claimed.
- **Three.js 0.180.0:** MIT, copyright its authors. Installed package license is
  retained in the dependency installation; dependency license text is also
  included in production notices by the build script.
- **Vite, TypeScript, Vitest and Playwright:** build/test dependencies retain their
  own package licenses. They are not served as application services.
- **Reference websites and articles:** cited for research, not redistributed.
  No reference-page code, drawings, screenshots, music, models or textures are
  included. Publicly accessible does not mean freely licensed.
- **Astra provenance:** authorized extraction of only the original Mars demo from
  source revision `a5ec82b`. No private repository history or unrelated files are
  included. Historical AI-assisted authorship is described by the original demo;
  none of these applications calls a model API at runtime.
- **Microsoft-inspired colors:** visual color references only. This is an
  independent experiment, not a Microsoft product or an officially endorsed demo.
- **Commercial Image Editing Benchmark (`demos/commercial-image-edit-benchmark-studio/`):**
  evaluation methodology and three-axis commercial scoring rubric (`BRF`, `VEQ`, `CNS`)
  are grounded in **ServImage / Editable** (`arXiv:2604.24023v2`, *ServImage: Benchmarking
  Commercial Image Editing Models on Real-World Creative Service Briefs*); all 12
  `1024x1024` commercial reference inputs and 129 edited model outputs in this repository
  were originally generated and evaluated from scratch for this benchmark (`provenance=measured`),
  with zero third-party copyrighted brand logos or customer images redistributed.
  External blind human-preference Elo standings (`MAI-Image-2.7` `1215 Elo` `#1` on
  Artificial Analysis Image Editing Arena v2.1; `1387 Elo` on LMArena) are cited as
  publicly reported context (`provenance=reported`) from Microsoft AI public release notes
  and Artificial Analysis. No live model API is called when viewing the browser studio.
