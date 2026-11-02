// Sumber tunggal fakta usaha Pagi Kuning (usaha rekaan). Semua halaman, JSON-LD, dan formulir membaca dari sini,
// supaya jam, area kirim, dan angka contoh tidak pernah berbeda antarhalaman.

export const site = {
  nama: 'Pagi Kuning',
  url: 'https://profil-telur.pintuweb.id',
  judul: 'Pagi Kuning: Telur Ayam Grosir dari Blitar',
  deskripsi:
    'Pagi Kuning menjual telur ayam per tray dan per peti untuk warung, toko kue, dan katering di Blitar. Pesan lewat WhatsApp sebelum jam 15.00.',
  tagline: 'Telur dari Blitar, sampai di warungmu besok pagi.',
  alamat: { jalan: 'Jl. Pagi Raya No. 9 (alamat contoh)', kota: 'Blitar', provinsi: 'Jawa Timur' },
};

// Jam kerja dan jadwal. Semua dalam WIB.
export const jam = {
  hari: 'Senin–Sabtu',
  buka: '05.00',
  tutup: '16.00',
  batasPesan: '15.00',
  antar: '06.00–10.00',
  ambil: '06.00–15.00',
};

export const MENU = [
  { href: '/', label: 'Beranda' },
  { href: '/profil', label: 'Profil' },
  { href: '/produk', label: 'Produk' },
  { href: '/harga', label: 'Harga' },
  { href: '/kabar', label: 'Kabar' },
  { href: '/kontak', label: 'Kontak' },
];

export const ISI_TRAY = 30;
export const TRAY_PER_PETI = 6;
export const POTONGAN_PETI_PER_TRAY = 1000;

// Pembagian ukuran milik Pagi Kuning (contoh). Penjual lain boleh membagi dengan batas berbeda.
// tray = harga contoh per tray 30 butir; ubah = perubahan contoh dibanding kemarin (Rp per tray).
export const ukuran = [
  {
    id: 'kecil',
    huruf: 'K',
    nama: 'Kecil',
    rentang: '45–52 g',
    tray: 41000,
    ubah: 0,
    pakai: 'Telur dadar, nasi goreng, dan gorengan.',
    beratTray: '±1,5 kg',
  },
  {
    id: 'sedang',
    huruf: 'S',
    nama: 'Sedang',
    rentang: '53–58 g',
    tray: 45000,
    ubah: 500,
    pakai: 'Serbaguna: dijual lagi di warung dan untuk masakan sehari-hari.',
    beratTray: '±1,7 kg',
  },
  {
    id: 'besar',
    huruf: 'B',
    nama: 'Besar',
    rentang: '59–64 g',
    tray: 49000,
    ubah: 500,
    pakai: 'Biasa dipilih toko kue untuk adonan.',
    beratTray: '±1,8 kg',
  },
  {
    id: 'jumbo',
    huruf: 'J',
    nama: 'Jumbo',
    rentang: '65 g ke atas',
    tray: 54000,
    ubah: -500,
    pakai: 'Martabak, kue besar, dan katering yang ingin porsi telur jelas.',
    beratTray: '±2 kg',
  },
];

export const retak = {
  id: 'retak',
  nama: 'Telur retak',
  rentang: 'campur ukuran',
  tray: 36000,
  ubah: -1000,
  pakai: 'Retak tipis, cangkang masih menutup. Untuk adonan yang langsung dimasak hari itu juga.',
};

export const SEMUA_HARGA = [...ukuran, retak];

export const hargaPeti = (u) => (u.tray - POTONGAN_PETI_PER_TRAY) * TRAY_PER_PETI;
export const hargaButir = (u) => Math.round(u.tray / ISI_TRAY);

// Area kirim dan pesanan minimum (satu sumber untuk /harga, /produk, /kontak, dan JSON-LD).
export const area = [
  { id: 'blitar', nama: 'Kota dan Kabupaten Blitar', hari: 'Senin–Sabtu', minimum: 1, catatan: 'Diantar pagi hari.' },
  { id: 'sekitar', nama: 'Kediri dan Tulungagung', hari: 'Selasa, Kamis, Sabtu', minimum: 5, catatan: 'Boleh campur ukuran.' },
];

// Untuk formulir: tiga pilihan tujuan.
export const tujuan = [
  { id: 'blitar', nama: 'Kota atau Kabupaten Blitar', minimum: 1, hari: 'Senin–Sabtu' },
  { id: 'kediri', nama: 'Kediri', minimum: 5, hari: 'Selasa, Kamis, Sabtu' },
  { id: 'tulungagung', nama: 'Tulungagung', minimum: 5, hari: 'Selasa, Kamis, Sabtu' },
];

