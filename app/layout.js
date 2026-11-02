import './globals.css';
import { Passion_One, Karla, Spline_Sans_Mono } from 'next/font/google';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import JsonLd from '@/components/JsonLd';
import { site } from '@/lib/data';
import { jsonLdUsaha, OG_ALT } from '@/lib/seo';

const passion = Passion_One({ weight: ['400', '900'], subsets: ['latin'], variable: '--font-passion', display: 'swap' });
const karla = Karla({ subsets: ['latin'], variable: '--font-karla', display: 'swap' });
const spline = Spline_Sans_Mono({ subsets: ['latin'], variable: '--font-spline', display: 'swap' });

export const metadata = {
  metadataBase: new URL(site.url),
  title: { default: site.judul, template: `%s · ${site.nama}` },
  description: site.deskripsi,
  applicationName: site.nama,
  authors: [{ name: 'PintuWeb', url: 'https://www.pintuweb.id' }],
  creator: 'PintuWeb',
  publisher: 'PintuWeb',
  openGraph: {
    type: 'website',
    locale: 'id_ID',
    url: `${site.url}/`,
    siteName: site.nama,
    title: site.judul,
    description: site.deskripsi,
    images: [{ url: '/og.jpg', width: 1200, height: 630, alt: OG_ALT }],
  },
  twitter: {
    card: 'summary_large_image',
    title: site.judul,
    description: site.deskripsi,
    images: ['/og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large', 'max-snippet': -1, 'max-video-preview': -1 },
  },
};

export const viewport = {
  themeColor: '#f8b90e',
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${passion.variable} ${karla.variable} ${spline.variable}`}>
      <body className="antialiased">
        {/* Filter tinta cap: tepi cap digoyang sedikit supaya terlihat seperti dicap tangan. Dipakai ilustrasi di components/Gambar.js. */}
        <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: 'absolute' }}>
          <defs>
            <filter id="tinta-kasar" x="-12%" y="-12%" width="124%" height="124%">
              <feTurbulence type="fractalNoise" baseFrequency="0.85" numOctaves="2" seed="3" result="derau" />
              <feDisplacementMap in="SourceGraphic" in2="derau" scale="2.4" xChannelSelector="R" yChannelSelector="G" />
            </filter>
          </defs>
        </svg>
        <a href="#isi" className="sr-only-fokus fixed left-3 top-3 z-[100] rounded-xl bg-tinta px-4 py-3 font-bold text-cangkang">
          Langsung ke isi
        </a>
        <Header />
        <main id="isi" tabIndex={-1} className="outline-none">
          {children}
        </main>
        <Footer />
        <JsonLd data={jsonLdUsaha} />
        <aside aria-label="Tentang situs demo ini" style={{ display: 'block', margin: 0, padding: '12px 16px', background: '#0f1b33', color: '#dfe6f3', font: '400 13px/1.5 system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', textAlign: 'center' }}>
          Situs demo buatan PintuWeb — nama dan isinya rekaan.{' '}
          <a href="https://www.pintuweb.id/kontak?demo=telur" style={{ color: '#ffffff', fontWeight: 600, textDecoration: 'underline', textUnderlineOffset: '3px', display: 'inline-block', padding: '8px 4px' }}>Buat yang seperti ini →</a>
        </aside>
      </body>
    </html>
  );
}
