"use client";

import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import SearchModal from "@/components/layout/SearchModal";
import { Language } from "@/types/pageConfig";

interface HeaderUtilitiesProps {
  onBeforeOpenModal?: () => void;
}

export default function HeaderUtilities({
  onBeforeOpenModal,
}: HeaderUtilitiesProps) {
  const { i18n } = useTranslation();
  const [langOpen, setLangOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const currentLang =
    (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  useEffect(() => {
    if (!langOpen) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLangOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [langOpen]);

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("app_lang", lang);
    }
    setLangOpen(false);
  };

  const searchLabel =
    currentLang === "uz"
      ? "Qidiruv"
      : currentLang === "en"
        ? "Search"
        : "Поиск";

  return (
    <>
      <button
        type="button"
        aria-label={searchLabel}
        onClick={() => {
          setLangOpen(false);
          onBeforeOpenModal?.();
          setSearchOpen(true);
        }}
        className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full text-[#1E1E20] transition-colors hover:bg-black/5 sm:h-11 sm:w-11"
      >
        <Search size={21} strokeWidth={2} />
      </button>

      <div className="relative">
        <button
          type="button"
          onClick={() => setLangOpen((v) => !v)}
          className="flex h-10 cursor-pointer items-center px-1.5 text-[12px] font-bold uppercase tracking-[0.6px] text-[#110C30]"
        >
          {currentLang}
        </button>
        {langOpen && (
          <div className="absolute right-0 top-full z-50 mt-1 min-w-[64px] rounded-xl border border-black/5 bg-white py-1 shadow-lg">
            {(["ru", "uz", "en"] as Language[]).map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => handleLanguageChange(lang)}
                className={`block w-full cursor-pointer px-3 py-1.5 text-left text-[12px] font-semibold uppercase ${
                  currentLang === lang
                    ? "text-[#1E54E0]"
                    : "text-[#110C30] hover:bg-[#F2F4F7]"
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        )}
      </div>

      <SearchModal
        open={searchOpen}
        lang={currentLang}
        onClose={() => setSearchOpen(false)}
      />
    </>
  );
}
