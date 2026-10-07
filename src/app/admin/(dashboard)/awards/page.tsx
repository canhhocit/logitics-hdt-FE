"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Award } from "lucide-react";
import { getAdminAwards, createAward, updateAward, deleteAward } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { title: "", year: "", icon: "award", orderNo: 0 };
const ICON_OPTIONS = ["award","shield-check","users","handshake","star","trophy","medal","certificate"];

export default function AwardsPage() {
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
    try { setList(await getAdminAwards() as any[]); }
    catch (e: any) { toast("error", e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (a: any) => {
    setEditing(a);
    setForm({ title: a.title, year: a.year || "", icon: a.icon || "award", orderNo: a.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) { toast("error", "Vui lòng nhập tên giải thưởng"); return; }
    setSaving(true);
    try {
      if (editing) await updateAward(editing.id, form);
      else         await createAward(form);
      toast("success", editing ? "Cập nhật thành công" : "Thêm giải thưởng thành công");
      setModalOpen(false); fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteAward(delTarget.id); toast("success", "Xóa thành công"); setDelTarget(null); fetchData(); }
    catch (e: any) { toast("error", e.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Giải thưởng & Chứng nhận</h1>
          <p className="text-gray-500 text-sm mt-0.5">Hiển thị trên trang Về chúng tôi</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Thêm giải thưởng
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((a: any) => (
            <div key={a.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-amber-100 rounded-2xl flex items-center justify-center mx-auto mb-3 text-amber-600">
                <Award size={22} />
              </div>
              <p className="font-semibold text-gray-800 text-sm leading-snug mb-1">{a.title}</p>
              {a.year && <p className="text-gray-400 text-xs mb-1">{a.year}</p>}
              <p className="text-gray-300 text-xs font-mono">{a.icon}</p>
              <div className="flex gap-2 justify-center mt-4">
                <button onClick={() => openEdit(a)} className="px-3 py-1.5 text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">Sửa</button>
                <button onClick={() => setDelTarget(a)} className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">Xóa</button>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 p-12 text-center bg-white rounded-2xl border border-gray-100">
              <Award size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">Chưa có giải thưởng nào</p>
              <button onClick={openNew} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors">Thêm giải thưởng đầu tiên</button>
            </div>
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa giải thưởng" : "Thêm giải thưởng"} size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tên giải thưởng / chứng nhận *</label>
            <input value={form.title} required onChange={e => setForm({...form, title: e.target.value})}
              placeholder="VD: Top 100 DN Logistics uy tín 2024"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Năm</label>
              <input value={form.year} onChange={e => setForm({...form, year: e.target.value})}
                placeholder="2024"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Thứ tự</label>
              <input type="number" min={0} value={form.orderNo} onChange={e => setForm({...form, orderNo: Number(e.target.value)})}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Icon (Lucide React name)</label>
            <select value={form.icon} onChange={e => setForm({...form, icon: e.target.value})}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
              {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
            </select>
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
      <ConfirmDialog open={!!delTarget} message={`Xóa giải thưởng "${delTarget?.title}"?`} onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
