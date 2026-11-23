"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteBranding } from "@/components/SiteBranding";

type BrandLogoProps = {
  src?: string;
  alt?: string;
  href?: string;
  className?: string;
  priority?: boolean;
  link?: boolean;
};

/**
 * Figma Frame 2087326111:
 * outer 82.19×54, padding 16, gap 11.03
 * mark 50.19×22
 */
const FRAME =
  "flex h-[54px] w-[82.19px] shrink-0 flex-col items-start gap-[11px] p-4";
const MARK = {
  width: 50.19,
  height: 22,
  className: "h-[22px] w-[50.19px] object-contain object-left",
};

/** Shared Trustbank mark — CMS logo via SiteBrandingProvider / props. */
export default function BrandLogo({
  src,
  alt,
  href = "/",
  className = "",
  priority = false,
  link = true,
}: BrandLogoProps) {
  const branding = useSiteBranding();
  const logoSrc = src?.trim() || branding.logo || "/logo.svg";
  const logoAlt = alt?.trim() || branding.logoText || "TRASTBANK";

  const image = (
    <span className={`${FRAME} ${className}`.trim()}>
      <Image
        src={logoSrc}
        alt={logoAlt}
        width={Math.round(MARK.width)}
        height={Math.round(MARK.height)}
        className={MARK.className}
        unoptimized
        priority={priority}
      />
    </span>
  );

  if (!link) return image;

  return (
    <Link href={href} className="flex shrink-0 items-center" aria-label={logoAlt}>
      {image}
    </Link>
  );
}
