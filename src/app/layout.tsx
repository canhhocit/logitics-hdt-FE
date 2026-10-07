import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://hdtlogistics.vn"),
  title: {
    default: "HDT Logistics – Giải Pháp Logistics & Vận Chuyển Quốc Tế Cho Doanh Nghiệp",
    template: "%s | HDT Logistics",
  },
  description:
    "HDT Logistics cung cấp giải pháp logistics tổng thể: vận chuyển quốc tế đường không, đường biển, đường bộ, khai thuê hải quan và kho bãi phân phối cho doanh nghiệp.",
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
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="vi">
      <body className="antialiased bg-white">
        {children}
      </body>
    </html>
  );
}
