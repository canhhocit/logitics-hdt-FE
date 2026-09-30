"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const services = [
  {
    no: "01",
    slug: "van-chuyen-duong-khong",
    title: "Vận Chuyển Đường Không",
    desc: "Air freight quốc tế tốc độ cao — phù hợp hàng giá trị, hàng gấp. Kết nối 50+ hãng bay, tracking AWB real-time.",
    image: "/images/services/air-freight.jpg",
    alt: "Máy bay chở hàng vận chuyển hàng không quốc tế",
    badge: "Express 1–3 ngày",
  },
  {
    no: "02",
    slug: "van-chuyen-duong-bien",
    title: "Vận Chuyển Đường Biển",
    desc: "FCL & LCL tới 100+ cảng biển. Booking Yang Ming, SITC, CMA CGM trực tiếp — không qua trung gian.",
    image: "/images/services/sea-freight.jpg",
    alt: "Tàu container vận chuyển hàng hóa đường biển quốc tế",
    badge: "FCL & LCL",
  },
  {
    no: "03",
    slug: "gom-hang-le-lcl",
    title: "Gom Hàng Lẻ (LCL)",
    desc: "Ghép hàng lẻ vào container chung, tính cước theo CBM. Lịch gom hàng cố định hàng tuần.",
    image: "/images/services/lcl.jpg",
    alt: "Kho phân loại hàng lẻ LCL trước khi đóng container",
    badge: "Từ 0.1 CBM",
  },
  {
    no: "04",
    slug: "van-chuyen-duong-bo",
    title: "Vận Chuyển Đường Bộ",
    desc: "63 tỉnh thành nội địa và xuyên biên giới ASEAN, Trung Quốc. Xe 1–40 tấn, GPS 24/7.",
    image: "/images/services/road.jpg",
    alt: "Xe container vận chuyển đường bộ Bắc Nam Việt Nam",
    badge: "Door-to-door",
  },
  {
    no: "05",
    slug: "khai-thue-hai-quan",
    title: "Khai Thuê Hải Quan",
    desc: "Khai báo VNACCS, phân luồng, thông quan. Hồ sơ rà soát 2 cấp — tỷ lệ thông quan lần đầu >95%.",
    image: "/images/services/customs.jpg",
    alt: "Chuyên viên hải quan khai báo tờ khai điện tử VNACCS",
    badge: "Thông quan >95%",
  },
  {
    no: "06",
    slug: "hang-dac-biet-du-an",
    title: "Hàng Đặc Biệt / Dự Án",
    desc: "Hàng OOG siêu trường siêu trọng, thiết bị dự án, hàng nguy hiểm. Lập kế hoạch chi tiết, an toàn tuyệt đối.",
    image: "/images/services/project-cargo.jpg",
    alt: "Vận chuyển hàng siêu trường siêu trọng dự án công nghiệp",
    badge: "OOG & Heavy lift",
  },
];

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
            Mỗi dịch vụ được tư vấn và thiết kế riêng — đảm bảo tiến độ, kiểm soát chi phí và minh bạch toàn trình.
          </p>
        </div>

        {/* Grid với ảnh thật */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((svc) => (
            <Link key={svc.slug} href={`/services/${svc.slug}`}
              className="group card overflow-hidden flex flex-col">

              {/* Ảnh thật */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={svc.image}
                  alt={svc.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={80}
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/60 to-transparent" />
                {/* Badge */}
                <div className="absolute top-3 right-3">
                  <span className="bg-orange-500 text-white text-[10px] font-bold
                                   px-2.5 py-1 rounded-full shadow-sm">
                    {svc.badge}
                  </span>
                </div>
                {/* Number */}
                <div className="absolute bottom-3 left-4">
                  <span className="text-5xl font-black text-white/20 leading-none select-none">
                    {svc.no}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-navy-800 mb-2 group-hover:text-orange-500
                               transition-colors text-base leading-snug">
                  {svc.title}
                </h3>
                <p className="text-navy-500 text-sm leading-relaxed line-clamp-2 flex-1">
                  {svc.desc}
                </p>
                <div className="flex items-center gap-1.5 mt-4 text-sm font-semibold
                                text-navy-400 group-hover:text-orange-500 transition-colors">
                  Xem chi tiết
                  <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                </div>
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
