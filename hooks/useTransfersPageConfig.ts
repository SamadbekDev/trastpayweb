"use client";

import { useCallback, useEffect, useState } from "react";
import { getTransfersPage } from "@/api/pageService";
import { TransfersPageConfig } from "@/types/transfers";
import "@/i18n";

let cachedTransfers: TransfersPageConfig | null = null;
let inflight: Promise<TransfersPageConfig> | null = null;

function isTransfersConfig(value: unknown): value is TransfersPageConfig {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<TransfersPageConfig>;
  return Boolean(v.hero && v.conditions && v.howToSend && v.faq);
}

async function fetchTransfersFromApi(): Promise<TransfersPageConfig> {
  const data = await getTransfersPage();
  if (!isTransfersConfig(data)) {
    throw new Error("Некорректный формат страницы переводов с API");
  }
  cachedTransfers = data;
  return data;
}

export function prefetchTransfersPage(
  force = false
): Promise<TransfersPageConfig> {
  if (!force && cachedTransfers) return Promise.resolve(cachedTransfers);
  if (!force && inflight) return inflight;

  inflight = fetchTransfersFromApi().finally(() => {
    inflight = null;
  });
  return inflight;
}

interface UseTransfersPageConfigResult {
  config: TransfersPageConfig | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useTransfersPageConfig(): UseTransfersPageConfigResult {
  const [config, setConfig] = useState<TransfersPageConfig | null>(
    () => cachedTransfers
  );
  const [loading, setLoading] = useState(!cachedTransfers);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async (force = false) => {
    if (!force && cachedTransfers) {
      setConfig(cachedTransfers);
      setLoading(false);
      setError(null);
      void prefetchTransfersPage(true)
        .then((data) => setConfig(data))
        .catch(() => undefined);
      return;
    }

    setLoading(!cachedTransfers);
    setError(null);
    try {
      const data = await prefetchTransfersPage(force);
      setConfig(data);
    } catch (err) {
      if (!cachedTransfers) setConfig(null);
      setError(
        err instanceof Error ? err : new Error("Failed to load transfers page")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void fetchConfig(false);
  }, [fetchConfig]);

  return {
    config,
    loading,
    error,
    refetch: () => fetchConfig(true),
  };
}

export default useTransfersPageConfig;
