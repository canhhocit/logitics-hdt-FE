"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, X, ChevronDown, Search, Phone, Mail, Clock,
  Facebook, Instagram, Twitter, X as XIcon, Download
} from "lucide-react";
import clsx from "clsx";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") || "http://localhost:8080";
function resolveFileUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("/uploads")) return `${BACKEND_URL}${url}`;
  return url;
}

// ── Fallback nav khi API không có data ──────────────────────
const NAV_FALLBACK = [
  { label: "Trang Chủ",       href: "/",                children: [] },
  { label: "Về Chúng Tôi",    href: "/about",           children: [
    { label: "Hồ sơ công ty",   href: "/files/ho-so-cong-ty.pdf",  isPDF: true },
    { label: "Cơ cấu tổ chức", href: "/files/co-cau-to-chuc.pdf",  isPDF: true },
    { label: "Hồ sơ năng lực", href: "/files/ho-so-nang-luc.pdf",  isPDF: true },
  ]},
  { label: "Tư Vấn Hải Quan", href: "/tu-van-hai-quan", children: [] },
  { label: "Dịch Vụ",         href: "/services",        children: [
    { label: "Khai Thuê Hải Quan",     href: "/services/khai-thue-hai-quan" },
    { label: "Vận Chuyển Đường Không", href: "/services/van-chuyen-duong-khong" },
    { label: "Vận Chuyển Đường Biển",  href: "/services/van-chuyen-duong-bien" },
    { label: "Pickup",                 href: "/services/pickup" },
    { label: "Vận Chuyển Đường Bộ",    href: "/services/van-chuyen-duong-bo" },
  ]},
  { label: "Tin Tức",          href: "/news",            children: [
    { label: "Hướng dẫn và Thủ tục", href: "/news?categorySlug=huong-dan-va-thu-tuc" },
    { label: "Tin ngành Logistics",  href: "/news?categorySlug=tin-nganh-logistics" },
  ]},
  { label: "Liên Hệ",          href: "/contact",         children: [] },
];

interface MenuItem {
  id?: string;
  label: string;
  url?: string;
  href?: string;
  isPDF?: boolean;
  children?: MenuItem[];
}

interface Props {
  settings?: Record<string, string>;
  menuItems?: MenuItem[];
  categories?: any[];
  services?: any[];
}

/**
 * Build nav tree từ flat list API trả về.
 * API trả flat gồm cả parent lẫn children, mỗi item có `parent: { id, label, url, ... } | null`
 * Thuật toán:
 *   1. Lọc top-level (parent === null)
 *   2. Với mỗi top-level, gắn các item có parent.id === top-level.id làm children
 */
function buildNav(items: any[], settings: Record<string, string>, categories: any[], services: any[]): { label: string; href: string; children: any[] }[] {
  if (!items || items.length === 0) return NAV_FALLBACK;

  // Top-level items
  const topLevel = items
    .filter((item) => item.parent === null || item.parent === undefined)
    .sort((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0));

  return topLevel.map((top) => {
    const children: any[] = items
      .filter((item) => item.parent?.id === top.id)
      .sort((a, b) => (a.orderNo ?? 0) - (b.orderNo ?? 0))
      .map((c) => ({ label: c.label, href: c.url || "/" }));

    // Tự động gắn các file vào menu Về chúng tôi
    if (top.url === "/about") {
      children.push({ label: "Hồ sơ công ty",  href: settings.file_ho_so_cong_ty ? resolveFileUrl(settings.file_ho_so_cong_ty) : "#", isPDF: true });
      children.push({ label: "Cơ cấu tổ chức", href: settings.file_co_cau_to_chuc ? resolveFileUrl(settings.file_co_cau_to_chuc) : "#", isPDF: true });
      children.push({ label: "Hồ sơ năng lực", href: settings.file_ho_so_nang_luc ? resolveFileUrl(settings.file_ho_so_nang_luc) : "#", isPDF: true });
    }

    // Tự động đưa toàn bộ Danh mục (Categories) vào menu Tin tức
    if (top.url === "/news" || top.label?.toLowerCase() === "tin tức") {
      // Ghi đè menu con mặc định bằng danh sách Category từ DB
      children.length = 0;
      categories.forEach(cat => {
        children.push({ label: cat.name, href: `/news?categorySlug=${cat.slug}` });
      });
    }

    // Tự động đưa toàn bộ Dịch vụ (Services) vào menu Dịch vụ
    if (top.url === "/services" || top.label?.toLowerCase() === "dịch vụ") {
      children.length = 0;
      services.forEach(svc => {
        children.push({ label: svc.name, href: `/services/${svc.slug}` });
      });
    }

    return {
      label: top.label,
      href: top.url || "/",
      children,
    };
  });
}

