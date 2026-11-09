"use client";

import { useState } from "react";
import Link from "next/link";
import { ShoppingBag, Trash2 } from "lucide-react";

interface CartItem {
  id: number;
  nama: string;
  harga: number;
  qty: number;
}

const createOrder = (items: CartItem[]) => {
  const total = items.reduce((sum, item) => sum + item.harga * item.qty, 0);

  return {
    id: `${Date.now()}`,
    date: new Date().toISOString(),
    items: items.map((item) => ({
      id: item.id,
      nama: item.nama,
      harga: item.harga,
      qty: item.qty,
    })),
    grandTotal: total,
  };
};

const getSavedCart = (): CartItem[] => {
  if (typeof window === "undefined") return [];

  try {
    const savedCart = JSON.parse(localStorage.getItem("keranjang") ?? "[]");
    return Array.isArray(savedCart) ? savedCart : [];
  } catch {
    return [];
  }
};

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(getSavedCart);

  const total = items.reduce((sum, item) => sum + item.harga * item.qty, 0);

  const removeItem = (id: number) => {
    const nextItems = items.filter((item) => item.id !== id);
    setItems(nextItems);
    localStorage.setItem("keranjang", JSON.stringify(nextItems));
  };

  const checkout = () => {
    if (items.length === 0) return;

    const savedHistory = JSON.parse(localStorage.getItem("riwayat") ?? "[]");
    const currentHistory = Array.isArray(savedHistory) ? savedHistory : [];
    const order = createOrder(items);

    localStorage.setItem("riwayat", JSON.stringify([order, ...currentHistory]));
    setItems([]);
    localStorage.setItem("keranjang", JSON.stringify([]));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <ShoppingBag className="w-5 h-5 text-amber-400" /> Keranjang
        </h2>
        <span className="text-xs text-slate-400">{items.length} item</span>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/40 rounded-2xl border border-slate-800">
          <p className="text-slate-400 text-sm">Keranjang masih kosong.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {items.map((item) => (
            <div
              key={item.id}
              className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60 flex items-center justify-between gap-4"
            >
              <div>
                <p className="font-bold text-white">{item.nama}</p>
                <p className="text-sm text-slate-400">
                  {item.qty} x Rp {item.harga.toLocaleString("id-ID")}
                </p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-bold">
                  Rp {(item.harga * item.qty).toLocaleString("id-ID")}
                </span>
                <button
                  type="button"
                  onClick={() => removeItem(item.id)}
                  className="text-slate-400 hover:text-rose-400"
                  aria-label={`Hapus ${item.nama}`}
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="bg-slate-800 rounded-2xl border border-slate-700/60 p-4 space-y-4">
            <div className="flex justify-between text-sm text-slate-300">
              <span>Total</span>
              <span className="text-amber-400 font-black">
                Rp {total.toLocaleString("id-ID")}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={checkout}
                className="flex-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-xl text-sm"
              >
                Checkout
              </button>
              <Link
                href="/menu"
                className="flex-1 text-center bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 rounded-xl text-sm"
              >
                Lanjut Belanja
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
