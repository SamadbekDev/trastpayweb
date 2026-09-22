/**
 * Browser-facing API base (proxied via next.config rewrites).
 * Server-side can also use BACKEND_API_URL directly.
 */
export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    return (
      process.env.BACKEND_API_URL?.replace(/\/$/, "") ||
      process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "") ||
      "http://localhost:4000/api"
    );
  }
  return (process.env.NEXT_PUBLIC_API_URL || "/api").replace(/\/$/, "");
}

export async function apiFetch(
  path: string,
  init?: RequestInit
): Promise<Response> {
  const base = getApiBaseUrl();
  const url = path.startsWith("http")
    ? path
    : `${base}${path.startsWith("/") ? path : `/${path}`}`;

  return fetch(url, {
    ...init,
    headers: {
      Accept: "application/json",
      ...(init?.headers || {}),
    },
    cache: "no-store",
  });
}
