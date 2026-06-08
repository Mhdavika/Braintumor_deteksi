"use client";

import { DetectionResult } from "../types/detection.type";
import {
  AlertTriangle,
  CheckCircle2,
  Download,
  Activity,
  Waves,
  Grid2X2,
  ScanLine,
} from "lucide-react";

type ResultCardProps = {
  result: DetectionResult | null;
  isLoading: boolean;
  onDownloadPDF: () => void;
};

function getRiskStyle(risk?: string) {
  if (risk === "Tinggi") {
    return "bg-red-100 text-red-700 dark:bg-red-950/40 dark:text-red-300";
  }

  if (risk === "Sedang") {
    return "bg-yellow-100 text-yellow-700 dark:bg-yellow-950/40 dark:text-yellow-300";
  }

  return "bg-green-100 text-green-700 dark:bg-green-950/40 dark:text-green-300";
}

export default function ResultCard({
  result,
  isLoading,
  onDownloadPDF,
}: ResultCardProps) {
  const isTumorDetected =
    result &&
    result.result.toLowerCase() !== "no tumor" &&
    result.result.toLowerCase() !== "tidak terdeteksi" &&
    result.result.toLowerCase() !== "tidak ada tumor";

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <h2 className="mb-4 text-xl font-bold text-slate-900 dark:text-white">
        Hasil Analisis
      </h2>

      {isLoading && (
        <div className="flex min-h-[360px] flex-col items-center justify-center text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-4 border-blue-200 border-t-blue-600" />
          <p className="font-semibold text-slate-700 dark:text-slate-200">
            AI sedang menganalisis gambar MRI...
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Mohon tunggu beberapa detik.
          </p>
        </div>
      )}

      {!isLoading && !result && (
        <div className="flex min-h-[360px] items-center justify-center rounded-3xl bg-slate-50 p-6 text-center dark:bg-slate-950">
          <p className="text-slate-500">
            Hasil deteksi akan muncul di sini setelah gambar dianalisis.
          </p>
        </div>
      )}

      {!isLoading && result && (
        <div className="space-y-5">
          <div
            className={`rounded-2xl p-5 ${
              isTumorDetected
                ? "bg-red-50 text-red-700 dark:bg-red-950/40"
                : "bg-green-50 text-green-700 dark:bg-green-950/40"
            }`}
          >
            <div className="mb-3 flex items-center gap-2">
              {isTumorDetected ? (
                <AlertTriangle size={24} />
              ) : (
                <CheckCircle2 size={24} />
              )}

              <p className="font-semibold">
                {isTumorDetected ? "Area Mencurigakan" : "Tidak Terdeteksi"}
              </p>
            </div>

            <h3 className="text-2xl font-bold">{result.result}</h3>
            <p className="mt-1 text-sm">Probabilitas: {result.probability}</p>
          </div>

          <div className={`rounded-2xl p-4 ${getRiskStyle(result.risk_level)}`}>
            <p className="text-sm font-semibold">Status Tingkat Risiko</p>
            <p className="mt-1 text-xl font-bold">{result.risk_level}</p>
          </div>

          <div>
            <p className="text-sm text-slate-500">Keterangan</p>
            <p className="mt-1 text-slate-700 dark:text-slate-300">
              {result.status}
            </p>
          </div>

          {result.glcm_features && (
            <div className="rounded-2xl border bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950">
              <div className="mb-4 flex items-center gap-2">
                <Grid2X2 size={20} className="text-blue-600" />
                <div>
                  <h3 className="font-bold text-slate-900 dark:text-white">
                    Analisis Tekstur GLCM
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Gray Level Co-occurrence Matrix untuk fitur tekstur citra MRI
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                    <Activity size={15} />
                    Contrast
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {result.glcm_features.contrast}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                    <Waves size={15} />
                    Correlation
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {result.glcm_features.correlation}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                    <ScanLine size={15} />
                    Energy
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {result.glcm_features.energy}
                  </p>
                </div>

                <div className="rounded-xl bg-white p-4 dark:bg-slate-900">
                  <div className="mb-2 flex items-center gap-2 text-xs text-slate-500">
                    <Grid2X2 size={15} />
                    Homogeneity
                  </div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">
                    {result.glcm_features.homogeneity}
                  </p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-6 text-slate-500 dark:text-slate-400">
                Nilai GLCM digunakan untuk menganalisis pola tekstur citra MRI.
                Contrast menunjukkan perbedaan intensitas piksel, correlation
                menunjukkan hubungan antar piksel, energy menunjukkan
                keseragaman tekstur, dan homogeneity menunjukkan tingkat
                kemiripan piksel.
              </p>
            </div>
          )}

          {result.detections?.length > 0 && (
            <div>
              <p className="mb-2 text-sm font-semibold text-slate-700 dark:text-slate-200">
                Detail Deteksi
              </p>

              <div className="space-y-2">
                {result.detections.map((item, index) => (
                  <div
                    key={`${item.label}-${index}`}
                    className="flex items-center justify-between rounded-xl bg-slate-50 px-4 py-3 text-sm dark:bg-slate-950"
                  >
                    <span>{item.label}</span>
                    <span className="font-semibold">{item.confidence}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="rounded-2xl bg-yellow-50 p-4 text-sm text-yellow-800 dark:bg-yellow-950/40 dark:text-yellow-200">
            Hasil ini bukan diagnosis medis resmi. Konsultasikan dengan dokter
            untuk pemeriksaan lebih lanjut.
          </div>

          <button
            onClick={onDownloadPDF}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] dark:bg-white dark:text-slate-900"
          >
            <Download size={20} />
            Download Hasil PDF
          </button>
        </div>
      )}
    </div>
  );
}