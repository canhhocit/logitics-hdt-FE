"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Calendar, Clock } from "lucide-react";
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
              <span className="text-grad">từ HDT Logistics</span>
            </h2>
          </div>
          <Link href="/news"
            className="inline-flex items-center gap-2 text-navy-500 hover:text-orange-500
                       font-semibold text-sm transition-colors">
            Xem tất cả tin tức <ArrowRight size={14} />
          </Link>
        </div>

        <div className="grid lg:grid-cols-3 gap-5">

          {/* Featured với ảnh thật */}
          <Link href={`/news/${featured.slug}`}
            className="lg:col-span-2 group card overflow-hidden flex flex-col">
            <div className="relative h-56 overflow-hidden">
              <Image
                src={featured.image}
                alt={featured.imageAlt}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
                priority
                sizes="(max-width: 1024px) 100vw, 66vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
              <div className="absolute top-4 left-4">
                <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                  {featured.categoryLabel}
                </span>
              </div>
            </div>
            <div className="p-7 flex flex-col flex-1">
              <div className="flex items-center gap-3 text-navy-400 text-xs mb-3">
                <span className="flex items-center gap-1">
                  <Calendar size={11} />{featured.date}
                </span>
                <span className="flex items-center gap-1">
                  <Clock size={11} />{featured.readMinutes} phút đọc
                </span>
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
                Đọc tiếp
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>

          {/* Side list với ảnh nhỏ */}
          <div className="flex flex-col gap-4">
            {rest.map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`}
                className="group flex gap-4 card p-4 items-start">
                {/* Ảnh thật thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="80px"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <span className="text-orange-500 text-[10px] font-bold tracking-wider uppercase">
                    {item.categoryLabel}
                  </span>
                  <h4 className="font-semibold text-navy-800 text-sm leading-snug mt-1 mb-2
                                 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-navy-400 text-xs">
                    <span className="flex items-center gap-1">
                      <Calendar size={10} />{item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={10} />{item.readMinutes} phút
                    </span>
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
