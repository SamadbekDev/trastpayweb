"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { FooterConfig } from "@/types/pageConfig";

interface FooterProps {
  config?: FooterConfig;
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
              <div className="flex items-center gap-3">
                {config.social.map((s) => (
                  <Link
                    key={s.id}
                    href={s.href}
                    aria-label={s.label}
                    className="flex h-6 w-6 items-center justify-center rounded-full bg-white/87 text-[9px] font-bold text-[#1D1F38] hover:bg-white"
                  >
                    {s.label.slice(0, 2).toUpperCase()}
                  </Link>
                ))}
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
            <div className="flex flex-col gap-4">
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
