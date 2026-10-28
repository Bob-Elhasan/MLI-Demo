"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Screen } from "@/components/app/screen";
import { Icon } from "@/components/ui/icon";
import { useJourney } from "@/lib/store/journey";

const LENGTH = 6;

export default function Otp() {
  const t = useTranslations("onboarding");
  const router = useRouter();
  const phone = useJourney((s) => s.phone);
  const set = useJourney((s) => s.set);
  const [code] = useState(() => String(Math.floor(100000 + Math.random() * 900000)));
  const [value, setValue] = useState("");
  const [sms, setSms] = useState(false);
  const [seconds, setSeconds] = useState(30);
  const [verifying, setVerifying] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  // Fake SMS arrives a beat after the screen opens
  useEffect(() => {
    const id = setTimeout(() => setSms(true), 1400);
    return () => clearTimeout(id);
  }, []);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  // Any 6 digits pass, it's a mock
  useEffect(() => {
    if (value.length !== LENGTH) return;
    setVerifying(true);
    const id = setTimeout(() => {
      set({ phoneVerified: true });
      router.push("/app/kyc");
    }, 900);
    return () => clearTimeout(id);
  }, [value, set, router]);

  const fill = () => {
    setSms(false);
    let i = 0;
    const id = setInterval(() => {
      i++;
      setValue(code.slice(0, i));
      if (i >= LENGTH) clearInterval(id);
    }, 70);
  };

  return (
    <Screen title={t("otpTitle")} subtitle={t("otpBody", { phone: `+20 ${phone}` })}>
      {sms && (
        <button
          onClick={fill}
          className="animate-toast-in absolute inset-x-3 top-1 z-30 flex items-start gap-3 rounded-[22px] bg-paper/95 p-3.5 text-start shadow-lift ring-1 ring-line backdrop-blur"
        >
          <span className="grid size-9 shrink-0 place-items-center rounded-[10px] bg-ink text-[10px] font-bold text-mist">MLI</span>
          <span className="flex-1">
            <span className="flex justify-between text-[13px] font-semibold">
              {t("smsSender")}
              <span className="font-normal text-muted">{t("smsTap")}</span>
            </span>
            <span className="mt-0.5 block text-[13px] leading-snug text-ink-2">{t("smsBody", { code })}</span>
          </span>
        </button>
      )}

      <div className="relative" onClick={() => input.current?.focus()} dir="ltr">
        <input
          ref={input}
          autoFocus
          inputMode="numeric"
          autoComplete="one-time-code"
          value={value}
          onChange={(e) => setValue(e.target.value.replace(/\D/g, "").slice(0, LENGTH))}
          className="absolute inset-0 opacity-0"
          aria-label={t("otpTitle")}
        />
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: LENGTH }, (_, i) => {
            const ch = value[i];
            const focus = i === value.length && !verifying;
            return (
              <span
                key={i}
                className={`tabular grid h-16 place-items-center rounded-[16px] bg-paper text-[26px] font-semibold ring-1 transition ${verifying ? "ring-success text-success" : focus ? "ring-2 ring-accent" : ch ? "ring-line-strong" : "ring-line"}`}
              >
                {ch ?? (focus ? <span className="h-7 w-0.5 animate-pulse bg-accent" /> : "")}
              </span>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between text-[14px]">
        {verifying ? (
          <span className="flex items-center gap-2 font-medium text-success">
            <Icon name="check" size={18} strokeWidth={2.4} />
            {t("verifying")}
          </span>
        ) : seconds > 0 ? (
          <span className="tabular text-muted">{t("otpResend", { seconds })}</span>
        ) : (
          <button onClick={() => { setSeconds(30); setSms(true); }} className="font-semibold text-accent">
            {t("otpResendNow")}
          </button>
        )}
        <button onClick={() => router.push("/app/onboarding/phone")} className="font-semibold text-accent">
          {t("otpWrongNumber")}
        </button>
      </div>
    </Screen>
  );
}
