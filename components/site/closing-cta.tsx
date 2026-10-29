"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import { AppLinkForm } from "./app-link-form";
import { frame, type } from "./styles";

/** The page idea again, inverted: ink becomes the ground. Every site page closes on it. */
export function ClosingCta() {
  const t = useTranslations("site.closing");
  return (
    <section aria-labelledby="closing-title" className="bg-ink text-mist">
      <div className={`${frame} grid min-h-[80svh] content-between gap-16 py-24 md:py-32`}>
        <h2 id="closing-title" data-reveal className={`${type.hero} max-w-[12ch] text-mist`}>
          <span className="block">{t("line1")}</span>
          <span className="block text-mint">{t("line2")}</span>
        </h2>
        <div className="grid items-end gap-10 md:grid-cols-12">
          <div data-reveal style={{ "--d": 1 } as React.CSSProperties} className="md:col-span-5">
            <p className={`${type.lead} text-mist`}>{t("body")}</p>
            <Link
              href="/connect/"
              className="mt-8 inline-flex h-14 items-center justify-center rounded-full bg-mint px-7 text-[16px] font-semibold text-ink transition duration-200 hover:bg-aqua active:scale-[0.98]"
            >
              {t("cta")}
            </Link>
          </div>
          <div data-reveal style={{ "--d": 2 } as React.CSSProperties} className="md:col-span-6 md:col-start-7">
            <h3 className={`${type.h3} text-mist`}>{t("formTitle")}</h3>
            <p className={`${type.body} mt-2 mb-6 text-mist/80`}>{t("formBody")}</p>
            <AppLinkForm tone="dark" />
          </div>
        </div>
      </div>
    </section>
  );
}
