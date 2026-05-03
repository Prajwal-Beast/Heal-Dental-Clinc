function initContact() {
  document.getElementById('bookForm').addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('.f-submit');
    btn.textContent = "Request Received — We'll Be in Touch Soon";
    btn.style.cssText = 'background:#2E7D32;color:#fff;cursor:default;width:100%;border:none;font-family:var(--sans);font-size:10px;letter-spacing:0.26em;text-transform:uppercase;font-weight:600;padding:18px 32px;border-radius:999px;';
    btn.disabled = true;
  });
}
