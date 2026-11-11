"use client";

import { useEffect, useState } from "react";
import { Save, Settings, CheckCircle2, FileText, Globe, Phone, Info } from "lucide-react";
import { getAdminSettings, upsertSettings, uploadMedia } from "../../_lib/api";
import { useToast } from "../../_components/Toast";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") || "http://localhost:8080";
function resolveFileUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("/uploads")) return `${BACKEND_URL}${url}`;
  return url;
}

interface SettingKeyDef {
  key: string;
  label: string;
  type: string;
  placeholder?: string;
}

interface SettingGroupDef {
  label: string;
  icon: any;
  keys: SettingKeyDef[];
}

const GROUPS: SettingGroupDef[] = [
  {
    label: "Thông tin pháp nhân & Doanh nghiệp",
    icon: Info,
    keys: [
      { key: "company_full_name", label: "Tên đầy đủ công ty", type: "text", placeholder: "CÔNG TY CỔ PHẦN HDT LOGISTICS" },
      { key: "company_short_name", label: "Tên viết tắt (viết tắt pháp lý)", type: "text", placeholder: "HDT LOGISTICS., JSC" },
      { key: "company_int_name", label: "Tên quốc tế (tiếng Anh)", type: "text", placeholder: "HDT LOGISTICS JOINT STOCK COMPANY" },
      { key: "tax_code", label: "Mã số thuế doanh nghiệp", type: "text", placeholder: "0111638260" },
      { key: "representative", label: "Người đại diện pháp luật", type: "text", placeholder: "TRẦN VĂN TOẢN" },
      { key: "company_address", label: "Địa chỉ trụ sở / Địa chỉ thuế", type: "text", placeholder: "Số 46/9/11 đường An Thọ, Xã An Khánh, TP Hà Nội, Việt Nam" },
      { key: "license_date", label: "Ngày cấp phép", type: "text", placeholder: "08/04/2024" },
      { key: "license_org", label: "Cơ quan cấp phép", type: "text", placeholder: "Sở Kế hoạch và Đầu tư TP Hà Nội" },
    ],
  },
  {
    label: "Thông tin liên hệ & Đường dây nóng",
    icon: Phone,
    keys: [
      {
        key: "hotline",
        label: "Hotline hiển thị",
        type: "text",
        placeholder: "0911 188 726",
      },
      {
        key: "hotline_raw",
        label: "Hotline raw (tel: link)",
        type: "text",
        placeholder: "0911188726",
      },
      { key: "hotline_contact", label: "Số điện thoại phụ", type: "text", placeholder: "0983 116 063" },
      { key: "hotline_contact_raw", label: "Số phụ raw (tel: link)", type: "text", placeholder: "0983116063" },
      { key: "email", label: "Hòm thư chính", type: "email", placeholder: "hdt.logistics.jsc@gmail.com" },
      { key: "email_sales", label: "Hòm thư phòng kinh doanh", type: "email", placeholder: "hdt.logistics.jsc@gmail.com" },
      {
        key: "working_hours",
        label: "Thời gian làm việc",
        type: "text",
        placeholder: "08:00 – 17:30 (Thứ 2 - Thứ 7)",
      },
    ],
  },
  {
    label: "Kênh mạng xã hội & Truyền thông",
    icon: Globe,
    keys: [
      { key: "facebook_url", label: "Facebook Page URL", type: "url" },
      { key: "instagram_url", label: "Instagram URL", type: "url" },
      { key: "twitter_url", label: "X / Twitter URL", type: "url" },
      { key: "zalo_url", label: "Zalo Official Account URL", type: "url" },
    ],
  },
  {
    label: "Chỉ số năng lực (Hiển thị trang chủ)",
    icon: CheckCircle2,
    keys: [
      {
        key: "counter_staff",
        label: "Nhân sự chuyên môn",
        type: "text",
        placeholder: "50+",
      },
      {
        key: "counter_offices",
        label: "Văn phòng & Kho bãi",
        type: "text",
        placeholder: "5",
      },
      {
        key: "counter_shipments",
        label: "Chuyến hàng thành công",
        type: "text",
        placeholder: "15,000+",
      },
      {
        key: "counter_experience",
        label: "Năm kinh nghiệm thực tế",
        type: "text",
        placeholder: "10+",
      },
    ],
  },
  {
    label: "Nội dung Banner Hero (Trang chủ)",
    icon: FileText,
    keys: [
      { key: "hero_title", label: "Tiêu đề Hero", type: "text" },
      { key: "hero_subtitle", label: "Phụ đề mô tả Hero", type: "textarea" },
    ],
  },
  {
    label: "Thông điệp kêu gọi hành động (CTA Section)",
    icon: FileText,
    keys: [
      { key: "cta_title", label: "Tiêu đề CTA", type: "text" },
      { key: "cta_subtitle", label: "Phụ đề CTA", type: "textarea" },
    ],
  },
  {
    label: "Tầm nhìn & Sứ mệnh (Trang Về chúng tôi)",
    icon: FileText,
    keys: [
      { key: "about_vision", label: "Tầm nhìn chiến lược", type: "textarea" },
      { key: "about_mission", label: "Sứ mệnh cốt lõi", type: "textarea" },
      { key: "about_tagline", label: "Khẩu hiệu (Tagline)", type: "text" },
    ],
  },
  {
    label: "Tài liệu hồ sơ năng lực tải về (PDF)",
    icon: FileText,
    keys: [
      { key: "file_ho_so_cong_ty", label: "Hồ sơ công ty (Company Profile)", type: "file" },
      { key: "file_co_cau_to_chuc", label: "Sơ đồ cơ cấu tổ chức", type: "file" },
      { key: "file_ho_so_nang_luc", label: "Hồ sơ năng lực vận tải", type: "file" },
    ],
  },
];

