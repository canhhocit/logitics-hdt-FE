"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Globe } from "lucide-react";
import { getAdminPartners, createPartner, updatePartner, deletePartner } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { type: "CARRIER", name: "", logo: "", url: "", orderNo: 0 };

const TYPE_COLOR: Record<string, string> = {
  CARRIER:     "bg-blue-100 text-blue-700",
  ASSOCIATION: "bg-violet-100 text-violet-700",
};

export default function PartnersPage() {
  const { toast } = useToast();
  const [list,      setList]      = useState<any[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [tab,       setTab]       = useState<"ALL"|"CARRIER"|"ASSOCIATION">("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState<any>(null);
  const [form,      setForm]      = useState<any>(EMPTY);
  const [saving,    setSaving]    = useState(false);
  const [delTarget, setDelTarget] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { setList(await getAdminPartners() as any[]); }
    catch (e: any) { toast("error", e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const displayed = tab === "ALL" ? list : list.filter(p => p.type === tab);

  const openNew  = () => { setEditing(null); setForm({ ...EMPTY, type: tab === "ALL" ? "CARRIER" : tab }); setModalOpen(true); };
  const openEdit = (p: any) => {
    setEditing(p);
    setForm({ type: p.type, name: p.name, logo: p.logo, url: p.url || "", orderNo: p.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.logo) { toast("error", "Vui lòng điền tên và logo"); return; }
    setSaving(true);
    try {
      if (editing) await updatePartner(editing.id, form);
      else         await createPartner(form);
      toast("success", editing ? "Cập nhật thành công" : "Thêm đối tác thành công");
      setModalOpen(false); fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deletePartner(delTarget.id); toast("success", "Xóa thành công"); setDelTarget(null); fetchData(); }
    catch (e: any) { toast("error", e.message); }
  };

  const carriers = list.filter(p => p.type === "CARRIER").length;
  const assocs   = list.filter(p => p.type === "ASSOCIATION").length;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Đối tác & Hiệp hội</h1>
          <p className="text-gray-500 text-sm mt-0.5">{carriers} hãng tàu/hàng không · {assocs} hiệp hội</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Thêm đối tác
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 mb-5">
        {(["ALL","CARRIER","ASSOCIATION"] as const).map(t => (
          <button key={t} onClick={() => setTab(t)}
            className={`px-4 py-1.5 rounded-xl text-xs font-semibold transition-all border
              ${tab === t ? "bg-indigo-600 text-white border-indigo-600" : "bg-white text-gray-500 border-gray-200 hover:border-indigo-300"}`}>
            {t === "ALL" ? "Tất cả" : t === "CARRIER" ? "Hãng vận chuyển" : "Hiệp hội"}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {displayed.length === 0 ? (
            <div className="p-12 text-center">
              <Globe size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">Chưa có đối tác nào</p>
              <button onClick={openNew} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors">Thêm đối tác đầu tiên</button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Đối tác</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Loại</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Logo path</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Website</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">STT</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {displayed.map((p: any) => (
                    <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3 font-semibold text-gray-800">{p.name}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${TYPE_COLOR[p.type] || "bg-gray-100 text-gray-500"}`}>
                          {p.type === "CARRIER" ? "Vận chuyển" : "Hiệp hội"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-400 max-w-[180px] truncate">{p.logo}</td>
                      <td className="px-4 py-3 text-xs text-gray-400 max-w-[120px] truncate">
                        {p.url ? <a href={p.url} target="_blank" rel="noreferrer" className="text-indigo-500 hover:underline">{p.url}</a> : "—"}
                      </td>
                      <td className="px-4 py-3 text-gray-400 text-xs">{p.orderNo}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button onClick={() => openEdit(p)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><Pencil size={14} /></button>
                          <button onClick={() => setDelTarget(p)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa đối tác" : "Thêm đối tác mới"} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Loại</label>
              <select value={form.type} onChange={e => setForm({...form, type: e.target.value})}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                <option value="CARRIER">Hãng vận chuyển</option>
                <option value="ASSOCIATION">Hiệp hội</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Thứ tự</label>
              <input type="number" min={0} value={form.orderNo} onChange={e => setForm({...form, orderNo: Number(e.target.value)})}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tên đối tác *</label>
              <input value={form.name} required onChange={e => setForm({...form, name: e.target.value})}
                placeholder="VD: Yang Ming, FIATA..."
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Đường dẫn Logo *</label>
              <input value={form.logo} required onChange={e => setForm({...form, logo: e.target.value})}
                placeholder="/images/partners/yang-ming.svg"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-400" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Website (tuỳ chọn)</label>
              <input type="url" value={form.url} onChange={e => setForm({...form, url: e.target.value})}
                placeholder="https://www.yangming.com"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Hủy</button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-60 transition-colors">
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Thêm đối tác"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!delTarget} message={`Xóa đối tác "${delTarget?.name}"?`} onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
