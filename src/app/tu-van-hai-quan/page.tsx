import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, FileText, ArrowRight, CheckCircle, AlertCircle, Calendar, Clock } from "lucide-react";
import { newsItems } from "@/data";
import TestimonialsBlock from "@/components/shared/TestimonialsBlock";
import CTABlock from "@/components/shared/CTABlock";

export const metadata: Metadata = {
  title: "Tư Vấn Hải Quan",
  description: "Dịch vụ tư vấn hải quan chuyên nghiệp: phân loại mã HS, tính thuế FTA, xin C/O và cập nhật quy định mới nhất.",
};

const navCards = [
  {
    label: "XUẤT KHẨU",
    desc: "Quy trình & hồ sơ thủ tục xuất khẩu hàng hóa",
    href: "/news/thu-tuc-xuat-khau-hang-hoa-quy-trinh-ho-so",
    image: "/images/services/air-freight.jpg",
    alt: "Xuất khẩu hàng hóa bằng đường hàng không",
    color: "border-blue-300 hover:border-blue-500",
    badge: "bg-blue-500",
  },
  {
    label: "NHẬP KHẨU",
    desc: "Quy trình & hồ sơ thủ tục nhập khẩu hàng hóa",
    href: "/news/thu-tuc-nhap-khau-hang-hoa-quy-trinh-ho-so",
    image: "/images/services/sea-freight.jpg",
    alt: "Nhập khẩu hàng hóa bằng đường biển",
    color: "border-green-300 hover:border-green-500",
    badge: "bg-green-500",
  },
  {
    label: "CHÍNH SÁCH & THỦ TỤC",
    desc: "Tổng hợp chính sách và thủ tục xuất nhập khẩu 2026",
    href: "/news/chinh-sach-thu-tuc-xuat-nhap-khau",
    image: "/images/customs-consulting.jpg",
    alt: "Tư vấn hải quan và chính sách xuất nhập khẩu",
    color: "border-orange-300 hover:border-orange-500",
    badge: "bg-orange-500",
  },
];

const scope = [
  "Rà soát chứng từ xuất nhập khẩu trước khi khai báo",
  "Phân loại mã HS Code chính xác, tránh sai mã dẫn đến truy thu",
  "Xác định trị giá tính thuế và chính sách thuế áp dụng theo FTA",
  "Tư vấn chính sách chuyên ngành: kiểm dịch, kiểm tra CL, giấy phép nhập khẩu",
  "Hướng dẫn quy trình khai báo VNACCS và xử lý các luồng kiểm tra",
  "Cập nhật thay đổi quy định hải quan, biểu thuế ưu đãi FTA mới nhất",
];

const tutorialNews = newsItems.filter((n) => n.category === "huong-dan-va-thu-tuc");

