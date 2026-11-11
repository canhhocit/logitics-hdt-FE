// ─────────────────────────────────────────────
//  Admin API helper
//  Mọi request admin đều đi qua đây để tự động
//  gắn Authorization header từ localStorage.
// ─────────────────────────────────────────────

export const ADMIN_API =
  process.env.NEXT_PUBLIC_API_URL?.replace(/\/api\/v1\/?$/, "") ||
  "http://localhost:8080";

const BASE = `${ADMIN_API}/api/v1`;

function getToken(): string {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("accessToken") || "";
}

function headers(extra?: Record<string, string>): Record<string, string> {
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getToken()}`,
    ...extra,
  };
}

async function request<T>(
  method: string,
  path: string,
  body?: unknown
): Promise<T> {
  const token = getToken();
  const url = `${BASE}${path}`;

  const res = await fetch(url, {
    method,
    headers: headers(),
    body: body !== undefined ? JSON.stringify(body) : undefined,
  });

  if (res.status === 401) {
    console.warn("[Admin API] 401 Unauthorized — redirecting to login");
    localStorage.removeItem("accessToken");
    window.location.href = "/admin/login";
    throw new Error("Phiên đăng nhập hết hạn");
  }

  const json = await res.json();
  if (!res.ok) {
    console.error(`[Admin API] ${method} ${url} → ${res.status}:`, json);
    throw new Error(json.message || `HTTP ${res.status}`);
  }
  return json.data as T;
}

// ── Helpers ──────────────────────────────────
export const api = {
  get:    <T>(path: string)                 => request<T>("GET",    path),
  post:   <T>(path: string, body: unknown)  => request<T>("POST",   path, body),
  put:    <T>(path: string, body: unknown)  => request<T>("PUT",    path, body),
  patch:  <T>(path: string, body: unknown)  => request<T>("PATCH",  path, body),
  delete: <T>(path: string)                 => request<T>("DELETE", path),
};

// ── Auth ─────────────────────────────────────
export async function login(username: string, password: string) {
  const res = await fetch(`${BASE}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  const json = await res.json();
  if (!res.ok || !json.success) throw new Error(json.message || "Đăng nhập thất bại");
  return json.data as { accessToken: string; user: { username: string; fullName: string } };
}

// ── Dashboard ─────────────────────────────────
export const getStats = () => api.get<any>("/admin/dashboard/stats");

// ── Services ─────────────────────────────────
export const getAdminServices = (page = 0, size = 20) =>
  api.get<any>(`/admin/services?page=${page}&size=${size}&sort=orderNo,asc`);
export const createService    = (body: any) => api.post<any>("/admin/services", body);
export const updateService    = (id: string, body: any) => api.put<any>(`/admin/services/${id}`, body);
export const deleteService    = (id: string) => api.delete<any>(`/admin/services/${id}`);

// ── Posts ─────────────────────────────────────
export const getAdminPosts    = (page = 0, size = 20, keyword = "", fromDate = "", toDate = "", sortBy = "createdAt", sortDir = "desc", categoryId = "") => {
  const p = new URLSearchParams({ page: String(page), size: String(size), sort: `${sortBy},${sortDir}` });
  if (keyword) p.set("keyword", keyword);
  if (categoryId) p.set("categoryId", categoryId);
  if (fromDate) p.set("fromDate", fromDate + "T00:00:00");
  if (toDate) p.set("toDate", toDate + "T23:59:59");
  return api.get<any>(`/admin/posts?${p.toString()}`);
};
export const createPost       = (body: any) => api.post<any>("/admin/posts", body);
export const updatePost       = (id: string, body: any) => api.put<any>(`/admin/posts/${id}`, body);
export const deletePost       = (id: string) => api.delete<any>(`/admin/posts/${id}`);
export const getCategories    = () => api.get<any[]>("/admin/categories");

// ── Leads ─────────────────────────────────────
export const getAdminLeads    = (page = 0, size = 20, status = "") =>
  api.get<any>(`/admin/leads?page=${page}&size=${size}&sort=createdAt,desc${status ? `&status=${status}` : ""}`);
export const updateLeadStatus = (id: string, status: string) =>
  api.patch<any>(`/admin/leads/${id}/status`, { status });

// ── Offices ───────────────────────────────────
export const getAdminOffices  = (page = 0, size = 20) =>
  api.get<any>(`/admin/offices?page=${page}&size=${size}`);
