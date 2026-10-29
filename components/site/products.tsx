"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { getSiteProduct, siteProducts, type SiteProduct } from "@/lib/mock/site/products";
import { BigList, Faq, FactRows, PageHead, Picture, PlaceholderNote, Section } from "./blocks";
import { ProductLineup } from "./product-lineup";
import { frame, type } from "./styles";

const d = (n: number) => ({ "--d": n }) as React.CSSProperties;

export function ProductsIndex() {
  const t = useTranslations("site.productsPage");
  const channels = ["app", "adviser", "business"] as const;
  return (
    <>
      <PageHead title={t("title")} body={t("body")} field="mint" picture="nilecorniche" />
      <Section id="lineup" title={t("lineupTitle")} intro={t("lineupBody")}>
        <ProductLineup />
      </Section>
      <section aria-labelledby="channels-title" className="bg-icy">
        <div className={`${frame} py-24 md:py-32`}>
          <h2 id="channels-title" data-reveal className={`${type.h2} max-w-[18ch]`}>
            {t("channelsTitle")}
          </h2>
          <div className="mt-14 space-y-2">
            {channels.map((c, i) => (
              <div
                key={c}
                data-reveal
                style={d(i)}
                className={`grid gap-4 rounded-[var(--radius-md)] px-6 py-7 md:grid-cols-12 md:items-center md:px-8 ${c === "app" ? "bg-ink text-mist" : "bg-paper"}`}
              >
                <h3 className={`${type.h3} md:col-span-4`}>{t(`channels.${c}.title`)}</h3>
                <p className={`${type.body} md:col-span-5 ${c === "app" ? "text-mist/85" : "text-ink-2"}`}>{t(`channels.${c}.body`)}</p>
                <Link
                  href={c === "app" ? "/connect/" : "/contact/"}
                  className={`inline-flex items-center gap-2 text-[16px] font-semibold md:col-span-3 md:justify-self-end ${c === "app" ? "text-mint" : "text-accent"}`}
                >
                  {t(`channels.${c}.link`)}
                  <Icon name="chevron" size={18} className="rtl:-scale-x-100" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Section id="faq" title={t("faqTitle")}>
        <Faq items={t.raw("faqs") as { q: string; a: string }[]} />
      </Section>
    </>
  );
}

function ProductCta({ product }: { product: SiteProduct }) {
  const t = useTranslations("site.productPage");
  if (product.channel === "business") {
    return (
      <div className="flex flex-wrap gap-3">
        <ButtonLink href="/partners/corporate/" size="md" className="h-14 px-7">
          {t("ctaBusiness")}
        </ButtonLink>
        <ButtonLink href="/contact/" size="md" variant="secondary" className="h-14 px-6">
          {t("ctaContact")}
        </ButtonLink>
      </div>
    );
  }
  return (
    <div className="flex flex-wrap gap-3">
      <ButtonLink href="/connect/" size="md" className="h-14 px-7">
        {t("ctaApp")}
      </ButtonLink>
      {product.channel === "adviser" && (
        <ButtonLink href="/contact/" size="md" variant="secondary" className="h-14 px-6">
          {t("ctaAdviser")}
        </ButtonLink>
      )}
    </div>
  );
}

export function ProductDetail({ slug }: { slug: string }) {
  const product = getSiteProduct(slug)!;
  const t = useTranslations("site.productPage");
  const tp = useTranslations(`site.products.items.${product.key}`);
  const benefits = tp.raw("benefits") as string[];
  const terms = tp.raw("terms") as { label: string; value: string; note?: string }[];
  const faqs = tp.raw("faqs") as { q: string; a: string }[];
  const others = siteProducts.filter((p) => p.slug !== slug);
  const isMaash = product.key === "maashBokra";

  return (
    <>
      <PageHead title={tp("name")} body={tp("line")} field={product.field}>
        <ProductCta product={product} />
        {product.placeholder && (
          <div className="mt-6">
            <PlaceholderNote>{t("placeholder")}</PlaceholderNote>
          </div>
        )}
      </PageHead>

      <section aria-labelledby="who-title" className="bg-mist">
        <div className={`${frame} grid gap-12 py-24 md:grid-cols-12 md:py-32`}>
          <div className="md:col-span-5">
            <h2 id="who-title" data-reveal className={`${type.h2} max-w-[12ch]`}>
              {t("whoTitle")}
            </h2>
            <p data-reveal style={d(1)} className={`${type.lead} mt-6 max-w-[40ch]`}>
              {tp("who")}
            </p>
            <Picture name={product.picture} className="mt-10 aspect-[4/3]" caption={t("pictureCaption")} />
          </div>
          <div className="md:col-span-6 md:col-start-7">
            <h3 data-reveal className={`${type.h3} text-accent`}>
              {t("benefitsTitle")}
            </h3>
            <div className="mt-6">
              <BigList items={benefits} />
            </div>
          </div>
        </div>
      </section>

      <Section id="terms" title={t("termsTitle")} intro={t("termsBody")} field="paper">
        <FactRows rows={terms} />
        {isMaash && (
          <div className="mt-14">
            <h3 className={type.h3}>{tp("earlyTitle")}</h3>
            <p className={`${type.body} mt-3 max-w-[60ch] text-ink-2`}>{tp("earlyBody")}</p>
            <div className="mt-6">
              <FactRows rows={tp.raw("early") as { label: string; value: string }[]} />
            </div>
          </div>
        )}
        <p className="mt-8 text-[14px] leading-relaxed text-muted">{t("legal")}</p>
      </Section>

      {isMaash && (
        <section aria-labelledby="variants-title" className="bg-lavender">
          <div className={`${frame} py-24 md:py-32`}>
            <h2 id="variants-title" data-reveal className={`${type.h2} max-w-[16ch]`}>
              {tp("variantsTitle")}
            </h2>
            <div data-reveal className="mt-12 max-w-4xl">
              <FactRows rows={(tp.raw("variants") as { name: string; body: string }[]).map((v) => ({ label: v.name, value: v.body }))} />
            </div>
          </div>
        </section>
      )}

      <section aria-labelledby="how-title" className="bg-ink text-mist">
        <div className={`${frame} grid gap-10 py-24 md:grid-cols-12 md:py-28`}>
          <h2 id="how-title" data-reveal className={`${type.h2} max-w-[14ch] md:col-span-5`}>
            {t(`how.${product.channel}.title`)}
          </h2>
          <div data-reveal style={d(1)} className="md:col-span-6 md:col-start-7">
            <p className={`${type.lead} text-mist`}>{t(`how.${product.channel}.body`)}</p>
            <Link
              href={product.channel === "business" ? "/partners/corporate/" : "/connect/"}
              className="mt-8 inline-flex h-14 items-center rounded-full bg-mint px-7 text-[16px] font-semibold text-ink transition hover:bg-aqua active:scale-[0.98]"
            >
              {t(`how.${product.channel}.cta`)}
            </Link>
          </div>
        </div>
      </section>

      <Section id="faq" title={t("faqTitle")}>
        <Faq items={faqs} />
      </Section>

      <section aria-labelledby="others-title" className="bg-icy">
        <div className={`${frame} py-20 md:py-24`}>
          <h2 id="others-title" data-reveal className={type.h2}>
            {t("othersTitle")}
          </h2>
          <ul className="mt-10 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-3">
            {others.map((p) => (
              <li key={p.slug}>
                <OtherLink product={p} />
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

function OtherLink({ product }: { product: SiteProduct }) {
  const tp = useTranslations(`site.products.items.${product.key}`);
  return (
    <Link href={`/products/${product.slug}/`} className="group flex items-start justify-between gap-4 rounded-[var(--radius-sm)] px-3 py-4 transition-colors hover:bg-paper">
      <span>
        <span className="block text-[20px] font-semibold tracking-tight">{tp("name")}</span>
        <span className="mt-1 block text-[15px] text-ink-2">{tp("short")}</span>
      </span>
      <Icon name="chevron" size={20} className="mt-1 shrink-0 text-accent transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
    </Link>
  );
}
