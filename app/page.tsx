"use client";

import {
  Heart,
  Home,
  Receipt,
  ShoppingBag,
  UtensilsCrossed,
} from "lucide-react";
import { useState } from "react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("beranda");
  const favorites: Array<{ id: number }> = [];
  const cart: Array<{ id: number; qty: number }> = [];

  return (
    <nav className="flex items-center bg-slate-900/60 p-1.5 rounded-xl border border-slate-700/60 w-full md:w-auto justify-center overflow-x-auto gap-1">
      {/* Menu 1: Beranda */}
      <button
        onClick={() => setActiveTab("beranda")}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap ${
          activeTab === "beranda"
            ? "bg-amber-500 text-slate-950 font-extrabold shadow-md"
            : "text-slate-400 hover:text-white font-medium"
        }`}
      >
        <Home className="w-4 h-4" />
        Beranda
      </button>

      {/* Menu 2: Menu */}
      <button
        onClick={() => setActiveTab("menu")}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap ${
          activeTab === "menu"
            ? "bg-amber-500 text-slate-950 font-extrabold shadow-md"
            : "text-slate-400 hover:text-white font-medium"
        }`}
      >
        <UtensilsCrossed className="w-4 h-4" />
        Menu
      </button>

      {/* Menu 3: Favorit */}
      <button
        onClick={() => setActiveTab("favorites")}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap relative ${
          activeTab === "favorites"
            ? "bg-amber-500 text-slate-950 font-extrabold shadow-md"
            : "text-slate-400 hover:text-white font-medium"
        }`}
      >
        <Heart className="w-4 h-4" />
        Favorit
        {favorites.length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-rose-500 text-white rounded-full font-bold">
            {favorites.length}
          </span>
        )}
      </button>

      {/* Menu 4: Keranjang */}
      <button
        onClick={() => setActiveTab("cart")}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap relative ${
          activeTab === "cart"
            ? "bg-amber-500 text-slate-950 font-extrabold shadow-md"
            : "text-slate-400 hover:text-white font-medium"
        }`}
      >
        <ShoppingBag className="w-4 h-4" />
        Keranjang
        {cart.length > 0 && (
          <span className="ml-1 px-1.5 py-0.5 text-[10px] bg-amber-400 text-slate-950 rounded-full font-extrabold">
            {cart.reduce((a, c) => a + c.qty, 0)}
          </span>
        )}
      </button>

      {/* Menu 5: Riwayat */}
      <button
        onClick={() => setActiveTab("history")}
        className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-xs sm:text-sm transition-all whitespace-nowrap ${
          activeTab === "history"
            ? "bg-amber-500 text-slate-950 font-extrabold shadow-md"
            : "text-slate-400 hover:text-white font-medium"
        }`}
      >
        <Receipt className="w-4 h-4" />
        Riwayat
      </button>
    </nav>
  );
}
