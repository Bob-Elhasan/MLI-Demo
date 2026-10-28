"use client";

/** Full-screen mocked "talking to the backend" moment */
export function Processing({ label }: { label: string }) {
  return (
    <div className="animate-fade-in absolute inset-0 z-30 flex flex-col items-center justify-center gap-5 bg-mist/90 backdrop-blur-sm">
      <span className="relative grid size-16 place-items-center">
        <span className="absolute inset-0 animate-spin rounded-full border-[3px] border-accent/15 border-t-accent" />
        <span className="size-3 rounded-full bg-accent" />
      </span>
      <p className="text-[16px] font-semibold">{label}</p>
    </div>
  );
}
