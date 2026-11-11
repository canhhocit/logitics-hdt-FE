"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  MessageSquare, Briefcase, FileText, Settings, ArrowRight,
  Users, Clock, Phone, Mail, Building2, CheckCircle2, ChevronRight,
  Shield, Inbox, Layers
} from "lucide-react";
import { getStats, getAdminLeads, getAdminPosts, getAdminOffices } from "../_lib/api";

const STATUS_CONFIG: Record<string, { label: string; dot: string; badge: string }> = {
  NEW: {
    label: "Chờ liên hệ",
    dot: "bg-orange-500",
    badge: "bg-orange-50 text-orange-700 border-orange-200/60",
  },
  CONTACTED: {
    label: "Đã liên hệ",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200/60",
  },
  CLOSED: {
    label: "Đã xử lý",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
  },
};

function StatCard({ icon: Icon, label, value, sublabel, href, urgent = false }: {
  icon: any;
  label: string;
  value: any;
  sublabel?: string;
  href: string;
  urgent?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`bg-white rounded-lg p-4 sm:p-5 border transition-all duration-150 group relative
        ${urgent
          ? "border-orange-200 hover:border-orange-300 shadow-2xs"
          : "border-slate-200 hover:border-slate-300 shadow-2xs"}`}
    >
      <div className="flex items-center justify-between mb-2.5">
        <span className="text-xs font-semibold text-slate-500">{label}</span>
        <div className={`w-7 h-7 rounded-md flex items-center justify-center transition-colors
          ${urgent ? "bg-orange-50 text-orange-600" : "bg-slate-100 text-slate-600 group-hover:bg-navy-50 group-hover:text-navy-700"}`}>
          <Icon size={15} />
        </div>
      </div>
      <div className="flex items-baseline gap-2">
        <p className="text-2xl font-bold text-slate-900 tracking-tight">{value ?? "—"}</p>
        {sublabel && (
          <span className="text-[11px] font-medium text-slate-400">{sublabel}</span>
        )}
      </div>
      <div className="mt-2.5 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs font-medium text-slate-400 group-hover:text-navy-700 transition-colors">
        <span>Xem danh sách</span>
        <ArrowRight size={13} className="transition-transform group-hover:translate-x-0.5" />
      </div>
    </Link>
  );
}

const QUICK_ACTIONS = [
  { href: "/admin/posts",        label: "Soạn thảo bài viết mới",  icon: FileText,   desc: "Cập nhật tin tức logistics & xuất nhập khẩu" },
  { href: "/admin/leads",        label: "Xử lý yêu cầu tư vấn",    icon: MessageSquare, desc: "Theo dõi khách hàng gửi form liên hệ" },
  { href: "/admin/services",     label: "Quản lý dịch vụ",        icon: Briefcase,  desc: "Cước tàu, hải quan, vận tải nội địa" },
  { href: "/admin/settings",     label: "Cài đặt hotline & website", icon: Settings, desc: "Thông tin liên hệ, mạng xã hội, thông số" },
];

