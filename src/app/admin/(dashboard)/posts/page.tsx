"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, FileText } from "lucide-react";
import { getAdminPosts, createPost, updatePost, deletePost, getCategories, uploadMedia } from "../../_lib/api";
import Pagination from "../../_components/Pagination";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { title: "", slug: "", excerpt: "", content: "", categoryId: "", status: "PUBLISHED", readMinutes: 5, thumbnail: "" };

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 120);
}

export default function PostsPage() {
  const { toast } = useToast();
  const [data,       setData]       = useState<any>({ content: [], totalPages: 0, totalElements: 0 });
  const [categories, setCategories] = useState<any[]>([]);
  const [page,       setPage]       = useState(0);
  const [loading,    setLoading]    = useState(true);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editing,    setEditing]    = useState<any>(null);
  const [form,       setForm]       = useState<any>(EMPTY);
  const [saving,     setSaving]     = useState(false);
  const [delTarget,  setDelTarget]  = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [posts, cats] = await Promise.all([
        getAdminPosts(page, 15),
        getCategories(),
      ]);
      console.log("[Posts] API response:", posts);
      setData(posts);
      setCategories(cats as any[]);
    } catch (e: any) {
      console.error("[Posts] fetchData error:", e);
      toast("error", e.message);
    }
    finally { setLoading(false); }
  }, [page]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (p: any) => {
    setEditing(p);
    setForm({ title: p.title, slug: p.slug, excerpt: p.excerpt || "", content: p.content || "",
      categoryId: p.category?.id || "", status: p.status, readMinutes: p.readMinutes || 5, thumbnail: p.thumbnail || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast("error", "Vui lòng điền tiêu đề và slug"); return; }
    setSaving(true);
    try {
      if (editing) await updatePost(editing.id, form);
      else         await createPost(form);
      toast("success", editing ? "Cập nhật bài viết thành công" : "Tạo bài viết thành công");
      setModalOpen(false);
      fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await deletePost(delTarget.id);
      toast("success", "Xóa bài viết thành công");
      setDelTarget(null);
      fetchData();
    } catch (e: any) { toast("error", e.message); }
  };

  const posts: any[] = data.content || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Bài viết</h1>
          <p className="text-gray-500 text-sm mt-0.5">{data.totalElements ?? 0} bài viết</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white
                     text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Thêm bài viết
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <FileText size={36} className="text-gray-200 mx-auto mb-3" />
            <p className="text-gray-400 mb-4">Chưa có bài viết nào</p>
            <button onClick={openNew}
              className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors">
              Tạo bài viết đầu tiên
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Tiêu đề</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Chuyên mục</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Slug</th>
                    <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {posts.map((p: any) => (
                    <tr key={p.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-800 line-clamp-1">{p.title}</p>
                        {p.excerpt && <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{p.excerpt}</p>}
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">{p.category?.name || "—"}</td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-400 max-w-[180px] truncate">{p.slug}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold
                          ${p.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {p.status === "PUBLISHED" ? "Xuất bản" : "Nháp"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button onClick={() => openEdit(p)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors">
                            <Pencil size={14} />
                          </button>
                          <button onClick={() => setDelTarget(p)}
                            className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors">
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="px-4 pb-4">
              <Pagination page={page} totalPages={data.totalPages} totalElements={data.totalElements}
                size={15} onChange={setPage} />
            </div>
          </>
        )}
      </div>

      {/* Form modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? "Sửa bài viết" : "Thêm bài viết mới"} size="xl">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tiêu đề *</label>
              <input value={form.title} required
                onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
                placeholder="Nhập tiêu đề bài viết..."
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Slug *</label>
              <input value={form.slug} required
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="bai-viet-mau"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Chuyên mục</label>
              <select value={form.categoryId} onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                <option value="">-- Chọn chuyên mục --</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Thời gian đọc (phút)</label>
              <input type="number" min={1} max={60} value={form.readMinutes}
                onChange={(e) => setForm({ ...form, readMinutes: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Trạng thái</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                <option value="PUBLISHED">Xuất bản ngay</option>
                <option value="DRAFT">Lưu nháp</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mô tả ngắn (excerpt)</label>
            <textarea value={form.excerpt} rows={2}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Tóm tắt ngắn hiển thị trong danh sách bài viết..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Ảnh bìa (Thumbnail)</label>
            <input type="file" accept="image/*" onChange={async (e) => {
              if (!e.target.files?.length) return;
              try {
                const res = await uploadMedia(e.target.files[0]);
                setForm({ ...form, thumbnail: res.url });
                toast("success", "Upload ảnh thành công!");
              } catch (err: any) {
                toast("error", err.message);
              }
            }} className="mb-2 block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100" />
            {form.thumbnail && <img src={`http://localhost:8080${form.thumbnail}`} alt="Thumb" className="h-24 w-auto object-cover rounded border shadow-sm" />}
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nội dung bài viết (HTML)</label>
            <textarea value={form.content} rows={10}
              onChange={(e) => setForm({ ...form, content: e.target.value })}
              placeholder="<p>Nội dung bài viết...</p>"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-mono resize-y focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200" />
            <p className="text-xs text-gray-400 mt-1">Nhập HTML trực tiếp. Hỗ trợ các thẻ &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;table&gt;...</p>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModalOpen(false)}
              className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">
              Hủy
            </button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-60 transition-colors flex items-center gap-2">
              {saving ? "Đang lưu..." : (editing ? "Lưu thay đổi" : "Tạo bài viết")}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!delTarget} message={`Xóa bài viết "${delTarget?.title}"? Thao tác không thể hoàn tác.`}
        onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
