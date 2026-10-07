import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, Eye, Target } from "lucide-react";
import { fetchSettings, fetchAwards, fetchCompanyValues, fetchTestimonials } from "@/lib/api";

export const metadata: Metadata = {
  title: "Về Chúng Tôi",
  description: "HDT Logistics – Giải pháp logistics tổng thể. High Delivery – High Discipline – High Reliability.",
};

// Map icon name string → SVG inline (chỉ dùng set icons đang có trong DB)
function IconByName({ name, size = 24 }: { name?: string; size?: number }) {
  const s = size;
  switch (name) {
    case "clock":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6l4 2"/></svg>;
    case "eye":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3" strokeWidth={2}/></svg>;
    case "briefcase":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><rect x="2" y="7" width="20" height="14" rx="2" ry="2" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/></svg>;
    case "heart":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>;
    case "zap":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" strokeWidth={2}/></svg>;
    case "shield":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
    case "award":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="8" r="6" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11"/></svg>;
    case "shield-check":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} points="9 12 11 14 15 10"/></svg>;
    case "users":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M23 21v-2a4 4 0 00-3-3.87"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 3.13a4 4 0 010 7.75"/></svg>;
    case "handshake":
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 11l3 3L22 4"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>;
    default:
      return <svg width={s} height={s} fill="none" viewBox="0 0 24 24" stroke="currentColor"><circle cx="12" cy="12" r="10" strokeWidth={2}/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01"/></svg>;
  }
}

const VALUE_COLORS = [
  "bg-blue-50 text-blue-600",
  "bg-red-50 text-red-500",
  "bg-green-50 text-green-600",
  "bg-purple-50 text-purple-600",
  "bg-orange-50 text-orange-600",
  "bg-teal-50 text-teal-600",
];

