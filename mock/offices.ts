import { OfficesMapConfig } from "@/types/deposits";

const t = (ru: string, uz: string, en: string) => ({ ru, uz, en });

export const officesPageConfig: OfficesMapConfig = {
  officesTitle: t("Офисы банка и банкоматы", "Bank ofislari va bankomatlar", "Bank offices and ATMs"),
  city: t("Город Ташкент", "Toshkent shahri", "Tashkent city"),
  offices: [
    {
      id: "o1",
      name: t("ОБУ Чупон ота", "Chupon ota OBBsi", "Chupon ota branch"),
      address: t(
        "город Ташкент, Чиланзарский район, МСГ Катортол, улица Чопон Ота, 9-й массив, дом 26",
        "Toshkent shahri, Chilonzor tumani, Qatortol MFY, Chupon ota ko‘chasi, 9-mavze, 26-uy",
        "Tashkent, Chilanzar district, Katortol, Chupon Ota street, 9th block, 26"
      ),
      hours: t(
        "пн–пт: 09:00–17:00; сб, вс: выходной",
        "du–ju: 09:00–17:00; shanba, yakshanba: dam olish",
        "Mon–Fri: 09:00–17:00; Sat, Sun: closed"
      ),
    },
    {
      id: "o2",
      name: t("Алмазарский универсальный ОБУ", "Olmazor universal OBBsi", "Almazar universal branch"),
      address: t(
        "город Ташкент, Алмазарский район, улица Олтинсой, дом 27а",
        "Toshkent shahri, Olmazor tumani, Oltinsoy ko‘chasi, 27a-uy",
        "Tashkent, Almazar district, Oltinsoy street, 27a"
      ),
      hours: t(
        "пн–пт: 09:00–17:00; сб: 09:00–13:00; вс: выходной",
        "du–ju: 09:00–17:00; shanba: 09:00–13:00; yakshanba: dam olish",
        "Mon–Fri: 09:00–17:00; Sat: 09:00–13:00; Sun: closed"
      ),
    },
    {
      id: "o3",
      name: t("ОБУ Камолот", "Kamolot OBBsi", "Kamolot branch"),
      address: t(
        "город Ташкент, Юнусабадский район, МСГ Минор, 6-й центр, дом 88",
        "Toshkent shahri, Yunusobod tumani, Minor MFY, 6-markaz, 88-uy",
        "Tashkent, Yunusabad district, Minor, 6th center, 88"
      ),
      hours: t(
        "пн–пт: 09:00–17:00; сб, вс: выходной",
        "du–ju: 09:00–17:00; shanba, yakshanba: dam olish",
        "Mon–Fri: 09:00–17:00; Sat, Sun: closed"
      ),
    },
    {
      id: "o4",
      name: t("Универсальный ОБУ Чиланзар", "Chilonzor universal OBBsi", "Chilanzar universal branch"),
      address: t(
        "город Ташкент, Чиланзарский район, массив Чиланзар 20А, дом 4а",
        "Toshkent shahri, Chilonzor tumani, Chilonzor 20A mavzesi, 4a-uy",
        "Tashkent, Chilanzar district, Chilanzar 20A, 4a"
      ),
      hours: t(
        "пн–пт: 09:00–17:00; сб, вс: выходной",
        "du–ju: 09:00–17:00; shanba, yakshanba: dam olish",
        "Mon–Fri: 09:00–17:00; Sat, Sun: closed"
      ),
    },
  ],
  atms: [
    {
      id: "a1",
      name: t("Банкомат Чиланзар", "Chilonzor bankomati", "Chilanzar ATM"),
      address: t(
        "город Ташкент, Чиланзарский район, проспект Bunyodkor, 1",
        "Toshkent shahri, Chilonzor tumani, Bunyodkor shoh ko‘chasi, 1",
        "Tashkent, Chilanzar district, Bunyodkor avenue, 1"
      ),
      hours: t("Круглосуточно", "24 soat", "24/7"),
    },
    {
      id: "a2",
      name: t("Банкомат Юнусабад", "Yunusobod bankomati", "Yunusabad ATM"),
      address: t(
        "город Ташкент, Юнусабадский район, улица Амир Темур, 88",
        "Toshkent shahri, Yunusobod tumani, Amir Temur ko‘chasi, 88",
        "Tashkent, Yunusabad district, Amir Temur street, 88"
      ),
      hours: t("Круглосуточно", "24 soat", "24/7"),
    },
  ],
  mapEmbedUrl:
    "https://www.openstreetmap.org/export/embed.html?bbox=69.15%2C41.25%2C69.40%2C41.38&layer=mapnik",
};
