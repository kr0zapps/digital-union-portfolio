/* =============================================
   DIGITAL UNION — Main JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- 1. Scroll Reveal (IntersectionObserver) ---------- */
  const revealElements = document.querySelectorAll(
    '.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right'
  );
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ---------- 2. Navbar Background on Scroll ---------- */
  const navbar = document.getElementById('navbar');
  if (navbar) {
    window.addEventListener('scroll', () => {
      navbar.classList.toggle('navbar-scrolled', window.scrollY > 50);
    }, { passive: true });
  }

  /* ---------- 3. Mobile Menu Toggle ---------- */
  const menuBtn    = document.getElementById('menu-btn');
  const closeBtn   = document.getElementById('close-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => mobileMenu.classList.add('open'));
    closeBtn.addEventListener('click', () => mobileMenu.classList.remove('open'));
    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => mobileMenu.classList.remove('open'));
    });
  }

  /* ---------- 4. FAQ Accordion ---------- */
  document.querySelectorAll('.faq-item').forEach(item => {
    const trigger = item.querySelector('.faq-trigger');
    if (!trigger) return;
    trigger.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close all
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
      // Open clicked if it was closed
      if (!isActive) item.classList.add('active');
    });
  });

  /* ---------- 5. Stats Counter Animation ---------- */
  const statNumbers = document.querySelectorAll('.stat-number');
  const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      const prefix = el.getAttribute('data-prefix') || '';
      const duration = 2000;
      const start = performance.now();

      function animate(now) {
        const elapsed = now - start;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out cubic
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(eased * target);
        el.textContent = prefix + current.toLocaleString('es-CL') + suffix;
        if (progress < 1) requestAnimationFrame(animate);
      }
      requestAnimationFrame(animate);
      statsObserver.unobserve(el);
    });
  }, { threshold: 0.5 });

  statNumbers.forEach(el => statsObserver.observe(el));

  /* ---------- 6. Terminal Typing Animation ---------- */
  const terminalLines = document.querySelectorAll('.terminal-line');
  let lineDelay = 0;
  terminalLines.forEach((line, i) => {
    const text = line.getAttribute('data-text') || '';
    line.textContent = '';
    const charDelay = 30;
    lineDelay += i === 0 ? 500 : text.length * charDelay + 600;

    setTimeout(() => {
      let charIndex = 0;
      const interval = setInterval(() => {
        if (charIndex < text.length) {
          line.textContent += text[charIndex];
          charIndex++;
        } else {
          clearInterval(interval);
        }
      }, charDelay);
    }, lineDelay);
  });

  /* ---------- 7. Smooth Scroll for Anchor Links ---------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      e.preventDefault();
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ---------- 8. Testimonial Carousel ---------- */
  const track = document.getElementById('testimonial-track');
  const prevBtn = document.getElementById('testimonial-prev');
  const nextBtn = document.getElementById('testimonial-next');
  const dots = document.querySelectorAll('.testimonial-dot');
  let currentSlide = 0;
  const totalSlides = dots.length || 3;

  function goToSlide(index) {
    currentSlide = ((index % totalSlides) + totalSlides) % totalSlides;
    if (track) track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((d, i) => {
      d.classList.toggle('bg-brand-celeste', i === currentSlide);
      d.classList.toggle('bg-brand-white/30', i !== currentSlide);
    });
  }

  if (prevBtn) prevBtn.addEventListener('click', () => goToSlide(currentSlide - 1));
  if (nextBtn) nextBtn.addEventListener('click', () => goToSlide(currentSlide + 1));
  dots.forEach((dot, i) => dot.addEventListener('click', () => goToSlide(i)));

  // Auto-play
  setInterval(() => goToSlide(currentSlide + 1), 6000);

  /* ---------- 9. Active Nav Link Highlight ---------- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) current = section.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.toggle('text-brand-celeste',
        link.getAttribute('href') === '#' + current);
    });
  }, { passive: true });

});
