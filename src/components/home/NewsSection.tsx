"use client";

import Link from "next/link";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { newsItems } from "@/data";

export default function NewsSection() {
  const [featured, ...rest] = newsItems.slice(0, 4);

  return (
    <section className="py-24 bg-slate-50">
      <div className="wrap">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-4">Tin Tức & Sự Kiện</p>
            <h2 className="h2 text-navy-800">
              Cập nhật mới nhất<br />
              <span className="text-grad">từ HD Logistics</span>
            </h2>
          </div>
          <Link href="/news"
            className="inline-flex items-center gap-2 text-navy-500 hover:text-orange-500
                       font-semibold text-sm transition-colors">
            Xem tất cả tin tức <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">
          {/* Featured */}
          <Link href={`/news/${featured.slug}`}
            className="lg:col-span-2 group card overflow-hidden flex flex-col">
            <div className="h-56 bg-gradient-to-br from-navy-700 to-navy-900 relative overflow-hidden flex items-end p-6">
              <div className="absolute inset-0 opacity-10"
                style={{ backgroundImage: "repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.05) 20px, rgba(255,255,255,0.05) 40px)" }} />
              <span className="relative z-10 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                {featured.category}
              </span>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-xs text-navy-400 mb-3">
                <span className="flex items-center gap-1"><Calendar size={11} />{featured.date}</span>
                <span className="flex items-center gap-1"><Tag size={11} />{featured.category}</span>
              </div>
              <h3 className="font-bold text-navy-800 text-xl leading-snug mb-3
                             group-hover:text-orange-500 transition-colors">
                {featured.title}
              </h3>
              <p className="text-navy-500 text-sm leading-relaxed line-clamp-2 flex-1">
                {featured.excerpt}
              </p>
              <div className="flex items-center gap-1.5 mt-5 text-sm font-semibold
                              text-navy-400 group-hover:text-orange-500 transition-colors">
                Đọc tiếp <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Side */}
          <div className="flex flex-col gap-4">
            {rest.map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`}
                className="group card flex gap-4 p-5">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-navy-600 to-navy-800
                                flex items-center justify-center flex-shrink-0">
                  <span className="text-white/20 font-black text-xs">HD</span>
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-orange-500 text-[10px] font-bold tracking-wider uppercase">
                    {item.category}
                  </span>
                  <h4 className="font-semibold text-navy-800 text-sm leading-snug mt-1 mb-2
                                 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-1 text-navy-400 text-xs">
                    <Calendar size={10} />{item.date}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
