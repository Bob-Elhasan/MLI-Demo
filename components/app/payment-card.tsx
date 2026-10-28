"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { formatDate, formatEGP, formatNumber } from "@/lib/format";
import { BUFFER_DAYS, paymentState } from "@/lib/schedule";
import { useJourney, type Policy } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

/** The monthly pulse. Shape changes with the payment state, the action is always one tap away. */
export function PaymentCard({ policy }: { policy: Policy }) {
  const t = useTranslations("home");
  const locale = useLocale((s) => s.locale);
  const scenario = useJourney((s) => s.scenario);
  const state = paymentState(policy, scenario);
  const fmt = (d: Date) => formatDate(d, locale, { day: "numeric", month: "long" });

  if (state.kind === "grace") {
    return (
      <section className="rounded-[24px] bg-warning-soft p-5">
        <h2 className="text-[19px] font-semibold text-ink">{t("graceTitle")}</h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">
          {t("graceBody", { date: fmt(state.graceEnds), amount: formatEGP(state.missed.amount, locale) })}
        </p>
        <ButtonLink href="/app/pay" className="mt-4">{t("payNow")}</ButtonLink>
      </section>
    );
  }

  if (state.kind === "lapsed") {
    return (
      <section className="rounded-[24px] bg-danger-soft p-5">
        <h2 className="text-[19px] font-semibold text-ink">{t("lapsedTitle")}</h2>
        <p className="mt-1.5 text-[15px] leading-relaxed text-ink-2">{t("lapsedBody", { amount: formatEGP(state.total, locale) })}</p>
        <ButtonLink href="/app/pay" className="mt-4">{t("reinstate")}</ButtonLink>
      </section>
    );
  }

  const due = state.kind === "due";
  return (
    <section className={`rounded-[24px] p-5 ${due ? "bg-ink text-mist" : "bg-paper ring-1 ring-line"}`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className={`text-[13px] ${due ? "text-mist/70" : "text-muted"}`}>{t("nextPayment")}</p>
          <p className="mt-1 text-[22px] font-semibold">{t("dueIn", { days: state.daysAway })}</p>
        </div>
        <p className="tabular text-[22px] font-semibold">{formatEGP(state.next.amount, locale)}</p>
      </div>
      <p className={`mt-1 text-[13px] ${due ? "text-mist/70" : "text-muted"}`}>
        {t("scheduledFor", { date: fmt(state.next.date), days: formatNumber(BUFFER_DAYS, locale) })}
      </p>
      <ButtonLink
        href="/app/pay"
        variant="secondary"
        className={`mt-4 ${due ? "bg-mint ring-0 hover:bg-paper" : ""}`}
      >
        {due ? t("payNow") : t("payEarly")}
      </ButtonLink>
    </section>
  );
}
