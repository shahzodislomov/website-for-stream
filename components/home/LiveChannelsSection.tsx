"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { headingIcons } from "@/components/home/icon-map";
import StreamCard from "@/components/StreamCard";
import { featuredStreams } from "@/components/home/home-data";

const filters = ["all", "gaming", "music", "art", "sports", "IRL"];

export default function LiveChannelsSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const FlameIcon = headingIcons.liveChannels;
  const SparklesIcon = headingIcons.all;

  const filteredStreams = useMemo(() => {
    if (activeFilter === "all") {
      return featuredStreams;
    }

    return featuredStreams.filter(
      (stream) =>
        stream.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
        stream.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase())),
    );
  }, [activeFilter]);

  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-bold flex items-center gap-3">
            <FlameIcon className="w-7 h-7 text-[#ff6b35]" />
            <span>Live Channels</span>
          </h2>
          <p className="text-white/40 text-sm mt-1">Handpicked streams for you right now</p>
        </div>
        <Link
          href="/browse"
          className="text-[#ff6b35] hover:text-[#ff9f6b] text-sm font-semibold transition-colors flex items-center gap-1"
        >
          Show more
          <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
            →
          </motion.span>
        </Link>
      </motion.div>

      <motion.div
        className="flex flex-wrap gap-2 mb-6"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        {filters.map((filter) => (
          <motion.button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
              activeFilter === filter
                ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30"
                : "bg-[#12121a] text-white/60 hover:text-white hover:bg-[#1a1a25]"
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {filter === "all" ? (
              <span className="inline-flex items-center gap-2">
                <SparklesIcon className="w-4 h-4" />
                <span>All</span>
              </span>
            ) : (
              filter.charAt(0).toUpperCase() + filter.slice(1)
            )}
          </motion.button>
        ))}
      </motion.div>

      <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        <AnimatePresence mode="popLayout">
          {filteredStreams.map((stream, index) => (
            <motion.div
              key={stream.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.1 }}
            >
              <StreamCard stream={stream} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
}
