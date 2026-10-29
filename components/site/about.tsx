"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { SiteLink } from "./button";
import { Icon } from "@/components/ui/icon";
import { aboutNav } from "@/lib/mock/site/nav";
import type { PictureKey } from "@/lib/mock/site/pictures";
import { BigList, CityStrip, FactRows, PageHead, Picture, PlaceholderNote, Section, SubNav, type Field } from "./blocks";
import { frame, type } from "./styles";

type Row = { label: string; value: string; note?: string };
const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

function AboutShell({ page, field, picture, children }: { page: string; field: Field; picture?: PictureKey; children: React.ReactNode }) {
  const t = useTranslations("site.about");
  return (
    <>
      <PageHead title={t(`${page}.title`)} body={t(`${page}.body`)} field={field} picture={picture} />
      <SubNav items={aboutNav} label={t("navLabel")} />
      {children}
      <CityStrip seed={`about-${page}`} exclude={picture} />
    </>
  );
}

export function AboutCompany() {
  const t = useTranslations("site.about.company");
  return (
    <AboutShell page="company" field="mint" picture="cairostreet1900">
      <section aria-labelledby="who-title" className="bg-mist">
        <div className={`${frame} grid gap-12 py-24 lg:grid-cols-12 md:py-32`}>
          <div className="lg:col-span-7">
            <h2 id="who-title" data-reveal className={`${type.h2} max-w-[14ch]`}>
              {t("whoTitle")}
            </h2>
            {(t.raw("who") as string[]).map((p, i) => (
              <p key={i} data-reveal style={d(i + 1)} className={`${i === 0 ? type.lead : type.body} mt-6 max-w-[60ch]`}>
                {p}
              </p>
            ))}
          </div>
          <div data-reveal style={d(2)} className="lg:col-span-5">
            <FactRows rows={t.raw("facts") as Row[]} />
          </div>
        </div>
      </section>

      <section aria-label={t("bandLabel")} className="relative h-[60svh] min-h-[380px] overflow-hidden bg-ink">
        <Picture name="nileboats1900" className="absolute inset-0" imgClassName="drift" />
        <div className={`${frame} absolute inset-x-0 bottom-0 pb-6`}>
          <p className="w-fit rounded-full bg-ink/70 px-4 py-2 text-[16px] text-mist">{t("bandCaption")}</p>
        </div>
      </section>

      <Section id="values" title={t("valuesTitle")} intro={t("valuesBody")} field="paper">
        <BigList items={t.raw("values") as string[]} />
      </Section>

      <section aria-labelledby="next-title" className="bg-lavender">
        <div className={`${frame} grid gap-10 py-24 md:grid-cols-12 md:py-32`}>
          <h2 id="next-title" data-reveal className={`${type.h2} max-w-[13ch] md:col-span-5`}>
            {t("nextTitle")}
          </h2>
          <div data-reveal style={d(1)} className="md:col-span-6 md:col-start-7">
            {(t.raw("next") as string[]).map((p, i) => (
              <p key={i} className={`${i === 0 ? type.lead : type.body} ${i > 0 ? "mt-5 text-ink" : ""} max-w-[56ch]`}>
                {p}
              </p>
            ))}
            <div className="mt-8 flex flex-wrap gap-3">
              <SiteLink href="/connect/">
                {t("nextCta")}
              </SiteLink>
              <SiteLink href="/investor-relations/" variant="quiet">
                {t("nextIr")}
              </SiteLink>
            </div>
          </div>
        </div>
      </section>
    </AboutShell>
  );
}

export function AboutLeadership() {
  const t = useTranslations("site.about.leadership");
  const roles = t.raw("roles") as { role: string; remit: string }[];
  return (
    <AboutShell page="leadership" field="icy" picture="qasralnilbridge">
      <Section id="management" title={t("mgmtTitle")} intro={t("mgmtBody")}>
        <ul className="grid gap-2 sm:grid-cols-2">
          {roles.map((r, i) => (
            <li key={r.role} data-reveal style={d(i % 4)} className="rounded-[var(--radius-md)] bg-paper p-6">
              <p className="text-[16px] font-medium text-muted">{t("namePlaceholder")}</p>
              <p className="mt-2 text-[21px] leading-tight font-semibold tracking-tight">{r.role}</p>
              <p className="mt-3 text-[17px] leading-relaxed text-ink">{r.remit}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <PlaceholderNote>{t("placeholder")}</PlaceholderNote>
        </div>
      </Section>
      <section aria-labelledby="board-title" className="bg-ink text-mist">
        <div className={`${frame} grid gap-10 py-24 md:grid-cols-12 md:py-28`}>
          <h2 id="board-title" data-reveal className={`${type.h2} max-w-[14ch] md:col-span-6`}>
            {t("boardTitle")}
          </h2>
          <div data-reveal style={d(1)} className="md:col-span-5 md:col-start-8">
            <p className={`${type.lead} text-mist`}>{t("boardBody")}</p>
            <Link href="/investor-relations/governance/" className="mt-8 inline-flex items-center gap-2 text-[17px] font-semibold text-mint hover:text-aqua">
              {t("boardLink")}
              <Icon name="chevron" size={18} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
      </section>
    </AboutShell>
  );
}

export function AboutHistory() {
  const t = useTranslations("site.about.history");
  const events = t.raw("events") as { year: string; title: string; body: string; verify?: boolean }[];
  return (
    <AboutShell page="history" field="lavender" picture="cairopostcard1903">
      <section aria-labelledby="timeline-title" className="bg-mist">
        <div className={`${frame} py-24 md:py-32`}>
          <div className="grid gap-10 md:grid-cols-12">
            <h2 id="timeline-title" data-reveal className={`${type.h2} max-w-[12ch] md:col-span-5`}>
              {t("timelineTitle")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.lead} md:col-span-6 md:col-start-7`}>
              {t("timelineBody")}
            </p>
          </div>
          <ol className="mt-16 space-y-6 md:space-y-0">
            {events.map((e, i) => (
              <li
                key={i}
                data-reveal
                className={`grid gap-2 rounded-[var(--radius-md)] px-4 py-6 md:grid-cols-12 md:gap-8 md:px-6 ${i % 2 === 0 ? "bg-ink/[0.04]" : ""}`}
              >
                <span className="text-[clamp(36px,4.2vw,60px)] leading-none font-semibold tracking-tight text-accent tabular md:col-span-3">{e.year}</span>
                <span className="md:col-span-4">
                  <h3 className="text-[21px] leading-tight font-semibold tracking-tight">{e.title}</h3>
                  {e.verify && <span className="mt-2 block text-[16px] text-warning">{t("verify")}</span>}
                </span>
                <span className="text-[17px] leading-relaxed text-ink md:col-span-5">{e.body}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section aria-labelledby="then-title" className="bg-paper">
        <div className={`${frame} grid gap-10 py-24 md:grid-cols-12 md:py-32`}>
          <div className="md:col-span-4">
            <h2 id="then-title" data-reveal className={`${type.h2} max-w-[12ch]`}>
              {t("thenTitle")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} mt-6 text-ink`}>
              {t("thenBody")}
            </p>
          </div>
          <Picture name="muskistreet1900" className="aspect-[4/5] md:col-span-4" caption={t("cap1")} imgClassName="grayscale" />
          <Picture name="nilometerroda" className="aspect-[4/5] md:col-span-4" caption={t("cap2")} />
        </div>
      </section>
    </AboutShell>
  );
}
