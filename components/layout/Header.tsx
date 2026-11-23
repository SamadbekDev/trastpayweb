"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Menu, X, Search } from "lucide-react";
import { useTranslation } from "react-i18next";
import { tr } from "@/i18n/tr";
import { NAV_DICT } from "@/i18n/dict/nav";
import BrandLogo from "@/components/BrandLogo";
import MegaMenu from "@/components/layout/MegaMenu";
import AccessibilityMenu from "@/components/layout/AccessibilityMenu";
import { SITE_SEARCH_INDEX } from "@/data/searchIndex";
import {
  resolveChipSection,
  sectionPath,
} from "@/components/shell/sectionChips";
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

function resolveNavHref(item: { id: string; label: string; href: string }): string {
  const href = (item.href || "").trim();
  if (href && href !== "#") return href;
  const label = item.label.toLowerCase();
  if (/корпоратив|бизнес|korporativ|business/.test(label) || item.id.includes("corp")) {
    return "/biznes";
  }
  if (/акционер|инвестор|aksiyador|investor/.test(label) || item.id.includes("invest")) {
    return "/aktsioneram";
  }
  if (/о банке|bank haqida|about/.test(label) || item.id.includes("about")) {
    return "/o-banke";
  }
  if (/частн|физ|jismoniy|private/.test(label) || item.id.includes("private")) {
    return "/";
  }
  return "#";
}

