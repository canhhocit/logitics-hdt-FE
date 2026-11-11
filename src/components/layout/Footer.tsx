import Link from "next/link";
import Image from "next/image";
import { Phone, Mail, MapPin, Clock, ArrowRight, Facebook, Instagram, Twitter } from "lucide-react";

interface Office {
  id: string;
  name: string;
  address: string;
  phone: string;
  region: string;
}

interface MenuItem {
  id?: string;
  label: string;
  url?: string;
  href?: string;
}

interface Props {
  settings?: Record<string, string>;
  footerMenu?: MenuItem[];
  offices?: Office[];
}

const SERVICE_LINKS = [
  { label: "Vận Chuyển Đường Không",  href: "/services/van-chuyen-duong-khong" },
  { label: "Vận Chuyển Đường Biển",   href: "/services/van-chuyen-duong-bien" },
  { label: "Pickup",                   href: "/services/pickup" },
  { label: "Vận Chuyển Đường Bộ",      href: "/services/van-chuyen-duong-bo" },
  { label: "Khai Thuê Hải Quan",        href: "/services/khai-thue-hai-quan" },
];

const QUICK_LINKS_FALLBACK = [
  { label: "Trang Chủ",           href: "/" },
  { label: "Về Chúng Tôi",        href: "/about" },
  { label: "Tư Vấn Hải Quan",     href: "/tu-van-hai-quan" },
  { label: "Tin Tức",              href: "/news" },
  { label: "Liên Hệ",              href: "/contact" },
  { label: "Chính Sách Bảo Mật",  href: "/privacy" },
  { label: "Điều Khoản Dịch Vụ",  href: "/terms" },
];

const REGION_MAP: Record<string, string> = { BAC: "Miền Bắc", TRUNG: "Miền Trung", NAM: "Miền Nam" };
const REGION_ABBR: Record<string, string> = { BAC: "B", TRUNG: "T", NAM: "N" };

