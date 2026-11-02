import Link from 'next/link';
import Kop from '@/components/Kop';
import Sampul from '@/components/Sampul';
import JsonLd from '@/components/JsonLd';
import { tulisan } from '@/lib/kabar';
import { tanggalPanjang } from '@/lib/format';
import { metaHalaman, jsonLdRemah } from '@/lib/seo';

export const metadata = metaHalaman({
  path: '/kabar',
  judul: 'Kabar: Tulisan untuk Warung dan Dapur',
  deskripsi: 'Catatan singkat dari Pagi Kuning soal menyimpan telur di warung, membaca ukuran di daftar harga, dan menghitung kebutuhan telur katering.',
});

function Judul({ t, besar }) {
  return (
    <h2 className={`${besar ? 'text-[clamp(2.2rem,4.2vw,3.4rem)]' : 'text-[clamp(1.9rem,3vw,2.5rem)]'} leading-[1]`}>
      <Link href={`/kabar/${t.slug}`} className="tautan-penuh no-underline hover:underline">
        {t.judul}
      </Link>
    </h2>
  );
}

export default function Kabar() {
  const [utama, ...lain] = tulisan;
  return (
    <>
      <JsonLd data={jsonLdRemah([{ nama: 'Beranda', path: '/' }, { nama: 'Kabar', path: '/kabar' }])} />
      <Kop
        label="Kabar"
        judul="Tulisan untuk warung dan dapur."
        pengantar="Catatan pendek soal menyimpan telur, membaca ukuran, dan menghitung kebutuhan."
      />
      <section aria-label="Daftar tulisan" className="wadah py-12 lg:py-16">
        <div className="baki">
          <div className="grid gap-2.5 md:grid-cols-12">
            <article className="lubang relative grid gap-5 p-4 sm:p-5 md:col-span-12 md:grid-cols-12 md:items-center md:gap-8">
              <div className="md:col-span-7">
                <Sampul t={utama} prioritas sizes="(min-width: 768px) 55vw, 100vw" />
              </div>
              <div className="flex flex-col gap-4 md:col-span-5">
                <time dateTime={utama.tanggal} className="data text-tinta-3">
                  {tanggalPanjang(utama.tanggal)}
                </time>
                <Judul t={utama} besar />
                <p className="text-tinta-2">{utama.ringkas}</p>
                <span aria-hidden="true" className="font-extrabold">
                  Baca tulisan →
                </span>
              </div>
            </article>
            {lain.map((t) => (
              <article key={t.slug} className="lubang relative flex flex-col gap-4 p-4 sm:p-5 md:col-span-6">
                <Sampul t={t} sizes="(min-width: 768px) 45vw, 100vw" />
                <time dateTime={t.tanggal} className="data text-tinta-3">
                  {tanggalPanjang(t.tanggal)}
                </time>
                <Judul t={t} />
                <p className="text-tinta-2">{t.ringkas}</p>
                <span aria-hidden="true" className="mt-auto font-extrabold">
                  Baca tulisan →
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
