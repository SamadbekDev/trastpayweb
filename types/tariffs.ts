export type TariffAudience = "individual" | "corporate";

export interface TariffLink {
  id: string;
  label: string;
  href: string;
}

export interface TariffCard {
  id: string;
  title: string;
  href: string;
}

export interface TariffsAudienceContent {
  title: string;
  description: string;
  quickLinksTitle: string;
  quickLinks: TariffLink[];
  sectionTitle: string;
  sectionHint: string;
  cards: TariffCard[];
}

export interface TariffsPageConfig {
  individual: TariffsAudienceContent;
  corporate: TariffsAudienceContent;
  detailLinkLabel: string;
}
