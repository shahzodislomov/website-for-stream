import Navbar from "@/components/Navbar";
import StreamCard from "@/components/StreamCard";
import SiteFooter from "@/components/home/SiteFooter";
import { featuredStreams } from "@/components/home/home-data";

export default function EsportsPage() {
  const streams = featuredStreams.filter((stream) => stream.vertical === "gaming" || stream.tags.includes("Pro") || stream.tags.includes("Ranked"));
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-10 space-y-8">
        <section className="rounded-3xl border border-[#ff6b35]/20 bg-[radial-gradient(circle_at_top_left,rgba(255,107,53,0.18),transparent_35%),#101018] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ff6b35]">Competitive</p>
          <h1 className="mt-3 text-4xl font-black text-white">Esports</h1>
          <p className="mt-3 max-w-2xl text-white/50">Ranked grinds, tournaments, pro analysis, and high-skill gameplay from the StreamHub community.</p>
        </section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {streams.map((stream) => <StreamCard key={stream.id} stream={stream} />)}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