export default function Header({
  config,
  showProductNav = true,
  activeChipId,
  onChipSelect,
}: HeaderProps) {
  const { i18n } = useTranslation();
  const router = useRouter();
  const pathname = usePathname();
  const [activeNav, setActiveNav] = useState(config?.navItems?.[0]?.id || "");
  const [activeChip, setActiveChip] = useState(
    activeChipId || config?.chips?.[0]?.id || ""
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);

  const searchResults = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [];
    return SITE_SEARCH_INDEX.filter(
      (item) =>
        item.ru.toLowerCase().includes(q) ||
        item.uz.toLowerCase().includes(q) ||
        item.en.toLowerCase().includes(q) ||
        item.keywords.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [searchQuery]);

  useEffect(() => {
    if (activeChipId) setActiveChip(activeChipId);
  }, [activeChipId]);

  useEffect(() => {
    if (!megaOpen && !langOpen && !mobileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setLangOpen(false);
        setMobileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [megaOpen, langOpen, mobileOpen]);

  const currentLang =
    (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
    if (typeof window !== "undefined") {
      localStorage.setItem("app_lang", lang);
    }
    setLangOpen(false);
  };

  const navLabel = (label: string) => {
    const known = tr(currentLang, label.trim(), NAV_DICT);
    if (known !== label.trim()) return known;
    const l = label.toLowerCase();
    if (currentLang === "uz") {
      if (/частн|физ/.test(l)) return "Jismoniy shaxslarga";
      if (/корпоратив|бизнес/.test(l)) return "Korporativ mijozlarga";
      if (/акционер|инвестор/.test(l)) return "Aksiyador va investorlarga";
      if (/о банке/.test(l)) return "Bank haqida";
      if (/филиал/.test(l)) return "Filiallar";
      if (/продукт/.test(l)) return "Mahsulotlar";
      if (/тариф/.test(l)) return "Tariflar";
    }
    if (currentLang === "en") {
      if (/частн|физ/.test(l)) return "Private Clients";
      if (/корпоратив|бизнес/.test(l)) return "Corporate Clients";
      if (/акционер|инвестор/.test(l)) return "Shareholders & Investors";
      if (/о банке/.test(l)) return "About Bank";
      if (/филиал/.test(l)) return "Branches";
      if (/продукт/.test(l)) return "Products";
      if (/тариф/.test(l)) return "Tariffs";
    }
    return label;
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
                const targetHref = resolveNavHref(item);
                const isRouteActive =
                  targetHref !== "#" &&
                  (targetHref === "/"
                    ? pathname === "/"
                    : pathname?.startsWith(targetHref));
                const isActive = isRouteActive || (!pathname && activeNav === item.id);
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => {
                      setActiveNav(item.id);
                      if (targetHref && targetHref !== "#") {
                        router.push(targetHref);
                      }
                    }}
                    className={`inline-flex items-center gap-1 py-3.5 text-[12px] leading-5 tracking-[0.6px] uppercase whitespace-nowrap transition-colors cursor-pointer ${
                      isActive
                        ? "font-bold text-[#110C30]"
                        : "font-medium text-[rgba(17,12,48,0.5)] hover:text-[#110C30]"
                    }`}
                  >
                    {navLabel(item.label)}
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
                  {navLabel(link.label)}
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

            <div className="hidden sm:block">
              <AccessibilityMenu />
            </div>

            <Link
              href="/servisy#internet-bank"
              className="hidden sm:inline-flex items-center gap-2 text-[12px] font-medium leading-5 text-[#110C30] hover:text-[#2D68FF]"
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
              {currentLang === "uz"
                ? "Kirish"
                : currentLang === "en"
                  ? "Sign in"
                  : config?.loginButtonText || "Войти"}
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
          /* Figma Section: padding 12px 0 0 · Nav 1197×64 · gap 24 · radius 20 */
          <div className="flex w-full flex-col items-center justify-center pt-3">
            <div className="flex w-full max-w-[1197px] flex-col items-start p-3">
              <div
                className="flex h-16 w-full items-center gap-3 rounded-[20px] p-1.5 sm:gap-6"
                style={{ backgroundColor: "#EAEFF8" }}
              >
                <button
                  type="button"
                  aria-expanded={megaOpen}
                  aria-controls="site-mega-menu"
                  onClick={() => {
                    setLangOpen(false);
                    setMobileOpen(false);
                    setMegaOpen((v) => !v);
                  }}
                  className={`inline-flex h-12 w-[114px] shrink-0 cursor-pointer items-center justify-center gap-3 rounded-2xl px-4 text-[14px] font-semibold leading-[18px] tracking-[-0.2px] text-[#172419] ${
                    megaOpen
                      ? "bg-white shadow-[0_8px_24px_rgba(8,92,24,0.08)]"
                      : ""
                  }`}
                >
                  {megaOpen ? (
                    <X size={20} strokeWidth={2.2} className="text-black" />
                  ) : (
                    <Menu size={20} strokeWidth={2.2} className="text-black" />
                  )}
                  <span>{navLabel(config?.menuButtonText || "Меню")}</span>
                </button>

                <div
                  className="flex h-[52px] min-w-0 flex-1 snap-x items-center gap-4 overflow-x-auto rounded-2xl p-1 [scrollbar-width:none] sm:max-w-[492px] sm:flex-none [&::-webkit-scrollbar]:hidden"
                  style={{
                    background:
                      "linear-gradient(90deg, #BBD8F2 0%, #D4DFF7 50%, #FFFFFF 100%)",
                  }}
                >
                  {chips.map((chip) => {
                    const isActive = activeChip === chip.id;
                    return (
                      <button
                        key={chip.id}
                        type="button"
                        onClick={() => {
                          setActiveChip(chip.id);
                          const handled = onChipSelect?.(chip);
                          if (handled) return;
                          const section = resolveChipSection(chip);
                          if (section) {
                            router.push(sectionPath(section));
                          }
                        }}
                        className={`inline-flex h-11 shrink-0 cursor-pointer items-center justify-center rounded-xl px-4 text-[14px] font-semibold leading-[18px] tracking-[-0.2px] transition-all ${
                          isActive
                            ? "bg-white text-[#262626] shadow-[0_12px_64px_rgba(8,92,24,0.05),0_8px_32px_rgba(8,92,24,0.05)]"
                            : "bg-transparent text-[rgba(38,38,38,0.8)] hover:text-[#262626]"
                        }`}
                      >
                        {navLabel(chip.label)}
                      </button>
                    );
                  })}
                </div>

                <div className="relative hidden lg:block">
                  <label className="flex h-[50px] w-[261px] shrink-0 items-center gap-3 rounded-[14px] border border-[#E8EFEB] bg-[#F0F7FF] py-3 pl-4 pr-6">
                    <Search
                      size={24}
                      className="shrink-0 text-[#9AA6AE]"
                      strokeWidth={2.1}
                    />
                    <input
                      type="search"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      onFocus={() => setSearchFocused(true)}
                      onBlur={() => setTimeout(() => setSearchFocused(false), 180)}
                      placeholder={
                        currentLang === "uz"
                          ? "Bank sayti bo‘yicha qidiruv"
                          : currentLang === "en"
                            ? "Search bank website"
                            : "Поиск по сайту банка"
                      }
                      className="w-full min-w-0 bg-transparent text-[17px] font-medium leading-[22px] text-[#110C30] outline-none placeholder:text-[#9AA6AE]"
                    />
                  </label>
                  {searchFocused && searchQuery.trim().length > 0 && (
                    <div className="absolute right-0 top-full z-50 mt-2 w-[340px] rounded-2xl border border-[#E7EAF0] bg-white p-2 shadow-xl">
                      {searchResults.length > 0 ? (
                        searchResults.map((res) => (
                          <Link
                            key={res.href}
                            href={res.href}
                            onClick={() => {
                              setSearchQuery("");
                              setSearchFocused(false);
                            }}
                            className="block rounded-xl px-3.5 py-2.5 text-[14px] font-medium text-[#110C30] transition-colors hover:bg-[#F0F7FF] hover:text-[#2D68FF]"
                          >
                            {currentLang === "uz"
                              ? res.uz
                              : currentLang === "en"
                                ? res.en
                                : res.ru}
                          </Link>
                        ))
                      ) : (
                        <div className="px-3.5 py-3 text-[13px] text-[#6B7280]">
                          {currentLang === "uz"
                            ? "Hech narsa topilmadi"
                            : currentLang === "en"
                              ? "Nothing found"
                              : "Ничего не найдено"}
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <button
                  type="button"
                  aria-label={navLabel("Поиск")}
                  onClick={() => setMegaOpen(true)}
                  className="flex h-12 w-12 shrink-0 items-center justify-center text-[#172419] lg:hidden cursor-pointer"
                >
                  <Search size={20} strokeWidth={2.2} />
                </button>

                <Link
                  href="/servisy#internet-bank"
                  className="hidden h-[52px] w-[246px] shrink-0 items-center justify-center gap-2 rounded-[14px] py-3.5 pl-6 pr-4 text-[20px] font-medium leading-6 text-white shadow-[0_1px_12px_rgba(6,52,123,0.08)] md:inline-flex"
                  style={{
                    background:
                      "linear-gradient(100.51deg, #2D6EE3 -14.62%, #12388C 112.09%)",
                  }}
                >
                  <span className="whitespace-nowrap">
                    {currentLang === "uz"
                      ? "Onlayn banking"
                      : currentLang === "en"
                        ? "Online Banking"
                        : "Онлайн банкинг"}
                  </span>
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    aria-hidden
                  >
                    <rect
                      x="6.5"
                      y="3.5"
                      width="11"
                      height="17"
                      rx="2"
                      stroke="white"
                      strokeWidth="1.7"
                    />
                    <path
                      d="M11 17.5h2"
                      stroke="white"
                      strokeWidth="1.7"
                      strokeLinecap="round"
                    />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>

      <div id="site-mega-menu">
        <MegaMenu
          open={megaOpen}
          onClose={() => setMegaOpen(false)}
          logoSrc={config?.logo}
          phone={
            utilityLinks.find((l) => /^1287$/.test(l.label.trim()))?.label ||
            "1287"
          }
        />
      </div>

      {mobileOpen && (
        <div className="xl:hidden absolute inset-x-0 top-full bg-white border-t border-black/5 shadow-lg px-4 py-4 z-40">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={resolveNavHref(item)}
                className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-[#110C30]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
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
            <div className="my-2 border-t border-black/5 pt-2 sm:hidden">
              <button
                type="button"
                className="w-full rounded-lg px-3 py-2.5 text-left text-[14px] font-semibold text-[#110C30]"
                onClick={() => {
                  setMobileOpen(false);
                  setMegaOpen(true);
                }}
              >
                {navLabel(config?.menuButtonText || "Меню")}
              </button>
            </div>
            <Link
              href="/servisy#internet-bank"
              className="mt-1 rounded-lg bg-[#2D6EE3] px-3 py-2.5 text-center text-[14px] font-semibold text-white sm:hidden"
              onClick={() => setMobileOpen(false)}
            >
              {currentLang === "uz"
                ? "Kirish"
                : currentLang === "en"
                  ? "Sign in"
                  : config?.loginButtonText || "Войти"}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}