import { NextResponse } from "next/server";
import { categories, featuredStreams, trendingStreamers } from "@/components/home/home-data";
import { slugify } from "@/lib/format";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.trim().toLowerCase() || "";
  const type = searchParams.get("type");

  if (!query) {
    return NextResponse.json({ streams: [], categories: [], streamers: [], total: 0, query: "" });
  }

  const matches = (...parts: string[]) => parts.some((part) => part.toLowerCase().includes(query));

  const streams = type === "categories" || type === "streamers"
    ? []
    : featuredStreams.filter((stream) =>
        matches(stream.title, stream.streamer, stream.category, stream.vertical ?? "", ...stream.tags),
      );

  const categoryResults = type === "streams" || type === "streamers"
    ? []
    : categories.filter((category) => matches(category.name, category.id));

  const streamers = type === "streams" || type === "categories"
    ? []
    : trendingStreamers
        .filter((streamer) => matches(streamer.name, streamer.category))
        .map((streamer) => ({
          id: slugify(streamer.name),
          name: streamer.name,
          followers: streamer.viewers * 6,
          category: streamer.category,
          avatarColor: streamer.avatarColor,
        }));

  return NextResponse.json({
    query,
    streams,
    categories: categoryResults,
    streamers,
    total: streams.length + categoryResults.length + streamers.length,
  });
}
