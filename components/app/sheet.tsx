"use client";

import { useEffect } from "react";

/** Bottom sheet that lives inside the phone, not the browser window */
export function Sheet({ open, onClose, title, children }: { open: boolean; onClose: () => void; title: string; children: React.ReactNode }) {
  useEffect(() => {
    if (!open) return;
    const esc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", esc);
    return () => window.removeEventListener("keydown", esc);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div className="absolute inset-0 z-40 flex flex-col justify-end" role="dialog" aria-modal="true" aria-label={title}>
      <button aria-label="Close" onClick={onClose} className="animate-fade-in absolute inset-0 bg-ink/35" />
      <div className="animate-sheet-in relative max-h-[88%] overflow-y-auto rounded-t-[28px] bg-mist px-6 pt-3 pb-9 shadow-lift no-scrollbar">
        <div className="mx-auto mb-4 h-1 w-10 rounded-full bg-line-strong" />
        <h2 className="mb-5 text-[20px] font-semibold tracking-tight">{title}</h2>
        {children}
      </div>
    </div>
  );
}
