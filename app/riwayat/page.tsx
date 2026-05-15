"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getDetectionHistory } from "@/features/detection/services/detectionService";
import { DetectionHistory } from "@/features/detection/types/detection.type";

export default function RiwayatPage() {
  const [history, setHistory] = useState<DetectionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getDetectionHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
        alert("Gagal mengambil riwayat deteksi.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, []);

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Riwayat Deteksi
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Klik salah satu riwayat untuk melihat detail hasil deteksi.
        </p>

        {isLoading && <p className="mt-8 text-slate-500">Memuat data...</p>}

        {!isLoading && history.length === 0 && (
          <div className="mt-8 rounded-3xl border bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500">Belum ada riwayat deteksi.</p>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {history.map((item) => (
            <Link
              href={`/riwayat/${item.id}`}
              key={item.id}
              className="rounded-3xl border bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-xl dark:border-slate-800 dark:bg-slate-900"
            >
              <img
                src={item.annotated_image_url || item.image_url}
                alt={item.file_name}
                className="h-48 w-full rounded-2xl object-cover"
              />

              <div className="mt-4">
                <h2 className="font-bold text-slate-900 dark:text-white">
                  {item.result}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Probabilitas: {item.probability}
                </p>

                <p className="mt-1 text-sm text-slate-500">
                  Risiko: {item.risk_level}
                </p>

                <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
                  {item.status}
                </p>

                <p className="mt-4 text-xs text-slate-400">
                  {new Date(item.created_at).toLocaleString("id-ID")}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}