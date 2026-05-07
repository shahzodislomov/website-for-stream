import { NextResponse } from "next/server";
import { videos } from "@/lib/content-data";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase();
  const vertical = searchParams.get("vertical");
  const status = searchParams.get("status");
  const limit = Number.parseInt(searchParams.get("limit") || "24", 10);
  const offset = Number.parseInt(searchParams.get("offset") || "0", 10);

  let results = [...videos];

  if (q) {
    results = results.filter((video) =>
      [video.title, video.description, video.creatorName, video.category, video.vertical ?? "", ...video.tags]
        .some((field) => field.toLowerCase().includes(q)),
    );
  }

  if (vertical) {
    results = results.filter((video) => video.vertical === vertical);
  }

  if (status) {
    results = results.filter((video) => video.status === status);
  }

  return NextResponse.json({ videos: results.slice(offset, offset + limit), total: results.length, limit, offset });
}
