import apiClient from './client';
import { HomePageConfig } from '@/types/pageConfig';
import { CardsPageConfig } from '@/types/cards';

type PublishedResponse<T> = {
  content?: T;
  meta?: unknown;
  error?: string;
};

export const pageService = {
  async getHomePageConfig(): Promise<HomePageConfig> {
    const response = await apiClient.get<HomePageConfig>('/content/published');
    return response.data;
  },

  async getCardsPage(): Promise<CardsPageConfig> {
    const response = await apiClient.get<PublishedResponse<CardsPageConfig>>(
      '/content/published/cards'
    );
    const data = response.data;
    if (!data?.content || typeof data.content !== 'object') {
      throw new Error('В ответе API нет поля content (каталог карт)');
    }
    return data.content;
  },
};

export const getHomePageConfig = pageService.getHomePageConfig;
export const getCardsPage = pageService.getCardsPage;
export default pageService;
