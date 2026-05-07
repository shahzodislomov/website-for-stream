import { featuredStreams, trendingStreamers } from "@/components/home/home-data";
import { slugify } from "@/lib/format";

export type VideoStatus = "live" | "vod" | "premiere";
export type ReactionType = "like" | "heart" | "fire";

export interface CreatorProfile {
  id: string;
  name: string;
  handle: string;
  avatarColor: string;
  category: string;
  followers: number;
  bio: string;
}

export interface VideoItem {
  id: string;
  streamId: string;
  title: string;
  description: string;
  creatorId: string;
  creatorName: string;
  category: string;
  vertical?: string;
  tags: string[];
  status: VideoStatus;
  viewers: number;
  durationSeconds: number;
  thumbnailColor: string;
  thumbnailUrl?: string;
  playbackUrl: string;
  sourceProvider: "demo" | "pexels" | "mux" | "youtube" | "twitch";
  publishedAt: string;
}

export interface VideoComment {
  id: string;
  videoId: string;
  userId: string;
  authorName: string;
  authorAvatarColor: string;
  body: string;
  createdAt: string;
  likes: number;
}

const demoPlaybackUrls = [
  "https://videos.pexels.com/video-files/3163534/3163534-uhd_2560_1440_30fps.mp4",
  "https://videos.pexels.com/video-files/3129671/3129671-uhd_2560_1440_30fps.mp4",
  "https://videos.pexels.com/video-files/857195/857195-hd_1280_720_25fps.mp4",
  "https://videos.pexels.com/video-files/854959/854959-hd_1280_720_25fps.mp4",
];

export const creators: CreatorProfile[] = trendingStreamers.map((creator) => ({
  id: slugify(creator.name),
  name: creator.name,
  handle: `@${slugify(creator.name)}`,
  avatarColor: creator.avatarColor,
  category: creator.category,
  followers: creator.viewers * 6,
  bio: `${creator.name} streams ${creator.category} with an active live community.`,
}));

export const videos: VideoItem[] = featuredStreams.map((stream, index) => ({
  id: stream.id,
  streamId: stream.id,
  title: stream.title,
  description: stream.description ?? `Live ${stream.category} stream from ${stream.streamer}.`,
  creatorId: slugify(stream.streamer),
  creatorName: stream.streamer,
  category: stream.category,
  vertical: stream.vertical,
  tags: stream.tags,
  status: index < 6 ? "live" : "vod",
  viewers: stream.viewers,
  durationSeconds: 1800 + index * 420,
  thumbnailColor: stream.thumbnailColor,
  playbackUrl: demoPlaybackUrls[index % demoPlaybackUrls.length],
  sourceProvider: "demo",
  publishedAt: new Date(Date.UTC(2026, 4, 7, 9, index * 7)).toISOString(),
}));

const initialComments: VideoComment[] = [
  {
    id: "comment-1",
    videoId: "nightowl",
    userId: "demo-riley",
    authorName: "Riley",
    authorAvatarColor: "#00d4aa",
    body: "That route through Stormveil was clean. What split are you aiming for?",
    createdAt: "2026-05-07T09:45:00.000Z",
    likes: 12,
  },
  {
    id: "comment-2",
    videoId: "nightowl",
    userId: "demo-mika",
    authorName: "Mika",
    authorAvatarColor: "#ff9f6b",
    body: "The movement tech explanation helps a lot. Keep the run going!",
    createdAt: "2026-05-07T09:50:00.000Z",
    likes: 8,
  },
  {
    id: "comment-3",
    videoId: "lunabeats",
    userId: "demo-sam",
    authorName: "Sam",
    authorAvatarColor: "#7c3aed",
    body: "Can you play the synth loop again? It fits the drums perfectly.",
    createdAt: "2026-05-07T10:05:00.000Z",
    likes: 5,
  },
];

export const commentsStore: VideoComment[] = [...initialComments];
export const reactionStore = new Map<string, Record<ReactionType, number>>(
  videos.map((video, index) => [video.id, { like: 120 + index * 17, heart: 48 + index * 9, fire: 31 + index * 11 }]),
);

export function findVideoById(id: string) {
  return videos.find((video) => video.id === id);
}

export function getCommentsForVideo(videoId: string) {
  return commentsStore
    .filter((comment) => comment.videoId === videoId)
    .sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
}

export function getDemoUser(request: Request) {
  // Clerk-ready seam: replace this with `const { userId } = await auth.protect()`
  // and `currentUser()` once @clerk/nextjs is configured.
  const userName = request.headers.get("x-demo-user-name")?.trim() || "Guest Viewer";
  const userId = request.headers.get("x-demo-user-id")?.trim() || slugify(userName);

  return {
    id: userId,
    name: userName,
    avatarColor: "#ff6b35",
  };
}
