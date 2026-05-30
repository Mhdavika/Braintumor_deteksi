import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import ThemeProvider from "@/components/theme/ThemeProvider";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "BrainScan AI",
  description: "Website deteksi tumor otak berbasis AI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Navbar />
          {children}
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}