"use client";

import { useState } from "react";
import { daftarMenu } from "@/data/menu";
import KartuMenu from "@/components/KartuMenu";
import { Search, ArrowUpDown, UtensilsCrossed } from "lucide-react";

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Semua");
  const [sortBy, setSortBy] = useState("default");
  const [favorites, setFavorites] = useState<number[]>([]);

  const toggleFavorite = (id: number) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id],
    );
  };

  const filteredMenu = daftarMenu
    .filter((item) => {
      const matchesSearch = item.nama
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        selectedCategory === "Semua" || item.kategori === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "termurah") return a.harga - b.harga;
      if (sortBy === "termahal") return b.harga - a.harga;
      if (sortBy === "az") return a.nama.localeCompare(b.nama);
      return 0;
    });

  const categories = ["Semua", "Makanan", "Minuman", "Cemilan"];

  return (
    <div className="space-y-6">
      <div className="bg-slate-800/60 p-4 rounded-2xl border border-slate-700/50 space-y-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
          <div className="relative w-full md:w-80">
            <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Cari makanan atau minuman..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:border-amber-500 text-white"
            />
          </div>

          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <ArrowUpDown className="w-4 h-4 text-slate-400" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-xs font-semibold text-slate-300 focus:outline-none focus:border-amber-500"
            >
              <option value="default">Urutan awal</option>
              <option value="termurah">Harga termurah</option>
              <option value="termahal">Harga termahal</option>
              <option value="az">Nama A-Z</option>
            </select>
          </div>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? "bg-amber-500/20 text-amber-400 border border-amber-500/50"
                  : "bg-slate-900 text-slate-400 border border-slate-800 hover:border-slate-700"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {filteredMenu.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/40 rounded-2xl border border-slate-800 space-y-3">
          <UtensilsCrossed className="w-12 h-12 text-slate-600 mx-auto" />
          <p className="text-slate-300 font-semibold text-base">
            Menu tidak ditemukan.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredMenu.map((item) => (
            <KartuMenu
              key={item.id}
              item={item}
              isFavorite={favorites.includes(item.id)}
              onToggleFavorite={toggleFavorite}
              onAddToCart={(i) => alert(`${i.nama} ditambahkan ke keranjang!`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
