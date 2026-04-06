"use client";

import { motion } from "framer-motion";
import { getFeatureIcon } from "@/components/home/icon-map";
import { features } from "@/components/home/home-data";

export default function FeaturesSection() {
  return (
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
        {features.map((feature, index) => {
          const Icon = getFeatureIcon(feature.icon);

          return (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -4 }}
              className="bg-[#12121a] border border-white/5 rounded-2xl p-6 text-left hover:border-[#ff6b35]/20 transition-all group"
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ backgroundColor: `${feature.color}15` }}
              >
                <Icon className="w-6 h-6" style={{ color: feature.color }} strokeWidth={2} />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2 group-hover:text-[#ff6b35] transition-colors">
                {feature.title}
              </h3>
              <p className="text-white/40 text-sm">{feature.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
