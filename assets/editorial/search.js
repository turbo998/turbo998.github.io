(() => {
  'use strict';
  const form = document.querySelector('.site-search');
  if (!form) return;
  const input = form.querySelector('input'), panel = form.querySelector('.search-results'), status = form.querySelector('[role=status]');
  const root = new URL('.', new URL(form.dataset.searchRoot, location.href));
  const en = form.dataset.searchLanguage === 'en';
  const labels = en ? {'Track':'Track','Architecture & Study':'Architecture & Study','7-Card Benchmark':'7-Card Benchmark','Interactive Demo':'Interactive Demo','Repository':'Repository'} : {'Track':'主题赛道','Architecture & Study':'架构与技术研究','7-Card Benchmark':'7-Card 评测报告','Interactive Demo':'交互演示','Repository':'源码仓库'};
  const data = window.ENGINEERING_SEARCH_INDEX || [];
  let selected = -1, options = [];
  input.setAttribute('role', 'combobox'); input.setAttribute('aria-autocomplete', 'list'); input.setAttribute('aria-expanded', 'false'); input.setAttribute('aria-controls', panel.id);
  panel.setAttribute('role','listbox'); panel.setAttribute('aria-label', en ? 'Search results' : '搜索结果');
  const normalized = value => String(value || '').normalize('NFKC').toLowerCase();
  function matches(query) {
    const tokens = normalized(query).trim().split(/\s+/).filter(Boolean);
    if (!tokens.length) return [];
    return data.filter(item => item.language === (en ? 'en' : 'zh-CN') || item.language === 'both').map(item => {
      const title = normalized(item.title), haystack = normalized(`${item.title} ${item.text} ${item.url}`);
      return {...item, score:tokens.every(token => haystack.includes(token)) ? tokens.reduce((sum, token) => sum + (title.includes(token) ? 8 : 1), 0) : 0};
    }).filter(item => item.score).sort((a,b) => b.score-a.score || a.title.localeCompare(b.title));
  }
  function href(item) {
    const url = new URL(item.url, root);
    if (url.origin === location.origin) { const theme = document.documentElement.dataset.theme || new URL(location.href).searchParams.get('theme'); if (theme) url.searchParams.set('theme', theme); }
    return url.href;
  }
  function close() { panel.hidden = true; input.setAttribute('aria-expanded','false'); input.removeAttribute('aria-activedescendant'); selected = -1; }
  function choose(index) { selected = (index + options.length) % options.length; options.forEach((node,i) => node.setAttribute('aria-selected',String(i===selected))); input.setAttribute('aria-activedescendant',options[selected].id); options[selected].scrollIntoView({block:'nearest'}); }
  function render() {
    panel.replaceChildren(); options = []; selected = -1; input.removeAttribute('aria-activedescendant');
    if (!input.value.trim()) { close(); return; }
    const found = matches(input.value), shown = found.slice(0,12);
    for (const category of Object.keys(labels)) {
      const entries = shown.filter(item => item.category === category); if (!entries.length) continue;
      const group = document.createElement('div'); group.setAttribute('role','group'); group.setAttribute('aria-label',labels[category]);
      const heading = document.createElement('div'); heading.className='search-group'; heading.textContent=labels[category]; heading.setAttribute('aria-hidden','true'); group.append(heading);
      for (const item of entries) {
        const link = document.createElement('a'); link.href=href(item); link.id=`search-option-${options.length}`; link.setAttribute('role','option'); link.setAttribute('aria-selected','false'); link.tabIndex=-1; link.textContent=item.title;
        const small = document.createElement('small'); small.textContent=item.url; link.append(small); group.append(link); options.push(link);
      } panel.append(group);
    }
    if (!shown.length) { const message=document.createElement('p'); message.textContent=en?'No matching content. Try a technical concept or project name.':'没有匹配内容，请尝试技术术语或项目名。'; panel.append(message); }
    status.textContent=en?`${found.length} results. Use arrow keys to choose; Enter opens the selected result.`:`找到 ${found.length} 条结果。方向键选择，回车打开。`;
    panel.hidden=false; input.setAttribute('aria-expanded','true');
  }
  input.addEventListener('input',render); input.addEventListener('focus',() => {if(input.value) render();});
  input.addEventListener('keydown',event => {
    if (event.key==='Escape') {close();event.preventDefault();}
    else if (event.key==='ArrowDown' || event.key==='ArrowUp') {if(panel.hidden)render();if(options.length){event.preventDefault();choose(selected<0?(event.key==='ArrowDown'?0:options.length-1):selected+(event.key==='ArrowDown'?1:-1));}}
    else if(event.key==='Enter' && selected>=0 && !panel.hidden){event.preventDefault();location.href=options[selected].href;}
  });
  document.addEventListener('keydown',event => {
    const editing = event.target.closest('input,textarea,select,[contenteditable=true]');
    if ((event.key==='/' && !editing && !event.ctrlKey && !event.metaKey && !event.altKey) || ((event.ctrlKey || event.metaKey) && event.key.toLowerCase()==='k')) {event.preventDefault();input.focus();input.select();}
  });
  document.addEventListener('click',event=>{if(!form.contains(event.target))close();});
  const query = new URL(location.href).searchParams.get('q');
  if(query && /\/(?:zh-)?archive\.html$/.test(location.pathname)) {
    input.value=query; const found=matches(query), section=document.createElement('section'); section.className='search-archive-summary'; section.id='search-matches';
    const heading=document.createElement('h2');heading.textContent=en?`Search: ${query}`:`搜索：${query}`;section.append(heading);
    const count=document.createElement('p');count.textContent=en?`${found.length} matching pages and repositories`:`匹配 ${found.length} 个页面与仓库`;section.append(count);
    const list=document.createElement('ul');for(const item of found){const li=document.createElement('li'),a=document.createElement('a');a.href=href(item);a.textContent=`${labels[item.category]} · ${item.title}`;li.append(a);list.append(li);}section.append(list);
    const main=document.querySelector('main');if(main){main.prepend(section);main.querySelectorAll('.wb-card').forEach(card=>{card.hidden=!normalized(card.textContent).includes(normalized(query));});}
  }
  const header=document.querySelector('.site-header,[data-professional-header]');
  if(header && typeof ResizeObserver!=='undefined') new ResizeObserver(()=>document.documentElement.style.setProperty('--header-offset',`${Math.ceil(header.getBoundingClientRect().height)+16}px`)).observe(header);
})();
