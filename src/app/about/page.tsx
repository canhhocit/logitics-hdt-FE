import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ChevronRight, ArrowRight, CheckCircle, Target, Eye, Heart, TrendingUp, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Về Chúng Tôi",
  description: "HD Logistics – Giải pháp logistics tổng thể. High Delivery – High Discipline – High Reliability.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* ── Hero với ảnh thật ── */}
      <section className="relative min-h-[55vh] flex items-end overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/images/hero/hero-port.jpg"
            alt="Cảng container quốc tế – HD Logistics vận hành toàn quốc"
            fill className="object-cover" priority quality={85} sizes="100vw"
          />
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
                <span key={p} className="text-xs font-bold tracking-wider uppercase
                  px-4 py-2 bg-white/10 border border-white/20 text-white/90 rounded-full">{p}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Giới thiệu + ảnh ── */}
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
                <p>HD Logistics là đơn vị cung cấp giải pháp logistics tổng thể cho khách hàng doanh nghiệp, tập trung vào vận chuyển quốc tế, vận tải nội địa, khai thuê hải quan và dịch vụ kho bãi.</p>
                <p>Chúng tôi định hướng xây dựng mô hình vận hành dựa trên tính chính xác chứng từ, kiểm soát tiến độ và tối ưu chi phí theo từng lô hàng. Mỗi yêu cầu được phân tích theo tuyến, thời gian và đặc thù hàng hóa để đưa ra phương án phù hợp nhất.</p>
                <p>Với định hướng <strong className="text-navy-800">High Delivery – High Discipline – High Reliability</strong>, HD Logistics tập trung vào chất lượng thực thi, tính minh bạch và khả năng phối hợp dài hạn với khách hàng.</p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                {[
                  { n: "50+", l: "Nhân Sự", c: "bg-navy-700 text-white" },
                  { n: "5",   l: "Văn Phòng", c: "bg-orange-500 text-white" },
                  { n: "1,500+", l: "Chuyến Hàng", c: "bg-navy-50 text-navy-800" },
                  { n: "10+", l: "Năm Kinh Nghiệm", c: "bg-orange-50 text-orange-700" },
                ].map((s) => (
                  <div key={s.l} className={`rounded-2xl p-5 text-center ${s.c}`}>
                    <div className="text-3xl font-extrabold tracking-tight mb-1">{s.n}</div>
                    <div className="text-sm opacity-80">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ảnh thật */}
            <div className="relative">
              <div className="relative w-full h-[480px] rounded-2xl overflow-hidden shadow-xl">
                <Image
                  src="/images/about-team.jpg"
                  alt="Đội ngũ chuyên gia logistics HD Logistics tại văn phòng"
                  fill className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw" quality={85}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/30 to-transparent" />
              </div>
              {/* Badge */}
              <div className="absolute -bottom-5 -left-5 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
                <p className="text-xs text-navy-400 mb-1 font-semibold">Thành viên</p>
                <div className="flex gap-2 flex-wrap">
                  {["FIATA", "IATA", "VIFFAS", "VLA"].map((a) => (
                    <span key={a} className="text-[10px] font-black text-navy-700 bg-navy-50
                                             border border-navy-200 px-2 py-0.5 rounded uppercase tracking-wider">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Dịch vụ với ảnh ── */}
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
              <div key={item.label} className="group relative h-32 rounded-2xl overflow-hidden shadow-sm
                                               hover:shadow-lg hover:-translate-y-1 transition-all">
                <Image
                  src={item.img} alt={item.alt} fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 16vw" quality={70}
                />
                <div className="absolute inset-0 bg-navy-900/50 group-hover:bg-navy-900/40 transition-colors" />
                <div className="absolute inset-0 flex items-end justify-center pb-3">
                  <span className="text-white text-xs font-bold text-center leading-tight">{item.label}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Tầm nhìn & Sứ mệnh ── */}
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
              <p className="text-navy-500 leading-relaxed text-sm">Đến năm 2030, HD Logistics trở thành Top 10 doanh nghiệp logistics hàng đầu Việt Nam, với nền tảng công nghệ số tiên tiến và mạng lưới dịch vụ phủ sóng toàn Đông Nam Á.</p>
            </div>
            <div className="card p-8">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-5">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Sứ Mệnh</h3>
              <p className="text-navy-500 leading-relaxed text-sm">Cung cấp giải pháp logistics toàn diện, đáng tin cậy và hiệu quả, giúp doanh nghiệp tối ưu chi phí vận chuyển, nâng cao năng lực cạnh tranh và phát triển bền vững.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Giá trị cốt lõi ── */}
      <section className="py-16 bg-slate-50">
        <div className="wrap">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4 justify-center">Văn Hóa Doanh Nghiệp</p>
            <h2 className="h2 text-navy-800">Giá trị cốt lõi</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: <Target size={24}/>, title: "Cam Kết", desc: "Cam kết chất lượng dịch vụ và tiến độ giao hàng tuyệt đối.", c: "bg-blue-50 text-blue-600" },
              { icon: <Heart size={24}/>, title: "Tận Tâm", desc: "Phục vụ với tâm huyết, coi thành công khách hàng là của mình.", c: "bg-red-50 text-red-500" },
              { icon: <TrendingUp size={24}/>, title: "Đổi Mới", desc: "Liên tục cải tiến quy trình và ứng dụng công nghệ mới.", c: "bg-green-50 text-green-600" },
              { icon: <CheckCircle size={24}/>, title: "Minh Bạch", desc: "Báo cáo rõ ràng, không ẩn phí, dễ kiểm soát chi phí.", c: "bg-purple-50 text-purple-600" },
            ].map((v) => (
              <div key={v.title} className="group card p-6 text-center">
                <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4 transition-transform group-hover:scale-110 ${v.c}`}>{v.icon}</div>
                <h3 className="font-bold text-navy-800 mb-2">{v.title}</h3>
                <p className="text-navy-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ── */}
      <section className="py-16">
        <div className="wrap">
          <p className="eyebrow mb-10 justify-center">Phản Hồi Từ Khách Hàng</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { q: "HD Logistics hỗ trợ rất sát trong khâu chứng từ và lịch tàu. Khi có thay đổi về lịch, đội ngũ xử lý nhanh và đề xuất phương án thay thế ngay.", t: "Doanh nghiệp", i: "Sản xuất linh kiện" },
              { q: "Tư vấn tuyến vận chuyển và thủ tục hải quan chi tiết. Hồ sơ rà soát trước nên tỷ lệ bổ sung chứng từ thấp. Thời gian phản hồi nhanh.", t: "Công ty", i: "Thương mại XNK" },
              { q: "HD Logistics đáp ứng tốt yêu cầu theo dõi tiến độ, bảng kê chi phí minh bạch và hỗ trợ xử lý phát sinh ngoài giờ khi cần.", t: "Doanh nghiệp", i: "FDI công nghiệp" },
            ].map((item, i) => (
              <div key={i} className="card p-7">
                <p className="text-navy-500 text-sm leading-[1.85] italic mb-6">"{item.q}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-white font-bold text-sm">{item.t.charAt(0)}</div>
                  <div>
                    <p className="font-bold text-navy-800 text-sm">{item.t}</p>
                    <p className="text-navy-400 text-xs">{item.i}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Awards ── */}
      <section className="py-16 bg-navy-700">
        <div className="wrap">
          <div className="text-center mb-10">
            <p className="eyebrow text-orange-400 mb-4 justify-center">Thành Tích</p>
            <h2 className="h2 text-white">Được vinh danh qua nhiều năm</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Award size={28}/>, title: "Top 100 DN Logistics uy tín 2024", org: "Vietnam Report" },
              { icon: <Award size={28}/>, title: "Doanh nghiệp xuất sắc 2023", org: "Bộ GTVT" },
              { icon: <Award size={28}/>, title: "Thương hiệu tin cậy 2022", org: "Hội DN VN" },
              { icon: <Award size={28}/>, title: "ISO 9001:2015", org: "Chứng nhận quốc tế" },
            ].map((a) => (
              <div key={a.title} className="bg-white/10 border border-white/20 rounded-2xl p-6 text-center hover:bg-white/15 transition-colors">
                <div className="text-orange-400 flex justify-center mb-3">{a.icon}</div>
                <p className="text-white font-semibold text-sm mb-1">{a.title}</p>
                <p className="text-white/50 text-xs">{a.org}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

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
