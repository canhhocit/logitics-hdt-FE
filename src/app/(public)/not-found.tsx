import Link from "next/link";
import { Home, Phone } from "lucide-react";

export default function NotFound() {
  return (
    <div className="bg-white min-h-screen flex items-center justify-center">
      <div className="text-center px-5 py-20">
        <div className="text-[120px] md:text-[180px] font-black text-navy-50 leading-none select-none mb-2">
          404
        </div>
        <h1 className="text-2xl md:text-3xl font-extrabold text-navy-800 mb-3 -mt-8 relative">
          Trang không tồn tại
        </h1>
        <p className="text-navy-500 text-sm mb-8 max-w-sm mx-auto leading-relaxed">
          Trang này có thể đã bị xóa hoặc địa chỉ URL không đúng.
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link href="/" className="btn-navy">
            <Home size={16} /> Về Trang Chủ
          </Link>
          <Link href="/contact" className="btn-outline">
            <Phone size={16} /> Liên Hệ
          </Link>
        </div>
        <div className="flex flex-wrap justify-center gap-5 mt-10 text-xs text-navy-400">
          {[
            { l: "Dịch Vụ", h: "/services" },
            { l: "Về Chúng Tôi", h: "/about" },
            { l: "Tin Tức", h: "/news" },
            { l: "Tuyển Dụng", h: "/careers" },
            { l: "Tra Cứu Vận Đơn", h: "/tracking" },
          ].map((link) => (
            <Link key={link.l} href={link.h} className="hover:text-orange-500 transition-colors">
              {link.l}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
