"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Icon } from "@/components/ui/icon";
import { formatDate, formatNumber } from "@/lib/format";
import type { IrDoc } from "@/lib/mock/site/ir";
import { useLocale } from "@/lib/store/locale";

/** Placeholder documents as table rows. Download is mocked: it explains the file is a placeholder. */
export function DocTable({ docs, caption }: { docs: IrDoc[]; caption: string }) {
  const t = useTranslations("ir");
  const locale = useLocale((s) => s.locale);
  const [notice, setNotice] = useState<string | null>(null);

  const size = (kb: number) =>
    kb >= 1000 ? t("table.mb", { size: (kb / 1000).toLocaleString(locale === "ar" ? "ar-EG" : "en-EG", { maximumFractionDigits: 1 }) }) : t("table.kb", { size: formatNumber(kb, locale) });

  return (
    <div>
      <table className="w-full border-collapse text-start">
        <caption className="sr-only">{caption}</caption>
        <thead className="sr-only sm:not-sr-only">
          <tr className="text-[16px] text-muted">
            <th scope="col" className="px-4 pb-3 text-start font-medium">{t("table.document")}</th>
            <th scope="col" className="hidden px-4 pb-3 text-start font-medium sm:table-cell">{t("table.date")}</th>
            <th scope="col" className="hidden px-4 pb-3 text-start font-medium md:table-cell">{t("table.size")}</th>
            <th scope="col" className="px-4 pb-3 text-end font-medium">
              <span className="sr-only">{t("table.download")}</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {docs.map((doc, i) => {
            const title = t(`docs.${doc.key}`, { period: doc.period ?? "" });
            return (
              <tr key={doc.id} className={i % 2 === 0 ? "bg-ink/[0.04]" : ""}>
                <td className="rounded-s-[var(--radius-sm)] px-4 py-4 align-top">
                  <span className="block text-[17px] font-medium">{title}</span>
                  <span className="mt-1 block text-[16px] text-muted sm:hidden">
                    {formatDate(doc.date, locale)} · {size(doc.sizeKb)}
                  </span>
                </td>
                <td className="hidden px-4 py-4 align-top text-[17px] whitespace-nowrap text-ink tabular sm:table-cell">{formatDate(doc.date, locale)}</td>
                <td className="hidden px-4 py-4 align-top text-[17px] whitespace-nowrap text-ink tabular md:table-cell">{size(doc.sizeKb)}</td>
                <td className="rounded-e-[var(--radius-sm)] px-4 py-3 text-end align-top">
                  <button
                    type="button"
                    onClick={() => setNotice(title)}
                    aria-label={t("table.downloadNamed", { title })}
                    className="inline-flex h-10 items-center gap-2 rounded-full px-4 text-[16px] font-semibold text-accent transition-colors hover:bg-accent-soft"
                  >
                    <Icon name="doc" size={18} />
                    {t("table.pdf")}
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {notice && (
        <p role="status" className="animate-fade-in mt-4 rounded-[var(--radius-sm)] bg-warning-soft px-4 py-3 text-[16px] text-warning">
          {t("table.placeholderNotice", { title: notice })}
        </p>
      )}
    </div>
  );
}
