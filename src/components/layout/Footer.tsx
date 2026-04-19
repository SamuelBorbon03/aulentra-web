import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Wordmark } from "@/components/ui/Wordmark";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-line-soft bg-bg-deep">
      <Container>
        <div className="flex flex-col gap-8 py-14 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3">
            <Wordmark tone="fg" size="md" withSymbol />
            <p className="text-small text-muted max-w-sm">
              Sistema operativo académico. Una solución de{" "}
              <span className="font-medium text-fg">Noventor</span>.
            </p>
          </div>

          <nav aria-label="Navegación del pie" className="flex gap-6 text-small text-muted">
            <Link href="#cta" className="hover:text-primary transition-colors">
              Solicitar demo
            </Link>
          </nav>
        </div>

        <div className="border-t border-line-soft py-6">
          <p className="text-small text-muted">
            © {currentYear} Aulentra. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
}
