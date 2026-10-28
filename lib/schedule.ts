import type { Policy, Scenario } from "@/lib/store/journey";

export const BUFFER_DAYS = 2;
export const GRACE_DAYS = 30;

const DAY = 86_400_000;
const addDays = (d: Date, n: number) => new Date(d.getTime() + n * DAY);
const startOfDay = (d = new Date()) => new Date(d.getFullYear(), d.getMonth(), d.getDate());

/** Collection lands a couple of days after payday, capped to 28 so it exists every month */
export const collectDay = (paymentDay: number) => Math.min(28, paymentDay + BUFFER_DAYS);

function nextOnDay(day: number, from: Date) {
  const d = new Date(from.getFullYear(), from.getMonth(), day);
  if (d <= from) d.setMonth(d.getMonth() + 1);
  return d;
}

export type Installment = { date: Date; amount: number };

export type PaymentState =
  | { kind: "scheduled"; next: Installment; daysAway: number }
  | { kind: "due"; next: Installment; daysAway: number }
  | { kind: "grace"; missed: Installment; graceEnds: Date; daysLeft: number }
  | { kind: "lapsed"; missed: Installment[]; lapsedOn: Date; total: number };

/**
 * Where the policy stands today. Real dates for the normal state, scenario-shaped dates for the
 * presenter's fast-forward moments.
 */
export function paymentState(policy: Policy, scenario: Scenario, today = startOfDay()): PaymentState {
  const amount = policy.quote.monthly;
  if (scenario === "dueSoon") {
    return { kind: "due", next: { date: addDays(today, 3), amount }, daysAway: 3 };
  }
  if (scenario === "grace") {
    const missedOn = addDays(today, -9);
    const graceEnds = addDays(missedOn, GRACE_DAYS);
    return { kind: "grace", missed: { date: missedOn, amount }, graceEnds, daysLeft: GRACE_DAYS - 9 };
  }
  if (scenario === "lapsed") {
    const first = addDays(today, -44);
    const second = addDays(today, -14);
    return { kind: "lapsed", missed: [{ date: first, amount }, { date: second, amount }], lapsedOn: addDays(first, GRACE_DAYS), total: amount * 2 };
  }
  const date = nextOnDay(collectDay(policy.paymentDay), today);
  const daysAway = Math.round((date.getTime() - today.getTime()) / DAY);
  return { kind: daysAway <= 5 ? "due" : "scheduled", next: { date, amount }, daysAway };
}

/** The next n collection dates, aligned to payday */
export function upcoming(policy: Policy, n = 6, pausedMonths = 0, from = startOfDay()): (Installment & { paused: boolean })[] {
  const day = collectDay(policy.paymentDay);
  const first = nextOnDay(day, from);
  return Array.from({ length: n }, (_, i) => {
    const d = new Date(first.getFullYear(), first.getMonth() + i, day);
    return { date: d, amount: policy.quote.monthly, paused: i < pausedMonths };
  });
}

export const monthsFrom = (iso: string, months: number) => {
  const d = new Date(iso);
  return new Date(d.getFullYear(), d.getMonth() + months, d.getDate());
};
