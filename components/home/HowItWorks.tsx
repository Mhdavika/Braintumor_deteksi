import { BrainCircuit, FileText, Stethoscope, UploadCloud } from "lucide-react";

const steps = [
  {
    icon: UploadCloud,
    title: "Unggah Gambar MRI",
    description: "Upload gambar MRI otak dalam format JPG, JPEG, atau PNG.",
  },
  {
    icon: BrainCircuit,
    title: "Analisis oleh AI",
    description: "Model YOLO menganalisis area mencurigakan pada gambar.",
  },
  {
    icon: FileText,
    title: "Hasil & Probabilitas",
    description: "Dapatkan hasil deteksi beserta tingkat probabilitas.",
  },
  {
    icon: Stethoscope,
    title: "Konsultasi Dokter",
    description: "Gunakan hasil sebagai referensi awal untuk konsultasi.",
  },
];

export default function HowItWorks() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-16">
      <div className="rounded-3xl border bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
          Bagaimana Cara Kerjanya?
        </h2>

        <div className="mt-10 grid gap-6 md:grid-cols-4">
          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <div key={step.title} className="text-center">
                <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-blue-950">
                  <Icon size={34} />
                </div>

                <div className="mx-auto mb-3 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-sm font-bold text-white">
                  {index + 1}
                </div>

                <h3 className="font-bold text-slate-900 dark:text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500 dark:text-slate-400">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}