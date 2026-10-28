"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Wordmark } from "@/components/ui/wordmark";
import { useProductName } from "@/components/app/use-product-name";
import { formatDate, formatEGP, nextDateOnDay } from "@/lib/format";
import { useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

export default function Home() {
  const t = useTranslations("home");
  const tc = useTranslations("common");
  const locale = useLocale((s) => s.locale);
  const productName = useProductName();
  const { policy, idFields } = useJourney();
  const name = (locale === "ar" ? idFields.fullNameAr : idFields.fullNameEn).split(" ")[0];

  return (
    <div className="no-scrollbar flex min-h-0 flex-1 flex-col overflow-y-auto px-5 pb-8">
      <header className="flex items-center justify-between pt-2 pb-5">
        <Wordmark product />
        <span className="relative grid size-10 place-items-center rounded-full bg-paper shadow-card">
          <Icon name="bell" size={20} />
          <span className="absolute end-2 top-2 size-2 rounded-full bg-danger" />
        </span>
      </header>

      <h1 className="text-[26px] font-semibold tracking-tight">{t("greeting", { name })}</h1>

      {policy ? (
        <div className="bg-connect mt-5 rounded-[28px] p-5 shadow-lift ring-1 ring-line">
          <div className="flex items-center justify-between">
            <p className="text-[14px] font-semibold text-accent-strong">{productName(policy.productId)}</p>
            <span className="flex items-center gap-1 rounded-full bg-success-soft px-2.5 py-1 text-[12px] font-semibold text-success">
              <span className="size-1.5 rounded-full bg-success" />
              {t("active")}
            </span>
          </div>
          <p className="mt-4 text-[12px] text-muted">{t("cover")}</p>
          <p className="tabular text-[30px] leading-tight font-semibold">{formatEGP(policy.quote.cover, locale)}</p>
          <div className="mt-5 flex items-center justify-between rounded-[18px] bg-paper/80 p-3.5">
            <span className="flex items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-mint text-accent">
                <Icon name="calendar" size={19} />
              </span>
              <span>
                <span className="block text-[12px] text-muted">{t("nextPayment")}</span>
                <span className="block text-[14px] font-semibold">
                  {formatDate(nextDateOnDay(Math.min(28, policy.paymentDay + 2)), locale, { day: "numeric", month: "short" })}
                </span>
              </span>
            </span>
            <span className="tabular text-[15px] font-semibold">
              {formatEGP(policy.quote.monthly, locale)}
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-5 rounded-[28px] bg-paper p-6 text-center shadow-card">
          <p className="text-[15px] text-muted">{t("empty")}</p>
          <ButtonLink href="/app/products" className="mt-4">{t("emptyCta")}</ButtonLink>
        </div>
      )}

      <div className="mt-5 rounded-[22px] border border-dashed border-line-strong p-5">
        <p className="flex items-center gap-2 text-[14px] font-semibold">
          <Icon name="sparkle" size={18} className="text-accent" />
          {t("nextTitle")}
        </p>
        <p className="mt-1.5 text-[13px] leading-relaxed text-muted">{t("nextBody")}</p>
        <p className="mt-3 text-[11px] text-muted">{tc("demoData")}</p>
      </div>
    </div>
  );
}
