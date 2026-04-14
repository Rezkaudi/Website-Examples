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
   4. SCROLL-REVEAL — feature cards fade in
──────────────────────────────────────────── */
(function initScrollReveal() {
  const targets = document.querySelectorAll('[data-aos]');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger each card by 100ms
        const card = entry.target;
        const index = Array.from(targets).indexOf(card);
        setTimeout(() => card.classList.add('visible'), index * 100);
        observer.unobserve(card);
      }
    });
  }, { threshold: 0.15 });

  targets.forEach(el => observer.observe(el));
})();


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
