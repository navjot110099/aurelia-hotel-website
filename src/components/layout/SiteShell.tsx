"use client";

import { AmbienceProvider } from "@/components/providers/AmbienceProvider";
import { SmoothScroll } from "@/components/providers/SmoothScroll";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { Preloader } from "@/components/experience/Preloader";
import { ScrollProgress } from "@/components/experience/ScrollProgress";
import { PageTransition } from "@/components/experience/PageTransition";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

/**
 * The single client boundary that wires together every ambient system:
 * synthesised sound, Lenis smooth scroll, the custom cursor, the preloader,
 * scroll progress, page transitions and the persistent chrome (nav + footer).
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  return (
    <AmbienceProvider>
      <SmoothScroll>
        <CustomCursor />
        <Preloader />
        <ScrollProgress />
        <Navbar />
        <PageTransition>
          <main id="main">{children}</main>
        </PageTransition>
        <Footer />
      </SmoothScroll>
    </AmbienceProvider>
  );
}