export const createOffice     = (body: any) => api.post<any>("/admin/offices", body);
export const updateOffice     = (id: string, body: any) => api.put<any>(`/admin/offices/${id}`, body);
export const deleteOffice     = (id: string) => api.delete<any>(`/admin/offices/${id}`);

// ── Contacts ──────────────────────────────────
export const getAdminContacts = (page = 0, size = 20) =>
  api.get<any>(`/admin/contacts?page=${page}&size=${size}`);
export const createContact    = (body: any) => api.post<any>("/admin/contacts", body);
export const updateContact    = (id: string, body: any) => api.put<any>(`/admin/contacts/${id}`, body);
export const deleteContact    = (id: string) => api.delete<any>(`/admin/contacts/${id}`);

// ── Jobs ──────────────────────────────────────
export const getAdminJobs     = (page = 0, size = 20) =>
  api.get<any>(`/admin/jobs?page=${page}&size=${size}`);
export const createJob        = (body: any) => api.post<any>("/admin/jobs", body);
export const updateJob        = (id: string, body: any) => api.put<any>(`/admin/jobs/${id}`, body);
export const deleteJob        = (id: string) => api.delete<any>(`/admin/jobs/${id}`);

// ── Settings ──────────────────────────────────
export const getAdminSettings = () => api.get<any[]>("/admin/settings");
export const upsertSettings   = (body: Record<string, string>) => api.patch<any[]>("/admin/settings", body);

// ── Testimonials ──────────────────────────────
export const getAdminTestimonials  = () => api.get<any[]>("/admin/testimonials");
export const createTestimonial     = (body: any) => api.post<any>("/admin/testimonials", body);
export const updateTestimonial     = (id: string, body: any) => api.put<any>(`/admin/testimonials/${id}`, body);
export const deleteTestimonial     = (id: string) => api.delete<any>(`/admin/testimonials/${id}`);

// ── Partners ──────────────────────────────────
export const getAdminPartners      = () => api.get<any[]>("/admin/partners");
export const createPartner         = (body: any) => api.post<any>("/admin/partners", body);
export const updatePartner         = (id: string, body: any) => api.put<any>(`/admin/partners/${id}`, body);
export const deletePartner         = (id: string) => api.delete<any>(`/admin/partners/${id}`);

// ── Awards ────────────────────────────────────
export const getAdminAwards        = () => api.get<any[]>("/admin/awards");
export const createAward           = (body: any) => api.post<any>("/admin/awards", body);
export const updateAward           = (id: string, body: any) => api.put<any>(`/admin/awards/${id}`, body);
export const deleteAward           = (id: string) => api.delete<any>(`/admin/awards/${id}`);

// ── Company Values ────────────────────────────
export const getAdminCompanyValues = () => api.get<any[]>("/admin/company-values");
export const createCompanyValue    = (body: any) => api.post<any>("/admin/company-values", body);
export const updateCompanyValue    = (id: string, body: any) => api.put<any>(`/admin/company-values/${id}`, body);
export const deleteCompanyValue    = (id: string) => api.delete<any>(`/admin/company-values/${id}`);

// ── Categories ────────────────────────────────
export const getAdminCategories    = () => api.get<any[]>("/admin/categories");
export const createCategory        = (body: any) => api.post<any>("/admin/categories", body);
export const updateCategory        = (id: string, body: any) => api.put<any>(`/admin/categories/${id}`, body);
export const deleteCategory        = (id: string) => api.delete<any>(`/admin/categories/${id}`);

// ── Media (Upload) ────────────────────────────
export async function uploadMedia(file: File) {
  const token = getToken();
  const url = `${BASE}/admin/media/upload`;
  const formData = new FormData();
  formData.append("file", file);

  // Không set Content-Type, trình duyệt sẽ tự động tạo boundary cho multipart/form-data
  const res = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (res.status === 401) {
    console.warn("[Admin API] 401 Unauthorized — redirecting to login");
    localStorage.removeItem("accessToken");
    window.location.href = "/admin/login";
    throw new Error("Phiên đăng nhập hết hạn");
  }

  const json = await res.json();
  if (!res.ok) {
    console.error(`[Admin API] POST ${url} → ${res.status}:`, json);
    throw new Error(json.message || `Upload thất bại HTTP ${res.status}`);
  }
  return json.data; // Trả về MediaResponse (url, id, fileName...)
}
