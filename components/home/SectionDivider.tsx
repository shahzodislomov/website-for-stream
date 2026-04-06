"use client";

import { motion } from "framer-motion";

export default function SectionDivider({
  accent,
}: {
  accent: string;
}) {
  return (
    <motion.div
      className={`relative h-px bg-gradient-to-r from-transparent ${accent} to-transparent`}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
    />
  );
}