export default async function AboutPage() {
  const [settings, awards, companyValues, testimonials] = await Promise.all([
    fetchSettings(),
    fetchAwards(),
    fetchCompanyValues(),
    fetchTestimonials(),
  ]);

  const vision  = settings.about_vision  || "";
  const mission = settings.about_mission || "";
  const staff   = settings.counter_staff     || "";
  const offices = settings.counter_offices   || "";
  const ships   = settings.counter_shipments || "";
  const exp     = settings.counter_experience || "";

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden pt-[116px]">
        <div className="absolute inset-0">
          <Image src="/images/hero/hero-port.jpg" alt="Cảng container quốc tế – HDT Logistics"
            fill className="object-cover" priority quality={85} sizes="100vw" />
          <div className="absolute inset-0 bg-navy-950/72" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-navy-950/80" />
        </div>
        <div className="relative z-10 wrap py-20 w-full">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Về Chúng Tôi</span>
          </nav>
          <div className="max-w-3xl">
            <p className="eyebrow text-orange-400 mb-6">VỀ CHÚNG TÔI</p>
            <h1 className="h1 text-white mb-5">
              Đối tác logistics<br />
              <span className="text-orange-400">ổn định & lâu dài</span>
            </h1>
            <div className="flex flex-wrap gap-3">
              {["High Delivery", "High Discipline", "High Reliability"].map((p) => (
                <span key={p} className="text-xs font-bold tracking-wider uppercase px-4 py-2 bg-white/10 border border-white/20 text-white/90 rounded-full">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Giới thiệu + stats */}
      <section className="py-24">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="eyebrow mb-5">Câu Chuyện Của Chúng Tôi</p>
              <h2 className="h2 text-navy-800 mb-6">
                Xây dựng từ<br />
                <span className="text-grad">niềm tin doanh nghiệp</span>
              </h2>
              <div className="space-y-4 text-navy-600 leading-[1.85] text-[0.95rem]">
                <p>HDT Logistics là đơn vị cung cấp giải pháp logistics tổng thể cho khách hàng doanh nghiệp, tập trung vào vận chuyển quốc tế, vận tải nội địa, khai thuê hải quan và dịch vụ kho bãi.</p>
                <p>Chúng tôi định hướng xây dựng mô hình vận hành dựa trên tính chính xác chứng từ, kiểm soát tiến độ và tối ưu chi phí theo từng lô hàng.</p>
                <p>Với định hướng <strong className="text-navy-800">High Delivery – High Discipline – High Transparency</strong>, HDT Logistics tập trung vào chất lượng thực thi, tính minh bạch và khả năng phối hợp dài hạn với khách hàng.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { n: staff,  l: "Nhân Sự",         c: "bg-navy-700 text-white" },
                  { n: offices, l: "Văn Phòng",        c: "bg-orange-500 text-white" },
                  { n: ships,  l: "Chuyến Hàng",       c: "bg-navy-50 text-navy-800" },
                  { n: exp,    l: "Năm Kinh Nghiệm",   c: "bg-orange-50 text-orange-700" },
                ].map((s) => (
                  <div key={s.l} className={`rounded-2xl p-5 text-center ${s.c}`}>
                    <div className="text-3xl font-extrabold tracking-tight mb-1">{s.n}</div>
                    <div className="text-sm opacity-80">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <div className="relative w-full h-[480px] rounded-2xl overflow-hidden shadow-xl">
                <Image src="/images/about-team.jpg" alt="Đội ngũ HDT Logistics"
                  fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" quality={85} />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent" />
              </div>
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <p className="text-xs text-navy-400 mb-1 font-semibold">Thành viên</p>
                <div className="flex gap-2 flex-wrap">
                  {["FIATA", "IATA", "VIFFAS", "VLA"].map((a) => (
                    <span key={a} className="text-[10px] font-black text-navy-700 bg-navy-50 border border-navy-200 px-2 py-0.5 rounded uppercase tracking-wider">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Năng lực dịch vụ */}
      <section className="py-16 bg-slate-50 border-y border-gray-100">
        <div className="wrap">
          <div className="text-center mb-12">
            <p className="eyebrow mb-3 justify-center">Năng Lực Dịch Vụ</p>
            <h2 className="h2 text-navy-800">Đa phương thức – Trọn gói</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[
              { img: "/images/services/air-freight.jpg",   label: "Đường Không",  alt: "Vận chuyển hàng không" },
              { img: "/images/services/sea-freight.jpg",   label: "Đường Biển",   alt: "Vận chuyển đường biển" },
              { img: "/images/services/lcl.jpg",           label: "Gom Hàng LCL", alt: "Gom hàng lẻ LCL" },
              { img: "/images/services/road.jpg",          label: "Đường Bộ",     alt: "Vận chuyển đường bộ" },
              { img: "/images/services/customs.jpg",       label: "Hải Quan",     alt: "Khai thuê hải quan" },
              { img: "/images/services/project-cargo.jpg", label: "Hàng Dự Án",   alt: "Hàng đặc biệt dự án" },
            ].map((item) => (
              <div key={item.label} className="group relative h-32 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all">
                <Image src={item.img} alt={item.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-500" sizes="(max-width: 640px) 50vw, 16vw" quality={70} />
                <div className="absolute inset-0 bg-navy-900/50 group-hover:bg-navy-900/40 transition-colors" />
                <div className="absolute inset-0 flex items-end justify-center pb-3">
                  <span className="text-white text-xs font-bold text-center leading-tight">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tầm nhìn & Sứ mệnh */}
      <section className="py-20">
        <div className="wrap">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4 justify-center">Định Hướng Phát Triển</p>
            <h2 className="h2 text-navy-800">Tầm nhìn & Sứ mệnh</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <div className="card p-8">
              <div className="w-14 h-14 bg-navy-100 rounded-2xl flex items-center justify-center text-navy-700 mb-5">
                <Eye size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Tầm Nhìn</h3>
              <p className="text-navy-500 leading-relaxed text-sm">{vision}</p>
            </div>
            <div className="card p-8">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-5">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Sứ Mệnh</h3>
              <p className="text-navy-500 leading-relaxed text-sm">{mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Giá trị cốt lõi — từ API */}
      {companyValues.length > 0 && (
        <section className="py-16 bg-slate-50">
          <div className="wrap">
            <div className="text-center mb-12">
              <p className="eyebrow mb-4 justify-center">Văn Hóa Doanh Nghiệp</p>
              <h2 className="h2 text-navy-800">Giá trị cốt lõi</h2>
            </div>
            <div className={`grid grid-cols-2 ${companyValues.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"} gap-5`}>
              {companyValues.map((v: any, i: number) => (
                <div key={v.id} className="group card p-6 text-center">
                  <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${VALUE_COLORS[i % VALUE_COLORS.length]}`}>
                    <IconByName name={v.icon} size={24} />
                  </div>
                  <h3 className="font-bold text-navy-800 mb-2">{v.title}</h3>
                  <p className="text-navy-500 text-xs leading-relaxed">{v.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonials — từ API */}
      {testimonials.length > 0 && (
        <section className="py-16">
          <div className="wrap">
            <p className="eyebrow mb-10 justify-center">Phản Hồi Từ Khách Hàng</p>
            <div className="grid md:grid-cols-3 gap-5">
              {testimonials.slice(0, 3).map((item: any) => (
                <div key={item.id} className="card p-7">
                  <p className="text-navy-500 text-sm leading-[1.85] italic mb-6">"{item.content}"</p>
                  <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                    <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-white font-bold text-sm">
                      {item.customerName?.charAt(0) ?? "K"}
                    </div>
                    <div>
                      <p className="font-bold text-navy-800 text-sm">{item.customerName || "Khách hàng"}</p>
                      <p className="text-navy-400 text-xs">{item.customerType}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Awards — từ API */}
      {awards.length > 0 && (
        <section className="py-16 bg-navy-700">
          <div className="wrap">
            <div className="text-center mb-10">
              <p className="eyebrow text-orange-400 mb-4 justify-center">Thành Tích</p>
              <h2 className="h2 text-white">Được vinh danh qua nhiều năm</h2>
            </div>
            <div className={`grid grid-cols-2 ${awards.length >= 4 ? "md:grid-cols-4" : "md:grid-cols-3"} gap-4`}>
              {awards.map((a: any) => (
                <div key={a.id} className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
                  <div className="text-orange-400 flex justify-center mb-3">
                    <IconByName name={a.icon || "award"} size={28} />
                  </div>
                  <p className="text-white font-semibold text-sm mb-1">{a.title}</p>
                  {a.year && <p className="text-white/50 text-xs">{a.year}</p>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="py-16 border-t border-gray-100">
        <div className="wrap flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-2xl font-extrabold text-navy-800 mb-2">Sẵn sàng hợp tác?</h3>
            <p className="text-navy-500 text-sm">Liên hệ để nhận tư vấn và báo giá miễn phí trong 2 giờ.</p>
          </div>
          <Link href="/contact" className="btn-orange flex-shrink-0">
            Liên Hệ Ngay <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
