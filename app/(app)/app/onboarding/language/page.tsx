"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Screen } from "@/components/app/screen";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useLocale, type Locale } from "@/lib/store/locale";

export default function Language() {
  const t = useTranslations("onboarding");
  const tc = useTranslations("common");
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const options: { id: Locale; label: string; sample: string }[] = [
    { id: "en", label: "English", sample: "Protection that fits in your pocket" },
    { id: "ar", label: "العربية", sample: "حماية على قد إيدك" },
  ];

  return (
    <Screen
      title={t("languageTitle")}
      subtitle={t("languageBody")}
      footer={<Button onClick={() => router.push("/app/onboarding/phone")}>{tc("continue")}</Button>}
    >
      <div className="space-y-3" role="radiogroup">
        {options.map((o) => {
          const active = locale === o.id;
          return (
            <button
              key={o.id}
              role="radio"
              aria-checked={active}
              onClick={() => setLocale(o.id)}
              dir={o.id === "ar" ? "rtl" : "ltr"}
              lang={o.id}
              className={`flex w-full items-center gap-4 rounded-[20px] p-5 text-start transition ${active ? "bg-paper shadow-lift ring-2 ring-accent" : "bg-paper/70 ring-1 ring-line hover:ring-line-strong"}`}
            >
              <span className={`grid size-12 place-items-center rounded-2xl text-lg font-semibold ${o.id === "en" ? "bg-icy" : "bg-mint"}`}>
                {o.id === "en" ? "Aa" : "أب"}
              </span>
              <span className="flex-1">
                <span className="block text-[17px] font-semibold">{o.label}</span>
                <span className="mt-0.5 block text-[13px] text-muted">{o.sample}</span>
              </span>
              <span className={`grid size-6 place-items-center rounded-full transition ${active ? "bg-accent text-on-accent" : "ring-1 ring-line-strong"}`}>
                {active && <Icon name="check" size={15} strokeWidth={2.5} />}
              </span>
            </button>
          );
        })}
      </div>
    </Screen>
  );
}
