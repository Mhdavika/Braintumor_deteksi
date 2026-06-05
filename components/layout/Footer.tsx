import Link from "next/link";
import { Brain, Send, ShieldCheck, Bot } from "lucide-react";
import {
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="relative border-t border-slate-200 bg-slate-50 px-6 pt-12 dark:border-slate-800 dark:bg-slate-950">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 pb-16 md:grid-cols-2 lg:grid-cols-4">
          {/* BRAND */}
          <div>
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-white">
                <Brain size={22} />
              </div>

              <h2 className="text-3xl font-black text-blue-600">
                BrainScan
              </h2>
            </Link>

            <p className="mt-6 max-w-sm text-base leading-8 text-slate-600 dark:text-slate-300">
              Mendefinisikan ulang masa depan neuro-diagnostik melalui
              kecerdasan buatan. Kami berdedikasi untuk memberikan akses
              deteksi dini yang presisi bagi semua orang.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <a
                href="https://instagram.com/_alfaanmn"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-pink-500 hover:text-pink-500 dark:border-slate-800 dark:bg-slate-900"
              >
                <FaInstagram size={19} />
              </a>

              <a
                href="https://github.com/Mhdavika"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-slate-900 hover:text-slate-900 dark:border-slate-800 dark:bg-slate-900 dark:hover:text-white"
              >
                <FaGithub size={19} />
              </a>

              <a
                href="https://wa.me/6285163720894?text=Halo%20saya%20ingin%20bertanya%20tentang%20BrainScan%20AI"
                target="_blank"
                rel="noreferrer"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition hover:border-green-600 hover:text-green-600 dark:border-slate-800 dark:bg-slate-900"
              >
              <FaWhatsapp size={20} />
            </a>
            </div>
          </div>

          {/* NAVIGATION */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Navigasi Cepat
            </h3>

            <div className="mt-6 space-y-4 text-base text-slate-600 dark:text-slate-300">
              <Link href="/" className="block transition hover:text-blue-600">
                Beranda
              </Link>

              <Link
                href="/tentang"
                className="block transition hover:text-blue-600"
              >
                Tentang Kami
              </Link>

              <Link
                href="/informasi"
                className="block transition hover:text-blue-600"
              >
                Informasi Medis
              </Link>

              <Link
                href="/riwayat"
                className="block transition hover:text-blue-600"
              >
                Riwayat Diagnosis
              </Link>
            </div>
          </div>

          {/* LEGAL */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Legal & Dukungan
            </h3>

            <div className="mt-6 space-y-4 text-base text-slate-600 dark:text-slate-300">
              <Link href="#" className="block transition hover:text-blue-600">
                Kebijakan Privasi
              </Link>

              <Link href="#" className="block transition hover:text-blue-600">
                Syarat & Ketentuan
              </Link>

              <Link href="#" className="block transition hover:text-blue-600">
                Medical Disclaimer
              </Link>

              <Link
                href="mailto:your@email.com"
                className="block font-semibold text-blue-600 transition hover:text-blue-700"
              >
                Pusat Bantuan 24/7
              </Link>
            </div>
          </div>

          {/* CONNECT */}
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Tetap Terhubung
            </h3>

            <p className="mt-6 max-w-sm text-base leading-7 text-slate-600 dark:text-slate-300">
              Dapatkan update terbaru mengenai perkembangan teknologi AI medis
              kami.
            </p>

            <form className="mt-7 flex max-w-sm items-center rounded-full border border-slate-200 bg-white p-1 shadow-sm dark:border-slate-800 dark:bg-slate-900">
              <input
                type="text"
                placeholder="Pesan Anda"
                className="min-w-0 flex-1 bg-transparent px-5 py-3 text-sm text-slate-700 outline-none placeholder:text-slate-400 dark:text-white"
              />

              <button
                type="button"
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-blue-600 text-white transition hover:scale-105 hover:bg-blue-700"
              >
                <Send size={18} />
              </button>
            </form>
          </div>
        </div>

        {/* BOTTOM */}
        <div className="flex flex-col gap-4 border-t border-slate-200 py-7 dark:border-slate-800 md:flex-row md:items-center md:justify-between">
          <p className="text-sm tracking-wide text-slate-500 dark:text-slate-400">
            © {new Date().getFullYear()} BrainScan . All rights reserved.
          </p>

          <div className="flex items-center gap-5 text-xs text-slate-400">
            <div className="flex items-center gap-1">
              <ShieldCheck size={14} />
              ISO 27001 Certified
            </div>

            <div className="flex items-center gap-1">
              <Bot size={14} />
              HIPAA Compatible
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}