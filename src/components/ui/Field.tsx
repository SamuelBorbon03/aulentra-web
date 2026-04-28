import { forwardRef, type InputHTMLAttributes, type TextareaHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Icon } from "./Icon";

/**
 * Field / Input / Textarea / FormError / FormHint — primitives de formulario.
 *
 * Sprint C · A.3 · Unifica los call sites de /acceso, /acceso/[slug],
 * /solicitar-acceso. Reemplaza inputs inline + labels + bloques de error
 * duplicados por componentes con un solo contrato y un solo estilo.
 *
 * Contract:
 *   <Field label="Correo" htmlFor="email" hint="…" error={err} required>
 *     <Input id="email" type="email" invalid={!!err} />
 *   </Field>
 *
 * `surface`:
 *   · "deep" → bg-bg-deep (default · pantallas /acceso · contraste sobre card)
 *   · "card" → bg-card    (pantallas con fondo bg-bg)
 */
export interface FieldProps {
  label: string;
  hint?: string;
  error?: string;
  required?: boolean;
  optional?: boolean;
  children: ReactNode;
  htmlFor?: string;
  className?: string;
}

export function Field({
  label,
  hint,
  error,
  required,
  optional,
  children,
  htmlFor,
  className,
}: FieldProps) {
  return (
    <div className={cn("flex flex-col gap-2", className)}>
      <label
        htmlFor={htmlFor}
        className="text-caption uppercase tracking-[0.16em] text-text-muted"
      >
        {label}
        {required && <span className="ml-1 text-primary">*</span>}
        {optional && <span className="ml-1 text-text-faint">(opcional)</span>}
      </label>
      {children}
      {hint && !error && <FormHint>{hint}</FormHint>}
      {error && <FormError>{error}</FormError>}
    </div>
  );
}

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  invalid?: boolean;
  surface?: "deep" | "card";
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  { className, invalid, surface = "deep", ...props },
  ref,
) {
  return (
    <input
      ref={ref}
      aria-invalid={invalid}
      className={cn(
        "w-full rounded-md text-fg text-small px-4 py-3 placeholder:text-muted",
        "border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep",
        surface === "deep" ? "bg-bg-deep" : "bg-card",
        invalid
          ? "border-[#FCA5A5]/60 focus:border-[#FCA5A5]"
          : "border-line-strong focus:border-primary/60",
        className,
      )}
      {...props}
    />
  );
});

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
  surface?: "deep" | "card";
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { className, invalid, surface = "deep", rows = 4, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      rows={rows}
      aria-invalid={invalid}
      className={cn(
        "w-full rounded-md text-fg text-small px-4 py-3 placeholder:text-muted",
        "border transition-colors focus:outline-none resize-y min-h-[96px] focus-visible:ring-2 focus-visible:ring-primary/40 focus-visible:ring-offset-2 focus-visible:ring-offset-bg-deep",
        surface === "deep" ? "bg-bg-deep" : "bg-card",
        invalid
          ? "border-[#FCA5A5]/60 focus:border-[#FCA5A5]"
          : "border-line-strong focus:border-primary/60",
        className,
      )}
      {...props}
    />
  );
});

export function FormError({ children }: { children: ReactNode }) {
  return (
    <div role="alert" className="flex items-start gap-2 text-caption-mono-sm text-[#FCA5A5]">
      <Icon name="alert-circle" size={12} className="mt-px" />
      <span>{children}</span>
    </div>
  );
}

export function FormHint({ children }: { children: ReactNode }) {
  return <p className="text-caption text-text-muted leading-relaxed">{children}</p>;
}
