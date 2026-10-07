"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        const steps = 60, dur = 1800;
        const inc = target / steps;
        let cur = 0;
        const t = setInterval(() => {
          cur = Math.min(cur + inc, target);
          setVal(Math.round(cur));
          if (cur >= target) clearInterval(t);
        }, dur / steps);
      }
    }, { threshold: 0.4 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);

  return <span ref={ref}>{val.toLocaleString()}{suffix}</span>;
}

/**
 * settings: Record<string, string> từ GET /public/settings
 * Keys: counter_staff, counter_offices, counter_shipments, counter_experience
 */
export default function StatsSection({ settings = {} }: { settings?: Record<string, string> }) {
  /** Parse "50+" → { target: 50, suffix: "+" } */
  function parse(raw: string | undefined, fallback = 0, fallbackSuffix = "") {
    if (!raw) return { target: fallback, suffix: fallbackSuffix };
    const match = raw.match(/^(\d[\d,]*)(\D*)$/);
    if (!match) return { target: fallback, suffix: fallbackSuffix };
    return { target: parseInt(match[1].replace(/,/g, ""), 10), suffix: match[2] || "" };
  }

  const stats = [
    { ...parse(settings.counter_staff),      label: "Nhân Sự",        sub: "Chuyên môn nghiệp vụ" },
    { ...parse(settings.counter_offices),    label: "Văn Phòng",      sub: "Toàn quốc & Quốc tế" },
    { ...parse(settings.counter_shipments),  label: "Chuyến Hàng",    sub: "Đã thực hiện thành công" },
    { ...parse(settings.counter_experience), label: "Năm Kinh Nghiệm", sub: "Trong ngành logistics" },
  ].filter(s => s.target > 0); // chỉ hiện nếu có data từ API

  return (
    <section className="py-20 bg-navy-700 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-10 w-72 h-72 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-20 w-56 h-56 rounded-full bg-orange-500/10 blur-3xl" />
      </div>
      <div className="wrap relative z-10">
        <div className="text-center mb-12">
          <p className="eyebrow text-orange-400 mb-4 justify-center">Thành Tựu</p>
          <h2 className="h2 text-white mb-4">Con số nói lên tất cả</h2>
          <p className="text-white/50 text-sm max-w-xl mx-auto leading-relaxed">
            HDT Logistics từng bước xây dựng năng lực vận hành ổn định trong lĩnh vực logistics doanh nghiệp.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s) => (
            <div key={s.label}
              className="bg-white/10 backdrop-blur-sm border border-white/15 rounded-2xl p-7
                         text-center hover:bg-white/15 transition-colors group">
              <div className="text-4xl md:text-5xl font-extrabold text-white mb-2 tracking-tight group-hover:text-orange-400 transition-colors">
                <Counter target={s.target} suffix={s.suffix} />
              </div>
              <p className="text-white font-semibold text-sm">{s.label}</p>
              <p className="text-white/40 text-xs mt-1">{s.sub}</p>
              <div className="w-8 h-0.5 bg-orange-400 mx-auto mt-4 rounded" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
