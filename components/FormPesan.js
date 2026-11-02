'use client';

import { useState } from 'react';
import { ukuran, retak, tujuan, jenisUsaha, caraTerima, wa, TRAY_PER_PETI, ISI_TRAY, jam } from '@/lib/data';
import { Telur, IkonWA } from './Gambar';

// Formulir ini hanya menyusun pesan WhatsApp di browser. Tidak ada data yang dikirim ke server.
const BARIS = [...ukuran, { ...retak, huruf: 'R' }];
const KIRIM = [
  { id: 'besok', teks: 'Besok pagi (pesan sebelum jam ' + jam.batasPesan + ')' },
  { id: 'lusa', teks: 'Lusa' },
  { id: 'catatan', teks: 'Hari lain, saya tulis di catatan' },
];

const kolom =
  'min-h-12 w-full rounded-xl border-2 border-tinta-3 bg-[#fffdf6] px-4 py-2.5 text-[1.0625rem] placeholder:text-tinta-3';

function Pilihan({ nama, nilai, dipilih, ubah, children }) {
  return (
    <label className="block cursor-pointer">
      <input type="radio" name={nama} value={nilai} checked={dipilih} onChange={() => ubah(nilai)} className="peer sr-only" />
      <span className="flex min-h-12 items-center rounded-xl bg-cangkang-tua px-4 py-2 font-bold leading-snug peer-checked:bg-tinta peer-checked:text-cangkang peer-focus-visible:outline-[3px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-tinta">
        {children}
      </span>
    </label>
  );
}