export const NAMA_AREA_SCHEMA = [
  { '@type': 'City', name: 'Kota Blitar' },
  { '@type': 'AdministrativeArea', name: 'Kabupaten Blitar' },
  { '@type': 'City', name: 'Kediri' },
  { '@type': 'City', name: 'Tulungagung' },
];

// Jadwal harian (jam desimal, WIB) untuk bagan di beranda.
export const jadwal = [
  { id: 'pesan', nama: 'Pesanan untuk besok masuk', ket: '05.00–15.00', mulai: 5, selesai: 15 },
  { id: 'muat', nama: 'Muat ke kendaraan', ket: '05.00–06.00', mulai: 5, selesai: 6 },
  { id: 'antar', nama: 'Antar ke pelanggan', ket: '06.00–10.00', mulai: 6, selesai: 10 },
  { id: 'ambil', nama: 'Ambil sendiri di gudang', ket: '06.00–15.00', mulai: 6, selesai: 15 },
  { id: 'pilah', nama: 'Timbang, pilah, dan tata di tray', ket: '13.00–16.00', mulai: 13, selesai: 16 },
];

export const kemasan = [
  { id: 'tray', nama: 'Tray', isi: '30 butir', teks: 'Tray karton, satu ukuran per tray. Pas untuk warung kecil dan toko kue.' },
  { id: 'peti', nama: 'Peti', isi: '6 tray, 180 butir', teks: 'Enam tray ditumpuk dalam satu peti. Pas untuk katering dan warung yang ramai.' },
];

// Cerita proses di halaman Profil, dari kandang sampai pelanggan.
export const proses = [
  { judul: 'Dikumpulkan', isi: 'Telur diambil dari kandang pagi dan sore, lalu dibawa ke gudang di Blitar.' },
  { judul: 'Ditimbang dan dipilah', isi: 'Tiap butir masuk ke satu ukuran: kecil, sedang, besar, atau jumbo. Yang retak dipisah.' },
  { judul: 'Ditata di tray', isi: 'Satu tray berisi 30 butir dengan ukuran yang sama, jadi hitunganmu mudah.' },
  { judul: 'Dikemas', isi: 'Tray ditumpuk dalam peti, enam tray per peti, lalu diikat supaya tidak bergeser.' },
  { judul: 'Diantar', isi: 'Diantar pagi hari ke warung, toko kue, atau dapur katering. Boleh juga diambil sendiri di gudang.' },
];

export const prinsip = [
  { judul: 'Ukuran ditimbang', isi: 'Rentang berat tiap ukuran tertulis di daftar harga, jadi kamu tahu apa yang kamu beli.' },
  { judul: 'Harga ditulis jelas', isi: 'Harga per tray, per butir, dan per peti ditulis berdampingan. Diperbarui tiap pagi lewat WhatsApp.' },
  { judul: 'Datang pagi', isi: 'Telur diantar pukul 06.00–10.00, sebelum warung dan dapurmu ramai.' },
];

export const pelanggan = [
  { id: 'warung', nama: 'Warung', isi: 'Ukuran sedang cukup untuk telur dadar dan nasi goreng. Pesan mulai 1 tray.' },
  { id: 'kue', nama: 'Toko kue', isi: 'Pilih satu ukuran supaya adonan dari hari ke hari sama. Telur retak murah untuk adonan hari itu.' },
  { id: 'katering', nama: 'Katering', isi: 'Kirim dua kali seminggu. Kamu cukup bilang jumlah kotak, kami bantu hitung jumlah traynya.' },
];

export const jenisUsaha = ['Warung', 'Toko kue', 'Katering', 'Lainnya'];

export const caraTerima = ['Diantar', 'Ambil sendiri di gudang'];

// WhatsApp tanpa nomor: situs ini demo, jadi pengunjung memilih sendiri tujuan pesannya.
export const wa = (teks) => `https://wa.me/?text=${encodeURIComponent(teks)}`;

export const PESAN = {
  pesan: 'Halo Pagi Kuning, saya mau pesan telur untuk dikirim besok.',
  harga: 'Halo Pagi Kuning, saya mau tanya harga telur hari ini.',
  umum: 'Halo Pagi Kuning, saya mau tanya soal telur.',
};
