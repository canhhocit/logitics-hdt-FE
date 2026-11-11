"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Quote, Star } from "lucide-react";
import { getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { customerName: "", customerType: "", content: "", orderNo: 0 };

export default function TestimonialsPage() {
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
    try {
      const res = await getAdminTestimonials();
      setList((res as any).content || res || []);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (t: any) => {
    setEditing(t);
    setForm({ customerName: t.customerName, customerType: t.customerType || "", content: t.content, orderNo: t.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.customerName || !form.content) { toast("error", "Vui lòng nhập tên khách hàng và nội dung đánh giá"); return; }
    setSaving(true);
    try {
      if (editing) await updateTestimonial(editing.id, form);
      else         await createTestimonial(form);
      toast("success", editing ? "Cập nhật đánh giá thành công" : "Tạo đánh giá thành công");
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
      await deleteTestimonial(delTarget.id);
      toast("success", "Xóa đánh giá thành công");
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Đánh giá & Phản hồi khách hàng</h1>
          <p className="text-xs text-slate-500 mt-0.5">Lời nhận xét từ các chủ hàng, đối tác xuất nhập khẩu hiển thị trên trang chủ</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Thêm đánh giá</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200/80">
          Đang tải phản hồi khách hàng...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map((t: any) => (
            <div
              key={t.id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-5 hover:border-slate-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-navy-50 text-navy-700 border border-navy-100 flex items-center justify-center">
                    <Quote size={15} />
                  </div>
                  <div className="flex gap-1">
                    <button
                      onClick={() => openEdit(t)}
                      title="Sửa đánh giá"
                      aria-label="Sửa đánh giá"
                      className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDelTarget(t)}
                      title="Xóa đánh giá"
                      aria-label="Xóa đánh giá"
                      className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="flex gap-1 mb-2.5">
                  {[1,2,3,4,5].map(s => <Star key={s} size={12} className="fill-amber-400 text-amber-400" />)}
                </div>

                <p className="text-slate-600 text-xs leading-relaxed line-clamp-3 mb-4 italic">"{t.content}"</p>
              </div>

              <div className="flex items-center gap-2.5 pt-3 border-t border-slate-100 text-xs">
                <div className="w-7 h-7 bg-slate-100 border border-slate-200 rounded-md flex items-center justify-center text-slate-800 font-bold text-xs flex-shrink-0">
                  {t.customerName?.charAt(0) || "?"}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-slate-900 truncate leading-snug">{t.customerName}</p>
                  <p className="text-slate-400 text-[11px] truncate leading-snug">{t.customerType || "Khách hàng doanh nghiệp"}</p>
                </div>
                <span className="text-slate-300 font-mono text-[11px]">#{t.orderNo}</span>
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 p-12 text-center bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
                <Quote size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-700">Chưa có đánh giá nào</p>
              <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Thêm nhận xét thực tế từ đối tác để nâng cao độ tin cậy của HDT.</p>
              <button
                onClick={openNew}
                className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
              >
                <Plus size={13} />
                <span>Thêm đánh giá đầu tiên</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa đánh giá khách hàng" : "Thêm đánh giá mới"} size="md">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên khách hàng / Người đại diện *</label>
            <input
              value={form.customerName}
              required
              onChange={e => setForm({ ...form, customerName: e.target.value })}
              placeholder="VD: Nguyễn Văn Hoàng"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên công ty / Loại hình đối tác</label>
            <input
              value={form.customerType}
              onChange={e => setForm({ ...form, customerType: e.target.value })}
              placeholder="VD: Giám đốc XNK - Công ty CP Thủy Sản Minh Phú"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nội dung phản hồi / Trích dẫn *</label>
            <textarea
              value={form.content}
              rows={4}
              required
              onChange={e => setForm({ ...form, content: e.target.value })}
              placeholder="Nội dung đánh giá về chất lượng phục vụ của HDT Logistics..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white resize-none focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Thứ tự ưu tiên hiển thị</label>
            <input
              type="number"
              min={0}
              value={form.orderNo}
              onChange={e => setForm({ ...form, orderNo: Number(e.target.value) })}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
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
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Lưu đánh giá"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Xóa đánh giá của "${delTarget?.customerName}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
