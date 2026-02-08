import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import BricksSection from "@/components/BricksSection";
import CTAGridSection from "@/components/CTAGridSection";
import Footer from "@/components/Footer";
import Scanline from "@/components/Scanline";

const Index = () => {
  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      {/* Floating Scanline */}
      <Scanline />

      {/* Header Navigation */}
      <Navbar />

      <main>
        {/* Hero Section */}
        <HeroSection />

        {/* Social Proof / Stats */}
        <StatsSection />

        {/* The Three Bricks */}
        <BricksSection />

        {/* Multi-Audience CTA Grid */}
        <CTAGridSection />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default Index;
