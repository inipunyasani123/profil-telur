'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { MENU } from '@/lib/data';
import TombolWA from './TombolWA';

export default function Navigasi() {
  const path = usePathname();
  const [buka, setBuka] = useState(false);
  const tombol = useRef(null);

  // Menu HP menutup sendiri setelah pindah halaman dan saat tombol Escape ditekan.
  useEffect(() => {
    setBuka(false);
  }, [path]);
  useEffect(() => {
    if (!buka) return undefined;
    const tekan = (e) => {
      if (e.key === 'Escape') {
        setBuka(false);
        tombol.current?.focus();
      }
    };
    document.addEventListener('keydown', tekan);
    return () => document.removeEventListener('keydown', tekan);
  }, [buka]);

  const aktif = (href) => (href === '/' ? path === '/' : path === href || path.startsWith(`${href}/`));

  return (
    <>
      <nav aria-label="Menu utama" className="hidden lg:block">
        <ul className="flex items-center gap-1">
          {MENU.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                aria-current={aktif(m.href) ? 'page' : undefined}
                className="inline-flex min-h-11 items-center px-3 text-[1.0625rem] font-extrabold no-underline"
              >
                <span className="sorot">{m.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <button
        ref={tombol}
        type="button"
        className="tombol tombol-tinta !min-h-11 !px-4 lg:hidden"
        aria-expanded={buka}
        aria-controls="menu-hp"
        onClick={() => setBuka((v) => !v)}
      >
        <span>{buka ? 'Tutup' : 'Menu'}</span>
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round">
          {buka ? <path d="M6 6l12 12M18 6 6 18" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
        </svg>
      </button>

      <nav
        id="menu-hp"
        aria-label="Menu utama"
        hidden={!buka}
        className="absolute inset-x-0 top-full border-b-[0.35rem] border-kuning-tua bg-kuning p-3 lg:hidden"
      >
        <ul className="grid grid-cols-2 gap-2.5">
          {MENU.map((m) => (
            <li key={m.href}>
              <Link
                href={m.href}
                aria-current={aktif(m.href) ? 'page' : undefined}
                className="flex min-h-[3.75rem] items-center rounded-2xl bg-cangkang px-4 font-display text-[1.9rem] leading-none no-underline aria-[current=page]:bg-tinta aria-[current=page]:text-kuning"
              >
                {m.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-3">
          <TombolWA className="tombol tombol-tinta w-full" />
        </div>
      </nav>
    </>
  );
}
