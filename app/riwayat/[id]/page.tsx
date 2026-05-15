"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Download, AlertTriangle, CheckCircle2 } from "lucide-react";
import { getDetectionHistoryById } from "@/features/detection/services/detectionService";
import {
  DetectionHistory,
  DetectionResult,
} from "@/features/detection/types/detection.type";
import { downloadDetectionPDF } from "@/features/detection/utils/pdfGenerator";

function getRiskStyle(risk?: string) {
  if (risk === "Tinggi") {
    return "bg-red-50 text-red-700 border-red-100";
  }

  if (risk === "Sedang") {
    return "bg-yellow-50 text-yellow-700 border-yellow-100";
  }

  return "bg-green-50 text-green-700 border-green-100";
}

function isTumorResult(result: string) {
  const lower = result.toLowerCase();

  return (
    lower !== "no tumor" &&
    lower !== "tidak terdeteksi" &&
    lower !== "tidak ada tumor"
  );
}

export default function RiwayatDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [data, setData] = useState<DetectionHistory | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"original" | "detected">("detected");

  useEffect(() => {
    async function fetchDetail() {
      try {
        const result = await getDetectionHistoryById(id);
        setData(result);
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil detail riwayat.");
      } finally {
        setIsLoading(false);
      }
    }

    if (id) fetchDetail();
  }, [id]);

  async function handleDownloadPDF() {
    if (!data) return;

    const pdfResult: DetectionResult = {
      result: data.result,
      probability: data.probability,
      status: data.status,
      risk_level: data.risk_level,
      detections: data.detections || [],
      image_url: data.image_url,
      annotated_image_url: data.annotated_image_url || "",
    };

    await downloadDetectionPDF({
      result: pdfResult,
      originalImage: data.image_url,
      patientName: data.patient_name || undefined,
      notes: data.notes || undefined,
    });
  }

  if (isLoading) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <section className="mx-auto max-w-6xl">
          <p className="text-slate-500">Memuat detail riwayat...</p>
        </section>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-12">
        <section className="mx-auto max-w-6xl">
          <p className="text-slate-500">Data riwayat tidak ditemukan.</p>
        </section>
      </main>
    );
  }

  const tumorDetected = isTumorResult(data.result);

  const imageToShow =
    viewMode === "detected" && data.annotated_image_url
      ? data.annotated_image_url
      : data.image_url;

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12">
      <section className="mx-auto max-w-6xl">
        <Link
          href="/riwayat"
          className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-600"
        >
          <ArrowLeft size={18} />
          Kembali ke Riwayat
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900">
            Detail Hasil Analisis
          </h1>
          <p className="mt-2 text-slate-500">
            Hasil deteksi MRI otak berdasarkan riwayat analisis.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="rounded-3xl border bg-white p-6 shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  Gambar Pemeriksaan
                </h2>
                <p className="mt-1 text-sm text-slate-500">
                  {data.file_name}
                </p>
              </div>

              <p className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-500">
                {new Date(data.created_at).toLocaleString("id-ID")}
              </p>
            </div>

            <div className="mt-6 grid grid-cols-2 rounded-2xl bg-slate-100 p-1">
              <button
                type="button"
                onClick={() => setViewMode("original")}
                className={`rounded-xl px-4 py-2 text-sm font-semibold transition ${
                  viewMode === "original"
                    ? "bg-white text-blue-600 shadow"
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
                    ? "bg-white text-blue-600 shadow"
                    : "text-slate-500"
                }`}
              >
                Hasil Deteksi
              </button>
            </div>

            <div className="mt-5 flex min-h-[420px] items-center justify-center rounded-3xl bg-slate-100 p-4">
              {imageToShow ? (
                <img
                  src={imageToShow}
                  alt="Gambar hasil deteksi"
                  className="max-h-[420px] w-full rounded-2xl object-contain"
                />
              ) : (
                <p className="text-slate-500">Gambar tidak tersedia.</p>
              )}
            </div>

            <p className="mt-4 text-sm text-slate-500">
              Gunakan mode Gambar Asli dan Hasil Deteksi untuk membandingkan
              area tumor yang ditandai oleh model.
            </p>
          </div>

          <div className="space-y-6">
            <div
              className={`rounded-3xl border p-6 shadow-sm ${
                tumorDetected
                  ? "border-red-100 bg-red-50 text-red-700"
                  : "border-green-100 bg-green-50 text-green-700"
              }`}
            >
              <div className="mb-4 flex items-center gap-3">
                {tumorDetected ? (
                  <AlertTriangle size={28} />
                ) : (
                  <CheckCircle2 size={28} />
                )}

                <p className="font-semibold">
                  {tumorDetected ? "Area Mencurigakan" : "Tidak Terdeteksi"}
                </p>
              </div>

              <h2 className="text-3xl font-bold">{data.result}</h2>
              <p className="mt-2 text-sm">
                Probabilitas: {data.probability}
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-3xl border bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-500">Probabilitas</p>
                <p className="mt-2 text-2xl font-bold text-slate-900">
                  {data.probability}
                </p>
              </div>

              <div
                className={`rounded-3xl border p-5 shadow-sm ${getRiskStyle(
                  data.risk_level
                )}`}
              >
                <p className="text-sm">Status Risiko</p>
                <p className="mt-2 text-2xl font-bold">{data.risk_level}</p>
              </div>
            </div>

            <div className="rounded-3xl border bg-white p-6 shadow-sm">
              <h3 className="font-bold text-slate-900">Keterangan</h3>
              <p className="mt-3 leading-7 text-slate-600">{data.status}</p>
            </div>

            {data.detections && data.detections.length > 0 && (
              <div className="rounded-3xl border bg-white p-6 shadow-sm">
                <h3 className="font-bold text-slate-900">Detail Deteksi</h3>

                <div className="mt-4 space-y-3">
                  {data.detections.map((item, index) => (
                    <div
                      key={`${item.label}-${index}`}
                      className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3 text-sm"
                    >
                      <div>
                        <p className="font-semibold text-slate-900">
                          {item.label}
                        </p>

                        {item.box && (
                          <p className="mt-1 text-xs text-slate-500">
                            Box: x1 {item.box.x1}, y1 {item.box.y1}, x2{" "}
                            {item.box.x2}, y2 {item.box.y2}
                          </p>
                        )}
                      </div>

                      <p className="font-bold text-blue-600">
                        {item.confidence}%
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div className="rounded-3xl border bg-yellow-50 p-5 text-sm leading-6 text-yellow-800">
              Hasil ini bukan diagnosis medis resmi. Sistem hanya digunakan
              sebagai alat bantu analisis awal. Konsultasikan dengan dokter atau
              tenaga medis profesional untuk pemeriksaan lebih lanjut.
            </div>

            <button
              onClick={handleDownloadPDF}
              className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-5 py-4 font-semibold text-white transition hover:scale-[1.02]"
            >
              <Download size={20} />
              Download Laporan PDF
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}