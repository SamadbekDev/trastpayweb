"use client";

import type { ReactNode } from "react";
import { useLang } from "@/hooks/useLang";

/**
 * Lets server components prerender a block in all three languages and show the
 * one matching the UI language (the language lives in localStorage, so the
 * choice can only be made in the browser).
 */
export default function ByLang({ ru, uz, en }: { ru: ReactNode; uz: ReactNode; en: ReactNode }) {
  const lang = useLang();
  return <>{lang === "uz" ? uz : lang === "en" ? en : ru}</>;
}
