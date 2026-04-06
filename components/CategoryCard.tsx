"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getCategoryIcon, type CategoryIconName } from "@/components/home/icon-map";

export interface Category {
  id: string;
  name: string;
  viewers: number;
  color: string;
  icon: CategoryIconName;
}

function formatViewers(n: number): string {
  if (n >= 1000) return (n / 1000).toFixed(1).replace(/\.0$/, "") + "K";
  return String(n);
}

export default function CategoryCard({ category }: { category: Category }) {
  const Icon = getCategoryIcon(category.icon);

  return (
    <Link href={`/category/${category.id}`} className="group block">
      <motion.div
        whileHover={{ y: -4, scale: 1.02 }}
        transition={{ duration: 0.2 }}
      >
        {/* Cover art with animated border */}
        <div
          className="relative w-full aspect-[3/4] rounded-xl overflow-hidden mb-3"
          style={{ backgroundColor: category.color }}
        >
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70" />
          
          {/* Animated shimmer effect */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full"
            animate={{ translateX: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
          />

          {/* Icon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.span
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Icon className="w-12 h-12 text-white" strokeWidth={1.8} />
            </motion.span>
          </div>

          {/* Live indicator */}
          <div className="absolute top-3 right-3 flex items-center gap-1">
            <div className="w-2 h-2 bg-[#00d4aa] rounded-full animate-pulse" />
          </div>

          {/* Hover overlay */}
          <motion.div
            className="absolute inset-0 ring-2 ring-inset ring-transparent group-hover:ring-[#ff6b35] rounded-xl transition-all"
          />
        </div>

        {/* Info */}
        <div>
          <p className="text-white text-sm font-semibold truncate group-hover:text-[#ff6b35] transition-colors">
            {category.name}
          </p>
          <p className="text-white/40 text-xs mt-1">
            <span className="text-[#00d4aa] font-medium">{formatViewers(category.viewers)}</span> viewers
          </p>
        </div>
      </motion.div>
    </Link>
  );
}
