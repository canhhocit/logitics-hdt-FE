"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastProvider } from "../_components/Toast";
import {
  LayoutDashboard, MessageSquare, Briefcase, FileText,
  Settings, Building2, Users, BriefcaseBusiness,
  LogOut, ChevronRight, Menu, X,
  Quote, Globe, Award, Sparkles, FolderOpen, ExternalLink,
  ShieldCheck, Circle
} from "lucide-react";

interface NavGroupItem {
  divider?: false;
  href: string;
  label: string;
  icon: any;
  badge?: string;
}

interface NavDividerItem {
  divider: true;
  label: string;
}

type NavEntry = NavGroupItem | NavDividerItem;

const NAV: NavEntry[] = [
  { href: "/admin",               label: "Dashboard",            icon: LayoutDashboard },
  { href: "/admin/leads",         label: "Leads tư vấn",         icon: MessageSquare,  badge: "Mới" },
  { divider: true, label: "Quản lý nội dung" },
  { href: "/admin/posts",         label: "Bài viết & Tin tức",   icon: FileText },
  { href: "/admin/categories",    label: "Chuyên mục",            icon: FolderOpen },
  { href: "/admin/services",      label: "Dịch vụ logistics",     icon: Briefcase },
  { divider: true, label: "Thông tin doanh nghiệp" },
  { href: "/admin/offices",       label: "Văn phòng chi nhánh",  icon: Building2 },
  { href: "/admin/contacts",      label: "Nhân sự phụ trách",    icon: Users },
  { href: "/admin/jobs",          label: "Tuyển dụng",            icon: BriefcaseBusiness },
  { divider: true, label: "Truyền thông website" },
  { href: "/admin/testimonials",  label: "Đánh giá khách hàng",  icon: Quote },
  { href: "/admin/partners",      label: "Đối tác & Hiệp hội",   icon: Globe },
  { href: "/admin/awards",        label: "Giải thưởng & Chứng chỉ", icon: Award },
  { href: "/admin/company-values",label: "Giá trị cốt lõi",      icon: Sparkles },
  { divider: true, label: "Hệ thống" },
  { href: "/admin/settings",      label: "Cài đặt chung",        icon: Settings },
];

function NavItem({ item, pathname, onClick }: { item: NavEntry; pathname: string; onClick?: () => void }) {
  if (item.divider) {
    return (
      <div className="pt-4 pb-1.5 px-3">
        <p className="text-[10px] font-semibold tracking-wider uppercase text-slate-400 select-none">
          {item.label}
        </p>
      </div>
    );
  }
  const active = pathname === item.href;
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs font-medium transition-all group relative
        ${active
          ? "bg-navy-50 text-navy-800 font-semibold border border-navy-100 shadow-2xs"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"}`}
    >
      <Icon
        size={15}
        className={`flex-shrink-0 transition-colors ${active ? "text-navy-700" : "text-slate-400 group-hover:text-slate-600"}`}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span className={`text-[10px] px-1.5 py-0.2 rounded font-bold uppercase tracking-wide
          ${active ? "bg-navy-100 text-navy-700" : "bg-orange-50 text-orange-600 border border-orange-200"}`}>
          {item.badge}
        </span>
      )}
      {!active && !item.badge && (
        <ChevronRight size={12} className="opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0 transition-all text-slate-400" />
      )}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [mounted,     setMounted]     = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [username,    setUsername]    = useState("Admin");

  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("accessToken");
    if (!token) { router.push("/admin/login"); return; }
    const stored = localStorage.getItem("adminUser");
    if (stored) {
      try { setUsername(JSON.parse(stored).fullName || JSON.parse(stored).username || "Admin"); }
      catch {}
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminUser");
    router.push("/admin/login");
  };

  if (!mounted) return null;

  const activeNavItem = NAV.find((n) => !n.divider && n.href === pathname) as NavGroupItem | undefined;
  const currentTitle = activeNavItem ? activeNavItem.label : "Quản trị hệ thống";

  const sidebar = (
    <aside className="w-64 bg-white border-r border-slate-200/90 h-screen flex flex-col flex-shrink-0 select-none">
      <style dangerouslySetInnerHTML={{__html: `
        .admin-scrollbar::-webkit-scrollbar { width: 4px; }
        .admin-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .admin-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 8px; }
        .admin-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}} />
      {/* Official Website Brand Logo */}
      <div className="px-5 py-4 border-b border-slate-200/80 flex-shrink-0 flex items-center justify-between bg-slate-50/40">
        <Link href="/admin" className="flex items-center">
          <Image
            src="/images/logo.png"
            alt="HDT Logistics"
            width={140}
            height={42}
            className="h-8 w-auto object-contain"
            priority
            onError={(e) => {
              (e.target as HTMLImageElement).src = "/images/logo.svg";
            }}
          />
        </Link>
      </div>

      {/* Nav Link List */}
      <nav className="flex-1 px-3 py-3 overflow-y-auto space-y-0.5 admin-scrollbar">
        {NAV.map((item, i) => (
          <NavItem key={i} item={item} pathname={pathname} onClick={() => setSidebarOpen(false)} />
        ))}
      </nav>

      {/* External Link to Public Site */}
      <div className="px-3 py-2 border-t border-slate-200/60 bg-slate-50/30">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-medium text-slate-500 hover:text-slate-800 hover:bg-slate-100 transition-colors"
        >
          <ExternalLink size={13} className="text-slate-400" />
          <span className="flex-1">Xem website client</span>
        </a>
      </div>

      {/* User Profile Footer */}
      <div className="px-4 py-3.5 border-t border-slate-200/80 bg-slate-50/60">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-xs flex-shrink-0 shadow-2xs">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-slate-800 text-xs font-semibold truncate leading-tight">{username}</p>
            <p className="text-slate-400 text-[10px] leading-tight mt-0.5">Quản trị viên</p>
          </div>
          <button
            onClick={handleLogout}
            title="Đăng xuất"
            aria-label="Đăng xuất khỏi hệ thống"
            className="w-7 h-7 flex items-center justify-center rounded-md text-slate-400
                       hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
          >
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <ToastProvider>
      <div className="min-h-screen bg-[#f8fafc] flex font-sans selection:bg-navy-100 selection:text-navy-900">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex sticky top-0 h-screen">{sidebar}</div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex animate-in fade-in duration-150">
            <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10 flex">{sidebar}</div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Bar Header */}
          <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-8 py-3 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setSidebarOpen(true)}
                aria-label="Mở menu điều hướng"
                className="lg:hidden w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
              >
                <Menu size={18} />
              </button>
              <div>
                <nav className="flex items-center gap-1.5 text-xs text-slate-400">
                  <span className="hover:text-slate-600 cursor-default">HDT Admin</span>
                  <span>/</span>
                  <span className="font-semibold text-slate-800">{currentTitle}</span>
                </nav>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span>Hệ thống trực tuyến</span>
              </div>
              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 hover:text-navy-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors"
              >
                <span>Xem Website</span>
                <ExternalLink size={12} />
              </a>
            </div>
          </header>

          {/* Page Content */}
          <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
