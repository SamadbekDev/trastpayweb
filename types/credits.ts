import { I18nText } from "@/types/pageConfig";

export type CreditGroupId =
  | "auto"
  | "mortgage"
  | "micro"
  | "business"
  | "consumer"
  | "green"
  | "overdraft"
  | string;

export type CreditTemplate = "standard" | "mortgage" | "auto" | "micro";

export type CreditIconName =
  | "car"
  | "home"
  | "link"
  | "briefcase"
  | "bag"
  | "sun"
  | "file";

export interface CreditTab {
  id: string;
  label: I18nText;
  filter: "all" | string;
}

export interface CreditGroup {
  id: string;
  title: I18nText;
  accent: string;
  badgeBg: string;
  gradient: string;
  icon: CreditIconName;
}

export interface CreditProduct {
  id: string;
  groupId: string;
  template: CreditTemplate;
  title: I18nText;
  description: I18nText;
  rate: I18nText;
  amount: I18nText;
  term: I18nText;
  /** Blue conditions strip header on product page; falls back to template + title */
  statsTitle?: I18nText;
  image?: string;
  details?: Partial<CreditPageContent>;
}

export interface CreditTextItem {
  id: string;
  title: I18nText;
  text: I18nText;
  link?: I18nText;
  href?: string;
  featured?: boolean;
  primary?: boolean;
  wide?: boolean;
  image?: string;
}

export interface CreditInfoTab {
  id: string;
  label: I18nText;
  title: I18nText;
  items: I18nText[];
}

export interface CreditFaqItem {
  id: string;
  question: I18nText;
  answer: I18nText;
}

export interface CreditRequirement {
  id: string;
  title: I18nText;
  items: I18nText[];
}

export interface CreditChannel {
  id: string;
  badge: I18nText;
  title: I18nText;
  tone: string;
  steps: CreditTextItem[];
}

export interface CreditCalcOption {
  id: string;
  label: I18nText;
  rate?: number;
  rateLabel?: I18nText;
  maxLoan?: number;
  defaultOn?: boolean;
}

export interface CreditCalculatorContent {
  kind: "loan" | "mortgage" | "auto";
  rate: number;
  rateLabel: I18nText;
  resultLabel: I18nText;
  resultNote: I18nText;
  submitLabel: I18nText;
  disclaimer: I18nText;
  priceLabel: I18nText;
  downLabel: I18nText;
  termQuestion: I18nText;
  amountLabel: I18nText;
  priceMin: number;
  priceMax: number;
  priceDefault: number;
  priceStep: number;
  downMin: number;
  downMax: number;
  downDefault: number;
  termMin: number;
  termMax: number;
  termDefault: number;
  amountMin: number;
  amountMax: number;
  amountDefault: number;
  regions: CreditCalcOption[];
  brands: CreditCalcOption[];
  tabs: CreditCalcOption[];
  toggles: CreditCalcOption[];
  primaryCta: I18nText;
  secondaryCta: I18nText;
  loanLabel: I18nText;
  downAmountLabel: I18nText;
  rateCaption: I18nText;
  termCaption: I18nText;
  currencySuffix: I18nText;
  monthsSuffix: I18nText;
  fromWord: I18nText;
  toWord: I18nText;
  limitNote: I18nText;
}

export interface CreditRatePanel {
  badge: I18nText;
  value: I18nText;
  rows: CreditTextItem[];
}

export interface CreditDocument {
  id: string;
  title: I18nText;
  href: string;
  /** Optional CMS link label, e.g. «PDF · скачать» */
  date?: I18nText | string;
}

export interface CreditRateTable {
  id: string;
  tabId: string;
  title: I18nText;
  subtitle?: I18nText;
  columns: I18nText[];
  rows: I18nText[][];
  footnote?: I18nText;
  wide?: boolean;
}

export interface CreditPageContent {
  template: CreditTemplate;
  heroTitle: I18nText;
  heroSubtitle: I18nText;
  heroPrimary: I18nText;
  heroPrimaryHref: string;
  heroSecondary: I18nText;
  heroSecondaryHref: string;
  heroImage?: string;
  breadcrumb: I18nText;
  highlights: CreditTextItem[];
  whyTitle: I18nText;
  benefits: CreditTextItem[];
  conditionsTitle: I18nText;
  conditions: CreditTextItem[];
  requirements: CreditRequirement[];
  requirementsImage?: string;
  calloutTitle: I18nText;
  calloutText: I18nText;
  stepsBannerTitle: I18nText;
  stepsBannerSubtitle: I18nText;
  stepsCta: I18nText;
  stepsCtaHref: string;
  stepsBannerImage?: string;
  steps: CreditTextItem[];
  howToTitle: I18nText;
  howToSubtitle: I18nText;
  channels: CreditChannel[];
  calculator: CreditCalculatorContent;
  infoTitle: I18nText;
  infoImage?: string;
  infoTabs: CreditInfoTab[];
  rateTables: CreditRateTable[];
  documents: CreditDocument[];
  ratePanel: CreditRatePanel | null;
  dealersTitle: I18nText;
  dealers: CreditTextItem[];
  relatedTitle: I18nText;
  related: CreditTextItem[];
  faqTitle: I18nText;
  faq: CreditFaqItem[];
  faqMore: I18nText;
  appTitle: I18nText;
  appText: I18nText;
  appPrimary: I18nText;
  appPrimaryHref?: string;
  appSecondary: I18nText;
  appSecondaryHref?: string;
  appImage?: string;
  catalogCrumb: I18nText;
}

export interface CreditsPageConfig {
  title: I18nText;
  tabs: CreditTab[];
  groups: CreditGroup[];
  statLabels: { rate: I18nText; amount: I18nText; term: I18nText };
  primaryCta: I18nText;
  secondaryCta: I18nText;
  products: CreditProduct[];
  footerNote: I18nText;
  footerSource: I18nText;
}

export interface CreditDetailConfig {
  product: CreditProduct;
  page: CreditPageContent;
}
