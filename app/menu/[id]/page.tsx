"use client";

import { use, useState } from "react";
import { daftarMenu, formatRupiah } from "@/data/menu";
import Link from "next/link";
import Image from "next/image";
import { Heart, Plus } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const getFavoriteStatus = (id: string) => {
  if (typeof window === "undefined") return false;

  try {
    const savedFavs = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    return Array.isArray(savedFavs) && savedFavs.includes(Number(id));
  } catch {
    return false;
  }
};

const createOrderEntry = (item: { id: number; nama: string; harga: number }) => ({
  id: `${Date.now()}`,
  date: new Date().toISOString(),
  items: [{ id: item.id, nama: item.nama, harga: item.harga, qty: 1 }],
  grandTotal: item.harga,
});

const addToHistory = (item: { id: number; nama: string; harga: number }) => {
  const savedHistory = JSON.parse(localStorage.getItem("riwayat") ?? "[]");
  const currentHistory = Array.isArray(savedHistory) ? savedHistory : [];

  localStorage.setItem("riwayat", JSON.stringify([createOrderEntry(item), ...currentHistory]));
};

export default function DetailMenuPage({ params }: PageProps) {
  const { id } = use(params);
  const item = daftarMenu.find((m) => m.id === Number(id)) ?? null;
  const [isFavorite, setIsFavorite] = useState(() => getFavoriteStatus(id));

  const toggleFavorite = () => {
    if (!item) return;

    const savedFavs = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    const ids = Array.isArray(savedFavs) ? savedFavs : [];
    const nextFavs = ids.includes(item.id)
      ? ids.filter((favId) => favId !== item.id)
      : [...ids, item.id];

    localStorage.setItem("favorit", JSON.stringify(nextFavs));
    setIsFavorite(nextFavs.includes(item.id));
  };

  const addToCart = () => {
    if (!item) return;

    const savedCart = JSON.parse(localStorage.getItem("keranjang") ?? "[]");
    const currentCart = Array.isArray(savedCart) ? savedCart : [];
    const existingIndex = currentCart.findIndex((cartItem) => cartItem.id === item.id);
    const nextCart = [...currentCart];

    if (existingIndex >= 0) {
      nextCart[existingIndex].qty += 1;
    } else {
      nextCart.push({ id: item.id, nama: item.nama, harga: item.harga, qty: 1 });
    }

    localStorage.setItem("keranjang", JSON.stringify(nextCart));
    addToHistory(item);
  };

  if (!item) {
    return (
      <div className="max-w-xl mx-auto text-center py-24 bg-slate-800/40 rounded-3xl border border-slate-800 space-y-4">
        <div className="w-16 h-16 bg-rose-500/20 text-rose-400 rounded-full flex items-center justify-center mx-auto text-2xl font-black">
          404
        </div>
        <h2 className="text-xl font-bold text-white">Menu Tidak Ditemukan</h2>
        <p className="text-slate-400 text-xs">
          ID menu &quot;{id}&quot; tidak terdaftar di kantin.
        </p>
        <Link
          href="/menu"
          className="inline-block px-5 py-2.5 bg-amber-500 text-slate-950 font-bold rounded-xl text-xs"
        >
          Kembali ke Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto space-y-6">
      <div className="bg-slate-800 rounded-3xl border border-slate-700/80 overflow-hidden shadow-2xl p-6 space-y-6">
        <div className="flex justify-between items-center gap-3">
          <span className="px-3 py-1 bg-amber-500/10 text-amber-400 font-bold text-xs uppercase rounded-lg">
            {item.kategori}
          </span>
          <Link
            href="/menu"
            className="text-slate-400 hover:text-white text-xs font-semibold"
          >
            &larr; Kembali ke Katalog
          </Link>
        </div>

        <div className="h-64 w-full rounded-2xl overflow-hidden bg-slate-950">
          <Image
            src={item.foto ?? "/"}
            alt={item.nama}
            width={640}
            height={420}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">{item.nama}</h2>
          <p className="text-2xl font-extrabold text-amber-400">
            {formatRupiah(item.harga)}
          </p>
          <p className="text-xs text-slate-400">
            Stok Tersedia: <strong className="text-slate-200">{item.stok}</strong>
          </p>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-sm text-slate-300">
          <p className="font-semibold text-white mb-1 text-xs uppercase tracking-wider text-amber-400">
            Deskripsi Menu
          </p>
          {item.deskripsi ?? "Menu favorit dengan rasa yang nikmat dan cocok untuk dinikmati kapan saja."}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <button
            type="button"
            onClick={toggleFavorite}
            className={`w-full font-bold py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg ${
              isFavorite
                ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                : "bg-slate-700 text-white border border-slate-600"
            }`}
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
            />
            {isFavorite ? "Favorit" : "Tambah favorit"}
          </button>

          {item.stok > 0 ? (
            <button
              type="button"
              onClick={addToCart}
              className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20"
            >
              <Plus className="w-4 h-4 stroke-[3]" /> Tambah ke Keranjang
            </button>
          ) : (
            <div className="w-full py-3 text-center text-xs font-bold text-rose-400 bg-rose-500/10 rounded-2xl border border-rose-500/20">
              Maaf, Stok Menu Ini Habis
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
