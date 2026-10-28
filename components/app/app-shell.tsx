"use client";

import { usePathname } from "next/navigation";
import { PhoneFrame } from "./phone-frame";
import { DemoPanel } from "./demo-panel";

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <main className="md:bg-stage flex min-h-dvh items-center justify-center gap-16 md:p-6">
      <DemoPanel />
      <PhoneFrame>
        <div key={pathname} className="animate-screen-in flex min-h-0 flex-1 flex-col">
          {children}
        </div>
      </PhoneFrame>
      {/* Balances the panel so the phone sits dead center */}
      <div className="hidden w-64 shrink-0 lg:block" aria-hidden="true" />
    </main>
  );
}
