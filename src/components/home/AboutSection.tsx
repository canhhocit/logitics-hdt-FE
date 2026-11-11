"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function AboutSection({ settings = {} }: { settings?: Record<string, string> }) {
  const staff   = settings.counter_staff     || "";
  const offices = settings.counter_offices   || "";
  const exp     = settings.counter_experience || "";

  return (
    <section className="py-14 sm:py-20 lg:py-24 bg-white overflow-hidden">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">

          {/* Left: ảnh thật */}
          <div className="relative mb-6 lg:mb-0">
            {/* Ảnh chính */}
            <div className="relative w-full h-[260px] sm:h-[360px] lg:h-[460px] rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="/images/hero/hero-port.jpg"
                alt="Cảng container quốc tế – HDT Logistics vận hành"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-900/40 to-transparent" />
            </div>

            {/* Badge thống kê nổi */}
            <div className="absolute -bottom-3 right-2 sm:-bottom-6 sm:-right-6 bg-white rounded-xl sm:rounded-2xl shadow-xl p-3 sm:p-5 border border-gray-100 z-10">
              <div className="grid grid-cols-2 gap-3 sm:gap-4 text-center">
                {[
                  { n: staff,   l: "Chuyến hàng" },
                  { n: offices, l: "Văn phòng" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-xl sm:text-2xl font-extrabold text-navy-700">{s.n}</div>
                    <div className="text-[11px] sm:text-xs text-navy-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge kinh nghiệm */}
            <div className="absolute -top-3 left-2 sm:-top-5 sm:-left-5 bg-orange-500 text-white rounded-xl sm:rounded-2xl
                            shadow-lg px-3.5 py-2 sm:px-5 sm:py-3 text-center z-10">
              <div className="text-2xl sm:text-3xl font-black leading-none">{exp}</div>
              <div className="text-orange-100 text-[11px] sm:text-xs mt-0.5 font-medium">Năm kinh nghiệm</div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <p className="eyebrow mb-4 sm:mb-5">Về Chúng Tôi</p>
            <h2 className="h2 text-navy-800 mb-4 sm:mb-6">
              Mắt xích vận hành<br />
              <span className="text-grad">đáng tin cậy</span>
            </h2>

            <div className="flex flex-wrap gap-2 mb-6 sm:mb-7">
              {["High Delivery", "High Discipline", "High Reliability"].map((p) => (
                <span key={p}
                  className="text-[11px] sm:text-xs font-bold tracking-wider uppercase px-3 py-1 sm:py-1.5
                             bg-navy-50 border border-navy-200 text-navy-700 rounded-full">
                  {p}
                </span>
              ))}
            </div>

            <div className="space-y-4 text-navy-600 text-sm sm:text-[0.95rem] leading-[1.8] mb-8 text-justify">
              <p>
                HDT Logistics là đơn vị cung cấp giải pháp logistics tổng thể cho doanh nghiệp,
                chuyên về <strong className="text-navy-800">vận chuyển quốc tế</strong>,{" "}
                <strong className="text-navy-800">vận tải nội địa</strong>,{" "}
                <strong className="text-navy-800">khai thuê hải quan</strong> và{" "}
                <strong className="text-navy-800">kho bãi phân phối</strong>.
              </p>
              <p>
                Mỗi lô hàng được quản lý theo quy trình rõ ràng, minh bạch và có khả năng
                truy vết — đội ngũ chuyên môn am hiểu nghiệp vụ XNK, quy định hải quan và
                đặc thù vận chuyển đa phương thức.
              </p>
            </div>

            <div className="space-y-3 mb-8">
              {[
                "Phủ sóng 63 tỉnh thành, kết nối hơn 100 cảng biển quốc tế",
                "Booking trực tiếp Yang Ming, SITC, CMA CGM và 50+ hãng hàng không",
                "Khai báo hải quan điện tử – tỷ lệ thông quan lần đầu >95%",
                "Phản hồi yêu cầu và báo giá trong vòng 2 giờ làm việc",
              ].map((pt) => (
                <div key={pt} className="flex items-start gap-3">
                  <CheckCircle size={16} className="text-orange-500 flex-shrink-0 mt-0.5" />
                  <span className="text-navy-600 text-sm leading-relaxed">{pt}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-navy justify-center sm:justify-start w-full sm:w-auto">
              Tìm Hiểu Thêm <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
