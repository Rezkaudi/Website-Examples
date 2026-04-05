/* ============================================
   JSOMS Premium Redesign - Advanced Animations
   GSAP + ScrollTrigger + Custom Interactions
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // =============================================
  // 1. PAGE LOADER ANIMATION
  // =============================================
  const loader = document.getElementById('pageLoader');
  window.addEventListener('load', () => {
    setTimeout(() => {
      loader.classList.add('loaded');
      // Trigger entrance animations after loader fades
      setTimeout(initAnimations, 400);
    }, 800);
  });

  // Fallback: remove loader after 3s max
  setTimeout(() => {
    loader.classList.add('loaded');
    setTimeout(initAnimations, 400);
  }, 3000);

  // =============================================
  // 2. STICKY HEADER WITH SHRINK EFFECT
  // =============================================
  const header = document.getElementById('siteHeader');
  let lastScrollY = 0;

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    if (scrollY > 80) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    lastScrollY = scrollY;
  }, { passive: true });

  // =============================================
  // 3. MOBILE NAVIGATION
  // =============================================
  const navToggle = document.getElementById('navToggle');
  const mainNav = document.getElementById('mainNav');
  const navOverlay = document.getElementById('navOverlay');

  function toggleNav() {
    mainNav.classList.toggle('open');
    navOverlay.classList.toggle('open');
    document.body.style.overflow = mainNav.classList.contains('open') ? 'hidden' : '';
  }

  navToggle.addEventListener('click', toggleNav);
  navOverlay.addEventListener('click', toggleNav);

  // =============================================
  // 4. HERO SLIDER WITH AUTO-PLAY
  // =============================================
  const slides = document.querySelectorAll('.hero-slide');
  const dotsContainer = document.getElementById('sliderDots');
  const prevBtn = document.getElementById('sliderPrev');
  const nextBtn = document.getElementById('sliderNext');
  let currentSlide = 0;
  let slideInterval;

  // Create dots
  if (slides.length > 0 && dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('slider-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(i));
      dotsContainer.appendChild(dot);
    });
  }

  function goToSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    const dots = document.querySelectorAll('.slider-dot');
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = index;
    if (slides[currentSlide]) slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide((currentSlide + 1) % slides.length);
  }

  function prevSlide() {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
  }

  if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetAutoSlide(); });
  if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetAutoSlide(); });

  function startAutoSlide() {
    slideInterval = setInterval(nextSlide, 5000);
  }

  function resetAutoSlide() {
    clearInterval(slideInterval);
    startAutoSlide();
  }

  if (slides.length > 1) startAutoSlide();

  // =============================================
  // 5. NEWS TABS
  // =============================================
  const tabs = document.querySelectorAll('.news-tab');
  const panels = document.querySelectorAll('.news-panel');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;

      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      panels.forEach(p => {
        p.classList.remove('active');
        if (p.dataset.panel === target) {
          p.classList.add('active');
          // Animate new panel items
          const items = p.querySelectorAll('.news-item');
          if (typeof gsap !== 'undefined') {
            gsap.fromTo(items,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.4, stagger: 0.06, ease: 'power2.out' }
            );
          }
        }
      });
    });
  });

  // =============================================
  // 6. SCROLL TO TOP BUTTON
  // =============================================
  const scrollTopBtn = document.getElementById('scrollTop');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 600) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  }, { passive: true });

  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // =============================================
  // 7. FLOATING PARTICLES IN HERO
  // =============================================
  const particlesContainer = document.getElementById('particles');

  function createParticles() {
    if (!particlesContainer) return;
    for (let i = 0; i < 30; i++) {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      particle.style.left = Math.random() * 100 + '%';
      particle.style.top = Math.random() * 100 + '%';
      particle.style.width = (Math.random() * 4 + 2) + 'px';
      particle.style.height = particle.style.width;
      particle.style.opacity = Math.random() * 0.3 + 0.1;
      particlesContainer.appendChild(particle);

      // Animate each particle with GSAP if available
      if (typeof gsap !== 'undefined') {
        gsap.to(particle, {
          y: -100 - Math.random() * 200,
          x: (Math.random() - 0.5) * 100,
          opacity: 0,
          duration: 4 + Math.random() * 6,
          repeat: -1,
          delay: Math.random() * 5,
          ease: 'none'
        });
      }
    }
  }

  createParticles();

  // =============================================
  // 8. HERO BACKGROUND SHAPE PARALLAX
  // =============================================
  function heroParallax() {
    if (typeof gsap === 'undefined') return;

    const shapes = document.querySelectorAll('.hero-shape');
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;

      shapes.forEach((shape, i) => {
        const speed = (i + 1) * 15;
        gsap.to(shape, {
          x: x * speed,
          y: y * speed,
          duration: 1.5,
          ease: 'power2.out'
        });
      });
    });
  }

  heroParallax();

  // =============================================
  // 9. GSAP SCROLL-TRIGGERED REVEAL ANIMATIONS
  // =============================================
  function initAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') {
      // Fallback: just show everything
      document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale').forEach(el => {
        el.style.opacity = '1';
        el.style.transform = 'none';
      });
      return;
    }

    gsap.registerPlugin(ScrollTrigger);

    // --- Hero text entrance sequence ---
    const heroReveals = document.querySelectorAll('.hero-text .reveal');
    gsap.fromTo(heroReveals,
      { opacity: 0, y: 40 },
      {
        opacity: 1, y: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out'
      }
    );

    // --- Hero slider entrance ---
    const heroSlider = document.querySelector('.hero-slider.reveal-scale');
    if (heroSlider) {
      gsap.fromTo(heroSlider,
        { opacity: 0, scale: 0.85, rotateY: -5 },
        {
          opacity: 1, scale: 1, rotateY: 0,
          duration: 1.2,
          delay: 0.6,
          ease: 'power3.out'
        }
      );
    }

    // --- General scroll reveals ---
    const scrollReveals = document.querySelectorAll('#categories .reveal, #news .reveal');
    scrollReveals.forEach(el => {
      gsap.fromTo(el,
        { opacity: 0, y: 40 },
        {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --- Category cards staggered entrance ---
    const cards = document.querySelectorAll('.category-card');
    cards.forEach((card, i) => {
      gsap.fromTo(card,
        { opacity: 0, y: 60, rotateX: 8 },
        {
          opacity: 1, y: 0, rotateX: 0,
          duration: 0.8,
          delay: i * 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 88%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --- News items staggered reveal ---
    const newsItems = document.querySelectorAll('.news-panel.active .news-item');
    gsap.fromTo(newsItems,
      { opacity: 0, x: -30 },
      {
        opacity: 1, x: 0,
        duration: 0.5,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '#news',
          start: 'top 75%',
          toggleActions: 'play none none none'
        }
      }
    );

    // --- Section divider shimmer parallax ---
    const dividers = document.querySelectorAll('.section-divider');
    dividers.forEach(div => {
      gsap.fromTo(div,
        { scaleX: 0 },
        {
          scaleX: 1,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: div,
            start: 'top 90%',
            toggleActions: 'play none none none'
          }
        }
      );
    });

    // --- Footer reveal ---
    const footerCols = document.querySelectorAll('.footer-top > div');
    gsap.fromTo(footerCols,
      { opacity: 0, y: 30 },
      {
        opacity: 1, y: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: '.site-footer',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    );
  }

  // =============================================
  // 10. CATEGORY CARD 3D TILT EFFECT
  // =============================================
  const categoryCards = document.querySelectorAll('.category-card');

  categoryCards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = (y - centerY) / centerY * -3;
      const rotateY = (x - centerX) / centerX * 3;

      card.style.transform = `translateY(-8px) perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) perspective(1000px) rotateX(0) rotateY(0)';
      card.style.transition = 'transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)';
    });

    card.addEventListener('mouseenter', () => {
      card.style.transition = 'transform 0.1s ease-out';
    });
  });

  // =============================================
  // 11. SMOOTH LINK SCROLLING FOR ANCHOR LINKS
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', (e) => {
      const target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // =============================================
  // 12. NAV LINKS ACTIVE STATE ON SCROLL
  // =============================================
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveNav() {
    const scrollY = window.scrollY + 200;
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollY >= top && scrollY < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') && link.getAttribute('href').includes(id)) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav, { passive: true });

});
