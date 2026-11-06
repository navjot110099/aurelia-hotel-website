"use client";

import { useEffect, useLayoutEffect, useState } from "react";

/** SSR-safe layout effect. */
export const useIsomorphicLayoutEffect =
  typeof window !== "undefined" ? useLayoutEffect : useEffect;

/** Reactive media query. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [query]);
  return matches;
}

/** True on fine-pointer (desktop) devices — used to gate the custom cursor. */
export function useHasPointer() {
  return useMediaQuery("(hover: hover) and (pointer: fine)");
}

/** Respect prefers-reduced-motion. */
export function useReducedMotion() {
  return useMediaQuery("(prefers-reduced-motion: reduce)");
}

/**
 * Heuristic for devices that should skip the WebGL hero and show the static
 * still instead: Save-Data, slow connections, low memory, or a small
 * touch device with few CPU cores. Conservative — only known-weak signals
 * trip it, so capable desktops keep the live ocean. Resolves after mount
 * (defaults to `false` during SSR / first paint).
 */
export function useLowPowerDevice() {
  const [low, setLow] = useState(false);
  useEffect(() => {
    const nav = navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
      deviceMemory?: number;
    };
    const conn = nav.connection;
    const saveData = conn?.saveData === true;
    const slowNet = /(^|\b)(2g|slow-2g)\b/.test(conn?.effectiveType ?? "");
    const lowMemory = typeof nav.deviceMemory === "number" && nav.deviceMemory <= 4;
    const fewCores =
      typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency <= 4;
    const coarse = window.matchMedia("(pointer: coarse)").matches;
    const smallScreen = window.matchMedia("(max-width: 768px)").matches;

    setLow(saveData || slowNet || lowMemory || (fewCores && (coarse || smallScreen)));
  }, []);
  return low;
}

/**
 * Returns `true` once the browser is idle (or after a short timeout), used to
 * defer mounting heavy, non-critical work (the WebGL canvas) past first paint.
 * Pass `enabled = false` to never arm it.
 */
export function useIdle(enabled = true, timeout = 2000) {
  const [idle, setIdle] = useState(false);
  useEffect(() => {
    if (!enabled) {
      setIdle(false);
      return;
    }
    const w = window as Window & {
      requestIdleCallback?: (cb: () => void, opts?: { timeout: number }) => number;
      cancelIdleCallback?: (id: number) => void;
    };
    if (typeof w.requestIdleCallback === "function") {
      const id = w.requestIdleCallback(() => setIdle(true), { timeout });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(() => setIdle(true), 400);
    return () => window.clearTimeout(id);
  }, [enabled, timeout]);
  return idle;
}

/** Tracks whether the user has scrolled past a threshold. */
export function useScrolled(threshold = 40) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}
