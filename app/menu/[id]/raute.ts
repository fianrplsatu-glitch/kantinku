import { NextResponse } from "next/server";
import { daftarMenu } from "@/data/menu";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  const { id } = await params;
  const item = daftarMenu.find((m) => m.id === Number(id));

  if (!item) {
    return NextResponse.json(
      { pesan: "Menu tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(item);
}
