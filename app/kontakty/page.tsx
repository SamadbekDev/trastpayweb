"use client";

import Link from "next/link";
import { Building2, Mail, MapPin, Phone } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import SectionIndex from "@/components/content/SectionIndex";
import OfficesDirectory from "@/components/content/OfficesDirectory";
import { Breadcrumbs, PageHero, PageContainer } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import { BANK_REQUISITES as BANK_REQUISITES_RU } from "@/data/institutionalPages";

export default function ContactsPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const BANK_REQUISITES = trDeep(lang, BANK_REQUISITES_RU, PAGES_DICT, UI_DICT);
  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Контакты и реквизиты") }]} />
        <PageHero eyebrow={t("Связь с банком")} title={t("Контакты и реквизиты")} subtitle={t("Головной офис ЧАБ «Трастбанк», единый колл-центр, телефон доверия и банковские реквизиты.")} />

        <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Contacts Card */}
          <div className="flex flex-col gap-5 rounded-panel border border-line bg-white p-6 lg:p-8">
            <h2 className="text-[22px] font-bold text-ink">
              {t("Контактная информация")}
            </h2>

            <div className="flex items-start gap-3.5">
              <MapPin size={20} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <div className="text-[13px] font-semibold text-text-muted">
                  {t("Адрес головного офиса")}
                </div>
                <div className="mt-0.5 text-[15px] font-medium text-ink">
                  {BANK_REQUISITES.address}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Phone size={20} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <div className="text-[13px] font-semibold text-text-muted">
                  {t("Колл-центр / Телефон доверия")}
                </div>
                <div className="mt-0.5 text-[15px] font-medium text-ink">
                  {BANK_REQUISITES.callCenter}
                </div>
                <div className="mt-0.5 text-[14px] text-text-muted">
                  {t("Телефон доверия")}: {BANK_REQUISITES.helpline}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <Mail size={20} className="mt-0.5 shrink-0 text-primary" />
              <div>
                <div className="text-[13px] font-semibold text-text-muted">
                  {t("Электронная почта и режим работы")}
                </div>
                <div className="mt-0.5 text-[15px] font-medium text-ink">
                  {BANK_REQUISITES.email}
                </div>
                <div className="mt-0.5 text-[14px] text-text-muted">
                  {BANK_REQUISITES.workHours}
                </div>
              </div>
            </div>

            <div className="mt-2 flex flex-wrap gap-3 border-t border-line pt-5">
              <Link
                href="/filialy"
                className="inline-flex h-11 items-center rounded-tile bg-primary px-5 text-[14px] font-semibold text-white hover:bg-primary-deep"
              >
                {t("Карта филиалов и банкоматов")}
              </Link>
              <Link
                href="/zayavki?tab=appeal"
                className="inline-flex h-11 items-center rounded-tile bg-surface px-5 text-[14px] font-semibold text-ink hover:bg-line"
              >
                {t("Отправить обращение")}
              </Link>
            </div>
          </div>

          {/* Requisites Card */}
          <div className="flex flex-col gap-5 rounded-panel border border-line bg-white p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <Building2 size={22} className="text-primary" />
              <h2 className="text-[22px] font-bold text-ink">
                {t("Реквизиты банка")}
              </h2>
            </div>

            <div className="divide-y divide-line text-[14px]">
              <div className="flex justify-between gap-4 py-3">
                <span className="text-text-muted">{t("Полное наименование")}</span>
                <span className="text-right font-semibold text-ink">
                  {BANK_REQUISITES.fullName}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <span className="text-text-muted">{t("МФО (код банка)")}</span>
                <span className="font-semibold text-ink">
                  {BANK_REQUISITES.mfo}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <span className="text-text-muted">{t("ИНН")}</span>
                <span className="font-semibold text-ink">
                  {BANK_REQUISITES.inn}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <span className="text-text-muted">{t("ОКЕД")}</span>
                <span className="font-semibold text-ink">
                  {BANK_REQUISITES.oked}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <span className="text-text-muted">{t("SWIFT код")}</span>
                <span className="font-semibold text-ink">
                  {BANK_REQUISITES.swift}
                </span>
              </div>
              <div className="flex justify-between gap-4 py-3">
                <span className="text-text-muted">{t("Лицензия")}</span>
                <span className="text-right font-semibold text-ink">
                  {t("№ 44 от 21.10.2017 г.")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <PageContainer className="flex flex-col gap-12 pb-12">
        <OfficesDirectory />
        <SectionIndex sectionId="kontakty" />
      </PageContainer>
    </StaticPageShell>
  );
}
