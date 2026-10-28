"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Screen } from "@/components/app/screen";
import { Processing } from "@/components/app/processing";
import { SignaturePad } from "@/components/app/signature-pad";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useJourney } from "@/lib/store/journey";

export default function Sign() {
  const t = useTranslations("purchase");
  const router = useRouter();
  const { capture, issuePolicy } = useJourney();
  const [health, setHealth] = useState(false);
  const [terms, setTerms] = useState(false);
  const [signature, setSignature] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const ready = health && terms && !!signature;

  const sign = () => {
    if (!signature) return;
    capture("signature", signature);
    setBusy(true);
    setTimeout(() => {
      issuePolicy();
      router.push("/app/purchase/issued");
    }, 1600);
  };

  return (
    <Screen title={t("signTitle")} subtitle={t("signBody")} back={false} footer={<Button disabled={!ready} onClick={sign}><Icon name="pen" size={19} />{t("signAndIssue")}</Button>}>
      {busy && <Processing label={t("issuing")} />}

      <section className="rounded-[20px] bg-paper p-4 shadow-card">
        <h2 className="text-[15px] font-semibold">{t("keyTerms")}</h2>
        <ul className="mt-3 space-y-2.5">
          {(["keyTerm1", "keyTerm2", "keyTerm3", "keyTerm4"] as const).map((k) => (
            <li key={k} className="flex gap-2.5 text-[14px] leading-snug text-ink-2">
              <Icon name="info" size={17} className="mt-0.5 shrink-0 text-accent" />
              {t(k)}
            </li>
          ))}
        </ul>
      </section>

      <div className="mt-4 space-y-2">
        <Check checked={health} onChange={setHealth} label={t("health")} />
        <Check checked={terms} onChange={setTerms} label={t("terms")} />
      </div>

      <div className="mt-4">
        <SignaturePad onChange={setSignature} clearLabel={t("clear")} placeholder={t("signHere")} />
      </div>
    </Screen>
  );
}

function Check({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex cursor-pointer items-center gap-3 rounded-[16px] bg-paper p-3.5 ring-1 ring-line">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)} className="size-5 shrink-0 accent-accent" />
      <span className="text-[14px] leading-snug font-medium">{label}</span>
    </label>
  );
}
