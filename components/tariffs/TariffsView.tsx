"use client";

import TariffsContent from "@/components/tariffs/TariffsContent";
import { TariffAudience } from "@/types/tariffs";

/** @deprecated Prefer TariffsContent inside SiteShell */
export default function TariffsView({
  initialAudience = "individual",
}: {
  initialAudience?: TariffAudience;
}) {
  return <TariffsContent initialAudience={initialAudience} />;
}
