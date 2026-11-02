import { wa, PESAN } from '@/lib/data';
import { IkonWA } from './Gambar';

// WhatsApp tanpa nomor (situs demo): pengunjung memilih sendiri tujuan pesannya.
export default function TombolWA({ pesan = PESAN.pesan, children = 'Pesan lewat WhatsApp', className = 'tombol tombol-tinta' }) {
  return (
    <a href={wa(pesan)} target="_blank" rel="noopener noreferrer" className={className}>
      <IkonWA />
      <span>{children}</span>
      <span className="sr-only"> (buka di tab baru)</span>
    </a>
  );
}
