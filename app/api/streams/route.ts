import { NextResponse } from "next/server";

const streams = [
  {
    id: "nightowl",
    title: "Elden Ring Speedrun — Any% No Major Glitches",
    streamer: "NightOwlGaming",
    category: "Elden Ring",
    viewers: 42800,
    thumbnailColor: "#1a0a2e",
    avatarColor: "#ff6b35",
    tags: ["Speedrun", "Souls-like", "English"],
    description: "Chasing that WR! Day 45 of grinding. Any% No Major Glitches category.",
    isLive: true,
  },
  {
    id: "pixeljane",
    title: "Chill Minecraft survival — Day 47 of building a kingdom!",
    streamer: "PixelJane",
    category: "Minecraft",
    viewers: 18500,
    thumbnailColor: "#0a1a0a",
    avatarColor: "#00d4aa",
    tags: ["Survival", "Building", "Chill"],
    description: "Building a massive castle! Come hang out and chat!",
    isLive: true,
  },
  {
    id: "dropkick",
    title: "VALORANT Ranked Grind — Road to Radiant",
    streamer: "DropkickAce",
    category: "VALORANT",
    viewers: 31200,
    thumbnailColor: "#2e0a1a",
    avatarColor: "#ff3366",
    tags: ["FPS", "Ranked", "Pro"],
    description: "Solo queue to Radiant! Let's go!",
    isLive: true,
  },
  {
    id: "lunabeats",
    title: "Lo-fi beats & chill vibes — request a song!",
    streamer: "LunaBeats",
    category: "Music",
    viewers: 9700,
    thumbnailColor: "#0a0a2e",
    avatarColor: "#ff9f6b",
    tags: ["Lo-fi", "Music", "Chill"],
    description: "24/7 lo-fi beats to study/relax to. Drop your requests!",
    isLive: true,
  },
  {
    id: "codewithsam",
    title: "Building a full-stack app LIVE — Next.js + PostgreSQL",
    streamer: "CodeWithSam",
    category: "Dev",
    viewers: 5400,
    thumbnailColor: "#0a1a2e",
    avatarColor: "#7c3aed",
    tags: ["Coding", "Next.js", "Educational"],
    description: "Building a SaaS from scratch. Follow along and learn!",
    isLive: true,
  },
  {
    id: "wildcardmike",
    title: "Pro Wrestling Championship — Main Event Night!",
    streamer: "WildcardMike",
    category: "Sports",
    viewers: 22100,
    thumbnailColor: "#2e1a0a",
    avatarColor: "#fbbf24",
    tags: ["Wrestling", "Sports", "Live Event"],
    description: "Championship match tonight! Don't miss it!",
    isLive: true,
  },
  {
    id: "chefclarence",
    title: "Sunday Brunch Cooking — making eggs benedict from scratch",
    streamer: "ChefClarence",
    category: "Food",
    viewers: 4200,
    thumbnailColor: "#2e0a0a",
    avatarColor: "#f97316",
    tags: ["Cooking", "Food", "IRL"],
    description: "Classic brunch recipes! Ask me anything!",
    isLive: true,
  },
  {
    id: "cosmicquinn",
    title: "Starfield 100% Completion — day 12",
    streamer: "CosmicQuinn",
    category: "Starfield",
    viewers: 12600,
    thumbnailColor: "#001a2e",
    avatarColor: "#3b82f6",
    tags: ["RPG", "Exploration", "English"],
    description: "100% completion run! Every quest, every achievement!",
    isLive: true,
  },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const category = searchParams.get("category");
  const tag = searchParams.get("tag");
  const limit = parseInt(searchParams.get("limit") || "20");
  const offset = parseInt(searchParams.get("offset") || "0");

  let filteredStreams = [...streams];

  if (category) {
    filteredStreams = filteredStreams.filter(
      (s) => s.category.toLowerCase() === category.toLowerCase()
    );
  }

  if (tag) {
    filteredStreams = filteredStreams.filter(
      (s) => s.tags.some((t) => t.toLowerCase().includes(tag.toLowerCase()))
    );
  }

  const paginated = filteredStreams.slice(offset, offset + limit);

  return NextResponse.json({
    streams: paginated,
    total: filteredStreams.length,
    limit,
    offset,
  });
}