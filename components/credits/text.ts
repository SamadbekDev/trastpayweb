"use client";

import { useTranslation } from "react-i18next";
import { I18nText } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

export function useCreditText() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.split("-")[0] || "ru";
  return (value?: I18nText | string | null) => getLocalizedText(value, lang);
}
