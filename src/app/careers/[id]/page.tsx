"use client";

import Link from "next/link";
import { notFound } from "next/navigation";
import { useState } from "react";
import { ChevronRight, MapPin, DollarSign, Briefcase, Calendar, Send, CheckCircle, ArrowLeft } from "lucide-react";
import { careers } from "@/data";

export default function CareerDetailPage({ params }: { params: { id: string } }) {
  const job = careers.find((c) => c.id === Number(params.id));
  if (!job) notFound();

  const [form, setForm] = useState({ name: "", phone: "", email: "", cv: "", note: "" });
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
      <section className="hero-bg pt-36 pb-16">
        <div className="wrap relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6 flex-wrap">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <Link href="/careers" className="hover:text-white">Tuyển Dụng</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">{job.title}</span>
          </div>
          <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1.5 rounded-full inline-block mb-5">
            {job.department}
          </span>
          <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight mb-5">{job.title}</h1>
          <div className="flex flex-wrap gap-5 text-white/60 text-sm">
            <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>
            <span className="flex items-center gap-1.5"><DollarSign size={13} />{job.salary}</span>
            <span className="flex items-center gap-1.5"><Briefcase size={13} />{job.type}</span>
            <span className="flex items-center gap-1.5"><Calendar size={13} />HSD: {job.deadline}</span>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_380px] gap-10">

            {/* Left */}
            <div className="space-y-8">
              <div>
                <h2 className="font-bold text-navy-800 text-xl mb-4">Mô tả công việc</h2>
                <p className="text-navy-500 text-sm leading-[1.85]">{job.description}</p>
              </div>
              <div>
                <h2 className="font-bold text-navy-800 text-xl mb-4">Yêu cầu ứng viên</h2>
                <ul className="space-y-3">
                  {job.requirements.map((r) => (
                    <li key={r} className="flex items-start gap-3 text-sm text-navy-500">
                      <CheckCircle size={15} className="text-orange-500 flex-shrink-0 mt-0.5" />
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h2 className="font-bold text-navy-800 text-xl mb-4">Quyền lợi</h2>
                <ul className="space-y-2.5">
                  {[
                    "Mức lương cạnh tranh, thưởng KPI hàng tháng",
                    "BHXH, BHYT, BHTN đầy đủ theo quy định",
                    "Thưởng tháng 13, thưởng lễ tết",
                    "Đào tạo chuyên môn nghiệp vụ logistics",
                    "Du lịch team building hàng năm",
                    "Lộ trình thăng tiến rõ ràng, ưu tiên nội bộ",
                  ].map((b) => (
                    <li key={b} className="flex items-center gap-2.5 text-sm text-navy-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500 flex-shrink-0" />{b}
                    </li>
                  ))}
                </ul>
              </div>
              <Link href="/careers"
                className="inline-flex items-center gap-2 text-navy-400 hover:text-orange-500 transition-colors text-sm font-semibold">
                <ArrowLeft size={14} /> Xem tất cả vị trí
              </Link>
            </div>

            {/* Right: form */}
            <div className="sticky top-28">
              <div className="card p-7">
                {submitted ? (
                  <div className="text-center py-6">
                    <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle size={28} className="text-green-500" />
                    </div>
                    <h3 className="font-bold text-navy-800 text-lg mb-2">Nộp hồ sơ thành công!</h3>
                    <p className="text-navy-500 text-sm">Chúng tôi sẽ liên hệ trong 3 ngày làm việc.</p>
                  </div>
                ) : (
                  <>
                    <h3 className="font-bold text-navy-800 text-lg mb-1">Ứng tuyển ngay</h3>
                    <p className="text-navy-400 text-xs mb-6 pb-4 border-b border-gray-100">{job.title}</p>
                    <form onSubmit={handleSubmit} className="space-y-4">
                      {[
                        { name: "name",  label: "Họ và tên *",     placeholder: "Nguyễn Văn A",            type: "text",  req: true  },
                        { name: "phone", label: "Điện thoại *",    placeholder: "0901 234 567",             type: "tel",   req: true  },
                        { name: "email", label: "Email *",          placeholder: "email@example.com",        type: "email", req: true  },
                        { name: "cv",    label: "Link CV (Google Drive, LinkedIn...)", placeholder: "https://...", type: "url", req: false },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="block text-[10px] font-bold tracking-widest uppercase text-navy-400 mb-1.5">{f.label}</label>
                          <input type={f.type} required={f.req} placeholder={f.placeholder}
                            value={form[f.name as keyof typeof form]}
                            onChange={(e) => setForm(p => ({ ...p, [f.name]: e.target.value }))}
                            className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5
                                       text-navy-800 text-sm placeholder:text-gray-300
                                       focus:outline-none focus:border-navy-500 transition-colors" />
                        </div>
                      ))}
                      <div>
                        <label className="block text-[10px] font-bold tracking-widest uppercase text-navy-400 mb-1.5">Thư xin việc</label>
                        <textarea rows={3} placeholder="Giới thiệu ngắn về bản thân và lý do ứng tuyển..."
                          value={form.note} onChange={(e) => setForm(p => ({ ...p, note: e.target.value }))}
                          className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-2.5
                                     text-navy-800 text-sm placeholder:text-gray-300 resize-none
                                     focus:outline-none focus:border-navy-500 transition-colors" />
                      </div>
                      <button type="submit" disabled={loading} className="w-full btn-orange justify-center py-3.5 disabled:opacity-50">
                        {loading
                          ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                          : <><Send size={15} />Nộp Hồ Sơ</>}
                      </button>
                      <p className="text-[10px] text-navy-400 text-center">
                        Hoặc gửi trực tiếp:{" "}
                        <a href="mailto:hr@hdtlogistics.vn" className="text-orange-500 font-semibold">hr@hdtlogistics.vn</a>
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
