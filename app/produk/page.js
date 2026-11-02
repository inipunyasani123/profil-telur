import Link from 'next/link';
import Foto from '@/components/Foto';
import Kop from '@/components/Kop';
import JsonLd from '@/components/JsonLd';
import TombolWA from '@/components/TombolWA';
import { Telur, Penggaris, Truk } from '@/components/Gambar';
import { ukuran, retak, kemasan, area, jam, site, PESAN } from '@/lib/data';
import { metaHalaman, jsonLdRemah } from '@/lib/seo';

export const metadata = metaHalaman({
  path: '/produk',
  judul: 'Telur Ayam: Ukuran, Kemasan, dan Cara Kirim',
  deskripsi:
    'Telur ayam Pagi Kuning dipilah jadi kecil, sedang, besar, dan jumbo, dikemas per tray 30 butir atau per peti 6 tray. Ada telur retak untuk usaha kue.',
});

const H2 = 'text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98]';

export default function Produk() {
  const [tray, peti] = kemasan;
  return (
    <>
      <JsonLd data={jsonLdRemah([{ nama: 'Beranda', path: '/' }, { nama: 'Produk', path: '/produk' }])} />
      <Kop
        label="Produk"
        judul="Telur ayam, dipilah per ukuran."
        pengantar="Empat ukuran, dua kemasan, dan telur retak untuk usaha kue. Diantar pagi hari atau boleh kamu ambil di gudang."
      />

      {/* Ukuran */}
      <section aria-labelledby="judul-ukuran" className="wadah py-14 lg:py-20">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <h2 id="judul-ukuran" className={`${H2} lg:col-span-7`}>
            Empat ukuran, ditimbang per butir
          </h2>
          <p className="max-w-md text-tinta-2 lg:col-span-5">
            Ukuran ditentukan dari berat, bukan dari tampilan cangkang. Ini pembagian milik {site.nama} (contoh). Penjual lain bisa memakai batas yang berbeda.
          </p>
        </div>
        <div className="baki mt-7">
          <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-12">
            <div className="lubang flex items-center justify-center p-3 sm:col-span-2 sm:p-6 lg:col-span-12">
              <Penggaris className="w-full max-w-[40rem]" />
            </div>
            {ukuran.map((u) => (
              <article key={u.id} id={u.id} className="lubang flex scroll-mt-24 flex-col lg:col-span-3">
                <div className="flex items-end justify-between gap-3">
                  <h3 className="text-[2.6rem] leading-none">{u.nama}</h3>
                  <Telur cap={u.huruf} className="h-[5.2rem] w-auto" />
                </div>
                <p className="data mt-3 text-tinta-2">{u.rentang} per butir</p>
                <p className="mb-4 mt-3 text-tinta-2">{u.pakai}</p>
                <p className="data mt-auto border-t-[1.5px] border-dashed border-tinta/35 pt-3 text-tinta-2">
                  Satu tray 30 butir: {u.beratTray}
                </p>
              </article>
            ))}
          </div>
        </div>
        <p className="mt-6 max-w-2xl text-tinta-2">
          Bingung membandingkan ukuran antarpenjual?{' '}
          <Link href="/kabar/arti-ukuran-telur-di-daftar-harga" className="tautan font-extrabold">
            Baca cara membaca daftar harga telur
          </Link>
          .
        </p>
      </section>

      {/* Kemasan */}
      <section aria-labelledby="judul-kemasan" className="bg-cangkang-tua/70">
        <div className="wadah py-14 lg:py-20">
          <h2 id="judul-kemasan" className={H2}>
            Kemasan: tray dan peti
          </h2>
          <div className="baki baki-karton mt-7">
            <div className="grid gap-2.5 md:grid-cols-12">
              <div className="lubang lubang-foto flex flex-col md:col-span-7">
                <div className="relative aspect-[3/2]">
                  <Foto src="/images/tray-cokelat.webp" alt="Telur cokelat tertata di tray karton" sizes="(min-width: 768px) 55vw, 100vw" posisi="50% 55%" />
                </div>
                <div className="bg-cangkang p-5 sm:p-6">
                  <p className="font-display text-[2.4rem] leading-none">
                    {tray.nama}: {tray.isi}
                  </p>
                  <p className="mt-2 max-w-md text-tinta-2">{tray.teks} Satu tray berisi satu ukuran saja.</p>
                </div>
              </div>
              <div className="lubang lubang-foto flex flex-col md:col-span-5">
                <div className="relative aspect-[4/3] md:aspect-auto md:min-h-[14rem] md:flex-1">
                  <Foto src="/images/tumpukan.webp" alt="Tumpukan tray berisi telur" sizes="(min-width: 768px) 40vw, 100vw" posisi="50% 45%" />
                </div>
                <div className="bg-kuning-muda p-5 sm:p-6">
                  <p className="font-display text-[2.4rem] leading-none">
                    {peti.nama}: {peti.isi}
                  </p>
                  <p className="mt-2 text-tinta-2">{peti.teks}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telur retak */}
      <section aria-labelledby="judul-retak" id="retak" className="wadah scroll-mt-24 py-14 lg:py-20">
        <div className="baki">
          <div className="grid gap-2.5 lg:grid-cols-12">
            <div className="lubang lubang-foto relative aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-[22rem]">
              <Foto src="/images/kuning.webp" alt="Kuning telur di dalam setengah cangkang di atas talenan kayu" sizes="(min-width: 1024px) 40vw, 100vw" posisi="35% 50%" />
            </div>
            <div className="lubang lg:col-span-7">
              <p className="label text-tinta-3">Untuk toko kue</p>
              <h2 id="judul-retak" className="mt-2 text-[clamp(2.2rem,4.2vw,3.2rem)] leading-[0.98]">
                {retak.nama}, harga lebih murah
              </h2>
              <p className="mt-4 max-w-xl text-tinta-2">
                Retak tipis: cangkang retak tetapi belum bocor. Cocok untuk usaha kue yang langsung memakai telur untuk adonan hari itu. Jumlahnya tergantung hasil pilah, jadi tanya dulu lewat WhatsApp.
              </p>
              <ul className="mt-5 space-y-2.5">
                {[
                  ['Pakai hari itu juga.', 'Jangan disimpan atau dijual lagi.'],
                  ['Pecahkan ke wadah bersih dulu.', 'Lalu masak sampai matang.'],
                ].map(([a, b]) => (
                  <li key={a} className="rounded-xl bg-cangkang-tua/70 px-4 py-3">
                    <span className="font-extrabold">{a}</span> <span className="text-tinta-2">{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Cara kirim */}
      <section aria-labelledby="judul-kirim" id="kirim" className="gelap scroll-mt-24 bg-tinta text-cangkang">
        <div className="wadah grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-5">
            <h2 id="judul-kirim" className={H2}>
              Cara kirim
            </h2>
            <div className="lubang mt-8 max-w-[26rem] p-4 sm:p-5">
              <Truk className="w-full" />
            </div>
          </div>
          <div className="lg:col-span-7">
            <ul className="border-t-2 border-cangkang/60">
              <li className="grid gap-1 border-b-2 border-cangkang/60 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <p className="font-display text-[1.9rem] leading-none">Diantar pagi</p>
                <p className="text-cangkang/90">
                  {area[0].nama}, {jam.hari}, pukul {jam.antar} WIB. Pesan minimal {area[0].minimum} tray.
                </p>
              </li>
              <li className="grid gap-1 border-b-2 border-cangkang/60 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <p className="font-display text-[1.9rem] leading-none">Ke luar kota</p>
                <p className="text-cangkang/90">
                  {area[1].nama}, hari {area[1].hari}. Pesan minimal {area[1].minimum} tray, boleh campur ukuran.
                </p>
              </li>
              <li className="grid gap-1 border-b-2 border-cangkang/60 py-5 sm:grid-cols-[13rem_1fr] sm:gap-6">
                <p className="font-display text-[1.9rem] leading-none">Ambil sendiri</p>
                <p className="text-cangkang/90">
                  Di gudang, {jam.hari}, pukul {jam.ambil} WIB. Bawa wadah atau minta tray karton.
                </p>
              </li>
            </ul>
            <p className="mt-6 max-w-xl text-cangkang/90">
              Cek jumlah dan kondisi tray saat telur tiba. Kalau ada yang pecah di jalan, foto lalu kirim lewat WhatsApp hari itu juga.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="judul-harga" className="wadah py-14 lg:py-20">
        <div className="baki">
          <div className="grid gap-2.5 lg:grid-cols-12">
            <div className="lubang lubang-kuning lg:col-span-7">
              <h2 id="judul-harga" className="text-[clamp(2rem,4vw,3rem)] leading-[1]">
                Sudah tahu ukuran yang kamu butuh?
              </h2>
              <p className="mt-3 max-w-lg text-tinta-2">Lihat harga contoh per ukuran, per tray, dan per peti.</p>
              <Link href="/harga" className="tombol tombol-tinta mt-6">
                Buka daftar harga
              </Link>
            </div>
            <div className="lubang lubang-gelap gelap flex flex-col justify-between gap-5 lg:col-span-5">
              <p className="font-display text-[clamp(1.8rem,3.2vw,2.4rem)] leading-[1.02]">Atau langsung tanya lewat WhatsApp.</p>
              <div>
                <TombolWA pesan={PESAN.harga} className="tombol tombol-kuning" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
