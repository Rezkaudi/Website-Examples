/* ============================================================
   LUXESTATE — MAIN SCRIPT
   ============================================================
   Sections:
   1.  Data — Properties & Testimonials
   2.  Navbar — Scroll behavior & mobile menu
   3.  Hero — Parallax & animated reveal
   4.  Properties — Render, filter, favorites
   5.  Stats — Animated counters
   6.  Testimonials — Slider with auto-play
   7.  Scroll Reveal — IntersectionObserver
   8.  CTA Parallax
   9.  Search Tabs
   10. SVG animations
   11. Back to Top
   12. Newsletter Form
   13. Init
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
    beds: 5,
    baths: 6,
    sqft: '8,200',
    type: 'penthouse',
    badge: 'Featured',
    badgeClass: '',
    img: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=700&q=80',
    agent: 'SM',
    agentName: 'Sarah M.',
  },
  {
    id: 2,
    title: 'The Hillcrest Manor',
    location: 'Beverly Hills, California',
    price: '$22,000,000',
    beds: 8,
    baths: 9,
    sqft: '12,500',
    type: 'estate',
    badge: 'Exclusive',
    badgeClass: 'badge-ultra',
    img: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=700&q=80',
    agent: 'JR',
    agentName: 'James R.',
  },
  {
    id: 3,
    title: 'Riviera Villa Blanc',
    location: 'French Riviera, Monaco',
    price: '$18,750,000',
    beds: 6,
    baths: 7,
    sqft: '9,800',
    type: 'villa',
    badge: 'New',
    badgeClass: 'badge-new',
    img: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80',
    agent: 'CF',
    agentName: 'Claire F.',
  },
  {
    id: 4,
    title: 'The Marina Residence',
    location: 'Dubai Marina, UAE',
    price: '$8,200,000',
    beds: 4,
    baths: 5,
    sqft: '6,100',
    type: 'apartment',
    badge: 'Hot Deal',
    badgeClass: 'badge-hot',
    img: 'https://images.unsplash.com/photo-1613977257592-4a9a32f9141b?auto=format&fit=crop&w=700&q=80',
    agent: 'AK',
    agentName: 'Amir K.',
  },
  {
    id: 5,
    title: 'Grand Palais Tower',
    location: 'Champs-Élysées, Paris',
    price: '$11,300,000',
    beds: 4,
    baths: 4,
    sqft: '5,400',
    type: 'penthouse',
    badge: 'Premium',
    badgeClass: 'badge-premium',
    img: 'https://images.unsplash.com/photo-1600047986624-e0917c5e97f3?auto=format&fit=crop&w=700&q=80',
    agent: 'IM',
    agentName: 'Isabelle M.',
  },
  {
    id: 6,
    title: 'Coastal Cliff Estate',
    location: 'Malibu, California',
    price: '$31,000,000',
    beds: 7,
    baths: 8,
    sqft: '15,200',
    type: 'estate',
    badge: 'Ultra Luxury',
    badgeClass: 'badge-ultra',
    img: 'https://images.unsplash.com/photo-1523217582562-09d81b5b52d8?auto=format&fit=crop&w=700&q=80',
    agent: 'WB',
    agentName: 'William B.',
  },
];

const TESTIMONIALS = [
  {
    name: 'Alexandra Chen',
    role: 'CEO, TechVentures Capital',
    text: 'LuxEstate transformed our property search into an extraordinary experience. Their team\'s knowledge of the luxury market is absolutely unmatched — we found our dream home in just three weeks.',
    initials: 'AC',
    rating: 5,
    location: 'Purchased in Manhattan',
  },
  {
    name: 'Marcus Rothschild',
    role: 'Private Equity Partner',
    text: 'The attention to detail and personalized service exceeded every expectation we had. Their off-market access is truly remarkable — they showed us properties we never knew existed.',
    initials: 'MR',
    rating: 5,
    location: 'Portfolio in Monaco',
  },
  {
    name: 'Isabella Fontaine',
    role: 'Luxury Fashion Designer',
    text: 'Extraordinary properties paired with exceptional service. LuxEstate made finding our Malibu estate feel effortless and genuinely enjoyable from start to finish.',
    initials: 'IF',
    rating: 5,
    location: 'Purchased in Malibu',
  },
  {
    name: 'James Wellington',
    role: 'Hedge Fund Manager',
    text: 'Their global network opened doors we never knew existed. The investment returns on our Dubai portfolio have been exceptional — 28% appreciation in 18 months.',
    initials: 'JW',
    rating: 5,
    location: 'Investment Portfolio, Dubai',
  },
  {
    name: 'Priya Kapoor',
    role: 'Tech Founder & Philanthropist',
    text: 'From the first consultation to the final handover, every step felt curated just for us. LuxEstate doesn\'t just sell properties — they craft life experiences.',
    initials: 'PK',
    rating: 5,
    location: 'Purchased in Beverly Hills',
  },
];


/* ============================================================
   2. NAVBAR
   ============================================================ */

