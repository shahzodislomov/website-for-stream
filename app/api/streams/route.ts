import { NextResponse } from "next/server";
import { featuredStreams } from "@/components/home/home-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const vertical = searchParams.get("vertical");
  const tag = searchParams.get("tag");
  const limit = Number.parseInt(searchParams.get("limit") || "20", 10);
  const offset = Number.parseInt(searchParams.get("offset") || "0", 10);

  let streams = [...featuredStreams];

  if (category) {
    streams = streams.filter((stream) => stream.category.toLowerCase() === category.toLowerCase());
  }

  if (vertical) {
    streams = streams.filter((stream) => stream.vertical === vertical);
  }

  if (tag) {
    streams = streams.filter((stream) => stream.tags.some((item) => item.toLowerCase().includes(tag.toLowerCase())));
  }

  return NextResponse.json({
    streams: streams.slice(offset, offset + limit),
    total: streams.length,
    limit,
    offset,
  });
}
