"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Users, Mail, Phone, MapPin } from "lucide-react";
import { getAdminContacts, createContact, updateContact, deleteContact } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { fullName: "", title: "", email: "", phone: "", initials: "", region: "" };

export default function ContactsPage() {
  const { toast } = useToast();
  const [contacts,  setContacts]  = useState<any[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState<any>(null);
  const [form,      setForm]      = useState<any>(EMPTY);
  const [saving,    setSaving]    = useState(false);
  const [delTarget, setDelTarget] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminContacts();
      setContacts((res as any).content || res || []);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (c: any) => {
    setEditing(c);
    setForm({
      fullName: c.fullName, title: c.title || "", email: c.email || "",
      phone: c.phone || "", initials: c.initials || "", region: c.region || ""
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.fullName) { toast("error", "Vui lòng nhập họ và tên nhân sự"); return; }
    setSaving(true);
    try {
      if (editing) await updateContact(editing.id, form);
      else         await createContact(form);
      toast("success", editing ? "Cập nhật người phụ trách thành công" : "Tạo người phụ trách thành công");
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
      await deleteContact(delTarget.id);
      toast("success", "Xóa người phụ trách thành công");
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Người phụ trách & Đầu mối liên hệ</h1>
          <p className="text-xs text-slate-500 mt-0.5">Danh sách chuyên viên đầu mối hỗ trợ khách hàng hiển thị trên website</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Thêm người phụ trách</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200/80">
          Đang tải danh sách người phụ trách...
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {contacts.map((c: any) => (
            <div
              key={c.id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-5 text-center hover:border-slate-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-navy-50 text-navy-800 border border-navy-100 rounded-xl flex items-center justify-center font-bold text-sm mx-auto mb-3 shadow-2xs">
                  {c.initials || c.fullName?.charAt(0) || "?"}
                </div>
                <h3 className="font-bold text-slate-900 text-xs group-hover:text-navy-700 transition-colors leading-snug">{c.fullName}</h3>
                <p className="text-navy-700 text-[11px] font-semibold mt-0.5 leading-snug">{c.title || "Đầu mối hỗ trợ"}</p>
                {c.region && (
                  <p className="text-slate-400 text-[11px] mt-1 flex items-center justify-center gap-1">
                    <MapPin size={11} className="text-slate-400" />
                    <span>{c.region}</span>
                  </p>
                )}
                {c.email && (
                  <p className="text-slate-400 text-[11px] mt-1 truncate">
                    {c.email}
                  </p>
                )}
              </div>

              <div className="flex gap-2 justify-center mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => openEdit(c)}
                  className="px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => setDelTarget(c)}
                  className="px-3 py-1 text-xs font-medium text-red-600 bg-white border border-slate-200 rounded-md hover:bg-red-50 hover:border-red-200 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}

          {contacts.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 p-12 text-center bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
                <Users size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-700">Chưa có người phụ trách nào</p>
              <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Thêm thông tin đầu mối kinh doanh và quản lý khu vực.</p>
              <button
                onClick={openNew}
                className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
              >
                <Plus size={13} />
                <span>Thêm người phụ trách</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa người phụ trách" : "Thêm người phụ trách mới"} size="md">
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3.5">
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Họ và tên *</label>
              <input
                value={form.fullName}
                required
                onChange={(e) => setForm({ ...form, fullName: e.target.value })}
                placeholder="VD: Nguyễn Văn Mạnh"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Chức vụ / Vị trí</label>
              <input
                value={form.title}
                onChange={(e) => setForm({ ...form, title: e.target.value })}
                placeholder="VD: Trưởng phòng Dịch vụ Hải quan Miền Bắc"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hòm thư điện tử (Email)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="manhnv@hdtlogistics.com"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Số điện thoại di động</label>
              <input
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="0912 345 678"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Ký hiệu viết tắt (Initials)</label>
              <input
                value={form.initials}
                maxLength={4}
                onChange={(e) => setForm({ ...form, initials: e.target.value.toUpperCase() })}
                placeholder="VD: NVM"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Khu vực phụ trách</label>
              <input
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                placeholder="VD: Miền Bắc & Cảng Hải Phòng"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              />
            </div>
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
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Thêm người phụ trách"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Xóa người phụ trách "${delTarget?.fullName}" khỏi danh sách liên hệ website?`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
