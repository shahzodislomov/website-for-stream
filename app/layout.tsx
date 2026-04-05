import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "StreamHub — Watch Live Streams",
  description:
    "Discover millions of live streams across gaming, music, art, and more on StreamHub. Join a thriving community of creators and viewers.",
  keywords: ["streaming", "live", "gaming", "esports", "music", "IRL"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} antialiased bg-[#0a0a0f] text-[#f0f0f5]`}>
        {children}
      </body>
    </html>
  );
}