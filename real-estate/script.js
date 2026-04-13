/* ============================================================
   LUXESTATE — MAIN SCRIPT  (v2 — fixed)
   ============================================================
   Bug Fixes Applied:
   - [FIX-1]  Hero parallax: rAF-debounced, no layout thrash
   - [FIX-2]  CTA parallax: same rAF pattern
   - [FIX-3]  initSvgAnimations: rect perimeter calculated manually;
               no reliance on getTotalLength() for <rect> element
   - [FIX-4]  Testimonials goToSlide: 100% width per card, no fragile
               pixel-offset calculation
   - [FIX-5]  initStatBarsObserver: double-rAF so CSS transition fires
   - [FIX-6]  initScrollReveal: data-attribute guard instead of complex
               :not(.hero-content .reveal-up) selector
   - [FIX-7]  revealHeroContent: marks hero elements with data attr first
   - [FIX-8]  Removed unused `svg` helper that shadowed global SVG ctor
   ============================================================ */

'use strict';


/* ============================================================
   0. UTILITIES
   ============================================================ */

/** HTML-escape a value before injecting into innerHTML to prevent XSS. */
function esc(val) {
  return String(val)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}


/* ============================================================
   1. DATA
   ============================================================ */

const PROPERTIES = [
  {
    id: 1,
    title: 'Azure Sky Penthouse',
    location: 'Upper East Side, New York',
    price: '$14,500,000',
    beds: 5, baths: 6, sqft: '8,200',
    type: 'penthouse',
    badge: 'Featured', badgeClass: '',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80',
    agent: 'SM', agentName: 'Sarah M.',
  },
  {
    id: 2,
    title: 'The Hillcrest Manor',
    location: 'Beverly Hills, California',
    price: '$22,000,000',
    beds: 8, baths: 9, sqft: '12,500',
    type: 'estate',
    badge: 'Exclusive', badgeClass: 'badge-ultra',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=700&q=80',
    agent: 'JR', agentName: 'James R.',
  },
  {
    id: 3,
    title: 'Riviera Villa Blanc',
    location: 'French Riviera, Monaco',
    price: '$18,750,000',
    beds: 6, baths: 7, sqft: '9,800',
    type: 'villa',
    badge: 'New', badgeClass: 'badge-new',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80',
    agent: 'CF', agentName: 'Claire F.',
  },
  {
    id: 4,
    title: 'The Marina Residence',
    location: 'Dubai Marina, UAE',
    price: '$8,200,000',
    beds: 4, baths: 5, sqft: '6,100',
    type: 'apartment',
    badge: 'Hot Deal', badgeClass: 'badge-hot',
    img: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=700&q=80',
    agent: 'AK', agentName: 'Amir K.',
  },
  {
    id: 5,
    title: 'Grand Palais Tower',
    location: 'Champs-Élysées, Paris',
    price: '$11,300,000',
    beds: 4, baths: 4, sqft: '5,400',
    type: 'penthouse',
    badge: 'Premium', badgeClass: 'badge-premium',
    img: 'https://images.unsplash.com/photo-1565183997392-2f6f122e5912?auto=format&fit=crop&w=700&q=80',
    agent: 'IM', agentName: 'Isabelle M.',
  },
  {
    id: 6,
    title: 'Coastal Cliff Estate',
    location: 'Malibu, California',
    price: '$31,000,000',
    beds: 7, baths: 8, sqft: '15,200',
    type: 'estate',
    badge: 'Ultra Luxury', badgeClass: 'badge-ultra',
    img: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=700&q=80',
    agent: 'WB', agentName: 'William B.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Alexandra Chen',
    role: 'CEO, TechVentures Capital',
    text: 'LuxEstate transformed our property search into an extraordinary experience. Their knowledge of the luxury market is absolutely unmatched — we found our dream home in just three weeks.',
    initials: 'AC', rating: 5, location: 'Purchased in Manhattan',
  },
  {
    name: 'Marcus Rothschild',
    role: 'Private Equity Partner',
    text: 'The attention to detail and personalized service exceeded every expectation. Their off-market access is truly remarkable — they showed us properties we never knew existed.',
    initials: 'MR', rating: 5, location: 'Portfolio in Monaco',
  },
  {
    name: 'Isabella Fontaine',
    role: 'Luxury Fashion Designer',
    text: 'Extraordinary properties paired with exceptional service. LuxEstate made finding our Malibu estate feel effortless and genuinely enjoyable from start to finish.',
    initials: 'IF', rating: 5, location: 'Purchased in Malibu',
  },
  {
    name: 'James Wellington',
    role: 'Hedge Fund Manager',
    text: 'Their global network opened doors we never knew existed. Investment returns on our Dubai portfolio have been exceptional — 28% appreciation in 18 months.',
    initials: 'JW', rating: 5, location: 'Investment Portfolio, Dubai',
  },
  {
    name: 'Priya Kapoor',
    role: 'Tech Founder & Philanthropist',
    text: 'From the first consultation to the final handover, every step felt curated just for us. LuxEstate doesn\'t just sell properties — they craft life experiences.',
    initials: 'PK', rating: 5, location: 'Purchased in Beverly Hills',
  },
];


/* ============================================================
   2. NAVBAR
   ============================================================ */

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}

function toggleMobileMenu() {
  const isOpen = !mobileMenu.classList.contains('open');
  if (isOpen) {
    mobileMenu.classList.add('open');
    mobileMenu.setAttribute('aria-hidden', 'false');
    hamburger.classList.add('open');
    document.body.style.overflow = 'hidden';
  } else {
    closeMobileMenu();
  }
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
hamburger.addEventListener('click', toggleMobileMenu);

const mmCloseBtn = document.getElementById('mmCloseBtn');
if (mmCloseBtn) mmCloseBtn.addEventListener('click', closeMobileMenu);

document.querySelectorAll('.mm-link').forEach(l => l.addEventListener('click', closeMobileMenu));

/* Close on Escape key */
document.addEventListener('keydown', e => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('open')) closeMobileMenu();
});


/* ============================================================
   NAV PATH ANIMATION — SVG route line between menu items
   ============================================================ */
