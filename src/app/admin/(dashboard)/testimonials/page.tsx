"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Quote, Star } from "lucide-react";
import { getAdminTestimonials, createTestimonial, updateTestimonial, deleteTestimonial } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { customerName: "", customerType: "", content: "", logo: "", orderNo: 0 };

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
    try { setList(await getAdminTestimonials() as any[]); }
    catch (e: any) { toast("error", e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (t: any) => {
    setEditing(t);
    setForm({ customerName: t.customerName, customerType: t.customerType || "",
      content: t.content, logo: t.logo || "", orderNo: t.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.customerName || !form.content) { toast("error", "Vui lòng điền tên và nội dung"); return; }
    setSaving(true);
    try {
      if (editing) await updateTestimonial(editing.id, form);
      else         await createTestimonial(form);
      toast("success", editing ? "Cập nhật thành công" : "Thêm đánh giá thành công");
      setModalOpen(false); fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteTestimonial(delTarget.id); toast("success", "Xóa thành công"); setDelTarget(null); fetchData(); }
    catch (e: any) { toast("error", e.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Đánh giá khách hàng</h1>
          <p className="text-gray-500 text-sm mt-0.5">Hiển thị trên trang chủ và trang Về chúng tôi</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Thêm đánh giá
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {list.map((t: any) => (
            <div key={t.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <Quote size={20} className="text-indigo-300 flex-shrink-0" />
                <div className="flex gap-1">
                  <button onClick={() => openEdit(t)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><Pencil size={13} /></button>
                  <button onClick={() => setDelTarget(t)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
              <div className="flex gap-0.5 mb-3">
                {[1,2,3,4,5].map(s => <Star key={s} size={11} className="fill-amber-400 text-amber-400" />)}
              </div>
              <p className="text-gray-600 text-sm leading-relaxed line-clamp-3 mb-4 italic">"{t.content}"</p>
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-700 font-bold text-sm flex-shrink-0">
                  {t.customerName?.charAt(0) || "?"}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{t.customerName}</p>
                  <p className="text-gray-400 text-xs">{t.customerType || "—"}</p>
                </div>
                <span className="ml-auto text-gray-300 text-xs">#{t.orderNo}</span>
              </div>
            </div>
          ))}
          {list.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 p-12 text-center bg-white rounded-2xl border border-gray-100">
              <Quote size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400 mb-4">Chưa có đánh giá nào</p>
              <button onClick={openNew} className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-xl hover:bg-indigo-500 transition-colors">Thêm đánh giá đầu tiên</button>
            </div>
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa đánh giá" : "Thêm đánh giá mới"} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tên khách hàng / Doanh nghiệp *</label>
              <input value={form.customerName} required onChange={e => setForm({...form, customerName: e.target.value})}
                placeholder="VD: Công ty ABC"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Loại / Ngành nghề</label>
              <input value={form.customerType} onChange={e => setForm({...form, customerType: e.target.value})}
                placeholder="VD: Sản xuất linh kiện"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Nội dung đánh giá *</label>
            <textarea value={form.content} rows={4} required onChange={e => setForm({...form, content: e.target.value})}
              placeholder="Nội dung phản hồi từ khách hàng..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Logo URL (tuỳ chọn)</label>
              <input value={form.logo} onChange={e => setForm({...form, logo: e.target.value})}
                placeholder="/images/logo-partner.svg"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Thứ tự hiển thị</label>
              <input type="number" min={0} value={form.orderNo} onChange={e => setForm({...form, orderNo: Number(e.target.value)})}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Hủy</button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-60 transition-colors">
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Thêm đánh giá"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!delTarget} message={`Xóa đánh giá của "${delTarget?.customerName}"?`} onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
