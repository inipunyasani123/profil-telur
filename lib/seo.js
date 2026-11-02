// Metadata Open Graph lengkap per halaman (Next.js mengganti objek openGraph induk, tidak menggabungkannya)
// dan data terstruktur JSON-LD. Tanpa telepon, rating, atau ulasan: usaha ini rekaan.
import { site, jam, NAMA_AREA_SCHEMA } from './data';

export const OG_ALT = 'Pagi Kuning: baki telur ayam 30 lubang dengan cap ukuran, telur dari Blitar';

export function ogHalaman({ path = '/', judul, deskripsi, gambar, tipe = 'website', tambahan = {} }) {
  const url = `${site.url}${path}`;
  const title = judul ? `${judul} · ${site.nama}` : site.judul;
  const images = gambar ? [gambar] : [{ url: '/og.jpg', width: 1200, height: 630, alt: OG_ALT }];
  return {
    openGraph: { type: tipe, locale: 'id_ID', url, siteName: site.nama, title, description: deskripsi, images, ...tambahan },
    twitter: { card: 'summary_large_image', title, description: deskripsi, images: images.map((g) => g.url) },
  };
}

// Metadata standar satu halaman isi. Beranda memakai judul bawaan layout (judul = null).
export function metaHalaman({ path, judul = null, deskripsi }) {
  return {
    ...(judul ? { title: judul } : {}),
    description: deskripsi,
    alternates: { canonical: path },
    ...ogHalaman({ path, judul, deskripsi }),
  };
}

const HARI = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

export const jsonLdUsaha = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'WholesaleStore',
      '@id': `${site.url}/#usaha`,
      name: site.nama,
      url: site.url,
      description: site.deskripsi,
      slogan: site.tagline,
      image: `${site.url}/og.jpg`,
      logo: `${site.url}/icon.svg`,
      address: {
        '@type': 'PostalAddress',
        streetAddress: site.alamat.jalan,
        addressLocality: site.alamat.kota,
        addressRegion: site.alamat.provinsi,
        addressCountry: 'ID',
      },
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: HARI,
          opens: jam.buka.replace('.', ':'),
          closes: jam.tutup.replace('.', ':'),
        },
      ],
      areaServed: NAMA_AREA_SCHEMA,
      knowsLanguage: 'id-ID',
    },
    {
      '@type': 'WebSite',
      '@id': `${site.url}/#situs`,
      name: site.nama,
      url: site.url,
      description: site.deskripsi,
      inLanguage: 'id-ID',
      publisher: { '@id': `${site.url}/#usaha` },
    },
  ],
};

// BreadcrumbList untuk halaman dalam. butir = [{ nama, path }], path '/' untuk beranda.
export function jsonLdRemah(butir) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: butir.map((b, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: b.nama,
      item: `${site.url}${b.path}`,
    })),
  };
}

export function jsonLdTulisan(t) {
  const url = `${site.url}/kabar/${t.slug}`;
  const gambar = t.sampul?.gambar ? `${site.url}${t.sampul.gambar}` : `${site.url}/og.jpg`;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${url}#tulisan`,
    headline: t.judul,
    description: t.deskripsi,
    url,
    mainEntityOfPage: url,
    datePublished: t.tanggal,
    dateModified: t.tanggal,
    inLanguage: 'id-ID',
    image: gambar,
    author: { '@id': `${site.url}/#usaha` },
    publisher: { '@id': `${site.url}/#usaha` },
  };
}
