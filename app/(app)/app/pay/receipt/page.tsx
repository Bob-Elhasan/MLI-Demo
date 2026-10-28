"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { formatDate, formatEGP, formatNumber } from "@/lib/format";
import { paymentState } from "@/lib/schedule";
import { useHydrated, useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

export default function Receipt() {
  const t = useTranslations("pay");
  const locale = useLocale((s) => s.locale);
  const hydrated = useHydrated();
  const { policy, receipts, scenario } = useJourney();
  if (!hydrated || !policy || !receipts[0]) return null;

  const r = receipts[0];
  const next = paymentState(policy, scenario);
  const nextDate = next.kind === "scheduled" || next.kind === "due" ? next.next.date : new Date();
  const onTime = receipts.filter((x) => x.kind === "premium").length;
  const reinstated = r.kind === "reinstatement";
  const rows: [string, string][] = [
    [t("receiptNumber"), r.number],
    [t("amount"), formatEGP(r.amount, locale)],
    [t("method"), t(`methods.${r.method}`)],
    [t("date"), formatDate(r.paidAt, locale)],
    [t("policy"), policy.number],
  ];

  return (
    <div className="flex flex-1 flex-col px-6 pb-8">
      <div className="flex flex-1 flex-col items-center pt-10 text-center">
        <span className="animate-pop grid size-20 place-items-center rounded-full bg-success text-on-accent">
          <Icon name="check" size={38} strokeWidth={2.6} />
        </span>
        <h1 className="mt-6 text-[28px] font-semibold tracking-tight">{reinstated ? t("receiptReinstated") : t("receiptTitle")}</h1>
        <p className="mt-2 max-w-[290px] text-[15px] leading-relaxed text-muted">
          {t("receiptBody", { date: formatDate(nextDate, locale, { day: "numeric", month: "long" }) })}
        </p>

        <dl className="animate-screen-in mt-8 w-full rounded-[20px] bg-paper p-4 text-start ring-1 ring-line" style={{ animationDelay: "200ms" }}>
          {rows.map(([k, v]) => (
            <div key={k} className="flex justify-between gap-4 border-b border-line py-2.5 text-[14px] last:border-0">
              <dt className="text-muted">{k}</dt>
              <dd className="tabular font-semibold" dir={k === t("receiptNumber") || k === t("policy") ? "ltr" : undefined}>{v}</dd>
            </div>
          ))}
        </dl>

        {/* The reward for the monthly pulse: a visible on-time streak */}
        <div className="animate-screen-in mt-3 flex w-full items-center gap-4 rounded-[20px] bg-mint p-4 text-start" style={{ animationDelay: "320ms" }}>
          <div className="flex gap-1" aria-hidden="true">
            {Array.from({ length: 6 }, (_, i) => (
              <span key={i} className={`h-8 w-2.5 rounded-full ${i < Math.min(onTime, 6) ? "bg-accent" : "bg-paper"}`} />
            ))}
          </div>
          <div>
            <p className="text-[15px] font-semibold">{t("streak", { count: onTime })}</p>
            <p className="text-[13px] text-ink-2">{t("streakBody")}</p>
          </div>
        </div>
        <span className="sr-only">{formatNumber(onTime, locale)}</span>
      </div>
      <ButtonLink href="/app/home">{t("done")}</ButtonLink>
    </div>
  );
}
