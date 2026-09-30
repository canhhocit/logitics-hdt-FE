import { MapPin, Phone } from "lucide-react";
import { offices } from "@/data";

/**
 * M01.03.01 / M07.02 – Hệ thống văn phòng dùng chung
 */
export default function OfficesBlock() {
  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="wrap">
        <div className="text-center mb-10">
          <p className="eyebrow mb-3 justify-center">Hệ Thống Văn Phòng</p>
          <h2 className="text-2xl font-extrabold text-navy-800">
            5 chi nhánh — 3 miền toàn quốc
          </h2>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {offices.map((region) => (
            <div key={region.region}>
              <div className="flex items-center gap-2 mb-5">
                <span className="w-7 h-7 bg-orange-500 rounded-lg flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
                  {region.region === "Miền Bắc" ? "B" : region.region === "Miền Trung" ? "T" : "N"}
                </span>
                <h3 className="font-extrabold text-navy-800">{region.region}</h3>
              </div>
              <div className="space-y-5">
                {region.branches.map((b) => (
                  <div key={b.name} className="pl-3 border-l-2 border-orange-100">
                    <p className="font-semibold text-navy-700 text-sm mb-1.5">{b.name}</p>
                    <div className="flex gap-2 text-xs text-navy-500 mb-1">
                      <MapPin size={11} className="text-orange-400 flex-shrink-0 mt-0.5" />
                      <span>{b.address}</span>
                    </div>
                    <div className="flex gap-2 text-xs">
                      <Phone size={11} className="text-orange-400 flex-shrink-0 mt-0.5" />
                      <a href={`tel:${b.telRaw}`} className="text-navy-500 hover:text-orange-500 transition-colors font-medium">
                        TEL: {b.tel}
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
