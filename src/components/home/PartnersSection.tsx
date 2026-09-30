"use client";

import Image from "next/image";

const shippingLines = [
  { name: "Yang Ming", logo: "/images/partners/yang-ming.svg" },
  { name: "SITC",     logo: "/images/partners/sitc.svg"      },
  { name: "RCL",      logo: "/images/partners/rcl.svg"       },
  { name: "PIL",      logo: "/images/partners/pil.svg"       },
  { name: "OOCL",     logo: "/images/partners/oocl.svg"      },
  { name: "ONE",      logo: "/images/partners/one.svg"       },
  { name: "COSCO",    logo: "/images/partners/cosco.svg"     },
  { name: "CMA CGM",  logo: "/images/partners/cma-cgm.svg"   },
];

const associations = [
  { name: "FIATA",  logo: "/images/associations/fiata.svg"  },
  { name: "IATA",   logo: "/images/associations/iata.svg"   },
  { name: "VIFFAS", logo: "/images/associations/viffas.svg" },
  { name: "VLA",    logo: "/images/associations/vla.svg"    },
  { name: "LOGNET", logo: "/images/associations/lognet.svg" },
  { name: "MLN",    logo: "/images/associations/mln.svg"    },
  { name: "WCA",    logo: "/images/associations/wca.svg"    },
  { name: "OLO",    logo: "/images/associations/olo.svg"    },
];

function LogoTrack({
  items,
  reverse = false,
}: {
  items: { name: string; logo: string }[];
  reverse?: boolean;
}) {
  const doubled = [...items, ...items]; // nhân đôi để marquee vô tận

  return (
    <div className="relative overflow-hidden">
      <div
        className={`flex gap-5 w-max ${
          reverse ? "animate-marquee2" : "animate-marquee"
        }`}
      >
        {doubled.map((item, i) => (
          <div
            key={i}
            className="flex-shrink-0 h-16 w-44 rounded-xl overflow-hidden border border-gray-200
                       bg-white shadow-sm hover:shadow-md hover:scale-105 transition-all duration-300"
          >
            <Image
              src={item.logo}
              alt={`Logo ${item.name}`}
              width={176}
              height={64}
              className="w-full h-full object-contain"
              unoptimized
            />
          </div>
        ))}
      </div>
      {/* Fade edges */}
      <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-white to-transparent pointer-events-none z-10" />
      <div className="absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-white to-transparent pointer-events-none z-10" />
    </div>
  );
}

export default function PartnersSection() {
  return (
    <section className="py-20 bg-white border-t border-gray-100">
      <div className="wrap">

        {/* ── Hãng tàu & hãng bay ── */}
        <div className="mb-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <p className="eyebrow mb-2">Đối Tác Vận Chuyển</p>
              <h3 className="text-xl font-bold text-navy-800">
                Hãng tàu & hãng bay đối tác
              </h3>
            </div>
            <p className="text-navy-400 text-sm max-w-xs md:text-right">
              Booking trực tiếp — không qua trung gian
            </p>
          </div>
          <LogoTrack items={shippingLines} />
        </div>

        {/* ── Các hiệp hội ── */}
        <div className="pt-12 border-t border-gray-100">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-4">
            <div>
              <p className="eyebrow mb-2">Các Hiệp Hội</p>
              <h3 className="text-xl font-bold text-navy-800">
                Thành viên hiệp hội uy tín
              </h3>
            </div>
          </div>
          <p className="text-navy-500 text-sm leading-relaxed mb-8 max-w-2xl">
            HDT Logistics tự hào là thành viên tích cực của nhiều Hiệp hội nổi tiếng về
            Logistics trong nước và quốc tế. Chúng tôi vinh dự được trao tặng những giải
            thưởng uy tín từ các Hiệp hội tham gia.
          </p>
          <LogoTrack items={associations} reverse />
        </div>

      </div>
    </section>
  );
}
