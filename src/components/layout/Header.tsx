"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Menu, X, ChevronDown, Search, Phone, Mail, Clock,
  Facebook, Instagram, Twitter, X as XIcon,
} from "lucide-react";
import clsx from "clsx";
import { company } from "@/data";

const nav = [
  { label: "Trang Chủ", href: "/" },
  {
    label: "Về Chúng Tôi",
    href: "/about",
  },
  {
    label: "Tư Vấn Hải Quan",
    href: "/tu-van-hai-quan",
  },
  {
    label: "Dịch Vụ",
    href: "/services",
    children: [
      { label: "Vận Chuyển Đường Không",  href: "/services/van-chuyen-duong-khong" },
      { label: "Vận Chuyển Đường Biển",   href: "/services/van-chuyen-duong-bien" },
      { label: "Gom Hàng Lẻ (LCL)",        href: "/services/gom-hang-le-lcl" },
      { label: "Vận Chuyển Đường Bộ",      href: "/services/van-chuyen-duong-bo" },
      { label: "Khai Thuê Hải Quan",        href: "/services/khai-thue-hai-quan" },
      { label: "Hàng Đặc Biệt / Dự Án",    href: "/services/hang-dac-biet-du-an" },
    ],
  },
  {
    label: "Tin Tức",
    href: "/news",
    children: [
      { label: "Hướng dẫn và Thủ tục",   href: "/news/category/huong-dan-va-thu-tuc" },
      { label: "Tin ngành Logistics",     href: "/news/category/tin-nganh-logistics" },
    ],
  },
  { label: "Liên Hệ",  href: "/contact" },
];

