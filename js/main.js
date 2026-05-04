/* All HTML sections are now inline in index.html — no fetch needed */

function initAnimations() {
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  const rv = (sel, vars, stagger) => {
    const els = document.querySelectorAll(sel);
    if (!els.length) return;
    gsap.from(els, {
      ...vars,
      stagger: stagger || 0,
      scrollTrigger: { trigger: els[0], start: 'top 88%' }
    });
  };

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

  rv('.stat-cell',   { opacity: 0, y: 28,  duration: 0.8, ease: 'power3.out' }, 0.1);
  rv('.svc-card',    { opacity: 0, y: 36,  duration: 0.8, ease: 'power3.out' }, 0.07);
  rv('.team-card',   { opacity: 0, y: 40,  duration: 0.9, ease: 'power3.out' }, 0.1);
  rv('.review-card', { opacity: 0, y: 28,  duration: 0.8, ease: 'power3.out' }, 0.06);
  rv('.c-item',      { opacity: 0, x: 20,  duration: 0.7, ease: 'power3.out' }, 0.1);
  rv('.map-box',     { opacity: 0, y: 20,  duration: 0.9, ease: 'power3.out' });
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  initTestimonials();
  initContact();

  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
  });
});
