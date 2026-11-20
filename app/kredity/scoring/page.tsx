"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import { Breadcrumbs, PageHero } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";

const SCORING_FIELDS_RU = [
  {
    id: "age",
    label: "Возраст",
    options: [
      { label: "18–25 лет", pts: 10 },
      { label: "25–40 лет", pts: 18 },
      { label: "40–60 лет", pts: 16 },
      { label: "60 и старше", pts: 8 },
    ],
  },
  {
    id: "propiska",
    label: "Постоянная прописка в г. Ташкенте",
    options: [
      { label: "Есть", pts: 10 },
      { label: "Нет", pts: 6 },
    ],
  },
  {
    id: "family",
    label: "Семейное положение",
    options: [
      { label: "Женат / замужем", pts: 10 },
      { label: "Холост / не замужем", pts: 7 },
      { label: "Разведён / разведена", pts: 6 },
    ],
  },
  {
    id: "dependents",
    label: "Количество иждивенцев",
    options: [
      { label: "Отсутствует", pts: 10 },
      { label: "До 2-х", pts: 8 },
      { label: "До 4-х", pts: 5 },
      { label: "Свыше 4-х", pts: 3 },
    ],
  },
  {
    id: "workplace",
    label: "Место работы",
    options: [
      { label: "Бюджетная организация", pts: 14 },
      { label: "Фирма (малый и средний бизнес)", pts: 12 },
      { label: "Предприниматель / самозанятый", pts: 10 },
      { label: "Прочее", pts: 6 },
    ],
  },
  {
    id: "tenure",
    label: "Стаж на последнем месте работы",
    options: [
      { label: "Свыше 5 лет", pts: 14 },
      { label: "От 3 до 5 лет", pts: 12 },
      { label: "От 1 года до 3 лет", pts: 9 },
      { label: "До 1 года", pts: 4 },
    ],
  },
  {
    id: "position",
    label: "Занимаемая должность",
    options: [
      { label: "Руководитель", pts: 10 },
      { label: "Начальник отдела", pts: 8 },
      { label: "Специалист", pts: 6 },
      { label: "Другое", pts: 4 },
    ],
  },
  {
    id: "totalExp",
    label: "Общий стаж по трудовому договору",
    options: [
      { label: "Свыше 5 лет", pts: 10 },
      { label: "От 3 до 5 лет", pts: 8 },
      { label: "От 1 года до 3 лет", pts: 6 },
      { label: "До 1 года", pts: 3 },
    ],
  },
  {
    id: "extraIncome",
    label: "Дополнительный доход",
    options: [
      { label: "Есть подтверждённый доход", pts: 8 },
      { label: "Отсутствует", pts: 2 },
    ],
  },
  {
    id: "salary",
    label: "Среднемесячная заработная плата",
    options: [
      { label: "Свыше 3 000 000 сум", pts: 24 },
      { label: "До 3 000 000 сум", pts: 18 },
      { label: "До 2 000 000 сум", pts: 12 },
      { label: "До 1 000 000 сум", pts: 6 },
    ],
  },
];

export default function CreditScoringPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const SCORING_FIELDS = trDeep(lang, SCORING_FIELDS_RU, PAGES_DICT, UI_DICT);
  const [values, setValues] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    for (const f of SCORING_FIELDS) {
      init[f.id] = f.options[0].pts;
    }
    return init;
  });

  const totalScore = useMemo(
    () => Object.values(values).reduce((acc, v) => acc + v, 0),
    [values]
  );

  const verdict = useMemo(() => {
    if (totalScore >= 75) {
      return {
        title: "Высокий шанс одобрения",
        desc: "Вы соответствуете основным требованиям скоринга для получения микрозайма, автокредита или ипотеки.",
        tone: "text-[#0D9488] bg-[#ECFDF5]",
      };
    }
    if (totalScore >= 55) {
      return {
        title: "Средний шанс одобрения",
        desc: "Кредит может быть одобрен при наличии поручителя, страхового полиса или залога.",
        tone: "text-primary bg-primary-soft",
      };
    }
    return {
      title: "Требуется дополнительное обеспечение",
      desc: "Рекомендуем обратиться в филиал банка с документами о дополнительном доходе или залоге.",
      tone: "text-[#B45309] bg-[#FEF3C7]",
    };
  }, [totalScore]);

  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Скоринг кредитоспособности") }]} />
        <PageHero eyebrow={t("Кредитование · Предварительная оценка")} title={t("Скоринг кредитоспособности")} subtitle={t("Узнайте предварительную оценку возможности получения кредита в ЧАБ «Трастбанк» перед подачей онлайн-заявки.")} />

        <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="grid grid-cols-1 gap-5 rounded-panel border border-line bg-white p-6 sm:grid-cols-2 lg:col-span-2 lg:p-8">
            {SCORING_FIELDS.map((field) => (
              <div key={field.id} className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-ink">
                  {field.label}
                </label>
                <select
                  value={values[field.id]}
                  onChange={(e) =>
                    setValues((prev) => ({
                      ...prev,
                      [field.id]: Number(e.target.value),
                    }))
                  }
                  className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
                >
                  {field.options.map((opt) => (
                    <option key={opt.label} value={opt.pts}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>

          <div className="flex flex-col justify-between gap-6 rounded-panel border border-line bg-white p-6 lg:p-8">
            <div className="flex flex-col gap-4">
              <span className="text-[13px] font-semibold text-text-muted">
                {t("Предварительный балл")}
              </span>
              <div className="text-[48px] font-bold leading-none text-ink">
                {totalScore} <span className="text-[20px] text-text-muted">/ 100</span>
              </div>
              <div className={`rounded-card p-4 ${verdict.tone}`}>
                <div className="flex items-center gap-2 font-bold">
                  <CheckCircle2 size={18} />
                  <span>{t(verdict.title)}</span>
                </div>
                <p className="mt-1.5 text-[13px] leading-relaxed">
                  {t(verdict.desc)}
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Link
                href="/zayavki?tab=credit"
                className="inline-flex h-12 items-center justify-center rounded-tile bg-primary text-[15px] font-semibold text-white hover:bg-primary-deep"
              >
                {t("Подать заявку на кредит")}
              </Link>
              <Link
                href="/kredity"
                className="inline-flex h-12 items-center justify-center rounded-tile bg-surface text-[14px] font-semibold text-ink hover:bg-line"
              >
                {t("Все кредитные программы")}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </StaticPageShell>
  );
}
