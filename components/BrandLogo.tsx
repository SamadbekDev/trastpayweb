"use client";

import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { useSiteBranding } from "@/components/SiteBranding";
import { getMediaUrl } from "@/utils/mediaHelper";

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
  "flex h-[56px] w-[96px] shrink-0 items-center justify-start px-3 pt-1 pb-3";
const MARK = {
  width: 73,
  height: 32,
  className: "h-[32px] w-[73px] object-contain object-left",
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
  // through getMediaUrl: CMS ids / localhost API URLs become loadable from any device
  const logoSrc = getMediaUrl(src?.trim() || branding.logo || "/logo.svg");
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
        // the header remounts on every navigation: a shimmer behind the logo would blink
        skeleton={false}
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
