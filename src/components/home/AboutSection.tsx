"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function AboutSection() {
  return (
    <section className="py-24 bg-white">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left */}
          <div>
            <p className="eyebrow mb-5">Về Chúng Tôi</p>
            <h2 className="h2 text-navy-800 mb-6">
              Mắt xích vận hành<br />
              <span className="text-grad">đáng tin cậy</span>
            </h2>

            <div className="flex flex-wrap gap-2 mb-7">
              {["High Delivery", "High Discipline", "High Reliability"].map((p) => (
                <span key={p} className="text-xs font-bold tracking-wider uppercase
                  px-3 py-1.5 bg-navy-50 border border-navy-200 text-navy-700 rounded-full">
                  {p}
                </span>
              ))}
            </div>

            <div className="space-y-4 text-navy-600 text-[0.95rem] leading-[1.85] mb-8">
              <p>
                HD Logistics là đơn vị cung cấp giải pháp logistics tổng thể cho doanh nghiệp,
                chuyên về <strong className="text-navy-800">vận chuyển quốc tế</strong>,
                {" "}<strong className="text-navy-800">vận tải nội địa</strong>,
                {" "}<strong className="text-navy-800">khai thuê hải quan</strong> và
                {" "}<strong className="text-navy-800">kho bãi phân phối</strong>.
              </p>
              <p>
                Chúng tôi xây dựng mô hình vận hành dựa trên tốc độ xử lý, độ chính xác
                chứng từ và khả năng kiểm soát chuỗi vận chuyển — mỗi lô hàng được quản lý
                theo quy trình rõ ràng, minh bạch và có khả năng truy vết.
              </p>
              <p>
                Đội ngũ chuyên môn am hiểu nghiệp vụ xuất nhập khẩu, quy định hải quan và
                đặc thù vận chuyển đa phương thức. HD Logistics ưu tiên phục vụ doanh nghiệp
                sản xuất, công ty thương mại và khối FDI.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                "Phủ sóng 63 tỉnh thành, kết nối hơn 100 cảng biển quốc tế",
                "Hệ thống kho bãi WMS chuẩn, tổng diện tích 50.000 m²",
                "Khai báo hải quan điện tử – tỷ lệ thông quan lần đầu >95%",
                "Phản hồi yêu cầu và báo giá trong vòng 2 giờ làm việc",
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-600 text-sm">{pt}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-navy inline-flex">
              Tìm Hiểu Thêm <ArrowRight size={15} />
            </Link>
          </div>

          {/* Right: numbered list */}
          <div className="space-y-4">
            {[
              { no: "01", title: "Vận chuyển đa phương thức", desc: "Đường biển, hàng không và đường bộ xuyên biên giới — tư vấn tuyến tối ưu theo từng loại hàng và thị trường đích." },
              { no: "02", title: "Hải quan chuyên nghiệp", desc: "Hồ sơ rà soát 2 cấp trước khi nộp, giảm tối đa tỷ lệ bổ sung chứng từ. Thông quan nhanh, đúng quy định pháp luật." },
              { no: "03", title: "Theo dõi xuyên suốt", desc: "Trạng thái lô hàng được cập nhật từng chặng. Báo cáo chi phí minh bạch, dễ kiểm soát kế hoạch giao nhận." },
              { no: "04", title: "Đối tác doanh nghiệp dài hạn", desc: "Nhà máy sản xuất, thương mại XNK, FDI công nghiệp — đối tác logistics ổn định, linh hoạt và tin cậy." },
            ].map((item) => (
              <div key={item.no}
                className="flex gap-5 p-6 rounded-2xl bg-white border border-gray-100
                           shadow-card hover:shadow-card-hover hover:-translate-y-1 transition-all group">
                <span className="text-3xl font-black text-navy-100 group-hover:text-orange-200
                                 transition-colors flex-shrink-0 leading-none mt-0.5 select-none">
                  {item.no}
                </span>
                <div>
                  <h4 className="font-bold text-navy-800 mb-1.5 text-sm group-hover:text-orange-500 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-navy-500 text-sm leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
