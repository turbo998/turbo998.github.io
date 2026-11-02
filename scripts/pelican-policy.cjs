'use strict';
const arena = /^(?:(?:animation|generative-visual-lab)\/demos\/pelican-bicycle-arena|workshops\/faf-vs-agent-forge)\/(?:index|pelican-arena)(?:\.en)?\.html$/;
const engines = /(?:^|\/)demo-(?:faf|agent-forge|hve)-pelican(?:\.en)?\.html$/;
const isArena = file => arena.test(file);
function allowedFrames(file, frames) {
  if(!isArena(file)||frames.length!==3)return false;
  const directory=file.slice(0,file.lastIndexOf('/')+1),names=[];
  for(const frame of frames){
    const src=typeof frame==='string'?frame:frame.src;
    if(!src)return false;
    const url=new URL(src,'https://site.invalid/'+file);
    if(url.origin!=='https://site.invalid'||!url.pathname.startsWith('/'+directory)||!engines.test(url.pathname))return false;
    names.push(/demo-(faf|agent-forge|hve)-pelican/.exec(url.pathname)[1]);
  }
  return ['faf','agent-forge','hve'].every(name=>names.includes(name));
}
module.exports={isArena,allowedFrames};
