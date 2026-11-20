/**
 * Images from the Figma file «SBER (Copy)» → page «Ultimate Design» (public/images/figma, sources in SOURCES.json).
 *
 * The CMS (dashboard-api) still ships placehold.co / Unsplash stubs and empty image fields for some
 * products. Those slots are filled with the matching Figma artwork here; anything an editor uploads
 * to the CMS keeps priority, because only stub / empty values are replaced.
 */
const F = "/images/figma";

/** placehold.co stubs of the CMS seed, keyed by "<width>x<height>:<decoded text>". */
const PLACEHOLDERS: Record<string, string> = {
  // home — «Продукты Trastbank»
  "120x120:Card": `${F}/home/product-debit-card.webp`,
  "120x120:FX Card": `${F}/home/product-fx-card.webp`,
  "120x120:Cash": `${F}/home/product-credits.webp`,
  "120x120:Car": `${F}/home/product-car-loan.webp`,
  "120x120:Home": `${F}/home/product-mortgage.webp`,
  "120x120:Family": `${F}/home/product-family.webp`,
  "120x120:Deposit": `${F}/home/product-deposits.webp`,
  "120x120:Transfers": `${F}/home/product-transfers.webp`,
  // home — currency flags
  "32x32:US": `${F}/flags/us.svg`,
  "32x32:EU": `${F}/flags/eu.svg`,
  "32x32:RU": `${F}/flags/ru.svg`,
  // home — sections
  "1400x800:Coins": `${F}/home/calculator-coins.webp`,
  "360x420:Deposit": `${F}/home/offer-deposit.webp`,
  "360x420:Delivery": `${F}/home/offer-delivery.webp`,
  "400x280:Telegram": `${F}/home/news-telegram.webp`,
  // cards (catalog, detail hero, «Вам также подойдёт»)
  "348x218:Visa+Infinity": `${F}/cards/visa-infinity.webp`,
  "348x218:Visa": `${F}/cards/visa.webp`,
  "348x218:Maksadli": `${F}/cards/maksadli-globe.webp`,
  "348x218:Card": `${F}/cards/maksadli-black.webp`,
  "348x218:Credit": `${F}/cards/virtual.webp`,
  "348x218:Gold": `${F}/cards/kulay-gold.webp`,
  "348x218:Blue": `${F}/cards/kulay-blue.webp`,
  "348x218:Navy": `${F}/cards/kulay-navy.webp`,
  "348x218:UnionPay": `${F}/cards/istiklol-unionpay.webp`,
  // deposits
  "260x218:Wallet": `${F}/deposits/wallet.webp`,
  "260x218:Hearts": `${F}/deposits/hearts.webp`,
  "260x218:Bear": `${F}/deposits/bear.webp`,
  "260x218:USD+": `${F}/deposits/usd.webp`,
};

/** Stock photos of the CMS seed → Figma artwork. */
const STOCK: Record<string, string> = {
  "photo-1516321318423-f06f85e504b3": `${F}/home/trastpay.webp`,
};

/** Credit products whose image is empty in the CMS. */
const CREDIT_PRODUCTS: Record<string, string> = {
  "sharq-bahori": `${F}/credits/mortgage-sharq-bahori.webp`,
  ozshahar: `${F}/credits/mortgage-ozshahar.webp`,
  "golden-house": `${F}/credits/mortgage-golden-house.webp`,
  "ipoteka-refinance": `${F}/credits/mortgage-market.webp`,
  "ipoteka-bank": `${F}/credits/mortgage-bank.webp`,
  "bez-dohoda": `${F}/credits/mortgage-no-income.webp`,
  "micro-income": `${F}/credits/micro-income.webp`,
  "micro-employment": `${F}/credits/micro-employment.webp`,
  "micro-self": `${F}/credits/micro-self.webp`,
  "first-step": `${F}/credits/micro-first-step.webp`,
  "first-step-2": `${F}/credits/micro-first-step-2.webp`,
  universal: `${F}/credits/universal.webp`,
  overdraft: `${F}/credits/overdraft.webp`,
  qulay: `${F}/credits/micro-qulay.webp`,
};

/** Hero picture of credit detail pages without one in the CMS («Микрозайм» frame in Figma). */
export const CREDIT_HERO_FALLBACK = `${F}/credits/micro-hero.webp`;

/** Pictures of the «Микрозайм» frame, used when a CMS file of these slots cannot be loaded. */
export const MICRO_FALLBACK = {
  steps: `${F}/credits/micro-self.webp`,
  info: `${F}/credits/micro-info.webp`,
  requirements: `${F}/credits/micro-hero.webp`,
};



/** Figma artwork for a CMS stub URL, or undefined when the URL is real content. */
export function figmaForStub(url: string): string | undefined {
  const ph = url.match(/placehold\.co\/(\d+x\d+)\/[^?]*\?text=([^&#]*)/);
  if (ph) return PLACEHOLDERS[`${ph[1]}:${decodeURIComponent(ph[2]).trim()}`];
  const stock = Object.keys(STOCK).find((k) => url.includes(k));
  return stock ? STOCK[stock] : undefined;
}

/** Figma artwork for a credit product whose CMS image is empty (or a stub). */
export const creditProductFallback = (id?: string) => (id ? CREDIT_PRODUCTS[id] : undefined);
