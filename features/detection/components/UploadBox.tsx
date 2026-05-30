"use client";

import { useState } from "react";
import { UploadCloud } from "lucide-react";

type UploadBoxProps = {
  previewUrl: string;
  annotatedImage?: string;
  errorMessage?: string;
  onSelectFile: (file: File) => void;
};

export default function UploadBox({
  previewUrl,
  annotatedImage,
  errorMessage,
  onSelectFile,
}: UploadBoxProps) {
  const [viewMode, setViewMode] = useState<"original" | "detected">("original");
  const [isDragging, setIsDragging] = useState(false);

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (!selectedFile) return;

    setViewMode("original");
    onSelectFile(selectedFile);
  }

  function handleDrop(event: React.DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);

    const droppedFile = event.dataTransfer.files?.[0];
    if (!droppedFile) return;

    setViewMode("original");
    onSelectFile(droppedFile);
  }

  const detectedImageUrl = annotatedImage
    ? `data:image/jpeg;base64,${annotatedImage}`
    : "";

  const imageToShow =
    viewMode === "detected" && detectedImageUrl ? detectedImageUrl : previewUrl;

  return (
    <div className="rounded-3xl border bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
      <div className="mb-4 flex items-center gap-3">
        <div className="rounded-2xl bg-blue-100 p-3 text-blue-600 dark:bg-blue-950">
          <UploadCloud size={24} />
        </div>

        <div>
          <h2 className="font-bold text-slate-900 dark:text-white">
            Deteksi Baru
          </h2>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Unggah gambar MRI otak untuk dianalisis oleh AI.
          </p>
        </div>
      </div>

      {annotatedImage && (
        <div className="mb-4 grid grid-cols-2 rounded-2xl bg-slate-100 p-1 dark:bg-slate-800">
          <button
            type="button"
            onClick={() => setViewMode("original")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              viewMode === "original"
                ? "bg-white text-blue-600 shadow dark:bg-slate-950"
                : "text-slate-500"
            }`}
          >
            Gambar Asli
          </button>

          <button
            type="button"
            onClick={() => setViewMode("detected")}
            className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
              viewMode === "detected"
                ? "bg-white text-blue-600 shadow dark:bg-slate-950"
                : "text-slate-500"
            }`}
          >
            Hasil Deteksi
          </button>
        </div>
      )}

      <label
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={handleDrop}
        className={`flex min-h-[360px] cursor-pointer flex-col items-center justify-center rounded-3xl border-2 border-dashed p-6 text-center transition ${
          isDragging
            ? "scale-[1.01] border-blue-600 bg-blue-100 dark:bg-blue-950"
            : "border-blue-300 bg-blue-50/40 hover:bg-blue-50 dark:border-blue-900 dark:bg-slate-950"
        }`}
      >
        {imageToShow ? (
          <img
            src={imageToShow}
            alt={viewMode === "detected" ? "Hasil deteksi tumor" : "Preview MRI"}
            className="max-h-[320px] w-full rounded-2xl object-contain"
          />
        ) : (
          <>
            <UploadCloud size={56} className="mb-4 text-blue-600" />
            <p className="font-semibold text-slate-700 dark:text-slate-200">
              Klik untuk unggah atau seret gambar ke sini
            </p>
            <p className="mt-2 text-sm text-slate-500">
              Format: JPG, JPEG, PNG
            </p>
            <p className="text-sm text-slate-500">Maks. ukuran file: 20MB</p>
          </>
        )}

        <input
          type="file"
          accept="image/png,image/jpeg,image/jpg"
          className="hidden"
          onChange={handleChange}
        />
      </label>

      {errorMessage && (
        <p className="mt-4 rounded-2xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-950/40 dark:text-red-300">
          {errorMessage}
        </p>
      )}

      <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
        {annotatedImage
          ? "Gunakan mode Gambar Asli dan Hasil Deteksi untuk membandingkan area tumor."
          : "Pastikan gambar MRI jelas dan tidak buram untuk hasil terbaik."}
      </p>
    </div>
  );
}