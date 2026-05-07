import { NextResponse } from "next/server";
import { findVideoById, reactionStore, type ReactionType } from "@/lib/content-data";

const validReactions = new Set<ReactionType>(["like", "heart", "fire"]);

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!findVideoById(id)) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  return NextResponse.json({ reactions: reactionStore.get(id) ?? { like: 0, heart: 0, fire: 0 } });
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  if (!findVideoById(id)) {
    return NextResponse.json({ error: "Video not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null) as { type?: ReactionType } | null;
  const type = body?.type;

  if (!type || !validReactions.has(type)) {
    return NextResponse.json({ error: "Invalid reaction type" }, { status: 400 });
  }

  const current = reactionStore.get(id) ?? { like: 0, heart: 0, fire: 0 };
  const updated = { ...current, [type]: current[type] + 1 };
  reactionStore.set(id, updated);

  return NextResponse.json({ reactions: updated });
}
