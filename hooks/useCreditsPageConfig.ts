"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getCreditById, getCreditsPage } from "@/api/pageService";
import { CreditDetailConfig, CreditsPageConfig } from "@/types/credits";
import "@/i18n";

interface UseCreditsPageConfigResult {
  config: CreditsPageConfig | null;
  loading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCreditsPageConfig(): UseCreditsPageConfigResult {
  const [config, setConfig] = useState<CreditsPageConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchConfig = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setConfig(await getCreditsPage());
    } catch (err) {
      setConfig(null);
      setError(err instanceof Error ? err : new Error("Failed to load credits page"));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchConfig();
  }, [fetchConfig]);

  return { config, loading, error, refetch: fetchConfig };
}

interface UseCreditDetailResult {
  detail: CreditDetailConfig | null;
  loading: boolean;
  notFound: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
}

export function useCreditDetail(id: string | undefined): UseCreditDetailResult {
  const [detail, setDetail] = useState<CreditDetailConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const requestSeqRef = useRef(0);

  const fetchDetail = useCallback(async () => {
    const reqId = ++requestSeqRef.current;
    if (!id) {
      setDetail(null);
      setNotFound(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    setError(null);
    setNotFound(false);
    try {
      const data = await getCreditById(id);
      if (reqId !== requestSeqRef.current) return;
      setDetail(data);
    } catch (err) {
      if (reqId !== requestSeqRef.current) return;
      setDetail(null);
      const status = err instanceof Error ? (err as Error & { status?: number }).status : undefined;
      if (status === 404) {
        setNotFound(true);
        setError(null);
      } else {
        setError(err instanceof Error ? err : new Error("Failed to load credit"));
      }
    } finally {
      if (reqId === requestSeqRef.current) {
        setLoading(false);
      }
    }
  }, [id]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  return { detail, loading, notFound, error, refetch: fetchDetail };
}

export default useCreditsPageConfig;
