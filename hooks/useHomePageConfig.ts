"use client";

import { useEffect, useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
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
  const { i18n } = useTranslation();
  const [config, setConfig] = useState<HomePageConfig | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async (isInitial = false) => {
    if (isInitial || !config) {
      setLoading(true);
    }
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
    } finally {
      setLoading(false);
    }
  }, [config]);

  // Initial load
  useEffect(() => {
    fetchConfig(true);
  }, []);

  // Background refetch on language change without triggering full-page loader
  useEffect(() => {
    if (config) {
      getHomePageConfig()
        .then((data) => {
          if (data) setConfig(data);
        })
        .catch(() => {});
    }
  }, [i18n.language]);

  return {
    config,
    loading,
    error,
    refetch: () => fetchConfig(true),
  };
}

export default useHomePageConfig;
