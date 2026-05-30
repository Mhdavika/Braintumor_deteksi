"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { toast } from "sonner";
import {
  deleteDetectionHistory,
  getDetectionHistory,
} from "@/features/detection/services/detectionService";
import { DetectionHistory } from "@/features/detection/types/detection.type";
import HistorySkeleton from "@/features/detection/components/HistorySkeleton";

export default function RiwayatPage() {
  const [history, setHistory] = useState<DetectionHistory[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterClass, setFilterClass] = useState("Semua");
  const [filterRisk, setFilterRisk] = useState("Semua");

  useEffect(() => {
    async function fetchHistory() {
      try {
        const data = await getDetectionHistory();
        setHistory(data);
      } catch (error) {
        console.error(error);
        toast.error("Gagal mengambil riwayat deteksi.");
      } finally {
        setIsLoading(false);
      }
    }

    fetchHistory();
  }, []);

  const filteredHistory = useMemo(() => {
    return history.filter((item) => {
      const keyword = search.toLowerCase();

      const matchSearch =
        item.file_name?.toLowerCase().includes(keyword) ||
        item.result?.toLowerCase().includes(keyword);

      const matchClass = filterClass === "Semua" || item.result === filterClass;
      const matchRisk = filterRisk === "Semua" || item.risk_level === filterRisk;

      return matchSearch && matchClass && matchRisk;
    });
  }, [history, search, filterClass, filterRisk]);

  async function handleDelete(id: string) {
    const confirmDelete = confirm("Yakin ingin menghapus riwayat ini?");
    if (!confirmDelete) return;

    try {
      await deleteDetectionHistory(id);
      setHistory((prev) => prev.filter((item) => item.id !== id));
      toast.success("Riwayat berhasil dihapus.");
    } catch (error) {
      console.error(error);
      toast.error("Gagal menghapus riwayat.");
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 px-6 py-12 dark:bg-slate-950">
      <section className="mx-auto max-w-6xl">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
          Riwayat Deteksi
        </h1>

        <p className="mt-3 text-slate-500 dark:text-slate-400">
          Klik salah satu riwayat untuk melihat detail hasil deteksi.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Cari nama file atau hasil..."
            className="rounded-2xl border bg-white px-4 py-3 outline-none focus:border-blue-600 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          />

          <select
            value={filterClass}
            onChange={(e) => setFilterClass(e.target.value)}
            className="rounded-2xl border bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <option>Semua</option>
            <option>Glioma</option>
            <option>Meningioma</option>
            <option>Pituitary</option>
            <option>No Tumor</option>
            <option>Tidak Terdeteksi</option>
          </select>

          <select
            value={filterRisk}
            onChange={(e) => setFilterRisk(e.target.value)}
            className="rounded-2xl border bg-white px-4 py-3 dark:border-slate-800 dark:bg-slate-900 dark:text-white"
          >
            <option>Semua</option>
            <option>Rendah</option>
            <option>Sedang</option>
            <option>Tinggi</option>
          </select>
        </div>

        {isLoading && <HistorySkeleton />}

        {!isLoading && filteredHistory.length === 0 && (
          <div className="mt-8 rounded-3xl border bg-white p-8 text-center dark:border-slate-800 dark:bg-slate-900">
            <p className="text-slate-500">Riwayat tidak ditemukan.</p>
          </div>
        )}

        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {filteredHistory.map((item) => (
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

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(item.id);
                  }}
                  className="mt-4 flex items-center gap-2 rounded-xl bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 hover:bg-red-100 dark:bg-red-950/40 dark:text-red-300"
                >
                  <Trash2 size={16} />
                  Hapus
                </button>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}