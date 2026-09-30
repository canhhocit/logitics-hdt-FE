"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Phone, Mail, MapPin, Send, CheckCircle, AlertTriangle } from "lucide-react";
import { company, contacts, offices } from "@/data";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "", company: "", phone: "", email: "", service: "", message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { setLoading(false); setSubmitted(true); }, 1200);
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="hero-bg py-20 relative overflow-hidden">
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
              <span className="text-orange-400">cùng HD Logistics</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed">
              Đội ngũ chuyên gia sẵn sàng phân tích nhu cầu và đề xuất phương án vận chuyển
              phù hợp — phản hồi trong vòng 2 giờ làm việc.
            </p>
          </div>
        </div>
      </section>

      {/* Quick contact strip */}
      <div className="bg-navy-800 border-b border-white/10">
        <div className="wrap">
          <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
            {[
              { icon: <Phone size={15} />, label: "Hotline",     val: company.hotline,       href: `tel:${company.hotlineRaw}` },
              { icon: <Phone size={15} />, label: "Liên hệ",     val: company.hotlineContact, href: `tel:${company.hotlineContactRaw}` },
              { icon: <Mail  size={15} />, label: "Email",        val: company.emailSales,    href: `mailto:${company.emailSales}` },
            ].map((item) => (
              <div key={item.label} className="flex items-center gap-4 px-8 py-5">
                <div className="w-9 h-9 bg-orange-500/20 border border-orange-500/30 rounded-xl
                                flex items-center justify-center text-orange-400 flex-shrink-0">
                  {item.icon}
                </div>
                <div>
                  <p className="text-white/40 text-xs mb-0.5">{item.label}</p>
                  <a href={item.href}
                    className="text-white font-semibold text-sm hover:text-orange-400 transition-colors">
                    {item.val}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* M07.01 – Danh bạ người phụ trách */}
      <section className="py-16 bg-slate-50 border-b border-gray-100">
        <div className="wrap">
          <div className="text-center mb-10">
            <p className="eyebrow mb-3 justify-center">Đội Ngũ Hỗ Trợ</p>
            <h2 className="text-2xl font-extrabold text-navy-800">Người phụ trách từng khu vực</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {contacts.map((c) => (
              <div key={c.name} className="card p-5 text-center group">
                <div className="w-14 h-14 rounded-full bg-gradient-to-br from-navy-600 to-navy-800
                                text-white font-bold text-sm flex items-center justify-center mx-auto mb-4
                                group-hover:scale-110 transition-transform">
                  {c.initials}
                </div>
                <p className="font-bold text-navy-800 text-sm mb-1">{c.name}</p>
                <p className="text-orange-500 text-xs font-semibold mb-1">{c.title}</p>
                <p className="text-navy-400 text-xs mb-3">{c.region}</p>
                <a href={`mailto:${c.email}`}
                  className="text-xs text-navy-500 hover:text-orange-500 transition-colors break-all">
                  {c.email}
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Info */}
      <section className="py-20">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-14">

            {/* Form (M08.02) */}
            <div>
              <p className="eyebrow mb-5">Gửi Yêu Cầu</p>
              <h2 className="h2 text-navy-800 mb-2">Nhận báo giá miễn phí</h2>
              <p className="text-navy-500 text-sm mb-7">
                Phản hồi trong <strong className="text-navy-700">2 giờ làm việc</strong>.
              </p>

              {/* M08.01.02.02 – Note phạm vi dịch vụ */}
              <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-7">
                <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
                <p className="text-amber-700 text-xs leading-relaxed">
                  <strong>Lưu ý:</strong> HD Logistics chưa có dịch vụ chuyển phát hàng cá nhân
                  và chuyển thư tín. Chúng tôi chuyên phục vụ khách hàng doanh nghiệp (B2B).
                </p>
              </div>

              {submitted ? (
                <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle size={32} className="text-green-500" />
                  </div>
                  <h3 className="text-xl font-bold text-navy-800 mb-2">Gửi thành công!</h3>
                  <p className="text-navy-500 text-sm mb-6">
                    Đội ngũ HD Logistics sẽ liên hệ lại trong vòng 2 giờ làm việc.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: "", company: "", phone: "", email: "", service: "", message: "" }); }}
                    className="btn-outline text-sm px-5 py-2.5">
                    Gửi yêu cầu khác
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: "name",    label: "Họ và tên *",  placeholder: "Nguyễn Văn A",   type: "text",  req: true  },
                      { name: "company", label: "Công ty",       placeholder: "Tên công ty",    type: "text",  req: false },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">{f.label}</label>
                        <input type={f.type} required={f.req} placeholder={f.placeholder}
                          value={form[f.name as keyof typeof form]}
                          onChange={(e) => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3
                                     text-navy-800 text-sm placeholder:text-gray-300
                                     focus:outline-none focus:border-navy-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {[
                      { name: "phone", label: "Số điện thoại *", placeholder: "0901 234 567", type: "tel",   req: true  },
                      { name: "email", label: "Email",            placeholder: "email@ct.vn",  type: "email", req: false },
                    ].map((f) => (
                      <div key={f.name}>
                        <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">{f.label}</label>
                        <input type={f.type} required={f.req} placeholder={f.placeholder}
                          value={form[f.name as keyof typeof form]}
                          onChange={(e) => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3
                                     text-navy-800 text-sm placeholder:text-gray-300
                                     focus:outline-none focus:border-navy-500 transition-colors" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">
                      Dịch vụ / Tuyến vận chuyển quan tâm
                    </label>
                    <select value={form.service}
                      onChange={(e) => setForm(p => ({ ...p, service: e.target.value }))}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3
                                 text-navy-800 text-sm focus:outline-none focus:border-navy-500 transition-colors">
                      <option value="">-- Chọn dịch vụ --</option>
                      <option>Vận Chuyển Đường Không</option>
                      <option>Vận Chuyển Đường Biển – FCL</option>
                      <option>Vận Chuyển Đường Biển – LCL</option>
                      <option>Gom Hàng Lẻ (LCL)</option>
                      <option>Vận Chuyển Đường Bộ</option>
                      <option>Khai Thuê Hải Quan</option>
                      <option>Hàng Đặc Biệt / Dự Án</option>
                      <option>Tư Vấn Hải Quan</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">
                      Nội dung yêu cầu *
                    </label>
                    <textarea required rows={5}
                      placeholder="Mô tả nhu cầu: loại hàng, điểm đi, điểm đến, tần suất, yêu cầu đặc biệt..."
                      value={form.message}
                      onChange={(e) => setForm(p => ({ ...p, message: e.target.value }))}
                      className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3
                                 text-navy-800 text-sm placeholder:text-gray-300 resize-none
                                 focus:outline-none focus:border-navy-500 transition-colors" />
                  </div>
                  <button type="submit" disabled={loading}
                    className="w-full btn-orange justify-center py-4 disabled:opacity-50">
                    {loading
                      ? <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                      : <><Send size={16} />Gửi Yêu Cầu Tư Vấn</>}
                  </button>
                </form>
              )}
            </div>

            {/* M07.02 – Hệ thống văn phòng */}
            <div>
              <p className="eyebrow mb-5">Hệ Thống Văn Phòng</p>
              <div className="space-y-4">
                {offices.map((region, ri) => (
                  <div key={region.region}>
                    <div className="flex items-center gap-2 mb-3">
                      <span className="w-6 h-6 bg-orange-100 rounded-lg flex items-center justify-center
                                       text-orange-600 text-xs font-bold">
                        {ri + 1}
                      </span>
                      <h3 className="font-extrabold text-navy-800 text-sm">{region.region}</h3>
                    </div>
                    <div className="space-y-3 pl-2">
                      {region.branches.map((b, bi) => (
                        <div key={b.name}
                          className={`rounded-2xl p-5 border-2 transition-all
                            ${ri === 0 && bi === 0 ? "border-navy-700 bg-navy-50" : "border-gray-100 bg-white shadow-card"}`}>
                          <p className={`font-bold text-sm mb-2 ${ri === 0 && bi === 0 ? "text-navy-700" : "text-navy-800"}`}>
                            {b.name}
                          </p>
                          <div className="flex gap-2 text-xs text-navy-500 mb-1.5">
                            <MapPin size={11} className="text-orange-500 flex-shrink-0 mt-0.5" />
                            <span>{b.address}</span>
                          </div>
                          <div className="flex gap-2 text-xs">
                            <Phone size={11} className="text-orange-500 flex-shrink-0 mt-0.5" />
                            <a href={`tel:${b.telRaw}`}
                              className="text-navy-500 hover:text-orange-500 transition-colors font-medium">
                              TEL: {b.tel}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Emergency hotline */}
              <div className="mt-5 rounded-2xl bg-orange-500 p-6 text-white">
                <p className="text-white/70 text-xs font-bold tracking-widest uppercase mb-2">
                  Hỗ Trợ Khẩn Cấp 24/7
                </p>
                <a href={`tel:${company.hotlineRaw}`}
                  className="text-3xl font-extrabold block mb-1 hover:text-orange-100 transition-colors">
                  {company.hotline}
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
