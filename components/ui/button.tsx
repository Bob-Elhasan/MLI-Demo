import Link from "next/link";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full font-semibold transition duration-200 ease-out-soft active:scale-[0.98] disabled:pointer-events-none disabled:opacity-40 select-none";

const variants: Record<Variant, string> = {
  primary: "bg-accent text-on-accent hover:bg-accent-strong shadow-[0_8px_20px_rgb(0_102_96/0.25)]",
  secondary: "bg-paper text-ink ring-1 ring-line-strong hover:ring-ink/40",
  ghost: "text-accent hover:bg-accent-soft",
};

const sizes = {
  md: "h-11 px-5 text-[15px]",
  lg: "h-14 px-6 text-base w-full",
};

type Common = { variant?: Variant; size?: keyof typeof sizes };

export function Button({ variant = "primary", size = "lg", className = "", ...props }: Common & ComponentProps<"button">) {
  return <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}

export function ButtonLink({ variant = "primary", size = "lg", className = "", ...props }: Common & ComponentProps<typeof Link>) {
  return <Link className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props} />;
}
