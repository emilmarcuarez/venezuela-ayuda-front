import { reactive } from 'vue';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000/api/v1';
const SESSION_TTL_MS = 24 * 60 * 60 * 1000;
const STORAGE_KEY = 'venezuela-ayuda:auth';

export const authState = reactive({
  token: null,
  user: null,
  expiresAt: null,
  isReady: false,
});

const normalizeUser = (user) => ({
  ...user,
  fullName: [user?.firstName, user?.lastName].filter(Boolean).join(' '),
  location: [user?.city, user?.state, user?.country].filter(Boolean).join(', '),
  phone: user?.phone || 'No registrado',
  bio: user?.bio || '',
});

const persistSession = ({ accessToken, user, expiresIn }) => {
  const ttl = Number(expiresIn) > 0 ? Number(expiresIn) * 1000 : SESSION_TTL_MS;
  const session = {
    token: accessToken,
    user: normalizeUser(user),
    expiresAt: Date.now() + Math.min(ttl, SESSION_TTL_MS),
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(session));
  authState.token = session.token;
  authState.user = session.user;
  authState.expiresAt = session.expiresAt;

  return session;
};

const clearSession = () => {
  localStorage.removeItem(STORAGE_KEY);
  authState.token = null;
  authState.user = null;
  authState.expiresAt = null;
};

export const request = async (path, options = {}) => {
  const headers = new Headers(options.headers || {});
  headers.set('Accept', 'application/json');

  if (options.body && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json');
  }

  if (authState.token) {
    headers.set('Authorization', `Bearer ${authState.token}`);
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...options,
    headers,
  });

  const text = await response.text();
  const data = text ? JSON.parse(text) : null;

  if (!response.ok) {
    const message = Array.isArray(data?.message)
      ? data.message.join(' ')
      : data?.message || 'No se pudo completar la solicitud.';
    throw new Error(message);
  }

  return data;
};

export const initAuth = () => {
  if (authState.isReady) {
    return;
  }

  try {
    const storedSession = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');

    if (storedSession?.token && storedSession?.expiresAt > Date.now()) {
      authState.token = storedSession.token;
      authState.user = storedSession.user ? normalizeUser(storedSession.user) : null;
      authState.expiresAt = storedSession.expiresAt;
    } else {
      clearSession();
    }
  } catch {
    clearSession();
  } finally {
    authState.isReady = true;
  }
};

export const isAuthenticated = () => {
  initAuth();
  return Boolean(authState.token && authState.expiresAt > Date.now());
};

export const login = async (credentials) => {
  const session = await request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(credentials),
  });

  persistSession(session);
  return authState.user;
};

export const register = async (payload) => {
  const session = await request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(payload),
  });

  persistSession(session);
  return authState.user;
};

export const loadCurrentUser = async () => {
  if (!isAuthenticated()) {
    return null;
  }

  const user = normalizeUser(await request('/auth/me'));
  authState.user = user;

  const storedSession = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  if (storedSession?.token) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...storedSession, user }));
  }

  return user;
};

export const updateProfile = async (payload) => {
  if (!isAuthenticated()) {
    throw new Error('No autorizado');
  }

  const updatedUser = await request('/users/me', {
    method: 'PATCH',
    body: JSON.stringify(payload),
  });

  const normalizedUser = normalizeUser(updatedUser);
  authState.user = normalizedUser;

  const storedSession = JSON.parse(localStorage.getItem(STORAGE_KEY) || 'null');
  if (storedSession?.token) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ ...storedSession, user: normalizedUser }));
  }

  return normalizedUser;
};

export const logout = () => {
  clearSession();
};
