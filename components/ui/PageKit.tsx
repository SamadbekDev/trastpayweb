/**
 * PageKit — shared building blocks for section / static pages.
 * Sizes follow Figma "Ultimate Design" (О банке — страницы):
 *  - container 1440 / content 1280, sidebar 280, column gap 32
 *  - hero radius 24, padding 48, H1 48/56
 *  - link cards radius 16, padding 24, icon tile 40 (radius 12)
 *  - section heading 24/32, card title 15, caption 13
 */
import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight, ChevronDown, ChevronRight, type LucideIcon } from "lucide-react";
import type { Language } from "@/types/pageConfig";
import { tr } from "@/i18n/tr";
import { UI_DICT } from "@/i18n/dict/ui";

const ui = (lang: Language, s: string) => tr(lang, s, UI_DICT);

const cx = (...c: (string | false | null | undefined)[]) => c.filter(Boolean).join(" ");

/* ───────────── Layout ───────────── */

export function PageContainer({
  children,
  className,
  as: Tag = "div",
  id,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "nav";
  id?: string;
}) {
  return (
    <Tag id={id} className={cx("container-page", className)}>
      {children}
    </Tag>
  );
}

/** Two-column section layout: content + 280px sticky sidebar (sidebar goes below the content on mobile). */
export function SectionLayout({
  children,
  sidebar,
}: {
  children: ReactNode;
  sidebar?: ReactNode;
}) {
  if (!sidebar) return <div className="flex flex-col gap-12">{children}</div>;
  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
      <div className="flex min-w-0 flex-col gap-12">{children}</div>
      <aside>
        <div className="lg:sticky lg:top-24">{sidebar}</div>
      </aside>
    </div>
  );
}

/* ───────────── Breadcrumbs ───────────── */

export interface Crumb {
  label: string;
  href?: string;
}

export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  return (
    <nav aria-label="breadcrumb" className={cx("flex flex-wrap items-center gap-2 text-[13px] leading-5", className)}>
      {items.map((c, i) => {
        const last = i === items.length - 1;
        return (
          <span key={`${c.label}-${i}`} className="flex items-center gap-2">
            {c.href && !last ? (
              <Link href={c.href} className="text-text-muted transition-colors hover:text-primary">
                {c.label}
              </Link>
            ) : (
              <span className={last ? "text-ink" : "text-text-muted"} aria-current={last ? "page" : undefined}>
                {c.label.length > 70 ? `${c.label.slice(0, 68).trimEnd()}…` : c.label}
              </span>
            )}
            {!last && <span className="text-[#C2C8D3]">/</span>}
          </span>
        );
      })}
    </nav>
  );
}

/* ───────────── Text atoms ───────────── */