export default function TuVanHaiQuanPage() {
  return (
    <div className="bg-white">

      {/* ── Hero với ảnh thật ── */}
      <section className="relative min-h-[60vh] flex items-end overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src="/images/customs-consulting.jpg"
            alt="Tư vấn hải quan chuyên nghiệp tại HD Logistics"
            fill
            className="object-cover"
            priority
            quality={85}
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-navy-950/75" />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-900/40 to-navy-950/80" />
        </div>

        <div className="relative z-10 wrap py-20 w-full">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Tư Vấn Hải Quan</span>
          </nav>
          <div className="max-w-3xl">
            <p className="eyebrow text-orange-400 mb-6">TƯ VẤN HẢI QUAN</p>
            <h1 className="h1 text-white mb-5">
              Giải pháp hải quan<br />
              <span className="text-orange-400">chuẩn xác & đúng luật</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-2xl">
              Tư vấn hải quan là bước nền tảng, ảnh hưởng trực tiếp đến tiến độ thông quan,
              chi phí và sự tuân thủ pháp lý của doanh nghiệp. HD Logistics đồng hành từ
              khâu chuẩn bị hồ sơ đến sau thông quan.
            </p>
            <Link href="/contact" className="btn-orange">
              Nhận Tư Vấn Ngay <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </section>

      {/* ── Nội dung giới thiệu + ảnh ── */}
      <section className="py-20">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left: text */}
            <div>
              <p className="eyebrow mb-5">Vai Trò Tư Vấn Hải Quan</p>
              <h2 className="h2 text-navy-800 mb-6">
                Nền tảng của mọi<br />
                <span className="text-grad">lô hàng thành công</span>
              </h2>
              <div className="space-y-4 text-navy-600 text-[0.95rem] leading-[1.85] mb-8">
                <p>
                  Tư vấn hải quan là bước nền tảng, ảnh hưởng trực tiếp đến tiến độ
                  thông quan, chi phí và sự tuân thủ pháp lý. Một hồ sơ sai mã HS hoặc
                  thiếu giấy phép chuyên ngành có thể dẫn đến chậm thông quan hàng tuần
                  và phát sinh chi phí phạt đáng kể.
                </p>
                <p>
                  Phạm vi tư vấn bao gồm:{" "}
                  <strong className="text-navy-800">rà soát chứng từ</strong>,{" "}
                  <strong className="text-navy-800">phân loại mã HS</strong>,{" "}
                  <strong className="text-navy-800">tính thuế theo FTA</strong>,
                  tư vấn chính sách chuyên ngành và hỗ trợ xin giấy phép nhập khẩu.
                </p>
                <p>
                  Chúng tôi liên tục cập nhật các thay đổi quy định hải quan, biểu thuế
                  ưu đãi FTA và chính sách mặt hàng, giúp doanh nghiệp tối ưu chi phí
                  thuế nhập khẩu hợp pháp.
                </p>
              </div>

              {/* Note */}
              <div className="flex items-start gap-2.5 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-7">
                <AlertCircle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-amber-700 text-xs leading-relaxed">
                  <strong>Lưu ý:</strong> HD Logistics cung cấp dịch vụ hải quan cho hàng{" "}
                  <strong>doanh nghiệp (B2B)</strong>. Chưa có dịch vụ cho hàng cá nhân và chuyển thư tín.
                </p>
              </div>
            </div>

            {/* Right: phạm vi tư vấn */}
            <div>
              {/* Ảnh */}
              <div className="relative w-full h-72 rounded-2xl overflow-hidden shadow-lg mb-6">
                <Image
                  src="/images/services/customs.jpg"
                  alt="Khai báo hải quan điện tử VNACCS tại cửa khẩu Việt Nam"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  quality={80}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
                <div className="absolute bottom-4 left-4">
                  <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full">
                    VNACCS / VCIS
                  </span>
                </div>
              </div>

              <p className="font-bold text-navy-800 mb-4">Phạm Vi Tư Vấn</p>
              <div className="space-y-2.5">
                {scope.map((s) => (
                  <div key={s} className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50
                                          border border-gray-100 hover:border-orange-200 transition-all">
                    <CheckCircle size={14} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-navy-600 text-sm">{s}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3 thẻ điều hướng với ảnh ── */}
      <section className="py-16 bg-slate-50 border-y border-gray-100">
        <div className="wrap">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3 justify-center">Thủ Tục Hải Quan</p>
            <h2 className="text-2xl font-extrabold text-navy-800">
              Tìm hiểu thủ tục xuất nhập khẩu
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-5">
            {navCards.map((card) => (
              <Link key={card.label} href={card.href}
                className={`group block bg-white rounded-2xl overflow-hidden border-2
                            shadow-card hover:shadow-card-hover hover:-translate-y-1
                            transition-all duration-300 ${card.color}`}>
                {/* Ảnh thật */}
                <div className="relative h-44 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.alt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    quality={75}
                  />
                  <div className="absolute inset-0 bg-navy-900/40" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className={`text-white text-sm font-extrabold tracking-[0.2em]
                                     uppercase px-4 py-2 rounded-xl ${card.badge} bg-opacity-80`}>
                      {card.label}
                    </span>
                  </div>
                </div>
                <div className="p-5">
                  <p className="text-navy-600 text-sm leading-relaxed mb-4">{card.desc}</p>
                  <span className="inline-flex items-center gap-1.5 text-sm font-semibold
                                   text-navy-400 group-hover:text-orange-500 transition-colors">
                    Đọc ngay <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Bài viết mới nhất với ảnh thật ── */}
      <section className="py-16">
        <div className="wrap">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="eyebrow mb-3">Thủ Tục Mới Cập Nhật</p>
              <h2 className="text-2xl font-extrabold text-navy-800">
                Hướng dẫn & Thủ tục XNK
              </h2>
            </div>
            <Link href="/news/category/huong-dan-va-thu-tuc"
              className="text-sm font-semibold text-navy-400 hover:text-orange-500
                         transition-colors inline-flex items-center gap-1.5">
              Xem tất cả <ArrowRight size={13} />
            </Link>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tutorialNews.slice(0, 4).map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`}
                className="group card overflow-hidden flex flex-col">
                {/* Ảnh thật */}
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    quality={70}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent" />
                  <div className="absolute top-3 left-3">
                    <span className="bg-orange-500 text-white text-[10px] font-bold
                                     px-2 py-0.5 rounded-full">
                      {item.categoryLabel}
                    </span>
                  </div>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="font-bold text-navy-800 text-sm leading-snug mb-2
                                 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-navy-400 text-xs mt-auto">
                    <span className="flex items-center gap-1"><Calendar size={10} />{item.date}</span>
                    <span className="flex items-center gap-1"><Clock size={10} />{item.readMinutes} phút</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsBlock />
      <CTABlock />
    </div>
  );
}
