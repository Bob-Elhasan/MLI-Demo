"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icon";
import { formatDate } from "@/lib/format";
import { irNav } from "@/lib/mock/site/nav";
import { assemblies, egxDisclosures, financialReports, fraDisclosures, irCalendar } from "@/lib/mock/site/ir";
import { useLocale } from "@/lib/store/locale";
import { FactRows, PageHead, PlaceholderNote, Section, SubNav, type Field } from "./blocks";
import { DocTable } from "./doc-table";
import { IntentForm } from "./intent-form";
import { frame, type } from "./styles";
import type { PictureKey } from "@/lib/mock/site/pictures";

type Row = { label: string; value: string; note?: string };

function IrShell({ page, field = "icy", picture, children }: { page: string; field?: Field; picture?: PictureKey; children: React.ReactNode }) {
  const t = useTranslations("ir");
  return (
    <>
      <PageHead title={t(`${page}.title`)} body={t(`${page}.body`)} field={field} picture={picture} />
      <SubNav items={irNav} label={t("navLabel")} />
      {children}
      <div className={`${frame} bg-mist pt-6 pb-20`}>
        <p className="max-w-[80ch] text-[14px] leading-relaxed text-muted">{t("disclaimer")}</p>
      </div>
    </>
  );
}

export function IrOverview() {
  const t = useTranslations("ir.overview");
  const tn = useTranslations("site.nav");
  const locale = useLocale((s) => s.locale);
  const latest = [financialReports[1].docs[0], fraDisclosures[0], financialReports[0].docs[0], egxDisclosures[0]];
  return (
    <IrShell page="overview" picture="qasralnilbridge">
      <Section id="glance" title={t("glanceTitle")} intro={t("glanceBody")}>
        <FactRows rows={t.raw("glance") as Row[]} />
      </Section>

      <Section id="figures" title={t("figuresTitle")} intro={t("figuresBody")} field="paper">
        <dl className="grid gap-2 sm:grid-cols-2">
          {(t.raw("figures") as Row[]).map((f) => (
            <div key={f.label} className="rounded-[var(--radius-md)] bg-mist p-6">
              <dt className="text-[15px] text-muted">{f.label}</dt>
              <dd className="mt-3 text-[clamp(32px,3.4vw,48px)] leading-none font-semibold tracking-tight tabular">{f.value}</dd>
              {f.note && <dd className="mt-3 text-[14px] text-muted">{f.note}</dd>}
            </div>
          ))}
        </dl>
        <div className="mt-6">
          <PlaceholderNote>{t("figuresPlaceholder")}</PlaceholderNote>
        </div>
      </Section>

      <Section id="latest" title={t("latestTitle")} intro={t("latestBody")}>
        <DocTable docs={latest} caption={t("latestTitle")} />
      </Section>

      <Section id="calendar" title={t("calendarTitle")} intro={t("calendarBody")} field="lavender">
        <ul className="space-y-2">
          {irCalendar.map((e, i) => (
            <li key={e.id} className={`flex flex-wrap items-baseline justify-between gap-3 rounded-[var(--radius-sm)] px-4 py-4 ${i % 2 === 0 ? "bg-paper/70" : ""}`}>
              <span className="text-[19px] font-semibold">{t(`calendar.${e.key}`)}</span>
              <span className="text-[16px] text-ink-2 tabular">{formatDate(e.date, locale, { day: "numeric", month: "long", year: "numeric" })}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <PlaceholderNote>{t("calendarPlaceholder")}</PlaceholderNote>
        </div>
      </Section>

      <section aria-labelledby="ir-sections-title" className="bg-mist">
        <div className={`${frame} py-20 md:py-28`}>
          <h2 id="ir-sections-title" className={type.h2}>
            {t("sectionsTitle")}
          </h2>
          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {irNav.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="group flex items-start justify-between gap-4 rounded-[var(--radius-sm)] px-3 py-5 transition-colors hover:bg-paper">
                  <span>
                    <span className="block text-[22px] font-semibold tracking-tight">{tn(l.key)}</span>
                    <span className="mt-1 block text-[15px] text-ink-2">{t(`sections.${l.key}`)}</span>
                  </span>
                  <Icon name="chevron" size={20} className="mt-1 shrink-0 text-accent transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </IrShell>
  );
}

export function IrReports() {
  const t = useTranslations("ir.reports");
  return (
    <IrShell page="reports" field="icy" picture="nileskyline">
      {financialReports.map((g, i) => (
        <Section key={g.id} id={g.id} title={t(`groups.${g.key}.title`)} intro={t(`groups.${g.key}.body`)} field={i % 2 === 1 ? "paper" : "mist"}>
          <DocTable docs={g.docs} caption={t(`groups.${g.key}.title`)} />
        </Section>
      ))}
      <div className={`${frame} bg-mist pt-10`}>
        <PlaceholderNote>{t("placeholder")}</PlaceholderNote>
      </div>
    </IrShell>
  );
}

export function IrDisclosures() {
  const t = useTranslations("ir.disclosures");
  return (
    <IrShell page="disclosures" field="aqua">
      <Section id="fra" title={t("fraTitle")} intro={t("fraBody")}>
        <DocTable docs={fraDisclosures} caption={t("fraTitle")} />
      </Section>
      <Section id="egx" title={t("egxTitle")} intro={t("egxBody")} field="paper">
        <div className="mb-6 rounded-[var(--radius-md)] bg-warning-soft p-5">
          <p className="text-[16px] leading-relaxed text-ink">{t("egxStatus")}</p>
        </div>
        <DocTable docs={egxDisclosures} caption={t("egxTitle")} />
      </Section>
      <Section id="policy" title={t("policyTitle")} intro={t("policyBody")} field="mint">
        <FactRows rows={t.raw("policy") as Row[]} />
      </Section>
    </IrShell>
  );
}

export function IrGovernance() {
  const t = useTranslations("ir.governance");
  const locale = useLocale((s) => s.locale);
  const board = t.raw("board") as { role: string; type: string }[];
  const committees = t.raw("committees") as { name: string; remit: string }[];
  return (
    <IrShell page="governance" field="lavender" picture="nilometerroda">
      <Section id="board" title={t("boardTitle")} intro={t("boardBody")}>
        <table className="w-full border-collapse text-start">
          <caption className="sr-only">{t("boardTitle")}</caption>
          <thead className="sr-only sm:not-sr-only">
            <tr className="text-[14px] text-muted">
              <th scope="col" className="px-4 pb-3 text-start font-medium">{t("cols.name")}</th>
              <th scope="col" className="px-4 pb-3 text-start font-medium">{t("cols.role")}</th>
              <th scope="col" className="hidden px-4 pb-3 text-start font-medium md:table-cell">{t("cols.type")}</th>
            </tr>
          </thead>
          <tbody>
            {board.map((m, i) => (
              <tr key={i} className={i % 2 === 0 ? "bg-ink/[0.04]" : ""}>
                <td className="rounded-s-[var(--radius-sm)] px-4 py-4 text-[17px] font-medium text-muted">{t("namePlaceholder")}</td>
                <td className="px-4 py-4 text-[17px] font-medium">{m.role}</td>
                <td className="hidden rounded-e-[var(--radius-sm)] px-4 py-4 text-[16px] text-ink-2 md:table-cell">{m.type}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-5">
          <PlaceholderNote>{t("boardPlaceholder")}</PlaceholderNote>
        </div>
      </Section>

      <Section id="committees" title={t("committeesTitle")} intro={t("committeesBody")} field="paper">
        <FactRows rows={committees.map((c) => ({ label: c.name, value: c.remit }))} />
      </Section>

      <Section id="policies" title={t("policiesTitle")} intro={t("policiesBody")}>
        <DocTable
          caption={t("policiesTitle")}
          docs={[
            { id: "charter", key: "boardCharter", date: "2026-01-15", sizeKb: 320 },
            { id: "disclosure", key: "disclosurePolicy", date: "2026-01-15", sizeKb: 260 },
            { id: "conduct", key: "codeOfConduct", date: "2025-09-01", sizeKb: 410 },
            { id: "rpt", key: "relatedParty", date: "2025-09-01", sizeKb: 190 },
            { id: "whistle", key: "whistleblowing", date: "2025-09-01", sizeKb: 170 },
            { id: "eval", key: "boardEvaluation", period: "2025", date: "2026-03-20", sizeKb: 280 },
          ]}
        />
      </Section>

      <Section id="assemblies" title={t("assembliesTitle")} intro={t("assembliesBody")} field="icy">
        <ul className="space-y-2">
          {assemblies.map((a, i) => (
            <li key={a.id} className={`grid gap-1 rounded-[var(--radius-sm)] px-4 py-4 sm:grid-cols-[1fr_auto] sm:items-baseline ${i % 2 === 0 ? "bg-paper/70" : ""}`}>
              <span className="text-[18px] font-semibold">{t(`assembly.${a.key}`, { period: a.period })}</span>
              <span className="text-[16px] text-ink-2 tabular">{formatDate(a.date, locale, { day: "numeric", month: "long", year: "numeric" })}</span>
            </li>
          ))}
        </ul>
        <div className="mt-5">
          <PlaceholderNote>{t("assembliesPlaceholder")}</PlaceholderNote>
        </div>
      </Section>
    </IrShell>
  );
}

/** Drawn placeholder for the live price module, switched on from the listing date */
function PricePlaceholder() {
  const t = useTranslations("ir.share");
  return (
    <div data-ui className="rounded-[var(--radius-lg)] bg-paper p-6 md:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-4">
        <div>
          <p className="text-[15px] text-muted">{t("priceLabel")}</p>
          <p className="mt-2 text-[clamp(32px,3.4vw,48px)] leading-none font-semibold tracking-tight text-muted tabular" dir="ltr">
            EGP --.--
          </p>
        </div>
        <div className="flex gap-1 rounded-full bg-ink/5 p-1 text-[14px] font-semibold">
          {["1D", "1M", "6M", "1Y"].map((r, i) => (
            <span key={r} className={`rounded-full px-3 py-1.5 ${i === 3 ? "bg-paper text-ink shadow-card" : "text-muted"}`} dir="ltr">
              {r}
            </span>
          ))}
        </div>
      </div>
      <div className="relative mt-8 grid h-48 place-items-center overflow-hidden rounded-[var(--radius-md)] bg-mist">
        <svg viewBox="0 0 400 120" preserveAspectRatio="none" className="absolute inset-0 size-full text-line-strong" aria-hidden="true">
          <path d="M0 90 C40 85 60 70 100 72 S170 60 200 64 S270 40 300 46 S360 30 400 28" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="6 6" />
        </svg>
        <p className="relative max-w-[34ch] px-6 text-center text-[16px] font-medium text-ink-2">{t("priceNote")}</p>
      </div>
    </div>
  );
}

export function IrShare() {
  const t = useTranslations("ir.share");
  return (
    <IrShell page="share" field="mint">
      <Section id="price" title={t("priceTitle")} intro={t("priceBody")}>
        <PricePlaceholder />
      </Section>
      <Section id="facts" title={t("factsTitle")} intro={t("factsBody")} field="paper">
        <FactRows rows={t.raw("facts") as Row[]} />
        <div className="mt-5">
          <PlaceholderNote>{t("factsPlaceholder")}</PlaceholderNote>
        </div>
      </Section>
      <Section id="ownership" title={t("ownershipTitle")} intro={t("ownershipBody")}>
        <FactRows rows={t.raw("ownership") as Row[]} />
      </Section>
      <Section id="dividends" title={t("dividendsTitle")} intro={t("dividendsBody")} field="lilac">
        <FactRows rows={t.raw("dividends") as Row[]} />
      </Section>
    </IrShell>
  );
}

export function IrContact() {
  const t = useTranslations("ir.contact");
  return (
    <IrShell page="contact" field="lilac">
      <Section id="team" title={t("teamTitle")} intro={t("teamBody")}>
        <FactRows rows={t.raw("details") as Row[]} />
        <div className="mt-5">
          <PlaceholderNote>{t("placeholder")}</PlaceholderNote>
        </div>
      </Section>
      <Section id="form" title={t("formTitle")} intro={t("formBody")} field="paper">
        <IntentForm kind="investor" />
      </Section>
    </IrShell>
  );
}
