/**
 * Renders ContentBlock[] with PageKit styles (Figma Ultimate Design).
 * Server-safe: no hooks, so pages can keep large content out of the client bundle.
 */
import Link from "next/link";
import { SkeletonImg } from "@/components/ui/SkeletonImage";
import { Fragment, type ReactNode } from "react";
import { CalendarClock, Download, FileText, Phone } from "lucide-react";
import { BulletList, InfoTable, PendingContent } from "@/components/ui/PageKit";
import type { ContentBlock, Person } from "@/types/content";
import type { Language } from "@/types/pageConfig";
import { tr } from "@/i18n/tr";
import { UI_DICT } from "@/i18n/dict/ui";

const ui = (lang: Language, s: string) => tr(lang, s, UI_DICT);

const isExternal = (h: string) => /^(https?:|tel:|mailto:)/.test(h);

function SmartLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  const cls = className ?? "font-medium text-primary underline-offset-2 hover:underline";
  if (isExternal(href)) {
    return (
      <a href={href} className={cls} {...(href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

/** Renders text with inline [label](href) links. */
export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  const re = /\[([^\]]+)\]\(([^)]+)\)/g;
  let last = 0;
  let m: RegExpExecArray | null;
  while ((m = re.exec(text))) {
    if (m.index > last) parts.push(text.slice(last, m.index));
    const href = m[2].trim();
    parts.push(
      href.startsWith("#") ? (
        <Fragment key={m.index}>{m[1]}</Fragment>
      ) : (
        <SmartLink key={m.index} href={href}>
          {m[1]}
        </SmartLink>
      )
    );
    last = re.lastIndex;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <>{parts}</>;
}

function BlockTitle({ children }: { children: ReactNode }) {
  return <h2 className="text-[20px] font-semibold leading-7 text-ink">{children}</h2>;
}

function DataTable({ rows }: { rows: string[][] }) {
  const width = Math.max(...rows.map((r) => r.length));
  if (width <= 2) {
    return (
      <InfoTable
        rows={rows.map((r, i) => ({
          label: r.length === 1 ? "" : r[0],
          value: <RichText text={r.length === 1 ? r[0] : r[1]} />,
          key: `${i}`,
        }))}
      />
    );
  }
  const [head, ...body] = rows;
  return (
    <div className="-mx-2 overflow-x-auto px-2">
      <table className="w-full min-w-[560px] border-collapse text-left text-[13px] leading-5">
        <thead>
          <tr className="border-b border-line">
            {head.map((c, i) => (
              <th key={i} className="px-3 py-2.5 text-[12px] font-semibold uppercase tracking-[0.04em] text-text-muted">
                <RichText text={c} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-line">
          {body.map((r, i) => (
            <tr key={i} className={r.length === 1 ? "bg-page" : undefined}>
              {r.map((c, j) => (
                <td
                  key={j}
                  colSpan={r.length === 1 ? width : undefined}
                  className={r.length === 1 ? "px-3 py-2.5 font-semibold text-ink" : "px-3 py-2.5 align-top text-ink-soft"}
                >
                  <RichText text={c} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function DocList({ items }: { items: { label: string; href: string; meta?: string }[] }) {
  return (
    <ul className="flex flex-col gap-2">
      {items.map((d) => (
        <li key={d.href + d.label}>
          <a
            href={d.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 rounded-card bg-page px-4 py-3 transition-colors hover:bg-primary-soft"
          >
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-tile bg-white text-primary">
              <FileText size={18} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[14px] font-medium leading-5 text-ink">{d.label}</span>
              {d.meta ? <span className="block text-[12px] leading-4 text-text-muted">{d.meta}</span> : null}
            </span>
            <Download size={18} className="shrink-0 text-text-muted transition-colors group-hover:text-primary" />
          </a>
        </li>
      ))}
    </ul>
  );
}

function PersonCard({ p, lang }: { p: Person; lang: Language }) {
  return (
    <article className="flex flex-col gap-4 rounded-card bg-page p-5 lg:p-6">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h3 className="text-[17px] font-semibold leading-6 text-ink">{p.name}</h3>
          <p className="text-[13px] leading-5 text-text-muted">{p.position}</p>
        </div>
        {p.phone ? (
          <a href={`tel:${p.phone.replace(/[^\d+]/g, "")}`} className="inline-flex items-center gap-2 text-[13px] font-medium text-primary">
            <Phone size={14} /> {p.phone}
          </a>
        ) : null}
      </div>
      {p.duties?.length ? (
        <div className="flex flex-col gap-2">
          {p.duties.map((d, i) => (
            <p key={i} className="text-[14px] leading-6 text-ink-soft">
              {d}
            </p>
          ))}
        </div>
      ) : null}
      {p.bio?.length ? (
        <details className="group rounded-tile bg-white px-4 py-3">
          <summary className="cursor-pointer text-[13px] font-semibold text-ink marker:text-primary">{ui(lang, "Образование и опыт")}</summary>
          <div className="pt-2">
            <InfoTable rows={p.bio.map((r) => ({ label: r[0], value: r[1] }))} />
          </div>
        </details>
      ) : null}
      {p.schedule?.length ? (
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[13px] text-ink-soft">
          <span className="inline-flex items-center gap-2 font-semibold text-ink">
            <CalendarClock size={15} className="text-primary" /> {ui(lang, "Приём граждан:")}
          </span>
          <span>{summariseSchedule(p.schedule, lang)}</span>
          {p.bookingHref ? (
            <a href={p.bookingHref} target="_blank" rel="noopener noreferrer" className="font-semibold text-primary hover:underline">
              {ui(lang, "Записаться на приём →")}
            </a>
          ) : null}
        </div>
      ) : null}
    </article>
  );
}

/** ["Пн","08:00 - 11:00"],… → "Пн–Пт 08:00 - 11:00" when the working days share one time. */
function summariseSchedule(source: string[][], lang: Language) {
  const rows = source.map((r) => [ui(lang, r[0]), r[1]]);
  const work = rows.filter((r) => r[1] && r[1] !== "-");
  if (!work.length) return ui(lang, "по записи");
  const same = work.every((r) => r[1] === work[0][1]);
  return same ? `${work[0][0]}–${work[work.length - 1][0]} ${work[0][1]}` : work.map((r) => `${r[0]} ${r[1]}`).join(", ");
}

export function ContentBlockView({ block, lang = "ru" }: { block: ContentBlock; lang?: Language }) {
  switch (block.type) {
    case "heading":
      return block.href && !block.href.startsWith("#") ? (
        <h3 className="text-[17px] font-semibold leading-6 text-ink">
          <SmartLink href={block.href} className="text-ink transition-colors hover:text-primary">
            {block.text}
          </SmartLink>
        </h3>
      ) : block.level === 3 ? (
        <h3 className="text-[15px] font-semibold leading-6 text-ink">{block.text}</h3>
      ) : (
        <BlockTitle>{block.text}</BlockTitle>
      );
    case "text":
      return (
        <div className="flex flex-col gap-3">
          {block.title ? <BlockTitle>{block.title}</BlockTitle> : null}
          {block.paragraphs.map((p, i) => (
            <p key={i} className="text-[15px] leading-6 text-ink-soft">
              <RichText text={p} />
            </p>
          ))}
        </div>
      );
    case "list":
      return (
        <div className="flex flex-col gap-4">
          {block.title ? <BlockTitle>{block.title}</BlockTitle> : null}
          <BulletList items={block.items.map((it, i) => <RichText key={i} text={it} />)} />
        </div>
      );
    case "table":
      return (
        <div className="flex flex-col gap-2">
          {block.title ? <BlockTitle>{block.title}</BlockTitle> : null}
          <DataTable rows={block.rows} />
        </div>
      );
    case "docs":
    case "links":
      return (
        <div className="flex flex-col gap-3">
          {block.title ? <BlockTitle>{block.title}</BlockTitle> : null}
          <DocList items={block.items} />
        </div>
      );
    case "stats":
      return (
        <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
          {block.items.map((s) => (
            <div key={s.label} className="flex flex-col gap-1 rounded-card bg-page p-4">
              <span className="text-[24px] font-semibold leading-8 text-ink">{s.value}</span>
              <span className="text-[12px] leading-4 text-text-muted">{s.label}</span>
            </div>
          ))}
        </div>
      );
    case "people":
      return (
        <div className="flex flex-col gap-4">
          {block.items.map((p) => (
            <PersonCard key={p.name} p={p} lang={lang} />
          ))}
        </div>
      );
    case "gallery":
      return (
        <div className="flex flex-col gap-3">
          {block.title ? <BlockTitle>{block.title}</BlockTitle> : null}
          <div className={block.images.length === 1 ? "grid grid-cols-1" : "grid grid-cols-2 gap-3 md:grid-cols-3"}>
            {block.images.map((img) => (
              <a
                key={img.src}
                href={img.src}
                target="_blank"
                rel="noopener noreferrer"
                className="group block overflow-hidden rounded-tile bg-page"
              >
                {/* legacy CMS images with unknown sizes; skeleton while loading */}
                <SkeletonImg
                  src={img.src}
                  alt={img.alt}
                  loading="lazy"
                  loadingClassName={block.images.length === 1 ? "h-[320px] w-full max-w-[560px] rounded-xl" : ""}
                  className={
                    block.images.length === 1
                      ? "mx-auto max-h-[520px] w-auto object-contain"
                      : "aspect-[4/3] w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                  }
                />
              </a>
            ))}
          </div>
        </div>
      );
    case "pending":
      return <PendingContent text={block.text} lang={lang} />;
  }
}

export function ContentBlocks({ blocks, lang = "ru" }: { blocks: ContentBlock[]; lang?: Language }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((b, i) => (
        <ContentBlockView key={i} block={b} lang={lang} />
      ))}
    </div>
  );
}
