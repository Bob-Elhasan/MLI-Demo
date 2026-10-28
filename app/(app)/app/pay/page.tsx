"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { Screen } from "@/components/app/screen";
import { FaceConfirm } from "@/components/app/face-confirm";
import { Processing } from "@/components/app/processing";
import { Sheet } from "@/components/app/sheet";
import { Group, Pill, Row, SectionHead } from "@/components/app/list";
import { Button, ButtonLink } from "@/components/ui/button";
import { formatDate, formatEGP, formatNumber } from "@/lib/format";
import { BUFFER_DAYS, collectDay, paymentState, upcoming } from "@/lib/schedule";
import { useHydrated, useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

export default function Pay() {
  const t = useTranslations("pay");
  const th = useTranslations("home");
  const router = useRouter();
  const locale = useLocale((s) => s.locale);
  const hydrated = useHydrated();
  const { policy, scenario, receipts, faceUnlock, pausedMonths, payInstallment, set } = useJourney();
  const [step, setStep] = useState<"idle" | "face" | "processing">("idle");
  const [pauseOpen, setPauseOpen] = useState(false);
  const [pauseChoice, setPauseChoice] = useState(1);

  const finish = useCallback(() => {
    setStep("processing");
    setTimeout(() => {
      payInstallment();
      router.push("/app/pay/receipt");
    }, 1300);
  }, [payInstallment, router]);

  if (!hydrated) return null;
  if (!policy) {
    return (
      <Screen back="/app/home" title={t("title")}>
        <ButtonLink href="/app/products">{th("emptyCta")}</ButtonLink>
      </Screen>
    );
  }

  const state = paymentState(policy, scenario);
  const fmt = (d: Date | string, long = true) => formatDate(d, locale, long ? { day: "numeric", month: "long" } : { day: "numeric", month: "short", year: "numeric" });
  const amount = state.kind === "lapsed" ? state.total : state.kind === "grace" ? state.missed.amount : state.next.amount;
  const pay = () => (faceUnlock ? setStep("face") : finish());

  return (
    <Screen
      back="/app/home"
      title={t("title")}
      footer={
        <>
          <div className="flex items-center justify-between text-[13px]">
            <span className="text-muted">{t("payWith")}</span>
            <span className="font-semibold">{t(`methods.${policy.paymentMethod}`)}</span>
          </div>
          <Button onClick={pay} disabled={pausedMonths > 0 && state.kind !== "lapsed" && state.kind !== "grace"}>
            {state.kind === "lapsed" ? t("reinstate", { amount: formatEGP(amount, locale) }) : t("oneTap", { amount: formatEGP(amount, locale) })}
          </Button>
          {faceUnlock && <p className="text-center text-[12px] text-muted">{t("confirmFace")}</p>}
        </>
      }
    >
      {step === "face" && <FaceConfirm onDone={finish} />}
      {step === "processing" && <Processing label={t("processing")} />}

      {state.kind === "grace" && (
        <section className="rounded-[22px] bg-warning-soft p-5">
          <h2 className="text-[18px] font-semibold">{t("graceTitle", { date: fmt(state.missed.date) })}</h2>
          <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{t("graceBody", { days: formatNumber(state.daysLeft, locale), end: fmt(state.graceEnds) })}</p>
          <GraceBar left={state.daysLeft} />
        </section>
      )}
      {state.kind === "lapsed" && (
        <section className="rounded-[22px] bg-danger-soft p-5">
          <h2 className="text-[18px] font-semibold">{t("lapsedTitle", { date: fmt(state.lapsedOn) })}</h2>
          <p className="mt-1 text-[14px] leading-relaxed text-ink-2">{t("lapsedBody", { count: formatNumber(state.missed.length, locale) })}</p>
        </section>
      )}
      {(state.kind === "due" || state.kind === "scheduled") && (
        <section className="rounded-[22px] bg-paper p-5 ring-1 ring-line">
          <p className="text-[13px] text-muted">{t("nextDue")}</p>
          <div className="mt-1 flex items-baseline justify-between">
            <p className="text-[24px] font-semibold">{fmt(state.next.date)}</p>
            <p className="tabular text-[24px] font-semibold">{formatEGP(state.next.amount, locale)}</p>
          </div>
          <p className="mt-1 text-[13px] text-muted">{th("dueIn", { days: state.daysAway })}</p>
          {pausedMonths > 0 && (
            <div className="mt-4 flex items-center justify-between rounded-[14px] bg-icy p-3">
              <span className="text-[14px] font-medium">{t("pauseActive", { count: pausedMonths })}</span>
              <button onClick={() => set({ pausedMonths: 0 })} className="text-[14px] font-semibold text-accent">{t("pauseUndo")}</button>
            </div>
          )}
        </section>
      )}

      <SectionHead title={t("schedule")} />
      <p className="-mt-1 mb-3 text-[13px] text-muted">
        {t("scheduleHint", { days: formatNumber(BUFFER_DAYS, locale), day: formatNumber(collectDay(policy.paymentDay), locale) })}
      </p>
      <Group>
        {upcoming(policy, 6, pausedMonths).map((i) => (
          <Row
            key={i.date.toISOString()}
            title={fmt(i.date, false)}
            value={i.paused ? <Pill>{t("paused")}</Pill> : formatEGP(i.amount, locale)}
          />
        ))}
      </Group>

      {(state.kind === "due" || state.kind === "scheduled") && pausedMonths === 0 && (
        <button onClick={() => setPauseOpen(true)} className="mt-4 w-full rounded-[20px] bg-icy p-4 text-start">
          <span className="block text-[15px] font-semibold">{t("pauseTitle")}</span>
          <span className="mt-0.5 block text-[13px] leading-relaxed text-ink-2">{t("pauseBody")}</span>
        </button>
      )}

      {receipts.length > 0 && (
        <>
          <SectionHead title={t("history")} />
          <Group>
            {receipts.slice(0, 5).map((r) => (
              <Row key={r.number} title={fmt(r.paidAt, false)} sub={<span dir="ltr">{r.number}</span>} value={formatEGP(r.amount, locale)} />
            ))}
          </Group>
        </>
      )}

      <Sheet open={pauseOpen} onClose={() => setPauseOpen(false)} title={t("pauseTitle")}>
        <p className="text-[15px] leading-relaxed text-ink-2">{t("pauseBody")}</p>
        <div className="mt-5 grid grid-cols-2 gap-2">
          {[1, 2].map((n) => (
            <button
              key={n}
              onClick={() => setPauseChoice(n)}
              className={`h-14 rounded-[16px] text-[15px] font-semibold transition ${pauseChoice === n ? "bg-ink text-mist" : "bg-paper ring-1 ring-line"}`}
            >
              {n === 1 ? t("pauseOne") : t("pauseTwo")}
            </button>
          ))}
        </div>
        <p className="mt-3 text-[12px] text-muted">{t("pauseTerms")}</p>
        <Button
          className="mt-5"
          onClick={() => {
            set({ pausedMonths: pauseChoice });
            setPauseOpen(false);
          }}
        >
          {t("pauseConfirm")}
        </Button>
      </Sheet>
    </Screen>
  );
}

function GraceBar({ left }: { left: number }) {
  const used = ((30 - left) / 30) * 100;
  return (
    <div className="mt-4 h-2 overflow-hidden rounded-full bg-paper" aria-hidden="true">
      <div className="h-full rounded-full bg-warning" style={{ width: `${used}%` }} />
    </div>
  );
}
