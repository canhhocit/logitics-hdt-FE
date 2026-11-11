"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface Props {
  page: number;          // 0-indexed
  totalPages: number;
  totalElements: number;
  size: number;
  onChange: (page: number) => void;
  onSizeChange?: (size: number) => void;
}

export default function Pagination({
  page,
  totalPages,
  totalElements,
  size,
  onChange,
  onSizeChange,
}: Props) {
  if (totalElements === 0) return null;

  const effectiveTotalPages = Math.max(1, totalPages);
  const from = Math.min(page * size + 1, totalElements);
  const to   = Math.min((page + 1) * size, totalElements);

  const pages: (number | "...")[] = [];
  for (let i = 0; i < effectiveTotalPages; i++) {
    if (i === 0 || i === effectiveTotalPages - 1 || Math.abs(i - page) <= 1) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "...") {
      pages.push("...");
    }
  }

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-3 px-4 py-3 border-t border-slate-200/80 bg-white select-none">
      {/* Left side: Record count & Page size selector */}
      <div className="flex items-center gap-3">
        <p className="text-sm text-slate-600 font-medium">
          Hiển thị <span className="font-semibold text-slate-900">{from}</span>–<span className="font-semibold text-slate-900">{to}</span> trong <span className="font-semibold text-slate-900">{totalElements}</span> bản ghi
        </p>

        {onSizeChange && (
          <div className="flex items-center gap-1.5 text-sm text-slate-600 border-l border-slate-200 pl-3">
            <span className="hidden sm:inline text-xs text-slate-400">Hiển thị:</span>
            <select
              value={size}
              onChange={(e) => onSizeChange(Number(e.target.value))}
              aria-label="Số bản ghi trên mỗi trang"
              className="text-sm border border-slate-200 rounded-md px-2.5 py-1 bg-slate-50 text-slate-700 font-medium hover:border-slate-300 focus:outline-none focus:border-navy-600 transition-colors cursor-pointer"
            >
              <option value={10}>10 / trang</option>
              <option value={15}>15 / trang</option>
              <option value={20}>20 / trang</option>
              <option value={50}>50 / trang</option>
            </select>
          </div>
        )}
      </div>

      {/* Right side: Page navigation */}
      <div className="flex items-center gap-1">
        <button
          disabled={page === 0}
          onClick={() => onChange(page - 1)}
          aria-label="Trang trước"
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-slate-200
                     text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          <ChevronLeft size={14} />
        </button>

        {effectiveTotalPages <= 1 ? (
          <span className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md text-xs sm:text-sm font-bold bg-navy-600 text-white shadow-2xs">
            1
          </span>
        ) : (
          pages.map((p, i) =>
            p === "..." ? (
              <span key={`e-${i}`} className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center text-xs sm:text-sm text-slate-400 select-none">
                …
              </span>
            ) : (
              <button
                key={p}
                onClick={() => onChange(p as number)}
                className={`w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md text-xs sm:text-sm font-semibold transition-all
                  ${p === page
                    ? "bg-navy-600 text-white shadow-2xs font-bold"
                    : "border border-slate-200 text-slate-600 hover:bg-slate-50 hover:border-slate-300"}`}
              >
                {(p as number) + 1}
              </button>
            )
          )
        )}

        <button
          disabled={page >= effectiveTotalPages - 1}
          onClick={() => onChange(page + 1)}
          aria-label="Trang tiếp theo"
          className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center rounded-md border border-slate-200
                     text-slate-600 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-slate-50 hover:border-slate-300 transition-colors"
        >
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
