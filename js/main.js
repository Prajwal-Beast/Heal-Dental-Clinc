gsap.registerPlugin(ScrollTrigger);

async function loadSection(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

const rv = (sel, vars, stagger) => {
  const els = document.querySelectorAll(sel);
  if (!els.length) return;
  gsap.from(els, { ...vars, stagger: stagger || 0, scrollTrigger: { trigger: els[0], start: 'top 87%' } });
};

function initAnimations() {
  // Parallax hero background
  gsap.to('#heroBg', {
    yPercent: 28, ease: 'none',
    scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
  });

  // Counter animation for stat bars
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const dec    = parseInt(el.dataset.decimal || 0);
    ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: () => {
        let start = 0;
        const step = () => {
          start += (target - start) * 0.08 + 0.01;
          el.textContent = start >= target - 0.05 ? target.toFixed(dec) : start.toFixed(dec);
          if (start < target - 0.05) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
  });

  rv('.stat-cell',               { opacity:0, y:36,  duration:0.85, ease:'power3.out' }, 0.1);
  rv('.philosophy .inner > div', { opacity:0, y:40,  duration:1,    ease:'power3.out' }, 0.15);
  rv('.phil-point',              { opacity:0, y:24,  duration:0.75, ease:'power3.out' }, 0.12);
  rv('.phil-img-wrap',           { opacity:0, scale:0.96, duration:1.1, ease:'power3.out' }, 0.14);
  rv('.gal-main',                { opacity:0, x:-52, duration:1,    ease:'power3.out' });
  rv('.gal-sm',                  { opacity:0, x:52,  duration:1,    ease:'power3.out' }, 0.14);
  rv('.team-card',               { opacity:0, y:44,  duration:0.9,  ease:'power3.out' }, 0.1);
  rv('.reviews-rating-badge',    { opacity:0, x:-40, duration:1,    ease:'power3.out' });
  rv('.c-item',                  { opacity:0, y:28,  duration:0.8,  ease:'power3.out' }, 0.1);
  rv('.map-box',                 { opacity:0, x:52,  duration:1,    ease:'power3.out' });
}

(async () => {
  await Promise.all([
    loadSection('s-header',       'sections/header.html'),
    loadSection('s-hero',         'sections/hero.html'),
    loadSection('s-about',        'sections/about.html'),
    loadSection('s-services',     'sections/services.html'),
    loadSection('s-team',         'sections/team.html'),
    loadSection('s-testimonials', 'sections/testimonials.html'),
    loadSection('s-contact',      'sections/contact.html'),
  ]);

  initNav();
  initAnimations();
  initTestimonials();
  initContact();

  AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
  });

  GLightbox({
    selector: '.glightbox',
    touchNavigation: true,
    loop: true,
    autoplayVideos: false
  });
})();
