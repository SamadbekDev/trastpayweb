"use client";

import { useCallback, useEffect, useState } from "react";
import { OfficesPageConfig } from "@/types/deposits";
import { getOfficesPage } from "@/api/pageService";
import "@/i18n";

interface UseOfficesPageConfigResult {
  config: OfficesPageConfig | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useOfficesPageConfig(): UseOfficesPageConfigResult {
  const [config, setConfig] = useState<OfficesPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getOfficesPage();
      setConfig(data);
    } catch (err) {
      setConfig(null);
      setError(
        err instanceof Error ? err : new Error("Failed to load offices page")
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

export default useOfficesPageConfig;
