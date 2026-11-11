"use client";

import { AlertTriangle } from "lucide-react";

interface Props {
  open: boolean;
  title?: string;
  message: string;
  onConfirm: () => void;
  onCancel: () => void;
  danger?: boolean;
}

export default function ConfirmDialog({ open, title = "Xác nhận hành động", message, onConfirm, onCancel, danger = true }: Props) {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}
      role="alertdialog"
      aria-modal="true"
    >
      <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-[2px] transition-opacity" />
      <div className="relative bg-white rounded-xl border border-slate-200/80 shadow-2xl w-full max-w-sm p-6 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        <div className="flex items-start gap-3.5 mb-5">
          <div className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0
            ${danger ? "bg-red-50 text-red-600 border border-red-100" : "bg-amber-50 text-amber-600 border border-amber-100"}`}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900 text-sm mb-1">{title}</h3>
            <p className="text-xs text-slate-500 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex gap-2.5 justify-end">
          <button
            onClick={onCancel}
            className="px-3.5 py-2 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-300"
          >
            Hủy bỏ
          </button>
          <button
            onClick={onConfirm}
            className={`px-3.5 py-2 text-xs font-semibold text-white rounded-lg shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-1
              ${danger ? "bg-red-600 hover:bg-red-700 focus-visible:ring-red-500" : "bg-navy-600 hover:bg-navy-700 focus-visible:ring-navy-500"}`}
          >
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
