function initTestimonials() {
  document.querySelectorAll('.review-card').forEach(card => {
    const stars = card.querySelectorAll('.review-stars');
    ScrollTrigger.create({
      trigger: card, start: 'top 90%', once: true,
      onEnter: () => {
        gsap.from(stars, { scale: 0, opacity: 0, duration: 0.5, ease: 'back.out(2)', stagger: 0.05 });
      }
    });
  });
}
