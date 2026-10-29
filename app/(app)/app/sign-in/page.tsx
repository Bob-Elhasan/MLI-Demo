"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Screen } from "@/components/app/screen";
import { Processing } from "@/components/app/processing";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useProductName } from "@/components/app/use-product-name";
import { formatEGP } from "@/lib/format";
import { seedDemoPolicy, useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

const valid = (n: string) => /^1[0125]\d{8}$/.test(n);

/** Existing policyholders: phone, code, and straight to the policy they already own */
export default function SignIn() {
  const t = useTranslations("signIn");
  const to = useTranslations("onboarding");
  const router = useRouter();
  const locale = useLocale((s) => s.locale);
  const productName = useProductName();
  const [phone, setPhone] = useState("");
  const [step, setStep] = useState<"phone" | "code" | "finding" | "found">("phone");
  const [code, setCode] = useState("");
  const policy = useJourney((s) => s.policy);

  useEffect(() => {
    if (step !== "code") return;
    // Mocked SMS auto-fill, the way Android's one-time-code retriever behaves
    const id = setTimeout(() => setCode(String(Math.floor(100000 + Math.random() * 900000))), 1300);
    return () => clearTimeout(id);
  }, [step]);

  useEffect(() => {
    if (code.length !== 6) return;
    setStep("finding");
    const id = setTimeout(() => {
      useJourney.getState().set({ phone });
      seedDemoPolicy();
      setStep("found");
    }, 1500);
    return () => clearTimeout(id);
  }, [code, phone]);

  if (step === "found" && policy) {
    return (
      <Screen back={false} footer={<Button onClick={() => router.push("/app/home")}>{t("continue")}</Button>}>
        <div className="flex flex-col items-center pt-12 text-center">
          <span className="animate-pop grid size-20 place-items-center rounded-full bg-success text-on-accent">
            <Icon name="shieldCheck" size={40} />
          </span>
          <h1 className="mt-6 text-[28px] font-semibold tracking-tight">{t("found")}</h1>
          <p className="mt-2 max-w-[280px] text-[15px] leading-relaxed text-muted">{t("foundBody", { phone })}</p>
          <div className="animate-screen-in mt-8 w-full rounded-[22px] bg-mint p-5 text-start">
            <p className="text-[14px] font-semibold text-accent-strong">{productName(policy.productId)}</p>
            <p className="tabular mt-2 text-[28px] font-semibold">{formatEGP(policy.quote.cover, locale)}</p>
            <p className="tabular text-[13px] text-ink-2" dir="ltr">{policy.number}</p>
          </div>
        </div>
      </Screen>
    );
  }

  return (
    <Screen
      back="/app"
      title={step === "phone" ? t("title") : to("otpTitle")}
      subtitle={step === "phone" ? t("body") : to("otpBody", { phone: `+20 ${phone}` })}
      footer={step === "phone" && <Button disabled={!valid(phone)} onClick={() => setStep("code")}>{to("sendCode")}</Button>}
    >
      {step === "finding" && <Processing label={t("finding")} />}
      {step === "phone" ? (
        <div dir="ltr" className="flex h-16 items-center gap-3 rounded-[18px] bg-paper px-4 ring-1 ring-line-strong focus-within:ring-2 focus-within:ring-accent">
          <span className="border-e border-line pe-3 text-[17px] font-semibold">+20</span>
          <input
            autoFocus
            inputMode="numeric"
            placeholder="100 123 4567"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").replace(/^0/, "").slice(0, 10))}
            className="tabular h-full flex-1 bg-transparent text-[20px] font-semibold tracking-wide outline-none placeholder:text-ink/25"
          />
        </div>
      ) : (
        <div className="grid grid-cols-6 gap-2" dir="ltr">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={`tabular grid h-16 place-items-center rounded-[16px] bg-paper text-[26px] font-semibold ring-1 ${code[i] ? "ring-success text-success" : "ring-line"}`}>
              {code[i] ?? ""}
            </span>
          ))}
        </div>
      )}
    </Screen>
  );
}
