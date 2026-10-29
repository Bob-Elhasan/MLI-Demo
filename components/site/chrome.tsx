"use client";

import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { useLocale } from "@/lib/store/locale";
import { ClosingCta } from "./closing-cta";
import { SiteFooter } from "./footer";
import { SiteHeader } from "./header";

/** Arms the section entrances: anything marked data-reveal rises in once as it enters the viewport */
export function useReveal(key: string) {
  useEffect(() => {
    const root = document.documentElement;
    root.classList.add("js-reveal");
    const items = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]:not(.is-in)"));
    if (!("IntersectionObserver" in window)) {
      items.forEach((el) => el.classList.add("is-in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px 12% 0px", threshold: 0 },
    );
    items.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [key]);
}

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname() || "/";
  const locale = useLocale((s) => s.locale);
  const t = useTranslations("site.nav");
  useReveal(`${pathname}:${locale}`);
  // Block body on purpose: newer Chromium returns a Promise from scrollTo, and an effect may only return a cleanup function
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return (
    <div id="top" className="flex min-h-dvh flex-col bg-mist text-ink">
      <a href="#content" className="sr-only z-50 rounded-full bg-ink px-4 py-2 text-mist focus:not-sr-only focus:fixed focus:start-4 focus:top-4">
        {t("skip")}
      </a>
      <SiteHeader />
      <main id="content" className="flex-1">
        {children}
      </main>
      <ClosingCta />
      <SiteFooter />
    </div>
  );
}
