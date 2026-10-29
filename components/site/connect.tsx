"use client";

import Link from "next/link";
import { QRCodeSVG } from "qrcode.react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SiteLink } from "./button";
import { Icon, type IconName } from "@/components/ui/icon";
import { Wordmark } from "@/components/ui/wordmark";
import { useReveal } from "./chrome";
import { AppLinkForm } from "./app-link-form";
import { Clip, Faq, Picture } from "./blocks";
import { LocaleSwitch } from "./locale-switch";
import { frame, type } from "./styles";
import { useLocale } from "@/lib/store/locale";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

const APP_PRODUCTS = ["term-life", "maash-bokra", "family-protection"] as const;
type AppProduct = (typeof APP_PRODUCTS)[number];

/**
 * The app demo URL on whatever host and base path is serving this page. When the visitor arrived from a
 * product page (?product=), the QR and demo link open that product's calculator instead of the welcome screen.
 */
function useAppUrl() {
  const [url, setUrl] = useState("");
  const [product, setProduct] = useState<AppProduct>();
  useEffect(() => {
    const picked = new URLSearchParams(window.location.search).get("product") as AppProduct | null;
    const valid = picked && APP_PRODUCTS.includes(picked) ? picked : undefined;
    setProduct(valid);
    const here = `${window.location.origin}${window.location.pathname}`.replace(/connect\/?$/, "");
    setUrl(new URL(valid ? `app/products/${valid}/` : "app/", here.endsWith("/") ? here : `${here}/`).href);
  }, []);
  return { url, product };
}

function QrCard({ url, compact = false }: { url: string; compact?: boolean }) {
  const t = useTranslations("connect.qr");
  return (
    <div className={`flex items-center gap-6 rounded-[var(--radius-lg)] bg-paper ${compact ? "p-5" : "p-6"}`}>
      <div className="grid size-[132px] shrink-0 place-items-center rounded-[var(--radius-sm)] bg-mist p-2" dir="ltr">
        {url ? <QRCodeSVG value={url} size={116} fgColor="#1f1a22" bgColor="transparent" title={t("alt")} /> : <span className="size-[116px]" />}
      </div>
      <div>
        <p className="text-[19px] leading-tight font-semibold tracking-tight">{t("title")}</p>
        <p className="mt-2 text-[16px] leading-relaxed text-ink">{t("body")}</p>
        <SiteLink href="/app/" size="sm" className="mt-4">
          {t("laptop")}
        </SiteLink>
      </div>
    </div>
  );
}

/** PLACEHOLDER store badges, drawn in code. Replace with the official badges once the app is listed. */
function StoreBadges() {
  const t = useTranslations("connect.stores");
  const badge = (store: "apple" | "google") => (
    <Link
      href="/app/"
      data-placeholder="store-badge"
      className="inline-flex h-14 min-w-[172px] items-center gap-3 rounded-[14px] bg-ink px-4 text-mist transition active:scale-[0.98]"
    >
      <Icon name="phone" size={26} />
      <span className="flex flex-col text-start leading-tight">
        <span className="text-[13px] text-mist/80">{t(`${store}Small`)}</span>
        <span className="text-[17px] font-semibold">{t(`${store}Big`)}</span>
      </span>
    </Link>
  );
  return (
    <div>
      <div className="flex flex-wrap gap-3">
        {badge("apple")}
        {badge("google")}
      </div>
      <p className="mt-3 text-[14px] text-muted">{t("note")}</p>
    </div>
  );
}

