/**
 * Browser: `/api` (Next rewrites → dashboard-api).
 * Server: BACKEND_API_URL at runtime (e.g. http://dashboard-api:4000/api).
 * Do not rely on NEXT_PUBLIC_API_URL for server fetches — it is inlined at build.
 */
export function getApiBaseUrl(): string {
  if (typeof window === "undefined") {
    const server =
      process.env.BACKEND_API_URL?.replace(/\/$/, "") ||
      "http://localhost:4000/api";
    return server;
  }
  return (process.env.NEXT_PUBLIC_API_URL || "/api").replace(/\/$/, "");
}

/**
 * Shared fetch for published content.
 * `cache: "no-store"` is intentional — pair with `export const dynamic = "force-dynamic"`
 * on any Server Component page that calls this (avoids app-static-to-dynamic-error).
 */
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
