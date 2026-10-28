import Link from "next/link";
import { Icon } from "@/components/ui/icon";

/** Section heading inside a screen: a noun, sentence sized, with an optional trailing link */
export function SectionHead({ title, action, href }: { title: string; action?: string; href?: string }) {
  return (
    <div className="mt-8 mb-3 flex items-baseline justify-between">
      <h2 className="text-[17px] font-semibold">{title}</h2>
      {action && href && (
        <Link href={href} className="text-[14px] font-semibold text-accent">
          {action}
        </Link>
      )}
    </div>
  );
}

/** One divided container of rows, instead of a stack of cards */
export function Group({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`overflow-hidden rounded-[20px] bg-paper ring-1 ring-line ${className}`}>{children}</div>;
}

type RowProps = {
  title: React.ReactNode;
  sub?: React.ReactNode;
  value?: React.ReactNode;
  href?: string;
  onClick?: () => void;
  chevron?: boolean;
};

export function Row({ title, sub, value, href, onClick, chevron }: RowProps) {
  const body = (
    <>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-[15px] font-medium">{title}</span>
        {sub && <span className="mt-0.5 block text-[13px] text-muted">{sub}</span>}
      </span>
      {value && <span className="tabular shrink-0 text-end text-[15px] font-semibold">{value}</span>}
      {(chevron ?? !!(href || onClick)) && <Icon name="chevron" size={18} className="shrink-0 text-muted rtl:rotate-180" />}
    </>
  );
  const cls = "flex min-h-14 w-full items-center gap-3 border-b border-line px-4 py-3 text-start last:border-0";
  if (href) return <Link href={href} className={`${cls} transition hover:bg-fill`}>{body}</Link>;
  if (onClick) return <button onClick={onClick} className={`${cls} transition hover:bg-fill`}>{body}</button>;
  return <div className={cls}>{body}</div>;
}

const tones = {
  ok: "bg-success-soft text-success",
  warn: "bg-warning-soft text-warning",
  bad: "bg-danger-soft text-danger",
  neutral: "bg-fill text-ink-2",
};

export function Pill({ tone = "neutral", children }: { tone?: keyof typeof tones; children: React.ReactNode }) {
  return <span className={`inline-flex h-6 items-center gap-1.5 rounded-full px-2.5 text-[12px] font-semibold ${tones[tone]}`}>{children}</span>;
}

/** Title row for tab screens: a noun at 24px, no hero */
export function TabTitle({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <header className="flex items-center justify-between pt-3 pb-2">
      <h1 className="text-[26px] font-semibold tracking-tight">{title}</h1>
      {children}
    </header>
  );
}
