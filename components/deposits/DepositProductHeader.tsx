"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useTranslation } from "react-i18next";
import { tr } from "@/i18n/tr";
import { NAV_DICT } from "@/i18n/dict/nav";
import BrandLogo from "@/components/BrandLogo";
import HeaderUtilities from "@/components/layout/HeaderUtilities";
import { isMoreNavItem, MobileSiteMenu, SiteMenuNavExtras } from "@/components/layout/HeaderSiteMenu";
import { Language, NavItem } from "@/types/pageConfig";
import { DepositsPageConfig } from "@/types/deposits";

type HeaderConfig = DepositsPageConfig["header"];

const DEFAULT_HEADER: HeaderConfig = {
  logo: "/logo.svg",
  logoText: "TRASTBANK",
  navItems: [
    { id: "nav-1", label: "Физическим лицам", href: "/" },
    { id: "nav-2", label: "Корпоративным клиентам", href: "/biznes" },
    { id: "nav-3", label: "Акционерам и инвесторам", href: "/aktsioneram" },
    { id: "nav-4", label: "Еще", href: "/karta-sajta" },
  ],
  becomeClientText: "Стать клиентом",
  becomeClientHref: "/zayavki",
  loginButtonText: "Войти",
  loginHref: "/servisy#internet-bank",
};

interface DepositProductHeaderProps {
  header?: HeaderConfig;
}

export default function DepositProductHeader({
  header,
}: DepositProductHeaderProps) {
  const { i18n } = useTranslation();
  const pathname = usePathname();
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
  const currentLang =
    (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const config = header || DEFAULT_HEADER;
  const navItems: NavItem[] = config.navItems || DEFAULT_HEADER.navItems;

  const isNavActive = (href: string) => {
    if (href === "/") {
      return pathname === "/" || pathname.startsWith("/vklady");
    }
    if (href === "#") return false;
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      data-site-header
      className={`z-50 w-full bg-[#FAFAFA] ${mobileOpen ? "sticky top-0" : "relative"}`}
    >
      <div className="mx-auto flex h-[82px] w-full max-w-[1440px] items-center justify-between gap-4 px-5 xl:px-10 min-[1400px]:px-[132px]">
        <div className="flex min-w-0 items-center gap-4">
          <BrandLogo
            src={config.logo}
            alt={config.logoText || "TRASTBANK"}
            priority
          />

          <nav className="hidden items-center gap-4 xl:flex">
            {navItems.filter((item) => !isMoreNavItem(item)).map((item) => {
              const isActive = isNavActive(item.href);
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`inline-flex items-center py-3.5 text-[12px] leading-5 tracking-[0.6px] uppercase whitespace-nowrap transition-colors ${
                    isActive
                      ? "font-bold text-[#110C30]"
                      : "font-medium text-[rgba(17,12,48,0.5)] hover:text-[#110C30]"
                  }`}
                >
                  <span className="bold-stable" data-text={tr(currentLang, item.label, NAV_DICT)}>
                    {tr(currentLang, item.label, NAV_DICT)}
                  </span>
                </Link>
              );
            })}
            <SiteMenuNavExtras />
          </nav>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <HeaderUtilities onBeforeOpenModal={() => setMobileOpen(false)} />

          <Link
            href={config.loginHref || "#"}
            className="hidden items-center gap-2 py-3.5 text-[12px] font-medium text-[#110C30] sm:inline-flex"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <rect
                x="3"
                y="4"
                width="18"
                height="16"
                rx="3"
                stroke="#110C30"
                strokeWidth="1.6"
              />
              <circle cx="12" cy="10" r="2.2" stroke="#110C30" strokeWidth="1.6" />
              <path
                d="M7.5 17c.8-1.6 2.5-2.5 4.5-2.5s3.7.9 4.5 2.5"
                stroke="#110C30"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
            {config.loginButtonText ||
              (currentLang === "uz"
                ? "Kirish"
                : currentLang === "en"
                  ? "Sign in"
                  : "Войти")}
          </Link>

          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#1E1E20] cursor-pointer xl:hidden"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="fixed inset-x-0 top-[82px] bottom-0 z-40 overflow-y-auto overscroll-contain border-t border-black/5 bg-white px-5 py-4 pb-8 xl:hidden">
          <nav className="flex flex-col gap-3">
            {navItems.filter((item) => !isMoreNavItem(item)).map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="py-1 text-[14px] font-semibold text-[#110C30]"
                onClick={() => setMobileOpen(false)}
              >
                {tr(currentLang, item.label, NAV_DICT)}
              </Link>
            ))}
            <MobileSiteMenu onNavigate={() => setMobileOpen(false)} />
            <Link
              href="/vklady"
              className="py-1 text-[14px] font-semibold text-[#110C30]"
              onClick={() => setMobileOpen(false)}
            >
              {currentLang === "uz"
                ? "Omonatlar"
                : currentLang === "en"
                  ? "Deposits"
                  : "Вклады"}
            </Link>
            <Link
              href="/filialy"
              className="py-1 text-[14px] font-semibold text-[#110C30]"
              onClick={() => setMobileOpen(false)}
            >
              {currentLang === "uz"
                ? "Filiallar"
                : currentLang === "en"
                  ? "Branches"
                  : "Филиалы"}
            </Link>
            <Link href="tel:1287" className="py-1 text-[14px] font-semibold text-[#110C30]">
              1287
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