export function Eyebrow({ children, tone = "brand" }: { children: ReactNode; tone?: "brand" | "inverse" }) {
  return (
    <span
      className={cx(
        "text-[11px] font-semibold uppercase leading-4 tracking-[0.08em]",
        tone === "inverse" ? "text-white/80" : "text-primary"
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  title,
  description,
  action,
  id,
}: {
  title: ReactNode;
  description?: ReactNode;
  action?: ReactNode;
  id?: string;
}) {
  return (
    <div id={id} className="flex scroll-mt-28 flex-wrap items-end justify-between gap-3">
      <div className="flex flex-col gap-1.5">
        <h2 className="text-[22px] font-semibold leading-7 text-ink lg:text-[24px] lg:leading-8">{title}</h2>
        {description ? <p className="max-w-[720px] text-[14px] leading-5 text-text-muted">{description}</p> : null}
      </div>
      {action}
    </div>
  );
}

/* ───────────── Buttons ───────────── */

type ButtonVariant = "primary" | "secondary" | "inverse" | "ghost";

const BUTTON_STYLES: Record<ButtonVariant, string> = {
  primary: "bg-primary text-white hover:bg-primary-deep",
  secondary: "bg-primary-soft text-primary hover:bg-[#E1E9FF]",
  inverse: "bg-white text-primary hover:bg-white/90",
  ghost: "bg-white/15 text-white hover:bg-white/25",
};

export function ButtonLink({
  href,
  children,
  variant = "primary",
  className,
}: {
  href: string;
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
}) {
  const external = /^(https?:|tel:|mailto:)/.test(href);
  const cls = cx(
    "inline-flex h-12 items-center justify-center gap-2 rounded-tile px-6 text-[15px] font-semibold transition-colors",
    BUTTON_STYLES[variant],
    className
  );
  return external ? (
    <a href={href} className={cls} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {children}
    </a>
  ) : (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/* ───────────── Hero ───────────── */

export interface HeroStat {
  value: string;
  label: string;
}

/**
 * `brand` — blue gradient hero (section overview pages).
 * `soft`  — light gradient hero (inner pages).
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  stats,
  actions,
  variant = "soft",
}: {
  eyebrow?: string;
  title: string;
  subtitle?: ReactNode;
  image?: string;
  imageAlt?: string;
  stats?: HeroStat[];
  actions?: ReactNode;
  variant?: "brand" | "soft";
}) {
  const brand = variant === "brand";
  // Long official titles (laws, disclosures) get a smaller heading and the full text width.
  const long = title.length > 80;
  return (
    <section
      className={cx(
        "relative overflow-hidden rounded-panel p-6 md:p-10 lg:p-12",
        brand
          ? "bg-[linear-gradient(135deg,#3B78FF_0%,#2D68FF_45%,#1E54E0_100%)] text-white"
          : "border border-white bg-[linear-gradient(120deg,#E9F0FF_0%,#F5F8FF_55%,#FFFFFF_100%)]"
      )}
    >
      <div className="relative z-10 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
        <div className={cx("flex flex-col gap-4", long ? "max-w-[880px]" : "max-w-[560px]")}>
          {eyebrow ? <Eyebrow tone={brand ? "inverse" : "brand"}>{eyebrow}</Eyebrow> : null}
          <h1
            className={cx(
              long
                ? "text-[22px] font-semibold leading-[1.3] tracking-[-0.01em] md:text-[26px] lg:text-[28px]"
                : "text-[32px] font-semibold leading-[1.15] tracking-[-0.02em] md:text-[40px] lg:text-[48px]",
              brand ? "text-white" : "text-ink"
            )}
          >
            {title}
          </h1>
          {subtitle ? (
            <p className={cx("text-[15px] leading-6 lg:text-[16px]", brand ? "text-white/85" : "text-text-muted")}>
              {subtitle}
            </p>
          ) : null}
          {actions ? <div className="flex flex-wrap gap-3 pt-2">{actions}</div> : null}
        </div>
        {image ? (
          <div className="relative hidden h-[200px] w-[260px] shrink-0 overflow-hidden rounded-card md:block lg:h-[220px] lg:w-[300px]">
            <Image src={image} alt={imageAlt} fill unoptimized className="object-cover" />
          </div>
        ) : null}
      </div>

      {stats && stats.length > 0 ? (
        <div className="relative z-10 mt-8 grid grid-cols-2 gap-3 md:grid-cols-3 lg:gap-4">
          {stats.map((s) => (
            <div
              key={s.label}
              className={cx(
                "flex flex-col gap-1 rounded-card p-4 lg:p-5",
                brand ? "bg-white/12 ring-1 ring-white/20 backdrop-blur-sm" : "bg-white"
              )}
            >
              <span className={cx("text-[22px] font-semibold leading-7 lg:text-[28px] lg:leading-9", brand ? "text-white" : "text-ink")}>
                {s.value}
              </span>
              <span className={cx("text-[12px] leading-4", brand ? "text-white/75" : "text-text-muted")}>{s.label}</span>
            </div>
          ))}
        </div>
      ) : null}
    </section>
  );
}

/* ───────────── Cards ───────────── */

export function IconTile({ icon: Icon, size = 40 }: { icon: LucideIcon; size?: number }) {
  return (
    <span
      className="flex shrink-0 items-center justify-center rounded-tile bg-primary-soft text-primary"
      style={{ width: size, height: size }}
    >
      <Icon size={Math.round(size * 0.5)} strokeWidth={1.8} />
    </span>
  );
}

export function LinkCard({
  href,
  icon,
  title,
  description,
}: {
  href: string;
  icon?: LucideIcon;
  title: string;
  description?: string;
}) {
  return (
    <Link
      href={href}
      className="group flex h-full flex-col gap-4 rounded-card border border-transparent bg-white p-6 transition-all hover:border-line hover:shadow-[0_8px_24px_rgba(17,12,48,0.06)]"
    >
      {icon ? <IconTile icon={icon} /> : null}
      <div className="flex flex-col gap-2">
        <div className="flex items-start justify-between gap-3">
          <span className="text-[15px] font-semibold leading-5 text-ink">{title}</span>
          <ArrowRight size={16} className="mt-0.5 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
        </div>
        {description ? <p className="text-[13px] leading-[18px] text-text-muted">{description}</p> : null}
      </div>
    </Link>
  );
}

/** Responsive grid for LinkCard / Panel tiles (1 → 2 → 3 columns, 16px gap). */
export function CardGrid({ children, cols = 3 }: { children: ReactNode; cols?: 2 | 3 | 4 }) {
  const map = { 2: "sm:grid-cols-2", 3: "sm:grid-cols-2 lg:grid-cols-3", 4: "sm:grid-cols-2 lg:grid-cols-4" };
  return <div className={cx("grid grid-cols-1 gap-4", map[cols])}>{children}</div>;
}

/** White content surface (radius 24, padding 24 → 32). */
export function Panel({ children, className, id }: { children: ReactNode; className?: string; id?: string }) {
  return (
    <div id={id} className={cx("scroll-mt-28 rounded-panel bg-white p-6 lg:p-8", className)}>
      {children}
    </div>
  );
}

/** Label/value rows. A row with an empty label spans the full width (section caption). */
export function InfoTable({ rows }: { rows: { label: string; value: ReactNode; key?: string }[] }) {
  return (
    <dl className="divide-y divide-line">
      {rows.map((r, i) =>
        r.label ? (
          <div key={r.key ?? `${r.label}-${i}`} className="grid grid-cols-1 gap-1 py-3 sm:grid-cols-[220px_minmax(0,1fr)] sm:gap-6">
            <dt className="text-[13px] font-semibold leading-5 text-ink">{r.label}</dt>
            <dd className="text-[14px] leading-5 text-ink-soft">{r.value}</dd>
          </div>
        ) : (
          <div key={r.key ?? `row-${i}`} className="py-3">
            <dd className="text-[14px] font-semibold leading-5 text-ink">{r.value}</dd>
          </div>
        )
      )}
    </dl>
  );
}

export function BulletList({ items }: { items: ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-3">
      {items.map((it, i) => (
        <li key={typeof it === "string" ? it : i} className="flex gap-3 text-[15px] leading-6 text-ink-soft">
          <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
          <span>{it}</span>
        </li>
      ))}
    </ul>
  );
}

/* ───────────── Sidebar navigation ───────────── */

export interface SideNavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

export function SideNav({
  title,
  overview,
  items,
  activeHref,
}: {
  title: string;
  overview?: { label: string; href: string };
  items: SideNavItem[];
  activeHref: string;
}) {
  const isActive = (href: string) => href === activeHref;
  return (
    <nav className="rounded-panel bg-white p-4 lg:p-5">
      <p className="px-3 pb-3 text-[20px] font-semibold leading-7 text-primary">{title}</p>
      <ul className="flex flex-col gap-0.5">
        {overview ? (
          <li>
            <Link
              href={overview.href}
              className={cx(
                "block rounded-[10px] px-3 py-2.5 text-[14px] leading-5 transition-colors",
                isActive(overview.href) ? "bg-primary-soft font-semibold text-primary" : "text-ink hover:bg-page"
              )}
            >
              {overview.label}
            </Link>
          </li>
        ) : null}
        {items.map((item) => {
          const open = isActive(item.href) || item.children?.some((c) => isActive(c.href));
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cx(
                  "flex items-center justify-between rounded-[10px] px-3 py-2.5 text-[14px] leading-5 transition-colors",
                  open ? "font-semibold text-primary" : "text-ink hover:bg-page"
                )}
              >
                {item.label}
                {item.children?.length ? (
                  open ? <ChevronDown size={16} /> : <ChevronRight size={16} className="text-text-muted" />
                ) : null}
              </Link>
              {open && item.children?.length ? (
                <ul className="mb-1 ml-3 flex flex-col gap-0.5 border-l border-line pl-2">
                  {item.children.map((c) => (
                    <li key={c.href}>
                      <Link
                        href={c.href}
                        className={cx(
                          "block rounded-[10px] px-3 py-2 text-[13px] leading-5 transition-colors",
                          isActive(c.href) ? "bg-primary-soft font-semibold text-primary" : "text-ink-soft hover:bg-page"
                        )}
                      >
                        {c.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/* ───────────── Prev / next pager ───────────── */

export function PagerNav({
  prev,
  next,
  prevLabel = "Предыдущий раздел",
  nextLabel = "Следующий раздел",
  lang = "ru",
}: {
  lang?: Language;
  prev?: { label: string; href: string };
  next?: { label: string; href: string };
  prevLabel?: string;
  nextLabel?: string;
}) {
  if (!prev && !next) return null;
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {prev ? (
        <Link href={prev.href} className="flex flex-col gap-1 rounded-card bg-white p-5 transition-shadow hover:shadow-[0_8px_24px_rgba(17,12,48,0.06)]">
          <span className="text-[12px] leading-4 text-text-muted">← {ui(lang, prevLabel)}</span>
          <span className="text-[14px] font-semibold leading-5 text-primary">{prev.label}</span>
        </Link>
      ) : (
        <span className="hidden sm:block" />
      )}
      {next ? (
        <Link href={next.href} className="flex flex-col items-end gap-1 rounded-card bg-white p-5 text-right transition-shadow hover:shadow-[0_8px_24px_rgba(17,12,48,0.06)]">
          <span className="text-[12px] leading-4 text-text-muted">{ui(lang, nextLabel)} →</span>
          <span className="text-[14px] font-semibold leading-5 text-primary">{next.label}</span>
        </Link>
      ) : null}
    </div>
  );
}

/* ───────────── Official portals strip (above footer) ───────────── */

export const OFFICIAL_PORTALS = [
  { name: "Правительственный портал", host: "gov.uz", href: "https://gov.uz" },
  { name: "Центральный банк", host: "cbu.uz", href: "https://cbu.uz" },
  { name: "Единый портал госуслуг", host: "my.gov.uz", href: "https://my.gov.uz" },
  { name: "Законодательная палата", host: "parliament.gov.uz", href: "https://parliament.gov.uz" },
  { name: "Министерство экономики", host: "mineconomy.uz", href: "https://mineconomy.uz" },
];

export function OfficialPortals({ title = "Официальные порталы и партнёры", lang = "ru" }: { title?: string; lang?: Language }) {
  return (
    <PageContainer as="section" className="py-10">
      <div className="flex flex-wrap items-center justify-between gap-2 pb-4">
        <p className="text-[16px] font-semibold text-ink">{ui(lang, title)}</p>
        <p className="text-[12px] text-text-muted">{ui(lang, "Государственные порталы и регуляторы Республики Узбекистан")}</p>
      </div>
      <div className="flex gap-3 overflow-x-auto pb-1 [scrollbar-width:none]">
        {OFFICIAL_PORTALS.map((p) => (
          <a
            key={p.host}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex shrink-0 flex-col rounded-full bg-white px-5 py-2.5 transition-shadow hover:shadow-[0_4px_16px_rgba(17,12,48,0.08)]"
          >
            <span className="text-[13px] font-semibold leading-4 text-ink">{ui(lang, p.name)}</span>
            <span className="text-[11px] leading-4 text-text-muted">{p.host}</span>
          </a>
        ))}
      </div>
    </PageContainer>
  );
}

/** Placeholder block for content that has not been migrated yet. */
export function PendingContent({
  text = "Раздел наполняется. Материалы переносятся со старого сайта банка.",
  lang = "ru",
}: {
  text?: string;
  lang?: Language;
}) {
  return (
    <div className="rounded-card border border-dashed border-line bg-page p-6 text-[14px] leading-5 text-text-muted">{ui(lang, text)}</div>
  );
}
