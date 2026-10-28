"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Group, Pill, Row, SectionHead, TabTitle } from "@/components/app/list";
import { Sheet } from "@/components/app/sheet";
import { formatDate, formatNumber } from "@/lib/format";
import { useJourney, type Beneficiary } from "@/lib/store/journey";
import { useLocale } from "@/lib/store/locale";

const RELATIONS = ["spouse", "child", "parent", "sibling", "other"] as const;

export default function Vault() {
  const t = useTranslations("vault");
  const tp = useTranslations("policy");
  const locale = useLocale((s) => s.locale);
  const { beneficiaries, vaultDocs, receipts, saveBeneficiary, removeBeneficiary, addVaultDoc } = useJourney();
  const [editing, setEditing] = useState<Beneficiary | null>(null);
  const [toast, setToast] = useState(false);

  const total = beneficiaries.reduce((s, b) => s + b.share, 0);
  const docName = (name: string) => (["policyContract", "policySchedule", "nationalId"].includes(name) ? tp(`docs.${name}`) : name);

  const share = async () => {
    try {
      await navigator.clipboard?.writeText(`${window.location.origin}/connect/`);
    } catch {}
    setToast(true);
    setTimeout(() => setToast(false), 1800);
  };

  return (
    <>
      <TabTitle title={t("title")} />
      <p className="text-[14px] leading-relaxed text-muted">{t("intro")}</p>

      <SectionHead title={t("beneficiaries")} />
      {beneficiaries.length === 0 ? (
        <p className="mb-3 rounded-[20px] bg-aqua p-4 text-[14px] leading-relaxed text-ink-2">{t("beneficiariesEmpty")}</p>
      ) : (
        <>
          <Group>
            {beneficiaries.map((b) => (
              <Row
                key={b.id}
                title={b.name}
                sub={
                  <span className="flex items-center gap-2">
                    {t(`relations.${b.relation}`)}
                    {b.invite === "sent" && <Pill tone="warn">{t("invited")}</Pill>}
                    {b.invite === "accepted" && <Pill tone="ok">{t("accepted")}</Pill>}
                  </span>
                }
                value={`${formatNumber(b.share, locale)}%`}
                onClick={() => setEditing(b)}
              />
            ))}
          </Group>
          <p className={`tabular mt-2 text-[13px] ${total === 100 ? "text-success" : "text-warning"}`}>
            {total === 100 ? t("sharesOk") : t("sharesTotal", { total: formatNumber(total, locale) })}
          </p>
        </>
      )}
      <Button
        variant="secondary"
        className="mt-3"
        onClick={() =>
          setEditing({ id: `ben-${Date.now()}`, name: "", relation: "spouse", phone: "", share: Math.max(0, 100 - total), invite: "none" })
        }
      >
        {t("add")}
      </Button>

      <SectionHead title={t("documents")} />
      <Group>
        {vaultDocs.map((d) => (
          <Row key={d.id} title={docName(d.name)} sub={t("docAdded", { date: formatDate(d.addedAt, locale) })} />
        ))}
        {receipts.slice(0, 1).map((r) => (
          <Row key={r.number} title={tp("docs.receipt", { number: r.number })} sub={t("docAdded", { date: formatDate(r.paidAt, locale) })} />
        ))}
      </Group>
      <label className="mt-3 flex h-12 cursor-pointer items-center justify-center rounded-full text-[15px] font-semibold text-accent hover:bg-accent-soft">
        {t("addDoc")}
        <input
          type="file"
          className="sr-only"
          accept="image/*,application/pdf"
          onChange={(e) => {
            const f = e.target.files?.[0];
            if (f) addVaultDoc(f.name);
          }}
        />
      </label>

      {/* The referral loop: the most natural second policy is a parent's */}
      <section className="mt-8 rounded-[24px] bg-lilac p-5">
        <h2 className="text-[19px] font-semibold">{t("parentsTitle")}</h2>
        <p className="mt-1.5 text-[14px] leading-relaxed text-ink-2">{t("parentsBody")}</p>
        <Button size="md" variant="secondary" className="mt-4 bg-paper" onClick={share}>
          {toast ? t("copied") : t("parentsCta")}
        </Button>
      </section>

      <Sheet open={!!editing} onClose={() => setEditing(null)} title={editing && beneficiaries.some((b) => b.id === editing.id) ? editing.name : t("add")}>
        {editing && (
          <BeneficiaryForm
            value={editing}
            onChange={setEditing}
            maxShare={100 - total + (beneficiaries.find((b) => b.id === editing.id)?.share ?? 0)}
            existing={beneficiaries.some((b) => b.id === editing.id)}
            onSave={(b) => {
              saveBeneficiary(b);
              setEditing(null);
            }}
            onRemove={() => {
              removeBeneficiary(editing.id);
              setEditing(null);
            }}
          />
        )}
      </Sheet>
    </>
  );
}

