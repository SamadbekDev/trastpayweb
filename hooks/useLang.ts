"use client";

import { useSyncExternalStore } from "react";
import i18n from "@/i18n";
import type { Language } from "@/types/pageConfig";

const normalize = (lng?: string): Language => {
  const code = lng?.split("-")[0].toLowerCase();
  return code === "uz" || code === "en" ? code : "ru";
};

const subscribe = (cb: () => void) => {
  i18n.on("languageChanged", cb);
  return () => i18n.off("languageChanged", cb);
};

/**
 * Current UI language. The server and the first client render both use "ru"
 * (the saved language lives in localStorage), then React switches to the saved
 * one right after hydration — no hydration mismatch.
 */
export function useLang(): Language {
  return useSyncExternalStore(
    subscribe,
    () => normalize(i18n.language),
    () => "ru"
  );
}

export function pickText(
  lang: Language,
  ru: string,
  uz: string,
  en?: string
): string {
  if (lang === "uz") return uz;
  if (lang === "en") return en || ru;
  return ru;
}
