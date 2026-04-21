"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { NAV_LINKS, NAV_CTA } from "./nav-config";
import { MobileNav } from "./MobileNav";
import { UserMenu } from "./UserMenu";

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
        <div className="flex h-20 items-center justify-between">
          <Link href="/" aria-label="Ir al inicio" className="inline-flex items-center">
            <Wordmark tone="fg" size="md" withSymbol />
          </Link>

          <nav aria-label="Navegación principal" className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "text-small font-medium transition-colors relative",
                    active
                      ? "text-primary after:content-[''] after:absolute after:left-0 after:right-0 after:-bottom-[26px] after:h-px after:bg-horizon-gradient-soft"
                      : "text-fg/80 hover:text-fg"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <Button href={NAV_CTA.href} variant="link">
              {NAV_CTA.label}
            </Button>
            <UserMenu />
          </nav>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
