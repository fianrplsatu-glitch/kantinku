"use server";

export type PesanState = {
  success: boolean;
  message: string;
  errors: Partial<Record<"nama" | "email" | "jumlah", string>>;
};

export async function submitPesan(
  _prevState: PesanState,
  formData: FormData,
): Promise<PesanState> {
  const nama = formData.get("nama")?.toString().trim() || "";
  const email = formData.get("email")?.toString().trim() || "";
  const jumlahStr = formData.get("jumlah")?.toString() || "0";
  const jumlah = parseInt(jumlahStr, 10);

  const errors: Record<string, string> = {};

  // Validasi di server
  if (!nama) {
    errors.nama = "Nama wajib diisi.";
  }
  if (!email || !email.includes("@")) {
    errors.email = "Format email tidak valid.";
  }
  if (isNaN(jumlah) || jumlah <= 0) {
    errors.jumlah = "Jumlah harus lebih besar dari 0.";
  }

  // Contoh simulasi cek sisa kuota (misal kuota maksimal 10)
  const sisaKuota = 5;
  if (jumlah > sisaKuota) {
    errors.jumlah = `Jumlah melebihi sisa kuota (${sisaKuota}).`;
  }

  if (Object.keys(errors).length > 0) {
    return { success: false, message: "", errors };
  }

  // Simulasi proses penyimpanan ke database
  await new Promise((resolve) => setTimeout(resolve, 1000));

  return {
    success: true,
    message: "Pesanan berhasil dikirim!",
    errors: {},
  };
}
