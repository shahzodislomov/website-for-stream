import Navbar from "@/components/Navbar";
import StreamCard from "@/components/StreamCard";
import SiteFooter from "@/components/home/SiteFooter";
import { featuredStreams } from "@/components/home/home-data";

export default function FollowingPage() {
  const followed = featuredStreams.slice(0, 4);
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-10 space-y-8">
        <section className="rounded-3xl border border-white/8 bg-[#101018] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#ff9f6b]">Your feed</p>
          <h1 className="mt-3 text-4xl font-black text-white">Following</h1>
          <p className="mt-3 max-w-2xl text-white/50">A starter feed of creators you follow. Hook this page to auth and user preferences when the backend is ready.</p>
        </section>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {followed.map((stream) => <StreamCard key={stream.id} stream={stream} />)}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
