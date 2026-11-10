"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Glasses } from "lucide-react";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/BrandLogo";
import { HeaderChip, HeaderConfig, Language } from "@/types/pageConfig";

interface HeaderProps {
  config?: HeaderConfig;
  showProductNav?: boolean;
  activeChipId?: string;
  /** Return true if the chip was handled (skip default navigation). */
  onChipSelect?: (chip: HeaderChip) => boolean | void;
}

/** CMS often ships placeholder `#` — map known utility labels to real routes. */
function resolveUtilityHref(link: { label: string; href: string }): string {
  const href = (link.href || "").trim();
  if (href && href !== "#") return href;
  const label = link.label.toLowerCase();
  if (/филиал|filial|branch/.test(label)) return "/filialy";
  if (/^1287$/.test(label.trim())) return "tel:1287";
  return href || "#";
}

export default function Header({
  config,
  showProductNav = true,
  activeChipId,
  onChipSelect,
}: HeaderProps) {
  const { i18n } = useTranslation();
  const [activeNav, setActiveNav] = useState(config?.navItems?.[0]?.id || "");
  const [activeChip, setActiveChip] = useState(
    activeChipId || config?.chips?.[0]?.id || ""
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  useEffect(() => {
    if (activeChipId) setActiveChip(activeChipId);
  }, [activeChipId]);

  const currentLang =
    (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
    setLangOpen(false);
  };

  const navItems = config?.navItems || [];
  const utilityLinks = (config?.utilityLinks || []).map((link) => ({
    ...link,
    href: resolveUtilityHref(link),
  }));
  const chips = config?.chips || [];

  return (
    <header className="w-full bg-[#FAFAFA] relative z-50">
      <div className="mx-auto w-full max-w-[1440px] px-4 lg:px-[140px]">
        {/* Top bar — Figma: 8px 140px */}
        <div className="flex h-16 items-center justify-between gap-4">
          <div className="flex min-w-0 items-center gap-4">
            <BrandLogo
              src={config?.logo}
              alt={config?.logoText || "TRASTBANK"}
              priority
            />

            <nav className="hidden xl:flex items-center gap-4">
              {navItems.map((item) => {
                const isActive = activeNav === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setActiveNav(item.id)}
                    className={`inline-flex items-center gap-1 py-3.5 text-[12px] leading-5 tracking-[0.6px] uppercase whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? "font-bold text-[#110C30]"
                        : "font-medium text-[rgba(17,12,48,0.5)] hover:text-[#110C30]"
                    }`}
                  >
                    {item.label}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4 shrink-0">
            <div className="hidden lg:flex items-center gap-4">
              {utilityLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className="text-[12px] font-medium leading-5 tracking-[0.6px] uppercase text-[#110C30] hover:opacity-70"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="relative">
              <button
                type="button"
                onClick={() => setLangOpen((v) => !v)}
                className="flex items-center py-3.5 text-[12px] font-bold leading-5 tracking-[0.6px] uppercase text-[#110C30] cursor-pointer"
              >
                {currentLang}
              </button>
              {langOpen && (
                <div className="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-lg border border-black/5 py-1 min-w-[64px] z-50">
                  {(["ru", "uz", "en"] as Language[]).map((lang) => (
                    <button
                      key={lang}
                      type="button"
                      onClick={() => handleLanguageChange(lang)}
                      className={`block w-full px-3 py-1.5 text-left text-[12px] font-semibold uppercase cursor-pointer ${
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

            <button
              type="button"
              aria-label="Размер текста"
              className="hidden sm:flex w-8 h-8 items-center justify-center rounded-md text-[#110C30] cursor-pointer"
            >
              <Glasses size={18} />
            </button>

            <Link
              href="#"
              className="hidden sm:inline-flex items-center gap-2 text-[12px] font-medium leading-5 text-[#110C30]"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"
                  fill="#110C30"
                />
                <path
                  d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1Z"
                  fill="#110C30"
                />
              </svg>
              {config?.loginButtonText || "Войти"}
            </Link>

            <button
              type="button"
              className="xl:hidden p-2 text-[#110C30] cursor-pointer"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {showProductNav && (
        <div className="flex justify-center pt-6 pb-0">
          <div
            className="flex w-full max-w-[883px] items-center justify-between gap-1.5 rounded-[20px] p-[6px] h-16"
            style={{ backgroundColor: "#EAEFF8" }}
          >
            <button
              type="button"
              className="hidden sm:inline-flex h-12 shrink-0 items-center justify-center gap-3 rounded-2xl px-4 text-[14px] font-semibold leading-[18px] tracking-[-0.2px] text-[#172419] cursor-pointer"
            >
              <Menu size={20} strokeWidth={2.2} className="text-black" />
              {config?.menuButtonText || "Меню"}
            </button>

            <div
              className="flex h-[52px] min-w-0 flex-1 items-center gap-2 overflow-x-auto rounded-2xl p-1 sm:max-w-[492px] sm:flex-none sm:gap-4"
              style={{
                background:
                  "linear-gradient(90deg, #BBD8F2 0%, #D4DFF7 50%, #FFFFFF 100%)",
              }}
            >
              {chips.map((chip) => {
                const isActive = activeChip === chip.id;
                const chipClass = `inline-flex h-11 shrink-0 items-center rounded-xl px-4 text-[14px] font-semibold leading-[18px] tracking-[-0.2px] transition-all ${
                  isActive
                    ? "bg-white text-[#262626] shadow-[0_12px_64px_rgba(8,92,24,0.05),0_8px_32px_rgba(8,92,24,0.05)]"
                    : "bg-transparent text-[rgba(38,38,38,0.8)] hover:text-[#262626]"
                }`;

                return (
                  <button
                    key={chip.id}
                    type="button"
                    onClick={() => {
                      setActiveChip(chip.id);
                      onChipSelect?.(chip);
                    }}
                    className={`${chipClass} cursor-pointer`}
                  >
                    {chip.label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              aria-label="Открыть поиск"
              className="flex h-12 w-12 min-w-12 shrink-0 items-center justify-center text-[#172419] cursor-pointer"
            >
              <Search size={20} strokeWidth={2.2} />
            </button>

            <Link
              href="#"
              aria-label="Войти"
              className="flex h-12 w-12 min-w-12 max-w-12 shrink-0 items-center justify-center rounded-2xl bg-[#EFF7F7]"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-white">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
                  <path
                    d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"
                    fill="#262626"
                  />
                  <path
                    d="M12 14c-4.42 0-8 1.79-8 4v1h16v-1c0-2.21-3.58-4-8-4Z"
                    fill="#262626"
                  />
                </svg>
              </span>
            </Link>
          </div>
        </div>
        )}
      </div>

      {mobileOpen && (
        <div className="xl:hidden absolute inset-x-0 top-full bg-white border-t border-black/5 shadow-lg px-4 py-4 z-40">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-[#110C30]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </a>
            ))}
            {utilityLinks.length > 0 && (
              <div className="my-2 border-t border-black/5 pt-2 lg:hidden">
                {utilityLinks.map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="block rounded-lg px-3 py-2.5 text-[14px] font-semibold uppercase tracking-[0.4px] text-[#110C30]"
                    onClick={() => setMobileOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
            <Link
              href="#"
              className="mt-1 rounded-lg bg-[#2D6EE3] px-3 py-2.5 text-center text-[14px] font-semibold text-white sm:hidden"
              onClick={() => setMobileOpen(false)}
            >
              {config?.loginButtonText || "Войти"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}