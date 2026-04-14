/* ═══════════════════════════════════════════
   QUICKBITE — FOOD DELIVERY LANDING PAGE
   script.js
═══════════════════════════════════════════ */

/* ──────────────────────────────────────────
   1. NAVBAR — scroll behaviour + hamburger
──────────────────────────────────────────── */
(function initNavbar() {
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');

  // Add scrolled class after the hero is passed
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  // Mobile menu toggle
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('open');
    navLinks.classList.toggle('open', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  // Close menu when a link is clicked
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('open');
      navLinks.classList.remove('open');
      document.body.style.overflow = '';
    });
  });
})();


/* ──────────────────────────────────────────
   2. SMOOTH SCROLL — native CSS handles it,
      but this polyfills older browsers
──────────────────────────────────────────── */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // navbar height
    const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});


/* ──────────────────────────────────────────
   3. ANIMATED COUNTERS
   Counts up when the hero stats scroll into view
──────────────────────────────────────────── */
(function initCounters() {
  const counters  = document.querySelectorAll('.counter');
  let started     = false;

  function easeOut(t) { return 1 - Math.pow(1 - t, 3); }

  function animateCounter(el) {
    const target   = +el.dataset.target;
    const duration = 2000; // ms
    const start    = performance.now();

    function step(now) {
      const elapsed  = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value    = Math.floor(easeOut(progress) * target);

      // Format with commas for large numbers
      el.textContent = value >= 1000
        ? value.toLocaleString()
        : value;

      if (progress < 1) requestAnimationFrame(step);
    }

    requestAnimationFrame(step);
  }

  // Trigger when stats section enters viewport
  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !started) {
      started = true;
      counters.forEach(animateCounter);
    }
  }, { threshold: 0.5 });

  const statsEl = document.querySelector('.hero-stats');
  if (statsEl) observer.observe(statsEl);
})();


/* ──────────────────────────────────────────
   4. SCROLL-REVEAL — handled by GSAP ScrollTrigger (see section 15)
──────────────────────────────────────────── */


/* ──────────────────────────────────────────
   5. MENU FILTER TABS
──────────────────────────────────────────── */
(function initMenuFilter() {
  const tabs     = document.querySelectorAll('.tab');
  const cards    = document.querySelectorAll('.menu-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      const filter = tab.dataset.filter;

      cards.forEach(card => {
        const match = filter === 'all' || card.dataset.category === filter;

        if (match) {
          card.classList.remove('hidden');
          // Re-trigger entrance animation
          card.style.animation = 'none';
          card.offsetHeight; // reflow
          card.style.animation = '';
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });
})();


/* ──────────────────────────────────────────
   6. QUICK-ADD BUTTON — cart toast feedback
──────────────────────────────────────────── */
(function initCartButtons() {
  const toast   = document.getElementById('cartToast');
  let toastTimer = null;

  document.querySelectorAll('.quick-add').forEach(btn => {
    btn.addEventListener('click', e => {
      e.stopPropagation();

      // Animate the button
      btn.style.transform = 'scale(0.85)';
      setTimeout(() => { btn.style.transform = ''; }, 200);

      // Show toast
      clearTimeout(toastTimer);
      toast.classList.add('show');
      toastTimer = setTimeout(() => toast.classList.remove('show'), 2500);
    });
  });
})();


/* ──────────────────────────────────────────
   7. TESTIMONIALS CAROUSEL
──────────────────────────────────────────── */
(function initTestimonials() {
  const track    = document.getElementById('testimonialsTrack');
  const dots     = document.querySelectorAll('.dot');
  const cards    = track.querySelectorAll('.testi-card');
  let current    = 0;
  let autoTimer  = null;

  // Determine visible count based on card width vs wrap width
  function getVisible() {
    const wrap = track.parentElement;
    const cardW = cards[0].offsetWidth + 28; // gap
    return Math.max(1, Math.round(wrap.offsetWidth / cardW));
  }

  function goTo(index) {
    const visible = getVisible();
    const max     = Math.max(0, cards.length - visible);
    current       = Math.min(Math.max(index, 0), max);

    const cardW   = cards[0].offsetWidth + 28;
    track.style.transform = `translateX(-${current * cardW}px)`;

    dots.forEach((d, i) => d.classList.toggle('active', i === current));
  }

  // Dot navigation
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      goTo(+dot.dataset.index);
      resetAuto();
    });
  });

  // Auto-advance every 4s
  function startAuto() {
    autoTimer = setInterval(() => {
      const visible = getVisible();
      const next    = (current + 1) > (cards.length - visible) ? 0 : current + 1;
      goTo(next);
    }, 4000);
  }
  function resetAuto() {
    clearInterval(autoTimer);
    startAuto();
  }

  // Touch / drag support
  let startX = 0;
  track.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = startX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? current + 1 : current - 1);
      resetAuto();
    }
  });

  // Recalculate on resize
  window.addEventListener('resize', () => goTo(current), { passive: true });

  startAuto();
})();


