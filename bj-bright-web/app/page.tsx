
import HeroSection from "@/components/home/hero-section";
import RecruitmentCarousel from "@/components/sections/recruitment-carousel";
import IntroStrip from "@/components/home/intro-strip";
import ServicesSection from "@/components/home/services-section";
import ApproachSection from "@/components/home/approach-section";
import CtaSection from "@/components/home/cta-section";
import CandidateEmployerSection from "@/components/home/candidate-employer-section";

export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <RecruitmentCarousel />
      <CandidateEmployerSection />
      <IntroStrip />
      <ServicesSection />
      <ApproachSection />
      <CtaSection />
    </main>
  );
}
