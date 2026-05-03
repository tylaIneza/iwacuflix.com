import axios from 'axios';

const BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const api = axios.create({ baseURL: BASE });

// ── Public ──────────────────────────────────────────────
export const fetchContent = (params?: Record<string, string>) =>
  api.get('/api/content', { params }).then((r) => r.data);

export const fetchContentById = (id: string) =>
  api.get(`/api/content/${id}`).then((r) => r.data);

// ── Auth ─────────────────────────────────────────────────
export const login = (email: string, password: string) =>
  api.post('/api/auth/login', { email, password }).then((r) => r.data);

export const verifyToken = (token: string) =>
  api.get('/api/auth/verify', { headers: { Authorization: `Bearer ${token}` } }).then((r) => r.data);

// ── Admin helpers ─────────────────────────────────────────
function adminApi(token: string) {
  return axios.create({ baseURL: BASE, headers: { Authorization: `Bearer ${token}` } });
}

export const adminFetchStats = (token: string) =>
  adminApi(token).get('/api/admin/stats').then((r) => r.data);

export const adminFetchContent = (token: string, params?: Record<string, string>) =>
  adminApi(token).get('/api/admin/content', { params }).then((r) => r.data);

export const adminCreateContent = (token: string, data: object) =>
  adminApi(token).post('/api/admin/content', data).then((r) => r.data);

export const adminUpdateContent = (token: string, id: string, data: object) =>
  adminApi(token).put(`/api/admin/content/${id}`, data).then((r) => r.data);

export const adminTogglePublish = (token: string, id: string) =>
  adminApi(token).put(`/api/admin/content/${id}/publish`).then((r) => r.data);

export const adminDeleteContent = (token: string, id: string) =>
  adminApi(token).delete(`/api/admin/content/${id}`).then((r) => r.data);

export const adminUploadThumbnail = (token: string, file: File) => {
  const form = new FormData();
  form.append('thumbnail', file);
  return adminApi(token)
    .post('/api/admin/upload', form, { headers: { 'Content-Type': 'multipart/form-data' } })
    .then((r) => r.data);
};
