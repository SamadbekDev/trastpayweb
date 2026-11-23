"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import type { Language } from "@/types/pageConfig";

const LABELS: Record<Language, [string, string]> = {
  ru: ["Назад", "Вперёд"],
  uz: ["Orqaga", "Oldinga"],
  en: ["Previous", "Next"],
};

/** Prev/next buttons for a `useHScroll` strip (Figma: 40×40 round, light grey). */
export default function ScrollArrows({
  canPrev,
  canNext,
  onPrev,
  onNext,
  lang = "ru",
  className = "",
}: {
  canPrev: boolean;
  canNext: boolean;
  onPrev: () => void;
  onNext: () => void;
  lang?: Language;
  className?: string;
}) {
  const [prev, next] = LABELS[lang] ?? LABELS.ru;
  const btn =
    "flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-[rgba(15,25,55,0.08)] text-[#030306] transition-colors hover:bg-[rgba(15,25,55,0.14)] disabled:cursor-default disabled:bg-[rgba(38,55,88,0.04)] disabled:text-[rgba(5,11,44,0.25)]";
  return (
    <div className={`flex shrink-0 gap-2 ${className}`}>
      <button type="button" onClick={onPrev} disabled={!canPrev} aria-label={prev} className={btn}>
        <ChevronLeft size={20} />
      </button>
      <button type="button" onClick={onNext} disabled={!canNext} aria-label={next} className={btn}>
        <ChevronRight size={20} />
      </button>
    </div>
  );
}
