"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import MENU from "@/data/legacy/header-menu.json";
import type { Language } from "@/types/pageConfig";
import { useLang } from "@/hooks/useLang";

/**
 * Top-menu parts taken from the old trustbank.uz header (data/legacy/header-menu.json,
 * built by scripts/legacy/header-menu.mjs):
 *   «О банке ▾» — the «О банке» pages, one column (like the old site's section «ещё» list)
 *   «Еще ▾»    — «Продажа имущества» (a top-level link on the old site; it does not fit our top row)
 *                and the other sections of the old «О банке» dropdown, each with its pages
 */
type L10n = { ru: string; uz: string; en: string };
type MenuItem = { label: L10n; href: string; external?: boolean };
type MenuSection = { key: string; label: L10n; href: string; items: MenuItem[] };

const SECTIONS = MENU.sections as MenuSection[];
export const ABOUT_MENU = SECTIONS.find((s) => s.key === "about")!;
export const MORE_MENU = SECTIONS.filter((s) => s.key !== "about");
export const SALE_LINK = MENU.sale as { label: L10n; href: string };

export const t = (l: L10n, lang: Language) => l[lang] || l.ru;
const inMenu = (path: string, s: MenuSection) =>
  path.startsWith(s.href) || s.items.some((i) => !i.external && path.startsWith(i.href));
export const isAboutActive = (path: string) => inMenu(path, ABOUT_MENU);
export const isSaleActive = (path: string) => path.startsWith(SALE_LINK.href);
export const isMoreActive = (path: string) => isSaleActive(path) || MORE_MENU.some((s) => inMenu(path, s));

const navText = (active: boolean) =>
  `inline-flex cursor-pointer items-center gap-1 whitespace-nowrap py-3.5 text-[12px] uppercase leading-5 tracking-[0.6px] transition-colors ${
    active ? "font-bold text-[#110C30]" : "font-medium text-[rgba(17,12,48,0.5)] hover:text-[#110C30]"
  }`;

function ItemLink({ item, lang, onNavigate, className }: { item: MenuItem; lang: Language; onNavigate: () => void; className: string }) {
  const label = t(item.label, lang);
  return item.external ? (
    <a href={item.href} target="_blank" rel="noopener noreferrer" className={className} onClick={onNavigate}>
      {label}
    </a>
  ) : (
    <Link href={item.href} className={className} onClick={onNavigate}>
      {label}
    </Link>
  );
}

/** A top-menu entry that opens a panel on click; closes on outside click, Esc and navigation. */
export function NavDropdown({
  label,
  active,
  wide = false,
  children,
}: {
  label: string;
  active: boolean;
  /** wide panel centred under the top row of the <header> (any header variant: all are positioned, 64px rows) */
  wide?: boolean;
  children: (close: () => void) => ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className={wide ? "" : "relative"}>
      <button type="button" aria-expanded={open} aria-haspopup="true" onClick={() => setOpen((v) => !v)} className={navText(active || open)}>
        <span className="bold-stable" data-text={label}>
          {label}
        </span>
        <ChevronDown size={14} strokeWidth={2.4} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <div
          className={`absolute z-50 ${wide ? "left-1/2 top-16 w-[min(1160px,calc(100%-32px))] -translate-x-1/2" : "left-0 top-full mt-1 w-[300px]"}`}
        >
          <div className="animate-[fade-in-up_0.18s_ease_both] rounded-2xl border border-[#E7EAF0] bg-white shadow-[0_16px_48px_rgba(17,12,48,0.12)]">
            {children(() => setOpen(false))}
          </div>
        </div>
      )}
    </div>
  );
}

const linkCls = "block rounded-lg px-3 py-2 text-[14px] leading-5 text-[#1F2A44] transition-colors hover:bg-[#F0F5FF] hover:text-[#1E54E0]";

