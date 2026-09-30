import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react";
import { newsItems, newsCategories } from "@/data";

export const metadata: Metadata = {
  title: "Tin Tức",
  description:
    "Cập nhật tin tức ngành logistics, hướng dẫn thủ tục xuất nhập khẩu và thông tin từ HDT Logistics.",
};

export default function NewsPage() {
  const [featured, ...rest] = newsItems;

  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="hero-bg pt-36 pb-20">
        <div className="wrap relative z-10">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-6"
            aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Tin Tức</span>
          </nav>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <p className="eyebrow text-orange-400 mb-6">TIN TỨC & HƯỚNG DẪN</p>
              <h1 className="h1 text-white mb-3">
                Cập nhật mới nhất<br />
                <span className="text-orange-400">từ HDT Logistics</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Category tabs */}
      <div className="border-b border-gray-200 bg-white sticky top-[105px] z-30">
        <div className="wrap">
          <div className="flex gap-1 py-3 overflow-x-auto">
            <Link href="/news"
              className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-bold
                         bg-navy-700 text-white">
              Tất Cả
            </Link>
            {newsCategories.map((cat) => (
              <Link key={cat.slug} href={`/news/category/${cat.slug}`}
                className="flex-shrink-0 px-4 py-2 rounded-lg text-xs font-semibold
                           text-navy-500 hover:text-navy-700 hover:bg-navy-50 transition-colors">
                {cat.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <section className="py-16">
        <div className="wrap">

          {/* Featured bài viết nổi bật */}
          <Link href={`/news/${featured.slug}`}
            className="group block mb-12 card overflow-hidden">
            <div className="grid md:grid-cols-2">

              {/* Ảnh thật */}
              <div className="relative h-64 md:h-auto overflow-hidden">
                <Image
                  src={featured.image}
                  alt={featured.imageAlt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                <div className="absolute top-5 left-5">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {featured.categoryLabel}
                  </span>
                </div>
              </div>

              <div className="p-8 flex flex-col justify-center">
                <span className="text-orange-500 text-xs font-bold tracking-widest
                                 uppercase mb-3 block">
                  Bài viết nổi bật
                </span>
                <div className="flex items-center gap-3 text-navy-400 text-xs mb-4">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} />{featured.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={11} />{featured.readMinutes} phút đọc
                  </span>
                </div>
                <h2 className="font-bold text-navy-800 text-xl leading-snug mb-4
                               group-hover:text-orange-500 transition-colors">
                  {featured.title}
                </h2>
                <p className="text-navy-500 text-sm leading-relaxed mb-5 line-clamp-3">
                  {featured.excerpt}
                </p>
                <div className="inline-flex items-center gap-2 text-sm font-semibold
                                text-navy-400 group-hover:text-orange-500 transition-colors">
                  Đọc bài viết
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform"/>
                </div>
              </div>
            </div>
          </Link>

          {/* Grid các bài còn lại */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`}
                className="group card overflow-hidden flex flex-col">

                {/* Ảnh thật */}
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  <div className="absolute top-4 left-4">
                    <span className="bg-orange-500/90 text-white text-[10px] font-bold
                                     px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-center gap-3 text-navy-400 text-xs mb-3">
                    <span className="flex items-center gap-1">
                      <Calendar size={11} />{item.date}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock size={11} />{item.readMinutes} phút
                    </span>
                  </div>
                  <h3 className="font-bold text-navy-800 text-sm leading-snug mb-2
                                 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-navy-500 text-xs leading-relaxed line-clamp-2 flex-1">
                    {item.excerpt}
                  </p>
                  <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold
                                  text-navy-400 group-hover:text-orange-500 transition-colors">
                    Đọc tiếp
                    <ArrowRight size={11}
                      className="group-hover:translate-x-0.5 transition-transform"/>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-12">
            {[1, 2, 3].map((p) => (
              <button key={p}
                className={`w-10 h-10 rounded-xl text-sm font-semibold transition-colors ${
                  p === 1
                    ? "bg-navy-700 text-white shadow-navy"
                    : "bg-white border-2 border-gray-200 text-navy-500 hover:border-navy-400"
                }`}>
                {p}
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
