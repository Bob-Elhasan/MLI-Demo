"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon, type IconName } from "@/components/ui/icon";

const TABS: { href: string; key: "home" | "policy" | "goals" | "vault" | "more"; icon: IconName }[] = [
  { href: "/app/home", key: "home", icon: "home" },
  { href: "/app/policy", key: "policy", icon: "shield" },
  { href: "/app/goals", key: "goals", icon: "sparkle" },
  { href: "/app/vault", key: "vault", icon: "family" },
  { href: "/app/more", key: "more", icon: "user" },
];

export function TabBar() {
  const t = useTranslations("tabs");
  const pathname = usePathname();
  return (
    <nav className="shrink-0 bg-paper pt-1.5 pb-7 shadow-[0_-1px_0_var(--color-line)] md:pb-8">
      <ul className="grid grid-cols-5">
        {TABS.map((tab) => {
          const active = pathname.replace(/\/$/, "") === tab.href;
          return (
            <li key={tab.key}>
              <Link
                href={tab.href}
                aria-current={active ? "page" : undefined}
                className={`flex h-12 flex-col items-center justify-center gap-0.5 text-[11px] font-medium transition-colors ${active ? "text-accent" : "text-muted hover:text-ink"}`}
              >
                <Icon name={tab.icon} size={22} strokeWidth={active ? 2.1 : 1.75} />
                {t(tab.key)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
