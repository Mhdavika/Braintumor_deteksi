import { Brain, Lock, ShieldCheck, Stethoscope } from "lucide-react";

const features = [
  {
    icon: ShieldCheck,
    title: "Akurat & Cepat",
    description: "Model dilatih menggunakan dataset MRI untuk analisis cepat.",
  },
  {
    icon: Lock,
    title: "Aman & Privat",
    description: "Riwayat deteksi tersimpan pada database Supabase.",
  },
  {
    icon: Stethoscope,
    title: "Bukan Pengganti Dokter",
    description: "Hasil analisis bukan diagnosis medis resmi.",
  },
  {
    icon: Brain,
    title: "Edukasi Kesehatan",
    description: "Pengguna dapat mempelajari informasi tentang tumor otak.",
  },
];

export default function FeatureSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10">
      <h2 className="text-center text-3xl font-bold text-slate-900 dark:text-white">
        Fitur Utama Kami
      </h2>

      <div className="mt-10 grid gap-6 md:grid-cols-4">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <div
              key={feature.title}
              className="rounded-3xl border bg-white p-6 text-center shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-600 dark:bg-blue-950">
                <Icon size={32} />
              </div>

              <h3 className="font-bold text-slate-900 dark:text-white">
                {feature.title}
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500 dark:text-slate-400">
                {feature.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}