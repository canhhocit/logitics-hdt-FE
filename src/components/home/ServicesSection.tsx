"use client";

import Link from "next/link";
import { ArrowRight, Plane, Ship, Boxes, Truck, FileText, Star } from "lucide-react";
import { services } from "@/data";

const iconMap: Record<string, React.ReactNode> = {
  plane:      <Plane size={28} />,
  ship:       <Ship size={28} />,
  boxes:      <Boxes size={28} />,
  truck:      <Truck size={28} />,
  "file-text":<FileText size={28} />,
  star:       <Star size={28} />,
};

const colorMap: Record<string, string> = {
  blue:   "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white",
  cyan:   "bg-cyan-50 text-cyan-600 group-hover:bg-cyan-600 group-hover:text-white",
  teal:   "bg-teal-50 text-teal-600 group-hover:bg-teal-600 group-hover:text-white",
  green:  "bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white",
  orange: "bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white",
  rose:   "bg-rose-50 text-rose-600 group-hover:bg-rose-600 group-hover:text-white",
};

export default function ServicesSection() {
  return (
    <section className="py-24 bg-slate-50">
      <div className="wrap">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="eyebrow mb-4">Dịch Vụ</p>
            <h2 className="h2 text-navy-800">
              6 giải pháp logistics<br />
              <span className="text-grad">theo nhu cầu thực tế</span>
            </h2>
          </div>
          <p className="text-navy-500 text-sm leading-relaxed max-w-sm md:text-right">
            Mỗi dịch vụ được tư vấn và thiết kế riêng cho từng doanh nghiệp —
            đảm bảo tiến độ, kiểm soát chi phí và minh bạch toàn trình.
          </p>
        </div>

        {/* M02.02.01 – Grid 6 thẻ dịch vụ */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <Link
              key={svc.slug}
              href={`/services/${svc.slug}`}
              className="svc-card group card p-7 flex flex-col gap-5"
            >
              {/* Số thứ tự (M02.02.01.01) */}
              <div className="flex items-start justify-between">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center
                                 transition-all duration-300 ${colorMap[svc.color]}`}>
                  {iconMap[svc.icon]}
                </div>
                <span className="text-5xl font-black text-navy-50 select-none leading-none group-hover:text-orange-100 transition-colors">
                  {svc.no}
                </span>
              </div>

              <div>
                <h3 className="font-bold text-navy-800 mb-2 group-hover:text-orange-500 transition-colors text-base">
                  {svc.title}
                </h3>
                <p className="text-navy-500 text-sm leading-relaxed line-clamp-3">
                  {svc.shortDesc}
                </p>
              </div>

              <div className="mt-auto flex items-center gap-1.5 text-sm font-semibold
                              text-navy-400 group-hover:text-orange-500 transition-colors">
                Xem chi tiết
                <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link href="/services" className="btn-outline">
            Xem Tất Cả Dịch Vụ <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}
