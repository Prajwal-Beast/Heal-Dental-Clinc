function initNav() {
  window.addEventListener('scroll', () => {
    document.getElementById('nav').classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  const hamBtn = document.getElementById('hamBtn');
  const mobNav = document.getElementById('mobNav');
  hamBtn.addEventListener('click', () => {
    hamBtn.classList.toggle('open');
    mobNav.classList.toggle('open');
  });
  document.getElementById('mobClose').addEventListener('click', closeMob);
}

/* Global so onclick="closeMob()" in header.html works after fetch-inject */
function closeMob() {
  document.getElementById('hamBtn').classList.remove('open');
  document.getElementById('mobNav').classList.remove('open');
}
