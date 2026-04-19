import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";
import { Button } from "@/components/ui/Button";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-line-soft bg-bg-deep/90 backdrop-blur-md">
      <Container>
        <div className="flex h-20 items-center justify-between">
          <Link href="/" aria-label="Ir al inicio" className="inline-flex items-center">
            <Wordmark tone="fg" size="md" withSymbol />
          </Link>

          <nav aria-label="Navegación principal" className="flex items-center gap-6">
            <Button href="#cta" variant="link" className="hidden md:inline-flex">
              Solicitar demo
            </Button>
          </nav>
        </div>
      </Container>
    </header>
  );
}
