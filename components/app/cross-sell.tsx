"use client";

import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui/button";
import { formatEGP } from "@/lib/format";
import { getProduct } from "@/lib/mock/products";
import { useJourney, type LifeEvent } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

type Card = { event: Exclude<LifeEvent, "nothing">; href: string; tone: string };

// Cross-sell comes only from what the user declared in the app, never from outside data.
const CARDS: Record<Exclude<LifeEvent, "nothing">, Omit<Card, "event">> = {
  married: { href: "/app/products/family-protection", tone: "bg-lavender" },
  baby: { href: "/app/products/term-life", tone: "bg-mint" },
  newJob: { href: "/app/products/maash-bokra", tone: "bg-icy" },
  home: { href: "/app/products/term-life", tone: "bg-aqua" },
  school: { href: "/app/products/family-protection", tone: "bg-lilac" },
};

export function CrossSellCards({ events }: { events: LifeEvent[] }) {
  const t = useTranslations("checkIn.cards");
  const locale = useLocale((s) => s.locale);
  const policy = useJourney((s) => s.policy);
  const maash = getProduct("maash-bokra")!;
  const cards = events.filter((e): e is Exclude<LifeEvent, "nothing"> => e !== "nothing");

  return (
    <div className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-1">
      {cards.map((e) => {
        const c = CARDS[e];
        return (
          <section key={e} className={`flex w-[82%] shrink-0 snap-start flex-col rounded-[24px] p-5 ${c.tone} ${cards.length === 1 ? "w-full" : ""}`}>
            <h3 className="text-[17px] font-semibold text-balance">{t(`${e}.title`)}</h3>
            <p className="mt-1.5 flex-1 text-[14px] leading-relaxed text-ink-2">
              {t(`${e}.body`, {
                cover: formatEGP(policy?.quote.cover ?? 0, locale),
                amount: formatEGP(maash.contribution!.min, locale),
              })}
            </p>
            <ButtonLink href={c.href} size="md" variant="secondary" className="mt-4 self-start bg-paper">
              {t(`${e}.cta`)}
            </ButtonLink>
          </section>
        );
      })}
    </div>
  );
}
