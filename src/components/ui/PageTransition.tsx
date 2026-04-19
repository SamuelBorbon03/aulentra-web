"use client";

import { usePathname } from "next/navigation";

/**
 * PageTransition — re-monta el contenedor cuando cambia la ruta y aplica
 * la animación CSS `animate-page-enter` definida en globals.css.
 *
 * Sin librerías externas. Respeta prefers-reduced-motion.
 */
export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className="animate-page-enter">
      {children}
    </div>
  );
}
