"use client";

import { useState } from "react";
import Image from "@/components/ui/SkeletonImage";
import { getMediaUrl } from "@/utils/mediaHelper";

/**
 * CMS picture of a credit page. `fallback` (Figma artwork) is shown when the CMS file
 * cannot be loaded — e.g. a media id whose file is missing on the server.
 */
export default function CreditPhoto({
  src,
  fallback,
  className = "object-contain",
}: {
  src?: string;
  fallback?: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const url = failed ? fallback : src ? getMediaUrl(src, "") : fallback;
  if (!url) return null;
  return (
    <Image
      key={url}
      src={url}
      alt=""
      fill
      unoptimized
      className={className}
      onError={() => {
        if (!failed && fallback) setFailed(true);
      }}
    />
  );
}