export default function Footer({ settings = {}, footerMenu = [], offices = [] }: Props) {
  const hotline        = settings.hotline              || "0911 188 726";
  const hotlineRaw     = settings.hotline_raw           || "0911188726";
  const hotlineContact = settings.hotline_contact       || "0911 188 726";
  const hotlineContactRaw = settings.hotline_contact_raw || "0911188726";
  const email          = settings.email                || "hdt.logistics.jsc@gmail.com";
  const emailSales     = settings.email_sales          || "hdt.logistics.jsc@gmail.com";
  const workingHours   = settings.working_hours        || "08:00 – 17:30 (Thứ 2 - Thứ 7)";
  const facebookUrl    = settings.facebook_url         || "https://facebook.com";
  const instagramUrl   = settings.instagram_url        || "#";
  const twitterUrl     = settings.twitter_url          || "#";
  const companyName    = settings.company_full_name    || "CÔNG TY CỔ PHẦN HDT LOGISTICS";
  const companyShortName = settings.company_short_name || "HDT LOGISTICS., JSC";
  const companyIntName = settings.company_int_name     || "HDT LOGISTICS JOINT STOCK COMPANY";
  const taxCode        = settings.tax_code             || "0111638260";
  const companyAddress = settings.company_address      || "Số 46/9/11 đường An Thọ, Xã An Khánh, TP Hà Nội, Việt Nam";
  const representative = settings.representative       || "TRẦN VĂN TOẢN";
  const licenseDate    = settings.license_date         || "08/04/2024";
  const licenseOrg     = settings.license_org          || "Sở Kế hoạch và Đầu tư TP Hà Nội";
  const ctaTitle       = settings.cta_title            || "Bắt đầu hợp tác cùng HDT Logistics";

  const quickLinks = footerMenu.length > 0
    ? footerMenu.map((m) => ({ label: m.label, href: m.url || m.href || "/" }))
    : QUICK_LINKS_FALLBACK;

  // Group offices by region
  const officesByRegion: Record<string, Office[]> = {};
  offices.forEach((o) => {
    if (!officesByRegion[o.region]) officesByRegion[o.region] = [];
    officesByRegion[o.region].push(o);
  });
  const hasOffices = Object.keys(officesByRegion).length > 0;

  return (
    <footer id="footer" className="bg-navy-900 text-white">

      {/* CTA band */}
      <div className="bg-navy-800 border-b border-white/10">
        <div className="wrap py-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <p className="eyebrow text-orange-400 mb-2">Bắt đầu hợp tác</p>
            <h3 className="text-2xl md:text-3xl font-extrabold tracking-tight">{ctaTitle}</h3>
          </div>
          <div className="flex flex-wrap gap-3 flex-shrink-0">
            <Link href="/contact" className="btn-orange">
              Nhận Tư Vấn <ArrowRight size={15} />
            </Link>
            <a href={`tel:${hotlineRaw}`} className="btn-ghost-white">
              <Phone size={14} /> {hotline}
            </a>
          </div>
        </div>
      </div>

      {/* Main grid */}
      <div className="wrap py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-flex items-center mb-5 group">
              <div className="bg-white rounded-lg px-2.5 py-1.5 shadow-2xs inline-flex items-center justify-center transition-all duration-200 group-hover:shadow-md">
                <Image
                  src="/images/logo.png"
                  alt="HDT Logistics"
                  width={150}
                  height={50}
                  className="object-contain h-10 w-auto"
                />
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-4">
              {companyName}. Giải pháp logistics tổng thể — vận chuyển quốc tế, vận tải nội địa, khai thuê hải quan và kho bãi.
            </p>
            <p className="text-orange-400 text-xs font-bold tracking-wider uppercase mb-5">
              Kết nối hành trình - Vươn tới tương lai
            </p>
            <div className="flex gap-2">
              <a href={facebookUrl} target="_blank" rel="noreferrer" aria-label="Facebook"
                className="w-8 h-8 rounded-lg bg-blue-600 hover:bg-blue-500 flex items-center justify-center transition-colors">
                <Facebook size={15} />
              </a>
              <a href={instagramUrl} target="_blank" rel="noreferrer" aria-label="Instagram"
                className="w-8 h-8 rounded-lg bg-pink-600 hover:bg-pink-500 flex items-center justify-center transition-colors">
                <Instagram size={15} />
              </a>
              <a href={twitterUrl} target="_blank" rel="noreferrer" aria-label="Twitter"
                className="w-8 h-8 rounded-lg bg-sky-500 hover:bg-sky-400 flex items-center justify-center transition-colors">
                <Twitter size={15} />
              </a>
              <a href={`mailto:${email}`} aria-label="Email"
                className="w-8 h-8 rounded-lg bg-orange-500 hover:bg-orange-400 flex items-center justify-center transition-colors">
                <Mail size={15} />
              </a>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-5">Dịch Vụ</h4>
            <ul className="space-y-2.5">
              {SERVICE_LINKS.map((l) => (
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
                  <a href={`tel:${hotlineRaw}`} className="block text-sm text-white/70 hover:text-white">
                    Hotline: {hotline}
                  </a>
                  <a href={`tel:${hotlineContactRaw}`} className="block text-sm text-white/45 hover:text-white">
                    Liên hệ: {hotlineContact}
                  </a>
                </div>
              </li>
              <li className="flex gap-3">
                <Mail size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
                <div>
                  <a href={`mailto:${email}`} className="block text-sm text-white/70 hover:text-orange-400">{email}</a>
                  <a href={`mailto:${emailSales}`} className="block text-sm text-white/45 hover:text-orange-400">{emailSales}</a>
                </div>
              </li>
              <li className="flex gap-3">
                <Clock size={14} className="text-orange-400 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-white/50">
                  <p>Hàng ngày: {workingHours}</p>
                  <p>Hotline hỗ trợ 24/7</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Văn phòng từ API */}
      {hasOffices && (
        <div className="border-t border-white/[0.08]">
          <div className="wrap py-10">
            <h4 className="text-xs font-bold tracking-[0.15em] uppercase text-white/40 mb-7">
              Hệ Thống Văn Phòng
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {["BAC", "TRUNG", "NAM"].map((regionCode) => {
                const regionOffices = officesByRegion[regionCode];
                if (!regionOffices?.length) return null;
                return (
                  <div key={regionCode}>
                    <p className="text-orange-400 font-bold text-xs tracking-widest uppercase mb-4">
                      {REGION_MAP[regionCode] || regionCode}
                    </p>
                    <div className="space-y-5">
                      {regionOffices.map((b) => (
                        <div key={b.id}>
                          <p className="text-white/80 text-sm font-semibold mb-1">{b.name}</p>
                          <div className="flex gap-2 text-xs text-white/45 mb-1">
                            <MapPin size={11} className="flex-shrink-0 mt-0.5 text-orange-400/60" />
                            <span>{b.address}</span>
                          </div>
                          <div className="flex gap-2 text-xs text-white/45">
                            <Phone size={11} className="flex-shrink-0 mt-0.5 text-orange-400/60" />
                            <a href={`tel:${b.phone?.replace(/\s/g, "")}`}
                              className="hover:text-orange-400 transition-colors">
                              TEL: {b.phone}
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Bottom */}
      <div className="border-t border-white/[0.08]">
        <div className="wrap py-6 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="text-xs text-white/50 space-y-1.5 max-w-2xl">
            <p className="font-bold text-white/90 text-sm uppercase tracking-wide">{companyName}</p>
            <p className="text-white/60">
              <span className="text-white/40">Tên quốc tế:</span> {companyIntName} ({companyShortName})
            </p>
            <p className="text-white/60 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span><span className="text-white/40">Mã số thuế:</span> <strong className="font-mono text-white/80 font-semibold">{taxCode}</strong></span>
              <span className="text-white/20">|</span>
              <span><span className="text-white/40">Người đại diện:</span> <strong className="text-white/80 font-medium">{representative}</strong></span>
              <span className="text-white/20">|</span>
              <span className="inline-flex items-center gap-1 text-emerald-400 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" /> Đang hoạt động
              </span>
            </p>
            <p className="text-white/60">
              <span className="text-white/40">Địa chỉ:</span> {companyAddress}
            </p>
            <p className="pt-1 text-white/30 text-[11px]">
              © {new Date().getFullYear()} HDT Logistics. Tất cả quyền được bảo lưu.{" "}
              <span className="text-white/20">Thiết kế bởi HD Tech Team.</span>
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-4 flex-shrink-0">
            <div className="border border-white/15 rounded-lg px-3 py-2 text-center bg-white/[0.02]">
              <p className="text-[10px] text-white/40 leading-tight">Đã thông báo</p>
              <p className="text-[10px] text-white/60 leading-tight font-semibold">Bộ Công Thương</p>
            </div>
            <div className="flex gap-4 text-xs text-white/40">
              <Link href="/privacy" className="hover:text-white/80 transition-colors">Chính sách bảo mật</Link>
              <span>·</span>
              <Link href="/terms" className="hover:text-white/80 transition-colors">Điều khoản dịch vụ</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
