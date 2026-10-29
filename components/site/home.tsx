"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { Picture } from "./blocks";
import { ProductLineup } from "./product-lineup";
import { frame, type } from "./styles";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

/**
 * Waterline hero. Two flat fields meet at the seam; the headline sits across it, accent ink above
 * the water and deep ink below. Two stacked copies, each clipped to its own field.
 */
function Hero() {
  const t = useTranslations("site.home.hero");
  const lines = [t("line1"), t("line2")];

  const headline = (tone: string, hidden = false) => (
    <div
      aria-hidden={hidden || undefined}
      className={`${type.hero} absolute inset-x-0 top-[calc(var(--seam)-1.5*var(--lh)*var(--fs))] text-center ${tone}`}
      style={{ lineHeight: "var(--lh)" }}
    >
      {hidden ? (
        lines.map((l, i) => (
          <span key={i} className="mask-line" style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
            <span>{l}</span>
          </span>
        ))
      ) : (
        <h1>
          {lines.map((l, i) => (
            <span key={i} className="mask-line" style={{ "--d": `${i * 110}ms` } as React.CSSProperties}>
              <span>{l}</span>
            </span>
          ))}
        </h1>
      )}
    </div>
  );

  return (
    <section
      className="hero-waterline relative min-h-[600px] overflow-hidden [--fs:clamp(38px,10vw,148px)] [--lh:0.92] [--seam:46%] md:[--seam:50%] rtl:[--lh:1.18]"
      style={{ height: "calc(100svh - 72px)" }}
    >
      <div className="absolute inset-x-0 top-0 h-[var(--seam)] bg-mist" />
      <div className="absolute inset-x-0 top-[var(--seam)] bottom-0 bg-mint" />

      <div className="absolute inset-0 [clip-path:inset(0_0_calc(100%-var(--seam))_0)]">
        <div className={`${frame} relative size-full`}>{headline("text-accent")}</div>
      </div>
      <div className="absolute inset-0 [clip-path:inset(var(--seam)_0_0_0)]">
        <div className={`${frame} relative size-full`}>{headline("text-ink", true)}</div>
      </div>

      <div className={`${frame} absolute inset-x-0 bottom-0 pb-8 md:pb-10`}>
        <div className="fade-up flex flex-col gap-6 md:flex-row md:items-end md:justify-between" style={{ "--d": "420ms" } as React.CSSProperties}>
          <p className={`${type.lead} max-w-[40ch] text-ink`}>{t("body")}</p>
          <div className="flex flex-wrap items-center gap-3">
            <ButtonLink href="/products/" size="md" variant="secondary" className="h-14 px-6">
              {t("secondary")}
            </ButtonLink>
            <ButtonLink href="/connect/" size="md" className="h-14 px-7">
              {t("cta")}
            </ButtonLink>
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
      <div className={`${frame} grid min-h-[100svh] gap-12 py-24 md:grid-cols-12 md:py-32`}>
        <div className="flex flex-col justify-between gap-16 md:col-span-9">
          <p className="text-[clamp(30px,4.2vw,60px)] leading-[1.06] font-semibold tracking-[-0.025em]">
            {lines.map((l, i) => (
              <span
                key={i}
                data-reveal
                style={{ ...d(i), paddingInlineStart: `${i * 5.4}%` }}
                className={`block ${inks[i]}`}
              >
                {l}
              </span>
            ))}
          </p>
          <p data-reveal className={`${type.small} max-w-[52ch] text-mist/80`}>
            {t("note")}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4 md:col-span-3 md:grid-cols-1 md:content-start">
          <Picture name="muskistreet1900" className="aspect-[3/4] md:aspect-[4/5]" caption={t("cap1")} imgClassName="grayscale" />
          <Picture name="cairostreet1900" className="aspect-[3/4] md:aspect-[4/5]" caption={t("cap2")} imgClassName="grayscale" />
        </div>
      </div>
    </section>
  );
}

