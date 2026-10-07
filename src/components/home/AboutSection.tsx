"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, CheckCircle } from "lucide-react";

export default function AboutSection({ settings = {} }: { settings?: Record<string, string> }) {
  const staff   = settings.counter_staff     || "";
  const offices = settings.counter_offices   || "";
  const exp     = settings.counter_experience || "";

  return (
    <section className="py-24 bg-white">
      <div className="wrap">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: ảnh thật */}
          <div className="relative">
            {/* Ảnh chính */}
            <div className="relative w-full h-[460px] rounded-2xl overflow-hidden shadow-xl">
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
            <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-xl p-5 border border-gray-100">
              <div className="grid grid-cols-2 gap-4 text-center">
                {[
                  { n: staff,   l: "Chuyến hàng" },
                  { n: offices, l: "Văn phòng" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-extrabold text-navy-700">{s.n}</div>
                    <div className="text-xs text-navy-400 mt-0.5">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Badge kinh nghiệm */}
            <div className="absolute -top-5 -left-5 bg-orange-500 text-white rounded-2xl
                            shadow-lg px-5 py-3 text-center">
              <div className="text-3xl font-black leading-none">{exp}</div>
              <div className="text-orange-100 text-xs mt-0.5 font-medium">Năm kinh nghiệm</div>
            </div>
          </div>

          {/* Right: content */}
          <div>
            <p className="eyebrow mb-5">Về Chúng Tôi</p>
            <h2 className="h2 text-navy-800 mb-6">
              Mắt xích vận hành<br />
              <span className="text-grad">đáng tin cậy</span>
            </h2>

            <div className="flex flex-wrap gap-2 mb-7">
              {["High Delivery", "High Discipline", "High Reliability"].map((p) => (
                <span key={p}
                  className="text-xs font-bold tracking-wider uppercase px-3 py-1.5
                             bg-navy-50 border border-navy-200 text-navy-700 rounded-full">
                  {p}
                </span>
              ))}
            </div>

            <div className="space-y-4 text-navy-600 text-[0.95rem] leading-[1.85] mb-8">
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
                  <span className="text-navy-600 text-sm">{pt}</span>
                </div>
              ))}
            </div>

            <Link href="/about" className="btn-navy inline-flex">
              Tìm Hiểu Thêm <ArrowRight size={15} />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
