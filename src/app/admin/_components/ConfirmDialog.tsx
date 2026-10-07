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

export default function ConfirmDialog({ open, title = "Xác nhận", message, onConfirm, onCancel, danger = true }: Props) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      onClick={(e) => { if (e.target === e.currentTarget) onCancel(); }}>
      <div className="absolute inset-0 bg-gray-900/60 backdrop-blur-sm" />
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-sm p-6">
        <div className="flex items-start gap-4 mb-5">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0
            ${danger ? "bg-red-100 text-red-600" : "bg-amber-100 text-amber-600"}`}>
            <AlertTriangle size={18} />
          </div>
          <div>
            <h3 className="font-bold text-gray-800 mb-1">{title}</h3>
            <p className="text-sm text-gray-500 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button onClick={onCancel}
            className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
            Hủy
          </button>
          <button onClick={onConfirm}
            className={`px-4 py-2 text-sm font-medium text-white rounded-xl transition-colors
              ${danger ? "bg-red-600 hover:bg-red-700" : "bg-amber-500 hover:bg-amber-600"}`}>
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
}
