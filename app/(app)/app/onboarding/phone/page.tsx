"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Screen } from "@/components/app/screen";
import { Button } from "@/components/ui/button";
import { useJourney } from "@/lib/store/journey";

// Egyptian mobile: 10 digits after +20, starting 10, 11, 12 or 15
const valid = (n: string) => /^1[0125]\d{8}$/.test(n);

const pretty = (n: string) => [n.slice(0, 3), n.slice(3, 6), n.slice(6, 10)].filter(Boolean).join(" ");

export default function Phone() {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const stored = useJourney((s) => s.phone);
  const set = useJourney((s) => s.set);
  const [phone, setPhone] = useState(stored);
  const [touched, setTouched] = useState(false);
  const ok = valid(phone);

  const submit = () => {
    setTouched(true);
    if (!ok) return;
    set({ phone, phoneVerified: false });
    router.push("/app/onboarding/otp");
  };

  return (
    <Screen
      flow={t("phoneLabel")}
      title={t("phoneTitle")}
      subtitle={t("phoneBody")}
      footer={
        <>
          <p className="text-center text-[12px] leading-relaxed text-muted">{t("phoneTerms")}</p>
          <Button onClick={submit} disabled={!ok}>
            {t("sendCode")}
          </Button>
        </>
      }
    >
      <label className="block">
        <span className="mb-2 block text-[13px] font-medium text-muted">{t("phoneLabel")}</span>
        <div
          dir="ltr"
          className={`flex h-16 items-center gap-3 rounded-[18px] bg-paper px-4 ring-1 transition focus-within:ring-2 focus-within:ring-accent ${touched && !ok ? "ring-danger" : "ring-line-strong"}`}
        >
          <span className="flex items-center gap-2 border-e border-line pe-3 text-[17px] font-semibold">
            <span aria-hidden="true">🇪🇬</span>+20
          </span>
          <input
            autoFocus
            inputMode="numeric"
            autoComplete="tel-national"
            placeholder="100 123 4567"
            value={pretty(phone)}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").replace(/^0/, "").slice(0, 10))}
            onBlur={() => setTouched(true)}
            onKeyDown={(e) => e.key === "Enter" && submit()}
            className="tabular h-full flex-1 bg-transparent text-[20px] font-semibold tracking-wide outline-none placeholder:text-ink/25"
          />
        </div>
      </label>
      {touched && !ok && phone.length > 0 && <p className="mt-2 text-[13px] text-danger">{t("phoneError")}</p>}
    </Screen>
  );
}
