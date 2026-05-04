gsap.registerPlugin(ScrollTrigger);

async function loadSection(id, path) {
  const res = await fetch(path);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

const rv = (sel, vars, stagger) => {
  const els = document.querySelectorAll(sel);
  if (!els.length) return;
  gsap.from(els, {
    ...vars,
    stagger: stagger || 0,
    scrollTrigger: { trigger: els[0], start: 'top 88%' }
  });
};

function initAnimations() {
  /* Counters */
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const dec    = parseInt(el.dataset.decimal || 0);
    ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: () => {
        let cur = 0;
        const step = () => {
          cur += (target - cur) * 0.08 + 0.01;
          el.textContent = cur >= target - 0.05
            ? target.toFixed(dec)
            : cur.toFixed(dec);
          if (cur < target - 0.05) requestAnimationFrame(step);
        };
        requestAnimationFrame(step);
      }
    });
  });

  /* Section reveals */
  rv('.stat-cell',    { opacity: 0, y: 32,  duration: 0.8, ease: 'power3.out' }, 0.1);
  rv('.svc-card',     { opacity: 0, y: 40,  duration: 0.8, ease: 'power3.out' }, 0.08);
  rv('.team-card',    { opacity: 0, y: 44,  duration: 0.9, ease: 'power3.out' }, 0.1);
  rv('.review-card',  { opacity: 0, y: 32,  duration: 0.8, ease: 'power3.out' }, 0.07);
  rv('.c-item',       { opacity: 0, x: 24,  duration: 0.7, ease: 'power3.out' }, 0.1);
  rv('.map-box',      { opacity: 0, y: 24,  duration: 0.9, ease: 'power3.out' });
  rv('.about-imgs',   { opacity: 0, x: 40,  duration: 1,   ease: 'power3.out' });
  rv('.about-text',   { opacity: 0, x: -40, duration: 1,   ease: 'power3.out' });
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
    duration: 750,
    easing: 'ease-out-cubic',
    once: true,
    offset: 64
  });
})();
