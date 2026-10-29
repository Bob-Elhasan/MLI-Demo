"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { SiteLink } from "./button";
import { Icon } from "@/components/ui/icon";
import { Clip, Picture } from "./blocks";
import { ProductLineup } from "./product-lineup";
import { frame, type } from "./styles";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

/**
 * Waterline hero. Two flat fields meet at the seam; the headline sits across it, accent ink above
 * the water and deep ink below. One headline: the lower part of the second line is repainted in ink
 * by a pseudo element clipped at the seam (see .waterline-line in site.css), so no text is duplicated.
 */
function Hero() {
  const t = useTranslations("site.home.hero");
  const lines = [t("line1"), t("line2")];

  return (
    <section
      className="hero-waterline relative min-h-[600px] overflow-hidden [--fs:clamp(40px,10.4vw,150px)] [--lh:0.92] [--seam:46%] md:[--seam:50%]"
      style={{ height: "calc(100svh - 72px)" }}
    >
      <div className="absolute inset-x-0 top-0 h-[var(--seam)] bg-mist" />
      <div className="absolute inset-x-0 top-[var(--seam)] bottom-0 bg-mint" />

      <div className={`${frame} absolute inset-x-0 top-[calc(var(--seam)-1.5*var(--lh)*var(--fs)-0.1*var(--fs))]`}>
        <h1 className={`${type.hero} text-center text-accent`} style={{ lineHeight: "var(--lh)" }}>
          {lines.map((l, i) => (
            <span key={i} className="mask-line" style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
              <span className={i === 1 ? "waterline-line" : undefined} data-text={i === 1 ? l : undefined}>
                {l}
              </span>
            </span>
          ))}
        </h1>
      </div>

      <div className={`${frame} absolute inset-x-0 bottom-0 pb-8 md:pb-10`}>
        <div className="fade-up flex flex-col gap-6 md:flex-row md:items-end md:justify-between" style={{ "--d": "420ms" } as React.CSSProperties}>
          <p className={`${type.lead} max-w-[40ch] text-ink`}>{t("body")}</p>
          <div className="flex flex-wrap items-center gap-3">
            <SiteLink href="/products/" variant="quiet">
              {t("secondary")}
            </SiteLink>
            <SiteLink href="/connect/">
              {t("cta")}
            </SiteLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/** Staircase statement on the ink field, with two pictures of the city the company was founded in */
function Statement() {
  const t = useTranslations("site.home.statement");
  const lines = [t("l1"), t("l2"), t("l3"), t("l4"), t("l5")];
  const inks = ["text-mint", "text-aqua", "text-icy", "text-lavender", "text-lilac"];
  return (
    <section aria-label={t("label")} className="bg-ink text-mist">
      <div className={`${frame} grid gap-14 py-24 lg:grid-cols-12 lg:items-center lg:py-32`}>
        <div className="lg:col-span-6">
          <p className="text-[clamp(24px,2.5vw,36px)] leading-[1.2] font-semibold tracking-[-0.015em]">
            {lines.map((l, i) => (
              <span key={i} data-reveal style={{ ...d(i), paddingInlineStart: `${i * 7}%` }} className={`block ${inks[i]}`}>
                {l}
              </span>
            ))}
          </p>
          <p data-reveal style={d(5)} className={`${type.body} mt-14 max-w-[48ch] text-mist/85`}>
            {t("note")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 lg:col-span-6">
          <Picture name="muskistreet1900" className="aspect-[3/4]" caption={t("cap1")} imgClassName="grayscale" />
          <Picture name="cairostreet1900" className="aspect-[3/4] lg:mt-16" caption={t("cap2")} imgClassName="grayscale" />
        </div>
      </div>
    </section>
  );
}

function Lineup() {
  const t = useTranslations("site.home.lineup");
  return (
    <section aria-labelledby="lineup-title" className="bg-mist">
      <div className={`${frame} grid gap-12 py-24 lg:grid-cols-12 lg:py-32`}>
        <div className="lg:col-span-4">
          <h2 id="lineup-title" data-reveal className={`${type.h2} max-w-[12ch]`}>
            {t("title")}
          </h2>
          <p data-reveal style={d(1)} className={`${type.body} mt-6 max-w-[40ch] text-ink`}>
            {t("body")}
          </p>
          <Link href="/products/" data-reveal style={d(2)} className="mt-8 inline-flex items-center gap-2 text-[17px] font-semibold text-accent hover:text-accent-strong">
            {t("all")}
            <Icon name="chevron" size={18} className="rtl:-scale-x-100" />
          </Link>
        </div>
        <div data-reveal style={d(1)} className="lg:col-span-8">
          <ProductLineup />
        </div>
      </div>
    </section>
  );
}

/** One full-bleed picture: a rest between the type sections */
function RiverBand() {
  const t = useTranslations("site.home.band");
  return (
    <section aria-label={t("label")} className="relative h-[70svh] min-h-[420px] overflow-hidden bg-ink">
      <Picture name="nileboats1900" className="absolute inset-0" imgClassName="drift grayscale-[0.2]" />
      <div className={`${frame} absolute inset-x-0 bottom-0 pb-6`}>
        <p className="w-fit rounded-full bg-ink/70 px-4 py-2 text-[16px] text-mist">{t("caption")}</p>
      </div>
    </section>
  );
}

/** Two giant words compared: where buying a policy used to begin, and where it begins now */
function Showcase() {
  const t = useTranslations("site.home.showcase");
  const specimen = (word: string, caption: string, inverse: boolean) => (
    <figure>
      <div aria-hidden="true" className={inverse ? "max-md:bg-ink max-md:px-3 max-md:py-2 max-md:text-mist" : ""}>
        {/* Shown whole: a cropped word read as a rendering bug, and would slice Arabic letterforms */}
        <span className="block text-[22vw] leading-[1.05] font-semibold tracking-[-0.04em] whitespace-nowrap md:text-[12vw]">{word}</span>
      </div>
      <figcaption className={`${type.body} mt-4 font-medium`}>{caption}</figcaption>
    </figure>
  );
  return (
    <section aria-labelledby="showcase-title" className="overflow-hidden bg-lavender">
      <div className={`${frame} pt-24 md:pt-32`}>
        <div className="grid gap-6 md:grid-cols-12">
          <h2 id="showcase-title" data-reveal className={`${type.h2} max-w-[13ch] md:col-span-6`}>
            {t("title")}
          </h2>
          <div data-reveal style={d(1)} className="md:col-span-6">
            <p className={`${type.body} max-w-[52ch]`}>{t("body")}</p>
          </div>
        </div>
        <div className="mt-[10vh] grid gap-10 pb-20 md:grid-cols-2 md:gap-8 md:pb-28">
          <span className="sr-only">
            {t("wordThen")}, {t("wordNow")}
          </span>
          {specimen(t("wordThen"), t("captionThen"), false)}
          {specimen(t("wordNow"), t("captionNow"), true)}
        </div>
      </div>
    </section>
  );
}

/** Facts anyone can check, set as a table with no rules */
function Proof() {
  const t = useTranslations("site.home.proof");
  const rows = t.raw("rows") as { year: string; what: string; who: string; detail: string }[];
  return (
    <section aria-labelledby="proof-title" className="bg-mist">
      <div className={`${frame} py-24 md:py-32`}>
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-7">
            <h2 id="proof-title" data-reveal className={`${type.h2} max-w-[14ch]`}>
              {t("title")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} mt-6 max-w-[48ch] text-ink`}>
              {t("body")}
            </p>
          </div>
          <Picture name="cairopostcard1903" className="aspect-[3/2] md:col-span-5" caption={t("caption")} />
        </div>
        <table data-reveal className="mt-16 w-full border-collapse text-start">
          <caption className="sr-only">{t("title")}</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">{t("cols.year")}</th>
              <th scope="col">{t("cols.what")}</th>
              <th scope="col">{t("cols.who")}</th>
              <th scope="col">{t("cols.detail")}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i} className={`grid gap-1 px-4 py-4 md:table-row ${i % 2 === 0 ? "bg-ink/[0.045]" : ""}`}>
                <td className="text-[22px] font-semibold tabular md:w-[14%] md:px-4 md:py-4 md:text-[17px] md:font-medium">{r.year}</td>
                <td className="text-[17px] font-medium md:w-[34%] md:px-4 md:py-4">{r.what}</td>
                <td className="text-[17px] text-ink md:w-[30%] md:px-4 md:py-4">{r.who}</td>
                <td className="text-[17px] text-ink md:px-4 md:py-4 md:text-end">{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-[16px] text-muted">{t("source")}</p>
      </div>
    </section>
  );
}

/** The app's own progress bar, enlarged: verifying is a sliver, being covered is the rest */
function Stages() {
  const t = useTranslations("site.home.stages");
  const stages = [
    { key: "verify", grow: 14, cls: "bg-mint text-ink" },
    { key: "choose", grow: 18, cls: "bg-aqua text-ink" },
    { key: "sign", grow: 12, cls: "bg-lavender text-ink" },
    { key: "covered", grow: 56, cls: "bg-ink text-mist" },
  ];
  return (
    <section aria-labelledby="stages-title" className="bg-icy">
      <div className={`${frame} py-24 md:py-32`}>
        <h2 id="stages-title" data-reveal className={`${type.h2} max-w-[16ch]`}>
          {t("title")}
        </h2>
        <p data-reveal style={d(1)} className={`${type.body} mt-6 max-w-[56ch] text-ink`}>
          {t("body")}
        </p>
        <ol data-ui className="mt-16 flex flex-col gap-1.5 md:flex-row" aria-label={t("title")}>
          {stages.map((s, i) => (
            <li key={s.key} data-reveal style={{ ...d(i), flexGrow: s.grow, flexBasis: 0 }} className="min-w-0">
              <div className={`flex min-h-[96px] flex-col justify-between rounded-[var(--radius-sm)] p-5 md:h-[22vh] md:min-h-[160px] ${s.cls}`}>
                <span className="text-[clamp(20px,1.8vw,26px)] leading-tight font-semibold tracking-tight">{t(`${s.key}.time`)}</span>
              </div>
              <p className="mt-4 max-w-[26ch] text-[17px] leading-snug text-ink">
                <span className="font-semibold">{t(`${s.key}.name`)}.</span> {t(`${s.key}.body`)}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

/** Side facts and a wide paragraph, then the two doorways for investors and partners */
function About() {
  const t = useTranslations("site.home.about");
  const tn = useTranslations("site.nav");
  const facts = t.raw("facts") as { label: string; value: string }[];
  const doors = [
    {
      title: tn("investors"),
      links: [
        { href: "/investor-relations/financial-reports/", key: "irReports" },
        { href: "/investor-relations/disclosures/", key: "irDisclosures" },
        { href: "/investor-relations/governance/", key: "irGovernance" },
        { href: "/investor-relations/share-information/", key: "irShare" },
      ],
    },
    {
      title: tn("partners"),
      links: [
        { href: "/partners/distribution/", key: "partnersDistribution" },
        { href: "/partners/bancassurance/", key: "partnersBank" },
        { href: "/partners/corporate/", key: "partnersCorporate" },
        { href: "/partners/become-a-partner/", key: "partnersJoin" },
      ],
    },
  ];
  return (
    <section aria-labelledby="about-title" className="bg-paper">
      <div className={`${frame} py-24 md:py-32`}>
        <div className="grid gap-12 md:grid-cols-12">
          <dl data-reveal className="grid grid-cols-2 gap-6 md:col-span-4 md:grid-cols-1 md:content-start">
            {facts.map((f) => (
              <div key={f.label}>
                <dt className="text-[16px] text-muted">{f.label}</dt>
                <dd className="mt-1 text-[17px] font-semibold">{f.value}</dd>
              </div>
            ))}
          </dl>
          <div className="md:col-span-8">
            <h2 id="about-title" data-reveal className={`${type.h2} max-w-[16ch]`}>
              {t("title")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.lead} mt-8 max-w-[56ch]`}>
              {t("body")}
            </p>
            <Link href="/about/" data-reveal style={d(2)} className="mt-8 inline-flex items-center gap-2 text-[17px] font-semibold text-accent hover:text-accent-strong">
              {t("more")}
              <Icon name="chevron" size={18} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
        <div className="mt-24 grid gap-12 md:grid-cols-12">
          <Clip name="nileriver" className="md:col-span-4 [&>div]:aspect-[16/10]" caption={t("caption")} />
          {doors.map((door, i) => (
            <div key={door.title} data-reveal style={d(i)} className="min-w-0 md:col-span-4">
              <h3 className={type.h3}>{door.title}</h3>
              <p className={`${type.body} mt-2 text-ink`}>{t(i === 0 ? "investorsBody" : "partnersBody")}</p>
              <ul className="mt-6 space-y-1">
                {door.links.map((l) => (
                  <li key={l.href}>
                    <Link href={l.href} className="group flex items-center justify-between rounded-[var(--radius-sm)] px-3 py-3 text-[17px] font-medium transition-colors hover:bg-mist">
                      {tn(l.key)}
                      <Icon name="chevron" size={18} className="text-accent transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function HomePage() {
  return (
    <>
      <Hero />
      <Statement />
      <Lineup />
      <RiverBand />
      <Showcase />
      <Proof />
      <Stages />
      <About />
    </>
  );
}
