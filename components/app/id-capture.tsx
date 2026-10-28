"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Camera, type CameraHandle } from "./camera";
import { Screen } from "./screen";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useJourney } from "@/lib/store/journey";
import { sampleIdImage } from "@/lib/mock/sample-images";

export function IdCapture({ side, step, next }: { side: "front" | "back"; step: number; next: string }) {
  const t = useTranslations("kyc");
  const tc = useTranslations("common");
  const router = useRouter();
  const cam = useRef<CameraHandle>(null);
  const key = side === "front" ? "idFront" : "idBack";
  const saved = useJourney((s) => s[key]);
  const capture = useJourney((s) => s.capture);
  const fields = useJourney((s) => s.idFields);
  const [shot, setShot] = useState<string | undefined>(saved);
  const [live, setLive] = useState(false);
  const [flash, setFlash] = useState(false);

  const take = () => {
    const img = cam.current?.capture();
    if (!img) return;
    setFlash(true);
    setTimeout(() => setFlash(false), 180);
    setShot(img);
  };

  const sample = () => setShot(sampleIdImage(side, fields));

  return (
    <Screen
      flow={t("flow")}
      progress={{ current: step, total: 5 }}
      title={side === "front" ? t("frontTitle") : t("backTitle")}
      subtitle={shot ? t("checkPhoto") : t("idHint")}
      footer={
        shot ? (
          <div className="grid grid-cols-[auto_1fr] gap-3">
            <Button variant="secondary" className="w-auto px-6" onClick={() => setShot(undefined)}>
              {tc("retake")}
            </Button>
            <Button
              onClick={() => {
                capture(key, shot);
                router.push(next);
              }}
            >
              {t("looksGood")}
            </Button>
          </div>
        ) : (
          <>
            <Button onClick={take} disabled={!live}>
              <Icon name="camera" size={20} />
              {t("capture")}
            </Button>
            <Button variant="ghost" className="h-10" onClick={sample}>
              {t("useSample")}
            </Button>
          </>
        )
      }
    >
      {shot ? (
        <div className="animate-pop overflow-hidden rounded-[22px] bg-paper p-2 shadow-lift">
          <img src={shot} alt="" className="aspect-[1.586] w-full rounded-[16px] object-cover" />
        </div>
      ) : (
        <div className="relative">
          <Camera ref={cam} mode="id" onStatus={(s) => setLive(s === "live")} onUseSample={sample} />
          {flash && <div className="pointer-events-none absolute inset-0 rounded-[28px] bg-white" />}
        </div>
      )}
    </Screen>
  );
}
