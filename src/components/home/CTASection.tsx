"use client";

import Link from "next/link";
import { ArrowRight, Phone, Mail, MessageCircle } from "lucide-react";

export default function CTASection() {
  return (
    <section className="py-24 bg-navy-700 relative overflow-hidden">
      {/* Decorative */}
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
            Sẵn sàng tối ưu hóa<br />
            <span className="text-orange-400">chuỗi cung ứng của bạn?</span>
          </h2>
          <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Liên hệ ngay với đội ngũ chuyên gia HD Logistics để được tư vấn phương án vận chuyển phù hợp nhất — không phí thêm, không phát sinh ẩn, phản hồi trong 2 giờ làm việc.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-12">
            <Link href="/contact" className="btn-orange shadow-orange">
              Nhận Báo Giá Miễn Phí <ArrowRight size={16} />
            </Link>
            <a href="tel:19001234" className="btn-ghost-white">
              <Phone size={15} /> Gọi: 1900 1234
            </a>
          </div>

          {/* Contact strip */}
          <div className="flex flex-wrap justify-center gap-6 text-sm text-white/50">
            <a href="tel:19001234" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Phone size={14} className="text-orange-400" />1900 1234 (24/7)
            </a>
            <span className="w-px h-4 bg-white/20 self-center hidden sm:block" />
            <a href="mailto:sales@hdlogistics.vn" className="flex items-center gap-2 hover:text-orange-400 transition-colors">
              <Mail size={14} className="text-orange-400" />sales@hdlogistics.vn
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
