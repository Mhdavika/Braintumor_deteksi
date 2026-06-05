import { Info } from "lucide-react";

export default function DisclaimerSection() {
  return (
    <section className="mx-auto max-w-6xl px-6 py-10 pb-20">
      <div className="flex gap-4 rounded-3xl border bg-blue-50 p-6 dark:border-blue-900 dark:bg-blue-950/40">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white">
          <Info size={22} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            Penting untuk Diketahui
          </h2>
          <p className="mt-2 leading-7 text-slate-600 dark:text-slate-300">
            BrainScan  adalah alat bantu berbasis AI untuk mendeteksi
            kemungkinan tumor otak dari gambar MRI. Hasil tidak dapat
            menggantikan diagnosis profesional dari dokter.
          </p>
        </div>
      </div>
    </section>
  );
}