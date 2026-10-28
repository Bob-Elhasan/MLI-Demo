"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Screen } from "@/components/app/screen";
import { CrossSellCards } from "@/components/app/cross-sell";
import { Button, ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useJourney, type LifeEvent } from "@/lib/store/journey";

const EVENTS: LifeEvent[] = ["married", "baby", "newJob", "home", "school", "nothing"];

export default function CheckIn() {
  const t = useTranslations("checkIn");
  const checkIn = useJourney((s) => s.checkIn);
  const [picked, setPicked] = useState<LifeEvent[]>([]);
  const [done, setDone] = useState(false);

  const toggle = (e: LifeEvent) =>
    setPicked((p) => (e === "nothing" ? ["nothing"] : p.includes(e) ? p.filter((x) => x !== e) : [...p.filter((x) => x !== "nothing"), e]));

  if (done) {
    const nothing = picked.includes("nothing");
    return (
      <Screen back="/app/home" title={nothing ? t("resultsNothing") : t("resultsTitle")} footer={<ButtonLink href="/app/home">{t("later")}</ButtonLink>}>
        {!nothing && (
          <>
            <CrossSellCards events={picked} />
            <Link href="/app/vault" className="mt-5 flex items-center justify-between gap-3 rounded-[20px] bg-paper p-4 ring-1 ring-line">
              <span className="text-[14px] font-medium">{t("beneficiaryNudge")}</span>
              <Icon name="chevron" size={18} className="shrink-0 text-muted rtl:rotate-180" />
            </Link>
          </>
        )}
      </Screen>
    );
  }

  return (
    <Screen
      back="/app/home"
      title={t("title")}
      subtitle={t("body")}
      footer={
        <Button
          disabled={!picked.length}
          onClick={() => {
            checkIn(picked);
            setDone(true);
          }}
        >
          {t("submit")}
        </Button>
      }
    >
      <div className="grid grid-cols-2 gap-2.5">
        {EVENTS.map((e) => {
          const on = picked.includes(e);
          return (
            <button
              key={e}
              aria-pressed={on}
              onClick={() => toggle(e)}
              className={`flex min-h-24 flex-col justify-between rounded-[20px] p-4 text-start transition active:scale-[0.98] ${on ? "bg-ink text-mist" : "bg-paper ring-1 ring-line hover:ring-line-strong"} ${e === "nothing" ? "col-span-2 min-h-14 flex-row items-center" : ""}`}
            >
              <span className="text-[15px] leading-snug font-semibold">{t(`events.${e}`)}</span>
              <span className={`grid size-6 place-items-center rounded-full ${on ? "bg-mint text-ink" : "ring-1 ring-line-strong"}`}>
                {on && <Icon name="check" size={14} strokeWidth={2.8} />}
              </span>
            </button>
          );
        })}
      </div>
    </Screen>
  );
}
