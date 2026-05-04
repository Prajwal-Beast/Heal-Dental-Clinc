function initTestimonials() {
  /* Staggered star reveal on scroll for each review card */
  const cards = document.querySelectorAll('.review-card');
  if (!cards.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const stars = entry.target.querySelectorAll('.star');
      stars.forEach((star, i) => {
        setTimeout(() => star.classList.add('visible'), i * 80);
      });
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.3 });

  cards.forEach(card => observer.observe(card));
}
