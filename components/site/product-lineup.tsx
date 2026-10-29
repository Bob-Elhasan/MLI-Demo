"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { needs, siteProducts, type Need } from "@/lib/mock/site/products";

/**
 * The live thing: pick what you want to protect and the line-up answers.
 * Every product stays visible, the ones that fit come forward. No prices, ever.
 */
export function ProductLineup({ headingLevel = 2 }: { headingLevel?: 2 | 3 }) {
  const t = useTranslations("site.lineup");
  const tp = useTranslations("site.products.items");
  const [need, setNeed] = useState<Need | null>(null);
  const H = headingLevel === 2 ? "h3" : "h4";

  const groups = [
    { key: "individual", items: siteProducts.filter((p) => p.audience === "individual") },
    { key: "business", items: siteProducts.filter((p) => p.audience === "business") },
  ] as const;

  const fits = (n: Need[]) => !need || n.includes(need);

  return (
    <div>
      <fieldset>
        <legend className="text-[17px] font-semibold">{t("ask")}</legend>
        <div role="radiogroup" className="mt-4 flex flex-wrap gap-2">
          {[null, ...needs].map((n) => {
            const on = need === n;
            return (
              <button
                key={n ?? "all"}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setNeed(n)}
                className={`h-12 rounded-full px-5 text-[16px] font-semibold transition-colors duration-200 ${
                  on ? "bg-ink text-mist" : "bg-paper text-ink ring-1 ring-line-strong hover:ring-ink/50"
                }`}
              >
                {t(`needs.${n ?? "all"}`)}
              </button>
            );
          })}
        </div>
      </fieldset>

      <p aria-live="polite" className="mt-5 min-h-[1.6em] text-[16px] text-ink-2">
        {need ? t(`answers.${need}`) : t("answers.all")}
      </p>

      <div className="mt-10 space-y-14">
        {groups.map((g) => (
          <div key={g.key}>
            <H className="text-[clamp(20px,2.1vw,30px)] font-semibold tracking-tight text-accent">{t(`groups.${g.key}`)}</H>
            <ul className="mt-5">
              {g.items.map((p) => {
                const on = fits(p.needs);
                return (
                  <li key={p.slug} className={`transition-opacity duration-300 ${on ? "opacity-100" : "opacity-35"}`}>
                    <Link
                      href={`/products/${p.slug}/`}
                      className="group grid grid-cols-[1fr_auto] items-baseline gap-x-6 gap-y-1 rounded-[var(--radius-sm)] px-3 py-4 transition-colors hover:bg-paper md:grid-cols-[minmax(0,1.3fr)_minmax(0,1.6fr)_minmax(0,1fr)_auto] md:px-4"
                    >
                      <span className="text-[clamp(22px,2.1vw,30px)] leading-tight font-semibold tracking-tight">{tp(`${p.key}.name`)}</span>
                      <span className="col-span-2 row-start-2 text-[16px] leading-snug text-ink-2 md:col-span-1 md:row-start-auto">{tp(`${p.key}.short`)}</span>
                      <span className="col-span-2 row-start-3 text-[15px] font-medium text-muted md:col-span-1 md:row-start-auto">{t(`channel.${p.channel}`)}</span>
                      <span className="col-start-2 row-start-1 inline-flex items-center gap-1 text-[15px] font-semibold text-accent md:col-start-auto md:row-start-auto">
                        <span className="hidden sm:inline">{t("details")}</span>
                        <Icon name="chevron" size={18} className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
