'use strict';
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const steps=[
 ['migrate-reading.cjs'],
 ['integrate-dedicated.cjs'],
 ['integrate-webiq.cjs'],
 ['integrate-data-lab.cjs','--write'],
 ['integrate-radar.cjs'],
 ['integrate-commerce-trends.cjs','--write'],
 ['integrate-phase179.cjs','--write'],
 ['localize-reports.cjs'],
 ['localize-demos.cjs'],
 ['localize-auxiliary.cjs'],
 ['build-site.cjs'],
 ['finalize-site.cjs'],
 ['build-search-index.cjs'],
 ['sync-design-preview.cjs']
];
for(const [file,...args]of steps){console.log(`\nBuilding ${file}`);execFileSync(process.execPath,[path.join(__dirname,file),...args],{cwd:root,stdio:'inherit'});}
const registry=require('../docs/redesign/site-localization.json');
if(registry.unresolved.length)throw new Error(`Untranslated production pages: ${registry.unresolved.join(', ')}`);
console.log(`Built ${registry.records.length} fully paired production pages`);
