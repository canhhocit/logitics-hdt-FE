"use client";

import { useEffect, useState, useCallback } from "react";
import {
  UserCheck, Phone, Mail, Clock, Eye, Trash2, Download,
  ExternalLink, FileText, Search, Briefcase, Filter, MessageSquare
} from "lucide-react";
import {
  getAdminApplications, updateApplicationStatus, deleteApplication,
  getAdminJobs, ADMIN_API
} from "../../_lib/api";
import Pagination from "../../_components/Pagination";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const STATUS_CONFIG: Record<string, { label: string; dot: string; badge: string; selectClass: string }> = {
  APPLIED: {
    label: "Mới nộp",
    dot: "bg-orange-500",
    badge: "bg-orange-50 text-orange-700 border-orange-200/60",
    selectClass: "bg-orange-50 text-orange-800 border-orange-200 focus:ring-orange-200",
  },
  REVIEWING: {
    label: "Đang duyệt",
    dot: "bg-sky-500",
    badge: "bg-sky-50 text-sky-700 border-sky-200/60",
    selectClass: "bg-sky-50 text-sky-800 border-sky-200 focus:ring-sky-200",
  },
  INTERVIEW: {
    label: "Hẹn phỏng vấn",
    dot: "bg-purple-500",
    badge: "bg-purple-50 text-purple-700 border-purple-200/60",
    selectClass: "bg-purple-50 text-purple-800 border-purple-200 focus:ring-purple-200",
  },
  ACCEPTED: {
    label: "Trúng tuyển",
    dot: "bg-emerald-500",
    badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60",
    selectClass: "bg-emerald-50 text-emerald-800 border-emerald-200 focus:ring-emerald-200",
  },
  REJECTED: {
    label: "Từ chối",
    dot: "bg-rose-500",
    badge: "bg-rose-50 text-rose-700 border-rose-200/60",
    selectClass: "bg-rose-50 text-rose-800 border-rose-200 focus:ring-rose-200",
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

function resolveCvLink(cvUrl: string) {
  if (!cvUrl) return "#";
  if (cvUrl.startsWith("http://") || cvUrl.startsWith("https://")) {
    return cvUrl;
  }
  const base = ADMIN_API.replace(/\/api\/v1\/?$/, "");
  return `${base}${cvUrl.startsWith("/") ? "" : "/"}${cvUrl}`;
}

export default function ApplicationsPage() {
  const { toast } = useToast();
  const [data,         setData]         = useState<any>({ content: [], totalPages: 0, totalElements: 0 });
  const [jobs,         setJobs]         = useState<any[]>([]);
  const [page,         setPage]         = useState(0);
  const [pageSize,     setPageSize]     = useState(10);
  const [filterStatus, setFilterStatus] = useState("");
  const [filterJobId,  setFilterJobId]  = useState("");
  const [keyword,      setKeyword]      = useState("");
  const [loading,      setLoading]      = useState(true);
  const [selected,     setSelected]     = useState<any>(null);
  const [notesInput,   setNotesInput]   = useState("");
  const [delTarget,    setDelTarget]    = useState<any>(null);

  // Load jobs for filter
  useEffect(() => {
    getAdminJobs(0, 50).then((res: any) => {
      setJobs(res?.content || res || []);
    }).catch(() => {});
  }, []);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminApplications(page, pageSize, filterStatus, filterJobId, keyword);
      setData(res || { content: [], totalPages: 0, totalElements: 0 });
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [page, pageSize, filterStatus, filterJobId, keyword, toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const changeStatus = async (id: string, status: string, notes?: string) => {
    try {
      await updateApplicationStatus(id, status, notes);
      toast("success", "Cập nhật trạng thái hồ sơ thành công");
      fetchData();
      if (selected?.id === id) {
        setSelected((p: any) => ({ ...p, status, notes: notes !== undefined ? notes : p.notes }));
      }
    } catch (e: any) {
      toast("error", e.message);
    }
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    await changeStatus(selected.id, selected.status, notesInput);
  };

  const handleDelete = async () => {
    if (!delTarget) return;
    try {
      await deleteApplication(delTarget.id);
      toast("success", "Đã xóa hồ sơ ứng tuyển");
      setDelTarget(null);
      fetchData();
    } catch (e: any) {
      toast("error", e.message);
    }
  };

  const applications: any[] = data.content || [];

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Hồ sơ Ứng tuyển & CV</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tiếp nhận hồ sơ tuyển dụng trực tuyến từ ứng viên qua website HDT Logistics
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs text-slate-600 bg-white border border-slate-200 rounded-lg px-3 py-1.5 shadow-2xs self-start sm:self-auto">
          <span>Tổng số hồ sơ:</span>
          <span className="font-bold text-navy-800">{data.totalElements || 0}</span>
        </div>
      </div>

      {/* Enterprise Table Surface */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        {/* Filter Controls Bar */}
        <div className="px-3.5 py-2.5 border-b border-slate-200 bg-slate-50/50 space-y-2.5">
          <div className="flex flex-wrap items-center justify-between gap-2.5">
            {/* Status Filter Tabs */}
            <div className="bg-slate-100 p-0.5 rounded-md border border-slate-200 inline-flex flex-wrap gap-0.5">
              {[
                { value: "",          label: "Tất cả hồ sơ" },
                { value: "APPLIED",   label: "Mới nộp" },
                { value: "REVIEWING", label: "Đang duyệt" },
                { value: "INTERVIEW", label: "Phỏng vấn" },
                { value: "ACCEPTED",  label: "Trúng tuyển" },
                { value: "REJECTED",  label: "Từ chối" },
              ].map((f) => {
                const active = filterStatus === f.value;
                return (
                  <button
                    key={f.value}
                    onClick={() => { setFilterStatus(f.value); setPage(0); }}
                    className={`px-3 py-1 rounded text-xs transition-all cursor-pointer
                      ${active
                        ? "bg-white text-slate-900 font-semibold shadow-2xs"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium"}`}
                  >
                    {f.label}
                  </button>
                );
              })}
            </div>

            {/* Keyword Search & Job Filter */}
            <div className="flex items-center gap-2 flex-wrap">
              <select
                value={filterJobId}
                onChange={(e) => { setFilterJobId(e.target.value); setPage(0); }}
                className="bg-white border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-700 focus:outline-none focus:border-navy-600 cursor-pointer max-w-[200px]"
              >
                <option value="">Tất cả vị trí tuyển</option>
                {jobs.map((j) => (
                  <option key={j.id} value={j.id}>{j.title}</option>
                ))}
              </select>

              <div className="relative">
                <input
                  type="text"
                  placeholder="Tìm tên, SĐT, email..."
                  value={keyword}
                  onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
                  className="bg-white border border-slate-200 rounded-md pl-7 pr-2.5 py-1 text-xs text-slate-800 placeholder:text-slate-400 focus:outline-none focus:border-navy-600 w-44 sm:w-56"
                />
                <Search size={12} className="absolute left-2.5 top-2 text-slate-400" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Applications Table */}
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Đang tải danh sách hồ sơ ứng tuyển...</div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
              <UserCheck size={20} />
            </div>
            <p className="text-xs font-semibold text-slate-700">Chưa có hồ sơ ứng tuyển nào</p>
            <p className="text-[11px] text-slate-400 mt-0.5">Khi ứng viên nộp CV qua các tin tuyển dụng trên website, thông tin và file CV sẽ hiển thị tại đây.</p>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[760px]">
                <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3">Ứng viên</th>
                    <th className="px-4 py-3">Vị trí ứng tuyển</th>
                    <th className="px-4 py-3">File CV</th>
                    <th className="px-4 py-3">Thời gian nộp</th>
                    <th className="px-4 py-3">Trạng thái hồ sơ</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {applications.map((app: any) => {
                    const conf = STATUS_CONFIG[app.status] || STATUS_CONFIG.APPLIED;
                    const cvLink = resolveCvLink(app.cvUrl);
                    return (
                      <tr key={app.id} className="hover:bg-slate-50/60 transition-colors group">
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2.5">
                            <div className="w-8 h-8 rounded-lg bg-orange-50 text-orange-700 border border-orange-100 flex items-center justify-center font-bold text-xs flex-shrink-0">
                              {app.fullName?.charAt(0) || "U"}
                            </div>
                            <div className="min-w-0">
                              <p className="font-semibold text-slate-900 group-hover:text-navy-700 transition-colors">{app.fullName}</p>
                              <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-0.5">
                                <a href={`tel:${app.phone}`} className="hover:text-slate-600 flex items-center gap-1 font-mono">
                                  <Phone size={10} /> {app.phone}
                                </a>
                                {app.email && (
                                  <a href={`mailto:${app.email}`} className="hover:text-slate-600 flex items-center gap-1 truncate max-w-[140px]">
                                    <Mail size={10} /> {app.email}
                                  </a>
                                )}
                              </div>
                            </div>
                          </div>
                        </td>

                        <td className="px-4 py-3 max-w-[200px]">
                          <p className="font-semibold text-slate-800 line-clamp-1">{app.jobTitle || "Tuyển dụng chung"}</p>
                          {app.department && (
                            <span className="inline-block mt-0.5 bg-slate-100 text-slate-600 text-[10px] px-1.5 py-0.2 rounded border border-slate-200/60">
                              {app.department}
                            </span>
                          )}
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          {app.cvUrl ? (
                            <a
                              href={cvLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 bg-navy-50 hover:bg-navy-100 text-navy-700 border border-navy-200/80 px-2.5 py-1 rounded-md text-xs font-semibold transition-colors group/cv"
                            >
                              <FileText size={12} className="text-navy-600" />
                              <span className="truncate max-w-[130px]">{app.cvFileName || "Xem file CV"}</span>
                              <ExternalLink size={11} className="opacity-60 group-hover/cv:opacity-100" />
                            </a>
                          ) : (
                            <span className="text-slate-400 text-xs">Chưa có CV</span>
                          )}
                        </td>

                        <td className="px-4 py-3 text-[11px] text-slate-500 font-mono whitespace-nowrap">
                          <div className="flex items-center gap-1">
                            <Clock size={11} className="text-slate-400" />
                            <span>{formatDate(app.createdAt)}</span>
                          </div>
                        </td>

                        <td className="px-4 py-3 whitespace-nowrap">
                          <select
                            value={app.status}
                            onChange={(e) => changeStatus(app.id, e.target.value)}
                            className={`text-xs font-semibold border rounded-md px-2.5 py-1 cursor-pointer focus:outline-none focus:ring-1 transition-all ${conf.selectClass}`}
                          >
                            <option value="APPLIED">Mới nộp</option>
                            <option value="REVIEWING">Đang duyệt</option>
                            <option value="INTERVIEW">Hẹn phỏng vấn</option>
                            <option value="ACCEPTED">Trúng tuyển</option>
                            <option value="REJECTED">Từ chối</option>
                          </select>
                        </td>

                        <td className="px-4 py-3 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            <button
                              onClick={() => {
                                setSelected(app);
                                setNotesInput(app.notes || "");
                              }}
                              title="Xem chi tiết hồ sơ"
                              className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                            >
                              <Eye size={14} />
                            </button>
                            <button
                              onClick={() => setDelTarget(app)}
                              title="Xóa hồ sơ"
                              className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                            >
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <Pagination
              page={page}
              totalPages={data.totalPages || Math.ceil((data.totalElements || 0) / pageSize)}
              totalElements={data.totalElements || 0}
              size={pageSize}
              onChange={setPage}
              onSizeChange={(newSize) => {
                setPageSize(newSize);
                setPage(0);
              }}
            />
          </>
        )}
      </div>

      {/* Detail Modal */}
      <Modal open={Boolean(selected)} onClose={() => setSelected(null)} title="Chi tiết Hồ sơ Ứng tuyển" size="lg">
        {selected && (
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3.5 bg-slate-50/70 p-4 rounded-lg border border-slate-200/80">
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Ứng viên</p>
                <p className="font-semibold text-slate-900 text-sm">{selected.fullName}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Vị trí ứng tuyển</p>
                <p className="font-semibold text-navy-800">{selected.jobTitle}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Số điện thoại</p>
                <a href={`tel:${selected.phone}`} className="font-mono font-semibold text-navy-700 hover:underline">
                  {selected.phone}
                </a>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Email</p>
                <a href={`mailto:${selected.email}`} className="font-semibold text-navy-700 hover:underline truncate block">
                  {selected.email || "—"}
                </a>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">Thời gian nộp</p>
                <p className="font-mono text-slate-600">{formatDate(selected.createdAt)}</p>
              </div>
              <div>
                <p className="text-[11px] font-medium text-slate-400 mb-0.5">File CV đính kèm</p>
                {selected.cvUrl ? (
                  <a
                    href={resolveCvLink(selected.cvUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-orange-600 hover:text-orange-700 font-semibold hover:underline"
                  >
                    <Download size={13} />
                    <span>Tải / Xem file CV ({selected.cvFileName || "Mở file"})</span>
                  </a>
                ) : (
                  <span className="text-slate-400">Không có</span>
                )}
              </div>
            </div>

            {selected.coverLetter && (
              <div>
                <p className="text-xs font-semibold text-slate-700 mb-1.5">Thư giới thiệu / Lời nhắn từ ứng viên</p>
                <div className="bg-white rounded-lg p-3.5 text-slate-700 leading-relaxed border border-slate-200 shadow-xs whitespace-pre-line">
                  {selected.coverLetter}
                </div>
              </div>
            )}

            <div>
              <p className="text-xs font-semibold text-slate-700 mb-1.5">Ghi chú nội bộ của nhà tuyển dụng (HR notes)</p>
              <textarea
                rows={3}
                placeholder="Nhập đánh giá vòng hồ sơ, lịch hẹn phỏng vấn, mức lương thỏa thuận..."
                value={notesInput}
                onChange={(e) => setNotesInput(e.target.value)}
                className="w-full bg-white border border-slate-200 rounded-lg p-3 text-slate-800 text-xs focus:outline-none focus:border-navy-600 resize-none"
              />
              <div className="flex justify-end mt-1.5">
                <button
                  onClick={handleSaveNotes}
                  className="bg-navy-600 hover:bg-navy-700 text-white font-semibold text-xs px-3 py-1.5 rounded-md transition-colors"
                >
                  Lưu ghi chú HR
                </button>
              </div>
            </div>

            <div className="pt-2 border-t border-slate-100 flex items-center justify-between flex-wrap gap-2">
              <span className="text-xs font-semibold text-slate-700">Cập nhật trạng thái:</span>
              <div className="flex gap-1.5 flex-wrap">
                {[
                  { key: "APPLIED",   label: "Mới nộp" },
                  { key: "REVIEWING", label: "Đang duyệt" },
                  { key: "INTERVIEW", label: "Phỏng vấn" },
                  { key: "ACCEPTED",  label: "Trúng tuyển" },
                  { key: "REJECTED",  label: "Từ chối" },
                ].map((s) => (
                  <button
                    key={s.key}
                    onClick={() => changeStatus(selected.id, s.key, notesInput)}
                    className={`px-3 py-1.5 rounded-md text-xs font-semibold border transition-all
                      ${selected.status === s.key
                        ? STATUS_CONFIG[s.key].badge + " shadow-xs font-bold"
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

      {/* Delete Confirm */}
      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Bạn có chắc chắn muốn xóa hồ sơ ứng tuyển của "${delTarget?.fullName}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
