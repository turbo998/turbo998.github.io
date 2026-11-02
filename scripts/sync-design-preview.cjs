'use strict';
const fs=require('node:fs');
const path=require('node:path');
const root=path.resolve(__dirname,'..');
function main(){
 const previews={'index.html':'index.html','zh.html':'zh-index.html','studio/index.html':'studio.html','studio/zh-index.html':'zh-studio.html','studio/data-infra.html':'data-infra.html','studio/zh-data-infra.html':'zh-data-infra.html','studio/infra.html':'infra.html','studio/zh-infra.html':'zh-infra.html'};
 for(const [source,target] of Object.entries(previews)){
  let html=fs.readFileSync(path.join(root,source),'utf8').replace(/(href|src|action|data-counterpart|data-search-root)="([^"]+)"/g,(all,attr,value)=>{
   if(/^(?:[a-z]+:|#|\/\/)/i.test(value))return all;
   if(attr==='data-search-root')return 'data-search-root="../index.html"';
   const url=new URL(value,'https://site.invalid/'+source),file=url.pathname.slice(1);
   const dest=previews[file]||({'assets/editorial/site.css':'editorial.css','assets/editorial/site.js':'editorial.js','assets/editorial/theme-init.js':'theme-init.js'}[file])||'../'+file;
   return `${attr}="${dest}${url.search}${url.hash}"`;
  });
  html=html.replace('<meta charset="utf-8">','<meta charset="utf-8"><meta name="robots" content="noindex,nofollow">');
  fs.writeFileSync(path.join(root,'design-preview',target),html);
 }
 for(const [source,target]of [['site.css','editorial.css'],['site.js','editorial.js'],['theme-init.js','theme-init.js']])fs.copyFileSync(path.join(root,'assets/editorial',source),path.join(root,'design-preview',target));
 console.log('Synchronized eight preview editions with finalized production pages');
}
if(require.main===module)main();
module.exports={main};
