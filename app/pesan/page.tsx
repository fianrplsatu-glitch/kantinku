"use client";

import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { submitPesan } from "@/app/actions";

// Komponen tombol terpisah untuk membaca status 'pending'
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold py-3 px-4 rounded-xl transition-all disabled:opacity-50"
    >
      {pending ? "Memproses..." : "Kirim Pesanan"}
    </button>
  );
}

const initialState = {
  success: false,
  message: "",
  errors: {},
};

export default function PesanPage() {
  const [state, formAction] = useActionState(submitPesan, initialState);

  return (
    <div className="max-w-md mx-auto p-6 bg-slate-800 border border-slate-700 rounded-2xl shadow-xl space-y-6">
      <h2 className="text-xl font-bold text-white">
        Formulir Pemesanan KantinKu
      </h2>

      {state?.success && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs">
          {state.message}
        </div>
      )}

      <form action={formAction} className="space-y-4">
        {/* Kolom Nama */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Nama Lengkap
          </label>
          <input
            type="text"
            name="nama"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            placeholder="Masukkan nama..."
          />
          {state?.errors?.nama && (
            <p className="text-rose-400 text-xs mt-1">{state.errors.nama}</p>
          )}
        </div>

        {/* Kolom Email */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            placeholder="nama@email.com"
          />
          {state?.errors?.email && (
            <p className="text-rose-400 text-xs mt-1">{state.errors.email}</p>
          )}
        </div>

        {/* Kolom Jumlah */}
        <div>
          <label className="block text-xs font-semibold text-slate-300 mb-1">
            Jumlah Porsi
          </label>
          <input
            type="number"
            name="jumlah"
            className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3 py-2 text-sm text-white focus:outline-none focus:border-amber-500"
            placeholder="0"
          />
          {state?.errors?.jumlah && (
            <p className="text-rose-400 text-xs mt-1">{state.errors.jumlah}</p>
          )}
        </div>

        {/* Tombol dengan status otomatis */}
        <SubmitButton />
      </form>
    </div>
  );
}
