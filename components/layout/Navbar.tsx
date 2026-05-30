"use client";

import Link from "next/link";
import { Brain } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { toast } from "sonner";
import { supabase } from "@/lib/supabase";
import ThemeToggle from "@/components/theme/ThemeToggle";

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      data.subscription.unsubscribe();
    };
  }, []);

  async function handleLogout() {
    await supabase.auth.signOut();
    setUser(null);
    toast.success("Logout berhasil.");
  }

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

          {user ? (
            <button onClick={handleLogout} className="text-red-600">
              Logout
            </button>
          ) : (
            <Link href="/login">Login</Link>
          )}

          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}