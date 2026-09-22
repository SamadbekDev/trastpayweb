"use client";

import Link from "next/link";
import { ExternalLink, FileText } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositDetailPageConfig } from "@/types/deposits";
import { Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

interface DepositDocumentsProps {
  config: DepositDetailPageConfig;
}

export default function DepositDocuments({ config }: DepositDocumentsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  return (
    <section className="w-full bg-[#FAFAFA] py-12">
      <div className="mx-auto w-full max-w-[1176px] px-4 lg:px-0">
        <h2 className="text-[32px] font-bold leading-[48px] text-[rgba(0,0,0,0.8)] lg:text-[40px]">
          {getLocalizedText(config.documentsTitle, lang)}
        </h2>
        <div className="mt-10 flex flex-col gap-[15px]">
          {config.documents.map((doc) => (
            <Link
              key={doc.id}
              href={doc.href || "#"}
              className="flex items-start gap-2 rounded-xl border border-[#D4D7DF] bg-white p-4"
            >
              <span className="flex h-12 w-12 shrink-0 items-center justify-center text-[#0A2896]">
                <FileText size={32} />
              </span>
              <span>
                <span className="block text-[18px] tracking-[-0.4px] text-[#0A2896]">
                  {getLocalizedText(doc.title, lang)}
                </span>
                <span className="mt-2 block text-[13px] tracking-[-0.4px] text-[#797F8E]">
                  {getLocalizedText(doc.date, lang)}
                </span>
              </span>
            </Link>
          ))}
        </div>
        <div className="mt-6 flex flex-col gap-2">
          {config.documentLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              className="inline-flex items-center gap-1 text-[18px] tracking-[-0.4px] text-[#3261EC]"
            >
              {getLocalizedText(link.label, lang)}
              <ExternalLink size={16} />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
