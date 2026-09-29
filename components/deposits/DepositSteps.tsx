"use client";

import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { useTranslation } from "react-i18next";
import { DepositStep } from "@/types/deposits";
import { I18nText, Language } from "@/types/pageConfig";
import { getLocalizedText } from "@/utils/i18nHelper";

interface DepositStepsProps {
  config: { stepsTitle: I18nText; steps: DepositStep[] };
}

export default function DepositSteps({ config }: DepositStepsProps) {
  const { i18n } = useTranslation();
  const lang = (i18n.language?.split("-")[0].toLowerCase() as Language) || "ru";

  return (
    <section className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1280px] px-4 py-12 lg:px-6">
        <h2 className="text-[32px] font-bold leading-[48px] text-[rgba(0,0,0,0.8)] lg:text-[40px]">
          {getLocalizedText(config.stepsTitle, lang)}
        </h2>
        <div className="mt-8 grid gap-6 md:grid-cols-3">
          {config.steps.map((step, index) => (
            <article key={step.id} className="relative pt-7">
              <div
                className={`absolute top-0 z-10 flex h-14 w-14 items-center justify-center rounded-[17.5px] bg-[#2D6EE3] text-[24px] font-medium text-white ${
                  index === 0 ? "left-8" : index === 2 ? "right-8 left-auto" : "left-1/2 -translate-x-1/2"
                }`}
              >
                {step.number}
              </div>
              <div className="flex min-h-[160px] flex-col rounded-3xl bg-[#F6F7F8] px-8 pb-8 pt-12">
                <h3 className="text-[15px] font-semibold leading-5 text-[rgba(0,0,0,0.8)]">
                  {getLocalizedText(step.title, lang)}
                </h3>
                <p className="mt-2 align-middle font-[family-name:var(--font-roboto)] text-[13px] font-normal leading-[15px] tracking-[-0.02em] text-[#797F8E]">
                  {getLocalizedText(step.description, lang)}
                </p>
                {step.linkText && (
                  <Link
                    href={step.href || "#"}
                    className="mt-3 inline-flex items-center gap-1 text-[13px] tracking-[-0.4px] text-[#3261EC]"
                  >
                    {getLocalizedText(step.linkText, lang)}
                    <ExternalLink size={14} />
                  </Link>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
