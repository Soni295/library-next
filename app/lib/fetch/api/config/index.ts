const headers = { 'Content-Type': 'application/json' };
const API_URL_BASE = 'http://localhost:3000/api' as const;

export const ENDPOINTS = {
  CATEGORY: `${API_URL_BASE}/category`,
  PRODUCT: `${API_URL_BASE}/products`,
} as const;
