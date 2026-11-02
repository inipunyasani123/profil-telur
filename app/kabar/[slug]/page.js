import Link from 'next/link';
import { notFound } from 'next/navigation';
import Kop from '@/components/Kop';
import Sampul from '@/components/Sampul';
import JsonLd from '@/components/JsonLd';
import TombolWA from '@/components/TombolWA';
import { tulisan, cariTulisan } from '@/lib/kabar';
import { tanggalPanjang } from '@/lib/format';
import { ogHalaman, jsonLdRemah, jsonLdTulisan } from '@/lib/seo';
import { PESAN } from '@/lib/data';

export function generateStaticParams() {
  return tulisan.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const t = cariTulisan(slug);
  if (!t) return {};
  const path = `/kabar/${t.slug}`;
  return {
    title: t.metaJudul,
    description: t.deskripsi,
    alternates: { canonical: path },
    ...ogHalaman({ path, judul: t.metaJudul, deskripsi: t.deskripsi, tipe: 'article', tambahan: { publishedTime: t.tanggal } }),
  };
}

// Satu blok isi tulisan. Tabel berangka selalu diberi label contoh di atasnya.
function Blok({ b }) {
  switch (b.t) {
    case 'p':
      return <p>{b.x}</p>;
    case 'h2':
      return <h2>{b.x}</h2>;
    case 'ul':
      return (
        <ul>
          {b.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol>
          {b.items.map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ol>
      );
    case 'tabel':
      return (
        <figure className="lubang !my-8 !p-4 text-tinta sm:!p-6">
          <p className="cap-label text-[0.875rem]">{b.label}</p>
          <figcaption className="mt-4 font-display text-[1.7rem] leading-none">{b.judul}</figcaption>
          {b.kolom.length > 3 && <p className="data mt-2 text-tinta-3 sm:hidden">Geser tabel ke samping untuk melihat semua kolom.</p>}
          <div className="mt-3 overflow-x-auto" tabIndex={0} role="region" aria-label={`Tabel: ${b.judul}`}>
            <table className="tabel-nota">
              <thead>
                <tr>
                  {b.kolom.map((k, i) => (
                    <th key={i} scope="col" className={i > 0 ? 'angka-kolom' : undefined}>
                      {k || <span className="sr-only">Nama</span>}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {b.baris.map((r) => (
                  <tr key={r[0]}>
                    {r.map((c, i) =>
                      i === 0 ? (
                        <th key={i} scope="row">
                          {c}
                        </th>
                      ) : (
                        <td key={i} className="angka-kolom">
                          {c}
                        </td>
                      ),
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {b.catatan && <p className="data mt-3 text-tinta-2">{b.catatan}</p>}
        </figure>
      );
    default:
      return null;
  }
}

export default async function Tulisan({ params }) {
  const { slug } = await params;
  const t = cariTulisan(slug);
  if (!t) notFound();
  const terkait = t.terkait.map(cariTulisan).filter(Boolean);
  return (
    <>
      <JsonLd data={jsonLdRemah([{ nama: 'Beranda', path: '/' }, { nama: 'Kabar', path: '/kabar' }, { nama: t.judul, path: `/kabar/${t.slug}` }])} />
      <JsonLd data={jsonLdTulisan(t)} />
      <Kop label={`Kabar · ${tanggalPanjang(t.tanggal)}`} judul={t.judul} pengantar={t.ringkas} />
      <article className="wadah grid gap-10 py-12 lg:grid-cols-12 lg:gap-14 lg:py-16">
        <div className="lg:col-span-8">
          <div className="baki !p-2.5 sm:!p-3">
            <Sampul t={t} prioritas sizes="(min-width: 1024px) 60vw, 100vw" className="!rounded-[1.1rem]" />
          </div>
          <div className="prosa mt-9 max-w-[42rem]">
            {t.isi.map((b, i) => (
              <Blok key={i} b={b} />
            ))}
          </div>
        </div>
        <aside aria-label="Tulisan lain dan pesan" className="space-y-4 lg:col-span-4 lg:self-start lg:sticky lg:top-24">
          <div className="lubang lubang-gelap gelap">
            <p className="font-display text-[1.9rem] leading-[1.02]">Mau pesan telur untuk besok?</p>
            <p className="mt-2 text-cangkang/90">Kirim pesananmu lewat WhatsApp sebelum jam 15.00.</p>
            <div className="mt-5">
              <TombolWA pesan={PESAN.pesan} className="tombol tombol-kuning" />
            </div>
          </div>
          {terkait.length > 0 && (
            <div className="rounded-[1.25rem] border-2 border-tinta p-5">
              <p className="label text-tinta-3">Tulisan lain</p>
              <ul className="mt-2">
                {terkait.map((r) => (
                  <li key={r.slug} className="border-b-[1.5px] border-dashed border-tinta/35 py-3 last:border-b-0">
                    <Link href={`/kabar/${r.slug}`} className="font-display text-[1.6rem] leading-[1.05] no-underline hover:underline">
                      {r.judul}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <Link href="/kabar" className="tautan inline-flex min-h-11 items-center font-extrabold">
            Semua tulisan
          </Link>
        </aside>
      </article>
    </>
  );
}
