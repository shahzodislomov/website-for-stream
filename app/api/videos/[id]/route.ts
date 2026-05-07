import { NextResponse } from "next/server";
import { findVideoById, getCommentsForVideo, reactionStore } from "@/lib/content-data";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const video = findVideoById(id);

  if (!video) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  return NextResponse.json({
    video,
    comments: getCommentsForVideo(id),
    reactions: reactionStore.get(id) ?? { like: 0, heart: 0, fire: 0 },
  });
}
