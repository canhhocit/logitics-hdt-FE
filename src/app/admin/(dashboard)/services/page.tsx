"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Briefcase, Plane, Ship, Boxes, Truck, FileText, Star, Package, Globe, Zap } from "lucide-react";
import { getAdminServices, createService, updateService, deleteService } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = { name: "", slug: "", shortDesc: "", intro: "", icon: "briefcase", color: "blue", orderNo: 0, status: "PUBLISHED", contentBlocks: { advantages: ["", "", "", ""] } };

const ICONS: Record<string, any> = {
  "plane": Plane, "ship": Ship, "boxes": Boxes, "truck": Truck, "file-text": FileText,
  "star": Star, "briefcase": Briefcase, "package": Package, "globe": Globe, "zap": Zap
};
const COLORS = [
  { value: "blue",   label: "Xanh dương",  cls: "bg-blue-100 text-blue-600" },
  { value: "cyan",   label: "Xanh ngọc",   cls: "bg-cyan-100 text-cyan-600" },
  { value: "teal",   label: "Teal",         cls: "bg-teal-100 text-teal-600" },
  { value: "green",  label: "Xanh lá",     cls: "bg-green-100 text-green-600" },
  { value: "orange", label: "Cam",         cls: "bg-orange-100 text-orange-600" },
  { value: "rose",   label: "Hồng",        cls: "bg-rose-100 text-rose-600" },
  { value: "indigo", label: "Chàm",        cls: "bg-indigo-100 text-indigo-600" },
  { value: "violet", label: "Tím",         cls: "bg-violet-100 text-violet-600" },
];

function slugify(s: string) {
  return s.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 120);
}

