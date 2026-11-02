import Foto from './Foto';
import { Penggaris } from './Gambar';

// Sampul tulisan Kabar: foto CC0 atau ilustrasi buatan sendiri.
export default function Sampul({ t, prioritas = false, sizes, className = '' }) {
  if (t.sampul.gambar) {
    return (
      <div className={`relative aspect-[3/2] overflow-hidden rounded-[0.9rem] bg-cangkang-tua ${className}`}>
        <Foto src={t.sampul.gambar} alt={t.sampul.alt} sizes={sizes} prioritas={prioritas} posisi={t.sampul.posisi} />
      </div>
    );
  }
  return (
    <div
      className={`flex aspect-[3/2] items-center justify-center overflow-hidden rounded-[0.9rem] bg-kuning-muda p-3 ${className}`}
      role="img"
      aria-label={t.sampul.alt}
    >
      <Penggaris className="h-full w-full" />
    </div>
  );
}
