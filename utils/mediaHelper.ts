import { getApiBaseUrl } from "@/api/client";

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
