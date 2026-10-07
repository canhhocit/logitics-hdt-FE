"use client";

import Link from "next/link";
import { useState } from "react";
import { ChevronRight, Search, Truck, MapPin, Clock, CheckCircle, AlertCircle, Package } from "lucide-react";
import { API_URL } from "@/lib/api";

const statusStyle: any = {
  TRANSIT:   { border: "border-blue-200 bg-blue-50",   dot: "bg-blue-500 animate-pulse", text: "text-blue-600"  },
  DELIVERED: { border: "border-green-200 bg-green-50", dot: "bg-green-500",              text: "text-green-600" },
  PENDING:   { border: "border-orange-200 bg-orange-50", dot: "bg-orange-500 animate-pulse", text: "text-orange-600" },
};

const statusLabels: any = {
  TRANSIT: "Đang vận chuyển",
  DELIVERED: "Đã giao thành công",
  PENDING: "Đang chờ xử lý"
};

export default function TrackingPage() {
  const [code, setCode] = useState("");
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const search = async () => {
    if (!code.trim()) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(`${API_URL}/public/tracking/${code.trim().toUpperCase()}`);
      const data = await res.json();
      if (res.ok && data.success) {
        setResult(data.data);
      } else {
        setResult("notfound");
      }
    } catch(err) {
      setResult("notfound");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Hero */}
      <section className="hero-bg pt-36 pb-20 relative overflow-hidden">
        <div className="wrap relative z-10">
          <div className="flex items-center gap-2 text-white/40 text-xs mb-6">
            <Link href="/" className="hover:text-white">Trang Chủ</Link>
            <ChevronRight size={12} />
            <span className="text-white/70">Tra Cứu Vận Đơn</span>
          </div>
          <div className="max-w-2xl">
            <p className="eyebrow text-orange-400 mb-6">THEO DÕI LÔ HÀNG</p>
            <h1 className="h1 text-white mb-5">
              Tra cứu<br />
              <span className="text-orange-400">vận đơn</span>
            </h1>
            <p className="text-white/65 text-lg leading-relaxed mb-8">
              Nhập mã vận đơn để theo dõi hành trình lô hàng theo thời gian thực — từ điểm lấy hàng đến điểm giao nhận.
            </p>
            <div className="flex gap-2 max-w-xl">
              <input type="text" value={code}
                onChange={(e) => setCode(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && search()}
                placeholder="Nhập mã vận đơn (VD: HDVN2026001234)"
                className="flex-1 bg-white rounded-xl px-5 py-3.5 text-navy-800 text-sm
                           font-medium outline-none focus:ring-2 focus:ring-orange-400 placeholder:text-gray-400" />
              <button onClick={search} disabled={loading} className="btn-orange whitespace-nowrap disabled:opacity-60">
                {loading
                  ? <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  : <Search size={15} />}
                Tra Cứu
              </button>
            </div>
            <p className="text-white/30 text-xs mt-3">
              Thử với:{" "}
              {["HDVN2026001234", "HDVN2026005678"].map((c) => (
                <button key={c} onClick={() => setCode(c)}
                  className="font-mono text-orange-400 hover:text-orange-300 transition-colors mx-1">{c}</button>
              ))}
            </p>
          </div>
        </div>
      </section>

      {/* Result */}
      <section className="py-16">
        <div className="wrap max-w-4xl">

          {result === "notfound" && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-red-100 rounded-2xl flex items-center justify-center text-red-500 mx-auto mb-5">
                <AlertCircle size={28} />
              </div>
              <h3 className="text-xl font-bold text-navy-800 mb-2">Không tìm thấy vận đơn</h3>
              <p className="text-navy-500 text-sm">
                Mã "<span className="font-mono font-bold text-navy-700">{code}</span>" không tồn tại.
                Kiểm tra lại hoặc gọi hotline <a href="tel:19001234" className="text-orange-500 font-semibold">1900 1234</a>.
              </p>
            </div>
          )}

          {result && result !== "notfound" && (() => {
            const ship = result.shipment;
            const s = statusStyle[ship.status] || statusStyle.PENDING;
            const label = statusLabels[ship.status] || ship.status;
            return (
              <div className="space-y-5">
                {/* Status */}
                <div className={`rounded-2xl border-2 p-6 ${s.border}`}>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-3 h-3 rounded-full flex-shrink-0 ${s.dot}`} />
                      <div>
                        <p className="text-navy-500 text-xs mb-0.5">Mã: <span className="font-mono font-bold text-navy-700">{ship.trackingCode}</span></p>
                        <p className={`font-extrabold text-lg ${s.text}`}>{label}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-navy-400 text-xs">Dự kiến giao</p>
                      <p className="font-bold text-navy-800 text-lg">{ship.etaDate}</p>
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                    { icon: <MapPin size={14} />, label: "Điểm đi",    val: ship.origin },
                    { icon: <MapPin size={14} />, label: "Điểm đến",   val: ship.destination },
                    { icon: <Package size={14} />, label: "Khối lượng", val: ship.weightInfo },
                    { icon: <Truck size={14} />,   label: "Dịch vụ",   val: ship.serviceName },
                  ].map((info) => (
                    <div key={info.label} className="card p-4">
                      <div className="flex items-center gap-1.5 text-orange-500 mb-2">
                        {info.icon}
                        <span className="text-xs text-navy-400">{info.label}</span>
                      </div>
                      <p className="text-navy-800 text-sm font-semibold leading-snug">{info.val}</p>
                    </div>
                  ))}
                </div>

                {/* Timeline */}
                <div className="card p-7">
                  <h3 className="font-bold text-navy-800 mb-6 pb-4 border-b border-gray-100">Hành Trình Vận Chuyển</h3>
                  <div className="space-y-0">
                    {result.timeline.map((ev: any, i: number) => (
                      <div key={ev.id || i} className="flex gap-4 relative">
                        {i < result.timeline.length - 1 && (
                          <div className="absolute left-4 top-8 bottom-0 w-px bg-gray-200" />
                        )}
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 z-10 mt-0.5
                          ${i === 0 ? "bg-orange-500" : "bg-gray-100 border border-gray-200"}`}>
                          {i === 0
                            ? <Truck size={14} className="text-white" />
                            : <div className="w-2 h-2 rounded-full bg-gray-400" />}
                        </div>
                        <div className="pb-6 flex-1">
                          <p className={`text-sm font-medium ${i === 0 ? "text-navy-800" : "text-navy-500"}`}>{ev.description}</p>
                          <div className="flex flex-wrap gap-3 mt-1 text-xs text-navy-400">
                            <span className="flex items-center gap-1"><MapPin size={10} />{ev.location}</span>
                            <span className="flex items-center gap-1"><Clock size={10} />{ev.eventTime}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <p className="text-center text-navy-400 text-sm">
                  Cần hỗ trợ? Gọi <a href="tel:19001234" className="text-orange-500 font-bold hover:text-orange-600">1900 1234</a>
                </p>
              </div>
            );
          })()}

          {!result && (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-400 mx-auto mb-5">
                <Search size={28} />
              </div>
              <h3 className="text-navy-600 font-semibold text-lg mb-2">Nhập mã để tra cứu</h3>
              <p className="text-navy-400 text-sm max-w-xs mx-auto">
                Mã vận đơn được cung cấp trong biên lai sau khi sử dụng dịch vụ HDT Logistics.
              </p>
            </div>
          )}
        </div>
      </section>

      {/* Help */}
      <section className="py-16 bg-slate-50 border-t border-gray-100">
        <div className="wrap">
          <div className="grid md:grid-cols-3 gap-5">
            {[
              { icon: "📦", title: "Mã vận đơn ở đâu?", desc: "Mã 14 ký tự bắt đầu bằng HDVN được gửi qua SMS/email ngay sau khi đặt dịch vụ." },
              { icon: "🔄", title: "Cập nhật bao lâu?", desc: "Trạng thái được cập nhật tự động từ hệ thống GPS và điểm trung chuyển — thường mỗi 4–6 giờ." },
              { icon: "📞", title: "Cần hỗ trợ thêm?", desc: "Gọi hotline 1900 1234 (24/7) hoặc email tracking@hdtlogistics.vn để được hỗ trợ ngay." },
            ].map((item) => (
              <div key={item.title} className="card p-7">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h4 className="font-bold text-navy-800 mb-2">{item.title}</h4>
                <p className="text-navy-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
