/* ── GSAP FUTURISTIC ANIMATIONS ───────────────────── */

function initAnimations() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger, TextPlugin);

  /* ── CURSOR ORB ── */
  const orb = document.createElement('div');
  orb.className = 'cursor-orb';
  document.body.appendChild(orb);
  let mx = window.innerWidth / 2, my = window.innerHeight / 2;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  gsap.ticker.add(() => {
    gsap.set(orb, { x: mx, y: my });
  });
  document.querySelectorAll('.btn-primary, .btn-outline, .nav-cta, a').forEach(el => {
    el.addEventListener('mouseenter', () => orb.classList.add('big'));
    el.addEventListener('mouseleave', () => orb.classList.remove('big'));
  });

  /* ── HERO PARTICLE CANVAS ── */
  initParticles();

  /* ── HERO TEXT WORD REVEAL ── */
  const h1 = document.querySelector('.hero-h1');
  if (h1) {
    const html = h1.innerHTML;
    // wrap each word in span preserving <em> and <br>
    h1.innerHTML = html.replace(/(<br\s*\/?>|<\/?em>|[^<\s][^<]*[^<\s]|[^\s<])/g, (m) => {
      if (m.startsWith('<')) return m;
      return m.split(' ').map(w => w ? `<span class="word"><span class="word-inner">${w}</span></span> ` : ' ').join('');
    });
    gsap.set('.hero-h1 .word-inner', { yPercent: 110, opacity: 0 });
    gsap.to('.hero-h1 .word-inner', {
      yPercent: 0, opacity: 1,
      duration: .9, stagger: .08,
      ease: 'expo.out',
      delay: .2
    });
  }

  /* ── HERO OTHER ELEMENTS ── */
  gsap.set(['.hero-tag', '.hero-lede', '.hero-btns', '.hero-trust'], { opacity: 0, y: 28 });
  gsap.to(['.hero-tag', '.hero-lede', '.hero-btns', '.hero-trust'], {
    opacity: 1, y: 0,
    duration: .8, stagger: .12,
    ease: 'expo.out',
    delay: .55
  });

  gsap.set('.hero-img-frame', { opacity: 0, x: 40, scale: .97 });
  gsap.to('.hero-img-frame', { opacity: 1, x: 0, scale: 1, duration: 1.1, ease: 'expo.out', delay: .3 });

  gsap.set(['.hero-float-card--rating', '.hero-float-card--emergency'], { opacity: 0, scale: .8, y: 20 });
  gsap.to('.hero-float-card--rating',   { opacity: 1, scale: 1, y: 0, duration: .7, ease: 'back.out(1.5)', delay: 1.0 });
  gsap.to('.hero-float-card--emergency',{ opacity: 1, scale: 1, y: 0, duration: .7, ease: 'back.out(1.5)', delay: 1.15 });

  /* ── FLOAT LOOP on cards ── */
  gsap.to('.hero-float-card--rating',    { y: -10, duration: 2.8, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.2 });
  gsap.to('.hero-float-card--emergency', { y: 8,  duration: 3.2, repeat: -1, yoyo: true, ease: 'sine.inOut', delay: 1.5 });

  /* ── STAT COUNTERS ── */
  document.querySelectorAll('.counter').forEach(el => {
    const target = parseFloat(el.dataset.target);
    const dec    = parseInt(el.dataset.decimal || 0);
    ScrollTrigger.create({
      trigger: el, start: 'top 92%', once: true,
      onEnter: () => {
        gsap.fromTo(el,
          { innerText: 0 },
          {
            innerText: target, duration: 1.8, ease: 'power2.out',
            snap: dec === 0 ? { innerText: 1 } : {},
            onUpdate() {
              el.textContent = parseFloat(el.innerText).toFixed(dec);
            }
          }
        );
        gsap.fromTo(el, { textShadow: '0 0 0px rgba(63,169,217,0)' },
          { textShadow: '0 0 24px rgba(63,169,217,.7)', duration: .6, yoyo: true, repeat: 3, ease: 'power2.inOut' }
        );
      }
    });
  });

  /* ── SCROLL REVEAL HELPER ── */
  function reveal(selector, vars = {}) {
    const els = document.querySelectorAll(selector);
    if (!els.length) return;
    gsap.set(els, { opacity: 0, y: vars.y ?? 40, x: vars.x ?? 0, scale: vars.scale ?? 1 });
    ScrollTrigger.batch(els, {
      start: 'top 88%',
      onEnter: batch => gsap.to(batch, {
        opacity: 1, y: 0, x: 0, scale: 1,
        duration: vars.dur ?? .75,
        stagger: vars.stagger ?? .1,
        ease: vars.ease ?? 'expo.out',
        clearProps: 'all'
      })
    });
  }

  /* ── ABOUT ── */
  reveal('.about-imgs',  { x: -50, y: 0, dur: .9 });
  reveal('.about-text',  { x:  50, y: 0, dur: .9 });

  /* ── SERVICES ── */
  reveal('.services-head', { y: 30 });
  document.querySelectorAll('.svc-row').forEach((row, i) => {
    gsap.set(row, { opacity: 0, y: 50 });
    ScrollTrigger.create({
      trigger: row, start: 'top 85%', once: true,
      onEnter: () => gsap.to(row, { opacity: 1, y: 0, duration: .8, ease: 'expo.out', delay: i * .05 })
    });
  });

  /* ── 3D TILT on service rows ── */
  document.querySelectorAll('.svc-row').forEach(row => {
    row.addEventListener('mousemove', e => {
      const r = row.getBoundingClientRect();
      const cx = (e.clientX - r.left) / r.width  - .5;
      const cy = (e.clientY - r.top)  / r.height - .5;
      gsap.to(row, { rotateY: cx * 8, rotateX: -cy * 5, duration: .35, ease: 'power2.out', transformPerspective: 900 });
    });
    row.addEventListener('mouseleave', () => {
      gsap.to(row, { rotateY: 0, rotateX: 0, duration: .6, ease: 'expo.out' });
    });
  });

  /* ── DOCTOR ── */
  reveal('.doc-photo-col',   { x: -50, y: 0, dur: .9 });
  reveal('.doc-message-col', { x:  50, y: 0, dur: .9 });

  /* ── TEAM ── */
  reveal('.team-head-desc', { y: 24 });
  reveal('.team-card', { y: 50, stagger: .12, scale: .94 });

  /* ── REVIEWS ── */
  reveal('.reviews-rating-badge', { scale: .85, y: 0, dur: .7 });
  reveal('.review-card', { y: 36, stagger: .08 });

  /* ── CTA STRIP ── */
  reveal('.cta-strip-btns', { x: 40, y: 0, dur: .8 });

  /* ── CONTACT / BOOKING ── */
  reveal('.booking-head', { y: 30 });
  reveal('.form-wrap',    { x: -40, y: 0, dur: .85 });
  reveal('.contact-info', { x:  40, y: 0, dur: .85 });

  /* ── GLOWING LINE ACCENTS ── */
  document.querySelectorAll('.eyebrow').forEach(el => {
    const line = document.createElement('span');
    line.className = 'section-glow-line';
    el.after(line);
    ScrollTrigger.create({
      trigger: line, start: 'top 88%', once: true,
      onEnter: () => gsap.to(line, { width: '64px', duration: .7, ease: 'expo.out' })
    });
  });

  /* ── MAGNETIC BUTTONS ── */
  document.querySelectorAll('.btn-primary, .btn-outline').forEach(btn => {
    btn.addEventListener('mousemove', e => {
      const r = btn.getBoundingClientRect();
      const dx = (e.clientX - (r.left + r.width  / 2)) * .22;
      const dy = (e.clientY - (r.top  + r.height / 2)) * .22;
      gsap.to(btn, { x: dx, y: dy, duration: .25, ease: 'power2.out' });
    });
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: .5, ease: 'elastic.out(1,.4)' });
    });
  });
}

