import { HomePageConfig } from "@/types/pageConfig";
import {
  DepositDetailPageConfig,
  DepositsPageConfig,
  OfficesPageConfig,
} from "@/types/deposits";
import { apiFetch } from "@/api/client";

type PublishedResponse<T> = {
  content?: T;
  meta?: unknown;
  error?: string;
};

async function parseContentResponse<T>(
  res: Response,
  label: string
): Promise<T> {
  let data: PublishedResponse<T> = {};
  try {
    data = (await res.json()) as PublishedResponse<T>;
  } catch {
    throw new Error("Некорректный ответ API");
  }

  if (!res.ok) {
    throw new Error(
      data.error ||
        `Не удалось загрузить ${label} (${res.status}). Запустите dashboard-api.`
    );
  }

  if (!data.content || typeof data.content !== "object") {
    throw new Error(`В ответе API нет поля content (${label})`);
  }

  return data.content;
}

/**
 * Homepage SDUI config.
 */
export async function getHomePageConfig(): Promise<HomePageConfig> {
  const res = await apiFetch("/content/published");
  return parseContentResponse<HomePageConfig>(res, "главную");
}

/**
 * Deposits catalog page (/vklady).
 */
export async function getDepositsPage(): Promise<DepositsPageConfig> {
  const res = await apiFetch("/content/published/deposits");
  return parseContentResponse<DepositsPageConfig>(res, "каталог вкладов");
}

/**
 * Single deposit detail page (/vklady/[id]).
 */
export async function getDepositById(
  id: string
): Promise<DepositDetailPageConfig> {
  const res = await apiFetch(
    `/content/published/deposits/${encodeURIComponent(id)}`
  );
  return parseContentResponse<DepositDetailPageConfig>(res, `вклад ${id}`);
}

/**
 * Offices / branches page (/filialy).
 */
export async function getOfficesPage(): Promise<OfficesPageConfig> {
  const res = await apiFetch("/content/published/offices");
  return parseContentResponse<OfficesPageConfig>(res, "филиалы");
}

export const pageService = {
  getHomePageConfig,
  getDepositsPage,
  getDepositById,
  getOfficesPage,
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
