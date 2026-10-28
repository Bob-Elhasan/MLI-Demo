"use client";

import Link from "next/link";
import { useTranslations } from "next-intl";
import { formatEGP, formatNumber } from "@/lib/format";
import type { Goal } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

export function GoalRow({ goal, href, onClick }: { goal: Goal; href?: string; onClick?: () => void }) {
  const t = useTranslations("goals");
  const locale = useLocale((s) => s.locale);
  const pct = Math.min(100, Math.round((goal.saved / goal.target) * 100));
  const body = (
    <>
      <div className="flex items-baseline justify-between gap-3">
        <span className="truncate text-[15px] font-semibold">{goal.name}</span>
        <span className="tabular shrink-0 text-[13px] text-muted">{t("by", { year: formatNumber(goal.targetYear, locale).replace(/[,٬]/g, "") })}</span>
      </div>
      <div className="mt-3 h-2 overflow-hidden rounded-full bg-fill" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <div className="h-full rounded-full bg-accent transition-[width] duration-700 ease-out-soft" style={{ width: `${pct}%` }} />
      </div>
      <div className="tabular mt-2 flex justify-between text-[13px]">
        <span className="font-medium">{t("progress", { pct: formatNumber(pct, locale) })}</span>
        <span className="text-muted">
          {formatEGP(goal.saved, locale)} / {formatEGP(goal.target, locale)}
        </span>
      </div>
    </>
  );
  const cls = "block w-full rounded-[20px] bg-paper p-4 text-start ring-1 ring-line transition hover:ring-line-strong";
  if (href) return <Link href={href} className={cls}>{body}</Link>;
  return <button onClick={onClick} className={cls}>{body}</button>;
}
