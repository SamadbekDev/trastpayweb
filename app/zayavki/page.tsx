"use client";

import { Suspense, useEffect, useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { CheckCircle2 } from "lucide-react";
import StaticPageShell from "@/components/layout/StaticPageShell";
import { Breadcrumbs, PageHero } from "@/components/ui/PageKit";
import { pickText, useLang } from "@/hooks/useLang";
import { tr, trDeep } from "@/i18n/tr";
import { PAGES_DICT } from "@/i18n/dict/pages";
import { UI_DICT } from "@/i18n/dict/ui";
import {
  CARD_TYPES_LIST as CARD_TYPES_LIST_RU,
  CREDIT_TYPES_LIST as CREDIT_TYPES_LIST_RU,
  TRUSTBANK_BRANCHES_LIST as TRUSTBANK_BRANCHES_LIST_RU,
} from "@/data/servicesAndApplications";

type TabId = "card" | "credit" | "business" | "appeal";

const TABS: { id: TabId; label: string; labelUz: string }[] = [
  { id: "card", label: "Заказать карту", labelUz: "Kartaga buyurtma" },
  { id: "credit", label: "Заявка на кредит", labelUz: "Kreditga ariza" },
  { id: "business", label: "Для бизнеса (РКО / кредит)", labelUz: "Biznes uchun (HKK / kredit)" },
  { id: "appeal", label: "Обращение граждан", labelUz: "Fuqarolar murojaati" },
];

function ApplicationsFormContent() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  const TRUSTBANK_BRANCHES_LIST = trDeep(lang, TRUSTBANK_BRANCHES_LIST_RU, PAGES_DICT, UI_DICT);
  const CREDIT_TYPES_LIST = trDeep(lang, CREDIT_TYPES_LIST_RU, PAGES_DICT, UI_DICT);
  const CARD_TYPES_LIST = trDeep(lang, CARD_TYPES_LIST_RU, PAGES_DICT, UI_DICT);
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") as TabId | null;

  const [activeTab, setActiveTab] = useState<TabId>(
    initialTab && TABS.some((t) => t.id === initialTab) ? initialTab : "card"
  );
  const [submittedRef, setSubmittedRef] = useState<string | null>(null);

  useEffect(() => {
    if (initialTab && TABS.some((t) => t.id === initialTab)) {
      setActiveTab(initialTab);
      setSubmittedRef(null);
    }
  }, [initialTab]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const num = Math.floor(100000 + Math.random() * 900000);
    setSubmittedRef(`TB-${num}`);
  };

  return (
    <section className="container-page pb-10 pt-6">
      <Breadcrumbs className="mb-6" items={[{ label: t("Главная"), href: "/" }, { label: t("Оформить заявку онлайн") }]} />
        <PageHero eyebrow={t("Онлайн-заявки")} title={t("Оформить заявку онлайн")} subtitle={t("Заполните форму — специалист ЧАБ «Трастбанк» свяжется с вами для подтверждения и оформления продукта.")} />

      {/* Tabs */}
      <div className="mt-8 flex flex-wrap gap-2.5">
        {TABS.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => {
                setActiveTab(tab.id);
                setSubmittedRef(null);
              }}
              className={`cursor-pointer rounded-full px-5 py-2.5 text-[14px] font-semibold transition-colors ${
                active
                  ? "bg-[#12122B] text-white"
                  : "border border-line bg-white text-ink hover:bg-surface"
              }`}
            >
              {t(tab.label)}
            </button>
          );
        })}
      </div>

      {/* Form Container */}
      <div className="mt-8 rounded-panel border border-line bg-white p-6 lg:p-10">
        {submittedRef ? (
          <div className="flex flex-col items-start gap-4 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-soft text-primary">
              <CheckCircle2 size={26} />
            </div>
            <h2 className="text-[24px] font-bold text-ink">
              {t("Заявка принята!")}
            </h2>
            <p className="max-w-[540px] text-[15px] text-text-muted">
              {t("Регистрационный номер вашей заявки:")}{" "}
              <strong className="text-ink">{submittedRef}</strong>{t(". Наш сотрудник свяжется с вами в рабочее время (Пн–Пт 09:00–18:00) или вы можете уточнить статус по номеру")} <strong>1287</strong>.
            </p>
            <button
              type="button"
              onClick={() => setSubmittedRef(null)}
              className="mt-2 cursor-pointer rounded-tile bg-primary px-6 py-3 text-[14px] font-semibold text-white hover:bg-primary-deep"
            >
              {t("Отправить ещё одну заявку")}
            </button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 gap-5 md:grid-cols-2"
          >
            {activeTab === "card" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold text-ink">
                    {t("Тип заявки *")}
                  </label>
                  <select
                    required
                    className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
                  >
                    <option value="new">{t("Выпуск новой карты")}</option>
                    <option value="reissue">{t("Перевыпуск карты")}</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold text-ink">
                    {t("Тип карты *")}
                  </label>
                  <select
                    required
                    className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
                  >
                    {CARD_TYPES_LIST.map((c) => (
                      <option key={c} value={c}>
                        {c}
                      </option>
                    ))}
                  </select>
                </div>
              </>
            )}

            {activeTab === "credit" && (
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[14px] font-semibold text-ink">
                  {t("Кредитный продукт *")}
                </label>
                <select
                  required
                  className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
                >
                  {CREDIT_TYPES_LIST.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            )}

            {activeTab === "business" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold text-ink">
                    {t("Наименование организации / ИП *")}
                  </label>
                  <input
                    required
                    placeholder={t("ООО «Пример»")}
                    className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold text-ink">
                    {t("Услуга для бизнеса *")}
                  </label>
                  <select
                    required
                    className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
                  >
                    <option>{t("Открытие расчётного счёта (РКО)")}</option>
                    <option>{t("Кредит для бизнеса")}</option>
                    <option>{t("Финансовый лизинг")}</option>
                    <option>{t("Банковская гарантия / Факторинг")}</option>
                    <option>{t("Зарплатный проект / Торговый терминал")}</option>
                  </select>
                </div>
              </>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-ink">
                {t("ФИО *")}
              </label>
              <input
                required
                placeholder={t("Иванов Иван Иванович")}
                className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-ink">
                {t("Мобильный телефон *")}
              </label>
              <input
                required
                type="tel"
                placeholder="+998 90 123-45-67"
                className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
              />
            </div>

            {activeTab !== "appeal" && (
              <div className="flex flex-col gap-2">
                <label className="text-[14px] font-semibold text-ink">
                  {t("Филиал / ОБУ банка *")}
                </label>
                <select
                  required
                  className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
                >
                  {TRUSTBANK_BRANCHES_LIST.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>
            )}

            <div className="flex flex-col gap-2">
              <label className="text-[14px] font-semibold text-ink">
                {pickText(lang, "E-mail", "Elektron pochta", "E-mail")}
              </label>
              <input
                type="email"
                placeholder="name@example.uz"
                className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
              />
            </div>

            {activeTab !== "appeal" && (
              <>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold text-ink">
                    {t("Серия и номер паспорта / ID-карты")}
                  </label>
                  <input
                    placeholder="AD 1234567"
                    className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[14px] font-semibold text-ink">
                    {t("Дата рождения")}
                  </label>
                  <input
                    type="date"
                    className="h-12 rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none focus:border-primary"
                  />
                </div>
              </>
            )}

            {activeTab === "appeal" && (
              <div className="flex flex-col gap-2 md:col-span-2">
                <label className="text-[14px] font-semibold text-ink">
                  {t("Текст обращения *")}
                </label>
                <textarea
                  required
                  rows={4}
                  placeholder={t("Опишите ваш вопрос или обращение...")}
                  className="rounded-tile border border-line bg-page p-4 text-[14px] text-ink outline-none focus:border-primary"
                />
              </div>
            )}

            <div className="md:col-span-2">
              <button
                type="submit"
                className="inline-flex h-12 cursor-pointer items-center justify-center rounded-tile bg-primary px-8 text-[15px] font-semibold text-white transition-colors hover:bg-primary-deep"
              >
                {t("Отправить заявку")}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  );
}

export default function ApplicationsPage() {
  const lang = useLang();
  const t = (x: string) => tr(lang, x, PAGES_DICT, UI_DICT);
  return (
    <StaticPageShell>
      <Suspense fallback={<div className="p-12 text-center">{t("Загрузка...")}</div>}>
        <ApplicationsFormContent />
      </Suspense>
    </StaticPageShell>
  );
}
