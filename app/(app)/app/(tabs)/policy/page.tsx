"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { Group, Pill, Row, SectionHead, TabTitle } from "@/components/app/list";
import { Sheet } from "@/components/app/sheet";
import { useProductName } from "@/components/app/use-product-name";
import { formatDate, formatEGP, formatNumber } from "@/lib/format";
import { monthsFrom, paymentState } from "@/lib/schedule";
import { useJourney, type Policy } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

export default function PolicyScreen() {
  const t = useTranslations("policy");
  const th = useTranslations("home");
  const tc = useTranslations("common");
  const locale = useLocale((s) => s.locale);
  const productName = useProductName();
  const { policy, scenario, receipts, beneficiaries, claims, lastCheckIn, vaultDocs, idFields } = useJourney();
  const [doc, setDoc] = useState(false);

  if (!policy) {
    return (
      <>
        <TabTitle title={t("title")} />
        <section className="mt-4 rounded-[24px] bg-mint p-6">
          <p className="text-[15px] text-ink-2">{th("emptyBody")}</p>
          <ButtonLink href="/app/products" className="mt-5">{th("emptyCta")}</ButtonLink>
        </section>
      </>
    );
  }

  const fmt = (d: Date | string) => formatDate(d, locale);
  const state = paymentState(policy, scenario);
  const endsOn = monthsFrom(policy.issuedAt, policy.quote.term * 12);
  const status =
    scenario === "lapsed" ? <Pill tone="bad">{t("lapsed")}</Pill> : scenario === "grace" ? <Pill tone="warn">{t("grace")}</Pill> : <Pill tone="ok">{t("active")}</Pill>;
  const nextDate = state.kind === "scheduled" || state.kind === "due" ? state.next.date : undefined;

  // Past events come from what actually happened in the app, the future from the cadence
  const past: { label: string; date: Date }[] = [
    { label: t("events.verified"), date: new Date(policy.issuedAt) },
    { label: t("events.issued"), date: new Date(policy.issuedAt) },
    ...receipts.map((r) => ({ label: r.kind === "reinstatement" ? t("events.reinstated") : t("events.paid"), date: new Date(r.paidAt) })),
    ...beneficiaries.filter((b) => b.invite !== "none").map(() => ({ label: t("events.beneficiary"), date: new Date() })),
    ...claims.map((c) => ({ label: t("events.claim"), date: new Date(c.submittedAt) })),
    ...(lastCheckIn ? [{ label: t("events.checkIn"), date: new Date(lastCheckIn) }] : []),
  ].sort((a, b) => b.date.getTime() - a.date.getTime());

  const future: { label: string; date: Date }[] = [
    ...(nextDate ? [{ label: t("events.nextPayment"), date: nextDate }] : []),
    { label: t("events.sixMonth"), date: monthsFrom(policy.issuedAt, 6) },
    { label: t("events.annual"), date: monthsFrom(policy.issuedAt, 12) },
    { label: t("events.renewal"), date: endsOn },
  ];

  const docName = (name: string) => (["policyContract", "policySchedule", "nationalId"].includes(name) ? t(`docs.${name}`) : name);

  return (
    <>
      <TabTitle title={t("title")} />

      <section className="mt-2 rounded-[24px] bg-mint p-5">
        <div className="flex items-center justify-between">
          <p className="text-[14px] font-semibold text-accent-strong">{productName(policy.productId)}</p>
          {status}
        </div>
        <p className="tabular mt-3 text-[32px] leading-tight font-semibold tracking-tight">{formatEGP(policy.quote.cover, locale)}</p>
        <p className="text-[13px] text-ink-2">{t("endsOn", { date: fmt(endsOn) })}</p>
      </section>

      <Group className="mt-3">
        <Row title={t("number")} value={<span dir="ltr">{policy.number}</span>} />
        <Row title={t("insured")} value={locale === "ar" ? idFields.fullNameAr : idFields.fullNameEn} />
        <Row title={t("premium")} value={`${formatEGP(policy.quote.monthly, locale)} ${tc("monthly")}`} />
        <Row title={t("term")} value={tc("years", { count: formatNumber(policy.quote.term, locale) })} />
        <Row title={t("nextPayment")} sub={nextDate ? fmt(nextDate) : undefined} value={state.kind === "lapsed" ? formatEGP(state.total, locale) : formatEGP(policy.quote.monthly, locale)} href="/app/pay" />
      </Group>

      <SectionHead title={t("documents")} />
      <Group>
        {vaultDocs
          .filter((d) => d.kind === "policy")
          .map((d) => (
            <Row key={d.id} title={docName(d.name)} sub={fmt(d.addedAt)} onClick={() => setDoc(true)} />
          ))}
        <Row title={t("docs.keyFacts")} sub={fmt(policy.issuedAt)} onClick={() => setDoc(true)} />
        {receipts.slice(0, 2).map((r) => (
          <Row key={r.number} title={t("docs.receipt", { number: r.number })} sub={fmt(r.paidAt)} href="/app/pay" />
        ))}
      </Group>

      <SectionHead title={t("timeline")} />
      <div className="rounded-[20px] bg-paper p-4 ring-1 ring-line">
        <Timeline title={t("upcoming")} items={future} fmt={fmt} upcoming />
        <Timeline title={t("past")} items={past} fmt={fmt} />
      </div>

      <ButtonLink href="/app/claims" variant="secondary" className="mt-6">
        {t("makeClaim")}
      </ButtonLink>

      <Sheet open={doc} onClose={() => setDoc(false)} title={t("docTitle")}>
        <PolicyDocument policy={policy} productName={productName(policy.productId)} />
        <ButtonLink href="#" onClick={(e) => { e.preventDefault(); setDoc(false); }} variant="secondary" className="mt-5">
          {t("docClose")}
        </ButtonLink>
      </Sheet>
    </>
  );
}

