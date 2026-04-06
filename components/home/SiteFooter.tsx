"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { footerColumns, socialLinks } from "@/components/home/home-data";

export default function SiteFooter() {
  return (
    <motion.footer
      className="border-t border-white/5 bg-[#0a0a0f]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
    >
      <div className="max-w-screen-2xl mx-auto px-4 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
          {footerColumns.map((column) => (
            <div key={column.heading}>
              <h4 className="text-white font-bold mb-4">{column.heading}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link}>
                    <Link href="#" className="text-white/40 text-sm hover:text-[#ff6b35] transition-colors">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#ff6b35] to-[#ff9f6b] rounded-lg flex items-center justify-center">
              <svg viewBox="0 0 24 24" className="w-5 h-5 text-white" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
              </svg>
            </div>
            <span className="text-white font-bold">StreamHub</span>
          </div>

          <p className="text-white/30 text-xs">© {new Date().getFullYear()} StreamHub, Inc. All rights reserved.</p>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <Link key={social} href="#" className="text-white/40 hover:text-[#ff6b35] text-xs transition-colors">
                {social}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
