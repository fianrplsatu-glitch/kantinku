import Image from "next/image";
import Link from "next/link";
import { formatRupiah, MenuItem } from "@/data/menu";
import { Heart, Plus, Info } from "lucide-react";

interface KartuMenuProps {
  item: MenuItem;
  isFavorite: boolean;
  onToggleFavorite: (id: number) => void;
  onAddToCart: (item: MenuItem) => void;
}

export default function KartuMenu({
  item,
  isFavorite,
  onToggleFavorite,
  onAddToCart,
}: KartuMenuProps) {
  const isAvailable = item.stok > 0;

  return (
    <div className="bg-slate-800 rounded-2xl border border-slate-700/60 overflow-hidden flex flex-col justify-between group hover:border-slate-600 transition-all">
      <div>
        <div className="h-40 w-full relative bg-slate-950 overflow-hidden">
          <Image
            src={item.foto ?? "/"}
            alt={item.nama}
            width={400}
            height={240}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform"
          />
          <button
            onClick={() => onToggleFavorite(item.id)}
            className="absolute top-3 right-3 p-2 rounded-full bg-slate-900/80 backdrop-blur-md text-slate-300 hover:text-rose-500"
          >
            <Heart
              className={`w-4 h-4 ${isFavorite ? "fill-rose-500 text-rose-500" : ""}`}
            />
          </button>
        </div>
        <div className="p-4 space-y-2">
          <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md">
            {item.kategori}
          </span>
          <h3 className="font-bold text-white text-base">{item.nama}</h3>
          <p className="text-amber-400 font-extrabold text-lg">
            {formatRupiah(item.harga)}
          </p>
          <div className="flex justify-between items-center text-xs text-slate-400 pt-1">
            <span>
              Stok:{" "}
              <strong
                className={isAvailable ? "text-slate-200" : "text-rose-400"}
              >
                {item.stok}
              </strong>
            </span>
            {!isAvailable && (
              <span className="font-bold text-rose-400 bg-rose-500/10 px-2 py-0.5 rounded">
                Habis
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="p-4 pt-0 grid grid-cols-2 gap-2">
        <Link
          href={`/menu/${item.id}`}
          className="bg-slate-700 hover:bg-slate-600 text-white font-semibold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 text-center"
        >
          <Info className="w-3.5 h-3.5" /> Detail
        </Link>
        {isAvailable ? (
          <button
            onClick={() => onAddToCart(item)}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-2 px-3 rounded-xl text-xs flex items-center justify-center gap-1 shadow-md shadow-amber-500/10"
          >
            <Plus className="w-3.5 h-3.5 stroke-[3]" /> Beli
          </button>
        ) : (
          <button
            disabled
            className="bg-slate-800 text-slate-600 font-bold py-2 px-3 rounded-xl text-xs cursor-not-allowed"
          >
            Habis
          </button>
        )}
      </div>
    </div>
  );
}
