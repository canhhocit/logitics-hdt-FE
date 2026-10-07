import type { Metadata } from "next";
import Link from "next/link";
import { ChevronRight, MapPin, DollarSign, Briefcase, Calendar, ArrowRight } from "lucide-react";
import { fetchJobs } from "@/lib/api";

export const metadata: Metadata = {
  title: "Tuyển Dụng",
  description: "Cơ hội nghề nghiệp tại HDT Logistics — môi trường chuyên nghiệp, lộ trình phát triển rõ ràng.",
};

function parseJsonArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

function formatDeadline(iso: string | null | undefined) {
  if (!iso) return "";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

const JOB_TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  INTERNSHIP: "Thực tập sinh",
  CONTRACT: "Hợp đồng",
};

const BENEFITS_STATIC = [
  { emoji: "💰", title: "Thu nhập cạnh tranh",   desc: "Lương hấp dẫn, thưởng KPI hàng tháng, thưởng tháng 13 và phụ cấp đầy đủ." },
  { emoji: "📈", title: "Lộ trình thăng tiến",   desc: "Lộ trình phát triển rõ ràng, ưu tiên thăng tiến nội bộ, hỗ trợ học bổng đào tạo." },
  { emoji: "🛡️", title: "Phúc lợi toàn diện",   desc: "BHXH, BHYT, BHTN đầy đủ. Khám sức khỏe định kỳ, du lịch team building hàng năm." },
  { emoji: "🎓", title: "Đào tạo chuyên sâu",    desc: "Onboarding bài bản, đào tạo nghiệp vụ logistics và kỹ năng mềm liên tục." },
  { emoji: "⚽", title: "Văn hóa năng động",     desc: "Đội ngũ trẻ, sáng tạo, đoàn kết. Câu lạc bộ thể thao, sự kiện nội bộ thường xuyên." },
  { emoji: "🌱", title: "Môi trường xanh",        desc: "Cam kết xây dựng văn hóa làm việc lành mạnh, cởi mở và phát triển bền vững." },
];

