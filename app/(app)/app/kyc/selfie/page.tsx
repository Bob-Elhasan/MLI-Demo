"use client";

import { useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState } from "react";
import { Camera, type CameraHandle } from "@/components/app/camera";
import { Screen } from "@/components/app/screen";
import { Button } from "@/components/ui/button";
import { Icon } from "@/components/ui/icon";
import { useJourney } from "@/lib/store/journey";
import { sampleSelfieImage } from "@/lib/mock/sample-images";

const PROMPTS = ["livenessStraight", "livenessLeft", "livenessRight", "livenessBlink", "livenessSmile"] as const;
const PROMPT_MS = 1300;

type Phase = "ready" | "liveness" | "matching" | "done";

export default function Selfie() {
  const t = useTranslations("kyc");
  const router = useRouter();
  const cam = useRef<CameraHandle>(null);
  const capture = useJourney((s) => s.capture);
  const set = useJourney((s) => s.set);
  const [live, setLive] = useState(false);
  const [simulated, setSimulated] = useState(false);
  const [sample, setSample] = useState<string>();
  const [phase, setPhase] = useState<Phase>("ready");
  const [prompt, setPrompt] = useState(0);

  // Walk through the liveness prompts, then grab the frame and "match" it
  useEffect(() => {
    if (phase !== "liveness") return;
    if (prompt < PROMPTS.length) {
      const id = setTimeout(() => setPrompt((p) => p + 1), PROMPT_MS);
      return () => clearTimeout(id);
    }
    capture("selfie", cam.current?.capture() ?? sample ?? sampleSelfieImage());
    setPhase("matching");
  }, [phase, prompt, capture, sample]);

  useEffect(() => {
    if (phase !== "matching") return;
    const id = setTimeout(() => {
      set({ livenessPassed: true });
      setPhase("done");
    }, 1700);
    return () => clearTimeout(id);
  }, [phase, set]);

  useEffect(() => {
    if (phase !== "done") return;
    const id = setTimeout(() => router.push("/app/kyc/biometrics"), 1200);
    return () => clearTimeout(id);
  }, [phase, router]);

  const start = () => {
    setPrompt(0);
    setPhase("liveness");
  };

  const progress = phase === "liveness" ? prompt / PROMPTS.length : phase === "ready" ? 0 : 1;
  const label =
    phase === "ready" ? t("selfieBody") : phase === "liveness" ? t(PROMPTS[Math.min(prompt, PROMPTS.length - 1)]) : phase === "matching" ? t("matching") : t("livenessDone");

  const overlay = (
    <>
      <ProgressOval progress={progress} done={phase === "done"} />
      <div className="absolute inset-x-4 bottom-4 flex justify-center">
        <span key={label} className="animate-screen-in rounded-full bg-ink/80 px-4 py-2 text-[14px] font-medium text-mist backdrop-blur">
          {label}
        </span>
      </div>
      {phase === "done" && (
        <div className="animate-fade-in absolute inset-0 grid place-items-center bg-accent/30">
          <span className="animate-pop grid size-20 place-items-center rounded-full bg-paper text-success shadow-lift">
            <Icon name="check" size={40} strokeWidth={2.5} />
          </span>
        </div>
      )}
    </>
  );

  return (
    <Screen
      flow={t("flow")}
      progress={{ current: 4, total: 5 }}
      title={t("selfieTitle")}
      footer={
        <Button onClick={start} disabled={phase !== "ready" || (!live && !simulated)}>
          {phase === "matching" ? t("matching") : t("selfieStart")}
        </Button>
      }
    >
      {simulated ? (
        <div className="relative aspect-[3/4] overflow-hidden rounded-[28px] bg-ink">
          <img src={sample} alt="" className="absolute inset-0 size-full object-cover" />
          <div className="pointer-events-none absolute inset-0 grid place-items-center">
            <div className="h-[72%] w-[66%] rounded-[50%] shadow-[0_0_0_9999px_rgb(31_26_34/0.6)] ring-[3px] ring-mint" />
          </div>
          {overlay}
        </div>
      ) : (
        <Camera ref={cam} mode="face" onStatus={(s) => setLive(s === "live")} onUseSample={() => {
          setSample(sampleSelfieImage());
          setSimulated(true);
        }}>
          {overlay}
        </Camera>
      )}
      {phase === "matching" || phase === "done" ? (
        <p className="tabular mt-4 text-center text-[13px] font-medium text-muted">{t("matchScore", { score: "98.6" })}</p>
      ) : null}
    </Screen>
  );
}

/** Progress drawn around the face oval */
function ProgressOval({ progress, done }: { progress: number; done: boolean }) {
  return (
    <svg className="pointer-events-none absolute inset-0 size-full" viewBox="0 0 300 400" preserveAspectRatio="none" aria-hidden="true">
      <ellipse
        cx="150"
        cy="200"
        rx="103"
        ry="148"
        fill="none"
        stroke={done ? "var(--color-success)" : "var(--color-accent)"}
        strokeWidth="6"
        strokeLinecap="round"
        pathLength={100}
        strokeDasharray={`${progress * 100} 100`}
        transform="rotate(-90 150 200)"
        style={{ transition: "stroke-dasharray 1.1s var(--ease-out-soft)" }}
      />
    </svg>
  );
}
