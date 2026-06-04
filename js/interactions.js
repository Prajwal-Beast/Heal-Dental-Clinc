/* ═══════════════════════════════════════════════════
   HEAL DENTAL — Interactive 3D Experience
   Cursor · Parallax · Tilt · Magnets · Trail · Orbs
═══════════════════════════════════════════════════ */

(function () {
  'use strict';

  const isMobile = () => {
    const w = window.innerWidth || document.documentElement.clientWidth || screen.width || 1280;
    return w <= 768 || ('ontouchstart' in window && w <= 768);
  };

  /* ── 1. CUSTOM CURSOR ─────────────────────────────── */
  function initCursor() {
    if (isMobile()) return;

    const dot  = document.createElement('div');
    const ring = document.createElement('div');
    dot.className  = 'cur-dot';
    ring.className = 'cur-ring';
    document.body.append(dot, ring);

    let mx = -200, my = -200, rx = -200, ry = -200;
    let rvx = 0, rvy = 0;

    // Smoothly lag the ring behind the dot
    function tickCursor() {
      rvx += (mx - rx) * 0.14;
      rvy += (my - ry) * 0.14;
      rvx *= 0.78;
      rvy *= 0.78;
      rx += rvx;
      ry += rvy;

      dot.style.transform  = `translate(${mx}px, ${my}px) translate(-50%,-50%)`;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%,-50%)`;

      // Stretch the ring based on velocity
      const speed = Math.sqrt(rvx * rvx + rvy * rvy);
      const angle = Math.atan2(rvy, rvx) * (180 / Math.PI);
      const stretch = Math.min(speed * 0.18, 0.6);
      ring.style.transform += ` rotate(${angle}deg) scaleX(${1 + stretch}) scaleY(${1 - stretch * 0.4})`;

      requestAnimationFrame(tickCursor);
    }
    tickCursor();

    document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });

    // States: hover → expand ring, click → shrink dot
    document.addEventListener('mouseover', e => {
      const el = e.target.closest('a, button, .svc-card, .team-card, .review-card, input, select, textarea');
      if (el) {
        ring.classList.add('cur-hover');
        dot.classList.add('cur-hover');
      } else {
        ring.classList.remove('cur-hover');
        dot.classList.remove('cur-hover');
      }
    });
    document.addEventListener('mousedown', () => dot.classList.add('cur-click'));
    document.addEventListener('mouseup',   () => dot.classList.remove('cur-click'));
  }

  /* ── 2. CURSOR SPARKLE TRAIL ──────────────────────── */
  function initSparkleTrail() {
    if (isMobile()) return;

    const pool = [];
    const POOL_SIZE = 22;

    for (let i = 0; i < POOL_SIZE; i++) {
      const sp = document.createElement('div');
      sp.className = 'trail-spark';
      document.body.appendChild(sp);
      pool.push({ el: sp, active: false });
    }

    let lastX = 0, lastY = 0, frameCount = 0;

    document.addEventListener('mousemove', e => {
      frameCount++;
      if (frameCount % 3 !== 0) return; // throttle

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 8) return;

      lastX = e.clientX;
      lastY = e.clientY;

      const spark = pool.find(s => !s.active);
      if (!spark) return;

      spark.active = true;
      const size = 3 + Math.random() * 5;
      const angle = Math.random() * 360;
      const travel = 18 + Math.random() * 28;
      const rad = angle * Math.PI / 180;
      const tx = Math.cos(rad) * travel;
      const ty = Math.sin(rad) * travel;

      spark.el.style.cssText = `
        left: ${e.clientX}px; top: ${e.clientY}px;
        width: ${size}px; height: ${size}px;
        opacity: 1;
        transform: translate(-50%,-50%) translate(0,0) scale(1);
      `;

      requestAnimationFrame(() => {
        spark.el.style.transition = 'transform 0.5s ease-out, opacity 0.5s ease-out';
        spark.el.style.transform  = `translate(-50%,-50%) translate(${tx}px,${ty}px) scale(0)`;
        spark.el.style.opacity    = '0';
      });

      setTimeout(() => {
        spark.el.style.transition = '';
        spark.active = false;
      }, 520);
    });
  }

  /* ── 3. SCROLL PROGRESS BAR ───────────────────────── */
  function initScrollProgress() {
    const bar = document.createElement('div');
    bar.className = 'scroll-progress-bar';
    document.body.prepend(bar);

    window.addEventListener('scroll', () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
      bar.style.width = pct + '%';
    }, { passive: true });
  }

  /* ── 4. HERO 3D PARALLAX ─────────────────────────── */
  function initHeroParallax() {
    if (isMobile()) return;

    const hero = document.querySelector('.hero');
    if (!hero) return;

    const bg      = hero.querySelector('.hero-bg');
    const overlay = hero.querySelector('.hero-overlay');
    const heroLeft  = hero.querySelector('.hero-left');
    const heroRight = hero.querySelector('.hero-right');
    const heroTag   = hero.querySelector('.hero-tag');
    const h1        = hero.querySelector('.hero-h1');
    const teeth     = hero.querySelectorAll('.tooth-icon');
    const sparks    = hero.querySelectorAll('.sp');
    const badge     = hero.querySelector('.hero-trust-badge');
    const orbs      = hero.querySelectorAll('.hero-orb');

    let tx = 0, ty = 0;       // target
    let cx = 0, cy = 0;       // current (lerped)

    function lerp(a, b, t) { return a + (b - a) * t; }

    function tick() {
      cx = lerp(cx, tx, 0.055);
      cy = lerp(cy, ty, 0.055);

      if (bg)       bg.style.transform      = `translate(${cx * 18}px, ${cy * 12}px) scale(1.07)`;
      if (heroLeft) heroLeft.style.transform = `translate(${cx * -10}px, ${cy * -6}px)`;
      if (heroRight) heroRight.style.transform = `translate(${cx * 14}px, ${cy * 9}px)`;
      if (badge)    badge.style.transform   = `translate(${cx * -6}px, ${cy * -4}px)`;

      teeth.forEach((t, i) => {
        const d = (i + 1) * 0.5;
        t.style.transform = `translate(${cx * 22 * d}px, ${cy * 16 * d}px)`;
      });

      sparks.forEach((s, i) => {
        const d = 0.3 + i * 0.1;
        s.style.transform = `translate(${cx * 12 * d}px, ${cy * 8 * d}px)`;
      });

      orbs.forEach((o, i) => {
        const d = 0.18 + i * 0.08;
        o.style.transform = `translate(${cx * 30 * d}px, ${cy * 20 * d}px)`;
      });

      requestAnimationFrame(tick);
    }
    tick();

    hero.addEventListener('mousemove', e => {
      const rect = hero.getBoundingClientRect();
      tx = (e.clientX - rect.left) / rect.width  - 0.5;
      ty = (e.clientY - rect.top)  / rect.height - 0.5;
    });
    hero.addEventListener('mouseleave', () => { tx = 0; ty = 0; });
  }

  /* ── 5. FLOATING DEPTH ORBS ───────────────────────── */
  function initHeroOrbs() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const orbs = [
      { x: '18%',  y: '22%', size: 340, hue: '184 150 90' },
      { x: '72%',  y: '58%', size: 280, hue: '180 140 80' },
      { x: '88%',  y: '18%', size: 200, hue: '200 165 100' },
    ];

    orbs.forEach((o, i) => {
      const el = document.createElement('div');
      el.className = 'hero-orb';
      el.style.cssText = `
        position:absolute;
        left:${o.x}; top:${o.y};
        width:${o.size}px; height:${o.size}px;
        border-radius:50%;
        background:radial-gradient(circle, rgba(${o.hue}, 0.13) 0%, transparent 70%);
        pointer-events:none;
        z-index:3;
        filter:blur(2px);
        animation: orbFloat${i} ${7 + i * 2.5}s ease-in-out infinite;
        will-change: transform;
      `;
      hero.appendChild(el);
    });

    // Inject keyframes
    const style = document.createElement('style');
    style.textContent = `
      @keyframes orbFloat0 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(18px,-22px)} }
      @keyframes orbFloat1 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(-14px,18px)} }
      @keyframes orbFloat2 { 0%,100%{transform:translate(0,0)} 50%{transform:translate(10px,-14px)} }
    `;
    document.head.appendChild(style);
  }

  /* ── 6. 3D CARD TILT + GLARE ──────────────────────── */
  function initCardTilt() {
    if (isMobile()) return;

    const cards = document.querySelectorAll('.svc-card, .team-card, .review-card');

    cards.forEach(card => {
      // Add glare layer
      const glare = document.createElement('div');
      glare.className = 'card-glare';
      card.style.position = 'relative';
      card.appendChild(glare);

      let rx = 0, ry = 0, gx = 50, gy = 50;
      let trx = 0, try_ = 0, tgx = 50, tgy = 50;
      let animating = false;
      let inside = false;

      function lerp(a, b, t) { return a + (b - a) * t; }

      function tick() {
        if (!inside && Math.abs(rx) < 0.05 && Math.abs(ry) < 0.05) {
          animating = false;
          return;
        }
        rx = lerp(rx, trx, 0.12);
        ry = lerp(ry, try_, 0.12);
        gx = lerp(gx, tgx, 0.12);
        gy = lerp(gy, tgy, 0.12);

        card.style.transform  = `perspective(700px) rotateX(${rx}deg) rotateY(${ry}deg) translateZ(8px)`;
        glare.style.background = `radial-gradient(circle at ${gx}% ${gy}%, rgba(255,255,255,0.12) 0%, transparent 65%)`;

        if (!inside) { trx = 0; try_ = 0; }
        requestAnimationFrame(tick);
      }

      card.addEventListener('mouseenter', () => {
        inside = true;
        if (!animating) { animating = true; tick(); }
      });

      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width  - 0.5;
        const y = (e.clientY - rect.top)  / rect.height - 0.5;
        trx  = -y * 14;
        try_ =  x * 14;
        tgx  = (e.clientX - rect.left) / rect.width  * 100;
        tgy  = (e.clientY - rect.top)  / rect.height * 100;
      });

      card.addEventListener('mouseleave', () => {
        inside = false;
        trx = 0; try_ = 0;
        card.style.transition = 'transform 0.6s cubic-bezier(0.23,1,0.32,1), box-shadow 0.4s';
        card.style.transform  = '';
        setTimeout(() => { card.style.transition = ''; }, 620);
      });
    });
  }

  /* ── 7. MAGNETIC BUTTONS ──────────────────────────── */
  function initMagneticButtons() {
    if (isMobile()) return;

    document.querySelectorAll('.btn-gold, .btn-outline, .nav-cta, .btn-outline-gold').forEach(btn => {
      let ox = 0, oy = 0;

      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = (e.clientX - (rect.left + rect.width  / 2)) * 0.35;
        const y = (e.clientY - (rect.top  + rect.height / 2)) * 0.45;
        ox = x; oy = y;
        btn.style.transform = `translate(${x}px, ${y}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transition = 'transform 0.5s cubic-bezier(0.23,1,0.32,1)';
        btn.style.transform  = '';
        setTimeout(() => { btn.style.transition = ''; }, 520);
      });
    });
  }

  /* ── 8. TEXT SCRAMBLE (hero h1) ───────────────────── */
  function initTextScramble() {
    const el = document.querySelector('.hero-h1');
    if (!el) return;

    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%&*';
    const original = el.innerHTML;
    const plain = el.textContent;

    let frame = 0;
    const totalFrames = 36;

    function randomChar() {
      return chars[Math.floor(Math.random() * chars.length)];
    }

    function scramble() {
      let out = '';
      const progress = frame / totalFrames;
      const revealUpto = Math.floor(progress * plain.length);

      for (let i = 0; i < plain.length; i++) {
        if (plain[i] === '\n' || plain[i] === ' ') { out += plain[i]; continue; }
        if (i < revealUpto) {
          out += plain[i];
        } else if (Math.random() < 0.4) {
          out += `<span style="color:rgba(184,150,90,0.5)">${randomChar()}</span>`;
        } else {
          out += randomChar();
        }
      }

      // Restore the em-wrapped italic for "Healing"
      el.textContent = '';
      el.innerHTML = out.replace(/Healing/g, '<em>Healing</em>');

      frame++;
      if (frame <= totalFrames) {
        setTimeout(scramble, 42);
      } else {
        el.innerHTML = original;
      }
    }

    // Slight delay so user sees the page first
    setTimeout(scramble, 600);
  }

  /* ── 9. SECTION HEADER HIGHLIGHT LINE ────────────── */
  function initSectionHighlights() {
    // Add animated underline to hovered nav links
    document.querySelectorAll('.nav-links a').forEach(a => {
      a.addEventListener('mouseenter', () => a.style.setProperty('--uw', '100%'));
      a.addEventListener('mouseleave', () => a.style.setProperty('--uw', '0%'));
    });
  }

  /* ── 10. SMOOTH SECTION BLUR-IN ──────────────────── */
  function initBlurReveal() {
    const opts = { threshold: 0.12 };
    const observer = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('blur-revealed');
          observer.unobserve(e.target);
        }
      });
    }, opts);

    document.querySelectorAll('.svc-card, .team-card, .about-stat-item').forEach(el => {
      el.classList.add('blur-pending');
      observer.observe(el);
    });
  }

  /* ── INIT ALL ─────────────────────────────────────── */
  function initInteractions() {
    initScrollProgress();
    initHeroOrbs();
    initCursor();
    initSparkleTrail();
    initHeroParallax();
    initCardTilt();
    initMagneticButtons();
    initBlurReveal();

    // Scramble after sections load (slight extra delay)
    setTimeout(initTextScramble, 300);
  }

  // Expose globally so main.js can call it after sections load
  window.initInteractions = initInteractions;

})();
