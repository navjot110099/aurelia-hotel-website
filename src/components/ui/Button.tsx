import Link from "next/link";
import { forwardRef } from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { Magnetic } from "./MagneticButton";

const button = cva(
  "group relative inline-flex items-center justify-center gap-2.5 overflow-hidden whitespace-nowrap font-sans text-[11px] uppercase tracking-[0.24em] transition-colors duration-500 ease-luxe disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        gold:
          "rounded-full bg-gold-gradient text-ink shadow-gold hover:shadow-[0_0_80px_-10px_rgba(201,169,97,0.7)]",
        outline:
          "rounded-full border border-gold/40 text-sand hover:border-gold hover:text-gold",
        ghost: "text-sand hover:text-gold",
        light:
          "rounded-full bg-sand text-ink hover:bg-sand-200",
        dark:
          "rounded-full bg-ink-800 text-sand border border-white/10 hover:border-gold/50",
      },
      size: {
        sm: "h-10 px-6",
        md: "h-12 px-8",
        lg: "h-14 px-10",
      },
    },
    defaultVariants: { variant: "gold", size: "md" },
  }
);

type BaseProps = VariantProps<typeof button> & {
  className?: string;
  children: React.ReactNode;
  magnetic?: boolean;
  cursorLabel?: string;
};

type ButtonAsButton = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps> & {
    href?: undefined;
  };

type ButtonAsLink = BaseProps & {
  href: string;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

const Inner = ({ children }: { children: React.ReactNode }) => (
  <>
    {/* gold-sweep highlight on hover */}
    <span
      aria-hidden
      className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-[900ms] ease-luxe group-hover:translate-x-full"
    />
    <span className="relative z-10 flex items-center gap-2.5">{children}</span>
  </>
);

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, magnetic = true, cursorLabel, children, ...props }, ref) => {
    const classes = cn(button({ variant, size }), className);

    const content =
      "href" in props && props.href !== undefined ? (
        <Link
          href={props.href}
          data-cursor={cursorLabel}
          className={classes}
        >
          <Inner>{children}</Inner>
        </Link>
      ) : (
        <button
          ref={ref}
          data-cursor={cursorLabel}
          className={classes}
          {...(props as React.ButtonHTMLAttributes<HTMLButtonElement>)}
        >
          <Inner>{children}</Inner>
        </button>
      );

    return magnetic ? <Magnetic strength={0.25}>{content}</Magnetic> : content;
  }
);
Button.displayName = "Button";
