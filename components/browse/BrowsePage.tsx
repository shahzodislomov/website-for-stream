"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Flame, Gamepad2, ListFilter, Search, Sparkles, TrendingUp } from "lucide-react";
import Navbar from "@/components/Navbar";
import CategoryCard from "@/components/CategoryCard";
import StreamCard from "@/components/StreamCard";
import SiteFooter from "@/components/home/SiteFooter";
import { categories, featuredStreams, formatCompactViewers } from "@/components/home/home-data";

const browseFilters = [
  { id: "all", label: "All", icon: Sparkles },
  { id: "gaming", label: "Gaming", icon: Gamepad2 },
  { id: "music", label: "Music", icon: TrendingUp },
  { id: "sports", label: "Sports", icon: Flame },
  { id: "irl", label: "IRL", icon: Search },
];

const sortOptions = [
  { id: "featured", label: "Featured" },
  { id: "viewers", label: "Most Viewers" },
  { id: "alphabetical", label: "A to Z" },
];

export default function BrowsePage() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [sortBy, setSortBy] = useState("featured");

  const visibleStreams = useMemo(() => {
    const filtered =
      activeFilter === "all"
        ? featuredStreams
        : featuredStreams.filter(
            (stream) =>
              stream.category.toLowerCase().includes(activeFilter.toLowerCase()) ||
              stream.tags.some((tag) => tag.toLowerCase().includes(activeFilter.toLowerCase())),
          );

    if (sortBy === "viewers") {
      return [...filtered].sort((a, b) => b.viewers - a.viewers);
    }

    if (sortBy === "alphabetical") {
      return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [activeFilter, sortBy]);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />

      <main className="max-w-screen-2xl mx-auto px-4 py-10 space-y-10">
        <section className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[radial-gradient(circle_at_top_left,rgba(255,107,53,0.18),transparent_32%),radial-gradient(circle_at_top_right,rgba(0,212,170,0.14),transparent_28%),linear-gradient(180deg,#101018_0%,#0a0a0f_100%)] p-8 md:p-10">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:42px_42px] opacity-50" />
          <div className="relative flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#ff6b35]/30 bg-[#ff6b35]/10 px-4 py-2 text-sm font-semibold text-[#ff9f6b]">
                <ListFilter className="h-4 w-4" />
                Browse live right now
              </div>
              <h1 className="mt-5 text-4xl font-black tracking-tight text-white md:text-5xl">
                Find the next stream worth staying for
              </h1>
              <p className="mt-4 max-w-2xl text-base text-white/55 md:text-lg">
                Explore trending broadcasts, jump into fast-moving categories, and scan what the community is
                watching right now without digging through the home page.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                { label: "Live channels", value: `${featuredStreams.length}` },
                { label: "Top categories", value: `${categories.length}` },
                { label: "Peak audience", value: formatCompactViewers(Math.max(...featuredStreams.map((s) => s.viewers))) },
              ].map((stat) => (
                <div key={stat.label} className="rounded-2xl border border-white/8 bg-white/5 px-4 py-4 backdrop-blur-sm">
                  <p className="text-xl font-black text-white">{stat.value}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-white/35">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="grid gap-8 xl:grid-cols-[minmax(0,1fr)_320px]">
          <div className="space-y-8">
            <div className="flex flex-col gap-4 rounded-3xl border border-white/8 bg-[#101018] p-5 md:flex-row md:items-center md:justify-between">
              <div className="flex flex-wrap gap-2">
                {browseFilters.map(({ id, label, icon: Icon }) => (
                  <motion.button
                    key={id}
                    onClick={() => setActiveFilter(id)}
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-all ${
                      activeFilter === id
                        ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/25"
                        : "bg-white/5 text-white/65 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </motion.button>
                ))}
              </div>

              <div className="inline-flex items-center gap-3 rounded-full border border-white/8 bg-[#0a0a0f] px-3 py-2 text-sm text-white/65">
                <span className="font-medium text-white/45">Sort</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-transparent font-semibold text-white outline-none"
                >
                  {sortOptions.map((option) => (
                    <option key={option.id} value={option.id} className="bg-[#12121a] text-white">
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <section>
              <div className="mb-6 flex items-center justify-between gap-4">
                <div>
                  <h2 className="flex items-center gap-3 text-2xl font-bold text-white">
                    <Flame className="h-6 w-6 text-[#ff6b35]" />
                    Live Channels
                  </h2>
                  <p className="mt-1 text-sm text-white/40">
                    {visibleStreams.length} stream{visibleStreams.length === 1 ? "" : "s"} available in this view
                  </p>
                </div>

                <Link
                  href="/search"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff9f6b] transition-colors hover:text-[#ff6b35]"
                >
                  Advanced search
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {visibleStreams.map((stream, index) => (
                  <motion.div
                    key={stream.id}
                    initial={{ opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <StreamCard stream={stream} />
                  </motion.div>
                ))}
              </div>
            </section>
          </div>

          <aside className="space-y-6">
            <section className="rounded-3xl border border-white/8 bg-[#101018] p-5">
              <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                <Gamepad2 className="h-5 w-5 text-[#00d4aa]" />
                Top Categories
              </h2>
              <p className="mt-2 text-sm text-white/45">Jump straight into the busiest corners of StreamHub.</p>
              <div className="mt-5 grid grid-cols-2 gap-3">
                {categories.slice(0, 6).map((category, index) => (
                  <motion.div
                    key={category.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.08 + index * 0.04 }}
                  >
                    <CategoryCard category={category} />
                  </motion.div>
                ))}
              </div>
            </section>

            <section className="rounded-3xl border border-[#ff6b35]/20 bg-[linear-gradient(180deg,rgba(255,107,53,0.12),rgba(255,107,53,0.03))] p-5">
              <h2 className="flex items-center gap-3 text-xl font-bold text-white">
                <TrendingUp className="h-5 w-5 text-[#ff9f6b]" />
                Browse Tips
              </h2>
              <div className="mt-4 space-y-3 text-sm text-white/60">
                <p>Use filters to cut down the feed before you dive into search.</p>
                <p>Sort by viewers if you want the biggest rooms first.</p>
                <p>Open a category card when you want a faster genre-based sweep.</p>
              </div>
            </section>
          </aside>
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
