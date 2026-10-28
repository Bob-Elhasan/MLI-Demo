"use client";

import { useEffect, useImperativeHandle, useRef, useState, type Ref } from "react";
import { useTranslations } from "next-intl";
import { Icon } from "@/components/ui/icon";

export type CameraHandle = { capture: () => string | null };
type Status = "starting" | "live" | "error";

const ID_RATIO = 1.586; // ISO ID-1 card

/**
 * Live webcam with an ID-card or face-oval guide. The image is real, everything done with it is mocked.
 * Falls back to a "use sample" path when there is no camera or permission is denied.
 */
export function Camera({
  mode,
  ref,
  onStatus,
  onUseSample,
  children,
}: {
  mode: "id" | "face";
  ref?: Ref<CameraHandle>;
  onStatus?: (s: Status) => void;
  onUseSample: () => void;
  children?: React.ReactNode;
}) {
  const t = useTranslations("kyc");
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);
  const [status, setStatus] = useState<Status>("starting");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setStatus("starting");
    (async () => {
      try {
        if (!navigator.mediaDevices?.getUserMedia) throw new Error("unsupported");
        const s = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: mode === "face" ? "user" : "environment", width: { ideal: 1280 }, height: { ideal: 960 } },
          audio: false,
        });
        if (cancelled) return s.getTracks().forEach((tr) => tr.stop());
        stream.current = s;
        if (video.current) {
          video.current.srcObject = s;
          await video.current.play().catch(() => {});
        }
        setStatus("live");
      } catch {
        if (!cancelled) setStatus("error");
      }
    })();
    return () => {
      cancelled = true;
      stream.current?.getTracks().forEach((tr) => tr.stop());
      stream.current = null;
    };
  }, [mode, attempt]);

  useEffect(() => onStatus?.(status), [status, onStatus]);

  useImperativeHandle(ref, () => ({
    capture: () => {
      const v = video.current;
      if (!v || status !== "live" || !v.videoWidth) return null;
      const vw = v.videoWidth;
      const vh = v.videoHeight;
      const c = document.createElement("canvas");
      const g = c.getContext("2d")!;
      if (mode === "id") {
        // Crop roughly what sits inside the on-screen card guide
        const w = vw * 0.86;
        const h = Math.min(vh * 0.9, w / ID_RATIO);
        c.width = w;
        c.height = h;
        g.drawImage(v, (vw - w) / 2, (vh - h) / 2, w, h, 0, 0, w, h);
      } else {
        const h = vh;
        const w = Math.min(vw, h * 0.78);
        c.width = w;
        c.height = h;
        g.translate(w, 0);
        g.scale(-1, 1);
        g.drawImage(v, (vw - w) / 2, 0, w, h, 0, 0, w, h);
      }
      return c.toDataURL("image/jpeg", 0.85);
    },
  }));

  return (
    <div className={`relative overflow-hidden bg-ink ${mode === "id" ? "aspect-[3/4] rounded-[28px]" : "aspect-[3/4] rounded-[28px]"}`}>
      <video
        ref={video}
        playsInline
        muted
        className={`absolute inset-0 size-full object-cover transition-opacity duration-500 ${status === "live" ? "opacity-100" : "opacity-0"} ${mode === "face" ? "-scale-x-100" : ""}`}
      />

      {status === "live" && (mode === "id" ? <IdGuide /> : <FaceGuide />)}
      {status === "live" && children}

      {status === "starting" && (
        <div className="absolute inset-0 grid place-items-center">
          <span className="size-8 animate-spin rounded-full border-2 border-mist/30 border-t-mist" />
        </div>
      )}

      {status === "error" && (
        <div className="bg-connect absolute inset-0 flex flex-col items-center justify-center gap-4 p-8 text-center">
          <span className="grid size-14 place-items-center rounded-full bg-paper text-accent shadow-card">
            <Icon name="camera" size={26} />
          </span>
          <div>
            <p className="font-semibold">{t("cameraOff")}</p>
            <p className="mt-1 text-sm text-muted">{t("cameraOffBody")}</p>
          </div>
          <div className="flex flex-col gap-2">
            <button onClick={onUseSample} className="h-11 rounded-full bg-accent px-5 text-sm font-semibold text-on-accent">
              {mode === "id" ? t("useSample") : t("selfieStart")}
            </button>
            <button onClick={() => setAttempt((a) => a + 1)} className="h-10 text-sm font-semibold text-accent">
              {t("allowCamera")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function IdGuide() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div
        className="relative w-[86%] rounded-[18px] shadow-[0_0_0_9999px_rgb(31_26_34/0.55)]"
        style={{ aspectRatio: ID_RATIO }}
      >
        {["start-0 top-0 border-s-[3px] border-t-[3px] rounded-ss-[18px]", "end-0 top-0 border-e-[3px] border-t-[3px] rounded-se-[18px]", "start-0 bottom-0 border-s-[3px] border-b-[3px] rounded-es-[18px]", "end-0 bottom-0 border-e-[3px] border-b-[3px] rounded-ee-[18px]"].map((c) => (
          <span key={c} className={`absolute size-9 border-mint ${c}`} />
        ))}
        <span className="animate-scan absolute inset-x-3 h-0.5 rounded-full bg-mint shadow-[0_0_14px_2px_rgb(214_250_223/0.9)]" />
      </div>
    </div>
  );
}

function FaceGuide() {
  return (
    <div className="pointer-events-none absolute inset-0 grid place-items-center">
      <div className="h-[72%] w-[66%] rounded-[50%] shadow-[0_0_0_9999px_rgb(31_26_34/0.6)] ring-[3px] ring-mint" />
    </div>
  );
}
