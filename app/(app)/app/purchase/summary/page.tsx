"use client";

import { useTranslations } from "next-intl";
import { Screen } from "@/components/app/screen";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useProductName } from "@/components/app/use-product-name";
import { formatDate, formatEGP, formatNumber, nextDateOnDay } from "@/lib/format";
import { useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

const PAYDAYS = [1, 5, 10, 15, 20, 25, 27];
const BUFFER_DAYS = 2;

export default function Summary() {
  const t = useTranslations("purchase");
  const tc = useTranslations("common");
  const locale = useLocale((s) => s.locale);
  const productName = useProductName();
  const { quote, productId, idFields, paymentDay, set } = useJourney();

  if (!quote) {
    return (
      <Screen back="/app/products">
        <ButtonLink href="/app/products">{tc("back")}</ButtonLink>
      </Screen>
    );
  }

  // Collect a couple of days after payday, capped to day 28 so it exists every month
  const collectDay = Math.min(28, paymentDay + BUFFER_DAYS);

  const rows: [string, string][] = [
    [t("insured"), locale === "ar" ? idFields.fullNameAr : idFields.fullNameEn],
    [t("plan"), productName(productId)],
    [t("cover"), formatEGP(quote.cover, locale)],
    [t("term"), tc("years", { count: formatNumber(quote.term, locale) })],
    [t("beneficiary"), t("beneficiaryValue")],
  ];

  return (
    <Screen
      title={t("summaryTitle")}
      footer={<ButtonLink href="/app/purchase/payment">{t("toPayment")}</ButtonLink>}
    >
      <div className="rounded-[24px] bg-ink p-5 text-mist shadow-lift">
        <p className="text-[13px] text-mist/70">{t("premium")}</p>
        <p className="tabular mt-1 text-[36px] leading-none font-semibold">
          {formatEGP(quote.monthly, locale)}
          <span className="text-[15px] font-normal text-mist/70"> {tc("monthly")}</span>
        </p>
      </div>

      <dl className="mt-4 overflow-hidden rounded-[20px] bg-paper shadow-card">
        {rows.map(([k, v]) => (
          <div key={k} className="flex items-start justify-between gap-4 border-b border-line px-4 py-3.5 last:border-0">
            <dt className="shrink-0 text-[14px] text-muted">{k}</dt>
            <dd className="tabular text-end text-[14px] font-semibold">{v}</dd>
          </div>
        ))}
      </dl>

      <section className="mt-6">
        <h2 className="flex items-center gap-2 text-[16px] font-semibold">
          <Icon name="calendar" size={20} className="text-accent" />
          {t("payday")}
        </h2>
        <div className="no-scrollbar -mx-6 mt-3 flex gap-2 overflow-x-auto px-6">
          {PAYDAYS.map((d) => (
            <button
              key={d}
              onClick={() => set({ paymentDay: d })}
              className={`tabular h-10 shrink-0 rounded-full px-4 text-[14px] font-semibold transition ${paymentDay === d ? "bg-accent text-on-accent" : "bg-paper text-ink-2 ring-1 ring-line"}`}
            >
              {t("paydayDay", { day: formatNumber(d, locale) })}
            </button>
          ))}
        </div>
        <div className="mt-3 rounded-[18px] bg-mint/60 p-4 text-[14px] leading-relaxed">
          <p className="font-semibold">{t("firstPayment")}</p>
          <p className="text-ink-2">
            {t("nextPayment", { date: formatDate(nextDateOnDay(collectDay), locale, { day: "numeric", month: "long" }) })}
          </p>
          <p className="mt-1.5 text-[12px] text-muted">{t("paydayHint", { days: formatNumber(BUFFER_DAYS, locale) })}</p>
        </div>
      </section>
    </Screen>
  );
}
