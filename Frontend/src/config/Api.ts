// All API calls go through this single helper.
// Backend runs on :8000 in dev; in prod set VITE_API_URL env var.
const API_BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:8000";

export function logout(): void {
  localStorage.removeItem("access");
  localStorage.removeItem("refresh");
  localStorage.removeItem("username");
  window.location.href = "/login";
}

export type HttpMethod = "GET" | "POST" | "DELETE" | "PUT" | "PATCH";

export async function API<T = unknown>(
  method: HttpMethod,
  path: string,
  data?: unknown
): Promise<T> {
  let access = localStorage.getItem("access");

  const makeRequest = (token: string | null) =>
    fetch(API_BASE_URL + path, {
      method,
      headers: {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: data !== undefined ? JSON.stringify(data) : undefined,
    });

  let res = await makeRequest(access);

  // Token expired — try refresh
  if (res.status === 401) {
    const refresh = localStorage.getItem("refresh");
    if (!refresh) {
      logout();
      throw new Error("Unauthorized");
    }

    const refreshRes = await fetch(`${API_BASE_URL}/auth/token/refresh/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh }),
    });

    if (!refreshRes.ok) {
      logout();
      throw new Error("Session expired");
    }

    const refreshData = await refreshRes.json();
    localStorage.setItem("access", refreshData.access);
    localStorage.setItem("refresh", refreshData.refresh);
    access = refreshData.access;

    // Retry original request with new token
    res = await makeRequest(access);
  }

  if (!res.ok) {
    let detail = `Request failed: ${res.status}`;
    try {
      const err = await res.json();
      detail = err.detail ?? detail;
    } catch {
      // ignore JSON parse error
    }
    throw new Error(detail);
  }

  // 204 No Content
  if (res.status === 204) return undefined as T;

  return res.json() as Promise<T>;
}
