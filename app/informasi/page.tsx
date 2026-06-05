import {
  AlertTriangle,
  Brain,
  CheckCircle2,
  Info,
  Microscope,
  Stethoscope,
} from "lucide-react";

const tumorClasses = [
  {
    name: "Glioma",
    color: "blue",
    icon: Brain,
    description:
      "Glioma adalah kelompok tumor yang berasal dari sel glial, yaitu sel pendukung pada sistem saraf pusat. Tumor ini dapat muncul di otak maupun sumsum tulang belakang.",
    symptoms: [
      "Sakit kepala yang menetap atau memburuk",
      "Kejang",
      "Gangguan penglihatan atau bicara",
      "Kelemahan pada bagian tubuh tertentu",
      "Perubahan perilaku atau fungsi kognitif",
    ],
    note:
      "Glioma dapat memiliki tingkat keganasan yang berbeda-beda, sehingga pemeriksaan lanjutan sangat penting.",
  },
  {
    name: "Meningioma",
    color: "purple",
    icon: Microscope,
    description:
      "Meningioma adalah tumor yang berasal dari meninges, yaitu lapisan pelindung otak dan sumsum tulang belakang. Banyak meningioma tumbuh lambat, tetapi tetap dapat menimbulkan gejala karena menekan jaringan sekitar.",
    symptoms: [
      "Sakit kepala",
      "Gangguan penglihatan",
      "Kejang",
      "Gangguan pendengaran",
      "Kelemahan atau mati rasa pada anggota tubuh",
    ],
    note:
      "Meningioma sering bersifat jinak, tetapi lokasi dan ukurannya dapat memengaruhi tingkat risiko.",
  },
  {
    name: "Pituitary",
    color: "orange",
    icon: Stethoscope,
    description:
      "Tumor pituitary atau tumor kelenjar hipofisis muncul di area kelenjar pituitari. Tumor ini dapat memengaruhi hormon dan dapat menekan struktur di sekitar otak, termasuk saraf penglihatan.",
    symptoms: [
      "Sakit kepala",
      "Gangguan penglihatan, terutama penglihatan samping",
      "Perubahan hormon",
      "Kelelahan",
      "Perubahan berat badan atau siklus menstruasi",
    ],
    note:
      "Pemeriksaan hormon dan pencitraan medis biasanya diperlukan untuk menilai tumor pituitari.",
  },
  {
    name: "No Tumor",
    color: "green",
    icon: CheckCircle2,
    description:
      "No Tumor berarti model tidak menemukan pola yang sesuai dengan kelas tumor pada gambar MRI yang dianalisis. Namun, hasil ini tetap bukan jaminan bahwa kondisi medis sepenuhnya normal.",
    symptoms: [
      "Tidak ada area tumor yang terdeteksi oleh model",
      "Hasil tetap bergantung pada kualitas gambar",
      "Kesalahan prediksi masih mungkin terjadi",
      "Pemeriksaan dokter tetap diperlukan jika ada keluhan",
    ],
    note:
      "Jika pengguna memiliki gejala tertentu, tetap disarankan berkonsultasi dengan tenaga medis.",
  },
];

function getColorClasses(color: string) {
  switch (color) {
    case "blue":
      return {
        badge: "bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300",
        icon: "bg-blue-100 text-blue-600 dark:bg-blue-950",
        border: "border-blue-100 dark:border-blue-900",
      };
    case "purple":
      return {
        badge:
          "bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300",
        icon: "bg-purple-100 text-purple-600 dark:bg-purple-950",
        border: "border-purple-100 dark:border-purple-900",
      };
    case "orange":
      return {
        badge:
          "bg-orange-50 text-orange-700 dark:bg-orange-950 dark:text-orange-300",
        icon: "bg-orange-100 text-orange-600 dark:bg-orange-950",
        border: "border-orange-100 dark:border-orange-900",
      };
    default:
      return {
        badge:
          "bg-green-50 text-green-700 dark:bg-green-950 dark:text-green-300",
        icon: "bg-green-100 text-green-600 dark:bg-green-950",
        border: "border-green-100 dark:border-green-900",
      };
  }
}

