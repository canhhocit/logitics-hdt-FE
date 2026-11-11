"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface Toast { id: number; type: ToastType; message: string; }
interface ToastContextValue { toast: (type: ToastType, message: string) => void; }

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, type, message }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 4000);
  }, []);

  const remove = (id: number) => setToasts((p) => p.filter((t) => t.id !== id));

  const config = {
    success: {
      icon: <CheckCircle2 size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />,
      border: "border-emerald-200/80 bg-white",
    },
    error: {
      icon: <AlertCircle size={16} className="text-red-600 flex-shrink-0 mt-0.5" />,
      border: "border-red-200/80 bg-white",
    },
    info: {
      icon: <Info size={16} className="text-navy-600 flex-shrink-0 mt-0.5" />,
      border: "border-navy-200/80 bg-white",
    },
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-5 right-5 z-[999] flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => (
          <div
            key={t.id}
            role="status"
            className={`pointer-events-auto flex items-start gap-3 border rounded-xl
                       shadow-[0_4px_20px_-4px_rgba(0,0,0,0.1)] px-4 py-3.5 animate-in slide-in-from-bottom-2 duration-200 ${config[t.type].border}`}
          >
            {config[t.type].icon}
            <p className="text-xs font-medium text-slate-800 flex-1 leading-relaxed">{t.message}</p>
            <button
              onClick={() => remove(t.id)}
              aria-label="Đóng thông báo"
              className="text-slate-400 hover:text-slate-600 transition-colors flex-shrink-0"
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  return useContext(ToastContext);
}
