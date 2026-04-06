import { NextResponse } from "next/server";

const categories = [
  { id: "fortnite", name: "Fortnite", viewers: 312000, color: "#1e3a5f", icon: "target", streams: 1240 },
  { id: "league-of-legends", name: "League of Legends", viewers: 289000, color: "#1a1a3e", icon: "sword", streams: 2150 },
  { id: "minecraft", name: "Minecraft", viewers: 198000, color: "#0a2e0a", icon: "pickaxe", streams: 890 },
  { id: "valorant", name: "VALORANT", viewers: 176000, color: "#3e1a1a", icon: "crosshair", streams: 1580 },
  { id: "gta", name: "GTA V", viewers: 154000, color: "#2e2e1a", icon: "car", streams: 720 },
  { id: "music", name: "Music", viewers: 98000, color: "#1a1a3e", icon: "music", streams: 450 },
  { id: "just-chatting", name: "Just Chatting", viewers: 445000, color: "#3e1a3e", icon: "messages", streams: 3200 },
  { id: "irl", name: "IRL", viewers: 87000, color: "#3e2e1a", icon: "smartphone", streams: 380 },
  { id: "csgo", name: "CS2", viewers: 145000, color: "#2e1a2e", icon: "🎖️", streams: 980 },
  { id: "apex", name: "Apex Legends", viewers: 112000, color: "#3e0a1a", icon: "🦊", streams: 650 },
  { id: "escaperoom", name: "Escape Room", viewers: 45000, color: "#1a2e2e", icon: "🔐", streams: 120 },
  { id: "poker", name: "Poker", viewers: 78000, color: "#2e1a0a", icon: "🃏", streams: 210 },
];

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const limit = parseInt(searchParams.get("limit") || "12");
  const offset = parseInt(searchParams.get("offset") || "0");

  const paginated = categories.slice(offset, offset + limit);

  return NextResponse.json({
    categories: paginated,
    total: categories.length,
    limit,
    offset,
  });
}
