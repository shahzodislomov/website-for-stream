import { NextResponse } from "next/server";

const allStreams = [
  { id: "nightowl", title: "Elden Ring Speedrun", streamer: "NightOwlGaming", category: "Elden Ring", viewers: 42800 },
  { id: "pixeljane", title: "Chill Minecraft survival", streamer: "PixelJane", category: "Minecraft", viewers: 18500 },
  { id: "dropkick", title: "VALORANT Ranked Grind", streamer: "DropkickAce", category: "VALORANT", viewers: 31200 },
  { id: "lunabeats", title: "Lo-fi beats & chill vibes", streamer: "LunaBeats", category: "Music", viewers: 9700 },
  { id: "codewithsam", title: "Building a full-stack app", streamer: "CodeWithSam", category: "Dev", viewers: 5400 },
  { id: "wildcardmike", title: "Pro Wrestling Championship", streamer: "WildcardMike", category: "Sports", viewers: 22100 },
  { id: "chefclarence", title: "Sunday Brunch Cooking", streamer: "ChefClarence", category: "Food", viewers: 4200 },
  { id: "cosmicquinn", title: "Starfield 100% Completion", streamer: "CosmicQuinn", category: "Starfield", viewers: 12600 },
];

const allCategories = [
  { id: "fortnite", name: "Fortnite", viewers: 312000, icon: "target" },
  { id: "league-of-legends", name: "League of Legends", viewers: 289000, icon: "sword" },
  { id: "minecraft", name: "Minecraft", viewers: 198000, icon: "pickaxe" },
  { id: "valorant", name: "VALORANT", viewers: 176000, icon: "crosshair" },
  { id: "gta", name: "GTA V", viewers: 154000, icon: "car" },
  { id: "music", name: "Music", viewers: 98000, icon: "music" },
  { id: "just-chatting", name: "Just Chatting", viewers: 445000, icon: "messages" },
  { id: "irl", name: "IRL", viewers: 87000, icon: "smartphone" },
];

const streamers = [
  { id: "nightowlgaming", name: "NightOwlGaming", followers: 125000, category: "Elden Ring", avatarColor: "#ff6b35" },
  { id: "pixeljane", name: "PixelJane", followers: 89000, category: "Minecraft", avatarColor: "#00d4aa" },
  { id: "dropkickace", name: "DropkickAce", followers: 156000, category: "VALORANT", avatarColor: "#ff3366" },
  { id: "lunabeats", name: "LunaBeats", followers: 67000, category: "Music", avatarColor: "#ff9f6b" },
  { id: "codewithsam", name: "CodeWithSam", followers: 45000, category: "Dev", avatarColor: "#7c3aed" },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get("q")?.toLowerCase() || "";
  const type = searchParams.get("type"); // streams, categories, streamers, all

  if (!query) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 });
  }

  let results: {
    streams?: typeof allStreams;
    categories?: typeof allCategories;
    streamers?: typeof streamers;
  } = {};

  if (type === "streams" || type === "all" || !type) {
    results.streams = allStreams.filter(
      (s) =>
        s.title.toLowerCase().includes(query) ||
        s.streamer.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
    );
  }

  if (type === "categories" || type === "all" || !type) {
    results.categories = allCategories.filter(
      (c) => c.name.toLowerCase().includes(query)
    );
  }

  if (type === "streamers" || type === "all" || !type) {
    results.streamers = streamers.filter(
      (s) =>
        s.name.toLowerCase().includes(query) ||
        s.category.toLowerCase().includes(query)
    );
  }

  return NextResponse.json({
    query,
    ...results,
    total: (results.streams?.length || 0) + (results.categories?.length || 0) + (results.streamers?.length || 0),
  });
}
