"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { Screen } from "@/components/app/screen";
import { Processing } from "@/components/app/processing";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useJourney, type ClaimType } from "@/lib/store/journey";

const TYPES: ClaimType[] = ["death", "disability", "illness", "maturity"];

export default function NewClaim() {
  const t = useTranslations("claims");
  const router = useRouter();
  const submitClaim = useJourney((s) => s.submitClaim);
  const [type, setType] = useState<ClaimType>("illness");
  const [eventDate, setEventDate] = useState(new Date().toISOString().slice(0, 10));
  const [description, setDescription] = useState("");
  const [files, setFiles] = useState<Record<string, string>>({});
  const [busy, setBusy] = useState(false);

  const required = t.raw(`docs.${type}`) as string[];
  const complete = required.every((d) => files[d]) && description.trim().length > 3;

  const submit = () => {
    setBusy(true);
    setTimeout(() => {
      submitClaim({ type, eventDate, description, documents: Object.values(files) });
      router.push("/app/claims");
    }, 1400);
  };

  return (
    <Screen
      back="/app/claims"
      title={t("newTitle")}
      footer={
        <Button disabled={!complete} onClick={submit}>
          {t("submit")}
        </Button>
      }
    >
      {busy && <Processing label={t("submitting")} />}

      <fieldset>
        <legend className="mb-3 text-[15px] font-semibold">{t("type")}</legend>
        <div className="space-y-2">
          {TYPES.map((k) => (
            <label key={k} className={`flex cursor-pointer items-start gap-3 rounded-[16px] bg-paper p-3.5 transition ${type === k ? "ring-2 ring-accent" : "ring-1 ring-line"}`}>
              <input type="radio" name="type" checked={type === k} onChange={() => { setType(k); setFiles({}); }} className="mt-1 size-4 accent-accent" />
              <span>
                <span className="block text-[15px] font-medium">{t(`types.${k}`)}</span>
                <span className="block text-[13px] text-muted">{t(`typeHint.${k}`)}</span>
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="mt-6 block rounded-[16px] bg-paper px-4 py-3 ring-1 ring-line focus-within:ring-2 focus-within:ring-accent">
        <span className="block text-[12px] text-muted">{t("eventDate")}</span>
        <input type="date" value={eventDate} onChange={(e) => setEventDate(e.target.value)} className="tabular mt-0.5 w-full bg-transparent text-[16px] outline-none" />
      </label>

      <label className="mt-3 block rounded-[16px] bg-paper px-4 py-3 ring-1 ring-line focus-within:ring-2 focus-within:ring-accent">
        <span className="block text-[12px] text-muted">{t("description")}</span>
        <textarea
          rows={3}
          value={description}
          placeholder={t("descriptionHint")}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-0.5 w-full resize-none bg-transparent text-[16px] outline-none placeholder:text-ink/30"
        />
      </label>

      <h2 className="mt-6 mb-3 text-[15px] font-semibold">{t("documents")}</h2>
      <div className="overflow-hidden rounded-[20px] bg-paper ring-1 ring-line">
        {required.map((d) => (
          <label key={d} className="flex min-h-14 cursor-pointer items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-0 hover:bg-fill">
            <span className="min-w-0">
              <span className="block text-[15px] font-medium">{d}</span>
              {files[d] && <span className="block truncate text-[12px] text-muted">{files[d]}</span>}
            </span>
            {files[d] ? (
              <span className="flex shrink-0 items-center gap-1 text-[13px] font-semibold text-success">
                <Icon name="check" size={16} strokeWidth={2.6} />
                {t("uploaded")}
              </span>
            ) : (
              <span className="shrink-0 rounded-full bg-fill px-3 py-1.5 text-[13px] font-semibold text-accent">{t("upload")}</span>
            )}
            {/* Real file picker; nothing leaves the device, only the name is kept */}
            <input
              type="file"
              accept="image/*,application/pdf"
              className="sr-only"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) setFiles((s) => ({ ...s, [d]: f.name }));
              }}
            />
          </label>
        ))}
      </div>
      <p className="mt-4 text-[12px] leading-relaxed text-muted">{t("reviewNote")}</p>
    </Screen>
  );
}
