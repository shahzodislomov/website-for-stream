"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Eye } from "lucide-react";

export interface Stream {
  id: string;
  title: string;
  streamer: string;
  category: string;
  viewers: number;
  thumbnailColor: string;
  avatarColor: string;
  tags: string[];
}

function formatViewers(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function StreamCard({ stream }: { stream: Stream }) {
  return (
    <Link href={`/stream/${stream.id}`} className="group block">
      <motion.div
        whileHover={{ y: -4 }}
        transition={{ duration: 0.2 }}
      >
        {/* Thumbnail with glow effect */}
        <div
          className="relative w-full aspect-video rounded-xl overflow-hidden mb-3"
          style={{ backgroundColor: stream.thumbnailColor }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/30 via-transparent to-black/60" />

          {/* Animated glow on hover */}
          <motion.div
            className="absolute inset-0 bg-[#ff6b35]/0 group-hover:bg-[#ff6b35]/10 transition-colors duration-300"
          />

          {/* Fake stream visual with pulse */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-6 h-6 text-white/40" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 5v14l11-7z" />
              </svg>
            </motion.div>
          </div>

          {/* LIVE badge with glow */}
          <motion.div
            className="absolute top-3 left-3 flex items-center gap-1.5 bg-[#ff3366] text-white text-xs font-bold px-2.5 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
            animate={{ boxShadow: ["0 0 10px rgba(255,51,102,0.3)", "0 0 20px rgba(255,51,102,0.5)", "0 0 10px rgba(255,51,102,0.3)"] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <span className="w-1.5 h-1.5 bg-white rounded-full" />
            LIVE
          </motion.div>

          {/* Viewer count */}
          <motion.div
            className="absolute bottom-3 left-3 bg-black/70 backdrop-blur-sm text-white text-xs font-medium px-2.5 py-1 rounded-full"
            whileHover={{ scale: 1.05 }}
          >
            <span className="inline-flex items-center gap-1.5">
              <Eye className="w-3.5 h-3.5" />
              <span>{formatViewers(stream.viewers)}</span>
            </span>
          </motion.div>

          {/* Category tag */}
          <div className="absolute top-3 right-3 bg-[#ff6b35]/80 text-white text-xs font-medium px-2 py-0.5 rounded-md backdrop-blur-sm">
            {stream.category}
          </div>
        </div>

        {/* Info row with avatar */}
        <div className="flex gap-3 items-start">
          {/* Avatar with ring */}
          <motion.div
            className="relative w-10 h-10 rounded-full flex-shrink-0 flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: stream.avatarColor }}
            whileHover={{ scale: 1.1 }}
          >
            {stream.streamer[0].toUpperCase()}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-transparent group-hover:border-[#ff6b35] transition-colors"
            />
          </motion.div>

          {/* Text content */}
          <div className="min-w-0 flex-1">
            <p className="text-white text-sm font-semibold truncate group-hover:text-[#ff6b35] transition-colors leading-tight">
              {stream.title}
            </p>
            <p className="text-white/50 text-xs mt-1 truncate group-hover:text-white/70 transition-colors">
              {stream.streamer}
            </p>
            <div className="flex flex-wrap gap-1.5 mt-2">
              {stream.tags.slice(0, 3).map((tag, i) => (
                <motion.span
                  key={tag}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.1 }}
                  className="text-xs text-white/40 bg-white/5 hover:bg-[#ff6b35]/20 hover:text-[#ff6b35] px-2 py-0.5 rounded-full transition-all cursor-pointer"
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
