"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useProductName } from "@/components/app/use-product-name";
import { formatEGP } from "@/lib/format";
import { useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

const CONFETTI = ["bg-mint", "bg-lavender", "bg-aqua", "bg-lilac", "bg-icy", "bg-accent"];

export default function Issued() {
  const t = useTranslations("purchase");
  const locale = useLocale((s) => s.locale);
  const productName = useProductName();
  const policy = useJourney((s) => s.policy);

  return (
    <div className="bg-connect relative flex flex-1 flex-col overflow-hidden px-6 pb-8">
      {/* Soft confetti, purely decorative */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        {Array.from({ length: 18 }, (_, i) => (
          <span
            key={i}
            className={`animate-pop absolute rounded-full ${CONFETTI[i % CONFETTI.length]}`}
            style={{
              width: 8 + (i % 4) * 4,
              height: 8 + (i % 4) * 4,
              insetInlineStart: `${(i * 37) % 100}%`,
              top: `${6 + ((i * 53) % 44)}%`,
              animationDelay: `${200 + i * 40}ms`,
            }}
          />
        ))}
      </div>

      <div className="relative flex flex-1 flex-col items-center justify-center text-center">
        <span className="animate-pop grid size-24 place-items-center rounded-full bg-success text-on-accent shadow-lift">
          <Icon name="shieldCheck" size={46} />
        </span>
        <h1 className="mt-7 text-[32px] font-semibold tracking-tight">{t("issuedTitle")}</h1>
        <p className="mt-2 max-w-[290px] text-[15px] leading-relaxed text-muted">{t("issuedBody")}</p>

        {policy && (
          <div className="animate-screen-in mt-8 w-full rounded-[24px] bg-paper p-5 text-start shadow-lift" style={{ animationDelay: "300ms" }}>
            <p className="text-[13px] font-semibold text-accent">{productName(policy.productId)}</p>
            <p className="mt-3 text-[12px] text-muted">{t("policyNumber")}</p>
            <p className="tabular text-[18px] font-semibold" dir="ltr">{policy.number}</p>
            <div className="mt-4 flex justify-between border-t border-line pt-4 text-[14px]">
              <span className="text-muted">{t("cover")}</span>
              <span className="tabular font-semibold">{formatEGP(policy.quote.cover, locale)}</span>
            </div>
          </div>
        )}
      </div>

      <div className="relative space-y-3">
        <ButtonLink href="/app/home">{t("goHome")}</ButtonLink>
        <ButtonLink href="/app/vault" variant="secondary">
          <Icon name="family" size={20} />
          {t("share")}
        </ButtonLink>
      </div>
    </div>
  );
}
