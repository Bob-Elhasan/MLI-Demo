"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { Screen } from "@/components/app/screen";
import { Icon, type IconName } from "@/components/ui/icon";
import { products, priceQuote } from "@/lib/mock/products";
import { ageFrom } from "@/lib/mock/kyc";
import { formatEGP } from "@/lib/format";
import { useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

const icons: Record<string, IconName> = { "term-life": "heart", "maash-bokra": "piggy", "family-protection": "family" };
const tints = { mint: "bg-mint", lavender: "bg-lavender", aqua: "bg-aqua" };

export default function Products() {
  const t = useTranslations("products");
  const tc = useTranslations("common");
  const locale = useLocale((s) => s.locale);
  const { idFields, idConfirmed, ageGuess } = useJourney();
  const age = idConfirmed ? ageFrom(idFields.dateOfBirth) : ageGuess;

  return (
    <Screen back="/app/onboarding/language" title={t("title")} subtitle={t("body")}>
      <div className="space-y-4">
        {products.map((p, i) => {
          const from = priceQuote(p, age, p.cover.min, p.term.min, p.contribution?.min).monthly;
          return (
            <Link
              key={p.id}
              href={`/app/products/${p.id}`}
              className="animate-screen-in group block overflow-hidden rounded-[26px] bg-paper shadow-card ring-1 ring-line transition hover:shadow-lift active:scale-[0.99]"
              style={{ animationDelay: `${i * 80}ms` }}
            >
              <div className={`relative flex items-start justify-between p-5 pb-4 ${tints[p.tint]}`}>
                <span className="grid size-12 place-items-center rounded-2xl bg-paper/80 text-accent">
                  <Icon name={icons[p.id]} size={24} />
                </span>
                {!p.placeholder && (
                  <span className="rounded-full bg-paper/80 px-2.5 py-1 text-[11px] font-semibold text-accent-strong">{t("realProduct")}</span>
                )}
              </div>
              <div className="p-5 pt-4">
                <h2 className="text-[19px] font-semibold">{t(`${p.key}.name`)}</h2>
                <p className="mt-1 text-[14px] leading-relaxed text-muted">{t(`${p.key}.line`)}</p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="tabular text-[15px] font-semibold">
                    {t("from", { price: formatEGP(from, locale) })}
                    <span className="font-normal text-muted"> {tc("monthly")}</span>
                  </span>
                  <span className="grid size-9 place-items-center rounded-full bg-fill text-ink transition group-hover:bg-accent group-hover:text-on-accent">
                    <Icon name="chevron" size={18} className="rtl:rotate-180" />
                  </span>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
      <p className="mt-5 text-center text-[12px] leading-relaxed text-muted">{tc("indicative")}</p>
    </Screen>
  );
}
