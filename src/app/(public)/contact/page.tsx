import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { fetchOffices, fetchContacts, fetchSettings } from "@/lib/api";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfoBlock from "@/components/contact/ContactInfoBlock";

export const metadata: Metadata = {
  title: "Liên Hệ",
  description:
    "Liên hệ HDT Logistics để nhận tư vấn vận chuyển và hải quan miễn phí — phản hồi trong 2 giờ làm việc.",
};

export default async function ContactPage() {
  const [offices, contacts, settings] = await Promise.all([
    fetchOffices(),
    fetchContacts(),
    fetchSettings(),
  ]);

  const hotline        = settings.hotline           || "";
  const hotlineRaw     = settings.hotline_raw        || "";
  const hotlineContact = settings.hotline_contact    || "";
  const hotlineContactRaw = settings.hotline_contact_raw || "";
  const emailSales     = settings.email_sales        || "";

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 relative overflow-hidden">
        <div className="wrap relative z-10">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-6" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Liên Hệ</span>
          </nav>
          <div className="max-w-2xl">
            <p className="eyebrow text-orange-400 mb-6">LIÊN HỆ</p>
            <h1 className="h1 text-white mb-4">
              Bắt đầu hợp tác<br />
              <span className="text-orange-400">cùng HDT Logistics</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed">
              Đội ngũ chuyên gia sẵn sàng phân tích nhu cầu và đề xuất phương án vận chuyển
              phù hợp — phản hồi trong vòng 2 giờ làm việc.
            </p>
          </div>
        </div>
      </section>

      {/* Quick contact strip */}
      <ContactInfoBlock
        hotline={hotline}
        hotlineRaw={hotlineRaw}
        hotlineContact={hotlineContact}
        hotlineContactRaw={hotlineContactRaw}
        emailSales={emailSales}
      />

      {/* Danh bạ người phụ trách */}
      {contacts.length > 0 && (
        <section className="py-16 bg-slate-50 border-b border-gray-100">
          <div className="wrap">
            <div className="text-center mb-10">
              <p className="eyebrow mb-3 justify-center">Đội Ngũ Hỗ Trợ</p>
              <h2 className="text-2xl font-extrabold text-navy-800">Người phụ trách từng khu vực</h2>
            </div>
            <div className="flex flex-wrap justify-center gap-4">
              {contacts.map((c: any) => (
                <div key={c.id} className="w-full sm:w-[calc(50%-8px)] lg:w-[220px] card p-5 text-center group shrink-0">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-600 to-navy-800
                                  text-white font-bold text-sm flex items-center justify-center mx-auto mb-4
                                  group-hover:scale-110 transition-transform">
                    {c.initials || c.fullName?.charAt(0) || "?"}
                  </div>
                  <p className="font-bold text-navy-800 text-sm mb-1">{c.fullName}</p>
                  <p className="text-orange-500 text-xs font-semibold mb-1">{c.title}</p>
                  <p className="text-navy-400 text-xs mb-3">{c.region}</p>
                  {c.email && (
                    <a href={`mailto:${c.email}`}
                      className="text-xs text-navy-500 hover:text-orange-500 transition-colors break-all">
                      {c.email}
                    </a>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Form + Offices */}
      <section className="py-20">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14">
            {/* Form gửi lead */}
            <ContactForm />

            {/* Hệ thống văn phòng */}
            <div>
              <p className="eyebrow mb-5">Hệ Thống Văn Phòng</p>

              {offices.length > 0 ? (
                <div className="space-y-4">
                  {/* Group offices by region */}
                  {["BAC", "TRUNG", "NAM"].map((regionCode, ri) => {
                    const regionLabel = regionCode === "BAC" ? "Miền Bắc"
                      : regionCode === "TRUNG" ? "Miền Trung" : "Miền Nam";
                    const regionOffices = offices.filter((o: any) => o.region === regionCode);
                    if (regionOffices.length === 0) return null;
                    return (
                      <div key={regionCode}>
                        <div className="flex items-center gap-2 mb-3">
                          <span className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center
                                           text-orange-600 text-xs font-bold">
                            {ri + 1}
                          </span>
                          <h3 className="font-extrabold text-navy-800 text-sm">{regionLabel}</h3>
                        </div>
                        <div className="space-y-3 pl-2">
                          {regionOffices.map((office: any, bi: number) => (
                            <div key={office.id}
                              className={`rounded-2xl p-5 border-2 transition-all
                                ${ri === 0 && bi === 0
                                  ? "border-navy-700 bg-navy-50"
                                  : "border-gray-100 bg-white shadow-card"}`}>
                              <p className={`font-bold text-sm mb-2 ${ri === 0 && bi === 0 ? "text-navy-700" : "text-navy-800"}`}>
                                {office.name}
                              </p>
                              <div className="flex gap-2 text-xs text-navy-500 mb-1.5">
                                <svg className="w-3 h-3 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                                <span>{office.address}</span>
                              </div>
                              <div className="flex gap-2 text-xs">
                                <svg className="w-3 h-3 text-orange-500 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                                <a href={`tel:${office.phone?.replace(/\s/g, "")}`}
                                  className="text-navy-500 hover:text-orange-500 transition-colors font-medium">
                                  TEL: {office.phone}
                                </a>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-navy-400 text-sm">Đang tải thông tin văn phòng...</p>
              )}

              {/* Emergency hotline */}
              <div className="mt-5 rounded-2xl bg-orange-500 p-6 text-white">
                <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-2">
                  Hỗ Trợ Khẩn Cấp 24/7
                </p>
                <a href={`tel:${hotlineRaw}`}
                  className="text-3xl font-extrabold block mb-1 hover:text-orange-100 transition-colors">
                  {hotline}
                </a>
                <p className="text-white/70 text-xs">
                  Xử lý phát sinh ngoài giờ và tình huống khẩn cấp
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
