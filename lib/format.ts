import type { Locale } from "@/lib/store/locale";

const tag = (locale: Locale) => (locale === "ar" ? "ar-EG" : "en-EG");

export const formatNumber = (n: number, locale: Locale) =>
  new Intl.NumberFormat(tag(locale), { maximumFractionDigits: 0 }).format(n);

export const formatEGP = (n: number, locale: Locale) =>
  locale === "ar" ? `${formatNumber(n, locale)} ج.م` : `EGP ${formatNumber(n, locale)}`;

export const formatDate = (iso: string | Date, locale: Locale, opts: Intl.DateTimeFormatOptions = { day: "numeric", month: "short", year: "numeric" }) =>
  new Intl.DateTimeFormat(tag(locale), opts).format(typeof iso === "string" ? new Date(iso) : iso);

/** Next date (from today) that falls on the given day of the month */
export function nextDateOnDay(day: number, from = new Date()) {
  const d = new Date(from.getFullYear(), from.getMonth(), day);
  if (d <= from) d.setMonth(d.getMonth() + 1);
  return d;
}
