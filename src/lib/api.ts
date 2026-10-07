// ─────────────────────────────────────────────────────────────
//  API helper — mọi data FE đều lấy từ backend, không hardcode
// ─────────────────────────────────────────────────────────────

export const API_URL =
  typeof window === 'undefined'
    // Server-side (SSR/SSG): ưu tiên INTERNAL_API_URL (Docker network) → fallback http://backend:8080
    ? process.env.INTERNAL_API_URL || 'http://backend:8080/api/v1'
    // Client-side (browser): dùng public URL
    : process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api/v1';

// ── Helpers ──────────────────────────────────────────────────

async function get<T>(path: string, fallback: T): Promise<T> {
  try {
    const res = await fetch(`${API_URL}${path}`, { cache: 'no-store' });
    if (!res.ok) return fallback;
    const json = await res.json();
    return json.data ?? fallback;
  } catch {
    return fallback;
  }
}

// ── Services ─────────────────────────────────────────────────

export async function fetchServices() {
  return get('/public/services', []);
}

export async function fetchServiceBySlug(slug: string) {
  return get(`/public/services/${slug}`, null);
}

// ── Menu ─────────────────────────────────────────────────────

export async function fetchMenu(position: string) {
  return get(`/public/menus?position=${position}`, []);
}

// ── Site Settings ─────────────────────────────────────────────

export async function fetchSettings(): Promise<Record<string, string>> {
  return get('/public/settings', {});
}

// ── Posts ─────────────────────────────────────────────────────

/** Lấy N bài gần nhất (dùng cho homepage NewsSection) */
export async function fetchPosts(size: number = 6) {
  return get(`/public/posts?size=${size}`, []);
}

/** Lấy danh sách phân trang (dùng cho news/page.tsx) */
export async function fetchPostsPaged(params?: {
  page?: number;
  size?: number;
  categorySlug?: string;
}) {
  const p = new URLSearchParams();
  if (params?.page    !== undefined) p.set('page', String(params.page));
  if (params?.size    !== undefined) p.set('size', String(params.size));
  if (params?.categorySlug)          p.set('categorySlug', params.categorySlug);
  const query = p.toString();
  return get(`/public/posts${query ? `?${query}` : ''}`, { content: [], totalPages: 1, totalElements: 0, page: 0, size: 10 });
}

export async function fetchPostBySlug(slug: string) {
  return get(`/public/posts/${slug}`, null);
}

// ── Categories ───────────────────────────────────────────────

export async function fetchCategories() {
  return get('/public/categories', []);
}

// ── Partners & Testimonials ───────────────────────────────────

export async function fetchPartners(type?: string) {
  const url = type ? `/public/partners?type=${type}` : '/public/partners';
  return get(url, []);
}

export async function fetchTestimonials() {
  return get('/public/testimonials', []);
}

// ── Offices ───────────────────────────────────────────────────

export async function fetchOffices(region?: string) {
  const url = region ? `/public/offices?region=${region}` : '/public/offices';
  return get(url, []);
}

// ── Contact Persons ───────────────────────────────────────────

export async function fetchContacts() {
  return get('/public/contacts', []);
}

// ── Job Postings ──────────────────────────────────────────────

export async function fetchJobs() {
  return get('/public/jobs', []);
}

// ── Site Awards ───────────────────────────────────────────────

export async function fetchAwards() {
  return get('/public/awards', []);
}

// ── Company Values ────────────────────────────────────────────

export async function fetchCompanyValues() {
  return get('/public/company-values', []);
}

// ── Lead (form tư vấn) ────────────────────────────────────────

export interface LeadRequest {
  fullName: string;
  phone: string;
  email?: string;
  company?: string;
  message?: string;
  sourcePage?: string;
}

export async function submitLead(data: LeadRequest): Promise<{ ok: boolean; message?: string }> {
  try {
    const res = await fetch(`${API_URL}/public/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, source: 'WEBSITE' }),
    });
    const json = await res.json();
    if (!res.ok) return { ok: false, message: json.message || 'Gửi thất bại' };
    return { ok: true, message: json.message };
  } catch {
    return { ok: false, message: 'Lỗi kết nối, vui lòng thử lại' };
  }
}