export default function SettingsPage() {
  const { toast } = useToast();
  const [initialValues, setInitialValues] = useState<Record<string, string>>({});
  const [values, setValues] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    getAdminSettings()
      .then((list: any[]) => {
        const map: Record<string, string> = {};
        list.forEach((s: any) => {
          map[s.key] = s.value || "";
        });
        setValues(map);
        setInitialValues(map);
      })
      .catch((e: any) => toast("error", e.message))
      .finally(() => setLoading(false));
  }, [toast]);

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertSettings(values);
      setInitialValues(values);
      toast("success", "Lưu thông tin cài đặt thành công!");
    } catch (e: any) {
      toast("error", e.message);
    } finally {
      setSaving(false);
    }
  };

  const set = (key: string, val: string) =>
    setValues((p) => ({ ...p, [key]: val }));

  const changedKeys = Object.keys({ ...initialValues, ...values }).filter(
    (key) => (values[key] || "") !== (initialValues[key] || "")
  );
  const hasChanges = changedKeys.length > 0;

  if (loading) {
    return <div className="p-12 text-center text-slate-400 text-xs">Đang tải thông số cài đặt website...</div>;
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-2 border-b border-slate-200/80">
        <div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">Cài đặt website & Doanh nghiệp</h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Cấu hình hotline, thông tin liên hệ, mạng xã hội và nội dung các khối trang chủ
          </p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving || !hasChanges}
          className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-lg text-xs font-semibold shadow-sm transition-all self-start sm:self-auto
            ${hasChanges
              ? "bg-navy-600 hover:bg-navy-700 text-white cursor-pointer active:scale-[0.99]"
              : "bg-slate-100 text-slate-400 border border-slate-200 cursor-not-allowed shadow-none"}`}
        >
          <Save size={13} />
          <span>{saving ? "Đang lưu..." : "Lưu tất cả"}</span>
        </button>
      </div>

      {/* Settings Group Cards */}
      <div className="space-y-5">
        {GROUPS.map((group) => {
          const GroupIcon = group.icon || Settings;
          return (
            <div
              key={group.label}
              className="bg-white rounded-xl border border-slate-200/80 shadow-[0_1px_3px_0_rgba(0,0,0,0.04)] overflow-hidden"
            >
              <div className="px-5 py-3.5 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50">
                <GroupIcon size={14} className="text-navy-700" />
                <h2 className="font-semibold text-slate-800 text-xs tracking-tight">{group.label}</h2>
              </div>
              <div className="px-5 py-4 grid sm:grid-cols-2 gap-3.5 text-xs">
                {group.keys.map(({ key, label, type, placeholder }) => (
                  <div key={key} className={type === "textarea" ? "sm:col-span-2" : ""}>
                    <div className="flex items-center justify-between mb-1.5">
                      <label className="font-semibold text-slate-700 text-xs" htmlFor={`field-${key}`}>
                        {label}
                      </label>
                      <span className="font-mono text-slate-300 text-[10px] select-none">
                        {key}
                      </span>
                    </div>

                    {type === "textarea" ? (
                      <textarea
                        id={`field-${key}`}
                        rows={3}
                        value={values[key] || ""}
                        onChange={(e) => set(key, e.target.value)}
                        placeholder={placeholder}
                        className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white resize-none
                                   focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200 placeholder:text-slate-400 transition-colors"
                      />
                    ) : type === "file" ? (
                      <div>
                        <input
                          id={`field-${key}`}
                          type="file"
                          onChange={async (e) => {
                            if (!e.target.files?.length) return;
                            try {
                              const res = await uploadMedia(e.target.files[0]);
                              set(key, res.url);
                              toast("success", "Tải tệp tin lên thành công!");
                            } catch (err: any) {
                              toast("error", err.message);
                            }
                          }}
                          className="block w-full text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-slate-100 file:text-slate-700 hover:file:bg-slate-200 cursor-pointer"
                        />
                        {values[key] && (
                          <p className="text-[11px] mt-1.5 text-emerald-700 font-medium">
                            Tệp tin hiện tại:{" "}
                            <a
                              href={resolveFileUrl(values[key])}
                              target="_blank"
                              rel="noreferrer"
                              className="underline font-mono"
                            >
                              {values[key]}
                            </a>
                          </p>
                        )}
                      </div>
                    ) : (
                      <input
                        id={`field-${key}`}
                        type={type || "text"}
                        value={values[key] || ""}
                        onChange={(e) => set(key, e.target.value)}
                        placeholder={placeholder}
                        className="w-full border border-slate-200 rounded-lg px-3.5 py-2 text-xs text-slate-800 bg-white
                                   focus:outline-none focus:border-navy-600 focus:ring-1 focus:ring-navy-200 placeholder:text-slate-400 transition-colors"
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Floating Save Action Bar (Shown only when changes exist) */}
      <div
        className={`fixed bottom-4 left-4 right-4 lg:left-72 z-40 bg-slate-900/90 text-white backdrop-blur-md border border-slate-700/80 px-4 py-3 rounded-xl flex items-center justify-between gap-4 transition-all duration-200 shadow-xl ${
          hasChanges ? "translate-y-0 opacity-100" : "translate-y-16 opacity-0 pointer-events-none"
        }`}
      >
        <div className="flex items-center gap-2 text-xs">
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
          <span className="font-medium text-slate-200">
            Có <strong className="text-white">{changedKeys.length}</strong> thay đổi chưa được lưu
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setValues(initialValues)}
            disabled={saving}
            className="text-xs text-slate-300 hover:text-white px-3 py-1.5 rounded-lg border border-slate-700 hover:bg-slate-800 transition-colors"
          >
            Khôi phục
          </button>
          <button
            onClick={handleSave}
            disabled={saving}
            className="inline-flex items-center gap-1.5 bg-navy-500 hover:bg-navy-600 text-white text-xs font-semibold px-4 py-1.5 rounded-lg shadow-sm transition-all"
          >
            <Save size={13} />
            <span>{saving ? "Đang lưu..." : "Lưu thay đổi"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
