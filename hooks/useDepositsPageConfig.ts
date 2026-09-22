"use client";

import { useCallback, useEffect, useState } from "react";
import { DepositsPageConfig } from "@/types/deposits";
import { getDepositsPage } from "@/api/pageService";
import "@/i18n";

interface UseDepositsPageConfigResult {
  config: DepositsPageConfig | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useDepositsPageConfig(): UseDepositsPageConfigResult {
  const [config, setConfig] = useState<DepositsPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getDepositsPage();
      setConfig(data);
    } catch (err) {
      setConfig(null);
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to load deposits page")
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

export default useDepositsPageConfig;
