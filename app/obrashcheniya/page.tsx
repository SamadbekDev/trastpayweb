"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { CalendarClock, CheckCircle2, Search, ShieldAlert } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import SectionIndex from "@/components/content/SectionIndex";
import { Breadcrumbs, PageHero, PageContainer } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import { CITIZENS_STATS as CITIZENS_STATS_RU, RECEPTION_SCHEDULE as RECEPTION_SCHEDULE_RU } from "@/data/extraSections";

export default function CitizensAppealsPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const RECEPTION_SCHEDULE = trDeep(lang, RECEPTION_SCHEDULE_RU, PAGES_DICT, UI_DICT);
  const CITIZENS_STATS = trDeep(lang, CITIZENS_STATS_RU, PAGES_DICT, UI_DICT);
  const [ticketNumber, setTicketNumber] = useState("");
  const [statusResult, setStatusResult] = useState<string | null>(null);

  const handleCheck = (e: FormEvent) => {
    e.preventDefault();
    const cleaned = ticketNumber.trim();
    if (!cleaned) return;
    setStatusResult(
      lang === "uz"
        ? `№ ${cleaned} murojaat ro‘yxatga olingan va tegishli bo‘linmada ko‘rib chiqilmoqda (qonun bo‘yicha ko‘rib chiqish muddati — 15 ish kunigacha).`
        : lang === "en"
          ? `Appeal No. ${cleaned} is registered and being handled by the responsible department (statutory term — up to 15 working days).`
          : `Обращение № ${cleaned} зарегистрировано и находится в обработке профильного подразделения (срок рассмотрения по закону — до 15 рабочих дней).`
    );
  };

  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Рассмотрение обращений и уголок потребителя") }]} />
        <PageHero eyebrow={t("Обращения граждан")} title={t("Рассмотрение обращений и уголок потребителя")} subtitle={t("График приёма руководством, проверка статуса обращения, статистика и защита прав потребителей банковских услуг.")} />
          <Link
            href="/zayavki?tab=appeal"
            className="inline-flex h-12 items-center rounded-tile bg-primary px-6 text-[14px] font-semibold text-white hover:bg-primary-deep"
          >
            {t("Отправить обращение")}
          </Link>
        </div>

        {/* Status Check */}
        <div id="status" className="mt-8 scroll-mt-28 rounded-panel border border-line bg-white p-6 lg:p-8">
          <h2 className="text-[20px] font-bold text-ink">
            {t("Проверка статуса обращения")}
          </h2>
          <form
            onSubmit={handleCheck}
            className="mt-4 flex flex-col gap-3 sm:flex-row"
          >
            <input
              type="text"
              value={ticketNumber}
              onChange={(e) => setTicketNumber(e.target.value)}
              placeholder={t("Введите номер обращения (например, TB-123456)")}
              className="h-12 flex-1 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="inline-flex h-12 cursor-pointer items-center justify-center gap-2 rounded-tile bg-[#12122B] px-6 text-[14px] font-semibold text-white hover:bg-ink"
            >
              <Search size={16} />
              <span>{t("Проверить")}</span>
            </button>
          </form>
          {statusResult && (
            <div className="mt-4 flex items-start gap-2.5 rounded-card bg-primary-soft p-4 text-[14px] text-ink">
              <CheckCircle2 size={18} className="mt-0.5 shrink-0 text-primary" />
              <span>{statusResult}</span>
            </div>
          )}
        </div>

        {/* Reception Schedule */}
        <div className="mt-10 rounded-panel border border-line bg-white p-6 lg:p-8">
          <div className="flex items-center gap-3">
            <CalendarClock size={22} className="text-primary" />
            <h2 className="text-[22px] font-bold text-ink">
              {t("График приёма граждан руководством банка")}
            </h2>
          </div>
          <p className="mt-2 text-[14px] text-text-muted">
            {t("Запись на приём осуществляется за 1 день по телефонам")}{" "}
            <strong>11431</strong>, <strong>11461</strong> {t("или")}{" "}
            <strong>(+998 71) 207-62-80</strong>.
          </p>

          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[600px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-line bg-page text-text-muted">
                  <th className="px-4 py-3 font-semibold">{t("ФИО")}</th>
                  <th className="px-4 py-3 font-semibold">{t("Должность")}</th>
                  <th className="px-4 py-3 font-semibold">{t("Дни приёма")}</th>
                  <th className="px-4 py-3 font-semibold">{t("Время")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {RECEPTION_SCHEDULE.map((row) => (
                  <tr key={row.name}>
                    <td className="px-4 py-3.5 font-semibold text-ink">
                      {row.name}
                    </td>
                    <td className="px-4 py-3.5 text-ink-soft">{row.role}</td>
                    <td className="px-4 py-3.5 text-text-muted">{row.days}</td>
                    <td className="px-4 py-3.5 font-semibold text-primary">
                      {row.hours}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Statistics & Consumer Corner */}
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-3">
          {CITIZENS_STATS.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col gap-2 rounded-card border border-line bg-white p-6"
            >
              <span className="text-[13px] font-medium text-text-muted">
                {stat.label}
              </span>
              <span className="text-[26px] font-bold text-ink">
                {stat.total}
              </span>
              <span className="text-[13px] text-ink-soft">{stat.resolved}</span>
            </div>
          ))}
        </div>

        <div className="mt-8 flex items-start gap-4 rounded-card border border-line bg-white p-6">
          <ShieldAlert size={22} className="mt-0.5 shrink-0 text-primary" />
          <div className="text-[14px] leading-relaxed text-ink-soft">
            <strong className="text-ink">{t("Уголок потребителя:")}</strong>{" "}
            {t("согласно ст. 65 Закона «О банках и банковской деятельности», потребители банковских услуг свободны в выборе банка и вправе получить полную информацию об условиях до подписания договора.")}{" "}
            {t("Telegram-бот банка:")} <strong>@Trust_Bank_Bot</strong>.
          </div>
        </div>
      </section>
      <PageContainer className="pb-12">
        <SectionIndex sectionId="obrashcheniya" className="" />
      </PageContainer>
    </StaticPageShell>
  );
}