function BeneficiaryForm({
  value,
  onChange,
  maxShare,
  existing,
  onSave,
  onRemove,
}: {
  value: Beneficiary;
  onChange: (b: Beneficiary) => void;
  maxShare: number;
  existing: boolean;
  onSave: (b: Beneficiary) => void;
  onRemove: () => void;
}) {
  const t = useTranslations("vault");
  const locale = useLocale((s) => s.locale);
  const valid = value.name.trim().length > 1 && value.share > 0 && value.share <= maxShare;
  const phoneOk = /^1[0125]\d{8}$/.test(value.phone);

  return (
    <div className="space-y-4">
      <Field label={t("name")} value={value.name} onChange={(v) => onChange({ ...value, name: v })} />
      <div>
        <p className="mb-2 text-[13px] text-muted">{t("relation")}</p>
        <div className="flex flex-wrap gap-2">
          {RELATIONS.map((r) => (
            <button
              key={r}
              onClick={() => onChange({ ...value, relation: r })}
              className={`h-10 rounded-full px-4 text-[14px] font-medium ${value.relation === r ? "bg-ink text-mist" : "bg-paper ring-1 ring-line"}`}
            >
              {t(`relations.${r}`)}
            </button>
          ))}
        </div>
      </div>
      <Field label={t("phone")} value={value.phone} ltr prefix="+20" onChange={(v) => onChange({ ...value, phone: v.replace(/\D/g, "").replace(/^0/, "").slice(0, 10) })} />
      <label className="block">
        <span className="flex justify-between text-[14px]">
          <span className="text-muted">{t("share")}</span>
          <span className="tabular font-semibold">{formatNumber(value.share, locale)}%</span>
        </span>
        <input
          type="range"
          min={0}
          max={100}
          step={5}
          value={value.share}
          onChange={(e) => onChange({ ...value, share: Math.min(maxShare, Number(e.target.value)) })}
          className="mt-3 h-2 w-full cursor-pointer appearance-none rounded-full"
          style={{ background: `linear-gradient(to var(--range-dir, right), var(--color-accent) ${value.share}%, var(--color-line) ${value.share}%)` }}
        />
      </label>

      <Button disabled={!valid} onClick={() => onSave(value)}>{t("save")}</Button>

      {existing && (
        <div className="rounded-[18px] bg-paper p-4 ring-1 ring-line">
          <p className="text-[13px] leading-relaxed text-muted">{t("inviteHint")}</p>
          {value.invite === "none" ? (
            <Button size="md" variant="secondary" className="mt-3" disabled={!phoneOk} onClick={() => onSave({ ...value, invite: "sent" })}>
              {t("invite")}
            </Button>
          ) : value.invite === "sent" ? (
            // Demo shortcut: tap the pending invite to simulate the beneficiary accepting it
            <button onClick={() => onSave({ ...value, invite: "accepted" })} className="mt-3">
              <Pill tone="warn">{t("invited")}</Pill>
            </button>
          ) : (
            <p className="mt-3"><Pill tone="ok">{t("accepted")}</Pill></p>
          )}
        </div>
      )}
      {existing && (
        <button onClick={onRemove} className="w-full text-center text-[14px] font-semibold text-danger">{t("remove")}</button>
      )}
    </div>
  );
}

function Field({ label, value, onChange, ltr, prefix }: { label: string; value: string; onChange: (v: string) => void; ltr?: boolean; prefix?: string }) {
  return (
    <label className="block rounded-[16px] bg-paper px-4 py-3 ring-1 ring-line focus-within:ring-2 focus-within:ring-accent">
      <span className="block text-[12px] text-muted">{label}</span>
      <span className="mt-0.5 flex items-center gap-2" dir={ltr ? "ltr" : undefined}>
        {prefix && <span className="text-[16px] font-medium text-muted">{prefix}</span>}
        <input value={value} onChange={(e) => onChange(e.target.value)} inputMode={ltr ? "numeric" : undefined} className="tabular w-full bg-transparent text-[16px] font-medium outline-none" />
      </span>
    </label>
  );
}