export default function Header({ settings = {}, menuItems = [], categories = [], services = [] }: Props) {
  const nav = buildNav(menuItems, settings, categories, services);

  // Company info từ settings, fallback về giá trị mặc định
  const hotline        = settings.hotline         || "";
  const hotlineRaw     = settings.hotline_raw      || "";
  const email          = settings.email           || "";
  const workingHours   = settings.working_hours   || "";
  const facebookUrl    = settings.facebook_url    || "#";
  const instagramUrl   = settings.instagram_url   || "#";
  const twitterUrl     = settings.twitter_url     || "#";

  const [scrolled,      setScrolled]     = useState(false);
  const [mobileOpen,    setMobileOpen]   = useState(false);
  const [dropdown,      setDropdown]     = useState<string | null>(null);
  const [mobileExpand,  setMobileExpand] = useState<string | null>(null);
  const [searchOpen,    setSearchOpen]   = useState(false);
  const [searchQ,       setSearchQ]      = useState("");
  const searchRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    if (searchOpen) searchRef.current?.focus();
    document.body.style.overflow = searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQ.trim()) window.location.href = `/search?q=${encodeURIComponent(searchQ)}`;
  };

  return (
    <>
      <a href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100]
                   focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm">
        Chuyển đến nội dung
      </a>

      <header className="fixed inset-x-0 top-0 z-50 flex flex-col">
        {/* Top bar */}
        <div className="bg-navy-900 text-white/70 text-xs hidden md:block">
          <div className="wrap flex items-center justify-between h-9">
            <div className="flex items-center gap-5">
              <a href={`tel:${hotlineRaw}`}
                className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Phone size={11} />
                Hotline: <strong className="text-white ml-0.5">{hotline}</strong>
              </a>
              <a href={`mailto:${email}`}
                className="flex items-center gap-1.5 hover:text-orange-400 transition-colors">
                <Mail size={11} />{email}
              </a>
            </div>
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Clock size={11} />{workingHours}
              </span>
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/10">
                <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"
                  className="hover:text-orange-400 transition-colors">
                  <Facebook size={13} />
                </a>
                <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"
                  className="hover:text-orange-400 transition-colors">
                  <Instagram size={13} />
                </a>
                <a href={twitterUrl} target="_blank" rel="noreferrer" aria-label="Twitter / X"
                  className="hover:text-orange-400 transition-colors">
                  <Twitter size={13} />
                </a>
                <a href={`mailto:${email}`} aria-label="Email"
                  className="hover:text-orange-400 transition-colors">
                  <Mail size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Main nav */}
        <nav className={clsx("transition-all duration-300",
          scrolled ? "bg-white/96 backdrop-blur-xl shadow-md" : "bg-white")}>
          <div className="wrap flex items-center justify-between h-[80px] lg:h-[100px]">
            <Link href="/" title="HDT Logistics – Giải pháp vận chuyển & hải quan">
              <Image src="/images/logo.png" alt="HDT Logistics"
                width={240} height={96}
                className="object-contain h-16 lg:h-[84px] w-auto transition-all"
                priority
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/logo.svg"; }}
              />
            </Link>

            {/* Desktop nav */}
            <ul className="hidden lg:flex items-center gap-0">
              {nav.map((item) => (
                <li key={item.label} className="relative"
                  onMouseEnter={() => item.children?.length && setDropdown(item.label)}
                  onMouseLeave={() => setDropdown(null)}>
                  <Link href={item.href || "/"}
                    className="flex items-center gap-0.5 px-2.5 py-2 text-[12.5px] font-semibold
                               text-navy-700 hover:text-orange-500 rounded-lg hover:bg-orange-50
                               transition-colors whitespace-nowrap">
                    {item.label}
                    {item.children?.length ? (
                      <ChevronDown size={11} className={clsx("transition-transform opacity-50",
                        dropdown === item.label && "rotate-180 opacity-100")} />
                    ) : null}
                  </Link>
                  {item.children?.length > 0 && dropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-2xl
                                    shadow-xl border border-gray-100 py-2 z-50 min-w-[220px]">
                      {item.children.map((c) => (
                        (c as any).isPDF ? (
                          <a key={c.label} href={c.href || "/"} target="_blank" rel="noreferrer"
                            onClick={(e) => {
                              if (c.href === "#" || c.href === "/") {
                                e.preventDefault();
                                alert("Tài liệu đang được cập nhật!");
                              }
                            }}
                            className="flex items-center gap-2 px-5 py-2.5 text-[13px] text-navy-600
                                       hover:text-orange-500 hover:bg-orange-50 transition-colors">
                              <Download size={14} className="text-gray-400 group-hover:text-orange-500" />
                            {c.label}
                          </a>
                        ) : (
                          <Link key={c.label} href={c.href || "/"}
                            className="block px-5 py-2.5 text-[13px] text-navy-600
                                       hover:text-orange-500 hover:bg-orange-50 transition-colors">
                            {c.label}
                          </Link>
                        )
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
              <button onClick={() => setSearchOpen(true)} aria-label="Mở tìm kiếm"
                className="w-8 h-8 flex items-center justify-center rounded-lg
                           text-navy-500 hover:text-orange-500 hover:bg-orange-50 transition-colors">
                <Search size={16} />
              </button>
              <Link href="/contact"
                className="text-[12px] font-bold bg-orange-500 hover:bg-orange-600
                           text-white px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
                Nhận Tư Vấn
              </Link>
            </div>

            {/* Mobile */}
            <div className="lg:hidden flex items-center gap-2">
              <button onClick={() => setSearchOpen(true)} aria-label="Tìm kiếm"
                className="w-9 h-9 flex items-center justify-center text-navy-600">
                <Search size={18} />
              </button>
              <button onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu"
                className="w-9 h-9 flex items-center justify-center text-navy-600">
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* Mobile menu */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white">
              <div className="wrap py-3 space-y-0.5">
                {nav.map((item) => (
                  <div key={item.label}>
                    {item.children?.length ? (
                      <>
                        <button
                          onClick={() => setMobileExpand(mobileExpand === item.label ? null : item.label)}
                          className="w-full flex items-center justify-between px-3 py-3
                                     text-[13px] font-semibold text-navy-700 hover:text-orange-500 rounded-lg">
                          {item.label}
                          <ChevronDown size={14} className={clsx("transition-transform",
                            mobileExpand === item.label && "rotate-180")} />
                        </button>
                        {mobileExpand === item.label && (
                          <div className="ml-4 border-l-2 border-orange-100 pl-4 py-1 space-y-0.5">
                            {item.children.map((c) => (
                              <Link key={c.label} href={c.href || "/"} target={c.isPDF ? "_blank" : undefined}
                                onClick={(e) => {
                                  if (c.isPDF && (c.href === "#" || c.href === "/")) {
                                    e.preventDefault();
                                    alert("Tài liệu đang được cập nhật!");
                                  } else {
                                    setMobileOpen(false);
                                  }
                                }}
                                className={clsx("block py-2 text-[13px] hover:text-orange-500", c.isPDF ? "text-orange-500 font-semibold" : "text-navy-500")}>
                                {c.isPDF ? `↓ ${c.label}` : c.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link href={item.href || "/"}
                        className="block px-3 py-3 text-[13px] font-semibold text-navy-700
                                   hover:text-orange-500 rounded-lg"
                        onClick={() => setMobileOpen(false)}>
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                <div className="pt-3 pb-1 border-t border-gray-100 space-y-2">
                  <a href={`tel:${hotlineRaw}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-navy-600">
                    <Phone size={14} className="text-orange-500" />{hotline}
                  </a>
                  <Link href="/contact"
                    className="block btn-orange text-center py-2.5 text-[13px]"
                    onClick={() => setMobileOpen(false)}>
                    Nhận Tư Vấn Miễn Phí
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* Search lightbox */}
      {searchOpen && (
        <div className="fixed inset-0 z-[200] bg-navy-950/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}>
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="font-bold text-navy-800">Tìm kiếm</span>
              <button onClick={() => setSearchOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg text-navy-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                aria-label="Đóng">
                <XIcon size={16} />
              </button>
            </div>
            <form onSubmit={handleSearch} className="flex items-center gap-3 px-6 py-4">
              <Search size={18} className="text-navy-300 flex-shrink-0" />
              <input ref={searchRef} type="text" value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Nhập từ khóa tìm kiếm..."
                className="flex-1 text-navy-800 text-base outline-none placeholder:text-gray-300" />
              {searchQ && (
                <button type="button" onClick={() => setSearchQ("")}
                  className="text-gray-300 hover:text-gray-500 transition-colors">
                  <XIcon size={14} />
                </button>
              )}
              <button type="submit" className="btn-orange text-sm py-2 px-5">Tìm kiếm</button>
            </form>
            <div className="px-6 pb-5">
              <p className="text-xs text-navy-400 mb-3 font-medium">Tìm kiếm phổ biến:</p>
              <div className="flex flex-wrap gap-2">
                {["Vận chuyển đường biển","Khai thuê hải quan","FCL LCL","Thủ tục xuất khẩu","Thủ tục nhập khẩu"].map((kw) => (
                  <button key={kw} onClick={() => { setSearchQ(kw); searchRef.current?.focus(); }}
                    className="text-xs bg-gray-100 hover:bg-orange-100 hover:text-orange-600 text-navy-500 px-3 py-1.5 rounded-full transition-colors">
                    {kw}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