export default async function CareersPage() {
  const jobs = await fetchJobs();

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="hero-bg pt-36 pb-24 relative overflow-hidden">
        <div className="wrap relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Tuyển Dụng</span>
          </div>
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="eyebrow text-orange-400 mb-6">GIA NHẬP ĐỘI NGŨ</p>
              <h1 className="h1 text-white mb-5">
                Xây dựng sự nghiệp<br />
                <span className="text-orange-400">cùng HDT Logistics</span>
              </h1>
              <p className="text-white/65 text-lg leading-relaxed">
                Chúng tôi tìm kiếm những tài năng đam mê logistics, làm việc có quy trình và muốn phát triển dài hạn trong một công ty ổn định, chuyên nghiệp.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { n: "200+",         l: "Nhân viên",           c: "bg-white/15 text-white" },
                { n: `${jobs.length}+`, l: "Vị trí tuyển dụng", c: "bg-orange-500 text-white" },
                { n: "95%",          l: "Nhân viên hài lòng",  c: "bg-white/10 text-white" },
                { n: "10+",          l: "Năm kinh nghiệm",     c: "bg-white/10 text-white" },
              ].map((s) => (
                <div key={s.l} className={`rounded-2xl p-5 text-center border border-white/10 ${s.c}`}>
                  <div className="text-2xl font-extrabold tracking-tight mb-1">{s.n}</div>
                  <div className="text-sm opacity-80">{s.l}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="py-20 bg-slate-50 border-b border-gray-100">
        <div className="wrap">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4 justify-center">Quyền Lợi & Phúc Lợi</p>
            <h2 className="h2 text-navy-800">Tại sao gia nhập HDT Logistics?</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {BENEFITS_STATIC.map((b) => (
              <div key={b.title} className="card p-7">
                <div className="text-3xl mb-4">{b.emoji}</div>
                <h3 className="font-bold text-navy-800 mb-2">{b.title}</h3>
                <p className="text-navy-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Jobs từ API */}
      <section className="py-20">
        <div className="wrap">
          <div className="text-center mb-12">
            <p className="eyebrow mb-4 justify-center">Cơ Hội Nghề Nghiệp</p>
            <h2 className="h2 text-navy-800">Vị trí đang tuyển dụng</h2>
          </div>

          {jobs.length === 0 ? (
            <div className="text-center py-16 text-navy-400 max-w-4xl mx-auto">
              <Briefcase size={40} className="mx-auto mb-4 opacity-30" />
              <p className="font-semibold mb-2">Hiện chưa có vị trí tuyển dụng mở</p>
              <p className="text-sm">Gửi CV để chúng tôi liên hệ khi có vị trí phù hợp.</p>
            </div>
          ) : (
            <div className="space-y-4 max-w-4xl mx-auto">
              {jobs.map((job: any) => {
                const requirements = parseJsonArray(job.requirements);
                return (
                  <div key={job.id} className="group card p-6">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-5">
                      <div className="flex-1">
                        <div className="flex flex-wrap gap-2 mb-3">
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-navy-100 text-navy-700 px-3 py-1 rounded-full">
                            {job.department}
                          </span>
                          <span className="text-[10px] font-bold tracking-widest uppercase bg-orange-50 text-orange-600 px-3 py-1 rounded-full border border-orange-200">
                            {JOB_TYPE_LABEL[job.jobType] || job.jobType}
                          </span>
                        </div>
                        <h3 className="font-bold text-navy-800 text-lg mb-3 group-hover:text-orange-500 transition-colors">
                          {job.title}
                        </h3>
                        <div className="flex flex-wrap gap-4 text-sm text-navy-400">
                          <span className="flex items-center gap-1.5"><MapPin size={13} />{job.location}</span>
                          {job.salary && <span className="flex items-center gap-1.5"><DollarSign size={13} />{job.salary}</span>}
                          {job.deadline && <span className="flex items-center gap-1.5"><Calendar size={13} />HSD: {formatDeadline(job.deadline)}</span>}
                        </div>
                        {job.description && (
                          <p className="text-navy-500 text-sm mt-3 leading-relaxed">{job.description}</p>
                        )}

                        {requirements.length > 0 && (
                          <details className="mt-4 group/d">
                            <summary className="cursor-pointer text-xs font-semibold text-navy-400 hover:text-orange-500 transition-colors list-none inline-flex items-center gap-1.5">
                              <ChevronRight size={12} className="group-open/d:rotate-90 transition-transform" />
                              Xem yêu cầu chi tiết
                            </summary>
                            <ul className="mt-3 space-y-2 pl-4 border-l-2 border-orange-100">
                              {requirements.map((r: string, i: number) => (
                                <li key={i} className="text-xs text-navy-500 leading-relaxed">{r}</li>
                              ))}
                            </ul>
                          </details>
                        )}
                      </div>

                      <Link href={`/contact?service=tuyen-dung&job=${job.id}`}
                        className="flex-shrink-0 btn-orange text-sm py-2.5 px-5 self-start">
                        Ứng Tuyển <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Open CTA */}
          <div className="mt-10 max-w-4xl mx-auto rounded-2xl bg-gradient-to-r from-navy-700 to-navy-900 p-8 text-center">
            <Briefcase size={36} className="text-white/20 mx-auto mb-4" />
            <h3 className="text-white font-extrabold text-xl mb-2">Không tìm thấy vị trí phù hợp?</h3>
            <p className="text-white/55 text-sm mb-6 max-w-md mx-auto">
              Gửi CV của bạn — chúng tôi luôn chào đón tài năng xuất sắc và sẽ liên hệ khi có vị trí phù hợp.
            </p>
            <a href="mailto:hr@hdtlogistics.vn" className="btn-orange inline-flex">
              Gửi CV Tự Nguyện <ArrowRight size={15} />
            </a>
            <p className="text-white/30 text-xs mt-3">hr@hdtlogistics.vn</p>
          </div>
        </div>
      </section>
    </div>
  );
}
