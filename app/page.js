import Link from 'next/link';
import Foto from '@/components/Foto';
import TombolWA from '@/components/TombolWA';
import JadwalHari from '@/components/JadwalHari';
import { Telur, CapMerek, Peta } from '@/components/Gambar';
import { ukuran, kemasan, pelanggan, area, jam, site, PESAN } from '@/lib/data';
import { tulisan } from '@/lib/kabar';
import { tanggalPanjang } from '@/lib/format';
import { metaHalaman } from '@/lib/seo';

export const metadata = metaHalaman({ path: '/', deskripsi: site.deskripsi });

// Telur makin besar dari kecil ke jumbo (digambar berlebihan supaya terlihat bedanya).
const TINGGI = ['h-[5rem] lg:h-[6.6rem]', 'h-[5.6rem] lg:h-[7.5rem]', 'h-[6.2rem] lg:h-[8.4rem]', 'h-[6.8rem] lg:h-[9.3rem]'];

export default function Beranda() {
  const petiTray = kemasan.find((k) => k.id === 'peti');
  const tray = kemasan.find((k) => k.id === 'tray');
  return (
    <>
      {/* 1. Baki pembuka: 6 x 5 = 30 sel */}
      <section aria-labelledby="judul-beranda" className="wadah pb-12 pt-5 lg:pb-16 lg:pt-8">
        <div className="baki">
          <div className="grid grid-cols-2 gap-2.5 lg:auto-rows-[minmax(7.5rem,auto)] lg:grid-cols-6">
            <div
              className="lubang lubang-bintik col-span-2 flex flex-col justify-between gap-7 p-6 sm:p-8 lg:col-span-4 lg:row-span-3 lg:p-10"
              style={{ '--kx': 4, '--ky': 3 }}
            >
              <p className="label text-tinta-2">Peternak dan agen telur ayam · Blitar</p>
              <div>
                <h1 id="judul-beranda" className="text-[clamp(2.7rem,6vw+0.5rem,4.6rem)] leading-[0.98]">
                  {site.tagline}
                </h1>
                <p className="mt-5 max-w-xl text-[1.1875rem] text-tinta-2">
                  Pesan sebelum jam {jam.batasPesan} lewat WhatsApp. Telur kami timbang, tata di tray, lalu antar pagi hari.
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <TombolWA pesan={PESAN.pesan} />
                <Link href="/harga" className="tombol tombol-garis">
                  Lihat daftar harga
                </Link>
              </div>
            </div>

            <div className="lubang lubang-foto relative col-span-2 aspect-[4/3] lg:col-span-2 lg:row-span-3 lg:aspect-auto">
              <Foto
                src="/images/tray-30.webp"
                alt="Telur ayam cokelat tertata rapi di tray karton"
                sizes="(min-width: 1024px) 28vw, 100vw"
                prioritas
                posisi="35% 50%"
              />
              <CapMerek className="absolute right-3 top-3 z-[2] w-[7.5rem] -rotate-6 lg:w-[8rem]" />
            </div>

            {ukuran.map((u, i) => (
              <Link
                key={u.id}
                href={`/produk#${u.id}`}
                className="lubang min-h-[13rem] flex-col justify-between p-4 lg:row-span-2 lg:p-5"
              >
                <span className="flex flex-1 items-end justify-center pb-3">
                  <Telur cap={u.huruf} className={`telur-angkat w-auto ${TINGGI[i]}`} />
                </span>
                <span>
                  <span className="block font-display text-[2rem] leading-none">{u.nama}</span>
                  <span className="data mt-1 block text-tinta-3">{u.rentang}</span>
                </span>
              </Link>
            ))}

            <div className="lubang lubang-gelap gelap col-span-2 flex flex-col justify-between gap-3 p-6 lg:col-span-2 lg:row-span-2 lg:p-7">
              <p className="label text-kuning-muda">Batas pesan untuk kirim besok</p>
              <p className="angka text-[clamp(4.5rem,11vw,6.6rem)] text-kuning">{jam.batasPesan}</p>
              <p className="text-cangkang/90">
                Diantar {jam.antar} WIB, {jam.hari.replace('–', ' sampai ')}. Pesan setelah jam ini, telur datang lusa.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Kemasan dan siapa yang memakai */}
      <section aria-labelledby="judul-kemasan" className="wadah pb-14 lg:pb-20">
        <div className="grid gap-4 lg:grid-cols-12 lg:items-end">
          <h2 id="judul-kemasan" className="text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98] lg:col-span-7">
            Satu tray 30 butir. Satu peti 6 tray.
          </h2>
          <p className="max-w-md text-tinta-2 lg:col-span-5">
            Telur dipilah per ukuran sebelum ditata, jadi satu tray berisi telur yang sama besar.
          </p>
        </div>
        <div className="baki baki-karton mt-7">
          <div className="grid grid-cols-2 gap-2.5 lg:auto-rows-[minmax(6.5rem,auto)] lg:grid-cols-6">
            <div className="lubang lubang-foto relative col-span-2 aspect-[16/10] lg:col-span-2 lg:row-span-4 lg:aspect-auto">
              <Foto src="/images/tumpukan.webp" alt="Tumpukan tray karton berisi telur ayam" sizes="(min-width: 1024px) 28vw, 100vw" posisi="50% 40%" />
              <p className="label absolute inset-x-3 bottom-4 z-[2] rounded-lg bg-cangkang px-3 py-2 text-tinta">
                Tray ditumpuk enam, jadi satu peti.
              </p>
            </div>

            <div className="lubang lubang-bintik col-span-1 flex flex-col justify-between gap-2 lg:col-span-2 lg:row-span-2" style={{ '--kx': 2, '--ky': 2 }}>
              <p className="label text-tinta-3">{tray.nama}</p>
              <div>
                <p className="angka text-[clamp(3.6rem,9vw,6rem)]">30</p>
                <p className="data text-tinta-2">butir per tray</p>
              </div>
              <p className="text-[1rem] leading-snug text-tinta-2">{tray.teks}</p>
            </div>
            <div className="lubang lubang-kuning col-span-1 flex flex-col justify-between gap-2 lg:col-span-2 lg:row-span-2">
              <p className="label text-tinta-2">{petiTray.nama}</p>
              <div>
                <p className="angka text-[clamp(3.6rem,9vw,6rem)]">180</p>
                <p className="data text-tinta-2">butir per peti</p>
              </div>
              <p className="text-[1rem] leading-snug text-tinta-2">{petiTray.teks}</p>
            </div>

            <div className="lubang col-span-2 lg:col-span-4 lg:row-span-2">
              <p className="label text-tinta-3">Untuk siapa</p>
              <ul className="mt-2">
                {pelanggan.map((p) => (
                  <li key={p.id} className="grid gap-x-6 gap-y-1 border-b-[1.5px] border-dashed border-tinta/35 py-3 last:border-b-0 sm:grid-cols-[9rem_1fr]">
                    <span className="font-display text-[1.9rem] leading-none">{p.nama}</span>
                    <span className="text-tinta-2">{p.isi}</span>
                  </li>
                ))}
              </ul>
              <Link href="/produk" className="tautan mt-1 inline-flex min-h-11 items-center font-extrabold">
                Lihat ukuran dan kemasan
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Jadwal sehari */}
      <section aria-labelledby="judul-jadwal" className="gelap bg-tinta text-cangkang">
        <div className="wadah grid gap-10 py-14 lg:grid-cols-12 lg:py-20">
          <div className="lg:col-span-4">
            <h2 id="judul-jadwal" className="text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98]">
              Pesan sore ini, telur datang besok pagi.
            </h2>
            <p className="mt-5 max-w-sm text-cangkang/90">
              Gudang buka {jam.buka}–{jam.tutup} WIB, {jam.hari.replace('–', ' sampai ')}. Tidak ada pengiriman hari Minggu, jadi pesanan Sabtu sore datang hari Senin.
            </p>
          </div>
          <div className="lg:col-span-8">
            <JadwalHari />
          </div>
        </div>
      </section>

      {/* 4. Area kirim dan harga */}
      <section aria-labelledby="judul-area" className="wadah py-14 lg:py-20">
        <h2 id="judul-area" className="max-w-3xl text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98]">
          Kami antar ke Blitar, Kediri, dan Tulungagung.
        </h2>
        <div className="baki mt-7">
          <div className="grid gap-2.5 lg:grid-cols-12">
            <div className="lubang flex items-center justify-center p-3 sm:p-5 lg:col-span-6 lg:row-span-2">
              <Peta className="w-full max-w-[34rem]" />
            </div>
            <div className="lubang lg:col-span-6">
              <p className="label text-tinta-3">Pesanan minimum dan hari kirim</p>
              <ul className="mt-2">
                {area.map((a) => (
                  <li key={a.id} className="border-b-[1.5px] border-dashed border-tinta/35 py-3 last:border-b-0">
                    <p className="font-display text-[1.8rem] leading-none">{a.nama}</p>
                    <p className="data mt-2 text-tinta-2">
                      Minimal {a.minimum} tray · {a.hari}
                    </p>
                    <p className="mt-1 text-tinta-2">{a.catatan}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className="lubang lubang-kuning flex flex-col justify-between gap-5 lg:col-span-6">
              <p className="max-w-md text-[1.0625rem]">Harga telur berubah tiap hari. Harga terbaru dikirim tiap pagi lewat WhatsApp.</p>
              <div className="flex flex-wrap gap-3">
                <Link href="/harga" className="tombol tombol-tinta">
                  Lihat daftar harga contoh
                </Link>
                <Link href="/kontak" className="tombol tombol-garis">
                  Tulis pesanan
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Kabar */}
      <section aria-labelledby="judul-kabar" className="wadah pb-14 lg:pb-20">
        <div className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <h2 id="judul-kabar" className="text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98]">
              Catatan untuk warung dan dapurmu
            </h2>
            <Link href="/kabar" className="tautan mt-5 inline-flex min-h-11 items-center font-extrabold">
              Semua tulisan
            </Link>
          </div>
          <ul className="lg:col-span-8">
            {tulisan.map((t) => (
              <li key={t.slug} className="relative border-t-2 border-tinta py-6 last:border-b-2">
                <time dateTime={t.tanggal} className="data text-tinta-3">
                  {tanggalPanjang(t.tanggal)}
                </time>
                <h3 className="mt-2 text-[clamp(1.8rem,3.2vw,2.5rem)] leading-[1.02]">
                  <Link href={`/kabar/${t.slug}`} className="tautan-penuh no-underline hover:underline">
                    {t.judul}
                  </Link>
                </h3>
                <p className="mt-2 max-w-2xl text-tinta-2">{t.ringkas}</p>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 6. Ajakan pesan */}
      <section aria-labelledby="judul-pesan" className="kop-baki">
        <div className="wadah grid gap-6 py-14 lg:grid-cols-12 lg:items-center lg:py-20">
          <div className="lg:col-span-8">
            <h2 id="judul-pesan" className="text-[clamp(2.4rem,5.4vw,4.2rem)] leading-[0.98]">
              Mau pesan untuk besok pagi?
            </h2>
            <p className="mt-4 max-w-xl text-[1.1875rem]">
              Kirim pesananmu lewat WhatsApp sebelum jam {jam.batasPesan}, atau susun dulu di halaman Kontak.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
            <TombolWA pesan={PESAN.pesan} />
            <Link href="/kontak" className="tombol tombol-garis">
              Susun pesanan
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
