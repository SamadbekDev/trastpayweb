"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { I18nText } from "@/types/pageConfig";
import {
  CreditDocument,
  CreditPageContent,
  CreditProduct,
  CreditRateTable,
  CreditTextItem,
} from "@/types/credits";
import CreditAppBanner from "./CreditAppBanner";
import CreditBreadcrumbs from "./CreditBreadcrumbs";
import { CREDIT_HERO_FALLBACK, MICRO_FALLBACK } from "@/utils/figmaAssets";
import CreditPhoto from "./CreditPhoto";
import CreditProductStats, { buildCreditStats } from "./CreditProductStats";
import MicroLoanCalculator from "./MicroLoanCalculator";
import { useCreditText } from "./text";
import { getMediaUrl } from "@/utils/mediaHelper";

function StepLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="#3261EC" strokeWidth="1" />
      <circle cx="8" cy="8" r="2.2" fill="#3261EC" />
    </svg>
  );
}

function RateTableCard({
  table,
  text,
}: {
  table: CreditRateTable;
  text: (value?: I18nText | string | null) => string;
}) {
  return (
    <article
      className={`flex flex-col gap-5 rounded-3xl bg-[#F3F4F7] p-8 ${
        table.wide ? "lg:col-span-2" : ""
      }`}
    >
      <div className="flex flex-col gap-3">
        <h3 className="text-[24px] font-bold leading-[130%] text-[#0F0F17]">{text(table.title)}</h3>
        {text(table.subtitle) ? (
          <p className="text-[15px] leading-[130%] text-[#737885]">{text(table.subtitle)}</p>
        ) : null}
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[280px] border-collapse text-left">
          <thead>
            <tr className="border-b border-[#E0E3EB]">
              {table.columns.map((col, i) => (
                <th
                  key={i}
                  className="py-3.5 pr-4 text-[13px] font-medium leading-[130%] text-[#737885] first:pl-0 last:pr-0"
                >
                  {text(col)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {table.rows.map((row, ri) => (
              <tr key={ri} className="border-b border-[#E0E3EB]">
                {row.map((cell, ci) => (
                  <td
                    key={ci}
                    className={`py-3.5 pr-4 first:pl-0 last:pr-0 ${
                      ci === 0
                        ? "text-[16px] font-medium leading-[130%] text-[#0F0F17]"
                        : ci === 1
                          ? "text-[20px] font-semibold leading-[130%] text-[#2966F2]"
                          : "text-[20px] font-semibold leading-[130%] text-[#0F0F17]"
                    }`}
                  >
                    {text(cell)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {text(table.footnote) ? (
        <p className="text-[14px] leading-[130%] text-[#737885]">{text(table.footnote)}</p>
      ) : null}
    </article>
  );
}

function DownloadDocIcon() {
  return (
    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" aria-hidden className="shrink-0">
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

function DocumentCard({
  doc,
  text,
}: {
  doc: CreditDocument;
  text: (value?: I18nText | string | null) => string;
}) {
  return (
    <a
      href={doc.href || "#"}
      className="flex min-h-[95px] flex-1 items-start gap-[14px] rounded-2xl bg-white px-5 py-[18px] transition-opacity hover:opacity-90"
    >
      <DownloadDocIcon />
      <span className="flex min-w-0 flex-1 flex-col items-start gap-1">
        <span className="text-[15px] font-semibold leading-[130%] text-[#0F0F17]">
          {text(doc.title)}
        </span>
        {doc.date ? (
          <span className="text-[13px] font-normal leading-[130%] text-[#2966F2]">
            {text(doc.date)}
          </span>
        ) : null}
      </span>
    </a>
  );
}

/** Figma «documents» — #F3F4F7 · padding 32 · gap 20 · radius 24 */
function DocumentsSection({
  documents,
  text,
  title,
}: {
  documents: CreditDocument[];
  text: (value?: I18nText | string | null) => string;
  title?: string;
}) {
  if (!documents.length) return null;
  return (
    <section className="w-full bg-white px-4 pb-8 pt-4 lg:px-20">
      <div
        className="mx-auto flex w-full max-w-[1280px] flex-col items-start gap-5 rounded-[24px] bg-[#F3F4F7] p-8"
      >
        {title ? (
          <h2 className="text-[24px] font-bold leading-[130%] text-[#0F0F17]">{title}</h2>
        ) : null}
        <div className="flex w-full flex-col items-stretch gap-4 md:flex-row">
          {documents.map((doc) => (
            <DocumentCard key={doc.id} doc={doc} text={text} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function CreditMicroView({
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
  const [infoTab, setInfoTab] = useState(infoTabs[0]?.id || "terms");
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);
  const activeInfo = infoTabs.find((tab) => tab.id === infoTab) || infoTabs[0];
  const faq = page.faq || [];
  const visibleFaq = showAllFaq ? faq : faq.slice(0, 7);
  const heroTitle = text(page.heroTitle);
  const heroSubtitle = text(page.heroSubtitle);
  // Figma «Микрозайм»: hero banner when the CMS has none
  const heroImage = page.heroImage || CREDIT_HERO_FALLBACK;
  const requirementsImage = page.requirementsImage || heroImage;

  const highlightStats = (page.highlights || [])
    .map((item) => ({
      id: item.id,
      value: text(item.title),
      label: text(item.text),
    }))
    .filter((item) => item.value);

  const productStats =
    highlightStats.length > 0
      ? highlightStats
      : buildCreditStats({ product, page, text, statLabels });

  const statsHeader = (
    text(product?.statsTitle) ||
    (heroTitle ? text({ ru: "Условия микрозайма", uz: "Mikroqarz shartlari", en: "Microloan terms" }) : "")
  ).toUpperCase();

  const allRateTables = page.rateTables || [];
  const tabRateTables = allRateTables.filter((table) => table.tabId === infoTab);
  const documents = page.documents || [];
  const showDocs = infoTab === "docs";
  const showTabRates = tabRateTables.length > 0;
  const showTermsLayout = infoTab === "terms" || (!showTabRates && !showDocs);

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
            <h1 className="w-full text-center text-[28px] font-bold leading-9 text-black/80 sm:text-[36px] sm:leading-[44px] lg:text-[40px] lg:leading-[48px]">
              {heroTitle}
            </h1>
            {heroSubtitle ? (
              <p className="w-full text-center text-[18px] font-normal leading-7 text-black/80 sm:text-[24px] sm:leading-7">
                {heroSubtitle}
              </p>
            ) : null}
          </div>
          {text(page.heroPrimary) ? (
            <div className="pt-6">
              <Link
                href={page.heroPrimaryHref || "#calculator"}
                className="inline-flex h-14 w-[205px] items-center justify-center rounded-xl bg-[#2D6EE3] text-center text-[15px] font-medium leading-5 text-white"
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
            <CreditPhoto src={heroImage} fallback={CREDIT_HERO_FALLBACK} className="object-cover object-center" />
          </div>
        ) : null}
      </section>

      <CreditProductStats header={statsHeader} items={productStats} headerBg="#2D6EE3" />

      {page.benefits.length > 0 ? (
        <section className="bg-white px-4 py-10 lg:px-[120px]">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7">
            <h2 className="text-[32px] font-bold leading-[39px] text-[#12122B]">
              {text(page.whyTitle)}
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {page.benefits.slice(0, 3).map((item) => {
                const icon = item.image?.trim() ? getMediaUrl(item.image) : "";
                return (
                  <article
                    key={item.id}
                    className="flex flex-col items-start gap-3 rounded-2xl bg-[#F4F6F9] px-6 py-[26px]"
                  >
                    {icon ? (
                      <Image
                        src={icon}
                        alt=""
                        width={36}
                        height={36}
                        unoptimized
                        className="h-9 w-9 object-contain"
                      />
                    ) : null}
                    <h3 className="text-[18px] font-semibold leading-[22px] text-[#12122B]">
                      {text(item.title)}
                    </h3>
                    <p className="text-[14px] leading-[145%] text-[#6B7280]">{text(item.text)}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      ) : null}

      {(text(page.calloutTitle) || text(page.calloutText)) && (
        <section className="bg-white px-4 py-10 lg:px-[120px]">
          <div className="mx-auto flex w-full max-w-[1200px] items-start rounded-2xl bg-[#E8F0FF] px-6 py-5">
            <p className="text-[16px] font-medium leading-[130%] text-[#0F0F17]">
              {text(page.calloutTitle)
                ? `${text(page.calloutTitle)}. ${text(page.calloutText)}`.trim()
                : text(page.calloutText)}
            </p>
          </div>
        </section>
      )}

      {page.requirements.length > 0 ? (
        <section className="flex w-full flex-col items-center justify-center bg-white px-4 py-10 lg:px-[120px]">
          {/* Figma Frame 2131333255: row · gap 24 · 1200×413 */}
          <div className="flex w-full max-w-[1200px] flex-col items-stretch gap-6 md:flex-row md:items-center md:gap-6">
            <div className="flex w-full shrink-0 flex-col gap-6 md:h-[413px] md:w-[440px]">
              {page.requirements.map((block, blockIndex) => (
                <article
                  key={block.id}
                  className={`box-border flex w-full flex-col items-start rounded-[20px] border border-[#E7EAF0] px-8 py-6 ${
                    blockIndex === 0
                      ? "gap-3 bg-[#F6F7F8] md:h-[182px] md:shrink-0"
                      : "gap-3.5 bg-white md:h-[207px] md:shrink-0"
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
            <div className="relative h-[240px] w-full min-w-0 flex-1 overflow-hidden rounded-[24px] bg-[#F6F7F8] sm:h-[320px] md:h-[413px]">
              {requirementsImage ? (
                <CreditPhoto
                  src={requirementsImage}
                  fallback={MICRO_FALLBACK.requirements}
                  className="object-cover object-center"
                />
              ) : null}
            </div>
          </div>
        </section>
      ) : null}

      {page.steps.length > 0 && (
        <section id="zayavka" className="overflow-visible bg-white px-4 py-10 lg:px-[100px] lg:pb-20 lg:pt-10">
          <div className="relative mx-auto flex w-full max-w-[1240px] flex-col items-start">
            {/* Figma TOP: 1240×340 · radius 32 32 0 0 */}
            <div className="relative h-[280px] w-full overflow-visible rounded-t-[32px] sm:h-[340px]">
              {/* Rectangle 240654494: 1240×330 · bottom 10 · #1468A9 */}
              <div className="absolute bottom-2.5 left-0 h-[250px] w-full rounded-t-[32px] bg-[#1468A9] sm:h-[330px]" />

              {/* Frame 2131333233: left 32 · top 32 · w 794 · gap 12 */}
              <div className="absolute left-4 top-6 z-10 flex w-[min(794px,58%)] flex-col items-start gap-3 sm:left-8 sm:top-8">
                <h2 className="w-full text-[32px] font-bold leading-[116%] tracking-[-0.02em] text-white sm:text-[48px]">
                  {text(page.stepsBannerTitle)}
                </h2>
                <p className="w-full text-[18px] font-normal leading-[120%] text-white sm:text-[24px]">
                  {text(page.stepsBannerSubtitle)}
                </p>
                {text(page.stepsCta) && (
                  <div className="flex items-center pt-3">
                    <Link
                      href={page.stepsCtaHref || "#calculator"}
                      className="inline-flex h-12 items-center justify-center rounded-xl bg-white py-[15px] pl-6 pr-4 text-[15px] font-semibold leading-[18px] text-[#1468A9]"
                    >
                      {text(page.stepsCta)}
                    </Link>
                  </div>
                )}
              </div>

              {/* image 1: 433×317 · left 843 · top 0 */}
              {page.stepsBannerImage ? (
                <div className="pointer-events-none absolute left-[52%] top-0 z-[1] hidden h-[317px] w-[min(433px,46%)] sm:block lg:left-[843px] lg:w-[433px]">
                  <CreditPhoto
                    src={page.stepsBannerImage}
                    fallback={MICRO_FALLBACK.steps}
                    className="object-contain object-left-top"
                  />
                </div>
              ) : null}
            </div>
            <div
              className="relative z-10 w-full rounded-[32px] bg-white p-8 shadow-[0px_4px_24px_rgba(6,9,17,0.12)]"
              style={{ marginTop: -52 }}
            >
              <div className="flex flex-wrap items-center justify-center gap-x-6">
                {page.steps.map((step: CreditTextItem, index: number) => (
                  <div
                    key={step.id}
                    className="flex h-auto w-full max-w-[384px] flex-1 flex-col justify-center pb-4 pt-11 sm:min-w-[240px] lg:h-[220px] lg:w-[276px] lg:max-w-[384px]"
                  >
                    <article className="relative flex h-[160px] w-full flex-col rounded-3xl bg-[#F6F7F8] px-8 pb-8 pt-12">
                      <span className="absolute -top-7 left-8 flex h-14 w-14 items-center justify-center rounded-[18px] bg-[#1468A9] text-[24px] font-medium leading-7 text-white">
                        {index + 1}
                      </span>
                      <h3 className="text-[15px] font-semibold leading-5 text-black/80">
                        {text(step.title)}
                      </h3>
                      <p className="mt-2 text-[14px] leading-[18px] tracking-[-0.02em] text-[#797F8E]">
                        {text(step.text)}
                      </p>
                      {text(step.link) &&
                        (step.href ? (
                          <Link
                            href={step.href}
                            className="mt-auto flex items-center gap-1 pt-3 text-[14px] leading-[18px] tracking-[-0.4px] text-[#3261EC]"
                          >
                            {text(step.link)}
                            <StepLinkIcon />
                          </Link>
                        ) : (
                          <span className="mt-auto flex items-center gap-1 pt-3 text-[14px] leading-[18px] tracking-[-0.4px] text-[#3261EC]">
                            {text(step.link)}
                            <StepLinkIcon />
                          </span>
                        ))}
                    </article>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      <MicroLoanCalculator calc={page.calculator} />

      {infoTabs.length > 0 && activeInfo && (
        <section id="info" className="bg-white px-4 py-16 lg:px-20">
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

            {showTabRates ? (
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {tabRateTables.map((table) => (
                  <RateTableCard key={table.id} table={table} text={text} />
                ))}
              </div>
            ) : null}

            {showDocs ? (
              <div className="flex flex-col gap-5 rounded-3xl bg-[#F3F4F7] px-8 py-9 lg:px-10">
                <h3 className="text-[30px] font-bold leading-9 text-[#0F0F17]">
                  {text(activeInfo.title)}
                </h3>
                <ul className="flex flex-col gap-3.5">
                  {activeInfo.items.map((item, index) => (
                    <li
                      key={`${activeInfo.id}-${index}`}
                      className="flex items-start gap-2.5 text-[16px] leading-6 text-[#3A3F4B]"
                    >
                      <span className="text-[#6B7280]">—</span>
                      <span>{text(item)}</span>
                    </li>
                  ))}
                </ul>
                {documents.length > 0 ? (
                  <a
                    href="#documents"
                    className="mt-1 inline-flex text-[16px] font-semibold leading-6 text-[#2966F2]"
                  >
                    {text({ ru: "Скачать образцы", uz: "Namunalarni yuklab olish", en: "Download templates" })} ↓
                  </a>
                ) : null}
              </div>
            ) : null}

            {showTermsLayout && !showTabRates && !showDocs ? (
              <div className="grid grid-cols-1 items-stretch gap-8 lg:grid-cols-[minmax(0,1fr)_480px]">
                <div className="flex flex-col gap-5 rounded-3xl bg-[#F3F4F7] px-10 py-9">
                  <h3 className="text-[30px] font-bold leading-9 text-[#0F0F17]">
                    {text(activeInfo.title)}
                  </h3>
                  <ul className="flex flex-col gap-3.5">
                    {activeInfo.items.map((item, index) => (
                      <li
                        key={`${activeInfo.id}-${index}`}
                        className="flex items-start gap-2.5 text-[16px] leading-6 text-[#3A3F4B]"
                      >
                        <span className="text-[#6B7280]">—</span>
                        <span>{text(item)}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="relative min-h-[280px] overflow-hidden rounded-3xl bg-[linear-gradient(160deg,#7EB0FF_0%,#1B61D9_70%)] lg:min-h-[360px]">
                  {page.infoImage ? (
                    <CreditPhoto src={page.infoImage} fallback={MICRO_FALLBACK.info} className="object-cover" />
                  ) : (
                    <>
                      <div className="absolute -right-6 bottom-0 h-48 w-48 rounded-full bg-white/20" />
                      <div className="absolute left-8 top-10 h-24 w-36 rounded-2xl bg-white/25" />
                      <div className="absolute bottom-10 left-10 h-28 w-44 rounded-2xl bg-[#F3C969]" />
                    </>
                  )}
                </div>
              </div>
            ) : null}
          </div>
        </section>
      )}

      {/* Rates + «Кулай-микрозайм», then documents */}
      {allRateTables.length > 0 ? (
        <section className="bg-white px-4 pb-4 pt-16 lg:px-20">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
            {text(page.conditionsTitle) ? (
              <div className="flex flex-col gap-3">
                <h2 className="text-[40px] font-bold leading-[130%] text-[#0F0F17]">
                  {text(page.conditionsTitle)}
                </h2>
              </div>
            ) : null}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              {allRateTables
                .filter((t) => t.tabId === "rates")
                .map((table) => (
                  <RateTableCard key={table.id} table={table} text={text} />
                ))}
            </div>
            {allRateTables
              .filter((t) => t.tabId === "kulay")
              .map((table) => (
                <RateTableCard key={table.id} table={table} text={text} />
              ))}
          </div>
        </section>
      ) : null}

      <div id="documents">
        <DocumentsSection documents={documents} text={text} />
      </div>

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
                  <div
                    key={item.id}
                    className="rounded-2xl bg-white shadow-[0px_2px_20px_rgba(21,93,241,0.05)]"
                  >
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
                        className={`mt-1 shrink-0 text-[#606981] transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {open && (
                      <p className="px-8 pb-6 text-[16px] leading-6 text-[#606981]">
                        {text(item.answer)}
                      </p>
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

      <div id="app">
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
    </div>
  );
}
