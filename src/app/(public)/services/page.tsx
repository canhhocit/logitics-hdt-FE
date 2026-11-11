import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight, Plane, Ship, Boxes, Truck, FileText, Star, CheckCircle } from "lucide-react";
import { fetchServices, fetchTestimonials } from "@/lib/api";
import CTABlock from "@/components/shared/CTABlock";
import TestimonialsBlock from "@/components/shared/TestimonialsBlock";

export const metadata: Metadata = {
  title: "Dịch Vụ",
  description:
    "HDT Logistics cung cấp giải pháp logistics toàn diện: vận chuyển đường không, đường biển, gom hàng lẻ LCL, đường bộ, khai thuê hải quan và hàng đặc biệt/dự án.",
};

const iconMap: Record<string, React.ReactNode> = {
  plane:       <Plane size={32} />,
  ship:        <Ship size={32} />,
  boxes:       <Boxes size={32} />,
  truck:       <Truck size={32} />,
  "file-text": <FileText size={32} />,
  star:        <Star size={32} />,
};

const colorMap: Record<string, string> = {
  blue:   "bg-blue-100 text-blue-600",
  cyan:   "bg-cyan-100 text-cyan-600",
  teal:   "bg-teal-100 text-teal-600",
  green:  "bg-green-100 text-green-600",
  orange: "bg-orange-100 text-orange-600",
  rose:   "bg-rose-100 text-rose-600",
};

// Feature bullets per service — display-only UI enhancement (không phải business data từ CMS)
const serviceFeatures: Record<string, string[]> = {
  // Canonical Slugs (Chuẩn hóa V16)
  "van-chuyen-duong-khong": ["Kết nối 50+ hãng hàng không", "Express & Economy linh hoạt", "Hàng lạnh / hàng DGR", "Tracking AWB real-time"],
  "van-chuyen-duong-bien":  ["FCL & LCL – 100+ cảng biển", "Booking Yang Ming, SITC, CMA CGM...", "Container lạnh, hàng rời", "Tracking container 24/7"],
  "gom-hang-le-lcl":        ["Tính cước theo CBM", "Lịch gom hàng cố định hàng tuần", "Tiết kiệm cho lô hàng nhỏ", "Tuyến xuất & nhập khẩu"],
  "van-chuyen-duong-bo":    ["63 tỉnh thành nội địa", "Xuyên biên giới ASEAN, Trung Quốc", "Xe 1–40 tấn, GPS 24/7", "Door-to-door trọn gói"],
  "khai-thue-hai-quan":     ["Khai báo VNACCS/VCIS", "Tỷ lệ thông quan lần đầu >95%", "Tư vấn HS Code, chính sách thuế", "Hồ sơ rà soát 2 cấp"],
  "hang-dac-biet-du-an":    ["Hàng OOG, siêu trường siêu trọng", "Hàng nguy hiểm (DGR/IMO)", "Lập kế hoạch dự án chi tiết", "Xin phép lưu thông, hộ tống"],

  // Backward-compatible Aliases
  "van-tai-hang-khong":  ["Kết nối 50+ hãng hàng không", "Express & Economy linh hoạt", "Hàng lạnh / hàng DGR", "Tracking AWB real-time"],
  "van-tai-duong-bien":  ["FCL & LCL – 100+ cảng biển", "Booking Yang Ming, SITC, CMA CGM...", "Container lạnh, hàng rời", "Tracking container 24/7"],
  "van-chuyen-lcl":      ["Tính cước theo CBM", "Lịch gom hàng cố định hàng tuần", "Tiết kiệm cho lô hàng nhỏ", "Tuyến xuất & nhập khẩu"],
  "pickup":              ["Tính cước theo CBM", "Lịch gom hàng cố định hàng tuần", "Tiết kiệm cho lô hàng nhỏ", "Tuyến xuất & nhập khẩu"],
  "van-tai-duong-bo":    ["63 tỉnh thành nội địa", "Xuyên biên giới ASEAN, Trung Quốc", "Xe 1–40 tấn, GPS 24/7", "Door-to-door trọn gói"],
  "khai-bao-hai-quan":   ["Khai báo VNACCS/VCIS", "Tỷ lệ thông quan lần đầu >95%", "Tư vấn HS Code, chính sách thuế", "Hồ sơ rà soát 2 cấp"],
  "hang-dac-biet":       ["Hàng OOG, siêu trường siêu trọng", "Hàng nguy hiểm (DGR/IMO)", "Lập kế hoạch dự án chi tiết", "Xin phép lưu thông, hộ tống"],
};

export default async function ServicesPage() {
  const [services, testimonials] = await Promise.all([
    fetchServices(),
    fetchTestimonials()
  ]);

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 relative overflow-hidden">
        <div className="wrap relative z-10">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Dịch Vụ</span>
          </nav>
          <div className="max-w-2xl">
            <p className="eyebrow text-orange-400 mb-6">DỊCH VỤ LOGISTICS</p>
            <h1 className="h1 text-white mb-5">
              Giải pháp logistics<br />
              <span className="text-orange-400">theo nhu cầu thực tế</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed">
              Mỗi dịch vụ được tư vấn và thiết kế riêng cho từng doanh nghiệp — đảm bảo tiến độ,
              kiểm soát chi phí và minh bạch toàn trình vận chuyển.
            </p>
          </div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20">
        <div className="wrap space-y-6">
          {services.map((svc: any, i: number) => (
            <div key={svc.slug} className="group card overflow-hidden">
              <div className="grid md:grid-cols-[260px_1fr_auto] gap-0">
                {/* Left: icon + number + title */}
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center
                                   transition-transform group-hover:scale-110
                                   ${colorMap[svc.color] || "bg-navy-100 text-navy-600"}`}>
                    {iconMap[svc.icon] || <Star size={32} />}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-navy-300 block mb-1">
                      Dịch vụ {String(i + 1).padStart(2, "0")}
                    </span>
                    <h2 className="font-bold text-navy-800 text-lg leading-snug group-hover:text-orange-500 transition-colors">
                      {svc.name}
                    </h2>
                  </div>
                </div>

                {/* Middle: shortDesc + features */}
                <div className="p-8 border-b md:border-b-0 md:border-r border-gray-100">
                  <p className="text-navy-500 text-sm leading-relaxed mb-5">
                    {svc.shortDesc || svc.intro}
                  </p>
                  {serviceFeatures[svc.slug] && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {serviceFeatures[svc.slug].map((f: string) => (
                        <div key={f} className="flex items-center gap-2 text-sm text-navy-500">
                          <CheckCircle size={13} className="text-orange-400 flex-shrink-0" />
                          {f}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Right: CTA */}
                <div className="p-8 flex items-center justify-center">
                  <Link href={`/services/${svc.slug}`}
                    className="flex flex-col items-center gap-2 text-navy-400 hover:text-orange-500 transition-colors group/btn">
                    <div className="w-12 h-12 rounded-xl border-2 border-navy-100
                                    group-hover/btn:border-orange-400 group-hover/btn:bg-orange-50
                                    flex items-center justify-center transition-all">
                      <ArrowRight size={18} className="group-hover/btn:translate-x-0.5 transition-transform" />
                    </div>
                    <span className="text-xs font-semibold whitespace-nowrap">Xem chi tiết</span>
                  </Link>
                </div>
              </div>
            </div>
          ))}

          {services.length === 0 && (
            <div className="text-center py-20 text-navy-400">
              Đang tải danh sách dịch vụ...
            </div>
          )}
        </div>
      </section>

      <TestimonialsBlock testimonials={testimonials} />
      <CTABlock />
    </div>
  );
}
