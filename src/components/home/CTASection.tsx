"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

interface Props {
  settings?: Record<string, string>;
}

export default function CTASection({ settings = {} }: Props) {
  const title    = settings.cta_title    || "";
  const subtitle = settings.cta_subtitle || "";
  const hotline  = settings.hotline      || "";
  const hotlineRaw = settings.hotline_raw || "";
  const emailSales = settings.email_sales || "";

  return (
    <section className="py-24 bg-navy-700 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-500/15 blur-3xl" />
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="wrap relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-orange-400 mb-6 justify-center">Bắt Đầu Ngay Hôm Nay</p>
          <h2 className="h2 text-white mb-6">
            {/* Tách highlight nếu có dấu — */}
            {title.includes("—") ? (
              <>
                {title.split("—")[0].trim()}<br />
                <span className="text-orange-400">{title.split("—")[1]?.trim()}</span>
              </>
            ) : (
              title
            )}
          </h2>
          <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">{subtitle}</p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link href="/contact" className="btn-orange shadow-orange">
              Nhận Báo Giá Miễn Phí <ArrowRight size={16} />
            </Link>
            <a href={`tel:${hotlineRaw}`} className="btn-ghost-white">
              <Phone size={15} /> Gọi: {hotline}
            </a>
          </div>

          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <a href={`tel:${hotlineRaw}`} className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Phone size={14} className="text-orange-400" />{hotline} (24/7)
            </a>
            <span className="w-px h-4 bg-white/20 self-center hidden sm:block" />
            <a href={`mailto:${emailSales}`} className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Mail size={14} className="text-orange-400" />{emailSales}
            </a>
            <span className="w-px h-4 bg-white/20 self-center hidden sm:block" />
            <span className="flex items-center gap-2">
              <MessageCircle size={14} className="text-orange-400" />
              Phản hồi trong <strong className="text-white/80">2 giờ làm việc</strong>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
