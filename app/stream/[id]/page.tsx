import Link from "next/link";
import { notFound } from "next/navigation";
import { Eye, Heart, MessageCircle, Share2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import StreamCard from "@/components/StreamCard";
import SiteFooter from "@/components/home/SiteFooter";
import { featuredStreams } from "@/components/home/home-data";
import { formatViewers } from "@/lib/format";

export default async function StreamDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const stream = featuredStreams.find((item) => item.id === id);
  if (!stream) notFound();
  const related = featuredStreams.filter((item) => item.id !== stream.id && item.vertical === stream.vertical).slice(0, 4);

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-8 space-y-8">
        <section className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_360px]">
          <div>
            <div className="relative aspect-video overflow-hidden rounded-3xl border border-white/8" style={{ backgroundColor: stream.thumbnailColor }}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/20 via-transparent to-black/70" />
              <div className="absolute left-5 top-5 rounded-full bg-[#ff3366] px-3 py-1 text-sm font-black text-white">LIVE</div>
              <div className="absolute inset-0 flex items-center justify-center text-7xl text-white/20">▶</div>
            </div>
            <div className="mt-5 flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <h1 className="text-3xl font-black text-white">{stream.title}</h1>
                <p className="mt-2 text-white/55">{stream.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {stream.tags.map((tag) => <span key={tag} className="rounded-full bg-white/5 px-3 py-1 text-xs font-semibold text-white/55">{tag}</span>)}
                </div>
              </div>
              <div className="flex gap-2">
                <button className="inline-flex items-center gap-2 rounded-xl bg-[#ff6b35] px-4 py-2 text-sm font-bold text-white"><Heart className="h-4 w-4" /> Follow</button>
                <button aria-label="Share stream" className="rounded-xl border border-white/10 p-2 text-white/70"><Share2 className="h-5 w-5" /></button>
              </div>
            </div>
          </div>
          <aside className="rounded-3xl border border-white/8 bg-[#101018] p-5">
            <div className="flex items-center gap-4">
              <div className="flex h-14 w-14 items-center justify-center rounded-full text-xl font-black text-white" style={{ backgroundColor: stream.avatarColor }}>{stream.streamer[0]}</div>
              <div>
                <h2 className="text-xl font-bold text-white">{stream.streamer}</h2>
                <Link href={`/category/${stream.category.toLowerCase().replaceAll(" ", "-")}`} className="text-sm text-[#ff9f6b]">{stream.category}</Link>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-2xl bg-white/5 p-4"><Eye className="mb-2 h-5 w-5 text-[#ff3366]" /><p className="text-xl font-black text-white">{formatViewers(stream.viewers)}</p><p className="text-xs text-white/40">watching</p></div>
              <div className="rounded-2xl bg-white/5 p-4"><MessageCircle className="mb-2 h-5 w-5 text-[#00d4aa]" /><p className="text-xl font-black text-white">Fast</p><p className="text-xs text-white/40">live chat</p></div>
            </div>
          </aside>
        </section>
        {related.length > 0 && <section><h2 className="mb-5 text-2xl font-bold text-white">Related streams</h2><div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">{related.map((item) => <StreamCard key={item.id} stream={item} />)}</div></section>}
      </main>
      <SiteFooter />
    </div>
  );
}
