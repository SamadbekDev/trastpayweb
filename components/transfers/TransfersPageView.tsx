"use client";

import { Fragment, useMemo, useState } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useTranslation } from "react-i18next";
import CreditAppBanner from "@/components/credits/CreditAppBanner";
import Footer from "@/components/layout/Footer";
import Header from "@/components/layout/Header";
import type { FooterConfig, HeaderConfig, I18nText } from "@/types/pageConfig";
import type {
  TransferSystemFilter,
  TransfersPageConfig,
} from "@/types/transfers";
import { getLocalizedText } from "@/utils/i18nHelper";
import { getMediaUrl } from "@/utils/mediaHelper";

type Props = {
  config: TransfersPageConfig;
  header?: HeaderConfig | null;
  footer?: FooterConfig | null;
};

function StepLinkIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" aria-hidden className="shrink-0">
      <circle cx="8" cy="8" r="6.2" fill="none" stroke="#3261EC" strokeWidth="1" />
      <circle cx="8" cy="8" r="2.2" fill="#3261EC" />
    </svg>
  );
}

function BenefitIcon({ index }: { index: number }) {
  if (index === 0) {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
        <circle cx="18" cy="18" r="18" fill="#004B7C" />
        <path
          d="M18 8.5c-4.2 0-7.5 2.4-7.5 6.2 0 4.6 5.4 9.5 7.1 10.8a.6.6 0 0 0 .8 0c1.7-1.3 7.1-6.2 7.1-10.8 0-3.8-3.3-6.2-7.5-6.2Z"
          fill="#fff"
          opacity="0.95"
        />
        <circle cx="18" cy="15" r="2.2" fill="#004B7C" />
      </svg>
    );
  }
  if (index === 1) {
    return (
      <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
        <circle cx="18" cy="18" r="18" fill="#004B7C" />
        <path
          d="M18 7.5 27 11v7.2c0 5.3-3.7 9.1-9 10.8-5.3-1.7-9-5.5-9-10.8V11l9-3.5Z"
          fill="#F1F2FF"
        />
        <path
          d="m14.2 17.6 2.4 2.4 5.2-5.2"
          fill="none"
          stroke="#004B7C"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="36" height="36" viewBox="0 0 36 36" aria-hidden>
      <circle cx="18" cy="18" r="18" fill="#004B7C" />
      <circle cx="18" cy="18" r="8.5" fill="none" stroke="#fff" strokeWidth="2.2" />
      <path
        d="M18 12.5v6l4 2.2"
        fill="none"
        stroke="#fff"
        strokeWidth="2.2"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function TransfersPageView({ config: data, header, footer }: Props) {
  const { i18n } = useTranslation();
  const lang = i18n.language || "ru";
  const t = (val?: I18nText | string | null) => getLocalizedText(val, lang);

  const [systemFilter, setSystemFilter] = useState<TransferSystemFilter>("all");
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const [showAllFaq, setShowAllFaq] = useState(false);

  const systems = useMemo(
    () =>
      (data.systems || []).filter((s) =>
        systemFilter === "all" ? true : s.filter?.includes(systemFilter)
      ),
    [data.systems, systemFilter]
  );

  const faqItems = data.faq?.items || [];
  const visibleFaq = showAllFaq ? faqItems : faqItems.slice(0, 4);

  const filterLabels: ReadonlyArray<readonly [TransferSystemFilter, string]> =
    lang.startsWith("uz")
      ? [
          ["all", "Barcha tizimlar"],
          ["cis", "Rossiya va MDH"],
          ["world", "Butun dunyo"],
        ]
      : lang.startsWith("en")
        ? [
            ["all", "All systems"],
            ["cis", "Russia & CIS"],
            ["world", "Worldwide"],
          ]
        : [
            ["all", "Все системы"],
            ["cis", "Россия и СНГ"],
            ["world", "Весь мир"],
          ];

  const speedLabel = lang.startsWith("uz") ? "Tezlik" : lang.startsWith("en") ? "Speed" : "Скорость";
  const currencyLabel = lang.startsWith("uz") ? "Valyuta" : lang.startsWith("en") ? "Currency" : "Валюта";
  const sendLabel = lang.startsWith("uz") ? "Yuborish" : lang.startsWith("en") ? "Sending" : "Отправка";
  const geoLabel = lang.startsWith("uz") ? "Geografiya" : lang.startsWith("en") ? "Geography" : "География";
  const feeLabel = lang.startsWith("uz") ? "Komissiya" : lang.startsWith("en") ? "Fee" : "Комиссия";
  const detailsLabel = lang.startsWith("uz") ? "Batafsil →" : lang.startsWith("en") ? "Details →" : "Подробнее →";

  const heroImageUrl = data.hero?.visualImage
    ? getMediaUrl(data.hero.visualImage, "")
    : "";
  const howToSendImageUrl = data.howToSend?.image
    ? getMediaUrl(data.howToSend.image, "")
    : "";
  const systemsBgUrl = data.systemsBgImage
    ? getMediaUrl(data.systemsBgImage, "")
    : "";

  return (
    <div className="flex min-h-screen flex-col bg-[#FAFAFA]">
      {header ? <Header config={header} showProductNav /> : null}

      <main className="flex-grow bg-[#FAFAFA]">
        {/* Hero */}
        <section className="bg-[#FAFAFA] px-4 py-10 lg:px-[120px]">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center gap-3">
            <div className="flex w-full max-w-[912px] flex-col items-center gap-6">
              <h1 className="w-full text-center text-[28px] font-bold leading-[1.17] text-black/80 sm:text-[36px] lg:text-[41.1px] lg:leading-12">
                {t(data.hero?.title)}
              </h1>
              <p className="w-full text-center text-[18px] font-normal leading-7 text-black/80 sm:text-[22px] lg:text-2xl lg:leading-7">
                {t(data.hero?.subtitle)}
              </p>
            </div>
            <div className="pt-6">
              <Link
                href={data.hero?.ctaHref || "/filialy"}
                className="inline-flex h-14 w-[216px] items-center justify-center rounded-xl bg-[#2D6EE3] px-4 text-[15px] font-medium leading-5 text-white"
              >
                {t(data.hero?.cta)}
              </Link>
            </div>
          </div>
        </section>

        {/* Hero visual */}
        <section className="bg-[#FAFAFA] px-4 py-10 lg:px-[120px]">
          <div
            className="mx-auto h-[220px] w-full max-w-[1200px] overflow-hidden rounded-[32px] sm:h-[360px] lg:h-[480px]"
            style={{
              background:
                "radial-gradient(circle at 30% 40%, #7EB6FF 0%, #2D6EE3 45%, #0B3A8C 100%)",
            }}
          >
            {heroImageUrl ? (
              <img
                src={heroImageUrl}
                alt={t(data.hero?.title)}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>
        </section>

        {/* Conditions */}
        <section className="flex flex-col items-center bg-[#FAFAFA] px-4 lg:px-[100px]">
          <div className="flex w-full max-w-[1240px] flex-col">
            <div className="relative flex h-[88px] items-center justify-center overflow-hidden rounded-t-[28px] bg-[#004B7C] sm:h-[112px]">
              <div
                aria-hidden
                className="pointer-events-none absolute -top-10 right-6 h-[200px] w-1 rotate-[28deg] bg-[#1958D6]/10"
              />
              <h2 className="relative z-10 px-4 text-center text-[22px] font-bold uppercase leading-8 text-white sm:text-[28px]">
                {t(data.conditions?.title)}
              </h2>
            </div>
            <div className="flex flex-col gap-6 rounded-b-[28px] border border-black/12 bg-white px-6 py-8 sm:flex-row sm:items-center sm:gap-6 sm:px-14 sm:py-10">
              {(data.conditions?.facts || []).map((fact, index) => (
                <Fragment key={fact.id || index}>
                  {index > 0 ? (
                    <div className="hidden h-16 w-px shrink-0 bg-[#ECECEC] sm:block" />
                  ) : null}
                  <div className="flex min-w-0 flex-1 flex-col gap-2.5">
                    <p className="text-[24px] font-bold leading-9 text-[#1A1A1A] sm:text-[30px]">
                      {t(fact.value)}
                    </p>
                    <p className="text-base leading-[19px] text-[#9AA0A6]">
                      {t(fact.label)}
                    </p>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section className="bg-[#FAFAFA] px-4 py-10 lg:px-[120px]">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-7">
            <h2 className="text-[28px] font-bold leading-[39px] text-[#12122B] sm:text-[32px]">
              {t(data.benefits?.title)}
            </h2>
            <div className="grid gap-6 md:grid-cols-3">
              {(data.benefits?.items || []).map((item, index) => (
                <article
                  key={item.id || index}
                  className="flex flex-col gap-3 rounded-2xl bg-[#F4F6F9] px-6 py-[26px]"
                >
                  <BenefitIcon index={index} />
                  <h3 className="text-lg font-semibold leading-[22px] text-[#12122B]">
                    {t(item.title)}
                  </h3>
                  <p className="text-sm leading-[145%] text-[#6B7280]">{t(item.text)}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Note */}
        <section className="bg-[#FAFAFA] px-4 pb-6 lg:px-[120px]">
          <div className="mx-auto w-full max-w-[1200px] rounded-2xl bg-[#E8F0FF] px-6 py-5">
            <p className="text-base font-medium leading-[130%] text-[#0F0F17]">
              {t(data.note)}
            </p>
          </div>
        </section>

        {/* How to send */}
        <section className="overflow-visible bg-[#FAFAFA] px-4 py-10 lg:px-[100px] lg:pb-20">
          <div className="relative mx-auto flex w-full max-w-[1240px] flex-col">
            <div className="relative -mb-[52px] w-full overflow-hidden rounded-t-[32px] bg-[#004B7C] px-4 pb-20 pt-6 sm:h-[340px] sm:px-8 sm:pb-24 sm:pt-8">
              <div className="relative z-10 flex max-w-[794px] flex-col gap-3">
                <h2 className="text-[30px] font-bold leading-[116%] tracking-[-0.02em] text-white sm:text-[48px]">
                  {t(data.howToSend?.title)}
                </h2>
                <p className="text-lg font-medium leading-[120%] text-white sm:text-2xl">
                  {t(data.howToSend?.subtitle)}
                </p>
                <div className="pt-3">
                  <Link
                    href={data.howToSend?.ctaHref || "/filialy"}
                    className="inline-flex h-12 items-center justify-center rounded-xl bg-white px-6 text-[15px] font-semibold leading-[18px] text-[#1468A9]"
                  >
                    {t(data.howToSend?.cta)}
                  </Link>
                </div>
              </div>
              {howToSendImageUrl ? (
                <img
                  src={howToSendImageUrl}
                  alt=""
                  aria-hidden
                  className="pointer-events-none hidden md:block md:absolute md:-right-6 md:-top-[2px] md:z-0 md:h-[299px] md:w-[409px] md:object-contain lg:left-[855px] lg:right-auto"
                />
              ) : null}
            </div>

            <div className="relative z-10 rounded-[32px] bg-white p-6 shadow-[0px_4px_24px_rgba(6,9,17,0.12)] sm:p-8">
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {(data.howToSend?.steps || []).map((step, index) => (
                  <article key={step.id || step.number || index} className="relative pt-7">
                    <div
                      className={`absolute top-0 z-10 flex h-14 w-14 items-center justify-center rounded-[17.5px] bg-[#004B7C] text-2xl font-medium text-white ${
                        index === 0
                          ? "left-8"
                          : index === 1
                            ? "left-1/2 -translate-x-1/2"
                            : index === 2
                              ? "right-14 left-auto"
                              : "right-8 left-auto"
                      }`}
                    >
                      {step.number}
                    </div>
                    <div className="flex min-h-[160px] flex-col rounded-3xl bg-[#F4F6F9] px-8 pb-8 pt-12">
                      <h3 className="text-[15px] font-semibold leading-5 text-black/80">
                        {t(step.title)}
                      </h3>
                      <p className="mt-2 text-[13px] leading-[15px] tracking-[-0.02em] text-[#797F8E]">
                        {t(step.text)}
                      </p>
                      <Link
                        href={step.href || "#"}
                        className="mt-3 inline-flex items-center gap-1 text-[13px] leading-[15px] tracking-[-0.4px] text-[#3261EC]"
                      >
                        {t(step.link)}
                        <StepLinkIcon />
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Systems */}
        <section
          id="systems"
          className="bg-cover bg-center bg-no-repeat px-4 py-10 lg:px-[92px] lg:py-[60px]"
          style={
            systemsBgUrl
              ? {
                  backgroundColor: "#040B1A",
                  backgroundImage: `url(${systemsBgUrl})`,
                }
              : {
                  background:
                    "radial-gradient(ellipse 65% 55% at 15% 15%, rgba(45, 110, 227, 0.45) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at 85% 85%, rgba(32, 128, 220, 0.35) 0%, transparent 60%), linear-gradient(180deg, #06142E 0%, #092B5A 50%, #041630 100%)",
                }
          }
        >
          <div
            className="mx-auto flex w-full max-w-[1256px] flex-col gap-7 rounded-[40px] p-6 backdrop-blur-[42px] sm:p-10"
            style={{
              background:
                "linear-gradient(109.17deg, rgba(255, 255, 255, 0.32) -3.74%, rgba(255, 255, 255, 0.2) 107.99%)",
            }}
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div className="flex max-w-[765px] flex-col gap-2">
                <h2 className="text-[28px] font-bold text-white sm:text-[36px]">
                  {t(data.systemsTitle)}
                </h2>
                <p className="text-base text-white/80">{t(data.systemsSubtitle)}</p>
              </div>
              <div className="flex w-fit gap-1 rounded-[14px] bg-[#F1F5F9] p-1">
                {filterLabels.map(([id, label]) => (
                  <button
                    key={id}
                    type="button"
                    aria-pressed={systemFilter === id}
                    onClick={() => setSystemFilter(id)}
                    className={`cursor-pointer rounded-[10px] px-5 py-2.5 text-sm font-medium ${
                      systemFilter === id
                        ? "bg-[#004B7C] text-white shadow-sm"
                        : "text-[#6B7280]"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {systems.map((system) => (
                <article
                  key={system.id}
                  className="flex flex-col gap-[18px] rounded-[18px] bg-white p-6"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl text-sm font-bold"
                      style={{
                        background: system.logoBg,
                        color: system.logoColor,
                      }}
                    >
                      {system.initials}
                    </div>
                    <h3 className="flex-1 text-xl font-semibold text-[#121229]">
                      {system.name}
                    </h3>
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                        system.tagTone === "blue"
                          ? "bg-[#E8F0FE] text-[#2966F2]"
                          : "bg-[#F1F5F9] text-[#4B5563]"
                      }`}
                    >
                      {t(system.tag)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-2.5 text-sm">
                    <div className="flex justify-between">
                      <span className="text-[#8A93A3]">{speedLabel}</span>
                      <span className="font-medium text-[#1A2233]">{t(system.speed)}</span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="shrink-0 text-[#8A93A3]">
                        {system.id === "as" ? sendLabel : currencyLabel}
                      </span>
                      <span className="text-right font-medium text-[#1A2233]">
                        {t(system.currency)}
                      </span>
                    </div>
                    <div className="flex justify-between gap-4">
                      <span className="shrink-0 text-[#8A93A3]">{geoLabel}</span>
                      <span className="text-right font-medium text-[#1A2233]">
                        {t(system.geography)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between rounded-xl bg-[#F1F5F9] px-4 py-3.5">
                    <span className="text-sm text-[#4B5563]">{feeLabel}</span>
                    <span className="text-xl font-bold text-[#123B78]">
                      {t(system.commission)}
                    </span>
                  </div>
                  <Link
                    href={system.href || "#tariffs"}
                    className="text-[15px] font-semibold text-[#2966F2]"
                  >
                    {detailsLabel}
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Tariffs */}
        <section id="tariffs" className="bg-[#FAFAFA] px-4 py-12 lg:px-20 lg:py-16">
          <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-8">
            <div className="flex max-w-[1078px] flex-col gap-3">
              <h2 className="text-[32px] font-bold leading-[130%] text-[#0F0F17] sm:text-[40px]">
                {t(data.tariffs?.title)}
              </h2>
              <p className="text-lg leading-[130%] text-[#737885]">
                {t(data.tariffs?.subtitle)}
              </p>
            </div>

            <div className="flex flex-col gap-5 rounded-3xl bg-[#F3F4F7] p-6 sm:p-8">
              <h3 className="text-2xl font-bold leading-[130%] text-[#0F0F17]">
                {t(data.tariffs?.cardTitle)}
              </h3>
              <p className="text-[15px] leading-[130%] text-[#737885]">
                {t(data.tariffs?.cardSubtitle)}
              </p>
              <div className="overflow-x-auto">
                <table className="min-w-full text-left md:table-fixed">
                  <thead>
                    <tr className="border-b border-[#E0E3EB]">
                      {(data.tariffs?.columns || []).map((col, idx) => (
                        <th
                          key={idx}
                          className="py-3.5 pr-4 text-[13px] font-medium leading-[130%] text-[#737885] md:w-1/4"
                        >
                          {t(col)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {(data.tariffs?.rows || []).map((row, rowIndex) => {
                      const cells = Array.isArray(row) ? row : row.cells || [];
                      const rowKey = Array.isArray(row) ? row[0] : row.id || rowIndex;
                      return (
                        <tr key={rowKey} className="border-b border-[#E0E3EB]">
                          {cells.map((cell, i) => (
                            <td
                              key={`${rowKey}-${i}`}
                              className={`py-3.5 pr-4 leading-[130%] ${
                                i === 0
                                  ? "text-base font-medium text-[#0F0F17]"
                                  : "text-xl font-semibold text-[#0F0F17]"
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <p className="text-sm leading-[130%] text-[#737885]">
                {t(data.tariffs?.footnote)}
              </p>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="bg-[#FAFAFA] px-4 py-12">
          <div className="mx-auto w-full max-w-[1176px]">
            <h2 className="mb-10 text-[32px] font-bold leading-[48px] text-[#1A1A2E] lg:text-[40px]">
              {t(data.faq?.title)}
            </h2>
            <div className="flex flex-col gap-4">
              {visibleFaq.map((item) => {
                const open = openFaq === item.id;
                return (
                  <div
                    key={item.id}
                    className="rounded-2xl bg-white shadow-[0px_2px_20px_rgba(21,93,241,0.05)]"
                  >
                    <button
                      type="button"
                      aria-expanded={open}
                      onClick={() => setOpenFaq(open ? null : item.id)}
                      className="flex w-full cursor-pointer items-start justify-between gap-4 px-8 py-6 text-left"
                    >
                      <span className="text-[20px] leading-[30px] tracking-[-0.6px] text-[#2F3441] lg:text-[24px]">
                        {t(item.q)}
                      </span>
                      <ChevronDown
                        size={28}
                        className={`mt-1 shrink-0 text-[#606981] transition-transform ${
                          open ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    {open ? (
                      <p className="px-8 pb-6 text-[16px] leading-6 text-[#606981]">
                        {t(item.a)}
                      </p>
                    ) : null}
                  </div>
                );
              })}
            </div>
            {!showAllFaq && faqItems.length > 4 ? (
              <button
                type="button"
                onClick={() => setShowAllFaq(true)}
                className="mt-12 inline-flex h-14 cursor-pointer items-center rounded-lg border border-[#9EADD4] px-6 text-[18px] tracking-[-0.4px] text-[#2F3441]"
              >
                {t(data.faq?.more)}
              </button>
            ) : null}
          </div>
        </section>

        <CreditAppBanner
          title={t(data.appBanner?.title)}
          text={t(data.appBanner?.text)}
          primary={t(data.appBanner?.primary)}
          primaryHref={data.appBanner?.primaryHref || "#"}
          secondary={t(data.appBanner?.secondary)}
          secondaryHref={data.appBanner?.secondaryHref || "/"}
        />
      </main>

      {footer ? <Footer config={footer} /> : null}
    </div>
  );
}
