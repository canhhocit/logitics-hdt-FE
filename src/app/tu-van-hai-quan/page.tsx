import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, FileText, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { newsItems } from "@/data";
import TestimonialsBlock from "@/components/shared/TestimonialsBlock";
import CTABlock from "@/components/shared/CTABlock";

export const metadata: Metadata = {
  title: "Tư Vấn Hải Quan",
  description:
    "Dịch vụ tư vấn hải quan chuyên nghiệp: rà soát chứng từ, phân loại mã HS, trị giá tính thuế, chính sách chuyên ngành và cập nhật quy định mới nhất.",
};

// M05.02 – 3 thẻ điều hướng
const navCards = [
  {
    label: "XUẤT KHẨU",
    desc: "Quy trình & hồ sơ thủ tục xuất khẩu hàng hóa",
    href: "/news/thu-tuc-xuat-khau-hang-hoa-quy-trinh-ho-so",
    color: "border-blue-300 hover:border-blue-500 hover:bg-blue-50",
    textColor: "text-blue-700",
  },
  {
    label: "NHẬP KHẨU",
    desc: "Quy trình & hồ sơ thủ tục nhập khẩu hàng hóa",
    href: "/news/thu-tuc-nhap-khau-hang-hoa-quy-trinh-ho-so",
    color: "border-green-300 hover:border-green-500 hover:bg-green-50",
    textColor: "text-green-700",
  },
  {
    label: "CHÍNH SÁCH & THỦ TỤC",
    desc: "Tổng hợp chính sách và thủ tục xuất nhập khẩu",
    href: "/news/chinh-sach-thu-tuc-xuat-nhap-khau",
    color: "border-orange-300 hover:border-orange-500 hover:bg-orange-50",
    textColor: "text-orange-700",
  },
];

const scope = [
  "Rà soát chứng từ xuất nhập khẩu trước khi khai báo",
  "Phân loại mã HS Code chính xác, tránh sai mã dẫn đến truy thu",
  "Xác định trị giá tính thuế và chính sách thuế áp dụng",
  "Tư vấn chính sách chuyên ngành: kiểm dịch, kiểm tra CL, giấy phép nhập khẩu",
  "Hướng dẫn quy trình khai báo điện tử và xử lý các luồng kiểm tra",
  "Cập nhật thay đổi quy định hải quan, biểu thuế ưu đãi FTA",
];

const tutorialNews = newsItems.filter((n) => n.category === "huong-dan-va-thu-tuc");

