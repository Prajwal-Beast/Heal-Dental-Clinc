function initContact() {
  if (document.getElementById('apptDate')) {
    flatpickr('#apptDate', {
      minDate: 'today',
      dateFormat: 'D, d M Y',
      disableMobile: true
    });
  }

  const form = document.getElementById('bookingForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('[type="submit"]');
    btn.textContent = 'Request Received — We’ll be in touch soon';
    btn.style.background = 'var(--leaf)';
    btn.style.borderColor = 'var(--leaf)';
    btn.style.cursor = 'default';
    btn.disabled = true;
  });
}