export default function InformasiPage() {
  return (
    <main className="min-h-screen bg-slate-50 px-6 py-14 dark:bg-slate-950">
      <section className="mx-auto max-w-6xl">
        <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="inline-flex items-center gap-2 rounded-full bg-blue-50 px-4 py-2 text-sm font-semibold text-blue-700 dark:bg-blue-950 dark:text-blue-300">
            <Info size={18} />
            Edukasi Kelas Deteksi
          </div>

          <h1 className="mt-5 text-4xl font-bold leading-tight text-slate-900 dark:text-white md:text-5xl">
            Informasi 4 Kelas Tumor Otak
          </h1>

          <p className="mt-5 max-w-4xl leading-8 text-slate-600 dark:text-slate-300">
            Model BrainScan  dilatih untuk mengenali empat kelas hasil, yaitu
            Glioma, Meningioma, Pituitary, dan No Tumor. Halaman ini menjelaskan
            gambaran umum dari masing-masing kelas agar pengguna lebih memahami
            hasil analisis.
          </p>
        </div>

        <div className="mt-10 grid gap-6">
          {tumorClasses.map((item) => {
            const Icon = item.icon;
            const colors = getColorClasses(item.color);

            return (
              <article
                key={item.name}
                className={`rounded-3xl border bg-white p-7 shadow-sm dark:bg-slate-900 ${colors.border}`}
              >
                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                  <div
                    className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl ${colors.icon}`}
                  >
                    <Icon size={34} />
                  </div>

                  <div className="flex-1">
                    <div
                      className={`mb-4 inline-flex rounded-full px-4 py-2 text-sm font-bold ${colors.badge}`}
                    >
                      {item.name}
                    </div>

                    <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                      Apa itu {item.name}?
                    </h2>

                    <p className="mt-3 leading-8 text-slate-600 dark:text-slate-300">
                      {item.description}
                    </p>

                    <div className="mt-6 grid gap-6 lg:grid-cols-2">
                      <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          Gejala atau Kondisi yang Dapat Berkaitan
                        </h3>

                        <ul className="mt-4 space-y-3">
                          {item.symptoms.map((symptom) => (
                            <li
                              key={symptom}
                              className="flex gap-3 text-sm leading-6 text-slate-600 dark:text-slate-300"
                            >
                              <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-blue-600" />
                              {symptom}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="rounded-2xl bg-slate-50 p-5 dark:bg-slate-950">
                        <h3 className="font-bold text-slate-900 dark:text-white">
                          Catatan
                        </h3>

                        <p className="mt-4 leading-7 text-slate-600 dark:text-slate-300">
                          {item.note}
                        </p>

                        <div className="mt-5 rounded-2xl bg-yellow-50 p-4 text-sm leading-6 text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-200">
                          Hasil AI perlu dikonfirmasi oleh tenaga medis,
                          terutama jika pengguna mengalami keluhan neurologis.
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <AlertTriangle className="text-red-600" size={34} />

            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Kapan Harus Berkonsultasi?
            </h2>

            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Segera konsultasikan ke dokter jika mengalami gejala seperti sakit
              kepala berat yang menetap, kejang, gangguan penglihatan, kelemahan
              anggota tubuh, perubahan bicara, atau perubahan kesadaran.
            </p>
          </div>

          <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
            <Stethoscope className="text-blue-600" size={34} />

            <h2 className="mt-4 text-xl font-bold text-slate-900 dark:text-white">
              Pemeriksaan Lanjutan
            </h2>

            <p className="mt-3 leading-7 text-slate-600 dark:text-slate-300">
              Dokter dapat menyarankan evaluasi klinis, MRI lanjutan, CT scan,
              pemeriksaan hormon, atau pemeriksaan lain sesuai kondisi pasien.
            </p>
          </div>
        </div>

        <div className="mt-10 rounded-3xl border border-yellow-200 bg-yellow-50 p-6 text-yellow-900 dark:border-yellow-900 dark:bg-yellow-950/40 dark:text-yellow-200">
          <h2 className="font-bold">Disclaimer Medis</h2>
          <p className="mt-2 leading-7">
            Informasi pada halaman ini hanya untuk edukasi. BrainScan  tidak
            menggantikan diagnosis dokter, radiolog, atau tenaga medis
            profesional. Jika hasil deteksi menunjukkan area mencurigakan atau
            pengguna mengalami gejala tertentu, lakukan pemeriksaan medis lebih
            lanjut.
          </p>
        </div>
      </section>
    </main>
  );
}