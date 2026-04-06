"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useMemo } from "react";

const particleData = [
  { x: "15%", y: "20%", duration: 8, delay: 1 },
  { x: "75%", y: "30%", duration: 7, delay: 3 },
  { x: "45%", y: "60%", duration: 9, delay: 0.5 },
  { x: "85%", y: "80%", duration: 6, delay: 2 },
  { x: "25%", y: "45%", duration: 8, delay: 4 },
  { x: "65%", y: "15%", duration: 7, delay: 1.5 },
  { x: "35%", y: "75%", duration: 10, delay: 2.5 },
  { x: "55%", y: "35%", duration: 6, delay: 0 },
  { x: "90%", y: "50%", duration: 9, delay: 3.5 },
  { x: "10%", y: "85%", duration: 7, delay: 1 },
  { x: "80%", y: "10%", duration: 8, delay: 2 },
  { x: "40%", y: "90%", duration: 6, delay: 4.5 },
  { x: "60%", y: "20%", duration: 10, delay: 0.5 },
  { x: "20%", y: "55%", duration: 7, delay: 3 },
  { x: "70%", y: "70%", duration: 9, delay: 1.5 },
  { x: "5%", y: "40%", duration: 8, delay: 2 },
  { x: "95%", y: "25%", duration: 6, delay: 0 },
  { x: "30%", y: "95%", duration: 7, delay: 3.5 },
  { x: "50%", y: "5%", duration: 9, delay: 1 },
  { x: "78%", y: "65%", duration: 8, delay: 4 },
];