export default function Header() {
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
      {/* ── Skip to content (M01.04.01.02 - accessibility) ── */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100]
                   focus:bg-orange-500 focus:text-white focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
      >
        Chuyển đến nội dung
      </a>

      <header className="fixed inset-x-0 top-0 z-50 flex flex-col">

        {/* ── Top bar (M01.01) ── */}
        <div className="bg-navy-900 text-white/70 text-xs hidden md:block">
          <div className="wrap flex items-center justify-between h-9">
            {/* Left: hotline + email */}
            <div className="flex items-center gap-5">
              <a
                href={`tel:${company.hotlineRaw}`}
                className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
              >
                <Phone size={11} />
                Hotline:{" "}
                <strong className="text-white ml-0.5">{company.hotline}</strong>
              </a>
              <a
                href={company.social.email}
                className="flex items-center gap-1.5 hover:text-orange-400 transition-colors"
              >
                <Mail size={11} />
                {company.email}
              </a>
            </div>

            {/* Right: hours + social */}
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1.5">
                <Clock size={11} />
                {company.workingHours}
              </span>
              <div className="flex items-center gap-2 ml-3 pl-3 border-l border-white/10">
                <a
                  href={company.social.facebook}
                  target="_blank" rel="noreferrer"
                  aria-label="Facebook"
                  className="hover:text-orange-400 transition-colors"
                >
                  <Facebook size={13} />
                </a>
                <a
                  href={company.social.instagram}
                  target="_blank" rel="noreferrer"
                  aria-label="Instagram"
                  className="hover:text-orange-400 transition-colors"
                >
                  <Instagram size={13} />
                </a>
                <a
                  href={company.social.twitter}
                  target="_blank" rel="noreferrer"
                  aria-label="Twitter / X"
                  className="hover:text-orange-400 transition-colors"
                >
                  <Twitter size={13} />
                </a>
                <a
                  href={company.social.email}
                  aria-label="Email"
                  className="hover:text-orange-400 transition-colors"
                >
                  <Mail size={13} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ── Main nav ── */}
        <nav
          className={clsx(
            "transition-all duration-300",
            scrolled ? "bg-white/96 backdrop-blur-xl shadow-md" : "bg-white"
          )}
        >
          <div className="wrap flex items-center justify-between h-[80px]">

            {/* Logo (M01.02.01.01) */}
            <Link href="/" title="HDT Logistics – Giải pháp vận chuyển & hải quan cho doanh nghiệp">
              <Image
                src="/images/logo.png"
                alt="HDT Logistics"
                width={180} height={72}
                className="object-contain h-14 w-auto"
                priority
                onError={(e) => { (e.target as HTMLImageElement).src = "/images/logo.svg"; }}
              />
            </Link>

            {/* Desktop links (M01.02.02) */}
            <ul className="hidden lg:flex items-center gap-0">
              {nav.map((item) => (
                <li
                  key={item.label}
                  className="relative"
                  onMouseEnter={() => item.children && setDropdown(item.label)}
                  onMouseLeave={() => setDropdown(null)}
                >
                  <Link
                    href={item.href}
                    className="flex items-center gap-0.5 px-2.5 py-2 text-[12.5px] font-semibold
                               text-navy-700 hover:text-orange-500 rounded-lg hover:bg-orange-50
                               transition-colors whitespace-nowrap"
                  >
                    {item.label}
                    {item.children && (
                      <ChevronDown
                        size={11}
                        className={clsx(
                          "transition-transform opacity-50",
                          dropdown === item.label && "rotate-180 opacity-100"
                        )}
                      />
                    )}
                  </Link>

                  {/* Dropdown */}
                  {item.children && dropdown === item.label && (
                    <div className="absolute top-full left-0 mt-1 bg-white rounded-2xl
                                    shadow-xl border border-gray-100 py-2 z-50 min-w-[220px]">
                      {item.children.map((c) => (
                        <Link
                          key={c.label}
                          href={c.href}
                          className="block px-5 py-2.5 text-[13px] text-navy-600
                                     hover:text-orange-500 hover:bg-orange-50 transition-colors"
                        >
                          {c.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="hidden lg:flex items-center gap-1.5 flex-shrink-0">
              {/* Search icon */}
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Mở tìm kiếm"
                className="w-8 h-8 flex items-center justify-center rounded-lg
                           text-navy-500 hover:text-orange-500 hover:bg-orange-50 transition-colors"
              >
                <Search size={16} />
              </button>

              <Link href="/contact"
                className="text-[12px] font-bold bg-orange-500 hover:bg-orange-600
                           text-white px-4 py-2 rounded-xl transition-colors whitespace-nowrap">
                Nhận Tư Vấn
              </Link>
            </div>

            {/* Mobile: search + hamburger */}
            <div className="lg:hidden flex items-center gap-2">
              <button
                onClick={() => setSearchOpen(true)}
                aria-label="Tìm kiếm"
                className="w-9 h-9 flex items-center justify-center text-navy-600"
              >
                <Search size={18} />
              </button>
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                aria-label="Menu"
                className="w-9 h-9 flex items-center justify-center text-navy-600"
              >
                {mobileOpen ? <X size={22} /> : <Menu size={22} />}
              </button>
            </div>
          </div>

          {/* ── Mobile menu (M01.02.03) ── */}
          {mobileOpen && (
            <div className="lg:hidden border-t border-gray-100 bg-white">
              <div className="wrap py-3 space-y-0.5">
                {nav.map((item) => (
                  <div key={item.label}>
                    {item.children ? (
                      <>
                        <button
                          onClick={() =>
                            setMobileExpand(
                              mobileExpand === item.label ? null : item.label
                            )
                          }
                          className="w-full flex items-center justify-between px-3 py-3
                                     text-[13px] font-semibold text-navy-700 hover:text-orange-500 rounded-lg"
                        >
                          {item.label}
                          <ChevronDown
                            size={14}
                            className={clsx(
                              "transition-transform",
                              mobileExpand === item.label && "rotate-180"
                            )}
                          />
                        </button>
                        {mobileExpand === item.label && (
                          <div className="ml-4 border-l-2 border-orange-100 pl-4 py-1 space-y-0.5">
                            {item.children.map((c) => (
                              <Link
                                key={c.label}
                                href={c.href}
                                className="block py-2 text-[13px] text-navy-500 hover:text-orange-500"
                                onClick={() => setMobileOpen(false)}
                              >
                                {c.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </>
                    ) : (
                      <Link
                        href={item.href}
                        className="block px-3 py-3 text-[13px] font-semibold text-navy-700
                                   hover:text-orange-500 rounded-lg"
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    )}
                  </div>
                ))}
                {/* Mobile top-bar info */}
                <div className="pt-3 pb-1 border-t border-gray-100 space-y-2">
                  <a
                    href={`tel:${company.hotlineRaw}`}
                    className="flex items-center gap-2 px-3 py-2 text-sm text-navy-600"
                  >
                    <Phone size={14} className="text-orange-500" />
                    {company.hotline}
                  </a>
                  <Link
                    href="/contact"
                    className="block btn-orange text-center py-2.5 text-[13px]"
                    onClick={() => setMobileOpen(false)}
                  >
                    Nhận Tư Vấn Miễn Phí
                  </Link>
                </div>
              </div>
            </div>
          )}
        </nav>
      </header>

      {/* ── Search Lightbox (M01.02.04.01, M09.01.01.01) ── */}
      {searchOpen && (
        <div
          className="fixed inset-0 z-[200] bg-navy-950/80 backdrop-blur-sm flex items-start justify-center pt-24 px-4"
          onClick={(e) => { if (e.target === e.currentTarget) setSearchOpen(false); }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
              <span className="font-bold text-navy-800">Tìm kiếm</span>
              <button
                onClick={() => setSearchOpen(false)}
                className="w-8 h-8 flex items-center justify-center rounded-lg
                           text-navy-400 hover:text-orange-500 hover:bg-orange-50 transition-colors"
                aria-label="Đóng tìm kiếm"
              >
                <XIcon size={16} />
              </button>
            </div>
            {/* Input */}
            <form onSubmit={handleSearch} className="flex items-center gap-3 px-6 py-4">
              <Search size={18} className="text-navy-300 flex-shrink-0" />
              <input
                ref={searchRef}
                type="text"
                value={searchQ}
                onChange={(e) => setSearchQ(e.target.value)}
                placeholder="Nhập từ khóa tìm kiếm..."
                className="flex-1 text-navy-800 text-base outline-none placeholder:text-gray-300"
              />
              {searchQ && (
                <button type="button" onClick={() => setSearchQ("")}
                  className="text-gray-300 hover:text-gray-500 transition-colors">
                  <XIcon size={14} />
                </button>
              )}
              <button type="submit" className="btn-orange text-sm py-2 px-5">
                Tìm kiếm
              </button>
            </form>
            {/* Suggestions */}
            <div className="px-6 pb-5">
              <p className="text-xs text-navy-400 mb-3 font-medium">Tìm kiếm phổ biến:</p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Vận chuyển đường biển", "Khai thuê hải quan",
                  "FCL LCL", "Thủ tục xuất khẩu", "Thủ tục nhập khẩu",
                  "Cước vận chuyển", "Hàng lạnh",
                ].map((kw) => (
                  <button
                    key={kw}
                    onClick={() => { setSearchQ(kw); searchRef.current?.focus(); }}
                    className="text-xs bg-gray-100 hover:bg-orange-100 hover:text-orange-600
                               text-navy-500 px-3 py-1.5 rounded-full transition-colors"
                  >
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
