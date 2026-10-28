"use client";

import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/icon";

/** Mocked Face ID style confirmation used before one-tap payments */
export function FaceConfirm({ onDone }: { onDone: () => void }) {
  const t = useTranslations("pay");
  const [ok, setOk] = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setOk(true), 1100);
    const b = setTimeout(onDone, 1800);
    return () => {
      clearTimeout(a);
      clearTimeout(b);
    };
  }, [onDone]);

  return (
    <div className="animate-fade-in absolute inset-0 z-50 grid place-items-center bg-ink/40">
      <div className="animate-pop flex size-44 flex-col items-center justify-center gap-3 rounded-[32px] bg-paper shadow-lift">
        <span className={`grid size-16 place-items-center rounded-full transition-colors duration-300 ${ok ? "bg-success text-on-accent" : "text-accent"}`}>
          <Icon name={ok ? "check" : "face"} size={ok ? 32 : 48} strokeWidth={ok ? 2.6 : 1.5} />
        </span>
        <span className="text-[14px] font-semibold">{ok ? t("confirmed") : t("looking")}</span>
      </div>
    </div>
  );
}