function Timeline({ title, items, fmt, upcoming }: { title: string; items: { label: string; date: Date }[]; fmt: (d: Date) => string; upcoming?: boolean }) {
  return (
    <div className={upcoming ? "mb-5" : ""}>
      <p className="mb-3 text-[13px] font-medium text-muted">{title}</p>
      <ol className="relative space-y-4 ps-5 before:absolute before:start-[5px] before:top-1.5 before:bottom-1.5 before:w-0.5 before:bg-line">
        {items.map((it, i) => (
          <li key={`${it.label}-${i}`} className="relative">
            <span className={`absolute -start-5 top-1.5 size-3 rounded-full ring-2 ring-paper ${upcoming ? "bg-paper ring-accent" : "bg-accent"}`} style={upcoming ? { boxShadow: "inset 0 0 0 2px var(--color-accent)" } : undefined} />
            <p className="text-[14px] font-medium">{it.label}</p>
            <p className="tabular text-[12px] text-muted">{fmt(it.date)}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}

function PolicyDocument({ policy, productName }: { policy: Policy; productName: string }) {
  const t = useTranslations("policy");
  const tp = useTranslations("purchase");
  const tc = useTranslations("common");
  const locale = useLocale((s) => s.locale);
  const { idFields, signature } = useJourney();
  const rows: [string, string][] = [
    [t("number"), policy.number],
    [t("insured"), locale === "ar" ? idFields.fullNameAr : idFields.fullNameEn],
    [tp("plan"), productName],
    [t("cover"), formatEGP(policy.quote.cover, locale)],
    [t("premium"), `${formatEGP(policy.quote.monthly, locale)} ${tc("monthly")}`],
    [t("term"), tc("years", { count: formatNumber(policy.quote.term, locale) })],
    [t("issued"), formatDate(policy.issuedAt, locale)],
    [tp("beneficiary"), tp("beneficiaryValue")],
  ];
  return (
    <article className="rounded-[18px] bg-paper p-5 ring-1 ring-line">
      <div className="flex items-center justify-between border-b border-line pb-4">
        <Wordmark />
        <span className="text-[12px] text-muted">{t("docTitle")}</span>
      </div>
      <dl className="mt-3 space-y-2.5">
        {rows.map(([k, v]) => (
          <div key={k} className="flex justify-between gap-4 text-[13px]">
            <dt className="text-muted">{k}</dt>
            <dd className="tabular text-end font-medium">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-5 border-t border-line pt-4">
        {signature ? <img src={signature} alt="" className="h-14 object-contain" /> : <div className="h-14" />}
        <p className="text-[12px] text-muted">{t("docSigned")} · {formatDate(policy.issuedAt, locale)}</p>
      </div>
      <p className="mt-4 text-[11px] leading-relaxed text-muted">{t("docNote")}</p>
    </article>
  );
}
