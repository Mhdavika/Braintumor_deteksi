import HeroSection from "@/components/home/HeroSection";
import DetectionSection from "@/components/home/DetectionSection";
import HowItWorks from "@/components/home/HowItWorks";
import FeatureSection from "@/components/home/FeatureSection";
import DisclaimerSection from "@/components/home/DisclaimerSection";
import FAQSection from "@/components/home/FAQSection";
import HealthChatbot from "@/features/chatbot/components/HealthChatbot";
import Footer from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white dark:bg-slate-950">
      <HeroSection />
      <DetectionSection />
      <HowItWorks />
      <FeatureSection />
      <DisclaimerSection />
      <FAQSection />
      <HealthChatbot />
      <Footer />
    </main>
  );
}