export default function FormPesan() {
  const [nama, setNama] = useState('');
  const [usaha, setUsaha] = useState(jenisUsaha[0]);
  const [kemasan, setKemasan] = useState('tray');
  const [jumlah, setJumlah] = useState({ kecil: 0, sedang: 0, besar: 0, jumbo: 0, retak: 0 });
  const [tujuanId, setTujuanId] = useState('blitar');
  const [terima, setTerima] = useState(caraTerima[0]);
  const [kirim, setKirim] = useState('besok');
  const [catatan, setCatatan] = useState('');
  const [galat, setGalat] = useState([]);
  const [status, setStatus] = useState('');

  const satuan = (id) => (id === 'retak' || kemasan === 'tray' ? 'tray' : 'peti');
  const tambah = (id, d) => setJumlah((j) => ({ ...j, [id]: Math.max(0, Math.min(99, (j[id] || 0) + d)) }));
  const isi = (id, v) => setJumlah((j) => ({ ...j, [id]: Math.max(0, Math.min(99, parseInt(v, 10) || 0)) }));

  const tray = BARIS.reduce((a, u) => a + (jumlah[u.id] || 0) * (satuan(u.id) === 'peti' ? TRAY_PER_PETI : 1), 0);
  const tuju = tujuan.find((t) => t.id === tujuanId);
  // Ambil sendiri di gudang: tanpa tujuan kirim, minimal 1 tray (sama dengan halaman Harga).
  const ambil = terima === caraTerima[1];

  const pesan = (() => {
    const dipilih = BARIS.filter((u) => (jumlah[u.id] || 0) > 0);
    const baris = ['Halo Pagi Kuning, saya mau pesan telur.', ''];
    baris.push(`Nama: ${nama.trim() || '(belum diisi)'}`);
    baris.push(`Usaha: ${usaha}`);
    baris.push('Pesanan:');
    if (!dipilih.length) baris.push('- (belum ada)');
    dipilih.forEach((u) => {
      const s = satuan(u.id);
      baris.push(`- ${u.nama}: ${jumlah[u.id]} ${s}${s === 'peti' ? ` (${jumlah[u.id] * TRAY_PER_PETI} tray)` : ''}`);
    });
    baris.push(`Total: ${tray} tray (${tray * ISI_TRAY} butir)`);
    baris.push(`Cara terima: ${terima}`);
    if (!ambil) baris.push(`Tujuan: ${tuju.nama}`);
    baris.push(`Kapan: ${KIRIM.find((k) => k.id === kirim).teks}`);
    if (catatan.trim()) baris.push(`Catatan: ${catatan.trim()}`);
    return baris.join('\n');
  })();

  function periksa() {
    const g = [];
    if (!nama.trim()) g.push('Tulis namamu atau nama usahamu.');
    if (tray < 1) g.push('Isi jumlah pesanan dulu, minimal 1 tray.');
    else if (!ambil && tray < tuju.minimum) g.push(`Untuk ${tuju.nama}, pesanan minimal ${tuju.minimum} tray. Pesananmu baru ${tray} tray.`);
    setGalat(g);
    return g.length === 0;
  }

  function bukaWA(e) {
    e.preventDefault();
    setStatus('');
    if (!periksa()) return;
    window.open(wa(pesan), '_blank', 'noopener,noreferrer');
  }

  async function salin() {
    setStatus('');
    try {
      await navigator.clipboard.writeText(pesan);
      setStatus('Pesan disalin. Tempel di WhatsApp.');
    } catch {
      setStatus('Pesan tidak bisa disalin otomatis. Salin teks di pratinjau secara manual.');
    }
  }

  return (
    <div className="grid gap-3 lg:grid-cols-12">
      <form onSubmit={bukaWA} noValidate className="lubang space-y-9 p-5 sm:p-7 lg:col-span-7">
        <fieldset className="min-w-0 space-y-4">
          <legend className="mb-1 font-display text-[2rem] leading-none">Tentang kamu</legend>
          <div>
            <label htmlFor="nama" className="mb-1.5 block font-bold">
              Nama kamu atau usahamu
            </label>
            <input id="nama" name="nama" autoComplete="organization" value={nama} onChange={(e) => setNama(e.target.value)} className={kolom} placeholder="Contoh: Warung Bu Sari" />
          </div>
          <div role="radiogroup" aria-label="Jenis usaha">
            <p className="mb-1.5 font-bold">Jenis usaha</p>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
              {jenisUsaha.map((j) => (
                <Pilihan key={j} nama="usaha" nilai={j} dipilih={usaha === j} ubah={setUsaha}>
                  {j}
                </Pilihan>
              ))}
            </div>
          </div>
        </fieldset>

        <fieldset className="min-w-0 space-y-4">
          <legend className="mb-1 font-display text-[2rem] leading-none">Pesananmu</legend>
          <div role="radiogroup" aria-label="Kemasan">
            <p className="mb-1.5 font-bold">Kemasan</p>
            <div className="grid gap-2 sm:grid-cols-2">
              <Pilihan nama="kemasan" nilai="tray" dipilih={kemasan === 'tray'} ubah={setKemasan}>
                Tray, 30 butir
              </Pilihan>
              <Pilihan nama="kemasan" nilai="peti" dipilih={kemasan === 'peti'} ubah={setKemasan}>
                Peti, 6 tray
              </Pilihan>
            </div>
          </div>
          <ul className="space-y-2">
            {BARIS.map((u) => (
              <li key={u.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 rounded-xl bg-cangkang-tua/70 px-3 py-2">
                <div className="flex min-w-0 items-center gap-3">
                  <Telur cap={u.huruf} className="h-11 w-auto shrink-0" />
                  <div className="min-w-0">
                    <p className="font-extrabold leading-tight">{u.nama}</p>
                    <p className="data text-tinta-3">{u.rentang}</p>
                  </div>
                </div>
                <div className="ml-auto flex shrink-0 items-center gap-1" role="group" aria-label={`Jumlah ${u.nama}`}>
                  <button type="button" aria-label={`Kurangi ${u.nama}`} onClick={() => tambah(u.id, -1)} className="grid h-11 w-11 place-items-center rounded-lg bg-tinta text-xl font-black text-cangkang">
                    <span aria-hidden="true">−</span>
                  </button>
                  <input
                    aria-label={`${u.nama}, jumlah dalam ${satuan(u.id)}`}
                    inputMode="numeric"
                    type="number"
                    min="0"
                    max="99"
                    value={jumlah[u.id]}
                    onChange={(e) => isi(u.id, e.target.value)}
                    className="h-11 w-14 rounded-lg border-2 border-tinta-3 bg-[#fffdf6] text-center font-mono text-lg font-bold"
                  />
                  <button type="button" aria-label={`Tambah ${u.nama}`} onClick={() => tambah(u.id, 1)} className="grid h-11 w-11 place-items-center rounded-lg bg-tinta text-xl font-black text-cangkang">
                    <span aria-hidden="true">+</span>
                  </button>
                  <span className="data w-9 text-tinta-2">{satuan(u.id)}</span>
                </div>
              </li>
            ))}
          </ul>
          <p className="data" aria-live="polite">
            Total: {tray} tray ({tray * ISI_TRAY} butir)
          </p>
        </fieldset>

        <fieldset className="min-w-0 space-y-4">
          <legend className="mb-1 font-display text-[2rem] leading-none">Pengiriman</legend>
          <div role="radiogroup" aria-label="Cara terima">
            <p className="mb-1.5 font-bold">Cara terima</p>
            <div className="grid gap-2 sm:grid-cols-2">
              {caraTerima.map((c) => (
                <Pilihan key={c} nama="terima" nilai={c} dipilih={terima === c} ubah={setTerima}>
                  {c}
                </Pilihan>
              ))}
            </div>
          </div>
          {ambil && (
            <p className="data text-tinta-2">
              Diambil di gudang, {jam.hari}, pukul {jam.ambil} WIB. Minimal 1 tray.
            </p>
          )}
          {!ambil && (
            <div role="radiogroup" aria-label="Tujuan">
              <p className="mb-1.5 font-bold">Tujuan</p>
              <div className="grid gap-2 sm:grid-cols-3">
                {tujuan.map((t) => (
                  <Pilihan key={t.id} nama="tujuan" nilai={t.id} dipilih={tujuanId === t.id} ubah={setTujuanId}>
                    {t.nama}
                  </Pilihan>
                ))}
              </div>
              <p className="data mt-2 text-tinta-2">
                Kirim ke sini: {tuju.hari}. Minimal {tuju.minimum} tray.
              </p>
            </div>
          )}
          <div role="radiogroup" aria-label="Kapan">
            <p className="mb-1.5 font-bold">Kapan</p>
            <div className="grid gap-2">
              {KIRIM.map((k) => (
                <Pilihan key={k.id} nama="kirim" nilai={k.id} dipilih={kirim === k.id} ubah={setKirim}>
                  {k.teks}
                </Pilihan>
              ))}
            </div>
          </div>
          <div>
            <label htmlFor="catatan" className="mb-1.5 block font-bold">
              Catatan (boleh kosong)
            </label>
            <textarea id="catatan" rows={3} value={catatan} onChange={(e) => setCatatan(e.target.value)} className={`${kolom} resize-y`} placeholder="Contoh: kirim sebelum jam 8" />
          </div>
        </fieldset>

        <div>
          <div role="alert" className="mb-4 empty:hidden">
            {galat.length > 0 && (
              <ul className="space-y-1 rounded-xl border-2 border-naik bg-[#fff1e8] p-3 font-bold text-naik">
                {galat.map((g) => (
                  <li key={g}>{g}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="submit" className="tombol tombol-tinta">
              <IkonWA />
              <span>Buka WhatsApp</span>
            </button>
            <button type="button" onClick={salin} className="tombol tombol-garis">
              Salin pesan
            </button>
          </div>
          <p className="mt-3 min-h-6 font-bold" role="status">
            {status}
          </p>
        </div>
      </form>

      <aside aria-label="Pratinjau pesan WhatsApp" className="lubang lubang-gelap gelap p-5 sm:p-7 lg:sticky lg:top-24 lg:col-span-5 lg:self-start">
        <p className="label text-kuning-muda">Pratinjau pesan WhatsApp</p>
        <pre className="mt-4 whitespace-pre-wrap break-words font-mono text-[0.9375rem] leading-relaxed">{pesan}</pre>
        <p className="mt-5 border-t border-dashed border-cangkang/40 pt-4 text-[0.9375rem] text-cangkang/90">
          Pesan ini hanya disusun di browser kamu. Setelah kamu menekan tombol, WhatsApp terbuka dan kamu memilih sendiri tujuannya.
        </p>
      </aside>
    </div>
  );
}
