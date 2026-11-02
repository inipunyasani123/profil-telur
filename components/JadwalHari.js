import { jadwal, jam } from '@/lib/data';

// Bagan jadwal sehari (04.00-17.00): tiap baris punya teks jam, batang hanya pelengkap visual.
const MULAI = 4;
const AKHIR = 17;
const pos = (j) => ((j - MULAI) / (AKHIR - MULAI)) * 100;
const TIK = [5, 7, 9, 11, 13, 15];
const batas = Number(jam.batasPesan.split('.')[0]);

export default function JadwalHari() {
  return (
    <div>
      <p className="data text-cangkang/85">
        <span aria-hidden="true" className="mr-2 inline-block h-3 w-1 translate-y-0.5 rounded bg-cangkang" />
        Garis putih: batas pesan jam {jam.batasPesan} WIB.
      </p>
      <ol className="mt-5 space-y-4">
        {jadwal.map((r) => (
          <li key={r.id} className="grid items-center gap-x-6 gap-y-1.5 md:grid-cols-[17rem_1fr]">
            <div>
              <p className="text-[1.0625rem] font-extrabold leading-tight">{r.nama}</p>
              <p className="data text-cangkang/85">{r.ket} WIB</p>
            </div>
            <div aria-hidden="true" className="relative h-7 rounded-md bg-cangkang/12">
              <span
                className="absolute inset-y-0 rounded-md bg-kuning"
                style={{ left: `${pos(r.mulai)}%`, width: `${pos(r.selesai) - pos(r.mulai)}%` }}
              />
              <span className="absolute -inset-y-1 w-[3px] rounded bg-cangkang" style={{ left: `calc(${pos(batas)}% - 1.5px)` }} />
            </div>
          </li>
        ))}
      </ol>
      <div className="mt-2 md:grid md:grid-cols-[17rem_1fr] md:gap-x-6" aria-hidden="true">
        <span />
        <div className="relative h-6">
          {TIK.map((j) => (
            <span
              key={j}
              className={`data absolute top-0 -translate-x-1/2 ${j === batas ? 'font-bold text-kuning' : 'text-cangkang/85'}`}
              style={{ left: `${pos(j)}%` }}
            >
              {String(j).padStart(2, '0')}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
