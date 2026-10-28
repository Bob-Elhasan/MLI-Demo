"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Toggle } from "@/components/ui/toggle";
import { GoalRow } from "@/components/app/goal-row";
import { TabTitle } from "@/components/app/list";
import { Sheet } from "@/components/app/sheet";
import { formatEGP, formatNumber } from "@/lib/format";
import { useJourney, type Goal, type GoalKind } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

const KINDS: GoalKind[] = ["marriage", "school", "car", "home", "custom"];
const DEFAULT_TARGET: Record<GoalKind, number> = { marriage: 300_000, school: 120_000, car: 900_000, home: 2_500_000, custom: 100_000 };

export default function Goals() {
  const t = useTranslations("goals");
  const locale = useLocale((s) => s.locale);
  const { goals, policy, saveGoal, removeGoal, weeklyGoalNudge, set } = useJourney();
  const [editing, setEditing] = useState<Goal | null>(null);

  const blank = (kind: GoalKind): Goal => ({
    id: `goal-${Date.now()}`,
    kind,
    name: t(`kinds.${kind}`),
    target: DEFAULT_TARGET[kind],
    saved: 0,
    targetYear: new Date().getFullYear() + 3,
  });

  return (
    <>
      <TabTitle title={t("title")} />
      <p className="text-[14px] leading-relaxed text-muted">{t("intro")}</p>

      {goals.length > 0 && (
        <div className="mt-5 space-y-2">
          {goals.map((g) => (
            <GoalRow key={g.id} goal={g} onClick={() => setEditing(g)} />
          ))}
        </div>
      )}

      <h2 className="mt-7 mb-3 text-[15px] font-semibold">{goals.length ? t("add") : t("empty")}</h2>
      <div className="flex flex-wrap gap-2">
        {KINDS.map((k) => (
          <button key={k} onClick={() => setEditing(blank(k))} className="h-11 rounded-full bg-paper px-4 text-[14px] font-medium ring-1 ring-line transition hover:ring-accent">
            {t(`kinds.${k}`)}
          </button>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between gap-4 rounded-[20px] bg-paper p-4 ring-1 ring-line">
        <div>
          <p className="text-[15px] font-semibold">{t("nudge")}</p>
          <p className="text-[13px] text-muted">{t("nudgeHint")}</p>
        </div>
        <Toggle checked={weeklyGoalNudge} onChange={(v) => set({ weeklyGoalNudge: v })} label={t("nudge")} />
      </div>

      <Sheet open={!!editing} onClose={() => setEditing(null)} title={editing?.name ?? ""}>
        {editing && (
          <GoalEditor
            goal={editing}
            isNew={!goals.some((g) => g.id === editing.id)}
            onChange={setEditing}
            onSave={() => {
              saveGoal(editing);
              setEditing(null);
            }}
            onDelete={() => {
              removeGoal(editing.id);
              setEditing(null);
            }}
            tool={
              policy &&
              (policy.productId === "maash-bokra"
                ? t("toolSavings", { amount: formatEGP(policy.quote.monthly, locale) })
                : t("toolProtection", { cover: formatEGP(policy.quote.cover, locale) }))
            }
          />
        )}
      </Sheet>
    </>
  );
}

function GoalEditor({
  goal,
  isNew,
  onChange,
  onSave,
  onDelete,
  tool,
}: {
  goal: Goal;
  isNew: boolean;
  onChange: (g: Goal) => void;
  onSave: () => void;
  onDelete: () => void;
  tool?: string | false;
}) {
  const t = useTranslations("goals");
  const locale = useLocale((s) => s.locale);
  const thisYear = new Date().getFullYear();
  const months = Math.max(1, (goal.targetYear - thisYear) * 12);
  const perMonth = Math.max(0, Math.ceil((goal.target - goal.saved) / months / 50) * 50);

  return (
    <div className="space-y-5">
      <label className="block rounded-[16px] bg-paper px-4 py-3 ring-1 ring-line focus-within:ring-2 focus-within:ring-accent">
        <span className="block text-[12px] text-muted">{t("name")}</span>
        <input value={goal.name} onChange={(e) => onChange({ ...goal, name: e.target.value })} className="mt-0.5 w-full bg-transparent text-[16px] font-medium outline-none" />
      </label>

      <Range label={t("target")} value={goal.target} display={formatEGP(goal.target, locale)} min={10_000} max={3_000_000} step={10_000} onChange={(v) => onChange({ ...goal, target: v, saved: Math.min(goal.saved, v) })} />
      <Range label={t("saved")} hint={t("savedHint")} value={goal.saved} display={formatEGP(goal.saved, locale)} min={0} max={goal.target} step={5_000} onChange={(v) => onChange({ ...goal, saved: v })} />

      <div>
        <p className="mb-2 text-[14px] text-muted">{t("targetDate")}</p>
        <div className="no-scrollbar flex gap-2 overflow-x-auto">
          {Array.from({ length: 8 }, (_, i) => thisYear + 1 + i).map((y) => (
            <button
              key={y}
              onClick={() => onChange({ ...goal, targetYear: y })}
              className={`tabular h-10 shrink-0 rounded-full px-4 text-[14px] font-semibold ${goal.targetYear === y ? "bg-ink text-mist" : "bg-paper ring-1 ring-line"}`}
            >
              {formatNumber(y, locale).replace(/[,٬]/g, "")}
            </button>
          ))}
        </div>
      </div>

      <div className="rounded-[18px] bg-fill p-4">
        <p className="text-[14px] font-semibold">{t("left", { amount: formatEGP(goal.target - goal.saved, locale) })}</p>
        <p className="mt-0.5 text-[13px] text-ink-2">{t("perMonth", { amount: formatEGP(perMonth, locale) })}</p>
      </div>

      {tool && (
        <div className="rounded-[18px] bg-mint p-4">
          <p className="text-[14px] font-semibold">{t("policyTool")}</p>
          <p className="mt-1 text-[13px] leading-relaxed text-ink-2">{tool}</p>
        </div>
      )}

      <Button onClick={onSave}>{isNew ? t("save") : t("update")}</Button>
      {!isNew && (
        <button onClick={onDelete} className="w-full text-center text-[14px] font-semibold text-danger">
          {t("delete")}
        </button>
      )}
    </div>
  );
}

function Range({ label, hint, value, display, min, max, step, onChange }: { label: string; hint?: string; value: number; display: string; min: number; max: number; step: number; onChange: (v: number) => void }) {
  const pct = max > min ? ((value - min) / (max - min)) * 100 : 0;
  return (
    <label className="block">
      <span className="flex items-baseline justify-between">
        <span className="text-[14px] text-muted">{label}</span>
        <span className="tabular text-[16px] font-semibold">{display}</span>
      </span>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full"
        style={{ background: `linear-gradient(to var(--range-dir, right), var(--color-accent) ${pct}%, var(--color-line) ${pct}%)` }}
      />
      {hint && <span className="mt-2 block text-[12px] text-muted">{hint}</span>}
    </label>
  );
}
