'use strict';
const fs=require('node:fs');
const path=require('node:path');
const {execFileSync}=require('node:child_process');
const root=path.resolve(__dirname,'..');
const source='workshops/azure-vm-modernization/index.html';
function main(){
 const baseline=execFileSync('git',['show',`941ee62d1f55dfe8bd8dfbf82e4d2a7bd34ed0a1:${source}`],{cwd:root,encoding:'utf8'});
 for(const en of [true,false]){
  let html=baseline.replace(/<html lang="[^"]+"/,`<html lang="${en?'en':'zh-CN'}"`).replace(/<title>[\s\S]*?<\/title>/,`<title>${en?'Azure VM modernization workshop — moved':'Azure VM 现代化工作坊 — 迁移入口'}</title>`);
  html=html.replace(/<main>[\s\S]*?<\/main>/,`<main><h1>${en?'Azure VM modernization workshop':'Azure VM 现代化工作坊'}</h1><p>${en?'The workshop is maintained in the public Azure Infra Lab. This compatibility entry forwards to the original workshop and preserves your query parameters and section.':'工作坊现由公开的 Azure Infra Lab 维护。此兼容入口将跳转到原工作坊，并保留查询参数和章节位置。'}</p><p><a id="moved-to" href="https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/workshop.html?lang=${en?'en':'zh-CN'}">${en?'Open the workshop':'打开工作坊'}</a></p><p><a href="https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/calculator.html?lang=${en?'en':'zh-CN'}">${en?'FinOps calculator':'FinOps 计算器'}</a> · <a href="https://turbo998.github.io/Azure-Infra-Lab/workshops/azure-vm-modernization/demo.html?lang=${en?'en':'zh-CN'}">${en?'Interactive demo':'交互演示'}</a> · <a href="https://github.com/turbo998/Azure-Infra-Lab/tree/main/workshops/azure-vm-modernization">${en?'Source repository':'源码仓库'}</a></p><noscript><p>${en?'JavaScript is disabled. Use the native links above to continue.':'JavaScript 已关闭，请使用上方链接继续。'}</p></noscript></main>`);
  html=html.replace('target.hash = window.location.hash;',`if (!target.searchParams.has("lang")) target.searchParams.set("lang", "${en?'en':'zh-CN'}");\n    target.hash = window.location.hash;`);
  fs.writeFileSync(path.join(root,en?source:source.replace('.html','.zh.html')),html);
 }
 console.log('Localized VM compatibility entry in English and Chinese');
}
if(require.main===module)main();
module.exports={main};
