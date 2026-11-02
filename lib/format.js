// Format angka gaya Indonesia tanpa bergantung pada data locale ICU: ribuan dengan titik, desimal dengan koma.

export function ribu(n) {
  const s = String(Math.round(Math.abs(n)));
  return (n < 0 ? '-' : '') + s.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

export const rp = (n) => `Rp ${ribu(n)}`;

export function desimal(n, digit = 1) {
  return n.toFixed(digit).replace('.', ',');
}

const BULAN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

// "2026-10-08" -> "8 Oktober 2026" (tanpa zona waktu, supaya server dan browser sama)
export function tanggalPanjang(iso) {
  const [y, m, d] = iso.split('-').map(Number);
  return `${d} ${BULAN[m - 1]} ${y}`;
}
