import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import StatsSection from "@/components/StatsSection";
import BricksSection from "@/components/BricksSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import DashboardSimulator from "@/components/DashboardSimulator";
import IdentityPortalPreview from "@/components/IdentityPortalPreview";
import WaitlistSection from "@/components/WaitlistSection";
import CTAGridSection from "@/components/CTAGridSection";
import Footer from "@/components/Footer";
import Scanline from "@/components/Scanline";
import ScrollProgress from "@/components/ScrollProgress";

const Index = () => {
  return (
    <div className="min-h-screen grid-bg relative overflow-hidden">
      <ScrollProgress />
      <Scanline />
      <Navbar />

      <main>
        <HeroSection />
        <StatsSection />
        <BricksSection />
        <HowItWorksSection />
        <DashboardSimulator />
        <IdentityPortalPreview />
        <WaitlistSection />
        <CTAGridSection />
      </main>

      <Footer />
    </div>
  );
};

export default Index;
