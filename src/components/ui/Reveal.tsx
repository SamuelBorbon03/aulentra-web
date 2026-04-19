"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

interface RevealProps extends HTMLAttributes<HTMLDivElement> {
  delay?: number;
  offset?: number;
  /** Escala inicial — sensación de "settle". Default: 0.97. */
  scaleFrom?: number;
}

/**
 * Reveal — fade + translate-y on viewport entry. Honors prefers-reduced-motion.
 */
export function Reveal({
  className,
  children,
  delay = 0,
  offset = 28,
  scaleFrom = 0.97,
  style,
  ...props
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
            io.disconnect();
          }
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -60px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={cn(
        // Easing "luxury exit" + duración generosa. Combina opacity, translate y scale.
        "transition-[opacity,transform] duration-[820ms] ease-[cubic-bezier(0.16,1,0.3,1)] will-change-transform motion-reduce:transition-none",
        visible ? "opacity-100" : "opacity-0",
        className
      )}
      style={{
        transitionDelay: `${delay}ms`,
        transform: visible
          ? "translateY(0) scale(1)"
          : `translateY(${offset}px) scale(${scaleFrom})`,
        ...style,
      }}
      {...props}
    >
      {children}
    </div>
  );
}
