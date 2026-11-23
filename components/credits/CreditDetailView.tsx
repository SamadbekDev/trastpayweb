"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import LoanCalculator from "@/components/LoanCalculator";
import { CalculatorConfig, I18nText } from "@/types/pageConfig";
import { CreditPageContent, CreditProduct } from "@/types/credits";
import CreditAppBanner from "./CreditAppBanner";
import CreditBreadcrumbs from "./CreditBreadcrumbs";
import CreditPhoto from "./CreditPhoto";
import CreditProductStats, { buildCreditStats } from "./CreditProductStats";
import { useCreditText } from "./text";

function toLoanConfig(page: CreditPageContent): CalculatorConfig {
  const calc = page.calculator;
  return {
    tabs: calc.tabs.map((tab) => ({ id: tab.id, label: tab.label })),
    resultLabel: calc.resultLabel,
    resultNote: calc.resultNote,
    amountLabel: calc.amountLabel,
    termLabel: calc.termQuestion,
    amountMin: calc.amountMin,
    amountMax: calc.amountMax,
    amountDefault: calc.amountDefault,
    termMinMonths: calc.termMin,
    termMaxMonths: calc.termMax,
    termDefaultMonths: calc.termDefault,
    toggles: calc.toggles.map((toggle) => ({
      id: toggle.id,
      label: toggle.label,
      defaultOn: toggle.defaultOn,
    })),
    primaryCta: calc.primaryCta,
    secondaryCta: calc.secondaryCta,
    disclaimer: calc.disclaimer,
    baseRate: calc.rate,
  };
}

