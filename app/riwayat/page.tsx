"use client";

import { useState } from "react";
import { formatRupiah } from "@/data/menu";
import { Clock, Receipt, Trash2 } from "lucide-react";

interface OrderItem {
  id: number;
  nama: string;
  harga: number;
  qty: number;
}

interface Order {
  id: string;
  date: string;
  items: OrderItem[];
  grandTotal: number;
}

export default function RiwayatPage() {
  const [orders, setOrders] = useState<Order[]>(() => {
    if (typeof window === "undefined") return [];
    const savedHistory = localStorage.getItem("riwayat");
    if (!savedHistory) return [];
    try {
      const parsed = JSON.parse(savedHistory);
      const validOrders = Array.isArray(parsed) ? parsed : [];
      return [...validOrders].sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
      );
    } catch {
      return [];
    }
  });

  const handleClearHistory = () => {
    if (
      window.confirm(
        "Apakah Anda yakin ingin menghapus seluruh riwayat pesanan?",
      )
    ) {
      localStorage.removeItem("riwayat");
      setOrders([]);
    }
  };

  const totalBelanjaKeseluruhan = orders.reduce(
    (acc, curr) => acc + curr.grandTotal,
    0,
  );

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-amber-400" /> Riwayat Pesanan
        </h2>
        {orders.length > 0 && (
          <button
            onClick={handleClearHistory}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 rounded-xl text-xs font-semibold transition-all"
          >
            <Trash2 className="w-3.5 h-3.5" /> Hapus Riwayat
          </button>
        )}
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-20 bg-slate-800/40 rounded-2xl border border-slate-800">
          <Receipt className="w-12 h-12 text-slate-600 mx-auto mb-2" />
          <p className="text-slate-400 text-sm">Belum ada pesanan.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="bg-amber-500/10 border border-amber-500/30 p-4 rounded-2xl flex justify-between items-center text-xs sm:text-sm">
            <span className="text-slate-300 font-medium">
              Ringkasan: <strong>{orders.length} pesanan</strong>
            </span>
            <span className="text-amber-400 font-extrabold">
              Total Belanja: {formatRupiah(totalBelanjaKeseluruhan)}
            </span>
          </div>

          <div className="space-y-3">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-slate-800 p-4 rounded-2xl border border-slate-700/60 space-y-3"
              >
                <div className="flex justify-between items-center border-b border-slate-700/60 pb-2 text-xs">
                  <span className="font-extrabold text-amber-400">
                    #{order.id}
                  </span>
                  <span className="text-slate-400">{order.date}</span>
                </div>
                <div className="text-xs space-y-1">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-slate-300"
                    >
                      <span>
                        {item.qty}x {item.nama}
                      </span>
                      <span>{formatRupiah(item.harga * item.qty)}</span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center pt-2 border-t border-slate-700/40 text-xs font-bold">
                  <span className="text-slate-400">Total Dibayar</span>
                  <span className="text-amber-400">
                    {formatRupiah(order.grandTotal)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
