import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, ArrowRight, CheckCircle, Target, Eye, Heart, TrendingUp, Users, Award } from "lucide-react";

export const metadata: Metadata = {
  title: "Về Chúng Tôi",
  description: "HD Logistics – Giải pháp logistics tổng thể. High Delivery – High Discipline – High Reliability.",
};

export default function AboutPage() {
  return (
    <div className="bg-white">

      {/* Hero */}
      <section className="hero-bg py-24 relative overflow-hidden">
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
        <div className="wrap relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-white transition-colors">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Về Chúng Tôi</span>
          </div>
          <div className="max-w-3xl">
            <p className="eyebrow text-orange-400 mb-6">VỀ CHÚNG TÔI</p>
            <h1 className="h1 text-white mb-5">
              Đối tác logistics<br />
              <span className="text-orange-400">ổn định & lâu dài</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-8 max-w-2xl">
              HD Logistics cung cấp giải pháp logistics tổng thể cho doanh nghiệp — chuyên về vận chuyển quốc tế, vận tải nội địa, khai thuê hải quan và kho bãi phân phối.
            </p>
            <div className="flex flex-wrap gap-3">
              {["High Delivery", "High Discipline", "High Reliability"].map((p) => (
                <span key={p} className="text-xs font-bold tracking-wider uppercase
                  px-4 py-2 bg-white/10 border border-white/20 text-white/90 rounded-full">
                  {p}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-24">
        <div className="wrap">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <p className="eyebrow mb-5">Câu Chuyện Của Chúng Tôi</p>
              <h2 className="h2 text-navy-800 mb-6">
                Xây dựng từ<br />
                <span className="text-grad">niềm tin doanh nghiệp</span>
              </h2>
              <div className="space-y-4 text-navy-600 text-[0.95rem] leading-[1.85]">
                <p>
                  HD Logistics là đơn vị cung cấp giải pháp logistics tổng thể cho khách hàng doanh nghiệp, tập trung vào vận chuyển quốc tế, vận tải nội địa, khai thuê hải quan và dịch vụ kho bãi. Chúng tôi định hướng xây dựng mô hình vận hành dựa trên tính chính xác chứng từ, kiểm soát tiến độ và tối ưu chi phí theo từng lô hàng.
                </p>
                <p>
                  HD Logistics triển khai dịch vụ logistics đa phương thức gồm đường biển, hàng không và đường bộ, kết hợp tư vấn thủ tục xuất nhập khẩu và chính sách mặt hàng. Mỗi yêu cầu vận chuyển được phân tích theo tuyến, thời gian và đặc thù hàng hóa để đưa ra phương án phù hợp, hạn chế rủi ro và phát sinh trong quá trình thực hiện.
                </p>
                <p>
                  Đội ngũ nghiệp vụ được tổ chức theo từng mảng chuyên môn như vận chuyển quốc tế, hải quan và điều phối nội địa. Quy trình xử lý hồ sơ và theo dõi lô hàng được chuẩn hóa, giúp khách hàng dễ kiểm soát trạng thái vận chuyển và kế hoạch giao nhận.
                </p>
                <p>
                  Mục tiêu của HD Logistics là trở thành <strong className="text-navy-800">mắt xích vận hành đáng tin cậy</strong> trong chuỗi cung ứng của khách hàng — giao đúng, xử lý chuẩn, đồng hành bền vững.
                </p>
              </div>
            </div>

            <div className="space-y-4">
              {/* Key stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {[
                  { n: "50+", l: "Nhân Sự", c: "bg-navy-700 text-white" },
                  { n: "5+",  l: "Văn Phòng", c: "bg-orange-500 text-white" },
                  { n: "1,500+", l: "Chuyến Hàng", c: "bg-navy-100 text-navy-800" },
                  { n: "10+", l: "Năm Kinh Nghiệm", c: "bg-orange-50 text-orange-700" },
                ].map((s) => (
                  <div key={s.l} className={`rounded-2xl p-6 text-center ${s.c}`}>
                    <div className="text-3xl font-extrabold tracking-tight mb-1">{s.n}</div>
                    <div className="text-sm opacity-80">{s.l}</div>
                  </div>
                ))}
              </div>

              {/* Highlights */}
              {[
                { title: "Đa phương thức", desc: "Đường biển · Hàng không · Đường bộ xuyên biên giới — phương án tối ưu cho từng lô hàng." },
                { title: "Hải quan chuyên nghiệp", desc: "Tỷ lệ thông quan lần đầu >95%, hồ sơ được rà soát 2 cấp trước khi nộp." },
                { title: "Theo dõi xuyên suốt", desc: "Trạng thái cập nhật từng chặng, báo cáo chi phí minh bạch, phối hợp 24/7." },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3 p-4 rounded-xl bg-slate-50 border border-gray-100">
                  <CheckCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-bold text-navy-800 text-sm">{item.title}</p>
                    <p className="text-navy-500 text-xs leading-relaxed mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 bg-slate-50">
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
              <p className="text-navy-500 leading-relaxed text-sm">
                Đến năm 2030, HD Logistics trở thành Top 10 doanh nghiệp logistics hàng đầu Việt Nam, với nền tảng công nghệ số tiên tiến và mạng lưới dịch vụ phủ sóng toàn Đông Nam Á.
              </p>
            </div>
            <div className="card p-8">
              <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center text-orange-600 mb-5">
                <Target size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-3">Sứ Mệnh</h3>
              <p className="text-navy-500 leading-relaxed text-sm">
                Cung cấp giải pháp logistics toàn diện, đáng tin cậy và hiệu quả, giúp doanh nghiệp tối ưu chi phí vận chuyển, nâng cao năng lực cạnh tranh và phát triển bền vững.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core values */}
      <section className="py-20">
        <div className="wrap">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4 justify-center">Văn Hóa Doanh Nghiệp</p>
            <h2 className="h2 text-navy-800">Giá trị cốt lõi</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[
              { icon: <Target size={24} />, title: "Cam Kết", desc: "Cam kết chất lượng dịch vụ và tiến độ giao hàng tuyệt đối.", c: "bg-blue-50 text-blue-600" },
              { icon: <Heart size={24} />, title: "Tận Tâm", desc: "Phục vụ với tâm huyết, coi thành công khách hàng là của mình.", c: "bg-red-50 text-red-500" },
              { icon: <TrendingUp size={24} />, title: "Đổi Mới", desc: "Liên tục cải tiến quy trình và ứng dụng công nghệ mới.", c: "bg-green-50 text-green-600" },
              { icon: <Users size={24} />, title: "Hợp Tác", desc: "Xây dựng quan hệ đối tác bền vững, cùng phát triển lâu dài.", c: "bg-purple-50 text-purple-600" },
            ].map((v) => (
              <div key={v.title} className="group card p-6 text-center">
                <div className={`w-14 h-14 rounded-2xl mx-auto flex items-center justify-center mb-4
                                 transition-all group-hover:scale-110 ${v.c}`}>
                  {v.icon}
                </div>
                <h3 className="font-bold text-navy-800 mb-2">{v.title}</h3>
                <p className="text-navy-500 text-xs leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-slate-50">
        <div className="wrap">
          <p className="eyebrow mb-10 justify-center">Phản Hồi Từ Khách Hàng</p>
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { q: "HD Logistics hỗ trợ rất sát trong khâu chứng từ và lịch tàu. Các lô hàng xuất đi được theo dõi liên tục, cập nhật rõ ràng từng chặng. Khi có thay đổi về lịch, đội ngũ xử lý nhanh và đề xuất phương án thay thế ngay.", t: "Doanh nghiệp", i: "Sản xuất linh kiện" },
              { q: "Tư vấn tuyến vận chuyển và thủ tục hải quan khá chi tiết. Hồ sơ được rà soát trước nên tỷ lệ phải bổ sung chứng từ thấp. Thời gian phản hồi nhanh, dễ phối hợp.", t: "Công ty", i: "Thương mại xuất nhập khẩu" },
              { q: "HD Logistics đáp ứng tốt yêu cầu theo dõi tiến độ, bảng kê chi phí minh bạch và hỗ trợ xử lý phát sinh ngoài giờ khi cần. Mức độ phối hợp ổn định và chuyên nghiệp.", t: "Doanh nghiệp", i: "FDI ngành công nghiệp" },
            ].map((item, i) => (
              <div key={i} className="card p-7">
                <p className="text-navy-500 text-sm leading-[1.85] mb-6 italic">"{item.q}"</p>
                <div className="flex items-center gap-3 pt-5 border-t border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-navy-700 flex items-center justify-center text-white font-bold text-sm">
                    {item.t.charAt(0)}
                  </div>
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

      {/* Awards */}
      <section className="py-20 bg-navy-700">
        <div className="wrap">
          <div className="text-center mb-10">
            <p className="eyebrow text-orange-400 mb-4 justify-center">Thành Tích & Giải Thưởng</p>
            <h2 className="h2 text-white">Được vinh danh qua nhiều năm</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: <Award size={28} />, title: "Top 100 DN Logistics uy tín 2024", org: "Vietnam Report" },
              { icon: <Award size={28} />, title: "Doanh nghiệp xuất sắc 2023", org: "Bộ GTVT" },
              { icon: <Award size={28} />, title: "Thương hiệu tin cậy 2022", org: "Hội DN VN" },
              { icon: <Award size={28} />, title: "ISO 9001:2015", org: "Chứng nhận quốc tế" },
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
