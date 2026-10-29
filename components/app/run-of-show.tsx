"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { getProduct, priceQuote } from "@/lib/mock/products";
import { ageFrom } from "@/lib/mock/kyc";
import { seedDemoPolicy, useJourney, type Scenario } from "@/lib/store/journey";

type Beat = { id: string; go: () => void };

/**
 * The demo is the sales presentation. Ten beats, each pushing one belief, ending on the payment pulse:
 * the app does not die after purchase. Presenter-only, laptop only.
 */
export function RunOfShow() {
  const t = useTranslations("demo.run");
  const router = useRouter();
  const [current, setCurrent] = useState<string>();

  const withQuote = (verified: boolean) => {
    const s = useJourney.getState();
    const p = getProduct("term-life")!;
    s.set({
      policy: undefined,
      productId: p.id,
      quote: priceQuote(p, ageFrom(s.idFields.dateOfBirth), p.cover.default, p.term.default),
      phone: s.phone || "1001234567",
      phoneVerified: true,
      idConfirmed: verified,
      livenessPassed: verified,
    });
  };
  const scenario = (sc: Scenario, path = "/app/home") => {
    seedDemoPolicy();
    useJourney.getState().set({ scenario: sc, pausedMonths: 0, ...(sc === "checkIn" ? { lifeEvents: [] } : {}) });
    router.push(path);
  };

  const beats: Beat[] = [
    { id: "site", go: () => router.push("/") },
    { id: "product", go: () => router.push("/products/maash-bokra/") },
    { id: "browse", go: () => { useJourney.getState().reset(); router.push("/app"); } },
    { id: "kyc", go: () => { withQuote(false); router.push("/app/kyc"); } },
    { id: "buy", go: () => { withQuote(true); router.push("/app/purchase/summary"); } },
    { id: "pulse", go: () => scenario("dueSoon") },
    { id: "grace", go: () => scenario("grace") },
    { id: "checkIn", go: () => scenario("checkIn") },
    { id: "claims", go: () => { seedDemoPolicy(); router.push("/app/claims"); } },
    { id: "rhythm", go: () => { seedDemoPolicy(); useJourney.getState().set({ scenario: "onTrack" }); router.push("/app/notifications"); } },
  ];

  return (
    <aside className="no-scrollbar hidden max-h-[calc(100dvh-48px)] w-72 shrink-0 overflow-y-auto lg:block">
      <h2 className="text-[12px] font-semibold tracking-wide text-muted uppercase">{t("title")}</h2>
      <p className="mt-1 text-[13px] leading-relaxed text-muted">{t("domino")}</p>
      <ol className="mt-4 space-y-1.5">
        {beats.map((b, i) => (
          <li key={b.id}>
            <button
              onClick={() => {
                setCurrent(b.id);
                b.go();
              }}
              className={`w-full rounded-[14px] p-3 text-start transition ${current === b.id ? "bg-ink text-mist" : "hover:bg-paper hover:shadow-card"}`}
            >
              <span className="flex items-baseline gap-2 text-[14px] font-semibold">
                <span className={`tabular text-[12px] ${current === b.id ? "text-mint" : "text-accent"}`}>{i + 1}</span>
                {t(`beats.${b.id}.title`)}
              </span>
              <span className={`mt-0.5 block text-[12px] leading-relaxed ${current === b.id ? "text-mist/75" : "text-muted"}`}>
                {t(`beats.${b.id}.line`)}
              </span>
            </button>
          </li>
        ))}
      </ol>
    </aside>
  );
}