function StepList({
  steps,
  color,
  text,
}: {
  steps: CreditPageContent["channels"][number]["steps"];
  color: string;
  text: (value?: Parameters<ReturnType<typeof useCreditText>>[0]) => string;
}) {
  return (
    <>
      {steps.map((step, index) => (
        <div key={step.id} className="flex items-start gap-3.5">
          <span
            className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-[10px] text-[15px] font-bold leading-[18px] text-white"
            style={{ backgroundColor: color }}
          >
            {index + 1}
          </span>
          <div className="flex min-w-0 flex-col gap-[3px]">
            <p className="text-[16px] font-semibold leading-[19px] text-[#0F1F3D]">{text(step.title)}</p>
            <p className="text-[14px] font-normal leading-[1.45] text-[#5B6B85]">{text(step.text)}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default function CreditDetailView({
  page,
  product,
  statLabels,
}: {
  page: CreditPageContent;
  product?: CreditProduct;
  statLabels?: { rate: I18nText; amount: I18nText; term: I18nText };
}) {
  const text = useCreditText();
  const infoTabs = page.infoTabs || [];
  const [infoTab, setInfoTab] = useState(infoTabs[0]?.id || "");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const activeInfo = infoTabs.find((tab) => tab.id === infoTab) || infoTabs[0];
  const faq = page.faq || [];
  const visibleFaq = showAllFaq ? faq : faq.slice(0, 7);
  const heroTitle = text(page.heroTitle);
  const heroSubtitle = text(page.heroSubtitle);
  const heroImage = page.heroImage || "";
  const productStats = buildCreditStats({ product, page, text, statLabels });
  const statsHeader = (
    text(product?.statsTitle) ||
    (heroTitle ? `Условия кредита · ${heroTitle}` : "")
  ).toUpperCase();

  const catalogLabel = text(page.catalogCrumb);
  const currentLabel = text(product?.title) || heroTitle || text(page.breadcrumb);

  return (
    <div className="w-full bg-white">
      <section className="bg-white px-4 pb-8 pt-6 lg:pb-10">
        <div className="mx-auto mb-6 w-full max-w-[1176px]">
          <CreditBreadcrumbs catalogLabel={catalogLabel} currentLabel={currentLabel} />
        </div>
        <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-3">
          <div className="flex w-full flex-col items-center gap-6" style={{ maxWidth: 912 }}>
            <h1 className="w-full text-center text-[28px] font-bold leading-9 tracking-[-0.02em] text-black/80 sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[48px]">
              {heroTitle}
            </h1>
            {heroSubtitle ? (
              <p className="max-w-[720px] text-center text-[15px] font-normal leading-5 text-black/80">
                {heroSubtitle}
              </p>
            ) : null}
          </div>
          {text(page.heroPrimary) ? (
            <div className="pt-6">
              <Link
                href={page.heroPrimaryHref || "#calculator"}
                className="inline-flex items-center justify-center rounded-xl bg-[#2D6EE3] px-4 text-center text-[15px] font-medium leading-5 text-white"
                style={{ width: 215, height: 56 }}
              >
                {text(page.heroPrimary)}
              </Link>
            </div>
          ) : null}
        </div>
        {heroImage ? (
          <div
            className="relative mx-auto mt-10 overflow-hidden rounded-[32px] bg-[#F4F6F9]"
            style={{ height: 480, width: "min(1080px, 100%)" }}
          >
            <CreditPhoto src={heroImage} className="object-cover object-center" />
          </div>
        ) : null}
      </section>

      <CreditProductStats header={statsHeader} items={productStats} />

      {page.channels.length > 0 && (
        <section id="zayavka" className="bg-white px-4 pb-12 pt-8 lg:px-[120px] lg:pt-14">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7">
            <div className="flex flex-col gap-1.5">
              <h2 className="text-[32px] font-bold leading-[39px] text-[#0F1F3D]">{text(page.howToTitle)}</h2>
              <p className="text-[16px] leading-[19px] text-[#5B6B85]">{text(page.howToSubtitle)}</p>
            </div>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {page.channels.map((channel) => (
                <article
                  key={channel.id}
                  className="flex flex-col items-start gap-5 rounded-[20px] border border-[#E2E8F2] bg-white p-6 shadow-[0px_8px_24px_rgba(15,33,71,0.08)]"
                >
                  <span
                    className="inline-flex rounded-full px-3.5 py-[7px] text-[13px] font-semibold leading-4"
                    style={{ backgroundColor: `${channel.tone}1F`, color: channel.tone }}
                  >
                    {text(channel.badge)}
                  </span>
                  <h3 className="text-[22px] font-bold leading-[27px] text-[#0F1F3D]">{text(channel.title)}</h3>
                  <div className="flex w-full flex-col gap-5">
                    <StepList steps={channel.steps} color={channel.tone} text={text} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <LoanCalculator config={toLoanConfig(page)} embedded />

      {infoTabs.length > 0 && activeInfo && (
        <section className="bg-white px-4 py-16 lg:px-20">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-9">
            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
              <h2 className="text-[32px] font-bold leading-[48px] text-[#0F0F17] lg:text-[40px]">
                {text(page.infoTitle)}
              </h2>
              <div className="flex max-w-full flex-wrap items-center gap-1 rounded-full bg-[#EBEDF2] p-1.5">
                {infoTabs.map((tab) => {
                  const active = tab.id === infoTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setInfoTab(tab.id)}
                      className={`cursor-pointer rounded-full px-[22px] py-3 text-[16px] leading-[19px] ${
                        active
                          ? "bg-white font-semibold text-[#0F0F17] shadow-[0px_2px_6px_rgba(0,0,0,0.08)]"
                          : "font-medium text-[#6B7280]"
                      }`}
                    >
                      {text(tab.label)}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_480px]">
              <div className="flex flex-col gap-5 rounded-3xl bg-[#F3F4F7] px-6 py-8 sm:px-10 sm:py-9">
                <h3 className="text-[26px] font-bold leading-9 text-[#0F0F17] sm:text-[30px]">
                  {text(activeInfo.title)}
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {activeInfo.items.map((item, index) => (
                    <li key={`${activeInfo.id}-${index}`} className="flex items-start gap-2.5 text-[16px] leading-6 text-[#3A3F4B]">
                      <span className="text-[#6B7280]">—</span>
                      <span>{text(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#7EB0FF_0%,#1B61D9_70%)] lg:min-h-[360px]">
                {page.infoImage ? (
                  <CreditPhoto src={page.infoImage} className="object-cover" />
                ) : (
                  <>
                    <div className="absolute -right-6 bottom-0 h-48 w-48 rounded-full bg-white/20" />
                    <div className="absolute left-8 top-10 h-24 w-36 rounded-2xl bg-white/25" />
                    <div className="absolute bottom-10 left-10 h-28 w-44 rounded-2xl bg-[#F3C969]" />
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {page.related.length > 0 && (
        <section className="flex flex-col items-center justify-center gap-8 bg-white py-10">
          <div className="flex w-full items-center justify-center px-4 lg:h-36 lg:px-[120px]">
            <h2 className="w-full max-w-[912px] text-center text-[32px] font-bold leading-[48px] text-black/80 lg:text-[40px]">
              {text(page.relatedTitle)}
            </h2>
          </div>
          <div className="flex w-full max-w-[1244px] flex-col items-stretch gap-4 px-4 lg:flex-row lg:px-0">
            {page.related.map((offer) => (
              <article
                key={offer.id}
                className="flex w-full flex-col items-center rounded-[32px] bg-[#F6F7F8] px-4 pt-6 lg:h-[431px] lg:w-[404px] lg:shrink-0"
              >
                <div className="flex w-full max-w-[372px] flex-col items-center gap-12 py-3">
                  <div className="flex w-full flex-col items-center gap-4 text-center">
                    <h3 className="w-full text-[26px] font-bold leading-[31px] text-[#1A1A1A]">{text(offer.title)}</h3>
                    <p className="w-full text-[18px] font-medium leading-[1.45] text-[#110C30]">{text(offer.text)}</p>
                  </div>
                  <div className="relative h-[220px] w-full overflow-hidden rounded-3xl sm:h-[262px]">
                    {offer.image ? <CreditPhoto src={offer.image} className="object-contain object-bottom" /> : null}
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section className="bg-[#FAFAFA] px-4 py-12">
          <div className="mx-auto w-full max-w-[1176px]">
            <h2 className="mb-10 text-[32px] font-bold leading-[48px] text-[#1A1A2E] lg:text-[40px]">
              {text(page.faqTitle)}
            </h2>
            <div className="flex flex-col gap-4">
              {visibleFaq.map((item, index) => {
                const open = openFaq === index;
                return (
                  <div key={item.id} className="rounded-2xl bg-white shadow-[0px_2px_20px_rgba(21,93,241,0.05)]">
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : index)}
                      className="flex w-full cursor-pointer items-start justify-between gap-4 px-8 py-6 text-left"
                    >
                      <span className="text-[20px] leading-[30px] tracking-[-0.6px] text-[#2F3441] lg:text-[24px]">
                        {text(item.question)}
                      </span>
                      <ChevronDown
                        size={28}
                        className={`mt-1 shrink-0 text-[#606981] transition-transform ${open ? "rotate-180" : ""}`}
                      />
                    </button>
                    {open && (
                      <p className="px-8 pb-6 text-[16px] leading-6 text-[#606981]">{text(item.answer)}</p>
                    )}
                  </div>
                );
              })}
            </div>
            {!showAllFaq && faq.length > 7 && (
              <button
                type="button"
                onClick={() => setShowAllFaq(true)}
                className="mt-12 inline-flex h-14 cursor-pointer items-center rounded-lg border border-[#9EADD4] px-6 text-[18px] tracking-[-0.4px] text-[#2F3441]"
              >
                {text(page.faqMore)}
              </button>
            )}
          </div>
        </section>
      )}

      <CreditAppBanner
        title={text(page.appTitle)}
        text={text(page.appText)}
        primary={text(page.appPrimary)}
        secondary={text(page.appSecondary)}
        primaryHref={page.appPrimaryHref?.trim() || "#calculator"}
        secondaryHref={page.appSecondaryHref?.trim() || "/kredity"}
        image={page.appImage}
      />
    </div>
  );
}
