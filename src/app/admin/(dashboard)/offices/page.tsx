"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Building2, MapPin, Phone } from "lucide-react";
import { getAdminOffices, createOffice, updateOffice, deleteOffice } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { name: "", address: "", phone: "", email: "", region: "BAC", orderNo: 0 };
const REGION_LABEL: Record<string, string> = { BAC: "Miền Bắc", TRUNG: "Miền Trung", NAM: "Miền Nam" };
const REGION_COLOR: Record<string, string> = {
  BAC:   "bg-blue-100 text-blue-700",
  TRUNG: "bg-amber-100 text-amber-700",
  NAM:   "bg-green-100 text-green-700",
};

export default function OfficesPage() {
  const { toast } = useToast();
  const [data,      setData]      = useState<any>({ content: [], totalPages: 0, totalElements: 0 });
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState<any>(null);
  const [form,      setForm]      = useState<any>(EMPTY);
  const [saving,    setSaving]    = useState(false);
  const [delTarget, setDelTarget] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try { setData(await getAdminOffices()); }
    catch (e: any) { toast("error", e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (o: any) => {
    setEditing(o);
    setForm({ name: o.name, address: o.address, phone: o.phone, email: o.email || "",
      region: o.region, orderNo: o.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.address || !form.phone) { toast("error", "Vui lòng điền đầy đủ thông tin bắt buộc"); return; }
    setSaving(true);
    try {
      if (editing) await updateOffice(editing.id, form);
      else         await createOffice(form);
      toast("success", editing ? "Cập nhật chi nhánh thành công" : "Tạo chi nhánh thành công");
      setModalOpen(false); fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try { await deleteOffice(delTarget.id); toast("success", "Xóa chi nhánh thành công"); setDelTarget(null); fetchData(); }
    catch (e: any) { toast("error", e.message); }
  };

  const offices: any[] = (data as any).content || data || [];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Chi nhánh</h1>
          <p className="text-gray-500 text-sm mt-0.5">{offices.length} chi nhánh</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Thêm chi nhánh
        </button>
      </div>

      {loading ? (
        <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {offices.map((o: any) => (
            <div key={o.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-indigo-100 rounded-xl flex items-center justify-center text-indigo-600 flex-shrink-0">
                    <Building2 size={18} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-800 text-sm">{o.name}</p>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${REGION_COLOR[o.region] || "bg-gray-100 text-gray-500"}`}>
                      {REGION_LABEL[o.region] || o.region}
                    </span>
                  </div>
                </div>
                <div className="flex gap-1">
                  <button onClick={() => openEdit(o)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><Pencil size={13} /></button>
                  <button onClick={() => setDelTarget(o)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={13} /></button>
                </div>
              </div>
              <div className="space-y-1.5">
                <div className="flex items-start gap-2 text-xs text-gray-500">
                  <MapPin size={11} className="text-gray-300 flex-shrink-0 mt-0.5" />{o.address}
                </div>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <Phone size={11} className="text-gray-300 flex-shrink-0" />{o.phone}
                </div>
                {o.email && <div className="text-xs text-gray-400">{o.email}</div>}
              </div>
            </div>
          ))}
          {offices.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 p-12 text-center bg-white rounded-2xl border border-gray-100">
              <Building2 size={36} className="text-gray-200 mx-auto mb-3" />
              <p className="text-gray-400">Chưa có chi nhánh nào</p>
            </div>
          )}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa chi nhánh" : "Thêm chi nhánh"} size="md">
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tên chi nhánh *</label>
            <input value={form.name} required onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Địa chỉ *</label>
            <textarea value={form.address} rows={2} required onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400" />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Điện thoại *</label>
              <input value={form.phone} required onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Email</label>
              <input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Khu vực</label>
              <select value={form.region} onChange={(e) => setForm({ ...form, region: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                <option value="BAC">Miền Bắc</option>
                <option value="TRUNG">Miền Trung</option>
                <option value="NAM">Miền Nam</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Thứ tự</label>
              <input type="number" min={0} value={form.orderNo} onChange={(e) => setForm({ ...form, orderNo: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Hủy</button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-60 transition-colors">
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Tạo chi nhánh"}
            </button>
          </div>
        </div>
      </Modal>
      <ConfirmDialog open={!!delTarget} message={`Xóa chi nhánh "${delTarget?.name}"?`} onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
