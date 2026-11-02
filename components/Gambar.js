// Ilustrasi buatan sendiri (SVG): telur, cap ukuran, baki 30 lubang, kendaraan antar, peta arah, dan telur pecah.
// Semua dekoratif (aria-hidden) kecuali Peta, yang punya label teks.

const TELUR = 'M50 3C73 3 93 48 93 80c0 28-19 45-43 45S7 108 7 80C7 48 27 3 50 3Z';
const TINTA = '#2a190b';

const NADA = {
  cokelat: { dasar: '#c98f52', terang: '#e0ad76' },
  krem: { dasar: '#e6cf9f', terang: '#f6e8c6' },
  kuning: { dasar: '#f8b90e', terang: '#ffd24d' },
};

const fontDisplay = { fontFamily: 'var(--font-passion), Impact, "Arial Black", sans-serif' };
const fontMono = { fontFamily: 'var(--font-spline), ui-monospace, Menlo, monospace' };
const fontSans = { fontFamily: 'var(--font-karla), ui-sans-serif, system-ui, sans-serif' };

// Cap huruf ukuran: dua lingkaran dan satu huruf, ujung tintanya digoyang filter #tinta-kasar (didefinisikan di layout).
function Cap({ huruf, r = 22 }) {
  return (
    <g filter="url(#tinta-kasar)" style={{ mixBlendMode: 'multiply' }}>
      <circle r={r} fill="none" stroke={TINTA} strokeWidth="3" opacity=".85" />
      <circle r={r - 5.5} fill="none" stroke={TINTA} strokeWidth="1.4" opacity=".7" />
      <text y={r * 0.42} textAnchor="middle" fontSize={r * 1.2} fill={TINTA} opacity=".88" style={fontDisplay}>
        {huruf}
      </text>
    </g>
  );
}

export function Telur({ cap, nada = 'cokelat', className = '' }) {
  const n = NADA[nada];
  return (
    <svg viewBox="0 0 100 128" className={className} aria-hidden="true" focusable="false">
      <path d={TELUR} fill={n.dasar} />
      <path d={TELUR} fill={n.terang} transform="translate(5 3) scale(.88)" opacity=".85" />
      <ellipse cx="32" cy="38" rx="7" ry="14" transform="rotate(18 32 38)" fill="#fff" opacity=".32" />
      {cap && (
        <g transform="translate(50 86)">
          <Cap huruf={cap} r={25} />
        </g>
      )}
    </svg>
  );
}

// Lambang usaha: telur kuning dengan sorot krem.
export function Logo({ className = '' }) {
  return (
    <svg viewBox="0 0 100 128" className={className} aria-hidden="true" focusable="false">
      <path d={TELUR} fill="#f8b90e" stroke={TINTA} strokeWidth="8" strokeLinejoin="round" />
      <ellipse cx="33" cy="42" rx="8" ry="16" transform="rotate(18 33 42)" fill="#fff8e7" opacity=".85" />
    </svg>
  );
}

// Stiker merek di atas foto. Dipakai sekali per halaman (id jalur teks tetap).
export function CapMerek({ className = '' }) {
  return (
    <svg viewBox="0 0 120 120" className={className} aria-hidden="true" focusable="false">
      <circle cx="60" cy="60" r="59" fill="#fff8e7" />
      <circle cx="60" cy="60" r="55" fill="none" stroke={TINTA} strokeWidth="2.5" />
      <circle cx="60" cy="60" r="34" fill="#f8b90e" stroke={TINTA} strokeWidth="2.5" />
      <path id="lingkar-merek" d="M16 60a44 44 0 1 1 88 0a44 44 0 1 1-88 0" fill="none" />
      <text fontSize="12.5" fontWeight="700" fill={TINTA} style={fontMono}>
        <textPath href="#lingkar-merek" textLength="268" lengthAdjust="spacing">
          PAGI KUNING · BLITAR · TELUR AYAM ·
        </textPath>
      </text>
      <g transform="translate(60 60) scale(.26) translate(-50 -64)">
        <path d={TELUR} fill="#fff8e7" stroke={TINTA} strokeWidth="9" strokeLinejoin="round" />
      </g>
    </svg>
  );
}

const SUDUT = (i) => ((i * 37) % 29) - 14;

