"use client";

import { useEffect, useState, useCallback } from "react";
import { Plus, Pencil, Trash2, Briefcase, Plane, Ship, Boxes, Truck, FileText, Star, Package, Globe, Zap } from "lucide-react";
import { getAdminServices, createService, updateService, deleteService } from "../../_lib/api";
import Modal from "../../_components/Modal";
import ConfirmDialog from "../../_components/ConfirmDialog";
import { useToast } from "../../_components/Toast";

const EMPTY = {
  name: "",
  slug: "",
  shortDesc: "",
  intro: "",
  icon: "briefcase",
  color: "blue",
  orderNo: 0,
  status: "PUBLISHED",
  contentBlocks: {
    advantages: [{title: "", desc: ""}, {title: "", desc: ""}, {title: "", desc: ""}, {title: "", desc: ""}]
  }
};

const ICONS: Record<string, any> = {
  "plane": Plane, "ship": Ship, "boxes": Boxes, "truck": Truck, "file-text": FileText,
  "star": Star, "briefcase": Briefcase, "package": Package, "globe": Globe, "zap": Zap
};
const ICON_LABELS: Record<string, string> = {
  "plane": "Máy bay", "ship": "Tàu biển", "boxes": "Hàng hóa", "truck": "Xe tải", "file-text": "Tài liệu",
  "star": "Ngôi sao", "briefcase": "Cặp xách", "package": "Kiện hàng", "globe": "Toàn cầu", "zap": "Tốc độ"
};
const COLORS = [
  { value: "blue",   label: "Xanh dương",  cls: "bg-blue-50 text-blue-700 border border-blue-200",     dotCls: "bg-blue-600" },
  { value: "cyan",   label: "Xanh ngọc",   cls: "bg-cyan-50 text-cyan-700 border border-cyan-200",     dotCls: "bg-cyan-600" },
  { value: "teal",   label: "Teal",        cls: "bg-teal-50 text-teal-700 border border-teal-200",     dotCls: "bg-teal-600" },
  { value: "green",  label: "Xanh lá",     cls: "bg-emerald-50 text-emerald-700 border border-emerald-200", dotCls: "bg-emerald-600" },
  { value: "orange", label: "Cam",         cls: "bg-orange-50 text-orange-700 border border-orange-200", dotCls: "bg-orange-600" },
  { value: "rose",   label: "Hồng",        cls: "bg-rose-50 text-rose-700 border border-rose-200",     dotCls: "bg-rose-600" },
  { value: "indigo", label: "Chàm",        cls: "bg-slate-100 text-slate-800 border border-slate-300",  dotCls: "bg-slate-700" },
  { value: "violet", label: "Tím",         cls: "bg-purple-50 text-purple-700 border border-purple-200", dotCls: "bg-purple-600" },
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
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => { fetchData(); }, [fetchData]);

  const openNew = () => { setEditing(null); setForm(EMPTY); setModalOpen(true); };
  const openEdit = (s: any) => {
    setEditing(s);
    setForm({
      name: s.name,
      slug: s.slug,
      shortDesc: s.shortDesc || "",
      intro: s.intro || "",
      icon: s.icon || "briefcase",
      color: s.color || "blue",
      orderNo: s.orderNo || 0,
      status: s.status || "PUBLISHED",
      contentBlocks: {
        advantages: s.contentBlocks?.advantages?.length 
          ? s.contentBlocks.advantages.map((a: any) => typeof a === "string" ? { title: a, desc: "" } : { title: a?.title || "", desc: a?.desc || "" }) 
          : [{title: "", desc: ""}, {title: "", desc: ""}, {title: "", desc: ""}, {title: "", desc: ""}]
      }
    });
    setModalOpen(true);
  };

  const handleSave = async () => {
    if (!form.name || !form.slug) { toast("error", "Vui lòng nhập tên dịch vụ và slug"); return; }
    
    const payload = { ...form };
    if (payload.contentBlocks?.advantages) {
      payload.contentBlocks.advantages = payload.contentBlocks.advantages.filter(
        (a: any) => (a.title && a.title.trim() !== "") || (a.desc && a.desc.trim() !== "")
      );
    }

    setSaving(true);
    try {
      if (editing) await updateService(editing.id, payload);
      else         await createService(payload);
      toast("success", editing ? "Cập nhật dịch vụ thành công" : "Tạo dịch vụ thành công");
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
      await deleteService(delTarget.id);
      toast("success", "Đã ẩn dịch vụ thành công");
      setDelTarget(null);
      fetchData();
    } catch (e: any) {
      toast("error", e.message);
    }
  };

  return (
    <div className="space-y-3.5">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <h1 className="text-lg sm:text-xl font-bold text-slate-900 tracking-tight">Dịch vụ logistics</h1>
          <p className="text-xs text-slate-500 mt-0.5">Quản lý danh mục giải pháp vận tải, cước quốc tế và thủ tục hải quan</p>
        </div>
        <button
          onClick={openNew}
          className="inline-flex items-center gap-1.5 bg-navy-600 hover:bg-navy-700 text-white
                     text-xs font-semibold px-3 py-1.5 rounded-md shadow-2xs transition-all active:scale-[0.99] self-start sm:self-auto cursor-pointer"
        >
          <Plus size={14} />
          <span>Thêm dịch vụ mới</span>
        </button>
      </div>

      {/* Table Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-2xs overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-slate-400 text-xs">Đang tải danh sách dịch vụ...</div>
        ) : services.length === 0 ? (
          <div className="p-12 text-center">
            <div className="w-10 h-10 rounded-full bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-2.5">
              <Briefcase size={20} />
            </div>
            <p className="text-xs font-semibold text-slate-700">Chưa có dịch vụ nào</p>
            <p className="text-[11px] text-slate-400 mt-0.5 mb-4">Nhấn nút bên dưới để tạo dịch vụ vận chuyển đầu tiên.</p>
            <button
              onClick={openNew}
              className="bg-navy-600 text-white text-xs font-semibold px-3.5 py-2 rounded-lg hover:bg-navy-700 transition-colors inline-flex items-center gap-1.5"
            >
              <Plus size={13} />
              <span>Tạo dịch vụ</span>
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead className="bg-slate-50/80 border-b border-slate-200/80 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                <tr>
                  <th className="px-4 py-3 whitespace-nowrap">Thứ tự</th>
                  <th className="px-4 py-3">Tên dịch vụ</th>
                  <th className="px-4 py-3">Đường dẫn (Slug)</th>
                  <th className="px-4 py-3">Biểu tượng & Màu</th>
                  <th className="px-4 py-3">Trạng thái</th>
                  <th className="px-4 py-3 text-right">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs">
                {services.map((s: any) => {
                  const colorObj = COLORS.find((c) => c.value === s.color) || COLORS[0];
                  return (
                    <tr key={s.id} className="hover:bg-slate-50/60 transition-colors group">
                      <td className="px-4 py-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                        {String(s.orderNo ?? 0).padStart(2, "0")}
                      </td>
                      <td className="px-4 py-3 max-w-[280px]">
                        <p className="font-semibold text-slate-900 group-hover:text-navy-700 transition-colors">{s.name}</p>
                        {s.shortDesc && <p className="text-[11px] text-slate-400 line-clamp-1 mt-0.5">{s.shortDesc}</p>}
                      </td>
                      <td className="px-4 py-3 font-mono text-[11px] text-slate-400 max-w-[160px] truncate">{s.slug}</td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center gap-2">
                          <span className={`w-7 h-7 flex items-center justify-center rounded-lg shadow-2xs ${colorObj.cls}`}>
                            {(() => {
                              const IconComp = s.icon && ICONS[s.icon] ? ICONS[s.icon] : Briefcase;
                              return <IconComp size={13} />;
                            })()}
                          </span>
                          <span className={`w-2.5 h-2.5 rounded-full ${colorObj.dotCls}`} title={colorObj.label} />
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        {s.status === "PUBLISHED" ? (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-emerald-50 text-emerald-700 border border-emerald-200/70">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                            Hiển thị
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200">
                            <span className="w-1.5 h-1.5 rounded-full bg-slate-400" />
                            Đã ẩn
                          </span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-right whitespace-nowrap">
                        <div className="flex items-center gap-1 justify-end">
                          <button
                            onClick={() => openEdit(s)}
                            title="Chỉnh sửa dịch vụ"
                            aria-label="Sửa dịch vụ"
                            className="p-1.5 rounded-md text-slate-400 hover:text-navy-700 hover:bg-slate-100 transition-colors"
                          >
                            <Pencil size={13} />
                          </button>
                          <button
                            onClick={() => setDelTarget(s)}
                            title="Ẩn dịch vụ"
                            aria-label="Ẩn dịch vụ"
                            className="p-1.5 rounded-md text-slate-400 hover:text-red-600 hover:bg-red-50 transition-colors"
                          >
                            <Trash2 size={13} />
                          </button>
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

      {/* Service Editor Modal */}
      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? "Sửa dịch vụ logistics" : "Thêm dịch vụ logistics mới"} size="lg">
        <div className="space-y-4 text-xs">
          <div className="grid sm:grid-cols-2 gap-3.5">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tên dịch vụ *</label>
              <input
                value={form.name}
                required
                onChange={(e) => setForm({ ...form, name: e.target.value, slug: editing ? form.slug : slugify(e.target.value) })}
                placeholder="Vận tải đường biển quốc tế..."
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Slug *</label>
              <input
                value={form.slug}
                required
                onChange={(e) => setForm({ ...form, slug: e.target.value })}
                placeholder="van-tai-duong-bien"
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs font-mono text-slate-800 bg-white focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Biểu tượng</label>
              <div className="flex gap-2">
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg text-slate-600">
                  {(() => {
                    const IconComp = ICONS[form.icon] || Briefcase;
                    return <IconComp size={16} />;
                  })()}
                </div>
                <select
                  value={form.icon}
                  onChange={(e) => setForm({ ...form, icon: e.target.value })}
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
                >
                  {Object.keys(ICONS).map((ic) => <option key={ic} value={ic}>{ICON_LABELS[ic]} ({ic})</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Tông màu hiển thị</label>
              <div className="flex gap-2">
                <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-slate-50 border border-slate-200 rounded-lg">
                  {(() => {
                    const c = COLORS.find(x => x.value === form.color) || COLORS[0];
                    return <span className={`w-3.5 h-3.5 rounded-full ${c.dotCls}`} />;
                  })()}
                </div>
                <select
                  value={form.color}
                  onChange={(e) => setForm({ ...form, color: e.target.value })}
                  className="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
                >
                  {COLORS.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Thứ tự ưu tiên hiển thị</label>
              <input
                type="number"
                min={0}
                value={form.orderNo}
                onChange={(e) => setForm({ ...form, orderNo: Number(e.target.value) })}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1.5">Trạng thái</label>
              <select
                value={form.status}
                onChange={(e) => setForm({ ...form, status: e.target.value })}
                className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white focus:outline-none focus:border-navy-600"
              >
                <option value="PUBLISHED">Xuất bản công khai</option>
                <option value="DRAFT">Lưu nháp / Tạm ẩn</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Mô tả ngắn (hiển thị trên thẻ dịch vụ trang chủ)</label>
            <textarea
              value={form.shortDesc}
              rows={2}
              onChange={(e) => setForm({ ...form, shortDesc: e.target.value })}
              placeholder="Tóm tắt 1-2 câu về giải pháp vận tải..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white resize-none focus:outline-none focus:border-navy-600"
            />
          </div>

          {/* Advantages / Feature Blocks */}
          <div className="bg-slate-50/70 p-3.5 rounded-lg border border-slate-200/80">
            <div className="flex items-center justify-between mb-2.5">
              <label className="block text-[11px] font-semibold text-slate-700 uppercase tracking-wide">Lợi thế & Điểm nổi bật</label>
              <button
                type="button"
                onClick={() => setForm({ ...form, contentBlocks: { ...form.contentBlocks, advantages: [...(form.contentBlocks?.advantages || []), {title: "", desc: ""}] } })}
                className="text-[11px] text-navy-700 hover:text-navy-900 font-semibold bg-white px-2 py-0.5 rounded border border-slate-200 shadow-2xs"
              >
                + Thêm mục
              </button>
            </div>
            <div className="space-y-2">
              {(form.contentBlocks?.advantages || []).map((adv: any, idx: number) => (
                <div key={idx} className="flex gap-2 items-start bg-white p-2.5 rounded-lg border border-slate-200/80 shadow-2xs">
                  <div className="flex-1 space-y-1.5">
                    <input
                      value={adv.title || ""}
                      onChange={(e) => {
                        const newAdv = [...(form.contentBlocks?.advantages || [])];
                        newAdv[idx] = { ...adv, title: e.target.value };
                        setForm({ ...form, contentBlocks: { ...form.contentBlocks, advantages: newAdv } });
                      }}
                      placeholder={`Tiêu đề lợi thế ${idx + 1}...`}
                      className="w-full border border-slate-200 rounded-md px-2.5 py-1.5 text-xs font-medium text-slate-800 bg-slate-50/50 focus:bg-white focus:outline-none focus:border-navy-600"
                    />
                    <textarea
                      value={adv.desc || ""}
                      rows={1}
                      onChange={(e) => {
                        const newAdv = [...(form.contentBlocks?.advantages || [])];
                        newAdv[idx] = { ...adv, desc: e.target.value };
                        setForm({ ...form, contentBlocks: { ...form.contentBlocks, advantages: newAdv } });
                      }}
                      placeholder="Mô tả cụ thể..."
                      className="w-full border border-slate-200 rounded-md px-2.5 py-1 text-xs text-slate-700 bg-white resize-none focus:outline-none focus:border-navy-600"
                    />
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      const newAdv = form.contentBlocks.advantages.filter((_: any, i: number) => i !== idx);
                      setForm({ ...form, contentBlocks: { ...form.contentBlocks, advantages: newAdv } });
                    }}
                    aria-label="Xóa mục lợi thế"
                    className="text-slate-400 hover:text-red-500 p-1.5 rounded hover:bg-red-50 transition-colors"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1.5">Nội dung giới thiệu chi tiết</label>
            <textarea
              value={form.intro}
              rows={4}
              onChange={(e) => setForm({ ...form, intro: e.target.value })}
              placeholder="Giới thiệu đầy đủ năng lực cung ứng của dịch vụ..."
              className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white resize-none focus:outline-none focus:border-navy-600"
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
              {saving ? "Đang lưu..." : editing ? "Lưu thay đổi" : "Tạo dịch vụ"}
            </button>
          </div>
        </div>
      </Modal>

      <ConfirmDialog
        open={Boolean(delTarget)}
        message={`Ẩn dịch vụ "${delTarget?.name}"? Dịch vụ sẽ không còn hiển thị công khai trên website.`}
        onConfirm={handleDelete}
        onCancel={() => setDelTarget(null)}
      />
    </div>
  );
}
