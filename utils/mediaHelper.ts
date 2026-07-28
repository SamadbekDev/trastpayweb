
export const getMediaUrl = (pathOrId?: string, fallback: string = '/images/hero_bank_account.svg'): string => {
  if (!pathOrId || pathOrId.trim() === '') {
    return fallback;
  }

  const cleanPath = pathOrId.trim();

  if (
    cleanPath.startsWith('http://') ||
    cleanPath.startsWith('https://') ||
    cleanPath.startsWith('/')
  ) {
    return cleanPath;
  }

  const apiBaseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000/api';
  const cleanApiBase = apiBaseUrl.endsWith('/') ? apiBaseUrl.slice(0, -1) : apiBaseUrl;

  return `${cleanApiBase}/media/${cleanPath}`;
};
