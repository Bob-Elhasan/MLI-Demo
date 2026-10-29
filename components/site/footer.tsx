"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { clips, pictures } from "@/lib/mock/site/pictures";
import { siteProducts } from "@/lib/mock/site/products";
import { aboutNav, irNav, partnersNav } from "@/lib/mock/site/nav";
import { frame, type } from "./styles";

/** Name first, then the ways to reach MLI, then the sitemap, the legal line and the picture credits */
export function SiteFooter() {
  const t = useTranslations("site.footer");
  const tn = useTranslations("site.nav");
  const tp = useTranslations("site.products.items");

  const columns = [
    { title: tn("products"), links: siteProducts.map((p) => ({ href: `/products/${p.slug}/`, label: tp(`${p.key}.name`) })) },
    { title: tn("investors"), links: irNav.map((l) => ({ href: l.href, label: tn(l.key) })) },
    {
      title: t("company"),
      links: [
        ...aboutNav.map((l) => ({ href: l.href, label: tn(l.key) })),
        ...partnersNav.slice(0, 1).map((l) => ({ href: l.href, label: tn("partners") })),
        { href: "/contact/", label: tn("contact") },
        { href: "/connect/", label: tn("cta") },
      ],
    },
  ];

  return (
    <footer className="bg-mint text-ink">
      <div className={`${frame} pt-20 pb-10 md:pt-28`}>
        {/* PLACEHOLDER: the name is set in type until the new MLI logo exists */}
        <p
          className="text-[clamp(56px,13vw,220px)] leading-[0.9] font-semibold tracking-[-0.05em] text-ink"
          data-placeholder="logo"
          aria-hidden="true"
        >
          {t("name")}
        </p>

        <div className="mt-16 grid gap-14 md:mt-20 md:grid-cols-12">
          <div className="flex flex-col gap-2 md:col-span-5">
            <h2 className="sr-only">{t("reach")}</h2>
            <a href="tel:19446" className="w-fit text-[clamp(21px,1.8vw,26px)] font-semibold tracking-tight text-accent hover:text-accent-strong">
              {t("hotline")}
            </a>
            <a href="mailto:info@misrlife.com" className="w-fit text-[clamp(21px,1.8vw,26px)] font-semibold tracking-tight text-accent hover:text-accent-strong">
              info@misrlife.com
            </a>
            <Link href="/contact/" className="w-fit text-[clamp(21px,1.8vw,26px)] font-semibold tracking-tight text-accent hover:text-accent-strong">
              {t("writeToUs")}
            </Link>
            <p className={`${type.small} mt-4 max-w-sm text-ink`}>{t("hours")}</p>
          </div>

          <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:col-span-7">
            {columns.map((col) => (
              <div key={col.title}>
                <h2 className="text-[16px] font-semibold">{col.title}</h2>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((l) => (
                    <li key={l.href}>
                      <Link href={l.href} className="text-[16px] text-ink transition-colors hover:text-accent">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-20 grid gap-6 md:mt-24 md:grid-cols-12">
          <p className={`${type.small} max-w-[72ch] text-ink md:col-span-8`}>{t("legal")}</p>
          <p className={`${type.small} text-ink md:col-span-4 md:text-end`}>{t("demo")}</p>
        </div>

        <details className="group mt-8">
          <summary className={`${type.small} w-fit cursor-pointer list-none font-semibold text-ink underline decoration-ink/30 underline-offset-4 hover:decoration-ink`}>
            {t("credits")}
          </summary>
          <ul className="mt-4 space-y-2">
            {[...Object.values(pictures), ...Object.values(clips)].map((p) => (
              <li key={p.file} className={`${type.small} text-ink`}>
                <a href={p.page} className="underline decoration-ink/25 underline-offset-2 hover:text-ink" rel="noreferrer" target="_blank">
                  {p.title}
                </a>
                {p.creator ? `, ${p.creator}` : ""}, {p.license}, {p.via}
              </li>
            ))}
          </ul>
        </details>

        <div className="mt-10 flex items-center justify-between gap-4">
          <p className={`${type.small} text-ink`}>{t("copyright")}</p>
          <a href="#top" className={`${type.small} font-semibold text-ink hover:text-accent`}>
            {t("top")}
          </a>
        </div>
      </div>
    </footer>
  );
}
