import Link from "next/link";
import { cn } from "@/lib/utils";
import { BRAND } from "@/lib/site";

/** The AURELIA wordmark — a letter-spaced serif with a small crest mark. */
export function Logo({
  className,
  onClick,
}: {
  className?: string;
  onClick?: () => void;
}) {
  return (
    <Link
      href="/"
      onClick={onClick}
      aria-label={`${BRAND.name} — home`}
      className={cn("group flex items-center gap-3", className)}
    >
      <svg
        width="26"
        height="26"
        viewBox="0 0 26 26"
        fill="none"
        className="text-gold transition-transform duration-700 ease-luxe group-hover:rotate-180"
        aria-hidden
      >
        <path
          d="M13 1 L15.5 10.5 L25 13 L15.5 15.5 L13 25 L10.5 15.5 L1 13 L10.5 10.5 Z"
          stroke="currentColor"
          strokeWidth="1"
          fill="none"
        />
        <circle cx="13" cy="13" r="1.6" fill="currentColor" />
      </svg>
      <span className="flex flex-col leading-none">
        <span className="font-serif text-xl font-light tracking-[0.34em] text-sand">
          {BRAND.name}
        </span>
        <span className="mt-1 text-[8px] uppercase tracking-[0.4em] text-stone-light">
          {BRAND.descriptor}
        </span>
      </span>
    </Link>
  );
}
