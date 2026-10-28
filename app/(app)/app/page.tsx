"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Wordmark } from "@/components/ui/wordmark";

export default function Welcome() {
  const t = useTranslations("welcome");
  return (
    <div className="bg-connect relative flex flex-1 flex-col px-6 pb-8">
      <div className="pt-3">
        <Wordmark product />
      </div>

      <HeroArt />

      <div className="mt-auto">
        <h1 className="text-[34px] leading-[1.08] font-semibold tracking-tight text-balance">{t("title")}</h1>
        <p className="mt-3 text-[16px] leading-relaxed text-muted text-pretty">{t("body")}</p>
        <div className="mt-7 space-y-3">
          <ButtonLink href="/app/onboarding/language">{t("cta")}</ButtonLink>
          <ButtonLink href="/app/onboarding/language" variant="ghost" className="h-11">
            {t("secondary")}
          </ButtonLink>
        </div>
        <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-[12px] text-muted">
          <Icon name="shieldCheck" size={15} className="text-accent" />
          {t("trust")}
        </p>
      </div>
    </div>
  );
}

/** Abstract policy-card stack, built from tokens so it themes and flips with RTL. No text baked in. */
function HeroArt() {
  return (
    <div className="relative mx-auto mt-6 h-[270px] w-full max-w-[300px]" aria-hidden="true">
      <div className="absolute start-2 top-8 h-40 w-[78%] -rotate-6 rounded-[26px] bg-lilac shadow-card" />
      <div className="absolute end-0 top-2 h-40 w-[78%] rotate-[5deg] rounded-[26px] bg-icy shadow-card" />
      <div className="animate-pop absolute start-1/2 top-16 h-44 w-[86%] -translate-x-1/2 rounded-[28px] bg-paper p-5 shadow-lift rtl:translate-x-1/2">
        <div className="flex items-center justify-between">
          <span className="grid size-11 place-items-center rounded-2xl bg-mint text-accent">
            <Icon name="shieldCheck" size={24} />
          </span>
          <span className="h-6 w-16 rounded-full bg-success-soft" />
        </div>
        <div className="mt-6 h-3 w-2/3 rounded-full bg-ink/80" />
        <div className="mt-2.5 h-2.5 w-1/2 rounded-full bg-line-strong" />
        <div className="mt-5 flex gap-2">
          <span className="h-2.5 flex-1 rounded-full bg-accent" />
          <span className="h-2.5 flex-1 rounded-full bg-accent/40" />
          <span className="h-2.5 flex-1 rounded-full bg-line" />
        </div>
      </div>
      <span className="absolute end-6 bottom-2 grid size-12 place-items-center rounded-full bg-ink text-mint shadow-lift">
        <Icon name="heart" size={22} />
      </span>
    </div>
  );
}
