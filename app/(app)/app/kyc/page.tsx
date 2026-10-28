"use client";

import { useTranslations } from "next-intl";
import { Screen } from "@/components/app/screen";
import { ButtonLink } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";

export default function KycIntro() {
  const t = useTranslations("kyc");
  const steps: { icon: IconName; text: string }[] = [
    { icon: "idCard", text: t("introStep1") },
    { icon: "doc", text: t("introStep2") },
    { icon: "face", text: t("introStep3") },
  ];
  return (
    <Screen
      back="/app/onboarding/phone"
      title={t("introTitle")}
      subtitle={t("introBody")}
      footer={
        <>
          <p className="flex items-center justify-center gap-1.5 text-[12px] text-muted">
            <Icon name="lock" size={14} />
            {t("introPrivacy")}
          </p>
          <ButtonLink href="/app/kyc/id-front">{t("start")}</ButtonLink>
        </>
      }
    >
      <ol className="relative space-y-3">
        {steps.map((s, i) => (
          <li key={s.icon} className="animate-screen-in flex items-center gap-4 rounded-[20px] bg-paper p-4 shadow-card" style={{ animationDelay: `${120 + i * 90}ms` }}>
            <span className={`grid size-12 shrink-0 place-items-center rounded-2xl text-accent ${["bg-mint", "bg-icy", "bg-lavender"][i]}`}>
              <Icon name={s.icon} size={24} />
            </span>
            <span className="text-[15px] leading-snug font-medium">{s.text}</span>
          </li>
        ))}
      </ol>
    </Screen>
  );
}
