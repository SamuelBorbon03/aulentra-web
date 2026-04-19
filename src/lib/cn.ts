/**
 * Une clases de Tailwind filtrando valores falsy. Equivalente mínimo a `clsx`.
 */
export function cn(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}
