"use client";

import NextImage, { type ImageProps } from "next/image";
import { forwardRef, useCallback, useState, type ImgHTMLAttributes, type SyntheticEvent } from "react";
import { viaSiteApi } from "@/utils/mediaHelper";

/**
 * Drop-in replacement for `next/image`: while the picture loads, its box shows a shimmering
 * skeleton (`.img-skeleton` in globals.css); it is removed on load — and on error, so a broken
 * file never leaves a shimmer forever. Transparent pictures (icons, cut-outs) therefore end up on
 * the background they were designed for.
 *
 * Next.js also fires `onLoad` for pictures that finished loading before hydration (cached ones).
 */
const SkeletonImage = forwardRef<HTMLImageElement, ImageProps & { skeleton?: boolean }>(function SkeletonImage(
  { className = "", onLoad, onError, skeleton = true, src: rawSrc, ...props },
  ref
) {
  // CMS URLs on the API's localhost origin go through the site's /api proxy
  const src = typeof rawSrc === "string" ? viaSiteApi(rawSrc) : rawSrc;
  const key = typeof src === "string" ? src : (src as { src?: string })?.src ?? "";
  const [doneSrc, setDoneSrc] = useState<string | null>(null);
  const loading = skeleton && doneSrc !== key;

  return (
    <NextImage
      ref={ref}
      src={src}
      {...props}
      className={loading ? `${className} img-skeleton` : className}
      onLoad={(e) => {
        setDoneSrc(key);
        onLoad?.(e);
      }}
      onError={(e) => {
        setDoneSrc(key);
        onError?.(e);
      }}
    />
  );
});

export default SkeletonImage;

/**
 * Plain `<img>` with the same skeleton, for pictures of unknown size (migrated pages).
 * `loadingClassName` reserves room while loading (an unloaded `w-auto` image is 0×0).
 */
export function SkeletonImg({
  className = "",
  loadingClassName = "",
  onLoad,
  onError,
  src,
  ...props
}: ImgHTMLAttributes<HTMLImageElement> & { loadingClassName?: string }) {
  const [done, setDone] = useState(false);
  // a cached picture can finish before React attaches onLoad
  const ref = useCallback((img: HTMLImageElement | null) => {
    if (img?.complete) setDone(true);
  }, []);
  const finish = (handler?: (e: SyntheticEvent<HTMLImageElement>) => void) => (e: SyntheticEvent<HTMLImageElement>) => {
    setDone(true);
    handler?.(e);
  };
  return (
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text -- legacy pictures of unknown size; alt comes from props
    <img
      ref={ref}
      src={typeof src === "string" ? viaSiteApi(src) : src}
      {...props}
      className={done ? className : `${className} img-skeleton ${loadingClassName}`}
      onLoad={finish(onLoad)}
      onError={finish(onError)}
    />
  );
}