const navbar    = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

/** Add scrolled class and change nav appearance on scroll */
function handleNavScroll() {
  const scrolled = window.scrollY > 60;
  navbar.classList.toggle('scrolled', scrolled);
}

/** Toggle mobile menu open/close */
function toggleMobileMenu() {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}

/** Close mobile menu when a link is clicked */
function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('open');
  document.body.style.overflow = '';
}

window.addEventListener('scroll', handleNavScroll, { passive: true });
hamburger.addEventListener('click', toggleMobileMenu);
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});


/* ============================================================
   3. HERO — PARALLAX & REVEALS
   ============================================================ */

const heroBg = document.getElementById('heroBg');

/**
 * Parallax scroll effect for hero background.
 * Moves the background at a slower rate than scroll for depth.
 */
function handleHeroParallax() {
  const scrollY = window.scrollY;
  if (heroBg && scrollY < window.innerHeight * 1.5) {
    heroBg.style.transform = `translateY(${scrollY * 0.35}px)`;
  }
}

window.addEventListener('scroll', handleHeroParallax, { passive: true });

/** Staggered reveal of hero content on load */
function revealHeroContent() {
  const items = document.querySelectorAll('.hero-content .reveal-up, .hero-search.reveal-up');
  items.forEach((el, i) => {
    setTimeout(() => {
      el.classList.add('revealed');
    }, 300 + i * 180);
  });

  // Animate floating cards with delay
  setTimeout(() => {
    document.querySelectorAll('.floating-card').forEach(card => {
      card.style.opacity = '1';
    });
  }, 1000);
}

// Floating cards start hidden
document.querySelectorAll('.floating-card').forEach(card => {
  card.style.opacity = '0';
  card.style.transition = 'opacity 0.8s ease';
});


/* ============================================================
   4. PROPERTIES — RENDER & FILTER
   ============================================================ */

const propertiesGrid = document.getElementById('propertiesGrid');
let favorites = new Set();

/** Build SVG icon helper */
const svg = (path, viewBox = '0 0 24 24', extras = '') =>
  `<svg width="14" height="14" viewBox="${viewBox}" fill="none" stroke="currentColor" stroke-width="2" ${extras}>${path}</svg>`;

/** Create a single property card HTML string */
function createPropertyCard(prop) {
  const isFav = favorites.has(prop.id);

  return `
    <article class="prop-card card-enter" data-type="${prop.type}" data-id="${prop.id}">
      <!-- Image -->
      <div class="prop-img-wrap">
        <img src="${prop.img}" alt="${prop.title}" loading="lazy" />
        <span class="prop-badge ${prop.badgeClass}">${prop.badge}</span>
        <button class="prop-fav ${isFav ? 'active' : ''}" data-id="${prop.id}" aria-label="Add to favorites">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="${isFav ? '#ef5350' : 'none'}" stroke="${isFav ? '#ef5350' : 'currentColor'}" stroke-width="2">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
        <div class="prop-type-tag">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
            <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
          </svg>
          ${prop.type.charAt(0).toUpperCase() + prop.type.slice(1)}
        </div>
      </div>

      <!-- Body -->
      <div class="prop-body">
        <div class="prop-price">
          ${prop.price}
          <span class="prop-price-sub">Market Value</span>
        </div>
        <h3 class="prop-title">${prop.title}</h3>
        <div class="prop-location">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
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

      <!-- Footer -->
      <div class="prop-footer">
        <a href="#contact" class="prop-view-btn">
          View Details
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/>
          </svg>
        </a>
        <div class="prop-agent" title="${prop.agentName}">
          <div class="agent-avatar">${prop.agent}</div>
        </div>
      </div>
    </article>
  `;
}

