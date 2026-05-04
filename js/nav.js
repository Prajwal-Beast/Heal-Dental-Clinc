function initNav() {
  const nav = document.getElementById('nav');

  window.addEventListener('scroll', () => {
    nav.classList.toggle('scrolled', window.scrollY > 60);
  }, { passive: true });

  document.getElementById('hamBtn').addEventListener('click', () => {
    document.getElementById('hamBtn').classList.toggle('open');
    document.getElementById('mobNav').classList.toggle('open');
    document.body.style.overflow =
      document.getElementById('mobNav').classList.contains('open') ? 'hidden' : '';
  });

  document.getElementById('mobClose').addEventListener('click', closeMob);
}

function closeMob() {
  document.getElementById('hamBtn').classList.remove('open');
  document.getElementById('mobNav').classList.remove('open');
  document.body.style.overflow = '';
}
