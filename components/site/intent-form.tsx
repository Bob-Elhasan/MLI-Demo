"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/icon";
import { normaliseEgyptianMobile } from "./app-link-form";

export type IntentKind = "general" | "investor" | "partner";

const topicsFor: Record<IntentKind, string[]> = {
  general: ["buy", "policy", "claim", "partner", "complaint", "other"],
  investor: ["individual", "institution", "analyst", "media"],
  partner: ["bank", "broker", "lender", "employer"],
};

const input =
  "h-13 w-full rounded-[var(--radius-sm)] bg-ink/[0.06] px-4 text-[17px] text-ink outline-none transition-colors focus:bg-paper focus:outline-2 focus:outline-accent aria-[invalid=true]:outline-2 aria-[invalid=true]:outline-danger";

/** Intent capture. Mocked submit: validates, then shows a reference number. Nothing leaves the page. */
export function IntentForm({ kind = "general", defaultTopic }: { kind?: IntentKind; defaultTopic?: string }) {
  const t = useTranslations("site.form");
  const id = useId();
  const topics = topicsFor[kind];
  const [values, setValues] = useState({ name: "", phone: "", email: "", org: "", topic: defaultTopic ?? topics[0], message: "", consent: false });
  const [errors, setErrors] = useState<Record<string, boolean>>({});
  const [ref, setRef] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const set = (k: keyof typeof values, v: string | boolean) => {
    setValues((s) => ({ ...s, [k]: v }));
    if (errors[k]) setErrors((e) => ({ ...e, [k]: false }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next: Record<string, boolean> = {
      name: values.name.trim().length < 2,
      phone: kind !== "investor" && !normaliseEgyptianMobile(values.phone),
      email: (kind !== "general" || values.email.length > 0) && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email),
      org: kind === "partner" && values.org.trim().length < 2,
      consent: !values.consent,
    };
    setErrors(next);
    if (Object.values(next).some(Boolean)) return;
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setRef(`MLI-${kind === "investor" ? "IR" : kind === "partner" ? "PT" : "CS"}-${Math.floor(100000 + Math.random() * 900000)}`);
    }, 800);
  };

  if (ref) {
    return (
      <div role="status" className="animate-fade-in rounded-[var(--radius-lg)] bg-accent-soft p-8">
        <span className="grid size-12 place-items-center rounded-full bg-accent text-on-accent">
          <Icon name="check" size={26} />
        </span>
        <p className="mt-5 text-[26px] leading-tight font-semibold tracking-tight">{t("successTitle")}</p>
        <p className="mt-3 text-[17px] leading-relaxed text-ink">{t(`success.${kind}`, { name: values.name.trim().split(" ")[0] })}</p>
        <p className="mt-5 text-[16px] text-muted">
          {t("reference")} <span className="font-semibold text-ink tabular" dir="ltr">{ref}</span>
        </p>
        <button
          type="button"
          onClick={() => {
            setRef(null);
            setValues((s) => ({ ...s, message: "" }));
          }}
          className="mt-6 text-[16px] font-semibold text-accent underline underline-offset-4"
        >
          {t("another")}
        </button>
      </div>
    );
  }

  const field = (name: string, label: string, el: React.ReactNode, hint?: string) => (
    <div>
      <label htmlFor={`${id}-${name}`} className="block text-[16px] font-semibold">
        {label}
      </label>
      <div className="mt-2">{el}</div>
      {errors[name] ? (
        <p className="mt-2 text-[16px] font-semibold text-danger">{t(`errors.${name}`)}</p>
      ) : (
        hint && <p className="mt-2 text-[16px] text-muted">{hint}</p>
      )}
    </div>
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-6 sm:grid-cols-2">
      <div className="sm:col-span-2">
        {field(
          "topic",
          t(`topicLabel.${kind}`),
          <select id={`${id}-topic`} value={values.topic} onChange={(e) => set("topic", e.target.value)} className={`${input} appearance-none`}>
            {topics.map((tp) => (
              <option key={tp} value={tp}>
                {t(`topics.${kind}.${tp}`)}
              </option>
            ))}
          </select>,
        )}
      </div>
      {field(
        "name",
        t("name"),
        <input id={`${id}-name`} autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} aria-invalid={!!errors.name} className={input} />,
      )}
      {kind === "investor"
        ? field(
            "email",
            t("email"),
            <input id={`${id}-email`} type="email" dir="ltr" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} className={`${input} rtl:text-end`} />,
          )
        : field(
            "phone",
            t("phone"),
            <input id={`${id}-phone`} type="tel" dir="ltr" inputMode="tel" autoComplete="tel" placeholder="010 1234 5678" value={values.phone} onChange={(e) => set("phone", e.target.value)} aria-invalid={!!errors.phone} className={`${input} rtl:text-end`} />,
            t("phoneHint"),
          )}
      {kind === "partner" &&
        field(
          "org",
          t("org"),
          <input id={`${id}-org`} autoComplete="organization" value={values.org} onChange={(e) => set("org", e.target.value)} aria-invalid={!!errors.org} className={input} />,
        )}
      {kind !== "investor" &&
        field(
          "email",
          kind === "general" ? t("emailOptional") : t("email"),
          <input id={`${id}-email`} type="email" dir="ltr" autoComplete="email" value={values.email} onChange={(e) => set("email", e.target.value)} aria-invalid={!!errors.email} className={`${input} rtl:text-end`} />,
        )}
      {kind === "investor" &&
        field(
          "org",
          t("orgOptional"),
          <input id={`${id}-org`} autoComplete="organization" value={values.org} onChange={(e) => set("org", e.target.value)} className={input} />,
        )}
      <div className="sm:col-span-2">
        {field(
          "message",
          t("message"),
          <textarea id={`${id}-message`} rows={5} value={values.message} onChange={(e) => set("message", e.target.value)} className={`${input} h-auto py-3 leading-relaxed`} />,
        )}
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-[16px] leading-relaxed text-ink">
          <input
            type="checkbox"
            checked={values.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={!!errors.consent}
            className="mt-1 size-5 shrink-0 accent-[var(--color-accent)]"
          />
          {t("consent")}
        </label>
        {errors.consent && <p className="mt-2 text-[16px] font-semibold text-danger">{t("errors.consent")}</p>}
      </div>
      <div className="flex flex-wrap items-center gap-4 sm:col-span-2">
        <button
          type="submit"
          disabled={busy}
          className="inline-flex h-14 items-center justify-center rounded-full bg-accent px-8 text-[17px] font-semibold text-on-accent transition duration-200 hover:bg-accent-strong active:scale-[0.98] disabled:opacity-60"
        >
          {busy ? t("sending") : t(`submit.${kind}`)}
        </button>
        <p className="text-[16px] text-muted">{t(`reply.${kind}`)}</p>
      </div>
    </form>
  );
}
