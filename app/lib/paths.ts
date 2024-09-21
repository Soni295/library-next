const API_URL_BASE = 'http://localhost:3000/api' as const;
const DASHBOARD_BASE = '/dashboard' as const;

export const CLIENT_PATH = {
  HOME: '/',
  OFFER: '/oferta',
  LOGIN: '/login',
  SIGN_IN: '/signIn',
  SEARCH: '/search',
  PRODUCT: '/product',
  CART: '/cart',
} as const;

export const DASHBOARD_PATH = {
  HOME: `${DASHBOARD_BASE}`,
  PRODUCT: `${DASHBOARD_BASE}/product`,
  PRODUCTS_CREATE: `${DASHBOARD_BASE}/product/create`,
  PURCHASE_CREATE: `${DASHBOARD_BASE}/purchase/create`,
  MARK_CREATE: `${DASHBOARD_BASE}/mark/create`,
  TAGS_CREATE: `${DASHBOARD_BASE}/tag/create`,
  USERS: `${DASHBOARD_BASE}/user`,
  TAGS: `${DASHBOARD_BASE}/tag`,
  MARK: `${DASHBOARD_BASE}/mark`,
  CONFIG: `${DASHBOARD_BASE}/settings`,
  PURCHASE: `${DASHBOARD_BASE}/purchase`,
} as const;

export const SERVER_PATH = {
  CATEGORY: `${API_URL_BASE}/category`,
  PRODUCT: `${API_URL_BASE}/product`,
  SEARCH_CLIENT: `${API_URL_BASE}/search`,
  MARK: `${API_URL_BASE}/mark`,
  MARKAll: `${API_URL_BASE}/mark/all`,
} as const;

export const PATH = {
  CLIENT: CLIENT_PATH,
  DASHBOARD: DASHBOARD_PATH,
  SERVER: SERVER_PATH,
} as const;
