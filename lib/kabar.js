// Tulisan contoh untuk halaman Kabar. Isi tiap tulisan berupa daftar blok sederhana supaya mudah dirender
// dan dijaga konsisten: p, h2, ul, ol, tabel (selalu berlabel contoh bila berisi angka).
import { ISI_TRAY } from './data';
import { ribu, desimal } from './format';

// Perbandingan dua penjual untuk tulisan "Arti ukuran telur": dihitung dari berat tengah rentang.
const penjual = [
  { nama: 'Penjual A', rentang: '58–62 g', tengah: 60, tray: 49000 },
  { nama: 'Penjual B', rentang: '55–60 g', tengah: 57.5, tray: 47000 },
].map((p) => ({
  ...p,
  perButir: Math.round(p.tray / ISI_TRAY),
  perKg: Math.round(p.tray / ((ISI_TRAY * p.tengah) / 1000)),
}));

// Hitungan kebutuhan katering: 80 kotak sehari, satu telur per kotak, enam hari masak.
const kotak = 80;
const hari = 6;
const butirMinggu = kotak * hari;
const cadangan = Math.ceil(butirMinggu * 0.05);
const totalButir = butirMinggu + cadangan;
const trayPerlu = Math.ceil(totalButir / ISI_TRAY);

export const tulisan = [
  {
    slug: 'cara-menyimpan-telur-di-warung',
    judul: 'Cara menyimpan telur di warung',
    metaJudul: 'Cara Menyimpan Telur di Warung',
    ringkas: 'Lima kebiasaan kecil supaya telur di warungmu lebih awet, tanpa perlu kulkas besar.',
    deskripsi: 'Lima kebiasaan kecil untuk menyimpan telur di warung: tempat teduh, jangan dicuci dulu, jauh dari bau, dan yang datang duluan dijual duluan.',
    tanggal: '2026-10-30',
    sampul: { gambar: '/images/tray-cokelat.webp', alt: 'Telur cokelat tertata di tray kardus', lebar: 1920, tinggi: 1280 },
    terkait: ['arti-ukuran-telur-di-daftar-harga'],
    isi: [
      { t: 'p', x: 'Telur yang baru datang sudah dipilah dan ditata di tray. Setelah itu, cara kamu menyimpannya di warung yang menentukan seberapa lama telur enak dijual.' },
      { t: 'h2', x: '1. Taruh di tempat sejuk dan teduh' },
      { t: 'p', x: 'Jauhkan tray dari kompor, penggorengan, dan sinar matahari langsung. Rak di bagian warung yang paling adem lebih baik daripada rak dekat pintu.' },
      { t: 'h2', x: '2. Biarkan telur tetap di tray' },
      { t: 'p', x: 'Di tray, telur berdiri dengan ujung runcing ke bawah. Itu posisi yang paling aman. Pindahkan ke wadah lain hanya kalau perlu.' },
      { t: 'h2', x: '3. Jangan dicuci sebelum disimpan' },
      { t: 'p', x: 'Cangkang punya lapisan tipis yang ikut menjaga isinya. Kalau cangkang kotor, lap kering dengan kain bersih. Cuci sebentar hanya sebelum dipakai.' },
      { t: 'h2', x: '4. Jauhkan dari bau menyengat' },
      { t: 'p', x: 'Cangkang telur punya pori-pori kecil, jadi telur bisa ikut berbau. Jangan taruh tray di dekat bawang, terasi, atau ikan asin.' },
      { t: 'h2', x: '5. Yang datang duluan, dijual duluan' },
      { t: 'p', x: 'Tulis hari antar di pinggir tray dengan spidol. Saat stok baru datang, taruh tray baru di belakang atau di bawah. Tray lama ada di depan dan laku lebih dulu.' },
      { t: 'h2', x: 'Cara cek telur yang sudah lama' },
      { t: 'p', x: 'Masukkan telur ke gelas berisi air. Telur yang masih baru berbaring di dasar. Telur yang berdiri sudah agak lama. Telur yang mengambang sebaiknya tidak dipakai. Kalau setelah dipecah baunya aneh, buang saja.' },
      { t: 'p', x: 'Satu lagi: jangan menimbun. Lebih baik pesan sedikit tapi sering, sesuai yang laku dalam beberapa hari.' },
    ],
  },
  {
    slug: 'arti-ukuran-telur-di-daftar-harga',
    judul: 'Arti ukuran telur di daftar harga',
    metaJudul: 'Arti Ukuran Telur di Daftar Harga',
    ringkas: 'Kecil, sedang, besar, jumbo: ukuran ditentukan dari berat. Begini cara membacanya supaya harga antarpenjual bisa dibandingkan.',
    deskripsi: 'Ukuran telur kecil, sedang, besar, dan jumbo ditentukan dari berat per butir. Pelajari cara membaca daftar harga dan membandingkan antarpenjual.',
    tanggal: '2026-10-22',
    sampul: { ilustrasi: 'penggaris', alt: 'Penggaris berat telur dari 45 sampai 70 gram dengan empat ukuran' },
    terkait: ['hitung-kebutuhan-telur-katering', 'cara-menyimpan-telur-di-warung'],
    isi: [
      { t: 'p', x: 'Di daftar harga, telur dibagi jadi kecil, sedang, besar, dan jumbo. Pembagian itu berdasarkan berat per butir, bukan tampilan cangkangnya.' },
      { t: 'h2', x: 'Ukuran di Pagi Kuning (contoh)' },
      {
        t: 'ul',
        items: ['Kecil: 45–52 g per butir', 'Sedang: 53–58 g per butir', 'Besar: 59–64 g per butir', 'Jumbo: 65 g ke atas per butir'],
      },
      { t: 'p', x: 'Ini pembagian contoh. Penjual lain bisa memakai batas yang berbeda, jadi “besar” di satu tempat belum tentu sama dengan “besar” di tempat lain.' },
      { t: 'h2', x: 'Cara membandingkan harga' },
      { t: 'p', x: 'Tanyakan rentang berat tiap ukuran. Lalu hitung harga per butir: harga tray dibagi 30. Kalau mau lebih teliti, hitung juga harga per kilo.' },
      {
        t: 'tabel',
        label: 'Contoh perhitungan, bukan penawaran harga',
        judul: 'Dua penjual, sama-sama menulis “besar”',
        kolom: ['', 'Berat per butir', 'Harga tray 30', 'Per butir', 'Per kilo'],
        baris: penjual.map((p) => [p.nama, p.rentang, `Rp ${ribu(p.tray)}`, `Rp ${ribu(p.perButir)}`, `Rp ${ribu(p.perKg)}`]),
        catatan: 'Berat dihitung dari tengah rentang (60 g dan 57,5 g).',
      },
      {
        t: 'p',
        x: `Penjual B terlihat lebih murah Rp ${ribu(penjual[0].tray - penjual[1].tray)} per tray. Tapi telurnya lebih ringan, jadi harga per kilonya hampir sama (selisih Rp ${ribu(Math.abs(penjual[1].perKg - penjual[0].perKg))}). Kalau hanya melihat harga tray, kamu bisa salah menilai.`,
      },
      { t: 'h2', x: 'Untuk toko kue: samakan ukuran' },
      { t: 'p', x: 'Resep kue sering menulis jumlah butir tanpa menyebut ukuran. Timbang satu telur yang biasa kamu pakai, lalu pesan ukuran yang beratnya paling dekat. Hasil adonan jadi lebih sama dari hari ke hari.' },
    ],
  },
  {
    slug: 'hitung-kebutuhan-telur-katering',
    judul: 'Hitung kebutuhan telur untuk katering',
    metaJudul: 'Hitung Kebutuhan Telur untuk Katering',
    ringkas: 'Cara menghitung berapa tray yang perlu dipesan tiap minggu, dengan contoh hitungan untuk nasi kotak.',
    deskripsi: 'Cara menghitung kebutuhan telur seminggu untuk katering: dari butir per porsi sampai jumlah tray, lengkap dengan contoh hitungan nasi kotak.',
    tanggal: '2026-10-08',
    sampul: { gambar: '/images/nasi-kuning.webp', alt: 'Nasi kuning dalam kotak dengan telur, timun, dan ayam goreng', lebar: 1200, tinggi: 1375, posisi: '50% 92%' },
    terkait: ['arti-ukuran-telur-di-daftar-harga'],
    isi: [
      { t: 'p', x: 'Pesan terlalu sedikit, dapur kehabisan. Pesan terlalu banyak, telur menumpuk. Hitungan sederhana ini membantu kamu menentukan jumlah tray.' },
      { t: 'h2', x: 'Rumusnya' },
      {
        t: 'ol',
        items: [
          'Butir per porsi dikali jumlah porsi sehari, hasilnya butir per hari.',
          'Kalikan dengan jumlah hari masak dalam seminggu.',
          'Tambah cadangan sekitar 5 persen untuk telur pecah atau pesanan tambahan.',
          'Bagi dengan 30, lalu bulatkan ke atas. Itu jumlah tray.',
        ],
      },
      { t: 'h2', x: 'Contoh hitungan: nasi kotak' },
      { t: 'p', x: `Menu nasi kuning dengan satu telur rebus per kotak. Dapur membuat ${kotak} kotak sehari, ${hari} hari seminggu.` },
      {
        t: 'tabel',
        label: 'Contoh hitungan',
        judul: 'Kebutuhan telur seminggu',
        kolom: ['Langkah', 'Hitungan', 'Hasil'],
        baris: [
          ['Butir per hari', `${kotak} kotak × 1 butir`, `${kotak} butir`],
          ['Butir seminggu', `${kotak} × ${hari} hari`, `${butirMinggu} butir`],
          ['Tambah cadangan 5%', `${butirMinggu} + ${cadangan}`, `${totalButir} butir`],
          ['Jumlah tray', `${totalButir} ÷ ${ISI_TRAY} = ${desimal(totalButir / ISI_TRAY)}`, `${trayPerlu} tray`],
        ],
      },
      { t: 'p', x: `Jadi dapur ini memesan ${trayPerlu} tray seminggu. Kalau satu peti berisi 6 tray, itu 2 peti ditambah 5 tray.` },
      { t: 'h2', x: 'Kalau satu porsi memakai setengah butir' },
      { t: 'p', x: 'Tulis saja 0,5 butir per porsi, lalu hitung dengan cara yang sama. Untuk menu yang memakai telur dadar iris, timbang dulu satu porsi supaya hitungannya pas.' },
      { t: 'h2', x: 'Atur jadwal kirim' },
      { t: 'p', x: 'Untuk katering, kirim dua kali seminggu lebih enak daripada sekali banyak. Telur datang lebih baru dan tempat simpan tidak penuh. Pesan sebelum jam 15.00 supaya telur dikirim besok pagi.' },
    ],
  },
];

export const cariTulisan = (slug) => tulisan.find((t) => t.slug === slug);
export const dataPenjual = penjual;
