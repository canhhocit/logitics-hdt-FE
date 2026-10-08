"use client";

import Image from "next/image";

interface Partner {
  id: string;
  name: string;
  logo: string;
  type: string;
  url?: string;
}

function LogoTrack({ items, reverse = false }: { items: Partner[]; reverse?: boolean }) {
  const doubled = [...items, ...items];
  return (
    <div className="relative overflow-hidden">
      <div className={`flex gap-5 w-max ${reverse ? "animate-marquee2" : "animate-marquee"}`}>
        {doubled.map((item, i) => (
          <div key={i}
            className="flex-shrink-0 h-16 w-44 rounded-xl overflow-hidden border border-gray-200
                       bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300">
            <Image
              src={item.logo}
              alt={`Logo ${item.name}`}
              width={176} height={64}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}

// Fallback khi API trả rỗng
const CARRIERS_FALLBACK: Partner[] = [
  { id: "1", name: "Yang Ming", logo: "/images/partners/yang-ming.svg", type: "CARRIER" },
  { id: "2", name: "SITC",      logo: "/images/partners/sitc.svg",      type: "CARRIER" },
  { id: "3", name: "OOCL",      logo: "/images/partners/oocl.svg",      type: "CARRIER" },
  { id: "4", name: "CMA CGM",   logo: "/images/partners/cma-cgm.svg",   type: "CARRIER" },
  { id: "5", name: "ONE",       logo: "/images/partners/one.svg",        type: "CARRIER" },
  { id: "6", name: "COSCO",     logo: "/images/partners/cosco.svg",      type: "CARRIER" },
];
const ASSOC_FALLBACK: Partner[] = [
  { id: "7",  name: "FIATA",  logo: "/images/associations/fiata.svg",  type: "ASSOCIATION" },
  { id: "8",  name: "IATA",   logo: "/images/associations/iata.svg",   type: "ASSOCIATION" },
  { id: "9",  name: "VIFFAS", logo: "/images/associations/viffas.svg", type: "ASSOCIATION" },
  { id: "10", name: "VLA",    logo: "/images/associations/vla.svg",    type: "ASSOCIATION" },
];

export default function PartnersSection({ partners = [] }: { partners?: Partner[] }) {
  const carriers = partners.filter((p) => p.type === "CARRIER");
  const assoc    = partners.filter((p) => p.type === "ASSOCIATION");

  const shippingLines = carriers.length > 0 ? carriers : CARRIERS_FALLBACK;
  const associations  = assoc.length    > 0 ? assoc    : ASSOC_FALLBACK;

  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="wrap">
        {/* Hãng tàu & hãng bay */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow mb-2">Đối Tác</p>
              <h3 className="text-xl font-bold text-navy-800">Đối tác vận chuyển của chúng tôi</h3>
            </div>
            <p className="text-navy-400 text-sm max-w-xs md:text-right">Phối hợp với các đối tác hàng đầu để mang lại dịch vụ tốt nhất</p>
          </div>
          <LogoTrack items={shippingLines} />
        </div>

        
      </div>
    </section>
  );
}
