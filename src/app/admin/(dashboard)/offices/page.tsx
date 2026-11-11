"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Building2, MapPin, Phone, Mail } from "lucide-react";
import { getAdminOffices, createOffice, updateOffice, deleteOffice } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { name: "", address: "", phone: "", email: "", region: "NAM", orderNo: 0 };
const REGION_LABEL: Record<string, string> = { BAC: "Miền Bắc", TRUNG: "Miền Trung", NAM: "Miền Nam" };
const REGION_COLOR: Record<string, string> = {
  BAC:   "bg-blue-50 text-blue-700 border-blue-200/60",
  TRUNG: "bg-amber-50 text-amber-700 border-amber-200/60",
  NAM:   "bg-emerald-50 text-emerald-700 border-emerald-200/60",
};

export default function OfficesPage() {
  const { toast } = useToast();
  const [offices,   setOffices]   = useState<any[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState<any>(null);
  const [form,      setForm]      = useState<any>(EMPTY);
  const [saving,    setSaving]    = useState(false);
  const [delTarget, setDelTarget] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminOffices();
      setOffices((res as any).content || res || []);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (o: any) => {
    setEditing(o);
    setForm({ name: o.name, address: o.address, phone: o.phone, email: o.email || "", region: o.region, orderNo: o.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.address || !form.phone) {
      toast("error", "Vui lòng nhập tên chi nhánh, địa chỉ và số điện thoại");
      return;
    }
    setSaving(true);
    try {
      if (editing) await updateOffice(editing.id, form);
      else         await createOffice(form);
      toast("success", editing ? "Cập nhật chi nhánh thành công" : "Tạo chi nhánh thành công");
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
      await deleteOffice(delTarget.id);
      toast("success", "Xóa chi nhánh thành công");
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Văn phòng & Chi nhánh</h1>
          <p className="text-xs text-slate-500 mt-0.5">Quản lý mạng lưới chi nhánh, trung tâm điều hành và kho bãi toàn quốc</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Thêm chi nhánh</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200/80">
          Đang tải danh sách văn phòng...
        </div>
      ) : (
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
          {offices.map((o: any) => (
            <div
              key={o.id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-4 sm:p-5 hover:border-slate-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 bg-navy-50 text-navy-700 border border-navy-100 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 size={16} />
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900 text-xs leading-snug group-hover:text-navy-700 transition-colors">{o.name}</p>
                      <span className={`inline-block text-[10px] font-medium px-2 py-0.5 rounded-full border mt-1 ${REGION_COLOR[o.region] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {REGION_LABEL[o.region] || o.region}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-1 flex-shrink-0">
                    <button
                      onClick={() => openEdit(o)}
                      title="Sửa chi nhánh"
                      aria-label="Sửa chi nhánh"
                      className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                    >
                      <Pencil size={13} />
                    </button>
                    <button
                      onClick={() => setDelTarget(o)}
                      title="Xóa chi nhánh"
                      aria-label="Xóa chi nhánh"
                      className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-500 pt-2 border-t border-slate-100">
                  <div className="flex items-start gap-2">
                    <MapPin size={12} className="text-slate-400 flex-shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{o.address}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone size={12} className="text-slate-400 flex-shrink-0" />
                    <a href={`tel:${o.phone}`} className="font-mono text-slate-700 hover:text-navy-700 font-medium">
                      {o.phone}
                    </a>
                  </div>
                  {o.email && (
                    <div className="flex items-center gap-2 text-[11px] text-slate-400">
                      <Mail size={12} className="text-slate-400 flex-shrink-0" />
                      <span className="truncate">{o.email}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {offices.length === 0 && (
            <div className="md:col-span-2 xl:col-span-3 p-12 text-center bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
                <Building2 size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-700">Chưa có văn phòng chi nhánh nào</p>
              <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Thêm chi nhánh để hiển thị thông tin liên hệ vùng miền trên website.</p>
              <button
                onClick={openNew}
                className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
              >
                <Plus size={13} />
                <span>Thêm chi nhánh đầu tiên</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa văn phòng chi nhánh" : "Thêm văn phòng chi nhánh mới"} size="md">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên văn phòng / Chi nhánh *</label>
            <input
              value={form.name}
              required
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="VD: Chi nhánh TP. Hải Phòng..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Địa chỉ trụ sở *</label>
            <textarea
              value={form.address}
              rows={2}
              required
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh/thành..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white resize-none focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Số điện thoại bàn / Hotline *</label>
              <input
                value={form.phone}
                required
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                placeholder="024 3822 5588"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 font-mono"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Hòm thư điện tử (Email)</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                placeholder="haiphong@hdtlogistics.com"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Khu vực phân vùng</label>
              <select
                value={form.region}
                onChange={(e) => setForm({ ...form, region: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              >
                <option value="BAC">Miền Bắc</option>
                <option value="TRUNG">Miền Trung</option>
                <option value="NAM">Miền Nam</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Thứ tự hiển thị</label>
              <input
                type="number"
                min={0}
                value={form.orderNo}
                onChange={(e) => setForm({ ...form, orderNo: Number(e.target.value) })}
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
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Tạo chi nhánh"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Xóa chi nhánh "${delTarget?.name}"? Thông tin này sẽ không còn xuất hiện trên bản đồ văn phòng của website.`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
