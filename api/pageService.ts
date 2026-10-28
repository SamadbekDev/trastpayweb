import { HomePageConfig } from "@/types/pageConfig";
import {
  DepositDetailPageConfig,
  DepositsPageConfig,
  OfficesPageConfig,
} from "@/types/deposits";
import { CardDetailPageConfig, CardsPageConfig } from "@/types/cards";
import { CreditDetailConfig, CreditsPageConfig } from "@/types/credits";
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

/** Homepage SDUI config. */
export async function getHomePageConfig(): Promise<HomePageConfig> {
  const res = await apiFetch("/content/published");
  return parseContentResponse<HomePageConfig>(res, "главную");
}

/** Deposits catalog page (/vklady). */
export async function getDepositsPage(): Promise<DepositsPageConfig> {
  const res = await apiFetch("/content/published/deposits");
  return parseContentResponse<DepositsPageConfig>(res, "каталог вкладов");
}

/** Single deposit detail page (/vklady/[id]). */
export async function getDepositById(
  id: string
): Promise<DepositDetailPageConfig> {
  const res = await apiFetch(
    `/content/published/deposits/${encodeURIComponent(id)}`
  );
  return parseContentResponse<DepositDetailPageConfig>(
    res,
    `вклад ${id}`
  );
}

/** Credits catalog page (/kredity). */
export async function getCreditsPage(): Promise<CreditsPageConfig> {
  const res = await apiFetch("/content/published/credits");
  return parseContentResponse<CreditsPageConfig>(res, "каталог кредитов");
}

/** Single credit detail page (/kredity/[id]). */
export async function getCreditById(id: string): Promise<CreditDetailConfig> {
  const res = await apiFetch(
    `/content/published/credits/${encodeURIComponent(id)}`
  );
  if (res.status === 404) {
    const error = new Error("not-found") as Error & { status?: number };
    error.status = 404;
    throw error;
  }
  return parseContentResponse<CreditDetailConfig>(res, `кредит ${id}`);
}

/** Cards catalog page (/karty). */
export async function getCardsPage(): Promise<CardsPageConfig> {
  const res = await apiFetch("/content/published/cards");
  return parseContentResponse<CardsPageConfig>(res, "каталог карт");
}

/** Single card detail page (/karty/[id]). */
export async function getCardById(id: string): Promise<CardDetailPageConfig> {
  const res = await apiFetch(
    `/content/published/cards/${encodeURIComponent(id)}`
  );
  if (res.status === 404) {
    const error = new Error("not-found") as Error & { status?: number };
    error.status = 404;
    throw error;
  }
  return parseContentResponse<CardDetailPageConfig>(res, `карта ${id}`);
}

/** Offices / branches page (/filialy). */
export async function getOfficesPage(): Promise<OfficesPageConfig> {
  const res = await apiFetch("/content/published/offices");
  return parseContentResponse<OfficesPageConfig>(res, "филиалы");
}

export const pageService = {
  getHomePageConfig,
  getDepositsPage,
  getDepositById,
  getCreditsPage,
  getCreditById,
  getCardsPage,
  getCardById,
  getOfficesPage,
};

export default pageService;
