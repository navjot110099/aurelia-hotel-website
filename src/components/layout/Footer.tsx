"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Instagram, Linkedin } from "lucide-react";
import { BRAND, FOOTER_NAV, NEWSLETTER_NOTE } from "@/lib/site";
import { Reveal } from "@/components/ui/Reveal";
import { GoldLine } from "@/components/ui/Primitives";

export function Footer() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes("@")) return;
    setSent(true);
    setEmail("");
    setTimeout(() => setSent(false), 4000);
  };

  return (
    <footer className="relative overflow-hidden bg-ink pt-24">
      <div className="mx-auto max-w-[100rem] px-6 md:px-10">
        {/* Newsletter */}
        <div className="grid gap-12 pb-20 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow mb-6">The House List</p>
            <h2 className="max-w-md font-serif text-4xl font-light leading-tight text-sand md:text-5xl">
              An invitation, now and then.
            </h2>
            <p className="mt-6 max-w-md text-sm leading-relaxed text-stone-light">
              {NEWSLETTER_NOTE}
            </p>
          </Reveal>

          <Reveal delay={0.1} className="flex flex-col justify-end">
            <form onSubmit={submit} className="w-full">
              <label
                htmlFor="footer-email"
                className="mb-3 block text-[10px] uppercase tracking-[0.28em] text-stone-light"
              >
                Email address
              </label>
              <div className="flex items-center gap-4 border-b border-gold/30 pb-3 transition-colors focus-within:border-gold">
                <input
                  id="footer-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full bg-transparent font-serif text-2xl text-sand placeholder:text-stone/50 focus:outline-none"
                  required
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  data-cursor="Join"
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gold-gradient text-ink transition-transform duration-500 hover:scale-105"
                >
                  <ArrowRight size={18} />
                </button>
              </div>
              <p className="mt-3 h-5 text-xs text-gold">
                {sent ? "Thank you — welcome to the house list." : ""}
              </p>
            </form>
          </Reveal>
        </div>

        <GoldLine className="opacity-40" />

        {/* Nav columns */}
        <div className="grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-6">
          <div className="lg:col-span-2">
            <p className="font-serif text-2xl font-light tracking-[0.28em] text-sand">
              {BRAND.name}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-stone-light">
              {BRAND.tagline}
            </p>
            <div className="mt-8 space-y-2 text-sm text-stone-light">
              <p>{BRAND.address}</p>
              <p>
                <a href={`tel:${BRAND.phone}`} className="link-sweep">
                  {BRAND.phone}
                </a>
              </p>
              <p>
                <a
                  href={`mailto:${BRAND.reservations}`}
                  className="link-sweep text-gold"
                >
                  {BRAND.reservations}
                </a>
              </p>
            </div>
            <div className="mt-8 flex gap-3">
              {[
                { icon: Instagram, href: BRAND.social.instagram, label: "Instagram" },
                { icon: Linkedin, href: BRAND.social.linkedin, label: "LinkedIn" },
              ].map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-sand/80 transition-colors hover:border-gold hover:text-gold"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {FOOTER_NAV.map((col) => (
            <div key={col.title}>
              <p className="mb-6 text-[10px] uppercase tracking-[0.28em] text-gold">
                {col.title}
              </p>
              <ul className="space-y-3">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-stone-light transition-colors duration-300 hover:text-sand link-sweep"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Giant wordmark */}
      <div className="relative select-none px-6">
        <h2 className="pointer-events-none whitespace-nowrap text-center font-serif text-[22vw] font-light leading-none tracking-tighter text-transparent [-webkit-text-stroke:1px_rgba(201,169,97,0.14)]">
          AURELIA
        </h2>
      </div>

      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[100rem] flex-col items-center justify-between gap-4 px-6 py-8 text-[11px] uppercase tracking-[0.18em] text-stone md:flex-row md:px-10">
          <p>
            © {BRAND.established}–2026 {BRAND.legalName}. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-sand">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-sand">
              Terms
            </Link>
            <Link href="/faq" className="hover:text-sand">
              FAQ
            </Link>
          </div>
          <p className="text-stone">Crafted on Maré Séraphine</p>
        </div>
      </div>
    </footer>
  );
}
