import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, Calendar, Clock, ArrowLeft } from "lucide-react";
import { newsItems } from "@/data";
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
    },
    twitter: { card: "summary_large_image", title: item.title, description: item.excerpt },
  };
}

const articleBodies: Record<string, string[]> = {
  "chinh-sach-thu-tuc-xuat-nhap-khau": [
    "Năm 2026, Bộ Tài chính ban hành nhiều thông tư cập nhật biểu thuế xuất nhập khẩu ưu đãi, đặc biệt theo các hiệp định FTA thế hệ mới như CPTPP, EVFTA và RCEP. Doanh nghiệp cần rà soát lại mã HS và mức thuế suất áp dụng cho từng mặt hàng để tận dụng ưu đãi và tránh rủi ro truy thu thuế.",
    "Về chính sách quản lý chuyên ngành, một số nhóm hàng công nghệ, thực phẩm và hóa chất tiếp tục yêu cầu giấy phép nhập khẩu từ các bộ chuyên ngành. Doanh nghiệp cần xác nhận danh mục hàng của mình có thuộc diện quản lý hay không trước khi ký hợp đồng.",
    "Về quy trình khai báo hải quan điện tử, hệ thống VNACCS/VCIS tiếp tục được nâng cấp. Tỷ lệ luồng xanh đang chiếm hơn 70% tổng số tờ khai, giúp rút ngắn thời gian thông quan xuống còn vài giờ thay vì vài ngày như trước.",
  ],
  "thu-tuc-nhap-khau-hang-hoa-quy-trinh-ho-so": [
    "Quy trình nhập khẩu hàng hóa vào Việt Nam gồm các bước chính: ký hợp đồng ngoại thương, mở L/C hoặc thanh toán T/T, vận chuyển hàng về cảng đến, khai báo hải quan điện tử và nhận hàng tại kho.",
    "Bộ hồ sơ hải quan nhập khẩu cơ bản bao gồm: Tờ khai hải quan điện tử (VNACCS), Invoice, Packing List, Bill of Lading hoặc Airwaybill, Hợp đồng mua bán, C/O nếu hưởng ưu đãi FTA, và các giấy phép chuyên ngành nếu có.",
    "Về thời gian thông quan: luồng xanh thông thường 1–4 giờ làm việc; luồng vàng (kiểm tra hồ sơ) 1–2 ngày; luồng đỏ (kiểm tra thực tế hàng hóa) 2–5 ngày tùy mặt hàng. HD Logistics có đội chuyên viên hải quan giúp chuẩn bị hồ sơ đúng để tối đa hóa tỷ lệ luồng xanh.",
  ],
  "thu-tuc-xuat-khau-hang-hoa-quy-trinh-ho-so": [
    "Xuất khẩu hàng hóa từ Việt Nam đòi hỏi doanh nghiệp chuẩn bị tốt từ khâu đàm phán hợp đồng ngoại thương, xác định điều kiện giao hàng Incoterms phù hợp, đến khâu chuẩn bị bộ chứng từ xuất khẩu hoàn chỉnh.",
    "Bộ chứng từ xuất khẩu tiêu chuẩn: Commercial Invoice, Packing List, Bill of Lading (đường biển) hoặc Airwaybill (hàng không), Certificate of Origin (C/O) để hưởng ưu đãi thuế FTA tại thị trường đích, và Tờ khai hải quan xuất khẩu đã thông quan.",
    "Lưu ý: Một số thị trường (EU, Mỹ, Nhật Bản) có yêu cầu đặc biệt về nhãn mác, kiểm tra chất lượng và chứng nhận hợp quy. Doanh nghiệp cần tìm hiểu kỹ quy định của thị trường đích trước khi sản xuất và đóng gói hàng.",
  ],
  "cap-nhat-van-tai-chuoi-cung-ung-2026": [
    "Năm 2026, thị trường vận tải biển toàn cầu tiếp tục chứng kiến biến động mạnh. Cước container FCL tuyến châu Á – châu Âu tăng mạnh do căng thẳng địa chính trị tại Trung Đông ảnh hưởng đến tuyến Biển Đỏ, buộc nhiều hãng tàu phải đi đường vòng qua mũi Hảo Vọng.",
    "Về xu hướng chuỗi cung ứng, nhiều tập đoàn đa quốc gia đang đẩy mạnh chiến lược đa dạng hóa sản xuất sang các nước Đông Nam Á, trong đó Việt Nam là điểm đến hàng đầu. Điều này tạo ra cơ hội lớn cho ngành logistics Việt Nam.",
    "HD Logistics đang tích cực mở rộng năng lực phục vụ khách hàng FDI và xuất khẩu, với các tuyến vận tải biển trực tiếp đến Nhật Bản, Hàn Quốc, EU và Bắc Mỹ, cùng dịch vụ khai báo hải quan xuất khẩu chuyên nghiệp.",
  ],
  "huong-dan-thu-tuc-xnk-tai-lieu-logistics-dn": [
    "Bộ tài liệu hướng dẫn thực hành xuất nhập khẩu dành cho doanh nghiệp bao gồm các nội dung cốt lõi: phân loại mã HS, tính thuế nhập khẩu, xin giấy chứng nhận xuất xứ C/O và quản lý rủi ro vận chuyển.",
    "Về phân loại mã HS: đây là bước quan trọng nhất trong quy trình hải quan. Mã HS sai có thể dẫn đến truy thu thuế và phạt vi phạm. HD Logistics cung cấp dịch vụ tư vấn phân loại mã HS cho tất cả các nhóm hàng.",
    "Về quản lý rủi ro: doanh nghiệp nên mua bảo hiểm hàng hóa cho mọi lô hàng xuất nhập khẩu. Điều kiện bảo hiểm theo Institute Cargo Clauses (A/B/C) tùy theo yêu cầu và loại hàng.",
  ],
  "hd-logistics-giai-phap-van-chuyen-hai-quan-dn": [
    "HD Logistics cung cấp giải pháp logistics tổng thể cho doanh nghiệp xuất nhập khẩu, tập trung vào ba dịch vụ cốt lõi: vận chuyển đa phương thức, khai thuê hải quan và tối ưu chuỗi cung ứng.",
    "Với định hướng High Delivery – High Discipline – High Reliability, chúng tôi xây dựng mô hình vận hành dựa trên tốc độ xử lý, độ chính xác chứng từ và khả năng kiểm soát chuỗi vận chuyển. Mỗi lô hàng được quản lý theo quy trình rõ ràng, minh bạch và có khả năng truy vết.",
    "HD Logistics ưu tiên phục vụ doanh nghiệp sản xuất, công ty thương mại xuất nhập khẩu và khối FDI cần đối tác logistics ổn định, linh hoạt và lâu dài. Liên hệ ngay để nhận tư vấn miễn phí.",
  ],
};

