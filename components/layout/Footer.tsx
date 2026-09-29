"use client";

import Image from "next/image";
import Link from "next/link";
import { FooterConfig } from "@/types/pageConfig";
import { getMediaUrl } from "@/utils/mediaHelper";

interface FooterProps {
  config?: FooterConfig;
}

export default function Footer({ config }: FooterProps) {
  if (!config) return null;

  return (
    <footer className="w-full bg-[#004B7C] text-white pt-12 pb-8">
      <div className="mx-auto w-full max-w-[1280px] px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Contacts + social */}
          <div>
            <div className="flex flex-col gap-5">
              {config.phones.map((phone) => (
                <div key={phone.id}>
                  <a
                    href={`tel:${phone.number.replace(/\s/g, "")}`}
                    className="text-[22px] font-bold tracking-tight hover:text-white/80"
                  >
                    {phone.number}
                  </a>
                  <p className="mt-1 text-[13px] text-white/50">{phone.note}</p>
                </div>
              ))}
            </div>

            <p className="mt-8 text-[13px] text-white/50 mb-3">{config.socialLabel}</p>
            <div className="flex items-center gap-2">
              {config.social.map((s) => (
                <Link
                  key={s.id}
                  href={s.href}
                  aria-label={s.label}
                  className="w-9 h-9 rounded-full bg-white text-black flex items-center justify-center text-[11px] font-bold hover:bg-white/90"
                >
                  {s.label.slice(0, 2).toUpperCase()}
                </Link>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {config.columns.map((col) => (
            <div key={col.id}>
              {col.title && (
                <p className="text-[14px] font-semibold mb-4 text-white/80">{col.title}</p>
              )}
              <ul className="flex flex-col gap-3">
                {col.links.map((link) => (
                  <li key={link.id}>
                    <Link
                      href={link.href}
                      className="text-[14px] text-white/70 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Mobile / QR */}
          <div>
            <p className="text-[16px] font-bold mb-4">{config.mobileTitle}</p>
            <div className="flex flex-col gap-4">
              {config.qr.map((item) => (
                <div key={item.id} className="flex items-center gap-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-white shrink-0">
                    <Image
                      src={getMediaUrl(item.image)}
                      alt={item.label}
                      fill
                      unoptimized
                      className="object-contain p-1"
                    />
                  </div>
                  <span className="text-[13px] text-white/70">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-white/10 text-[12px] text-white/40 leading-relaxed max-w-[720px]">
          <p>{config.copyright}</p>
          <p className="mt-2">{config.license}</p>
        </div>
      </div>
    </footer>
  );
}
