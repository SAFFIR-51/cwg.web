// ============================================
// PINTEL Clone - Main JS (Enhanced Interactions)
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Header scroll state + scrollspy ---------- */
  const header = document.getElementById('header');
  const toTop = document.querySelector('.to-top');
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.gnb > ul > li > a');

  const onScroll = () => {
    const sc = window.scrollY;
    header.classList.toggle('scrolled', sc > 50);
    toTop.classList.toggle('show', sc > 500);

    // scrollspy
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 200;
      if (sc >= top) current = sec.id;
    });
    navLinks.forEach(a => {
      a.classList.toggle('is-active', a.dataset.target === current);
    });
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  toTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------- 2. Hero parallax + cube parallax + title letter reveal ---------- */
  const heroBgs = document.querySelectorAll('.hero-bg');
  const cubeScene = document.querySelector('.cube-scene');
  const glowBand = document.querySelector('.glow-band');
  const glowBandTop = glowBand ? glowBand.getBoundingClientRect().top + window.scrollY : 0;

  window.addEventListener('scroll', () => {
    const sc = window.scrollY;
    if (sc < window.innerHeight) {
      heroBgs.forEach(bg => {
        bg.style.transform = `translateY(${sc * 0.3}px) scale(${1 + sc * 0.0002})`;
      });
    }
    if (cubeScene) {
      const offset = (sc - glowBandTop) * 0.15;
      cubeScene.style.transform = `translateY(${offset}px)`;
    }
  }, { passive: true });

  // Split hero title into letter spans for sequential reveal
  const splitText = (el) => {
    if (el.dataset.split === 'done') return;
    const html = el.innerHTML;
    const wrap = document.createElement('span');
    wrap.innerHTML = html;
    // walk text nodes, wrap each char in span
    const walk = (node) => {
      [...node.childNodes].forEach(child => {
        if (child.nodeType === 3) {
          const frag = document.createDocumentFragment();
          [...child.textContent].forEach((ch, i) => {
            const s = document.createElement('span');
            s.className = 'char';
            s.textContent = ch === ' ' ? ' ' : ch;
            frag.appendChild(s);
          });
          child.replaceWith(frag);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    };
    walk(wrap);
    el.innerHTML = '';
    el.appendChild(wrap);
    el.dataset.split = 'done';
    // animate
    const chars = el.querySelectorAll('.char');
    chars.forEach((c, i) => {
      c.style.animationDelay = (0.04 * i + 0.2) + 's';
    });
  };

  const animateHeroTitle = (slide) => {
    const title = slide.querySelector('.hero-title');
    if (title) splitText(title);
  };

  /* ---------- 3. Hero slider (only if hero exists) ---------- */
  const slides = document.querySelectorAll('.hero-slide');
  const dots = document.querySelectorAll('.dot-btn');
  let curSlide = 0;
  let slideTimer;
  if (slides.length > 0) {
    const setSlide = (i) => {
      slides.forEach((s, idx) => s.classList.toggle('active', idx === i));
      dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
      curSlide = i;
      if (slides[i]) animateHeroTitle(slides[i]);
    };
    const startSlideTimer = () => {
      clearInterval(slideTimer);
      slideTimer = setInterval(() => setSlide((curSlide + 1) % slides.length), 6500);
    };
    dots.forEach((d, i) => d.addEventListener('click', () => { setSlide(i); startSlideTimer(); }));
    animateHeroTitle(slides[0]);
    startSlideTimer();
  }

  /* ---------- 4. AI nodes auto-rotate (only if exists) ---------- */
  const nodes = document.querySelectorAll('.ai-nodes .node');
  const descs = document.querySelectorAll('.ai-desc');
  let curNode = 0;
  let nodeTimer;
  if (nodes.length > 0) {
    const setNode = (nodeIdx) => {
      if (!nodes[nodeIdx]) return;
      nodes.forEach((n, i) => n.classList.toggle('active', i === nodeIdx));
      const descIdx = parseInt(nodes[nodeIdx].dataset.desc, 10);
      descs.forEach((d, i) => d.classList.toggle('active', i === descIdx));
      curNode = nodeIdx;
    };
    const startNodeTimer = () => {
      clearInterval(nodeTimer);
      nodeTimer = setInterval(() => setNode((curNode + 1) % nodes.length), 3500);
    };
    nodes.forEach((n, i) => n.addEventListener('click', () => { setNode(i); startNodeTimer(); }));
    startNodeTimer();

    // pause on hover
    const aiSquare = document.querySelector('.ai-square');
    if (aiSquare) {
      aiSquare.addEventListener('mouseenter', () => clearInterval(nodeTimer));
      aiSquare.addEventListener('mouseleave', startNodeTimer);
    }
  }

  /* ---------- 5. Count-up ---------- */
  const animateCount = (el) => {
    const target = parseInt(el.dataset.count, 10);
    const duration = 2200;
    const start = performance.now();
    const step = (now) => {
      const p = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = Math.round(target * eased);
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  };

  /* ---------- Setup .text-fill / data-fill elements ---------- */
  // Duplicate the inner text into a .fill-mask span so the white version
  // can sit on top of the gray base and be revealed via clip-path L→R.
  const setupFillMask = (el) => {
    if (el.dataset.fillReady === '1') return;
    if (el.querySelector('.fill-mask')) { el.dataset.fillReady = '1'; return; }
    const inner = el.innerHTML;
    const mask = document.createElement('span');
    mask.className = 'fill-mask';
    mask.innerHTML = inner;
    mask.setAttribute('aria-hidden', 'true');
    el.appendChild(mask);
    el.dataset.fillReady = '1';
  };
  document.querySelectorAll('[data-fill], .text-fill').forEach(setupFillMask);

  /* ---------- 6. Intersection Observer ---------- */
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.dataset.count !== undefined) animateCount(el);
      if (el.dataset.fill !== undefined || el.classList.contains('text-fill')) {
        el.classList.add('filled');
      }
      if (el.hasAttribute('data-scroll')) el.classList.add('show');
      if (el.dataset.staggerGroup !== undefined) {
        const children = el.querySelectorAll('[data-stagger]');
        children.forEach((c, i) => {
          setTimeout(() => c.classList.add('show'), i * 120);
        });
      }
      io.unobserve(el);
    });
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  document.querySelectorAll('[data-count], [data-fill], [data-scroll], [data-stagger-group], .text-fill')
    .forEach(el => io.observe(el));

  /* ---------- 6b. Reveal containers (.is-revealed) ---------- */
  const revealIo = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      e.target.classList.add('is-revealed');
      revealIo.unobserve(e.target);
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

  document.querySelectorAll('.prevax-cards, .support-cards, .news-list').forEach(el => revealIo.observe(el));

  /* ---------- 7. AI diagram entrance (only if exists) ---------- */
  const aiSquareEl = document.querySelector('.ai-square');
  if (aiSquareEl) {
    const aiSquareIo = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-visible');
        nodes.forEach((n, i) => {
          setTimeout(() => n.classList.add('is-placed'), 200 + i * 150);
        });
        aiSquareIo.unobserve(e.target);
      });
    }, { threshold: 0.3 });
    aiSquareIo.observe(aiSquareEl);
  }

  /* ---------- 8. Partner roll: clone for seamless infinite (only if exists) ---------- */
  const topUl = document.getElementById('rollTop');
  const bottomUl = document.getElementById('rollBottom');
  if (topUl && bottomUl) {
    const buildPartners = (ul, range) => {
      const items = range.map(r => {
        const idx = String(r).padStart(2, '0');
        return `<li><img src="assets/partners/partner_${idx}.png" alt="partner ${idx}" loading="lazy"></li>`;
      });
      ul.innerHTML = items.join('') + items.join('');
    };
    buildPartners(topUl, Array.from({ length: 15 }, (_, i) => i + 1));
    buildPartners(bottomUl, Array.from({ length: 15 }, (_, i) => i + 16));
  }

  /* ---------- 9. Magnetic hover on pill buttons ---------- */
  document.querySelectorAll('.btn-pill, .history-btn, .to-top, .quick-btn').forEach(btn => {
    const strength = btn.classList.contains('btn-pill') ? 0.25 : 0.15;
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = '';
    });
  });

  /* ---------- 10. Cursor glow ---------- */
  const cursor = document.querySelector('.cursor-glow');
  if (cursor && window.matchMedia('(hover: hover)').matches) {
    let mx = 0, my = 0, gx = 0, gy = 0;
    document.addEventListener('mousemove', (e) => { mx = e.clientX; my = e.clientY; });
    const tick = () => {
      gx += (mx - gx) * 0.12;
      gy += (my - gy) * 0.12;
      cursor.style.transform = `translate(${gx}px, ${gy}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();

    // grow on interactive hover
    document.querySelectorAll('a, button').forEach(el => {
      el.addEventListener('mouseenter', () => cursor.classList.add('is-large'));
      el.addEventListener('mouseleave', () => cursor.classList.remove('is-large'));
    });
  }

  /* ---------- 11. Smooth anchor scroll ---------- */
  document.querySelectorAll('a[href^="#"]:not([href="#"])').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href').slice(1);
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      window.scrollTo({ top: target.offsetTop - 80, behavior: 'smooth' });
    });
  });

  /* ---------- 12. Lenis-style smooth scroll (lightweight) ---------- */
  // Optional: ease wheel-scroll for buttery feel.
  // Disabled by default to keep native trackpad/scrollbar behavior.
  // Toggle by setting body.dataset.smooth = "on"
  if (document.body.dataset.smooth === 'on' && window.matchMedia('(hover: hover)').matches) {
    let target = window.scrollY;
    let current = window.scrollY;
    const ease = 0.08;
    const tickScroll = () => {
      current += (target - current) * ease;
      window.scrollTo(0, current);
      requestAnimationFrame(tickScroll);
    };
    window.addEventListener('wheel', (e) => {
      e.preventDefault();
      target = Math.max(0, Math.min(target + e.deltaY, document.body.scrollHeight - window.innerHeight));
    }, { passive: false });
    tickScroll();
  }

});
