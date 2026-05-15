import HeroSection from "@/components/home/HeroSection";
import DetectionSection from "@/components/home/DetectionSection";
import HowItWorks from "@/components/home/HowItWorks";
import FeatureSection from "@/components/home/FeatureSection";
import DisclaimerSection from "@/components/home/DisclaimerSection";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <HeroSection />
      <DetectionSection />
      <HowItWorks />
      <FeatureSection />
      <DisclaimerSection />
    </main>
  );
}