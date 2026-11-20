"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ArrowUpRight, Check, CheckCircle2, Smartphone } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import SectionIndex from "@/components/content/SectionIndex";
import { PageContainer } from "@/components/ui/PageKit";
import BusinessLoanCalculator from "@/components/corporate/BusinessLoanCalculator";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { CORPORATE_DICT } from "@/i18n/dict/corporate";
import {
  CORPORATE_CARDS,
  CORPORATE_CATEGORIES,
  CORPORATE_PRODUCTS,
  CORPORATE_TARIFF_PLANS,
  CorporateCategoryId,
  TRUST_BUSINESS_FEATURES,
} from "@/data/corporatePage";

export default function BusinessPage() {
  const lang = useLang();
  const t = (s: string) => tr(lang, s, CORPORATE_DICT);
  const products = useMemo(() => trDeep(lang, CORPORATE_PRODUCTS, CORPORATE_DICT), [lang]);
  const cards = useMemo(() => trDeep(lang, CORPORATE_CARDS, CORPORATE_DICT), [lang]);
  const plans = useMemo(() => trDeep(lang, CORPORATE_TARIFF_PLANS, CORPORATE_DICT), [lang]);
  const features = useMemo(() => trDeep(lang, TRUST_BUSINESS_FEATURES, CORPORATE_DICT), [lang]);
  const [activeCategory, setActiveCategory] =
    useState<CorporateCategoryId>("all");

  const filteredProducts = useMemo(() => {
    if (activeCategory === "all") return products;
    return products.filter((p) => p.category === activeCategory);
  }, [activeCategory, products]);

  return (
    <StaticPageShell>
      {/* Hero B2B — real data from trustbank.uz/ru/corporate/ */}
      <section className="container-page pt-6">
        <div
          className="relative overflow-hidden rounded-panel p-6 text-white lg:p-12"
          style={{
            background: "linear-gradient(125deg, #0B2A4A 0%, #123B78 100%)",
          }}
        >
          <div className="relative z-10 flex flex-col justify-between gap-8 lg:flex-row lg:items-center">
            <div className="flex max-w-[660px] flex-col items-start gap-5">
              <span className="inline-flex items-center rounded-full bg-white/15 px-3.5 py-1.5 text-[13px] font-medium text-[#93C5FD]">
                {t("Корпоративным клиентам · ООО · ИП · МСБ")}
              </span>
              <h1 className="text-[32px] font-bold leading-[1.12] sm:text-[40px] lg:text-[44px]">
                {t("Расширьте свой бизнес с Трастбанком")}
              </h1>
              <p className="text-[16px] leading-[1.5] text-white/80 lg:text-[17px]">
                {t("Кредиты до 10 млрд сумов (в т.ч. наличными до 3–5 млрд сум), РКО, лизинг, гарантии, ВЭД, корпоративные карты и приложение Trust Bank Business — всё для развития вашей компании.")}
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link
                  href="/zayavki?tab=business"
                  className="inline-flex h-12 items-center justify-center rounded-tile bg-primary px-7 text-[15px] font-semibold text-white transition-colors hover:bg-primary-deep"
                >
                  {t("Станьте нашим клиентом")}
                </Link>
                <Link
                  href="/tarify"
                  className="inline-flex h-12 items-center justify-center rounded-tile bg-white/15 px-7 text-[15px] font-semibold text-white transition-colors hover:bg-white/25"
                >
                  {t("Тарифы РКО")}
                </Link>
              </div>
            </div>

            {/* Quick links + visual card */}
            <div className="flex w-full shrink-0 flex-col gap-4 rounded-card border border-white/15 bg-white p-6 text-ink shadow-lg lg:w-[360px]">
              <div className="relative h-32 w-full overflow-hidden rounded-tile">
                <Image
                  src="/images/static/corporate-hero.jpg"
                  alt={t("Корпоративные решения Трастбанка")}
                  fill
                  unoptimized
                  className="object-cover"
                />
              </div>
              <h2 className="text-[19px] font-bold text-ink">
                {t("Быстрые действия")}
              </h2>
              <div className="flex flex-col divide-y divide-line">
                <Link
                  href="/biznes/rko"
                  className="flex items-center justify-between py-2.5 text-[14px] font-medium text-[#122F60] hover:text-primary"
                >
                  <span>{t("Открыть расчётный счёт и РКО")}</span>
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/biznes/lizing"
                  className="flex items-center justify-between py-2.5 text-[14px] font-medium text-[#122F60] hover:text-primary"
                >
                  <span>{t("Финансовый лизинг и гарантии")}</span>
                  <ArrowUpRight size={16} />
                </Link>
                <Link
                  href="/biznes/zarplatnyj-proekt"
                  className="flex items-center justify-between py-2.5 text-[14px] font-medium text-[#122F60] hover:text-primary"
                >
                  <span>{t("Подключить зарплатный проект")}</span>
                  <ArrowUpRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Catalog with category tabs */}
      <section
        id="financing"
        className="container-page mt-14"
      >
        <div className="flex flex-col gap-2">
          <h2 className="text-[28px] font-bold text-ink lg:text-[34px]">
            {t("Продукты и услуги для бизнеса")}
          </h2>
          <p className="text-[15px] text-text-muted">
            {t("Актуальные программы кредитования, расчётно-кассового обслуживания, ВЭД и инвестиций с официального сайта trustbank.uz")}
          </p>
        </div>

        <div className="mt-6 flex flex-wrap gap-2.5">
          {CORPORATE_CATEGORIES.map((cat) => {
            const active = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`cursor-pointer rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                  active
                    ? "bg-[#12122B] text-white"
                    : "border border-line bg-white text-ink hover:bg-surface"
                }`}
              >
                {t(cat.label)}
              </button>
            );
          })}
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="flex flex-col justify-between gap-5 rounded-card border border-line bg-white p-6 transition-shadow hover:shadow-[0_8px_24px_rgba(18,18,43,0.06)]"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-center justify-between gap-2">
                  <span className="inline-flex rounded-full bg-primary-soft px-3 py-1 text-[12px] font-semibold text-primary">
                    {product.badge}
                  </span>
                  {product.rateLabel && (
                    <span className="text-[13px] font-semibold text-ink">
                      {product.rateLabel}
                    </span>
                  )}
                </div>
                <h3 className="text-[19px] font-bold leading-snug text-ink">
                  {product.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-text-muted">
                  {product.description}
                </p>
              </div>

              <div className="flex items-center justify-between border-t border-line pt-4">
                <span className="text-[12px] font-medium text-text-muted">
                  {product.termLabel}
                </span>
                <Link
                  href={product.href}
                  className="inline-flex items-center gap-1.5 text-[14px] font-semibold text-primary hover:text-primary-deep"
                >
                  <span>{t("Подробнее")}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Corporate Cards — Visa Business, Зарплатные, Корпоративная карта */}
      <section className="container-page mt-16">
        <h2 className="text-[28px] font-bold text-ink lg:text-[34px]">
          {t("Корпоративные пластиковые карты")}
        </h2>
        <p className="mt-1 text-[15px] text-text-muted">
          {t("Удобные расчёты для компании и сотрудников в Узбекистане и за рубежом")}
        </p>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          {cards.map((card) => (
            <div
              key={card.id}
              className="flex flex-col justify-between gap-5 rounded-card border border-line bg-white p-6"
            >
              <div className="flex flex-col gap-3">
                <span className="w-fit rounded-full bg-primary-soft px-3 py-1 text-[12px] font-semibold text-primary">
                  {card.badge}
                </span>
                <h3 className="text-[20px] font-bold text-ink">
                  {card.title}
                </h3>
                <p className="text-[14px] leading-relaxed text-text-muted">
                  {card.subtitle}
                </p>
              </div>
              <div className="flex items-center gap-3 border-t border-line pt-4">
                <Link
                  href={card.orderHref}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-tile bg-primary text-[14px] font-semibold text-white hover:bg-primary-deep"
                >
                  {t("Заказать")}
                </Link>
                <Link
                  href={card.detailHref}
                  className="inline-flex h-10 flex-1 items-center justify-center rounded-tile bg-surface text-[14px] font-semibold text-ink hover:bg-line"
                >
                  {t("Описание")}
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust Bank Business mobile app block */}
      <section className="container-page mt-16">
        <div className="flex flex-col justify-between gap-8 rounded-panel border border-line bg-white p-6 lg:flex-row lg:items-center lg:p-10">
          <div className="flex max-w-[540px] flex-col gap-4">
            <span className="inline-flex w-fit items-center gap-2 rounded-full bg-primary-soft px-3.5 py-1.5 text-[13px] font-semibold text-primary">
              <Smartphone size={15} />
              <span>{t("Мобильный банк для бизнеса")}</span>
            </span>
            <h2 className="text-[26px] font-bold text-ink lg:text-[32px]">
              Trust Bank Business
            </h2>
            <p className="text-[15px] leading-relaxed text-text-muted">
              {t("Мобильное приложение для юридических лиц и частных предпринимателей, являющихся клиентами ЧАБ «Трастбанк».")}
            </p>
            <Link
              href="/servisy#internet-bank"
              className="mt-1 inline-flex w-fit items-center gap-2 rounded-tile bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-deep"
            >
              <span>{t("Подробнее о ДБО")}</span>
              <ArrowRight size={15} />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:max-w-[560px]">
            {features.map((feat) => (
              <div
                key={feat}
                className="flex items-start gap-2.5 rounded-card bg-page p-3.5 text-[14px] text-ink"
              >
                <CheckCircle2
                  size={17}
                  className="mt-0.5 shrink-0 text-primary"
                />
                <span>{feat}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Loan Calculator */}
      <section className="container-page mt-16">
        <BusinessLoanCalculator />
      </section>

      {/* Corporate Tariffs Overview */}
      <section className="container-page mt-16 pb-16">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <h2 className="text-[28px] font-bold text-ink lg:text-[34px]">
              {t("Тарифные планы РКО")}
            </h2>
            <p className="mt-1 text-[15px] text-text-muted">
              {t("Линейка тарифов для классического и цифрового обслуживания бизнеса")}
            </p>
          </div>
          <Link
            href="/tarify"
            className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary hover:text-primary-deep"
          >
            <span>{t("Все тарифы и PDF")}</span>
            <ArrowRight size={16} />
          </Link>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className="flex flex-col justify-between gap-5 rounded-card border border-line bg-white p-6"
            >
              <div className="flex flex-col gap-3">
                <span className="w-fit rounded-full bg-surface px-3 py-1 text-[12px] font-semibold text-ink">
                  {plan.badge}
                </span>
                <h3 className="text-[18px] font-bold text-ink">
                  {plan.name}
                </h3>
                <p className="text-[13px] leading-relaxed text-text-muted">
                  {plan.description}
                </p>
                <ul className="mt-2 flex flex-col gap-2">
                  {plan.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2 text-[13px] text-ink-soft"
                    >
                      <Check
                        size={15}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <Link
                href={plan.href}
                className="inline-flex h-11 items-center justify-center rounded-tile border border-primary text-[14px] font-semibold text-primary transition-colors hover:bg-primary hover:text-white"
              >
                {t("Открыть тариф")}
              </Link>
            </div>
          ))}
        </div>
      </section>
      <PageContainer className="pb-12">
        <SectionIndex sectionId="biznes" className="" />
      </PageContainer>
    </StaticPageShell>
  );
}
