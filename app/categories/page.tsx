import Navbar from "@/components/Navbar";
import CategoryCard from "@/components/CategoryCard";
import SiteFooter from "@/components/home/SiteFooter";
import { categories } from "@/components/home/home-data";

export default function CategoriesPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <main className="mx-auto max-w-screen-2xl px-4 py-10">
        <div className="mb-8 rounded-3xl border border-white/8 bg-[#101018] p-8">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[#00d4aa]">Directory</p>
          <h1 className="mt-3 text-4xl font-black text-white">All Categories</h1>
          <p className="mt-3 max-w-2xl text-white/50">Browse every featured StreamHub category and discover where audiences are gathering right now.</p>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-8">
          {categories.map((category) => <CategoryCard key={category.id} category={category} />)}
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
