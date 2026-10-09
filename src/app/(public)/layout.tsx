import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import { fetchSettings, fetchMenu, fetchOffices, fetchCategories, fetchServices } from "@/lib/api";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // Fetch layout data tại server — Header và Footer dùng chung
  const [settings, mainMenu, footerMenu, offices, categories, services] = await Promise.all([
    fetchSettings(),
    fetchMenu("MAIN"),
    fetchMenu("FOOTER_COMPANY"),
    fetchOffices(),
    fetchCategories(),
    fetchServices(),
  ]);

  return (
    <>
      <Header settings={settings} menuItems={mainMenu} categories={categories} services={services} />
      <main id="main-content">{children}</main>
      <Footer settings={settings} footerMenu={footerMenu} offices={offices} />
      <FloatingButtons />
    </>
  );
}
