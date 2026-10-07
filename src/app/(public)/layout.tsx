import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";
import { fetchSettings, fetchMenu, fetchOffices } from "@/lib/api";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
  // Fetch layout data tại server — Header và Footer dùng chung
  const [settings, mainMenu, footerMenu, offices] = await Promise.all([
    fetchSettings(),
    fetchMenu("MAIN"),
    fetchMenu("FOOTER_COMPANY"),
    fetchOffices(),
  ]);

  return (
    <>
      <Header settings={settings} menuItems={mainMenu} />
      <main id="main-content">{children}</main>
      <Footer settings={settings} footerMenu={footerMenu} offices={offices} />
      <FloatingButtons />
    </>
  );
}
