"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, Search } from "lucide-react";
import BrandLogo from "@/components/BrandLogo";
import { DepositsPageConfig } from "@/types/deposits";

interface DepositsHeaderProps {
  config: DepositsPageConfig["header"];
}

export default function DepositsHeader({ config }: DepositsHeaderProps) {
  const [activeNav, setActiveNav] = useState(config.navItems[0]?.id || "");
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="w-full bg-[#FAFAFA] relative z-50">
      <div className="mx-auto flex h-16 w-full max-w-[1440px] items-center justify-between gap-4 px-4 lg:px-[120px]">
        <div className="flex min-w-0 items-center gap-4">
          <BrandLogo
            src={config.logo}
            alt={config.logoText || "TRASTBANK"}
            priority
          />

          <nav className="hidden items-center gap-4 xl:flex">
            {config.navItems.map((item) => {
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
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex shrink-0 items-center gap-3 sm:gap-4">
          <button
            type="button"
            aria-label="Поиск"
            className="flex h-12 w-12 items-center justify-center rounded-full text-[#1E1E20] cursor-pointer"
          >
            <Search size={22} strokeWidth={2} />
          </button>

          <Link
            href={config.becomeClientHref || "#"}
            className="hidden h-12 items-center rounded-xl bg-[#E7E8EA] px-[22px] text-[15px] font-semibold leading-[18px] text-[#110C30] sm:inline-flex"
          >
            {config.becomeClientText}
          </Link>

          <Link
            href={config.loginHref || "#"}
            className="hidden h-12 items-center gap-2 rounded-xl bg-[#2D6EE3] px-[22px] text-[12px] font-medium leading-5 text-white sm:inline-flex"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4Z"
                fill="white"
              />
              <path
                d="M4 20c0-2.21 3.58-4 8-4s8 1.79 8 4v1H4v-1Z"
                fill="white"
              />
            </svg>
            {config.loginButtonText}
          </Link>

          <button
            type="button"
            className="p-2 text-[#110C30] xl:hidden cursor-pointer"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="absolute inset-x-0 top-full z-40 border-t border-black/5 bg-white px-4 py-4 shadow-lg xl:hidden">
          <nav className="flex flex-col gap-3">
            {config.navItems.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="py-1 text-[14px] font-semibold text-[#110C30]"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <Link
              href={config.becomeClientHref || "#"}
              className="py-1 text-[14px] font-semibold text-[#110C30]"
              onClick={() => setMobileOpen(false)}
            >
              {config.becomeClientText}
            </Link>
            <Link
              href={config.loginHref || "#"}
              className="py-1 text-[14px] font-semibold text-[#2D6EE3]"
              onClick={() => setMobileOpen(false)}
            >
              {config.loginButtonText}
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
