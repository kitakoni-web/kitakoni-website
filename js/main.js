(() => {
  const header = document.getElementById('siteHeader');
  const headerLogoImg = document.querySelector('.header-logo img');
  const nav = document.getElementById('globalNav');
  const toggle = document.querySelector('.nav-toggle');
  const starCanvas = document.getElementById('starfield');
  const openingCanvas = document.getElementById('openingStars');
  const opening = document.getElementById('opening');
  const openingInner = opening?.querySelector('.opening__inner');
  const starCtx = starCanvas?.getContext('2d');
  const openingCtx = openingCanvas?.getContext('2d');
  const params = new URLSearchParams(window.location.search);
  const forceIntro = params.has('intro');
  const devMode = params.has('dev');

  function rand(min, max){ return Math.random() * (max - min) + min; }

  function drawStaticStars(canvas, ctx, density){
    if(!canvas || !ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = window.innerWidth;
    const h = window.innerHeight;
    canvas.width = Math.floor(w * dpr);
    canvas.height = Math.floor(h * dpr);
    canvas.style.width = w + 'px';
    canvas.style.height = h + 'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    ctx.clearRect(0,0,w,h);
    ctx.fillStyle = '#fff';
    const count = Math.min(420, Math.max(120, Math.floor((w*h)/density)));
    for(let i=0; i<count; i++){
      const bright = Math.random() > .88;
      const r = bright ? rand(.9,2.1) : rand(.25,1.05);
      const a = bright ? rand(.58,.95) : rand(.18,.62);
      const x = Math.random()*w;
      const y = Math.random()*h;
      ctx.globalAlpha = a;
      ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill();
      if(bright){ ctx.globalAlpha = a*.13; ctx.beginPath(); ctx.arc(x,y,r*3.2,0,Math.PI*2); ctx.fill(); }
    }
    ctx.globalAlpha = 1;
  }

  function drawAllStars(){
    drawStaticStars(starCanvas, starCtx, 3900);
    drawStaticStars(openingCanvas, openingCtx, 4300);
  }

  drawAllStars();
  setOpeningTarget();
  window.addEventListener('resize', () => { drawAllStars(); setOpeningTarget(); }, {passive:true});

  const todayKey = new Date().toISOString().slice(0, 10);
  const introKey = 'kitakoni-intro-seen-date';
  const seenToday = localStorage.getItem(introKey) === todayKey;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  let introTimer = null;

  function setOpeningTarget(){
    // Version 1.0 Final: logo stays centered; no navigation target animation.
  }

  function resetIntroAnimation(){
    if(!openingInner) return;
    const photo = opening?.querySelector('.opening__photo');
    setOpeningTarget();
    openingInner.style.animation = 'none';
    if(photo) photo.style.animation = 'none';
    void openingInner.offsetHeight;
    openingInner.style.animation = '';
    if(photo) photo.style.animation = '';
  }

  function playIntro(saveSeen){
    if(!opening || reduceMotion) return;
    window.clearTimeout(introTimer);
    drawAllStars();
    opening.classList.remove('is-hidden', 'is-skipped');
    document.body.classList.add('is-locked');
    resetIntroAnimation();
    if(saveSeen) localStorage.setItem(introKey, todayKey);
    introTimer = window.setTimeout(() => {
      opening.classList.add('is-hidden');
      document.body.classList.remove('is-locked');
    }, 2850);
  }

  if(opening && !reduceMotion && (forceIntro || !seenToday)){
    playIntro(!forceIntro);
  } else if(opening) {
    opening.classList.add('is-hidden');
    opening.classList.add('is-skipped');
    document.body.classList.remove('is-locked');
  }

  window.addEventListener('scroll', () => {
    header?.classList.toggle('is-scrolled', window.scrollY > 24);
  }, {passive:true});

  toggle?.addEventListener('click', () => {
    const open = nav.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  function headerOffset(){ return Math.ceil((header?.getBoundingClientRect().height || 0) + 18); }
  function scrollToHash(hash){
    const target = hash ? document.querySelector(hash) : null;
    if(!target) return;
    const top = target.getBoundingClientRect().top + window.pageYOffset - headerOffset();
    window.scrollTo({ top: Math.max(0, top), behavior: 'smooth' });
  }

  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const hash = link.getAttribute('href');
      if(!hash || hash === '#' || !document.querySelector(hash)) return;
      e.preventDefault();
      nav?.classList.remove('is-open');
      toggle?.setAttribute('aria-expanded','false');
      scrollToHash(hash);
      if(history.pushState) history.pushState(null, '', hash);
    });
  });
  window.addEventListener('load', () => { if(location.hash) setTimeout(() => scrollToHash(location.hash), 90); });

  const io = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if(entry.isIntersecting){ entry.target.classList.add('is-visible'); io.unobserve(entry.target); }
    });
  }, {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));


  async function loadNews(){
    const list = document.getElementById('newsList');
    if(!list) return;
    try{
      const res = await fetch('news.json?ts=' + Date.now(), {cache:'no-store'});
      if(!res.ok) throw new Error('news.json not found');
      const items = await res.json();
      if(!Array.isArray(items) || items.length === 0) throw new Error('empty news');
      list.innerHTML = items.slice(0, 5).map(item => {
        const date = String(item.date || '').replace(/[<>&"]/g, '');
        const text = String(item.text || '').replace(/[<>&"]/g, c => ({'<':'&lt;','>':'&gt;','&':'&amp;','"':'&quot;'}[c]));
        return `<article class="news-item"><time class="news-date">${date}</time><p class="news-text">${text}</p></article>`;
      }).join('');
    } catch(err){
      list.innerHTML = '<p class="small">最新のお知らせはInstagramをご確認ください。</p>';
    }
  }
  loadNews();

  const langBtn = document.querySelector('.lang-toggle');
  const saved = localStorage.getItem('kitakoni-lang');
  const browser = (navigator.language || '').toLowerCase().startsWith('en') ? 'en' : 'jp';
  function setLang(lang){
    document.body.dataset.lang = lang;
    document.documentElement.lang = lang === 'en' ? 'en' : 'ja';
    langBtn?.setAttribute('aria-pressed', lang === 'en' ? 'true' : 'false');
    localStorage.setItem('kitakoni-lang', lang);
  }
  setLang(saved || browser);
  langBtn?.addEventListener('click', () => setLang(document.body.dataset.lang === 'en' ? 'jp' : 'en'));

  function createDevPanel(){
    if(!devMode) return;
    const panel = document.createElement('div');
    panel.className = 'dev-panel';
    panel.setAttribute('aria-label', 'Developer tools');
    panel.innerHTML = `
      <strong>DEV</strong>
      <button type="button" data-action="intro">▶ INTRO</button>
      <button type="button" data-action="clear">CLEAR SEEN</button>
      <button type="button" data-action="stars">REGEN STARS</button>
      <button type="button" data-action="lang">JP / EN</button>
    `;
    document.body.appendChild(panel);
    panel.addEventListener('click', (e) => {
      const button = e.target.closest('button[data-action]');
      if(!button) return;
      const action = button.dataset.action;
      if(action === 'intro') playIntro(false);
      if(action === 'clear') { localStorage.removeItem(introKey); button.textContent = 'CLEARED'; setTimeout(() => button.textContent = 'CLEAR SEEN', 900); }
      if(action === 'stars') drawAllStars();
      if(action === 'lang') setLang(document.body.dataset.lang === 'en' ? 'jp' : 'en');
    });
  }
  createDevPanel();
})();
