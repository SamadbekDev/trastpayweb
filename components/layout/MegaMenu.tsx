"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { MEGA_MENU_COLUMNS } from "@/data/megaMenu";
import { useSiteBranding } from "@/components/SiteBranding";

type MegaMenuProps = {
  open: boolean;
  onClose: () => void;
  logoSrc?: string;
  phone?: string;
};

const AUDIENCE_TABS = [
  { id: "individuals", label: "Физическим лицам" },
  { id: "corporate", label: "Корпоративным клиентам" },
  { id: "investors", label: "Акционерам и инвесторам" },
] as const;

export default function MegaMenu({
  open,
  onClose,
  logoSrc,
  phone = "1287",
}: MegaMenuProps) {
  const branding = useSiteBranding();
  const [audience, setAudience] = useState<(typeof AUDIENCE_TABS)[number]["id"]>(
    "individuals"
  );
  const mark = logoSrc?.trim() || branding.logo || "/logo.svg";

  return (
    <AnimatePresence>
      {open ? (
        <>
          <motion.button
            key="mega-backdrop"
            type="button"
            aria-label="Закрыть меню"
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
                "Навигация"
              }
              className="pointer-events-auto flex w-full max-w-[1320px] flex-col gap-6 rounded-[40px] bg-white px-6 pb-8 pt-6 shadow-[0_24px_80px_rgba(17,12,48,0.18)] sm:px-8"
              initial={{ opacity: 0, y: -18, scale: 0.985 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -12, scale: 0.99 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Top bar — Figma Nav */}
              <div className="flex w-full flex-col gap-2.5 py-3">
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
                          className={`inline-flex h-11 shrink-0 cursor-pointer items-center justify-center rounded-xl px-2 text-[13px] font-semibold leading-[18px] tracking-[-0.2px] sm:px-2 sm:text-[14px] ${
                            active
                              ? "text-[#262626]"
                              : "text-[rgba(38,38,38,0.6)] hover:text-[#262626]"
                          }`}
                        >
                          {tab.label}
                        </button>
                      );
                    })}
                  </div>

                  <label className="flex h-[50px] w-full max-w-[160px] shrink-0 items-center gap-3 rounded-[14px] border border-[#E8EFEB] bg-[#F0F7FF] px-4 sm:w-[144px]">
                    <Search size={20} className="shrink-0 text-[#9AA6AE]" strokeWidth={2.2} />
                    <input
                      type="search"
                      placeholder="Поиск"
                      className="w-full min-w-0 bg-transparent text-[17px] font-medium leading-[22px] text-[#110C30] outline-none placeholder:text-[#9AA6AE]"
                    />
                  </label>

                  <Link
                    href="#"
                    className="inline-flex h-[52px] min-w-0 flex-1 items-center justify-center gap-2 rounded-[14px] px-4 text-[16px] font-medium leading-6 text-white shadow-[0_1px_12px_rgba(6,52,123,0.08)] sm:gap-2 sm:px-6 sm:text-[20px] lg:min-w-[220px] lg:flex-none"
                    style={{
                      background:
                        "linear-gradient(100.51deg, #2D6EE3 -14.62%, #12388C 112.09%)",
                    }}
                  >
                    <span className="truncate">Онлайн банкинг</span>
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
                    aria-label="Закрыть"
                    onClick={onClose}
                    className="ml-auto flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[#110C30] hover:bg-[#F2F4F7] lg:ml-0"
                  >
                    <X size={28} strokeWidth={1.8} />
                  </button>
                </div>
              </div>

              {/* Columns */}
              <motion.div
                className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-3 xl:grid-cols-6"
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06, duration: 0.24, ease: "easeOut" }}
              >
                {MEGA_MENU_COLUMNS.map((column, columnIndex) => (
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
                      {column.title}
                    </h3>
                    <ul className="flex flex-col gap-3">
                      {column.links.map((link) => (
                        <li key={`${column.id}-${link.label}`}>
                          <Link
                            href={link.href}
                            onClick={onClose}
                            className="block text-[14px] font-medium leading-[18px] text-[#7B8088] transition-colors hover:text-[#2D6EE3]"
                          >
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </motion.div>
                ))}
              </motion.div>
            </motion.nav>
          </div>
        </>
      ) : null}
    </AnimatePresence>
  );
}
