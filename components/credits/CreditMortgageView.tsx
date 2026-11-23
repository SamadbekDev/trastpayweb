"use client";

import { useState } from "react";
import Link from "next/link";
import {
  BadgeCheck,
  Building2,
  ChevronDown,
  Headphones,
} from "lucide-react";
import { CreditPageContent, CreditProduct } from "@/types/credits";
import { I18nText } from "@/types/pageConfig";
import CreditAppBanner from "./CreditAppBanner";
import CreditBreadcrumbs from "./CreditBreadcrumbs";
import CreditPhoto from "./CreditPhoto";
import CreditPriceCalculator from "./CreditPriceCalculator";
import CreditProductStats, { buildCreditStats } from "./CreditProductStats";
import { useCreditText } from "./text";

const BENEFIT_ICONS = [Building2, BadgeCheck, Headphones];

function StepLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="#3261EC" strokeWidth="1" />
      <circle cx="8" cy="8" r="2.2" fill="#3261EC" />
    </svg>
  );
}

export default function CreditMortgageView({
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
  const borrower = page.requirements[0];
  const property = page.requirements[1];
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
                href={page.heroPrimaryHref || "#zayavka"}
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

      {page.benefits.length > 0 && (
        <section className="bg-white px-4 pb-10 pt-6 lg:px-[120px] lg:pt-14">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7">
            <h2 className="text-[32px] font-bold leading-[39px] text-[#12122B]">{text(page.whyTitle)}</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {page.benefits.map((item, index) => {
                const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length];
                return (
                  <article key={item.id} className="flex flex-col items-start gap-3 rounded-2xl bg-[#F4F6F9] px-6 py-[26px]">
                    <span className="flex h-16 w-16 items-center justify-center rounded-2xl bg-white text-[#3261EC]">
                      <Icon size={28} strokeWidth={1.7} />
                    </span>
                    <h3 className="text-[18px] font-semibold leading-[22px] text-[#12122B]">{text(item.title)}</h3>
                    <p className="text-[14px] leading-[1.45] text-[#6B7280]">{text(item.text)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {page.conditions.length > 0 && (
        <section className="bg-white px-4 pb-10 pt-6 lg:px-[120px]">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
            <h2 className="text-[32px] font-bold leading-[39px] text-[#12122B]">{text(page.conditionsTitle)}</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {page.conditions.map((item) => (
                <article key={item.id} className="flex flex-col gap-2.5 rounded-[20px] bg-[#F4F6F9] px-8 py-[30px]">
                  <h3 className="text-[22px] font-bold leading-[27px] text-[#12122B]">{text(item.title)}</h3>
                  <p className="text-[15px] leading-[1.5] text-[#6B7280]">{text(item.text)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {page.requirements.length > 0 && (
        <section className="flex flex-col items-center bg-white px-4 py-10 lg:px-[120px] lg:pb-20 lg:pt-10">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch gap-6 lg:h-[488px] lg:flex-row lg:items-center">
            <div className="flex w-full flex-col gap-6 lg:h-[488px] lg:w-[440px] lg:shrink-0">
              {borrower && (
                <article className="box-border flex flex-col items-start gap-3.5 rounded-[20px] border border-[#E7EAF0] bg-[#F6F7F8] px-8 py-6">
                  <h3 className="text-[20px] font-bold leading-6 text-[#12122B]">{text(borrower.title)}</h3>
                  {borrower.items.map((item, index) => (
                    <p key={`${borrower.id}-${index}`} className="flex w-full items-start gap-2.5 text-[14px] font-normal leading-[1.48] text-[#3A3F4B]">
                      <span className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-[#3261EC]" />
                      <span>{text(item)}</span>
                    </p>
                  ))}
                </article>
              )}
              {property && (
                <article className="box-border flex flex-col items-start gap-3.5 rounded-[20px] border border-[#E7EAF0] bg-white px-8 py-6">
                  <h3 className="text-[20px] font-bold leading-6 text-[#12122B]">{text(property.title)}</h3>
                  {property.items.map((item, index) => (
                    <p key={`${property.id}-${index}`} className="flex w-full items-start gap-2.5 text-[14px] font-normal leading-[1.48] text-[#3A3F4B]">
                      <span className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-[#3261EC]" />
                      <span>{text(item)}</span>
                    </p>
                  ))}
                </article>
              )}
            </div>
            <div className="relative h-[320px] w-full overflow-hidden rounded-[24px] bg-[#F6F7F8] sm:h-[420px] lg:h-[488px] lg:w-[736px] lg:shrink-0">
              {page.requirementsImage || heroImage ? (
                <div className="absolute bottom-0 right-0 h-full w-full lg:bottom-[-33px] lg:right-2 lg:h-[527px] lg:w-[678px]">
                  <CreditPhoto src={page.requirementsImage || heroImage} className="object-cover object-center" />
                </div>
              ) : null}
            </div>
          </div>
        </section>
      )}

      {page.steps.length > 0 && (
        <section id="zayavka" className="overflow-visible bg-white px-4 py-16 lg:px-[100px]">
          <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-start">
            <div className="relative h-[300px] w-full sm:h-[340px]">
              <div
                className="absolute bottom-2.5 left-0 h-[260px] w-full overflow-hidden rounded-t-[32px] sm:h-[330px]"
                style={{ backgroundColor: "#A07E6A" }}
              >
                {page.stepsBannerImage ? (
                  <div className="pointer-events-none absolute right-0 top-0" style={{ width: 483, height: 330 }}>
                    <CreditPhoto src={page.stepsBannerImage} className="object-contain object-right" />
                  </div>
                ) : null}
              </div>
              <div className="absolute left-4 top-8 flex w-[min(794px,58%)] flex-col items-start gap-3 sm:left-8 lg:w-[794px]">
                <h2
                  className="text-[32px] font-bold leading-[1.16] tracking-[-0.02em] text-white sm:text-[48px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {text(page.stepsBannerTitle)}
                </h2>
                <p
                  className="text-[18px] font-normal leading-[1.2] text-white sm:text-[24px]"
                  style={{ fontFamily: "var(--font-display)" }}
                >
                  {text(page.stepsBannerSubtitle)}
                </p>
                {text(page.stepsCta) && (
                  <div className="pt-3">
                    <Link
                      href={page.stepsCtaHref || "#calculator"}
                      className="inline-flex h-12 items-center rounded-xl bg-white py-[15px] pl-6 pr-4 text-[15px] font-semibold leading-[18px]"
                      style={{ color: "#A07E6A" }}
                    >
                      {text(page.stepsCta)}
                    </Link>
                  </div>
                )}
              </div>
            </div>
            <div
              className="relative z-10 w-full rounded-[32px] bg-white p-8 shadow-[0px_4px_24px_rgba(6,9,17,0.12)]"
              style={{ marginTop: -52 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6">
                {page.steps.map((step, index) => (
                  <div key={step.id} className="flex h-auto w-full max-w-[384px] flex-1 flex-col justify-center pb-4 pt-11 sm:min-w-[240px] lg:h-[220px] lg:w-[276px]">
                    <article className="relative flex h-[160px] w-full flex-col rounded-3xl bg-[#F6F7F8] px-8 pb-8 pt-12">
                      <span
                        className="absolute -top-7 left-8 flex h-14 w-14 items-center justify-center rounded-[18px] text-[24px] font-medium leading-7 text-white"
                        style={{ backgroundColor: "#A07E6A" }}
                      >
                        {index + 1}
                      </span>
                      <h3 className="text-[15px] font-semibold leading-5 text-black/80">{text(step.title)}</h3>
                      <p className="mt-2 text-[14px] leading-[18px] tracking-[-0.02em] text-[#797F8E]">{text(step.text)}</p>
                      {text(step.link) && (
                        step.href ? (
                          <Link href={step.href} className="mt-auto flex items-center gap-1 pt-3 text-[14px] leading-[18px] tracking-[-0.4px] text-[#3261EC]">
                            {text(step.link)}
                            <StepLinkIcon />
                          </Link>
                        ) : (
                          <span className="mt-auto flex items-center gap-1 pt-3 text-[14px] leading-[18px] tracking-[-0.4px] text-[#3261EC]">
                            {text(step.link)}
                            <StepLinkIcon />
                          </span>
                        )
                      )}
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <CreditPriceCalculator calc={page.calculator} />

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
                <h3 className="text-[26px] font-bold leading-9 text-[#0F0F17] sm:text-[30px]">{text(activeInfo.title)}</h3>
                <ul className="flex flex-col gap-3.5">
                  {activeInfo.items.map((item, index) => (
                    <li key={`${activeInfo.id}-${index}`} className="flex items-start gap-2.5 text-[16px] leading-6 text-[#3A3F4B]">
                      <span className="text-[#6B7280]">—</span>
                      <span>{text(item)}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#F4D7A1_0%,#E7B15A_55%,#1B61D9_100%)] lg:min-h-[360px]">
                {page.infoImage ? <CreditPhoto src={page.infoImage} className="object-cover" /> : null}
              </div>
            </div>
          </div>
        </section>
      )}

      {faq.length > 0 && (
        <section className="bg-[#FAFAFA] px-4 py-12">
          <div className="mx-auto w-full max-w-[1176px]">
            <h2 className="mb-10 text-[32px] font-bold leading-[48px] text-[#1A1A2E] lg:text-[40px]">{text(page.faqTitle)}</h2>
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
                    {open && <p className="px-8 pb-6 text-[16px] leading-6 text-[#606981]">{text(item.answer)}</p>}
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
        primaryHref={page.appPrimaryHref?.trim() || "#zayavka"}
        secondaryHref={page.appSecondaryHref?.trim() || "/kredity"}
        image={page.appImage}
      />
    </div>
  );
}
