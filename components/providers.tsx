"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect, useMemo } from "react";
import en from "@/messages/en.json";
import ar from "@/messages/ar.json";
import { dirFor, useLocale } from "@/lib/store/locale";
import { useJourney } from "@/lib/store/journey";

type Messages = Record<string, unknown>;

// Arabic copy is still pending, so any missing Arabic key falls back to English.
function merge(base: Messages, over: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(over)) {
    const current = out[key];
    out[key] =
      value && typeof value === "object" && current && typeof current === "object"
        ? merge(current as Messages, value as Messages)
        : value;
  }
  return out;
}

const catalog = { en, ar: merge(en, ar) };

export function Providers({ children }: { children: React.ReactNode }) {
  const locale = useLocale((s) => s.locale);

  useEffect(() => {
    useLocale.persist.rehydrate();
    useJourney.persist.rehydrate();
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dirFor(locale);
  }, [locale]);

  const messages = useMemo(() => catalog[locale], [locale]);

  return (
    <NextIntlClientProvider locale={locale} messages={messages} timeZone="Africa/Cairo">
      {children}
    </NextIntlClientProvider>
  );
}
