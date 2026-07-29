export type Language = 'ru' | 'uz' | 'en';

export interface I18nText {
  ru: string;
  uz: string;
  en: string;
}

export interface HeaderNavItem {
  id: string;
  label: string;
  href: string;
}

export interface HeaderUtilityLink {
  id: string;
  label: string;
  href: string;
}

export interface HeaderSecondaryNavItem {
  id: string;
  label: string;
  href?: string;
}

export interface HeaderConfig {
  logo?: string;
  logoText?: string;
  navItems?: HeaderNavItem[];
  utilityLinks?: HeaderUtilityLink[];
  loginButtonText?: string;
  language?: string;
  menuButtonText?: string;
  secondaryNav?: HeaderSecondaryNavItem[];
}

export interface HeroConfig {
  title?: I18nText;
  highlightText?: I18nText;
  backgroundColor?: string;
  image?: string;
  buttonText?: I18nText;
  buttonHref?: string;
}

export interface ProductCardItem {
  id: string;
  title: I18nText;
  subtitle: I18nText;
  image: string;
}

export interface ProductTabItem {
  id: string;
  label: I18nText;
  cards: ProductCardItem[];
}

export interface ProductTabsConfig {
  title?: I18nText;
  tabs?: ProductTabItem[];
}

export interface PromoSlideItem {
  id: string;
  title: I18nText;
  description: I18nText;
  image: string;
}

export interface PromoCarouselConfig {
  title?: I18nText;
  slides?: PromoSlideItem[];
}

export interface CalculatorTabItem {
  id: string;
  label: I18nText;
}

export interface CalculatorTabsConfig {
  title?: I18nText;
  tabs?: CalculatorTabItem[];
}

export interface DepositStepItem {
  id: string;
  number: number;
  text: I18nText;
}

export interface DepositStepsConfig {
  title?: I18nText;
  steps?: DepositStepItem[];
}

export interface CurrencyOption {
  id: string;
  label: I18nText;
}

export interface DepositCalculatorConfig {
  offerBannerText?: I18nText;
  offerBannerButtonText?: I18nText;
  title?: I18nText;
  currencyLabel?: I18nText;
  currencyOptions?: CurrencyOption[];
  termLabel?: I18nText;
  amountLabel?: I18nText;
  replenishableLabel?: I18nText;
  rateBoxColor?: string;
  rateLabel?: I18nText;
  yieldLabel?: I18nText;
  endAmountLabel?: I18nText;
  legalText?: I18nText;
  resultLabel?: I18nText;
  resultNote?: I18nText;
  ctaText?: I18nText;
}

export interface ServiceCurrencyItem {
  id: string;
  code: string;
  name: I18nText;
  sell: string;
  buy: string;
  flag: string;
}

export interface ServiceCardItem {
  id: string;
  title: I18nText;
  description: I18nText;
  icon: string;
}

export interface ServicesConfig {
  title?: I18nText;
  ratesTitle?: I18nText;
  ratesDropdownLabel?: I18nText;
  moreCurrenciesText?: I18nText;
  moreCurrenciesHref?: string;
  ratesDisclaimer?: I18nText;
  ratesDisclaimerLinkText?: I18nText;
  ratesDisclaimerLinkHref?: string;
  currencies?: ServiceCurrencyItem[];
  cards?: ServiceCardItem[];
}

export interface InstantCardFeatureItem {
  id: string;
  title: I18nText;
  description: I18nText;
}

export interface InstantCardConfig {
  title?: I18nText;
  subtitle?: I18nText;
  image?: string;
  features?: InstantCardFeatureItem[];
}

export interface MobileAppConfig {
  title?: I18nText;
  promoText?: I18nText;
  icon?: string;
  backgroundColor?: string;
  androidButtonText?: I18nText;
  iosButtonText?: I18nText;
  androidHref?: string;
  iosHref?: string;
  mockups?: string[];
}

export interface HomePageConfig {
  header?: HeaderConfig;
  hero?: HeroConfig;
  productTabs?: ProductTabsConfig;
  promoCarousel?: PromoCarouselConfig;
  calculatorTabs?: CalculatorTabsConfig;
  depositSteps?: DepositStepsConfig;
  depositCalculator?: DepositCalculatorConfig;
  services?: ServicesConfig;
  instantCard?: InstantCardConfig;
  mobileApp?: MobileAppConfig;
}
