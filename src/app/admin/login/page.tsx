"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, User, Lock, AlertCircle, ShieldCheck } from "lucide-react";
import { login } from "../_lib/api";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPw,   setShowPw]   = useState(false);
  const [loading,  setLoading]  = useState(false);
  const [error,    setError]    = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
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

  return (
    <div className="min-h-screen bg-slate-50/70 flex flex-col justify-center items-center p-4 sm:p-6 relative selection:bg-navy-100 selection:text-navy-900">
      <div className="w-full max-w-[400px]">
        {/* Brand Header with Real Official Logo */}
        <div className="text-center mb-8 flex flex-col items-center">
          <div className="mb-4">
            <Image
              src="/images/logo.png"
              alt="HDT Logistics"
              width={160}
              height={50}
              className="h-10 w-auto object-contain"
              priority
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/images/logo.svg";
              }}
            />
          </div>
          <h1 className="text-base font-bold text-slate-800 tracking-tight">Hệ thống Quản trị & Điều hành</h1>
          <p className="text-xs text-slate-400 mt-0.5">Cổng thông tin nội bộ dành cho ban quản trị</p>
        </div>

        {/* Card */}
        <div className="bg-white border border-slate-200/90 rounded-xl p-7 sm:p-8 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
          <div className="mb-5 pb-3 border-b border-slate-100">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500">Đăng nhập tài khoản</h2>
          </div>

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
                  className="w-full pl-9 pr-3.5 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400
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
                  className="w-full pl-9 pr-10 py-2 text-xs border border-slate-200 rounded-lg bg-white text-slate-900 placeholder:text-slate-400
                             focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200 transition-colors"
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
              disabled={loading}
              className="w-full mt-2 bg-navy-600 hover:bg-navy-700 text-white text-xs font-semibold
                         py-2.5 px-4 rounded-lg shadow-sm transition-all duration-150 flex items-center justify-center gap-2
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
          </form>
        </div>

        {/* Security badge */}
        <div className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-slate-400">
          <ShieldCheck size={13} className="text-slate-400" />
          <span>Khu vực giới hạn cho nhân sự quản trị HDT Logistics</span>
        </div>
      </div>
    </div>
  );
}