// Baki 30 lubang (6 x 5) tampak dari atas. kosong = nomor lubang (0-29) yang dibiarkan kosong.
export function Baki30({ className = '', nada = 'cokelat', kosong = [], animasi = false, cap = {} }) {
  const n = NADA[nada];
  const sel = 40;
  const isi = [];
  for (let i = 0; i < 30; i++) {
    const x = (i % 6) * sel;
    const y = Math.floor(i / 6) * sel;
    isi.push(
      <g key={i} transform={`translate(${x} ${y})`}>
        <rect x="2" y="2" width="36" height="36" rx="12" fill={TINTA} opacity=".13" />
        {!kosong.includes(i) && (
          <g className={animasi ? 'telur-turun' : undefined} style={{ '--i': i }}>
            <g transform={`rotate(${SUDUT(i)} 20 21)`}>
              <ellipse cx="20" cy="21" rx="13.2" ry="15.6" fill={n.dasar} />
              <ellipse cx="20" cy="20" rx="10.6" ry="12.8" fill={n.terang} opacity=".7" />
              <ellipse cx="15.5" cy="14.5" rx="3" ry="5" transform="rotate(20 15.5 14.5)" fill="#fff" opacity=".35" />
              {cap[i] && (
                <g transform="translate(20 22) scale(.36)">
                  <Cap huruf={cap[i]} r={24} />
                </g>
              )}
            </g>
          </g>
        )}
      </g>,
    );
  }
  return (
    <svg viewBox="0 0 240 200" className={className} aria-hidden="true" focusable="false">
      {isi}
    </svg>
  );
}

// Kendaraan bak terbuka generik dengan peti telur bertumpuk. Tanpa merek dan tanpa plat nomor.
export function Truk({ className = '' }) {
  const peti = (x, y, k) => (
    <g key={k}>
      <rect x={x} y={y} width="40" height="28" rx="3" fill="#cdb085" stroke={TINTA} strokeWidth="2.5" />
      <path d={`M${x + 10} ${y + 4}v20M${x + 20} ${y + 4}v20M${x + 30} ${y + 4}v20`} stroke={TINTA} strokeWidth="2" opacity=".55" />
    </g>
  );
  return (
    <svg viewBox="0 0 360 180" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="190" cy="162" rx="160" ry="6" fill={TINTA} opacity=".14" />
      {[0, 1, 2, 3].map((i) => peti(156 + i * 44, 68, `a${i}`))}
      {[0, 1, 2].map((i) => peti(178 + i * 44, 40, `b${i}`))}
      <rect x="146" y="96" width="196" height="44" rx="5" fill="#f8b90e" stroke={TINTA} strokeWidth="3" />
      <path d="M146 112h196" stroke={TINTA} strokeWidth="2.5" opacity=".5" />
      <path d="M22 140V102l16-32h74l12 18 24 6v46Z" fill="#f8b90e" stroke={TINTA} strokeWidth="3" strokeLinejoin="round" />
      <path d="M48 78h56l8 16H46Z" fill="#fff8e7" stroke={TINTA} strokeWidth="2.5" strokeLinejoin="round" />
      <circle cx="68" cy="142" r="21" fill={TINTA} />
      <circle cx="68" cy="142" r="8" fill="#fff8e7" />
      <circle cx="292" cy="142" r="21" fill={TINTA} />
      <circle cx="292" cy="142" r="8" fill="#fff8e7" />
    </svg>
  );
}

// Peta arah (bukan peta sungguhan, tidak berskala): gudang di Blitar, Kediri ke utara, Tulungagung ke barat.
export function Peta({ className = '' }) {
  return (
    <svg
      viewBox="0 0 360 264"
      className={className}
      role="img"
      aria-label="Ilustrasi arah kirim dari gudang di Blitar: Kediri ke arah utara dan Tulungagung ke arah barat"
    >
      <defs>
        <clipPath id="bingkai-peta">
          <rect width="360" height="264" rx="18" />
        </clipPath>
      </defs>
      <g clipPath="url(#bingkai-peta)">
        <rect width="360" height="264" fill="#f3e4bd" />
        <path d="M-4 170C40 130 90 150 130 120S210 60 250 80s90 30 114 -10V268H-4Z" fill="#e6d2a1" />
        <path d="M-4 220C60 200 120 226 190 206s120 -4 174 -24V268H-4Z" fill="#d9c18a" />
      </g>
      <path d="M200 182 160 64" stroke={TINTA} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9" />
      <path d="M200 182 70 140" stroke={TINTA} strokeWidth="3" strokeLinecap="round" strokeDasharray="1 9" />
      <circle cx="158" cy="56" r="10" fill="#fff8e7" stroke={TINTA} strokeWidth="3.5" />
      <circle cx="62" cy="138" r="10" fill="#fff8e7" stroke={TINTA} strokeWidth="3.5" />
      <circle cx="200" cy="186" r="17" fill="#f8b90e" stroke={TINTA} strokeWidth="3.5" />
      <g transform="translate(200 186) scale(.16) translate(-50 -64)">
        <path d={TELUR} fill="#fff8e7" stroke={TINTA} strokeWidth="11" strokeLinejoin="round" />
      </g>
      <g fill={TINTA} style={fontSans} fontSize="17" fontWeight="800">
        <text x="176" y="52">Kediri</text>
        <text x="64" y="168" textAnchor="middle">Tulungagung</text>
        <text x="200" y="224" textAnchor="middle">Gudang di Blitar</text>
      </g>
      <g transform="translate(322 34)" stroke={TINTA} strokeWidth="2.5" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M0 18V-6M-7 2 0 -7l7 9" />
        <text x="0" y="40" textAnchor="middle" stroke="none" fill={TINTA} fontSize="17" fontWeight="800" style={fontSans}>
          Utara
        </text>
      </g>
      <text x="14" y="253" fill="#4b3520" fontSize="16" style={fontSans}>
        Ilustrasi arah, tidak berskala
      </text>
    </svg>
  );
}