export default function NewsDetailPage({ params }: { params: { slug: string } }) {
  const item = newsItems.find((n) => n.slug === params.slug);
  if (!item) notFound();

  const related = newsItems.filter((n) => n.slug !== params.slug).slice(0, 3);
  const body = articleBodies[params.slug] ?? [
    item.excerpt,
    "Nội dung bài viết đang được cập nhật. Vui lòng quay lại sau hoặc liên hệ HD Logistics để được tư vấn trực tiếp.",
  ];
  const pageUrl = `https://hdlogistics.vn/news/${item.slug}`;

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="hero-bg py-14">
        <div className="wrap relative z-10">
          {/* Breadcrumb (M06.02.02.03) */}
          <nav aria-label="Breadcrumb"
            className="flex items-center gap-2 text-white/40 text-xs mb-6 flex-wrap">
            <Link href="/" className="hover:text-white transition-colors">Trang Chủ</Link>
            <ChevronRight size={12} />
            <Link href="/news" className="hover:text-white transition-colors">Tin Tức</Link>
            <ChevronRight size={12} />
            <Link href={`/news/category/${item.category}`} className="hover:text-white transition-colors">
              {item.categoryLabel}
            </Link>
            <ChevronRight size={12} />
            <span className="text-white/70 line-clamp-1">{item.title}</span>
          </nav>

          <div className="max-w-3xl">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-5">
              {item.categoryLabel}
            </span>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white leading-snug tracking-tight mb-5">
              {item.title}
            </h1>
            {/* M06.02.01.03 – thời gian đọc */}
            <div className="flex flex-wrap items-center gap-4 text-white/50 text-sm">
              <span className="flex items-center gap-1.5"><Calendar size={13} />{item.date}</span>
              <span className="flex items-center gap-1.5"><Clock size={13} />{item.readMinutes} phút đọc</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-14">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_320px] gap-12">

            {/* Article */}
            <article>
              {/* Thumbnail */}
              <div className="h-72 rounded-2xl bg-gradient-to-br from-navy-700 to-navy-900
                              flex items-center justify-center mb-10 relative overflow-hidden">
                <div className="absolute inset-0 opacity-10"
                  style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 20px,rgba(255,255,255,0.05) 20px,rgba(255,255,255,0.05) 40px)" }} />
                <span className="text-9xl font-black text-white/[0.04] select-none">HDL</span>
              </div>

              {/* Body */}
              <div className="space-y-5 text-navy-600 text-[0.97rem] leading-[1.9]">
                <p className="text-navy-700 text-lg font-medium leading-relaxed
                               border-l-4 border-orange-400 pl-4 py-1 bg-orange-50 rounded-r-xl">
                  {item.excerpt}
                </p>
                {body.map((para, i) => <p key={i}>{para}</p>)}
              </div>

              {/* M06.02.02.02 – Share (Client Component) */}
              <ShareButtons url={pageUrl} title={item.title} />

              {/* Back */}
              <div className="mt-8">
                <Link href="/news"
                  className="inline-flex items-center gap-2 text-navy-400 hover:text-orange-500
                             transition-colors text-sm font-semibold">
                  <ArrowLeft size={14} /> Quay lại danh sách tin tức
                </Link>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="space-y-5">
              {/* M06.02.02.01 – Bài viết liên quan */}
              <div className="card p-6">
                <h3 className="text-xs font-bold tracking-[0.15em] uppercase text-navy-400 mb-5 pb-3 border-b border-gray-100">
                  Bài Viết Liên Quan
                </h3>
                <div className="space-y-4">
                  {related.map((n) => (
                    <Link key={n.id} href={`/news/${n.slug}`} className="group flex gap-3">
                      <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-navy-600 to-navy-800
                                      flex-shrink-0 flex items-center justify-center">
                        <span className="text-white/20 font-black text-xs">HD</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-orange-500 text-[10px] font-bold tracking-wider uppercase block">
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
                    { label: "Hướng dẫn và Thủ tục", href: "/news/category/huong-dan-va-thu-tuc", count: 4 },
                    { label: "Tin ngành Logistics",   href: "/news/category/tin-nganh-logistics",  count: 2 },
                  ].map((cat) => (
                    <Link key={cat.label} href={cat.href}
                      className="flex items-center justify-between p-3 rounded-xl
                                 hover:bg-orange-50 hover:text-orange-500 transition-colors group">
                      <span className="text-navy-600 text-sm group-hover:text-orange-500">{cat.label}</span>
                      <span className="bg-navy-100 text-navy-600 text-xs font-bold px-2 py-0.5 rounded-full">
                        {cat.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="rounded-2xl bg-navy-700 p-6 text-white">
                <h3 className="font-bold mb-2">Cần tư vấn logistics?</h3>
                <p className="text-white/60 text-sm mb-5 leading-relaxed">
                  HD Logistics hỗ trợ doanh nghiệp giải quyết mọi vấn đề vận chuyển và hải quan.
                </p>
                <Link href="/contact"
                  className="block w-full bg-orange-500 hover:bg-orange-600 text-white text-center
                             font-semibold py-3 rounded-xl text-sm transition-colors mb-2">
                  Nhận Tư Vấn Miễn Phí
                </Link>
                <a href="tel:0929959699"
                  className="block w-full border border-white/20 text-white/70 hover:text-white
                             text-center font-medium py-2.5 rounded-xl text-sm transition-colors">
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
