"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon, type IconName } from "@/components/ui/icon";
import { Wordmark } from "@/components/ui/wordmark";
import { useLocale } from "@/lib/store/locale";
import { useJourney } from "@/lib/store/journey";
import { getProduct, priceQuote } from "@/lib/mock/products";
import { ageFrom } from "@/lib/mock/kyc";

/** Presenter controls, laptop only. Lets Bobby jump around the demo without clicking through everything. */
export function DemoPanel() {
  const t = useTranslations("demo");
  const router = useRouter();
  const { locale, setLocale } = useLocale();

  const verify = () => {
    const s = useJourney.getState();
    s.set({ phone: s.phone || "1001234567", phoneVerified: true, idConfirmed: true, livenessPassed: true });
  };

  const jumps: { label: string; icon: IconName; go: () => void }[] = [
    { label: t("jumpStart"), icon: "sparkle", go: () => router.push("/app") },
    {
      label: t("jumpKyc"),
      icon: "idCard",
      go: () => {
        useJourney.getState().set({ phone: "1001234567", phoneVerified: true });
        router.push("/app/kyc");
      },
    },
    {
      label: t("jumpProducts"),
      icon: "shield",
      go: () => {
        verify();
        router.push("/app/products");
      },
    },
    {
      label: t("jumpHome"),
      icon: "home",
      go: () => {
        verify();
        const s = useJourney.getState();
        if (!s.policy) {
          const product = getProduct("term-life")!;
          const quote = priceQuote(product, ageFrom(s.idFields.dateOfBirth), product.cover.default, product.term.default);
          s.set({ productId: product.id, quote });
          s.issuePolicy();
        }
        router.push("/app/home");
      },
    },
  ];

  return (
    <aside className="hidden w-64 shrink-0 flex-col gap-6 md:flex">
      <div>
        <Wordmark product />
        <p className="mt-2 text-[13px] text-muted">{t("panelTitle")}</p>
      </div>

      <section className="space-y-2">
        <h2 className="text-[12px] font-semibold tracking-wide text-muted uppercase">{t("language")}</h2>
        <div className="grid grid-cols-2 rounded-full bg-paper p-1 ring-1 ring-line">
          {(["en", "ar"] as const).map((l) => (
            <button
              key={l}
              onClick={() => setLocale(l)}
              className={`h-9 rounded-full text-sm font-semibold transition ${locale === l ? "bg-ink text-mist" : "text-ink-2 hover:bg-ink/5"}`}
            >
              {l === "en" ? "English" : "العربية"}
            </button>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="text-[12px] font-semibold tracking-wide text-muted uppercase">{t("jump")}</h2>
        <div className="flex flex-col gap-1">
          {jumps.map((j) => (
            <button
              key={j.label}
              onClick={j.go}
              className="flex h-11 items-center gap-3 rounded-[14px] px-3 text-start text-[15px] font-medium text-ink-2 transition hover:bg-paper hover:shadow-card"
            >
              <Icon name={j.icon} size={20} className="text-accent" />
              {j.label}
            </button>
          ))}
        </div>
      </section>

      <button
        onClick={() => {
          useJourney.getState().reset();
          router.push("/app");
        }}
        className="flex h-11 items-center justify-center gap-2 rounded-full bg-paper text-sm font-semibold text-ink ring-1 ring-line-strong transition hover:ring-ink/40"
      >
        <Icon name="refresh" size={18} />
        {t("reset")}
      </button>

      <p className="flex gap-2 text-[13px] leading-relaxed text-muted">
        <Icon name="camera" size={18} className="mt-0.5 shrink-0" />
        {t("cameraHint")}
      </p>

      <nav className="mt-auto flex gap-4 text-[13px] font-medium text-muted">
        <Link href="/" className="hover:text-ink">{t("site")}</Link>
        <Link href="/connect" className="hover:text-ink">{t("connect")}</Link>
      </nav>
    </aside>
  );
}
