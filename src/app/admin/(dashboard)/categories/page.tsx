"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, FolderOpen } from "lucide-react";
import { getAdminCategories, createCategory, updateCategory, deleteCategory } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { name: "", slug: "" };

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 120);
}

export default function CategoriesPage() {
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
    try { setList(await getAdminCategories() as any[]); }
    catch (e: any) { toast("error", e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (c: any) => {
    setEditing(c);
    setForm({ name: c.name, slug: c.slug });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) { toast("error", "Vui lòng điền tên và slug"); return; }
    setSaving(true);
    try {
      if (editing) await updateCategory(editing.id, form);
      else         await createCategory(form);
      toast("success", editing ? "Cập nhật chuyên mục thành công" : "Tạo chuyên mục thành công");
      setModalOpen(false); fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteCategory(delTarget.id); toast("success", "Xóa thành công"); setDelTarget(null); fetchData(); }
    catch (e: any) { toast("error", e.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Chuyên mục bài viết</h1>
          <p className="text-gray-500 text-sm mt-0.5">{list.length} chuyên mục</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Thêm chuyên mục
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
        ) : list.length === 0 ? (
          <div className="p-12 text-center">
            <FolderOpen size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">Chưa có chuyên mục nào</p>
            <button onClick={openNew} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors">Tạo chuyên mục đầu tiên</button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tên chuyên mục</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Slug</th>
                <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Chuyên mục cha</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {list.map((c: any) => (
                <tr key={c.id} className="hover:bg-gray-50/70 transition-colors">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 bg-indigo-100 rounded-lg flex items-center justify-center text-indigo-600 flex-shrink-0">
                        <FolderOpen size={14} />
                      </div>
                      <span className="font-semibold text-gray-800">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-400">{c.slug}</td>
                  <td className="px-4 py-3 text-xs text-gray-400">
                    {c.parent ? (
                      <span className="px-2 py-1 bg-gray-100 rounded-lg">{c.parent.name}</span>
                    ) : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 justify-end">
                      <button onClick={() => openEdit(c)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><Pencil size={14} /></button>
                      <button onClick={() => setDelTarget(c)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa chuyên mục" : "Thêm chuyên mục"} size="sm">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tên chuyên mục *</label>
            <input value={form.name} required
              onChange={e => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
              placeholder="VD: Tin ngành Logistics"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Slug *</label>
            <input value={form.slug} required onChange={e => setForm({...form, slug: e.target.value})}
              placeholder="tin-nganh-logistics"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-400" />
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Hủy</button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-60 transition-colors">
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Tạo chuyên mục"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!delTarget} message={`Xóa chuyên mục "${delTarget?.name}"? Các bài viết thuộc chuyên mục này sẽ không bị xóa.`} onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
