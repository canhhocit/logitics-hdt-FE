import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ChevronRight, MapPin, DollarSign, Briefcase, Calendar, CheckCircle, ArrowLeft, ArrowRight, Building2, ShieldCheck, Award } from "lucide-react";
import { fetchJobById, fetchJobs } from "@/lib/api";
import JobApplyForm from "./JobApplyForm";

export const dynamic = "force-dynamic";

function parseJsonArray(raw: string | null | undefined): string[] {
  if (!raw) return [];
  try { return JSON.parse(raw); } catch { return []; }
}

function formatDeadline(iso: string | null | undefined) {
  if (!iso) return "Đang nhận hồ sơ";
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")}/${String(d.getMonth() + 1).padStart(2, "0")}/${d.getFullYear()}`;
}

const JOB_TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Toàn thời gian",
  PART_TIME: "Bán thời gian",
  INTERNSHIP: "Thực tập sinh",
  CONTRACT: "Hợp đồng",
};

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const job = await fetchJobById(params.id);
  if (!job) {
    return { title: "Không tìm thấy tin tuyển dụng" };
  }
  return {
    title: `${job.title} – Tuyển Dụng | HDT Logistics`,
    description: job.description || `Cơ hội nghề nghiệp ${job.title} tại HDT Logistics`,
    openGraph: {
      title: `${job.title} – Tuyển Dụng HDT Logistics`,
      description: job.description || `Ứng tuyển vị trí ${job.title} tại HDT Logistics`,
      type: "article",
    },
  };
}