function Lineup() {
  const t = useTranslations("site.home.lineup");
  return (
    <section aria-labelledby="lineup-title" className="bg-mist">
      <div className={`${frame} grid gap-12 py-24 md:grid-cols-12 md:py-32`}>
        <div className="md:col-span-4">
          <h2 id="lineup-title" data-reveal className={`${type.h2} max-w-[12ch]`}>
            {t("title")}
          </h2>
          <p data-reveal style={d(1)} className={`${type.body} mt-6 max-w-[40ch] text-ink-2`}>
            {t("body")}
          </p>
          <Link href="/products/" data-reveal style={d(2)} className="mt-8 inline-flex items-center gap-2 text-[16px] font-semibold text-accent hover:text-accent-strong">
            {t("all")}
            <Icon name="chevron" size={18} className="rtl:-scale-x-100" />
          </Link>
        </div>
        <div data-reveal style={d(1)} className="md:col-span-8">
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
        <p className="w-fit rounded-full bg-ink/70 px-4 py-2 text-[14px] text-mist">{t("caption")}</p>
      </div>
    </section>
  );
}

/** Two giant words compared: where buying a policy used to begin, and where it begins now */
function Showcase() {
  const t = useTranslations("site.home.showcase");
  const specimen = (word: string, caption: string, inverse: boolean) => (
    <div className={`relative h-[38svh] overflow-hidden md:h-[min(46vw,560px)] ${inverse ? "max-md:bg-ink max-md:text-mist" : ""}`}>
      <p className="relative z-10 px-1 pt-4 text-[15px] font-medium md:pt-0">{caption}</p>
      <p aria-hidden="true" className="mt-2 text-[clamp(120px,24vw,360px)] leading-[0.8] font-semibold tracking-[-0.06em] whitespace-nowrap">
        {word}
      </p>
    </div>
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
            <ButtonLink href="/connect/" size="md" className="mt-6 h-12">
              {t("cta")}
            </ButtonLink>
          </div>
        </div>
        <div className="mt-[10vh] grid gap-6 md:grid-cols-2 md:gap-8">
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
            <p data-reveal style={d(1)} className={`${type.body} mt-6 max-w-[48ch] text-ink-2`}>
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
                <td className="text-[16px] text-ink-2 md:w-[30%] md:px-4 md:py-4">{r.who}</td>
                <td className="text-[16px] text-ink-2 md:px-4 md:py-4 md:text-end">{r.detail}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-[14px] text-muted">{t("source")}</p>
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
        <p data-reveal style={d(1)} className={`${type.body} mt-6 max-w-[56ch] text-ink-2`}>
          {t("body")}
        </p>
        <ol data-ui className="mt-16 flex flex-col gap-1.5 md:flex-row" aria-label={t("title")}>
          {stages.map((s, i) => (
            <li key={s.key} data-reveal style={{ ...d(i), flexGrow: s.grow, flexBasis: 0 }} className="min-w-0">
              <div className={`flex min-h-[96px] flex-col justify-between rounded-[var(--radius-sm)] p-5 md:h-[22vh] md:min-h-[160px] ${s.cls}`}>
                <span className="text-[clamp(20px,1.8vw,26px)] leading-tight font-semibold tracking-tight">{t(`${s.key}.time`)}</span>
              </div>
              <p className="mt-4 max-w-[26ch] text-[16px] leading-snug text-ink">
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
                <dt className="text-[14px] text-muted">{f.label}</dt>
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
            <Link href="/about/" data-reveal style={d(2)} className="mt-8 inline-flex items-center gap-2 text-[16px] font-semibold text-accent hover:text-accent-strong">
              {t("more")}
              <Icon name="chevron" size={18} className="rtl:-scale-x-100" />
            </Link>
          </div>
        </div>
        <div className="mt-24 grid gap-12 md:grid-cols-12">
          <Picture name="nileskyline" className="aspect-[16/10] md:col-span-4" caption={t("caption")} />
          {doors.map((door, i) => (
            <div key={door.title} data-reveal style={d(i)} className="md:col-span-4">
              <h3 className={type.h3}>{door.title}</h3>
              <p className={`${type.body} mt-2 text-ink-2`}>{t(i === 0 ? "investorsBody" : "partnersBody")}</p>
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
