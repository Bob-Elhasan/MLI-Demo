"use client";

import { useTranslations } from "next-intl";
import { Screen } from "@/components/app/screen";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Toggle } from "@/components/ui/toggle";
import { useJourney } from "@/lib/store/journey";

export default function Biometrics() {
  const t = useTranslations("kyc");
  const tc = useTranslations("common");
  const { faceUnlock, selfie, set, quote } = useJourney();

  return (
    <Screen
      flow={t("flow")}
      progress={{ current: 5, total: 5 }}
      back={false}
      footer={<ButtonLink href={quote ? "/app/purchase/summary" : "/app/products"}>{tc("continue")}</ButtonLink>}
    >
      <div className="flex flex-col items-center pt-6 text-center">
        <div className="relative">
          <span className="animate-pulse-ring absolute inset-0 rounded-full bg-mint" />
          <div className="relative size-28 overflow-hidden rounded-full bg-mint ring-4 ring-paper shadow-lift">
            {selfie ? <img src={selfie} alt="" className="size-full object-cover" /> : <Icon name="user" size={56} className="m-auto mt-6 text-accent" />}
          </div>
          <span className="animate-pop absolute -end-1 bottom-0 grid size-10 place-items-center rounded-full bg-success text-on-accent ring-4 ring-mist">
            <Icon name="check" size={20} strokeWidth={2.6} />
          </span>
        </div>
        <h1 className="mt-6 text-[26px] font-semibold tracking-tight">{t("verifiedTitle")}</h1>
        <p className="mt-2 max-w-[300px] text-[15px] leading-relaxed text-muted">{t("verifiedBody")}</p>
      </div>

      <div className="mt-8 rounded-[22px] bg-paper p-5 shadow-card">
        <div className="flex items-start gap-4">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-lavender text-accent">
            <Icon name="face" size={26} />
          </span>
          <div className="flex-1 text-start">
            <h2 className="text-[17px] font-semibold">{t("biometricsTitle")}</h2>
            <p className="mt-1 text-[14px] leading-relaxed text-muted">{t("biometricsBody")}</p>
          </div>
        </div>
        <div className="mt-4 flex items-center justify-between border-t border-line pt-4">
          <div>
            <p className="text-[15px] font-semibold">{t("faceUnlock")}</p>
            <p className="text-[12px] text-muted">{t("faceUnlockHint")}</p>
          </div>
          <Toggle checked={faceUnlock} onChange={(v) => set({ faceUnlock: v })} label={t("faceUnlock")} />
        </div>
      </div>
    </Screen>
  );
}
