"use client";

import { useEffect, useState, useCallback } from "react";
import { HomePageConfig } from "@/types/pageConfig";
import { getHomePageConfig } from "@/api/pageService";
import { defaultHomePageConfig } from "@/mock/homePageConfig";

interface UseHomePageConfigResult {
  config: HomePageConfig;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useHomePageConfig(): UseHomePageConfigResult {
  const [config, setConfig] = useState<HomePageConfig>(defaultHomePageConfig);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getHomePageConfig();
      if (data) {
        setConfig(data);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err
          : new Error("Failed to load page configuration")
      );
      setConfig(defaultHomePageConfig);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { config, loading, error, refetch: fetchConfig };
}

export default useHomePageConfig;
