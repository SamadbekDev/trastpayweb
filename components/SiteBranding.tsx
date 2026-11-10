"use client";

import { createContext, useContext, type ReactNode } from "react";

type SiteBranding = {
  logo: string;
  logoText: string;
};

const DEFAULT: SiteBranding = {
  logo: "/logo.svg",
  logoText: "TRASTBANK",
};

const SiteBrandingContext = createContext<SiteBranding>(DEFAULT);

export function SiteBrandingProvider({
  logo,
  logoText,
  children,
}: {
  logo?: string | null;
  logoText?: string | null;
  children: ReactNode;
}) {
  const value: SiteBranding = {
    logo: logo?.trim() || DEFAULT.logo,
    logoText: logoText?.trim() || DEFAULT.logoText,
  };
  return (
    <SiteBrandingContext.Provider value={value}>
      {children}
    </SiteBrandingContext.Provider>
  );
}

export function useSiteBranding(): SiteBranding {
  return useContext(SiteBrandingContext);
}
