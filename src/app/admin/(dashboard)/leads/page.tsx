"use client";

import { useEffect, useState, useCallback } from "react";
import { MessageSquare, Phone, Mail, Clock, Eye } from "lucide-react";
import { getAdminLeads, updateLeadStatus } from "../../_lib/api";
import Pagination from "../../_components/Pagination";
import Modal from "../../_components/Modal";
import { useToast } from "../../_components/Toast";

const STATUS_LABEL: Record<string, string> = { NEW: "Mới", CONTACTED: "Đã liên hệ", CLOSED: "Đã đóng" };
const STATUS_COLOR: Record<string, string> = {
  NEW:       "bg-blue-100 text-blue-700 border-blue-200",
  CONTACTED: "bg-amber-100 text-amber-700 border-amber-200",
  CLOSED:    "bg-green-100 text-green-700 border-green-200",
};

function formatDate(iso: string) {
  if (!iso) return "";
  return new Date(iso).toLocaleString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" });
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
  }, [page, filterStatus]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const changeStatus = async (id: string, status: string) => {
    try {
      await updateLeadStatus(id, status);
      toast("success", "Cập nhật trạng thái thành công");
      fetchData();
      if (selected?.id === id) setSelected((p: any) => ({ ...p, status }));
    } catch (e: any) {
      toast("error", e.message);
    }
  };

  const leads: any[] = data.content || [];

  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Leads tư vấn</h1>
          <p className="text-gray-500 text-sm mt-0.5">
            {data.totalElements ?? 0} yêu cầu tư vấn từ khách hàng
          </p>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5 flex-wrap">
        {[
          { value: "",          label: "Tất cả" },
          { value: "NEW",       label: "Mới" },
          { value: "CONTACTED", label: "Đã liên hệ" },
          { value: "CLOSED",    label: "Đã đóng" },
        ].map((f) => (
          <button key={f.value}
            onClick={() => { setFilterStatus(f.value); setPage(0); }}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all border
              ${filterStatus === f.value
                ? "bg-indigo-600 text-white border-indigo-600 shadow-sm"
                : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300 hover:text-indigo-600"}`}>
            {f.label}
          </button>
        ))}
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
        ) : leads.length === 0 ? (
          <div className="p-12 text-center">
            <MessageSquare size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400">Chưa có lead nào</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Khách hàng</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Liên hệ</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Dịch vụ</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Ngày gửi</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase tracking-wide">Trạng thái</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {leads.map((lead: any) => (
                    <tr key={lead.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-xs flex-shrink-0">
                            {lead.fullName?.charAt(0) || "?"}
                          </div>
                          <div>
                            <p className="font-semibold text-gray-800">{lead.fullName}</p>
                            {lead.company && <p className="text-xs text-gray-400">{lead.company}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="flex items-center gap-1.5 text-gray-600 text-xs"><Phone size={11}/>{lead.phone}</p>
                        {lead.email && <p className="flex items-center gap-1.5 text-gray-400 text-xs mt-0.5"><Mail size={11}/>{lead.email}</p>}
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs max-w-[160px] truncate">
                        {lead.serviceName || "—"}
                      </td>
                      <td className="px-4 py-3">
                        <p className="flex items-center gap-1 text-gray-400 text-xs">
                          <Clock size={11}/>{formatDate(lead.createdAt)}
                        </p>
                      </td>
                      <td className="px-4 py-3">
                        <select value={lead.status}
                          onChange={(e) => changeStatus(lead.id, e.target.value)}
                          className={`text-xs font-semibold border rounded-lg px-2.5 py-1.5 cursor-pointer
                            focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-colors
                            ${STATUS_COLOR[lead.status] || "bg-gray-100 text-gray-600"}`}>
                          <option value="NEW">Mới</option>
                          <option value="CONTACTED">Đã liên hệ</option>
                          <option value="CLOSED">Đã đóng</option>
                        </select>
                      </td>
                      <td className="px-4 py-3">
                        <button onClick={() => setSelected(lead)}
                          className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                          <Eye size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 pb-4">
              <Pagination page={page} totalPages={data.totalPages} totalElements={data.totalElements}
                size={15} onChange={(p) => setPage(p)} />
            </div>
          </>
        )}
      </div>

      {/* Detail modal */}
      <Modal open={!!selected} onClose={() => setSelected(null)} title="Chi tiết yêu cầu tư vấn" size="md">
        {selected && (
          <div className="space-y-4 text-sm">
            <div className="grid grid-cols-2 gap-4">
              <div><p className="text-xs text-gray-400 mb-1">Họ tên</p><p className="font-semibold text-gray-800">{selected.fullName}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Công ty</p><p className="font-semibold text-gray-800">{selected.company || "—"}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Số điện thoại</p><a href={`tel:${selected.phone}`} className="font-semibold text-indigo-600">{selected.phone}</a></div>
              <div><p className="text-xs text-gray-400 mb-1">Email</p><a href={`mailto:${selected.email}`} className="font-semibold text-indigo-600">{selected.email || "—"}</a></div>
              <div><p className="text-xs text-gray-400 mb-1">Dịch vụ quan tâm</p><p className="font-semibold text-gray-800">{selected.serviceName || "—"}</p></div>
              <div><p className="text-xs text-gray-400 mb-1">Ngày gửi</p><p className="font-semibold text-gray-800">{formatDate(selected.createdAt)}</p></div>
              {selected.sourcePage && (
                <div className="col-span-2"><p className="text-xs text-gray-400 mb-1">Trang nguồn (source page)</p><p className="font-semibold text-gray-800 font-mono text-xs bg-gray-50 px-2 py-1 rounded">{selected.sourcePage}</p></div>
              )}
            </div>
            {selected.message && (
              <div>
                <p className="text-xs text-gray-400 mb-1">Nội dung yêu cầu</p>
                <div className="bg-gray-50 rounded-xl p-4 text-gray-700 leading-relaxed border border-gray-100">
                  {selected.message}
                </div>
              </div>
            )}
            <div>
              <p className="text-xs text-gray-400 mb-2">Cập nhật trạng thái</p>
              <div className="flex gap-2">
                {["NEW", "CONTACTED", "CLOSED"].map((s) => (
                  <button key={s} onClick={() => changeStatus(selected.id, s)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all
                      ${selected.status === s ? STATUS_COLOR[s] : "bg-white text-gray-500 border-gray-200 hover:border-gray-300"}`}>
                    {STATUS_LABEL[s]}
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
