// PLACEHOLDER: text wordmark until MLI logo files exist. Replace with the real logo.
export function Wordmark({ product = false, className = "" }: { product?: boolean; className?: string }) {
  return (
    <span className={`inline-flex items-center gap-2 font-bold tracking-tight ${className}`} data-placeholder="logo">
      <span className="grid size-7 place-items-center rounded-[9px] bg-ink text-[11px] font-bold text-mist" aria-hidden="true">
        MLI
      </span>
      <span className="text-[17px] leading-none" dir="ltr">
        {product ? (
          <>
            MLI <span className="text-accent">Connect</span>
          </>
        ) : (
          "Misr Life"
        )}
      </span>
    </span>
  );
}
