// Central API service — all backend calls live here.
// The Vite proxy forwards /api/* requests to http://localhost:5000

const API_BASE = '/api';

/**
 * Helper: parse response or throw with server error message
 */
async function handleResponse(res) {
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Something went wrong');
  }
  return data;
}

/**
 * Login an existing user.
 * @returns {Promise<{_id, name, email, token}>}
 */
export async function loginUser(email, password) {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  return handleResponse(res);
}

/**
 * Register a new user.
 * @returns {Promise<{_id, name, email, token}>}
 */
export async function registerUser({ name, email, password, role, facility }) {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name, email, password, role, facility }),
  });
  return handleResponse(res);
}

/**
 * Send a prompt to the AI Assistant (requires auth token).
 * @returns {Promise<{reply: string}>}
 */
export async function sendAIMessage(prompt, token) {
  const res = await fetch(`${API_BASE}/ai/chat`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({ prompt }),
  });
  return handleResponse(res);
}
