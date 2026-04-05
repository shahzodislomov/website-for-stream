"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";
import StreamCard from "@/components/StreamCard";
import { motion } from "framer-motion";

interface SearchResult {
  streams: Array<{
    id: string;
    title: string;
    streamer: string;
    category: string;
    viewers: number;
    thumbnailColor: string;
    avatarColor: string;
    tags: string[];
  }>;
  categories: Array<{
    id: string;
    name: string;
    viewers: number;
    icon: string;
  }>;
  streamers: Array<{
    id: string;
    name: string;
    followers: number;
    category: string;
    avatarColor: string;
  }>;
  total: number;
  query: string;
}

function useSearchResults(query: string) {
  const [results, setResults] = useState<SearchResult | null>(null);
  const [loading, setLoading] = useState(false);

  const performSearch = async (searchQuery: string) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/search?q=${encodeURIComponent(searchQuery)}`);
      const data = await res.json();
      setResults(data);
    } catch {
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return { results, loading, performSearch, setResults, setLoading };
}

function SearchContent() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q") || "";
  const [searchInput, setSearchInput] = useState(query);
  const { results, loading, performSearch } = useSearchResults(query);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchInput.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchInput)}`;
    }
  };

  const handleInputChange = (value: string) => {
    setSearchInput(value);
  };

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      
      <main className="max-w-screen-2xl mx-auto px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-6">Search</h1>
          
          <form onSubmit={handleSearch} className="relative max-w-xl">
            <input
              type="text"
              value={searchInput}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder="Search streams, categories, creators..."
              className="w-full bg-[#12121a] text-white placeholder-white/30 rounded-xl pl-12 pr-4 py-4 border border-white/10 focus:border-[#ff6b35] focus:bg-[#1a1a25] transition-all text-lg"
            />
            <svg className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 px-4 py-2 bg-[#ff6b35] text-white font-semibold rounded-lg hover:bg-[#e55a2b] transition-colors"
            >
              Search
            </button>
          </form>
        </motion.div>

        {query && !loading && !results && (
          <div className="flex justify-start mb-6">
            <button
              onClick={() => performSearch(query)}
              className="text-[#ff6b35] text-sm hover:underline"
            >
              Click to search for &quot;{query}&quot;
            </button>
          </div>
        )}

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <motion.div
              className="w-12 h-12 border-4 border-[#ff6b35] border-t-transparent rounded-full"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        ) : results ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-white/50 text-sm mb-6">
              Found {results.total} results for &quot;{query}&quot;
            </p>

            {results.streams && results.streams.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  🔴 Streams <span className="text-white/40 text-sm font-normal">({results.streams.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                  {results.streams.map((stream, i) => (
                    <motion.div
                      key={stream.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                    >
                      <StreamCard stream={stream} />
                    </motion.div>
                  ))}
                </div>
              </section>
            )}

            {results.categories && results.categories.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  🎮 Categories <span className="text-white/40 text-sm font-normal">({results.categories.length})</span>
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4">
                  {results.categories.map((cat, i) => (
                    <motion.a
                      key={cat.id}
                      href={`/category/${cat.id}`}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                      className="bg-[#12121a] border border-white/5 rounded-xl p-4 text-center hover:border-[#ff6b35]/30 transition-all"
                    >
                      <div className="text-4xl mb-2">{cat.icon}</div>
                      <p className="text-white font-medium text-sm">{cat.name}</p>
                      <p className="text-white/40 text-xs mt-1">{(cat.viewers / 1000).toFixed(0)}K viewers</p>
                    </motion.a>
                  ))}
                </div>
              </section>
            )}

            {results.streamers && results.streamers.length > 0 && (
              <section className="mb-10">
                <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                  👤 Creators <span className="text-white/40 text-sm font-normal">({results.streamers.length})</span>
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                  {results.streamers.map((streamer, i) => (
                    <motion.a
                      key={streamer.id}
                      href={`/stream/${streamer.id}`}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                      className="flex items-center gap-4 bg-[#12121a] border border-white/5 rounded-xl p-4 hover:border-[#ff6b35]/30 transition-all"
                    >
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-white font-bold text-xl"
                        style={{ backgroundColor: streamer.avatarColor }}
                      >
                        {streamer.name[0]}
                      </div>
                      <div>
                        <p className="text-white font-semibold">{streamer.name}</p>
                        <p className="text-white/40 text-sm">{streamer.category}</p>
                        <p className="text-[#ff6b35] text-xs">{(streamer.followers / 1000).toFixed(0)}K followers</p>
                      </div>
                    </motion.a>
                  ))}
                </div>
              </section>
            )}

            {results.total === 0 && (
              <div className="text-center py-20">
                <p className="text-white/50 text-lg">No results found for &quot;{query}&quot;</p>
                <p className="text-white/30 text-sm mt-2">Try different keywords or browse categories</p>
              </div>
            )}
          </motion.div>
        ) : (
          <div className="text-center py-20">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-white/50 text-lg">Search for streams, categories, or creators</p>
          </div>
        )}
      </main>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-[#0a0a0f] flex items-center justify-center">
        <motion.div
          className="w-12 h-12 border-4 border-[#ff6b35] border-t-transparent rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
      </div>
    }>
      <SearchContent />
    </Suspense>
  );
}