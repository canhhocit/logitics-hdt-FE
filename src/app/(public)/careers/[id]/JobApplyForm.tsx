"use client";

import { useState, useRef } from "react";
import { Send, CheckCircle, Phone, Mail, UploadCloud, FileText, X, Link as LinkIcon, Paperclip } from "lucide-react";
import { submitJobApplication } from "@/lib/api";

interface JobApplyFormProps {
  job: {
    id: string;
    title: string;
    department?: string;
  };
}

export default function JobApplyForm({ job }: JobApplyFormProps) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", note: "", cvUrl: "" });
  const [cvFile, setCvFile] = useState<File | null>(null);
  const [uploadMode, setUploadMode] = useState<"file" | "link">("file");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 10 * 1024 * 1024) {
        setError("Dung lượng file CV không được vượt quá 10MB");
        return;
      }
      setCvFile(file);
      setError(null);
    }
  };

  const removeFile = () => {
    setCvFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (uploadMode === "file" && !cvFile) {
      setError("Vui lòng đính kèm file CV của bạn (PDF, DOC, DOCX)");
      return;
    }

    if (uploadMode === "link" && (!form.cvUrl || !form.cvUrl.trim())) {
      setError("Vui lòng nhập đường dẫn liên kết đến CV của bạn");
      return;
    }

    setSubmitting(true);
    try {
      const result = await submitJobApplication({
        fullName: form.name,
        phone: form.phone,
        email: form.email || undefined,
        jobId: job.id,
        jobTitle: job.title,
        coverLetter: form.note || undefined,
        cvFile: uploadMode === "file" ? cvFile : null,
        cvUrl: uploadMode === "link" ? form.cvUrl.trim() : undefined,
      });

      if (result.ok) {
        setSubmitted(true);
      } else {
        setError(result.message || "Gửi hồ sơ thất bại. Vui lòng kiểm tra lại thông tin hoặc thử lại sau.");
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
            <h3 className="font-bold text-navy-900 text-lg mb-2">Nộp hồ sơ ứng tuyển thành công!</h3>
            <p className="text-slate-600 text-sm leading-relaxed mb-4">
              Cảm ơn bạn đã ứng tuyển vị trí <strong className="text-navy-800">{job.title}</strong> tại HDT Logistics. Phòng Nhân sự đã tiếp nhận hồ sơ và sẽ liên hệ phỏng vấn qua số điện thoại/email của bạn trong 2-3 ngày làm việc.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setForm({ name: "", phone: "", email: "", note: "", cvUrl: "" });
                setCvFile(null);
              }}
              className="text-xs font-semibold text-orange-500 hover:text-orange-600 hover:underline"
            >
              Nộp thêm hồ sơ vị trí khác
            </button>
          </div>
        ) : (
          <>
            <div className="mb-5 pb-4 border-b border-slate-100">
              <span className="text-[10px] font-bold tracking-widest uppercase text-orange-500">Ứng tuyển trực tuyến</span>
              <h3 className="font-bold text-navy-900 text-lg mt-0.5">{job.title}</h3>
              <p className="text-slate-500 text-xs mt-1">Điền thông tin và đính kèm CV để gửi hồ sơ trực tiếp đến phòng nhân sự.</p>
            </div>

            {error && (
              <div className="mb-4 text-xs text-red-600 bg-red-50 border border-red-200 rounded-lg p-3">
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div>
                <label className="block text-[11px] font-bold tracking-wider uppercase text-slate-600 mb-1">
                  Họ và tên ứng viên <span className="text-rose-500">*</span>
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

              {/* CV Attachment Section */}
              <div className="pt-1">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-[11px] font-bold tracking-wider uppercase text-slate-600">
                    Hồ sơ CV ứng tuyển <span className="text-rose-500">*</span>
                  </label>
                  <div className="inline-flex rounded-md p-0.5 bg-slate-100 border border-slate-200 text-[10px]">
                    <button
                      type="button"
                      onClick={() => setUploadMode("file")}
                      className={`px-2 py-0.5 rounded font-semibold transition-all ${
                        uploadMode === "file" ? "bg-white text-navy-800 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Tải file
                    </button>
                    <button
                      type="button"
                      onClick={() => setUploadMode("link")}
                      className={`px-2 py-0.5 rounded font-semibold transition-all ${
                        uploadMode === "link" ? "bg-white text-navy-800 shadow-2xs" : "text-slate-500 hover:text-slate-800"
                      }`}
                    >
                      Dán link
                    </button>
                  </div>
                </div>

                {uploadMode === "file" ? (
                  <div>
                    {!cvFile ? (
                      <div
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-slate-200 hover:border-orange-400 bg-slate-50/50 hover:bg-orange-50/20 rounded-xl p-4 text-center cursor-pointer transition-colors group"
                      >
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.doc,.docx"
                          onChange={handleFileChange}
                          className="hidden"
                        />
                        <div className="w-10 h-10 rounded-full bg-orange-100 text-orange-600 flex items-center justify-center mx-auto mb-2 group-hover:scale-105 transition-transform">
                          <UploadCloud size={20} />
                        </div>
                        <p className="text-xs font-semibold text-slate-700">
                          Nhấn để chọn file CV <span className="text-orange-500 font-bold">PDF, DOC, DOCX</span>
                        </p>
                        <p className="text-[11px] text-slate-400 mt-0.5">Dung lượng file tối đa 10MB</p>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-xl">
                        <div className="flex items-center gap-2.5 min-w-0">
                          <div className="w-8 h-8 rounded-lg bg-orange-100 text-orange-600 flex items-center justify-center flex-shrink-0">
                            <FileText size={16} />
                          </div>
                          <div className="min-w-0">
                            <p className="text-xs font-semibold text-slate-800 truncate">{cvFile.name}</p>
                            <p className="text-[10px] text-slate-400">
                              {(cvFile.size / (1024 * 1024)).toFixed(2)} MB
                            </p>
                          </div>
                        </div>
                        <button
                          type="button"
                          onClick={removeFile}
                          className="p-1 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          title="Xóa file"
                        >
                          <X size={15} />
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                        <LinkIcon size={13} />
                      </div>
                      <input
                        type="url"
                        placeholder="https://drive.google.com/..."
                        value={form.cvUrl}
                        onChange={(e) => setForm((p) => ({ ...p, cvUrl: e.target.value }))}
                        className="w-full bg-white border border-slate-200 rounded-lg pl-8 pr-3.5 py-2 text-slate-800 text-xs placeholder:text-slate-300 focus:outline-none focus:border-navy-500 transition-colors"
                      />
                    </div>
                    <span className="text-[10px] text-slate-400 mt-1 block">
                      Vui lòng mở quyền xem liên kết đối với file Google Drive / OneDrive.
                    </span>
                  </div>
                )}
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
