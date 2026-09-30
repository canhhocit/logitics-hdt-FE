"use client";

import Link from "next/link";
import { ArrowRight, Zap, FileCheck, BarChart3, Shield } from "lucide-react";

const pillars = [
  {
    icon: <Zap size={26} />,
    color: "bg-orange-100 text-orange-600",
    tag: "Tốc Độ",
    title: "Xử lý nhanh, không để hàng chờ",
    desc: "Đội ngũ phản hồi trong vòng 2 giờ làm việc. Booking tàu/máy bay trong ngày, lịch trình được cập nhật liên tục, chủ động đề xuất phương án thay thế khi có thay đổi.",
    points: ["Booking tàu / máy bay trong ngày", "Cập nhật lịch trình real-time", "Xử lý phát sinh ngoài giờ 24/7"],
  },
  {
    icon: <FileCheck size={26} />,
    color: "bg-blue-100 text-blue-600",
    tag: "Chính Xác",
    title: "Chứng từ chuẩn, thông quan lần đầu",
    desc: "Hồ sơ rà soát 2 cấp trước khi nộp, tỷ lệ bổ sung chứng từ thấp. Quy trình khai báo hải quan được chuẩn hóa theo từng loại hàng và từng thị trường.",
    points: ["Kiểm tra hồ sơ 2 cấp độc lập", "Tỷ lệ thông quan lần đầu > 95%", "Tuân thủ đúng quy định pháp luật"],
  },
  {
    icon: <BarChart3 size={26} />,
    color: "bg-green-100 text-green-600",
    tag: "Minh Bạch",
    title: "Theo dõi đầy đủ, báo cáo rõ ràng",
    desc: "Mỗi lô hàng được theo dõi xuyên suốt từ điểm lấy đến điểm giao. Bảng kê chi phí minh bạch, không phát sinh ẩn, dễ kiểm soát ngân sách logistics.",
    points: ["Tracking từng chặng vận chuyển", "Báo cáo chi phí chi tiết, rõ ràng", "Dashboard theo dõi trực tuyến"],
  },
  {
    icon: <Shield size={26} />,
    color: "bg-purple-100 text-purple-600",
    tag: "An Toàn",
    title: "Bảo hiểm toàn trình, cam kết bồi thường",
    desc: "Hàng hóa được bảo hiểm 100% giá trị toàn trình vận chuyển. Cam kết bồi thường nếu xảy ra tổn thất theo điều khoản hợp đồng đã ký kết.",
    points: ["Bảo hiểm hàng hóa toàn trình", "Cam kết bồi thường rõ ràng", "Quy trình khiếu nại nhanh gọn"],
  },
];

export default function WhyUsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="wrap">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="eyebrow mb-4 justify-center">Tại Sao Chọn Chúng Tôi</p>
          <h2 className="h2 text-navy-800 mb-4">
            Bốn cam kết cốt lõi<br />
            <span className="text-grad">không thỏa hiệp</span>
          </h2>
          <p className="text-navy-500 text-sm leading-relaxed">
            Mỗi lô hàng được quản lý với tiêu chuẩn vận hành nhất quán — từ yêu cầu đầu tiên
            đến giao nhận thực tế, chúng tôi luôn đảm bảo đúng hẹn, đúng chứng từ và minh bạch chi phí.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {pillars.map((p, i) => (
            <div key={p.tag}
              className="group rounded-2xl border border-gray-100 bg-white shadow-card
                         hover:shadow-card-hover hover:-translate-y-1 transition-all duration-300 p-7">
              <div className="flex items-start gap-5">
                <div className={`w-13 h-13 rounded-2xl flex items-center justify-center flex-shrink-0 ${p.color}
                                 group-hover:scale-110 transition-transform`}
                     style={{ width: 52, height: 52 }}>
                  {p.icon}
                </div>
                <div className="flex-1">
                  <span className="text-[10px] font-bold tracking-[0.18em] uppercase text-navy-400 block mb-1">
                    {String(i + 1).padStart(2, "0")} — {p.tag}
                  </span>
                  <h3 className="font-bold text-navy-800 text-base mb-2 group-hover:text-orange-500 transition-colors leading-snug">
                    {p.title}
                  </h3>
                  <p className="text-navy-500 text-sm leading-relaxed mb-4">{p.desc}</p>
                  <ul className="space-y-1.5">
                    {p.points.map((pt) => (
                      <li key={pt} className="flex items-center gap-2 text-xs text-navy-500">
                        <span className="w-1 h-1 rounded-full bg-orange-400 flex-shrink-0" />
                        {pt}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/about" className="btn-outline inline-flex">
            Tìm Hiểu Về HD Logistics <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
