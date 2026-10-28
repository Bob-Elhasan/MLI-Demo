"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";
import { useLocale } from "@/lib/store/locale";

// Skeleton only. The full website (Products, IR, About, Partners, Contact) is the next slice.
export default function SiteHome() {
  const t = useTranslations("brand");
  const tc = useTranslations("common");
  const toggle = useLocale((s) => s.toggle);
  return (
    <main className="min-h-dvh">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 md:px-8">
        <Wordmark />
        <nav className="hidden gap-7 text-[15px] font-medium text-ink-2 md:flex">
          <span>Products</span>
          <span>Investor Relations</span>
          <span>About Us</span>
          <span>Partners</span>
        </nav>
        <div className="flex items-center gap-3">
          <button onClick={toggle} className="text-[14px] font-semibold text-accent">{tc("language")}</button>
          <ButtonLink href="/connect" size="md">Get MLI Connect</ButtonLink>
        </div>
      </header>
      <section className="mx-auto max-w-6xl px-4 py-24 md:px-8">
        <p className="text-[14px] font-semibold text-accent">{t("parent")}</p>
        <h1 className="mt-3 max-w-2xl text-[44px] leading-[1.05] font-semibold tracking-tight md:text-[60px]">Cover That Pays When It Matters, Since 1900</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          <ButtonLink href="/connect" size="md">Get MLI Connect</ButtonLink>
          <ButtonLink href="/app" size="md" variant="secondary">Open App Demo</ButtonLink>
        </div>
        <p className="mt-16 text-[13px] text-muted">
          Website skeleton. Previous prototype kept for reference in <Link className="underline" href="https://github.com/Bob-Elhasan/MLI-Demo/tree/main/legacy">legacy/</Link>.
        </p>
      </section>
    </main>
  );
}
