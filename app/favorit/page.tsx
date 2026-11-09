"use client";

import { useEffect, useState } from "react";
import { MenuItem, formatRupiah } from "@/data/menu";
import { Heart, Trash2 } from "lucide-react";
import Link from "next/link";

const getSavedFavorites = () => {
  if (typeof window === "undefined") return [];

  try {
    const savedFavs = JSON.parse(localStorage.getItem("favorit") ?? "[]");
    return Array.isArray(savedFavs) ? savedFavs : [];
  } catch {
    return [];
  }
};

export default function FavoritPage() {
  const [menuList, setMenuList] = useState<MenuItem[]>([]);
  const [favorites, setFavorites] = useState<number[]>(getSavedFavorites);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/menu")
      .then((res) => {
        if (!res.ok) throw new Error("Gagal memuat data menu");
        return res.json();
      })
      .then((data) => {
        setMenuList(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Terjadi kesalahan");
        setLoading(false);
      });
  }, []);

  const removeFavorite = (id: number) => {
    const updated = favorites.filter((fId) => fId !== id);
    setFavorites(updated);
    localStorage.setItem("favorit", JSON.stringify(updated));
  };

  if (loading) {
    return (
      <div className="text-center py-20 text-slate-400 text-sm font-semibold">
        Memuat...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-20 text-rose-400 text-sm font-semibold">
        Pesan galat: {error}
      </div>
    );
  }

  const favoriteItems = menuList.filter((item) => favorites.includes(item.id));

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold text-white flex items-center gap-2">
        <Heart className="w-5 h-5 text-rose-500 fill-rose-500" /> Menu Favorit
      </h2>

      {favoriteItems.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">Belum ada menu favorit.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {favoriteItems.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60 flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-start">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
                    {item.kategori}
                  </span>
                  <button
                    onClick={() => removeFavorite(item.id)}
                    className="text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <h3 className="font-bold text-white mt-2">{item.nama}</h3>
                <p className="text-amber-400 font-bold mt-1">
                  {formatRupiah(item.harga)}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-slate-700/50">
                <Link
                  href={`/menu/${item.id}`}
                  className="block text-center bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 rounded-xl text-xs"
                >
                  Lihat Detail
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
