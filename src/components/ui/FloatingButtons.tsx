"use client";

import { useState, useEffect } from "react";
import { Phone, MessageCircle, ChevronUp, X, Mail } from "lucide-react";
import clsx from "clsx";

export default function FloatingButtons() {
  const [showTop, setShowTop] = useState(false);
  const [chatOpen, setChatOpen] = useState(false);

  useEffect(() => {
    const fn = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <>
      {/* Hotline pulse */}
      <div className="fixed bottom-24 right-5 z-50">
        <a href="tel:19001234" aria-label="Gọi hotline"
          className="relative flex items-center justify-center w-13 h-13
                     bg-green-500 hover:bg-green-600 text-white rounded-full
                     shadow-lg shadow-green-500/40 transition-all hover:scale-110"
          style={{ width: 52, height: 52 }}>
          <Phone size={20} />
          <span className="absolute inset-0 rounded-full bg-green-400 animate-ping opacity-30" />
        </a>
      </div>

      {/* Chat button */}
      <div className="fixed bottom-7 right-5 z-50">
        <button onClick={() => setChatOpen(!chatOpen)} aria-label="Chat hỗ trợ"
          className="flex items-center justify-center w-13 h-13
                     bg-navy-700 hover:bg-navy-800 text-white rounded-full
                     shadow-lg shadow-navy-700/40 transition-all hover:scale-110"
          style={{ width: 52, height: 52 }}>
          {chatOpen ? <X size={20} /> : <MessageCircle size={20} />}
        </button>

        {/* Popup */}
        {chatOpen && (
          <div className="absolute bottom-16 right-0 w-72 bg-white rounded-2xl
                          shadow-2xl border border-gray-200 overflow-hidden">
            {/* Header */}
            <div className="bg-navy-700 px-5 py-4">
              <p className="text-white font-bold text-sm">HD Logistics</p>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="w-2 h-2 rounded-full bg-green-400" />
                <span className="text-white/60 text-xs">Phản hồi trong 2 giờ làm việc</span>
              </div>
            </div>
            {/* Options */}
            <div className="p-4 space-y-2.5">
              <a href="tel:19001234"
                className="flex items-center gap-3 p-3.5 rounded-xl
                           bg-green-50 border border-green-200
                           hover:bg-green-100 transition-colors">
                <div className="w-9 h-9 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Phone size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-navy-700 text-xs font-bold">Gọi Hotline</p>
                  <p className="text-green-600 font-bold">1900 1234</p>
                </div>
              </a>
              <a href="https://zalo.me/hdlogistics" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 p-3.5 rounded-xl
                           bg-blue-50 border border-blue-200
                           hover:bg-blue-100 transition-colors">
                <div className="w-9 h-9 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-navy-700 text-xs font-bold">Chat Zalo</p>
                  <p className="text-blue-600 font-bold text-sm">Nhắn tin ngay</p>
                </div>
              </a>
              <a href="mailto:sales@hdlogistics.vn"
                className="flex items-center gap-3 p-3.5 rounded-xl
                           bg-orange-50 border border-orange-200
                           hover:bg-orange-100 transition-colors">
                <div className="w-9 h-9 bg-orange-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail size={15} className="text-white" />
                </div>
                <div>
                  <p className="text-navy-700 text-xs font-bold">Gửi Email</p>
                  <p className="text-orange-600 font-bold text-xs">sales@hdlogistics.vn</p>
                </div>
              </a>
            </div>
          </div>
        )}
      </div>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Lên đầu trang"
        className={clsx(
          "fixed bottom-7 left-5 z-50 w-11 h-11 rounded-full",
          "bg-white border-2 border-gray-200 text-navy-500",
          "hover:border-navy-500 hover:text-navy-700 hover:bg-navy-50",
          "shadow-sm flex items-center justify-center transition-all duration-300",
          showTop ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        )}>
        <ChevronUp size={18} />
      </button>
    </>
  );
}
