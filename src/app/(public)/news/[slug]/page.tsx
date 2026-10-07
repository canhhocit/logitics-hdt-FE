import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Clock, ArrowLeft, BookOpen } from "lucide-react";
import { fetchPostBySlug, fetchPosts } from "@/lib/api";
import ShareButtons from "@/components/ui/ShareButtons";

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = await fetchPostBySlug(params.slug) as any;
  if (!post) return {};
  return {
    title: post.seoTitle || post.title,
    description: post.seoDesc || post.excerpt,
    openGraph: {
      title: post.seoTitle || post.title,
      description: post.seoDesc || post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      locale: "vi_VN",
      images: post.thumbnail ? [{ url: post.thumbnail, alt: post.title }] : [],
    },
    twitter: { card: "summary_large_image", title: post.title, description: post.excerpt },
  };
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

export default async function NewsDetailPage({ params }: { params: { slug: string } }) {
  const [post, allPosts] = await Promise.all([
    fetchPostBySlug(params.slug) as Promise<any>,
    fetchPosts(10),
  ]);

  if (!post) notFound();

  const related = (allPosts as any[])
    .filter((p: any) => p.slug !== params.slug)
    .slice(0, 3);

  const pageUrl = `https://hdtlogistics.vn/news/${post.slug}`;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="hero-bg pt-36 pb-14">
        <div className="wrap relative z-10">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-white/40 text-xs mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Trang Chủ</Link>
            <ChevronRight size={12} />
            <Link href="/news" className="hover:text-white transition-colors">Tin Tức</Link>
            {post.category && (
              <>
                <ChevronRight size={12} />
                <Link href={`/news?categorySlug=${post.category.slug}`} className="hover:text-white transition-colors">
                  {post.category.name}
                </Link>
              </>
            )}
            <ChevronRight size={12} />
            <span className="text-white/60 line-clamp-1 max-w-[200px]">{post.title}</span>
          </nav>

          <div className="max-w-3xl">
            {post.category && (
              <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-5">
                {post.category.name}
              </span>
            )}
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-snug tracking-tight mb-5">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-white/55 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={13} />{formatDate(post.publishedAt)}</span>
              {post.readMinutes && (
                <span className="flex items-center gap-1.5"><Clock size={13} />{post.readMinutes} phút đọc</span>
              )}
              {post.category && (
                <span className="flex items-center gap-1.5"><BookOpen size={13} />{post.category.name}</span>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_300px] gap-10">

            {/* ── Article ── */}
            <article>
              {/* Thumbnail */}
              {post.thumbnail && (
                <div className="relative h-60 md:h-72 rounded-2xl overflow-hidden mb-8 shadow-sm">
                  <Image src={post.thumbnail} alt={post.title} fill className="object-cover"
                    priority sizes="(max-width: 768px) 100vw, 70vw" />
                  <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/50 to-transparent px-5 py-3">
                    <p className="text-white/60 text-xs">{post.title}</p>
                  </div>
                </div>
              )}

              {/* Lead excerpt */}
              {post.excerpt && (
                <div className="border-l-4 border-orange-400 pl-5 py-2 bg-orange-50 rounded-r-xl mb-7">
                  <p className="text-navy-700 text-[0.95rem] font-medium leading-relaxed">{post.excerpt}</p>
                </div>
              )}

              {/* HTML body */}
              {post.content ? (
                <div className="article-content" dangerouslySetInnerHTML={{ __html: post.content }} />
              ) : (
                <p className="text-gray-400 text-sm italic">Nội dung bài viết đang được cập nhật.</p>
              )}

              <ShareButtons url={pageUrl} title={post.title} />

              <div className="mt-8 pt-4 border-t border-gray-100">
                <Link href="/news"
                  className="inline-flex items-center gap-2 text-navy-400 hover:text-orange-500 transition-colors text-sm font-semibold">
                  <ArrowLeft size={14} /> Quay lại danh sách tin tức
                </Link>
              </div>
            </article>

            {/* ── Sidebar (sticky) ── */}
            <aside className="space-y-4">
              <div className="sticky top-28 space-y-4">

                {/* 1. Tư vấn hải quan — giống hệt mẫu */}
                <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                  <div className="p-5 border-l-4 border-orange-400">
                    <h3 className="font-bold text-navy-800 text-sm mb-1.5">Tư vấn hải quan miễn phí</h3>
                    <p className="text-gray-500 text-xs leading-relaxed mb-4">
                      Phân loại mã HS, tính thuế FTA, xin C/O — HDT Logistics hỗ trợ doanh nghiệp
                      tối ưu chi phí hải quan và tránh rủi ro truy thu.
                    </p>
                    <Link href="/tu-van-hai-quan"
                      className="block w-full text-center border border-navy-200 hover:border-navy-400
                                 text-navy-700 font-semibold py-2.5 rounded-xl text-xs transition-colors
                                 bg-white hover:bg-slate-50">
                      Xem dịch vụ tư vấn HQ
                    </Link>
                  </div>
                </div>

                {/* 2. CTA liên hệ — giống hệt mẫu */}
                <div className="rounded-2xl bg-navy-700 p-5 text-white">
                  <h3 className="font-bold mb-2 text-sm">Cần hỗ trợ logistics?</h3>
                  <p className="text-white/60 text-xs mb-4 leading-relaxed">
                    Đội ngũ HDT Logistics sẵn sàng tư vấn giải pháp vận chuyển và hải quan
                    phù hợp nhất cho doanh nghiệp của bạn.
                  </p>
                  <Link href="/contact"
                    className="block w-full bg-orange-500 hover:bg-orange-600 text-white
                               text-center font-semibold py-2.5 rounded-xl text-xs transition-colors mb-2.5">
                    Nhận Tư Vấn Miễn Phí
                  </Link>
                  <a href="tel:0983116063"
                    className="flex items-center justify-center gap-1.5 w-full border border-white/20
                               text-white/70 hover:text-white text-center py-2.5 rounded-xl text-xs
                               transition-colors font-medium">
                    📞 0983 116 063
                  </a>
                </div>

                {/* 3. Bài viết liên quan — nhỏ gọn dưới cùng */}
                {related.length > 0 && (
                  <div className="rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                    <div className="px-4 py-3 border-b border-gray-100 bg-slate-50">
                      <h3 className="text-[10px] font-bold tracking-[0.15em] uppercase text-navy-400">
                        Bài Viết Liên Quan
                      </h3>
                    </div>
                    <div className="divide-y divide-gray-50">
                      {related.map((n: any) => (
                        <Link key={n.id} href={`/news/${n.slug}`}
                          className="group flex gap-3 p-4 hover:bg-gray-50 transition-colors">
                          {/* thumbnail nhỏ */}
                          <div className="w-14 h-12 rounded-lg overflow-hidden flex-shrink-0 relative bg-navy-100">
                            {n.thumbnail && (
                              <Image src={n.thumbnail} alt={n.title} fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                                sizes="56px" />
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            {n.category && (
                              <span className="text-orange-500 text-[9px] font-bold tracking-wider uppercase block mb-0.5">
                                {n.category.name}
                              </span>
                            )}
                            <h4 className="text-navy-700 text-[11px] font-semibold leading-snug
                                           group-hover:text-orange-500 transition-colors line-clamp-2 mb-1">
                              {n.title}
                            </h4>
                            <div className="flex items-center gap-2 text-gray-400 text-[10px]">
                              <span className="flex items-center gap-0.5">
                                <Calendar size={8} />{formatDate(n.publishedAt)}
                              </span>
                              {n.readMinutes && (
                                <span className="flex items-center gap-0.5">
                                  <Clock size={8} />{n.readMinutes} phút
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                    <div className="px-4 py-3 border-t border-gray-100">
                      <Link href="/news"
                        className="text-orange-500 hover:text-orange-600 text-xs font-semibold transition-colors">
                        Xem tất cả bài viết →
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}
