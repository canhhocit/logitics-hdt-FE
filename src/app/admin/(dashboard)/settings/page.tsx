"use client";

import { useEffect, useState } from "react";
import { Save, Settings } from "lucide-react";
import { getAdminSettings, upsertSettings, uploadMedia } from "../../_lib/api";
import { useToast } from "../../_components/Toast";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") || "http://localhost:8080";
function resolveFileUrl(url?: string) {
  if (!url) return "";
  if (url.startsWith("/uploads")) return `${BACKEND_URL}${url}`;
  return url;
}

const GROUPS = [
  {
    label: "Thông tin công ty",
    keys: [
      { key: "company_full_name", label: "Tên đầy đủ công ty", type: "text" },
      { key: "company_short_name", label: "Tên viết tắt", type: "text" },
      { key: "tax_code", label: "Mã số thuế", type: "text" },
      { key: "license_date", label: "Ngày cấp phép", type: "text" },
      { key: "license_org", label: "Cơ quan cấp phép", type: "text" },
    ],
  },
  {
    label: "Liên hệ",
    keys: [
      {
        key: "hotline",
        label: "Hotline hiển thị",
        type: "text",
        placeholder: "0983 116 063",
      },
      {
        key: "hotline_raw",
        label: "Hotline raw (tel: link)",
        type: "text",
        placeholder: "0983116063",
      },
      { key: "hotline_contact", label: "Số liên hệ phụ", type: "text" },
      { key: "hotline_contact_raw", label: "Số liên hệ phụ raw", type: "text" },
      { key: "email", label: "Email chính", type: "email" },
      { key: "email_sales", label: "Email kinh doanh", type: "email" },
      {
        key: "working_hours",
        label: "Giờ làm việc",
        type: "text",
        placeholder: "06:00 – 22:00",
      },
    ],
  },
  {
    label: "Mạng xã hội",
    keys: [
      { key: "facebook_url", label: "Facebook URL", type: "url" },
      { key: "instagram_url", label: "Instagram URL", type: "url" },
      { key: "twitter_url", label: "Twitter URL", type: "url" },
      { key: "zalo_url", label: "Zalo URL", type: "url" },
    ],
  },
  {
    label: "Thống kê (hiển thị trên website)",
    keys: [
      {
        key: "counter_staff",
        label: "Số nhân sự",
        type: "text",
        placeholder: "20",
      },
      {
        key: "counter_offices",
        label: "Số văn phòng",
        type: "text",
        placeholder: "5",
      },
      {
        key: "counter_shipments",
        label: "Số chuyến hàng",
        type: "text",
        placeholder: "1500+",
      },
      {
        key: "counter_experience",
        label: "Số năm kinh nghiệm",
        type: "text",
        placeholder: "10+",
      },
    ],
  },
  {
    label: "Nội dung Hero (Trang chủ)",
    keys: [
      { key: "hero_title", label: "Hero title", type: "text" },
      { key: "hero_subtitle", label: "Hero subtitle", type: "textarea" },
    ],
  },
  {
    label: "Nội dung CTA",
    keys: [
      { key: "cta_title", label: "CTA title", type: "text" },
      { key: "cta_subtitle", label: "CTA subtitle", type: "textarea" },
    ],
  },
  {
    label: "Tầm nhìn & Sứ mệnh (Trang Về chúng tôi)",
    keys: [
      { key: "about_vision", label: "Tầm nhìn", type: "textarea" },
      { key: "about_mission", label: "Sứ mệnh", type: "textarea" },
      { key: "about_tagline", label: "Tagline", type: "text" },
    ],
  },
  {
    label: "Tài liệu công ty (PDF/File)",
    keys: [
      { key: "file_ho_so_cong_ty", label: "Hồ sơ công ty", type: "file" },
      { key: "file_co_cau_to_chuc", label: "Cơ cấu tổ chức", type: "file" },
      { key: "file_ho_so_nang_luc", label: "Hồ sơ năng lực", type: "file" },
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
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      await upsertSettings(values);
      setInitialValues(values);
      toast("success", "Lưu cài đặt thành công");
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
  console.log("hasChanges:", changedKeys.length > 0, "changedKeys:", changedKeys);
  const hasChanges = changedKeys.length > 0;

  if (loading)
    return <div className="p-10 text-center text-gray-400">Đang tải...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-extrabold text-gray-800">
            Cài đặt website
          </h1>
          <p className="text-gray-500 text-sm mt-0.5">
            Mọi thay đổi được phản ánh ngay lên website
          </p>
        </div>
        {/* <button onClick={handleSave} disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60
                     text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm">
          <Save size={15} /> {saving ? "Đang lưu..." : "Lưu tất cả"}
        </button> */}
      </div>

      <div className="space-y-6">
        {GROUPS.map((group) => (
          <div
            key={group.label}
            className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden"
          >
            <div className="px-6 py-4 border-b border-gray-100 flex items-center gap-2">
              <Settings size={15} className="text-indigo-500" />
              <h2 className="font-bold text-gray-700 text-sm">{group.label}</h2>
            </div>
            <div className="px-6 py-5 grid sm:grid-cols-2 gap-4">
              {group.keys.map(({ key, label, type, placeholder }) => (
                <div
                  key={key}
                  className={type === "textarea" ? "sm:col-span-2" : ""}
                >
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">
                    {label}
                    <span className="ml-1.5 font-mono text-gray-300 text-[10px]">
                      {key}
                    </span>
                  </label>
                  {type === "textarea" ? (
                    <textarea
                      rows={3}
                      value={values[key] || ""}
                      onChange={(e) => set(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm resize-none focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
                    />
                  ) : type === "file" ? (
                    <div>
                      <input
                        type="file"
                        onChange={async (e) => {
                          if (!e.target.files?.length) return;
                          try {
                            const res = await uploadMedia(e.target.files[0]);
                            set(key, res.url);
                            toast("success", "Tải file lên thành công!");
                          } catch (err: any) {
                            toast("error", err.message);
                          }
                        }}
                        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
                      />
                      {values[key] && (
                        <p className="text-xs mt-2 text-green-600 font-medium">
                          File hiện tại:{" "}
                          <a
                            href={resolveFileUrl(values[key])}
                            target="_blank"
                            rel="noreferrer"
                            className="underline"
                          >
                            {values[key]}
                          </a>
                        </p>
                      )}
                    </div>
                  ) : (
                    <input
                      type={type || "text"}
                      value={values[key] || ""}
                      onChange={(e) => set(key, e.target.value)}
                      placeholder={placeholder}
                      className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm focus:outline-none focus:border-indigo-400 focus:ring-1 focus:ring-indigo-200"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Sticky save footer */}
      <div className={`fixed bottom-0 left-0 right-0 lg:left-64 z-40 bg-white/90 backdrop-blur border-t border-gray-100 p-4 flex justify-end transition-all duration-300 ease-in-out ${
        hasChanges ? "translate-y-0 opacity-100 shadow-[0_-4px_20px_rgba(0,0,0,0.05)]" : "translate-y-full opacity-0 pointer-events-none"
      }`}>
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-60
                     text-white text-[13px] font-semibold px-4 py-2.5 rounded-xl transition-colors shadow-sm"
        >
          <Save size={14} /> {saving ? "Đang lưu..." : "Lưu thay đổi"}
        </button>
      </div>
    </div>
  );
}
