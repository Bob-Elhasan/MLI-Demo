"use client";

import { useEffect, useRef } from "react";

/** Finger or mouse signature. Reports a PNG data URL, or null when cleared. */
export function SignaturePad({ onChange, clearLabel, placeholder }: { onChange: (dataUrl: string | null) => void; clearLabel: string; placeholder: string }) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drawing = useRef(false);
  const dirty = useRef(false);

  useEffect(() => {
    const c = canvas.current!;
    const ratio = window.devicePixelRatio || 1;
    const { width, height } = c.getBoundingClientRect();
    c.width = width * ratio;
    c.height = height * ratio;
    const g = c.getContext("2d")!;
    g.scale(ratio, ratio);
    g.lineCap = "round";
    g.lineJoin = "round";
    g.lineWidth = 2.6;
    g.strokeStyle = "#1f1a22";
  }, []);

  // getBoundingClientRect is in screen pixels, the phone frame may be scaled
  const point = (e: React.PointerEvent) => {
    const c = canvas.current!;
    const r = c.getBoundingClientRect();
    const sx = c.offsetWidth / r.width;
    const sy = c.offsetHeight / r.height;
    return [(e.clientX - r.left) * sx, (e.clientY - r.top) * sy] as const;
  };

  const down = (e: React.PointerEvent) => {
    canvas.current!.setPointerCapture(e.pointerId);
    drawing.current = true;
    const g = canvas.current!.getContext("2d")!;
    const [x, y] = point(e);
    g.beginPath();
    g.moveTo(x, y);
  };

  const move = (e: React.PointerEvent) => {
    if (!drawing.current) return;
    const g = canvas.current!.getContext("2d")!;
    const [x, y] = point(e);
    g.lineTo(x, y);
    g.stroke();
    dirty.current = true;
  };

  const up = () => {
    if (!drawing.current) return;
    drawing.current = false;
    if (dirty.current) onChange(canvas.current!.toDataURL("image/png"));
  };

  const clear = () => {
    const c = canvas.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    dirty.current = false;
    onChange(null);
  };

  return (
    <div className="relative rounded-[20px] bg-paper ring-1 ring-line-strong">
      <canvas
        ref={canvas}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerLeave={up}
        className="block h-40 w-full touch-none cursor-crosshair"
      />
      <div className="pointer-events-none absolute inset-x-5 bottom-9 border-b border-dashed border-line-strong" />
      <span className="pointer-events-none absolute start-5 bottom-3 text-[12px] text-muted">{placeholder}</span>
      <button onClick={clear} className="absolute end-3 top-3 rounded-full bg-fill px-3 py-1 text-[12px] font-semibold text-ink-2">
        {clearLabel}
      </button>
    </div>
  );
}
