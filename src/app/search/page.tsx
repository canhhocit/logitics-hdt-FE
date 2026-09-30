"use client";

import { Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Search, ChevronRight, Calendar, FileText, Layers, ArrowRight } from "lucide-react";
import { newsItems, services } from "@/data";

function SearchResults() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";

  const normalizedQ = q.toLowerCase().trim();

  const matchedNews = normalizedQ
    ? newsItems.filter(
        (n) =>
          n.title.toLowerCase().includes(normalizedQ) ||
          n.excerpt.toLowerCase().includes(normalizedQ) ||
          n.categoryLabel.toLowerCase().includes(normalizedQ)
      )
    : [];

  const matchedServices = normalizedQ
    ? services.filter(
        (s) =>
          s.title.toLowerCase().includes(normalizedQ) ||
          s.shortDesc.toLowerCase().includes(normalizedQ)
      )
    : [];

  const total = matchedNews.length + matchedServices.length;

  return (
    <div>
      {/* Search bar */}
      <div className="bg-slate-50 border-b border-gray-200 py-5">
        <div className="wrap">
          <form action="/search" method="get" className="flex gap-2 max-w-xl">
            <div className="flex-1 flex items-center gap-3 bg-white border-2 border-gray-200
                            rounded-xl px-4 focus-within:border-navy-500 transition-colors">
              <Search size={16} className="text-gray-400 flex-shrink-0" />
              <input
                name="q"
                defaultValue={q}
                placeholder="Nhập từ khóa tìm kiếm..."
                className="flex-1 py-3 text-navy-800 text-sm outline-none placeholder:text-gray-300"
              />
            </div>
            <button type="submit" className="btn-orange text-sm px-5">Tìm</button>
          </form>
          {q && (
            <p className="text-navy-500 text-sm mt-3">
              Tìm kiếm: <strong className="text-navy-800">"{q}"</strong>
              {" "}— {total} kết quả
            </p>
          )}
        </div>
      </div>

      <div className="wrap py-12">
        {/* No query */}
        {!q && (
          <div className="text-center py-16">
            <Search size={48} className="text-navy-200 mx-auto mb-4" />
            <h2 className="text-xl font-bold text-navy-700 mb-2">Nhập từ khóa để tìm kiếm</h2>
            <p className="text-navy-400 text-sm max-w-sm mx-auto">
              Tìm kiếm dịch vụ, bài viết hướng dẫn và thông tin hải quan trên toàn bộ website HDT Logistics.
            </p>
          </div>
        )}

        {/* No results (M09.01.02.02) */}
        {q && total === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center
                            text-slate-400 mx-auto mb-5">
              <Search size={28} />
            </div>
            <h2 className="text-xl font-bold text-navy-700 mb-2">
              Không tìm thấy kết quả cho "{q}"
            </h2>
            <p className="text-navy-400 text-sm mb-8 max-w-sm mx-auto">
              Thử tìm với từ khóa khác hoặc liên hệ trực tiếp để được tư vấn.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <p className="text-navy-500 text-sm w-full mb-2">Gợi ý tìm kiếm:</p>
              {["Vận chuyển đường biển", "Khai thuê hải quan", "FCL LCL", "Thủ tục xuất khẩu"].map((kw) => (
                <a key={kw} href={`/search?q=${encodeURIComponent(kw)}`}
                  className="text-sm bg-navy-50 border border-navy-200 text-navy-600
                             hover:border-orange-400 hover:text-orange-500 px-4 py-2 rounded-xl transition-colors">
                  {kw}
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Results */}
        {q && total > 0 && (
          <div className="space-y-10">
            {/* Services */}
            {matchedServices.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <Layers size={16} className="text-navy-400" />
                  <h2 className="font-bold text-navy-800">
                    Dịch vụ ({matchedServices.length})
                  </h2>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {matchedServices.map((svc) => (
                    <Link key={svc.slug} href={`/services/${svc.slug}`}
                      className="group card p-5 flex gap-4">
                      <div className="w-10 h-10 rounded-xl bg-navy-100 flex items-center justify-center
                                      flex-shrink-0 text-navy-600 font-bold text-sm">
                        {svc.no}
                      </div>
                      <div>
                        <h3 className="font-bold text-navy-800 text-sm mb-1 group-hover:text-orange-500 transition-colors">
                          {svc.title}
                        </h3>
                        <p className="text-navy-500 text-xs leading-relaxed line-clamp-2">{svc.shortDesc}</p>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Articles */}
            {matchedNews.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-5">
                  <FileText size={16} className="text-navy-400" />
                  <h2 className="font-bold text-navy-800">
                    Bài viết ({matchedNews.length})
                  </h2>
                </div>
                <div className="space-y-4">
                  {matchedNews.map((item) => (
                    <Link key={item.id} href={`/news/${item.slug}`}
                      className="group flex gap-4 card p-5">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-navy-600 to-navy-800
                                      flex-shrink-0 flex items-center justify-center">
                        <FileText size={20} className="text-white/40" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-orange-500 text-[10px] font-bold tracking-wider uppercase">
                          {item.categoryLabel}
                        </span>
                        <h3 className="font-bold text-navy-800 text-sm leading-snug mt-0.5 mb-1.5
                                       group-hover:text-orange-500 transition-colors line-clamp-1">
                          {item.title}
                        </h3>
                        <p className="text-navy-500 text-xs leading-relaxed line-clamp-2">{item.excerpt}</p>
                        <div className="flex items-center gap-3 mt-2 text-xs text-navy-400">
                          <span className="flex items-center gap-1"><Calendar size={10}/>{item.date}</span>
                          <span>{item.readMinutes} phút đọc</span>
                        </div>
                      </div>
                      <ArrowRight size={16} className="text-navy-300 group-hover:text-orange-500 transition-colors flex-shrink-0 mt-1" />
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="hero-bg py-14">
        <div className="wrap relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-5">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Tìm Kiếm</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white">Kết quả tìm kiếm</h1>
        </div>
      </section>

      <Suspense fallback={
        <div className="wrap py-16 text-center text-navy-400">Đang tìm kiếm...</div>
      }>
        <SearchResults />
      </Suspense>
    </div>
  );
}
