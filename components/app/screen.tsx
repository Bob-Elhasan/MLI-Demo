"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icon";

type Props = {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
  /** Flow label shown above the progress bar */
  flow?: string;
  progress?: { current: number; total: number };
  back?: boolean | string;
  footer?: React.ReactNode;
  className?: string;
  bodyClassName?: string;
};

export function Screen({ children, title, subtitle, flow, progress, back = true, footer, className = "", bodyClassName = "" }: Props) {
  const router = useRouter();
  const t = useTranslations("common");

  return (
    <div className={`relative flex min-h-0 flex-1 flex-col ${className}`}>
      {(back || progress) && (
        <header className="shrink-0 px-5 pt-2 pb-1">
          <div className="flex h-10 items-center gap-3">
            {back ? (
              <button
                type="button"
                onClick={() => (typeof back === "string" ? router.push(back) : router.back())}
                className="-ms-2 grid size-10 place-items-center rounded-full text-ink transition hover:bg-ink/5"
                aria-label={t("back")}
              >
                <Icon name="back" className="rtl:rotate-180" />
              </button>
            ) : (
              <span className="size-10" />
            )}
            {progress && (
              <div className="flex flex-1 flex-col gap-1.5">
                <div className="flex items-center justify-between text-[12px] font-medium text-muted">
                  <span>{flow}</span>
                  <span className="tabular">{t("step", progress)}</span>
                </div>
                <div className="flex gap-1">
                  {Array.from({ length: progress.total }, (_, i) => (
                    <span
                      key={i}
                      className={`h-1 flex-1 rounded-full transition-colors duration-500 ${i < progress.current ? "bg-accent" : "bg-line"}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>
      )}

      <div className={`no-scrollbar min-h-0 flex-1 overflow-y-auto px-6 pb-6 ${bodyClassName}`}>
        {(title || subtitle) && (
          <div className="pt-4 pb-6">
            {title && <h1 className="text-[28px] leading-[1.15] font-semibold tracking-tight text-balance">{title}</h1>}
            {subtitle && <p className="mt-2.5 text-[15px] leading-relaxed text-muted text-pretty">{subtitle}</p>}
          </div>
        )}
        {children}
      </div>

      {footer && (
        <footer className="relative shrink-0 space-y-3 px-6 pt-3 pb-8 before:pointer-events-none before:absolute before:inset-x-0 before:-top-6 before:h-6 before:bg-linear-to-t before:from-mist before:to-transparent md:pb-9">
          {footer}
        </footer>
      )}
    </div>
  );
}
