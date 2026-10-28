"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Toggle } from "@/components/ui/toggle";
import { Group, Row, SectionHead, TabTitle } from "@/components/app/list";
import { useJourney } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

export default function More() {
  const t = useTranslations("more");
  const router = useRouter();
  const { locale, toggle } = useLocale();
  const { faceUnlock, set, reset, phone } = useJourney();

  return (
    <>
      <TabTitle title={t("title")} />
      <Group className="mt-2">
        <Row title={t("payments")} href="/app/pay" />
        <Row title={t("claims")} href="/app/claims" />
        <Row title={t("checkIn")} href="/app/check-in" />
        <Row title={t("notifications")} href="/app/notifications" />
      </Group>

      <SectionHead title={t("settings")} />
      <Group>
        <Row title={t("language")} value={locale === "en" ? "English" : "العربية"} onClick={toggle} />
        <div className="flex min-h-14 items-center justify-between gap-3 border-b border-line px-4 py-3 last:border-0">
          <span className="text-[15px] font-medium">{t("faceUnlock")}</span>
          <Toggle checked={faceUnlock} onChange={(v) => set({ faceUnlock: v })} label={t("faceUnlock")} />
        </div>
        <Row title={t("account")} value={<span dir="ltr">+20 {phone || "100 123 4567"}</span>} chevron={false} />
      </Group>

      <SectionHead title={t("help")} />
      <p className="rounded-[20px] bg-paper p-4 text-[14px] leading-relaxed text-ink-2 ring-1 ring-line">{t("helpBody")}</p>

      <button
        onClick={() => {
          reset();
          router.push("/app");
        }}
        className="mt-8 h-12 w-full rounded-full text-[15px] font-semibold text-danger hover:bg-danger-soft"
      >
        {t("signOut")}
      </button>
      <p className="mt-2 text-center text-[12px] text-muted">{t("version")}</p>
    </>
  );
}
