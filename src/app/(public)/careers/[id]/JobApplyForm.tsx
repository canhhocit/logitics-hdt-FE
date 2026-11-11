"use client";

import { useState } from "react";
import { Send, CheckCircle, Phone, Mail } from "lucide-react";
import { submitLead } from "@/lib/api";

interface JobApplyFormProps {
  job: {
    id: string;
    title: string;
    department?: string;
  };
}

export default function JobApplyForm({ job }: JobApplyFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", cv: "", note: "" });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      const result = await submitLead({
        fullName: form.name,
        phone: form.phone,
        email: form.email || undefined,
        message: `[Ứng tuyển vị trí: ${job.title}]\nLời nhắn: ${form.note || "Không có"}\nLink CV: ${form.cv || "Không có"}`,
        sourcePage: `/careers/${job.id}`,
      });
      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.message || "Gửi hồ sơ thất bại. Vui lòng thử lại hoặc gửi qua email.");
      }
    } catch (err: any) {
      setError(err?.message || "Có lỗi kết nối xảy ra. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div id="apply" className="scroll-mt-32">
      <div className="card p-7 shadow-xs border border-slate-200">
        {submitted ? (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4 text-emerald-600">
              <CheckCircle size={32} />
            </div>
            <h3 className="font-bold text-navy-900 text-lg mb-2">Nộp hồ sơ thành công!</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Cảm ơn bạn đã ứng tuyển vị trí <strong className="text-navy-800">{job.title}</strong>. Đội ngũ nhân sự HDT Logistics sẽ xem xét hồ sơ và phản hồi trong vòng 2-3 ngày làm việc.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", phone: "", email: "", cv: "", note: "" });
              }}
              className="text-xs font-semibold text-orange-500 hover:text-orange-600 hover:underline"
            >
              Nộp thêm hồ sơ khác
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 pb-4 border-b border-slate-100">
              <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500">Ứng tuyển trực tuyến</span>
              <h3 className="font-bold text-navy-900 text-lg mt-0.5">{job.title}</h3>
              <p className="text-slate-500 text-xs mt-1">Điền thông tin bên dưới để gửi hồ sơ trực tiếp đến phòng nhân sự.</p>
            </div>

            {error && (
              <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-600 mb-1">
                  Họ và tên <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Nguyễn Văn A"
                  value={form.name}
                  onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 text-xs placeholder:text-slate-300 focus:outline-none focus:border-navy-500 transition-colors"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-600 mb-1">
                    Số điện thoại <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    placeholder="0911 188 726"
                    value={form.phone}
                    onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 text-xs placeholder:text-slate-300 focus:outline-none focus:border-navy-500 transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-600 mb-1">
                    Email <span className="text-rose-500">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="ungvien@gmail.com"
                    value={form.email}
                    onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                    className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 text-xs placeholder:text-slate-300 focus:outline-none focus:border-navy-500 transition-colors"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-600 mb-1">
                  Link CV / Hồ sơ năng lực (Google Drive, TopCV...)
                </label>
                <input
                  type="url"
                  placeholder="https://drive.google.com/..."
                  value={form.cv}
                  onChange={(e) => setForm((p) => ({ ...p, cv: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 text-xs placeholder:text-slate-300 focus:outline-none focus:border-navy-500 transition-colors"
                />
                <span className="text-[10px] text-slate-400 mt-0.5 block">Vui lòng mở quyền xem liên kết đối với file Google Drive.</span>
              </div>

              <div>
                <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-600 mb-1">
                  Thư xin việc / Giới thiệu ngắn
                </label>
                <textarea
                  rows={3}
                  placeholder="Kinh nghiệm nổi bật, lý do ứng tuyển..."
                  value={form.note}
                  onChange={(e) => setForm((p) => ({ ...p, note: e.target.value }))}
                  className="w-full bg-white border border-slate-200 rounded-lg px-3.5 py-2 text-slate-800 text-xs placeholder:text-slate-300 resize-none focus:outline-none focus:border-navy-500 transition-colors"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full btn-orange justify-center py-3 text-xs sm:text-sm font-bold disabled:opacity-50 shadow-xs cursor-pointer"
              >
                {submitting ? (
                  <span className="inline-flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Đang gửi hồ sơ...
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1.5">
                    <Send size={14} /> Gửi Hồ Sơ Ứng Tuyển
                  </span>
                )}
              </button>

              <div className="pt-3 border-t border-slate-100 text-[11px] text-slate-500 space-y-1">
                <p className="flex items-center gap-1.5">
                  <Mail size={12} className="text-orange-500" />
                  <span>Hoặc gửi CV qua: </span>
                  <a href="mailto:hdt.logistics.jsc@gmail.com" className="text-orange-600 font-semibold hover:underline">
                    hdt.logistics.jsc@gmail.com
                  </a>
                </p>
                <p className="flex items-center gap-1.5">
                  <Phone size={12} className="text-orange-500" />
                  <span>Hotline nhân sự: </span>
                  <a href="tel:0911188726" className="text-navy-700 font-semibold hover:underline">
                    0911 188 726
                  </a>
                </p>
              </div>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
