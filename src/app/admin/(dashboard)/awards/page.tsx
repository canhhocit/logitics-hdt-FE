"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Award, ShieldCheck, Users, Handshake, Star, Trophy, Medal } from "lucide-react";
import { getAdminAwards, createAward, updateAward, deleteAward } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { title: "", year: "", icon: "award", orderNo: 0 };
const ICON_OPTIONS = ["award", "shield-check", "users", "handshake", "star", "trophy", "medal"];

export default function AwardsPage() {
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
      setList(await getAdminAwards() as any[]);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew  = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (a: any) => {
    setEditing(a);
    setForm({ title: a.title, year: a.year || "", icon: a.icon || "award", orderNo: a.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.title) { toast("error", "Vui lòng nhập tên giải thưởng hoặc chứng chỉ"); return; }
    setSaving(true);
    try {
      if (editing) await updateAward(editing.id, form);
      else         await createAward(form);
      toast("success", editing ? "Cập nhật giải thưởng thành công" : "Thêm giải thưởng thành công");
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
      await deleteAward(delTarget.id);
      toast("success", "Xóa giải thưởng thành công");
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
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Giải thưởng & Chứng chỉ năng lực</h1>
          <p className="text-xs text-slate-500 mt-0.5">Các danh hiệu uy tín và chứng nhận ngành logistics hiển thị trên website</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Thêm giải thưởng</span>
        </button>
      </div>

      {loading ? (
        <div className="p-12 text-center text-slate-400 text-xs bg-white rounded-xl border border-slate-200/80">
          Đang tải danh sách giải thưởng...
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {list.map((a: any) => (
            <div
              key={a.id}
              className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] p-5 text-center hover:border-slate-300 transition-all group flex flex-col justify-between"
            >
              <div>
                <div className="w-12 h-12 bg-amber-50 text-amber-600 border border-amber-200/80 rounded-xl flex items-center justify-center mx-auto mb-3 shadow-2xs">
                  <Award size={22} />
                </div>
                <h3 className="font-semibold text-slate-900 text-xs leading-snug group-hover:text-navy-700 transition-colors mb-1">{a.title}</h3>
                {a.year && (
                  <span className="inline-block bg-slate-100 text-slate-600 border border-slate-200/60 px-2 py-0.5 rounded text-[10px] font-mono font-medium">
                    Năm {a.year}
                  </span>
                )}
              </div>

              <div className="flex gap-2 justify-center mt-4 pt-3 border-t border-slate-100">
                <button
                  onClick={() => openEdit(a)}
                  className="px-3 py-1 text-xs font-medium text-slate-700 bg-white border border-slate-200 rounded-md hover:bg-slate-50 transition-colors"
                >
                  Sửa
                </button>
                <button
                  onClick={() => setDelTarget(a)}
                  className="px-3 py-1 text-xs font-medium text-red-600 bg-white border border-slate-200 rounded-md hover:bg-red-50 hover:border-red-200 transition-colors"
                >
                  Xóa
                </button>
              </div>
            </div>
          ))}

          {list.length === 0 && (
            <div className="sm:col-span-2 lg:col-span-3 xl:col-span-4 p-12 text-center bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)]">
              <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
                <Award size={20} />
              </div>
              <p className="text-xs font-semibold text-slate-700">Chưa có giải thưởng nào</p>
              <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Thêm chứng nhận FIATA, VLA, ISO hoặc bằng khen của HDT.</p>
              <button
                onClick={openNew}
                className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
              >
                <Plus size={13} />
                <span>Thêm giải thưởng đầu tiên</span>
              </button>
            </div>
          )}
        </div>
      )}

      {/* Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa giải thưởng / Chứng nhận" : "Thêm giải thưởng mới"} size="sm">
        <div className="space-y-4 text-xs">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên giải thưởng / Chứng chỉ *</label>
            <input
              value={form.title}
              required
              onChange={e => setForm({ ...form, title: e.target.value })}
              placeholder="VD: Top 10 Doanh nghiệp Logistics Uy tín..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Năm đạt giải / Cấp chứng chỉ</label>
            <input
              value={form.year}
              onChange={e => setForm({ ...form, year: e.target.value })}
              placeholder="VD: 2024"
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-navy-600"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Biểu tượng Lucide</label>
            <select
              value={form.icon}
              onChange={e => setForm({ ...form, icon: e.target.value })}
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
            >
              {ICON_OPTIONS.map(ic => <option key={ic} value={ic}>{ic}</option>)}
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Thứ tự hiển thị</label>
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
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Thêm giải thưởng"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Xóa giải thưởng "${delTarget?.title}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
