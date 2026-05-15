import Link from "next/link";
import { Brain } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 border-b bg-white/80 px-6 py-4 backdrop-blur dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="rounded-2xl bg-blue-600 p-2 text-white">
            <Brain size={24} />
          </div>

          <div>
            <p className="font-extrabold text-blue-600">BrainScan AI</p>
            <p className="text-xs text-slate-500">Deteksi Tumor Otak</p>
          </div>
        </Link>

        <div className="hidden items-center gap-6 text-sm font-medium text-slate-600 dark:text-slate-300 md:flex">
          <Link href="/">Beranda</Link>
          <Link href="/tentang">Tentang</Link>
          <Link href="/informasi">Informasi</Link>
          <Link href="/riwayat">Riwayat</Link>
        </div>
      </div>
    </nav>
  );
}