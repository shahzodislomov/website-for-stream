import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import StreamCard from "@/components/StreamCard";
import SiteFooter from "@/components/home/SiteFooter";
import { categories, featuredStreams } from "@/components/home/home-data";
import { formatViewers } from "@/lib/format";

export default async function CategoryDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const category = categories.find((item) => item.id === id);
  if (!category) notFound();

  const streams = featuredStreams.filter(
    (stream) => stream.category.toLowerCase() === category.name.toLowerCase() || stream.vertical === category.id,
  );

  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-10 space-y-8">
        <section className="rounded-3xl border border-white/8 p-8" style={{ background: `linear-gradient(135deg, ${category.color}, #101018 55%, #0a0a0f)` }}>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-white/60">Category</p>
          <h1 className="mt-3 text-4xl font-black text-white">{category.name}</h1>
          <p className="mt-3 text-white/60">{formatViewers(category.viewers)} viewers watching related streams.</p>
        </section>
        <section>
          <h2 className="mb-5 text-2xl font-bold text-white">Live in {category.name}</h2>
          {streams.length > 0 ? (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {streams.map((stream) => <StreamCard key={stream.id} stream={stream} />)}
            </div>
          ) : (
            <div className="rounded-2xl border border-white/8 bg-[#101018] p-8 text-white/55">No exact live matches yet. Try browsing all live channels.</div>
          )}
        </section>
      </main>
      <SiteFooter />
    </div>
  );
}
