export interface MenuItem {
  id: number;
  nama: string;
  kategori: 'Makanan' | 'Minuman' | 'Cemilan';
  harga: number;
  stok: number;
  deskripsi?: string;
  foto?: string;
}

const createMenuPhoto = (label: string) =>
  `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="240" viewBox="0 0 400 240">
      <rect width="400" height="240" fill="#0f172a"/>
      <rect x="18" y="18" width="364" height="204" rx="22" fill="#f59e0b" fill-opacity="0.12"/>
      <text x="200" y="122" text-anchor="middle" fill="#fbbf24" font-size="28" font-family="Arial, sans-serif" font-weight="700">${label}</text>
    </svg>
  `)}`;

export const menu: MenuItem[] = [
  {
    id: 1,
    nama: "Nasi Goreng Spesial",
    kategori: "Makanan",
    harga: 12000,
    stok: 15,
    foto: createMenuPhoto("Nasi Goreng"),
  },
  {
    id: 2,
    nama: "Mie Ayam",
    kategori: "Makanan",
    harga: 10000,
    stok: 8,
    foto: createMenuPhoto("Mie Ayam"),
  },
  {
    id: 3,
    nama: "Es Teh Manis",
    kategori: "Minuman",
    harga: 3000,
    stok: 48,
    foto: createMenuPhoto("Es Teh"),
  },
  {
    id: 4,
    nama: "Jual Alpukat",
    kategori: "Minuman",
    harga: 8000,
    stok: 0,
    foto: createMenuPhoto("Alpukat"),
  },
  {
    id: 5,
    nama: "Pisang Goreng",
    kategori: "Makanan",
    harga: 5000,
    stok: 20,
    foto: createMenuPhoto("Pisang Goreng"),
  },
  {
    id: 6,
    nama: "Risol Mayo",
    kategori: "Cemilan",
    harga: 4000,
    stok: 3,
    foto: createMenuPhoto("Risol"),
  },
];

export const daftarMenu = menu;

export function rupiah(n: number) {
  return "Rp" + n.toLocaleString("id-ID");
}

export const formatRupiah = rupiah;
