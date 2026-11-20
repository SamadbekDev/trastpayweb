"use client";

import { useState, type FormEvent } from "react";
import { Briefcase, CheckCircle2 } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import { Breadcrumbs, PageHero } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";

const HR_CRITERIA_RU = [
  "Высокие требования к образованию и профессиональным знаниям",
  "Деловая этика, культура общения и доброжелательность к клиентам и коллегам",
  "Стремление к профессиональному росту и личностному развитию",
  "Открытость к цифровым банковским технологиям",
];

export default function VacanciesPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const HR_CRITERIA = trDeep(lang, HR_CRITERIA_RU, PAGES_DICT, UI_DICT);
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <StaticPageShell>
      <section className="container-page pb-10 pt-6">
        <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Вакансии в ЧАБ «Трастбанк»") }]} />
        <PageHero eyebrow={t("Карьера и кадровая политика")} title={t("Вакансии в ЧАБ «Трастбанк»")} subtitle={t("Кадровая политика банка направлена на формирование стабильной, высококвалифицированной профессиональной команды.")} />

        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="flex flex-col gap-5 rounded-panel border border-line bg-white p-6 lg:p-8">
            <div className="flex items-center gap-3">
              <Briefcase size={22} className="text-primary" />
              <h2 className="text-[22px] font-bold text-ink">
                {t("Основные критерии отбора")}
              </h2>
            </div>
            <ul className="flex flex-col gap-3">
              {HR_CRITERIA.map((c) => (
                <li
                  key={c}
                  className="flex items-start gap-2.5 text-[15px] text-ink-soft"
                >
                  <CheckCircle2
                    size={17}
                    className="mt-0.5 shrink-0 text-primary"
                  />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-3 rounded-card bg-primary-soft p-4">
              <p className="text-[14px] font-semibold text-ink">
                {t("В настоящее время открытых вакансий нет")}
              </p>
              <p className="text-[13px] text-ink-soft">
                {t("Заполните анкету банка и прикрепите её к резюме — мы свяжемся с вами, когда появится подходящая позиция.")}
              </p>
              <a
                href="https://trustbank.uz/upload/medialibrary/536/Rezyume.docx"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 text-[13px] font-semibold text-primary hover:underline"
              >
                {t("Скачать анкету банка (DOCX · 25.6 KB)")}
              </a>
            </div>
            <div className="mt-auto rounded-card bg-page p-4 text-[13px] text-text-muted">
              {t("По вопросам трудоустройства и стажировок вы также можете обращаться в Департамент по работе с персоналом через колл-центр")}{" "}
              <strong className="text-ink">1287</strong>.
            </div>
          </div>

          <div className="rounded-panel border border-line bg-white p-6 lg:p-8">
            <h2 className="text-[22px] font-bold text-ink">
              {t("Отправить резюме")}
            </h2>

            {sent ? (
              <div className="mt-6 flex flex-col gap-3 rounded-card bg-primary-soft p-6">
                <div className="flex items-center gap-2 font-bold text-ink">
                  <CheckCircle2 size={20} className="text-primary" />
                  <span>{t("Резюме отправлено!")}</span>
                </div>
                <p className="text-[14px] text-ink-soft">
                  {t("Спасибо за интерес к работе в ЧАБ «Трастбанк». HR-специалисты рассмотрят вашу анкету и свяжутся с вами при наличии подходящей вакансии.")}
                </p>
                <button
                  type="button"
                  onClick={() => setSent(false)}
                  className="mt-2 w-fit cursor-pointer rounded-[10px] bg-primary px-5 py-2.5 text-[13px] font-semibold text-white"
                >
                  {t("Отправить ещё одно резюме")}
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-5 flex flex-col gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-ink">
                    {t("ФИО *")}
                  </label>
                  <input
                    required
                    placeholder={t("Каримов Азиз Анварович")}
                    className="h-11 rounded-tile border border-line bg-page px-4 text-[14px] outline-none focus:border-primary"
                  />
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-ink">
                      {t("Телефон *")}
                    </label>
                    <input
                      required
                      type="tel"
                      placeholder="+998 90 123-45-67"
                      className="h-11 rounded-tile border border-line bg-page px-4 text-[14px] outline-none focus:border-primary"
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[13px] font-semibold text-ink">
                      E-mail *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="name@example.uz"
                      className="h-11 rounded-tile border border-line bg-page px-4 text-[14px] outline-none focus:border-primary"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-[13px] font-semibold text-ink">
                    {t("Желаемая позиция и опыт *")}
                  </label>
                  <textarea
                    required
                    rows={3}
                    placeholder={t("Кратко опишите ваш опыт и желаемую должность...")}
                    className="rounded-tile border border-line bg-page p-3.5 text-[14px] outline-none focus:border-primary"
                  />
                </div>
                <button
                  type="submit"
                  className="h-12 cursor-pointer rounded-tile bg-primary text-[15px] font-semibold text-white hover:bg-primary-deep"
                >
                  {t("Отправить анкету")}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </StaticPageShell>
  );
}
