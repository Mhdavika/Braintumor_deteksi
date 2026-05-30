const faqs = [
  {
    question: "Apakah hasil deteksi ini diagnosis medis resmi?",
    answer:
      "Tidak. Hasil dari BrainScan AI hanya alat bantu analisis awal dan tetap harus dikonfirmasi oleh dokter.",
  },
  {
    question: "Format gambar apa yang didukung?",
    answer: "Website mendukung gambar JPG, JPEG, dan PNG.",
  },
  {
    question: "Apa arti probabilitas?",
    answer:
      "Probabilitas menunjukkan tingkat keyakinan model terhadap hasil deteksi.",
  },
  {
    question: "Apakah gambar hasil deteksi disimpan?",
    answer:
      "Ya, gambar asli dan gambar hasil bounding box dapat disimpan ke Supabase untuk riwayat deteksi.",
  },
];

export default function FAQSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-14">
      <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
        Pertanyaan yang Sering Diajukan
      </h2>

      <div className="mt-8 grid gap-4 md:grid-cols-2">
        {faqs.map((faq) => (
          <div
            key={faq.question}
            className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
          >
            <h3 className="font-bold text-slate-900 dark:text-white">
              {faq.question}
            </h3>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              {faq.answer}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}