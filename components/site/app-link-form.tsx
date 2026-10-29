"use client";

import { useTranslations } from "next-intl";
import { useId, useState } from "react";
import { Icon } from "@/components/ui/icon";

type Channel = "whatsapp" | "sms";

/** Egyptian mobile: 010, 011, 012 or 015 followed by 8 digits, with or without +20 / 0020 */
export function normaliseEgyptianMobile(raw: string): string | null {
  const digits = raw.replace(/[^\d]/g, "").replace(/^(0020|20)/, "0");
  const local = digits.startsWith("0") ? digits : `0${digits}`;
  return /^01[0125]\d{8}$/.test(local) ? local : null;
}

const pretty = (local: string) => `+20 ${local.slice(1, 3)} ${local.slice(3, 7)} ${local.slice(7)}`;

/** Window-shopper capture. Mocked: nothing is sent anywhere. */
export function AppLinkForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const t = useTranslations("site.appLink");
  const id = useId();
  const [channel, setChannel] = useState<Channel>("whatsapp");
  const [phone, setPhone] = useState("");
  const [error, setError] = useState(false);
  const [sent, setSent] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const dark = tone === "dark";
  const muted = dark ? "text-mist/75" : "text-muted";

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const local = normaliseEgyptianMobile(phone);
    if (!local) {
      setError(true);
      return;
    }
    setError(false);
    setBusy(true);
    window.setTimeout(() => {
      setBusy(false);
      setSent(local);
    }, 700);
  };

  if (sent) {
    return (
      <div role="status" className={`animate-fade-in rounded-[var(--radius-lg)] p-6 ${dark ? "bg-mist/10" : "bg-accent-soft"}`}>
        <p className="flex items-center gap-3 text-[19px] font-semibold">
          <span className={`grid size-9 shrink-0 place-items-center rounded-full ${dark ? "bg-mint text-ink" : "bg-accent text-on-accent"}`}>
            <Icon name="check" size={20} />
          </span>
          {t("sentTitle")}
        </p>
        <p className={`mt-3 text-[17px] leading-relaxed ${muted}`}>
          {t(channel === "whatsapp" ? "sentWhatsapp" : "sentSms", { phone: pretty(sent) })}
        </p>
        <button
          type="button"
          onClick={() => {
            setSent(null);
            setPhone("");
          }}
          className={`mt-4 text-[16px] font-semibold underline underline-offset-4 ${dark ? "text-mint" : "text-accent"}`}
        >
          {t("again")}
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={submit} noValidate className="w-full">
      <fieldset>
        <legend className="text-[16px] font-semibold">{t("channel")}</legend>
        <div role="radiogroup" className={`mt-3 inline-flex rounded-full p-1 ${dark ? "bg-mist/10" : "bg-ink/5"}`}>
          {(["whatsapp", "sms"] as Channel[]).map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={channel === c}
              onClick={() => setChannel(c)}
              className={`h-10 rounded-full px-5 text-[16px] font-semibold transition-colors ${
                channel === c ? (dark ? "bg-mint text-ink" : "bg-ink text-mist") : dark ? "text-mist/80 hover:text-mist" : "text-muted hover:text-ink"
              }`}
            >
              {t(c)}
            </button>
          ))}
        </div>
      </fieldset>

      <label htmlFor={`${id}-phone`} className="mt-6 block text-[16px] font-semibold">
        {t("label")}
      </label>
      <div className="mt-2 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <div className={`flex h-14 items-center rounded-full ps-5 pe-2 sm:flex-[1_1_240px] ${dark ? "bg-mist text-ink" : "bg-ink/[0.06]"} ${error ? "outline-2 outline-danger" : ""}`}>
          <span className="pe-3 text-[17px] font-semibold text-muted" dir="ltr">
            +20
          </span>
          <input
            id={`${id}-phone`}
            type="tel"
            inputMode="tel"
            autoComplete="tel-national"
            dir="ltr"
            placeholder="10 1234 5678"
            value={phone}
            onChange={(e) => {
              setPhone(e.target.value);
              if (error) setError(false);
            }}
            aria-invalid={error}
            aria-describedby={`${id}-hint`}
            className="h-full w-full min-w-0 bg-transparent text-[17px] text-ink outline-none placeholder:text-muted/70 rtl:text-end"
          />
        </div>
        <button
          type="submit"
          disabled={busy}
          className={`inline-flex h-14 items-center justify-center gap-2 rounded-full px-7 sm:flex-auto text-[17px] font-semibold transition duration-200 active:scale-[0.98] disabled:opacity-60 ${
            dark ? "bg-mint text-ink hover:bg-aqua" : "bg-accent text-on-accent hover:bg-accent-strong"
          }`}
        >
          {busy ? t("sending") : t("send")}
        </button>
      </div>
      <p id={`${id}-hint`} className={`mt-3 text-[16px] ${error ? (dark ? "font-semibold text-lilac" : "font-semibold text-danger") : muted}`}>
        {error ? t("error") : t("hint")}
      </p>
    </form>
  );
}
