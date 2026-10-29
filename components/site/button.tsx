import Link from "next/link";
import type { ComponentProps } from "react";

// Website buttons: flat fills, fully round, no shadows at rest. One shape across the site.
type Variant = "primary" | "quiet" | "light";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong",
  quiet: "bg-ink/[0.07] text-ink hover:bg-ink/[0.12]",
  light: "bg-mint text-ink hover:bg-aqua",
};

const sizes = { lg: "h-14 px-7 text-[17px]", sm: "h-12 px-5 text-[16px]" };

export const siteButton = (variant: Variant = "primary", className = "", size: keyof typeof sizes = "lg") =>
  `inline-flex items-center justify-center gap-2 rounded-full font-semibold whitespace-nowrap transition duration-200 active:scale-[0.98] focus-visible:outline-2 ${sizes[size]} ${variants[variant]} ${className}`;

export function SiteLink({ variant = "primary", size = "lg", className = "", ...props }: { variant?: Variant; size?: keyof typeof sizes } & ComponentProps<typeof Link>) {
  return <Link className={siteButton(variant, className, size)} {...props} />;
}
