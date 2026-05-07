import Navbar from "@/components/Navbar";
import StreamCard from "@/components/StreamCard";
import SiteFooter from "@/components/home/SiteFooter";
import { featuredStreams } from "@/components/home/home-data";

export default function MusicPage() {
  const streams = featuredStreams.filter((stream) => stream.vertical === "music");
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-10 space-y-8">
        <section className="rounded-3xl border border-[#00d4aa]/20 bg-[radial-gradient(circle_at_top_left,rgba(0,212,170,0.18),transparent_35%),#101018] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00d4aa]">Audio</p>
          <h1 className="mt-3 text-4xl font-black text-white">Music</h1>
          <p className="mt-3 max-w-2xl text-white/50">Live performances, beat making, listening parties, and chill sessions.</p>
        </section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {streams.map((stream) => <StreamCard key={stream.id} stream={stream} />)}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
