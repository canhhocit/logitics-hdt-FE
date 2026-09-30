import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, ArrowRight, Clock } from "lucide-react";
import { newsItems, newsCategories } from "@/data";

export async function generateStaticParams() {
  return newsCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = newsCategories.find((c) => c.slug === params.slug);
  if (!cat) return {};
  return { title: cat.label, description: `Các bài viết về ${cat.label}` };
}

export default function NewsCategoryPage({ params }: { params: { slug: string } }) {
  const cat = newsCategories.find((c) => c.slug === params.slug);
  if (!cat) notFound();

  const items = newsItems.filter((n) => n.category === params.slug);

  return (
    <div className="bg-white">
      <section className="hero-bg py-20">
        <div className="wrap relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6 flex-wrap">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <Link href="/news" className="hover:text-white">Tin Tức</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{cat.label}</span>
          </div>
          <p className="eyebrow text-orange-400 mb-5">CHUYÊN MỤC</p>
          <h1 className="h1 text-white">{cat.label}</h1>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap">
          {items.length === 0 ? (
            <div className="text-center py-20 text-navy-400">Chưa có bài viết trong chuyên mục này.</div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Link key={item.id} href={`/news/${item.slug}`}
                  className="group card overflow-hidden flex flex-col">
                  <div className="h-44 bg-gradient-to-br from-navy-700 to-navy-900 relative flex items-end p-5 overflow-hidden">
                    <div className="absolute inset-0 opacity-10"
                      style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,0.05) 20px,rgba(255,255,255,0.05) 40px)" }} />
                    <span className="relative z-10 bg-orange-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                      {item.categoryLabel}
                    </span>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-xs text-navy-400 mb-3">
                      <span className="flex items-center gap-1"><Calendar size={11}/>{item.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11}/>{item.readMinutes} phút</span>
                    </div>
                    <h3 className="font-bold text-navy-800 text-sm leading-snug mb-2
                                   group-hover:text-orange-500 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-navy-500 text-xs leading-relaxed line-clamp-2 flex-1">{item.excerpt}</p>
                    <div className="flex items-center gap-1.5 mt-4 text-xs font-semibold
                                    text-navy-400 group-hover:text-orange-500 transition-colors">
                      Đọc tiếp <ArrowRight size={11}/>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
