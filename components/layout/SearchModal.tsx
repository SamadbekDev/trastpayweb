"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeftRight,
  Coins,
  CreditCard,
  Landmark,
  Search,
  Smartphone,
  Wallet,
  X,
} from "lucide-react";
import { SITE_SEARCH_INDEX } from "@/data/searchIndex";
import { Language } from "@/types/pageConfig";

interface SearchModalProps {
  open: boolean;
  lang: Language;
  onClose: () => void;
}

const FEATURED_PRODUCTS = [
  {
    href: "/karty",
    icon: CreditCard,
    ru: "Пластиковые карты",
    uz: "Plastik kartalar",
    en: "Payment Cards",
  },
  {
    href: "/kredity",
    icon: Wallet,
    ru: "Кредиты",
    uz: "Kreditlar",
    en: "Loans",
  },
  {
    href: "/vklady",
    icon: Landmark,
    ru: "Вклады",
    uz: "Omonatlar",
    en: "Deposits",
  },
  {
    href: "/perevody",
    icon: ArrowLeftRight,
    ru: "Денежные переводы",
    uz: "Pul o‘tkazmalari",
    en: "Money Transfers",
  },
  {
    href: "/valyuta",
    icon: Coins,
    ru: "Курсы валют",
    uz: "Valyuta kurslari",
    en: "Exchange Rates",
  },
  {
    href: "/servisy#trastpay",
    icon: Smartphone,
    ru: "Мобильное приложение Trastpay",
    uz: "Trastpay mobil ilovasi",
    en: "Trastpay Mobile App",
  },
] as const;

export default function SearchModal({ open, lang, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      setQuery("");
      return;
    }
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const raf = requestAnimationFrame(() => inputRef.current?.focus());

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      cancelAnimationFrame(raf);
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, onClose]);

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return SITE_SEARCH_INDEX.filter(
      (item) =>
        item.ru.toLowerCase().includes(q) ||
        item.uz.toLowerCase().includes(q) ||
        item.en.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    ).slice(0, 8);
  }, [query]);

  const placeholder =
    lang === "uz"
      ? "Bank sayti bo‘yicha qidiruv"
      : lang === "en"
        ? "Search bank website"
        : "Поиск по сайту банка";

  const productsHeading =
    lang === "uz"
      ? "Mahsulotlar"
      : lang === "en"
        ? "Products"
        : "Продукты";

  const resultsHeading =
    lang === "uz"
      ? "Qidiruv natijalari"
      : lang === "en"
        ? "Search results"
        : "Результаты поиска";

  const emptyText =
    lang === "uz"
      ? "Hech narsa topilmadi"
      : lang === "en"
        ? "Nothing found"
        : "Ничего не найдено";

  return (
    <AnimatePresence>
      {open ? (
        <div
          className="fixed inset-0 z-[70] flex items-start justify-center px-4 pt-6 sm:pt-12"
          role="dialog"
          aria-modal="true"
          aria-label={placeholder}
        >
          <motion.button
            type="button"
            aria-label="Close"
            onClick={onClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
            className="fixed inset-0 cursor-default bg-[#110C30]/25 backdrop-blur-[6px]"
          />

          <motion.div
            initial={{ opacity: 0, y: -14, scale: 0.985 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.99 }}
            transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 w-full max-w-[780px] overflow-hidden rounded-[24px] border border-black/5 bg-[#FAFAFA] p-3 shadow-[0_24px_80px_rgba(17,12,48,0.18)] sm:p-4"
          >
            {/* Search input */}
            <label className="flex h-14 w-full items-center gap-3 rounded-[16px] border border-[#E7EAF0] bg-white px-5 shadow-[0_2px_10px_rgba(17,12,48,0.04)] focus-within:border-[#2D6EE3]/40 focus-within:ring-2 focus-within:ring-[#2D6EE3]/15">
              <input
                ref={inputRef}
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={placeholder}
                className="w-full min-w-0 bg-transparent text-[16px] font-normal leading-6 text-[#110C30] outline-none placeholder:text-[#8B95A5]"
              />
              {query ? (
                <button
                  type="button"
                  aria-label="Clear"
                  onClick={() => {
                    setQuery("");
                    inputRef.current?.focus();
                  }}
                  className="flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full text-[#8B95A5] transition-colors hover:bg-[#F2F4F7] hover:text-[#110C30]"
                >
                  <X size={18} strokeWidth={2} />
                </button>
              ) : (
                <Search
                  size={20}
                  strokeWidth={2}
                  className="shrink-0 text-[#110C30]"
                />
              )}
            </label>

            {/* Body: Featured products or live search results */}
            <div className="max-h-[65vh] overflow-y-auto px-2 pb-2 pt-5 sm:px-3">
              {query.trim().length === 0 ? (
                <>
                  <p className="mb-3 px-2 text-[14px] font-medium leading-5 text-[#8B95A5]">
                    {productsHeading}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {FEATURED_PRODUCTS.map((item) => {
                      const Icon = item.icon;
                      const label =
                        lang === "uz"
                          ? item.uz
                          : lang === "en"
                            ? item.en
                            : item.ru;
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={onClose}
                          className="group flex items-center gap-3.5 rounded-xl px-2 py-2.5 text-[16px] font-semibold leading-6 text-[#110C30] transition-colors hover:bg-white hover:text-[#2D6EE3]"
                        >
                          <Icon
                            size={22}
                            strokeWidth={1.6}
                            className="shrink-0 text-[#8B95A5] transition-colors group-hover:text-[#2D6EE3]"
                          />
                          <span>{label}</span>
                        </Link>
                      );
                    })}
                  </div>
                </>
              ) : results.length > 0 ? (
                <>
                  <p className="mb-3 px-2 text-[14px] font-medium leading-5 text-[#8B95A5]">
                    {resultsHeading}
                  </p>
                  <div className="flex flex-col gap-0.5">
                    {results.map((res) => (
                      <Link
                        key={res.href}
                        href={res.href}
                        onClick={onClose}
                        className="flex items-center gap-3 rounded-xl px-2 py-2.5 text-[15px] font-medium leading-6 text-[#110C30] transition-colors hover:bg-white hover:text-[#2D6EE3]"
                      >
                        <Search
                          size={18}
                          strokeWidth={1.8}
                          className="shrink-0 text-[#8B95A5]"
                        />
                        <span>
                          {lang === "uz"
                            ? res.uz
                            : lang === "en"
                              ? res.en
                              : res.ru}
                        </span>
                      </Link>
                    ))}
                  </div>
                </>
              ) : (
                <p className="px-2 py-6 text-center text-[14px] text-[#8B95A5]">
                  {emptyText}
                </p>
              )}
            </div>
          </motion.div>
        </div>
      ) : null}
    </AnimatePresence>
  );
}
