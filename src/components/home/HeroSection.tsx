"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight, Search, ChevronLeft, ChevronRight, Plane, Ship, Truck } from "lucide-react";
import clsx from "clsx";

const slides = [
  {
    tag: "Vận Chuyển Quốc Tế",
    title: "Giải pháp logistics",
    highlight: "toàn diện cho doanh nghiệp",
    sub: "HD Logistics cung cấp dịch vụ vận chuyển đa phương thức, khai thuê hải quan và quản lý chuỗi cung ứng — chính xác, minh bạch và tối ưu chi phí.",
    icon: <Truck size={220} strokeWidth={0.5} />,
    stat1: { n: "1,500+", l: "Chuyến hàng" },
    stat2: { n: "5+",     l: "Văn phòng" },
  },
  {
    tag: "Đường Biển & Hàng Không",
    title: "Kết nối Việt Nam",
    highlight: "với thị trường toàn cầu",
    sub: "Tuyến biển FCL/LCL và đường không Express đến hơn 100 cảng biển, 50+ hãng hàng không quốc tế. Booking nhanh, theo dõi liên tục.",
    icon: <Ship size={220} strokeWidth={0.5} />,
    stat1: { n: "100+", l: "Cảng biển" },
    stat2: { n: "50+",  l: "Hãng hàng không" },
  },
  {
    tag: "Hải Quan & Kho Bãi",
    title: "Thông quan nhanh,",
    highlight: "kho bãi chuẩn quốc tế",
    sub: "Khai thuê hải quan điện tử, tỷ lệ thông quan lần đầu >95%. Hệ thống kho WMS tại Hà Nội, TP.HCM, Đà Nẵng, Bình Dương.",
    icon: <Plane size={220} strokeWidth={0.5} />,
    stat1: { n: "95%+", l: "Thông quan lần đầu" },
    stat2: { n: "50K m²", l: "Diện tích kho" },
  },
];

export default function HeroSection() {
  const [cur, setCur] = useState(0);
  const [code, setCode] = useState("");
  const len = slides.length;
  const s = slides[cur];

  useEffect(() => {
    const t = setInterval(() => setCur((p) => (p + 1) % len), 5500);
    return () => clearInterval(t);
  }, [len]);

  return (
    <section className="relative hero-bg min-h-[92vh] flex flex-col overflow-hidden">

      {/* Decorative circles */}
      <div className="absolute -top-32 -right-32 w-[560px] h-[560px] rounded-full bg-white/[0.03] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-orange-500/10 blur-3xl pointer-events-none" />

      {/* Big icon watermark */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 opacity-[0.04] text-white pointer-events-none hidden lg:block -mr-16">
        {s.icon}
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="wrap w-full py-20">
          <div className="max-w-3xl">

            {/* Tag */}
            <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/30
                             text-orange-300 text-xs font-bold tracking-[0.15em] uppercase
                             px-4 py-1.5 rounded-full mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              {s.tag}
            </span>

            {/* Headline */}
            <h1 className="h1 text-white mb-2">{s.title}</h1>
            <h1 className="h1 text-orange-400 mb-7">{s.highlight}</h1>

            <p className="text-white/65 text-lg leading-relaxed max-w-2xl mb-10">{s.sub}</p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/contact" className="btn-orange shadow-orange">
                Nhận Báo Giá Miễn Phí <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-ghost-white">
                Xem Dịch Vụ
              </Link>
            </div>

            {/* Tracking bar */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-5 max-w-xl">
              <p className="text-white/50 text-xs font-semibold tracking-widest uppercase mb-3">
                Tra Cứu Vận Đơn Nhanh
              </p>
              <div className="flex gap-2">
                <input
                  type="text" value={code}
                  onChange={(e) => setCode(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && window.location.assign(`/tracking${code ? `?code=${code}` : ""}`)}
                  placeholder="Nhập mã vận đơn (VD: HDVN2026001234)..."
                  className="flex-1 bg-white rounded-xl px-4 py-3 text-navy-800 text-sm
                             font-medium outline-none focus:ring-2 focus:ring-orange-400
                             placeholder:text-gray-400"
                />
                <Link href={`/tracking${code ? `?code=${code}` : ""}`}
                  className="flex items-center gap-2 bg-orange-500 hover:bg-orange-600
                             text-white font-semibold px-5 py-3 rounded-xl text-sm
                             transition-colors whitespace-nowrap">
                  <Search size={15} /> Tra Cứu
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Slide nav ── */}
      <div className="relative z-10 wrap flex items-center justify-between pb-6">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={clsx("rounded-full transition-all duration-300",
                i === cur ? "bg-orange-400 w-7 h-2" : "bg-white/25 w-2 h-2 hover:bg-white/50"
              )} />
          ))}
        </div>
        <div className="flex gap-2">
          <button onClick={() => setCur((p) => (p - 1 + len) % len)}
            className="w-9 h-9 rounded-full border border-white/25 text-white/60
                       hover:border-white/70 hover:text-white flex items-center justify-center transition-colors">
            <ChevronLeft size={16} />
          </button>
          <button onClick={() => setCur((p) => (p + 1) % len)}
            className="w-9 h-9 rounded-full border border-white/25 text-white/60
                       hover:border-white/70 hover:text-white flex items-center justify-center transition-colors">
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* ── Stats strip ── */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/15">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
            {[
              { n: "50+",    l: "Nhân sự chuyên môn" },
              { n: "5+",     l: "Văn phòng toàn quốc" },
              { n: "1,500+", l: "Chuyến hàng hoàn thành" },
              { n: "10+",    l: "Năm kinh nghiệm" },
            ].map((st) => (
              <div key={st.l} className="py-5 px-6 text-center">
                <div className="text-2xl font-extrabold text-orange-400">{st.n}</div>
                <div className="text-white/55 text-xs mt-0.5">{st.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
