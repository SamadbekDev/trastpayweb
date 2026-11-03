"use client";

import { useCallback, useEffect, useState } from "react";
import { getTariffsPage } from "@/api/pageService";
import { TariffsPageConfig } from "@/types/tariffs";
import "@/i18n";

let cachedTariffs: TariffsPageConfig | null = null;
let inflight: Promise<TariffsPageConfig> | null = null;

function isTariffsConfig(value: unknown): value is TariffsPageConfig {
  if (!value || typeof value !== "object") return false;
  const v = value as Partial<TariffsPageConfig>;
  return Boolean(v.individual && v.corporate);
}

async function fetchTariffsFromApi(): Promise<TariffsPageConfig> {
  const data = await getTariffsPage();
  if (!isTariffsConfig(data)) {
    throw new Error("Некорректный формат тарифов с API");
  }
  cachedTariffs = data;
  return data;
}

/** Prefetch published tariffs so section switch does not wait on first paint. */
export function prefetchTariffsPage(
  force = false
): Promise<TariffsPageConfig> {
  if (!force && cachedTariffs) return Promise.resolve(cachedTariffs);
  if (!force && inflight) return inflight;

  inflight = fetchTariffsFromApi().finally(() => {
    inflight = null;
  });
  return inflight;
}

interface UseTariffsPageConfigResult {
  config: TariffsPageConfig | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useTariffsPageConfig(): UseTariffsPageConfigResult {
  const [config, setConfig] = useState<TariffsPageConfig | null>(
    () => cachedTariffs
  );
  const [loading, setLoading] = useState(!cachedTariffs);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async (force = false) => {
    if (!force && cachedTariffs) {
      setConfig(cachedTariffs);
      setLoading(false);
      setError(null);
      // Silent refresh from API
      void prefetchTariffsPage(true)
        .then((data) => setConfig(data))
        .catch(() => undefined);
      return;
    }

    setLoading(!cachedTariffs);
    setError(null);
    try {
      const data = await prefetchTariffsPage(force);
      setConfig(data);
    } catch (err) {
      if (!cachedTariffs) setConfig(null);
      setError(
        err instanceof Error ? err : new Error("Failed to load tariffs")
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

export default useTariffsPageConfig;
