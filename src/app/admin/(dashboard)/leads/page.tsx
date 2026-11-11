"use client";

import { useEffect, useState, useCallback } from "react";
import { MessageSquare, Phone, Mail, Clock, Eye, CheckCircle2, User, Building, FileText } from "lucide-react";
import { getAdminLeads, updateLeadStatus } from "../../_lib/api";
import Pagination from "../../_components/Pagination";
import Modal from "../../_components/Modal";
import { useToast } from "../../_components/Toast";

const STATUS_CONFIG: Record<string, { label: string; dot: string; badge: string; selectClass: string }> = {
  NEW: {
    label: "Mới cần xử lý",
    dot: "bg-orange-500",
    badge: "bg-orange-50 text-orange-700 border-orange-200/60",
    selectClass: "bg-orange-50 text-orange-800 border-orange-200 focus:ring-orange-200",
  },
  CONTACTED: {
    label: "Đã liên hệ",
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-700 border-blue-200/60",
    selectClass: "bg-blue-50 text-blue-800 border-blue-200 focus:ring-blue-200",
  },
  CLOSED: {
    label: "Đã xử lý xong",
    dot: "bg-slate-400",
    badge: "bg-slate-100 text-slate-600 border-slate-200",
    selectClass: "bg-slate-50 text-slate-700 border-slate-200 focus:ring-slate-200",
  },
};

