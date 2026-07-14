
    window.addEventListener('load',()=>setTimeout(()=>document.getElementById('loader').classList.add('hide'),1400));
    const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting)e.target.classList.add('on')}),{threshold:.16});
    document.querySelectorAll('.reveal').forEach(el=>io.observe(el));
  ;setTimeout(()=>document.getElementById('loader')?.classList.add('hide'),2600);


(() => {
  const nav = document.querySelector('.nav');
  const links = [...document.querySelectorAll('.nav .menu a[href^="#"]')];
  const pairs = links.map(link => {
    const section = document.querySelector(link.getAttribute('href'));
    return section ? { link, section } : null;
  }).filter(Boolean);

  function activate(link) {
    links.forEach(a => a.classList.toggle('active', a === link));
  }

  function updateActive() {
    if (!pairs.length) return;

    const marker = window.scrollY + (nav ? nav.offsetHeight : 0) + window.innerHeight * 0.30;
    let current = pairs[0];

    for (const pair of pairs) {
      if (pair.section.offsetTop <= marker) current = pair;
      else break;
    }

    if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10) {
      current = pairs[pairs.length - 1];
    }

    activate(current.link);
    if (nav) nav.classList.toggle('scrolled', window.scrollY > 20);
  }

  let frame = null;
  window.addEventListener('scroll', () => {
    if (frame) return;
    frame = requestAnimationFrame(() => {
      updateActive();
      frame = null;
    });
  }, { passive:true });

  links.forEach(link => {
    link.addEventListener('click', () => activate(link));
  });

  window.addEventListener('resize', updateActive);
  window.addEventListener('load', updateActive);
  updateActive();
})();
