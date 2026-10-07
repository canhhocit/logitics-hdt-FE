"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertTriangle, XCircle } from "lucide-react";
import { submitLead } from "@/lib/api";

interface FormState {
  name: string;
  company: string;
  phone: string;
  email: string;
  service: string;
  message: string;
}

const INITIAL: FormState = {
  name: "", company: "", phone: "", email: "", service: "", message: "",
};

export default function ContactForm() {
  const [form, setForm]         = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]   = useState(false);
  const [error, setError]       = useState<string | null>(null);

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((p) => ({ ...p, [field]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const result = await submitLead({
      fullName:   form.name,
      phone:      form.phone,
      email:      form.email || undefined,
      company:    form.company || undefined,
      message:    `${form.service ? `[Dịch vụ: ${form.service}] ` : ""}${form.message}`,
      sourcePage: "/contact",
    });

    setLoading(false);
    if (result.ok) {
      setSubmitted(true);
    } else {
      setError(result.message || "Gửi thất bại, vui lòng thử lại.");
    }
  };

  if (submitted) {
    return (
      <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-500" />
        </div>
        <h3 className="text-xl font-bold text-navy-800 mb-2">Gửi thành công!</h3>
        <p className="text-navy-500 text-sm mb-6">
          Đội ngũ HDT Logistics sẽ liên hệ lại trong vòng 2 giờ làm việc.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm(INITIAL); }}
          className="btn-outline text-sm px-5 py-2.5"
        >
          Gửi yêu cầu khác
        </button>
      </div>
    );
  }

  return (
    <div>
      <p className="eyebrow mb-5">Gửi Yêu Cầu</p>
      <h2 className="h2 text-navy-800 mb-2">Nhận báo giá miễn phí</h2>
      <p className="text-navy-500 text-sm mb-7">
        Phản hồi trong <strong className="text-navy-700">2 giờ làm việc</strong>.
      </p>

      {/* Ghi chú phạm vi dịch vụ */}
      <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-4 mb-7">
        <AlertTriangle size={14} className="text-amber-500 flex-shrink-0 mt-0.5" />
        <p className="text-amber-700 text-xs leading-relaxed">
          <strong>Lưu ý:</strong> HDT Logistics chưa có dịch vụ chuyển phát hàng cá nhân
          và chuyển thư tín. Chúng tôi chuyên phục vụ khách hàng doanh nghiệp (B2B).
        </p>
      </div>

      {/* Error */}
      {error && (
        <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-xl p-4 mb-5">
          <XCircle size={14} className="text-red-500 flex-shrink-0" />
          <p className="text-red-700 text-xs">{error}</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Row 1: Họ tên + Công ty */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">
              Họ và tên *
            </label>
            <input type="text" required placeholder="Nguyễn Văn A"
              value={form.name} onChange={set("name")}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3
                         text-navy-800 text-sm placeholder:text-gray-300
                         focus:outline-none focus:border-navy-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">
              Công ty
            </label>
            <input type="text" placeholder="Tên công ty"
              value={form.company} onChange={set("company")}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3
                         text-navy-800 text-sm placeholder:text-gray-300
                         focus:outline-none focus:border-navy-500 transition-colors" />
          </div>
        </div>

        {/* Row 2: SĐT + Email */}
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">
              Số điện thoại *
            </label>
            <input type="tel" required placeholder="0901 234 567"
              value={form.phone} onChange={set("phone")}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3
                         text-navy-800 text-sm placeholder:text-gray-300
                         focus:outline-none focus:border-navy-500 transition-colors" />
          </div>
          <div>
            <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">
              Email
            </label>
            <input type="email" placeholder="email@ct.vn"
              value={form.email} onChange={set("email")}
              className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3
                         text-navy-800 text-sm placeholder:text-gray-300
                         focus:outline-none focus:border-navy-500 transition-colors" />
          </div>
        </div>

        {/* Dịch vụ */}
        <div>
          <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">
            Dịch vụ / Tuyến vận chuyển quan tâm
          </label>
          <select value={form.service} onChange={set("service")}
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

        {/* Nội dung */}
        <div>
          <label className="block text-xs font-bold tracking-wide uppercase text-navy-500 mb-2">
            Nội dung yêu cầu *
          </label>
          <textarea required rows={5}
            placeholder="Mô tả nhu cầu: loại hàng, điểm đi, điểm đến, tần suất, yêu cầu đặc biệt..."
            value={form.message} onChange={set("message")}
            className="w-full bg-white border-2 border-gray-200 rounded-xl px-4 py-3
                       text-navy-800 text-sm placeholder:text-gray-300 resize-none
                       focus:outline-none focus:border-navy-500 transition-colors" />
        </div>

        <button type="submit" disabled={loading}
          className="w-full btn-orange justify-center py-4 disabled:opacity-50">
          {loading ? (
            <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
          ) : (
            <><Send size={16} /> Gửi Yêu Cầu Tư Vấn</>
          )}
        </button>
      </form>
    </div>
  );
}
