'use strict';
const fs = require('node:fs');
const path = require('node:path');

const motionDemoDirectory = 'animation/demos/gpt-62-motion';
const motionDemoRoutes = {
  en: `${motionDemoDirectory}/index.en.html`,
  'zh-CN': `${motionDemoDirectory}/index.html`
};

function hasMotionDemo(root) {
  return Object.values(motionDemoRoutes).every(file =>
    fs.statSync(path.join(root, file), {throwIfNoEntry:false})?.isFile()
  );
}

module.exports = {motionDemoDirectory, motionDemoRoutes, hasMotionDemo};
