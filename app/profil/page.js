import Foto from '@/components/Foto';
import Kop from '@/components/Kop';
import JsonLd from '@/components/JsonLd';
import TombolWA from '@/components/TombolWA';
import { Baki30, Telur } from '@/components/Gambar';
import { proses, prinsip } from '@/lib/data';
import { metaHalaman, jsonLdRemah } from '@/lib/seo';

export const metadata = metaHalaman({
  path: '/profil',
  judul: 'Profil Usaha Telur Ayam di Blitar',
  deskripsi:
    'Kenali cara kerja Pagi Kuning: telur dikumpulkan, ditimbang, ditata di tray, dikemas, lalu diantar pagi hari ke warung, toko kue, dan katering.',
});

const LANGKAH = [
  { judul: 'Tulis pesananmu', isi: 'Lewat WhatsApp atau formulir di halaman Kontak: ukuran, jumlah tray, dan alamat kirim.' },
  { judul: 'Kami balas', isi: 'Kami cek jumlah dan hari kirim, lalu kabari kamu lewat WhatsApp.' },
  { judul: 'Telur datang', isi: 'Cek jumlah tray saat telur tiba. Bayar saat terima atau lewat transfer.' },
];

export default function Profil() {
  return (
    <>
      <JsonLd data={jsonLdRemah([{ nama: 'Beranda', path: '/' }, { nama: 'Profil', path: '/profil' }])} />
      <Kop
        label="Profil"
        judul="Telur ditimbang, bukan ditebak."
        pengantar="Pagi Kuning adalah usaha telur ayam di Blitar. Kami menyiapkan telur untuk warung, toko kue, dan katering."
        samping={
          <div className="lubang mx-auto max-w-[20rem] p-3 lg:mx-0 lg:ml-auto">
            <Baki30 animasi kosong={[4, 17, 25]} cap={{ 7: 'K', 10: 'S', 19: 'B', 28: 'J' }} className="h-auto w-full" />
          </div>
        }
      />

      <section aria-labelledby="judul-proses" className="wadah grid gap-10 py-14 lg:grid-cols-12 lg:gap-12 lg:py-20">
        <div className="lg:col-span-6">
          <h2 id="judul-proses" className="text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98]">
            Dari kandang sampai tray
          </h2>
          <ol className="relative mt-9 before:absolute before:bottom-6 before:left-[1.3rem] before:top-4 before:w-1.5 before:rounded before:bg-kuning">
            {proses.map((p) => (
              <li key={p.judul} className="relative pb-8 pl-[4.25rem] last:pb-0">
                <Telur nada="kuning" className="absolute left-0 top-0 h-[3.1rem] w-auto" />
                <h3 className="text-[2rem] leading-none">{p.judul}</h3>
                <p className="mt-2 max-w-md text-tinta-2">{p.isi}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="lg:col-span-6">
          <div className="baki">
            <div className="grid grid-cols-2 gap-2.5">
              <figure className="lubang lubang-foto relative col-span-2 aspect-[16/9]">
                <Foto src="/images/kandang.webp" alt="Lorong panjang di dalam kandang ayam petelur" sizes="(min-width: 1024px) 45vw, 100vw" posisi="50% 55%" />
                <figcaption className="label absolute bottom-3 left-3 z-[2] rounded-lg bg-cangkang px-2.5 py-1.5">Kandang ayam petelur</figcaption>
              </figure>
              <figure className="lubang lubang-foto relative aspect-[4/5]">
                <Foto src="/images/ayam.webp" alt="Beberapa ayam cokelat di halaman kandang" sizes="(min-width: 1024px) 22vw, 50vw" posisi="50% 40%" />
              </figure>
              <div className="lubang lubang-kuning flex flex-col justify-between gap-4">
                <p className="label text-tinta-2">Gudang di Blitar</p>
                <p className="font-display text-[clamp(1.8rem,3.4vw,2.4rem)] leading-[1.02]">Telur masuk pagi dan sore, keluar sudah dalam tray.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="judul-pegang" className="bg-cangkang-tua/70">
        <div className="wadah py-14 lg:py-20">
          <h2 id="judul-pegang" className="text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98]">
            Yang kami pegang
          </h2>
          <ul className="mt-9 border-t-2 border-tinta">
            {prinsip.map((p) => (
              <li key={p.judul} className="grid gap-3 border-b-2 border-tinta py-7 lg:grid-cols-12 lg:items-end lg:gap-8">
                <h3 className="text-[clamp(2.3rem,5vw,3.8rem)] leading-none lg:col-span-6">{p.judul}</h3>
                <p className="max-w-xl text-[1.1875rem] text-tinta-2 lg:col-span-6">{p.isi}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section aria-labelledby="judul-pesan" className="wadah py-14 lg:py-20">
        <div className="baki">
          <div className="grid gap-2.5 lg:grid-cols-12">
            <div className="lubang lg:col-span-7">
              <h2 id="judul-pesan" className="text-[clamp(2.2rem,4.6vw,3.2rem)] leading-[0.98]">
                Cara pesan
              </h2>
              <ul className="mt-4">
                {LANGKAH.map((l) => (
                  <li key={l.judul} className="grid gap-x-6 gap-y-1 border-b-[1.5px] border-dashed border-tinta/35 py-3.5 last:border-b-0 sm:grid-cols-[10rem_1fr]">
                    <span className="font-display text-[1.8rem] leading-none">{l.judul}</span>
                    <span className="text-tinta-2">{l.isi}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lubang lubang-gelap gelap flex flex-col justify-between gap-6 lg:col-span-5">
              <p className="font-display text-[clamp(2rem,3.6vw,2.8rem)] leading-[1.02]">Mulai dari satu tray.</p>
              <div className="flex flex-wrap gap-3">
                <TombolWA className="tombol tombol-kuning" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
