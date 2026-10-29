"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { SiteLink } from "./button";
import { Icon } from "@/components/ui/icon";
import { Wordmark } from "@/components/ui/wordmark";
import { primaryNav } from "@/lib/mock/site/nav";
import { LocaleSwitch } from "./locale-switch";
import { frame } from "./styles";

const isActive = (pathname: string, href: string) => pathname === href || (href !== "/" && pathname.startsWith(href));

/** Plain bar: wordmark, the four core links, the language switch and one action */
export function SiteHeader() {
  const t = useTranslations("site.nav");
  const pathname = usePathname() || "/";
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="relative z-40">
      <div className={`${frame} flex h-[72px] items-center justify-between gap-6`}>
        <Link href="/" aria-label={t("home")} className="shrink-0 rounded-md">
          <Wordmark />
        </Link>

        <nav aria-label={t("main")} className="hidden items-center gap-1 lg:flex">
          {primaryNav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive(pathname, item.href) ? "page" : undefined}
              className="rounded-full px-4 py-2 text-[16px] font-medium text-ink-2 transition-colors hover:bg-ink/5 hover:text-ink aria-[current=page]:text-accent"
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="hidden sm:block">
            <LocaleSwitch />
          </span>
          <span className="hidden sm:block">
            <SiteLink href="/connect/" size="sm">
              {t("cta")}
            </SiteLink>
          </span>
          <button
            type="button"
            onClick={() => setOpen(true)}
            aria-expanded={open}
            aria-controls="site-menu"
            className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[16px] font-semibold text-ink transition-colors hover:bg-ink/5 lg:hidden"
          >
            {t("menu")}
          </button>
        </div>
      </div>

      {open && (
        <div id="site-menu" role="dialog" aria-modal="true" aria-label={t("menu")} className="animate-fade-in fixed inset-0 z-50 flex flex-col overflow-y-auto bg-mist">
          <div className={`${frame} flex h-[72px] shrink-0 items-center justify-between`}>
            <Wordmark />
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="inline-flex h-11 items-center gap-2 rounded-full px-4 text-[16px] font-semibold transition-colors hover:bg-ink/5"
            >
              <Icon name="close" size={20} />
              {t("close")}
            </button>
          </div>
          <nav aria-label={t("main")} className={`${frame} flex flex-1 flex-col gap-1 pt-6 pb-10`}>
            {primaryNav.map((item) => (
              <div key={item.href} className="py-3">
                <Link href={item.href} className="block text-[34px] leading-tight font-semibold tracking-tight">
                  {t(item.key)}
                </Link>
                {item.children && (
                  <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
                    {item.children.slice(1).map((c) => (
                      <Link key={c.href} href={c.href} className="text-[17px] text-muted hover:text-ink">
                        {t(c.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link href="/contact/" className="py-3 text-[34px] leading-tight font-semibold tracking-tight">
              {t("contact")}
            </Link>
            <div className="mt-auto flex flex-col gap-4 pt-8">
              <SiteLink href="/connect/" className="w-full">{t("cta")}</SiteLink>
              <LocaleSwitch className="self-center" />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
