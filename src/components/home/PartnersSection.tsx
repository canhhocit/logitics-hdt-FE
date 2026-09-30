"use client";

import { shippingLines, associations } from "@/data";

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="wrap">

        {/* M02.05 – 8 logo hãng tàu */}
        <div className="mb-14">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow mb-2">Đối Tác Vận Chuyển</p>
              <h3 className="text-xl font-bold text-navy-800">Hãng tàu & hãng bay đối tác</h3>
            </div>
            <p className="text-navy-400 text-sm max-w-xs md:text-right">
              Booking trực tiếp với các hãng tàu lớn — không qua trung gian
            </p>
          </div>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee gap-4 w-max">
              {[...shippingLines, ...shippingLines].map((name, i) => (
                <div key={i}
                  className="flex-shrink-0 h-14 px-8 bg-slate-50 border border-gray-200
                             rounded-xl flex items-center justify-center
                             hover:border-navy-300 hover:bg-navy-50 transition-colors">
                  <span className="text-navy-600 text-sm font-bold whitespace-nowrap tracking-wide">
                    {name}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>

        {/* M02.06 – 8 logo hiệp hội */}
        <div className="pt-10 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
            <div>
              <p className="eyebrow mb-2">Các Hiệp Hội</p>
              <h3 className="text-xl font-bold text-navy-800">Thành viên hiệp hội uy tín</h3>
            </div>
          </div>
          <p className="text-navy-500 text-sm leading-relaxed mb-8 max-w-2xl">
            HD Logistics tự hào là thành viên tích cực của nhiều Hiệp hội nổi tiếng về
            Logistics trong nước và quốc tế. Chúng tôi vinh dự được trao tặng những giải
            thưởng uy tín từ các Hiệp hội tham gia.
          </p>
          <div className="relative overflow-hidden">
            <div className="flex animate-marquee2 gap-4 w-max">
              {[...associations, ...associations].map((name, i) => (
                <div key={i}
                  className="flex-shrink-0 h-14 px-8 bg-orange-50 border border-orange-100
                             rounded-xl flex items-center justify-center
                             hover:border-orange-300 hover:bg-orange-100 transition-colors">
                  <span className="text-orange-700 text-sm font-bold whitespace-nowrap tracking-widest uppercase">
                    {name}
                  </span>
                </div>
              ))}
            </div>
            <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
