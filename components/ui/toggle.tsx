"use client";

export function Toggle({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`relative h-8 w-[52px] shrink-0 rounded-full transition-colors duration-200 ${checked ? "bg-accent" : "bg-line-strong"}`}
    >
      <span
        className={`absolute top-1 size-6 rounded-full bg-paper shadow transition-[inset-inline-start] duration-200 ease-out-soft ${checked ? "start-[24px]" : "start-1"}`}
      />
    </button>
  );
}
