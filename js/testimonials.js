function initTestimonials() {
  new Swiper('.testimonials-swiper', {
    slidesPerView: 1,
    spaceBetween: 24,
    loop: true,
    autoplay: { delay: 3500, disableOnInteraction: false },
    pagination: { el: '.testimonials-pagination', clickable: true },
    breakpoints: {
      768:  { slidesPerView: 2 },
      1024: { slidesPerView: 3 }
    }
  });
}
