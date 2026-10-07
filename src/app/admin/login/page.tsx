"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Package, Eye, EyeOff, Loader2 } from "lucide-react";
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
      setError(err.message || "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950
                    flex items-center justify-center p-4">
      {/* Decorative circles */}
      <div className="absolute top-20 right-20 w-72 h-72 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 left-20 w-56 h-56 bg-violet-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative w-full max-w-sm">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-600 rounded-2xl shadow-xl shadow-indigo-600/40 mb-4">
            <Package size={28} className="text-white" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">HDT Logistics</h1>
          <p className="text-slate-400 text-sm mt-1">Quản trị hệ thống</p>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-7 shadow-2xl">
          {error && (
            <div className="mb-5 flex items-center gap-2.5 bg-red-500/20 border border-red-500/30
                            text-red-200 text-sm px-4 py-3 rounded-xl">
              <span className="flex-shrink-0">⚠</span>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-slate-300 mb-2">
                Tên đăng nhập
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="admin"
                required
                className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3
                           text-white placeholder:text-slate-500 text-sm
                           focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
              />
            </div>

            <div>
              <label className="block text-xs font-bold tracking-wider uppercase text-slate-300 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <input
                  type={showPw ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  className="w-full bg-white/10 border border-white/20 rounded-xl px-4 py-3 pr-11
                             text-white placeholder:text-slate-500 text-sm
                             focus:outline-none focus:border-indigo-400 focus:bg-white/15 transition-all"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-200 transition-colors">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60
                         text-white font-bold py-3 rounded-xl transition-all
                         shadow-lg shadow-indigo-600/40 hover:shadow-indigo-500/50
                         flex items-center justify-center gap-2 mt-2">
              {loading && <Loader2 size={16} className="animate-spin" />}
              {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
            </button>
          </form>

          <p className="text-center text-slate-500 text-xs mt-5">
            Tài khoản mặc định: <span className="text-slate-300 font-mono">admin / admin</span>
          </p>
        </div>

        <p className="text-center text-slate-600 text-xs mt-6">
          © {new Date().getFullYear()} HDT Logistics — Admin CMS
        </p>
      </div>
    </div>
  );
}
