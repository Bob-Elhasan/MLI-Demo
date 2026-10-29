"use client";

import { useTranslations } from "next-intl";
import { AppLinkForm } from "./app-link-form";
import { CityStrip, Faq, PageHead, PlaceholderNote, Section } from "./blocks";
import { siteButton } from "./button";
import { IntentForm } from "./intent-form";
import { frame, type } from "./styles";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

export function ContactPage() {
  const t = useTranslations("site.contact");
  const ways = t.raw("ways") as { label: string; value: string; href?: string; note: string }[];
  return (
    <>
      <PageHead title={t("title")} body={t("body")} field="aqua" picture="nileskyline">
        <div className="flex flex-wrap gap-3">
          <a href="tel:19446" className={siteButton("primary")}>
            {t("call")}
          </a>
          <a href="#form-title" className={siteButton("quiet")}>
            {t("write")}
          </a>
        </div>
      </PageHead>
      <section aria-labelledby="form-title" className="bg-mist">
        <div className={`${frame} grid gap-14 py-20 md:grid-cols-12 md:py-28`}>
          <div className="md:col-span-4">
            <h2 id="form-title" data-reveal className={`${type.h2} max-w-[12ch]`}>
              {t("formTitle")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} mt-6 text-ink`}>
              {t("formBody")}
            </p>
            <ul className="mt-10 space-y-6">
              {ways.map((w, i) => (
                <li key={w.label} data-reveal style={d(i)}>
                  <p className="text-[16px] text-muted">{w.label}</p>
                  {w.href ? (
                    <a href={w.href} className="mt-1 block text-[26px] leading-tight font-semibold tracking-tight text-accent hover:text-accent-strong" dir="ltr">
                      {w.value}
                    </a>
                  ) : (
                    <p className="mt-1 text-[26px] leading-tight font-semibold tracking-tight">{w.value}</p>
                  )}
                  <p className="mt-1 text-[16px] text-ink">{w.note}</p>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <PlaceholderNote>{t("waysNote")}</PlaceholderNote>
            </div>
          </div>
          <div data-reveal style={d(1)} className="rounded-[var(--radius-lg)] bg-paper p-6 md:col-span-7 md:col-start-6 md:p-10">
            <IntentForm kind="general" />
          </div>
        </div>
      </section>
      <section aria-labelledby="app-title" className="bg-mint">
        <div className={`${frame} grid gap-10 py-20 md:grid-cols-12 md:py-28`}>
          <div className="md:col-span-5">
            <h2 id="app-title" data-reveal className={`${type.h2} max-w-[12ch]`}>
              {t("appTitle")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} mt-6 text-ink`}>
              {t("appBody")}
            </p>
          </div>
          <div data-reveal style={d(1)} className="md:col-span-6 md:col-start-7">
            <AppLinkForm />
          </div>
        </div>
      </section>
      <Section id="faq" title={t("faqTitle")} field="mist">
        <Faq items={t.raw("faqs") as { q: string; a: string }[]} />
      </Section>
      <CityStrip seed="contact" exclude="nileskyline" />
    </>
  );
}
