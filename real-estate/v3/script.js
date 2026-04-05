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

const navbar     = document.getElementById('navbar');
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

function handleNavScroll() {
  navbar.classList.toggle('scrolled', window.scrollY > 60);
}

function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
hamburger.addEventListener('click', toggleMobileMenu);
document.querySelectorAll('.mobile-link').forEach(l => l.addEventListener('click', closeMobileMenu));


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
  const favFill   = isFav ? '#ef5350' : 'none';
  const favStroke = isFav ? '#ef5350' : 'currentColor';

  return `
    <article class="prop-card card-enter" data-type="${prop.type}" data-id="${prop.id}">

      <div class="prop-img-wrap">
        <img src="${prop.img}" alt="${prop.title}" loading="lazy" />
        <span class="prop-badge ${prop.badgeClass}">${prop.badge}</span>
        <button class="prop-fav${isFav ? ' active' : ''}" data-id="${prop.id}" aria-label="Favourite">
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
          ${prop.type.charAt(0).toUpperCase() + prop.type.slice(1)}
        </div>
      </div>

      <div class="prop-body">
        <div class="prop-price">
          ${prop.price}
          <span class="prop-price-sub">Market Value</span>
        </div>
        <h3 class="prop-title">${prop.title}</h3>
        <div class="prop-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          ${prop.location}
        </div>
        <div class="prop-divider"></div>
        <div class="prop-specs">
          <div class="prop-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
              <path d="M2 4v16M22 4v16M2 8h20M2 16h20M6 8v8M10 8v8M14 8v8M18 8v8"/>
            </svg>
            ${prop.beds} Beds
          </div>
          <div class="prop-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
              <path d="M4 12h16M4 12a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2M4 12v4a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-4"/>
            </svg>
            ${prop.baths} Baths
          </div>
          <div class="prop-spec">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2"/>
            </svg>
            ${prop.sqft} sqft
          </div>
        </div>
      </div>

      <div class="prop-footer">
        <a href="#contact" class="prop-view-btn">
          View Details
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/>
            <polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
        <div class="prop-agent" title="${prop.agentName}">
          <div class="agent-avatar">${prop.agent}</div>
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

  const btn  = e.currentTarget;
  const id   = parseInt(btn.dataset.id);
  const wasFav = favorites.has(id);

  wasFav ? favorites.delete(id) : favorites.add(id);

  const nowFav = !wasFav;
  const svgEl  = btn.querySelector('svg');
  btn.classList.toggle('active', nowFav);
  svgEl.setAttribute('fill',   nowFav ? '#ef5350' : 'none');
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
  const target   = parseFloat(el.dataset.target);
  const decimals = el.dataset.decimal ? parseInt(el.dataset.decimal) : 0;
  const duration = 2000;
  const start    = performance.now();

  function tick(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased    = 1 - Math.pow(1 - progress, 3);   // ease-out cubic
    const val      = target * eased;

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

/**
 * [FIX-5] Stat bar animation.
 * CSS transition on `.stat-bar-fill` needs a paint cycle BEFORE the
 * new `width` value is applied — otherwise the browser sees 0→target
 * in the same frame and skips the transition.
 * Double-rAF ensures we're setting width in a new paint frame.
 */
function initStatBarsObserver() {
  const bars = document.querySelectorAll('.stat-bar-fill');
  if (!bars.length) return;

  const barObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const bar = entry.target;
      const targetW = bar.style.getPropertyValue('--w').trim() || '70%';
      // Double rAF: ensures width:0 is painted first so the CSS transition fires
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { bar.style.width = targetW; });
      });
      barObserver.unobserve(bar);
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => barObserver.observe(bar));
}


/* ============================================================
   6. TESTIMONIALS — SINGLE-CARD SLIDER  [FIX-4]
   Each card is flex: 0 0 100% of the wrapper.
   goToSlide shifts the track by N × 100% — no pixel arithmetic.
   ============================================================ */

const track    = document.getElementById('testimonialsTrack');
const dotsWrap = document.getElementById('tNavDots');
const prevBtn  = document.getElementById('tPrev');
const nextBtn  = document.getElementById('tNext');

let currentSlide  = 0;
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
      <p class="testi-text">"${t.text}"</p>
      <div class="testi-author">
        <div class="testi-avatar">${t.initials}</div>
        <div>
          <div class="testi-name">${t.name}</div>
          <div class="testi-role">${t.role}</div>
          <div class="testi-location">
            <svg width="10" height="10" viewBox="0 0 24 24"
                 fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
              <circle cx="12" cy="10" r="3"/>
            </svg>
            ${t.location}
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
  track.style.transform  = 'translateX(0)';

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
  // Force a re-apply so flexbox reflows correctly
  track.style.transition = 'none';
  track.style.transform  = `translateX(-${currentSlide * 100}%)`;
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

const ctaBg    = document.getElementById('ctaBg');
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
   10. SVG ANIMATIONS  [FIX-3]
   For a <rect> element, getTotalLength() is unreliable across
   browsers. We calculate the perimeter directly: 2*(w+h).
   ============================================================ */

function initSvgAnimations() {
  const svgDraw = document.querySelector('.svg-draw');
  if (!svgDraw) return;

  // Calculate rect perimeter manually
  const rw = parseFloat(svgDraw.getAttribute('width')  || '196');
  const rh = parseFloat(svgDraw.getAttribute('height') || '196');
  const perimeter = 2 * (rw + rh);   // 784 for 196×196

  // Set dash values via attributes (overrides any hardcoded HTML values)
  svgDraw.setAttribute('stroke-dasharray',  perimeter);
  svgDraw.setAttribute('stroke-dashoffset', perimeter);

  // Observe the about section visual container
  const target = document.querySelector('.about-visual') || svgDraw;

  new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      // Force a layout flush so the browser registers the initial state
      svgDraw.getBoundingClientRect();
      svgDraw.style.transition = 'stroke-dashoffset 2.6s cubic-bezier(0.4, 0, 0.2, 1) 0.15s';
      svgDraw.setAttribute('stroke-dashoffset', '0');
      entries[0].target.dataset.svgAnimated = 'true';
    }
  }, { threshold: 0.25 }).observe(target);
}

/** Logo hex draw animation on load */
function initLogoAnimation() {
  document.querySelectorAll('.svg-hex').forEach(el => {
    const len = 200;
    el.style.strokeDasharray  = len;
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

window.addEventListener('scroll', () => {
  backToTopBtn.classList.toggle('visible', window.scrollY > 400);
}, { passive: true });

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});


/* ============================================================
   12. NEWSLETTER FORM
   ============================================================ */

function initNewsletter() {
  const form = document.getElementById('newsletterForm');
  if (!form) return;

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const input  = this.querySelector('input');
    const button = this.querySelector('button');

    button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24"
      fill="none" stroke="var(--gold)" stroke-width="2.5">
      <polyline points="20 6 9 17 4 12"/></svg>`;
    input.value    = 'Thank you for subscribing!';
    input.disabled = button.disabled = true;

    setTimeout(() => {
      input.value    = '';
      input.disabled = button.disabled = false;
      button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24"
        fill="none" stroke="currentColor" stroke-width="2">
        <line x1="5" y1="12" x2="19" y2="12"/>
        <polyline points="12 5 19 12 12 19"/></svg>`;
    }, 3000);
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
  // Inject keyframe once
  if (!document.getElementById('ripple-style')) {
    const s = document.createElement('style');
    s.id = 'ripple-style';
    s.textContent = '@keyframes rippleAnim { to { transform:scale(30); opacity:0; } }';
    document.head.appendChild(s);
  }

  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const r    = this.getBoundingClientRect();
      const span = document.createElement('span');
      Object.assign(span.style, {
        position: 'absolute',
        borderRadius: '50%',
        background: 'rgba(255,255,255,0.18)',
        width: '10px', height: '10px',
        left: `${e.clientX - r.left - 5}px`,
        top:  `${e.clientY - r.top  - 5}px`,
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
  Object.assign(glow.style, {
    position: 'fixed',
    width: '420px', height: '420px',
    borderRadius: '50%',
    background: 'radial-gradient(circle, rgba(200,169,126,0.045) 0%, transparent 70%)',
    pointerEvents: 'none',
    zIndex: '9998',
    transform: 'translate(-50%, -50%)',
    transition: 'left 0.12s ease, top 0.12s ease',
    willChange: 'left, top',
  });
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = `${e.clientX}px`;
    glow.style.top  = `${e.clientY}px`;
  }, { passive: true });
}


/* ============================================================
   INIT — everything fires after DOM is ready
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

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
  initStatBarsObserver();

  /* Testimonials */
  initTestimonials();

  /* Scroll reveal (runs AFTER revealHeroContent tags hero els) */
  initScrollReveal();

  /* SVG + Logo */
  initSvgAnimations();
  initLogoAnimation();

  /* UX extras */
  initNewsletter();
  initRippleEffect();
  initCursorGlow();

  console.log(
    '%cLuxEstate ✦ Loaded',
    'color:#c8a97e;font-family:Georgia,serif;font-size:14px;font-weight:bold;'
  );
});
