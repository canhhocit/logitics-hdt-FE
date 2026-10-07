"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Search, ChevronLeft, ChevronRight } from "lucide-react";
import clsx from "clsx";

const slides = [
  {
    tag: "Vận Chuyển Quốc Tế",
    title: "Giải pháp logistics",
    highlight: "toàn diện cho doanh nghiệp",
    sub: "Vận chuyển đa phương thức, khai thuê hải quan và quản lý chuỗi cung ứng — chính xác, minh bạch và tối ưu chi phí.",
    image: "/images/hero/hero-port.jpg",
    alt: "Cảng container quốc tế Cái Mép, Việt Nam",
  },
  {
    tag: "Hàng Không & Đường Biển",
    title: "Kết nối Việt Nam",
    highlight: "với thị trường toàn cầu",
    sub: "Booking trực tiếp Yang Ming, SITC, CMA CGM... và 50+ hãng hàng không. Không qua trung gian, giá cạnh tranh nhất.",
    image: "/images/hero/hero-air.jpg",
    alt: "Máy bay chở hàng tại sân bay quốc tế",
  },
  {
    tag: "Vận Tải Nội Địa",
    title: "Phủ sóng 63 tỉnh thành,",
    highlight: "xuyên biên giới ASEAN",
    sub: "Xe tải 1–40 tấn, GPS 24/7, door-to-door. Tuyến Hà Nội – TP.HCM 2–3 ngày, xuyên biên giới Trung Quốc, Lào, Campuchia.",
    image: "/images/hero/hero-road.jpg",
    alt: "Xe container vận chuyển hàng hóa trên đường cao tốc",
  },
];

export default function HeroSection({ settings = {} }: { settings?: Record<string, string> }) {
  const staff   = settings.counter_staff       || "";
  const offices = settings.counter_offices     || "";
  const ships   = settings.counter_shipments   || "";
  const exp     = settings.counter_experience  || "";

  const statsStrip = [
    { n: staff,   l: "Nhân sự chuyên môn"      },
    { n: offices, l: "Văn phòng toàn quốc"     },
    { n: ships,   l: "Chuyến hàng hoàn thành"  },
    { n: exp,     l: "Năm kinh nghiệm"          },
  ].filter(s => s.n); // chỉ hiện nếu có data từ API
  const [cur, setCur] = useState(0);
  const [code, setCode] = useState("");
  const len = slides.length;

  useEffect(() => {
    const t = setInterval(() => setCur((p) => (p + 1) % len), 5500);
    return () => clearInterval(t);
  }, [len]);

  const s = slides[cur];

  return (
    <section className="relative min-h-[92vh] flex flex-col overflow-hidden pt-[116px]">

      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        <Image
          src={s.image}
          alt={s.alt}
          fill
          className="object-cover transition-opacity duration-1000"
          priority
          quality={90}
          sizes="100vw"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy-950/70" />
        {/* Gradient bottom */}
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-navy-950/80" />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 flex-1 flex items-center">
        <div className="wrap w-full py-20">
          <div className="max-w-3xl">
            {/* Tag */}
            <span className="inline-flex items-center gap-2 bg-orange-500/20 border border-orange-400/40
                             text-orange-300 text-xs font-bold tracking-[0.15em] uppercase
                             px-4 py-1.5 rounded-full mb-7">
              <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
              {s.tag}
            </span>

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white
                           leading-[1.1] tracking-[-0.025em] mb-3">
              {s.title}
            </h1>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-orange-400
                           leading-[1.1] tracking-[-0.025em] mb-7">
              {s.highlight}
            </h1>
            <p className="text-white/70 text-lg leading-relaxed max-w-2xl mb-10">{s.sub}</p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-4 mb-12">
              <Link href="/contact" className="btn-orange shadow-orange">
                Nhận Báo Giá Ngay <ArrowRight size={16} />
              </Link>
              <Link href="/services" className="btn-ghost-white">
                Khám Phá Dịch Vụ
              </Link>
            </div>

            {/* Tracking */}
            <div className="bg-white/10 backdrop-blur-md border border-white/20
                            rounded-2xl p-5 max-w-xl">
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

      {/* ── Slide controls ── */}
      <div className="relative z-10 wrap flex items-center justify-between pb-6">
        <div className="flex gap-2">
          {slides.map((_, i) => (
            <button key={i} onClick={() => setCur(i)}
              className={clsx("rounded-full transition-all duration-300",
                i === cur ? "bg-orange-400 w-7 h-2" : "bg-white/30 w-2 h-2 hover:bg-white/60"
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

      {/* Stats strip — từ API settings */}
      <div className="relative z-10 bg-white/10 backdrop-blur-sm border-t border-white/15">
        <div className="wrap">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/15">
            {statsStrip.map((st) => (
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