/* ──────────────────────────────────────────
   8. FEATURE CARD — 3D tilt on hover
──────────────────────────────────────────── */
(function initTilt() {
  document.querySelectorAll('.feature-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -8;  // max ±8 deg
      const rotateY = ((x - cx) / cx) *  8;

      card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ──────────────────────────────────────────
   9. MENU CARD — subtle tilt on hover
──────────────────────────────────────────── */
(function initMenuTilt() {
  document.querySelectorAll('.menu-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect    = card.getBoundingClientRect();
      const x       = e.clientX - rect.left;
      const y       = e.clientY - rect.top;
      const cx      = rect.width  / 2;
      const cy      = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -4;
      const rotateY = ((x - cx) / cx) *  4;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ──────────────────────────────────────────
   10. FLOATING ITEMS — parallax on mouse
──────────────────────────────────────────── */
(function initParallax() {
  const hero   = document.getElementById('hero');
  const floats = hero ? hero.querySelectorAll('.float-item') : [];

  if (!floats.length) return;

  hero.addEventListener('mousemove', e => {
    const rect = hero.getBoundingClientRect();
    const mx   = (e.clientX - rect.left) / rect.width  - 0.5; // -0.5 … 0.5
    const my   = (e.clientY - rect.top)  / rect.height - 0.5;

    floats.forEach((el, i) => {
      const depth  = (i + 1) * 12; // each item moves a bit more
      const tx     = mx * depth;
      const ty     = my * depth;
      // Apply on top of existing animation via CSS variable workaround
      el.style.setProperty('--px', `${tx}px`);
      el.style.setProperty('--py', `${ty}px`);
      el.style.transform = `translate(var(--px), var(--py))`;
    });
  });

  hero.addEventListener('mouseleave', () => {
    floats.forEach(el => { el.style.transform = ''; });
  });
})();


/* ──────────────────────────────────────────
   11. HOW IT WORKS — progressive step & SVG animations
──────────────────────────────────────────── */
(function initStepAnimations() {
  const section    = document.querySelector('.how-it-works');
  if (!section) return;

  const cards      = Array.from(section.querySelectorAll('.step-card'));
  const connectors = Array.from(section.querySelectorAll('.step-connector'));
  let   triggered  = false;

  /* Accurate dashoffset only for connector paths — icons are filled SVGs, not stroked */
  section.querySelectorAll('.connector-path, .connector-arrow').forEach(el => {
    try {
      const len = el.getTotalLength();
      el.style.strokeDasharray  = len;
      el.style.strokeDashoffset = len;
    } catch (_) { /* CSS fallback (300) already set */ }
  });

  /* Sequential reveal: card 1 → arrow 1 → card 2 → arrow 2 → card 3 */
  const sequence = [
    () => cards[0]?.classList.add('step-visible'),           //    0 ms
    () => connectors[0]?.classList.add('connector-visible'), //  600 ms
    () => cards[1]?.classList.add('step-visible'),           //  880 ms
    () => connectors[1]?.classList.add('connector-visible'), // 1500 ms
    () => cards[2]?.classList.add('step-visible'),           // 1780 ms
  ];
  const delays = [0, 600, 880, 1500, 1780];

  const observer = new IntersectionObserver(entries => {
    if (!entries[0].isIntersecting || triggered) return;
    triggered = true;
    sequence.forEach((fn, i) => setTimeout(fn, delays[i]));
  }, { threshold: 0.12 });

  observer.observe(section);
})();


/* ──────────────────────────────────────────
   12. NEWSLETTER FORM — subscribe feedback
──────────────────────────────────────────── */
function handleNewsletter(e) {
  e.preventDefault();
  const form  = e.target;
  const input = form.querySelector('input');
  const btn   = form.querySelector('button');
  const orig  = btn.textContent;

  btn.textContent = '✓ Subscribed!';
  btn.style.background = '#22c55e';
  input.value = '';

  setTimeout(() => {
    btn.textContent = orig;
    btn.style.background = '';
  }, 3000);

  return false;
}

/* ──────────────────────────────────────────
   12. HERO SEARCH — focus effect + Enter key
──────────────────────────────────────────── */
(function initHeroSearch() {
  const input = document.querySelector('.search-input');
  const btn   = document.querySelector('.search-btn');
  if (!input || !btn) return;

  input.addEventListener('keydown', e => {
    if (e.key === 'Enter') {
      e.preventDefault();
      btn.click();
    }
  });

  btn.addEventListener('click', () => {
    if (!input.value.trim()) return;
    const menuSection = document.getElementById('menu');
    if (menuSection) {
      const top = menuSection.getBoundingClientRect().top + window.pageYOffset - 80;
      window.scrollTo({ top, behavior: 'smooth' });
    }
    input.value = '';
  });
})();


/* ──────────────────────────────────────────
   14. ACTIVE NAV LINK — highlight on scroll
──────────────────────────────────────────── */
(function initActiveLinks() {
  const sections = document.querySelectorAll('section[id]');
  const links    = document.querySelectorAll('.nav-links a[href^="#"]');

  function update() {
    const scrollY = window.scrollY + 120;
    let active = '';

    sections.forEach(sec => {
      if (scrollY >= sec.offsetTop) active = sec.id;
    });

    links.forEach(a => {
      const href = a.getAttribute('href').slice(1);
      a.style.color = href === active ? 'var(--orange)' : '';
    });
  }

  window.addEventListener('scroll', update, { passive: true });
  update();
})();


/* ══════════════════════════════════════════════════════════════
   15. THREE.JS — HERO 3D SCENE
   Floating food models: burger, pizza, sushi, drink
   + orbiting torus rings + particle cloud + mouse parallax
══════════════════════════════════════════════════════════════ */
(function initHero3D() {
  /* Guard: Three.js must be loaded, canvas must exist, not mobile */
  if (typeof THREE === 'undefined') return;
  const canvas = document.getElementById('hero-canvas');
  const hero   = document.getElementById('hero');
  if (!canvas || !hero) return;
  if (window.innerWidth < 900) return; // skip on mobile (canvas display:none via CSS)

  const W = hero.clientWidth  || window.innerWidth;
  const H = hero.clientHeight || window.innerHeight;

  /* ── Renderer ── */
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: 'high-performance' });
  renderer.setSize(W, H);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  /* ── Scene & Camera ── */
  const scene  = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, W / H, 0.1, 100);
  camera.position.z = 7;

  /* ── Lighting ── */
  scene.add(new THREE.AmbientLight(0xffffff, 0.45));

  const dirLight = new THREE.DirectionalLight(0xfff4e0, 1.0);
  dirLight.position.set(5, 8, 5);
  scene.add(dirLight);

  const pl1 = new THREE.PointLight(0xff6b35, 4.5, 22); pl1.position.set(4, 2, 4);   scene.add(pl1);
  const pl2 = new THREE.PointLight(0x8b5cf6, 2.5, 18); pl2.position.set(-3, -2, 3); scene.add(pl2);
  const pl3 = new THREE.PointLight(0xf59e0b, 2.0, 14); pl3.position.set(1, -4, 2);  scene.add(pl3);

  /* ── Helper: standard material ── */
  const stdMat = color => new THREE.MeshStandardMaterial({ color, roughness: 0.75, metalness: 0.15 });

  /* ═══ BURGER ═══ */
  function makeBurger() {
    const g = new THREE.Group();

    const addCyl = (ry, h, color, py) => {
      const m = new THREE.Mesh(new THREE.CylinderGeometry(ry, ry, h, 40), stdMat(color));
      m.position.y = py; g.add(m);
    };

    // Buns, patty, cheese, lettuce, tomato
    addCyl(0.55, 0.24, 0xd4882a, 0);      // bottom bun
    addCyl(0.52, 0.13, 0x5c2800, 0.19);   // patty
    addCyl(0.56, 0.06, 0xf59e0b, 0.30);   // cheese
    addCyl(0.48, 0.06, 0x4caf50, 0.36);   // lettuce
    addCyl(0.50, 0.05, 0xef4444, 0.42);   // tomato

    // Top bun (dome)
    const top = new THREE.Mesh(
      new THREE.SphereGeometry(0.56, 40, 20, 0, Math.PI * 2, 0, Math.PI / 2),
      stdMat(0xd4882a)
    );
    top.position.y = 0.49;
    g.add(top);

    // Sesame seeds
    [[-0.18, 0.05], [0.0, 0.13], [0.18, 0.05]].forEach(([x, z]) => {
      const s = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), stdMat(0xfff8dc));
      s.position.set(x, 1.04, z);
      g.add(s);
    });

    return g;
  }

  /* ═══ PIZZA ═══ */
  function makePizza() {
    const g = new THREE.Group();

    // Crust ring
    const crust = new THREE.Mesh(new THREE.TorusGeometry(0.62, 0.1, 16, 64), stdMat(0xd4882a));
    crust.rotation.x = Math.PI / 2;
    g.add(crust);

    // Base disc layers
    const base   = new THREE.Mesh(new THREE.CylinderGeometry(0.62, 0.62, 0.08, 40), stdMat(0xe8c484));
    const sauce  = new THREE.Mesh(new THREE.CylinderGeometry(0.55, 0.55, 0.09, 40), stdMat(0xdc2626));
    const cheese = new THREE.Mesh(new THREE.CylinderGeometry(0.51, 0.51, 0.05, 40), stdMat(0xf7b731));
    sauce.position.y  = 0.01;
    cheese.position.y = 0.06;
    g.add(base); g.add(sauce); g.add(cheese);

    // Pepperoni
    [0, 1.26, 2.51, 3.77, 5.03].forEach(angle => {
      const r  = 0.28 + (angle % 2) * 0.1;
      const pp = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.09, 0.06, 16), stdMat(0xb91c1c));
      pp.position.set(Math.cos(angle) * r, 0.11, Math.sin(angle) * r);
      g.add(pp);
    });

    return g;
  }

  /* ═══ SUSHI ROLL ═══ */
  function makeSushi() {
    const g = new THREE.Group();
    const nori   = new THREE.Mesh(new THREE.CylinderGeometry(0.45, 0.45, 0.60, 32), stdMat(0x1a2e1a));
    const rice   = new THREE.Mesh(new THREE.CylinderGeometry(0.40, 0.40, 0.62, 32), stdMat(0xf5f0e8));
    const fill   = new THREE.Mesh(new THREE.CylinderGeometry(0.13, 0.13, 0.64, 16), stdMat(0xff8c69));
    g.add(nori); g.add(rice); g.add(fill);
    g.rotation.z = Math.PI / 2;
    return g;
  }

  /* ═══ DRINK CUP ═══ */
  function makeDrink() {
    const g = new THREE.Group();
    const cup = new THREE.Mesh(
      new THREE.CylinderGeometry(0.40, 0.30, 0.90, 32),
      new THREE.MeshStandardMaterial({ color: 0xff6b35, roughness: 0.35, metalness: 0.1, transparent: true, opacity: 0.88 })
    );
    const lid   = new THREE.Mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.07, 32), stdMat(0xff8c5a));
    lid.position.y = 0.49;

    const straw = new THREE.Mesh(new THREE.CylinderGeometry(0.028, 0.028, 1.2, 8), stdMat(0xffffff));
    straw.position.set(0.16, 0.85, 0);
    straw.rotation.z = 0.18;

    g.add(cup); g.add(lid); g.add(straw);
    return g;
  }

  /* ── Place food models ── */
  const foodGroup = new THREE.Group();
  foodGroup.position.x = 1.5; // offset right, away from text
  scene.add(foodGroup);

  const burger = makeBurger();
  burger.position.set(-1.4, 0.8, 0.4);
  burger.scale.setScalar(0.65);
  foodGroup.add(burger);

  const pizza = makePizza();
  pizza.position.set(1.2, 1.25, -0.3);
  pizza.rotation.y = 0.5;
  pizza.scale.setScalar(0.70);
  foodGroup.add(pizza);

  const sushi = makeSushi();
  sushi.position.set(1.4, -0.6, 0.4);
  sushi.scale.setScalar(0.65);
  foodGroup.add(sushi);

  const drink = makeDrink();
  drink.position.set(-1.2, -0.9, 0.3);
  drink.scale.setScalar(0.60);
  foodGroup.add(drink);

  /* ── Orbiting torus rings ── */
  const ringGroup = new THREE.Group();
  ringGroup.position.x = 1.5;
  scene.add(ringGroup);

  [
    { r: 3.0, tube: 0.022, color: 0xff6b35, emissive: 0.7, rx: 1.10, ry: 0.40, op: 0.45 },
    { r: 2.4, tube: 0.018, color: 0x8b5cf6, emissive: 0.6, rx: 0.40, ry: 1.20, op: 0.35 },
    { r: 2.0, tube: 0.015, color: 0xf59e0b, emissive: 0.5, rx: 0.80, ry: 1.80, op: 0.30 },
  ].forEach(({ r, tube, color, emissive, rx, ry, op }, i) => {
    const mat  = new THREE.MeshStandardMaterial({ color, emissive: color, emissiveIntensity: emissive, transparent: true, opacity: op });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(r, tube, 16, 120), mat);
    ring.rotation.x = rx;
    ring.rotation.y = ry;
    ring.userData.rsX = 0.003 + i * 0.001;
    ring.userData.rsY = 0.004 + i * 0.0015;
    ringGroup.add(ring);
  });

  /* ── Particle cloud ── */
  const N   = 500;
  const pos = new Float32Array(N * 3);
  const col = new Float32Array(N * 3);
  const pal = [[1.0,0.42,0.21],[0.97,0.62,0.04],[0.55,0.36,0.96],[1.0,0.55,0.35],[0.13,0.77,0.37]];

  for (let i = 0; i < N; i++) {
    pos[i*3]   = (Math.random() - 0.5) * 12;
    pos[i*3+1] = (Math.random() - 0.5) * 8;
    pos[i*3+2] = (Math.random() - 0.5) * 6;
    const c = pal[Math.floor(Math.random() * pal.length)];
    col[i*3] = c[0]; col[i*3+1] = c[1]; col[i*3+2] = c[2];
  }

  const pGeo = new THREE.BufferGeometry();
  pGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pGeo.setAttribute('color',    new THREE.BufferAttribute(col, 3));
  const pMat = new THREE.PointsMaterial({ size: 0.046, vertexColors: true, transparent: true, opacity: 0.65, sizeAttenuation: true });
  scene.add(new THREE.Points(pGeo, pMat));

  /* ── Mouse parallax ── */
  let mx = 0, my = 0, tx = 0, ty = 0;
  hero.addEventListener('mousemove', e => {
    const r = hero.getBoundingClientRect();
    mx = (e.clientX - r.left) / r.width  * 2 - 1;
    my = (e.clientY - r.top)  / r.height * -2 + 1;
  }, { passive: true });

  /* ── Per-object float data ── */
  const floatData = [
    { obj: burger, offset: 0.0, spd: 0.45, rx: 0.004, ry: 0.007 },
    { obj: pizza,  offset: 1.3, spd: 0.35, rx: 0.006, ry: 0.004 },
    { obj: sushi,  offset: 2.6, spd: 0.55, rx: 0.003, ry: 0.008 },
    { obj: drink,  offset: 3.9, spd: 0.40, rx: 0.005, ry: 0.006 },
  ];

  /* ── Animation loop ── */
  const clock = new THREE.Clock();
  let rafId;

  function animate() {
    rafId = requestAnimationFrame(animate);
    const t = clock.getElapsedTime();

    // Float + rotate each food model
    floatData.forEach(({ obj, offset, spd, rx, ry }) => {
      obj.position.y += Math.sin(t * spd + offset) * 0.003;
      obj.rotation.x += rx;
      obj.rotation.y += ry;
    });

    // Spin rings
    ringGroup.children.forEach(ring => {
      ring.rotation.x += ring.userData.rsX;
      ring.rotation.y += ring.userData.rsY;
    });

    // Slow particle drift
    pGeo.attributes.position.array.forEach((_, idx) => {
      if (idx % 3 === 1) pGeo.attributes.position.array[idx] += Math.sin(t + idx) * 0.0002;
    });
    pGeo.attributes.position.needsUpdate = true;

    // Smooth mouse parallax
    tx += (mx - tx) * 0.04;
    ty += (my - ty) * 0.04;
    foodGroup.rotation.y  = tx * 0.25;
    foodGroup.rotation.x  = ty * 0.12;
    ringGroup.rotation.y  = tx * 0.12;
    ringGroup.rotation.x  = ty * 0.06;

    // Pulsating point lights
    pl1.intensity = 4.5 + Math.sin(t * 1.2) * 0.7;
    pl2.intensity = 2.5 + Math.sin(t * 1.8 + 1.0) * 0.5;

    renderer.render(scene, camera);
  }
  animate();

  /* ── Responsive resize ── */
  window.addEventListener('resize', () => {
    if (window.innerWidth < 900) { cancelAnimationFrame(rafId); return; }
    const w = hero.clientWidth, h = hero.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  }, { passive: true });
})();


