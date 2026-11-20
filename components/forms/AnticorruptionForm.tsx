"use client";

import { useState, type FormEvent } from "react";
import { CheckCircle2, Mail, Phone } from "lucide-react";
import { Panel, SectionHeading } from "@/components/ui/PageKit";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/i18n/tr";
import { UI_DICT } from "@/i18n/dict/ui";

/** Same fields as the old trustbank.uz «Обращение к комплаенс офицеру» form. */
const REGIONS = [
  "г. Ташкент",
  "Ташкентская область",
  "Андижанская область",
  "Бухарская область",
  "Джизакская область",
  "Кашкадарьинская область",
  "Навоийская область",
  "Наманганская область",
  "Самаркандская область",
  "Сурхандарьинская область",
  "Сырдарьинская область",
  "Ферганская область",
  "Хорезмская область",
  "Республика Каракалпакстан",
];

const OFFICES = [
  "Операционное управление",
  "ОБУ «Дархан»",
  "ОБУ «Ташкент»",
  "ОБУ «Яккасарай»",
  "Андижанский ОБУ",
  "Ферганский ОБУ",
  "Каршинский ОБУ",
  "Наманганский ОБУ",
  "Самаркандский ОБУ",
  "Термезский ОБУ",
  "Джизакский ОБУ",
  "Бектемирский ОБУ",
];

const field = "h-12 w-full rounded-tile border border-line bg-page px-4 text-[14px] text-ink outline-none transition-colors focus:border-primary";
const label = "text-[13px] font-semibold text-ink";

export default function AnticorruptionForm() {
  const lang = useLang();
  const t = (s: string) => tr(lang, s, UI_DICT);
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // TODO: connect to the compliance-officer endpoint when the backend is available.
    setSent(true);
  };

  return (
    <Panel id="soobshchit" className="flex flex-col gap-6">
      <SectionHeading
        title={t("Сообщить о факте коррупции")}
        description={t("Если вы столкнулись с фактами коррупции в ЧАБ «Трастбанк», сообщите об этом комплаенс-офицеру банка. Обращение рассматривается конфиденциально.")}
      />
      <div className="flex flex-wrap gap-3">
        <a href="tel:+998712073645" className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-[13px] font-semibold text-primary">
          <Phone size={15} /> {t("Горячая линия: (+998 71) 207-36-45")}
        </a>
        <a href="mailto:anti_korrupsiya@trustbank.uz" className="inline-flex items-center gap-2 rounded-full bg-primary-soft px-4 py-2 text-[13px] font-semibold text-primary">
          <Mail size={15} /> anti_korrupsiya@trustbank.uz
        </a>
      </div>

      {sent ? (
        <div className="flex flex-col gap-3 rounded-card bg-primary-soft p-6">
          <p className="flex items-center gap-2 text-[16px] font-semibold text-ink">
            <CheckCircle2 size={20} className="text-primary" /> {t("Обращение отправлено")}
          </p>
          <p className="text-[14px] leading-6 text-ink-soft">{t("Спасибо. Комплаенс-офицер рассмотрит обращение и свяжется с вами по указанным контактам.")}</p>
          <button type="button" onClick={() => setSent(false)} className="w-fit text-[13px] font-semibold text-primary hover:underline">
            {t("Отправить ещё одно обращение")}
          </button>
        </div>
      ) : (
        <form onSubmit={onSubmit} className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <label className="flex flex-col gap-1.5">
            <span className={label}>{t("Фамилия *")}</span>
            <input required name="lastName" autoComplete="family-name" className={field} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={label}>{t("Имя *")}</span>
            <input required name="firstName" autoComplete="given-name" className={field} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={label}>{t("Отчество *")}</span>
            <input required name="middleName" autoComplete="additional-name" className={field} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={label}>{t("Электронная почта *")}</span>
            <input required type="email" name="email" autoComplete="email" className={field} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={label}>{t("Телефон *")}</span>
            <input required type="tel" name="phone" autoComplete="tel" placeholder="+998" className={field} />
          </label>
          <label className="flex flex-col gap-1.5">
            <span className={label}>{t("Регион *")}</span>
            <select required name="region" defaultValue="" className={field}>
              <option value="" disabled>
                {t("Выберите регион")}
              </option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>{t(r)}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 md:col-span-3">
            <span className={label}>{t("Филиал, ОБУ *")}</span>
            <select required name="office" defaultValue="" className={field}>
              <option value="" disabled>
                {t("Выберите офис банковских услуг")}
              </option>
              {OFFICES.map((o) => (
                <option key={o} value={o}>{t(o)}</option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1.5 md:col-span-3">
            <span className={label}>{t("Текст обращения *")}</span>
            <textarea required name="message" rows={5} className="w-full rounded-tile border border-line bg-page p-4 text-[14px] text-ink outline-none transition-colors focus:border-primary" />
          </label>
          <div className="flex flex-wrap items-center justify-between gap-3 md:col-span-3">
            <span className="text-[12px] text-text-muted">{t("* поля обязательны для заполнения")}</span>
            <button type="submit" className="h-12 rounded-tile bg-primary px-8 text-[15px] font-semibold text-white transition-colors hover:bg-primary-deep">
              {t("Отправить обращение")}
            </button>
          </div>
        </form>
      )}
    </Panel>
  );
}
