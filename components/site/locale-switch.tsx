"use client";

import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icon";
import { useLocale } from "@/lib/store/locale";

export function LocaleSwitch({ className = "", tone = "ink" }: { className?: string; tone?: "ink" | "paper" }) {
  const tc = useTranslations("common");
  const t = useTranslations("site.nav");
  const toggle = useLocale((s) => s.toggle);
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={t("switchLanguage")}
      className={`inline-flex h-11 items-center gap-2 rounded-full px-4 text-[15px] font-semibold transition-colors ${
        tone === "paper" ? "text-mist hover:bg-mist/10" : "text-accent hover:bg-accent-soft"
      } ${className}`}
    >
      <Icon name="globe" size={18} />
      {tc("language")}
    </button>
  );
}
