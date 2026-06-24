type LoadingProgressProps = {
  step: string;
};

const steps = [
  {
    key: "uploading",
    label: "Upload gambar",
  },
  {
    key: "validating",
    label: "Validasi gambar",
    
  },
  {
    key: "analyzing",
    label: "Analisis model YOLO",
  },
  {
    key: "saving",
    label: "Simpan riwayat",
  },
];

export default function LoadingProgress({ step }: LoadingProgressProps) {
  const activeIndex = steps.findIndex((item) => item.key === step);

  if (step === "idle" || step === "done") return null;

  return (
    <div className="mt-5 rounded-3xl border bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <p className="mb-4 font-semibold text-slate-900 dark:text-white">
        Proses Deteksi
      </p>

      <div className="space-y-3">
        {steps.map((item, index) => {
          const isActive = index === activeIndex;
          const isDone = index < activeIndex;

          return (
            <div key={item.key} className="flex items-center gap-3">
              <div
                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold ${
                  isDone
                    ? "bg-green-600 text-white"
                    : isActive
                    ? "bg-blue-600 text-white"
                    : "bg-slate-100 text-slate-400 dark:bg-slate-800"
                }`}
              >
                {isDone ? "✓" : index + 1}
              </div>

              <p
                className={`text-sm ${
                  isActive
                    ? "font-semibold text-blue-600"
                    : isDone
                    ? "font-medium text-green-600"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {item.label}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}