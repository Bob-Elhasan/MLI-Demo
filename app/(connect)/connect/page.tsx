"use client";

import { QRCodeSVG } from "qrcode.react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { ButtonLink } from "@/components/ui/button";
import { Wordmark } from "@/components/ui/wordmark";

// Skeleton of the Ladder-style landing page. QR points at the app demo on whatever host is serving this.
export default function Connect() {
  const t = useTranslations("brand");
  const tw = useTranslations("welcome");
  const [url, setUrl] = useState("");
  useEffect(() => setUrl(new URL("app/", window.location.href.replace(/connect\/?$/, "")).href), []);

  return (
    <main className="bg-connect flex min-h-dvh flex-col">
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-5 md:px-8">
        <Wordmark product />
      </header>
      <section className="mx-auto grid w-full max-w-6xl flex-1 items-center gap-12 px-4 py-12 md:grid-cols-2 md:px-8">
        <div>
          <p className="text-[14px] font-semibold text-accent">{t("tagline")}</p>
          <h1 className="mt-3 text-[44px] leading-[1.05] font-semibold tracking-tight md:text-[56px]">{tw("title")}</h1>
          <p className="mt-4 max-w-md text-[17px] leading-relaxed text-muted">{tw("body")}</p>
          <ButtonLink href="/app" size="md" className="mt-8 md:hidden">{tw("cta")}</ButtonLink>
        </div>
        <div className="hidden justify-center md:flex">
          <div className="rounded-[32px] bg-paper p-8 text-center shadow-lift">
            {url && <QRCodeSVG value={url} size={200} fgColor="#1f1a22" bgColor="transparent" />}
            <p className="mt-4 text-[14px] font-semibold">Scan To Get MLI Connect</p>
          </div>
        </div>
      </section>
    </main>
  );
}
