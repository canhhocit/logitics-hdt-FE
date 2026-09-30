"use client";

import { useState } from "react";
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react";
import { testimonials } from "@/data";
import clsx from "clsx";

/**
 * M01.04.03.01 – Khối 'Phản hồi từ khách hàng' dùng chung
 * Dùng trên: trang chủ, tư vấn hải quan, trang dịch vụ
 */
export default function TestimonialsBlock() {
  const [active, setActive] = useState(0);

  return (
    <section className="py-20 bg-slate-50 border-t border-gray-100">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="eyebrow mb-4">Phản Hồi Từ Khách Hàng</p>
            <h2 className="h2 text-navy-800">
              Doanh nghiệp nói gì<br />
              <span className="text-grad">về HDT Logistics</span>
            </h2>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => setActive((p) => (p - 1 + testimonials.length) % testimonials.length)}
              className="w-10 h-10 rounded-xl border-2 border-navy-200 text-navy-500
                         hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50
                         flex items-center justify-center transition-all"
              aria-label="Trước"
            >
              <ChevronLeft size={17} />
            </button>
            <button
              onClick={() => setActive((p) => (p + 1) % testimonials.length)}
              className="w-10 h-10 rounded-xl border-2 border-navy-200 text-navy-500
                         hover:border-orange-400 hover:text-orange-500 hover:bg-orange-50
                         flex items-center justify-center transition-all"
              aria-label="Tiếp"
            >
              <ChevronRight size={17} />
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <div
              key={i}
              onClick={() => setActive(i)}
              className={clsx(
                "rounded-2xl p-7 cursor-pointer transition-all duration-300",
                i === active
                  ? "bg-navy-700 text-white shadow-navy scale-[1.01]"
                  : "bg-white border border-gray-100 shadow-card hover:shadow-card-hover hover:-translate-y-1"
              )}
            >
              <Quote size={26} className={clsx("mb-4", i === active ? "text-orange-400" : "text-navy-200")} />

              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[1,2,3,4,5].map((s) => (
                  <Star key={s} size={13} className="fill-orange-400 text-orange-400" />
                ))}
              </div>

              <p className={clsx("text-sm leading-[1.85] mb-7", i === active ? "text-white/80" : "text-navy-500")}>
                "{t.quote}"
              </p>

              <div
                className="flex items-center gap-3 pt-5 border-t"
                style={{ borderColor: i === active ? "rgba(255,255,255,0.12)" : "#f1f5f9" }}
              >
                <div
                  className={clsx(
                    "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0",
                    i === active ? "bg-orange-500 text-white" : "bg-navy-100 text-navy-700"
                  )}
                >
                  {t.type.charAt(0)}
                </div>
                <div>
                  <p className={clsx("font-bold text-sm", i === active ? "text-white" : "text-navy-800")}>
                    {t.type}
                  </p>
                  <p className={clsx("text-xs", i === active ? "text-white/50" : "text-navy-400")}>
                    {t.industry}
                  </p>
                </div>
                {i === active && <div className="ml-auto w-2 h-2 rounded-full bg-orange-400" />}
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mt-7">
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={clsx(
                "rounded-full transition-all duration-300",
                i === active ? "bg-orange-500 w-7 h-2" : "bg-navy-200 w-2 h-2 hover:bg-navy-400"
              )}
              aria-label={`Testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
