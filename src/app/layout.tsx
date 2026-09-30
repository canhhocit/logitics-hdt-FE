import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";

export const metadata: Metadata = {
  metadataBase: new URL("https://hdlogistics.vn"),
  title: {
    default: "HD Logistics – Giải Pháp Logistics & Vận Chuyển Quốc Tế Cho Doanh Nghiệp",
    template: "%s | HD Logistics",
  },
  description:
    "HD Logistics cung cấp giải pháp logistics tổng thể: vận chuyển quốc tế đường không, đường biển, đường bộ, khai thuê hải quan và kho bãi phân phối cho doanh nghiệp.",
  keywords: ["HD Logistics", "logistics", "vận chuyển quốc tế", "khai thuê hải quan", "vận tải đường biển", "vận tải hàng không"],
  openGraph: {
    type: "website", locale: "vi_VN", url: "https://hdlogistics.vn",
    siteName: "HD Logistics",
    title: "HD Logistics – Giải Pháp Logistics & Vận Chuyển Quốc Tế",
    description: "High Delivery – High Discipline – High Reliability",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased bg-white">
        <Header />
        <main className="pt-[108px] md:pt-[105px]">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
