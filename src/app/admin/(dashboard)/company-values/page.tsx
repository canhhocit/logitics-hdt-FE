"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Sparkles } from "lucide-react";
import { getAdminCompanyValues, createCompanyValue, updateCompanyValue, deleteCompanyValue } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { title: "", description: "", icon: "star", orderNo: 0 };
const ICON_OPTIONS = ["clock","eye","briefcase","heart","zap","shield","star","target","trending-up","check-circle","users","globe"];

const BG_CYCLE = [
  "bg-blue-100 text-blue-600","bg-red-100 text-red-500","bg-green-100 text-green-600",
  "bg-purple-100 text-purple-600","bg-orange-100 text-orange-600","bg-teal-100 text-teal-600",
];

export default function CompanyValuesPage() {
  const { toast } = useToast();
  const [list,      setList]      = useState<any[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState<any>(null);
  const [form,      setForm]      = useState<any>(EMPTY);
  const [saving,    setSaving]    = useState(false);
  const [delTarget, setDelTarget] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { setList(await getAdminCompanyValues() as any[]); }
    catch (e: any) { toast("error", e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (v: any) => {
    setEditing(v);
    setForm({ title: v.title, description: v.description || "", icon: v.icon || "star", orderNo: v.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) { toast("error", "Vui lòng nhập tiêu đề"); return; }
    setSaving(true);
    try {
      if (editing) await updateCompanyValue(editing.id, form);
      else         await createCompanyValue(form);
      toast("success", editing ? "Cập nhật thành công" : "Thêm giá trị cốt lõi thành công");
      setModalOpen(false); fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteCompanyValue(delTarget.id); toast("success", "Xóa thành công"); setDelTarget(null); fetchData(); }
    catch (e: any) { toast("error", e.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Giá trị cốt lõi</h1>
          <p className="text-gray-500 text-sm mt-0.5">Hiển thị trên trang Về chúng tôi</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Thêm giá trị
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((v: any, i: number) => (
            <div key={v.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 group hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${BG_CYCLE[i % BG_CYCLE.length]}`}>
                  <Sparkles size={20} />
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => openEdit(v)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><Pencil size={13} /></button>
                  <button onClick={() => setDelTarget(v)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
              <h3 className="font-bold text-gray-800 mb-2">{v.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed line-clamp-3">{v.description}</p>
              <div className="flex items-center gap-2 mt-3">
                <span className="text-gray-300 text-xs font-mono">{v.icon}</span>
                <span className="text-gray-200">·</span>
                <span className="text-gray-300 text-xs">#{v.orderNo}</span>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 p-12 text-center bg-white rounded-2xl border border-gray-100">
              <Sparkles size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">Chưa có giá trị cốt lõi nào</p>
              <button onClick={openNew} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors">Thêm giá trị đầu tiên</button>
            </div>
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa giá trị cốt lõi" : "Thêm giá trị cốt lõi"} size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tiêu đề *</label>
            <input value={form.title} required onChange={e => setForm({...form, title: e.target.value})}
              placeholder="VD: Đúng hẹn, Minh bạch..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mô tả</label>
            <textarea value={form.description} rows={3} onChange={e => setForm({...form, description: e.target.value})}
              placeholder="Giải thích ngắn gọn về giá trị này..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Icon (Lucide React name)</label>
              <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Thứ tự</label>
              <input type="number" min={0} value={form.orderNo} onChange={e => setForm({...form, orderNo: Number(e.target.value)})}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Hủy</button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-60 transition-colors">
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Thêm"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!delTarget} message={`Xóa giá trị cốt lõi "${delTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