export function AboutPanel({ lang, close }: { lang: Language; close: () => void }) {
  return (
    <ul className="max-h-[70vh] overflow-y-auto p-2">
      <li>
        <Link href={ABOUT_MENU.href} onClick={close} className={`${linkCls} font-semibold`}>
          {t(ABOUT_MENU.label, lang)}
        </Link>
      </li>
      {ABOUT_MENU.items.map((item) => (
        <li key={item.href}>
          <ItemLink item={item} lang={lang} onNavigate={close} className={linkCls} />
        </li>
      ))}
    </ul>
  );
}

export function MorePanel({ lang, close }: { lang: Language; close: () => void }) {
  return (
    <div className="grid max-h-[75vh] grid-cols-2 gap-x-6 gap-y-5 overflow-y-auto p-6 lg:grid-cols-3 xl:grid-cols-5">
      <Link href={SALE_LINK.href} onClick={close} className="col-span-full rounded-xl bg-[#F0F5FF] px-4 py-3 text-[14px] font-semibold text-[#1E54E0] hover:bg-[#E3ECFF]">
        {t(SALE_LINK.label, lang)} →
      </Link>
      {MORE_MENU.map((s) => (
        <div key={s.key} className="min-w-0">
          <Link href={s.href} onClick={close} className="mb-1 block px-3 text-[13px] font-bold uppercase tracking-[0.4px] text-[#110C30] hover:text-[#1E54E0]">
            {t(s.label, lang)}
          </Link>
          <ul>
            {s.items.map((item) => (
              <li key={item.href}>
                <ItemLink item={item} lang={lang} onNavigate={close} className={`${linkCls} text-[13px]`} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

/** Mobile / tablet: the same menus as collapsible groups inside the burger panel. */
export function MobileSiteMenu({ lang: langProp, onNavigate }: { lang?: Language; onNavigate: () => void }) {
  const current = useLang();
  const lang = langProp ?? current;
  return (
    <div className="flex flex-col">
      {[ABOUT_MENU, ...MORE_MENU].map((s) => (
        <details key={s.key} className="group rounded-lg">
          <summary className="flex cursor-pointer list-none items-center justify-between rounded-lg px-3 py-2.5 text-[14px] font-semibold text-[#110C30] [&::-webkit-details-marker]:hidden">
            {t(s.label, lang)}
            <ChevronDown size={16} className="transition-transform group-open:rotate-180" />
          </summary>
          <ul className="pb-2 pl-3">
            <li>
              <Link href={s.href} onClick={onNavigate} className="block rounded-lg px-3 py-2 text-[14px] font-medium text-[#1E54E0]">
                {t(s.label, lang)}
              </Link>
            </li>
            {s.items.map((item) => (
              <li key={item.href}>
                <ItemLink item={item} lang={lang} onNavigate={onNavigate} className="block rounded-lg px-3 py-2 text-[14px] text-[#1F2A44]" />
              </li>
            ))}
          </ul>
        </details>
      ))}
      <Link href={SALE_LINK.href} onClick={onNavigate} className="rounded-lg px-3 py-2.5 text-[14px] font-semibold text-[#110C30]">
        {t(SALE_LINK.label, lang)}
      </Link>
    </div>
  );
}


/** «Еще» / «Ещё» / «Yana» / «More» items of a CMS nav — replaced by the «Еще ▾» dropdown */
export const isMoreNavItem = (item: { label: string }) => /^(ещ[её]|yana|more)$/i.test(item.label.trim());

/** «О банке ▾» and «Еще ▾» for any header's desktop nav (pass the label of the CMS «Еще» item, if any). */
export function SiteMenuNavExtras({ moreLabel }: { moreLabel?: string }) {
  const lang = useLang();
  const pathname = usePathname() || "";
  const MORE: Record<Language, string> = { ru: "Еще", uz: "Yana", en: "More" };
  const more = moreLabel && lang === "ru" ? moreLabel : MORE[lang];
  return (
    <>
      <NavDropdown label={t(ABOUT_MENU.label, lang)} active={isAboutActive(pathname)}>
        {(close) => <AboutPanel lang={lang} close={close} />}
      </NavDropdown>
      <NavDropdown wide label={more} active={isMoreActive(pathname)}>
        {(close) => <MorePanel lang={lang} close={close} />}
      </NavDropdown>
    </>
  );
}
