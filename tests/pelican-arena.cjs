'use strict';
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const {root, records, isArena} = require('../scripts/localize-demos.cjs');
const {harness} = require('./demo-localization.cjs');
async function main() {
  const arenas = records.filter(record => isArena(record.source));
  assert.equal(arenas.length, 6);
  for (const record of arenas) for (const file of [record.en, record.zh]) {
    const html = fs.readFileSync(path.join(root, file), 'utf8');
    const frames = [...html.matchAll(/<iframe\b[^>]*>/g)].map(match => match[0]);
    assert.equal(frames.length, 3, file);
    for (const [i, id] of ['frameFaf','frameForge','frameHve'].entries()) {
      assert(frames[i].includes(`id="${id}"`));
      assert(/src="\.\/demo-(?:faf|agent-forge|hve)-pelican(?:\.en)?\.html\?lang=(?:en|zh-CN)&arena=1"/.test(frames[i]));
    }
    assert(html.includes('class="broadcast-bar"'));
  }
  const results = [];
  await harness(async (browser, base) => {
    for (const record of arenas) for (const locale of ['en','zh']) {
      const file = record[locale], page = await browser.newPage(), errors = [];
      page.on('pageerror', error => errors.push(error.message));
      try {
        await page.setViewport({width: 1440, height: 1000});
        await page.goto(base + file, {waitUntil: 'domcontentloaded', timeout: 60000});
        const frames = [];
        for (const id of ['frameFaf','frameForge','frameHve']) {
          const element = await page.$(`#${id}`), frame = await element.contentFrame();
          await frame.waitForFunction(() => window.DemoLocalization?.ready && typeof state === 'object');
          assert.equal(await frame.evaluate(() => document.documentElement.lang), locale === 'en' ? 'en' : 'zh-CN');
          assert.equal(await frame.evaluate(() => document.documentElement.classList.contains('in-arena-frame')), true);
          assert.equal(await frame.evaluate(() => [...document.querySelectorAll('[data-professional-header],.kee-dedicated-nav,.reading-header,.demo-language-navigation')].every(nav => getComputedStyle(nav).display === 'none')), true);
          frames.push(frame);
        }
        // Real button clicks must reach all three native receivers, not merely produce postMessage traffic.
        await page.click('.broadcast-bar button[onclick*="cadence: 34"]');
        for (const frame of frames) await frame.waitForFunction(() => state.cadence === 34);
        assert.deepEqual(await Promise.all(frames.map(frame => frame.evaluate(() => state.wind ?? state.breeze))), [6,6,6]);
        await page.click('.broadcast-bar button[onclick="broadcast({paused: true})"]');
        for (const frame of frames) await frame.waitForFunction(() => typeof paused === 'boolean' ? paused : state.paused);
        const angles = await Promise.all(frames.map(frame => frame.evaluate(() => state.crankAngle)));
        await new Promise(resolve => setTimeout(resolve, 120));
        assert.deepEqual(await Promise.all(frames.map(frame => frame.evaluate(() => state.crankAngle))), angles, 'Frozen crank state must not advance');
        const fishBefore = await Promise.all(frames.map(frame => frame.evaluate(() => state.fishCount ?? state.flyingFish.length)));
        await page.click('.broadcast-bar button[onclick="broadcast({action: \'feed\'})"]');
        await frames[0].waitForFunction(previous => state.fishCount > previous, {}, fishBefore[0]);
        await frames[1].waitForFunction(previous => state.flyingFish.length > previous, {}, fishBefore[1]);
        await frames[2].waitForFunction(previous => state.fishCount !== previous, {}, fishBefore[2]);
        await page.click('.broadcast-bar button[onclick*="cadence: 122"]');
        await frames[0].waitForFunction(() => state.cadence === 122);
        await frames[1].waitForFunction(() => state.cadence === 122 && state.sprintTimer > 0);
        // HVE's unchanged native sprint intentionally selects its 115 RPM climbing posture.
        await frames[2].waitForFunction(() => state.cadence === 115 && state.posture === 'climb');
        await page.click('.broadcast-bar button[onclick="broadcast({paused: false})"]');
        const resumed = await Promise.all(frames.map(frame => frame.evaluate(() => state.crankAngle)));
        await new Promise(resolve => setTimeout(resolve, 120));
        for (const [i, frame] of frames.entries()) assert.notEqual(await frame.evaluate(() => state.crankAngle), resumed[i]);
        await page.click('#btnView1');
        assert(await page.$eval('#arenaGrid', grid => grid.classList.contains('focus-single')));
        await page.click('#btnView3');
        assert.equal(await page.$eval('#arenaGrid', grid => grid.classList.contains('focus-single')), false);
        assert.deepEqual(errors, [], file);
        results.push({file, frames: 3, cleanEmbeddedNavigation: true, sameLocale: true, controls: ['slow-motion','pause','feed','sprint','resume','stack','three-columns']});
      } finally {await page.close();}
    }
  });
  console.log(JSON.stringify({arenas: results.length, results}, null, 2));
}
main().catch(error => {console.error(error); process.exitCode = 1;});
