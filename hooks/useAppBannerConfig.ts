"use client";

import { useEffect, useState } from "react";
import { getAppBanner, type AppBannerConfig } from "@/api/pageService";

let cachedBanner: AppBannerConfig | null = null;
let inflight: Promise<AppBannerConfig> | null = null;

function prefetchAppBanner(force = false): Promise<AppBannerConfig> {
  if (!force && cachedBanner) return Promise.resolve(cachedBanner);
  if (!force && inflight) return inflight;

  inflight = getAppBanner()
    .then((data) => {
      cachedBanner = data;
      return data;
    })
    .finally(() => {
      inflight = null;
    });

  return inflight;
}

export function useAppBannerConfig(): AppBannerConfig | null {
  const [banner, setBanner] = useState<AppBannerConfig | null>(
    () => cachedBanner
  );

  useEffect(() => {
    let active = true;
    void prefetchAppBanner(!cachedBanner)
      .then((data) => {
        if (active) setBanner(data);
      })
      .catch(() => undefined);
    return () => {
      active = false;
    };
  }, []);

  return banner;
}
