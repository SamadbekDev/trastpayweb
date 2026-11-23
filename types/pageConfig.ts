export type Language = "ru" | "uz" | "en";

export interface I18nText {
  ru: string;
  uz: string;
  en: string;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeaderChip {
  id: string;
  label: string;
}

export interface HeaderConfig {
  logo?: string;
  logoText?: string;
  navItems?: NavItem[];
  utilityLinks?: NavItem[];
  loginButtonText?: string;
  menuButtonText?: string;
  chips?: HeaderChip[];
}

export interface HeroSideCard {
  id: string;
  title: I18nText;
  subtitle?: I18nText;
  buttonText?: I18nText;
  buttonHref?: string;
  badge?: I18nText;
  linkText?: I18nText;
  linkHref?: string;
  image?: string;
  backgroundColor?: string;
}

export interface HeroConfig {
  title: I18nText;
  subtitle: I18nText;
  buttonText: I18nText;
  buttonHref?: string;
  image?: string;
  /** Looping background video of the main banner (shown instead of `image`) */
  video?: string;
  backgroundColor?: string;
  sideCards?: HeroSideCard[];
}

export interface ProductItem {
  id: string;
  label: I18nText;
  icon: string;
  href?: string;
  featured?: boolean;
}

export interface ProductsConfig {
  title: I18nText;
  items: ProductItem[];
}

export interface CurrencyRateItem {
  id: string;
  code: string;
  name: I18nText;
  rate: number;
  flag: string;
}

export interface CurrencyConfig {
  title: I18nText;
  haveLabel: I18nText;
  wantLabel: I18nText;
  amountLabel: I18nText;
  currencyLabel: I18nText;
  seeAllText: I18nText;
  seeAllHref?: string;
  defaultFrom: string;
  defaultTo: string;
  rates: CurrencyRateItem[];
}

export interface OfferSlide {
  id: string;
  tag: I18nText;
  title: I18nText;
  image: string;
  ctaText: I18nText;
  href?: string;
  backgroundColor?: string;
}

export interface OffersConfig {
  title: I18nText;
  slides: OfferSlide[];
}

export interface NewsItem {
  id: string;
  title: I18nText;
  category: I18nText;
  date: string;
  href?: string;
  /** Card picture (CMS media) */
  image?: string;
}

export interface NewsPromo {
  title: I18nText;
  subtitle: I18nText;
  ctaText: I18nText;
  href?: string;
  image?: string;
}

export interface NewsConfig {
  title: I18nText;
  items: NewsItem[];
  promo: NewsPromo;
}

export interface CalculatorTab {
  id: string;
  label: I18nText;
}

export interface CalculatorToggle {
  id: string;
  label: I18nText;
  defaultOn?: boolean;
  rate?: number;
}

export interface CalculatorSuggestedCard {
  id: string;
  title: I18nText;
  rate: I18nText;
  amount: I18nText;
  term: I18nText;
  badge?: I18nText;
  badgeColor?: string;
  href: string;
  image?: string;
}

export interface CalculatorConfig {
  tabs: CalculatorTab[];
  resultLabel: I18nText;
  resultNote: I18nText;
  amountLabel: I18nText;
  termLabel: I18nText;
  amountMin: number;
  amountMax: number;
  amountDefault: number;
  termMinMonths: number;
  termMaxMonths: number;
  termDefaultMonths: number;
  toggles: CalculatorToggle[];
  /** Label above toggles; default «Снизить ставку» */
  togglesLabel?: I18nText;
  /** Render toggles as a single-select «Вид обеспечения» */
  togglesAsSelect?: boolean;
  primaryCta: I18nText;
  secondaryCta: I18nText;
  disclaimer: I18nText;
  backgroundImage?: string;
  baseRate?: number;
  /** «Вам также подойдёт» cards for deposits tab (from CMS). */
  suggested?: CalculatorSuggestedCard[];
}

export interface TrastpayConfig {
  title: I18nText;
  paragraphs: I18nText[];
  ctaText: I18nText;
  ctaHref?: string;
  image?: string;
}

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterColumn {
  id: string;
  title?: string;
  links: FooterLink[];
}

export interface FooterPhone {
  id: string;
  number: string;
  note: string;
}

export interface FooterSocial {
  id: string;
  label: string;
  href: string;
  icon?: string;
}

export interface FooterQr {
  id: string;
  label: string;
  url: string;
}

export interface FooterConfig {
  phones: FooterPhone[];
  socialLabel: string;
  social: FooterSocial[];
  columns: FooterColumn[];
  mobileTitle: string;
  qr: FooterQr[];
  copyright: string;
  license: string;
}

export interface HomePageConfig {
  header?: HeaderConfig;
  hero?: HeroConfig;
  products?: ProductsConfig;
  /** @deprecated Prefer GET /content/published/deposits — kept for CMS draft only */
  deposits?: {
    title: I18nText;
    tabs: {
      id: string;
      label: I18nText;
      filter: "all" | "sum" | "fx" | "online";
    }[];
    groups: {
      id: string;
      category: "sum" | "fx" | "online";
      title: I18nText;
      badge: I18nText;
    }[];
    products: {
      id: string;
      category: "sum" | "fx" | "online";
      title: I18nText;
      description: I18nText;
      rate: I18nText;
      rateLabel: I18nText;
      amount: I18nText;
      amountLabel: I18nText;
      term: I18nText;
      termLabel: I18nText;
      primaryCta: I18nText;
      primaryHref?: string;
      secondaryCta: I18nText;
      secondaryHref?: string;
      image: string;
    }[];
  };
  currency?: CurrencyConfig;
  offers?: OffersConfig;
  news?: NewsConfig;
  calculator?: CalculatorConfig;
  trastpay?: TrastpayConfig;
  footer?: FooterConfig;
}
