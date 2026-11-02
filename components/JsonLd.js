// Data terstruktur. Tanda "<" diganti supaya isi data tidak bisa menutup tag script.
export default function JsonLd({ data }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }} />;
}
