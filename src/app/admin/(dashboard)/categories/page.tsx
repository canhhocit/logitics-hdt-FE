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
  const [saving,     setSaving]    = useState(false);
  const [delTarget, setDelTarget] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      setList(await getAdminCategories() as any[]);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (c: any) => {
    setEditing(c);
    setForm({ name: c.name, slug: c.slug });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) { toast("error", "Vui lòng nhập tên chuyên mục và slug"); return; }
    setSaving(true);
    try {
      if (editing) await updateCategory(editing.id, form);
      else         await createCategory(form);
      toast("success", editing ? "Cập nhật chuyên mục thành công" : "Tạo chuyên mục thành công");
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
      await deleteCategory(delTarget.id);
      toast("success", "Xóa chuyên mục thành công");
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Chuyên mục bài viết</h1>
          <p className="text-xs text-slate-500 mt-0.5">Phân loại các chủ đề tin tức, hướng dẫn xuất nhập khẩu và chính sách hải quan</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Thêm chuyên mục</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Đang tải danh sách chuyên mục...</div>
        ) : list.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
              <FolderOpen size={20} />
            </div>
            <p className="text-xs font-semibold text-slate-700">Chưa có chuyên mục nào</p>
            <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Tạo chuyên mục để gắn bài viết và cấu trúc website.</p>
            <button
              onClick={openNew}
              className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus size={13} />
              <span>Tạo chuyên mục đầu tiên</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Tên chuyên mục</th>
                  <th className="px-4 py-3">Đường dẫn (Slug)</th>
                  <th className="px-4 py-3">Chuyên mục cha</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {list.map((c: any) => (
                  <tr key={c.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-md bg-navy-50 text-navy-700 border border-navy-100 flex items-center justify-center flex-shrink-0">
                          <FolderOpen size={14} />
                        </div>
                        <span className="font-semibold text-slate-900 group-hover:text-navy-700 transition-colors">{c.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-400">{c.slug}</td>
                    <td className="px-4 py-3 text-[11px] text-slate-500">
                      {c.parent ? (
                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200/60 rounded text-slate-700 font-medium">
                          {c.parent.name}
                        </span>
                      ) : (
                        <span className="text-slate-300">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => openEdit(c)}
                          title="Sửa chuyên mục"
                          aria-label="Sửa chuyên mục"
                          className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDelTarget(c)}
                          title="Xóa chuyên mục"
                          aria-label="Xóa chuyên mục"
                          className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                        >
                          <Trash2 size={13} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Cập nhật chuyên mục" : "Thêm chuyên mục mới"} size="sm">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên chuyên mục *</label>
            <input
              value={form.name}
              required
              onChange={e => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
              placeholder="VD: Cẩm nang xuất nhập khẩu..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Đường dẫn (Slug) *</label>
            <input
              value={form.slug}
              required
              onChange={e => setForm({...form, slug: e.target.value})}
              placeholder="cam-nang-xnk"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
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
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Tạo chuyên mục"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Xóa chuyên mục "${delTarget?.name}"? Lưu ý: Các bài viết thuộc chuyên mục này sẽ không bị xóa mà chuyển sang trạng thái Chưa phân loại.`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
