"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Heart, ShoppingBag, UtensilsCrossed } from "lucide-react";
import { daftarMenu, formatRupiah } from "@/data/menu";

const getFavoriteCount = () => {
  if (typeof window === "undefined") return 0;

  try {
    const savedFavorites = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    return Array.isArray(savedFavorites) ? savedFavorites.length : 0;
  } catch {
    return 0;
  }
};

const getCartCount = () => {
  if (typeof window === "undefined") return 0;

  try {
    const savedCart = JSON.parse(localStorage.getItem("keranjang") ?? "[]");
    return Array.isArray(savedCart)
      ? savedCart.reduce((total, item) => total + (item.qty || 0), 0)
      : 0;
  } catch {
    return 0;
  }
};

export default function Page() {
  const [favoriteCount, setFavoriteCount] = useState(getFavoriteCount);
  const [cartCount, setCartCount] = useState(getCartCount);

  useEffect(() => {
    const syncCounts = () => {
      setFavoriteCount(getFavoriteCount());
      setCartCount(getCartCount());
    };

    syncCounts();
    window.addEventListener("storage", syncCounts);
    return () => window.removeEventListener("storage", syncCounts);
  }, []);

  const featured = daftarMenu.slice(0, 3);

  return (
    <div className="space-y-8">
      <section className="bg-gradient-to-br from-slate-800 to-slate-900 border border-slate-700 rounded-3xl p-6 md:p-8 shadow-2xl">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="space-y-4 max-w-xl">
            <span className="inline-flex items-center gap-2 bg-amber-500/10 text-amber-400 border border-amber-500/30 px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
              <UtensilsCrossed className="w-3.5 h-3.5" />
              KantinKu hari ini
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-white leading-tight">
              Mau makan enak?{" "}
              <span className="text-amber-400">Pesan sekarang</span>
            </h1>
            <p className="text-slate-300 text-sm md:text-base">
              Pilih menu favorit, lihat detail, dan nikmati pesanan dengan cepat
              dan mudah.
            </p>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/menu"
                className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black px-5 py-3 rounded-2xl text-sm"
              >
                Lihat Menu
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/favorit"
                className="inline-flex items-center gap-2 bg-slate-700 hover:bg-slate-600 text-white font-bold px-5 py-3 rounded-2xl text-sm"
              >
                <Heart className="w-4 h-4" /> Favorit
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 w-full max-w-xs">
            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4">
              <p className="text-xs text-slate-400">Menu</p>
              <p className="mt-2 text-2xl font-black text-white">
                {daftarMenu.length}
              </p>
            </div>
            <div className="bg-slate-900/70 border border-slate-700 rounded-2xl p-4">
              <p className="text-xs text-slate-400">Favorit</p>
              <p className="mt-2 text-2xl font-black text-rose-400">
                {favoriteCount}
              </p>
            </div>
            <div className="col-span-2 bg-slate-900/70 border border-slate-700 rounded-2xl p-4 flex items-center justify-between">
              <div>
                <p className="text-xs text-slate-400">Keranjang</p>
                <p className="mt-1 text-lg font-bold text-amber-400">
                  {cartCount > 0 ? `${cartCount} item` : "Siap checkout"}
                </p>
              </div>
              <ShoppingBag className="w-5 h-5 text-amber-400" />
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-white">Pilihan hari ini</h2>
          <Link
            href="/menu"
            className="text-xs text-amber-400 font-semibold hover:text-amber-300"
          >
            Lihat semua
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {featured.map((item) => (
            <Link
              key={item.id}
              href={`/menu/${item.id}`}
              className="block bg-slate-800 border border-slate-700 rounded-2xl overflow-hidden hover:border-slate-600 transition-all"
            >
              <div className="h-36 bg-slate-950">
                <Image
                  src={item.foto ?? "/"}
                  alt={item.nama}
                  width={400}
                  height={240}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                  {item.kategori}
                </span>
                <h3 className="font-bold text-white text-base">{item.nama}</h3>
                <p className="text-amber-400 font-extrabold text-lg">
                  {formatRupiah(item.harga)}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
