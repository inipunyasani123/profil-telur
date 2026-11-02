import Link from 'next/link';
import Kop from '@/components/Kop';
import JsonLd from '@/components/JsonLd';
import TombolWA from '@/components/TombolWA';
import { Telur, Baki30 } from '@/components/Gambar';
import {
  ukuran,
  retak,
  area,
  jam,
  ISI_TRAY,
  TRAY_PER_PETI,
  POTONGAN_PETI_PER_TRAY,
  hargaPeti,
  hargaButir,
  PESAN,
} from '@/lib/data';
import { rp, ribu } from '@/lib/format';
import { metaHalaman, jsonLdRemah } from '@/lib/seo';

export const metadata = metaHalaman({
  path: '/harga',
  judul: 'Daftar Harga Telur Ayam per Tray dan Peti',
  deskripsi:
    'Contoh daftar harga telur ayam Pagi Kuning per ukuran, per tray 30 butir, dan per peti. Contoh harga, bukan harga pasar. Harga terbaru lewat WhatsApp.',
});

const LABEL = 'Contoh harga, bukan harga pasar';

// Tanda naik, turun, atau tetap: bentuk dan kata, bukan hanya warna.
function Ubah({ n }) {
  const naik = n > 0;
  const turun = n < 0;
  const warna = naik ? 'text-naik' : turun ? 'text-turun' : 'text-tinta-2';
  const kata = naik ? `naik Rp ${ribu(n)}` : turun ? `turun Rp ${ribu(-n)}` : 'sama';
  return (
    <p className={`data inline-flex items-center gap-2 font-bold ${warna}`}>
      <svg viewBox="0 0 16 16" className="h-4 w-4 shrink-0" aria-hidden="true" focusable="false" fill="currentColor">
        {naik && <path d="M8 2 15 14H1Z" />}
        {turun && <path d="M8 14 1 2h14Z" />}
        {!naik && !turun && <path d="M2 5h12v2.4H2Zm0 3.8h12v2.4H2Z" />}
      </svg>
      <span>
        {kata} dari kemarin (contoh)
      </span>
    </p>
  );
}

function Harga({ nilai, satuan }) {
  return (
    <div>
      <p className="flex items-baseline gap-1.5">
        <span className="font-display text-[1.7rem] leading-none">Rp</span>
        <span className="angka text-[clamp(3.2rem,5.4vw,4.2rem)]">{ribu(nilai)}</span>
      </p>
      <p className="data mt-1.5 text-tinta-2">{satuan}</p>
    </div>
  );
}

