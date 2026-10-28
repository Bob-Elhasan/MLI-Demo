"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type Locale = "en" | "ar";

type LocaleState = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  toggle: () => void;
};

export const useLocale = create<LocaleState>()(
  persist(
    (set, get) => ({
      locale: "en",
      setLocale: (locale) => set({ locale }),
      toggle: () => set({ locale: get().locale === "en" ? "ar" : "en" }),
    }),
    { name: "mli-locale", skipHydration: true },
  ),
);

export const dirFor = (locale: Locale) => (locale === "ar" ? "rtl" : "ltr");
