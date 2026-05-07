import { NextResponse } from "next/server";
import { commentsStore, findVideoById, getCommentsForVideo, getDemoUser } from "@/lib/content-data";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!findVideoById(id)) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  return NextResponse.json({ comments: getCommentsForVideo(id) });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!findVideoById(id)) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null) as { body?: string } | null;
  const commentBody = body?.body?.trim();

  if (!commentBody || commentBody.length < 2) {
    return NextResponse.json({ error: "Comment must be at least 2 characters" }, { status: 400 });
  }

  if (commentBody.length > 500) {
    return NextResponse.json({ error: "Comment must be 500 characters or less" }, { status: 400 });
  }

  const user = getDemoUser(request);
  const comment = {
    id: `comment-${Date.now()}`,
    videoId: id,
    userId: user.id,
    authorName: user.name,
    authorAvatarColor: user.avatarColor,
    body: commentBody,
    createdAt: new Date().toISOString(),
    likes: 0,
  };

  commentsStore.push(comment);

  return NextResponse.json({ comment }, { status: 201 });
}
