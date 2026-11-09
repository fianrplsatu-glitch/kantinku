import { NextResponse } from "next/server";
import { daftarMenu } from "@/data/menu";

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const item = daftarMenu.find((menu) => menu.id === Number(id));

  if (!item) {
    return NextResponse.json(
      { pesan: "Menu tidak ditemukan" },
      { status: 404 },
    );
  }

  return NextResponse.json(item);
}
