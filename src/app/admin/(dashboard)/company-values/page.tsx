"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Sparkles, Clock, Eye, Briefcase, Heart, Zap, Shield, Star, Target, TrendingUp, CheckCircle, Users, Globe } from "lucide-react";
import { getAdminCompanyValues, createCompanyValue, updateCompanyValue, deleteCompanyValue } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { title: "", description: "", icon: "star", orderNo: 0 };
const ICON_OPTIONS = [
  { value: "shield", label: "Uy tín & Bảo mật", icon: Shield },
  { value: "clock", label: "Đúng giờ & Tốc độ", icon: Clock },
  { value: "target", label: "Mục tiêu chính xác", icon: Target },
  { value: "star", label: "Chất lượng 5 sao", icon: Star },
  { value: "heart", label: "Tận tâm phục vụ", icon: Heart },
  { value: "users", label: "Đồng hành gắn kết", icon: Users },
  { value: "globe", label: "Mạng lưới toàn cầu", icon: Globe },
  { value: "zap", label: "Hiệu quả nhanh chóng", icon: Zap },
  { value: "check-circle", label: "Minh bạch chuẩn chỉ", icon: CheckCircle },
  { value: "trending-up", label: "Phát triển bền vững", icon: TrendingUp },
  { value: "briefcase", label: "Chuyên nghiệp", icon: Briefcase },
  { value: "eye", label: "Tầm nhìn xa", icon: Eye },
];

export default function CompanyValuesPage() {
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
      setList(await getAdminCompanyValues() as any[]);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (v: any) => {
    setEditing(v);
    setForm({ title: v.title, description: v.description || "", icon: v.icon || "star", orderNo: v.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) { toast("error", "Vui lòng nhập tiêu đề giá trị cốt lõi"); return; }
    setSaving(true);
    try {
      if (editing) await updateCompanyValue(editing.id, form);
      else         await createCompanyValue(form);
      toast("success", editing ? "Cập nhật thành công" : "Thêm giá trị cốt lõi thành công");
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
      await deleteCompanyValue(delTarget.id);
      toast("success", "Xóa giá trị cốt lõi thành công");
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Giá trị cốt lõi doanh nghiệp</h1>
          <p className="text-xs text-slate-500 mt-0.5">Triết lý hành động và văn hóa dịch vụ của HDT Logistics hiển thị trên website</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Thêm giá trị mới</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200/80">
          Đang tải danh sách giá trị cốt lõi...
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {list.map((v: any) => {
            const matchedIcon = ICON_OPTIONS.find(o => o.value === v.icon);
            const IconComp = matchedIcon ? matchedIcon.icon : Sparkles;
            return (
              <div
                key={v.id}
                className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-5 hover:border-slate-300 transition-all group flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-navy-50 text-navy-700 border border-navy-100 flex items-center justify-center flex-shrink-0 shadow-2xs">
                      <IconComp size={18} />
                    </div>
                    <div className="flex gap-1 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => openEdit(v)}
                        title="Sửa giá trị"
                        aria-label="Sửa giá trị"
                        className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                      >
                        <Pencil size={13} />
                      </button>
                      <button
                        onClick={() => setDelTarget(v)}
                        title="Xóa giá trị"
                        aria-label="Xóa giá trị"
                        className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                      >
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>

                  <h3 className="font-bold text-slate-900 text-xs group-hover:text-navy-700 transition-colors mb-1.5">{v.title}</h3>
                  <p className="text-slate-600 text-xs leading-relaxed line-clamp-3">{v.description}</p>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-400 font-mono">
                  <span>{v.icon}</span>
                  <span className="text-slate-200">·</span>
                  <span>Thứ tự: #{v.orderNo}</span>
                </div>
              </div>
            );
          })}

          {list.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 p-12 text-center bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
                <Sparkles size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-700">Chưa có giá trị cốt lõi nào</p>
              <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Thêm giá trị văn hóa doanh nghiệp như Đúng hẹn, Tận tâm, Minh bạch.</p>
              <button
                onClick={openNew}
                className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
              >
                <Plus size={13} />
                <span>Thêm giá trị đầu tiên</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa giá trị cốt lõi" : "Thêm giá trị cốt lõi mới"} size="md">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tiêu đề giá trị cốt lõi *</label>
            <input
              value={form.title}
              required
              onChange={e => setForm({...form, title: e.target.value})}
              placeholder="VD: Đúng hẹn & Trách nhiệm cao..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Diễn giải ý nghĩa / Mô tả</label>
            <textarea
              value={form.description}
              rows={3}
              onChange={e => setForm({...form, description: e.target.value})}
              placeholder="Cam kết thực hiện nghiêm túc tiến độ thông quan và vận chuyển cho từng lô hàng..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white resize-none focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Biểu tượng Lucide</label>
              <select
                value={form.icon}
                onChange={e => setForm({...form, icon: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              >
                {ICON_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label} ({o.value})</option>)}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Thứ tự hiển thị</label>
              <input
                type="number"
                min={0}
                value={form.orderNo}
                onChange={e => setForm({...form, orderNo: Number(e.target.value)})}
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
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Lưu giá trị"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Xóa giá trị cốt lõi "${delTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
