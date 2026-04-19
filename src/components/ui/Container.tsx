import { cn } from "@/lib/cn";
import type { HTMLAttributes } from "react";

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  narrow?: boolean;
}

export function Container({ className, narrow = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        "mx-auto w-full px-6 md:px-12 lg:px-0",
        narrow ? "max-w-[680px]" : "max-w-[1120px]",
        className
      )}
      {...props}
    />
  );
}
