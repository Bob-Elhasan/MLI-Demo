"use client";

import { useTranslations } from "next-intl";
import { formatDate, formatEGP } from "@/lib/format";
import { paymentState } from "@/lib/schedule";
import { useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

export type Cadence = "weekly" | "monthly" | "halfYear" | "yearly" | "once";
export type Notice = { id: string; cadence: Cadence; title: string; body: string; at: Date; href: string };

/** Notifications are derived from the policy's state, so the inbox always matches the story on screen. */
export function useNotifications() {
  const t = useTranslations("notifications.items");
  const ts = useTranslations("claims");
  const locale = useLocale((s) => s.locale);
  const { policy, scenario, receipts, claims, beneficiaries, readNotifications } = useJourney();
  const list: Notice[] = [];
  if (!policy) return { list, unread: 0 };

  const fmt = (d: Date) => formatDate(d, locale, { day: "numeric", month: "long" });
  const now = new Date();
  const state = paymentState(policy, scenario);

  if (state.kind === "due") {
    list.push({ id: `due-${scenario}`, cadence: "monthly", at: now, href: "/app/pay", title: t("paymentDue.title"), body: t("paymentDue.body", { amount: formatEGP(state.next.amount, locale), date: fmt(state.next.date) }) });
  }
  if (state.kind === "grace") {
    list.push({ id: "grace", cadence: "once", at: now, href: "/app/pay", title: t("grace.title"), body: t("grace.body", { date: fmt(state.graceEnds) }) });
  }
  if (state.kind === "lapsed") {
    list.push({ id: "lapsed", cadence: "once", at: now, href: "/app/pay", title: t("lapsed.title"), body: t("lapsed.body") });
  }
  if (scenario === "checkIn") {
    list.push({ id: "checkin", cadence: "halfYear", at: now, href: "/app/check-in", title: t("checkIn.title"), body: t("checkIn.body") });
  }
  if (scenario === "anniversary") {
    list.push({ id: "anniversary", cadence: "yearly", at: now, href: "/app/policy", title: t("anniversary.title"), body: t("anniversary.body") });
  }
  for (const c of claims) {
    list.push({ id: `claim-${c.ref}-${c.stage}`, cadence: "once", at: new Date(c.submittedAt), href: "/app/claims", title: t("claim.title", { ref: c.ref }), body: t("claim.body", { stage: (ts.raw("stages") as string[])[c.stage] }) });
  }
  for (const b of beneficiaries.filter((b) => b.invite === "accepted")) {
    list.push({ id: `invite-${b.id}`, cadence: "once", at: now, href: "/app/vault", title: t("invite.title", { name: b.name }), body: t("invite.body") });
  }
  for (const r of receipts) {
    list.push({ id: `paid-${r.number}`, cadence: "monthly", at: new Date(r.paidAt), href: "/app/pay", title: t("paid.title"), body: t("paid.body", { number: r.number }) });
  }
  list.push({ id: "welcome", cadence: "once", at: new Date(policy.issuedAt), href: "/app/policy", title: t("welcome.title"), body: t("welcome.body", { number: policy.number }) });

  const unread = list.filter((n) => !readNotifications.includes(n.id)).length;
  return { list, unread };
}
