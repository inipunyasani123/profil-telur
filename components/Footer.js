import Link from 'next/link';
import { Logo } from './Gambar';
import TombolWA from './TombolWA';
import { MENU, site, jam } from '@/lib/data';

export default function Footer() {
  return (
    <footer className="gelap mt-0 bg-tinta text-cangkang">
      <div className="wadah grid gap-10 py-12 lg:grid-cols-12 lg:py-16">
        <div className="lg:col-span-5">
          <Link href="/" className="inline-flex items-center gap-3 no-underline" aria-label={`${site.nama}, ke beranda`}>
            <Logo className="h-11 w-auto" />
            <span className="font-display text-[2.4rem] leading-none">{site.nama}</span>
          </Link>
          <p className="mt-4 max-w-sm text-cangkang/85">Telur ayam per tray dan per peti untuk warung, toko kue, dan katering di Blitar.</p>
          <div className="mt-6">
            <TombolWA className="tombol tombol-kuning" />
          </div>
        </div>

        <nav aria-label="Halaman situs" className="lg:col-span-3">
          <p className="label text-kuning-muda">Halaman</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-4 lg:grid-cols-1">
            {MENU.map((m) => (
              <li key={m.href}>
                <Link href={m.href} className="inline-flex min-h-11 items-center font-bold no-underline hover:text-kuning">
                  {m.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="lg:col-span-4">
          <p className="label text-kuning-muda">Gudang dan jam kerja</p>
          <p className="mt-3 text-cangkang/90">
            {site.alamat.jalan}
            <br />
            {site.alamat.kota}, {site.alamat.provinsi}
          </p>
          <p className="mt-3 text-cangkang/90">
            {jam.hari}, {jam.buka}–{jam.tutup} WIB
          </p>
          <p className="mt-3 text-cangkang/90">Kirim ke Blitar, Kediri, dan Tulungagung.</p>
        </div>
      </div>
      <div className="border-t border-cangkang/20">
        <p className="wadah label py-5 text-cangkang/80">Alamat dan harga di situs ini hanya contoh.</p>
      </div>
    </footer>
  );
}
