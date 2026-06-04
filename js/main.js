/* All HTML sections are now inline in index.html — no fetch needed */

function initAnimations() {
  /* Counters only — scroll reveals handled by AOS to avoid opacity:0 lock-in */
  if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

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
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  initTestimonials();
  initContact();
  if (typeof initInteractions === 'function') initInteractions();

  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
  });
});
