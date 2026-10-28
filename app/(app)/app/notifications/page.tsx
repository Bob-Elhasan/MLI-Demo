"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Screen } from "@/components/app/screen";
import { Toggle } from "@/components/ui/toggle";
import { useNotifications, type Cadence } from "@/components/app/use-notifications";
import { formatDate } from "@/lib/format";
import { useHydrated, useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

const RHYTHM: Cadence[] = ["weekly", "monthly", "halfYear", "yearly", "once"];

export default function Notifications() {
  const t = useTranslations("notifications");
  const locale = useLocale((s) => s.locale);
  const hydrated = useHydrated();
  const { list } = useNotifications();
  const { readNotifications, weeklyGoalNudge, set } = useJourney();
  const [tab, setTab] = useState<"inbox" | "rhythm">("inbox");

  return (
    <Screen back="/app/home" title={t("title")}>
      <div className="mb-5 grid grid-cols-2 rounded-full bg-fill p-1" role="tablist">
        {(["inbox", "rhythm"] as const).map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={tab === k}
            onClick={() => setTab(k)}
            className={`h-10 rounded-full text-[14px] font-semibold transition ${tab === k ? "bg-paper shadow-card" : "text-muted"}`}
          >
            {t(k)}
          </button>
        ))}
      </div>

      {tab === "inbox" ? (
        hydrated && (
          <>
            {list.length === 0 ? (
              <p className="py-10 text-center text-[14px] text-muted">{t("empty")}</p>
            ) : (
              <>
                <div className="mb-2 flex justify-end">
                  <button onClick={() => set({ readNotifications: list.map((n) => n.id) })} className="text-[13px] font-semibold text-accent">
                    {t("markRead")}
                  </button>
                </div>
                <ul className="overflow-hidden rounded-[20px] bg-paper ring-1 ring-line">
                  {list.map((n) => {
                    const unread = !readNotifications.includes(n.id);
                    return (
                      <li key={n.id} className="border-b border-line last:border-0">
                        <Link
                          href={n.href}
                          onClick={() => set({ readNotifications: [...readNotifications, n.id] })}
                          className="flex gap-3 px-4 py-3.5 transition hover:bg-fill"
                        >
                          <span className={`mt-1.5 size-2 shrink-0 rounded-full ${unread ? "bg-accent" : "bg-transparent"}`} />
                          <span className="min-w-0 flex-1">
                            <span className="flex items-baseline justify-between gap-2">
                              <span className={`text-[15px] ${unread ? "font-semibold" : "font-medium"}`}>{n.title}</span>
                              <span className="tabular shrink-0 text-[12px] text-muted">{formatDate(n.at, locale, { day: "numeric", month: "short" })}</span>
                            </span>
                            <span className="mt-0.5 block text-[13px] leading-relaxed text-muted">{n.body}</span>
                            <span className="mt-1 block text-[12px] font-medium text-accent">{t(`cadence.${n.cadence}`)}</span>
                          </span>
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </>
            )}
          </>
        )
      ) : (
        <>
          <p className="mb-5 text-[14px] leading-relaxed text-muted">{t("rhythmIntro")}</p>
          {/* The cadence, drawn as a rhythm from quiet to rare. The monthly payment is the pulse. */}
          <ol className="space-y-2">
            {RHYTHM.map((c) => (
              <li key={c} className={`rounded-[20px] p-4 ${c === "monthly" ? "bg-ink text-mist" : "bg-paper ring-1 ring-line"}`}>
                <div className="flex items-center justify-between gap-3">
                  <span className="text-[15px] font-semibold">{t(`cadence.${c}`)}</span>
                  {c === "weekly" && <Toggle checked={weeklyGoalNudge} onChange={(v) => set({ weeklyGoalNudge: v })} label={t("cadence.weekly")} />}
                </div>
                <p className={`mt-1 text-[13px] leading-relaxed ${c === "monthly" ? "text-mist/75" : "text-muted"}`}>{t(`rhythmItems.${c}`)}</p>
              </li>
            ))}
          </ol>
        </>
      )}
    </Screen>
  );
}
