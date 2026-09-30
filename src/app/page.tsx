import HeroSection         from "@/components/home/HeroSection";
import AboutSection        from "@/components/home/AboutSection";
import ServicesSection     from "@/components/home/ServicesSection";
import StatsSection        from "@/components/home/StatsSection";
import WhyUsSection        from "@/components/home/WhyUsSection";
import PartnersSection     from "@/components/home/PartnersSection";
import TestimonialsSection from "@/components/shared/TestimonialsBlock";
import NewsSection         from "@/components/home/NewsSection";
import CTASection          from "@/components/home/CTASection";
import OfficesBlock        from "@/components/shared/OfficesBlock";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <ServicesSection />
      <StatsSection />
      <WhyUsSection />
      <PartnersSection />
      <TestimonialsSection />
      <NewsSection />
      <CTASection />
      <OfficesBlock />
    </>
  );
}
