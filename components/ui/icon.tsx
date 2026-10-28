// Small inline icon set, 24px grid, stroke based so it inherits currentColor.
const paths = {
  back: "M15 5l-7 7 7 7",
  chevron: "M9 5l7 7-7 7",
  check: "M5 12.5l4.5 4.5L19 7.5",
  close: "M6 6l12 12M18 6L6 18",
  shield: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3z",
  shieldCheck: "M12 3l7.5 3v5.5c0 4.6-3.2 8.3-7.5 9.5-4.3-1.2-7.5-4.9-7.5-9.5V6L12 3zM8.5 12l2.5 2.5 4.5-5",
  camera: "M4 8.5A1.5 1.5 0 015.5 7h2l1.5-2h6l1.5 2h2A1.5 1.5 0 0120 8.5v9a1.5 1.5 0 01-1.5 1.5h-13A1.5 1.5 0 014 17.5v-9zM12 16a3.25 3.25 0 100-6.5 3.25 3.25 0 000 6.5z",
  idCard: "M3.5 6.5h17v11h-17zM7 10.5a1.75 1.75 0 103.5 0 1.75 1.75 0 00-3.5 0M6 15.5c.6-1.3 1.6-2 2.75-2s2.15.7 2.75 2M13.5 10h4M13.5 13h3",
  face: "M8 3.5H5.5a2 2 0 00-2 2V8M16 3.5h2.5a2 2 0 012 2V8M8 20.5H5.5a2 2 0 01-2-2V16M16 20.5h2.5a2 2 0 002-2V16M9 9.5v1M15 9.5v1M12 9.5v3.5h-1M9.5 16c1.4 1 3.6 1 5 0",
  lock: "M6.5 11h11v9h-11zM8.5 11V8a3.5 3.5 0 017 0v3",
  globe: "M12 21a9 9 0 100-18 9 9 0 000 18zM3.5 12h17M12 3c2.3 2.5 3.5 5.5 3.5 9s-1.2 6.5-3.5 9c-2.3-2.5-3.5-5.5-3.5-9S9.7 5.5 12 3z",
  card: "M3.5 6.5h17v11h-17zM3.5 10h17M7 14.5h3",
  phone: "M8 3.5h8a1.5 1.5 0 011.5 1.5v14a1.5 1.5 0 01-1.5 1.5H8A1.5 1.5 0 016.5 19V5A1.5 1.5 0 018 3.5zM11 17.5h2",
  refresh: "M19.5 12a7.5 7.5 0 11-2.2-5.3M19.5 4.5v4h-4",
  heart: "M12 20s-7.5-4.4-7.5-10A4.25 4.25 0 0112 7.4 4.25 4.25 0 0119.5 10c0 5.6-7.5 10-7.5 10z",
  family: "M8 10a2.5 2.5 0 100-5 2.5 2.5 0 000 5zM16.5 10.5a2 2 0 100-4 2 2 0 000 4zM3.5 19c.5-3 2.3-5 4.5-5s4 2 4.5 5M13.5 19c.3-2.3 1.4-4 3-4s2.7 1.7 3 4",
  piggy: "M5 11.5C5 8.5 8 6.5 12 6.5c1.2 0 2.3.2 3.3.5L18 5.5v3c1 .8 1.7 1.8 2 3h1.5v3H20a5.8 5.8 0 01-2 2.5V20h-3v-1.6c-1 .3-2 .4-3 .4s-2-.1-3-.4V20H6v-2.6c-.6-.6-1-1.4-1-2.4v-3.5zM15.5 10.5h.01",
  sparkle: "M12 3.5l1.8 4.9 4.9 1.8-4.9 1.8L12 16.9l-1.8-4.9-4.9-1.8 4.9-1.8L12 3.5zM18.5 15.5l.8 2 2 .8-2 .8-.8 2-.8-2-2-.8 2-.8.8-2z",
  pen: "M15.5 4.5l4 4L9 19H5v-4L15.5 4.5z",
  calendar: "M4.5 6h15v14h-15zM4.5 10h15M8.5 3.5v4M15.5 3.5v4",
  doc: "M7 3.5h7l4 4v13H7zM14 3.5v4h4M9.5 12.5h6M9.5 16h4",
  bell: "M6 16.5V11a6 6 0 0112 0v5.5l1.5 2h-15L6 16.5zM10 20.5a2 2 0 004 0",
  home: "M4 11l8-7 8 7v9h-5.5v-5.5h-5V20H4z",
  user: "M12 12a4 4 0 100-8 4 4 0 000 8zM4.5 20.5c1-3.7 4-5.5 7.5-5.5s6.5 1.8 7.5 5.5",
  wallet: "M4 7.5A2.5 2.5 0 016.5 5h11v3M4 7.5v10A2.5 2.5 0 006.5 20h13v-12h-13A2.5 2.5 0 014 7.5zM16 14h.01",
  qr: "M4 4h6v6H4zM14 4h6v6h-6zM4 14h6v6H4zM14 14h2v2h-2zM18 14h2v2h-2zM14 18h2v2h-2zM18 18h2v2h-2z",
  info: "M12 21a9 9 0 100-18 9 9 0 000 18zM12 11v5.5M12 7.5h.01",
} as const;

export type IconName = keyof typeof paths;

export function Icon({ name, size = 22, className, strokeWidth = 1.75 }: { name: IconName; size?: number; className?: string; strokeWidth?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d={paths[name]} />
    </svg>
  );
}
