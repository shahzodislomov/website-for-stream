"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StreamCard, { type Stream } from "@/components/StreamCard";
import CategoryCard, { type Category } from "@/components/CategoryCard";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const featuredStreams: Stream[] = [
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

const categories: Category[] = [
  { id: "fortnite", name: "Fortnite", viewers: 312000, color: "#1e3a5f", icon: "🎯" },
  { id: "league-of-legends", name: "League of Legends", viewers: 289000, color: "#1a1a3e", icon: "⚔️" },
  { id: "minecraft", name: "Minecraft", viewers: 198000, color: "#0a2e0a", icon: "⛏️" },
  { id: "valorant", name: "VALORANT", viewers: 176000, color: "#3e1a1a", icon: "🔫" },
  { id: "gta", name: "GTA V", viewers: 154000, color: "#2e2e1a", icon: "🚗" },
  { id: "music", name: "Music", viewers: 98000, color: "#1a1a3e", icon: "🎵" },
  { id: "just-chatting", name: "Just Chatting", viewers: 445000, color: "#3e1a3e", icon: "💬" },
  { id: "irl", name: "IRL", viewers: 87000, color: "#3e2e1a", icon: "📱" },
];

const trendingStreamers = [
  { name: "NightOwlGaming", viewers: 42800, category: "Elden Ring", avatarColor: "#ff6b35", status: "live" },
  { name: "DropkickAce", viewers: 31200, category: "VALORANT", avatarColor: "#ff3366", status: "live" },
  { name: "WildcardMike", viewers: 22100, category: "Sports", avatarColor: "#fbbf24", status: "live" },
  { name: "PixelJane", viewers: 18500, category: "Minecraft", avatarColor: "#00d4aa", status: "live" },
  { name: "CosmicQuinn", viewers: 12600, category: "Starfield", avatarColor: "#3b82f6", status: "live" },
];

function formatViewers(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("all");
  const filters = ["all", "gaming", "music", "art", "sports", "IRL"];

  const filteredStreams = activeFilter === "all" 
    ? featuredStreams 
    : featuredStreams.filter(s => 
        s.category.toLowerCase().includes(activeFilter) || 
        s.tags.some(t => t.toLowerCase().includes(activeFilter))
      );

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <HeroSection />

      <main className="max-w-screen-2xl mx-auto px-4 py-10 space-y-16">
        {/* Live Streams Section with filters */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6"
          >
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold">
                🔥 Live Channels
              </h2>
              <p className="text-white/40 text-sm mt-1">
                Handpicked streams for you right now
              </p>
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

          {/* Filter tabs */}
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
                {filter === "all" ? "✨ All" : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </motion.div>

          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            <AnimatePresence mode="popLayout">
              {filteredStreams.map((stream, i) => (
                <motion.div
                  key={stream.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <StreamCard stream={stream} />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </section>

        {/* Animated divider */}
        <motion.div 
          className="relative h-px bg-gradient-to-r from-transparent via-[#ff6b35]/30 to-transparent"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        />

        {/* Categories Section */}
        <section>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-6"
          >
            <div>
              <h2 className="text-white text-2xl md:text-3xl font-bold">
                🎮 Top Categories
              </h2>
              <p className="text-white/40 text-sm mt-1">
                Browse what&apos;s trending right now
              </p>
            </div>
            <Link
              href="/categories"
              className="text-[#00d4aa] hover:text-[#00f5c4] text-sm font-semibold transition-colors flex items-center gap-1"
            >
              All categories 
              <span>→</span>
            </Link>
          </motion.div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {categories.map((category, i) => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <CategoryCard category={category} />
              </motion.div>
            ))}
          </div>
        </section>

        {/* Animated divider */}
        <motion.div 
          className="relative h-px bg-gradient-to-r from-transparent via-[#00d4aa]/30 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        />

        {/* Two-column: Trending + Start streaming CTA */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Trending Streamers */}
          <motion.div 
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-2xl">📈</span> Trending Now
            </h2>
            <div className="flex flex-col gap-3">
              {trendingStreamers.map((streamer, i) => (
                <motion.div
                  key={streamer.name}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={`/stream/${streamer.name.toLowerCase()}`}
                    className="flex items-center gap-4 p-4 rounded-xl bg-[#12121a] hover:bg-[#1a1a25] border border-white/5 hover:border-[#ff6b35]/30 transition-all group"
                  >
                    {/* Rank with animated number */}
                    <motion.span 
                      className="text-white/30 text-lg font-bold w-8 text-center flex-shrink-0"
                      whileHover={{ scale: 1.2, color: "#ff6b35" }}
                    >
                      #{i + 1}
                    </motion.span>

                    {/* Avatar with glow */}
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

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-white font-semibold truncate group-hover:text-[#ff6b35] transition-colors">
                        {streamer.name}
                      </p>
                      <p className="text-white/40 text-sm truncate">{streamer.category}</p>
                    </div>

                    {/* Live badge + viewers */}
                    <div className="flex items-center gap-3 flex-shrink-0">
                      <motion.div 
                        className="flex items-center gap-1.5 text-xs"
                        whileHover={{ scale: 1.05 }}
                      >
                        <span className="w-2 h-2 bg-[#ff3366] rounded-full animate-pulse" />
                        <span className="text-[#ff3366] font-bold">LIVE</span>
                      </motion.div>
                      <span className="text-white/50 text-sm font-medium">
                        {formatViewers(streamer.viewers)}
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Start Streaming CTA */}
          <motion.div 
            className="flex flex-col justify-center"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="relative bg-gradient-to-br from-[#1a1a2e] via-[#12121a] to-[#0a1a1a] border border-[#ff6b35]/20 rounded-2xl p-8 text-center overflow-hidden">
              {/* Animated background */}
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.87v6.26a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
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

        {/* Animated divider */}
        <motion.div 
          className="relative h-px bg-gradient-to-r from-transparent via-[#ff9f6b]/20 to-transparent"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
        />

        {/* Features section */}
        <section className="text-center py-8">
          <motion.h2 
            className="text-white text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Everything you need to <span className="text-[#ff6b35]">stream & connect</span>
          </motion.h2>
          
          <motion.p 
            className="text-white/40 text-lg mb-12 max-w-xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            StreamHub gives creators and viewers a powerful platform to share moments that matter.
          </motion.p>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {[
              {
                icon: "⚡",
                title: "Ultra-Low Latency",
                desc: "Sub-second live streaming so your viewers react in real time.",
                color: "#ff6b35",
              },
              {
                icon: "🌍",
                title: "Global Community",
                desc: "Connect with millions of passionate fans and creators worldwide.",
                color: "#00d4aa",
              },
              {
                icon: "💰",
                title: "Earn Revenue",
                desc: "Monetize with subscriptions, bits, donations, and brand deals.",
                color: "#ff9f6b",
              },
              {
                icon: "🛡️",
                title: "Safe & Moderated",
                desc: "Advanced tools to keep your community safe and harassment-free.",
                color: "#7c3aed",
              },
              {
                icon: "📊",
                title: "Detailed Analytics",
                desc: "Understand your audience and grow your channel with data insights.",
                color: "#3b82f6",
              },
              {
                icon: "📱",
                title: "Mobile Ready",
                desc: "Stream and watch on any device — desktop, tablet, or mobile.",
                color: "#fbbf24",
              },
            ].map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }}
                className="bg-[#12121a] border border-white/5 rounded-2xl p-6 text-left hover:border-[#ff6b35]/20 transition-all group"
              >
                <div className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl mb-4" style={{ backgroundColor: `${feature.color}15` }}>
                  {feature.icon}
                </div>
                <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#ff6b35] transition-colors">
                  {feature.title}
                </h3>
                <p className="text-white/40 text-sm">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>
      </main>

      {/* Footer */}
      <motion.footer 
        className="border-t border-white/5 bg-[#0a0a0f]"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <div className="max-w-screen-2xl mx-auto px-4 py-12">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {[
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
            ].map((col) => (
              <div key={col.heading}>
                <h4 className="text-white font-bold mb-4">{col.heading}</h4>
                <ul className="space-y-2">
                  {col.links.map((link) => (
                    <li key={link}>
                      <Link
                        href="#"
                        className="text-white/40 text-sm hover:text-[#ff6b35] transition-colors"
                      >
                        {link}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#ff9f6b] rounded-lg flex items-center justify-center">
                <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <span className="text-white font-bold">StreamHub</span>
            </div>

            <p className="text-white/30 text-xs">
              © {new Date().getFullYear()} StreamHub, Inc. All rights reserved.
            </p>

            {/* Social icons */}
            <div className="flex items-center gap-4">
              {["Twitter", "Instagram", "YouTube", "Discord"].map((social) => (
                <Link
                  key={social}
                  href="#"
                  className="text-white/40 hover:text-[#ff6b35] text-xs transition-colors"
                >
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </motion.footer>
    </div>
  );
}