export default function HalamanHarga() {
  return (
    <>
      <JsonLd data={jsonLdRemah([{ nama: 'Beranda', path: '/' }, { nama: 'Daftar Harga', path: '/harga' }])} />
      <Kop
        label="Papan harga contoh"
        judul="Daftar harga"
        pengantar="Harga telur berubah tiap hari. Angka di bawah hanya contoh, supaya kamu paham cara membacanya."
        samping={
          <p className="cap-label text-[1rem] lg:ml-auto lg:max-w-[18rem]">
            {LABEL}
          </p>
        }
      />

      <section aria-label="Papan harga contoh" className="wadah py-12 lg:py-16">
        <div className="baki">
          <div className="grid grid-cols-1 gap-2.5 lg:auto-rows-[minmax(8.25rem,auto)] lg:grid-cols-6">
            {ukuran.map((u) => (
              <article key={u.id} className="lubang lubang-bintik flex flex-col gap-4 lg:col-span-2 lg:row-span-2" style={{ '--kx': 2, '--ky': 2 }}>
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h2 className="text-[2.6rem] leading-none">{u.nama}</h2>
                    <p className="data mt-1.5 text-tinta-2">{u.rentang} per butir</p>
                  </div>
                  <Telur cap={u.huruf} className="h-[4.6rem] w-auto shrink-0" />
                </div>
                <Harga nilai={u.tray} satuan={`per tray, isi ${ISI_TRAY} butir (harga contoh)`} />
                <Ubah n={u.ubah} />
                <dl className="mt-auto grid grid-cols-[1fr_auto] gap-x-4 gap-y-1.5 border-t-[1.5px] border-dashed border-tinta/35 pt-3">
                  <dt className="data text-tinta-2">Per butir</dt>
                  <dd className="data text-right font-bold">{rp(hargaButir(u))}</dd>
                  <dt className="data text-tinta-2">Per peti ({TRAY_PER_PETI} tray)</dt>
                  <dd className="data text-right font-bold">{rp(hargaPeti(u))}</dd>
                </dl>
              </article>
            ))}

            <article className="lubang lubang-gelap gelap flex flex-col justify-between gap-5 max-lg:order-first lg:col-span-2 lg:col-start-5 lg:row-span-2 lg:row-start-1">
              <h2 className="label text-kuning-muda">Batas pesan untuk kirim besok</h2>
              <p className="flex items-end gap-2">
                <span className="angka text-[clamp(5rem,9vw,6.8rem)] text-kuning">{jam.batasPesan}</span>
                <span className="data pb-2 text-cangkang/90">WIB</span>
              </p>
              <ul className="space-y-2 text-cangkang/95">
                <li>Pesan sebelum jam ini, telur diantar besok pagi pukul {jam.antar}.</li>
                <li>Pesan setelah jam ini, telur datang lusa.</li>
                <li>Tidak ada kirim hari Minggu: pesanan Sabtu sore datang hari Senin.</li>
              </ul>
            </article>

            <article className="lubang lg:col-span-2 lg:row-span-2">
              <h2 className="text-[2.2rem] leading-none">Minimal pesan dan area kirim</h2>
              <ul className="mt-3">
                {area.map((a) => (
                  <li key={a.id} className="border-b-[1.5px] border-dashed border-tinta/35 py-3">
                    <p className="font-extrabold leading-tight">{a.nama}</p>
                    <p className="data mt-1 text-tinta-2">
                      minimal {a.minimum} tray · {a.hari}
                    </p>
                  </li>
                ))}
                <li className="py-3">
                  <p className="font-extrabold leading-tight">Ambil sendiri di gudang</p>
                  <p className="data mt-1 text-tinta-2">
                    minimal 1 tray · {jam.ambil} WIB
                  </p>
                </li>
              </ul>
            </article>

            <article className="lubang flex flex-col justify-between gap-3 lg:col-span-2">
              <div>
                <h2 className="text-[2rem] leading-none">{retak.nama}</h2>
                <p className="data mt-1 text-tinta-2">{retak.rentang}</p>
              </div>
              <Harga nilai={retak.tray} satuan="per tray (harga contoh)" />
              <Ubah n={retak.ubah} />
            </article>

            <article className="lubang lubang-kuning flex flex-col justify-between gap-3 lg:col-span-2">
              <div className="flex items-start justify-between gap-3">
                <h2 className="text-[2rem] leading-none">Tray dan peti</h2>
                <Baki30 className="h-auto w-[7.25rem] shrink-0" cap={{ 8: 'S' }} />
              </div>
              <p className="text-tinta-2">
                1 tray = {ISI_TRAY} butir. 1 peti = {TRAY_PER_PETI} tray = {ISI_TRAY * TRAY_PER_PETI} butir. Harga peti sudah dipotong {rp(POTONGAN_PETI_PER_TRAY)} per tray (contoh).
              </p>
            </article>

            <article className="lubang lubang-gelap gelap flex flex-col justify-between gap-4 lg:col-span-2">
              <h2 className="text-[1.8rem] leading-[1.02]">Harga diperbarui tiap pagi lewat WhatsApp.</h2>
              <div>
                <TombolWA pesan={PESAN.harga} className="tombol tombol-kuning">
                  Tanya harga hari ini
                </TombolWA>
              </div>
            </article>
          </div>
          <p className="px-2 pb-1 pt-3.5 font-bold text-tinta">
            {LABEL}. Harga diperbarui tiap pagi lewat WhatsApp.
          </p>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <h2 className="text-[clamp(2rem,3.6vw,2.8rem)] leading-[1]">Cara membaca daftar ini</h2>
          </div>
          <ul className="space-y-3 text-[1.0625rem] text-tinta-2 lg:col-span-6">
            <li>Harga per butir adalah harga per tray dibagi {ISI_TRAY}.</li>
            <li>Ukuran berbeda berarti berat berbeda. Bandingkan antarpenjual lewat harga per kilo, bukan hanya harga per tray.</li>
            <li>
              <Link href="/kabar/arti-ukuran-telur-di-daftar-harga" className="tautan font-extrabold">
                Baca contoh hitungannya
              </Link>
              .
            </li>
          </ul>
        </div>
      </section>
    </>
  );
}
