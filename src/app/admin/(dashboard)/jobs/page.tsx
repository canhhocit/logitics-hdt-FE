"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, BriefcaseBusiness, MapPin, DollarSign, Calendar } from "lucide-react";
import { getAdminJobs, createJob, updateJob, deleteJob } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = {
  title: "", department: "", location: "", jobType: "FULL_TIME",
  salary: "", deadline: "", description: "", requirements: "[]", benefits: "[]",
  status: "OPEN", orderNo: 0,
};

const TYPE_LABEL: Record<string, string> = {
  FULL_TIME: "Toàn thời gian", PART_TIME: "Bán thời gian",
  INTERNSHIP: "Thực tập sinh",  CONTRACT: "Hợp đồng",
};

const STATUS_COLOR: Record<string, string> = {
  OPEN:   "bg-green-100 text-green-700",
  CLOSED: "bg-gray-100 text-gray-500",
  DRAFT:  "bg-amber-100 text-amber-700",
};

function parseArr(s: string): string[] {
  try { return JSON.parse(s); } catch { return s.split("\n").filter(Boolean); }
}
function toJsonStr(arr: string[]): string { return JSON.stringify(arr); }

export default function JobsPage() {
  const { toast } = useToast();
  const [data,      setData]      = useState<any>({ content: [] });
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState<any>(null);
  const [form,      setForm]      = useState<any>(EMPTY);
  // Editable textarea for requirements/benefits
  const [reqText,   setReqText]   = useState("");
  const [benText,   setBenText]   = useState("");
  const [saving,    setSaving]    = useState(false);
  const [delTarget, setDelTarget] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { setData(await getAdminJobs()); }
    catch (e: any) { toast("error", e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => {
    setEditing(null); setForm(EMPTY);
    setReqText(""); setBenText(""); setModalOpen(true);
  };
  const openEdit = (j: any) => {
    setEditing(j);
    setForm({
      title: j.title, department: j.department, location: j.location,
      jobType: j.jobType, salary: j.salary || "", status: j.status,
      deadline: j.deadline ? j.deadline.slice(0, 10) : "",
      description: j.description || "", orderNo: j.orderNo || 0,
      requirements: j.requirements || "[]", benefits: j.benefits || "[]",
    });
    setReqText(parseArr(j.requirements || "[]").join("\n"));
    setBenText(parseArr(j.benefits || "[]").join("\n"));
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.department || !form.location) {
      toast("error", "Vui lòng điền tiêu đề, phòng ban và địa điểm"); return;
    }
    const payload = {
      ...form,
      requirements: toJsonStr(reqText.split("\n").filter(Boolean)),
      benefits:     toJsonStr(benText.split("\n").filter(Boolean)),
    };
    setSaving(true);
    try {
      if (editing) await updateJob(editing.id, payload);
      else         await createJob(payload);
      toast("success", editing ? "Cập nhật vị trí thành công" : "Đăng vị trí tuyển dụng thành công");
      setModalOpen(false); fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteJob(delTarget.id); toast("success", "Đã đóng vị trí tuyển dụng"); setDelTarget(null); fetchData(); }
    catch (e: any) { toast("error", e.message); }
  };

  const jobs: any[] = (data as any).content || data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Tuyển dụng</h1>
          <p className="text-gray-500 text-sm mt-0.5">{jobs.length} vị trí</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Đăng vị trí mới
        </button>
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
        ) : jobs.length === 0 ? (
          <div className="p-12 text-center bg-white rounded-2xl border border-gray-100">
            <BriefcaseBusiness size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400">Chưa có vị trí tuyển dụng nào</p>
          </div>
        ) : jobs.map((j: any) => (
          <div key={j.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-2">
                  <span className="text-xs font-bold bg-indigo-100 text-indigo-700 px-2.5 py-1 rounded-full">{j.department}</span>
                  <span className="text-xs font-bold bg-orange-50 text-orange-600 px-2.5 py-1 rounded-full border border-orange-200">{TYPE_LABEL[j.jobType] || j.jobType}</span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${STATUS_COLOR[j.status] || "bg-gray-100"}`}>
                    {j.status === "OPEN" ? "Đang tuyển" : j.status === "CLOSED" ? "Đã đóng" : "Nháp"}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 text-base">{j.title}</h3>
                <div className="flex flex-wrap gap-4 mt-2 text-xs text-gray-500">
                  <span className="flex items-center gap-1"><MapPin size={11}/>{j.location}</span>
                  {j.salary && <span className="flex items-center gap-1"><DollarSign size={11}/>{j.salary}</span>}
                  {j.deadline && <span className="flex items-center gap-1"><Calendar size={11}/>HSD: {new Date(j.deadline).toLocaleDateString("vi-VN")}</span>}
                </div>
              </div>
              <div className="flex gap-1 flex-shrink-0">
                <button onClick={() => openEdit(j)} className="p-2 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><Pencil size={15}/></button>
                <button onClick={() => setDelTarget(j)} className="p-2 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={15}/></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? "Sửa vị trí tuyển dụng" : "Đăng vị trí tuyển dụng mới"} size="xl">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tên vị trí *</label>
              <input value={form.title} required onChange={(e) => setForm({ ...form, title: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phòng ban *</label>
              <input value={form.department} required onChange={(e) => setForm({ ...form, department: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Địa điểm *</label>
              <input value={form.location} required onChange={(e) => setForm({ ...form, location: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Loại công việc</label>
              <select value={form.jobType} onChange={(e) => setForm({ ...form, jobType: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                {Object.entries(TYPE_LABEL).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mức lương</label>
              <input value={form.salary} onChange={(e) => setForm({ ...form, salary: e.target.value })}
                placeholder="VD: 15 – 25 triệu VNĐ"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Hạn nộp hồ sơ</label>
              <input type="date" value={form.deadline} onChange={(e) => setForm({ ...form, deadline: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Trạng thái</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                <option value="OPEN">Đang tuyển</option>
                <option value="DRAFT">Nháp</option>
                <option value="CLOSED">Đóng tuyển</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mô tả công việc</label>
            <textarea value={form.description} rows={3} onChange={(e) => setForm({ ...form, description: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400" />
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Yêu cầu <span className="font-normal text-gray-400">(mỗi yêu cầu một dòng)</span></label>
              <textarea value={reqText} rows={5} onChange={(e) => setReqText(e.target.value)}
                placeholder={"Yêu cầu 1\nYêu cầu 2\nYêu cầu 3"}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Phúc lợi <span className="font-normal text-gray-400">(mỗi phúc lợi một dòng)</span></label>
              <textarea value={benText} rows={5} onChange={(e) => setBenText(e.target.value)}
                placeholder={"Phúc lợi 1\nPhúc lợi 2\nPhúc lợi 3"}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Hủy</button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-60 transition-colors">
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Đăng tuyển"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!delTarget} message={`Đóng vị trí tuyển dụng "${delTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
