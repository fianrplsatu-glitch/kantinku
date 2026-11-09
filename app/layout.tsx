import "./globals.css";
import Link from "next/link";
import {
  Home,
  UtensilsCrossed,
  Heart,
  ShoppingBag,
  Receipt,
} from "lucide-react";

export const metadata = {
  title: "KantinKu",
  description: "Pesan Menu Kantin Sekolah Cepat & Mudah",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans">
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-30 shadow-lg">
          <div className="max-w-6xl mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-amber-500 p-2.5 rounded-xl text-slate-900 shadow-md">
                <UtensilsCrossed className="w-6 h-6 stroke-[2.5]" />
              </div>
              <div>
                <h1 className="text-2xl font-black tracking-tight text-white flex items-center gap-1.5">
                  Kantin<span className="text-amber-400">Ku</span>
                </h1>
                <p className="text-xs text-slate-400">
                  Pesan Menu Kantin Sekolah Cepat & Mudah
                </p>
              </div>
            </Link>

            {/* Navbar Utama dengan 5 Menu */}
            <nav className="flex items-center bg-slate-900/60 p-1.5 rounded-xl border border-slate-700/60 gap-1 overflow-x-auto">
              <Link
                href="/"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <Home className="w-4 h-4" /> Beranda
              </Link>
              <Link
                href="/menu"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <UtensilsCrossed className="w-4 h-4" /> Menu
              </Link>
              <Link
                href="/favorit"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <Heart className="w-4 h-4" /> Favorit
              </Link>
              <Link
                href="/cart"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <ShoppingBag className="w-4 h-4" /> Keranjang
              </Link>
              <Link
                href="/riwayat"
                className="flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs font-semibold text-slate-300 hover:text-white transition-all"
              >
                <Receipt className="w-4 h-4" /> Riwayat
              </Link>
            </nav>
          </div>
        </header>

        <main className="flex-1 max-w-6xl w-full mx-auto p-4 sm:p-6">
          {children}
        </main>
      </body>
    </html>
  );
}
