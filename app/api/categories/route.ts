import { NextResponse } from "next/server";
import { categories } from "@/components/home/home-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = Number.parseInt(searchParams.get("limit") || "12", 10);
  const offset = Number.parseInt(searchParams.get("offset") || "0", 10);

  return NextResponse.json({
    categories: categories.slice(offset, offset + limit),
    total: categories.length,
    limit,
    offset,
  });
}
