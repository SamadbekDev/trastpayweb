"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import {
  CORPORATE_MEGA_MENU_COLUMNS,
  INVESTORS_MEGA_MENU_COLUMNS,
  MEGA_MENU_COLUMNS,
} from "@/data/megaMenu";
import { useSiteBranding } from "@/components/SiteBranding";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/i18n/tr";
import { NAV_DICT } from "@/i18n/dict/nav";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  logoSrc?: string;
  phone?: string;
};

const AUDIENCE_TABS = [
  { id: "individuals", label: "Физическим лицам", labelUz: "Jismoniy shaxslarga", labelEn: "Private Clients" },
  { id: "corporate", label: "Корпоративным клиентам", labelUz: "Korporativ mijozlarga", labelEn: "Corporate Clients" },
  { id: "investors", label: "Акционерам и инвесторам", labelUz: "Aksiyador va investorlarga", labelEn: "Shareholders & Investors" },
] as const;

export default function MegaMenu({
  open,
  onClose,
  logoSrc,
  phone = "1287",
}: MegaMenuProps) {
  const branding = useSiteBranding();
  const lang = useLang();
  const t = (s: string) => tr(lang, s, NAV_DICT);
  const pathname = usePathname();
  const [audience, setAudience] = useState<(typeof AUDIENCE_TABS)[number]["id"]>(
    "individuals"
  );
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      if (pathname?.startsWith("/biznes")) {
        setAudience("corporate");
      } else if (pathname?.startsWith("/aktsioneram")) {
        setAudience("investors");
      } else {
        setAudience("individuals");
      }
    } else {
      setSearchOpen(false);
      setSearchQuery("");
    }
  }, [open, pathname]);

  useEffect(() => {
    if (searchOpen) {
      const id = requestAnimationFrame(() => searchInputRef.current?.focus());
      return () => cancelAnimationFrame(id);
    }
    setSearchQuery("");
  }, [searchOpen]);

  const mark = logoSrc?.trim() || branding.logo || "/logo.svg";
  const columns =
    audience === "corporate"
      ? CORPORATE_MEGA_MENU_COLUMNS
      : audience === "investors"
        ? INVESTORS_MEGA_MENU_COLUMNS
        : MEGA_MENU_COLUMNS;

  const filteredColumns = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return columns;
    return columns
      .map((col) => {
        const colTitle = tr(lang, col.title, NAV_DICT);
        const titleMatches = colTitle.toLowerCase().includes(q);
        const matchingLinks = titleMatches
          ? col.links
          : col.links.filter((link) => {
              const linkLabel = tr(lang, link.label, NAV_DICT);
              return linkLabel.toLowerCase().includes(q);
            });
        return { ...col, links: matchingLinks };
      })
      .filter((col) => col.links.length > 0);
  }, [columns, searchQuery, lang]);

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            key="mega-backdrop"
            type="button"
            aria-label={t("Закрыть меню")}
            className="fixed inset-0 z-40 cursor-default bg-black/25"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            onClick={onClose}
          />

          <div className="pointer-events-none absolute inset-x-0 top-2 z-50 flex justify-center px-4 lg:top-2.5 lg:px-[60px]">
            <motion.nav
              key="mega-panel"
              aria-label={
                AUDIENCE_TABS.find((t) => t.id === audience)?.label ||
                t("Навигация")
              }
              className="pointer-events-auto flex w-full max-w-[1320px] flex-col gap-6 rounded-[40px] bg-white px-6 pb-8 pt-6 shadow-[0_24px_80px_rgba(17,12,48,0.18)] sm:px-8"
              initial={{ opacity: 0, y: -18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top bar — Figma Nav */}
              <div className="flex w-full flex-col py-3">
                <div className="flex w-full flex-wrap items-center gap-2 rounded-[20px] bg-white p-1.5 shadow-[0_0_24px_rgba(6,52,123,0.12)] sm:gap-3 sm:px-2 sm:py-1.5 lg:flex-nowrap">
                  <Link
                    href="tel:1287"
                    className="inline-flex h-[52px] shrink-0 items-center gap-3 rounded-[14px] px-[18px] sm:px-[30px]"
                    style={{
                      background:
                        "linear-gradient(100.51deg, #2D6EE3 -14.62%, #12388C 112.09%)",
                    }}
                  >
                    <span className="relative h-[22px] w-[50px] shrink-0">
                      <Image
                        src={mark}
                        alt="TRASTBANK"
                        fill
                        unoptimized
                        className="object-contain object-left brightness-0 invert"
                      />
                    </span>
                    <span className="h-6 w-px rounded-sm bg-white/55" />
                    <span className="text-xl font-medium leading-6 text-white">
                      {phone}
                    </span>
                  </Link>

                  <div className="order-3 flex w-full min-w-0 flex-1 items-center justify-start gap-1 overflow-x-auto lg:order-none lg:w-auto">
                    {AUDIENCE_TABS.map((tab) => {
                      const active = audience === tab.id;
                      return (
                        <button
                          key={tab.id}
                          type="button"
                          onClick={() => setAudience(tab.id)}
                          className={`inline-flex h-11 shrink-0 cursor-pointer items-center justify-center rounded-xl px-3 text-[13px] font-semibold leading-[18px] tracking-[-0.2px] transition-colors sm:px-3.5 sm:text-[14px] ${
                            active
                              ? "bg-[#F0F7FF] text-[#2D6EE3]"
                              : "text-[rgba(38,38,38,0.6)] hover:bg-[#F8FAFC] hover:text-[#262626]"
                          }`}
                        >
                          {lang === "uz" ? tab.labelUz : lang === "en" ? tab.labelEn : tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    type="button"
                    aria-label={t("Поиск")}
                    aria-expanded={searchOpen}
                    onClick={() => setSearchOpen((v) => !v)}
                    className={`flex h-[50px] w-[50px] shrink-0 cursor-pointer items-center justify-center rounded-[14px] border transition-colors ${
                      searchOpen
                        ? "border-[#2D6EE3]/30 bg-[#E6F0FF] text-[#2D6EE3]"
                        : "border-[#E8EFEB] bg-[#F0F7FF] text-[#110C30] hover:bg-[#E4F0FF]"
                    }`}
                  >
                    <Search size={20} strokeWidth={2} />
                  </button>

                  <Link
                    href="/servisy#internet-bank"
                    onClick={onClose}
                    className="inline-flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 rounded-[14px] px-4 text-[16px] font-medium leading-6 text-white shadow-[0_1px_12px_rgba(6,52,123,0.08)] sm:gap-2 sm:px-6 sm:text-[20px] lg:min-w-[220px] lg:flex-none"
                    style={{
                      background:
                        "linear-gradient(100.51deg, #2D6EE3 -14.62%, #12388C 112.09%)",
                    }}
                  >
                    <span className="truncate">
                      {lang === "uz"
                        ? "Onlayn banking"
                        : lang === "en"
                          ? "Online Banking"
                          : "Онлайн банкинг"}
                    </span>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
                      <rect
                        x="6.5"
                        y="3.5"
                        width="11"
                        height="17"
                        rx="2"
                        stroke="white"
                        strokeWidth="1.7"
                      />
                      <path d="M11 17.5h2" stroke="white" strokeWidth="1.7" strokeLinecap="round" />
                    </svg>
                  </Link>

                  <button
                    type="button"
                    aria-label={t("Закрыть")}
                    onClick={onClose}
                    className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#110C30] hover:bg-[#F2F4F7] lg:ml-0"
                  >
                    <X size={28} strokeWidth={1.8} />
                  </button>
                </div>

                <AnimatePresence initial={false}>
                  {searchOpen ? (
                    <motion.div
                      key="mega-search-bar"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 62, opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="pt-3.5">
                        <label className="flex h-[48px] w-full items-center gap-3 rounded-[14px] border border-[#E2E8F0] bg-[#F8FAFC] px-4 transition-colors focus-within:border-[#2D6EE3] focus-within:bg-white">
                          <Search
                            size={18}
                            className="shrink-0 text-[#9AA6AE]"
                            strokeWidth={1.8}
                          />
                          <input
                            ref={searchInputRef}
                            type="search"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder={
                              lang === "uz"
                                ? "Bo‘limlar bo‘yicha qidiruv..."
                                : lang === "en"
                                  ? "Search sections..."
                                  : "Поиск по разделам..."
                            }
                            className="w-full min-w-0 bg-transparent text-[15px] font-normal leading-[20px] text-[#110C30] outline-none placeholder:font-normal placeholder:text-[#9AA6AE]"
                          />
                          {searchQuery ? (
                            <button
                              type="button"
                              aria-label={t("Очистить поиск")}
                              onClick={() => {
                                setSearchQuery("");
                                searchInputRef.current?.focus();
                              }}
                              className="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-lg text-[#9AA6AE] hover:bg-[#EAEFF8] hover:text-[#110C30]"
                            >
                              <X size={16} strokeWidth={2} />
                            </button>
                          ) : null}
                        </label>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>

              {/* Columns */}
              <motion.div
                key={audience}
                className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 xl:grid-cols-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.24, ease: "easeOut" }}
              >
                {filteredColumns.length > 0 ? (
                  filteredColumns.map((column, columnIndex) => (
                    <motion.div
                      key={column.id}
                      className="flex w-full max-w-[184px] flex-col gap-3"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        delay: 0.08 + columnIndex * 0.03,
                        duration: 0.22,
                        ease: "easeOut",
                      }}
                    >
                      <h3 className="text-base font-bold leading-5 text-[#1A1A1A]">
                        {t(column.title)}
                      </h3>
                      <ul className="flex flex-col gap-3">
                        {column.links.map((link) => (
                          <li key={`${column.id}-${link.label}`}>
                            <Link
                              href={link.href}
                              onClick={onClose}
                              className="block text-[14px] font-medium leading-[18px] text-[#7B8088] transition-colors hover:text-[#2D6EE3]"
                            >
                              {t(link.label)}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </motion.div>
                  ))
                ) : (
                  <p className="col-span-full py-6 text-center text-[15px] font-normal text-[#7B8088]">
                    {lang === "uz"
                      ? `«${searchQuery.trim()}» so‘rovi bo‘yicha hech narsa topilmadi`
                      : lang === "en"
                        ? `Nothing found for «${searchQuery.trim()}»`
                        : `По запросу «${searchQuery.trim()}» ничего не найдено`}
                  </p>
                )}
              </motion.div>
            </motion.nav>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
