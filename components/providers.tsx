"use client";

import { NextIntlClientProvider } from "next-intl";
import { useEffect, useMemo } from "react";
import appEn from "@/messages/en.json";
import appAr from "@/messages/ar.json";
// Website and /connect copy lives in its own files so the surfaces can evolve independently
import siteEn from "@/messages/site.en.json";
import siteAr from "@/messages/site.ar.json";
import { dirFor, useLocale } from "@/lib/store/locale";
import { useJourney } from "@/lib/store/journey";

type Messages = Record<string, unknown>;

// Arabic copy is still pending, so any missing Arabic key falls back to English.
function merge(base: Messages, over: Messages): Messages {
  const out: Messages = { ...base };
  for (const [key, value] of Object.entries(over)) {
    const current = out[key];
    out[key] =
      // Lists (claim stages, document checklists) are replaced whole, never merged index by index
      value && typeof value === "object" && !Array.isArray(value) && current && typeof current === "object" && !Array.isArray(current)
        ? merge(current as Messages, value as Messages)
        : value;
  }
  return out;
}

const en = merge(appEn, siteEn);
const catalog = { en, ar: merge(en, merge(appAr, siteAr)) };

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
