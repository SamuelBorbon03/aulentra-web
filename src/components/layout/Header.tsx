"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { NAV_CTA, NAV_LOGIN } from "./nav-config";
import { DesktopNav } from "./DesktopNav";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  // Header scroll-aware: bg intensifica al scrollear, sin shrink. Throttled vía rAF.
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => setScrolled(window.scrollY > 8));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Guard `/acceso` (Sprint B-2): el flujo de login es inmersivo · sin chrome.
  // `/solicitar-acceso` mantiene chrome — es página institucional con form.
  if (pathname?.startsWith("/acceso")) return null;

  return (
    <header
      className={cn(
        "sticky top-0 z-30 backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]",
        scrolled
          ? "bg-bg-deep/95 border-b border-line-soft shadow-md"
          : "bg-bg-deep/60 border-b border-transparent"
      )}
    >
      <Container>
        <div className="flex h-20 items-center justify-between gap-6">
          {/* IZQUIERDA — logo · Sprint B-2: contracción óptica al scrollear (desktop).
               En mobile queda fijo en `sm` para no competir con el hamburger. */}
          <Link href="/" aria-label="Ir al inicio" className="inline-flex items-center shrink-0">
            <span className="hidden md:inline-flex">
              <Wordmark tone="fg" size={scrolled ? "sm" : "md"} withSymbol />
            </span>
            <span className="md:hidden inline-flex">
              <Wordmark tone="fg" size="sm" withSymbol />
            </span>
          </Link>

          {/* CENTRO — dropdowns (desktop lg+) */}
          <div className="flex-1 flex justify-center">
            <DesktopNav />
          </div>

          {/* DERECHA — acceder + CTA (desktop) */}
          <div className="hidden lg:flex items-center gap-5 shrink-0">
            <Link
              href={NAV_LOGIN.href}
              className="text-small font-medium text-fg/75 hover:text-fg transition-colors"
            >
              {NAV_LOGIN.label}
            </Link>
            <Button href={NAV_CTA.href} variant="primary" className="!py-2.5 !px-5 !text-small">
              {NAV_CTA.label}
            </Button>
          </div>

          {/* Mobile — hamburger */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
