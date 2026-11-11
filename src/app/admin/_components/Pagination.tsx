"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;          // 0-indexed
  totalPages: number;
  totalElements: number;
  size: number;
  onChange: (page: number) => void;
}

export default function Pagination({ page, totalPages, totalElements, size, onChange }: Props) {
  if (totalPages <= 1) return null;

  const from = page * size + 1;
  const to   = Math.min((page + 1) * size, totalElements);

  const pages: (number | "...")[] = [];
  for (let i = 0; i < totalPages; i++) {
    if (i === 0 || i === totalPages - 1 || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-2 py-3 border-t border-slate-100">
      <p className="text-xs text-slate-500 font-medium">
        Hiển thị <span className="font-semibold text-slate-800">{from}</span>–<span className="font-semibold text-slate-800">{to}</span> trong <span className="font-semibold text-slate-800">{totalElements}</span> bản ghi
      </p>
      <div className="flex items-center gap-1.5">
        <button
          disabled={page === 0}
          onClick={() => onChange(page - 1)}
          aria-label="Trang trước"
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200
                     text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-slate-400 select-none">
              …
            </span>
          ) : (
            <button
              key={p}
              onClick={() => onChange(p as number)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-all
                ${p === page
                  ? "bg-navy-600 text-white shadow-sm font-bold"
                  : "border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"}`}
            >
              {(p as number) + 1}
            </button>
          )
        )}
        <button
          disabled={page >= totalPages - 1}
          onClick={() => onChange(page + 1)}
          aria-label="Trang tiếp theo"
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200
                     text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
