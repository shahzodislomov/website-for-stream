"use client";

import type { LucideIcon } from "lucide-react";
import {
  BadgeHelp,
  BarChart3,
  Compass,
  Flame,
  Gamepad2,
  Globe,
  HandCoins,
  MonitorPlay,
  Music4,
  Pickaxe,
  Radio,
  Search,
  Shield,
  Smartphone,
  Sparkles,
  Sword,
  Target,
  TrendingUp,
  Tv,
  Users,
  Video,
  Zap,
} from "lucide-react";

export type CategoryIconName =
  | "target"
  | "sword"
  | "pickaxe"
  | "crosshair"
  | "car"
  | "music"
  | "messages"
  | "smartphone";

export type FeatureIconName =
  | "zap"
  | "globe"
  | "coins"
  | "shield"
  | "chart"
  | "mobile";

const categoryIcons: Record<CategoryIconName, LucideIcon> = {
  target: Target,
  sword: Sword,
  pickaxe: Pickaxe,
  crosshair: Compass,
  car: MonitorPlay,
  music: Music4,
  messages: BadgeHelp,
  smartphone: Smartphone,
};

const featureIcons: Record<FeatureIconName, LucideIcon> = {
  zap: Zap,
  globe: Globe,
  coins: HandCoins,
  shield: Shield,
  chart: BarChart3,
  mobile: Smartphone,
};

const categoryIconsById = {
  fortnite: Target,
  "league-of-legends": Sword,
  minecraft: Pickaxe,
  valorant: Compass,
  gta: MonitorPlay,
  music: Music4,
  "just-chatting": Users,
  irl: Smartphone,
} as const;

export function getCategoryIcon(icon: CategoryIconName): LucideIcon {
  return categoryIcons[icon];
}

export function getFeatureIcon(icon: FeatureIconName): LucideIcon {
  return featureIcons[icon];
}

export function getCategoryIconById(id: string): LucideIcon {
  return categoryIconsById[id as keyof typeof categoryIconsById] ?? Tv;
}

export const headingIcons = {
  liveChannels: Flame,
  topCategories: Gamepad2,
  trending: TrendingUp,
  streams: Radio,
  categories: Gamepad2,
  creators: Users,
  search: Search,
  all: Sparkles,
  music: Music4,
  gaming: Gamepad2,
  hot: Flame,
  newFeatures: Sparkles,
  watch: Video,
  community: Users,
};