export default async function CareerDetailPage({ params }: { params: { id: string } }) {
  const [job, allJobs] = await Promise.all([
    fetchJobById(params.id),
    fetchJobs(),
  ]);

  if (!job) notFound();

  const requirements = parseJsonArray(job.requirements);
  const benefits = parseJsonArray(job.benefits);
  const otherJobs = (allJobs as any[])
    .filter((j: any) => j.id !== params.id)
    .slice(0, 3);

  return (
    <div className="bg-white">
      {/* Hero Banner */}
      <section className="hero-bg pt-36 pb-16 relative overflow-hidden">
        <div className="wrap relative z-10">
          <nav className="flex items-center gap-2 text-white/40 text-xs mb-6 flex-wrap" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-white transition-colors">Trang Chủ</Link>
            <ChevronRight size={12} />
            <Link href="/careers" className="hover:text-white transition-colors">Tuyển Dụng</Link>
            <ChevronRight size={12} />
            <span className="text-white/80 line-clamp-1">{job.title}</span>
          </nav>

          <div className="flex flex-wrap items-center gap-2.5 mb-4">
            <span className="bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              {job.department || "Tuyển dụng"}
            </span>
            <span className="bg-white/15 text-white/90 text-xs font-medium px-3 py-1 rounded-full border border-white/10">
              {JOB_TYPE_LABEL[job.jobType] || job.jobType}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-snug mb-5 max-w-4xl">
            {job.title}
          </h1>

          <div className="flex flex-wrap gap-5 text-white/70 text-sm">
            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-orange-400" />{job.location}</span>
            {job.salary && <span className="flex items-center gap-1.5"><DollarSign size={14} className="text-orange-400" />{job.salary}</span>}
            <span className="flex items-center gap-1.5"><Briefcase size={14} className="text-orange-400" />{JOB_TYPE_LABEL[job.jobType] || job.jobType}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} className="text-orange-400" />Hạn nộp: {formatDeadline(job.deadline)}</span>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_400px] gap-10">
            {/* Left Column: Job Details */}
            <div className="space-y-10 min-w-0">
              {job.description && (
                <div className="card p-7 sm:p-8">
                  <h2 className="font-extrabold text-navy-900 text-xl mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-orange-500 rounded-full inline-block" />
                    Mô tả công việc
                  </h2>
                  <div className="text-slate-600 text-sm sm:text-base leading-relaxed whitespace-pre-line">
                    {job.description}
                  </div>
                </div>
              )}

              {requirements.length > 0 && (
                <div className="card p-7 sm:p-8">
                  <h2 className="font-extrabold text-navy-900 text-xl mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-orange-500 rounded-full inline-block" />
                    Yêu cầu ứng viên
                  </h2>
                  <ul className="space-y-3.5">
                    {requirements.map((r: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                        <CheckCircle size={17} className="text-orange-500 flex-shrink-0 mt-0.5" />
                        <span className="leading-relaxed">{r}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {benefits.length > 0 && (
                <div className="card p-7 sm:p-8">
                  <h2 className="font-extrabold text-navy-900 text-xl mb-4 flex items-center gap-2">
                    <span className="w-1.5 h-6 bg-emerald-500 rounded-full inline-block" />
                    Quyền lợi & Phúc lợi
                  </h2>
                  <ul className="space-y-3">
                    {benefits.map((b: string, idx: number) => (
                      <li key={idx} className="flex items-start gap-3 text-sm sm:text-base text-slate-700">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 flex-shrink-0 mt-2" />
                        <span className="leading-relaxed">{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Recruitment Process */}
              <div className="card p-7 sm:p-8 bg-slate-50/70 border-slate-200/80">
                <h2 className="font-extrabold text-navy-900 text-lg mb-5">Quy trình ứng tuyển tại HDT</h2>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
                  {[
                    { step: "01", title: "Nộp CV", desc: "Online hoặc email" },
                    { step: "02", title: "Sàng lọc", desc: "Phản hồi trong 2-3 ngày" },
                    { step: "03", title: "Phỏng vấn", desc: "Trực tiếp / Online" },
                    { step: "04", title: "Nhận việc", desc: "Onboarding chu đáo" },
                  ].map((p) => (
                    <div key={p.step} className="bg-white rounded-xl p-4 border border-slate-200/60 shadow-2xs">
                      <span className="text-orange-500 font-extrabold text-base block mb-1">{p.step}</span>
                      <p className="font-bold text-navy-900 text-xs sm:text-sm">{p.title}</p>
                      <p className="text-[11px] text-slate-400 mt-1 leading-tight">{p.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href="/careers"
                  className="inline-flex items-center gap-2 text-navy-700 hover:text-orange-500 transition-colors text-sm font-semibold group"
                >
                  <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                  Xem tất cả vị trí tuyển dụng khác
                </Link>
              </div>
            </div>

            {/* Right Column: Apply Form & Company Meta */}
            <div className="space-y-6">
              <div className="sticky top-28 space-y-6">
                {/* Apply Form Component */}
                <JobApplyForm job={job} />

                {/* Company trust badge */}
                <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-5 space-y-3 text-xs text-slate-600">
                  <div className="flex items-center gap-2 text-navy-900 font-bold">
                    <Building2 size={15} className="text-navy-700" />
                    <span>Làm việc tại HDT Logistics</span>
                  </div>
                  <p className="text-slate-500 leading-relaxed">
                    Môi trường làm việc năng động, lộ trình phát triển rõ ràng, minh bạch với văn hóa High Delivery – High Discipline – High Transparency.
                  </p>
                  <div className="pt-2 border-t border-slate-200/60 flex items-center justify-between text-[11px] text-slate-400">
                    <span className="flex items-center gap-1"><ShieldCheck size={13} className="text-emerald-500" /> Bảo hiểm đầy đủ</span>
                    <span className="flex items-center gap-1"><Award size={13} className="text-orange-500" /> Thưởng KPI & Lễ tết</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Other Jobs Section */}
      {otherJobs.length > 0 && (
        <section className="py-16 bg-slate-50 border-t border-slate-200/80">
          <div className="wrap">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <div>
                <p className="text-orange-500 font-bold text-xs tracking-widest uppercase mb-1">Cơ hội việc làm</p>
                <h3 className="h3 text-navy-900">Các vị trí đang tuyển khác</h3>
              </div>
              <Link href="/careers" className="text-xs sm:text-sm font-semibold text-navy-700 hover:text-orange-500 transition-colors inline-flex items-center gap-1">
                Xem toàn bộ vị trí <ArrowRight size={14} />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {otherJobs.map((oj: any) => (
                <div key={oj.id} className="card p-5 hover:border-orange-200 transition-all flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span className="text-[10px] font-bold uppercase tracking-wider bg-navy-100 text-navy-700 px-2.5 py-0.5 rounded-full">
                        {oj.department}
                      </span>
                      <span className="text-[10px] font-medium text-slate-400">
                        {JOB_TYPE_LABEL[oj.jobType] || oj.jobType}
                      </span>
                    </div>
                    <Link href={`/careers/${oj.id}`} className="block group">
                      <h4 className="font-bold text-navy-900 text-sm mb-2 group-hover:text-orange-500 transition-colors line-clamp-2">
                        {oj.title}
                      </h4>
                    </Link>
                    <p className="text-xs text-slate-500 line-clamp-2 mb-3">
                      {oj.description}
                    </p>
                  </div>
                  <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                    <span className="text-slate-400 flex items-center gap-1">
                      <MapPin size={11} /> {oj.location}
                    </span>
                    <Link href={`/careers/${oj.id}`} className="font-semibold text-orange-500 hover:text-orange-600 inline-flex items-center gap-0.5">
                      Chi tiết <ChevronRight size={12} />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
