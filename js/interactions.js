/* ═══════════════════════════════════════════════════
   HEAL DENTAL — Interactive 3D Experience
   Cursor · Parallax · Tilt · Magnets · Trail · Orbs
   All effects are HARD-DISABLED on touch/mobile.
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  // ── RELIABLE mobile check (works before DOM is ready) ──
  // matchMedia is synchronous and always accurate — unlike
  // window.innerWidth which can be 0 during script parse.
  const IS_TOUCH = window.matchMedia('(pointer: coarse)').matches
                || window.matchMedia('(hover: none)').matches
                || ('ontouchstart' in window);

  // Hard exit on any touch device — nothing runs at all
  if (IS_TOUCH) {
    window.initInteractions = function () {};
    return;
  }

  /* ── 1. CUSTOM CURSOR ─────────────────────────────── */
  function initCursor() {
    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cur-dot';
    ring.className = 'cur-ring';
    document.body.append(dot, ring);

    let mx = -200, my = -200, rx = -200, ry = -200;
    let rvx = 0, rvy = 0;
    let rafId;

    function tickCursor() {
      rvx += (mx - rx) * 0.14;
      rvy += (my - ry) * 0.14;
      rvx *= 0.78;
      rvy *= 0.78;
      rx += rvx;
      ry += rvy;

      dot.style.transform  = `translate(${mx}px,${my}px) translate(-50%,-50%)`;

      const speed   = Math.sqrt(rvx * rvx + rvy * rvy);
      const angle   = Math.atan2(rvy, rvx) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.18, 0.6);
      ring.style.transform =
        `translate(${rx}px,${ry}px) translate(-50%,-50%)` +
        ` rotate(${angle}deg) scaleX(${1 + stretch}) scaleY(${1 - stretch * 0.4})`;

      rafId = requestAnimationFrame(tickCursor);
    }
    rafId = requestAnimationFrame(tickCursor);

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    document.addEventListener('mouseover', e => {
      const el = e.target.closest('a, button, input, select, textarea, .team-card, .review-card');
      ring.classList.toggle('cur-hover', !!el);
      dot.classList.toggle('cur-hover', !!el);
    });
    document.addEventListener('mousedown', () => dot.classList.add('cur-click'));
    document.addEventListener('mouseup',   () => dot.classList.remove('cur-click'));
  }

  /* ── 2. CURSOR SPARKLE TRAIL ──────────────────────── */
  function initSparkleTrail() {
    const POOL_SIZE = 18;
    const pool = Array.from({ length: POOL_SIZE }, () => {
      const sp = document.createElement('div');
      sp.className = 'trail-spark';
      document.body.appendChild(sp);
      return { el: sp, active: false };
    });

    let lastX = 0, lastY = 0, frame = 0;

    document.addEventListener('mousemove', e => {
      frame++;
      if (frame % 3 !== 0) return;
      const dist = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (dist < 10) return;
      lastX = e.clientX; lastY = e.clientY;

      const spark = pool.find(s => !s.active);
      if (!spark) return;
      spark.active = true;

      const size   = 3 + Math.random() * 4;
      const angle  = Math.random() * Math.PI * 2;
      const travel = 16 + Math.random() * 24;
      const tx = Math.cos(angle) * travel;
      const ty = Math.sin(angle) * travel;

      spark.el.style.cssText =
        `left:${e.clientX}px;top:${e.clientY}px;` +
        `width:${size}px;height:${size}px;opacity:1;` +
        `transform:translate(-50%,-50%) scale(1);transition:none;`;

      requestAnimationFrame(() => {
        spark.el.style.transition = 'transform 0.48s ease-out, opacity 0.48s ease-out';
        spark.el.style.transform  = `translate(-50%,-50%) translate(${tx}px,${ty}px) scale(0)`;
        spark.el.style.opacity    = '0';
      });

      setTimeout(() => { spark.el.style.transition = ''; spark.active = false; }, 500);
    });
  }

  /* ── 3. SCROLL PROGRESS BAR ───────────────────────── */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.prepend(bar);

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const max = document.documentElement.scrollHeight - window.innerHeight;
          bar.style.width = (max > 0 ? (window.scrollY / max) * 100 : 0) + '%';
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ── 4. HERO 3D PARALLAX ─────────────────────────── */
  function initHeroParallax() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const heroLeft   = hero.querySelector('.hero-left');
    const heroRight  = hero.querySelector('.hero-right');
    const heroImg    = hero.querySelector('.hero-img');
    const floatCards = hero.querySelectorAll('.hero-float-card');
    const orbs       = hero.querySelectorAll('.hero-orb');

    let tx = 0, ty = 0, cx = 0, cy = 0;

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      cx = lerp(cx, tx, 0.055);
      cy = lerp(cy, ty, 0.055);

      if (heroImg)   heroImg.style.transform   = `scale(1.07) translate(${cx * 16}px,${cy * 10}px)`;
      if (heroLeft)  heroLeft.style.transform  = `translate(${cx * -7}px,${cy * -4}px)`;
      if (heroRight) heroRight.style.transform = `translate(${cx * 10}px,${cy * 6}px)`;

      floatCards.forEach((c, i) => {
        const d = 0.5 + i * 0.35;
        c.style.transform = `translate(${cx * -12 * d}px,${cy * -8 * d}px)`;
      });

      orbs.forEach((o, i) => {
        const d = 0.15 + i * 0.07;
        o.style.transform = `translate(${cx * 28 * d}px,${cy * 18 * d}px)`;
      });

      requestAnimationFrame(tick);
    }
    tick();

    hero.addEventListener('mousemove', e => {
      const r = hero.getBoundingClientRect();
      tx = (e.clientX - r.left) / r.width  - 0.5;
      ty = (e.clientY - r.top)  / r.height - 0.5;
    });
    hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
  }

  /* ── 5. FLOATING DEPTH ORBS ───────────────────────── */
  function initHeroOrbs() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    [
      { x: '15%', y: '20%', size: 320, r: 63, g: 169, b: 217 },
      { x: '70%', y: '55%', size: 260, r: 50, g: 140, b: 190 },
      { x: '85%', y: '15%', size: 190, r: 80, g: 180, b: 220 },
    ].forEach((o, i) => {
      const el = document.createElement('div');
      el.className = 'hero-orb';
      el.style.cssText =
        `position:absolute;left:${o.x};top:${o.y};` +
        `width:${o.size}px;height:${o.size}px;border-radius:50%;` +
        `background:radial-gradient(circle,rgba(${o.r},${o.g},${o.b},0.11) 0%,transparent 70%);` +
        `pointer-events:none;z-index:1;` +
        `animation:orbFloat${i} ${7 + i * 2.5}s ease-in-out infinite;` +
        `will-change:transform;`;
      hero.appendChild(el);
    });

    const s = document.createElement('style');
    s.textContent =
      `@keyframes orbFloat0{0%,100%{transform:translate(0,0)}50%{transform:translate(16px,-20px)}}` +
      `@keyframes orbFloat1{0%,100%{transform:translate(0,0)}50%{transform:translate(-12px,16px)}}` +
      `@keyframes orbFloat2{0%,100%{transform:translate(0,0)}50%{transform:translate(9px,-12px)}}`;
    document.head.appendChild(s);
  }

  /* ── 6. 3D CARD TILT + GLARE ──────────────────────── */
  function initCardTilt() {
    document.querySelectorAll('.team-card, .review-card').forEach(card => {
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.style.position = 'relative';
      card.appendChild(glare);

      let rx = 0, ry = 0, gx = 50, gy = 50;
      let trx = 0, try_ = 0, tgx = 50, tgy = 50;
      let rafId = null, inside = false;

      function lerp(a, b, t) { return a + (b - a) * t; }

      function tick() {
        if (!inside && Math.abs(rx) < 0.08 && Math.abs(ry) < 0.08) {
          card.style.transform = '';
          glare.style.background = '';
          rafId = null;
          return;
        }
        rx = lerp(rx, trx, 0.12);
        ry = lerp(ry, try_, 0.12);
        gx = lerp(gx, tgx, 0.12);
        gy = lerp(gy, tgy, 0.12);
        card.style.transform  = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(6px)`;
        glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%,rgba(255,255,255,0.11) 0%,transparent 60%)`;
        rafId = requestAnimationFrame(tick);
      }

      card.addEventListener('mouseenter', () => {
        inside = true;
        if (!rafId) rafId = requestAnimationFrame(tick);
      });
      card.addEventListener('mousemove', e => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width  - 0.5;
        const y = (e.clientY - r.top)  / r.height - 0.5;
        trx = -y * 12; try_ = x * 12;
        tgx = (x + 0.5) * 100; tgy = (y + 0.5) * 100;
      });
      card.addEventListener('mouseleave', () => {
        inside = false; trx = 0; try_ = 0;
      });
    });
  }

  /* ── 7. MAGNETIC BUTTONS ──────────────────────────── */
  function initMagneticButtons() {
    document.querySelectorAll('.btn-primary, .btn-outline, .btn-outline-white').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const r = btn.getBoundingClientRect();
        const x = (e.clientX - (r.left + r.width  / 2)) * 0.3;
        const y = (e.clientY - (r.top  + r.height / 2)) * 0.38;
        btn.style.transform = `translate(${x}px,${y}px)`;
      });
      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.45s cubic-bezier(0.23,1,0.32,1)';
        btn.style.transform  = '';
        setTimeout(() => { btn.style.transition = ''; }, 460);
      });
    });
  }

  /* ── 8. TEXT SCRAMBLE (hero h1) — desktop only ────── */
  function initTextScramble() {
    const el = document.querySelector('.hero-h1');
    if (!el) return;

    const chars   = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const original = el.innerHTML;
    const plain    = el.textContent;
    let frame = 0;
    const FRAMES = 28;

    (function scramble() {
      const progress   = frame / FRAMES;
      const revealUpto = Math.floor(progress * plain.length);
      let out = '';

      for (let i = 0; i < plain.length; i++) {
        const ch = plain[i];
        if (ch === '\n' || ch === ' ') { out += ch; continue; }
        out += i < revealUpto
          ? ch
          : `<span style="opacity:.35">${chars[Math.floor(Math.random() * chars.length)]}</span>`;
      }

      el.innerHTML = out.replace(/Dental/g, '<em>Dental</em>');
      frame++;
      if (frame <= FRAMES) setTimeout(scramble, 38);
      else el.innerHTML = original;
    })();
  }

  /* ── 9. FADE-IN ENTRANCE (no blur — uses opacity+Y) ── */
  function initFadeReveal() {
    const style = document.createElement('style');
    style.textContent =
      `.fade-pending{opacity:0;transform:translateY(18px);transition:opacity .6s ease,transform .6s ease}` +
      `.fade-revealed{opacity:1!important;transform:translateY(0)!important}`;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('fade-revealed');
          observer.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.team-card, .review-card').forEach(el => {
      el.classList.add('fade-pending');
      observer.observe(el);
    });
  }

  /* ── INIT ALL ─────────────────────────────────────── */
  window.initInteractions = function () {
    initScrollProgress();
    initHeroOrbs();
    initCursor();
    initSparkleTrail();
    initHeroParallax();
    initCardTilt();
    initMagneticButtons();
    initFadeReveal();
    setTimeout(initTextScramble, 400);
  };

})();
