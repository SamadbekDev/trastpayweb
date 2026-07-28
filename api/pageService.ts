import apiClient from './client';
import { HomePageConfig } from '@/types/pageConfig';

export const pageService = {
  async getHomePageConfig(): Promise<HomePageConfig> {
    const response = await apiClient.get<HomePageConfig>('/content/published');
    return response.data;
  },
};

export const getHomePageConfig = pageService.getHomePageConfig;
export default pageService;