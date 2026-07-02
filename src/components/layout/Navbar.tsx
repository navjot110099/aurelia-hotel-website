"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { NAV } from "@/lib/site";
import { cn } from "@/lib/utils";
import { useScrolled } from "@/hooks";
import { Logo } from "./Logo";
import { Button } from "@/components/ui/Button";
import { SoundToggle } from "@/components/experience/SoundToggle";

const EASE = [0.22, 1, 0.36, 1] as const;

export function Navbar() {
  const scrolled = useScrolled(60);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-[500] transition-all duration-700 ease-luxe",
          scrolled
            ? "border-b border-white/5 bg-ink/70 backdrop-blur-xl"
            : "bg-gradient-to-b from-ink/60 to-transparent"
        )}
        onMouseLeave={() => setOpenGroup(null)}
      >
        <nav className="mx-auto flex h-20 max-w-[100rem] items-center justify-between px-6 md:px-10">
          <Logo />

          {/* Desktop nav */}
          <ul className="hidden items-center gap-1 lg:flex">
            {NAV.map((group) => (
              <li
                key={group.label}
                onMouseEnter={() => setOpenGroup(group.label)}
              >
                <Link
                  href={group.href}
                  className={cn(
                    "flex items-center gap-1.5 px-5 py-2 text-[11px] uppercase tracking-[0.22em] transition-colors duration-300",
                    openGroup === group.label
                      ? "text-gold"
                      : "text-sand/80 hover:text-sand"
                  )}
                >
                  {group.label}
                  {group.columns && (
                    <span
                      className={cn(
                        "h-1 w-1 rounded-full bg-gold transition-opacity duration-300",
                        openGroup === group.label ? "opacity-100" : "opacity-0"
                      )}
                    />
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-3">
            <SoundToggle className="hidden md:flex" />
            <Button
              href="/booking"
              variant="gold"
              size="sm"
              cursorLabel="Reserve"
              className="hidden sm:inline-flex"
            >
              Book a Stay
            </Button>
            <button
              className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-sand lg:hidden"
              onClick={() => setMobileOpen(true)}
              aria-label="Open menu"
            >
              <Menu size={18} />
            </button>
          </div>
        </nav>

        {/* Mega menu */}
        <AnimatePresence>
          {openGroup &&
            NAV.find((g) => g.label === openGroup)?.columns && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: EASE }}
                className="absolute inset-x-0 top-full hidden border-t border-white/5 bg-ink/95 backdrop-blur-2xl lg:block"
              >
                <div className="mx-auto grid max-w-[100rem] grid-cols-[1fr_1.2fr] gap-16 px-10 py-12">
                  <div className="flex flex-col justify-between">
                    <div>
                      <p className="eyebrow mb-4">
                        {NAV.find((g) => g.label === openGroup)?.label}
                      </p>
                      <p className="max-w-xs font-serif text-2xl font-light leading-tight text-sand">
                        Every detail, considered. Every moment, yours.
                      </p>
                    </div>
                    <Link
                      href={NAV.find((g) => g.label === openGroup)?.href ?? "/"}
                      className="mt-8 inline-flex w-fit items-center gap-2 text-[11px] uppercase tracking-[0.22em] text-gold link-sweep"
                    >
                      Explore all <ArrowUpRight size={14} />
                    </Link>
                  </div>

                  <div className="grid grid-cols-2 gap-10">
                    {NAV.find((g) => g.label === openGroup)?.columns?.map(
                      (col) => (
                        <div key={col.title}>
                          <p className="mb-5 text-[10px] uppercase tracking-[0.28em] text-stone-light">
                            {col.title}
                          </p>
                          <ul className="space-y-3.5">
                            {col.links.map((link) => (
                              <li key={link.label}>
                                <Link
                                  href={link.href}
                                  className="group flex items-baseline justify-between gap-4"
                                >
                                  <span className="font-serif text-lg text-sand transition-colors duration-300 group-hover:text-gold">
                                    {link.label}
                                  </span>
                                  {link.note && (
                                    <span className="text-[10px] uppercase tracking-[0.16em] text-stone">
                                      {link.note}
                                    </span>
                                  )}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </motion.div>
            )}
        </AnimatePresence>
      </header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[600] bg-ink lg:hidden"
          >
            <div className="flex h-20 items-center justify-between px-6">
              <Logo onClick={() => setMobileOpen(false)} />
              <button
                className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-sand"
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex h-[calc(100%-5rem)] flex-col justify-between overflow-y-auto px-6 pb-10 pt-6">
              <ul className="space-y-1">
                {NAV.map((group, i) => (
                  <motion.li
                    key={group.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 + i * 0.06, ease: EASE }}
                    className="border-b border-white/5 py-4"
                  >
                    <Link
                      href={group.href}
                      onClick={() => setMobileOpen(false)}
                      className="font-serif text-4xl font-light text-sand"
                    >
                      {group.label}
                    </Link>
                    {group.columns && (
                      <div className="mt-3 flex flex-wrap gap-x-5 gap-y-1">
                        {group.columns
                          .flatMap((c) => c.links)
                          .slice(0, 4)
                          .map((l) => (
                            <Link
                              key={l.label}
                              href={l.href}
                              onClick={() => setMobileOpen(false)}
                              className="text-xs uppercase tracking-[0.16em] text-stone-light"
                            >
                              {l.label}
                            </Link>
                          ))}
                      </div>
                    )}
                  </motion.li>
                ))}
              </ul>
              <div className="mt-8 flex flex-col gap-4">
                <SoundToggle className="w-fit" />
                <Button
                  href="/booking"
                  variant="gold"
                  size="lg"
                  magnetic={false}
                  className="w-full"
                >
                  Book a Stay
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
