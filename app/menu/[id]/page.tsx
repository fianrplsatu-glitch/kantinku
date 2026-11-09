import { daftarMenu, formatRupiah } from "@/data/menu";
import Link from "next/link";
import { Plus } from "lucide-react";

export const dynamic = "force-dynamic";

interface PageProps {
  params: {
    id: string;
  };
}

export default function DetailMenuPage({ params }: PageProps) {
  const { id } = params;
  const item = daftarMenu.find((m) => m.id === Number(id));

  // Jika ID tidak ditemukan, tampilkan halaman 404
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
        <div className="flex justify-between items-center">
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
          <img
            src={item.foto}
            alt={item.nama}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-black text-white">{item.nama}</h2>
          <p className="text-2xl font-extrabold text-amber-400">
            {formatRupiah(item.harga)}
          </p>
          <p className="text-xs text-slate-400">
            Stok Tersedia:{" "}
            <strong className="text-slate-200">{item.stok}</strong>
          </p>
        </div>

        <div className="bg-slate-900/60 p-4 rounded-2xl border border-slate-800 text-sm text-slate-300">
          <p className="font-semibold text-white mb-1 text-xs uppercase tracking-wider text-amber-400">
            Deskripsi Menu
          </p>
          {item.deskripsi}
        </div>

        {item.stok > 0 ? (
          <button className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-3 rounded-2xl text-sm flex items-center justify-center gap-2 shadow-lg shadow-amber-500/20">
            <Plus className="w-4 h-4 stroke-[3]" /> Tambah ke Keranjang
          </button>
        ) : (
          <div className="w-full py-3 text-center text-xs font-bold text-rose-400 bg-rose-500/10 rounded-2xl border border-rose-500/20">
            Maaf, Stok Menu Ini Habis
          </div>
        )}
      </div>
    </div>
  );
}
