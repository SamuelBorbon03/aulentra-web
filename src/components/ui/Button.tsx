import { cn } from "@/lib/cn";
import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "link";

interface CommonProps {
  variant?: Variant;
  className?: string;
  children: ReactNode;
}

const base =
  "inline-flex items-center justify-center gap-2 transition-[background,color,border-color,transform,box-shadow,opacity] duration-200 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-bg";

const variants: Record<Variant, string> = {
  // Primario — gradiente Horizon saturado sobre dark. Texto blanco semibold.
  primary:
    "rounded-md px-7 py-3 bg-horizon-gradient text-white font-semibold text-base hover:opacity-90 active:scale-[0.98] shadow-md hover:shadow-lg",
  // Secundario — borde fg-soft con fondo transparente, hover suave.
  secondary:
    "rounded-md px-7 py-3 border-[1.5px] border-line-strong text-fg font-medium text-base hover:border-primary hover:text-primary hover:bg-primary-light",
  // Link — primary soft con flecha.
  link:
    "text-primary hover:text-primary-hover font-medium text-base underline-offset-4 decoration-[1.5px] hover:underline after:content-['→'] after:ml-1 after:transition-transform after:duration-200 hover:after:translate-x-0.5",
};

type ButtonAsButton = CommonProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
type ButtonAsLink = CommonProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type ButtonProps = ButtonAsButton | ButtonAsLink;

export function Button(props: ButtonProps) {
  const { variant = "primary", className, children } = props;
  const classes = cn(base, variants[variant], className);

  if ("href" in props && props.href !== undefined) {
    const { href, variant: _v, className: _c, children: _ch, ...rest } = props;
    const isExternal = /^https?:\/\//.test(href);
    if (isExternal) {
      return (
        <a href={href} target="_blank" rel="noopener noreferrer" className={classes} {...rest}>
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {children}
      </Link>
    );
  }

  const { variant: _v, className: _c, children: _ch, ...rest } = props as ButtonAsButton;
  return (
    <button className={classes} {...rest}>
      {children}
    </button>
  );
}