// Telur pecah untuk halaman tidak ditemukan.
export function TelurPecah({ className = '' }) {
  return (
    <svg viewBox="0 0 220 200" className={className} aria-hidden="true" focusable="false">
      <ellipse cx="112" cy="178" rx="84" ry="8" fill={TINTA} opacity=".14" />
      <g transform="translate(112 112)">
        <path
          d="M-48 8-32-2-18 12 0-4 18 12 32-2 48 8C48 54 30 76 0 76S-48 54-48 8Z"
          fill="#c98f52"
          stroke={TINTA}
          strokeWidth="4"
          strokeLinejoin="round"
        />
        <ellipse cx="0" cy="8" rx="30" ry="17" fill="#f8b90e" stroke={TINTA} strokeWidth="4" />
        <ellipse cx="-9" cy="3" rx="8" ry="4" fill="#fff8e7" opacity=".7" />
        <g transform="translate(-44 -42) rotate(-28)">
          <path
            d="M-46 16-30 4-16 20 0 2 16 20 30 4 46 16C46-30 28-62 0-62S-46-30-46 16Z"
            fill="#c98f52"
            stroke={TINTA}
            strokeWidth="4"
            strokeLinejoin="round"
          />
          <ellipse cx="-18" cy="-30" rx="6" ry="14" transform="rotate(18 -18 -30)" fill="#fff" opacity=".32" />
        </g>
      </g>
    </svg>
  );
}

// Penggaris berat telur: 45 sampai 70 gram dengan empat ukuran. Teks dibuat besar karena skalanya ikut lebar layar.
export function Penggaris({ className = '' }) {
  const x = (g) => 18 + (g - 45) * 14.4;
  const seg = [
    { id: 'K', nama: 'Kecil', a: 45, b: 53, warna: '#f8b90e', tinggi: 60 },
    { id: 'S', nama: 'Sedang', a: 53, b: 59, warna: '#ffe08a', tinggi: 68 },
    { id: 'B', nama: 'Besar', a: 59, b: 65, warna: '#f8b90e', tinggi: 76 },
    { id: 'J', nama: 'Jumbo', a: 65, b: 70, warna: '#ffe08a', tinggi: 84 },
  ];
  return (
    <svg viewBox="0 38 400 204" className={className} aria-hidden="true" focusable="false">
      {seg.map((s) => {
        const tengah = (x(s.a) + x(s.b)) / 2;
        const lebar = (s.tinggi * 100) / 128;
        return (
          <svg key={s.id} x={tengah - lebar / 2} y={140 - s.tinggi - 4} width={lebar} height={s.tinggi} viewBox="0 0 100 128">
            <path d={TELUR} fill={NADA.cokelat.dasar} />
            <path d={TELUR} fill={NADA.cokelat.terang} transform="translate(5 3) scale(.88)" opacity=".85" />
            <ellipse cx="32" cy="38" rx="7" ry="14" transform="rotate(18 32 38)" fill="#fff" opacity=".32" />
            <g transform="translate(50 86)">
              <Cap huruf={s.id} r={25} />
            </g>
          </svg>
        );
      })}
      {seg.map((s) => (
        <g key={s.nama}>
          <rect x={x(s.a)} y="146" width={x(s.b) - x(s.a)} height="38" fill={s.warna} stroke={TINTA} strokeWidth="2.5" />
          <text x={(x(s.a) + x(s.b)) / 2} y="172" textAnchor="middle" fontSize="18" fontWeight="800" fill={TINTA} style={fontSans}>
            {s.nama}
          </text>
        </g>
      ))}
      {[45, 50, 55, 60, 65, 70].map((g) => (
        <g key={g}>
          <path d={`M${x(g)} 184v9`} stroke={TINTA} strokeWidth="2.5" />
          <text x={x(g)} y="214" textAnchor="middle" fontSize="18" fontWeight="700" fill={TINTA} style={fontMono}>
            {g}
          </text>
        </g>
      ))}
      <text x="200" y="237" textAnchor="middle" fontSize="17" fill="#4b3520" style={fontMono}>
        gram per butir
      </text>
    </svg>
  );
}

export function IkonWA({ className = 'h-5 w-5' }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true" focusable="false" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20l1.4-4.2A8.2 8.2 0 1 1 8.4 18.7Z" />
      <path d="M9.2 9.2c.2 2.4 2.7 4.9 5.6 5.6" />
    </svg>
  );
}
