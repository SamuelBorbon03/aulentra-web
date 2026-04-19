"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { NAV_LINKS, NAV_CTA } from "./nav-config";
import { MobileNav } from "./MobileNav";

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-30 border-b border-line-soft bg-bg-deep/90 backdrop-blur-md">
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
          </nav>

          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
