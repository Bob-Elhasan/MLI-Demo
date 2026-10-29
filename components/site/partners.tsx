"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { partnersNav } from "@/lib/mock/site/nav";
import type { PictureKey } from "@/lib/mock/site/pictures";
import { BigList, Faq, FactRows, PageHead, Picture, PlaceholderNote, Section, SubNav, type Field } from "./blocks";
import { IntentForm } from "./intent-form";
import { frame, type } from "./styles";

type Row = { label: string; value: string; note?: string };
const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

function PartnersShell({ page, field, picture, children }: { page: string; field: Field; picture?: PictureKey; children: React.ReactNode }) {
  const t = useTranslations("site.partners");
  return (
    <>
      <PageHead title={t(`${page}.title`)} body={t(`${page}.body`)} field={field} picture={picture}>
        {page !== "join" && (
          <ButtonLink href="/partners/become-a-partner/" size="md" className="h-14 px-7">
            {t("cta")}
          </ButtonLink>
        )}
      </PageHead>
      <SubNav items={partnersNav} label={t("navLabel")} />
      {children}
    </>
  );
}

export function PartnersOverview() {
  const t = useTranslations("site.partners.overview");
  const tn = useTranslations("site.nav");
  return (
    <PartnersShell page="overview" field="aqua" picture="qasralnilbridge">
      <section aria-labelledby="paths-title" className="bg-mist">
        <div className={`${frame} py-24 md:py-32`}>
          <h2 id="paths-title" data-reveal className={`${type.h2} max-w-[16ch]`}>
            {t("pathsTitle")}
          </h2>
          <ul className="mt-12">
            {partnersNav.slice(1).map((l, i) => (
              <li key={l.href} data-reveal style={d(i)}>
                <Link
                  href={l.href}
                  className={`group grid gap-2 rounded-[var(--radius-md)] px-4 py-6 transition-colors hover:bg-paper md:grid-cols-12 md:items-baseline md:px-6 ${i % 2 === 0 ? "bg-ink/[0.04]" : ""}`}
                >
                  <span className="text-[clamp(24px,2.6vw,36px)] leading-tight font-semibold tracking-tight md:col-span-5">{tn(l.key)}</span>
                  <span className="text-[17px] leading-relaxed text-ink-2 md:col-span-6">{t(`paths.${l.key}`)}</span>
                  <Icon name="chevron" size={22} className="hidden text-accent transition-transform group-hover:translate-x-1 md:col-span-1 md:block md:justify-self-end rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <Section id="today" title={t("todayTitle")} intro={t("todayBody")} field="paper">
        <FactRows rows={t.raw("today") as Row[]} />
        <div className="mt-5">
          <PlaceholderNote>{t("todayNote")}</PlaceholderNote>
        </div>
      </Section>
    </PartnersShell>
  );
}

function PartnerDetail({ page, field, picture }: { page: "distribution" | "bank" | "corporate"; field: Field; picture: PictureKey }) {
  const t = useTranslations(`site.partners.${page}`);
  const tc = useTranslations("site.partners");
  const steps = t.raw("steps") as { name: string; body: string }[];
  return (
    <PartnersShell page={page} field={field}>
      <section aria-labelledby="offer-title" className="bg-mist">
        <div className={`${frame} grid gap-12 py-24 md:grid-cols-12 md:py-32`}>
          <div className="md:col-span-5">
            <h2 id="offer-title" data-reveal className={`${type.h2} max-w-[12ch]`}>
              {t("offerTitle")}
            </h2>
            <Picture name={picture} className="mt-10 aspect-[4/3]" caption={tc("pictureCaption")} />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <BigList items={t.raw("offer") as string[]} />
          </div>
        </div>
      </section>
      <section aria-labelledby="steps-title" className="bg-ink text-mist">
        <div className={`${frame} py-24 md:py-32`}>
          <h2 id="steps-title" data-reveal className={`${type.h2} max-w-[16ch]`}>
            {tc("stepsTitle")}
          </h2>
          <ol className="mt-14 flex flex-col gap-1.5 md:flex-row">
            {steps.map((s, i) => (
              <li key={s.name} data-reveal style={{ ...d(i), flexGrow: i === steps.length - 1 ? 2 : 1, flexBasis: 0 }} className="min-w-0">
                <div className={`flex min-h-[88px] items-start rounded-[var(--radius-sm)] p-5 md:min-h-[140px] ${["bg-mint", "bg-aqua", "bg-icy", "bg-lavender"][i % 4]} text-ink`}>
                  <span className="text-[clamp(20px,1.8vw,26px)] leading-tight font-semibold tracking-tight">{s.name}</span>
                </div>
                <p className="mt-4 max-w-[30ch] text-[16px] leading-snug text-mist/85">{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Section id="fit" title={t("fitTitle")} field="paper">
        <FactRows rows={t.raw("fit") as Row[]} />
      </Section>
      <Section id="faq" title={tc("faqTitle")}>
        <Faq items={t.raw("faqs") as { q: string; a: string }[]} />
      </Section>
    </PartnersShell>
  );
}

export const PartnersDistribution = () => <PartnerDetail page="distribution" field="mint" picture="muskistreet1900" />;
export const PartnersBank = () => <PartnerDetail page="bank" field="icy" picture="qasralnilbridge" />;
export const PartnersCorporate = () => <PartnerDetail page="corporate" field="lavender" picture="nileskyline" />;

export function PartnersJoin() {
  const t = useTranslations("site.partners.join");
  return (
    <PartnersShell page="join" field="lilac">
      <section aria-labelledby="join-title" className="bg-mist">
        <div className={`${frame} grid gap-12 py-24 md:grid-cols-12 md:py-32`}>
          <div className="md:col-span-4">
            <h2 id="join-title" data-reveal className={`${type.h2} max-w-[12ch]`}>
              {t("formTitle")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} mt-6 text-ink-2`}>
              {t("formBody")}
            </p>
            <div className="mt-10">
              <BigList items={t.raw("expect") as string[]} />
            </div>
          </div>
          <div data-reveal style={d(1)} className="rounded-[var(--radius-lg)] bg-paper p-6 md:col-span-7 md:col-start-6 md:p-10">
            <IntentForm kind="partner" />
          </div>
        </div>
      </section>
    </PartnersShell>
  );
}
