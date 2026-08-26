
document.addEventListener('DOMContentLoaded', () => {
  // Intersection Observer for scroll animations
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // FAQ Accordion
  const faqs = document.querySelectorAll('.faq-item');
  faqs.forEach(faq => {
    const btn = faq.querySelector('.faq-q');
    btn.addEventListener('click', () => {
      const isActive = faq.classList.contains('active');
      faqs.forEach(f => {
        f.classList.remove('active');
        f.querySelector('span').textContent = '+';
      });
      if (!isActive) {
        faq.classList.add('active');
        btn.querySelector('span').textContent = '-';
      }
    });
  });
});
