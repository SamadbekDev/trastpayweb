import axios from 'axios';
import i18n from 'i18next';
import { Language } from '@/types/pageConfig';

const baseURL =
  process.env.NEXT_PUBLIC_API_URL

export const apiClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.request.use(
  (config) => {
    const rawLang = i18n.language || 'ru';
    const currentLang: Language = (rawLang.split('-')[0].toLowerCase() as Language) || 'ru';

    config.headers = config.headers || {};
    config.headers['Accept-Language'] = currentLang;

    config.params = {
      ...config.params,
      lang: currentLang,
    };

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;