/** A real piece of the app, drawn in HTML: the My Policy card after purchase. No prices. */
function PolicyFragment() {
  const t = useTranslations("connect.fragment");
  return (
    <div data-ui className="relative mx-auto w-full max-w-[400px]" aria-label={t("label")} role="img">
      <div className="absolute -top-6 start-6 h-40 w-[80%] -rotate-6 rounded-[28px] bg-lilac" />
      <div className="absolute -top-2 end-0 h-40 w-[80%] rotate-[5deg] rounded-[28px] bg-icy" />
      <div className="relative rounded-[30px] bg-paper p-6 shadow-lift">
        <div className="flex items-center justify-between">
          <span className="grid size-12 place-items-center rounded-2xl bg-mint text-accent">
            <Icon name="shieldCheck" size={26} />
          </span>
          <span className="rounded-full bg-success-soft px-3 py-1 text-[13px] font-semibold text-success">{t("status")}</span>
        </div>
        <p className="mt-6 text-[16px] text-muted">{t("product")}</p>
        <p className="mt-1 text-[24px] leading-tight font-semibold tracking-tight">{t("holder")}</p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-mist p-4">
            <p className="text-[13px] text-muted">{t("nextLabel")}</p>
            <p className="mt-1 text-[17px] font-semibold">{t("nextValue")}</p>
          </div>
          <div className="rounded-2xl bg-mist p-4">
            <p className="text-[13px] text-muted">{t("beneficiaryLabel")}</p>
            <p className="mt-1 text-[17px] font-semibold">{t("beneficiaryValue")}</p>
          </div>
        </div>
        <div className="mt-5">
          <div className="flex justify-between text-[13px] text-muted">
            <span>{t("progressLabel")}</span>
            <span className="tabular">{t("progressValue")}</span>
          </div>
          <div className="mt-2 flex gap-1.5">
            {Array.from({ length: 12 }).map((_, i) => (
              <span key={i} className={`h-2 flex-1 rounded-full ${i < 5 ? "bg-accent" : "bg-line"}`} />
            ))}
          </div>
        </div>
        <div className="mt-6 flex h-12 items-center justify-center rounded-full bg-accent text-[16px] font-semibold text-on-accent">{t("payCta")}</div>
      </div>
      <span className="absolute -bottom-5 end-8 grid size-14 place-items-center rounded-full bg-ink text-mint shadow-lift">
        <Icon name="heart" size={24} />
      </span>
    </div>
  );
}