/* ══════════════════════════════════════════════════════════════
   16. GSAP — HERO ENTRANCE + SCROLL-TRIGGERED REVEALS
══════════════════════════════════════════════════════════════ */
(function initGSAP() {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  /* ── Hero entrance timeline ── */
  const tl = gsap.timeline({ delay: 0.2 });
  tl
    .from('.badge',            { y: -30, opacity: 0, duration: 0.65, ease: 'power3.out' })
    .from('.hero-text h1',     { y: 70,  opacity: 0, duration: 0.90, ease: 'power3.out' }, '-=0.35')
    .from('.hero-text p',      { y: 40,  opacity: 0, duration: 0.70, ease: 'power3.out' }, '-=0.55')
    .from('.hero-search',      { y: 28,  opacity: 0, duration: 0.60, ease: 'power3.out' }, '-=0.45')
    .from('.hero-actions > *', { y: 22,  opacity: 0, duration: 0.55, stagger: 0.1, ease: 'power3.out' }, '-=0.40')
    .from('.hero-stats .stat', { y: 18,  opacity: 0, duration: 0.50, stagger: 0.1, ease: 'power3.out' }, '-=0.35')
    .from('.hero-visual',      { x: 80,  opacity: 0, duration: 0.90, ease: 'power3.out' }, '-=0.80');

  /* ── Section headers (each child staggers in) ── */
  gsap.utils.toArray('.section-header').forEach(el => {
    gsap.from(el.children, {
      scrollTrigger: { trigger: el, start: 'top 86%' },
      y: 40, opacity: 0, duration: 0.70, stagger: 0.14, ease: 'power3.out',
    });
  });

  /* ── Feature cards ── */
  gsap.from('.feature-card', {
    scrollTrigger: { trigger: '.features-grid', start: 'top 76%' },
    y: 60, opacity: 0, duration: 0.70, stagger: 0.14, ease: 'power3.out', clearProps: 'all',
  });

  /* ── Filter tabs ── */
  gsap.from('.filter-tabs .tab', {
    scrollTrigger: { trigger: '.filter-tabs', start: 'top 86%' },
    y: 18, opacity: 0, duration: 0.40, stagger: 0.08, ease: 'power3.out',
  });

  /* ── Menu cards ── */
  gsap.from('.menu-card', {
    scrollTrigger: { trigger: '.menu-grid', start: 'top 82%' },
    y: 50, opacity: 0, scale: 0.95, duration: 0.60, stagger: 0.09, ease: 'power3.out', clearProps: 'all',
  });

  /* ── How-it-works promo strip ── */
  gsap.from('.how-promo', {
    scrollTrigger: { trigger: '.how-promo', start: 'top 88%' },
    y: 24, opacity: 0, duration: 0.55, ease: 'power3.out',
  });

  /* ── App section ── */
  gsap.from('.app-text > *', {
    scrollTrigger: { trigger: '.app-inner', start: 'top 76%' },
    x: -50, opacity: 0, duration: 0.70, stagger: 0.11, ease: 'power3.out',
  });
  gsap.from('.phone-wrap', {
    scrollTrigger: { trigger: '.app-inner', start: 'top 76%' },
    x: 80, opacity: 0, duration: 0.90, ease: 'power3.out',
  });

  /* ── Testimonial cards ── */
  gsap.from('.testi-card', {
    scrollTrigger: { trigger: '.testimonials-track-wrap', start: 'top 82%' },
    y: 40, opacity: 0, duration: 0.60, stagger: 0.12, ease: 'power3.out',
  });

  /* ── Footer columns ── */
  gsap.from('.footer-top > *', {
    scrollTrigger: { trigger: '.footer-top', start: 'top 92%' },
    y: 30, opacity: 0, duration: 0.60, stagger: 0.10, ease: 'power3.out',
  });

  /* ── Parallax: plate-wrapper floats up on scroll ── */
  gsap.to('.plate-wrapper', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.2 },
    y: -90,
    ease: 'none',
  });

  /* ── Brand ticker (GSAP infinite scroll) ── */
  const ticker = document.querySelector('.ticker-track');
  if (ticker) {
    gsap.to(ticker, { x: '-50%', duration: 28, ease: 'none', repeat: -1 });
  }
})();
