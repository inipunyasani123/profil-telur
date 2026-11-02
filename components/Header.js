import Link from 'next/link';
import Navigasi from './Navigasi';
import { Logo } from './Gambar';
import { site } from '@/lib/data';

export default function Header() {
  return (
    <header className="sticky top-0 z-40 border-b-[0.35rem] border-kuning bg-latar">
      <div className="wadah flex min-h-[4.25rem] items-center justify-between gap-3 py-2">
        <Link href="/" className="flex items-center gap-2.5 rounded-lg py-1 no-underline" aria-label={`${site.nama}, ke beranda`}>
          <Logo className="h-9 w-auto" />
          <span className="font-display text-[1.8rem] leading-none">{site.nama}</span>
        </Link>
        <Navigasi />
      </div>
    </header>
  );
}