function formatDate(iso: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function LeadsPage() {
  const { toast } = useToast();
  const [data,         setData]         = useState<any>({ content: [], totalPages: 0, totalElements: 0 });
  const [page,         setPage]         = useState(0);
  const [filterStatus, setFilterStatus] = useState("");
  const [loading,      setLoading]      = useState(true);
  const [selected,     setSelected]     = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminLeads(page, 15, filterStatus);
      setData(res);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [page, filterStatus, toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const changeStatus = async (id: string, status: string) => {
    try {
      await updateLeadStatus(id, status);
      toast("success", "Cập nhật trạng thái lead thành công");
      fetchData();
      if (selected?.id === id) setSelected((p: any) => ({ ...p, status }));
    } catch (e: any) {
      toast("error", e.message);
    }
  };

  const leads: any[] = data.content || [];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Leads tư vấn & Yêu cầu báo giá</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tổng số: <span className="font-semibold text-slate-700">{data.totalElements ?? 0}</span> khách hàng đã gửi form liên hệ
          </p>
        </div>
      </div>

      {/* Segmented Filter Bar */}
      <div className="bg-slate-100 p-1 rounded-lg border border-slate-200/80 inline-flex flex-wrap gap-1">
        {[
          { value: "",          label: "Tất cả leads" },
          { value: "NEW",       label: "Mới cần xử lý" },
          { value: "CONTACTED", label: "Đã liên hệ" },
          { value: "CLOSED",    label: "Đã xử lý xong" },
        ].map((f) => {
          const active = filterStatus === f.value;
          return (
            <button
              key={f.value}
              onClick={() => { setFilterStatus(f.value); setPage(0); }}
              className={`px-3 py-1.5 rounded-md text-xs transition-all
                ${active
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium"}`}
            >
              {f.label}
            </button>
          );
        })}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Đang tải danh sách leads...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
              <MessageSquare size={20} />
            </div>
            <p className="text-xs font-semibold text-slate-700">Chưa có lead nào trong mục này</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Khi khách hàng gửi yêu cầu tư vấn trên website, dữ liệu sẽ hiển thị tại đây.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Khách hàng</th>
                    <th className="px-4 py-3">Thông tin liên hệ</th>
                    <th className="px-4 py-3">Dịch vụ quan tâm</th>
                    <th className="px-4 py-3">Thời gian gửi</th>
                    <th className="px-4 py-3">Trạng thái xử lý</th>
                    <th className="px-4 py-3 text-right">Xem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {leads.map((lead: any) => {
                    const conf = STATUS_CONFIG[lead.status] || STATUS_CONFIG.NEW;
                    return (
                      <tr key={lead.id} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-700 border border-navy-100 flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {lead.fullName?.charAt(0) || "?"}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 group-hover:text-navy-700 transition-colors">{lead.fullName}</p>
                              {lead.company && <p className="text-[11px] text-slate-400 truncate">{lead.company}</p>}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3">
                          <div className="space-y-0.5">
                            <a
                              href={`tel:${lead.phone}`}
                              className="font-mono text-slate-700 hover:text-navy-700 font-medium flex items-center gap-1.5"
                            >
                              <Phone size={11} className="text-slate-400" />
                              <span>{lead.phone}</span>
                            </a>
                            {lead.email && (
                              <a
                                href={`mailto:${lead.email}`}
                                className="text-[11px] text-slate-400 hover:text-slate-600 flex items-center gap-1.5 truncate max-w-[200px]"
                              >
                                <Mail size={11} className="text-slate-400" />
                                <span>{lead.email}</span>
                              </a>
                            )}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-slate-600 max-w-[180px] truncate">
                          <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200/60">
                            {lead.serviceName || "Tư vấn tổng quát"}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[11px] text-slate-500 font-mono whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Clock size={11} className="text-slate-400" />
                            <span>{formatDate(lead.createdAt)}</span>
                          </div>
                        </td>
                        <td className="px-4 py-3 whitespace-nowrap">
                          <select
                            value={lead.status}
                            onChange={(e) => changeStatus(lead.id, e.target.value)}
                            className={`text-xs font-semibold border rounded-md px-2.5 py-1 cursor-pointer focus:outline-none focus:ring-1 transition-all ${conf.selectClass}`}
                          >
                            <option value="NEW">Mới cần xử lý</option>
                            <option value="CONTACTED">Đã liên hệ</option>
                            <option value="CLOSED">Đã xử lý xong</option>
                          </select>
                        </td>
                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <button
                            onClick={() => setSelected(lead)}
                            title="Xem chi tiết"
                            aria-label="Xem chi tiết lead"
                            className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                          >
                            <Eye size={14} />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              totalPages={data.totalPages}
              totalElements={data.totalElements}
              size={15}
              onChange={setPage}
            />
          </>
        )}
      </div>

      {/* Detail Modal */}
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Chi tiết yêu cầu tư vấn" size="md">
        {selected && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3.5 bg-slate-50/70 p-4 rounded-lg border border-slate-200/80">
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Khách hàng</p>
                <p className="font-semibold text-slate-900 text-sm">{selected.fullName}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Doanh nghiệp / Công ty</p>
                <p className="font-semibold text-slate-800">{selected.company || "—"}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Số điện thoại</p>
                <a href={`tel:${selected.phone}`} className="font-mono font-semibold text-navy-700 hover:underline">
                  {selected.phone}
                </a>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Hòm thư điện tử</p>
                <a href={`mailto:${selected.email}`} className="font-semibold text-navy-700 hover:underline truncate block">
                  {selected.email || "—"}
                </a>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Dịch vụ quan tâm</p>
                <p className="font-semibold text-slate-800">{selected.serviceName || "Tư vấn tổng quát"}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Thời gian gửi</p>
                <p className="font-mono text-slate-600">{formatDate(selected.createdAt)}</p>
              </div>
              {selected.sourcePage && (
                <div className="col-span-2 pt-2 border-t border-slate-200/60">
                  <p className="text-[11px] font-medium text-slate-400 mb-0.5">Trang gửi yêu cầu (Source Page)</p>
                  <p className="font-mono text-slate-700 text-[11px] bg-white px-2 py-1 rounded border border-slate-200">
                    {selected.sourcePage}
                  </p>
                </div>
              )}
            </div>

            {selected.message && (
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-1.5">Ghi chú & Nội dung chi tiết từ khách hàng</p>
                <div className="bg-white rounded-lg p-3.5 text-slate-700 leading-relaxed border border-slate-200 shadow-xs">
                  {selected.message}
                </div>
              </div>
            )}

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-700">Cập nhật nhanh trạng thái:</span>
              <div className="flex gap-1.5">
                {[
                  { key: "NEW", label: "Mới" },
                  { key: "CONTACTED", label: "Đã liên hệ" },
                  { key: "CLOSED", label: "Đã xử lý" },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => changeStatus(selected.id, s.key)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all
                      ${selected.status === s.key
                        ? STATUS_CONFIG[s.key].badge + " shadow-xs"
                        : "bg-white text-slate-600 border-slate-200 hover:bg-slate-50"}`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
