"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Globe, ExternalLink } from "lucide-react";
import { getAdminPartners, createPartner, updatePartner, deletePartner } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { type: "CARRIER", name: "", logo: "", url: "", orderNo: 0 };

const TYPE_COLOR: Record<string, string> = {
  CARRIER:     "bg-blue-50 text-blue-700 border-blue-200/60",
  ASSOCIATION: "bg-purple-50 text-purple-700 border-purple-200/60",
};

export default function PartnersPage() {
  const { toast } = useToast();
  const [list,      setList]      = useState<any[]>([]);
  const [loading,   setLoading]   = useState(true);
  const [tab,       setTab]       = useState<"ALL"|"CARRIER"|"ASSOCIATION">("ALL");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing,   setEditing]   = useState<any>(null);
  const [form,      setForm]      = useState<any>(EMPTY);
  const [saving,    setSaving]    = useState(false);
  const [delTarget, setDelTarget] = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      setList(await getAdminPartners() as any[]);
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const displayed = tab === "ALL" ? list : list.filter(p => p.type === tab);

  const openNew  = () => { setEditing(null); setForm({ ...EMPTY, type: tab === "ALL" ? "CARRIER" : tab }); setModalOpen(true); };
  const openEdit = (p: any) => {
    setEditing(p);
    setForm({ type: p.type, name: p.name, logo: p.logo, url: p.url || "", orderNo: p.orderNo || 0 });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.logo) { toast("error", "Vui lòng nhập tên đối tác và đường dẫn logo"); return; }
    setSaving(true);
    try {
      if (editing) await updatePartner(editing.id, form);
      else         await createPartner(form);
      toast("success", editing ? "Cập nhật đối tác thành công" : "Thêm đối tác thành công");
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
      await deletePartner(delTarget.id);
      toast("success", "Xóa đối tác thành công");
      setDelTarget(null);
      fetchData();
    } catch (e: any) {
      toast("error", e.message);
    }
  };

  const carriers = list.filter(p => p.type === "CARRIER").length;
  const assocs   = list.filter(p => p.type === "ASSOCIATION").length;

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Đối tác & Hiệp hội Logistics</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Tổng cộng: <span className="font-semibold text-slate-700">{carriers}</span> hãng vận chuyển · <span className="font-semibold text-slate-700">{assocs}</span> hiệp hội xuất nhập khẩu
          </p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3.5 py-2 rounded-lg shadow-sm transition-all active:scale-[0.99] self-start sm:self-auto"
        >
          <Plus size={14} />
          <span>Thêm đối tác</span>
        </button>
      </div>

      {/* Segmented Filter Bar */}
      <div className="bg-slate-100 p-1 rounded-lg border border-slate-200/80 inline-flex gap-1">
        {(["ALL","CARRIER","ASSOCIATION"] as const).map(t => {
          const active = tab === t;
          return (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-3 py-1.5 rounded-md text-xs transition-all
                ${active
                  ? "bg-white text-slate-900 font-semibold shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-white/60 font-medium"}`}
            >
              {t === "ALL" ? "Tất cả đối tác" : t === "CARRIER" ? "Hãng tàu & Hàng không" : "Hiệp hội ngành"}
            </button>
          );
        })}
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Đang tải danh sách đối tác...</div>
        ) : displayed.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
              <Globe size={20} />
            </div>
            <p className="text-xs font-semibold text-slate-700">Chưa có đối tác nào trong mục này</p>
            <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Thêm logo hãng vận chuyển hoặc hiệp hội để hiển thị dải logo đối tác trên trang chủ.</p>
            <button
              onClick={openNew}
              className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus size={13} />
              <span>Thêm đối tác đầu tiên</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3">Tên đối tác</th>
                  <th className="px-4 py-3">Phân loại</th>
                  <th className="px-4 py-3">Đường dẫn Logo</th>
                  <th className="px-4 py-3">Trang web liên kết</th>
                  <th className="px-4 py-3">Thứ tự</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {displayed.map((p: any) => (
                  <tr key={p.id} className="hover:bg-slate-50/60 transition-colors group">
                    <td className="px-4 py-3 font-semibold text-slate-900 group-hover:text-navy-700 transition-colors">{p.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded-full text-[10px] font-medium border ${TYPE_COLOR[p.type] || "bg-slate-100 text-slate-600 border-slate-200"}`}>
                        {p.type === "CARRIER" ? "Hãng vận chuyển" : "Hiệp hội"}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono text-[11px] text-slate-400 max-w-[180px] truncate" title={p.logo}>
                      {p.logo}
                    </td>
                    <td className="px-4 py-3 text-[11px] text-slate-400 max-w-[140px] truncate">
                      {p.url ? (
                        <a href={p.url} target="_blank" rel="noreferrer" className="text-navy-700 hover:underline inline-flex items-center gap-1">
                          <span>{p.url}</span>
                          <ExternalLink size={10} />
                        </a>
                      ) : "—"}
                    </td>
                    <td className="px-4 py-3 text-slate-400 font-mono text-[11px]">{p.orderNo}</td>
                    <td className="px-4 py-3 text-right whitespace-nowrap">
                      <div className="flex items-center gap-1 justify-end">
                        <button
                          onClick={() => openEdit(p)}
                          title="Sửa đối tác"
                          aria-label="Sửa đối tác"
                          className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                        >
                          <Pencil size={13} />
                        </button>
                        <button
                          onClick={() => setDelTarget(p)}
                          title="Xóa đối tác"
                          aria-label="Xóa đối tác"
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
        )}
      </div>

      {/* Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa thông tin đối tác" : "Thêm đối tác mới"} size="md">
        <div className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Phân loại đối tác</label>
              <select
                value={form.type}
                onChange={e => setForm({...form, type: e.target.value})}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              >
                <option value="CARRIER">Hãng vận chuyển (Tàu / Bay)</option>
                <option value="ASSOCIATION">Hiệp hội logistics & Thương mại</option>
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
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên đối tác / Tổ chức *</label>
              <input
                value={form.name}
                required
                onChange={e => setForm({...form, name: e.target.value})}
                placeholder="VD: Yang Ming Line, FIATA, VLA..."
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Đường dẫn tệp Logo SVG/PNG *</label>
              <input
                value={form.logo}
                required
                onChange={e => setForm({...form, logo: e.target.value})}
                placeholder="/images/partners/yang-ming.svg"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Trang web liên kết (URL)</label>
              <input
                type="url"
                value={form.url}
                onChange={e => setForm({...form, url: e.target.value})}
                placeholder="https://www.yangming.com"
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
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Thêm đối tác"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Xóa đối tác "${delTarget?.name}"?`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
