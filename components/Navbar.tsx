"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [searchQuery, setSearchQuery] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    }
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100, damping: 20 }}
      className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-[#0a0a0f]/95 backdrop-blur-lg shadow-lg shadow-black/20" : "bg-[#0a0a0f]"
      } border-b border-white/5`}
    >
      <div className="max-w-screen-2xl mx-auto px-4 h-16 flex items-center gap-4">
        {/* Animated Logo */}
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link href="/" className="flex items-center gap-3 flex-shrink-0 group">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-[#ff6b35] to-[#ff9f6b] rounded-xl flex items-center justify-center shadow-lg shadow-[#ff6b35]/30 group-hover:shadow-[#ff6b35]/50 transition-shadow">
                <svg viewBox="0 0 24 24" className="w-6 h-6 text-white" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
                </svg>
              </div>
              <motion.div
                className="absolute -inset-1 bg-[#ff6b35]/30 rounded-xl blur-lg"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              StreamHub
            </span>
          </Link>
        </motion.div>

        {/* Nav Links with hover effects */}
        <nav className="hidden md:flex items-center gap-2 ml-4">
          {[
            { href: "/", label: "Browse", active: true },
            { href: "/following", label: "Following", active: false },
            { href: "/esports", label: "Esports", active: false },
            { href: "/music", label: "Music", active: false },
          ].map((link) => (
            <motion.div key={link.href} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Link
                href={link.href}
                className={`px-4 py-2 text-sm font-semibold rounded-lg transition-all ${
                  link.active
                    ? "bg-[#ff6b35] text-white shadow-lg shadow-[#ff6b35]/30"
                    : "text-white/70 hover:text-white hover:bg-white/5"
                }`}
              >
                {link.label}
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* Animated Search */}
        <motion.form
          onSubmit={handleSearch}
          className="flex-1 max-w-lg mx-auto"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <div className="relative group">
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-[#ff6b35] to-[#00d4aa] rounded-full blur opacity-0 group-focus-within:opacity-30 transition-opacity duration-300"
            />
            <div className="relative flex items-center">
              <svg className="absolute left-4 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search streams, creators..."
                className="w-full bg-[#12121a] text-white text-sm placeholder-white/30 rounded-full pl-12 pr-4 py-3 border border-white/10 focus:border-[#ff6b35] focus:bg-[#1a1a25] transition-all"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="submit"
                className="absolute right-1.5 p-2 bg-[#ff6b35] rounded-full text-white"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.form>

        {/* Right side - Auth buttons */}
        <div className="flex items-center gap-3 ml-auto">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="hidden sm:block px-5 py-2.5 text-sm font-bold text-[#ff6b35] border-2 border-[#ff6b35]/30 rounded-xl hover:bg-[#ff6b35]/10 transition-all"
          >
            Log In
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02, boxShadow: "0 0 30px rgba(255, 107, 53, 0.4)" }}
            whileTap={{ scale: 0.98 }}
            className="px-5 py-2.5 text-sm font-bold text-white bg-gradient-to-r from-[#ff6b35] to-[#ff8c5a] rounded-xl shadow-lg shadow-[#ff6b35]/20"
          >
            Sign Up
          </motion.button>

          {/* Mobile menu toggle */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 text-white/70 hover:text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <motion.svg
              animate={{ rotate: mobileMenuOpen ? 90 : 0 }}
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </motion.svg>
          </motion.button>
        </div>
      </div>

      {/* Animated Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-[#0a0a0f]/95 backdrop-blur-lg border-t border-white/5"
          >
            <div className="px-4 py-4 flex flex-col gap-2">
              {[
                { href: "/", label: "Browse" },
                { href: "/following", label: "Following" },
                { href: "/esports", label: "Esports" },
                { href: "/music", label: "Music" },
              ].map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    className="block px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-lg"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}