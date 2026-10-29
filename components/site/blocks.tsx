"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { pictures, type PictureKey } from "@/lib/mock/site/pictures";
import type { NavItem } from "@/lib/mock/site/nav";
import { asset, frame, type } from "./styles";

export type Field = "mist" | "mint" | "aqua" | "icy" | "lavender" | "lilac" | "paper" | "ink";

export const fieldClass: Record<Field, string> = {
  mist: "bg-mist text-ink",
  mint: "bg-mint text-ink",
  aqua: "bg-aqua text-ink",
  icy: "bg-icy text-ink",
  lavender: "bg-lavender text-ink",
  lilac: "bg-lilac text-ink",
  paper: "bg-paper text-ink",
  ink: "bg-ink text-mist",
};

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

/** A real picture of MLI's world, never presented as MLI's own */
export function Picture({
  name,
  className = "",
  imgClassName = "",
  priority = false,
  caption,
}: {
  name: PictureKey;
  className?: string;
  imgClassName?: string;
  priority?: boolean;
  caption?: string;
}) {
  const p = pictures[name];
  return (
    <figure className={`relative overflow-hidden ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={asset(`/site/${p.file}`)}
        width={p.width}
        height={p.height}
        alt={p.alt}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={`size-full object-cover ${imgClassName}`}
      />
      {caption && <figcaption className="mt-3 text-[14px] leading-snug text-muted">{caption}</figcaption>}
    </figure>
  );
}

/** Inner page title on a flat field, with an optional picture holding the far half */
export function PageHead({
  title,
  body,
  field = "mint",
  picture,
  children,
}: {
  title: string;
  body: string;
  field?: Field;
  picture?: PictureKey;
  children?: React.ReactNode;
}) {
  return (
    <section className={fieldClass[field]}>
      <div className={`${frame} grid gap-10 pt-14 pb-16 md:grid-cols-12 md:items-end md:pt-20 md:pb-24`}>
        <div className={picture ? "md:col-span-7" : "md:col-span-10"}>
          <h1 className={`${type.display} max-w-[14ch] text-balance`}>
            <span className="mask-line">
              <span>{title}</span>
            </span>
          </h1>
          <p className={`${type.lead} fade-up mt-8 max-w-[44ch]`} style={{ "--d": "240ms" } as React.CSSProperties}>
            {body}
          </p>
          {children && (
            <div className="fade-up mt-10" style={{ "--d": "320ms" } as React.CSSProperties}>
              {children}
            </div>
          )}
        </div>
        {picture && <Picture name={picture} priority className="aspect-[4/3] md:col-span-5" />}
      </div>
    </section>
  );
}

/** Section navigation for multi-page areas (Investor Relations, About Us, Partners) */
export function SubNav({ items, label }: { items: NavItem[]; label: string }) {
  const t = useTranslations("site.nav");
  const pathname = usePathname() || "/";
  return (
    <nav aria-label={label} className="sticky top-0 z-30 bg-mist/95">
      <div className={`${frame} no-scrollbar flex gap-1 overflow-x-auto py-3`}>
        {items.map((item) => {
          const active = pathname === item.href || pathname === item.href.replace(/\/$/, "");
          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={active ? "page" : undefined}
              className="shrink-0 rounded-full px-4 py-2 text-[15px] font-medium whitespace-nowrap text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink aria-[current=page]:bg-ink aria-[current=page]:text-mist"
            >
              {t(item.key)}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

/** A titled section. Heading on the start side, content uses the rest of the grid. */
export function Section({
  id,
  title,
  intro,
  field = "mist",
  children,
  layout = "split",
  className = "",
}: {
  id?: string;
  title: string;
  intro?: string;
  field?: Field;
  children: React.ReactNode;
  layout?: "split" | "stack";
  className?: string;
}) {
  const headingId = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={headingId} className={`${fieldClass[field]} ${className}`}>
      <div className={`${frame} py-20 md:py-28 ${layout === "split" ? "grid gap-10 md:grid-cols-12" : ""}`}>
        <div className={layout === "split" ? "md:col-span-4" : "max-w-3xl"}>
          <h2 id={headingId} data-reveal className={`${type.h2} max-w-[16ch]`}>
            {title}
          </h2>
          {intro && (
            <p data-reveal style={d(1)} className={`${type.body} mt-5 max-w-[46ch] ${field === "ink" ? "text-mist/85" : "text-ink-2"}`}>
              {intro}
            </p>
          )}
        </div>
        <div data-reveal style={d(2)} className={layout === "split" ? "md:col-span-8" : "mt-12"}>
          {children}
        </div>
      </div>
    </section>
  );
}

/** Label and value rows with no rules: alternate rows carry a tone step */
export function FactRows({ rows, tone = "ink" }: { rows: { label: string; value: string; note?: string }[]; tone?: "ink" | "mist" }) {
  return (
    <dl className="w-full">
      {rows.map((r, i) => (
        <div
          key={r.label}
          className={`grid gap-1 px-4 py-4 sm:grid-cols-[minmax(160px,1fr)_2fr] sm:gap-6 ${
            i % 2 === 0 ? (tone === "ink" ? "bg-ink/[0.04]" : "bg-mist/10") : ""
          } rounded-[var(--radius-sm)]`}
        >
          <dt className={`text-[15px] ${tone === "ink" ? "text-muted" : "text-mist/75"}`}>{r.label}</dt>
          <dd className="text-[17px] font-medium">
            {r.value}
            {r.note && <span className={`mt-1 block text-[14px] font-normal ${tone === "ink" ? "text-muted" : "text-mist/75"}`}>{r.note}</span>}
          </dd>
        </div>
      ))}
    </dl>
  );
}

/** Questions as native disclosure, so they work without script */
export function Faq({ items, tone = "ink" }: { items: { q: string; a: string }[]; tone?: "ink" | "mist" }) {
  return (
    <div className="space-y-2">
      {items.map((it) => (
        <details
          key={it.q}
          className={`group rounded-[var(--radius-md)] px-5 py-1 transition-colors ${tone === "ink" ? "bg-ink/[0.04] open:bg-paper" : "bg-mist/10 open:bg-mist/15"}`}
        >
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-[18px] font-semibold">
            {it.q}
            <span aria-hidden="true" className="grid size-8 shrink-0 place-items-center rounded-full bg-ink/5 text-[20px] leading-none transition-transform group-open:rotate-45">
              +
            </span>
          </summary>
          <p className={`${type.body} max-w-[62ch] pb-5 ${tone === "ink" ? "text-ink-2" : "text-mist/85"}`}>{it.a}</p>
        </details>
      ))}
    </div>
  );
}

/** A list of short statements set large, one per line */
export function BigList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((s, i) => (
        <li key={s} data-reveal style={d(i)} className="text-[clamp(21px,2vw,28px)] leading-snug font-semibold tracking-tight text-pretty">
          {s}
        </li>
      ))}
    </ul>
  );
}

/** Placeholder marker for content the client must confirm. Visible on purpose. */
export function PlaceholderNote({ children }: { children: React.ReactNode }) {
  return <p className="text-[14px] leading-relaxed text-warning">{children}</p>;
}
