"use client";

import { useState } from "react";
import Image from "@/components/ui/SkeletonImage";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  CreditPageContent,
  CreditProduct,
  CreditTextItem,
} from "@/types/credits";
import { I18nText } from "@/types/pageConfig";
import CreditAppBanner from "./CreditAppBanner";
import CreditBreadcrumbs from "./CreditBreadcrumbs";
import CreditPhoto from "./CreditPhoto";
import CreditPriceCalculator from "./CreditPriceCalculator";
import CreditProductStats, { buildCreditStats } from "./CreditProductStats";
import { creditProductImage } from "./productImages";
import { useCreditText } from "./text";
import { getMediaUrl } from "@/utils/mediaHelper";
import { brandHref } from "./autoBrands";

function dealerHref(item: CreditTextItem) {
  if (item.href) return item.href;
  return brandHref(`${item.title.ru} ${item.title.uz} ${item.title.en}`, item.id);
}

function StepLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="#3261EC" strokeWidth="1" />
      <circle cx="8" cy="8" r="2.2" fill="#3261EC" />
    </svg>
  );
}

const DEALER_TONES = [
  "from-[#123F9C] to-[#5B8DEF]",
  "from-[#1A2233] to-[#5B6B85]",
  "from-[#0D2F56] to-[#3F8AE0]",
  "from-[#16324F] to-[#7A8699]",
  "from-[#10243A] to-[#2D6EE3]",
];

