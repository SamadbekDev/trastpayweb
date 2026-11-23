"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import BrandLogo from "@/components/BrandLogo";
import HeaderUtilities from "@/components/layout/HeaderUtilities";
import { isMoreNavItem, MobileSiteMenu, SiteMenuNavExtras } from "@/components/layout/HeaderSiteMenu";
import { CardsPageHeader } from "@/types/cards";
import { Language } from "@/types/pageConfig";

interface CardsHeaderProps {
  config: CardsPageHeader;
}

export default function CardsHeader({ config }: CardsHeaderProps) {
  const { i18n } = useTranslation();
  const currentLang =
    (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const [activeNav, setActiveNav] = useState(config.navItems[0]?.id || "");
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    if (!mobileOpen) return;
    const prevBody = document.body.style.overflow;
    const prevHtml = document.documentElement.style.overflow;
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = prevBody;
      document.documentElement.style.overflow = prevHtml;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [mobileOpen]);

  return (
    <header
      data-site-header
      className={`z-50 w-full bg-[#FAFAFA] ${mobileOpen ? "sticky top-0" : "relative"}`}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-3 px-4 xl:px-10 desk:px-[120px]">
        <div className="flex min-w-0 items-center gap-4">
          <BrandLogo
            src={config.logo}
            alt={config.logoText || "TRASTBANK"}
            priority
          />

          <nav className="hidden items-center gap-4 xl:flex">
            {config.navItems.filter((item) => !isMoreNavItem(item)).map((item) => {
              const isActive = activeNav === item.id;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setActiveNav(item.id)}
                  className={`inline-flex items-center py-3.5 text-[12px] leading-5 tracking-[0.6px] uppercase whitespace-nowrap transition-colors ${
                    isActive
                      ? "font-bold text-[#110C30]"
                      : "font-medium text-[rgba(17,12,48,0.5)] hover:text-[#110C30]"
                  }`}
                >
                  <span className="bold-stable" data-text={item.label}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
            <SiteMenuNavExtras />
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <HeaderUtilities onBeforeOpenModal={() => setMobileOpen(false)} />

          <Link
            href={config.becomeClientHref || "#"}
            className="hidden h-11 items-center rounded-xl bg-[#E7E8EA] px-4 text-[14px] font-semibold leading-[18px] text-[#110C30] desk:inline-flex"
          >
            {config.becomeClientText}
          </Link>

          <Link
            href={config.loginHref || "#"}
            className="hidden h-11 items-center gap-2 rounded-xl bg-[#2D6EE3] px-4 text-[12px] font-medium leading-5 text-white sm:inline-flex"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"
                fill="white"
              />
              <path d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1Z" fill="white" />
            </svg>
            {config.loginButtonText}
          </Link>

          <button
            type="button"
            className="flex h-11 w-11 cursor-pointer items-center justify-center rounded-xl bg-[#E7E8EA] xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Меню"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-slate-200 bg-white px-4 py-4 pb-8 xl:hidden">
          <nav className="flex flex-col gap-2">
            {config.navItems.filter((item) => !isMoreNavItem(item)).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => {
                  setActiveNav(item.id);
                  setMobileOpen(false);
                }}
                className="rounded-lg px-3 py-2.5 text-[14px] font-semibold uppercase tracking-[0.6px] text-[#110C30]"
              >
                {item.label}
              </Link>
            ))}
            <MobileSiteMenu onNavigate={() => setMobileOpen(false)} />
            <div className="my-1 flex flex-col gap-1 border-t border-slate-200 pt-2 lg:hidden">
              <Link
                href="/filialy"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-[14px] font-semibold text-[#110C30]"
              >
                {currentLang === "uz"
                  ? "Filiallar"
                  : currentLang === "en"
                    ? "Branches"
                    : "Филиалы"}
              </Link>
              <Link
                href="tel:1287"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg px-3 py-2 text-[14px] font-semibold text-[#110C30]"
              >
                1287
              </Link>
            </div>
            <Link
              href={config.becomeClientHref || "#"}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-[#110C30]"
            >
              {config.becomeClientText}
            </Link>
            <Link
              href={config.loginHref || "#"}
              onClick={() => setMobileOpen(false)}
              className="rounded-lg bg-[#2D6EE3] px-3 py-2.5 text-center text-[14px] font-semibold text-white"
            >
              {config.loginButtonText}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
