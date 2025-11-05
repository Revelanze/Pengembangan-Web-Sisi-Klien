document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('cash-register-form');
  const priceInput = document.getElementById('item-price');
  const qtyInput = document.getElementById('item-quantity');
  const resultEl = document.getElementById('result');

  // Konfigurasi diskon: setiap threshold mendapat diskon tetap
  const DISCOUNT_THRESHOLD = 100000; // Rp 100.000
  const DISCOUNT_PER_THRESHOLD = 5000; // Rp 5.000 per 100.000 (ubah sesuai kebutuhan)

  const fmt = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(n);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const price = parseFloat(priceInput.value) || 0;
    const qty = parseInt(qtyInput.value) || 0;

    if (price <= 0 || qty <= 0) {
      resultEl.innerHTML = '<div class="small">Masukkan harga dan jumlah yang valid.</div>';
      return;
    }

    const subtotal = price * qty;
    const thresholds = Math.floor(subtotal / DISCOUNT_THRESHOLD);
    const discount = thresholds * DISCOUNT_PER_THRESHOLD;
    const total = Math.max(0, subtotal - discount);

    resultEl.innerHTML = `
      <div><strong>Subtotal:</strong> ${fmt(subtotal)}</div>
      <div><strong>Diskon:</strong> ${fmt(discount)} <span class="small">(Rp ${DISCOUNT_PER_THRESHOLD} untuk setiap Rp ${DISCOUNT_THRESHOLD})</span></div>
      <div><strong>Total yang harus dibayar:</strong> ${fmt(total)}</div>
    `;
  });
});