export function ConnectPage() {
  const t = useTranslations("connect");
  const tc = useTranslations("site.pictureCaptions");
  const locale = useLocale((s) => s.locale);
  const { url, product } = useAppUrl();
  const tn = useTranslations("connect.picked");
  useReveal(`connect:${locale}`);

  const steps = t.raw("how.steps") as { name: string; body: string; time: string }[];
  const stepIcons: IconName[] = ["shield", "idCard", "pen"];
  const teasers = t.raw("teasers.items") as { name: string; line: string; tint: string }[];
  const tints: Record<string, string> = { mint: "bg-mint", lavender: "bg-lavender", aqua: "bg-aqua" };
  const rhythm = t.raw("rhythm.items") as { when: string; what: string }[];

  return (
    <div id="top" className="min-h-dvh bg-mist text-ink">
      <section className="bg-connect">
        <header className={`${frame} flex h-[72px] items-center justify-between gap-4`}>
          <Link href="/connect/" className="rounded-md" aria-label={t("nav.home")}>
            <Wordmark product />
          </Link>
          <div className="flex items-center gap-1">
            <Link href="/" className="hidden h-11 items-center rounded-full px-4 text-[16px] font-medium text-ink hover:bg-ink/5 hover:text-ink sm:inline-flex">
              {t("nav.parent")}
            </Link>
            <LocaleSwitch />
          </div>
        </header>

        <div className={`${frame} grid items-center gap-14 pt-10 pb-24 md:grid-cols-12 md:pt-16 md:pb-32`}>
          <div className="md:col-span-6">
            <h1 className={`${type.display} max-w-[15ch]`}>
              <span className="mask-line">
                <span>{t("hero.title")}</span>
              </span>
            </h1>
            <p className={`${type.lead} fade-up mt-8 max-w-[38ch]`} style={{ "--d": "240ms" } as React.CSSProperties}>
              {t("hero.body")}
            </p>
            {product && (
              <p className="fade-up mt-5 max-w-[42ch] rounded-[16px] bg-paper/80 px-4 py-3 text-[16px] font-medium text-ink" style={{ "--d": "300ms" } as React.CSSProperties}>
                {tn("line", { name: tn(product) })}
              </p>
            )}
            <div className="fade-up mt-10" style={{ "--d": "340ms" } as React.CSSProperties}>
              <div className="hidden max-w-[460px] md:block">
                <QrCard url={url} />
              </div>
              <div className="md:hidden">
                <StoreBadges />
                <SiteLink href={product ? `/app/products/${product}/` : "/app/"} className="mt-6 w-full">
                  {t("hero.demo")}
                </SiteLink>
              </div>
            </div>
            <p className="fade-up mt-8 flex items-center gap-2 text-[16px] text-ink" style={{ "--d": "420ms" } as React.CSSProperties}>
              <Icon name="shieldCheck" size={18} className="shrink-0 text-accent" />
              {t("hero.trust")}
            </p>
          </div>
          <div className="fade-up md:col-span-5 md:col-start-8" style={{ "--d": "200ms" } as React.CSSProperties}>
            <PolicyFragment />
          </div>
        </div>
      </section>

      <section aria-labelledby="how-title" className="bg-mist">
        <div className={`${frame} py-24 md:py-32`}>
          <div className="grid gap-6 md:grid-cols-12">
            <h2 id="how-title" data-reveal className={`${type.h2} max-w-[14ch] md:col-span-6`}>
              {t("how.title")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} text-ink md:col-span-5 md:col-start-8`}>
              {t("how.body")}
            </p>
          </div>
          <ol className="mt-16 grid gap-10 md:grid-cols-3 md:gap-8">
            {steps.map((s, i) => (
              <li key={s.name} data-reveal style={d(i)}>
                <div className="flex items-center gap-3 text-accent">
                  <Icon name={stepIcons[i]} size={26} />
                  <span className="text-[16px] font-semibold">{s.time}</span>
                </div>
                <h3 className={`${type.h3} mt-4`}>{s.name}</h3>
                <p className={`${type.body} mt-3 text-ink`}>{s.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section aria-labelledby="teasers-title" className="bg-paper">
        <div className={`${frame} py-24 md:py-32`}>
          <div className="grid gap-6 md:grid-cols-12">
            <h2 id="teasers-title" data-reveal className={`${type.h2} max-w-[14ch] md:col-span-6`}>
              {t("teasers.title")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} text-ink md:col-span-5 md:col-start-8`}>
              {t("teasers.body")}
            </p>
          </div>
          <ul className="mt-14 space-y-2">
            {teasers.map((p, i) => (
              <li key={p.name} data-reveal style={d(i)} className={`grid gap-3 rounded-[var(--radius-lg)] px-6 py-8 md:grid-cols-12 md:items-center md:px-10 ${tints[p.tint]}`}>
                <span className="text-[clamp(26px,3vw,42px)] leading-tight font-semibold tracking-tight md:col-span-5">{p.name}</span>
                <span className="text-[18px] leading-relaxed md:col-span-5">{p.line}</span>
                <Link href="/app/products/" className="inline-flex items-center gap-1.5 text-[17px] font-semibold text-accent md:col-span-2 md:justify-self-end">
                  {t("teasers.see")}
                  <Icon name="chevron" size={18} className="rtl:-scale-x-100" />
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-[16px] text-muted">{t("teasers.note")}</p>
        </div>
      </section>

      <section aria-labelledby="same-title" className="bg-mist">
        <div className={`${frame} py-24 md:py-32`}>
          <div className="grid gap-6 md:grid-cols-12">
            <h2 id="same-title" data-reveal className={`${type.h2} max-w-[14ch] md:col-span-6`}>
              {t("same.title")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} md:col-span-5 md:col-start-8`}>
              {t("same.body")}
            </p>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            <div data-reveal>
              <Picture name="nilecorniche" className="aspect-[4/3]" caption={tc("nilecorniche")} />
            </div>
            <div data-reveal style={d(1)}>
              <Picture name="qasralnilbridge" className="aspect-[4/3]" caption={tc("qasralnilbridge")} />
            </div>
          </div>
        </div>
      </section>

      <section aria-labelledby="rhythm-title" className="bg-ink text-mist">
        <div className={`${frame} grid gap-12 py-24 md:grid-cols-12 md:py-32`}>
          <div className="md:col-span-5">
            <h2 id="rhythm-title" data-reveal className={`${type.h2} max-w-[12ch]`}>
              {t("rhythm.title")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} mt-6 text-mist/85`}>
              {t("rhythm.body")}
            </p>
            <Clip name="nileriver" className="mt-10 [&>div]:aspect-[4/3]" caption={t("rhythm.caption")} />
          </div>
          <dl className="md:col-span-6 md:col-start-7">
            {rhythm.map((r, i) => (
              <div key={r.when} data-reveal style={d(i)} className={`grid gap-1 rounded-[var(--radius-sm)] px-4 py-5 sm:grid-cols-[150px_1fr] sm:gap-6 ${i % 2 === 0 ? "bg-mist/[0.07]" : ""}`}>
                <dt className="text-[17px] font-semibold text-mint">{r.when}</dt>
                <dd className="text-[17px] leading-relaxed text-mist">{r.what}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <section aria-labelledby="faq-title" className="bg-mist">
        <div className={`${frame} grid gap-10 py-24 md:grid-cols-12 md:py-32`}>
          <h2 id="faq-title" data-reveal className={`${type.h2} max-w-[12ch] md:col-span-4`}>
            {t("faq.title")}
          </h2>
          <div data-reveal style={d(1)} className="md:col-span-8">
            <Faq items={t.raw("faq.items") as { q: string; a: string }[]} />
          </div>
        </div>
      </section>

      <section aria-labelledby="get-title" className="bg-connect">
        <div className={`${frame} grid gap-12 py-24 md:grid-cols-12 md:items-center md:py-32`}>
          <div className="md:col-span-6">
            <h2 id="get-title" data-reveal className={`${type.h2} max-w-[13ch]`}>
              {t("get.title")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.body} mt-6 max-w-[44ch] text-ink`}>
              {t("get.body")}
            </p>
            <div data-reveal style={d(2)} className="mt-10 max-w-[460px]">
              <div className="hidden md:block">
                <QrCard url={url} compact />
              </div>
              <div className="md:hidden">
                <StoreBadges />
              </div>
            </div>
          </div>
          <div data-reveal style={d(1)} className="rounded-[var(--radius-lg)] bg-paper p-6 md:col-span-5 md:col-start-8 md:p-8">
            <h3 className={type.h3}>{t("get.formTitle")}</h3>
            <p className={`${type.body} mt-2 mb-6 text-ink`}>{t("get.formBody")}</p>
            <AppLinkForm />
          </div>
        </div>
      </section>

      <footer className="bg-ink text-mist">
        <div className={`${frame} flex flex-col gap-6 py-12 md:flex-row md:items-end md:justify-between`}>
          <div>
            <Link href="/" className="text-[clamp(28px,3vw,40px)] font-semibold tracking-tight text-mint hover:text-aqua">
              {t("footer.parent")}
            </Link>
            <p className="mt-3 max-w-[70ch] text-[16px] leading-relaxed text-mist/75">{t("footer.legal")}</p>
          </div>
          <div className="flex items-center gap-4">
            <LocaleSwitch tone="paper" />
            <a href="#top" className="text-[16px] font-semibold text-mist hover:text-mint">
              {t("footer.top")}
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
