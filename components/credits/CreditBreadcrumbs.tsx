import Link from "next/link";

interface CreditBreadcrumbsProps {
  catalogLabel: string;
  currentLabel: string;
  catalogHref?: string;
  /** Light page (default) or dark hero banner */
  variant?: "light" | "dark";
  className?: string;
}

/**
 * Same pattern as deposits/cards:
 * / Catalog / Current page
 */
export default function CreditBreadcrumbs({
  catalogLabel,
  currentLabel,
  catalogHref = "/kredity",
  variant = "light",
  className = "",
}: CreditBreadcrumbsProps) {
  if (!catalogLabel && !currentLabel) return null;

  const isDark = variant === "dark";
  const slash = isDark ? "text-white/80" : "text-[#0A2896]";
  const link = isDark
    ? "text-white hover:underline"
    : "text-[#3261EC] hover:underline";
  const current = isDark
    ? "text-white opacity-80"
    : "text-[#3261EC] opacity-40";

  return (
    <nav
      className={`flex flex-wrap items-center gap-1 text-[16px] leading-[22px] tracking-[-0.4px] ${className}`}
      aria-label="breadcrumb"
    >
      <span className={`px-2 text-[13px] ${slash}`}>/</span>
      {catalogLabel ? (
        <Link href={catalogHref} className={link}>
          {catalogLabel}
        </Link>
      ) : null}
      {catalogLabel && currentLabel ? (
        <span className={`px-2 text-[13px] ${slash}`}>/</span>
      ) : null}
      {currentLabel ? <span className={current}>{currentLabel}</span> : null}
    </nav>
  );
}
