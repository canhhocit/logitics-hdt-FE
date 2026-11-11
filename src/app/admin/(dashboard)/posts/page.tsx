"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, FileText, Search, ArrowDown, ArrowUp, RotateCcw, Calendar } from "lucide-react";
import { getAdminPosts, createPost, updatePost, deletePost, getCategories, uploadMedia, ADMIN_API } from "../../_lib/api";
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
  const [previewMode, setPreviewMode] = useState(false);

  // Filters
  const [keyword, setKeyword] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortDir, setSortDir] = useState("desc");

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [posts, cats] = await Promise.all([
        getAdminPosts(page, 15, keyword, fromDate, toDate, sortBy, sortDir),
        getCategories(),
      ]);
      setData(posts);
      setCategories(cats as any[]);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [page, keyword, fromDate, toDate, sortBy, sortDir, toast]);

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(timer);
  }, [fetchData]);

  const clearFilters = () => {
    setKeyword("");
    setFromDate("");
    setToDate("");
    setSortBy("createdAt");
    setSortDir("desc");
    setPage(0);
  };

  const hasFilterActive = Boolean(keyword || fromDate || toDate || sortDir !== "desc");

  const openNew = () => { setEditing(null); setForm(EMPTY); setPreviewMode(false); setModalOpen(true); };
  const openEdit = (p: any) => {
    setEditing(p);
    setForm({
      title: p.title,
      slug: p.slug,
      excerpt: p.excerpt || "",
      content: p.content || "",
      categoryId: p.category?.id || "",
      status: p.status,
      readMinutes: p.readMinutes || 5,
      thumbnail: p.thumbnail || ""
    });
    setPreviewMode(false);
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) { toast("error", "Vui lòng nhập tiêu đề và slug"); return; }
    setSaving(true);
    try {
      if (editing) await updatePost(editing.id, form);
      else         await createPost(form);
      toast("success", editing ? "Cập nhật bài viết thành công" : "Tạo bài viết thành công");
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
      await deletePost(delTarget.id);
      toast("success", "Xóa bài viết thành công");
      setDelTarget(null);
      fetchData();
    } catch (e: any) {
      toast("error", e.message);
    }
  };

  const posts: any[] = data.content || [];

  return (
    <div className="space-y-5">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Bài viết & Tin tức</h1>
          <p className="text-xs text-slate-500 mt-0.5">Quản lý các bài phân tích, cẩm nang xuất nhập khẩu và tin tức HDT</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-[0.99] whitespace-nowrap self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Thêm bài viết mới</span>
        </button>
      </div>

      {/* Filter Toolbar (Precision Design) */}
      <div className="bg-white p-3.5 rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.03)] flex flex-col md:flex-row flex-wrap gap-2.5 items-stretch md:items-center">
        {/* Search */}
        <div className="flex-1 min-w-[220px] relative">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          <input
            type="text"
            value={keyword}
            onChange={(e) => { setKeyword(e.target.value); setPage(0); }}
            placeholder="Tìm theo tiêu đề, slug..."
            className="w-full pl-9 pr-3.5 h-9 text-xs border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-white focus:bg-white text-slate-800 placeholder:text-slate-400
                       focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200 transition-colors"
          />
        </div>

        {/* Date Filters */}
        <div className="flex gap-2 items-center">
          <div className="relative">
            <input
              type={fromDate ? "date" : "text"}
              placeholder="Từ ngày"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (!fromDate && (e.target.type = "text"))}
              value={fromDate}
              onChange={(e) => { setFromDate(e.target.value); setPage(0); }}
              className="w-full sm:w-[130px] px-3 h-9 text-xs border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-white focus:bg-white text-slate-800
                         focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200 transition-colors"
            />
          </div>
          <span className="text-slate-300 text-xs">–</span>
          <div className="relative">
            <input
              type={toDate ? "date" : "text"}
              placeholder="Đến ngày"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (!toDate && (e.target.type = "text"))}
              value={toDate}
              onChange={(e) => { setToDate(e.target.value); setPage(0); }}
              className="w-full sm:w-[130px] px-3 h-9 text-xs border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-white focus:bg-white text-slate-800
                         focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200 transition-colors"
            />
          </div>
        </div>

        {/* Sort & Reset Actions */}
        <div className="flex gap-2 items-center">
          <button
            type="button"
            onClick={() => { setSortDir(sortDir === "desc" ? "asc" : "desc"); setPage(0); }}
            className="h-9 px-3 flex items-center gap-1.5 text-xs font-medium border border-slate-200 rounded-lg bg-slate-50/50 hover:bg-white text-slate-700 hover:border-slate-300 transition-colors"
          >
            <span>Ngày tạo</span>
            {sortDir === "desc" ? <ArrowDown size={13} className="text-slate-500" /> : <ArrowUp size={13} className="text-slate-500" />}
          </button>

          {/* Clean Reset Button (Fixed yellow/red clash) */}
          <button
            onClick={clearFilters}
            disabled={!hasFilterActive}
            aria-label="Xóa bộ lọc"
            className={`h-9 px-3 text-xs font-semibold rounded-lg border transition-colors flex items-center gap-1.5 whitespace-nowrap
              ${hasFilterActive
                ? "border-slate-200 text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 cursor-pointer shadow-sm"
                : "border-transparent text-slate-300 bg-transparent cursor-not-allowed"
              }`}
          >
            <RotateCcw size={12} className={hasFilterActive ? "text-slate-500" : "text-slate-300"} />
            <span>Xóa lọc</span>
          </button>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Đang tải danh sách bài viết...</div>
        ) : posts.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
              <FileText size={20} />
            </div>
            <p className="text-xs font-semibold text-slate-700">Chưa tìm thấy bài viết phù hợp</p>
            <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Hãy thử thay đổi điều kiện tìm kiếm hoặc thêm bài viết mới.</p>
            <button
              onClick={openNew}
              className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus size={13} />
              <span>Tạo bài viết đầu tiên</span>
            </button>
          </div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  <tr>
                    <th className="px-4 py-3 whitespace-nowrap">Ngày tạo</th>
                    <th className="px-4 py-3">Tiêu đề bài viết</th>
                    <th className="px-4 py-3">Chuyên mục</th>
                    <th className="px-4 py-3">Đường dẫn (Slug)</th>
                    <th className="px-4 py-3">Trạng thái</th>
                    <th className="px-4 py-3 text-right">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs">
                  {posts.map((p: any) => (
                    <tr key={p.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="px-4 py-3 text-[11px] text-slate-500 font-mono whitespace-nowrap">
                        {p.createdAt ? new Date(p.createdAt).toLocaleDateString("vi-VN", { day: '2-digit', month: '2-digit', year: 'numeric' }) : "—"}
                      </td>
                      <td className="px-4 py-3 max-w-[320px]">
                        <p className="font-semibold text-slate-900 line-clamp-1 group-hover:text-navy-700 transition-colors">{p.title}</p>
                        {p.excerpt && <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{p.excerpt}</p>}
                      </td>
                      <td className="px-4 py-3 text-slate-600 whitespace-nowrap">
                        <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded text-[11px] font-medium border border-slate-200/60">
                          {p.category?.name || "Chưa phân loại"}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-400 max-w-[160px] truncate" title={p.slug}>
                        {p.slug}
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {p.status === "PUBLISHED" ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/60">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Xuất bản
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Lưu nháp
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => openEdit(p)}
                            title="Sửa bài viết"
                            aria-label="Chỉnh sửa bài viết"
                            className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => setDelTarget(p)}
                            title="Xóa bài viết"
                            aria-label="Xóa bài viết"
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

            <Pagination
              page={page}
              totalPages={data.totalPages}
              totalElements={data.totalElements}
              size={15}
              onChange={setPage}
            />
          </>
        )}
      </div>

      {/* Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Cập nhật bài viết" : "Thêm bài viết mới"} size="xl">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tiêu đề bài viết *</label>
              <input
                value={form.title}
                required
                onChange={(e) => setForm({ ...form, title: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
                placeholder="Nhập tiêu đề bài viết..."
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 bg-white placeholder:text-slate-400
                           focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Slug định danh *</label>
              <input
                value={form.slug}
                required
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="tieu-de-bai-viet"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-800 bg-white placeholder:text-slate-400
                           focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Chuyên mục</label>
              <select
                value={form.categoryId}
                onChange={(e) => setForm({ ...form, categoryId: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              >
                <option value="">-- Chọn chuyên mục --</option>
                {categories.map((c: any) => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Thời gian đọc (phút)</label>
              <input
                type="number"
                min={1}
                max={60}
                value={form.readMinutes}
                onChange={(e) => setForm({ ...form, readMinutes: Number(e.target.value) })}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Trạng thái xuất bản</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              >
                <option value="PUBLISHED">Xuất bản công khai</option>
                <option value="DRAFT">Lưu bản nháp</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mô tả tóm tắt (Excerpt)</label>
            <textarea
              value={form.excerpt}
              rows={2}
              onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
              placeholder="Tóm tắt ngắn hiển thị trong danh sách bài viết..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-900 bg-white resize-none placeholder:text-slate-400
                         focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ảnh bìa đại diện (Thumbnail)</label>
            <input
              type="file"
              accept="image/*"
              onChange={async (e) => {
                if (!e.target.files?.length) return;
                try {
                  const res = await uploadMedia(e.target.files[0]);
                  setForm({ ...form, thumbnail: res.url });
                  toast("success", "Tải ảnh đại diện thành công!");
                } catch (err: any) {
                  toast("error", err.message);
                }
              }}
              className="mb-2 block w-full text-xs text-slate-500 file:mr-4 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
            />
            {form.thumbnail && (
              <img
                src={form.thumbnail.startsWith("http") ? form.thumbnail : `${ADMIN_API}${form.thumbnail}`}
                alt="Thumbnail preview"
                className="h-20 w-auto object-cover rounded-md border border-slate-200 shadow-sm"
              />
            )}
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="block text-xs font-semibold text-slate-700">Nội dung chi tiết bài viết (HTML)</label>
              <div className="flex bg-slate-100 rounded-md p-0.5 border border-slate-200">
                <button
                  type="button"
                  onClick={() => setPreviewMode(false)}
                  className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-colors ${!previewMode ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Soạn thảo
                </button>
                <button
                  type="button"
                  onClick={() => setPreviewMode(true)}
                  className={`px-2.5 py-0.5 text-[11px] font-medium rounded transition-colors ${previewMode ? 'bg-white shadow-xs text-slate-900 font-semibold' : 'text-slate-500 hover:text-slate-800'}`}
                >
                  Xem trước
                </button>
              </div>
            </div>

            {!previewMode ? (
              <>
                <textarea
                  value={form.content}
                  rows={9}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  placeholder="<p>Nhập nội dung bài viết...</p>"
                  className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-800 bg-white resize-y placeholder:text-slate-400
                             focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
                />
                <p className="text-[11px] text-slate-400 mt-1">Hỗ trợ các định dạng HTML: &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;strong&gt;, &lt;table&gt;...</p>
              </>
            ) : (
              <div
                className="w-full border border-slate-200 rounded-lg px-4 py-3.5 text-xs prose max-w-none h-[220px] overflow-y-auto bg-slate-50/50"
                dangerouslySetInnerHTML={{ __html: form.content || '<p class="text-slate-400 italic">Chưa có nội dung xem trước...</p>' }}
              />
            )}
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
              className="px-4 py-2 text-xs font-semibold bg-navy-600 text-white rounded-lg hover:bg-navy-700 disabled:opacity-60 transition-colors inline-flex items-center gap-1.5 shadow-sm active:scale-[0.99]"
            >
              {saving ? "Đang lưu..." : (editing ? "Lưu thay đổi" : "Xuất bản bài viết")}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Bạn có chắc chắn muốn xóa bài viết "${delTarget?.title}"? Thao tác này sẽ gỡ bỏ bài viết vĩnh viễn khỏi website.`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
