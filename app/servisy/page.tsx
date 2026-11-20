"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import SectionIndex from "@/components/content/SectionIndex";
import { Breadcrumbs, PageHero, PageContainer } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import { DIGITAL_SERVICES as DIGITAL_SERVICES_RU } from "@/data/servicesAndApplications";

export default function ServicesPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const DIGITAL_SERVICES = trDeep(lang, DIGITAL_SERVICES_RU, PAGES_DICT, UI_DICT);
  return (
    <StaticPageShell>
      <section className="container-page pt-10">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Сервисы ЧАБ «Трастбанк»") }]} />
        <PageHero eyebrow={t("Дистанционное обслуживание и сервисы")} title={t("Сервисы ЧАБ «Трастбанк»")} subtitle={t("Управляйте счетами, открывайте вклады, оплачивайте коммунальные услуги и арендуйте депозитарные ячейки — онлайн и в офисах банка.")} />

        <div className="mt-10 grid grid-cols-1 gap-6 pb-16 md:grid-cols-2">
          {DIGITAL_SERVICES.map((service) => (
            <div
              key={service.id}
              id={service.anchor}
              className="flex flex-col justify-between gap-6 rounded-panel border border-line bg-white p-6 lg:p-8"
            >
              <div className="flex flex-col gap-3">
                <span className="w-fit rounded-full bg-surface px-3 py-1 text-[12px] font-semibold text-primary">
                  {service.badge}
                </span>
                <h2 className="text-[22px] font-bold text-ink">
                  {service.title}
                </h2>
                <p className="text-[14px] leading-relaxed text-text-muted">
                  {service.subtitle}
                </p>
                <ul className="mt-2 flex flex-col gap-2.5">
                  {service.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-[14px] text-ink-soft"
                    >
                      <CheckCircle2
                        size={16}
                        className="mt-0.5 shrink-0 text-primary"
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="border-t border-line pt-4">
                <Link
                  href={service.ctaHref}
                  className="inline-flex items-center gap-2 text-[14px] font-semibold text-primary hover:text-primary-deep"
                >
                  <span>{service.ctaLabel}</span>
                  <ArrowRight size={15} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
      <PageContainer className="pb-12">
        <SectionIndex sectionId="servisy" className="" />
      </PageContainer>
    </StaticPageShell>
  );
}
