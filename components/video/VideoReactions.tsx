"use client";

import { useState } from "react";
import { Flame, Heart, ThumbsUp } from "lucide-react";
import { formatCompactNumber } from "@/lib/format";
import type { ReactionType } from "@/lib/content-data";

const reactionConfig = [
  { type: "like" as ReactionType, label: "Like", Icon: ThumbsUp },
  { type: "heart" as ReactionType, label: "Love", Icon: Heart },
  { type: "fire" as ReactionType, label: "Hype", Icon: Flame },
];

export default function VideoReactions({ videoId, initialReactions }: { videoId: string; initialReactions: Record<ReactionType, number> }) {
  const [reactions, setReactions] = useState(initialReactions);
  const [pendingType, setPendingType] = useState<ReactionType | null>(null);

  async function react(type: ReactionType) {
    setPendingType(type);
    const response = await fetch(`/api/videos/${videoId}/reactions`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ type }),
    });
    const payload = await response.json();
    setPendingType(null);

    if (response.ok) {
      setReactions(payload.reactions);
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {reactionConfig.map(({ type, label, Icon }) => (
        <button
          key={type}
          onClick={() => react(type)}
          disabled={pendingType === type}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-semibold text-white/70 transition-colors hover:border-[#ff6b35]/40 hover:text-white disabled:opacity-60"
        >
          <Icon className="h-4 w-4" />
          {label}
          <span className="text-white/35">{formatCompactNumber(reactions[type])}</span>
        </button>
      ))}
    </div>
  );
}
