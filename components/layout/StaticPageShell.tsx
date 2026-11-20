"use client";

import type { ReactNode } from "react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { SiteBrandingProvider } from "@/components/SiteBranding";
import { OfficialPortals } from "@/components/ui/PageKit";
import useHomePageConfig from "@/hooks/useHomePageConfig";
import { useLang } from "@/hooks/useLang";
import {
  getDefaultFooterConfig,
  getDefaultHeaderConfig,
} from "@/data/staticShell";
import "@/i18n";

export default function StaticPageShell({
  children,
  showProductNav = true,
  showPortals = true,
}: {
  children: ReactNode;
  showProductNav?: boolean;
  /** "Официальные порталы и партнёры" strip above the footer (Figma Ultimate Design). */
  showPortals?: boolean;
}) {
  const { config: home } = useHomePageConfig();
  const lang = useLang();
  const header = home?.header ?? getDefaultHeaderConfig(lang);
  const footer =
    lang === "uz" || lang === "en"
      ? getDefaultFooterConfig(lang)
      : (home?.footer ?? getDefaultFooterConfig(lang));

  return (
    <SiteBrandingProvider logo={header.logo} logoText={header.logoText}>
      <div className="flex min-h-screen flex-col bg-page">
        <Header config={header} showProductNav={showProductNav} />
        <main className="flex-grow bg-page">{children}</main>
        {showPortals ? <OfficialPortals lang={lang} /> : null}
        <Footer config={footer} />
      </div>
    </SiteBrandingProvider>
  );
}
