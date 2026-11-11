"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Zap, FileCheck, BarChart3, Shield } from "lucide-react";

const pillars = [
  {
    icon: <Zap size={24} />,
    color: "bg-orange-100 text-orange-600",
    tag: "01 — Tốc Độ",
    title: "Xử lý nhanh, không để hàng chờ",
    desc: "Báo giá trong 2 giờ, booking tàu/máy bay trong ngày. Cập nhật lịch trình liên tục, chủ động đề xuất phương án thay thế khi có thay đổi.",
    points: ["Booking tàu / máy bay trong ngày", "Cập nhật lịch trình real-time", "Xử lý phát sinh 24/7"],
  },
  {
    icon: <FileCheck size={24} />,
    color: "bg-blue-100 text-blue-600",
    tag: "02 — Chính Xác",
    title: "Chứng từ chuẩn, thông quan lần đầu",
    desc: "Hồ sơ rà soát 2 cấp độc lập trước khi nộp. Tỷ lệ thông quan lần đầu >95%, giảm tối đa chi phí lưu kho phát sinh.",
    points: ["Kiểm tra hồ sơ 2 cấp độc lập", "Tỷ lệ thông quan lần đầu >95%", "Tuân thủ đúng quy định pháp luật"],
  },
  {
    icon: <BarChart3 size={24} />,
    color: "bg-green-100 text-green-600",
    tag: "03 — Minh Bạch",
    title: "Báo cáo rõ ràng, theo dõi đầy đủ",
    desc: "Tracking lô hàng từng chặng, bảng kê chi phí minh bạch không phát sinh ẩn. Dễ kiểm soát ngân sách và kế hoạch logistics.",
    points: ["Tracking từng chặng vận chuyển", "Báo cáo chi phí không ẩn phí", "Dashboard theo dõi trực tuyến"],
  },
  {
    icon: <Shield size={24} />,
    color: "bg-purple-100 text-purple-600",
    tag: "04 — An Toàn",
    title: "Bảo hiểm toàn trình, cam kết bồi thường",
    desc: "Hàng hóa được bảo hiểm 100% trị giá toàn trình vận chuyển. Cam kết bồi thường theo điều khoản hợp đồng đã ký kết.",
    points: ["Bảo hiểm hàng hóa toàn trình", "Cam kết bồi thường rõ ràng", "Quy trình khiếu nại nhanh gọn"],
  },
];

export default function WhyUsSection({ settings = {} }: { settings?: Record<string, string> }) {
  const staff   = settings.counter_staff     || "";
  const offices = settings.counter_offices   || "";
  const ships   = settings.counter_shipments || "";
  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: ảnh thật */}
          <div className="relative order-2 lg:order-1 mb-6 lg:mb-0">
            <div className="relative w-full h-[260px] sm:h-[380px] lg:h-[500px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero/hero-warehouse.jpg"
                alt="Kho bãi logistics hiện đại HDT Logistics"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-navy-900/20 to-transparent" />
            </div>

            {/* Stats overlay */}
            <div className="absolute bottom-3 left-3 right-3 sm:bottom-5 sm:left-5 sm:right-5">
              <div className="bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl p-3 sm:p-5 shadow-xl
                              grid grid-cols-3 divide-x divide-gray-100">
                {[
                  { n: staff,  l: "Nhân sự" },
                  { n: offices, l: "Văn phòng" },
                  { n: ships,  l: "Chuyến hàng" },
                ].map((s) => (
                  <div key={s.l} className="text-center px-1 sm:px-4">
                    <div className="text-base sm:text-xl font-extrabold text-navy-700">{s.n}</div>
                    <div className="text-[10px] sm:text-xs text-navy-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: content */}
          <div className="order-1 lg:order-2">
            <p className="eyebrow mb-5">Tại Sao Chọn Chúng Tôi</p>
            <h2 className="h2 text-navy-800 mb-4">
              Bốn cam kết cốt lõi<br />
              <span className="text-grad">không thỏa hiệp</span>
            </h2>
            <p className="text-navy-500 text-sm leading-relaxed mb-8 sm:mb-10 text-justify sm:text-left">
              Mỗi lô hàng được quản lý với tiêu chuẩn vận hành nhất quán — từ yêu cầu đầu tiên đến giao nhận thực tế.
            </p>

            <div className="space-y-4">
              {pillars.map((p) => (
                <div key={p.tag}
                  className="flex gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl border border-gray-100 bg-white
                             shadow-card hover:shadow-card-hover hover:-translate-y-0.5
                             transition-all group">
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center
                                   flex-shrink-0 transition-transform group-hover:scale-110 ${p.color}`}
                    style={{ minWidth: 44, minHeight: 44 }}>
                    {p.icon}
                  </div>
                  <div>
                    <span className="text-[10px] font-bold tracking-[0.18em] uppercase
                                     text-navy-400 block mb-1">{p.tag}</span>
                    <h3 className="font-bold text-navy-800 text-sm mb-1.5
                                   group-hover:text-orange-500 transition-colors">
                      {p.title}
                    </h3>
                    <p className="text-navy-500 text-xs leading-relaxed text-justify sm:text-left">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link href="/about" className="btn-outline justify-center sm:justify-start w-full sm:w-auto">
                Tìm Hiểu Về HDT Logistics <ArrowRight size={15} />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
