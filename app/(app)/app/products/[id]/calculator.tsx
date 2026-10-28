"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Screen } from "@/components/app/screen";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { getProduct, priceQuote } from "@/lib/mock/products";
import { ageFrom } from "@/lib/mock/kyc";
import { formatEGP, formatNumber } from "@/lib/format";
import { useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

const tints = { mint: "bg-mint", lavender: "bg-lavender", aqua: "bg-aqua" };

export function Calculator({ id }: { id: string }) {
  const product = getProduct(id)!;
  const t = useTranslations("products");
  const tc = useTranslations("common");
  const router = useRouter();
  const locale = useLocale((s) => s.locale);
  const { idFields, quote: saved, set } = useJourney();
  const age = ageFrom(idFields.dateOfBirth);
  const resume = saved?.productId === product.id ? saved : undefined;

  const [cover, setCover] = useState(resume?.cover ?? product.cover.default);
  const [term, setTerm] = useState(resume?.term ?? product.term.default);
  const [contribution, setContribution] = useState(resume?.contribution ?? product.contribution?.default);

  const savings = product.kind === "savings";
  // Savings plan: life cover scales with the contribution (mocked as 5 years of saving)
  const effectiveCover = savings ? Math.round((contribution! * 12 * 5) / 1000) * 1000 : cover;
  const quote = priceQuote(product, age, effectiveCover, term, contribution);

  const choose = () => {
    set({ productId: product.id, quote });
    router.push("/app/purchase/summary");
  };

  return (
    <Screen
      back="/app/products"
      bodyClassName="px-0"
      footer={
        <>
          <p className="text-center text-[12px] leading-relaxed text-muted">{tc("indicative")}</p>
          <Button onClick={choose}>{t("choose")}</Button>
        </>
      }
    >
      <div className={`mx-6 mt-2 rounded-[28px] p-6 ${tints[product.tint]}`}>
        <p className="text-[13px] font-semibold text-accent-strong">{t(`${product.key}.name`)}</p>
        <p className="mt-1 text-[14px] text-ink-2">{t(`${product.key}.emotional`)}</p>
        <div className="mt-5 flex flex-wrap items-end gap-x-2">
          <span key={quote.monthly} className="tabular animate-fade-in text-[40px] leading-none font-semibold tracking-tight whitespace-nowrap">
            {formatEGP(quote.monthly, locale)}
          </span>
          <span className="pb-1.5 text-[15px] text-ink-2">{tc("monthly")}</span>
        </div>
        <ul className="mt-5 space-y-1.5">
          {(["bullet1", "bullet2", "bullet3"] as const).map((b) => (
            <li key={b} className="flex items-center gap-2 text-[14px] text-ink-2">
              <Icon name="check" size={16} strokeWidth={2.4} className="text-accent" />
              {t(`${product.key}.${b}`)}
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-6 px-6 pt-7">
        <div className="flex items-center justify-between rounded-[18px] bg-paper px-4 py-3 ring-1 ring-line">
          <span className="text-[14px] text-muted">{t("age")}</span>
          <span className="flex items-center gap-2 text-[15px] font-semibold">
            <span className="tabular">{formatNumber(age, locale)}</span>
            <span className="rounded-full bg-success-soft px-2 py-0.5 text-[11px] font-semibold text-success">{t("ageFromId")}</span>
          </span>
        </div>

        {savings ? (
          <Slider
            label={t("contribution")}
            value={contribution!}
            display={formatEGP(contribution!, locale)}
            {...product.contribution!}
            onChange={setContribution}
          />
        ) : (
          <Slider label={t("coverAmount")} value={cover} display={formatEGP(cover, locale)} {...product.cover} onChange={setCover} />
        )}

        <Slider
          label={t("term")}
          value={term}
          display={tc("years", { count: formatNumber(term, locale) })}
          min={product.term.min}
          max={product.term.max}
          step={1}
          onChange={setTerm}
        />

        {savings && (
          <div className="grid grid-cols-2 gap-3">
            <Stat label={t("totalSaved")} value={formatEGP(contribution! * 12 * term, locale)} />
            <Stat label={t("lifeCover")} value={formatEGP(effectiveCover, locale)} />
            <p className="col-span-2 text-[12px] leading-relaxed text-muted">{t("totalSavedHint")}</p>
          </div>
        )}
      </div>
    </Screen>
  );
}

function Slider({
  label,
  value,
  display,
  min,
  max,
  step,
  onChange,
}: {
  label: string;
  value: number;
  display: string;
  min: number;
  max: number;
  step: number;
  onChange: (v: number) => void;
}) {
  const pct = ((value - min) / (max - min)) * 100;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="text-[14px] text-muted">{label}</span>
        <span className="tabular text-[17px] font-semibold">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full"
        style={{
          background: `linear-gradient(to var(--range-dir, right), var(--color-accent) ${pct}%, var(--color-line) ${pct}%)`,
        }}
      />
    </label>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
      <p className="text-[12px] text-muted">{label}</p>
      <p className="tabular mt-1 text-[17px] font-semibold">{value}</p>
    </div>
  );
}
