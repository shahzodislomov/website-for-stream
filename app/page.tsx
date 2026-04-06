import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategoriesSection from "@/components/home/CategoriesSection";
import CommunitySection from "@/components/home/CommunitySection";
import FeaturesSection from "@/components/home/FeaturesSection";
import LiveChannelsSection from "@/components/home/LiveChannelsSection";
import SectionDivider from "@/components/home/SectionDivider";
import SiteFooter from "@/components/home/SiteFooter";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0a0a0f]">
      <Navbar />
      <HeroSection />

      <main className="max-w-screen-2xl mx-auto px-4 py-10 space-y-16">
        <LiveChannelsSection />
        <SectionDivider accent="via-[#ff6b35]/30" />
        <CategoriesSection />
        <SectionDivider accent="via-[#00d4aa]/30" />
        <CommunitySection />
        <SectionDivider accent="via-[#ff9f6b]/20" />
        <FeaturesSection />
      </main>
      <SiteFooter />
    </div>
  );
}