export default function CreditAutoView({
  page,
  product,
  image,
  heroVariant = "banner",
  showDealers = false,
  statLabels,
}: {
  page: CreditPageContent;
  product?: CreditProduct;
  image?: string;
  heroVariant?: "banner" | "showcase";
  showDealers?: boolean;
  statLabels?: { rate: I18nText; amount: I18nText; term: I18nText };
}) {
  const text = useCreditText();
  const infoTabs = page.infoTabs || [];
  const [infoTab, setInfoTab] = useState(infoTabs[0]?.id || "");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const activeInfo = infoTabs.find((tab) => tab.id === infoTab) || infoTabs[0];
  const faq = page.faq || [];
  const visibleFaq = showAllFaq ? faq : faq.slice(0, 6);
  const wideDealers = page.dealers.filter((item) => item.wide);
  const compactDealers = page.dealers.filter((item) => !item.wide);
  const heroTitle = text(page.heroTitle);
  const heroSubtitle = text(page.heroSubtitle);
  const heroImage = image || page.heroImage || (product ? creditProductImage(product) : "") || "";
  const requirementsImage = page.requirementsImage || heroImage;
  const showcaseRequirements = page.requirements;
  const productStats = buildCreditStats({ product, page, text, statLabels });
  const statsHeader = (
    text(product?.statsTitle) ||
    (heroTitle ? `${text({ ru: "Условия покупки в", uz: "Xarid shartlari:", en: "Purchase terms for" })} ${heroTitle}` : "")
  ).toUpperCase();
  const catalogLabel = text(page.catalogCrumb);
  const currentLabel = text(product?.title) || heroTitle || text(page.breadcrumb);

  return (
    <div className="w-full bg-white">
      {heroVariant === "showcase" ? (
        <section className="bg-white px-4 pb-10 pt-6">
          <div className="mx-auto mb-6 w-full max-w-[1176px]">
            <CreditBreadcrumbs catalogLabel={catalogLabel} currentLabel={currentLabel} />
          </div>
          <div className="mx-auto flex w-full max-w-[1080px] flex-col items-center gap-3">
            <div className="flex w-full flex-col items-center gap-6" style={{ maxWidth: 912 }}>
              <h1 className="w-full text-center text-[28px] font-bold leading-9 tracking-[-0.02em] text-black/80 sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[48px]">
                {heroTitle}
              </h1>
              {heroSubtitle ? (
                <p className="max-w-[592px] text-center text-[15px] font-normal leading-5 text-black/80">
                  {heroSubtitle}
                </p>
              ) : null}
            </div>
            {text(page.heroPrimary) && (
              <div className="pt-6">
                <Link
                  href={page.heroPrimaryHref || "#zayavka"}
                  className="inline-flex items-center justify-center rounded-xl bg-[#2D6EE3] px-4 text-center text-[15px] font-medium leading-5 text-white"
                  style={{ width: 215, height: 56 }}
                >
                  {text(page.heroPrimary)}
                </Link>
              </div>
            )}
          </div>
          <div className="relative mx-auto mt-8 h-[220px] w-full max-w-[1080px] overflow-hidden rounded-[24px] bg-[#F4F6F9] sm:mt-10 sm:h-[360px] sm:rounded-[32px] lg:h-[480px]">
            {heroImage ? <CreditPhoto src={heroImage} className="object-cover object-center" /> : null}
          </div>
        </section>
      ) : (
      <section className="relative overflow-hidden bg-[#1B61D9] lg:h-[480px]">
        <div className="relative mx-auto flex w-full max-w-[1176px] flex-col gap-6 px-4 pt-6 lg:h-full lg:px-0">
          <CreditBreadcrumbs
            catalogLabel={catalogLabel}
            currentLabel={currentLabel}
            variant="dark"
          />
          <div className="flex min-h-[320px] flex-col gap-6 lg:h-[400px] lg:min-h-[400px] lg:flex-row lg:items-start lg:justify-between lg:gap-6">
            <div className="flex w-full max-w-[576px] flex-col py-8 lg:h-[400px] lg:py-12">
              <div className="flex w-full flex-col gap-4">
                <h1 className="text-[36px] font-semibold leading-[50px] text-white sm:text-[48px]">
                  {heroTitle}
                </h1>
                <p className="text-[17px] font-normal leading-[1.5] text-[#C7D6EE]">
                  {heroSubtitle}
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-start gap-4">
                {text(page.heroPrimary) && (
                  <Link
                    href={page.heroPrimaryHref || "#zayavka"}
                    className="inline-flex h-14 min-h-14 items-center justify-center rounded-xl bg-white px-6 text-[18px] font-medium leading-[22px] text-[#1B61D9]"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {text(page.heroPrimary)}
                  </Link>
                )}
                {text(page.heroSecondary) && (
                  <Link
                    href={page.heroSecondaryHref || "#calculator"}
                    className="inline-flex h-14 min-h-14 items-center justify-center rounded-xl bg-white/12 px-6 text-[18px] font-medium leading-[22px] text-white"
                    style={{ fontFamily: "var(--font-display)" }}
                  >
                    {text(page.heroSecondary)}
                  </Link>
                )}
              </div>
            </div>
            <div className="relative h-[280px] w-full sm:h-[360px] lg:hidden">
              {heroImage ? <CreditPhoto src={heroImage} className="object-contain object-bottom" /> : null}
            </div>
          </div>
        </div>
        {heroImage ? (
          <div className="pointer-events-none absolute bottom-[39px] left-[calc(50%+79px)] hidden h-[360px] w-[551px] lg:block">
            <CreditPhoto src={heroImage} className="object-contain object-bottom" />
          </div>
        ) : null}
      </section>
      )}

      {heroVariant === "showcase" ? <CreditProductStats header={statsHeader} items={productStats} /> : null}

      {/* Showcase: «Почему удобно» — 3 benefit cards */}
      {heroVariant === "showcase" && page.benefits.length > 0 ? (
        <section className="bg-white px-4 pt-10 pb-6 lg:px-[120px]">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7">
            <h2 className="text-[32px] font-bold leading-[39px] text-[#1A1A1A]">
              {text(page.whyTitle) || text({ ru: "Почему удобно", uz: "Nega qulay", en: "Why it's convenient" })}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {page.benefits.slice(0, 3).map((item) => {
                const icon = item.image?.trim() ? getMediaUrl(item.image) : "";
                return (
                  <article
                    key={item.id}
                    className="flex flex-col items-center gap-4 rounded-[20px] bg-[#F4F6F9] px-6 py-6 text-center"
                  >
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#E8EEF8]">
                      {icon ? (
                        <Image
                          src={icon}
                          alt=""
                          width={28}
                          height={28}
                          unoptimized
                          className="h-7 w-7 object-contain"
                        />
                      ) : null}
                    </div>
                    <div className="flex flex-col items-center gap-1.5">
                      <h3 className="text-[20px] font-bold leading-6 text-[#1A1A1A]">
                        {text(item.title)}
                      </h3>
                      <p className="text-[14px] leading-[1.45] text-[#6B7280]">
                        {text(item.text)}
                      </p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {/* Showcase: Figma «Блок условия» — always shown (CMS or fallback) */}
      {heroVariant === "showcase" ? (
        <section className="flex w-full flex-col items-center justify-center bg-white px-4 py-10 lg:px-[120px] lg:pb-20 lg:pt-10">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch gap-6 lg:h-[388px] lg:flex-row lg:items-center lg:gap-6">
            <div className="flex w-full flex-col gap-6 lg:h-[388px] lg:w-[440px] lg:shrink-0">
              {showcaseRequirements.map((block, blockIndex) => (
                <article
                  key={block.id}
                  className={`box-border flex flex-col items-start gap-3.5 rounded-[20px] border border-[#E7EAF0] px-8 py-6 ${
                    blockIndex === 0 ? "bg-[#F6F7F8]" : "bg-white"
                  }`}
                >
                  <h3 className="text-[20px] font-bold leading-6 text-[#12122B]">
                    {text(block.title)}
                  </h3>
                  {block.items.map((item, index) => (
                    <p
                      key={`${block.id}-${index}`}
                      className="flex w-full items-start gap-2.5 text-[14px] font-normal leading-[148%] text-[#3A3F4B]"
                    >
                      <span className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-[#3261EC]" />
                      <span>{text(item)}</span>
                    </p>
                  ))}
                </article>
              ))}
            </div>
            <div className="relative h-[240px] w-full overflow-hidden rounded-[24px] bg-[#F6F7F8] sm:h-[320px] lg:h-[388px] lg:min-w-0 lg:flex-1">
              {requirementsImage ? (
                <CreditPhoto
                  src={requirementsImage}
                  className="object-cover object-center"
                />
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {heroVariant !== "showcase" && page.benefits.length > 0 && (
        <section className="bg-white px-4 py-10 lg:px-[120px]">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7">
            <h2 className="text-[32px] font-bold leading-[39px] text-[#12122B]">{text(page.whyTitle)}</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              {page.benefits.map((item) => {
                const icon = item.image?.trim() ? getMediaUrl(item.image) : "";
                return (
                  <article key={item.id} className="flex flex-col items-center gap-3 rounded-2xl bg-[#F4F6F9] px-6 py-[26px] text-center">
                    {icon ? (
                      <Image src={icon} alt="" width={36} height={36} unoptimized className="h-9 w-9 object-contain" />
                    ) : null}
                    <h3 className="text-[18px] font-semibold leading-[22px] text-[#12122B]">{text(item.title)}</h3>
                    <p className="text-[14px] leading-[1.45] text-[#6B7280]">{text(item.text)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {heroVariant !== "showcase" && page.conditions.length > 0 && (
        <section className="bg-white px-4 py-6 lg:px-[120px]">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
            <h2 className="text-[32px] font-bold leading-[39px] text-[#12122B]">{text(page.conditionsTitle)}</h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {page.conditions.slice(0, 2).map((item) => (
                <ConditionCard key={item.id} title={text(item.title)} text={text(item.text)} />
              ))}
            </div>
            {page.conditions.length > 2 && (
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {page.conditions.slice(2, 5).map((item) => (
                  <ConditionCard key={item.id} title={text(item.title)} text={text(item.text)} />
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {heroVariant !== "showcase" && page.requirements.length > 0 && (
        <section className="flex flex-col items-center bg-white px-4 pb-20 pt-10 lg:px-[120px]">
          <div className="flex w-full max-w-[1200px] flex-col items-stretch gap-6 lg:flex-row lg:items-center">
            <div className="flex w-full flex-col gap-6 lg:w-[440px] lg:shrink-0">
              {page.requirements.map((block, blockIndex) => (
                <article
                  key={block.id}
                  className={`box-border flex flex-col items-start gap-3.5 rounded-[20px] border border-[#E7EAF0] px-8 py-6 ${
                    blockIndex === 0 ? "bg-[#F6F7F8]" : "bg-white"
                  }`}
                >
                  <h3 className="text-[20px] font-bold leading-6 text-[#12122B]">{text(block.title)}</h3>
                  {block.items.map((item, index) => (
                    <p key={`${block.id}-${index}`} className="flex w-full items-start gap-2.5 text-[14px] font-normal leading-[1.48] text-[#3A3F4B]">
                      <span className="mt-2 h-[7px] w-[7px] shrink-0 rounded-full bg-[#3261EC]" />
                      <span>{text(item)}</span>
                    </p>
                  ))}
                </article>
              ))}
            </div>
            <div className="relative h-[220px] w-full max-w-[736px] overflow-hidden rounded-[24px] bg-[#F6F7F8] sm:h-[320px] lg:h-[388px] lg:min-w-0 lg:flex-1">
              {requirementsImage ? <CreditPhoto src={requirementsImage} className="object-contain object-center" /> : null}
            </div>
          </div>
        </section>
      )}

      {page.steps.length > 0 && (
        <section id="zayavka" className="overflow-visible bg-white px-4 py-16 lg:px-[100px]">
          <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-start">
            {/* phones: the banner grows with its text (full width) and the car goes under it;
                from sm: Figma layout — the car on the right of a 340px banner */}
            <div className="relative w-full rounded-t-[32px] bg-[#0D2F56] px-5 pb-16 pt-7 sm:h-[340px] sm:bg-transparent sm:p-0">
              <div className="absolute bottom-2.5 left-0 hidden h-[330px] w-full overflow-hidden rounded-t-[32px] bg-[#0D2F56] sm:block">
                {page.stepsBannerImage ? (
                  <div
                    className="pointer-events-none absolute right-0"
                    style={{ bottom: 49, width: "min(490px, 46%)", height: 270 }}
                  >
                    <CreditPhoto src={page.stepsBannerImage} className="object-contain object-right-bottom" />
                  </div>
                ) : null}
              </div>
              <div className="relative z-10 flex w-full flex-col items-start gap-3 sm:absolute sm:left-8 sm:top-8 sm:w-[min(794px,56%)] lg:w-[794px]">
                <h2
                  className="text-[28px] font-bold leading-[1.16] tracking-[-0.02em] text-white sm:text-[48px]"
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
                      className="inline-flex h-[54px] items-center gap-3 rounded-xl bg-white py-[15px] pl-6 pr-4 text-[15px] font-semibold leading-[18px] text-[#0D2F56]"
                    >
                      {text(page.stepsCta)}
                    </Link>
                  </div>
                )}
              </div>
              {page.stepsBannerImage ? (
                <div className="pointer-events-none relative mt-4 h-[170px] w-full sm:hidden">
                  <CreditPhoto src={page.stepsBannerImage} className="object-contain object-center" />
                </div>
              ) : null}
            </div>
            <div
              className="relative z-10 w-full rounded-[32px] bg-white p-8 shadow-[0px_4px_24px_rgba(6,9,17,0.12)]"
              style={{ marginTop: -52 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6">
                {page.steps.map((step, index) => (
                  <div key={step.id} className="flex h-auto w-full max-w-[384px] flex-1 flex-col justify-center pb-4 pt-11 sm:min-w-[240px] lg:h-[220px] lg:w-[276px] lg:max-w-[384px]">
                    <article className="relative flex h-[160px] w-full flex-col rounded-3xl bg-[#F6F7F8] px-8 pb-8 pt-12">
                      <span
                        className="absolute -top-7 left-8 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#103E90] text-[24px] font-medium leading-7 text-white"
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

      {showDealers && page.dealers.length > 0 && (
        <section className="bg-[#F6F7F8] px-4 py-16 lg:px-[120px] lg:py-20">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6">
            <h2 className="text-[32px] font-bold leading-[48px] text-[#1A1A2E] lg:text-[40px]">
              {text(page.dealersTitle)}
            </h2>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {wideDealers.map((item) => (
                <DealerCard key={item.id} item={item} tall toneIndex={page.dealers.indexOf(item)} cta={text(page.calculator.secondaryCta)} />
              ))}
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {compactDealers.map((item) => (
                <DealerCard key={item.id} item={item} tall={false} toneIndex={page.dealers.indexOf(item)} cta={text(page.calculator.secondaryCta)} />
              ))}
            </div>
          </div>
        </section>
      )}

      {infoTabs.length > 0 && activeInfo && (
        <section className="bg-white px-4 py-16 lg:px-20">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-9">
            <div className="flex flex-col items-start justify-between gap-4 lg:flex-row lg:items-center">
              <h2 className="text-[32px] font-bold leading-[48px] text-[#0F0F17] lg:text-[40px]">{text(page.infoTitle)}</h2>
              <div className="flex flex-wrap items-start gap-2.5">
                {infoTabs.map((tab) => {
                  const active = tab.id === infoTab;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setInfoTab(tab.id)}
                      className={`inline-flex cursor-pointer items-center rounded-full px-[18px] py-[11px] text-[14px] leading-[17px] transition-colors ${
                        active
                          ? "bg-[#0F1F3D] font-semibold text-white"
                          : "border border-[#E2E8F2] bg-[#F4F7FB] font-medium text-[#0F1F3D] hover:bg-[#EAEFF8]"
                      }`}
                    >
                      {text(tab.label)}
                    </button>
                  );
                })}
              </div>
            </div>
            <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_480px]">
              <div className="flex flex-col gap-4 rounded-3xl bg-[#F3F4F7] px-6 py-8 sm:px-10 sm:py-9">
                <h3 className="text-[24px] font-bold leading-6 text-[#0F0F17]">{text(activeInfo.title)}</h3>
                <ul className="flex min-w-0 flex-col gap-3">
                  {activeInfo.items.map((item, index) => (
                    <li key={`${activeInfo.id}-${index}`} className="flex items-start gap-2.5 text-[15px] leading-[1.48] text-[#3A3F4B]">
                      <span className="mt-1.5 h-[7px] w-[7px] shrink-0 rounded-full bg-[#1958D6]" />
                      {text(item)}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="relative min-h-[260px] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#1A2233_0%,#3F8AE0_100%)] lg:min-h-[325px]">
                {page.infoImage ? (
                  <CreditPhoto src={page.infoImage} className="object-cover" />
                ) : (
                  <>
                    <div className="absolute bottom-8 left-8 right-8 h-16 rounded-[32px] bg-white/80" />
                    <div className="absolute bottom-12 left-16 h-10 w-24 rounded-t-2xl bg-[#123B78]" />
                  </>
                )}
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
                    <button type="button" aria-expanded={open} onClick={() => setOpenFaq(open ? null : index)} className="flex w-full cursor-pointer items-start justify-between gap-4 px-8 py-6 text-left">
                      <span className="text-[18px] leading-[30px] tracking-[-0.6px] text-[#2F3441] lg:text-[24px]">{text(item.question)}</span>
                      <ChevronDown size={28} className={`mt-1 shrink-0 text-[#606981] transition-transform ${open ? "rotate-180" : ""}`} />
                    </button>
                    {open && <p className="px-8 pb-6 text-[16px] leading-6 text-[#606981]">{text(item.answer)}</p>}
                  </div>
                );
              })}
            </div>
            {!showAllFaq && faq.length > 6 && (
              <button type="button" onClick={() => setShowAllFaq(true)} className="mt-12 inline-flex h-14 cursor-pointer items-center rounded-lg border border-[#9EADD4] px-6 text-[18px] tracking-[-0.4px] text-[#2F3441]">
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

function ConditionCard({ title, text }: { title: string; text: string }) {
  return (
    <article className="flex h-full flex-col gap-3 rounded-[20px] bg-[#F4F6F9] p-8">
      <h3 className="text-[20px] font-semibold leading-7 text-black/80">{title}</h3>
      <p className="text-[14px] leading-6 text-black/80">{text}</p>
    </article>
  );
}

function DealerCard({
  item,
  tall,
  toneIndex,
  cta,
}: {
  item: CreditTextItem;
  tall: boolean;
  toneIndex: number;
  cta: string;
}) {
  const text = useCreditText();
  const [active, setActive] = useState(false);
  const href = dealerHref(item);
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white">
      <Link href={href} className={`relative block w-full overflow-hidden ${item.image ? "bg-[#E8EDF1]" : `bg-gradient-to-br ${DEALER_TONES[toneIndex % DEALER_TONES.length]}`} ${tall ? "h-[248px]" : "h-[208px]"}`}>
        {item.image ? (
          <CreditPhoto src={item.image} className="object-cover" />
        ) : (
          <>
            <div className="absolute bottom-6 left-8 right-8 h-10 rounded-full bg-white/25" />
            <div className="absolute bottom-8 left-12 h-8 w-16 rounded-t-xl bg-white/50" />
          </>
        )}
      </Link>
      <div className="flex flex-col items-start gap-4 px-6 pb-6 pt-4">
        <Link href={href}>
          <h3 className="text-[20px] font-medium leading-6 text-black/80">{text(item.title)}</h3>
        </Link>
        <p className="text-[14px] leading-[18px] tracking-[-0.02em] text-black/80">{text(item.text)}</p>
        <Link
          href={dealerHref(item)}
          onMouseEnter={() => setActive(true)}
          onMouseLeave={() => setActive(false)}
          className="inline-flex h-[42px] items-center justify-center rounded-xl px-3 text-[14px] leading-[18px]"
          style={{
            backgroundColor: active ? "#2D6EE3" : "#E8EDF1",
            color: active ? "#FFFFFF" : "#2D6EE3",
            transition: "background-color 0.2s, color 0.2s",
          }}
        >
          {cta}
        </Link>
      </div>
    </article>
  );
}
