"use client";

/**
 * «Материалы раздела» — card grid linking an overview page to its migrated subpages.
 * Reads only data/legacy/index.json (titles in ru/uz/en), so it is cheap on the client.
 */
import { FileText } from "lucide-react";
import { CardGrid, LinkCard, SectionHeading } from "@/components/ui/PageKit";
import { findSection, sectionTree } from "@/data/legacy/sections";
import { useLang } from "@/hooks/useLang";
import { tr } from "@/i18n/tr";
import { UI_DICT } from "@/i18n/dict/ui";

export default function SectionIndex({
  sectionId,
  title = "Материалы раздела",
  className = "mt-12",
}: {
  sectionId: string;
  title?: string;
  className?: string;
}) {
  const lang = useLang();
  const nodes = sectionTree(findSection(sectionId), lang);
  if (!nodes.length) return null;
  return (
    <section className={`flex flex-col gap-4 ${className}`}>
      <SectionHeading title={tr(lang, title, UI_DICT)} />
      <CardGrid cols={3}>
        {nodes.map((n) => (
          <LinkCard
            key={n.key}
            href={n.href}
            icon={FileText}
            title={n.label}
            description={n.children.length ? n.children.slice(0, 3).map((c) => c.label).join(" · ") : undefined}
          />
        ))}
      </CardGrid>
    </section>
  );
}
