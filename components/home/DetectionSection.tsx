"use client";

import { motion } from "framer-motion";
import UploadBox from "@/features/detection/components/UploadBox";
import ResultCard from "@/features/detection/components/ResultCard";
import LoadingProgress from "@/features/detection/components/LoadingProgress";
import { useDetection } from "@/features/detection/hooks/useDetection";
import { downloadDetectionPDF } from "@/features/detection/utils/pdfGenerator";

export default function DetectionSection() {
  const {
    previewUrl,
    result,
    isLoading,
    loadingStep,
    errorMessage,
    handleSelectFile,
    handleDetect,
    resetDetection,
  } = useDetection();

  async function handleDownloadPDF() {
    if (!result) return;

    await downloadDetectionPDF({
      result,
      originalImage: previewUrl,
    });
  }

  return (
    <section id="deteksi" className="mx-auto max-w-6xl px-6 py-10">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="grid gap-8 lg:grid-cols-2"
      >
        <div>
          <UploadBox
            previewUrl={previewUrl}
            annotatedImage={result?.annotated_image}
            errorMessage={errorMessage}
            onSelectFile={handleSelectFile}
          />

          <LoadingProgress step={loadingStep} />

          <div className="mt-5 flex gap-3">
            <button
              onClick={handleDetect}
              disabled={isLoading}
              className="flex-1 rounded-2xl bg-blue-600 px-5 py-3 font-semibold text-white transition hover:scale-[1.02] hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? "Memproses..." : "Mulai Deteksi"}
            </button>

            <button
              onClick={resetDetection}
              className="rounded-2xl border px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-slate-800 dark:text-slate-200 dark:hover:bg-slate-900"
            >
              Reset
            </button>
          </div>
        </div>

        <div>
          <ResultCard
            result={result} 
            isLoading={isLoading}
            onDownloadPDF={handleDownloadPDF}
          />
        </div>
      </motion.div>
    </section>
  );
}