function initNavPathAnimation() {
  const wrap = document.getElementById('navPathWrap');
  const navLinks = document.getElementById('navLinks');
  if (!wrap || !navLinks) return;

  /* Only on desktop */
  if (window.innerWidth <= 1024) return;

  /* ── Build SVG ────────────────────────────────────────────── */
  const NS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(NS, 'svg');
  svg.setAttribute('class', 'nav-path-svg');
  svg.setAttribute('aria-hidden', 'true');
  svg.setAttribute('overflow', 'visible');

  /* Glow filter */
  const defs   = document.createElementNS(NS, 'defs');
  const filter = document.createElementNS(NS, 'filter');
  filter.id = 'navGlow';
  filter.setAttribute('x', '-50%'); filter.setAttribute('y', '-200%');
  filter.setAttribute('width', '200%'); filter.setAttribute('height', '500%');
  const blur = document.createElementNS(NS, 'feGaussianBlur');
  blur.setAttribute('in', 'SourceGraphic'); blur.setAttribute('stdDeviation', '2.5');
  filter.appendChild(blur);
  defs.appendChild(filter);
  svg.appendChild(defs);

  /* Glow copy of the path */
  const pathGlow = document.createElementNS(NS, 'path');
  pathGlow.setAttribute('fill', 'none');
  pathGlow.setAttribute('stroke', 'rgba(200,169,126,0.4)');
  pathGlow.setAttribute('stroke-width', '4');
  pathGlow.setAttribute('stroke-linecap', 'round');
  pathGlow.setAttribute('filter', 'url(#navGlow)');
  svg.appendChild(pathGlow);

  /* Main route path */
  const pathEl = document.createElementNS(NS, 'path');
  pathEl.setAttribute('fill', 'none');
  pathEl.setAttribute('stroke', 'rgba(200,169,126,0.9)');
  pathEl.setAttribute('stroke-width', '1.5');
  pathEl.setAttribute('stroke-linecap', 'round');
  svg.appendChild(pathEl);

  /* Origin dot (faint) */
  const dotOrigin = document.createElementNS(NS, 'circle');
  dotOrigin.setAttribute('r', '2');
  dotOrigin.setAttribute('fill', 'rgba(200,169,126,0.4)');
  svg.appendChild(dotOrigin);

  /* Destination dot (bright) */
  const dotDest = document.createElementNS(NS, 'circle');
  dotDest.setAttribute('r', '3');
  dotDest.setAttribute('fill', 'var(--gold)');
  dotDest.setAttribute('filter', 'url(#navGlow)');
  svg.appendChild(dotDest);

  wrap.appendChild(svg);

  /* ── State ───────────────────────────────────────────────── */
  let currentX = null;
  let fadeTimer = null;
  const Y = 10; /* y coordinate in the 20px-tall SVG */

  /* ── Helpers ─────────────────────────────────────────────── */
  function syncSize() {
    const w = wrap.getBoundingClientRect().width;
    svg.setAttribute('viewBox', `0 0 ${w} 20`);
    svg.setAttribute('width', w);
    svg.setAttribute('height', '20');
  }

  function linkCenterX(link) {
    const wRect = wrap.getBoundingClientRect();
    const lRect = link.getBoundingClientRect();
    return lRect.left + lRect.width / 2 - wRect.left;
  }

  function buildPath(x1, x2) {
    const dx   = x2 - x1;
    const cy1  = dx > 0 ? Y - Math.abs(dx) * 0.12 : Y + Math.abs(dx) * 0.12;
    const cy2  = dx > 0 ? Y + Math.abs(dx) * 0.12 : Y - Math.abs(dx) * 0.12;
    return `M ${x1},${Y} C ${x1 + dx * 0.4},${cy1} ${x1 + dx * 0.6},${cy2} ${x2},${Y}`;
  }

  function animateTo(toX) {
    clearTimeout(fadeTimer);
    syncSize();

    if (currentX === null) {
      /* First appearance — just place the dot */
      const d = `M ${toX},${Y}`;
      [pathEl, pathGlow].forEach(p => {
        p.setAttribute('d', d);
        p.removeAttribute('stroke-dasharray');
        p.removeAttribute('stroke-dashoffset');
        p.style.transition = 'none';
        p.style.opacity = '0';
      });
      dotDest.setAttribute('cx', toX); dotDest.setAttribute('cy', Y);
      dotOrigin.setAttribute('cx', toX); dotOrigin.setAttribute('cy', Y);
      dotDest.style.opacity = '1';
      dotOrigin.style.opacity = '0';
      currentX = toX;
      return;
    }

    if (Math.abs(currentX - toX) < 4) return;

    const d = buildPath(currentX, toX);

    [pathEl, pathGlow].forEach(p => {
      p.setAttribute('d', d);
      p.style.opacity = '1';
    });

    const len = pathEl.getTotalLength();

    [pathEl, pathGlow].forEach(p => {
      p.setAttribute('stroke-dasharray', len);
      p.setAttribute('stroke-dashoffset', len);
      /* Force reflow so transition picks up */
      p.getBoundingClientRect();
      p.style.transition = 'stroke-dashoffset 0.55s cubic-bezier(0.4,0,0.2,1)';
      p.setAttribute('stroke-dashoffset', '0');
    });

    dotOrigin.setAttribute('cx', currentX); dotOrigin.setAttribute('cy', Y);
    dotOrigin.style.opacity = '0.5';

    dotDest.setAttribute('cx', toX); dotDest.setAttribute('cy', Y);
    dotDest.style.opacity = '1';

    currentX = toX;
  }

  function fadeOut() {
    const fade = (el) => { el.style.transition = 'opacity 0.4s ease'; el.style.opacity = '0'; };
    [pathEl, pathGlow, dotDest, dotOrigin].forEach(fade);
    currentX = null;
  }

  /* ── Events ──────────────────────────────────────────────── */
  navLinks.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('mouseenter', () => {
      [pathEl, pathGlow, dotDest, dotOrigin].forEach(el => {
        el.style.transition = '';
        el.style.opacity    = '1';
      });
      animateTo(linkCenterX(link));
    });
  });

  navLinks.addEventListener('mouseleave', () => {
    fadeTimer = setTimeout(fadeOut, 120);
  });

  navLinks.addEventListener('mouseenter', () => clearTimeout(fadeTimer));

  window.addEventListener('resize', () => {
    if (window.innerWidth <= 1024) { svg.style.display = 'none'; return; }
    svg.style.display = '';
    syncSize();
    currentX = null;
  });

  syncSize();
}


/* ============================================================
   3. HERO PARALLAX  [FIX-1]
   Uses requestAnimationFrame to debounce scroll events,
   preventing layout thrash and jitter.
   ============================================================ */

const heroBg = document.getElementById('heroBg');
let heroTicking = false;

function handleHeroParallax() {
  if (heroTicking) return;
  heroTicking = true;
  requestAnimationFrame(() => {
    const scrollY = window.scrollY;
    if (heroBg && scrollY < window.innerHeight * 1.5) {
      heroBg.style.transform = `translateY(${scrollY * 0.3}px)`;
    }
    heroTicking = false;
  });
}

window.addEventListener('scroll', handleHeroParallax, { passive: true });

/**
 * [FIX-6/FIX-7] Mark hero reveal elements with data-hero-reveal BEFORE
 * the scroll observer runs, so the observer can simply skip them using
 * a data attribute check instead of a complex CSS :not() selector.
 */
function revealHeroContent() {
  // Tag all hero elements so the scroll observer can skip them
  document.querySelectorAll(
    '.hero-content .reveal-up, #heroSearch.reveal-up'
  ).forEach(el => {
    el.dataset.heroReveal = 'true';
  });

  // Staggered entrance for hero text + search bar
  const items = document.querySelectorAll('[data-hero-reveal]');
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add('revealed'), 300 + i * 160);
  });

  // Floating cards fade in after a short delay
  setTimeout(() => {
    document.querySelectorAll('.floating-card').forEach(card => {
      card.style.opacity = '1';
    });
  }, 1100);
}

// Start floating cards invisible (JS-driven entrance)
document.querySelectorAll('.floating-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transition = 'opacity 0.9s ease';
});


/* ============================================================
   4. PROPERTIES — RENDER & FILTER
   ============================================================ */

const propertiesGrid = document.getElementById('propertiesGrid');
let favorites = new Set();

/** Build a single property card HTML string */
function createPropertyCard(prop) {
  const isFav = favorites.has(prop.id);
  const favFill = isFav ? '#ef5350' : 'none';
  const favStroke = isFav ? '#ef5350' : 'currentColor';

  const typeLabel = esc(prop.type.charAt(0).toUpperCase() + prop.type.slice(1));

  /* i18n helper — safe fallback if i18n.js not loaded yet */
  const tr = (key) => (typeof TRANSLATIONS !== 'undefined' && window.currentLang)
    ? (TRANSLATIONS[window.currentLang]?.[key] ?? TRANSLATIONS.en[key] ?? key)
    : key;
  return `
    <article class="prop-card card-enter" data-type="${esc(prop.type)}" data-id="${esc(prop.id)}">

      <div class="prop-img-wrap">
        <img src="${esc(prop.img)}" alt="${esc(prop.title)}" loading="lazy" />
        <span class="prop-badge ${esc(prop.badgeClass)}">${esc(prop.badge)}</span>
        <button class="prop-fav${isFav ? ' active' : ''}" data-id="${esc(prop.id)}" aria-label="Favourite">
          <svg width="16" height="16" viewBox="0 0 24 24"
               fill="${favFill}" stroke="${favStroke}" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06
                     a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78
                     1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <div class="prop-type-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          ${typeLabel}
        </div>
      </div>

      <div class="prop-body">
        <div class="prop-price">
          ${esc(prop.price)}
          <span class="prop-price-sub">${tr('card.marketVal')}</span>
        </div>
        <h3 class="prop-title">${esc(prop.title)}</h3>
        <div class="prop-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${esc(prop.location)}
        </div>
        <div class="prop-divider"></div>
        <div class="prop-specs">
          <div class="prop-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
              <path d="M2 4v16M22 4v16M2 8h20M2 16h20M6 8v8M10 8v8M14 8v8M18 8v8"/>
            </svg>
            ${esc(prop.beds)} ${tr('card.beds')}
          </div>
          <div class="prop-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
              <path d="M4 12h16M4 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>
            </svg>
            ${esc(prop.baths)} ${tr('card.baths')}
          </div>
          <div class="prop-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            ${esc(prop.sqft)} ${tr('card.sqft')}
          </div>
        </div>
      </div>

      <div class="prop-footer">
        <a href="#contact" class="prop-view-btn">
          ${tr('card.viewDetails')}
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
        <div class="prop-agent" title="${esc(prop.agentName)}">
          <div class="agent-avatar">${esc(prop.agent)}</div>
        </div>
      </div>
    </article>
  `;
}

