"use client";

import { useTranslations } from "next-intl";
import { Screen } from "@/components/app/screen";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { formatDate } from "@/lib/format";
import { useHydrated, useJourney, type Claim } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

export default function Claims() {
  const t = useTranslations("claims");
  const hydrated = useHydrated();
  const claims = useJourney((s) => s.claims);

  return (
    <Screen back="/app/home" title={t("title")} subtitle={t("intro")} footer={<ButtonLink href="/app/claims/new">{t("start")}</ButtonLink>}>
      {hydrated && claims.length === 0 && (
        <p className="rounded-[20px] border border-dashed border-line-strong p-5 text-center text-[14px] text-muted">{t("none")}</p>
      )}
      <div className="space-y-4">
        {claims.map((c) => (
          <ClaimTracker key={c.ref} claim={c} />
        ))}
      </div>
      {claims.length > 0 && (
        <p className="mt-5 flex gap-2 text-[13px] leading-relaxed text-muted">
          <Icon name="info" size={17} className="mt-0.5 shrink-0" />
          {t("reviewNote")}
        </p>
      )}
    </Screen>
  );
}

function ClaimTracker({ claim }: { claim: Claim }) {
  const t = useTranslations("claims");
  const locale = useLocale((s) => s.locale);
  const advance = useJourney((s) => s.advanceClaim);
  const stages = t.raw("stages") as string[];
  const hints = t.raw("stageHint") as string[];

  return (
    <section className="rounded-[22px] bg-paper p-5 ring-1 ring-line">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-semibold">{t(`types.${claim.type}`)}</h2>
          <p className="text-[13px] text-muted">{t("submittedOn", { date: formatDate(claim.submittedAt, locale) })}</p>
        </div>
        <span className="tabular text-[13px] font-medium text-muted" dir="ltr">{claim.ref}</span>
      </div>

      <ol className="mt-5 space-y-0">
        {stages.map((s, i) => {
          const done = i < claim.stage;
          const current = i === claim.stage;
          return (
            <li key={s} className="relative flex gap-3 pb-4 last:pb-0">
              {i < stages.length - 1 && (
                <span className={`absolute start-[11px] top-6 bottom-0 w-0.5 ${done ? "bg-accent" : "bg-line"}`} aria-hidden="true" />
              )}
              <span
                className={`relative z-10 grid size-6 shrink-0 place-items-center rounded-full ${done ? "bg-accent text-on-accent" : current ? "bg-paper ring-2 ring-accent" : "bg-fill"}`}
              >
                {done && <Icon name="check" size={14} strokeWidth={2.8} />}
                {current && <span className="size-2 animate-pulse rounded-full bg-accent" />}
              </span>
              <div className="pt-0.5">
                <p className={`text-[14px] ${current ? "font-semibold" : done ? "font-medium" : "text-muted"}`}>{s}</p>
                {current && <p className="mt-0.5 text-[13px] leading-relaxed text-muted">{hints[i]}</p>}
              </div>
            </li>
          );
        })}
      </ol>

      {claim.stage < 4 && (
        <button onClick={() => advance(claim.ref)} className="mt-4 text-[13px] font-semibold text-accent" data-demo="true">
          {t("simulate")}
        </button>
      )}
    </section>
  );
}
