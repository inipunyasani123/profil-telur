import Kop from '@/components/Kop';
import FormPesan from '@/components/FormPesan';
import JsonLd from '@/components/JsonLd';
import TombolWA from '@/components/TombolWA';
import { Peta } from '@/components/Gambar';
import { site, jam, area, PESAN } from '@/lib/data';
import { metaHalaman, jsonLdRemah } from '@/lib/seo';

export const metadata = metaHalaman({
  path: '/kontak',
  judul: 'Kontak dan Pesan Telur Lewat WhatsApp',
  deskripsi: 'Susun pesanan telur ayam Pagi Kuning di formulir ini, lalu kirim lewat WhatsApp. Lihat juga jam kerja, alamat gudang contoh, dan area kirim.',
});

export default function Kontak() {
  return (
    <>
      <JsonLd data={jsonLdRemah([{ nama: 'Beranda', path: '/' }, { nama: 'Kontak', path: '/kontak' }])} />
      <Kop
        label="Kontak"
        judul="Pesan telur, tinggal tulis."
        pengantar={`Isi formulir ini, lalu kirim lewat WhatsApp. Kami membalas pada jam kerja, ${jam.buka}–${jam.tutup} WIB.`}
      />

      <section aria-labelledby="judul-form" className="wadah py-12 lg:py-16">
        <h2 id="judul-form" className="sr-only">
          Formulir pesanan
        </h2>
        <div className="baki">
          <FormPesan />
        </div>
      </section>

      <section aria-labelledby="judul-gudang" className="bg-cangkang-tua/70">
        <div className="wadah py-14 lg:py-20">
          <h2 id="judul-gudang" className="text-[clamp(2.2rem,4.6vw,3.6rem)] leading-[0.98]">
            Gudang dan jam kerja
          </h2>
          <div className="baki baki-karton mt-7">
            <div className="grid gap-2.5 lg:grid-cols-12">
              <div className="lubang flex items-center justify-center p-3 sm:p-5 lg:col-span-6 lg:row-span-2">
                <Peta className="w-full max-w-[34rem]" />
              </div>
              <div className="lubang lg:col-span-6">
                <p className="label text-tinta-3">Alamat gudang</p>
                <p className="mt-2 font-display text-[1.9rem] leading-[1.05]">
                  {site.alamat.jalan}
                  <br />
                  {site.alamat.kota}, {site.alamat.provinsi}
                </p>
                <p className="mt-3 text-tinta-2">Alamat ini contoh. Ambil sendiri di gudang pukul {jam.ambil} WIB.</p>
              </div>
              <div className="lubang lubang-kuning lg:col-span-3">
                <p className="label text-tinta-2">Jam kerja</p>
                <p className="mt-2 font-display text-[1.9rem] leading-[1.05]">
                  {jam.hari}
                  <br />
                  {jam.buka}–{jam.tutup} WIB
                </p>
                <p className="mt-2 text-tinta-2">Minggu libur.</p>
              </div>
              <div className="lubang lubang-gelap gelap flex flex-col justify-between gap-4 lg:col-span-3">
                <p className="label text-kuning-muda">Batas pesan</p>
                <p className="angka text-[3.6rem] text-kuning">{jam.batasPesan}</p>
                <p className="text-[0.9375rem] text-cangkang/90">Untuk kirim besok pagi.</p>
              </div>
              <div className="lubang lg:col-span-12">
                <p className="label text-tinta-3">Area kirim</p>
                <ul className="mt-2 grid gap-x-10 lg:grid-cols-2">
                  {area.map((a) => (
                    <li key={a.id} className="border-b-[1.5px] border-dashed border-tinta/35 py-3 last:border-b-0 lg:border-b-0">
                      <p className="font-display text-[1.8rem] leading-none">{a.nama}</p>
                      <p className="data mt-2 text-tinta-2">
                        {a.hari} · minimal {a.minimum} tray
                      </p>
                    </li>
                  ))}
                </ul>
                <div className="mt-4">
                  <TombolWA pesan={PESAN.umum} className="tombol tombol-tinta">
                    Tanya lewat WhatsApp
                  </TombolWA>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
