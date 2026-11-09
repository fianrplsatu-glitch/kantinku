export interface MenuItem {
  id: number;
  nama: string;
  kategori: 'Makanan' | 'Minuman' | 'Cemilan';
  harga: number;
  stok: number;
  deskripsi?: string;
  foto?: string;
}

export const menu: MenuItem[] = [
  {
    id: 1,
    nama: "Nasi Goreng Spesial",
    kategori: "Makanan",
    harga: 12000,
    stok: 15,
  },
  { id: 2, nama: "Mie Ayam", kategori: "Makanan", harga: 10000, stok: 8 },
  { id: 3, nama: "Es Teh Manis", kategori: "Minuman", harga: 3000, stok: 48 },
  { id: 4, nama: "Jual Alpukat", kategori: "Minuman", harga: 8000, stok: 0 },
  { id: 5, nama: "Pisang Goreng", kategori: "Makanan", harga: 5000, stok: 20 },
  { id: 6, nama: "Risol Mayo", kategori: "Cemilan", harga: 4000, stok: 3 },
];

export const daftarMenu = menu;

export function rupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

export const formatRupiah = rupiah;
