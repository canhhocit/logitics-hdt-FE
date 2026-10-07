"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Users } from "lucide-react";
import { getAdminContacts, createContact, updateContact, deleteContact } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { fullName: "", title: "", email: "", phone: "", initials: "", region: "" };

export default function ContactsPage() {
  const { toast } = useToast();
  const [data,      setData]      = useState<any>({ content: [] });
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState<any>(null);
  const [form,      setForm]      = useState<any>(EMPTY);
  const [saving,    setSaving]    = useState(false);
  const [delTarget, setDelTarget] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { setData(await getAdminContacts()); }
    catch (e: any) { toast("error", e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (c: any) => {
    setEditing(c);
    setForm({ fullName: c.fullName, title: c.title || "", email: c.email || "",
      phone: c.phone || "", initials: c.initials || "", region: c.region || "" });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.fullName) { toast("error", "Vui lòng nhập họ tên"); return; }
    setSaving(true);
    try {
      if (editing) await updateContact(editing.id, form);
      else         await createContact(form);
      toast("success", editing ? "Cập nhật thành công" : "Tạo người phụ trách thành công");
      setModalOpen(false); fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteContact(delTarget.id); toast("success", "Xóa thành công"); setDelTarget(null); fetchData(); }
    catch (e: any) { toast("error", e.message); }
  };

  const contacts: any[] = (data as any).content || data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Người phụ trách</h1>
          <p className="text-gray-500 text-sm mt-0.5">Hiển thị trên trang Liên hệ</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Thêm người phụ trách
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {contacts.map((c: any) => (
            <div key={c.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 text-center hover:shadow-md transition-shadow">
              <div className="relative inline-block mb-3">
                <div className="w-14 h-14 bg-gradient-to-br from-indigo-500 to-violet-600 rounded-full flex items-center justify-center text-white font-bold text-lg mx-auto">
                  {c.initials || c.fullName?.charAt(0) || "?"}
                </div>
              </div>
              <p className="font-bold text-gray-800 text-sm">{c.fullName}</p>
              <p className="text-indigo-600 text-xs font-semibold mt-0.5">{c.title}</p>
              <p className="text-gray-400 text-xs mt-1">{c.region}</p>
              {c.email && <p className="text-gray-400 text-xs mt-1 truncate">{c.email}</p>}
              <div className="flex gap-2 justify-center mt-4">
                <button onClick={() => openEdit(c)} className="px-3 py-1.5 text-xs font-semibold text-indigo-600 border border-indigo-200 rounded-lg hover:bg-indigo-50 transition-colors">Sửa</button>
                <button onClick={() => setDelTarget(c)} className="px-3 py-1.5 text-xs font-semibold text-red-500 border border-red-200 rounded-lg hover:bg-red-50 transition-colors">Xóa</button>
              </div>
            </div>
          ))}
          {contacts.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 p-12 text-center bg-white rounded-2xl border border-gray-100">
              <Users size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">Chưa có người phụ trách nào</p>
            </div>
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa người phụ trách" : "Thêm người phụ trách"} size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Họ và tên *</label>
              <input value={form.fullName} required onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Chức danh</label>
              <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="VD: Giám đốc Khu vực Miền Bắc"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Điện thoại</label>
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Viết tắt (initials)</label>
              <input value={form.initials} maxLength={4} onChange={(e) => setForm({ ...form, initials: e.target.value.toUpperCase() })}
                placeholder="VD: NVM"
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Khu vực phụ trách</label>
              <input value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}
                placeholder="VD: Miền Bắc"
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
      <ConfirmDialog open={!!delTarget} message={`Xóa người phụ trách "${delTarget?.fullName}"?`} onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