/** Render all or filtered properties */
function renderProperties(filter = 'all') {
  const filtered = filter === 'all'
    ? PROPERTIES
    : PROPERTIES.filter(p => p.type === filter);

  propertiesGrid.innerHTML = filtered
    .map(p => createPropertyCard(p))
    .join('');

  // Stagger card entrance
  propertiesGrid.querySelectorAll('.prop-card').forEach((card, i) => {
    card.style.animationDelay = `${i * 0.08}s`;
  });

  // Bind favorite buttons
  propertiesGrid.querySelectorAll('.prop-fav').forEach(btn => {
    btn.addEventListener('click', toggleFavorite);
  });
}

/** Toggle favorite state on a property card */
function toggleFavorite(e) {
  e.preventDefault();
  e.stopPropagation();

  const btn = e.currentTarget;
  const id  = parseInt(btn.dataset.id);
  const isFav = favorites.has(id);

  if (isFav) {
    favorites.delete(id);
  } else {
    favorites.add(id);
  }

  // Update button visuals
  const svgEl    = btn.querySelector('svg');
  const pathEl   = btn.querySelector('path');
  const active   = !isFav;

  btn.classList.toggle('active', active);
  svgEl.setAttribute('fill', active ? '#ef5350' : 'none');
  svgEl.setAttribute('stroke', active ? '#ef5350' : 'currentColor');

  // Micro-interaction: scale pop
  btn.style.transform = 'scale(1.35)';
  setTimeout(() => { btn.style.transform = ''; }, 250);
}

/** Filter button click handling */
function initPropertyFilter() {
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      this.classList.add('active');

      const filter = this.dataset.filter;
      renderProperties(filter);
    });
  });
}


/* ============================================================
   5. STATS — ANIMATED COUNTERS
   ============================================================ */

let statsAnimated = false;

/**
 * Animate a numeric counter from 0 to its target value.
 * Supports integers and single-decimal floats.
 */
function animateCounter(el) {
  const target  = parseFloat(el.dataset.target);
  const decimal = el.dataset.decimal ? parseInt(el.dataset.decimal) : 0;
  const duration = 2000; // ms
  const start    = performance.now();

  function update(now) {
    const elapsed  = now - start;
    const progress = Math.min(elapsed / duration, 1);
    // Ease-out cubic
    const eased   = 1 - Math.pow(1 - progress, 3);
    const current = target * eased;

    el.textContent = decimal
      ? current.toFixed(decimal)
      : Math.round(current).toLocaleString();

    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = decimal
      ? target.toFixed(decimal)
      : target.toLocaleString();
  }

  requestAnimationFrame(update);
}

function initStatsObserver() {
  const statsSection = document.getElementById('stats');
  if (!statsSection) return;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting && !statsAnimated) {
      statsAnimated = true;
      document.querySelectorAll('.stat-num').forEach(el => animateCounter(el));
      // Animate progress bars
      document.querySelectorAll('.stat-bar-fill').forEach(bar => {
        bar.style.width = bar.style.getPropertyValue('--w') ||
          bar.parentElement.style.getPropertyValue('--w') ||
          getComputedStyle(bar).getPropertyValue('--w');
      });
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(statsSection);
}


/* ============================================================
   6. TESTIMONIALS — SLIDER
   ============================================================ */

const track     = document.getElementById('testimonialsTrack');
const dotsWrap  = document.getElementById('tNavDots');
const prevBtn   = document.getElementById('tPrev');
const nextBtn   = document.getElementById('tNext');

let currentSlide  = 0;
let autoPlayTimer = null;
const AUTOPLAY_DELAY = 5000;

/** Build testimonial card HTML */
function createTestiCard(testi, index) {
  const stars = Array(testi.rating)
    .fill('<svg width="14" height="14" viewBox="0 0 24 24" fill="var(--gold)" stroke="var(--gold)" stroke-width="0"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>')
    .join('');

  return `
    <div class="testi-card ${index === 0 ? 'active' : ''}" data-index="${index}">
      <div class="testi-stars">${stars}</div>
      <p class="testi-text">"${testi.text}"</p>
      <div class="testi-author">
        <div class="testi-avatar">${testi.initials}</div>
        <div>
          <div class="testi-name">${testi.name}</div>
          <div class="testi-role">${testi.role}</div>
          <div class="testi-location">
            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            ${testi.location}
          </div>
        </div>
      </div>
    </div>
  `;
}

