import Image from 'next/image';

// Foto di dalam wadah yang sudah punya ukuran (aspect-ratio atau tinggi). Varian WebP statis lewat image-loader.js.
export default function Foto({ src, alt, sizes, prioritas = false, posisi = 'center', className = '' }) {
  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={prioritas}
      className={`object-cover ${className}`}
      style={{ objectPosition: posisi }}
    />
  );
}
