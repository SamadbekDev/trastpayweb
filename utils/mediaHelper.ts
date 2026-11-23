import { getApiBaseUrl } from "@/api/client";
import { figmaForStub } from "@/utils/figmaAssets";

/**
 * Resolve media path / id / absolute URL for <Image> and CSS backgrounds.
 * Bare ids are served via dashboard-api `GET /api/media/:id`.
 */
export const getMediaUrl = (
  pathOrId?: string,
  fallback: string = "https://placehold.co/600x400/e8eef5/0c3366?text=Image"
): string => {
  if (!pathOrId || pathOrId.trim() === "") {
    return fallback;
  }

  const cleanPath = pathOrId.trim();

  // CMS seed stubs (placehold.co / Unsplash) → artwork from the Figma «Ultimate Design» page
  const figma = figmaForStub(cleanPath);
  if (figma) return figma;

  // CMS media saved with the API's local origin (http://localhost:4000/api/media/…): serve it through
  // this site's /api proxy, so it also loads on other devices (a phone on the LAN, a deployed site).
  const proxied = viaSiteApi(cleanPath);
  if (proxied !== cleanPath) return proxied;

  if (
    cleanPath.startsWith("http://") ||
    cleanPath.startsWith("https://") ||
    cleanPath.startsWith("data:") ||
    cleanPath.startsWith("blob:")
  ) {
    return cleanPath;
  }

  if (cleanPath.startsWith("/")) {
    return cleanPath;
  }

  const base = getApiBaseUrl();
  return `${base}/media/${encodeURIComponent(cleanPath)}`;
};

/**
 * CMS media saved with the API's local origin (http://localhost:4000/api/media/…) → this site's
 * /api proxy (next.config rewrites), so it also loads on other devices: a phone on the LAN, a deployed site.
 */
export function viaSiteApi(url: string): string {
  const local = url.match(/^https?:\/\/(?:localhost|127\.0\.0\.1)(?::\d+)?(\/api\/.*)$/);
  return local ? local[1] : url;
}
