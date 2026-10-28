"use client";

import { TabBar } from "@/components/app/tab-bar";
import { useHydrated } from "@/lib/store/journey";

export default function TabsLayout({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  return (
    <div className="relative flex min-h-0 flex-1 flex-col">
      <div className="no-scrollbar min-h-0 flex-1 overflow-y-auto px-5 pb-10">{hydrated ? children : null}</div>
      <TabBar />
    </div>
  );
}
