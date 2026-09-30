import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { newsItems } from "@/data";
import { articleContent, type ArticleSection } from "@/data/articles";
import ShareButtons from "@/components/ui/ShareButtons";

export async function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const item = newsItems.find((n) => n.slug === params.slug);
  if (!item) return {};
  return {
    title: item.title,
    description: item.excerpt,
    openGraph: {
      title: item.title,
      description: item.excerpt,
      type: "article",
      publishedTime: item.dateISO,
      locale: "vi_VN",
      images: item.image ? [{ url: item.image, alt: item.imageAlt }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: item.title,
      description: item.excerpt,
    },
  };
}

/** Render một section của bài viết */
function Section({ section }: { section: ArticleSection }) {
  switch (section.type) {
    case "heading":
      return (
        <h2 className="text-xl font-bold text-navy-800 mt-8 mb-4 pb-2 border-b-2 border-orange-100">
          {section.content}
        </h2>
      );
    case "subheading":
      return (
        <h3 className="text-lg font-semibold text-navy-700 mt-6 mb-3">
          {section.content}
        </h3>
      );
    case "paragraph":
      return (
        <p className="text-navy-600 leading-[1.9] text-[0.97rem]">
          {section.content}
        </p>
      );
    case "list":
      return (
        <ul className="space-y-2.5 my-1">
          {section.items?.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-navy-600 text-sm">
              <span className="w-5 h-5 rounded-full bg-orange-100 text-orange-600 font-bold text-[10px]
                               flex items-center justify-center flex-shrink-0 mt-0.5">
                {i + 1}
              </span>
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "table":
      return (
        <div className="overflow-x-auto rounded-2xl border border-gray-200 my-2">
          <table className="w-full text-sm">
            <tbody>
              {section.rows?.map((row, i) => (
                <tr key={i} className={i % 2 === 0 ? "bg-slate-50" : "bg-white"}>
                  <td className="px-5 py-3 font-semibold text-navy-700 border-r border-gray-200
                                 w-1/3 whitespace-nowrap align-top">
                    {row.label}
                  </td>
                  <td className="px-5 py-3 text-navy-600 leading-relaxed">
                    {row.value}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    case "note":
      return (
        <div className="bg-orange-50 border-l-4 border-orange-400 rounded-r-xl p-5 my-2">
          <p className="text-orange-800 text-sm leading-relaxed">{section.content}</p>
        </div>
      );
    default:
      return null;
  }
}

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const item = newsItems.find((n) => n.slug === params.slug);
  if (!item) notFound();

  const related = newsItems.filter((n) => n.slug !== params.slug).slice(0, 3);
  const sections = articleContent[params.slug] ?? [
    {
      type: "paragraph" as const,
      content: item.excerpt,
    },
    {
      type: "paragraph" as const,
      content:
        "Nội dung bài viết đang được cập nhật. Vui lòng quay lại sau hoặc liên hệ HD Logistics để được tư vấn trực tiếp.",
    },
  ];

  const pageUrl = `https://hdlogistics.vn/news/${item.slug}`;

  return (
    <div className="bg-white">
      {/* ── Hero ── */}
      <section className="hero-bg py-14">
        <div className="wrap relative z-10">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb"
            className="flex items-center gap-2 text-white/40 text-xs mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Trang Chủ</Link>
            <ChevronRight size={12} />
            <Link href="/news" className="hover:text-white transition-colors">Tin Tức</Link>
            <ChevronRight size={12} />
            <Link href={`/news/category/${item.category}`}
              className="hover:text-white transition-colors">
              {item.categoryLabel}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/60 line-clamp-1 max-w-[200px]">{item.title}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5
                             rounded-full inline-block mb-5">
              {item.categoryLabel}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-snug
                           tracking-tight mb-5">
              {item.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-white/55 text-sm">
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />{item.date}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />{item.readMinutes} phút đọc
              </span>
              <span className="flex items-center gap-1.5">
                <BookOpen size={13} />{item.categoryLabel}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-14">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_340px] gap-12">

            {/* ── Article ── */}
            <article>

              {/* Ảnh thật thumbnail */}
              <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden mb-10 shadow-lg">
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, 70vw"
                />
                {/* Caption */}
                <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/60 to-transparent
                                px-5 py-3">
                  <p className="text-white/60 text-xs">{item.imageAlt}</p>
                </div>
              </div>

              {/* Lead paragraph */}
              <div className="border-l-4 border-orange-400 pl-5 py-1 bg-orange-50
                              rounded-r-xl mb-8">
                <p className="text-navy-700 text-lg font-medium leading-relaxed">
                  {item.excerpt}
                </p>
              </div>

              {/* Article body — rendered từ structured content */}
              <div className="space-y-5">
                {sections.map((section, i) => (
                  <Section key={i} section={section} />
                ))}
              </div>

              {/* Share buttons */}
              <ShareButtons url={pageUrl} title={item.title} />

              {/* Back link */}
              <div className="mt-8 pt-4">
                <Link href="/news"
                  className="inline-flex items-center gap-2 text-navy-400 hover:text-orange-500
                             transition-colors text-sm font-semibold">
                  <ArrowLeft size={14} /> Quay lại danh sách tin tức
                </Link>
              </div>
            </article>

            {/* ── Sidebar ── */}
            <aside className="space-y-5">

              {/* Related articles */}
              <div className="card p-6">
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-navy-400
                               mb-5 pb-3 border-b border-gray-100">
                  Bài Viết Liên Quan
                </h3>
                <div className="space-y-4">
                  {related.map((n) => (
                    <Link key={n.id} href={`/news/${n.slug}`} className="group flex gap-3">
                      {/* Ảnh thumbnail nhỏ */}
                      <div className="w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 relative">
                        <Image
                          src={n.image}
                          alt={n.imageAlt}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-300"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-orange-500 text-[10px] font-bold
                                         tracking-wider uppercase block">
                          {n.categoryLabel}
                        </span>
                        <h4 className="text-navy-700 text-xs font-semibold leading-snug mt-0.5
                                       group-hover:text-orange-500 transition-colors line-clamp-2">
                          {n.title}
                        </h4>
                        <div className="flex items-center gap-2 text-navy-400 text-[10px] mt-1.5">
                          <span className="flex items-center gap-0.5">
                            <Calendar size={9} />{n.date}
                          </span>
                          <span className="flex items-center gap-0.5">
                            <Clock size={9} />{n.readMinutes} phút
                          </span>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
                <Link href="/news"
                  className="block text-center text-orange-500 hover:text-orange-600 text-xs
                             font-semibold mt-5 pt-4 border-t border-gray-100 transition-colors">
                  Xem tất cả bài viết →
                </Link>
              </div>

              {/* Categories */}
              <div className="card p-6">
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-navy-400 mb-4">
                  Chuyên Mục
                </h3>
                <div className="space-y-2">
                  {[
                    { label: "Hướng dẫn và Thủ tục",  href: "/news/category/huong-dan-va-thu-tuc", count: 4 },
                    { label: "Tin ngành Logistics",    href: "/news/category/tin-nganh-logistics",  count: 2 },
                  ].map((cat) => (
                    <Link key={cat.label} href={cat.href}
                      className="flex items-center justify-between p-3 rounded-xl
                                 hover:bg-orange-50 hover:text-orange-500 transition-colors group">
                      <span className="text-navy-600 text-sm group-hover:text-orange-500">
                        {cat.label}
                      </span>
                      <span className="bg-navy-100 text-navy-600 text-xs font-bold
                                       px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Tu van hai quan box */}
              <div className="card p-6 border-l-4 border-orange-400">
                <h3 className="font-bold text-navy-800 mb-2 text-sm">
                  Tư vấn hải quan miễn phí
                </h3>
                <p className="text-navy-500 text-xs leading-relaxed mb-4">
                  Phân loại mã HS, tính thuế FTA, xin C/O — HD Logistics hỗ trợ
                  doanh nghiệp tối ưu chi phí hải quan và tránh rủi ro truy thu.
                </p>
                <Link href="/tu-van-hai-quan"
                  className="block w-full text-center bg-slate-50 hover:bg-navy-50 border border-navy-200
                             hover:border-navy-400 text-navy-700 font-semibold py-2.5 rounded-xl
                             text-sm transition-colors mb-2">
                  Xem dịch vụ tư vấn HQ
                </Link>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-navy-700 p-6 text-white">
                <h3 className="font-bold mb-2">Cần hỗ trợ logistics?</h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  Đội ngũ HD Logistics sẵn sàng tư vấn giải pháp vận chuyển và
                  hải quan phù hợp nhất cho doanh nghiệp của bạn.
                </p>
                <Link href="/contact"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white
                             text-center font-semibold py-3 rounded-xl text-sm
                             transition-colors mb-2">
                  Nhận Tư Vấn Miễn Phí
                </Link>
                <a href="tel:0929959699"
                  className="block w-full border border-white/20 text-white/70
                             hover:text-white text-center font-medium py-2.5 rounded-xl
                             text-sm transition-colors">
                  📞 +84 929 959 699
                </a>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