export default function HeroSection() {
  const particles = useMemo(() => particleData, []);
  const quickTransition = { duration: 0.35, ease: "easeOut" as const };

  return (
    <section className="relative isolate overflow-hidden bg-[#0a0a0f]">
      {/* Animated background */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,107,53,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,107,53,0.03)_1px,transparent_1px)] bg-[size:50px_50px]" />
        
        {/* Animated orbs */}
        <motion.div
          className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-[#ff6b35]/10 rounded-full blur-[120px]"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-[#00d4aa]/10 rounded-full blur-[100px]"
          animate={{
            x: [0, -30, 0],
            y: [0, -50, 0],
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        />
        
        {/* Floating particles */}
        {particles.map((p, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-[#ff6b35]/50 rounded-full"
            initial={{
              x: p.x,
              y: p.y,
            }}
            animate={{
              y: [p.y, "calc(" + p.y + " - 100px)"],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              delay: p.delay,
            }}
          />
        ))}
      </div>

      <div className="relative max-w-screen-2xl mx-auto px-4 py-20 md:py-32 flex flex-col lg:flex-row items-center gap-16">
        {/* Text content */}
        <motion.div
          className="flex-1 text-center lg:text-left"
          initial={{ opacity: 1, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={quickTransition}
        >
          {/* Live indicator */}
          <motion.div
            initial={{ opacity: 1, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ ...quickTransition, delay: 0.05 }}
            className="inline-flex items-center gap-3 bg-[#12121a] border border-white/10 text-white text-sm font-medium px-5 py-2.5 rounded-full mb-6"
          >
            <motion.span
              className="w-2.5 h-2.5 bg-[#ff3366] rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
            <span className="text-white/80">
              <span className="text-[#ff3366] font-bold">LIVE</span>
              <span className="mx-2">•</span>
              <span>2.4M viewers watching now</span>
            </span>
          </motion.div>

          <motion.h1
            className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 leading-tight"
            initial={{ opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...quickTransition, delay: 0.08 }}
          >
            Your Stream,
            <br />
            <span className="bg-gradient-to-r from-[#ff6b35] via-[#ff9f6b] to-[#00d4aa] bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
              Your Way
            </span>
          </motion.h1>

          <motion.p
            className="text-white/60 text-lg md:text-xl mb-8 max-w-xl mx-auto lg:mx-0"
            initial={{ opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...quickTransition, delay: 0.12 }}
          >
            Discover millions of live streams across gaming, music, art, and more. 
            Join a thriving community of creators and viewers.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            initial={{ opacity: 1, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ ...quickTransition, delay: 0.16 }}
          >
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/browse"
                className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] text-white font-bold rounded-2xl shadow-lg shadow-[#ff6b35]/30 hover:shadow-[#ff6b35]/50 transition-all"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z" />
                </svg>
                Start Watching
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/start-streaming"
                className="inline-flex items-center gap-2 px-8 py-4 bg-[#12121a] border-2 border-white/10 text-white font-bold rounded-2xl hover:border-[#ff6b35]/50 hover:bg-[#1a1a25] transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Go Live
              </Link>
            </motion.div>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex gap-8 mt-12 justify-center lg:justify-start"
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            transition={{ ...quickTransition, delay: 0.2 }}
          >
            {[
              { value: "50K+", label: "Live Streamers", color: "#ff6b35" },
              { value: "8M+", label: "Daily Viewers", color: "#00d4aa" },
              { value: "500+", label: "Categories", color: "#ff9f6b" },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 1, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ ...quickTransition, delay: 0.22 + i * 0.04 }}
                className="text-center lg:text-left"
              >
                <p className="text-3xl font-black" style={{ color: stat.color }}>{stat.value}</p>
                <p className="text-white/40 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* Animated stream preview cards */}
        <motion.div
          className="flex-1 relative w-full max-w-xl"
          initial={{ opacity: 1, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45, delay: 0.1, ease: "easeOut" }}
        >
          <div className="relative">
            {/* Main card */}
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-2xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <div className="aspect-video bg-gradient-to-br from-[#1a1a2e] via-[#16213e] to-[#0f0f1a] relative overflow-hidden">
                {/* Animated background pattern */}
                <div className="absolute inset-0 bg-[conic-gradient(from_180deg,transparent,rgba(255,107,53,0.1),transparent)] animate-spin" style={{ animationDuration: '10s' }} />
                
                {/* Play button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    className="w-20 h-20 bg-[#ff6b35]/90 rounded-full flex items-center justify-center shadow-lg shadow-[#ff6b35]/50 cursor-pointer"
                    whileHover={{ scale: 1.1 }}
                    animate={{ boxShadow: ["0 0 20px rgba(255,107,53,0.5)", "0 0 40px rgba(255,107,53,0.8)", "0 0 20px rgba(255,107,53,0.5)"] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <svg className="w-10 h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </motion.div>
                </div>

                {/* Stream info overlay */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <motion.div
                    className="flex items-center gap-1.5 bg-[#ff3366] text-white text-xs font-bold px-2.5 py-1 rounded-full"
                    animate={{ boxShadow: ["0 0 10px rgba(255,51,102,0.5)", "0 0 20px rgba(255,51,102,0.8)", "0 0 10px rgba(255,51,102,0.5)"] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <span className="w-1.5 h-1.5 bg-white rounded-full animate-pulse" />
                    LIVE
                  </motion.div>
                  <span className="bg-black/60 text-white text-xs font-medium px-2 py-1 rounded-full">
                    42.8K viewers
                  </span>
                </div>
              </div>

              {/* Card footer */}
              <div className="bg-[#12121a] p-4 flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-[#ff6b35] to-[#ff9f6b] rounded-full flex items-center justify-center text-white font-bold text-lg shadow-lg">
                  N
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold truncate">NightOwlGaming</p>
                  <p className="text-white/50 text-sm truncate">Elden Ring Speedrun Challenge</p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  className="p-2 bg-[#ff6b35]/20 text-[#ff6b35] rounded-lg hover:bg-[#ff6b35]/30 transition-colors"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>

            {/* Floating side cards */}
            {[1, 2].map((i) => (
              <motion.div
                key={i}
                className={`absolute rounded-xl overflow-hidden shadow-xl hidden ${i === 1 ? 'right-0 top-4 w-40' : 'left-0 bottom-4 w-40 md:left-[-20px]'}`}
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              >
                <div className={`aspect-video ${i === 1 ? 'bg-gradient-to-br from-[#00d4aa]/30 to-[#12121a]' : 'bg-gradient-to-br from-[#ff6b35]/30 to-[#12121a]'}`}>
                  <div className="w-full h-full flex items-center justify-center text-3xl">
                    {i === 1 ? "🎵" : "🎮"}
                  </div>
                </div>
                <div className="bg-[#12121a] px-2 py-1.5 flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${i === 1 ? 'bg-[#00d4aa]' : 'bg-[#ff3366]'} animate-pulse`} />
                  <span className="text-white text-xs font-medium truncate">{i === 1 ? "Lo-fi Beats" : "Pro Gaming"}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Banner carousel */}
      <motion.div
        className="relative bg-gradient-to-r from-[#ff6b35]/10 via-[#12121a] to-[#00d4aa]/10 border-y border-white/5 overflow-hidden"
        initial={{ opacity: 1 }}
        animate={{ opacity: 1 }}
        transition={{ ...quickTransition, delay: 0.12 }}
      >
        <motion.div
          className="flex items-center gap-8 py-4 whitespace-nowrap"
          animate={{ x: [0, "-50%"] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          {[
            "🎮 Esports Tournament - $100K Prize",
            "🎵 Live Music Festival Tonight",
            "🎨 Art Challenge - Create & Win",
            "🏆 Pro Gaming League Finals",
            "💬 Community Talks - Join the Chat",
            "🎁 Drops Enabled - Watch & Earn",
            "🔥 Hot Streams - Don't Miss Out",
            "✨ New Features - Go Live Today",
          ].map((text, i) => (
            <span key={i} className="text-white/60 text-sm font-medium">
              {text}
            </span>
          ))}
          {/* Duplicate for seamless loop */}
          {[
            "🎮 Esports Tournament - $100K Prize",
            "🎵 Live Music Festival Tonight",
            "🎨 Art Challenge - Create & Win",
            "🏆 Pro Gaming League Finals",
            "💬 Community Talks - Join the Chat",
            "🎁 Drops Enabled - Watch & Earn",
            "🔥 Hot Streams - Don't Miss Out",
            "✨ New Features - Go Live Today",
          ].map((text, i) => (
            <span key={`dup-${i}`} className="text-white/60 text-sm font-medium">
              {text}
            </span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
