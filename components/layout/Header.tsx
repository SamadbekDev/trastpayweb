"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Glasses, X, ChevronDown, Globe } from "lucide-react";
import { RoundedUser, User, BurgerMenu, Search } from "@/components/Icons";
import { motion } from "framer-motion";
import { HeaderConfig, Language } from "@/types/pageConfig";
import i18n from "@/i18n";

const defaultTopLinks = [
  { label: "Физическим лицам", id: "individuals" },
  { label: "Бизнесу", id: "business" },
  { label: "Акционерам и инвесторам", id: "investors" },
];

const defaultPillLinks = [
  { label: "Продукты банка", id: "products" },
  { label: "Тарифы", id: "rates" },
  { label: "Для семьи", id: "family" },
  { label: "Премиум", id: "premium" },
];

const defaultMenuSections = [
  {
    title: "Карты & Счета",
    items: [
      { label: "Дебетовые карты Uzcard/Humo", href: "#cards" },
      { label: "Кредитные карты Visa", href: "#cards" },
      { label: "Валютные счета", href: "#cards" },
    ],
  },
  {
    title: "Кредитование",
    items: [
      { label: "Автокредиты", href: "#calculator" },
      { label: "Микрозаймы онлайн", href: "#calculator" },
      { label: "Ипотека", href: "#calculator" },
    ],
  },
  {
    title: "Депозиты",
    items: [
      { label: "Онлайн вклады", href: "#vault" },
      { label: "Срочные депозиты", href: "#vault" },
      { label: "Сейфовые ячейки", href: "#vault" },
    ],
  },
  {
    title: "Услуги",
    items: [
      { label: "Мобильный банкинг", href: "#mobile-app" },
      { label: "Обмен валют", href: "#rates" },
      { label: "Интерактивная карта филиалов", href: "#branches" },
    ],
  },
];

interface HeaderProps {
  config?: HeaderConfig;
}

export default function Header({ config }: HeaderProps) {
  const [activeTab, setActiveTab] = useState("individuals");
  const [activePill, setActivePill] = useState("products");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentLang, setCurrentLang] = useState<Language>(
    (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru"
  );
  const [isLangDropdownOpen, setIsLangDropdownOpen] = useState(false);

  const handleLanguageChange = (lang: Language) => {
    i18n.changeLanguage(lang);
    setCurrentLang(lang);
    setIsLangDropdownOpen(false);
  };

  const closeAll = () => {
    setIsMenuOpen(false);
    setIsMobileMenuOpen(false);
  };

  const topLinks = config?.navItems
    ? config.navItems.map((item) => ({ label: item.label, id: item.id }))
    : defaultTopLinks;

  const pillLinks = config?.secondaryNav
    ? config.secondaryNav.map((item) => ({ label: item.label, id: item.id }))
    : defaultPillLinks;

  const ratesText = config?.utilityLinks?.find((u) => u.id === "util-1")?.label || "Курс валют";
  const branchesText = config?.utilityLinks?.find((u) => u.id === "util-2")?.label || "Филиалы";
  const loginText = config?.loginButtonText || "Войти";
  const menuText = config?.menuButtonText || "Меню";

  return (
    <header className="w-full text-[#08243f] z-50 relative">
      <div className="mx-auto flex w-full max-w-[1300px] items-center justify-between px-6 lg:px-12">
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex h-14 items-center shrink-0"
            aria-label="Trastbank"
          >
            <Image
              src={config?.logo || "/logo.svg"}
              alt="Trastbank"
              width={110}
              height={40}
              className="object-contain"
              priority
            />
          </Link>
          <nav
            className="hidden items-center gap-4 lg:flex h-full"
            aria-label="Category"
          >
            {topLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActiveTab(link.id)}
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
          <Link href="#rates" className="text-[#110C30] transition-colors">
            {ratesText}
          </Link>
          <Link href="#branches" className="text-[#110C30] transition-colors">
            {branchesText}
          </Link>

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

          <Link
            href="#signin"
            className="flex items-center justify-center gap-2 px-4 py-2"
          >
            <RoundedUser size={15} />
            <span className="normal-case font-bold">{loginText}</span>
          </Link>
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
            <span className="text-[14px] font-semibold">{menuText}</span>
          </button>

          <nav
            className="hidden items-center p-1 rounded-2xl gap-4 lg:flex bg-linear-to-r from-[#BBD8F2] via-[#D4DFF7] to-[#FFFFFF]"
            aria-label="Quick links"
          >
            {pillLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => setActivePill(link.id)}
                className={`relative px-4 py-3 rounded-xl text-sm font-bold transition-colors select-none cursor-pointer ${
                  activePill === link.id
                    ? "text-[#08243f]"
                    : "text-slate-500"
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
            aria-label="Войти"
            className=" text-[#262626] p-2 bg-white border-4 border-[#EFF7F7] rounded-xl"
          >
            <User />
          </Link>
        </div>
      </div>

      {isMenuOpen && (
        <div className="absolute top-[155px] left-0 right-0 bg-white border-b border-slate-100 shadow-xl z-40 animate-fade-in-up">
          <div className="max-w-[1440px] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 p-12">
            {defaultMenuSections.map((section) => (
              <div key={section.title}>
                <h5 className="font-extrabold text-[#08243f] text-sm uppercase tracking-wider mb-4">
                  {section.title}
                </h5>
                <ul className="space-y-2.5 text-sm text-slate-500 font-semibold">
                  {section.items.map((item) => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={closeAll}
                        className="hover:text-[#08243f] transition-colors"
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      )}

      {isMobileMenuOpen && (
        <div className="fixed inset-y-0 right-0 w-full max-w-xs bg-white shadow-2xl z-50 p-6 flex flex-col justify-between border-l border-slate-100 lg:hidden">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <Link href="/" className="flex h-14 items-center shrink-0">
                <Image src={config?.logo || "/logo.svg"} alt="Trastbank" width={110} height={40} className="object-contain" />
              </Link>
              <button
                onClick={closeAll}
                className="p-1 hover:bg-slate-50 rounded-lg"
                aria-label="Закрыть"
              >
                <X size={24} />
              </button>
            </div>

            <nav
              className="flex flex-col gap-4 font-semibold text-slate-700"
              aria-label="Mobile navigation"
            >
              <Link
                href="#rates"
                onClick={closeAll}
                className="hover:text-[#08243f] text-lg"
              >
                {ratesText}
              </Link>
              <Link
                href="#branches"
                onClick={closeAll}
                className="hover:text-[#08243f] text-lg"
              >
                {branchesText}
              </Link>
              <Link
                href="#cards"
                onClick={closeAll}
                className="hover:text-[#08243f] text-lg"
              >
                Карты
              </Link>
              <Link
                href="#calculator"
                onClick={closeAll}
                className="hover:text-[#08243f] text-lg"
              >
                Калькулятор
              </Link>
            </nav>
          </div>

          <Link
            href="#signin"
            onClick={closeAll}
            className="flex w-full h-12 items-center justify-center gap-2 bg-[#08243f] text-white font-bold rounded-xl hover:bg-[#0c2f52] transition-colors"
          >
            <User size={18} />
            <span>{loginText}</span>
          </Link>
        </div>
      )}
    </header>
  );
}