/** Build dot navigation */
function buildDots() {
  dotsWrap.innerHTML = TESTIMONIALS
    .map((_, i) => `<button class="tNav-dot ${i === 0 ? 'active' : ''}" data-dot="${i}" aria-label="Go to testimonial ${i + 1}"></button>`)
    .join('');

  dotsWrap.querySelectorAll('.tNav-dot').forEach(dot => {
    dot.addEventListener('click', () => goToSlide(parseInt(dot.dataset.dot)));
  });
}

/** Move slider to a specific index */
function goToSlide(index) {
  const cards = track.querySelectorAll('.testi-card');
  const dots  = dotsWrap.querySelectorAll('.tNav-dot');
  const total = TESTIMONIALS.length;

  // Clamp index
  currentSlide = (index + total) % total;

  // Calculate offset — center active card
  const cardWidth = cards[0] ? cards[0].offsetWidth + 28 : 448; // card width + gap
  const trackWidth = track.parentElement.offsetWidth;
  const offset = (trackWidth / 2) - (cardWidth / 2) - (currentSlide * cardWidth);

  track.style.transform = `translateX(${offset}px)`;

  // Update active states
  cards.forEach((c, i) => c.classList.toggle('active', i === currentSlide));
  dots.forEach((d, i)  => d.classList.toggle('active', i === currentSlide));
}

/** Start auto-play */
function startAutoPlay() {
  stopAutoPlay();
  autoPlayTimer = setInterval(() => goToSlide(currentSlide + 1), AUTOPLAY_DELAY);
}

function stopAutoPlay() {
  if (autoPlayTimer) clearInterval(autoPlayTimer);
}

function initTestimonials() {
  if (!track) return;

  // Render cards
  track.innerHTML = TESTIMONIALS.map(createTestiCard).join('');
  buildDots();

  // Nav buttons
  prevBtn.addEventListener('click', () => { goToSlide(currentSlide - 1); resetAutoPlay(); });
  nextBtn.addEventListener('click', () => { goToSlide(currentSlide + 1); resetAutoPlay(); });

  // Touch / swipe support
  let touchStartX = 0;
  track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      goToSlide(diff > 0 ? currentSlide + 1 : currentSlide - 1);
      resetAutoPlay();
    }
  });

  // Initial position
  setTimeout(() => goToSlide(0), 100);
  startAutoPlay();

  // Pause on hover
  track.addEventListener('mouseenter', stopAutoPlay);
  track.addEventListener('mouseleave', startAutoPlay);
}

function resetAutoPlay() {
  stopAutoPlay();
  startAutoPlay();
}

// Recalculate on resize
window.addEventListener('resize', () => goToSlide(currentSlide));


/* ============================================================
   7. SCROLL REVEAL — IntersectionObserver
   ============================================================ */

/**
 * Uses IntersectionObserver to add 'revealed' class when elements
 * scroll into view, triggering CSS transitions.
 */
function initScrollReveal() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -60px 0px',
    }
  );

  // Observe all reveal elements (except hero — those are handled separately)
  document.querySelectorAll('.reveal-up:not(.hero-content .reveal-up):not(.hero-search.reveal-up), .reveal-left, .reveal-right').forEach(el => {
    observer.observe(el);
  });
}

/** Special observer for stat bars — triggers width animation */
function initStatBarsObserver() {
  const bars = document.querySelectorAll('.stat-bar-fill');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        // The --w var is set inline on the element
        const targetWidth = bar.style.getPropertyValue('--w') || '70%';
        bar.style.width = targetWidth;
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.5 });

  bars.forEach(bar => observer.observe(bar));
}


/* ============================================================
   8. CTA PARALLAX
   ============================================================ */

const ctaBg = document.getElementById('ctaBg');

