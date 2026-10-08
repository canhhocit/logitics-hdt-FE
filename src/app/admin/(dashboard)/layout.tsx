"use client";

import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastProvider } from "../_components/Toast";
import {
  LayoutDashboard, MessageSquare, Briefcase, FileText,
  Settings, Building2, Users, BriefcaseBusiness,
  LogOut, ChevronRight, Menu, X, Package,
  Quote, Globe, Award, Sparkles, FolderOpen,
} from "lucide-react";

const NAV = [
  { href: "/admin",               label: "Dashboard",            icon: LayoutDashboard },
  { href: "/admin/leads",         label: "Leads tư vấn",         icon: MessageSquare,  badge: "new" },
  { divider: true, label: "Nội dung" },
  { href: "/admin/posts",         label: "Bài viết",              icon: FileText },
  { href: "/admin/categories",    label: "Chuyên mục",            icon: FolderOpen },
  { href: "/admin/services",      label: "Dịch vụ",               icon: Briefcase },
  { divider: true, label: "Thông tin công ty" },
  { href: "/admin/offices",       label: "Chi nhánh",             icon: Building2 },
  { href: "/admin/contacts",      label: "Người phụ trách",       icon: Users },
  { href: "/admin/jobs",          label: "Tuyển dụng",            icon: BriefcaseBusiness },
  { divider: true, label: "Nội dung website" },
  { href: "/admin/testimonials",  label: "Đánh giá KH",           icon: Quote },
  { href: "/admin/partners",      label: "Đối tác & Hiệp hội",   icon: Globe },
  { href: "/admin/awards",        label: "Giải thưởng",           icon: Award },
  { href: "/admin/company-values",label: "Giá trị cốt lõi",      icon: Sparkles },
  { divider: true, label: "Cấu hình" },
  { href: "/admin/settings",      label: "Cài đặt website",       icon: Settings },
];

function NavItem({ item, pathname, onClick }: { item: any; pathname: string; onClick?: () => void }) {
  if (item.divider) {
    return (
      <div className="pt-4 pb-1 px-3">
        <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-slate-500">{item.label}</p>
      </div>
    );
  }
  const active = pathname === item.href;
  const Icon = item.icon;
  return (
    <Link href={item.href} onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group
        ${active
          ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/30"
          : "text-slate-400 hover:text-white hover:bg-white/10"}`}>
      <Icon size={16} className="flex-shrink-0" />
      <span className="flex-1">{item.label}</span>
      {!active && <ChevronRight size={12} className="opacity-0 group-hover:opacity-60 transition-opacity" />}
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

  const sidebar = (
    <aside className="w-64 bg-slate-900 h-screen flex flex-col flex-shrink-0 relative">
      <style dangerouslySetInnerHTML={{__html: `
        .dark-scrollbar::-webkit-scrollbar { width: 5px; }
        .dark-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .dark-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.15); border-radius: 10px; }
        .dark-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.25); }
      `}} />
      {/* Logo */}
      <div className="px-6 py-5 border-b border-white/10 flex-shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <Package size={16} className="text-white" />
          </div>
          <div className="min-w-0">
            <p className="text-white font-bold text-sm leading-none truncate">HDT Logistics</p>
            <p className="text-slate-500 text-[10px] mt-0.5">Admin CMS</p>
          </div>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 overflow-y-auto space-y-0.5 dark-scrollbar">
        {NAV.map((item, i) => (
          <NavItem key={i} item={item} pathname={pathname} onClick={() => setSidebarOpen(false)} />
        ))}
      </nav>

      {/* User */}
      <div className="px-4 py-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-indigo-700 flex items-center justify-center text-white font-bold text-xs flex-shrink-0">
            {username.charAt(0).toUpperCase()}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white text-xs font-semibold truncate">{username}</p>
            <p className="text-slate-500 text-[10px]">Quản trị viên</p>
          </div>
          <button onClick={handleLogout}
            title="Đăng xuất"
            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-500
                       hover:text-red-400 hover:bg-red-400/10 transition-colors flex-shrink-0">
            <LogOut size={14} />
          </button>
        </div>
      </div>
    </aside>
  );

  return (
    <ToastProvider>
      <div className="min-h-screen bg-slate-50 flex">
        {/* Desktop sidebar */}
        <div className="hidden lg:flex sticky top-0 h-screen">{sidebar}</div>

        {/* Mobile sidebar overlay */}
        {sidebarOpen && (
          <div className="lg:hidden fixed inset-0 z-50 flex">
            <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
            <div className="relative z-10 flex">{sidebar}</div>
          </div>
        )}

        {/* Main */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top bar (mobile) */}
          <header className="lg:hidden sticky top-0 z-30 bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)}
              className="w-8 h-8 flex items-center justify-center text-gray-500">
              <Menu size={20} />
            </button>
            <span className="font-bold text-gray-700 text-sm">HDT Admin</span>
          </header>

          {/* Page content */}
          <main className="flex-1 p-6 lg:p-8 max-w-7xl w-full mx-auto">
            {children}
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
