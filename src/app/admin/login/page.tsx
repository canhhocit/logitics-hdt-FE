"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, User, Lock, AlertCircle, Zap, Clock } from "lucide-react";
import { login } from "../_lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username,       setUsername]       = useState("");
  const [password,       setPassword]       = useState("");
  const [showPw,         setShowPw]         = useState(false);
  const [loading,        setLoading]        = useState(false);
  const [quickLoading,   setQuickLoading]   = useState(false);
  const [error,          setError]          = useState("");
  const [sessionExpired, setSessionExpired] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        const params = new URLSearchParams(window.location.search);
        const hasParam = params.get("expired") === "1" || params.get("reason") === "expired";
        const hasStorage = sessionStorage.getItem("admin_session_expired") === "1";
        if (hasParam || hasStorage) {
          setSessionExpired(true);
          sessionStorage.removeItem("admin_session_expired");
        }
      } catch {}
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSessionExpired(false);
    setLoading(true);
    try {
      const data = await login(username, password);
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      router.push("/admin");
    } catch (err: any) {
      setError(err.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại tài khoản hoặc mật khẩu.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async () => {
    setError("");
    setSessionExpired(false);
    setUsername("admin");
    setPassword("admin");
    setQuickLoading(true);
    try {
      const data = await login("admin", "admin");
      localStorage.setItem("accessToken", data.accessToken);
      localStorage.setItem("adminUser", JSON.stringify(data.user));
      router.push("/admin");
    } catch (err: any) {
      // Graceful fallback for offline demo / presentation mode
      localStorage.setItem("accessToken", "demo-token-" + Date.now());
      localStorage.setItem(
        "adminUser",
        JSON.stringify({ id: "demo-admin", username: "admin", fullName: "Quản trị viên Demo" })
      );
      router.push("/admin");
    } finally {
      setQuickLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col justify-center items-center p-4 sm:p-6 py-8 sm:py-12 relative selection:bg-navy-100 selection:text-navy-900">
      <div className="w-full max-w-[380px] sm:max-w-[400px]">
        {/* Brand Header with Real Official Logo */}
        <div className="text-center mb-5 sm:mb-6 flex flex-col items-center">
          <div className="mb-1.5">
            <Image
              src="/images/logo.png"
              alt="HDT Logistics"
              width={160}
              height={48}
              className="h-11 sm:h-12 w-auto object-contain"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/logo.svg";
              }}
            />
          </div>
          <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">Quản trị & Điều hành</h1>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
          <div className="mb-5 pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Đăng nhập tài khoản</h2>
          </div>

          {/* Session Expired Notice */}
          {sessionExpired && !error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 bg-amber-50 border border-amber-200/90 text-amber-800 text-xs px-3.5 py-3 rounded-lg leading-relaxed shadow-2xs animate-in fade-in duration-150"
            >
              <Clock size={16} className="flex-shrink-0 mt-0.5 text-amber-600" />
              <div>
                <p className="font-semibold text-amber-900">Phiên làm việc đã hết hạn</p>
                <p className="text-amber-700 mt-0.5">Vui lòng đăng nhập lại.</p>
              </div>
            </div>
          )}

          {error && (
            <div
              role="alert"
              className="mb-5 flex items-start gap-2.5 bg-red-50 border border-red-200 text-red-700 text-xs px-3.5 py-3 rounded-lg leading-relaxed animate-in fade-in duration-150"
            >
              <AlertCircle size={15} className="flex-shrink-0 mt-0.5 text-red-600" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="login-username">
                Tên đăng nhập
              </label>
              <div className="relative">
                <User size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="login-username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="admin"
                  required
                  autoComplete="username"
                  className="w-full pl-9 pr-3.5 py-2.5 text-sm sm:text-xs border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400
                             focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5" htmlFor="login-password">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                <input
                  id="login-password"
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-9 pr-10 py-2.5 text-sm sm:text-xs border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400
                             focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200 transition-colors [&::-ms-reveal]:hidden [&::-ms-clear]:hidden"
                />
                <button
                  type="button"
                  onClick={() => setShowPw(!showPw)}
                  aria-label={showPw ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 p-0.5 transition-colors focus:outline-none"
                >
                  {showPw ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || quickLoading}
              className="w-full mt-2 bg-navy-600 hover:bg-navy-700 text-white text-sm sm:text-xs font-semibold
                         py-2.5 sm:py-3 px-4 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy-600 focus-visible:ring-offset-2
                         disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99]"
            >
              {loading ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  <span>Đang xác thực...</span>
                </>
              ) : (
                <span>Đăng nhập hệ thống</span>
              )}
            </button>

            {/* Quick Demo Login */}
            <div className="relative my-3 pt-1">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-slate-200/80"></div>
              </div>
              <div className="relative flex justify-center text-[10px] uppercase font-semibold text-slate-400">
                <span className="bg-white px-2.5 select-none">Hoặc</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleQuickLogin}
              disabled={loading || quickLoading}
              className="w-full bg-slate-50 hover:bg-slate-100/90 text-slate-700 border border-slate-200/90 text-sm sm:text-xs font-medium
                         py-2.5 sm:py-3 px-4 rounded-lg shadow-2xs transition-all duration-150 flex items-center justify-center gap-2
                         focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-400 focus-visible:ring-offset-1
                         disabled:opacity-60 disabled:cursor-not-allowed active:scale-[0.99] group"
            >
              {quickLoading ? (
                <>
                  <Loader2 size={14} className="animate-spin text-navy-600" />
                  <span className="text-slate-600">Đang đăng nhập admin...</span>
                </>
              ) : (
                <>
                  <Zap size={14} className="text-amber-500 fill-amber-500/20 group-hover:scale-110 transition-transform" />
                  <span>Đăng nhập nhanh (admin / admin)</span>
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
