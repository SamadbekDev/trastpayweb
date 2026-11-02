"use client";

import Link from "next/link";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

interface DepositDocumentsProps {
  config: DepositDetailPageConfig;
}

function DownloadIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden>
      <path
        d="M9.5 6.5h8.2L22.5 11.3V25.5H9.5V6.5Z"
        stroke="#2966F2"
        strokeWidth="2.13"
        strokeLinejoin="round"
      />
      <path
        d="M17.5 6.5V11.3H22.5"
        stroke="#2966F2"
        strokeWidth="2.13"
        strokeLinejoin="round"
      />
      <path
        d="M16 14.5v7M12.5 18.5 16 22l3.5-3.5"
        stroke="#2966F2"
        strokeWidth="2.13"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Documents from CMS only — no static fallback list */
export default function DepositDocuments({ config }: DepositDocumentsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";
  const title = getLocalizedText(config.documentsTitle, lang);
  const documents = config.documents || [];

  if (!documents.length) return null;

  return (
    <section className="w-full bg-white px-4 py-8 lg:px-[120px]">
      <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-5">
        {title ? (
          <h2 className="text-[24px] font-bold leading-[130%] text-[#0F0F17]">
            {title}
          </h2>
        ) : null}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {documents.map((doc) => {
            const docTitle = getLocalizedText(doc.title, lang);
            const docDate = getLocalizedText(doc.date, lang);
            if (!docTitle) return null;
            return (
              <Link
                key={doc.id}
                href={doc.href || "#"}
                className="flex min-h-[97px] items-start gap-3.5 rounded-2xl border border-black/12 bg-white px-5 py-[18px] hover:border-[#2966F2]/40"
              >
                <span className="shrink-0 text-[#2966F2]">
                  <DownloadIcon />
                </span>
                <span className="flex min-w-0 flex-col gap-1">
                  <span className="text-[15px] font-semibold leading-[130%] text-[#0F0F17]">
                    {docTitle}
                  </span>
                  {docDate ? (
                    <span className="text-[13px] leading-[130%] text-[#2966F2]">
                      {docDate}
                    </span>
                  ) : null}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
