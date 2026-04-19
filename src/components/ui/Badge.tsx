import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: "primary" | "neutral";
}

export function Badge({ className, tone = "primary", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-pill px-3 py-1.5 text-caption uppercase",
        tone === "primary" &&
          "border border-primary/30 bg-primary-light text-primary",
        tone === "neutral" &&
          "border border-line bg-card text-fg-soft",
        className
      )}
      {...props}
    />
  );
}
