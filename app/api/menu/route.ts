import { NextResponse } from "next/server";
import { daftarMenu } from "@/data/menu";

export async function GET() {
  return NextResponse.json(daftarMenu);
}
