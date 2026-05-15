import {
  Brain,
  Database,
  FileText,
  ShieldCheck,
  Stethoscope,
  UploadCloud,
} from "lucide-react";

const technologies = [
  {
    title: "Frontend Next.js",
    description:
      "Digunakan untuk membangun antarmuka website yang responsif, interaktif, dan mudah digunakan.",
  },
  {
    title: "Backend Python FastAPI",
    description:
      "Digunakan untuk menerima gambar MRI, menjalankan model YOLO, dan mengirimkan hasil deteksi.",
  },
  {
    title: "YOLO Object Detection",
    description:
      "Digunakan untuk mendeteksi area mencurigakan pada gambar MRI dan menampilkan bounding box.",
  },
  {
    title: "Supabase",
    description:
      "Digunakan untuk menyimpan riwayat deteksi, gambar asli, dan gambar hasil deteksi.",
  },
];

const workflow = [
  {
    icon: UploadCloud,
    title: "Upload MRI",
    description: "Pengguna mengunggah gambar MRI otak dalam format JPG atau PNG.",
  },
  {
    icon: Brain,
    title: "Analisis AI",
    description:
      "Model YOLO memproses gambar dan mencari area yang berpotensi menunjukkan tumor.",
  },
  {
    icon: FileText,
    title: "Hasil Analisis",
    description:
      "Sistem menampilkan kelas tumor, probabilitas, tingkat risiko, dan gambar bounding box.",
  },
  {
    icon: Database,
    title: "Simpan Riwayat",
    description:
      "Hasil deteksi disimpan ke Supabase agar dapat dibuka kembali di halaman riwayat.",
  },
];

export default function TentangPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14 dark:bg-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <Brain size={18} />
                Tentang BrainScan AI
              </div>

              <h1 className="text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
                Sistem Deteksi Tumor Otak Berbasis AI
              </h1>

              <p className="mt-5 max-w-3xl leading-8 text-slate-600 dark:text-slate-300">
                BrainScan AI adalah website yang dibuat untuk membantu analisis
                awal gambar MRI otak menggunakan model object detection. Sistem
                ini dapat menampilkan prediksi kelas, probabilitas, tingkat
                risiko, serta visualisasi area mencurigakan dalam bentuk
                bounding box.
              </p>
            </div>

            <div className="rounded-3xl bg-blue-600 p-8 text-white shadow-xl shadow-blue-600/20">
              <ShieldCheck size={48} />
              <h2 className="mt-5 text-2xl font-bold">Alat Bantu Analisis</h2>
              <p className="mt-3 max-w-sm text-blue-50">
                Website ini ditujukan sebagai pendukung pembelajaran dan analisis
                awal, bukan sebagai pengganti diagnosis dokter.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-3">
          <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Brain className="text-blue-600" size={36} />
            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Tujuan Sistem
            </h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Membantu pengguna memahami hasil deteksi awal dari gambar MRI otak
              secara cepat, visual, dan terdokumentasi.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <FileText className="text-blue-600" size={36} />
            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Output Analisis
            </h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Sistem menampilkan jenis kelas, probabilitas, status risiko,
              detail deteksi, gambar hasil bounding box, dan laporan PDF.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Stethoscope className="text-blue-600" size={36} />
            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Batasan Sistem
            </h2>
            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Hasil AI tidak dapat menggantikan pemeriksaan dokter, radiolog,
              atau tenaga medis profesional.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Alur Kerja Sistem
          </h2>

          <div className="mt-8 grid gap-6 md:grid-cols-4">
            {workflow.map((item, index) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="rounded-3xl bg-slate-50 p-5 dark:bg-slate-950"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950">
                    <Icon size={28} />
                  </div>

                  <div className="mt-4 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                    {index + 1}
                  </div>

                  <h3 className="mt-4 font-bold text-slate-900 dark:text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white">
            Teknologi yang Digunakan
          </h2>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            {technologies.map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
              >
                <h3 className="font-bold text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-200">
          <h2 className="font-bold">Penting untuk Diketahui</h2>
          <p className="mt-2 leading-7">
            BrainScan AI tidak memberikan diagnosis medis resmi. Hasil deteksi
            hanya berupa prediksi berbasis model AI dan perlu dikonfirmasi
            melalui pemeriksaan dokter atau radiolog.
          </p>
        </div>
      </section>
    </main>
  );
}