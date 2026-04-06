import type { CategoryIconName, FeatureIconName } from "@/components/home/icon-map";
import type { Category } from "@/components/CategoryCard";
import type { Stream } from "@/components/StreamCard";

export const featuredStreams: Stream[] = [
  {
    id: "nightowl",
    title: "Elden Ring Speedrun — Any% No Major Glitches",
    streamer: "NightOwlGaming",
    category: "Elden Ring",
    viewers: 42800,
    thumbnailColor: "#1a0a2e",
    avatarColor: "#ff6b35",
    tags: ["Speedrun", "Souls-like", "English"],
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
  },
];

export const categories: Category[] = [
  { id: "fortnite", name: "Fortnite", viewers: 312000, color: "#1e3a5f", icon: "target" },
  { id: "league-of-legends", name: "League of Legends", viewers: 289000, color: "#1a1a3e", icon: "sword" },
  { id: "minecraft", name: "Minecraft", viewers: 198000, color: "#0a2e0a", icon: "pickaxe" },
  { id: "valorant", name: "VALORANT", viewers: 176000, color: "#3e1a1a", icon: "crosshair" },
  { id: "gta", name: "GTA V", viewers: 154000, color: "#2e2e1a", icon: "car" },
  { id: "music", name: "Music", viewers: 98000, color: "#1a1a3e", icon: "music" },
  { id: "just-chatting", name: "Just Chatting", viewers: 445000, color: "#3e1a3e", icon: "messages" },
  { id: "irl", name: "IRL", viewers: 87000, color: "#3e2e1a", icon: "smartphone" },
];

export const trendingStreamers = [
  { name: "NightOwlGaming", viewers: 42800, category: "Elden Ring", avatarColor: "#ff6b35" },
  { name: "DropkickAce", viewers: 31200, category: "VALORANT", avatarColor: "#ff3366" },
  { name: "WildcardMike", viewers: 22100, category: "Sports", avatarColor: "#fbbf24" },
  { name: "PixelJane", viewers: 18500, category: "Minecraft", avatarColor: "#00d4aa" },
  { name: "CosmicQuinn", viewers: 12600, category: "Starfield", avatarColor: "#3b82f6" },
];

export const features = [
  {
    icon: "zap" as FeatureIconName,
    title: "Ultra-Low Latency",
    desc: "Sub-second live streaming so your viewers react in real time.",
    color: "#ff6b35",
  },
  {
    icon: "globe" as FeatureIconName,
    title: "Global Community",
    desc: "Connect with millions of passionate fans and creators worldwide.",
    color: "#00d4aa",
  },
  {
    icon: "coins" as FeatureIconName,
    title: "Earn Revenue",
    desc: "Monetize with subscriptions, bits, donations, and brand deals.",
    color: "#ff9f6b",
  },
  {
    icon: "shield" as FeatureIconName,
    title: "Safe & Moderated",
    desc: "Advanced tools to keep your community safe and harassment-free.",
    color: "#7c3aed",
  },
  {
    icon: "chart" as FeatureIconName,
    title: "Detailed Analytics",
    desc: "Understand your audience and grow your channel with data insights.",
    color: "#3b82f6",
  },
  {
    icon: "mobile" as FeatureIconName,
    title: "Mobile Ready",
    desc: "Stream and watch on any device — desktop, tablet, or mobile.",
    color: "#fbbf24",
  },
];

export const footerColumns = [
  {
    heading: "Company",
    links: ["About", "Newsroom", "Investors", "Careers", "Blog"],
  },
  {
    heading: "Support",
    links: ["Help Center", "Safety Center", "Guidelines", "Contact"],
  },
  {
    heading: "Developers",
    links: ["Developer Portal", "API Docs", "Open Source", "Status"],
  },
  {
    heading: "Legal",
    links: ["Terms", "Privacy", "Cookies", "Ad Choices"],
  },
];

export const socialLinks = ["Twitter", "Instagram", "YouTube", "Discord"];

export function formatCompactViewers(n: number): string {
  if (n >= 1000) {
    return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}K`;
  }

  return String(n);
}
