"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import CategoryCard from "@/components/CategoryCard";
import { categories } from "@/components/home/home-data";

export default function CategoriesSection() {
  return (
    <section>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="flex items-center justify-between mb-6"
      >
        <div>
          <h2 className="text-white text-2xl md:text-3xl font-bold">🎮 Top Categories</h2>
          <p className="text-white/40 text-sm mt-1">Browse what&apos;s trending right now</p>
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
        {categories.map((category, index) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
          >
            <CategoryCard category={category} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}
