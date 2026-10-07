import Link from "next/link";
import { Phone, ArrowRight, AlertTriangle } from "lucide-react";


interface CTABlockProps {
  settings?: any;
  variant?: "full" | "compact";
  showNote?: boolean;
}

/**
 * M08.01 – Khối CTA 'Nhận tư vấn' dùng chung
 * Xuất hiện đầu/cuối hầu hết các trang
 */
export default function CTABlock({ variant = "full", showNote = true, settings }: CTABlockProps) {
  if (variant === "compact") {
    return (
      <section className="py-14 bg-slate-50 border-t border-gray-100">
        <div className="wrap flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <div>
            <h3 className="text-xl font-extrabold text-navy-800 mb-1">
              Cần tư vấn giải pháp vận chuyển?
            </h3>
            <p className="text-navy-500 text-sm">
              Đội ngũ chuyên gia sẵn sàng phân tích và báo giá trong 2 giờ làm việc.
            </p>
          </div>
          <div className="flex gap-3 flex-shrink-0">
            <Link href="/contact" className="btn-orange">
              Nhận Tư Vấn <ArrowRight size={15} />
            </Link>
            <a href={`tel:${(settings?.hotline || "")}`} className="btn-outline">
              <Phone size={14} /> {(settings?.hotline || "")}
            </a>
          </div>
        </div>
        {/* M08.01.02.02 – Lưu ý phạm vi dịch vụ */}
        {showNote && (
          <div className="wrap mt-5">
            <div className="flex items-start gap-2 bg-amber-50 border border-amber-200 rounded-xl p-4">
              <AlertTriangle size={15} className="text-amber-500 flex-shrink-0 mt-0.5" />
              <p className="text-amber-700 text-xs leading-relaxed">
                <strong>Lưu ý:</strong> HDT Logistics chưa có dịch vụ chuyển phát hàng cá nhân
                và chuyển thư tín. Chúng tôi chuyên phục vụ khách hàng doanh nghiệp (B2B).
              </p>
            </div>
          </div>
        )}
      </section>
    );
  }

  return (
    <section className="py-20 bg-navy-700 relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-20 right-10 w-96 h-96 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-72 h-72 rounded-full bg-orange-500/15 blur-3xl" />
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <div className="wrap relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          <p className="eyebrow text-orange-400 mb-6 justify-center">Bắt Đầu Ngay</p>
          <h2 className="h2 text-white mb-5">
            Sẵn sàng tối ưu hóa<br />
            <span className="text-orange-400">chuỗi cung ứng của bạn?</span>
          </h2>
          <p className="text-white/65 text-lg leading-relaxed mb-10 max-w-xl mx-auto">
            Liên hệ với đội ngũ chuyên gia HDT Logistics để được tư vấn phương án vận
            chuyển và hải quan phù hợp nhất — phản hồi trong 2 giờ làm việc.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <Link href="/contact" className="btn-orange shadow-orange">
              Nhận Tư Vấn Miễn Phí <ArrowRight size={16} />
            </Link>
            <a href={`tel:${(settings?.hotline || "")}`} className="btn-ghost-white">
              <Phone size={15} /> {(settings?.hotline || "")}
            </a>
          </div>

          {/* Note (M01.04.02.02) */}
          {showNote && (
            <div className="inline-flex items-start gap-2 bg-white/10 border border-white/20
                            rounded-xl px-5 py-3 text-left max-w-xl">
              <AlertTriangle size={14} className="text-orange-300 flex-shrink-0 mt-0.5" />
              <p className="text-white/60 text-xs leading-relaxed">
                <strong className="text-white/80">Lưu ý:</strong> HDT Logistics chưa có dịch vụ
                chuyển phát hàng cá nhân và chuyển thư tín. Chúng tôi chuyên phục vụ
                khách hàng doanh nghiệp (B2B).
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
