"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { FooterConfig } from "@/types/pageConfig";
import { getMediaUrl } from "@/utils/mediaHelper";

interface FooterProps {
  config?: FooterConfig;
}

function AppleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.33c.64-.78 1.08-1.86.96-2.94-.93.04-2.06.62-2.72 1.4-.58.68-1.1 1.78-.96 2.84 1.04.08 2.08-.52 2.72-1.3" />
    </svg>
  );
}

function AndroidIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M17.6 9.48l1.84-3.18c.16-.31.04-.69-.26-.85-.29-.15-.65-.06-.83.22l-1.88 3.24a11.46 11.46 0 0 0-8.94 0L5.65 5.67c-.19-.29-.55-.38-.84-.22-.3.16-.42.54-.26.85L6.4 9.48A10.78 10.78 0 0 0 1 18h22a10.78 10.78 0 0 0-5.4-8.52M7 15.25a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5m10 0a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5" />
    </svg>
  );
}

function detectStorePlatform(label: string, url: string, index: number): "apple" | "android" {
  const hay = `${label} ${url}`.toLowerCase();
  if (/(apple|ios|app\s*store|iphone|apps\.apple)/.test(hay)) return "apple";
  if (/(android|google|play\.google|play\s*market|apk)/.test(hay)) return "android";
  return index === 0 ? "apple" : "android";
}

export default function Footer({ config }: FooterProps) {
  if (!config) return null;

  return (
    <footer className="w-full bg-[#004B7C] text-white/87">
      <div className="mx-auto flex w-full max-w-[1440px] flex-col gap-8 px-4 py-8 lg:p-10">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Contacts + social */}
          <div className="flex flex-col gap-8 py-2">
            {config.phones.map((phone) => (
              <div key={phone.id} className="flex flex-col gap-1">
                <a
                  href={`tel:${phone.number.replace(/\s/g, "")}`}
                  className="text-[16px] font-medium leading-6 hover:text-white"
                >
                  {phone.number}
                </a>
                {phone.note ? (
                  <p className="text-[12px] leading-4 tracking-[0.4px]">{phone.note}</p>
                ) : null}
              </div>
            ))}

            <div className="flex flex-col">
              {config.socialLabel ? (
                <p className="pb-3 text-[14px] leading-5">{config.socialLabel}</p>
              ) : null}
              <div className="flex flex-wrap items-center gap-3">
                {config.social.map((s) => {
                  const icon = (s.icon ?? "").trim();
                  return (
                    <Link
                      key={s.id}
                      href={s.href}
                      aria-label={s.label}
                      className={
                        icon
                          ? "flex h-8 w-8 items-center justify-center rounded-full transition-opacity hover:opacity-80 lg:h-6 lg:w-6"
                          : "flex h-8 w-8 items-center justify-center rounded-full bg-white/87 text-[11px] font-bold text-[#004B7C] transition hover:bg-white lg:h-6 lg:w-6 lg:text-[9px]"
                      }
                    >
                      {icon ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={getMediaUrl(icon)}
                          alt={s.label}
                          className="h-full w-full object-contain"
                        />
                      ) : (
                        s.label.slice(0, 2).toUpperCase()
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Link columns */}
          {config.columns.map((col) => (
            <div key={col.id} className="flex flex-col">
              {col.title ? (
                <p className="pb-2 text-[14px] font-medium leading-5">{col.title}</p>
              ) : null}
              <ul className="flex flex-col">
                {col.links.map((link) => (
                  <li key={link.id} className="py-2">
                    <Link
                      href={link.href}
                      className="text-[14px] leading-5 transition-colors hover:text-white"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mobile / QR */}
          <div className="flex flex-col">
            {config.mobileTitle ? (
              <p className="pb-4 text-[16px] font-medium leading-6">{config.mobileTitle}</p>
            ) : null}
            {/* Mobile: Android & Apple buttons instead of QR */}
            <div className="flex flex-wrap justify-center gap-3 md:hidden">
              {config.qr.map((item, idx) => {
                const url = (item.url ?? "").trim();
                const platform = detectStorePlatform(item.label, url, idx);
                const cardClass =
                  "flex min-h-[64px] w-[calc(50%-6px)] items-center gap-3 rounded-xl px-3.5 py-2.5";
                const content = (
                  <>
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white/15 text-white">
                      {platform === "apple" ? <AppleIcon /> : <AndroidIcon />}
                    </span>
                    <span className="text-[14px] font-medium leading-5 text-white">
                      {item.label || (platform === "apple" ? "App Store" : "Google Play")}
                    </span>
                  </>
                );
                return url ? (
                  <a
                    key={item.id}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`${cardClass} bg-white/15 transition hover:bg-white/25`}
                  >
                    {content}
                  </a>
                ) : (
                  <div
                    key={item.id}
                    className={`${cardClass} bg-white/10`}
                  >
                    {content}
                  </div>
                );
              })}
            </div>
            {/* Desktop / tablet: QR codes */}
            <div className="hidden flex-col gap-4 md:flex">
              {config.qr.map((item) => {
                const url = (item.url ?? "").trim();
                return (
                  <div key={item.id} className="flex items-center gap-4">
                    {url ? (
                      <div className="flex h-[72px] w-[72px] shrink-0 items-center justify-center overflow-hidden rounded bg-white/87 p-1">
                        <QRCodeSVG value={url} size={64} level="M" aria-label={item.label} />
                      </div>
                    ) : null}
                    <span className="text-[14px] leading-5">{item.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="max-w-[1360px] text-[12px] leading-4 tracking-[0.4px]">
          <p>{config.copyright}</p>
          {config.license ? <p className="mt-1">{config.license}</p> : null}
        </div>
      </div>
    </footer>
  );
}