/** Render all or filtered properties into the grid */
function renderProperties(filter = 'all') {
  const list = filter === 'all'
    ? PROPERTIES
    : PROPERTIES.filter(p => p.type === filter);

  propertiesGrid.innerHTML = list.map(p => createPropertyCard(p)).join('');

  // Stagger entrance animation
  propertiesGrid.querySelectorAll('.prop-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.07}s`;
  });

  // Bind favourite buttons
  propertiesGrid.querySelectorAll('.prop-fav').forEach(btn =>
    btn.addEventListener('click', toggleFavourite)
  );
}

/** Heart button toggle */
function toggleFavourite(e) {
  e.preventDefault();
  e.stopPropagation();

  const btn = e.currentTarget;
  const id = parseInt(btn.dataset.id);
  const wasFav = favorites.has(id);

  wasFav ? favorites.delete(id) : favorites.add(id);

  const nowFav = !wasFav;
  const svgEl = btn.querySelector('svg');
  btn.classList.toggle('active', nowFav);
  svgEl.setAttribute('fill', nowFav ? '#ef5350' : 'none');
  svgEl.setAttribute('stroke', nowFav ? '#ef5350' : 'currentColor');

  // Pop micro-interaction
  btn.style.transform = 'scale(1.4)';
  setTimeout(() => { btn.style.transform = ''; }, 220);
}

/** Filter tab click handling */
function initPropertyFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      renderProperties(this.dataset.filter);
    });
  });
}


/* ============================================================
   5. STATS — ANIMATED COUNTERS
   ============================================================ */

let statsAnimated = false;

/**
 * Animate a numeric counter from 0 → target using ease-out cubic.
 * Supports integers and fixed-decimal floats (data-decimal attribute).
 */
function animateCounter(el) {
  const target = parseFloat(el.dataset.target);
  const decimals = el.dataset.decimal ? parseInt(el.dataset.decimal) : 0;
  const duration = 2000;
  const start = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);   // ease-out cubic
    const val = target * eased;

    el.textContent = decimals
      ? val.toFixed(decimals)
      : Math.round(val).toLocaleString();

    if (progress < 1) {
      requestAnimationFrame(tick);
    } else {
      // Final value (exact)
      el.textContent = decimals
        ? target.toFixed(decimals)
        : target.toLocaleString();
    }
  }

  requestAnimationFrame(tick);
}

function initStatsObserver() {
  const section = document.getElementById('stats');
  if (!section) return;

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
    }
  }, { threshold: 0.3 }).observe(section);
}

/* initStatBarsObserver removed — stat bars replaced by circular SVG rings;
   no .stat-bar-fill elements exist in the DOM. */


/* ============================================================
   6. TESTIMONIALS — SINGLE-CARD SLIDER  [FIX-4]
   Each card is flex: 0 0 100% of the wrapper.
   goToSlide shifts the track by N × 100% — no pixel arithmetic.
   ============================================================ */

const track = document.getElementById('testimonialsTrack');
const dotsWrap = document.getElementById('tNavDots');
const prevBtn = document.getElementById('tPrev');
const nextBtn = document.getElementById('tNext');

let currentSlide = 0;
let autoPlayTimer = null;
const AUTOPLAY_MS = 5500;

/** Build star rating HTML */
function buildStars(n) {
  const star = `<svg width="14" height="14" viewBox="0 0 24 24"
    fill="var(--gold)" stroke="none">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02
                     12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
  </svg>`;
  return Array(n).fill(star).join('');
}

/** Render a single testimonial card */
function createTestiCard(t, i) {
  return `
    <div class="testi-card${i === 0 ? ' active' : ''}" data-index="${i}">
      <div class="testi-stars">${buildStars(t.rating)}</div>
      <p class="testi-text">&ldquo;${esc(t.text)}&rdquo;</p>
      <div class="testi-author">
        <div class="testi-avatar">${esc(t.initials)}</div>
        <div>
          <div class="testi-name">${esc(t.name)}</div>
          <div class="testi-role">${esc(t.role)}</div>
          <div class="testi-location">
            <svg width="10" height="10" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${esc(t.location)}
          </div>
        </div>
      </div>
    </div>
  `;
}

/** Render dot navigation */
function buildDots() {
  dotsWrap.innerHTML = TESTIMONIALS
    .map((_, i) => `<button class="tNav-dot${i === 0 ? ' active' : ''}"
      data-dot="${i}" aria-label="Slide ${i + 1}"></button>`)
    .join('');

  dotsWrap.querySelectorAll('.tNav-dot').forEach(d =>
    d.addEventListener('click', () => { goToSlide(parseInt(d.dataset.dot)); resetAutoPlay(); })
  );
}

/**
 * [FIX-4] Slide to index using 100%-width transform.
 * currentSlide * 100% is the exact pixel offset because each card
 * is `flex: 0 0 100%` of the overflow-hidden wrapper.
 */
function goToSlide(index) {
  const total = TESTIMONIALS.length;
  currentSlide = (index + total) % total;

  // Shift track
  track.style.transform = `translateX(-${currentSlide * 100}%)`;

  // Sync active classes
  track.querySelectorAll('.testi-card').forEach((c, i) =>
    c.classList.toggle('active', i === currentSlide)
  );
  dotsWrap.querySelectorAll('.tNav-dot').forEach((d, i) =>
    d.classList.toggle('active', i === currentSlide)
  );
}

function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer = setInterval(() => goToSlide(currentSlide + 1), AUTOPLAY_MS);
}
function stopAutoPlay() { if (autoPlayTimer) clearInterval(autoPlayTimer); }
function resetAutoPlay() { stopAutoPlay(); startAutoPlay(); }

function initTestimonials() {
  if (!track) return;

  track.innerHTML = TESTIMONIALS.map(createTestiCard).join('');
  buildDots();

  // Set initial position INSTANTLY (no transition flash)
  track.style.transition = 'none';
  track.style.transform = 'translateX(0)';

  // Re-enable transition after first paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
    });
  });

  // Controls
  prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });
  nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });

  // Touch / swipe
  let touchStartX = 0;
  track.addEventListener('touchstart', e => {
    touchStartX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener('touchend', e => {
    const dx = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(dx) > 45) {
      goToSlide(dx > 0 ? currentSlide + 1 : currentSlide - 1);
      resetAutoPlay();
    }
  });

  // Pause on hover
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);

  startAutoPlay();
}

// Recalculate on orientation change or resize (no pixel offsets to fix, noop)
window.addEventListener('resize', () => {
  if (!track) return;  /* guard: element may not exist */
  // Force a re-apply so flexbox reflows correctly
  track.style.transition = 'none';
  track.style.transform = `translateX(-${currentSlide * 100}%)`;
  requestAnimationFrame(() => {
    track.style.transition = 'transform 0.7s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});


/* ============================================================
   7. SCROLL REVEAL  [FIX-6]
   Simple data-attribute guard replaces the problematic CSS Level-4
   :not(.hero-content .reveal-up) compound selector.
   ============================================================ */

function initScrollReveal() {
  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
  );

  // Skip hero elements (tagged by revealHeroContent() above)
  document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right').forEach(el => {
    if (!el.dataset.heroReveal) observer.observe(el);
  });
}


/* ============================================================
   8. CTA PARALLAX  [FIX-2]
   ============================================================ */

const ctaBg = document.getElementById('ctaBg');
let ctaTicking = false;

function handleCtaParallax() {
  if (ctaTicking || !ctaBg) return;
  ctaTicking = true;
  requestAnimationFrame(() => {
    const rect = ctaBg.parentElement.getBoundingClientRect();
    if (rect.top < window.innerHeight && rect.bottom > 0) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      ctaBg.style.transform = `translateY(${(progress - 0.5) * 70}px)`;
    }
    ctaTicking = false;
  });
}

window.addEventListener('scroll', handleCtaParallax, { passive: true });


/* ============================================================
   9. SEARCH TABS
   ============================================================ */

