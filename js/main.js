/* ═══════════════════════════════════════════
   CWG INC — main.js
   Particle Canvas | Terminal Typer | CountUp
   Charts | Scroll Reveal | Ring | Bars
═══════════════════════════════════════════ */

/* ── 1. PARTICLE CANVAS ── */
(function particles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let W, H, pts = [];
  const N = 70;

  const resize = () => {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  };

  const mkPt = () => ({
    x:  Math.random() * W,
    y:  Math.random() * H,
    r:  Math.random() * 1.4 + 0.3,
    dx: (Math.random() - 0.5) * 0.35,
    dy: (Math.random() - 0.5) * 0.35,
    a:  Math.random() * 0.4 + 0.08,
    hue: Math.random() > 0.7 ? '120, 255, 170' : '0, 212, 255',
  });

  const draw = () => {
    ctx.clearRect(0, 0, W, H);

    // connections
    for (let i = 0; i < pts.length; i++) {
      for (let j = i + 1; j < pts.length; j++) {
        const dx = pts[i].x - pts[j].x;
        const dy = pts[i].y - pts[j].y;
        const d  = Math.sqrt(dx*dx + dy*dy);
        if (d < 140) {
          ctx.beginPath();
          ctx.moveTo(pts[i].x, pts[i].y);
          ctx.lineTo(pts[j].x, pts[j].y);
          ctx.strokeStyle = `rgba(0,200,255,${(1 - d/140) * 0.1})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }

    // dots
    pts.forEach(p => {
      p.x += p.dx; p.y += p.dy;
      if (p.x < 0 || p.x > W) p.dx *= -1;
      if (p.y < 0 || p.y > H) p.dy *= -1;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${p.hue},${p.a})`;
      ctx.fill();
    });

    requestAnimationFrame(draw);
  };

  resize();
  pts = Array.from({ length: N }, mkPt);
  draw();
  window.addEventListener('resize', resize);
})();

/* ── 2. TERMINAL TYPER ── */
(function terminalTyper() {
  const body = document.getElementById('terminalBody');
  if (!body) return;

  const lines = [
    { html: '<span class="tp-dim"># CWG Intelligence Engine v3.2.1</span>', delay: 0 },
    { html: '<span class="tp-dim">from</span> <span class="tp-cyan">cwg.engine</span> <span class="tp-dim">import</span> EnsemblePredictor', delay: 300 },
    { html: '', delay: 500 },
    { html: '<span class="tp-dim">model</span> = EnsemblePredictor(<span class="tp-orange">"v3.2"</span>, rounds=<span class="tp-cyan">1127</span>)', delay: 700 },
    { html: '<span class="tp-dim">model</span>.load_dataset(<span class="tp-orange">"dhlottery_full.db"</span>)', delay: 1000 },
    { html: '<span class="tp-green">✓ 1,127 rounds indexed. 6,762 entries loaded.</span>', delay: 1400 },
    { html: '', delay: 1600 },
    { html: '<span class="tp-dim">features</span> = model.extract_features(dims=<span class="tp-cyan">47</span>)', delay: 1800 },
    { html: '<span class="tp-dim">result</span>  = model.predict(round=<span class="tp-cyan">1128</span>)', delay: 2200 },
    { html: '', delay: 2600 },
    { html: '<span class="tp-dim">───── OUTPUT ─────────────────────</span>', delay: 2800 },
    { html: '<span class="tp-dim">pick</span>      = <span class="tp-white">[07, 14, 21, 33, 38, 42]</span>', delay: 3000 },
    { html: '<span class="tp-dim">confidence</span> = <span class="tp-green">0.784</span>  <span class="tp-comment">████████░░ 78.4%</span>', delay: 3300 },
    { html: '<span class="tp-dim">p_value</span>   = <span class="tp-green">&lt; 0.001</span> <span class="tp-comment"># statistically significant</span>', delay: 3600 },
    { html: '<span class="tp-dim">zone_dist</span> = <span class="tp-cyan">[1, 1, 1, 2, 1]</span>  <span class="tp-comment"># optimal spread</span>', delay: 3900 },
    { html: '<span class="tp-green">✓ Pick validated. Ready for round #1128.</span>', delay: 4300 },
    { html: '<span class="tp-cursor"><span class="cursor-blink"> </span></span>', delay: 4600 },
  ];

  lines.forEach(({ html, delay }) => {
    setTimeout(() => {
      const line = document.createElement('span');
      line.className = 'tp-line';
      line.innerHTML = html || '&nbsp;';
      line.style.animationDelay = '0s';
      body.appendChild(line);
      body.scrollTop = body.scrollHeight;
    }, delay + 500);
  });
})();

