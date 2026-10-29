// Shared layout and type steps for the website. One pair of outer margins, five type sizes.

/** Equal outer margins at every width */
export const frame = "px-4 sm:px-6 lg:px-10";

export const type = {
  /** Home hero only */
  hero: "display text-[clamp(40px,10.4vw,150px)] leading-[0.92] tracking-[-0.04em] font-semibold",
  /** Inner page titles */
  display: "display text-[clamp(40px,6.6vw,100px)] leading-[0.96] tracking-[-0.035em] font-semibold",
  h2: "text-[clamp(32px,4.2vw,60px)] leading-[1.02] tracking-[-0.03em] font-semibold text-balance",
  h3: "text-[clamp(21px,1.8vw,26px)] leading-[1.2] tracking-[-0.01em] font-semibold",
  lead: "text-[clamp(19px,1.6vw,23px)] leading-[1.45] text-pretty",
  body: "text-[17px] leading-[1.6]",
  small: "text-[16px] leading-[1.5]",
} as const;

const BASE = process.env.NEXT_PUBLIC_BASE_PATH || "";

/** Prefix a public asset path with the deploy base path (GitHub Pages runs under a sub path) */
export const asset = (path: string) => `${BASE}${path}`;
