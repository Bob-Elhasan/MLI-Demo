"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Screen } from "@/components/app/screen";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useJourney } from "@/lib/store/journey";
import type { IdFields } from "@/lib/mock/kyc";

export default function Review() {
  const t = useTranslations("kyc");
  const tc = useTranslations("common");
  const router = useRouter();
  const { idFront, idFields, set } = useJourney();
  const [reading, setReading] = useState(true);
  const [fields, setFields] = useState<IdFields>(idFields);
  const [confirmed, setConfirmed] = useState(false);

  useEffect(() => {
    const id = setTimeout(() => setReading(false), 2200);
    return () => clearTimeout(id);
  }, []);

  if (reading) {
    return (
      <Screen flow={t("flow")} progress={{ current: 3, total: 5 }} back={false}>
        <div className="flex flex-1 flex-col items-center pt-16 text-center">
          <div className="relative w-full max-w-[280px] overflow-hidden rounded-[18px] bg-paper p-1.5 shadow-lift">
            {idFront ? (
              <img src={idFront} alt="" className="aspect-[1.586] w-full rounded-[14px] object-cover" />
            ) : (
              <div className="bg-connect aspect-[1.586] w-full rounded-[14px]" />
            )}
            <span className="animate-scan absolute inset-x-2 h-0.5 bg-accent shadow-[0_0_16px_3px_rgb(0_102_96/0.5)]" />
          </div>
          <h1 className="mt-10 text-[22px] font-semibold">{t("reading")}</h1>
          <p className="mt-2 text-[15px] text-muted">{t("readingBody")}</p>
        </div>
      </Screen>
    );
  }

  const field = (key: keyof IdFields, label: string, opts: { dir?: "ltr" | "rtl"; type?: string } = {}) => (
    <label key={key} className="block border-b border-line px-4 py-3 last:border-0">
      <span className="block text-[12px] font-medium text-muted">{label}</span>
      <input
        type={opts.type ?? "text"}
        dir={opts.dir}
        value={fields[key]}
        onChange={(e) => setFields({ ...fields, [key]: e.target.value })}
        className="tabular mt-0.5 w-full bg-transparent text-[16px] font-medium outline-none"
      />
    </label>
  );

  return (
    <Screen
      flow={t("flow")}
      progress={{ current: 3, total: 5 }}
      title={t("reviewTitle")}
      subtitle={t("reviewBody")}
      footer={
        <>
          <label className="flex cursor-pointer items-center gap-3 rounded-[16px] bg-paper p-3.5 ring-1 ring-line">
            <input type="checkbox" checked={confirmed} onChange={(e) => setConfirmed(e.target.checked)} className="size-5 accent-accent" />
            <span className="text-[14px] font-medium">{t("reviewConfirm")}</span>
          </label>
          <Button
            disabled={!confirmed}
            onClick={() => {
              set({ idFields: fields, idConfirmed: true });
              router.push("/app/kyc/selfie");
            }}
          >
            {t("looksGood")}
          </Button>
        </>
      }
    >
      <div className="mb-3 flex items-center gap-2 text-[13px] font-medium text-success">
        <Icon name="check" size={16} strokeWidth={2.4} />
        <span>OCR</span>
        <span className="ms-auto rounded-full bg-fill px-2 py-0.5 text-[11px] text-muted">{tc("demoData")}</span>
      </div>
      <div className="overflow-hidden rounded-[20px] bg-paper shadow-card">
        {field("fullNameAr", t("fieldNameAr"), { dir: "rtl" })}
        {field("fullNameEn", t("fieldNameEn"), { dir: "ltr" })}
        {field("nationalId", t("fieldNationalId"), { dir: "ltr" })}
        {field("dateOfBirth", t("fieldDob"), { type: "date" })}
        <div className="border-b border-line px-4 py-3">
          <span className="block text-[12px] font-medium text-muted">{t("fieldGender")}</span>
          <div className="mt-1.5 flex gap-2">
            {(["male", "female"] as const).map((g) => (
              <button
                key={g}
                onClick={() => setFields({ ...fields, gender: g })}
                className={`h-8 rounded-full px-4 text-[14px] font-medium transition ${fields.gender === g ? "bg-ink text-mist" : "bg-fill text-ink-2"}`}
              >
                {t(g)}
              </button>
            ))}
          </div>
        </div>
        {field("address", t("fieldAddress"))}
        {field("expiry", t("fieldExpiry"), { type: "date" })}
      </div>
    </Screen>
  );
}
