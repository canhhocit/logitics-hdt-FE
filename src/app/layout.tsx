import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FloatingButtons from "@/components/ui/FloatingButtons";

export const metadata: Metadata = {
  metadataBase: new URL("https://hdtlogistics.vn"),
  title: {
    default: "HDT Logistics – Giải Pháp Logistics & Vận Chuyển Quốc Tế Cho Doanh Nghiệp",
    template: "%s | HDT Logistics",
  },
  description:
    "HDT Logistics cung cấp giải pháp logistics tổng thể: vận chuyển quốc tế đường không, đường biển, đường bộ, khai thuê hải quan và kho bãi phân phối cho doanh nghiệp.",
  keywords: ["HDT Logistics", "logistics", "vận chuyển quốc tế", "khai thuê hải quan", "vận tải đường biển", "vận tải hàng không"],
  icons: {
    icon: [
      { url: "/icon.png", type: "image/png", sizes: "500x500" },
      { url: "/favicon.ico", sizes: "any" },
    ],
    apple: [
      { url: "/apple-icon.png", sizes: "500x500", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  openGraph: {
    type: "website", locale: "vi_VN", url: "https://hdtlogistics.vn",
    siteName: "HDT Logistics",
    title: "HDT Logistics – Giải Pháp Logistics & Vận Chuyển Quốc Tế",
    description: "High Delivery – High Discipline – High Reliability",
    images: [{ url: "/images/logo.png", width: 500, height: 500, alt: "HDT Logistics" }],
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased bg-white">
        <Header />
        <main className="pt-[125px] md:pt-[125px]">{children}</main>
        <Footer />
        <FloatingButtons />
      </body>
    </html>
  );
}