function initSearchTabs() {
  document.querySelectorAll('.stab').forEach(tab => {
    tab.addEventListener('click', function () {
      document.querySelectorAll('.stab').forEach(t => t.classList.remove('active'));
      this.classList.add('active');
    });
  });
}


/* ============================================================
   WAVE SYSTEM — Canvas-based premium animated waves
   ============================================================

   Architecture:
   - 5 depth layers per scene, each using TWO stacked sine waves
     for fully organic, never-repeating surface shapes
   - Per-layer vertical gradient: gold crest → transparent base
   - Foremost (crest) layer: canvas shadowBlur glow + a slowly
     sweeping horizontal shimmer gradient painted as the stroke
   - Full-canvas shimmer overlay: a wide radial sweep that drifts
     left↔right at a different period to all wave layers
   - Foam particle system: 22 particles spawn at the crest,
     drift upward with opacity fade, reset on death
   - IntersectionObserver: animation paused when off-screen
   - ResizeObserver: canvas re-sized to match physical pixels (DPR)
   ============================================================ */

class WaveSystem {
  constructor(canvas, layers, { flipped = false } = {}) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.layers = layers;
    this.flipped = flipped;
    this.t = 0;         // master clock (radians)
    this.shimX = 0.5;       // shimmer sweep pos 0..1
    this.particles = [];
    this._raf = null;
    this._active = false;