/* ── 3. SCROLL REVEAL ── */
const revealIO = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      e.target.style.transitionDelay = `${i * 0.06}s`;
      e.target.classList.add('visible');
      revealIO.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(el => revealIO.observe(el));

/* ── 4. COUNTUP ── */
function easeOut(t) { return 1 - Math.pow(1 - t, 4); }

function countUp(el) {
  const raw    = parseInt(el.dataset.target, 10);
  const isPct  = !!el.dataset.pct;
  const dur    = 1800;
  const t0     = performance.now();
  const inner  = el.querySelector('em');
  const suffix = inner ? inner.outerHTML : '';

  function tick(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = easeOut(p);

    if (isPct) {
      el.innerHTML = (e * 78.4).toFixed(1) + '<em>%</em>';
    } else if (raw >= 10000) {
      el.innerHTML = Math.floor(e * raw).toLocaleString() + suffix;
    } else {
      el.innerHTML = Math.floor(e * raw) + suffix;
    }

    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const countIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { countUp(e.target); countIO.unobserve(e.target); }
  });
}, { threshold: 0.5 });
document.querySelectorAll('.stt-num[data-target]').forEach(el => countIO.observe(el));

/* ── 5. RING ANIMATION ── */
const ringIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      const ring = document.getElementById('ringProgress');
      if (ring) {
        const total = 251.3;
        const pct   = 78 / 100;
        ring.style.strokeDashoffset = total * (1 - pct);
      }
      ringIO.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
const ringWrap = document.querySelector('.ring-wrap');
if (ringWrap) ringIO.observe(ringWrap);

/* ── 6. PERFORMANCE BARS ── */
const barIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.querySelectorAll('.pm-fill, .zg-bar').forEach(bar => {
        const w = getComputedStyle(bar).getPropertyValue('--w') || bar.style.getPropertyValue('--w');
        bar.style.width = '0';
        requestAnimationFrame(() => {
          setTimeout(() => { bar.style.width = w.trim(); }, 80);
        });
      });
      barIO.unobserve(e.target);
    }
  });
}, { threshold: 0.2 });
document.querySelectorAll('.perf-card, .fb-card').forEach(el => barIO.observe(el));

/* ── 7. CONF BAR ── */
document.querySelectorAll('.conf-fill').forEach(el => {
  el.style.width = '0';
  setTimeout(() => { el.style.width = el.style.getPropertyValue('--w') || '78.4%'; }, 1200);
});

/* ── 8. CHART.JS — FREQUENCY ── */
let chartsBuilt = false;

