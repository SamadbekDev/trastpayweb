"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Glasses, X, ChevronDown } from "lucide-react";
import { RoundedUser, User, BurgerMenu, Search } from "@/components/Icons";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { HeaderConfig, Language } from "@/types/pageConfig";
import { getMediaUrl } from "@/utils/mediaHelper";

interface HeaderProps {
  config?: HeaderConfig;
}

export default function Header({ config }: HeaderProps) {
  const { i18n } = useTranslation();
  const [activeTab, setActiveTab] = useState<string>("");
  const [activePill, setActivePill] = useState<string>("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const currentLang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
    setIsLangDropdownOpen(false);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const topLinks = config?.navItems || [];
  const pillLinks = config?.secondaryNav || [];

  const ratesLink = config?.utilityLinks?.find((u) => u.id === "util-1");
  const branchesLink = config?.utilityLinks?.find((u) => u.id === "util-2");
  const loginText = config?.loginButtonText;
  const menuText = config?.menuButtonText;

  const logoSrc = "/logo.svg";

  // Auto-set default active items when loaded
  useEffect(() => {
    if (topLinks.length > 0 && !activeTab) {
      setActiveTab(topLinks[0].id);
    }
  }, [topLinks, activeTab]);

  useEffect(() => {
    if (pillLinks.length > 0 && !activePill) {
      setActivePill(pillLinks[0].id);
    }
  }, [pillLinks, activePill]);

  const handlePillClick = (id: string, href?: string) => {
    setActivePill(id);
    const targetHref =
      href ||
      (id === "sec-1"
        ? "#cards"
        : id === "sec-2"
        ? "#calculator"
        : id === "sec-3"
        ? "#trastpay"
        : id === "sec-4"
        ? "#services"
        : `#${id}`);

    if (targetHref && targetHref.startsWith("#") && targetHref.length > 1) {
      const targetElement = document.querySelector(targetHref);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  const handleTopTabClick = (id: string, href?: string) => {
    setActiveTab(id);
    if (href && href.startsWith("#") && href.length > 1) {
      const targetElement = document.querySelector(href);
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <header className="w-full text-[#08243f] z-50 relative">
      <div className="mx-auto flex w-full max-w-[1300px] items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex h-14 items-center shrink-0 gap-2"
            aria-label="Trastbank"
          >
            {logoSrc && (
              <Image
                src={logoSrc}
                alt={config?.logoText || "Trastbank"}
                width={110}
                height={40}
                className="object-contain"
                unoptimized
                priority
              />
            )}
            {!logoSrc && config?.logoText && (
              <span className="font-bold text-xl text-[#08243f]">
                {config.logoText}
              </span>
            )}
          </Link>

          <nav
            className="hidden items-center gap-4 lg:flex h-full"
            aria-label="Category"
          >
            {topLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleTopTabClick(link.id, link.href)}
                className={`py-3.5 text-xs font-bold uppercase tracking-wider relative transition-colors select-none cursor-pointer ${
                  activeTab === link.id
                    ? "text-[#08243f]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {link.label}
                {activeTab === link.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-[#08243f] rounded-t-full" />
                )}
              </button>
            ))}
          </nav>
        </div>

        <div className="hidden items-center gap-6 text-xs font-bold uppercase tracking-wider lg:flex">
          {ratesLink && (
            <Link href={ratesLink.href || "#rates"} className="text-[#110C30] transition-colors">
              {ratesLink.label}
            </Link>
          )}
          {branchesLink && (
            <Link href={branchesLink.href || "#branches"} className="text-[#110C30] transition-colors">
              {branchesLink.label}
            </Link>
          )}

          {/* Language Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsLangDropdownOpen(!isLangDropdownOpen)}
              className="flex items-center gap-1 text-[#110C30] transition-colors uppercase cursor-pointer font-bold"
            >
              <span>{currentLang.toUpperCase()}</span>
              <ChevronDown size={14} />
            </button>

            {isLangDropdownOpen && (
              <div className="absolute right-0 mt-2 w-20 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 z-50">
                {(["ru", "uz", "en"] as Language[]).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => handleLanguageChange(lang)}
                    className={`w-full text-left px-3 py-1.5 text-xs font-bold uppercase hover:bg-slate-50 transition-colors ${
                      currentLang === lang ? "text-blue-600 bg-blue-50" : "text-slate-700"
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>

          <button
            aria-label="Версия для слабовидящих"
            className="text-[#110C30]"
          >
            <Glasses size={20} />
          </button>

          {loginText && (
            <Link
              href="#signin"
              className="flex items-center justify-center gap-2 px-4 py-2"
            >
              <RoundedUser size={15} />
              <span className="normal-case font-bold">{loginText}</span>
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Закрыть меню" : "Открыть меню"}
            className="p-2 hover:bg-slate-50 rounded-xl text-[#08243f] transition-colors"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div className="mx-auto flex w-full max-w-[882px] mt-6 items-center justify-between">
        <div className="flex py-1.5 w-full items-center justify-between rounded-2xl bg-[#EAEFF8] px-6 text-sm font-medium">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex select-none items-center gap-3 text-[#172419] cursor-pointer"
          >
            <BurgerMenu size={20} strokeWidth={2.5} />
            {menuText && <span className="text-[14px] font-semibold">{menuText}</span>}
          </button>

          <nav
            className="hidden items-center p-1 rounded-2xl gap-4 lg:flex bg-linear-to-r from-[#BBD8F2] via-[#D4DFF7] to-[#FFFFFF]"
            aria-label="Quick links"
          >
            {pillLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handlePillClick(link.id, link.href)}
                className={`relative px-4 py-3 rounded-xl text-sm font-bold transition-colors select-none cursor-pointer ${
                  activePill === link.id
                    ? "text-[#08243f]"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                {activePill === link.id && (
                  <motion.span
                    layoutId="activePillBg"
                    className="absolute inset-0 bg-white rounded-xl shadow-sm ring-1 ring-slate-100"
                    transition={{ type: "tween", stiffness: 500, damping: 35 }}
                  />
                )}
                <span className="relative z-10">{link.label}</span>
              </button>
            ))}
          </nav>

          <button aria-label="Поиск" className="text-[#172419]">
            <Search size={20} />
          </button>

          <Link
            href="#signin"
            className=" text-[#262626] p-2 bg-white border-4 border-[#EFF7F7] rounded-xl"
          >
            <User />
          </Link>
        </div>
      </div>
    </header>
  );
}
