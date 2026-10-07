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
import {
  fetchPosts,
  fetchPartners,
  fetchTestimonials,
  fetchSettings,
} from "@/lib/api";

export default async function HomePage() {
  const [posts, partners, testimonials, settings] = await Promise.all([
    fetchPosts(6),
    fetchPartners(),
    fetchTestimonials(),
    fetchSettings(),
  ]);

  return (
    <>
      <HeroSection settings={settings} />
      <AboutSection settings={settings} />
      <ServicesSection />
      <StatsSection settings={settings} />
      <WhyUsSection settings={settings} />
      <PartnersSection partners={partners} />
      <TestimonialsSection testimonials={testimonials} />
      <NewsSection posts={posts} />
      <CTASection settings={settings} />
      <OfficesBlock />
    </>
  );
}
