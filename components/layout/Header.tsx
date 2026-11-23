"use client";

import { useEffect, useState } from "react";
import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ChevronDown, Menu, Search, User, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { tr } from "@/i18n/tr";
import { NAV_DICT } from "@/i18n/dict/nav";
import BrandLogo from "@/components/BrandLogo";
import MegaMenu from "@/components/layout/MegaMenu";
import SearchModal from "@/components/layout/SearchModal";
import AccessibilityMenu from "@/components/layout/AccessibilityMenu";
import { isMoreNavItem, MobileSiteMenu, SiteMenuNavExtras } from "@/components/layout/HeaderSiteMenu";
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
  const [mobilePillOpen, setMobilePillOpen] = useState(false);
  const [mobileProfileOpen, setMobileProfileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

  useEffect(() => {
    if (activeChipId) setActiveChip(activeChipId);
  }, [activeChipId]);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
    };
  }, [mobileOpen]);

  useEffect(() => {
    if (!megaOpen && !langOpen && !mobileOpen && !mobilePillOpen && !mobileProfileOpen) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setMegaOpen(false);
        setLangOpen(false);
        setMobileOpen(false);
        setMobilePillOpen(false);
        setMobileProfileOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [megaOpen, langOpen, mobileOpen, mobilePillOpen, mobileProfileOpen]);

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

  // «О банке ▾» (old site top menu) is added in front of «Еще» from the CMS, which opens the list of
  // the old site's other sections with «Продажа имущества» first (both do not fit the top row together).
  const allNavItems = config?.navItems || [];
  const moreItem = allNavItems.find(isMoreNavItem);
  const navItems = allNavItems.filter((item) => !isMoreNavItem(item) && resolveNavHref(item) !== "/o-banke");
  const utilityLinks = (config?.utilityLinks || []).map((link) => ({
    ...link,
    href: resolveUtilityHref(link),
  }));
  const chips = (config?.chips || []).filter(
    (chip) => !/семь|oila|family|премиум|premium/i.test(`${chip.label} ${chip.id}`)
  );

  return (
    <header
      data-site-header
      className={`w-full bg-[#FAFAFA] z-50 ${mobileOpen ? "sticky top-0" : "relative"}`}
    >
      <div className="mx-auto w-full max-w-[1440px] px-4 md:px-8 xl:px-20 desk:px-[140px]">
        {/* Mobile Sberbank-style header (< md) */}
        <div className="flex flex-col pb-2 pt-2 md:hidden">
          <div className="flex items-center justify-between px-1 pb-2">
            <div className="flex items-center gap-3">
              {utilityLinks
                .filter((l) => !/^1287$/.test(l.label.trim()))
                .slice(0, 1)
                .map((link) => (
                  <Link
                    key={link.id}
                    href={link.href}
                    className="text-[11px] font-semibold uppercase tracking-[0.6px] text-[#5B6472]"
                  >
                    {navLabel(link.label)}
                  </Link>
                ))}
            </div>

            <div className="flex items-center gap-2">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => {
                    setMobilePillOpen(false);
                    setLangOpen((v) => !v);
                  }}
                  className="flex h-8 items-center px-1.5 text-[12px] font-bold uppercase tracking-[0.6px] text-[#110C30] cursor-pointer"
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
              <AccessibilityMenu />
            </div>
          </div>

          <div className="relative flex h-[56px] w-full items-center gap-1.5 rounded-[20px] bg-white p-1.5 shadow-[0_4px_20px_rgba(17,12,48,0.08)]">
            <Link
              href="/"
              className="inline-flex h-11 shrink-0 items-center gap-2 rounded-[14px] px-3 shadow-[0_2px_10px_rgba(18,56,140,0.18)]"
              style={{
                background:
                  "linear-gradient(100.51deg, #2D6EE3 -14.62%, #12388C 112.09%)",
              }}
            >
              <span className="relative h-[16px] w-[38px] shrink-0">
                <Image
                  src={config?.logo?.trim() || "/logo.svg"}
                  alt={config?.logoText || "TRASTBANK"}
                  fill
                  unoptimized
                  className="object-contain object-left brightness-0 invert"
                />
              </span>
              <span className="h-4 w-px rounded-sm bg-white/50" />
              <span className="text-[14px] font-semibold leading-5 text-white">
                {utilityLinks.find((l) => /^1287$/.test(l.label.trim()))?.label || "1287"}
              </span>
            </Link>

            <button
              type="button"
              aria-expanded={mobilePillOpen}
              onClick={() => {
                setLangOpen(false);
                setMobileProfileOpen(false);
                setMobilePillOpen((v) => !v);
              }}
              className="flex h-11 min-w-0 flex-1 cursor-pointer items-center justify-between gap-1.5 rounded-[14px] px-3 text-left text-[14px] font-medium text-[#110C30] hover:bg-[#F4F6FA]"
            >
              <span className="truncate">
                {(() => {
                  const activeChipObj = chips.find((c) => c.id === activeChip) ?? chips[0];
                  if (activeChipObj) return navLabel(activeChipObj.label);
                  return currentLang === "uz"
                    ? "Barchasi"
                    : currentLang === "en"
                      ? "For everyone"
                      : "Для всех";
                })()}
              </span>
              <ChevronDown
                size={16}
                className={`shrink-0 text-[#5B6472] transition-transform duration-200 ${
                  mobilePillOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <button
              type="button"
              aria-expanded={mobileProfileOpen}
              aria-label={
                currentLang === "uz"
                  ? "Kirish"
                  : currentLang === "en"
                    ? "Sign in"
                    : config?.loginButtonText || "Войти"
              }
              onClick={() => {
                setLangOpen(false);
                setMobilePillOpen(false);
                setMobileProfileOpen((v) => !v);
              }}
              className={`flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-[14px] transition-colors ${
                mobileProfileOpen
                  ? "bg-[#E6F0FF] text-[#2D6EE3]"
                  : "bg-[#F4F6FA] text-[#110C30] hover:bg-[#EAEFF8]"
              }`}
            >
              <User size={18} strokeWidth={2} />
            </button>

            <button
              type="button"
              aria-label={navLabel(config?.menuButtonText || "Меню")}
              onClick={() => {
                setMobilePillOpen(false);
                setMobileProfileOpen(false);
                setLangOpen(false);
                setMegaOpen(true);
              }}
              className="relative flex h-11 w-11 shrink-0 cursor-pointer items-center justify-center rounded-[14px] text-[#110C30] hover:bg-[#F4F6FA]"
            >
              <Menu size={20} strokeWidth={2} />
              <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#2D6EE3]" />
            </button>

            {mobileProfileOpen && (
              <div className="absolute inset-x-0 top-full z-50 mt-2.5 overflow-hidden rounded-[24px] border border-black/5 bg-white p-5 shadow-[0_14px_36px_rgba(17,12,48,0.14)]">
                <button
                  type="button"
                  aria-label={navLabel("Закрыть")}
                  onClick={() => setMobileProfileOpen(false)}
                  className="absolute right-3.5 top-3.5 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-[#8B95A5] hover:bg-[#F4F6FA] hover:text-[#110C30]"
                >
                  <X size={18} strokeWidth={2} />
                </button>

                <div className="flex items-center justify-between gap-4 pr-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[20px] font-bold leading-6 text-[#110C30]">
                      {currentLang === "uz"
                        ? "Assalomu alaykum!"
                        : currentLang === "en"
                          ? "Hello!"
                          : "Здравствуйте!"}
                    </h3>
                    <p className="text-[14px] font-normal leading-[19px] text-[#4B5563]">
                      {currentLang === "uz"
                        ? "Hisoblar, kartalar, omonatlar va o‘tkazmalarni boshqarish uchun Trastbank onlayn-banking tizimiga kiring"
                        : currentLang === "en"
                          ? "Sign in to Trastbank Online Banking to manage your accounts, cards, deposits, and transfers"
                          : "Авторизуйтесь в Trastbank Онлайн, чтобы управлять счетами, картами, вкладами и переводами"}
                    </p>
                    <Link
                      href="/servisy#internet-bank"
                      onClick={() => setMobileProfileOpen(false)}
                      className="mt-1 inline-flex items-center gap-1 text-[14px] font-semibold text-[#2D6EE3] hover:text-[#12388C]"
                    >
                      <span>
                        {currentLang === "uz"
                          ? "Trastbankga kirish ›"
                          : currentLang === "en"
                            ? "Sign in to Trastbank ›"
                            : "Войти в Trastbank ›"}
                      </span>
                    </Link>
                  </div>

                  <div
                    className="hidden h-20 w-20 shrink-0 items-center justify-center rounded-2xl min-[360px]:flex"
                    style={{
                      background:
                        "linear-gradient(135deg, #EAF2FF 0%, #D6E6FF 100%)",
                    }}
                  >
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-white shadow-[0_6px_16px_rgba(45,110,227,0.28)]"
                      style={{
                        background:
                          "linear-gradient(100.51deg, #2D6EE3 -14.62%, #12388C 112.09%)",
                      }}
                    >
                      <User size={24} strokeWidth={2} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            {mobilePillOpen && (
              <div className="absolute inset-x-0 top-full z-50 mt-2 rounded-2xl border border-black/5 bg-white p-2 shadow-[0_14px_36px_rgba(17,12,48,0.16)]">
                {chips.map((chip) => {
                  const isActive = activeChip === chip.id;
                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => {
                        setActiveChip(chip.id);
                        setMobilePillOpen(false);
                        const handled = onChipSelect?.(chip);
                        if (handled) return;
                        const section = resolveChipSection(chip);
                        if (section) router.push(sectionPath(section));
                      }}
                      className={`flex w-full cursor-pointer items-center rounded-xl px-3.5 py-2.5 text-left text-[15px] font-medium transition-colors ${
                        isActive
                          ? "bg-[#F0F7FF] font-semibold text-[#2D6EE3]"
                          : "text-[#110C30] hover:bg-[#F4F6FA]"
                      }`}
                    >
                      {navLabel(chip.label)}
                    </button>
                  );
                })}
                {navItems.length > 0 && (
                  <div className="my-1.5 border-t border-black/5 pt-1.5">
                    {navItems.map((item) => {
                      const targetHref = resolveNavHref(item);
                      return (
                        <button
                          key={item.id}
                          type="button"
                          onClick={() => {
                            setActiveNav(item.id);
                            setMobilePillOpen(false);
                            if (targetHref && targetHref !== "#") {
                              router.push(targetHref);
                            }
                          }}
                          className="flex w-full cursor-pointer items-center rounded-xl px-3.5 py-2.5 text-left text-[15px] font-medium text-[#110C30] hover:bg-[#F4F6FA]"
                        >
                          {navLabel(item.label)}
                        </button>
                      );
                    })}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Top bar — Figma: 8px 140px */}
        <div className="hidden h-16 items-center justify-between gap-4 md:flex">
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
                    <span className="bold-stable" data-text={navLabel(item.label)}>
                      {navLabel(item.label)}
                    </span>
                  </button>
                );
              })}
              <SiteMenuNavExtras moreLabel={moreItem ? navLabel(moreItem.label) : undefined} />
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

            <AccessibilityMenu />

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
          <div className="hidden w-full flex-col items-center justify-center pt-3 md:flex">
            <div className="flex w-full max-w-[1197px] flex-col items-start p-3">
              <div
                className="flex h-16 w-full min-w-0 items-center gap-3 rounded-[20px] p-1.5 lg:gap-4 desk:gap-6"
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
                  className="flex h-[52px] min-w-0 flex-1 sm:flex-auto snap-x items-center gap-4 overflow-x-auto rounded-2xl p-1 [scrollbar-width:none] sm:max-w-[492px] [&::-webkit-scrollbar]:hidden"
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

                <div className="relative hidden min-w-[180px] max-w-[261px] flex-1 desk:block">
                  <button
                    type="button"
                    onClick={() => {
                      setMegaOpen(false);
                      setLangOpen(false);
                      setSearchModalOpen(true);
                    }}
                    className="flex h-[50px] w-full cursor-pointer items-center justify-between gap-3 rounded-[14px] border border-[#E8EFEB] bg-[#F0F7FF] py-3 pl-4 pr-4 text-left transition-colors hover:bg-[#E6F1FF]"
                  >
                    <span className="truncate text-[16px] font-medium leading-[22px] text-[#9AA6AE]">
                      {currentLang === "uz"
                        ? "Bank sayti bo‘yicha qidiruv"
                        : currentLang === "en"
                          ? "Search bank website"
                          : "Поиск по сайту банка"}
                    </span>
                    <Search
                      size={20}
                      className="shrink-0 text-[#110C30]"
                      strokeWidth={2.1}
                    />
                  </button>
                </div>

                <button
                  type="button"
                  aria-label={navLabel("Поиск")}
                  onClick={() => {
                    setMegaOpen(false);
                    setLangOpen(false);
                    setSearchModalOpen(true);
                  }}
                  className="flex h-12 w-12 shrink-0 items-center justify-center text-[#172419] desk:hidden cursor-pointer"
                >
                  <Search size={20} strokeWidth={2.2} />
                </button>

                <Link
                  href="/servisy#internet-bank"
                  className="hidden h-[52px] shrink-0 items-center justify-center gap-2 rounded-[14px] py-3.5 pl-5 pr-4 text-[16px] font-medium md:inline-flex xl:w-[246px] xl:pl-6 xl:text-[20px] leading-6 text-white shadow-[0_1px_12px_rgba(6,52,123,0.08)] md:ml-auto"
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

      <SearchModal
        open={searchModalOpen}
        lang={currentLang}
        onClose={() => setSearchModalOpen(false)}
      />

      {mobileOpen && (
        <div className="xl:hidden fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain bg-white border-t border-black/5 px-4 py-4 pb-8">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <Link
                key={item.id}
                href={resolveNavHref(item)}
                className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-[#110C30]"
                onClick={() => setMobileOpen(false)}
              >
                {navLabel(item.label)}
              </Link>
            ))}
            <MobileSiteMenu lang={currentLang} onNavigate={() => setMobileOpen(false)} />
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