export default function TuVanHaiQuanPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="hero-bg py-20 relative overflow-hidden">
        <div className="wrap relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-white transition-colors">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Tư Vấn Hải Quan</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-orange-400 mb-6">TƯ VẤN HẢI QUAN</p>
              <h1 className="h1 text-white mb-5">
                Giải pháp hải quan<br />
                <span className="text-orange-400">chuẩn xác & đúng luật</span>
              </h1>
              <p className="text-white/65 text-lg leading-relaxed mb-8">
                Tư vấn hải quan là bước nền tảng, ảnh hưởng trực tiếp đến tiến độ thông quan,
                chi phí và sự tuân thủ pháp lý của doanh nghiệp. HD Logistics đồng hành từ
                khâu chuẩn bị hồ sơ đến sau thông quan.
              </p>
              <Link href="/contact" className="btn-orange">
                Nhận Tư Vấn Ngay <ArrowRight size={15} />
              </Link>
            </div>

            {/* Ảnh minh họa placeholder (M05.01.02.01) */}
            <div className="hidden lg:flex items-center justify-center">
              <div className="w-72 h-72 bg-white/10 border border-white/20 rounded-3xl
                              flex flex-col items-center justify-center gap-4">
                <FileText size={60} className="text-white/40" />
                <div className="text-center">
                  <p className="text-white font-bold">Khai Thuê Hải Quan</p>
                  <p className="text-white/50 text-sm mt-1">VNACCS / VCIS</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* M05.01 – Nội dung giới thiệu 3 đoạn */}
      <section className="py-20">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="eyebrow mb-5">Vai Trò Tư Vấn Hải Quan</p>
              <h2 className="h2 text-navy-800 mb-6">
                Nền tảng của mọi<br />
                <span className="text-grad">lô hàng thành công</span>
              </h2>
              <div className="space-y-5 text-navy-600 text-[0.95rem] leading-[1.85]">
                {/* M05.01.01.01 */}
                <p>
                  Tư vấn hải quan là bước nền tảng, ảnh hưởng trực tiếp đến tiến độ
                  thông quan, chi phí và sự tuân thủ pháp lý của doanh nghiệp. Một hồ
                  sơ sai mã HS hoặc thiếu giấy phép chuyên ngành có thể dẫn đến chậm
                  thông quan hàng tuần và phát sinh chi phí phạt đáng kể.
                </p>
                {/* M05.01.01.02 */}
                <p>
                  Phạm vi tư vấn của HD Logistics bao gồm:
                  <strong className="text-navy-800"> rà soát chứng từ</strong>,
                  <strong className="text-navy-800"> phân loại mã HS</strong>,
                  <strong className="text-navy-800"> xác định trị giá tính thuế</strong>,
                  tư vấn chính sách chuyên ngành và hỗ trợ xin giấy phép nhập khẩu.
                </p>
                {/* M05.01.01.03 */}
                <p>
                  Chúng tôi liên tục cập nhật các thay đổi trong quy định hải quan,
                  biểu thuế ưu đãi FTA và chính sách mặt hàng, giúp doanh nghiệp luôn
                  tuân thủ đúng quy định và tối ưu chi phí thuế nhập khẩu.
                </p>
              </div>
            </div>

            {/* Phạm vi tư vấn */}
            <div>
              <p className="eyebrow mb-5">Phạm Vi Tư Vấn</p>
              <div className="space-y-3">
                {scope.map((s) => (
                  <div key={s} className="flex items-start gap-3 p-4 rounded-xl
                                          bg-white border border-gray-100 shadow-card
                                          hover:shadow-card-hover hover:border-orange-100 transition-all">
                    <CheckCircle size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                    <span className="text-navy-600 text-sm">{s}</span>
                  </div>
                ))}
              </div>

              {/* Note */}
              <div className="mt-5 flex items-start gap-2.5 bg-amber-50 border border-amber-200
                              rounded-xl p-4">
                <AlertCircle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-amber-700 text-xs leading-relaxed">
                  HD Logistics cung cấp dịch vụ hải quan cho hàng <strong>doanh nghiệp</strong>.
                  Chưa có dịch vụ cho hàng cá nhân và chuyển thư tín.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* M05.02 – 3 thẻ điều hướng */}
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
                className={`group block p-7 rounded-2xl bg-white border-2 transition-all ${card.color} shadow-card hover:shadow-card-hover`}>
                <span className={`text-xs font-extrabold tracking-[0.2em] uppercase block mb-3 ${card.textColor}`}>
                  {card.label}
                </span>
                <p className="text-navy-600 text-sm leading-relaxed mb-5">{card.desc}</p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold
                                 text-navy-400 group-hover:text-orange-500 transition-colors">
                  Đọc ngay <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* M05.03 – 4 bài mới nhất từ chuyên mục Hướng dẫn */}
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
              className="text-sm font-semibold text-navy-400 hover:text-orange-500 transition-colors
                         inline-flex items-center gap-1.5">
              Xem tất cả <ArrowRight size={13} />
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {tutorialNews.slice(0, 4).map((item) => (
              <Link key={item.id} href={`/news/${item.slug}`}
                className="group card overflow-hidden flex flex-col">
                <div className="h-36 bg-gradient-to-br from-navy-600 to-navy-800 relative
                                flex items-end p-4 overflow-hidden">
                  <div className="absolute inset-0 opacity-10"
                    style={{ backgroundImage: "repeating-linear-gradient(45deg,transparent,transparent 15px,rgba(255,255,255,0.05) 15px,rgba(255,255,255,0.05) 30px)" }} />
                  <span className="relative z-10 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded">
                    {item.categoryLabel}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col">
                  <h4 className="font-bold text-navy-800 text-sm leading-snug mb-2
                                 group-hover:text-orange-500 transition-colors line-clamp-2">
                    {item.title}
                  </h4>
                  <p className="text-navy-400 text-xs mb-3">{item.date} · {item.readMinutes} phút đọc</p>
                  <p className="text-navy-500 text-xs leading-relaxed line-clamp-2 flex-1">
                    {item.excerpt}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* M05.04 – Shared blocks */}
      <TestimonialsBlock />
      <CTABlock />
    </div>
  );
}
