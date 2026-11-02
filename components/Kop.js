// Pita judul halaman dalam: kuning telur dengan lekukan tray berulang.
export default function Kop({ judul, pengantar, label, samping }) {
  return (
    <section className="kop-baki" aria-labelledby="judul-halaman">
      <div className="wadah grid gap-8 py-10 sm:py-14 lg:grid-cols-12 lg:items-end lg:py-16">
        <div className="lg:col-span-8">
          {label && <p className="label mb-3 text-tinta-2">{label}</p>}
          <h1 id="judul-halaman" className="text-[clamp(2.9rem,7.5vw,5.4rem)] leading-[0.95]">
            {judul}
          </h1>
          {pengantar && <p className="mt-5 max-w-2xl text-[1.1875rem]">{pengantar}</p>}
        </div>
        {samping && <div className="lg:col-span-4">{samping}</div>}
      </div>
    </section>
  );
}