/* ── PARTICLE CANVAS ── */
function initParticles() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, dots = [];

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const COUNT = 55;
  for (let i = 0; i < COUNT; i++) {
    dots.push({
      x: Math.random() * W, y: Math.random() * H,
      vx: (Math.random() - .5) * .35,
      vy: (Math.random() - .5) * .35,
      r: Math.random() * 2 + .8,
      a: Math.random() * .6 + .2
    });
  }

  function draw() {
    ctx.clearRect(0, 0, W, H);
    dots.forEach(d => {
      d.x += d.vx; d.y += d.vy;
      if (d.x < 0) d.x = W; if (d.x > W) d.x = 0;
      if (d.y < 0) d.y = H; if (d.y > H) d.y = 0;
      ctx.beginPath();
      ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(63,169,217,${d.a})`;
      ctx.fill();
    });
    // connect nearby dots
    for (let i = 0; i < dots.length; i++) {
      for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if (dist < 110) {
          ctx.beginPath();
          ctx.moveTo(dots[i].x, dots[i].y);
          ctx.lineTo(dots[j].x, dots[j].y);
          ctx.strokeStyle = `rgba(63,169,217,${.18 * (1 - dist/110)})`;
          ctx.lineWidth = .7;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
}

document.addEventListener('DOMContentLoaded', () => {
  initNav();
  initAnimations();
  initTestimonials();
  initContact();
});
