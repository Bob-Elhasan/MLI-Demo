"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Screen } from "@/components/app/screen";
import { Processing } from "@/components/app/processing";
import { Button } from "@/components/ui/button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Toggle } from "@/components/ui/toggle";
import { formatEGP } from "@/lib/format";
import { useJourney, type PaymentMethod } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

const METHODS: { id: PaymentMethod; icon: IconName }[] = [
  { id: "card", icon: "card" },
  { id: "meeza", icon: "wallet" },
  { id: "instapay", icon: "phone" },
  { id: "fawry", icon: "qr" },
];

export default function Payment() {
  const t = useTranslations("purchase");
  const router = useRouter();
  const locale = useLocale((s) => s.locale);
  const { quote, paymentMethod, set } = useJourney();
  const [save, setSave] = useState(true);
  const [busy, setBusy] = useState(false);

  const pay = () => {
    setBusy(true);
    setTimeout(() => router.push("/app/purchase/sign"), 1800);
  };

  return (
    <Screen
      title={t("paymentTitle")}
      footer={
        <>
          <p className="flex items-center justify-center gap-1.5 text-[12px] text-muted">
            <Icon name="lock" size={14} />
            {t("secure")}
          </p>
          <Button onClick={pay}>{t("pay", { amount: formatEGP(quote?.monthly ?? 0, locale) })}</Button>
        </>
      }
    >
      {busy && <Processing label={t("processing")} />}

      <div className="space-y-2.5" role="radiogroup">
        {METHODS.map((m) => {
          const active = paymentMethod === m.id;
          return (
            <button
              key={m.id}
              role="radio"
              aria-checked={active}
              onClick={() => set({ paymentMethod: m.id })}
              className={`flex w-full items-center gap-3.5 rounded-[18px] bg-paper p-4 text-start transition ${active ? "ring-2 ring-accent" : "ring-1 ring-line"}`}
            >
              <span className="grid size-10 place-items-center rounded-xl bg-fill text-accent">
                <Icon name={m.icon} size={21} />
              </span>
              <span className="flex-1 text-[15px] font-semibold">{t(m.id)}</span>
              <span className={`grid size-5 place-items-center rounded-full ${active ? "bg-accent" : "ring-1 ring-line-strong"}`}>
                {active && <span className="size-2 rounded-full bg-paper" />}
              </span>
            </button>
          );
        })}
      </div>

      {(paymentMethod === "card" || paymentMethod === "meeza") && (
        <div className="animate-screen-in mt-5 space-y-3">
          <Field label={t("cardNumber")} value="4242 4242 4242 4242" />
          <div className="grid grid-cols-2 gap-3">
            <Field label={t("expiry")} value="09 / 29" />
            <Field label={t("cvv")} value="•••" />
          </div>
        </div>
      )}

      <div className="mt-5 flex items-center justify-between gap-4 rounded-[18px] bg-paper p-4 ring-1 ring-line">
        <span className="text-[14px] font-medium">{t("saveMethod")}</span>
        <Toggle checked={save} onChange={setSave} label={t("saveMethod")} />
      </div>
    </Screen>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block rounded-[16px] bg-paper px-4 py-2.5 ring-1 ring-line focus-within:ring-2 focus-within:ring-accent">
      <span className="block text-[12px] text-muted">{label}</span>
      <input defaultValue={value} dir="ltr" className="tabular w-full bg-transparent text-[16px] font-medium tracking-wide outline-none" />
    </label>
  );
}
