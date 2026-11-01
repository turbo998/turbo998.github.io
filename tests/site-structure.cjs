const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const puppeteer = require("puppeteer");

const base = process.env.SITE_TEST_URL || "http://localhost:8796";
const tracks = ["infra", "commerce", "voice", "benchmarks", "animation", "game", "security"];
const columns = ["about", "github-radar", "ai-security", "security-ai-landing-zone", "benchmarks", "writing",
  "projects", "opensource", "openrouter", "style-preview", "career", "skills"];
const pages = ["index.html", "zh.html", ...columns.flatMap(name => [name + ".html", "zh-" + name + ".html"])];

async function main() {
  const browser = await puppeteer.launch({ headless: "shell", pipe: true, protocolTimeout: 120000 });
  try {
    const page = await browser.newPage();
    const errors = [];
    page.on("pageerror", error => errors.push(error.message));
    await page.setRequestInterception(true);
    page.on("request", request => {
      // Portal behavior is tested independently of external APIs and expensive demo runtimes.
      if (request.frame() !== page.mainFrame() || !request.url().startsWith(base)) request.abort();
      else request.continue();
    });
    await page.setViewport({ width: 1440, height: 1000 });
    for (const file of pages) {
      console.log("Checking", file);
      const response = await page.goto(base + "/" + file + "?style=precision#matrix", { waitUntil: "domcontentloaded" });
      assert.equal(response.status(), 200, file);
      await page.waitForSelector(".lang-switch-group");
      const data = await page.evaluate(() => {
        const links = [...document.querySelectorAll(".lang-switch-group a")];
        const group = document.querySelector(".lang-switch-group").getBoundingClientRect();
        return {
          labels: links.map(a => a.textContent),
          hashes: links.map(a => new URL(a.href).hash),
          styles: links.map(a => new URL(a.href).searchParams.get("style")),
          language: document.documentElement.lang,
          breadcrumb: !!document.querySelector(".site-breadcrumb-bar [aria-current='page']"),
          atRight: group.right > innerWidth * 0.7,
          duplicateIds: [...document.querySelectorAll("[id]")].map(e => e.id)
            .filter((id, i, ids) => ids.indexOf(id) !== i)
        };
      });
      assert.deepEqual(data.labels, ["EN", "中文"], file);
      assert.deepEqual(data.hashes, ["#matrix", "#matrix"], file);
      assert.deepEqual(data.styles, ["precision", "precision"], file);
      assert.ok(data.breadcrumb && data.atRight, file);
      assert.deepEqual(data.duplicateIds, [], file);
      if (["index.html", "zh.html"].includes(file)) {
        const structure = await page.evaluate(() => ({
          ids: [...document.querySelectorAll("body > section")].map(e => e.id),
          directory: document.querySelectorAll("#studio-directory .taxonomy-domain-card").length,
          actions: document.querySelectorAll(".bh-actions-grid a").length,
          pillars: document.querySelectorAll(".pillar-section").length
        }));
        assert.deepEqual(structure.ids.slice(0, 4), ["architecture", "stage-2", "workbenches", "matrix"]);
        assert.equal(structure.directory, 7);
        assert.equal(structure.actions, 3);
        assert.equal(structure.pillars, 6);
      }
    }
    await page.goto(base + "/frontier-ai-studio.html?lang=en#infra", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".studio-stage");
    assert.equal(await page.$eval("#studio-directory", e => e.children.length), 7);
    assert.deepEqual(await page.$$eval(".track-nav button", nodes => nodes.map(n => n.id)), tracks.map(t => "tab-" + t));
    const scenes = await page.$$eval(".scene-pill[onclick]", nodes => nodes.map(node => ({
      id: node.id,
      track: node.closest(".track-panel").id.replace("panel-", ""),
      url: node.getAttribute("onclick").match(/loadTrackScene\('[^']+',\s*'([^']+)'/)[1]
    })));
    for (const scene of scenes) {
      if (!scene.url.startsWith("https:")) {
        assert.ok(fs.existsSync(path.resolve(scene.url.split("?")[0])), "Missing scene: " + scene.url);
      }
    }
    for (const track of tracks) {
      for (const lang of ["en", "zh-CN"]) {
        await page.evaluate((track, lang) => { setLang(lang); selectTrack(track); }, track, lang);
        await page.waitForFunction(track => document.querySelector(".track-panel.active").id === "panel-" + track, {}, track);
        const data = await page.evaluate(() => ({
          lang: document.documentElement.lang,
          query: new URL(location.href).searchParams.get("lang"),
          stages: document.querySelectorAll(".track-panel.active > .studio-stage").length,
          jumps: document.querySelectorAll(".studio-subdirectory .learning-flow-rail a").length,
          crumbs: document.querySelector(".site-breadcrumb-bar ol").children.length,
          activeFrames: [...document.querySelectorAll(".stage-iframe")].filter(f => f.getAttribute("src") !== "about:blank").length,
          translated: [...document.querySelectorAll("[data-site-en]")].every(n =>
            n.textContent === n.dataset[document.documentElement.lang === "en" ? "siteEn" : "siteZh"]),
          untranslatedEnglish: document.documentElement.lang === "en"
            ? [...document.querySelectorAll(".track-panel *")].filter(n =>
              !n.children.length && /[\u4e00-\u9fff]/.test(n.textContent)).map(n => n.textContent) : []
        }));
        assert.equal(data.lang, lang);
        assert.equal(data.query, lang);
        assert.equal(data.stages, 4);
        assert.equal(data.jumps, 4);
        assert.equal(data.crumbs, 4);
        assert.equal(data.activeFrames, 1);
        assert.ok(data.translated);
        assert.deepEqual(data.untranslatedEnglish, []);
      }
    }
    for (const scene of scenes) {
      await page.evaluate(scene => { location.hash = scene.track + "/module/" + scene.id; }, scene);
      await page.waitForFunction(id => document.querySelector(".track-panel.active .scene-pill.active")?.id === id, {}, scene.id);
      const data = await page.evaluate(() => ({
        url: document.querySelector(".track-panel.active iframe").src,
        breadcrumb: document.querySelector(".site-breadcrumb-bar li:last-child").textContent,
        selected: document.querySelector(".track-panel.active .scene-pill.active").textContent
      }));
      assert.equal(data.breadcrumb, data.selected);
      assert.equal(new URL(data.url).searchParams.get("lang"), "zh-CN");
    }
    await page.goto(base + "/frontier-ai-studio.html?lang=en#security/module/s-pill-2", { waitUntil: "domcontentloaded" });
    await page.waitForSelector(".studio-stage");
    await page.evaluate(() => setLang("zh-CN"));
    assert.equal(await page.evaluate(() => location.hash), "#security/module/s-pill-2");
    assert.ok((await page.$eval("#iframe-security", f => f.src)).includes("benchmark-cards.html?lang=zh-CN"));
    await page.evaluate(() => setLang("en"));
    assert.ok((await page.$eval("#iframe-security", f => f.src)).includes("benchmark-cards.en.html?lang=en"));
    await page.evaluate(() => { location.hash = "commerce/stage-4"; });
    await page.waitForFunction(() => location.hash === "#commerce/stage-4" && document.querySelector("#panel-commerce").classList.contains("active"));
    await page.evaluate(() => history.back());
    await page.waitForFunction(() => location.hash === "#security/module/s-pill-2" &&
      document.querySelector("#panel-security").classList.contains("active"));
    assert.equal(await page.evaluate(() => location.hash), "#security/module/s-pill-2");
    for (const width of [390, 768, 1440]) {
      await page.setViewport({ width, height: 1000 });
      for (const file of ["index.html", "zh.html", "frontier-ai-studio.html?lang=en#infra", "frontier-ai-studio.html?lang=zh-CN#voice"]) {
        await page.goto(base + "/" + file, { waitUntil: "domcontentloaded" });
        await page.waitForSelector(".lang-switch-group");
        const layout = await page.evaluate(() => {
          const box = document.querySelector(".lang-switch-group").getBoundingClientRect();
          return { overflow: document.documentElement.scrollWidth > innerWidth + 1, right: box.right, top: box.top };
        });
        assert.ok(!layout.overflow, `${width}px ${file}: horizontal overflow`);
        assert.ok(layout.right <= width && layout.right > width * 0.7, `${width}px ${file}: language placement`);
        assert.ok(layout.top < 100, `${width}px ${file}: language is not at the top`);
      }
    }
    assert.deepEqual(errors, [], "Browser runtime errors");
    console.log(`PASS: ${pages.length} bilingual pages, 7 tracks × 2 languages, ${scenes.length} scene routes, history, and 3 responsive widths.`);
  } finally {
    await browser.close();
  }
}
main().catch(error => { console.error(error); process.exitCode = 1; });