function buildCharts() {
  if (chartsBuilt || typeof Chart === 'undefined') return;
  chartsBuilt = true;

  /* Chart defaults */
  Chart.defaults.color = '#4A5568';
  Chart.defaults.font.family = "'JetBrains Mono', monospace";
  Chart.defaults.font.size = 10;

  const freq = [
    150,155,148,162,171,158,176,145,153,167,
    164,143,158,175,161,149,168,154,172,159,
    163,147,156,170,165,151,174,160,148,166,
    173,152,157,169,161,144,163,155,171,158,
    166,149,154,160,139
  ];
  const labels = Array.from({ length: 45 }, (_, i) => i + 1);
  const avg = freq.reduce((a, b) => a + b, 0) / freq.length;

  /* Frequency Chart */
  const fCanvas = document.getElementById('frequencyChart');
  if (fCanvas) {
    new Chart(fCanvas, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          data: freq,
          backgroundColor: freq.map(v =>
            v >= avg + 8  ? 'rgba(0,255,136,0.75)' :
            v <= avg - 8  ? 'rgba(168,85,247,0.65)' :
                            'rgba(0,180,220,0.6)'
          ),
          borderRadius: 3,
          borderSkipped: false,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0d1527',
            borderColor: 'rgba(0,212,255,0.25)',
            borderWidth: 1,
            titleColor: '#00D4FF',
            bodyColor: '#8A97B0',
            callbacks: {
              title: c => `Number ${c[0].label}`,
              label: c => `Appearances: ${c.raw}`
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' }, ticks: { font: { size: 9 } } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' }, min: 125,
               ticks: { callback: v => v } }
        }
      }
    });
  }

  /* Sum Trend Chart */
  const tCanvas = document.getElementById('trendChart');
  if (tCanvas) {
    const ctx = tCanvas.getContext('2d');
    const grad = ctx.createLinearGradient(0, 0, 0, 200);
    grad.addColorStop(0, 'rgba(0,255,136,0.25)');
    grad.addColorStop(1, 'rgba(0,255,136,0.0)');

    new Chart(tCanvas, {
      type: 'line',
      data: {
        labels: [1118,1119,1120,1121,1122,1123,1124,1125,1126,1127],
        datasets: [{
          data: [132,119,145,158,127,141,136,152,124,139],
          borderColor: '#00FF88',
          backgroundColor: grad,
          borderWidth: 2,
          pointBackgroundColor: '#00FF88',
          pointBorderColor: '#02040a',
          pointBorderWidth: 2,
          pointRadius: 4,
          fill: true, tension: 0.4,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0d1527',
            borderColor: 'rgba(0,255,136,0.25)',
            borderWidth: 1,
            titleColor: '#00FF88',
            bodyColor: '#8A97B0',
            callbacks: {
              title: c => `Round #${c[0].label}`,
              label: c => `Sum: ${c.raw}`
            }
          }
        },
        scales: {
          x: { grid: { color: 'rgba(255,255,255,0.04)' } },
          y: { grid: { color: 'rgba(255,255,255,0.04)' } }
        }
      }
    });
  }

  /* Odd/Even Chart */
  const oeCanvas = document.getElementById('oeChart');
  if (oeCanvas) {
    new Chart(oeCanvas, {
      type: 'doughnut',
      data: {
        labels: ['3odd/3even', '4odd/2even', '2odd/4even', '5odd/1even', '1odd/5even', 'Other'],
        datasets: [{
          data: [31.2, 22.6, 20.8, 12.4, 8.9, 4.1],
          backgroundColor: [
            'rgba(0,212,255,0.8)',
            'rgba(0,255,136,0.7)',
            'rgba(168,85,247,0.7)',
            'rgba(249,115,22,0.7)',
            'rgba(251,191,36,0.6)',
            'rgba(74,85,104,0.5)',
          ],
          borderWidth: 0,
          hoverOffset: 6,
        }]
      },
      options: {
        responsive: true, maintainAspectRatio: false,
        cutout: '64%',
        plugins: {
          legend: {
            position: 'right',
            labels: { color: '#8A97B0', font: { size: 10 }, boxWidth: 10, padding: 10 }
          },
          tooltip: {
            backgroundColor: '#0d1527',
            borderColor: 'rgba(0,212,255,0.2)',
            borderWidth: 1,
            titleColor: '#00D4FF',
            bodyColor: '#8A97B0',
            callbacks: { label: c => ` ${c.label}: ${c.raw}%` }
          }
        }
      }
    });
  }
}

/* Heatmap */
function buildHeatmap() {
  const grid = document.getElementById('heatmap');
  if (!grid) return;

  const freq = [
    150,155,148,162,171,158,176,145,153,167,
    164,143,158,175,161,149,168,154,172,159,
    163,147,156,170,165,151,174,160,148,166,
    173,152,157,169,161,144,163,155,171,158,
    166,149,154,160,139
  ];
  const mn = Math.min(...freq), mx = Math.max(...freq);

  freq.forEach((f, i) => {
    const n = (f - mn) / (mx - mn);
    const cell = document.createElement('div');
    cell.className = 'hm-cell';
    cell.textContent = String(i + 1).padStart(2, '0');
    cell.title = `#${i+1}: ${f} draws`;

    // Interpolate from dim navy → cyan
    const r = Math.round(0   + n * 0);
    const g = Math.round(80  + n * 170);
    const b = Math.round(140 + n * 110);
    const a = 0.18 + n * 0.72;
    cell.style.background = `rgba(${r},${g},${b},${a})`;
    if (n > 0.75) cell.style.boxShadow = `0 0 8px rgba(0,255,136,${n * 0.4})`;

    grid.appendChild(cell);
  });
}

const chartIO = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) { buildCharts(); buildHeatmap(); chartIO.disconnect(); }
  });
}, { threshold: 0.05 });
const dataSection = document.getElementById('data');
if (dataSection) chartIO.observe(dataSection);

/* ── 9. SMOOTH ANCHOR ── */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const id = a.getAttribute('href');
    if (id === '#') return;
    const target = document.querySelector(id);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});
