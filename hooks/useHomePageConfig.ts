"use client";

import { useEffect, useState, useCallback } from "react";
import { HomePageConfig } from "@/types/pageConfig";
import { getHomePageConfig } from "@/api/pageService";
import "@/i18n";

interface UseHomePageConfigResult {
  config: HomePageConfig | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useHomePageConfig(): UseHomePageConfigResult {
  const [config, setConfig] = useState<HomePageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHomePageConfig();
      setConfig(data);
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to load page configuration")
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return {
    config,
    loading,
    error,
    refetch: fetchConfig,
  };
}

export default useHomePageConfig;
