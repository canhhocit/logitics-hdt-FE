"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { MessageSquare, Briefcase, FileText, Settings, ArrowRight, TrendingUp, Users, Clock } from "lucide-react";
import { getStats, getAdminLeads } from "../_lib/api";

const STATUS_LABEL: Record<string, string> = { NEW: "Mới", CONTACTED: "Đã liên hệ", CLOSED: "Đã đóng" };
const STATUS_COLOR: Record<string, string> = {
  NEW:       "bg-blue-100 text-blue-700",
  CONTACTED: "bg-amber-100 text-amber-700",
  CLOSED:    "bg-green-100 text-green-700",
};

function StatCard({ icon: Icon, label, value, color, href }: any) {
  return (
    <Link href={href}
      className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm
                 hover:shadow-md hover:-translate-y-0.5 transition-all group">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${color}`}>
          <Icon size={22} />
        </div>
        <ArrowRight size={14} className="text-gray-300 group-hover:text-gray-500 group-hover:translate-x-0.5 transition-all" />
      </div>
      <p className="text-3xl font-extrabold text-gray-800 mb-1">{value ?? "—"}</p>
      <p className="text-sm text-gray-500">{label}</p>
    </Link>
  );
}

const QUICK = [
  { href: "/admin/posts",        label: "Viết bài mới",       icon: FileText },
  { href: "/admin/services",     label: "Quản lý dịch vụ",    icon: Briefcase },
  { href: "/admin/settings",     label: "Cài đặt website",    icon: Settings },
  { href: "/admin/jobs",         label: "Đăng tuyển dụng",    icon: Users },
];

export default function AdminDashboard() {
  const [stats,  setStats]  = useState<any>({});
  const [leads,  setLeads]  = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getStats().catch(() => ({})),
      getAdminLeads(0, 5, "NEW").catch(() => ({ content: [] })),
    ]).then(([s, l]) => {
      setStats(s || {});
      setLeads((l as any).content || []);
    }).finally(() => setLoading(false));
  }, []);

  const formatDate = (iso: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl font-extrabold text-gray-800">Tổng quan</h1>
        <p className="text-gray-500 text-sm mt-1">Chào mừng trở lại — đây là tóm tắt hệ thống hôm nay.</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
        <StatCard icon={MessageSquare} label="Leads mới chờ xử lý" value={loading ? "..." : stats.newLeads}
          color="bg-blue-100 text-blue-600" href="/admin/leads" />
        <StatCard icon={Briefcase} label="Dịch vụ đang hiển thị" value={loading ? "..." : stats.activeServices}
          color="bg-indigo-100 text-indigo-600" href="/admin/services" />
        <StatCard icon={TrendingUp} label="Lượt truy cập (mock)" value={loading ? "..." : stats.totalVisits}
          color="bg-emerald-100 text-emerald-600" href="/admin" />
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Recent Leads */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
            <h2 className="font-bold text-gray-800">Leads mới gần đây</h2>
            <Link href="/admin/leads" className="text-xs text-indigo-600 hover:text-indigo-700 font-semibold flex items-center gap-1">
              Xem tất cả <ArrowRight size={11} />
            </Link>
          </div>
          {loading ? (
            <div className="p-8 text-center text-gray-400 text-sm">Đang tải...</div>
          ) : leads.length === 0 ? (
            <div className="p-8 text-center">
              <MessageSquare size={32} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 text-sm">Chưa có lead mới nào</p>
            </div>
          ) : (
            <div className="divide-y divide-gray-50">
              {leads.map((lead: any) => (
                <div key={lead.id} className="flex items-center gap-4 px-6 py-4 hover:bg-gray-50 transition-colors">
                  <div className="w-9 h-9 bg-blue-100 rounded-full flex items-center justify-center text-blue-700 font-bold text-sm flex-shrink-0">
                    {lead.fullName?.charAt(0) || "?"}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-800 text-sm truncate">{lead.fullName}</p>
                    <p className="text-gray-400 text-xs truncate">{lead.phone} {lead.email ? `· ${lead.email}` : ""}</p>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${STATUS_COLOR[lead.status] || "bg-gray-100 text-gray-500"}`}>
                      {STATUS_LABEL[lead.status] || lead.status}
                    </span>
                    <p className="text-gray-300 text-[10px] mt-1 flex items-center gap-1 justify-end">
                      <Clock size={9} />{formatDate(lead.createdAt)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Quick actions */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
            <h2 className="font-bold text-gray-800 mb-4">Thao tác nhanh</h2>
            <div className="space-y-2">
              {QUICK.map(({ href, label, icon: Icon }) => (
                <Link key={href} href={href}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-indigo-50 hover:text-indigo-700
                             text-gray-600 text-sm font-medium transition-colors group">
                  <Icon size={15} className="text-gray-400 group-hover:text-indigo-500 transition-colors" />
                  {label}
                  <ArrowRight size={12} className="ml-auto text-gray-200 group-hover:text-indigo-400 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          {/* Info box */}
          <div className="bg-indigo-600 rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-2 text-sm">💡 Mọi thay đổi là real-time</h3>
            <p className="text-white/70 text-xs leading-relaxed">
              Tất cả nội dung chỉnh sửa tại đây sẽ phản ánh ngay lên website client mà không cần deploy lại.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
