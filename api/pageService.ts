import apiClient from './client';
import { HomePageConfig } from '@/types/pageConfig';

export interface PublishedContentResponse {
  content: HomePageConfig;
  meta?: {
    updatedAt: string;
    updatedBy: string;
  };
}

export const pageService = {
  /**
   * Fetches published Server-Driven UI content configuration.
   * Endpoint: GET /content/published
   */
  async getHomePageConfig(): Promise<HomePageConfig> {
    const response = await apiClient.get<PublishedContentResponse | HomePageConfig>('/content/published');
    
    if (response.data && 'content' in response.data && response.data.content) {
      return response.data.content;
    }
    
    return response.data as HomePageConfig;
  },
};

export const getHomePageConfig = pageService.getHomePageConfig;
export default pageService;