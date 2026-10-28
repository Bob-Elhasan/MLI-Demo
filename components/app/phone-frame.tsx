"use client";

import { useEffect, useState } from "react";

const W = 390;
const H = 844;
const BEZEL = 12;

/** Real phone size on desktop, scaled down to fit the viewport. Full screen on actual phones. */
export function PhoneFrame({ children }: { children: React.ReactNode }) {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const fit = () => setScale(Math.min(1, (window.innerHeight - 48) / (H + BEZEL * 2)));
    fit();
    window.addEventListener("resize", fit);
    return () => window.removeEventListener("resize", fit);
  }, []);

  return (
    <>
      {/* Phones and small tablets: the app is the whole screen */}
      <div className="relative flex h-dvh flex-col overflow-hidden bg-mist md:hidden">{children}</div>

      {/* Laptop demo: device frame */}
      <div
        className="relative hidden shrink-0 md:block"
        style={{ width: (W + BEZEL * 2) * scale, height: (H + BEZEL * 2) * scale }}
      >
        <div
          className="absolute start-0 top-0 origin-top-left rounded-[64px] bg-ink p-3 shadow-device rtl:origin-top-right"
          style={{ width: W + BEZEL * 2, height: H + BEZEL * 2, transform: `scale(${scale})` }}
        >
          <div className="relative flex size-full flex-col overflow-hidden rounded-[52px] bg-mist">
            <StatusBar />
            {children}
            <div className="pointer-events-none absolute bottom-2 start-1/2 z-50 h-[5px] w-[134px] -translate-x-1/2 rounded-full bg-ink/80 rtl:translate-x-1/2" />
          </div>
        </div>
      </div>
    </>
  );
}

function StatusBar() {
  const [time, setTime] = useState("9:41");
  useEffect(() => {
    const tick = () =>
      setTime(new Intl.DateTimeFormat("en-GB", { hour: "numeric", minute: "2-digit", hour12: false }).format(new Date()));
    tick();
    const id = setInterval(tick, 30_000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative z-40 flex h-[50px] shrink-0 items-center justify-between px-8 pt-1 text-[15px] font-semibold text-ink" dir="ltr">
      <span className="tabular">{time}</span>
      <div className="absolute start-1/2 top-2.5 h-[30px] w-[118px] -translate-x-1/2 rounded-full bg-ink" />
      <span className="flex items-center gap-1.5" aria-hidden="true">
        <svg width="18" height="12" viewBox="0 0 18 12" fill="currentColor">
          <rect x="0" y="8" width="3" height="4" rx="1" />
          <rect x="5" y="5.5" width="3" height="6.5" rx="1" />
          <rect x="10" y="3" width="3" height="9" rx="1" />
          <rect x="15" y="0" width="3" height="12" rx="1" />
        </svg>
        <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round">
          <path d="M1.5 4.5a9.5 9.5 0 0113 0M4 7.3a6 6 0 018 0M6.6 10a2.4 2.4 0 012.8 0" />
        </svg>
        <svg width="27" height="13" viewBox="0 0 27 13" fill="none">
          <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="currentColor" opacity="0.4" />
          <rect x="2.5" y="2.5" width="17" height="8" rx="2" fill="currentColor" />
          <path d="M25 4.5v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity="0.5" />
        </svg>
      </span>
    </div>
  );
}
