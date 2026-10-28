"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Wordmark } from "@/components/ui/wordmark";
import { Pill, SectionHead } from "@/components/app/list";
import { PaymentCard } from "@/components/app/payment-card";
import { CrossSellCards } from "@/components/app/cross-sell";
import { GoalRow } from "@/components/app/goal-row";
import { useProductName } from "@/components/app/use-product-name";
import { useNotifications } from "@/components/app/use-notifications";
import { formatEGP } from "@/lib/format";
import { useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

export default function Home() {
  const t = useTranslations("home");
  const tc = useTranslations("claims");
  const tp = useTranslations("policy");
  const locale = useLocale((s) => s.locale);
  const productName = useProductName();
  const { policy, idFields, scenario, goals, beneficiaries, claims, lifeEvents } = useJourney();
  const { unread } = useNotifications();
  const name = (locale === "ar" ? idFields.fullNameAr : idFields.fullNameEn).split(" ")[0];
  const openClaim = claims.find((c) => c.stage < 4);

  return (
    <>
      <header className="flex items-center justify-between pt-2 pb-4">
        <Wordmark product />
        <Link href="/app/notifications" className="relative grid size-11 place-items-center rounded-full bg-paper ring-1 ring-line" aria-label="Notifications">
          <Icon name="bell" size={21} />
          {unread > 0 && (
            <span className="tabular absolute -end-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full bg-danger px-1 text-[11px] font-semibold text-on-accent">
              {unread}
            </span>
          )}
        </Link>
      </header>

      <h1 className="text-[24px] font-semibold tracking-tight">{t("greeting", { name })}</h1>

      {!policy ? (
        <section className="mt-5 rounded-[24px] bg-mint p-6">
          <h2 className="text-[20px] font-semibold">{t("empty")}</h2>
          <p className="mt-1.5 text-[15px] text-ink-2">{t("emptyBody")}</p>
          <ButtonLink href="/app/products" className="mt-5">{t("emptyCta")}</ButtonLink>
        </section>
      ) : (
        <>
          <Link href="/app/policy" className="mt-4 block rounded-[24px] bg-mint p-5 transition active:scale-[0.99]">
            <div className="flex items-center justify-between">
              <p className="text-[14px] font-semibold text-accent-strong">{productName(policy.productId)}</p>
              {scenario === "lapsed" ? (
                <Pill tone="bad">{tp("lapsed")}</Pill>
              ) : scenario === "grace" ? (
                <Pill tone="warn">{tp("grace")}</Pill>
              ) : (
                <Pill tone="ok">
                  <span className="size-1.5 rounded-full bg-success" />
                  {t("active")}
                </Pill>
              )}
            </div>
            <p className="mt-3 text-[13px] text-ink-2">{t("covered")}</p>
            <p className="tabular text-[32px] leading-tight font-semibold tracking-tight">{formatEGP(policy.quote.cover, locale)}</p>
          </Link>

          <div className="mt-3">
            <PaymentCard policy={policy} />
          </div>

          {scenario === "checkIn" && (
            <Moment title={t("checkInTitle")} body={t("checkInBody")} cta={t("checkInCta")} href="/app/check-in" tone="bg-lavender" />
          )}
          {scenario === "anniversary" && (
            <Moment title={t("anniversaryTitle")} body={t("anniversaryBody")} cta={t("anniversaryCta")} href="/app/policy" tone="bg-icy" />
          )}

          {openClaim && (
            <Link href="/app/claims" className="mt-3 flex items-center justify-between rounded-[20px] bg-paper p-4 ring-1 ring-line">
              <span>
                <span className="block text-[13px] text-muted">{t("claims")}</span>
                <span className="block text-[15px] font-semibold">{(tc.raw("stages") as string[])[openClaim.stage]}</span>
              </span>
              <span className="tabular text-[13px] text-muted" dir="ltr">{openClaim.ref}</span>
            </Link>
          )}

          {lifeEvents.length > 0 && !lifeEvents.includes("nothing") && (
            <>
              <SectionHead title={t("forYou")} />
              <CrossSellCards events={lifeEvents} />
            </>
          )}

          <SectionHead title={t("goals")} action={goals.length ? t("viewAll") : undefined} href="/app/goals" />
          {goals.length ? (
            <div className="space-y-2">
              {goals.slice(0, 2).map((g) => (
                <GoalRow key={g.id} goal={g} href="/app/goals" />
              ))}
            </div>
          ) : (
            <Link href="/app/goals" className="flex items-center justify-between gap-4 rounded-[20px] border border-dashed border-line-strong p-4">
              <span className="text-[14px] text-muted">{t("goalsEmpty")}</span>
              <span className="shrink-0 text-[14px] font-semibold text-accent">{t("addGoal")}</span>
            </Link>
          )}

          {beneficiaries.length === 0 && (
            <Moment title={t("family")} body={t("familyBody")} cta={t("familyCta")} href="/app/vault" tone="bg-aqua" />
          )}
        </>
      )}
    </>
  );
}

function Moment({ title, body, cta, href, tone }: { title: string; body: string; cta: string; href: string; tone: string }) {
  return (
    <section className={`mt-3 rounded-[24px] p-5 ${tone}`}>
      <h2 className="text-[18px] font-semibold text-balance">{title}</h2>
      <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{body}</p>
      <ButtonLink href={href} variant="secondary" size="md" className="mt-4 bg-paper">
        {cta}
      </ButtonLink>
    </section>
  );
}
