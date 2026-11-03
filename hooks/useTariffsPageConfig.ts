"use client";

import { useCallback, useEffect, useState } from "react";
import { getTariffsPage } from "@/api/pageService";
import { tariffsPageConfig } from "@/mock/tariffsPage";
import { TariffsPageConfig } from "@/types/tariffs";
import "@/i18n";

interface UseTariffsPageConfigResult {
  config: TariffsPageConfig | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useTariffsPageConfig(): UseTariffsPageConfigResult {
  const [config, setConfig] = useState<TariffsPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setConfig(await getTariffsPage());
    } catch (err) {
      // Fallback to local mock if API has no tariffs yet
      setConfig(tariffsPageConfig);
      setError(err instanceof Error ? err : new Error("Failed to load tariffs"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { config, loading, error, refetch: fetchConfig };
}

export default useTariffsPageConfig;
