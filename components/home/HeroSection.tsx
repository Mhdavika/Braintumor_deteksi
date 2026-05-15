"use client";

import { motion } from "framer-motion";
import { ArrowRight, Brain, ShieldCheck, Lock, Sparkles } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 px-6 py-16 dark:from-slate-950 dark:via-slate-900 dark:to-blue-950">
      <div className="mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -32 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-blue-700 shadow-sm dark:bg-slate-900 dark:text-blue-300">
            <Sparkles size={16} />
            AI untuk analisis awal MRI otak
          </div>

          <h1 className="text-4xl font-extrabold leading-tight text-slate-950 dark:text-white md:text-6xl">
            Deteksi Dini,{" "}
            <span className="text-blue-600">Harapan Lebih Besar</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-600 dark:text-slate-300">
            Gunakan teknologi AI untuk membantu mendeteksi kemungkinan tumor
            otak dari gambar MRI dengan cepat, interaktif, dan mudah digunakan.
          </p>

          <a
            href="#deteksi"
            className="mt-8 inline-flex items-center gap-2 rounded-2xl bg-blue-600 px-6 py-4 font-semibold text-white shadow-lg shadow-blue-600/20 transition hover:scale-[1.03] hover:bg-blue-700"
          >
            Mulai Deteksi
            <ArrowRight size={20} />
          </a>

          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            <div className="flex items-center gap-3">
              <ShieldCheck className="text-blue-600" />
              <div>
                <p className="text-sm font-bold dark:text-white">
                  Akurat & Cepat
                </p>
                <p className="text-xs text-slate-500">
                  Analisis AI
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Lock className="text-purple-600" />
              <div>
                <p className="text-sm font-bold dark:text-white">
                  Aman & Privat
                </p>
                <p className="text-xs text-slate-500">
                  Data tersimpan
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Brain className="text-cyan-600" />
              <div>
                <p className="text-sm font-bold dark:text-white">
                  Didukung AI
                </p>
                <p className="text-xs text-slate-500">
                  Model YOLO
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-blue-400/20 blur-3xl" />

          <div className="relative rounded-[2rem] border bg-white/70 p-6 shadow-2xl backdrop-blur dark:border-slate-800 dark:bg-slate-900/70">
            <div className="flex aspect-square items-center justify-center rounded-[1.5rem] bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-slate-800 dark:to-blue-950">
              <Brain className="h-40 w-40 text-blue-600" />
            </div>

            <div className="absolute right-4 top-1/2 rounded-2xl bg-white p-4 shadow-xl dark:bg-slate-900">
              <div className="mb-2 flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-500" />
                <p className="text-sm font-bold dark:text-white">
                  Area Mencurigakan
                </p>
              </div>
              <p className="text-sm text-slate-500">
                Kemungkinan: Tumor
              </p>
              <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Probabilitas: 87.6%
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}