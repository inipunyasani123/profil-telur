import Link from 'next/link';
import { TelurPecah } from '@/components/Gambar';
import TombolWA from '@/components/TombolWA';

export const metadata = {
  title: 'Halaman tidak ditemukan',
  robots: { index: false, follow: true },
};

export default function TidakDitemukan() {
  return (
    <section className="kop-baki">
      <div className="wadah grid gap-8 py-14 lg:grid-cols-12 lg:items-center lg:py-20">
        <div className="lg:col-span-7">
          <p className="label text-tinta-2">404</p>
          <h1 className="mt-3 text-[clamp(2.9rem,7.5vw,5.2rem)] leading-[0.95]">Telurnya jatuh, halamannya tidak ketemu.</h1>
          <p className="mt-5 max-w-xl text-[1.1875rem]">Alamat yang kamu buka tidak ada, atau sudah pindah. Mulai lagi dari beranda atau lihat daftar harga.</p>
          <div className="mt-7 flex flex-wrap gap-3">
            <Link href="/" className="tombol tombol-tinta">
              Ke beranda
            </Link>
            <Link href="/harga" className="tombol tombol-garis">
              Daftar harga
            </Link>
            <TombolWA className="tombol tombol-garis">Tanya lewat WhatsApp</TombolWA>
          </div>
        </div>
        <div className="lg:col-span-5">
          <div className="lubang mx-auto max-w-sm p-6">
            <TelurPecah className="mx-auto w-full max-w-[16rem]" />
          </div>
        </div>
      </div>
    </section>
  );
}
