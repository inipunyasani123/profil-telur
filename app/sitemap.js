import { site } from '@/lib/data';
import { tulisan } from '@/lib/kabar';

export default function sitemap() {
  const halaman = [
    { path: '/', prioritas: 1, ubah: 'weekly' },
    { path: '/profil', prioritas: 0.7, ubah: 'yearly' },
    { path: '/produk', prioritas: 0.9, ubah: 'monthly' },
    { path: '/harga', prioritas: 0.9, ubah: 'monthly' },
    { path: '/kabar', prioritas: 0.6, ubah: 'monthly' },
    { path: '/kontak', prioritas: 0.7, ubah: 'yearly' },
  ].map((h) => ({ url: h.path === '/' ? site.url : `${site.url}${h.path}`, changeFrequency: h.ubah, priority: h.prioritas }));
  const kabar = tulisan.map((t) => ({
    url: `${site.url}/kabar/${t.slug}`,
    lastModified: t.tanggal,
    changeFrequency: 'yearly',
    priority: 0.5,
  }));
  return [...halaman, ...kabar];
}