export default function ServicesPage() {
  const { toast } = useToast();
  const [services,   setServices]   = useState<any[]>([]);
  const [loading,    setLoading]    = useState(true);
  const [modalOpen,  setModalOpen]  = useState(false);
  const [editing,    setEditing]    = useState<any>(null);
  const [form,       setForm]       = useState<any>(EMPTY);
  const [saving,     setSaving]     = useState(false);
  const [delTarget,  setDelTarget]  = useState<any>(null);

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const res = await getAdminServices();
      setServices((res as any).content || res || []);
    } catch (e: any) { toast("error", e.message); }
    finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (s: any) => {
    setEditing(s);
    setForm({ name: s.name, slug: s.slug, shortDesc: s.shortDesc || "", intro: s.intro || "",
      icon: s.icon || "briefcase", color: s.color || "blue", orderNo: s.orderNo || 0, status: s.status || "PUBLISHED",
      contentBlocks: {
        advantages: s.contentBlocks?.advantages?.length ? s.contentBlocks.advantages : ["", "", "", ""]
      }
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) { toast("error", "Vui lòng điền tên và slug"); return; }
    
    // Filter empty advantages
    const payload = { ...form };
    if (payload.contentBlocks?.advantages) {
      payload.contentBlocks.advantages = payload.contentBlocks.advantages.filter((a: string) => a.trim() !== "");
    }

    setSaving(true);
    try {
      if (editing) await updateService(editing.id, payload);
      else         await createService(payload);
      toast("success", editing ? "Cập nhật dịch vụ thành công" : "Tạo dịch vụ thành công");
      setModalOpen(false);
      fetchData();
    } catch (e: any) { toast("error", e.message); }
    finally { setSaving(false); }
  };

  const handleDelete = async () => {
    try {
      await deleteService(delTarget.id);
      toast("success", "Đã ẩn dịch vụ thành công");
      setDelTarget(null);
      fetchData();
    } catch (e: any) { toast("error", e.message); }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">Dịch vụ</h1>
          <p className="text-gray-500 text-sm mt-0.5">{services.length} dịch vụ</p>
        </div>
        <button onClick={openNew}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white
                     text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Plus size={15} /> Thêm dịch vụ
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-10 text-center text-gray-400 text-sm">Đang tải...</div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center"><Briefcase size={36} className="text-gray-200 mx-auto mb-3" /><p className="text-gray-400">Chưa có dịch vụ nào</p></div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 border-b border-gray-100">
                <tr>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">STT</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Dịch vụ</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Slug</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Icon / Màu</th>
                  <th className="text-left px-4 py-3 text-xs font-semibold text-gray-500 uppercase">Trạng thái</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {services.map((s: any) => {
                  const colorObj = COLORS.find((c) => c.value === s.color) || COLORS[0];
                  return (
                    <tr key={s.id} className="hover:bg-gray-50/70 transition-colors">
                      <td className="px-4 py-3 text-gray-400 font-mono text-xs">{String(s.orderNo).padStart(2, "0")}</td>
                      <td className="px-4 py-3">
                        <p className="font-semibold text-gray-800">{s.name}</p>
                        {s.shortDesc && <p className="text-xs text-gray-400 line-clamp-1 mt-0.5">{s.shortDesc}</p>}
                      </td>
                      <td className="px-4 py-3 font-mono text-xs text-gray-400">{s.slug}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2.5">
                          <span className={`w-7 h-7 flex items-center justify-center rounded-full shadow-sm ${colorObj.cls}`}>
                            {(() => {
                              const IconComp = s.icon && ICONS[s.icon] ? ICONS[s.icon] : Briefcase;
                              return <IconComp size={14} />;
                            })()}
                          </span>
                          <span className={`w-3.5 h-3.5 rounded-full border border-gray-200 ${colorObj.cls.split(" ")[0]}`} title={colorObj.label} />
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold
                          ${s.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"}`}>
                          {s.status === "PUBLISHED" ? "Hiện" : s.status === "INACTIVE" ? "Đã ẩn" : "Nháp"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1 justify-end">
                          <button onClick={() => openEdit(s)} className="p-1.5 rounded-lg text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 transition-colors"><Pencil size={14} /></button>
                          <button onClick={() => setDelTarget(s)} className="p-1.5 rounded-lg text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      <Modal open={modalOpen} onClose={() => setModalOpen(false)}
        title={editing ? "Sửa dịch vụ" : "Thêm dịch vụ mới"} size="lg">
        <div className="space-y-4">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Tên dịch vụ *</label>
              <input value={form.name} required
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Slug *</label>
              <input value={form.slug} required onChange={(e) => setForm({ ...form, slug: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm font-mono focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Icon (Lucide name)</label>
              <div className="flex gap-2">
                <div className="w-10 flex-shrink-0 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl text-gray-500">
                  {(() => {
                    const IconComp = ICONS[form.icon] || Briefcase;
                    return <IconComp size={18} />;
                  })()}
                </div>
                <select value={form.icon} onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                  {Object.keys(ICONS).map((ic) => <option key={ic} value={ic}>{ic}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Màu sắc</label>
              <div className="flex gap-2">
                <div className="w-10 flex-shrink-0 flex items-center justify-center bg-gray-50 border border-gray-200 rounded-xl">
                  {(() => {
                    const c = COLORS.find(x => x.value === form.color) || COLORS[0];
                    return <span className={`w-4 h-4 rounded-full border border-gray-200 ${c.cls.split(" ")[0]}`} />;
                  })()}
                </div>
                <select value={form.color} onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="flex-1 border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                  {COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Thứ tự hiển thị</label>
              <input type="number" min={0} value={form.orderNo} onChange={(e) => setForm({ ...form, orderNo: Number(e.target.value) })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400" />
            </div>
            <div>
              <label className="block text-xs font-semibold text-gray-600 mb-1.5">Trạng thái</label>
              <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400">
                <option value="PUBLISHED">Xuất bản</option>
                <option value="DRAFT">Nháp</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Mô tả ngắn (hiển thị trên card dịch vụ)</label>
            <textarea value={form.shortDesc} rows={2} onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
              placeholder="Mô tả 1-2 dòng hiển thị trên trang danh sách dịch vụ..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400" />
          </div>
          <div className="bg-gray-50/50 p-4 rounded-xl border border-gray-100">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-semibold text-gray-700 uppercase tracking-wide">Điểm nổi bật (Các ô vuông nhỏ)</label>
              <button type="button" onClick={() => setForm({ ...form, contentBlocks: { ...form.contentBlocks, advantages: [...(form.contentBlocks?.advantages || []), ""] } })}
                className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold bg-white px-2 py-1 rounded border shadow-sm">
                + Thêm ô
              </button>
            </div>
            <div className="space-y-2.5">
              {(form.contentBlocks?.advantages || []).map((adv: string, idx: number) => (
                <div key={idx} className="flex gap-2">
                  <input value={adv} onChange={(e) => {
                    const newAdv = [...(form.contentBlocks?.advantages || [])];
                    newAdv[idx] = e.target.value;
                    setForm({ ...form, contentBlocks: { ...form.contentBlocks, advantages: newAdv } });
                  }}
                  placeholder={`Điểm nổi bật ${idx + 1}...`}
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 bg-white" />
                  <button type="button" onClick={() => {
                    const newAdv = form.contentBlocks.advantages.filter((_: any, i: number) => i !== idx);
                    setForm({ ...form, contentBlocks: { ...form.contentBlocks, advantages: newAdv } });
                  }} className="text-gray-400 hover:text-red-500 bg-white border border-gray-200 rounded-lg px-2.5 flex-shrink-0 transition-colors">
                    <Trash2 size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-gray-600 mb-1.5">Giới thiệu chi tiết</label>
            <textarea value={form.intro} rows={4} onChange={(e) => setForm({ ...form, intro: e.target.value })}
              placeholder="Nội dung giới thiệu đầy đủ về dịch vụ..."
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400" />
          </div>
          <div className="flex gap-3 justify-end pt-2 border-t border-gray-100">
            <button onClick={() => setModalOpen(false)} className="px-4 py-2 text-sm font-medium text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors">Hủy</button>
            <button onClick={handleSave} disabled={saving}
              className="px-5 py-2 text-sm font-semibold bg-indigo-600 text-white rounded-xl hover:bg-indigo-500 disabled:opacity-60 transition-colors">
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Tạo dịch vụ"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog open={!!delTarget} message={`Ẩn dịch vụ "${delTarget?.name}"? Dịch vụ sẽ không hiển thị trên website.`}
        onConfirm={handleDelete} onCancel={() => setDelTarget(null)} />
    </div>
  );
}
