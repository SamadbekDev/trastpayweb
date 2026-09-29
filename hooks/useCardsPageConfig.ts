"use client";

import { useCallback, useEffect, useState } from "react";
import { CardsPageConfig } from "@/types/cards";
import { getCardsPage } from "@/api/pageService";
import "@/i18n";

interface UseCardsPageConfigResult {
  config: CardsPageConfig | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCardsPageConfig(): UseCardsPageConfigResult {
  const [config, setConfig] = useState<CardsPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCardsPage();
      setConfig(data);
    } catch (err) {
      setConfig(null);
      setError(
        err instanceof Error ? err : new Error("Failed to load cards page")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { config, loading, error, refetch: fetchConfig };
}

export default useCardsPageConfig;
