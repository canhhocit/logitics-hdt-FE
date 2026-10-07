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
    <div className="flex items-center justify-between px-1 mt-4">
      <p className="text-xs text-gray-400">
        Hiển thị {from}–{to} / {totalElements} bản ghi
      </p>
      <div className="flex items-center gap-1">
        <button disabled={page === 0}
          onClick={() => onChange(page - 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200
                     text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition-colors">
          <ChevronLeft size={14} />
        </button>
        {pages.map((p, i) =>
          p === "..." ? (
            <span key={`e${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-400">…</span>
          ) : (
            <button key={p} onClick={() => onChange(p as number)}
              className={`w-8 h-8 flex items-center justify-center rounded-lg text-xs font-semibold transition-colors
                ${p === page ? "bg-indigo-600 text-white" : "border border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
              {(p as number) + 1}
            </button>
          )
        )}
        <button disabled={page >= totalPages - 1}
          onClick={() => onChange(page + 1)}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-gray-200
                     text-gray-500 disabled:opacity-30 hover:bg-gray-50 transition-colors">
          <ChevronRight size={14} />
        </button>
      </div>
    </div>
  );
}
