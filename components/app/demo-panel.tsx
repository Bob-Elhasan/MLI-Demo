"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon, type IconName } from "@/components/ui/icon";
import { Wordmark } from "@/components/ui/wordmark";
import { useLocale } from "@/lib/store/locale";
import { seedDemoPolicy, useJourney, type Scenario } from "@/lib/store/journey";

const SCENARIOS: Scenario[] = ["onTrack", "dueSoon", "grace", "lapsed", "checkIn", "anniversary"];

/** Presenter controls, laptop only. Lets Bobby jump around the demo without clicking through everything. */
export function DemoPanel() {
  const t = useTranslations("demo");
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const verify = () => {
    const s = useJourney.getState();
    s.set({ phone: s.phone || "1001234567", phoneVerified: true, idConfirmed: true, livenessPassed: true });
  };

  const scenario = useJourney((s) => s.scenario);
  const fastForward = (sc: Scenario) => {
    seedDemoPolicy();
    // A fresh check-in moment clears earlier answers so the cross-sell can be shown again
    useJourney.getState().set({ scenario: sc, pausedMonths: 0, ...(sc === "checkIn" ? { lifeEvents: [] } : {}) });
    router.push("/app/home");
  };

  const jumps: { label: string; icon: IconName; go: () => void }[] = [
    { label: t("jumpStart"), icon: "sparkle", go: () => router.push("/app") },
    {
      label: t("jumpKyc"),
      icon: "idCard",
      go: () => {
        useJourney.getState().set({ phone: "1001234567", phoneVerified: true });
        router.push("/app/kyc");
      },
    },
    {
      label: t("jumpProducts"),
      icon: "shield",
      go: () => {
        verify();
        router.push("/app/products");
      },
    },
    {
      label: t("jumpHome"),
      icon: "home",
      go: () => {
        seedDemoPolicy();
        router.push("/app/home");
      },
    },
  ];

  return (
    <aside className="no-scrollbar hidden max-h-[calc(100dvh-48px)] w-64 shrink-0 flex-col gap-5 overflow-y-auto md:flex">
      <div>
        <Wordmark product />
        <p className="mt-2 text-[13px] text-muted">{t("panelTitle")}</p>
      </div>

      <section className="space-y-2">
        <h2 className="text-[12px] font-semibold tracking-wide text-muted uppercase">{t("language")}</h2>
        <div className="grid grid-cols-2 rounded-full bg-paper p-1 ring-1 ring-line">
          {(["en", "ar"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`h-9 rounded-full text-sm font-semibold transition ${locale === l ? "bg-ink text-mist" : "text-ink-2 hover:bg-ink/5"}`}
            >
              {l === "en" ? "English" : "العربية"}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-[12px] font-semibold tracking-wide text-muted uppercase">{t("jump")}</h2>
        <div className="flex flex-col gap-1">
          {jumps.map((j) => (
            <button
              key={j.label}
              onClick={j.go}
              className="flex h-11 items-center gap-3 rounded-[14px] px-3 text-start text-[15px] font-medium text-ink-2 transition hover:bg-paper hover:shadow-card"
            >
              <Icon name={j.icon} size={20} className="text-accent" />
              {j.label}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-[12px] font-semibold tracking-wide text-muted uppercase">{t("scenario")}</h2>
        <div className="grid grid-cols-2 gap-1.5">
          {SCENARIOS.map((sc) => (
            <button
              key={sc}
              onClick={() => fastForward(sc)}
              className={`h-10 rounded-[12px] px-2 text-[13px] font-semibold transition ${scenario === sc ? "bg-ink text-mist" : "bg-paper text-ink-2 ring-1 ring-line hover:ring-line-strong"}`}
            >
              {t(sc)}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={() => {
          useJourney.getState().reset();
          router.push("/app");
        }}
        className="flex h-11 items-center justify-center gap-2 rounded-full bg-paper text-sm font-semibold text-ink ring-1 ring-line-strong transition hover:ring-ink/40"
      >
        <Icon name="refresh" size={18} />
        {t("reset")}
      </button>

      <p className="flex gap-2 text-[13px] leading-relaxed text-muted">
        <Icon name="camera" size={18} className="mt-0.5 shrink-0" />
        {t("cameraHint")}
      </p>

      <nav className="mt-auto flex gap-4 text-[13px] font-medium text-muted">
        <Link href="/" className="hover:text-ink">{t("site")}</Link>
        <Link href="/connect" className="hover:text-ink">{t("connect")}</Link>
      </nav>
    </aside>
  );
}
