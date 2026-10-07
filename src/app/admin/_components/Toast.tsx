"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

type ToastType = "success" | "error" | "info";
interface Toast { id: number; type: ToastType; message: string; }
interface ToastContextValue { toast: (type: ToastType, message: string) => void; }

const ToastContext = createContext<ToastContextValue>({ toast: () => {} });

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = useCallback((type: ToastType, message: string) => {
    const id = Date.now();
    setToasts((p) => [...p, { id, type, message }]);
    setTimeout(() => setToasts((p) => p.filter((t) => t.id !== id)), 3500);
  }, []);

  const remove = (id: number) => setToasts((p) => p.filter((t) => t.id !== id));

  const icons = {
    success: <CheckCircle size={16} className="text-green-500 flex-shrink-0" />,
    error:   <XCircle    size={16} className="text-red-500   flex-shrink-0" />,
    info:    <AlertCircle size={16} className="text-blue-500 flex-shrink-0" />,
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[999] flex flex-col gap-2 w-80">
        {toasts.map((t) => (
          <div key={t.id}
            className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl
                       shadow-lg px-4 py-3 animate-in slide-in-from-right-4">
            {icons[t.type]}
            <p className="text-sm text-gray-700 flex-1 leading-snug">{t.message}</p>
            <button onClick={() => remove(t.id)} className="text-gray-300 hover:text-gray-500 flex-shrink-0">
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
