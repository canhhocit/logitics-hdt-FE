import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Clock, ArrowRight } from "lucide-react";
import { newsItems, newsCategories } from "@/data";

export async function generateStaticParams() {
  return newsCategories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const cat = newsCategories.find((c) => c.slug === params.slug);
  if (!cat) return {};
  return { title: cat.label, description: `Các bài viết về ${cat.label} từ HD Logistics` };
}

export default function NewsCategoryPage({ params }: { params: { slug: string } }) {
  const cat = newsCategories.find((c) => c.slug === params.slug);
  if (!cat) notFound();
  const items = newsItems.filter((n) => n.category === params.slug);

  return (
    <div className="bg-white">
      <section className="hero-bg py-20">
        <div className="wrap relative z-10">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <Link href="/news" className="hover:text-white">Tin Tức</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{cat.label}</span>
          </nav>
          <p className="eyebrow text-orange-400 mb-5">CHUYÊN MỤC</p>
          <h1 className="h1 text-white">{cat.label}</h1>
          <p className="text-white/55 mt-3 text-lg">{items.length} bài viết</p>
        </div>
      </section>

      <section className="py-16">
        <div className="wrap">
          {items.length === 0 ? (
            <div className="text-center py-20 text-navy-400">
              Chưa có bài viết trong chuyên mục này.
            </div>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {items.map((item) => (
                <Link key={item.id} href={`/news/${item.slug}`}
                  className="group card overflow-hidden flex flex-col">
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
                                       px-2.5 py-1 rounded-full">
                        {item.categoryLabel}
                      </span>
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 text-navy-400 text-xs mb-3">
                      <span className="flex items-center gap-1"><Calendar size={11}/>{item.date}</span>
                      <span className="flex items-center gap-1"><Clock size={11}/>{item.readMinutes} phút</span>
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
                      Đọc tiếp <ArrowRight size={11}/>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
          <div className="mt-10 text-center">
            <Link href="/news" className="btn-outline text-sm">
              ← Tất cả bài viết
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
