"use client";

import { useEffect } from "react";
import i18n from "@/i18n";

/**
 * Pages are prerendered in Russian. After hydration this switches the UI to the
 * language saved in localStorage, so server HTML and the first client render match.
 */
export default function LangBoot() {
  useEffect(() => {
    try {
      const saved = localStorage.getItem("app_lang");
      if (saved && ["ru", "uz", "en"].includes(saved) && saved !== i18n.language) i18n.changeLanguage(saved);
    } catch {
      /* storage unavailable: stay on Russian */
    }
  }, []);
  return null;
}
