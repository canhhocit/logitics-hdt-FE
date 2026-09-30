import Link from "next/link";
import Image from "next/image";
import {
  Phone, Mail, MapPin, Clock, ArrowRight,
  Facebook, Instagram, Twitter,
} from "lucide-react";
import { company, offices } from "@/data";

const serviceLinks = [
  { label: "Vận Chuyển Đường Không",   href: "/services/van-chuyen-duong-khong" },
  { label: "Vận Chuyển Đường Biển",    href: "/services/van-chuyen-duong-bien" },
  { label: "Gom Hàng Lẻ (LCL)",         href: "/services/gom-hang-le-lcl" },
  { label: "Vận Chuyển Đường Bộ",       href: "/services/van-chuyen-duong-bo" },
  { label: "Khai Thuê Hải Quan",         href: "/services/khai-thue-hai-quan" },
  { label: "Hàng Đặc Biệt / Dự Án",     href: "/services/hang-dac-biet-du-an" },
];

const quickLinks = [
  { label: "Trang Chủ",          href: "/" },
  { label: "Về Chúng Tôi",       href: "/about" },
  { label: "Tư Vấn Hải Quan",    href: "/tu-van-hai-quan" },
  { label: "Tin Tức",             href: "/news" },
  { label: "Liên Hệ",             href: "/contact" },
  { label: "Chính Sách Bảo Mật", href: "/privacy" },
  { label: "Điều Khoản Dịch Vụ", href: "/terms" },
];

export default function Footer() {
  return (
    <footer id="footer" className="bg-navy-900 text-white">

      {/* ── CTA band ── */}
      <div className="bg-navy-800 border-b border-white/10">
        <div className="wrap py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="eyebrow text-orange-400 mb-2">Bắt đầu hợp tác</p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">
              Tối ưu logistics cùng HD Logistics
            </h3>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link href="/contact" className="btn-orange">
              Nhận Tư Vấn <ArrowRight size={15} />
            </Link>
            <a href={`tel:${company.hotlineRaw}`} className="btn-ghost-white">
              <Phone size={14} /> {company.hotline}
            </a>
          </div>
        </div>
      </div>

      {/* ── Main grid ── */}
      <div className="wrap py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-5">
              <Image
                src="/images/logo.svg"
                alt="HD Logistics"
                width={140} height={56}
                className="object-contain brightness-0 invert h-11 w-auto"
              />
            </Link>
            <p className="text-white/50 text-sm leading-relaxed mb-4">
              {company.name}. Giải pháp logistics tổng thể — vận chuyển quốc tế, vận tải nội địa, khai thuê hải quan và kho bãi.
            </p>
            <p className="text-orange-400 text-xs font-bold tracking-wider uppercase mb-5">
              High Delivery · High Discipline · High Reliability
            </p>
            {/* Social (M01.03.03.01) */}
            <div className="flex gap-2">
              <a href={company.social.facebook} target="_blank" rel="noreferrer" aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors">
                <Facebook size={15} />
              </a>
              <a href={company.social.instagram} target="_blank" rel="noreferrer" aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-pink-600 hover:bg-pink-500 flex items-center justify-center transition-colors">
                <Instagram size={15} />
              </a>
              <a href={company.social.twitter} target="_blank" rel="noreferrer" aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-sky-500 hover:bg-sky-400 flex items-center justify-center transition-colors">
                <Twitter size={15} />
              </a>
              <a href={company.social.email} aria-label="Email"
                className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-400 flex items-center justify-center transition-colors">
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-5">Dịch Vụ</h4>
            <ul className="space-y-2.5">
              {serviceLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-sm text-white/55 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-5">Liên Kết Nhanh</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link href={l.href}
                    className="text-sm text-white/55 hover:text-orange-400 transition-colors flex items-center gap-2 group">
                    <ArrowRight size={11} className="opacity-0 group-hover:opacity-100 transition-opacity -ml-1" />
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-5">Liên Hệ</h4>
            <ul className="space-y-4">
              <li className="flex gap-3">
                <Phone size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href={`tel:${company.hotlineRaw}`} className="block text-sm text-white/70 hover:text-white">
                    Hotline: {company.hotline}
                  </a>
                  <a href={`tel:${company.hotlineContactRaw}`} className="block text-sm text-white/45 hover:text-white">
                    Liên hệ: {company.hotlineContact}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href={`mailto:${company.email}`} className="block text-sm text-white/70 hover:text-orange-400">{company.email}</a>
                  <a href={`mailto:${company.emailSales}`} className="block text-sm text-white/45 hover:text-orange-400">{company.emailSales}</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/50">
                  <p>Hàng ngày: {company.workingHours}</p>
                  <p>Hotline hỗ trợ 24/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ── Văn phòng 3 miền (M01.03.01) ── */}
      <div className="border-t border-white/[0.08]">
        <div className="wrap py-10">
          <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-7">
            Hệ Thống Văn Phòng
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {offices.map((region) => (
              <div key={region.region}>
                <p className="text-orange-400 font-bold text-xs tracking-widest uppercase mb-4">
                  {region.region}
                </p>
                <div className="space-y-5">
                  {region.branches.map((b) => (
                    <div key={b.name}>
                      <p className="text-white/80 text-sm font-semibold mb-1">{b.name}</p>
                      <div className="flex gap-2 text-xs text-white/45 mb-1">
                        <MapPin size={11} className="flex-shrink-0 mt-0.5 text-orange-400/60" />
                        <span>{b.address}</span>
                      </div>
                      <div className="flex gap-2 text-xs text-white/45">
                        <Phone size={11} className="flex-shrink-0 mt-0.5 text-orange-400/60" />
                        <a href={`tel:${b.telRaw}`} className="hover:text-orange-400 transition-colors">
                          TEL: {b.tel}
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Bottom – pháp lý (M01.03.02) ── */}
      <div className="border-t border-white/[0.06]">
        <div className="wrap py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
          {/* Legal text (M01.03.02.01) */}
          <div className="text-xs text-white/30 space-y-1">
            <p className="font-semibold text-white/50">{company.name}</p>
            <p>
              MSDN: {company.taxCode} — Cấp ngày {company.licenseDate} bởi {company.licenseOrg}
            </p>
            {/* Copyright (M01.03.02.04) */}
            <p>
              © {new Date().getFullYear()} HD Logistics. Tất cả quyền được bảo lưu.{" "}
              <span className="text-white/20">Thiết kế bởi HD Tech Team.</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            {/* BCT badge placeholder (M01.03.02.02) */}
            <div className="border border-white/15 rounded-lg px-3 py-2 text-center">
              <p className="text-[10px] text-white/40 leading-tight">Đã thông báo</p>
              <p className="text-[10px] text-white/40 leading-tight font-semibold">Bộ Công Thương</p>
            </div>

            {/* Legal links (M01.03.02.03) */}
            <div className="flex gap-4 text-xs text-white/30">
              <Link href="/privacy" className="hover:text-white/60 transition-colors">Chính sách bảo mật</Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-white/60 transition-colors">Điều khoản dịch vụ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