export default function AdminDashboard() {
  const [stats,   setStats]   = useState<any>({});
  const [leads,   setLeads]   = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getStats().catch(() => ({})),
      getAdminLeads(0, 6, "NEW").catch(() => ({ content: [] })),
      getAdminPosts(0, 1).catch(() => ({ totalElements: 0 })),
      getAdminOffices(0, 1).catch(() => ({ totalElements: 0 })),
    ]).then(([s, l, p, o]) => {
      const mergedStats = {
        ...s,
        totalPosts: (p as any)?.totalElements ?? (s as any)?.totalPosts ?? 0,
        totalOffices: (o as any)?.totalElements ?? (Array.isArray((o as any)?.content) ? (o as any).content.length : 0) ?? 0,
      };
      setStats(mergedStats);
      setLeads((l as any).content || []);
    }).finally(() => setLoading(false));
  }, []);

  const formatDate = (iso: string) => {
    if (!iso) return "";
    return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="space-y-6">
      {/* Page Title & Intro */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Trung tâm điều hành</h1>
          <p className="text-xs text-slate-500 mt-0.5">Tổng quan dữ liệu hoạt động và các mục cần xử lý hôm nay</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-500">
          <Clock size={13} className="text-slate-400" />
          <span>Cập nhật lúc: {new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })}</span>
        </div>
      </div>

      {/* Operational KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          icon={MessageSquare}
          label="Leads mới cần xử lý"
          value={loading ? "..." : (stats.newLeads ?? 0)}
          sublabel="yêu cầu chưa gọi"
          urgent={Boolean(stats.newLeads && stats.newLeads > 0)}
          href="/admin/leads"
        />
        <StatCard
          icon={Briefcase}
          label="Dịch vụ logistics"
          value={loading ? "..." : (stats.activeServices ?? 0)}
          sublabel="đang hiển thị"
          href="/admin/services"
        />
        <StatCard
          icon={FileText}
          label="Bài viết & Kiến thức"
          value={loading ? "..." : (stats.totalPosts ?? 0)}
          sublabel="nội dung xuất bản"
          href="/admin/posts"
        />
        <StatCard
          icon={Building2}
          label="Văn phòng & Chi nhánh"
          value={loading ? "..." : (stats.totalOffices ?? 0)}
          sublabel="trên toàn quốc"
          href="/admin/offices"
        />
      </div>

      {/* Main Two-Column Workflow Section */}
      <div className="grid lg:grid-cols-[1fr_360px] gap-5 items-start">
        {/* Left Column: Recent Customer Inquiries */}
        <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3.5 border-b border-slate-100">
            <div>
              <h2 className="font-semibold text-slate-900 text-sm">Khách hàng cần tư vấn mới nhất</h2>
              <p className="text-[11px] text-slate-500 mt-0.5">Yêu cầu báo giá và tư vấn dịch vụ từ form website</p>
            </div>
            <Link
              href="/admin/leads"
              className="text-xs text-navy-700 hover:text-navy-900 font-semibold inline-flex items-center gap-1 hover:underline"
            >
              <span>Xem tất cả</span>
              <ArrowRight size={12} />
            </Link>
          </div>

          {loading ? (
            <div className="p-10 text-center text-slate-400 text-xs">Đang tải dữ liệu leads...</div>
          ) : leads.length === 0 ? (
            <div className="p-10 text-center">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
                <Inbox size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-700">Không có lead mới nào tồn đọng</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Tất cả yêu cầu tư vấn đã được đội ngũ xử lý hoặc chưa phát sinh mới.</p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {leads.map((lead: any) => {
                const conf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;
                return (
                  <div key={lead.id} className="p-4 sm:px-5 hover:bg-slate-50/70 transition-colors flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="min-w-0 flex items-start gap-3">
                      <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-700 border border-navy-100 flex items-center justify-center font-bold text-xs flex-shrink-0 mt-0.5">
                        {lead.fullName?.charAt(0) || "?"}
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-slate-900 text-xs truncate">{lead.fullName}</p>
                          <span className={`inline-flex items-center gap-1 text-[10px] font-medium px-2 py-0.5 rounded-full border ${conf.badge}`}>
                            <span className={`w-1 h-1 rounded-full ${conf.dot}`} />
                            {conf.label}
                          </span>
                        </div>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] text-slate-500 mt-1">
                          <span className="flex items-center gap-1 font-mono text-slate-700">
                            <Phone size={11} className="text-slate-400" />
                            {lead.phone}
                          </span>
                          {lead.email && (
                            <span className="flex items-center gap-1 text-slate-500">
                              <Mail size={11} className="text-slate-400" />
                              {lead.email}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-3 text-right">
                      <span className="text-[10px] text-slate-400 font-mono">
                        {formatDate(lead.createdAt)}
                      </span>
                      <Link
                        href={`/admin/leads`}
                        className="text-xs font-semibold text-slate-700 bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 px-2.5 py-1 rounded-md transition-colors"
                      >
                        Chi tiết
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right Column: Quick Links & System Status */}
        <div className="space-y-4">
          {/* Quick Actions Card */}
          <div className="bg-white rounded-lg border border-slate-200 shadow-2xs p-4">
            <h2 className="font-semibold text-slate-900 text-sm mb-2.5">Lối tắt tác vụ</h2>
            <div className="space-y-1">
              {QUICK_ACTIONS.map(({ href, label, desc, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  className="flex items-center gap-2.5 p-2 rounded-md text-slate-700 hover:text-navy-900 hover:bg-slate-50 transition-colors group border border-transparent hover:border-slate-200/60"
                >
                  <div className="w-7 h-7 rounded-md bg-slate-100 group-hover:bg-navy-50 group-hover:text-navy-700 text-slate-500 flex items-center justify-center flex-shrink-0 transition-colors">
                    <Icon size={14} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold leading-tight">{label}</p>
                    <p className="text-[10px] text-slate-400 truncate leading-tight mt-0.5">{desc}</p>
                  </div>
                  <ChevronRight size={13} className="text-slate-300 group-hover:text-slate-500 transition-colors" />
                </Link>
              ))}
            </div>
          </div>

          
        </div>
      </div>
    </div>
  );
}
