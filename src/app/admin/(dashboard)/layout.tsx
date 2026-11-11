"use client";

import Link from "next/link";
import Image from "next/image";
import { useRouter, usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { ToastProvider } from "../_components/Toast";
import { getStats } from "../_lib/api";
import {
  LayoutDashboard, MessageSquare, Briefcase, FileText,
  Settings, Building2, Users, BriefcaseBusiness,
  LogOut, ChevronRight, Menu, X,
  Quote, Globe, Award, Sparkles, FolderOpen, ExternalLink,
  Type
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
  { href: "/admin",               label: "Bảng tin (Dashboard)",            icon: LayoutDashboard },
  { href: "/admin/leads",         label: "Quản lý Liên hệ (Leads)",         icon: MessageSquare },
  { divider: true, label: "Quản lý nội dung" },
  { href: "/admin/posts",         label: "Quản lý Tin tức",   icon: FileText },
  { href: "/admin/categories",    label: "Quản lý Chuyên mục",            icon: FolderOpen },
  { href: "/admin/services",      label: "Quản lý Dịch vụ",     icon: Briefcase },
  { divider: true, label: "Thông tin doanh nghiệp" },
  { href: "/admin/offices",       label: "Quản lý Hệ thống chi nhánh",  icon: Building2 },
  { href: "/admin/contacts",      label: "Nhân sự phụ trách",    icon: Users },
  { href: "/admin/jobs",          label: "Quản lý Tuyển dụng",            icon: BriefcaseBusiness },
  { divider: true, label: "Truyền thông website" },
  { href: "/admin/testimonials",  label: "Phản hồi khách hàng",  icon: Quote },
  { href: "/admin/partners",      label: "Quản lý Đối tác",   icon: Globe },
  { href: "/admin/awards",        label: "Giải thưởng & Chứng nhận", icon: Award },
  { href: "/admin/company-values",label: "Giá trị cốt lõi",      icon: Sparkles },
  { divider: true, label: "Hệ thống" },
  { href: "/admin/settings",      label: "Cài đặt chung",        icon: Settings },
];

function NavItem({
  item,
  pathname,
  collapsed,
  onClick,
}: {
  item: NavEntry;
  pathname: string;
  collapsed?: boolean;
  onClick?: () => void;
}) {
  if (item.divider) {
    if (collapsed) {
      return <div className="my-2.5 mx-2 border-t border-slate-100" title={item.label} />;
    }
    return (
      <div className="pt-4 pb-1.5 px-3">
        <p className="text-xs font-bold tracking-wider uppercase text-slate-400 select-none">
          {item.label}
        </p>
      </div>
    );
  }

  const active = pathname === item.href;
  const Icon = item.icon;

  if (collapsed) {
    return (
      <Link
        href={item.href}
        onClick={onClick}
        title={item.label}
        className={`flex items-center justify-center w-10 h-10 mx-auto rounded-lg text-sm font-medium transition-all group relative
          ${active
            ? "bg-navy-50 text-navy-800 font-semibold border border-navy-100 shadow-2xs"
            : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"}`}
      >
        <Icon
          size={18}
          className={`transition-colors ${active ? "text-navy-700" : "text-slate-400 group-hover:text-slate-600"}`}
        />
        {item.badge && (
          <span className="absolute top-1 right-1 w-2.5 h-2.5 rounded-full bg-orange-500 ring-2 ring-white" />
        )}
      </Link>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onClick}
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all group relative
        ${active
          ? "bg-navy-50 text-navy-800 font-semibold border border-navy-100 shadow-2xs"
          : "text-slate-600 hover:text-slate-900 hover:bg-slate-100/80"}`}
    >
      <Icon
        size={17}
        className={`flex-shrink-0 transition-colors ${active ? "text-navy-700" : "text-slate-400 group-hover:text-slate-600"}`}
      />
      <span className="flex-1 truncate">{item.label}</span>
      {item.badge && (
        <span className={`text-xs px-2 py-0.5 rounded-full font-bold tabular-nums min-w-[20px] text-center
          ${active ? "bg-navy-100 text-navy-800" : "bg-orange-50 text-orange-600 border border-orange-200/80"}`}>
          {item.badge}
        </span>
      )}
      {!active && !item.badge && (
        <ChevronRight size={14} className="opacity-0 -translate-x-1 group-hover:opacity-40 group-hover:translate-x-0 transition-all text-slate-400" />
      )}
    </Link>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router   = useRouter();
  const pathname = usePathname();
  const [mounted,          setMounted]          = useState(false);
  const [mobileOpen,       setMobileOpen]       = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [fontSize,         setFontSize]         = useState<"sm" | "md" | "lg">("md");
  const [newLeadsCount,    setNewLeadsCount]    = useState<number>(0);
  const [username,         setUsername]         = useState("Admin");

  // Authentication & Initial Preferences
  useEffect(() => {
    setMounted(true);
    const token = localStorage.getItem("accessToken");
    if (!token) { router.push("/admin/login"); return; }

    // Proactively check JWT expiration
    try {
      const parts = token.split(".");
      if (parts.length === 3) {
        const payload = JSON.parse(atob(parts[1]));
        if (payload.exp && payload.exp * 1000 < Date.now()) {
          localStorage.removeItem("accessToken");
          localStorage.removeItem("adminUser");
          if (typeof window !== "undefined") {
            try { sessionStorage.setItem("admin_session_expired", "1"); } catch {}
            window.location.href = "/admin/login?expired=1";
          }
          return;
        }
      }
    } catch {}
    const stored = localStorage.getItem("adminUser");
    if (stored) {
      try { setUsername(JSON.parse(stored).fullName || JSON.parse(stored).username || "Admin"); }
      catch {}
    }

    const savedCollapsed = localStorage.getItem("adminSidebarCollapsed");
    if (savedCollapsed !== null) {
      setSidebarCollapsed(savedCollapsed === "true");
    }

    const savedFontSize = localStorage.getItem("adminFontSize");
    if (savedFontSize === "sm" || savedFontSize === "md" || savedFontSize === "lg") {
      setFontSize(savedFontSize);
    }

    // Fetch real-time new leads count
    const fetchNewLeads = async () => {
      try {
        const stats = await getStats();
        if (stats && typeof stats.newLeads === "number") {
          setNewLeadsCount(stats.newLeads);
        }
      } catch {
        // Fallback: 0 (no badge rendered)
      }
    };
    fetchNewLeads();

    const handleLeadsUpdated = () => fetchNewLeads();
    window.addEventListener("leads-updated", handleLeadsUpdated);
    return () => window.removeEventListener("leads-updated", handleLeadsUpdated);
  }, [router, pathname]);

  // Safe Root Font Scaling (Ensures 100% responsiveness without coordinate bugs)
  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("admin-font-sm", "admin-font-md", "admin-font-lg");
    root.classList.add(`admin-font-${fontSize}`);
    return () => {
      root.classList.remove("admin-font-sm", "admin-font-md", "admin-font-lg");
    };
  }, [fontSize]);

  const toggleSidebar = () => {
    if (typeof window !== "undefined" && window.innerWidth < 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setSidebarCollapsed((prev) => {
        const next = !prev;
        localStorage.setItem("adminSidebarCollapsed", String(next));
        return next;
      });
    }
  };

  const handleFontSizeChange = (size: "sm" | "md" | "lg") => {
    setFontSize(size);
    localStorage.setItem("adminFontSize", size);
  };

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("adminUser");
    if (typeof window !== "undefined") {
      try { sessionStorage.removeItem("admin_session_expired"); } catch {}
    }
    router.push("/admin/login");
  };

  if (!mounted) return null;

  const activeNavItem = NAV.find((n) => !n.divider && n.href === pathname) as NavGroupItem | undefined;
  const currentTitle = activeNavItem ? activeNavItem.label : "Quản trị hệ thống";

  const renderSidebar = (collapsed: boolean, onNavClick?: () => void) => (
    <aside
      className={`h-full flex flex-col flex-shrink-0 bg-white border-r border-slate-200/90 select-none transition-[width] duration-200 ease-in-out ${
        collapsed ? "w-[68px]" : "w-64"
      }`}
    >
      <style dangerouslySetInnerHTML={{__html: `
        .admin-scrollbar::-webkit-scrollbar { width: 4px; }
        .admin-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .admin-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 8px; }
        .admin-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}} />

      {/* Brand Header with Bigger Logo & Bold HDT Logistics Text */}
      <div className={`h-16 border-b border-slate-200/80 flex-shrink-0 flex items-center bg-slate-50/40 ${
        collapsed ? "justify-center px-2" : "justify-between px-4"
      }`}>
        <Link href="/admin" className="flex items-center gap-3 group min-w-0">
          {collapsed ? (
            <Image
              src="/images/logo.png"
              alt="HDT"
              width={40}
              height={40}
              className="h-9 w-auto object-contain flex-shrink-0"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/logo.svg";
              }}
            />
          ) : (
            <>
              <Image
                src="/images/logo.png"
                alt="HDT Logistics"
                width={48}
                height={48}
                className="h-10 w-auto object-contain flex-shrink-0 transition-transform duration-200 group-hover:scale-105"
                priority
                onError={(e) => {
                  (e.target as HTMLImageElement).src = "/images/logo.svg";
                }}
              />
              <div className="flex flex-col min-w-0">
                <span className="font-extrabold text-[15px] text-slate-900 tracking-tight leading-none group-hover:text-navy-700 transition-colors truncate">
                  HDT Logistics
                </span>
              </div>
            </>
          )}
        </Link>
      </div>

      {/* Navigation Links with Independent Scrolling */}
      <nav className={`flex-1 py-3 overflow-y-auto space-y-0.5 admin-scrollbar ${collapsed ? "px-2" : "px-3"}`}>
        {NAV.map((item, i) => {
          const dynamicItem = !item.divider && item.href === "/admin/leads"
            ? {
                ...item,
                badge: newLeadsCount > 0 ? (newLeadsCount > 99 ? "99+" : String(newLeadsCount)) : undefined,
              }
            : item;
          return (
            <NavItem
              key={i}
              item={dynamicItem}
              pathname={pathname}
              collapsed={collapsed}
              onClick={onNavClick}
            />
          );
        })}
      </nav>


      {/* User Profile Footer */}
      <div className={`border-t border-slate-200/80 bg-slate-50/60 flex-shrink-0 ${
        collapsed ? "p-2.5 flex flex-col items-center gap-2" : "px-4 py-3.5"
      }`}>
        {collapsed ? (
          <>
            <div
              title={`${username} (Quản trị viên)`}
              className="w-9 h-9 rounded-lg bg-white border border-slate-200 text-slate-700 flex items-center justify-center font-bold text-sm shadow-2xs"
            >
              {username.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              aria-label="Đăng xuất khỏi hệ thống"
              className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
            >
              <LogOut size={16} />
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2.5">
            <div className="w-2 h-2 rounded-lg bg-white text-slate-700 flex items-center justify-center font-bold text-sm flex-shrink-0 shadow-2xs">
              
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-slate-800 text-sm font-semibold truncate leading-tight">{username}</p>
              <p className="text-slate-400 text-xs leading-tight mt-0.5">Quản trị viên</p>
            </div>
            <button
              onClick={handleLogout}
              title="Đăng xuất"
              aria-label="Đăng xuất khỏi hệ thống"
              className="w-8 h-8 flex items-center justify-center rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors flex-shrink-0"
            >
              <LogOut size={15} />
            </button>
          </div>
        )}
      </div>
    </aside>
  );

  return (
    <ToastProvider>
      <div className="h-screen w-screen overflow-hidden flex bg-slate-50 font-sans selection:bg-navy-100 selection:text-navy-900">
        {/* Desktop & Laptop Sidebar */}
        <div className="hidden md:flex h-full flex-shrink-0">
          {renderSidebar(sidebarCollapsed)}
        </div>

        {/* Mobile Sidebar Overlay Drawer */}
        {mobileOpen && (
          <div className="md:hidden fixed inset-0 z-50 flex animate-in fade-in duration-150">
            <div
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm"
              onClick={() => setMobileOpen(false)}
            />
            <div className="relative z-10 flex h-full">
              {renderSidebar(false, () => setMobileOpen(false))}
            </div>
          </div>
        )}

        {/* Main Content Area — Separated Independent Scroll */}
        <div className="flex-1 flex flex-col h-full min-w-0 overflow-hidden bg-slate-50/70">
          {/* Pinned Top Bar Header */}
          <header className="h-16 flex-shrink-0 bg-white border-b border-slate-200/80 px-3 sm:px-6 flex items-center justify-between gap-2 z-10">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              {/* Universal Menu Toggle for Mobile, Laptop & Desktop */}
              <button
                onClick={toggleSidebar}
                aria-label={sidebarCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
                title={sidebarCollapsed ? "Mở rộng menu" : "Thu gọn menu"}
                className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-slate-900 transition-colors"
              >
                <Menu size={18} />
              </button>

              <nav className="flex items-center gap-1.5 text-sm text-slate-400 min-w-0">
                <span className="hidden sm:inline hover:text-slate-600 cursor-default flex-shrink-0">HDT Admin</span>
                <span className="hidden sm:inline flex-shrink-0">/</span>
                <span className="font-bold text-slate-900 text-sm sm:text-base truncate">{currentTitle}</span>
              </nav>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
              {/* Font Size Adjuster Control - Available & Visible on Mobile Phone, Tablet & Laptop */}
              <div className="inline-flex items-center bg-slate-100/90 border border-slate-200/90 rounded-lg p-0.5 text-slate-600 shadow-2xs">
                <span className="pl-1.5 sm:pl-2 pr-1 text-xs font-semibold text-slate-400 select-none flex items-center gap-1">
                  <Type size={13} className="text-slate-500" />
                  <span className="hidden md:inline text-xs">Cỡ chữ:</span>
                </span>
                <button
                  type="button"
                  onClick={() => handleFontSizeChange("sm")}
                  title="Cỡ chữ nhỏ"
                  aria-label="Cỡ chữ nhỏ"
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-md transition-all ${
                    fontSize === "sm"
                      ? "bg-white text-navy-800 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  A-
                </button>
                <button
                  type="button"
                  onClick={() => handleFontSizeChange("md")}
                  title="Cỡ chữ tiêu chuẩn (Mặc định to rõ)"
                  aria-label="Cỡ chữ tiêu chuẩn"
                  className={`px-1.5 sm:px-2.5 py-0.5 sm:py-1 text-xs font-semibold rounded-md transition-all ${
                    fontSize === "md"
                      ? "bg-white text-navy-800 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  A
                </button>
                <button
                  type="button"
                  onClick={() => handleFontSizeChange("lg")}
                  title="Cỡ chữ lớn"
                  aria-label="Cỡ chữ lớn"
                  className={`px-1.5 sm:px-2 py-0.5 sm:py-1 text-xs font-semibold rounded-md transition-all ${
                    fontSize === "lg"
                      ? "bg-white text-navy-800 shadow-xs font-bold"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  A+
                </button>
              </div>

              <a
                href="/"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden sm:inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-navy-700 px-3 py-1.5 rounded-lg border border-slate-200 hover:border-slate-300 hover:bg-slate-50 transition-colors flex-shrink-0"
              >
                <span>Xem Website</span>
                <ExternalLink size={13} />
              </a>
            </div>
          </header>

          {/* Scrollable Page Content Container */}
          <main className="flex-1 overflow-y-auto min-h-0 admin-scrollbar bg-slate-50/50">
            <div className="px-4 sm:px-6 lg:px-8 py-5 w-full max-w-[1600px] mx-auto pb-14">
              {children}
            </div>
          </main>
        </div>
      </div>
    </ToastProvider>
  );
}