    /* ResizeObserver keeps canvas pixels in sync with layout */
    this._ro = new ResizeObserver(() => this._resize());
    this._ro.observe(canvas.parentElement);
    this._resize();
    this._spawnParticles(22);
  }

  /* ── Resize ─────────────────────────────────────────────── */
  _resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const el = this.canvas.parentElement;
    const w = el.offsetWidth;
    const h = el.offsetHeight;
    this.canvas.style.width = w + 'px';
    this.canvas.style.height = h + 'px';
    this.canvas.width = Math.round(w * dpr);
    this.canvas.height = Math.round(h * dpr);
    this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    this.W = w;
    this.H = h;
  }

  /* ── Wave math ───────────────────────────────────────────── */
  /* Returns the Y pixel of the wave surface at X for layer L.
     Two-sine composite prevents perfect periodicity. */
  _waveY(x, L) {
    const { t, H } = this;
    const base = this.flipped
      ? H * (1 - L.baseY)   // measured from bottom when flipped
      : H * L.baseY;         // measured from top normally
    return (
      base
      + H * L.amp * Math.sin(L.freq * x + L.ph + t * L.spd)
      + H * L.amp2 * Math.sin(L.freq2 * x - L.ph + t * L.spd2)
    );
  }

  /* ── Path builders ───────────────────────────────────────── */
  /* Samples the wave at 3-px intervals, smoothed with
     quadratic bezier midpoints (removes jagged edges). */
  _sampleWave(L) {
    const pts = [];
    const step = 3;
    for (let x = 0; x <= this.W + step; x += step) {
      pts.push([x, this._waveY(x, L)]);
    }
    return pts;
  }

  _tracePath(pts) {
    const { ctx, W, H, flipped } = this;
    ctx.beginPath();
    /* Close edge — top or bottom depending on orientation */
    if (flipped) {
      ctx.moveTo(0, 0);
      ctx.lineTo(pts[0][0], pts[0][1]);
    } else {
      ctx.moveTo(0, H);
      ctx.lineTo(pts[0][0], pts[0][1]);
    }
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) * 0.5;
      const my = (pts[i][1] + pts[i + 1][1]) * 0.5;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
    }
    if (flipped) {
      ctx.lineTo(W, 0);
    } else {
      ctx.lineTo(W, H);
    }
    ctx.closePath();
  }

  /* ── Draw a filled layer ─────────────────────────────────── */
  _drawLayer(L) {
    const { ctx, W, H, flipped } = this;
    const pts = this._sampleWave(L);
    const minY = Math.min(...pts.map(p => p[1]));
    const maxY = Math.max(...pts.map(p => p[1]));

    this._tracePath(pts);

    /* Vertical gradient: opaque gold at crest → transparent */
    let grad;
    if (flipped) {
      grad = ctx.createLinearGradient(0, 0, 0, maxY + 10);
      L.stops.forEach(([t, c]) => grad.addColorStop(t, c));
    } else {
      grad = ctx.createLinearGradient(0, minY - 10, 0, H);
      L.stops.forEach(([t, c]) => grad.addColorStop(t, c));
    }
    ctx.fillStyle = grad;
    ctx.fill();

    /* Crest glow + shimmer stroke on front layer only */
    if (L.crest) this._drawCrest(pts);
  }

  /* ── Crest glow + moving shimmer highlight ───────────────── */
  _drawCrest(pts) {
    const { ctx, W, shimX } = this;

    /* ① Broad soft glow underneath the crest */
    ctx.save();
    this._traceLine(pts);
    ctx.strokeStyle = 'rgba(200,169,126,0.18)';
    ctx.lineWidth = 10;
    ctx.shadowColor = 'rgba(200,169,126,0.55)';
    ctx.shadowBlur = 22;
    ctx.stroke();
    ctx.restore();

    /* ② Crisp 1.8-px crest line with moving shimmer gradient */
    ctx.save();
    this._traceLine(pts);
    const x0 = (shimX - 0.38) * W;
    const x1 = (shimX + 0.38) * W;
    const sg = ctx.createLinearGradient(x0, 0, x1, 0);
    sg.addColorStop(0, 'rgba(200,169,126,0)');
    sg.addColorStop(0.3, 'rgba(216,185,148,0.7)');
    sg.addColorStop(0.5, 'rgba(255,240,200,1)');   // white-hot peak
    sg.addColorStop(0.7, 'rgba(216,185,148,0.7)');
    sg.addColorStop(1, 'rgba(200,169,126,0)');
    ctx.strokeStyle = sg;
    ctx.lineWidth = 1.8;
    ctx.shadowColor = 'rgba(240,210,160,0.95)';
    ctx.shadowBlur = 16;
    ctx.stroke();
    ctx.restore();
  }

  /* Traces only the wave surface line (no fill close) */
  _traceLine(pts) {
    const { ctx } = this;
    ctx.beginPath();
    ctx.moveTo(pts[0][0], pts[0][1]);
    for (let i = 1; i < pts.length - 1; i++) {
      const mx = (pts[i][0] + pts[i + 1][0]) * 0.5;
      const my = (pts[i][1] + pts[i + 1][1]) * 0.5;
      ctx.quadraticCurveTo(pts[i][0], pts[i][1], mx, my);
    }
  }

  /* ── Full-canvas shimmer sweep overlay ──────────────────── */
  _drawShimmer() {
    const { ctx, W, H, shimX } = this;
    /* Wide elliptical glow that moves left ↔ right */
    const cx = shimX * W;
    const rg = ctx.createRadialGradient(cx, H * 0.5, 0, cx, H * 0.5, W * 0.55);
    rg.addColorStop(0, 'rgba(200,169,126,0.07)');
    rg.addColorStop(0.5, 'rgba(200,169,126,0.03)');
    rg.addColorStop(1, 'rgba(200,169,126,0)');
    ctx.fillStyle = rg;
    ctx.fillRect(0, 0, W, H);
  }

  /* ── Foam particles ──────────────────────────────────────── */
  _spawnParticles(n) {
    for (let i = 0; i < n; i++) {
      this.particles.push(this._newParticle(true));
    }
  }

  _newParticle(randomAge = false) {
    const W = this.W || window.innerWidth;
    return {
      x: Math.random() * W,
      y: 0,          // set to crest y on first tick
      vx: (Math.random() - 0.5) * 0.55,
      vy: -(0.35 + Math.random() * 0.75),
      life: randomAge ? Math.floor(Math.random() * 80) : 0,
      maxLife: 55 + Math.random() * 95,
      r: 0.7 + Math.random() * 2.2,
      born: false,
    };
  }

  _tickParticles() {
    const crestLayer = this.layers[this.layers.length - 1];
    for (const p of this.particles) {
      if (!p.born) {
        p.y = this._waveY(p.x, crestLayer);
        p.born = true;
      }
      p.x += p.vx;
      p.y += p.vy;
      p.life++;
      if (p.life >= p.maxLife) {
        Object.assign(p, this._newParticle());
        p.x = Math.random() * this.W;
      }
    }
  }

  _drawParticles() {
    const { ctx } = this;
    for (const p of this.particles) {
      if (!p.born) continue;
      const ratio = p.life / p.maxLife;
      /* Ease-out fade: bright at birth, gone by end */
      const alpha = (1 - ratio) * (1 - ratio) * 0.72;
      if (alpha < 0.01) continue;
      ctx.save();
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(232,210,168,${alpha})`;
      ctx.shadowColor = `rgba(232,210,168,${alpha * 0.6})`;
      ctx.shadowBlur = 5;
      ctx.fill();
      ctx.restore();
    }
  }

  /* ── Main render loop ─────────────────────────────────────── */
  _frame() {
    const { ctx, W, H } = this;
    ctx.clearRect(0, 0, W, H);

    /* Advance time — two separate oscillators for shimmer & wave */
    this.t += 0.010;
    this.shimX = (Math.sin(this.t * 0.13) + 1) * 0.5;  // 0..1 slowly

    /* Layers back → front */
    for (const L of this.layers) this._drawLayer(L);

    /* Full-canvas shimmer overlay */
    this._drawShimmer();

    /* Foam */
    this._tickParticles();
    this._drawParticles();

    this._raf = requestAnimationFrame(() => this._frame());
  }

  /* ── Lifecycle ────────────────────────────────────────────── */
  start() {
    if (this._active) return;
    this._active = true;
    this._frame();
  }
  stop() {
    this._active = false;
    cancelAnimationFrame(this._raf);
  }
  destroy() {
    this.stop();
    this._ro.disconnect();
  }
}


/* ── Wave layer definitions ─────────────────────────────────

   Each layer: {
     baseY      — wave baseline as fraction of canvas height
                  (0 = top, 1 = bottom; inverted when flipped)
     amp / amp2 — primary / secondary amplitude fractions of H
     freq/freq2 — spatial frequency (radians per pixel)
     spd / spd2 — time speed multipliers
     ph         — initial phase offset (radians)
     stops      — [[t, rgba], ...] gradient colour stops
     crest      — true = draw glow stroke on this layer
   }
   ─────────────────────────────────────────────────────────── */

/* Top scene — 5 layers, waves rise from below into the scene */
const WAVE_LAYERS_TOP = [
  /* L1 — deepest, slowest, widest undulations */
  {
    baseY: 0.84, amp: 0.055, amp2: 0.025,
    freq: 0.0038, freq2: 0.0062, spd: 0.18, spd2: 0.12, ph: 0,
    stops: [
      [0, 'rgba(160,120,72,0.09)'],
      [0.5, 'rgba(200,169,126,0.05)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: false,
  },
  /* L2 */
  {
    baseY: 0.72, amp: 0.07, amp2: 0.032,
    freq: 0.0055, freq2: 0.0088, spd: 0.28, spd2: 0.19, ph: 1.9,
    stops: [
      [0, 'rgba(180,145,100,0.13)'],
      [0.55, 'rgba(200,169,126,0.07)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: false,
  },
  /* L3 */
  {
    baseY: 0.60, amp: 0.082, amp2: 0.038,
    freq: 0.0072, freq2: 0.0114, spd: 0.40, spd2: 0.27, ph: 3.7,
    stops: [
      [0, 'rgba(200,169,126,0.19)'],
      [0.5, 'rgba(200,169,126,0.09)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: false,
  },
  /* L4 */
  {
    baseY: 0.47, amp: 0.072, amp2: 0.033,
    freq: 0.0092, freq2: 0.0148, spd: 0.54, spd2: 0.37, ph: 0.8,
    stops: [
      [0, 'rgba(216,185,148,0.24)'],
      [0.45, 'rgba(200,169,126,0.12)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: false,
  },
  /* L5 — front crest, fastest, luminous stroke */
  {
    baseY: 0.33, amp: 0.060, amp2: 0.028,
    freq: 0.0118, freq2: 0.0185, spd: 0.72, spd2: 0.50, ph: 2.3,
    stops: [
      [0, 'rgba(232,201,154,0.22)'],
      [0.4, 'rgba(210,178,130,0.10)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: true,
  },
];

/* Mid scene — 5 layers, same logic but orientation is flipped:
   waves hang downward from the top edge of the canvas.
   Different phases so the two scenes look distinct. */
const WAVE_LAYERS_MID = [
  {
    baseY: 0.82, amp: 0.058, amp2: 0.026,
    freq: 0.0042, freq2: 0.0068, spd: 0.20, spd2: 0.14, ph: 1.1,
    stops: [
      [0, 'rgba(160,120,72,0.08)'],
      [0.5, 'rgba(200,169,126,0.04)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: false,
  },
  {
    baseY: 0.70, amp: 0.072, amp2: 0.034,
    freq: 0.0058, freq2: 0.0094, spd: 0.30, spd2: 0.21, ph: 2.8,
    stops: [
      [0, 'rgba(180,145,100,0.12)'],
      [0.5, 'rgba(200,169,126,0.06)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: false,
  },
  {
    baseY: 0.57, amp: 0.080, amp2: 0.037,
    freq: 0.0076, freq2: 0.0122, spd: 0.43, spd2: 0.29, ph: 4.5,
    stops: [
      [0, 'rgba(200,169,126,0.18)'],
      [0.5, 'rgba(200,169,126,0.08)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: false,
  },
  {
    baseY: 0.44, amp: 0.068, amp2: 0.031,
    freq: 0.0098, freq2: 0.0156, spd: 0.58, spd2: 0.40, ph: 1.6,
    stops: [
      [0, 'rgba(216,185,148,0.22)'],
      [0.5, 'rgba(200,169,126,0.10)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: false,
  },
  {
    baseY: 0.30, amp: 0.057, amp2: 0.026,
    freq: 0.0125, freq2: 0.0198, spd: 0.76, spd2: 0.53, ph: 3.2,
    stops: [
      [0, 'rgba(232,201,154,0.20)'],
      [0.4, 'rgba(210,178,130,0.09)'],
      [1, 'rgba(200,169,126,0)'],
    ],
    crest: true,
  },
];


/* ── Init function ───────────────────────────────────────────
   Creates each WaveSystem and manages play/pause via
   IntersectionObserver so off-screen canvases don't burn CPU.
   ─────────────────────────────────────────────────────────── */

function initWaves() {
  const prefersReduced = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  function makeWave(id, layers, opts) {
    const canvas = document.getElementById(id);
    if (!canvas) return;

    const ws = new WaveSystem(canvas, layers, opts);

    if (prefersReduced) {
      /* Draw one static frame and stop */
      ws.start();
      setTimeout(() => ws.stop(), 100);
      return;
    }

    /* Play only when the scene is near the viewport */
    const io = new IntersectionObserver(entries => {
      entries[0].isIntersecting ? ws.start() : ws.stop();
    }, { rootMargin: '250px 0px' });
    io.observe(canvas.parentElement);
  }

  makeWave('waveTop', WAVE_LAYERS_TOP, { flipped: false });
  makeWave('waveMid', WAVE_LAYERS_MID, { flipped: false });  /* waves hang DOWN from top edge */
}


/* ============================================================
   10a. CIRCULAR STAT RINGS
   Animates the stroke-dashoffset of .ring-fill circles so they
   draw from 0% → the target percentage on scroll into view.
   Circumference of r=42 circle = 2π×42 ≈ 263.9
   ============================================================ */

function initStatRings() {
  const CIRCUMFERENCE = 263.9;
  const rings = document.querySelectorAll('.ring-fill');
  if (!rings.length) return;

  const ringObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const ring = entry.target;
      const pct = parseFloat(ring.dataset.pct) || 0;
      const offset = CIRCUMFERENCE - (pct / 100) * CIRCUMFERENCE;
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          ring.style.strokeDashoffset = offset;
        });
      });
      ringObserver.unobserve(ring);
    });
  }, { threshold: 0.4 });

  rings.forEach(r => ringObserver.observe(r));
}


/* ============================================================
   10b. BUILDING SVG DRAW ON SCROLL
   Adds class "drawn" to trigger CSS stroke-dashoffset transitions
   and starts the ground-traveler animateMotion.
   ============================================================ */

function initBuildingSvg() {
  const bldgSvg = document.querySelector('.building-svg');
  if (!bldgSvg) return;

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      bldgSvg.classList.add('drawn');
      // Start the SMIL animateMotion for the traveler dot
      const anim = document.getElementById('groundTravelerAnim');
      if (anim) anim.beginElement();
    }
  }, { threshold: 0.25 }).observe(bldgSvg);
}


/* ============================================================
   10c. MAP PIN REVEAL ON SCROLL
   ============================================================ */

function initMapPins() {
  const mapWrap = document.querySelector('.map-svg-wrap');
  if (!mapWrap) return;

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) mapWrap.classList.add('drawn');
  }, { threshold: 0.3 }).observe(mapWrap);
}


/* ============================================================
   10d. PROCESS PATH-FOLLOWER
   Starts the animateMotion on the traveler when process
   section enters viewport.
   ============================================================ */

function initProcessPath() {
  const pathSvg = document.querySelector('.process-path-svg');
  if (!pathSvg) return;

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      pathSvg.classList.add('active');
      // Trigger all animateMotion elements inside
      pathSvg.querySelectorAll('animateMotion').forEach(a => {
        try { a.beginElement(); } catch (_) { }
      });
    }
  }, { threshold: 0.4 }).observe(pathSvg);
}


/* ============================================================
   10e. SVG PARALLAX SKYLINE — rAF scroll handler
   Each layer moves at a different rate creating depth.
   ============================================================ */

const pSkySection = document.getElementById('parallaxSkyline');
const pSkyLayers = pSkySection
  ? [
    /* speed = vertical parallax rate, xSpeed = horizontal drift rate */
    { el: pSkySection.querySelector('.psky-l3'), speed: 0.05, xSpeed: -0.018 },
    { el: pSkySection.querySelector('.psky-l2'), speed: 0.14, xSpeed: 0.040 },
    { el: pSkySection.querySelector('.psky-l1'), speed: 0.30, xSpeed: -0.065 },
  ]
  : [];

let skyTicking = false;

function handleSkyParallax() {
  if (skyTicking || !pSkySection) return;
  skyTicking = true;
  requestAnimationFrame(() => {
    const rect = pSkySection.getBoundingClientRect();
    if (rect.bottom > 0 && rect.top < window.innerHeight) {
      const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
      const centered = progress - 0.5; // -0.5 … +0.5
      pSkyLayers.forEach(({ el, speed, xSpeed }) => {
        if (!el) return;
        const y = centered * speed * 360;
        const x = centered * (xSpeed || 0) * 280;
        el.style.transform = `translate(${x}px, ${y}px)`;
      });
    }
    skyTicking = false;
  });
}

window.addEventListener('scroll', handleSkyParallax, { passive: true });


/* ============================================================
   10. SVG ANIMATIONS  [FIX-3]
   For a <rect> element, getTotalLength() is unreliable across
   browsers. We calculate the perimeter directly: 2*(w+h).
   ============================================================ */

function initSvgAnimations() {
  const svgDraw = document.querySelector('.svg-draw');
  if (!svgDraw) return;

  // Calculate rect perimeter manually
  const rw = parseFloat(svgDraw.getAttribute('width') || '196');
  const rh = parseFloat(svgDraw.getAttribute('height') || '196');
  const perimeter = 2 * (rw + rh);   // 784 for 196×196

  // Set dash values via attributes (overrides any hardcoded HTML values)
  svgDraw.setAttribute('stroke-dasharray', perimeter);
  svgDraw.setAttribute('stroke-dashoffset', perimeter);

  // Observe the about section visual container
  const target = document.querySelector('.about-visual') || svgDraw;

  const svgObs = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      // Force a layout flush so the browser registers the initial state
      svgDraw.getBoundingClientRect();
      svgDraw.style.transition = 'stroke-dashoffset 2.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s';
      svgDraw.setAttribute('stroke-dashoffset', '0');
      entries[0].target.dataset.svgAnimated = 'true';
      svgObs.unobserve(entries[0].target); /* fire once only */
    }
  }, { threshold: 0.25 });
  svgObs.observe(target);
}

/** Logo hex draw animation on load */
function initLogoAnimation() {
  document.querySelectorAll('.svg-hex').forEach(el => {
    const len = 200;
    el.style.strokeDasharray = len;
    el.style.strokeDashoffset = len;
    el.style.transition = 'stroke-dashoffset 1.5s ease 0.5s';
    // Trigger in next frame so the initial dashoffset is painted first
    requestAnimationFrame(() => {
      requestAnimationFrame(() => { el.style.strokeDashoffset = '0'; });
    });
  });
}


/* ============================================================
   11. BACK TO TOP
   ============================================================ */

const backToTopBtn = document.getElementById('backToTop');

if (backToTopBtn) {
  window.addEventListener('scroll', () => {
    backToTopBtn.classList.toggle('visible', window.scrollY > 400);
  }, { passive: true });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}


/* ============================================================
   12. NEWSLETTER FORM
   ============================================================ */

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input = this.querySelector('input');
    const button = this.querySelector('button');

    button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="var(--gold)" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/></svg>`;
    input.value = 'Thank you for subscribing!';
    input.disabled = button.disabled = true;

    setTimeout(() => {
      input.value = '';
      input.disabled = button.disabled = false;
      button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/></svg>`;
    }, 3000);
  });
}


/* ============================================================
   BOOKING / CONTACT FORM
   ============================================================ */

function initBookingForm() {
  const form = document.getElementById('bookingForm');
  const success = document.getElementById('bookingSuccess');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    /* Basic required-field validation */
    const name = form.querySelector('[name="name"]');
    const email = form.querySelector('[name="email"]');
    let valid = true;

    [name, email].forEach(field => {
      const err = field.value.trim() === '';
      field.classList.toggle('field-error', err);
      if (err) valid = false;
    });
    if (!valid) return;

    /* Simulate submission — replace with real fetch() call */
    const btn = form.querySelector('button[type="submit"]');
    btn.disabled = true;
    btn.innerHTML = `
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"
           style="animation:spin .8s linear infinite">
        <circle cx="12" cy="12" r="10" stroke-opacity=".25"/>
        <path d="M12 2a10 10 0 0 1 10 10" stroke-linecap="round"/>
      </svg>
      <span>Sending…</span>`;

    setTimeout(() => {
      btn.disabled = false;
      btn.innerHTML = `<span>Send Request</span>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <line x1="5" y1="12" x2="19" y2="12"/>
          <polyline points="12 5 19 12 12 19"/></svg>`;
      form.reset();
      form.querySelectorAll('.field-error').forEach(f => f.classList.remove('field-error'));
      success.textContent = '✦ Thank you! An advisor will be in touch within 24 hours.';
      success.classList.add('visible');
      setTimeout(() => success.classList.remove('visible'), 6000);
    }, 1600);
  });
}


/* ============================================================
   SMOOTH SCROLL
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const top = target.getBoundingClientRect().top +
          window.scrollY - navbar.offsetHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}


/* ============================================================
   BUTTON RIPPLE EFFECT
   (keyframe injected once into <head>)
   ============================================================ */

function initRippleEffect() {
  // Inject keyframes once
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent =
      '@keyframes rippleAnim { to { transform:scale(30); opacity:0; } }' +
      '@keyframes spin { to { transform:rotate(360deg); } }';
    document.head.appendChild(s);
  }

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r = this.getBoundingClientRect();
      const span = document.createElement('span');
      Object.assign(span.style, {
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        width: '10px', height: '10px',
        left: `${e.clientX - r.left - 5}px`,
        top: `${e.clientY - r.top - 5}px`,
        pointerEvents: 'none',
        transform: 'scale(0)',
        animation: 'rippleAnim 0.65s ease-out forwards',
      });
      this.appendChild(span);
      setTimeout(() => span.remove(), 650);
    });
  });
}


/* ============================================================
   CURSOR GLOW (desktop-only decorative effect)
   ============================================================ */

function initCursorGlow() {
  if (window.innerWidth < 1024) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.createElement('div');
  /* Position the element so its centre aligns with the cursor.
     Using transform instead of left/top keeps updates off the layout thread. */
  Object.assign(glow.style, {
    position: 'fixed',
    width: '420px', height: '420px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,169,126,0.045) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: '9998',
    top: '-210px',   /* offset by half height so centre = (0,0) */
    left: '-210px',  /* offset by half width  so centre = (0,0) */
    transition: 'transform 0.12s ease',
    willChange: 'transform',
  });
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    /* Compositor-only path — no layout recalculation on each mouse move */
    glow.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
  }, { passive: true });
}


/* ============================================================
   SHARED ANIMATION UTILITIES
   ============================================================ */
const lerp = (a, b, t) => a + (b - a) * t;
const ease = t => t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;


/* ============================================================
   ANIMATION 4 — SVG PATH-DRAWING SKYLINE
   The section is 260 vh tall. The SVG stage is sticky at the
   viewport top. As the user scrolls through the section, progress
   0→1 maps to stroke-dashoffset full→0, "drawing" the path.
   A traveler dot tracks the leading edge; city labels appear at
   preset thresholds.
   ============================================================ */

function initSkylineDraw() {
  const section = document.getElementById('skylineDraw');
  const drawPath = document.getElementById('skylineDrawPath');
  const echoPath = document.getElementById('skylineEchoPath');
  const traveler = document.getElementById('skylineTraveler');
  const fill = document.getElementById('skylineProgressFill');
  const label = document.getElementById('skylineProgressLabel');
  if (!section || !drawPath) return;
  if (prefersReducedMotion()) return;

  const CITY_LABELS = [
    { threshold: 0.10, id: 'skyLbl0' },
    { threshold: 0.38, id: 'skyLbl1' },
    { threshold: 0.62, id: 'skyLbl2' },
    { threshold: 0.86, id: 'skyLbl3' },
  ];

  const DURATION = 3200; /* ms — full draw duration */
  let totalLen = 0;
  let cityEls = [];
  let animStartTime = null;
  let rafId = null;

  function init() {
    totalLen = drawPath.getTotalLength();
    if (!totalLen) return;

    drawPath.style.strokeDasharray = totalLen;
    drawPath.style.strokeDashoffset = totalLen;
    if (echoPath) {
      echoPath.setAttribute('d', drawPath.getAttribute('d'));
      echoPath.style.strokeDasharray = totalLen;
      echoPath.style.strokeDashoffset = totalLen;
    }

    cityEls = CITY_LABELS.map(({ id, threshold }) => {
      const el = document.getElementById(id);
      if (el) el.style.transition = 'fill 0.6s ease';
      return { el, threshold };
    }).filter(o => o.el);

    /* Trigger animation when section is 30% in view */
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && animStartTime === null) {
          animStartTime = performance.now();
          rafId = requestAnimationFrame(animate);
          observer.disconnect();
        }
      });
    }, { threshold: 0.3 });
    observer.observe(section);
  }

  function resetState() {
    drawPath.style.strokeDashoffset = totalLen;
    if (echoPath) echoPath.style.strokeDashoffset = totalLen;
    traveler.setAttribute('opacity', 0);
    cityEls.forEach(({ el }) => el.setAttribute('fill', 'rgba(200,169,126,0)'));
    if (fill) fill.style.width = '0%';
    if (label) label.textContent = '0%';
  }

  function animate(now) {
    const progress = Math.min(1, (now - animStartTime) / DURATION);

    const offset = totalLen * (1 - progress);
    drawPath.style.strokeDashoffset = offset;
    if (echoPath) echoPath.style.strokeDashoffset = offset;

    const drawn = totalLen * progress;
    if (drawn > 2) {
      const pt = drawPath.getPointAtLength(drawn - 2);
      traveler.setAttribute('cx', pt.x);
      traveler.setAttribute('cy', pt.y);
      traveler.setAttribute('opacity', progress < 1 ? 1 : 0);
    }

    const pct = Math.round(progress * 100);
    if (fill) fill.style.width = `${pct}%`;
    if (label) label.textContent = `${pct}%`;

    cityEls.forEach(({ el, threshold }) => {
      el.setAttribute('fill',
        progress >= threshold ? 'rgba(200,169,126,0.7)' : 'rgba(200,169,126,0)');
    });

    if (progress < 1) {
      rafId = requestAnimationFrame(animate);
    } else {
      /* Restart loop after a short pause */
      setTimeout(() => {
        resetState();
        animStartTime = performance.now();
        rafId = requestAnimationFrame(animate);
      }, 800);
    }
  }

  if ('requestIdleCallback' in window) {
    requestIdleCallback(init, { timeout: 600 });
  } else {
    setTimeout(init, 100);
  }
}


/* ============================================================
   ANIMATION 5 — MORPHING NAVIGATION BACKGROUND
   Two SVG paths inside the navbar (fill + stroke) morph between
   wave shapes as different page sections enter the viewport.
   Uses IntersectionObserver to detect the active section and
   a rAF spring to animate the 5 Y-control-point values.
   ============================================================ */

function initNavMorph() {
  const strokeEl = document.getElementById('navMorphStroke');
  const fillEl = document.getElementById('navMorphFill');
  if (!strokeEl || !fillEl) return;
  if (prefersReducedMotion()) return;

  /* 5 Y-control-point values per section; keys match section IDs */
  const STATES = {
    default: [4, 4, 4, 4, 4],
    hero: [3, 0, 5, 0, 3],
    featured: [4, 8, 1, 8, 4],
    about: [2, 4, 8, 4, 2],
    categories: [6, 1, 5, 1, 6],
    process: [4, 7, 2, 7, 4],
    testimonials: [4, 1, 6, 1, 4],
  };

  let cur = [...STATES.default];
  let tgt = [...STATES.default];
  let rafId;

  const buildStroke = ys =>
    `M0,${ys[0]} Q360,${ys[1]} 720,${ys[2]} Q1080,${ys[3]} 1440,${ys[4]}`;
  const buildFill = ys =>
    `M0,8 L0,${ys[0]} Q360,${ys[1]} 720,${ys[2]} Q1080,${ys[3]} 1440,${ys[4]} L1440,8 Z`;

  function animate() {
    let settled = true;
    cur = cur.map((c, i) => {
      const next = lerp(c, tgt[i], 0.10);
      if (Math.abs(tgt[i] - next) > 0.015) settled = false;
      return next;
    });
    strokeEl.setAttribute('d', buildStroke(cur));
    fillEl.setAttribute('d', buildFill(cur));
    if (!settled) rafId = requestAnimationFrame(animate);
  }

  function morphTo(id) {
    const ys = STATES[id] || STATES.default;
    if (ys.every((v, i) => v === tgt[i])) return;
    tgt = [...ys];
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animate);
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) morphTo(e.target.id); });
  }, { threshold: 0.35, rootMargin: '-10% 0px -10% 0px' });

  Object.keys(STATES).filter(k => k !== 'default').forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
}


/* ============================================================
   ANIMATION 6 — DYNAMIC SVG LIGHT SWEEP
   Property cards get a golden diagonal light-beam sweep:
     • Once on scroll-into-view (staggered per card)
     • Again on every hover (CSS handles hover replay)
   Uses IntersectionObserver + MutationObserver to also catch
   cards re-rendered after filter changes.
   ============================================================ */

function initLightSweep() {
  const grid = document.getElementById('propertiesGrid');
  if (!grid) return;

  const sweepObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const card = entry.target;
      const cards = [...grid.querySelectorAll('.prop-card')];
      card.style.setProperty('--card-sweep-delay', `${cards.indexOf(card) * 0.11}s`);
      card.classList.add('sweep-enter');
      sweepObserver.unobserve(card);
    });
  }, { threshold: 0.25 });

  function wireAll() {
    grid.querySelectorAll('.prop-card').forEach(c => {
      if (c.dataset.sweepWired) return;
      c.dataset.sweepWired = '1';
      sweepObserver.observe(c);
    });
  }

  wireAll();

  new MutationObserver(() => requestAnimationFrame(wireAll))
    .observe(grid, { childList: true });
}


/* ============================================================
   ANIMATION 1 — MORPHING HOUSE ICON
   A square (5-point path) smoothly interpolates into a house
   silhouette (5-point path) via rAF + eased lerp. Door,
   windows, and chimney fade/grow in once the house fully forms.
   Loops: house → 1.8 s pause → square → 1.8 s pause → house …
   ============================================================ */

function initMorphHouse() {
  const path = document.getElementById('morphPath');
  const door = document.getElementById('morphDoor');
  const winL = document.getElementById('morphWinL');
  const winR = document.getElementById('morphWinR');
  const chimney = document.getElementById('morphChimney');
  const section = document.getElementById('morphHouse');
  if (!path || !section) return;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  /*
   * Both shapes share the SAME 5-point structure: M + 4×L + Z
   *   Square:  top-centre, top-right, bot-right, bot-left, top-left
   *   House:   roof-peak,  rt-eave,   bot-right, bot-left, lt-eave
   */
  const ptSq = [[50, 25], [75, 25], [75, 75], [25, 75], [25, 25]];
  const ptHo = [[50, 5], [90, 42], [82, 90], [18, 90], [10, 42]];

  function buildD(pts) {
    return `M${pts[0][0]},${pts[0][1]}` +
      pts.slice(1).map(p => `L${p[0]},${p[1]}`).join('') + 'Z';
  }

  /* Uses module-level lerp + ease utilities */
  function applyProgress(p) {
    const t = ease(p);
    const pts = ptSq.map((a, i) => [lerp(a[0], ptHo[i][0], t), lerp(a[1], ptHo[i][1], t)]);
    path.setAttribute('d', buildD(pts));
    path.setAttribute('fill', `rgba(200,169,126,${0.05 + t * 0.1})`);

    const detailT = ease(Math.max(0, (p - 0.75) / 0.25));
    const dOp = p >= 0.5 ? detailT : 0;
    door.setAttribute('opacity', (dOp * 0.88).toFixed(3));
    winL.setAttribute('opacity', (dOp * 0.72).toFixed(3));
    winR.setAttribute('opacity', (dOp * 0.72).toFixed(3));

    /* Chimney grows from height 0 → 18 */
    const chH = +(dOp * 18).toFixed(2);
    chimney.setAttribute('height', chH);
    chimney.setAttribute('y', +(28 - chH).toFixed(2));
    chimney.setAttribute('opacity', (dOp * 0.9).toFixed(3));
  }

  let progress = 0;
  let direction = 1;  // +1 → house, -1 → square
  let running = false;
  let timer = null;

  function tick() {
    if (!running) return;
    progress = Math.min(1, Math.max(0, progress + direction * 0.013));
    applyProgress(progress);

    if (progress >= 1 || progress <= 0) {
      running = false;
      timer = setTimeout(() => {
        direction *= -1;
        running = true;
        requestAnimationFrame(tick);
      }, 1800);
      return;
    }
    requestAnimationFrame(tick);
  }

  /* Start on first intersection */
  let fired = false;
  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !fired) {
      fired = true;
      running = true;
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.25 }).observe(section);
}


/* ============================================================
   ANIMATION 2 — MAGNETIC SVG ICONS
   Process step icons and category icons are "pulled" toward the
   cursor when within RADIUS px. Uses a spring-like rAF loop for
   smooth, framerate-independent motion. Desktop only.
   ============================================================ */

function initMagneticIcons() {
  if (window.innerWidth < 1024) return;
  if (prefersReducedMotion()) return;

  const RADIUS = 90;
  const PULL = 0.38;
  const FRICTION = 0.13;

  /* Feature-detect once, outside the per-element loop */
  const useTranslateProp = 'translate' in document.documentElement.style;

  /* Per-element state stored in a Map — single global handler iterates all */
  const elements = [...document.querySelectorAll('.step-icon, .cat-icon')];
  const state = new Map(elements.map(el => [el, { cx: 0, cy: 0, tx: 0, ty: 0, rafId: 0 }]));

  elements.forEach(el => { el.style.willChange = 'transform'; });

  /* Cache bounding rects — reading them on every mousemove forces layout.
     Refresh on resize and scroll (rects shift on both). */
  let rects = new Map(elements.map(el => [el, el.getBoundingClientRect()]));
  const refreshRects = () => {
    rects = new Map(elements.map(el => [el, el.getBoundingClientRect()]));
  };
  window.addEventListener('resize', refreshRects, { passive: true });
  window.addEventListener('scroll', refreshRects, { passive: true });

  function setPos(el, x, y) {
    if (useTranslateProp) el.style.translate = `${x.toFixed(2)}px ${y.toFixed(2)}px`;
    else el.style.transform = `translate(${x.toFixed(2)}px,${y.toFixed(2)}px)`;
  }

  function makeSpring(el, s) {
    return function spring() {
      s.cx += (s.tx - s.cx) * FRICTION;
      s.cy += (s.ty - s.cy) * FRICTION;
      setPos(el, s.cx, s.cy);
      if (Math.abs(s.tx - s.cx) > 0.05 || Math.abs(s.ty - s.cy) > 0.05) {
        s.rafId = requestAnimationFrame(spring);
      } else {
        s.cx = s.tx; s.cy = s.ty;
        setPos(el, s.cx, s.cy);
        if (s.tx === 0) {
          el.classList.remove('magnetic-near');
          if (useTranslateProp) el.style.translate = '';
          else el.style.transform = '';
        }
      }
    };
  }

  /* Map each element to its bound spring function */
  const springs = new Map(elements.map(el => [el, makeSpring(el, state.get(el))]));

  document.addEventListener('mousemove', e => {
    elements.forEach(el => {
      const s = state.get(el);
      const r = rects.get(el);  /* use cached rect — no layout reads per frame */
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      const dist = Math.hypot(dx, dy);

      if (dist < RADIUS) {
        const force = (RADIUS - dist) / RADIUS;
        s.tx = dx * PULL * force;
        s.ty = dy * PULL * force;
        el.classList.add('magnetic-near');
      } else {
        s.tx = 0; s.ty = 0;
      }

      cancelAnimationFrame(s.rafId);
      s.rafId = requestAnimationFrame(springs.get(el));
    });
  }, { passive: true });
}


/* ============================================================
   INIT — everything fires after DOM is ready
   ============================================================ */

/* ============================================================
   THEME TOGGLE — Light / Dark Mode
   ============================================================ */
function initThemeToggle() {
  const STORAGE_KEY = 'luxestate-theme';
  const html = document.documentElement;

  // Apply saved preference or default to dark
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light') {
    html.setAttribute('data-theme', 'light');
  }

  function setTheme(theme) {
    if (theme === 'light') {
      html.setAttribute('data-theme', 'light');
      localStorage.setItem(STORAGE_KEY, 'light');
    } else {
      html.removeAttribute('data-theme');
      localStorage.setItem(STORAGE_KEY, 'dark');
    }
  }

  function toggle() {
    const isLight = html.getAttribute('data-theme') === 'light';
    setTheme(isLight ? 'dark' : 'light');
  }

  document.getElementById('themeToggle')?.addEventListener('click', toggle);
  document.getElementById('themeToggleMobile')?.addEventListener('click', toggle);
}


document.addEventListener('DOMContentLoaded', () => {

  /* Theme toggle (runs first so theme is set before other inits) */
  initThemeToggle();

  /* Core navigation */
  handleNavScroll();
  initSmoothScroll();
  initSearchTabs();

  /* Hero */
  revealHeroContent();       // tags hero elements BEFORE observer runs
  handleCtaParallax();       // prime CTA parallax on load

  /* Properties */
  renderProperties();
  initPropertyFilter();

  /* Stats */
  initStatsObserver();

  /* Testimonials */
  initTestimonials();

  /* Scroll reveal (runs AFTER revealHeroContent tags hero els) */
  initScrollReveal();

  /* SVG + Logo */
  initSvgAnimations();
  initLogoAnimation();

  /* Canvas wave system */
  initWaves();

  /* New SVG animation systems */
  initStatRings();
  initBuildingSvg();
  initMapPins();
  initProcessPath();
  handleSkyParallax(); /* prime on load */

  /* Featured animations (batch 1) */
  initMorphHouse();        /* Anim 1 — morphing house icon  */
  initMagneticIcons();     /* Anim 2 — magnetic SVG icons   */
  /* Anim 3 (parallax skyline) is handled by handleSkyParallax() above */

  /* Featured animations (batch 2) */
  initSkylineDraw();       /* Anim 4 — scroll-driven path drawing  */
  initNavMorph();          /* Anim 5 — navbar background morph     */
  initLightSweep();        /* Anim 6 — property card light sweep   */

  /* Nav path SVG animation */
  initNavPathAnimation();

  /* UX extras */
  initNewsletter();
  initBookingForm();
  initRippleEffect();
  initCursorGlow();

  console.log(
    '%cLuxEstate ✦ Loaded',
    'color:#c8a97e;font-family:Georgia,serif;font-size:14px;font-weight:bold;'
  );
});