function handleCtaParallax() {
  if (!ctaBg) return;
  const rect    = ctaBg.parentElement.getBoundingClientRect();
  const visible = rect.top < window.innerHeight && rect.bottom > 0;
  if (visible) {
    const progress = (window.innerHeight - rect.top) / (window.innerHeight + rect.height);
    ctaBg.style.transform = `translateY(${(progress - 0.5) * 80}px)`;
  }
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
   10. SVG ANIMATIONS
   ============================================================ */

/**
 * Observes the about section SVG draw element and triggers
 * the stroke-dashoffset animation when it enters view.
 */
function initSvgAnimations() {
  const svgDraw = document.querySelector('.svg-draw');
  if (!svgDraw) return;

  // Set initial dasharray to total path length
  const length = svgDraw.getTotalLength ? svgDraw.getTotalLength() : 800;
  svgDraw.style.strokeDasharray  = length;
  svgDraw.style.strokeDashoffset = length;

  const observer = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) {
      svgDraw.style.transition = 'stroke-dashoffset 2s ease 0.3s';
      svgDraw.style.strokeDashoffset = '0';
      observer.disconnect();
    }
  }, { threshold: 0.3 });

  observer.observe(svgDraw);
}

/**
 * Animate the nav logo hex SVG on page load.
 */
function initLogoAnimation() {
  document.querySelectorAll('.svg-hex').forEach(el => {
    const len = 200;
    el.style.strokeDasharray  = len;
    el.style.strokeDashoffset = len;
    el.style.transition = 'stroke-dashoffset 1.5s ease 0.5s';
    setTimeout(() => { el.style.strokeDashoffset = '0'; }, 100);
  });
}


/* ============================================================
   11. BACK TO TOP
   ============================================================ */

const backToTopBtn = document.getElementById('backToTop');

function handleBackToTop() {
  const visible = window.scrollY > 400;
  backToTopBtn.classList.toggle('visible', visible);
}

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

window.addEventListener('scroll', handleBackToTop, { passive: true });


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

    // Simple success feedback
    button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold)" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>`;
    input.value = 'Thank you for subscribing!';
    input.disabled = true;
    button.disabled = true;

    setTimeout(() => {
      input.value = '';
      input.disabled = false;
      button.disabled = false;
      button.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>`;
    }, 3000);
  });
}


/* ============================================================
   SMOOTH SCROLL — for nav links
   ============================================================ */

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const navHeight = navbar.offsetHeight;
        const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });
}


/* ============================================================
   MICRO-INTERACTIONS — Button ripple effect
   ============================================================ */

function initRippleEffect() {
  document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function (e) {
      const rect   = this.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement('span');
      ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255,255,255,0.2);
        width: 10px; height: 10px;
        left: ${x - 5}px; top: ${y - 5}px;
        pointer-events: none;
        transform: scale(0);
        animation: rippleAnim 0.6s ease-out forwards;
      `;

      // Inject keyframe if not already present
      if (!document.getElementById('ripple-style')) {
        const style = document.createElement('style');
        style.id = 'ripple-style';
        style.textContent = `
          @keyframes rippleAnim {
            to { transform: scale(30); opacity: 0; }
          }
        `;
        document.head.appendChild(style);
      }

      this.style.position = 'relative';
      this.style.overflow = 'hidden';
      this.appendChild(ripple);
      setTimeout(() => ripple.remove(), 600);
    });
  });
}


/* ============================================================
   CURSOR GLOW (decorative — desktop only)
   ============================================================ */

function initCursorGlow() {
  if (window.innerWidth < 1024 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const glow = document.createElement('div');
  glow.style.cssText = `
    position: fixed;
    width: 400px; height: 400px;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(200,169,126,0.04) 0%, transparent 70%);
    pointer-events: none;
    z-index: 9999;
    transform: translate(-50%, -50%);
    transition: left 0.15s ease, top 0.15s ease;
    will-change: left, top;
  `;
  document.body.appendChild(glow);

  document.addEventListener('mousemove', e => {
    glow.style.left = e.clientX + 'px';
    glow.style.top  = e.clientY + 'px';
  }, { passive: true });
}


/* ============================================================
   13. INIT — Run everything on DOM ready
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  // Core UI
  handleNavScroll();
  revealHeroContent();
  initSmoothScroll();
  initSearchTabs();

  // Properties
  renderProperties();
  initPropertyFilter();

  // Stats
  initStatsObserver();
  initStatBarsObserver();

  // Testimonials
  initTestimonials();

  // Scroll animations
  initScrollReveal();

  // SVG & Logo
  initSvgAnimations();
  initLogoAnimation();

  // Extras
  initNewsletter();
  initRippleEffect();
  initCursorGlow();

  // Trigger initial parallax
  handleCtaParallax();

  console.log('%cLuxEstate 🏛️ Loaded', 'color:#c8a97e;font-family:serif;font-size:16px;font-weight:bold;');
});
