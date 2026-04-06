"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { headingIcons } from "@/components/home/icon-map";
import { formatCompactViewers, trendingStreamers } from "@/components/home/home-data";

export default function CommunitySection() {
  const TrendingIcon = headingIcons.trending;

  return (
    <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
      <motion.div
        className="md:col-span-2"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-3">
          <TrendingIcon className="w-7 h-7 text-[#ff9f6b]" />
          <span>Trending Now</span>
        </h2>
        <div className="flex flex-col gap-3">
          {trendingStreamers.map((streamer, index) => (
            <motion.div
              key={streamer.name}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                href={`/stream/${streamer.name.toLowerCase()}`}
                className="flex items-center gap-4 p-4 rounded-xl bg-[#12121a] hover:bg-[#1a1a25] border border-white/5 hover:border-[#ff6b35]/30 transition-all group"
              >
                <motion.span
                  className="text-white/30 text-lg font-bold w-8 text-center flex-shrink-0"
                  whileHover={{ scale: 1.2, color: "#ff6b35" }}
                >
                  #{index + 1}
                </motion.span>

                <motion.div
                  className="relative w-12 h-12 rounded-full flex items-center justify-center text-white font-bold flex-shrink-0"
                  style={{ backgroundColor: streamer.avatarColor }}
                  whileHover={{ scale: 1.1 }}
                >
                  {streamer.name[0]}
                  <motion.div
                    className="absolute inset-0 rounded-full bg-current opacity-30 blur-lg"
                    animate={{ opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>

                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate group-hover:text-[#ff6b35] transition-colors">
                    {streamer.name}
                  </p>
                  <p className="text-white/40 text-sm truncate">{streamer.category}</p>
                </div>

                <div className="flex items-center gap-3 flex-shrink-0">
                  <motion.div className="flex items-center gap-1.5 text-xs" whileHover={{ scale: 1.05 }}>
                    <span className="w-2 h-2 bg-[#ff3366] rounded-full animate-pulse" />
                    <span className="text-[#ff3366] font-bold">LIVE</span>
                  </motion.div>
                  <span className="text-white/50 text-sm font-medium">
                    {formatCompactViewers(streamer.viewers)}
                  </span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <motion.div
        className="flex flex-col justify-center"
        initial={{ opacity: 0, x: 20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
      >
        <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#12121a] to-[#0a1a1a] border border-[#ff6b35]/20 rounded-2xl p-8 text-center overflow-hidden">
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-[#ff6b35]/5 to-[#00d4aa]/5"
            animate={{ backgroundPosition: ["0% 0%", "100% 100%"] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          />

          <div className="relative">
            <motion.div
              className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-[#ff6b35] to-[#ff9f6b] flex items-center justify-center shadow-lg shadow-[#ff6b35]/30"
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                />
              </svg>
            </motion.div>

            <h3 className="text-white text-xl font-bold mb-3">Start Streaming Today</h3>
            <p className="text-white/50 text-sm mb-6">
              Share your passion with millions of viewers. It&apos;s free and easy to get started.
            </p>

            <motion.button
              whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255,107,53,0.4)" }}
              whileTap={{ scale: 0.98 }}
              className="w-full py-3 bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white font-bold rounded-xl transition-all"
            >
              Get Started Free
            </motion.button>

            <p className="text-white/30 text-xs mt-4">No credit card required</p>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
