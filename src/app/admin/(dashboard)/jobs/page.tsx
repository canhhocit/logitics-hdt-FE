"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, BriefcaseBusiness, MapPin, DollarSign, Calendar } from "lucide-react";
import { getAdminJobs, createJob, updateJob, deleteJob } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = {
  title: "", department: "", location: "TP. Hồ Chí Minh", jobType: "FULL_TIME",
  salary: "", deadline: "", description: "", requirements: [], benefits: [], status: "OPEN"
};

const TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Toàn thời gian", PART_TIME: "Bán thời gian", INTERNSHIP: "Thực tập", CONTRACT: "Hợp đồng"
};

const STATUS_CONFIG: Record<string, { label: string; dot: string; badge: string }> = {
  OPEN: { label: "Đang tuyển dụng", dot: "bg-emerald-500", badge: "bg-emerald-50 text-emerald-700 border-emerald-200/60" },
  DRAFT: { label: "Bản nháp", dot: "bg-slate-400", badge: "bg-slate-100 text-slate-600 border-slate-200" },
  CLOSED: { label: "Đã đóng tuyển", dot: "bg-red-400", badge: "bg-red-50 text-red-700 border-red-200/60" },
};

export default function JobsPage() {
  const { toast } = useToast();
  const [jobs,       setJobs]       = useState<any[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editing,    setEditing]    = useState<any>(null);
  const [form,       setForm]       = useState<any>(EMPTY);
  const [saving,     setSaving]     = useState(false);
  const [delTarget,  setDelTarget]  = useState<any>(null);
  const [reqText,    setReqText]    = useState("");
  const [benText,    setBenText]    = useState("");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminJobs();
      setJobs((res as any).content || res || []);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => {
    setEditing(null);
    setForm(EMPTY);
    setReqText("");
    setBenText("");
    setModalOpen(true);
  };

  const openEdit = (j: any) => {
    setEditing(j);
    setForm({
      title: j.title, department: j.department, location: j.location,
      jobType: j.jobType, salary: j.salary || "",
      deadline: j.deadline ? j.deadline.slice(0, 10) : "",
      description: j.description || "",
      requirements: j.requirements || [],
      benefits: j.benefits || [],
      status: j.status
    });
    setReqText((j.requirements || []).join("\n"));
    setBenText((j.benefits || []).join("\n"));
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.department || !form.location) {
      toast("error", "Vui lòng nhập tiêu đề, phòng ban và địa điểm làm việc");
      return;
    }
    const payload = {
      ...form,
      requirements: reqText.split("\n").map(s => s.trim()).filter(Boolean),
      benefits:     benText.split("\n").map(s => s.trim()).filter(Boolean),
      deadline:     form.deadline ? new Date(form.deadline).toISOString() : null,
    };
    setSaving(true);
    try {
      if (editing) await updateJob(editing.id, payload);
      else         await createJob(payload);
      toast("success", editing ? "Cập nhật tin tuyển dụng thành công" : "Tạo tin tuyển dụng thành công");
      setModalOpen(false);
      fetchData();
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteJob(delTarget.id);
      toast("success", "Đã đóng tin tuyển dụng");
      setDelTarget(null);
      fetchData();
    } catch (e: any) {
      toast("error", e.message);
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Tuyển dụng & Nhân tài</h1>
          <p className="text-xs text-slate-500 mt-0.5">Quản lý các vị trí tuyển dụng nhân sự logistics đang mở</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Đăng vị trí mới</span>
        </button>
      </div>

      {/* Jobs List */}
      <div className="space-y-3">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200/80">
            Đang tải danh sách tin tuyển dụng...
          </div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
              <BriefcaseBusiness size={20} />
            </div>
            <p className="text-xs font-semibold text-slate-700">Chưa có vị trí tuyển dụng nào</p>
            <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Tạo tin tuyển dụng để thu hút ứng viên nộp CV qua website.</p>
            <button
              onClick={openNew}
              className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus size={13} />
              <span>Đăng tuyển vị trí đầu tiên</span>
            </button>
          </div>
        ) : (
          jobs.map((j: any) => {
            const conf = STATUS_CONFIG[j.status] || STATUS_CONFIG.OPEN;
            return (
              <div
                key={j.id}
                className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-4 sm:p-5 hover:border-slate-300 transition-all group"
              >
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-2">
                      <span className="text-[11px] font-semibold bg-slate-100 text-slate-700 border border-slate-200 px-2 py-0.5 rounded">
                        {j.department}
                      </span>
                      <span className="text-[11px] font-medium bg-navy-50 text-navy-700 border border-navy-100 px-2 py-0.5 rounded">
                        {TYPE_LABEL[j.jobType] || j.jobType}
                      </span>
                      <span className={`inline-flex items-center gap-1.5 text-[10px] font-medium px-2 py-0.5 rounded-full border ${conf.badge}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${conf.dot}`} />
                        {conf.label}
                      </span>
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm group-hover:text-navy-700 transition-colors">{j.title}</h3>

                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-2 text-xs text-slate-500 font-medium">
                      <span className="flex items-center gap-1">
                        <MapPin size={12} className="text-slate-400" />
                        <span>{j.location}</span>
                      </span>
                      {j.salary && (
                        <span className="flex items-center gap-1 text-slate-700 font-mono">
                          <DollarSign size={12} className="text-slate-400" />
                          <span>{j.salary}</span>
                        </span>
                      )}
                      {j.deadline && (
                        <span className="flex items-center gap-1 font-mono text-slate-400">
                          <Calendar size={12} className="text-slate-400" />
                          <span>Hạn nộp: {new Date(j.deadline).toLocaleDateString("vi-VN")}</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center gap-1 self-end sm:self-center flex-shrink-0">
                    <button
                      onClick={() => openEdit(j)}
                      title="Sửa tin tuyển dụng"
                      aria-label="Sửa tin tuyển dụng"
                      className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                    >
                      <Pencil size={14} />
                    </button>
                    <button
                      onClick={() => setDelTarget(j)}
                      title="Đóng tin tuyển dụng"
                      aria-label="Đóng tin tuyển dụng"
                      className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Cập nhật vị trí tuyển dụng" : "Đăng vị trí tuyển dụng mới"} size="xl">
        <div className="space-y-4 text-xs">
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên vị trí tuyển dụng *</label>
              <input
                value={form.title}
                required
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="VD: Chuyên viên kinh doanh cước tàu (Forwarding Sales)..."
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phòng ban phụ trách *</label>
              <input
                value={form.department}
                required
                onChange={(e) => setForm({ ...form, department: e.target.value })}
                placeholder="VD: Phòng Kinh Doanh & Dịch Vụ Khách Hàng"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Địa điểm làm việc *</label>
              <input
                value={form.location}
                required
                onChange={(e) => setForm({ ...form, location: e.target.value })}
                placeholder="TP. Hồ Chí Minh / Hà Nội"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hình thức làm việc</label>
              <select
                value={form.jobType}
                onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              >
                {Object.entries(TYPE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mức lương dự kiến</label>
              <input
                value={form.salary}
                onChange={(e) => setForm({ ...form, salary: e.target.value })}
                placeholder="VD: 15 – 25 triệu VNĐ hoặc Thỏa thuận"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hạn nộp hồ sơ</label>
              <input
                type="date"
                value={form.deadline}
                onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Trạng thái tin</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              >
                <option value="OPEN">Đang tuyển dụng</option>
                <option value="DRAFT">Lưu nháp</option>
                <option value="CLOSED">Đã đóng tuyển</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mô tả tóm tắt công việc</label>
            <textarea
              value={form.description}
              rows={3}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              placeholder="Nội dung tổng quan về vị trí và mục tiêu công việc..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white resize-none focus:outline-none focus:border-navy-600"
            />
          </div>

          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Yêu cầu công việc <span className="font-normal text-slate-400">(mỗi gạch đầu dòng một hàng)</span>
              </label>
              <textarea
                value={reqText}
                rows={5}
                onChange={(e) => setReqText(e.target.value)}
                placeholder={"Tốt nghiệp Cao đẳng/Đại học chuyên ngành Logistics, XNK...\nTối thiểu 1 năm kinh nghiệm...\nTiếng Anh giao tiếp tốt..."}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white resize-none focus:outline-none focus:border-navy-600 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">
                Quyền lợi & Phúc lợi <span className="font-normal text-slate-400">(mỗi gạch đầu dòng một hàng)</span>
              </label>
              <textarea
                value={benText}
                rows={5}
                onChange={(e) => setBenText(e.target.value)}
                placeholder={"Lương cứng + Thưởng hoa hồng theo doanh số...\nBảo hiểm Xã hội, Y tế đầy đủ...\nDu lịch nghỉ mát hàng năm cùng công ty..."}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white resize-none focus:outline-none focus:border-navy-600 font-mono"
              />
            </div>
          </div>

          <div className="flex gap-2.5 justify-end pt-3 border-t border-slate-100">
            <button
              onClick={() => setModalOpen(false)}
              className="px-3.5 py-2 text-xs font-medium text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
            >
              Hủy
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 text-xs font-semibold bg-navy-600 text-white rounded-lg hover:bg-navy-700 disabled:opacity-60 transition-colors shadow-sm active:scale-[0.99]"
            >
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Đăng tin tuyển dụng"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Đóng tin tuyển dụng vị trí "${delTarget?.title}"? Tin sẽ không còn hiển thị công khai trên website.`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
